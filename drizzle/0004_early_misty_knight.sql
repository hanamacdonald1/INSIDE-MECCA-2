CREATE TABLE `audience_actions` (
	`id` text PRIMARY KEY NOT NULL,
	`signal` text NOT NULL,
	`interpretation` text NOT NULL,
	`evidence_strength` text DEFAULT 'hypothesis' NOT NULL,
	`proposed_action` text NOT NULL,
	`owner` text,
	`review_date` text,
	`status` text DEFAULT 'planned' NOT NULL,
	`result` text,
	`created_by_user_id` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_audience_actions_updated_at` ON `audience_actions` (`updated_at`);--> statement-breakpoint
ALTER TABLE `funnel_events` ADD `event_detail` text;--> statement-breakpoint
ALTER TABLE `funnel_events` ADD `content_assists` text;