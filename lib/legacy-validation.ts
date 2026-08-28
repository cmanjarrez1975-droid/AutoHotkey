import { HttpError } from './access.ts';
export function validateLegacyBody(body: Record<string, unknown>) {
  if (body.lesson || body.labAttempt || body.quizAnswer) throw new HttpError(409, 'Esta pantalla pertenece al curso anterior. Recarga para usar la evaluación versionada. El historial se conserva.');
  if (body.state) {
    if (typeof body.state !== 'object' || Array.isArray(body.state)) throw new HttpError(400, 'Estado inválido.');
    const allowed = new Set(['lastModule','lastLessonId','lastSection']);
    if (Object.keys(body.state).some(key => !allowed.has(key))) throw new HttpError(400, 'Campo de estado no permitido.');
    const state = body.state as Record<string, unknown>;
    if (state.lastModule !== undefined && (!Number.isInteger(state.lastModule) || Number(state.lastModule)<1 || Number(state.lastModule)>10)) throw new HttpError(400, 'Módulo inválido.');
    for (const key of ['lastLessonId','lastSection']) if (state[key] !== undefined && (typeof state[key] !== 'string' || state[key].length>120)) throw new HttpError(400, 'Ubicación inválida.');
  }
  if (body.practice) {
    if (typeof body.practice !== 'object' || Array.isArray(body.practice)) throw new HttpError(400, 'Práctica inválida.');
    const practice = body.practice as Record<string, unknown>;
    for (const [name, max] of [['instrument',80],['timeframe',30],['notes',15000]] as const) {
      if (typeof practice[name] !== 'string' || !practice[name].trim() || practice[name].length > max) throw new HttpError(400, `Campo ${name} inválido.`);
    }
    if (!Number.isInteger(practice.module) || Number(practice.module)<1 || Number(practice.module)>10) throw new HttpError(400,'Módulo inválido.');
    if (!['Largo','Corto','Sin operación'].includes(String(practice.direction))) throw new HttpError(400,'Dirección inválida.');
    for (const name of ['plannedRr','resultR']) {
      if (typeof practice[name] !== 'string' || !practice[name].trim() || !Number.isFinite(Number(practice[name])) || Math.abs(Number(practice[name]))>1000) throw new HttpError(400,`Número inválido: ${name}.`);
    }
    if (Number(practice.plannedRr)<0) throw new HttpError(400,'El R/R planificado no puede ser negativo.');
    if ((practice.notes as string).trim().length<20) throw new HttpError(400,'Explica tu decisión en al menos 20 caracteres.');
    if (practice.direction==='Sin operación' && Number(practice.resultR)!==0) throw new HttpError(400,'Una abstención no tiene resultado monetario.');
    if (typeof practice.invalidationDefined!=='boolean') throw new HttpError(400,'Falta estado de invalidación.');
    if (practice.screenshotKey !== undefined && practice.screenshotKey !== null && (typeof practice.screenshotKey!=='string' || practice.screenshotKey.length>300)) throw new HttpError(400,'Captura inválida.');
  }
  if (!body.state && !body.practice) throw new HttpError(400,'No hay datos para guardar.');
}
