import { sql } from "drizzle-orm";
import { integer, sqliteTable, text, primaryKey, index } from "drizzle-orm/sqlite-core";

export const learnerStates = sqliteTable("learner_states", {
  userKey: text("user_key").primaryKey(),
  state: text("state").notNull().default("{}"),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const practiceEntries = sqliteTable("practice_entries", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userKey: text("user_key").notNull(),
  module: integer("module").notNull(),
  instrument: text("instrument").notNull(),
  timeframe: text("timeframe").notNull(),
  direction: text("direction").notNull(),
  plannedRr: text("planned_rr").notNull(),
  resultR: text("result_r").notNull(),
  invalidationDefined: integer("invalidation_defined", {
    mode: "boolean",
  })
    .notNull()
    .default(true),
  notes: text("notes").notNull().default(""),
  screenshotKey: text("screenshot_key"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const labAttempts = sqliteTable("lab_attempts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userKey: text("user_key").notNull(),
  module: integer("module").notNull(),
  score: integer("score").notNull(),
  structureScore: integer("structure_score").notNull(),
  invalidationScore: integer("invalidation_score").notNull(),
  rr: text("rr").notNull(),
  stopPercent: text("stop_percent").notNull(),
  targetPercent: text("target_percent").notNull(),
  positionSize: text("position_size").notNull(),
  validGeometry: integer("valid_geometry", { mode: "boolean" })
    .notNull()
    .default(true),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const quizAnswers = sqliteTable("quiz_answers", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userKey: text("user_key").notNull(),
  attemptKey: text("attempt_key").notNull(),
  mode: text("mode").notNull(),
  module: integer("module").notNull(),
  questionId: text("question_id").notNull(),
  difficulty: text("difficulty").notNull(),
  selectedIndex: integer("selected_index").notNull(),
  correct: integer("correct", { mode: "boolean" }).notNull(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const lessonProgress = sqliteTable("lesson_progress", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userKey: text("user_key").notNull(),
  lessonId: text("lesson_id").notNull(),
  module: integer("module").notNull(),
  completed: integer("completed", { mode: "boolean" })
    .notNull()
    .default(false),
  studySeconds: integer("study_seconds").notNull().default(0),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

// New versioned records coexist with the v1 tables; no historical row is deleted.
export const learningRecords = sqliteTable('learning_records', {
  userKey: text('user_key').notNull(),
  courseId: text('course_id').notNull(),
  version: text('version').notNull(),
  lessonId: text('lesson_id').notNull(),
  draft: text('draft').notNull().default(''),
  revision: integer('revision').notNull().default(0),
  studied: integer('studied').notNull().default(0),
  practiced: integer('practiced').notNull().default(0),
  checkPassed: integer('check_passed').notNull().default(0),
  studySeconds: integer('study_seconds').notNull().default(0),
  updatedAt: text('updated_at').notNull().default(sql`CURRENT_TIMESTAMP`),
}, t => [primaryKey({ columns: [t.userKey, t.courseId, t.version, t.lessonId] })]);

export const learningAttempts = sqliteTable('learning_attempts', {
  id: text('id').primaryKey(),
  userKey: text('user_key').notNull(),
  version: text('version').notNull(),
  lessonId: text('lesson_id').notNull(),
  answers: text('answers').notNull(),
  score: integer('score').notNull(),
  createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
}, t => [index('learning_attempt_user').on(t.userKey, t.version)]);

export const caseAttempts = sqliteTable('case_attempts', {
  id: text('id').primaryKey(),
  userKey: text('user_key').notNull(),
  version: text('version').notNull(),
  caseId: text('case_id').notNull(),
  response: text('response').notNull(),
  result: text('result').notNull(),
  createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
}, t => [index('case_attempt_user').on(t.userKey, t.version)]);
