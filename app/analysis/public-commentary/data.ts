import { and, desc, eq } from "drizzle-orm";
import { getDb } from "../../../db";
import { publicCommentary } from "../../../db/schema";
import { sanitizePublicExcerpt } from "./safety";

export { sanitizePublicExcerpt } from "./safety";

export const commentaryPlatforms = ["TikTok", "Reddit", "SEEK", "Indeed", "Glassdoor", "Instagram", "Facebook", "Other"] as const;
export const commentaryPerspectives = ["positive", "neutral", "mixed", "critical"] as const;
export const commentaryStatuses = ["draft", "published", "removed"] as const;
export const commentaryTags = [
  "Bullying & harassment",
  "Management & leadership",
  "Psychological safety",
  "Workload & staffing",
  "Training & development",
  "Pay & benefits",
  "Career progression",
  "Inclusion & accessibility",
  "Team culture",
  "Work-life balance",
] as const;

export type CommentaryPlatform = typeof commentaryPlatforms[number];
export type CommentaryPerspective = typeof commentaryPerspectives[number];
export type CommentaryStatus = typeof commentaryStatuses[number];
export type CommentaryTag = typeof commentaryTags[number];
export type CommentaryRecord = typeof publicCommentary.$inferSelect;

export type PublishedCommentary = {
  id: string;
  platform: string;
  perspective: string;
  sourcePostedAt: string | null;
  capturedAt: Date;
  publicExcerpt: string;
  topics: string[];
  publishedAt: Date | null;
};

export class CommentaryConfigurationError extends Error {}
export class CommentaryValidationError extends Error {}

function database() {
  try {
    return getDb();
  } catch {
    throw new CommentaryConfigurationError("Public commentary storage is not available.");
  }
}

const commentaryTagAliases: Record<string, CommentaryTag> = {
  "bullying": "Bullying & harassment",
  "harassment": "Bullying & harassment",
  "bullying & harassment": "Bullying & harassment",
  "picked on": "Bullying & harassment",
  "management": "Management & leadership",
  "leadership": "Management & leadership",
  "management support": "Management & leadership",
  "store support": "Management & leadership",
  "management & leadership": "Management & leadership",
  "psychological safety": "Psychological safety",
  "mental health": "Psychological safety",
  "workload": "Workload & staffing",
  "staffing": "Workload & staffing",
  "kpis": "Workload & staffing",
  "workload & staffing": "Workload & staffing",
  "training": "Training & development",
  "onboarding": "Training & development",
  "training & development": "Training & development",
  "pay": "Pay & benefits",
  "employee benefits": "Pay & benefits",
  "pay & benefits": "Pay & benefits",
  "career growth": "Career progression",
  "career progression": "Career progression",
  "disability inclusion": "Inclusion & accessibility",
  "diversity": "Inclusion & accessibility",
  "inclusion": "Inclusion & accessibility",
  "inclusion & accessibility": "Inclusion & accessibility",
  "workplace culture": "Team culture",
  "employee experience": "Team culture",
  "workplace experience": "Team culture",
  "store differences": "Team culture",
  "team culture": "Team culture",
  "work-life balance": "Work-life balance",
  "breaks": "Work-life balance",
};

export function normalizeCommentaryTopics(topics: string[]): CommentaryTag[] {
  const selected = new Set<CommentaryTag>();
  for (const topic of topics) {
    const normalized = commentaryTagAliases[topic.trim().toLowerCase()];
    if (normalized) selected.add(normalized);
  }
  return commentaryTags.filter((tag) => selected.has(tag));
}

export function parseTopics(value: string): CommentaryTag[] {
  return normalizeCommentaryTopics(value.split(","));
}

export async function fetchPublishedCommentary(): Promise<PublishedCommentary[]> {
  try {
    const rows = await database()
      .select({
        id: publicCommentary.id,
        platform: publicCommentary.platform,
        perspective: publicCommentary.perspective,
        sourcePostedAt: publicCommentary.sourcePostedAt,
        capturedAt: publicCommentary.capturedAt,
        publicExcerpt: publicCommentary.publicExcerpt,
        topics: publicCommentary.topics,
        publishedAt: publicCommentary.publishedAt,
      })
      .from(publicCommentary)
      .where(and(
        eq(publicCommentary.status, "published"),
        eq(publicCommentary.sourceIsPublic, true),
        eq(publicCommentary.identifiersReviewed, true),
      ))
      .orderBy(desc(publicCommentary.publishedAt), desc(publicCommentary.capturedAt))
      .limit(200);

    return (rows as PublishedCommentary[]).map((row) => ({
      ...row,
      publicExcerpt: sanitizePublicExcerpt(row.publicExcerpt),
      topics: normalizeCommentaryTopics(row.topics || []),
    }));
  } catch (error) {
    if (error instanceof CommentaryConfigurationError) throw error;
    throw new CommentaryConfigurationError("Public commentary storage is not ready.");
  }
}

export async function fetchCommentaryRecords(): Promise<CommentaryRecord[]> {
  try {
    return await database().select().from(publicCommentary).orderBy(desc(publicCommentary.updatedAt)).limit(500);
  } catch (error) {
    if (error instanceof CommentaryConfigurationError) throw error;
    throw new CommentaryConfigurationError("Public commentary storage is not ready.");
  }
}

export async function fetchCommentaryRecord(id: string): Promise<CommentaryRecord | null> {
  const rows = await database().select().from(publicCommentary).where(eq(publicCommentary.id, id)).limit(1);
  return rows[0] || null;
}

export async function createCommentaryRecord(input: {
  platform: CommentaryPlatform;
  perspective: CommentaryPerspective;
  sourceUrl: string | null;
  sourcePostedAt: string | null;
  rawComment: string;
  topics: string[];
  sourceIsPublic: boolean;
  createdByUserId: string;
}): Promise<string> {
  if (!input.sourceIsPublic) throw new CommentaryValidationError("Only comments originally posted in a publicly visible place can be saved here.");
  const rawComment = input.rawComment.trim().slice(0, 10000);
  if (rawComment.length < 2) throw new CommentaryValidationError("Paste the public comment before saving.");
  const id = crypto.randomUUID();
  const now = new Date();
  await database().insert(publicCommentary).values({
    id,
    platform: input.platform,
    perspective: input.perspective,
    sourceUrl: input.sourceUrl,
    sourcePostedAt: input.sourcePostedAt,
    capturedAt: now,
    rawComment,
    publicExcerpt: sanitizePublicExcerpt(rawComment),
    topics: input.topics,
    status: "draft",
    sourceIsPublic: input.sourceIsPublic,
    identifiersReviewed: false,
    createdByUserId: input.createdByUserId,
    createdAt: now,
    updatedAt: now,
  });
  return id;
}

export async function updateCommentaryRecord(id: string, input: {
  platform: CommentaryPlatform;
  perspective: CommentaryPerspective;
  sourceUrl: string | null;
  sourcePostedAt: string | null;
  publicExcerpt: string;
  topics: string[];
  status: CommentaryStatus;
  sourceIsPublic: boolean;
  identifiersReviewed: boolean;
  reviewNotes: string | null;
}): Promise<void> {
  const existing = await fetchCommentaryRecord(id);
  if (!existing) throw new CommentaryValidationError("Commentary record not found.");
  const publicExcerpt = sanitizePublicExcerpt(input.publicExcerpt);
  if (input.status === "published") {
    if (!input.sourceIsPublic) throw new CommentaryValidationError("Only comments originally posted publicly can be published.");
    if (!input.identifiersReviewed) throw new CommentaryValidationError("Confirm that every identifying detail has been removed before publishing.");
    if (publicExcerpt.length < 2) throw new CommentaryValidationError("A de-identified public excerpt is required.");
  }
  const now = new Date();
  await database().update(publicCommentary).set({
    platform: input.platform,
    perspective: input.perspective,
    sourceUrl: input.sourceUrl,
    sourcePostedAt: input.sourcePostedAt,
    publicExcerpt,
    topics: input.topics,
    status: input.status,
    sourceIsPublic: input.sourceIsPublic,
    identifiersReviewed: input.identifiersReviewed,
    reviewNotes: input.reviewNotes,
    updatedAt: now,
    publishedAt: input.status === "published" ? existing.publishedAt || now : existing.publishedAt,
  }).where(eq(publicCommentary.id, id));
}

export function validSourceUrl(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  try {
    const url = new URL(trimmed);
    if (url.protocol !== "https:" && url.protocol !== "http:") throw new Error();
    return url.toString().slice(0, 2000);
  } catch {
    throw new CommentaryValidationError("Enter a valid public source link or leave it blank.");
  }
}
