import { desc, eq } from "drizzle-orm";
import { getDb } from "../../../db";
import {
  labAttempts,
  learnerStates,
  lessonProgress,
  practiceEntries,
  quizAnswers,
} from "../../../db/schema";

function userKey(request: Request) {
  return (
    request.headers.get("oai-authenticated-user-email") ??
    request.headers.get("x-forwarded-user") ??
    "owner"
  );
}

export async function GET(request: Request) {
  try {
    const key = userKey(request);
    const db = getDb();
    const rows = await db
      .select()
      .from(learnerStates)
      .where(eq(learnerStates.userKey, key))
      .limit(1);
    const practices = await db
      .select()
      .from(practiceEntries)
      .where(eq(practiceEntries.userKey, key))
      .orderBy(desc(practiceEntries.createdAt), desc(practiceEntries.id))
      .limit(100);
    const labs = await db
      .select()
      .from(labAttempts)
      .where(eq(labAttempts.userKey, key))
      .orderBy(desc(labAttempts.createdAt), desc(labAttempts.id))
      .limit(200);
    const answers = await db
      .select()
      .from(quizAnswers)
      .where(eq(quizAnswers.userKey, key))
      .orderBy(desc(quizAnswers.createdAt), desc(quizAnswers.id))
      .limit(500);
    const lessons = await db
      .select()
      .from(lessonProgress)
      .where(eq(lessonProgress.userKey, key))
      .orderBy(desc(lessonProgress.updatedAt))
      .limit(200);

    return Response.json({
      state: rows[0]?.state ? JSON.parse(rows[0].state) : {},
      practices,
      labs,
      answers,
      lessons,
    });
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error ? error.message : "No se pudo cargar el progreso.",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const key = userKey(request);
    const body = (await request.json()) as {
      state?: Record<string, unknown>;
      practice?: {
        module?: number;
        instrument?: string;
        timeframe?: string;
        direction?: string;
        plannedRr?: string;
        resultR?: string;
        invalidationDefined?: boolean;
        notes?: string;
        screenshotKey?: string | null;
      };
      labAttempt?: {
        module?: number;
        score?: number;
        structureScore?: number;
        invalidationScore?: number;
        rr?: number;
        stopPercent?: number;
        targetPercent?: number;
        positionSize?: number;
        validGeometry?: boolean;
      };
      quizAnswer?: {
        attemptKey?: string;
        mode?: string;
        module?: number;
        questionId?: string;
        difficulty?: string;
        selectedIndex?: number;
        correct?: boolean;
      };
      lesson?: {
        lessonId?: string;
        module?: number;
        completed?: boolean;
        studySeconds?: number;
      };
    };
    const db = getDb();

    if (body.state) {
      const existingStates = await db
        .select()
        .from(learnerStates)
        .where(eq(learnerStates.userKey, key))
        .limit(1);
      const previousState = existingStates[0]?.state
        ? (JSON.parse(existingStates[0].state) as Record<string, unknown>)
        : {};
      const mergedState = { ...previousState, ...body.state };
      await db
        .insert(learnerStates)
        .values({
          userKey: key,
          state: JSON.stringify(mergedState),
          updatedAt: new Date().toISOString(),
        })
        .onConflictDoUpdate({
          target: learnerStates.userKey,
          set: {
            state: JSON.stringify(mergedState),
            updatedAt: new Date().toISOString(),
          },
        });
    }

    let practice = null;
    if (body.practice) {
      const values = {
        userKey: key,
        module: body.practice.module ?? 1,
        instrument: body.practice.instrument?.trim() || "BTCUSDT",
        timeframe: body.practice.timeframe?.trim() || "15m",
        direction: body.practice.direction?.trim() || "Largo",
        plannedRr: body.practice.plannedRr?.trim() || "0",
        resultR: body.practice.resultR?.trim() || "0",
        invalidationDefined: body.practice.invalidationDefined ?? true,
        notes: body.practice.notes?.trim() || "",
        screenshotKey: body.practice.screenshotKey ?? null,
      };
      const [created] = await db
        .insert(practiceEntries)
        .values(values)
        .returning();
      practice = created;
    }

    let labAttempt = null;
    if (body.labAttempt) {
      const [created] = await db
        .insert(labAttempts)
        .values({
          userKey: key,
          module: body.labAttempt.module ?? 1,
          score: Math.max(0, Math.min(100, body.labAttempt.score ?? 0)),
          structureScore: Math.max(
            0,
            Math.min(100, body.labAttempt.structureScore ?? 0),
          ),
          invalidationScore: Math.max(
            0,
            Math.min(100, body.labAttempt.invalidationScore ?? 0),
          ),
          rr: String(body.labAttempt.rr ?? 0),
          stopPercent: String(body.labAttempt.stopPercent ?? 0),
          targetPercent: String(body.labAttempt.targetPercent ?? 0),
          positionSize: String(body.labAttempt.positionSize ?? 0),
          validGeometry: body.labAttempt.validGeometry ?? false,
        })
        .returning();
      labAttempt = created;
    }

    let quizAnswer = null;
    if (body.quizAnswer) {
      const [created] = await db
        .insert(quizAnswers)
        .values({
          userKey: key,
          attemptKey:
            body.quizAnswer.attemptKey?.trim() || crypto.randomUUID(),
          mode: body.quizAnswer.mode?.trim() || "trivia",
          module: body.quizAnswer.module ?? 1,
          questionId: body.quizAnswer.questionId?.trim() || "unknown",
          difficulty: body.quizAnswer.difficulty?.trim() || "Inicial",
          selectedIndex: body.quizAnswer.selectedIndex ?? -1,
          correct: body.quizAnswer.correct ?? false,
        })
        .returning();
      quizAnswer = created;
    }

    let lesson = null;
    if (body.lesson?.lessonId) {
      const existing = await db
        .select()
        .from(lessonProgress)
        .where(eq(lessonProgress.userKey, key));
      const current = existing.find(
        (item) => item.lessonId === body.lesson?.lessonId,
      );
      if (current) {
        const [updated] = await db
          .update(lessonProgress)
          .set({
            completed: body.lesson.completed ?? current.completed,
            studySeconds:
              current.studySeconds + Math.max(0, body.lesson.studySeconds ?? 0),
            updatedAt: new Date().toISOString(),
          })
          .where(eq(lessonProgress.id, current.id))
          .returning();
        lesson = updated;
      } else {
        const [created] = await db
          .insert(lessonProgress)
          .values({
            userKey: key,
            lessonId: body.lesson.lessonId,
            module: body.lesson.module ?? 1,
            completed: body.lesson.completed ?? false,
            studySeconds: Math.max(0, body.lesson.studySeconds ?? 0),
            updatedAt: new Date().toISOString(),
          })
          .returning();
        lesson = created;
      }
    }

    return Response.json({
      ok: true,
      practice,
      labAttempt,
      quizAnswer,
      lesson,
    });
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error ? error.message : "No se pudo guardar el progreso.",
      },
      { status: 500 },
    );
  }
}
