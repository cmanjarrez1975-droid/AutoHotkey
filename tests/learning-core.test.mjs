import assert from "node:assert/strict";
import { stat, readFile } from "node:fs/promises";
import test from "node:test";

import {
  assessmentQuestions,
  classCatalog,
  modules,
  sourceRecords,
  triviaQuestions,
} from "../app/course-data.ts";
import {
  calculateRiskPlan,
  completionPercent,
  selectQuestionSession,
} from "../app/learning-utils.ts";
import { moduleCurriculum } from "../app/course-narrative.ts";
import { moduleMedia } from "../app/course-visuals.ts";
import { moduleVisuals } from "../app/official-course-visuals.ts";
import { POST as mentorPost } from "../app/api/mentor/route.ts";
import { buildAcademyLessons } from "../app/academy-lessons.ts";

test("calcula R/R y tamaño para largo y corto", () => {
  const long = calculateRiskPlan({
    entry: 100,
    stop: 95,
    target: 115,
    account: 10_000,
    riskPercent: 1,
    direction: "Largo",
  });
  assert.equal(long.valid, true);
  assert.equal(long.rr, 3);
  assert.equal(long.riskAmount, 100);
  assert.equal(long.positionSize, 20);

  const short = calculateRiskPlan({
    entry: 100,
    stop: 104,
    target: 92,
    account: 10_000,
    riskPercent: 0.5,
    direction: "Corto",
  });
  assert.equal(short.valid, true);
  assert.equal(short.rr, 2);
  assert.equal(short.positionSize, 12.5);
});

test("rechaza geometría incoherente de entrada, stop y objetivo", () => {
  const invalid = calculateRiskPlan({
    entry: 100,
    stop: 105,
    target: 110,
    account: 5_000,
    riskPercent: 1,
    direction: "Largo",
  });
  assert.equal(invalid.valid, false);
  assert.equal(invalid.rr, 0);
  assert.match(invalid.reason, /stop debe quedar bajo/i);
});

test("selecciona preguntas sin duplicados y respeta el módulo", () => {
  const bank = Array.from({ length: 12 }, (_, index) => ({
    id: `q-${index}`,
    module: index < 6 ? 1 : 2,
  }));
  const randomValues = [0.9, 0.1, 0.7, 0.2, 0.8, 0.3, 0.6, 0.4];
  let cursor = 0;
  const session = selectQuestionSession({
    bank,
    answeredIds: ["q-0", "q-1"],
    size: 4,
    module: 1,
    random: () => randomValues[cursor++ % randomValues.length],
  });
  assert.equal(session.length, 4);
  assert.equal(new Set(session.map((question) => question.id)).size, 4);
  assert.ok(session.every((question) => question.module === 1));
  assert.ok(session.every((question) => !["q-0", "q-1"].includes(question.id)));
});

test("el curso cubre 10 módulos y 26 fuentes individuales", () => {
  assert.equal(modules.length, 10);
  assert.equal(moduleCurriculum.length, 10);
  assert.equal(sourceRecords.length, 26);
  assert.equal(classCatalog.length, 38);
  assert.deepEqual(
    moduleCurriculum.map((item) => item.module),
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  );
});

test("cada módulo tiene al menos ocho trivias y nueve preguntas formales", () => {
  for (const courseModule of modules) {
    assert.ok(
      triviaQuestions.filter((question) => question.module === courseModule.id)
        .length >= 8,
      `M${courseModule.id} necesita al menos 8 trivias`,
    );
    assert.ok(
      assessmentQuestions.filter(
        (question) => question.module === courseModule.id,
      )
        .length >= 9,
      `M${courseModule.id} necesita al menos 9 preguntas formales`,
    );
  }
  assert.equal(
    new Set(triviaQuestions.map((question) => question.id)).size,
    triviaQuestions.length,
  );
  assert.equal(
    new Set(assessmentQuestions.map((question) => question.id)).size,
    assessmentQuestions.length,
  );
});

test("normaliza el porcentaje de avance", () => {
  assert.equal(completionPercent(0, 0), 0);
  assert.equal(completionPercent(5, 10), 50);
  assert.equal(completionPercent(14, 10), 100);
});

test("cada módulo usa referencias visuales aportadas y trazables", async () => {
  for (const courseModule of modules) {
    const visuals = moduleVisuals[courseModule.id] ?? [];
    assert.ok(visuals.length >= 3, `M${courseModule.id} necesita 3 referencias`);
    for (const visual of visuals) {
      assert.match(visual.source, /(diapositiva|p\.)/i);
      const file = new URL(`../public${visual.src}`, import.meta.url);
      const info = await stat(file);
      assert.ok(info.size > 10_000, `${visual.src} está incompleta`);
      assert.match(
        visual.src,
        /\/course-references\/(official\/|m(?:08|09|10)-)/,
        `${visual.src} no pertenece al nuevo conjunto oficial`,
      );
    }
  }
});

test("la explicación central avanza de fundamentos a dominio", () => {
  for (const courseModule of moduleCurriculum) {
    assert.equal(
      courseModule.sections.length,
      4,
      `M${courseModule.module} debe tener 4 niveles`,
    );
    for (const lesson of courseModule.sections) {
      assert.ok(
        lesson.paragraphs.length >= 3,
        `${lesson.title} necesita desarrollo, ejemplo y contraejemplo`,
      );
      assert.ok(lesson.source?.length > 30, `${lesson.title} necesita fuente`);
      assert.ok(lesson.bridge?.length > 20, `${lesson.title} necesita conexión`);
      assert.ok(
        (lesson.checks?.length ?? 0) >= 2,
        `${lesson.title} necesita control de comprensión`,
      );
    }
  }
});

test("cada módulo expone una ruta real de lecciones y clases reconstruidas", () => {
  const allLessonIds = [];
  for (const courseModule of moduleCurriculum) {
    const classes = classCatalog.filter(
      (item) => item.module === courseModule.module,
    );
    const lessons = buildAcademyLessons({
      module: courseModule.module,
      curriculum: courseModule,
      visuals: moduleVisuals[courseModule.module] ?? [],
      media: moduleMedia[courseModule.module] ?? [],
      classes,
    });
    assert.ok(
      lessons.length >= 8,
      `M${courseModule.module} necesita una ruta completa de lecciones`,
    );
    assert.ok(lessons.some((lesson) => lesson.group === "Aplicación"));
    assert.ok(lessons.some((lesson) => lesson.opensLab));
    for (const courseClass of classes) {
      assert.ok(
        lessons.some((lesson) => lesson.id === courseClass.id),
        `${courseClass.title} debe ser una lección navegable`,
      );
    }
    allLessonIds.push(...lessons.map((lesson) => lesson.id));
  }
  assert.equal(new Set(allLessonIds).size, allLessonIds.length);
});

test("la multimedia visible usa archivos originales con audio, no microvideos silenciosos", async () => {
  for (const items of Object.values(moduleMedia)) {
    for (const item of items) {
      assert.doesNotMatch(item.src, /\/modulo-\d{2}-/);
      assert.match(item.source, /\.(mp4|m4a)\.?$/i);
      const file = new URL(`../public${item.src}`, import.meta.url);
      const info = await stat(file);
      assert.ok(info.size > 1_000_000, `${item.src} está incompleto`);
    }
  }
});

test("la migración incluye intentos, respuestas y progreso de lecciones", async () => {
  const sql = await readFile(
    new URL("../drizzle/0001_misty_sumo.sql", import.meta.url),
    "utf8",
  );
  assert.match(sql, /CREATE TABLE `lab_attempts`/);
  assert.match(sql, /CREATE TABLE `quiz_answers`/);
  assert.match(sql, /CREATE TABLE `lesson_progress`/);
});

test("el paso 4 de análisis con IA permanece pendiente", async () => {
  const response = await mentorPost();
  assert.equal(response.status, 501);
  const body = await response.json();
  assert.equal(body.status, "pending");
});
