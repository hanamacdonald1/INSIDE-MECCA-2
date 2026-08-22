CREATE TABLE `public_commentary` (
	`id` text PRIMARY KEY NOT NULL,
	`platform` text NOT NULL,
	`perspective` text NOT NULL,
	`source_url` text,
	`source_posted_at` text,
	`captured_at` integer NOT NULL,
	`raw_comment` text NOT NULL,
	`public_excerpt` text NOT NULL,
	`topics` text NOT NULL,
	`status` text DEFAULT 'draft' NOT NULL,
	`source_is_public` integer DEFAULT false NOT NULL,
	`identifiers_reviewed` integer DEFAULT false NOT NULL,
	`review_notes` text,
	`created_by_user_id` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`published_at` integer
);
--> statement-breakpoint
CREATE INDEX `idx_public_commentary_status_published` ON `public_commentary` (`status`,`published_at`);--> statement-breakpoint
CREATE INDEX `idx_public_commentary_platform` ON `public_commentary` (`platform`);