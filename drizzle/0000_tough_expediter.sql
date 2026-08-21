CREATE TABLE `learner_states` (
	`user_key` text PRIMARY KEY NOT NULL,
	`state` text DEFAULT '{}' NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `practice_entries` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_key` text NOT NULL,
	`module` integer NOT NULL,
	`instrument` text NOT NULL,
	`timeframe` text NOT NULL,
	`direction` text NOT NULL,
	`planned_rr` text NOT NULL,
	`result_r` text NOT NULL,
	`invalidation_defined` integer DEFAULT true NOT NULL,
	`notes` text DEFAULT '' NOT NULL,
	`screenshot_key` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
