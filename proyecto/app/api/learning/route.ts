import { getRuntimeEnv } from '../../../lib/runtime-env.ts';
import { apiError, HttpError, readJson, requireLearner } from '../../../lib/access.ts';
import { lessons, CONTENT_VERSION } from '../../learning/catalog.ts';
import { cases, publicCase, evaluateCase, type Decision } from '../../learning/cases.ts';

const response = (value: unknown) => Response.json(value, { headers: { 'cache-control': 'no-store' } });
function text(value: unknown, max: number) {
  if (typeof value !== 'string' || value.length > max) throw new HttpError(400, 'Texto inválido o demasiado largo.');
  return value;
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('case');
    if (id) {
      const item = cases.find(item => item.id === id);
      if (!item) throw new HttpError(404, 'Caso no encontrado.');
      return response(publicCase(item));
    }
    const user = requireLearner(request); const db = getRuntimeEnv().DB;
    const [records, attempts, caseRecords] = await Promise.all([
      db.prepare('SELECT * FROM learning_records WHERE user_key=? AND version=?').bind(user, CONTENT_VERSION).all(),
      db.prepare('SELECT lesson_id, score, created_at FROM learning_attempts WHERE user_key=? AND version=? ORDER BY created_at DESC LIMIT 500').bind(user, CONTENT_VERSION).all(),
      db.prepare('SELECT id, case_id, response, result, created_at FROM case_attempts WHERE user_key=? AND version=? ORDER BY created_at DESC LIMIT 500').bind(user, CONTENT_VERSION).all(),
    ]);
    return response({ records: records.results, attempts: attempts.results, caseAttempts: caseRecords.results, version: CONTENT_VERSION, local: user === 'owner' });
  } catch (error) { return apiError(error); }
}

export async function POST(request: Request) {
  try {
    const user = requireLearner(request); const body = await readJson(request);
    if (body.version !== CONTENT_VERSION) throw new HttpError(409, 'El contenido cambió. Recarga antes de continuar.');
    const db = getRuntimeEnv().DB;
    if (body.action === 'case') {
      const item = cases.find(item => item.id === body.caseId);
      if (!item) throw new HttpError(400, 'Caso inválido.');
      const attemptId = text(body.attemptId, 80);
      if (!/^[a-zA-Z0-9-]{12,80}$/.test(attemptId)) throw new HttpError(400, 'Identificador de intento inválido.');
      const previous = await db.prepare('SELECT result FROM case_attempts WHERE id=? AND user_key=?').bind(attemptId, user).first<{ result: string }>();
      if (previous) return response(JSON.parse(previous.result));
      if (!['ejecutar','esperar','descartar'].includes(String(body.decision)) || !Number.isInteger(body.reason) || Number(body.reason) < 0 || Number(body.reason) >= item.reasons.length) throw new HttpError(400, 'Selecciona decisión y fundamento.');
      const reasoning = text(body.reasoning, 10000);
      if (reasoning.trim().length < 20) throw new HttpError(400, 'Registra tu razonamiento antes de revelar.');
      const submission = { decision: body.decision as Decision, reason: Number(body.reason), stop: body.stop as number, target: body.target as number, budget: body.budget as number, reasoning };
      const result = evaluateCase(item, submission);
      await db.prepare('INSERT OR IGNORE INTO case_attempts (id,user_key,version,case_id,response,result) VALUES (?,?,?,?,?,?)').bind(attemptId, user, CONTENT_VERSION, item.id, JSON.stringify(submission), JSON.stringify(result)).run();
      const saved = await db.prepare('SELECT result FROM case_attempts WHERE id=? AND user_key=?').bind(attemptId, user).first<{ result: string }>();
      if (!saved) throw new HttpError(409, 'Identificador de intento no disponible. Abre de nuevo el caso.');
      return response(JSON.parse(saved.result));
    }

    if (!['draft', 'check'].includes(String(body.action))) throw new HttpError(400, 'Acción desconocida.');
    const lesson = lessons.find(item => item.id === body.lessonId);
    if (!lesson) throw new HttpError(400, 'Lección inválida.');
    const keys = [user, lesson.track, CONTENT_VERSION, lesson.id];
    await db.prepare('INSERT OR IGNORE INTO learning_records (user_key,course_id,version,lesson_id) VALUES (?,?,?,?)').bind(...keys).run();
    if (body.action === 'draft') {
      const draft = text(body.draft, 15000);
      if (!Number.isInteger(body.revision) || Number(body.revision) < 0) throw new HttpError(400, 'Revisión inválida.');
      const seconds = Number.isInteger(body.seconds) ? Math.max(0, Math.min(120, Number(body.seconds))) : 0;
      const practiced = body.reviewed === true && draft.trim().length >= 30 ? 1 : 0;
      const record = await db.prepare(`UPDATE learning_records SET draft=?, revision=revision+1,
        studied=MAX(studied,?), practiced=MAX(practiced,?), study_seconds=study_seconds+?, updated_at=CURRENT_TIMESTAMP
        WHERE user_key=? AND course_id=? AND version=? AND lesson_id=? AND revision=? RETURNING *`).bind(draft, body.studied === true ? 1 : 0, practiced, seconds, ...keys, body.revision).first();
      if (!record) throw new HttpError(409, 'Otra pestaña guardó una versión más reciente. Tu texto sigue en pantalla: cópialo antes de recargar.');
      return response({ record });
    }
    if (body.action === 'check') {
      const answers = body.answers;
      if (!Array.isArray(answers) || answers.length !== lesson.checks.length || answers.some((answer, index) => !Number.isInteger(answer) || answer < 0 || answer >= lesson.checks[index].options.length)) throw new HttpError(400, 'Completa todas las respuestas.');
      const feedback = lesson.checks.map((question, index) => ({ correct: answers[index] === question.correct, answer: question.correct, explanation: question.feedback }));
      const score = Math.round(100 * feedback.filter(item => item.correct).length / feedback.length);
      await db.batch([
        db.prepare('INSERT INTO learning_attempts (id,user_key,version,lesson_id,answers,score) VALUES (?,?,?,?,?,?)').bind(crypto.randomUUID(), user, CONTENT_VERSION, lesson.id, JSON.stringify(answers), score),
        db.prepare('UPDATE learning_records SET check_passed=MAX(check_passed,?), updated_at=CURRENT_TIMESTAMP WHERE user_key=? AND course_id=? AND version=? AND lesson_id=?').bind(score === 100 ? 1 : 0, ...keys),
      ]);
      const record = await db.prepare('SELECT * FROM learning_records WHERE user_key=? AND course_id=? AND version=? AND lesson_id=?').bind(...keys).first();
      return response({ score, feedback, record });
    }
    throw new HttpError(400, 'Acción desconocida.');
  } catch (error) { return apiError(error); }
}
