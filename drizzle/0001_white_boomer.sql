CREATE TABLE `funnel_events` (
	`id` text PRIMARY KEY NOT NULL,
	`event` text NOT NULL,
	`created_at` integer NOT NULL,
	`device` text NOT NULL,
	`referrer` text,
	`landing_page` text NOT NULL,
	`utm_source` text,
	`utm_medium` text,
	`utm_campaign` text
);
