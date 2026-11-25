import { requireLearner, readJson, apiError, HttpError, learnerUploadPrefix } from "../../../lib/access.ts";
import { validateLegacyBody } from "../../../lib/legacy-validation.ts";
import { desc, eq } from "drizzle-orm";
import { getDb } from "../../../db/index.ts";
import {
  labAttempts,
  learnerStates,
  lessonProgress,
  practiceEntries,
  quizAnswers,
} from "../../../db/schema.ts";

export async function GET(request: Request) {
  try {
    const key = requireLearner(request);
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
    }, { headers: { "cache-control": "no-store" } });
  } catch (error) {
    return apiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const key = requireLearner(request);
    const raw = await readJson(request);
    validateLegacyBody(raw);
    const body = raw as {
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
      if (body.practice.screenshotKey && !body.practice.screenshotKey.startsWith(await learnerUploadPrefix(key))) throw new HttpError(403, "La captura no pertenece a tu cuenta.");
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

    return Response.json({ ok: true, practice }, { headers: { "cache-control": "no-store" } });
  } catch (error) {
    return apiError(error);
  }
}
