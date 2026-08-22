import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// Private research structure only. It is not exposed through a public route.
// Source documents and unnecessary identifying details must not be stored here.
export const submissions = sqliteTable("submissions", {
  id: text("id").primaryKey(), dateReceived: integer("date_received", { mode: "timestamp" }).notNull(),
  contactPermission: integer("contact_permission", { mode: "boolean" }).notNull().default(false),
  publicationPermission: integer("publication_permission", { mode: "boolean" }).notNull().default(false),
  interviewPermission: integer("interview_permission", { mode: "boolean" }).notNull().default(false),
  contributorStatus: text("contributor_status"), broadEmploymentPeriod: text("broad_employment_period"),
  broadRegion: text("broad_region"), broadRole: text("broad_role"), employmentStatus: text("employment_status"),
  knowledgeType: text("knowledge_type"), hearsayElements: text("hearsay_elements"), eventPeriod: text("event_period"),
  themes: text("themes", { mode: "json" }).$type<string[]>(), namesMentioned: text("names_mentioned", { mode: "json" }).$type<string[]>(),
  witnessesMentioned: text("witnesses_mentioned", { mode: "json" }).$type<string[]>(), internalReportingStatus: text("internal_reporting_status"),
  internalResponse: text("internal_response"), supportingRecords: text("supporting_records", { mode: "json" }).$type<string[]>(),
  documentsReceived: integer("documents_received", { mode: "boolean" }).notNull().default(false), corroborationStatus: text("corroboration_status"),
  similarAccountReferences: text("similar_account_references", { mode: "json" }).$type<string[]>(), contradictions: text("contradictions"),
  followUpQuestions: text("follow_up_questions"), identificationRisk: text("identification_risk"), legalReviewStatus: text("legal_review_status"),
  rightOfReplyStatus: text("right_of_reply_status"), publicationStatus: text("publication_status").notNull().default("not_assessed"),
  withdrawalRequested: integer("withdrawal_requested", { mode: "boolean" }).notNull().default(false), notes: text("notes"),
});

export const funnelEvents = sqliteTable("funnel_events", {
  id: text("id").primaryKey(),
  event: text("event").notNull(),
  eventDetail: text("event_detail"),
  contentAssists: text("content_assists", { mode: "json" }).$type<string[]>(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  device: text("device").notNull(),
  referrer: text("referrer"),
  landingPage: text("landing_page").notNull(),
  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),
}, (table) => [
  index("idx_funnel_events_created_at").on(table.createdAt),
  index("idx_funnel_events_event_device").on(table.event, table.device),
]);

export const audienceActions = sqliteTable("audience_actions", {
  id: text("id").primaryKey(),
  signal: text("signal").notNull(),
  interpretation: text("interpretation").notNull(),
  evidenceStrength: text("evidence_strength").notNull().default("hypothesis"),
  proposedAction: text("proposed_action").notNull(),
  owner: text("owner"),
  reviewDate: text("review_date"),
  status: text("status").notNull().default("planned"),
  result: text("result"),
  createdByUserId: text("created_by_user_id").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
}, (table) => [
  index("idx_audience_actions_updated_at").on(table.updatedAt),
]);

// Private editorial staging for publicly posted comments. Raw text and source
// locators are never selected by the public page. Only a separately reviewed,
// de-identified excerpt can be published.
export const publicCommentary = sqliteTable("public_commentary", {
  id: text("id").primaryKey(),
  platform: text("platform").notNull(),
  perspective: text("perspective").notNull(),
  sourceUrl: text("source_url"),
  sourcePostedAt: text("source_posted_at"),
  capturedAt: integer("captured_at", { mode: "timestamp" }).notNull(),
  rawComment: text("raw_comment").notNull(),
  publicExcerpt: text("public_excerpt").notNull(),
  topics: text("topics", { mode: "json" }).$type<string[]>().notNull(),
  status: text("status").notNull().default("draft"),
  sourceIsPublic: integer("source_is_public", { mode: "boolean" }).notNull().default(false),
  identifiersReviewed: integer("identifiers_reviewed", { mode: "boolean" }).notNull().default(false),
  reviewNotes: text("review_notes"),
  createdByUserId: text("created_by_user_id").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  publishedAt: integer("published_at", { mode: "timestamp" }),
}, (table) => [
  index("idx_public_commentary_status_published").on(table.status, table.publishedAt),
  index("idx_public_commentary_platform").on(table.platform),
]);
