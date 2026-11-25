CREATE TABLE `lab_attempts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_key` text NOT NULL,
	`module` integer NOT NULL,
	`score` integer NOT NULL,
	`structure_score` integer NOT NULL,
	`invalidation_score` integer NOT NULL,
	`rr` text NOT NULL,
	`stop_percent` text NOT NULL,
	`target_percent` text NOT NULL,
	`position_size` text NOT NULL,
	`valid_geometry` integer DEFAULT true NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `lesson_progress` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_key` text NOT NULL,
	`lesson_id` text NOT NULL,
	`module` integer NOT NULL,
	`completed` integer DEFAULT false NOT NULL,
	`study_seconds` integer DEFAULT 0 NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `quiz_answers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_key` text NOT NULL,
	`attempt_key` text NOT NULL,
	`mode` text NOT NULL,
	`module` integer NOT NULL,
	`question_id` text NOT NULL,
	`difficulty` text NOT NULL,
	`selected_index` integer NOT NULL,
	`correct` integer NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
