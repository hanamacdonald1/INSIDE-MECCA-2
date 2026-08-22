CREATE INDEX `idx_funnel_events_created_at` ON `funnel_events` (`created_at`);--> statement-breakpoint
CREATE INDEX `idx_funnel_events_event_device` ON `funnel_events` (`event`,`device`);