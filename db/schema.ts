import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

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
