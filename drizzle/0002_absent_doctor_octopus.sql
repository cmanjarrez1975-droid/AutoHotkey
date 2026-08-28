CREATE TABLE `case_attempts` (
	`id` text PRIMARY KEY NOT NULL,
	`user_key` text NOT NULL,
	`version` text NOT NULL,
	`case_id` text NOT NULL,
	`response` text NOT NULL,
	`result` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX `case_attempt_user` ON `case_attempts` (`user_key`,`version`);--> statement-breakpoint
CREATE TABLE `learning_attempts` (
	`id` text PRIMARY KEY NOT NULL,
	`user_key` text NOT NULL,
	`version` text NOT NULL,
	`lesson_id` text NOT NULL,
	`answers` text NOT NULL,
	`score` integer NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX `learning_attempt_user` ON `learning_attempts` (`user_key`,`version`);--> statement-breakpoint
CREATE TABLE `learning_records` (
	`user_key` text NOT NULL,
	`course_id` text NOT NULL,
	`version` text NOT NULL,
	`lesson_id` text NOT NULL,
	`draft` text DEFAULT '' NOT NULL,
	`revision` integer DEFAULT 0 NOT NULL,
	`studied` integer DEFAULT 0 NOT NULL,
	`practiced` integer DEFAULT 0 NOT NULL,
	`check_passed` integer DEFAULT 0 NOT NULL,
	`study_seconds` integer DEFAULT 0 NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	PRIMARY KEY(`user_key`, `course_id`, `version`, `lesson_id`)
);
