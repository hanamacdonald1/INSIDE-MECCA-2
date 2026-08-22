import { desc, gte } from "drizzle-orm";
import { getDb } from "../../db";
import { audienceActions, funnelEvents } from "../../db/schema";

export type AudienceEvent = typeof funnelEvents.$inferSelect;
export type AudienceAction = typeof audienceActions.$inferSelect;

export async function fetchAudienceEvents(days: number): Promise<AudienceEvent[]> {
  const since = new Date();
  since.setUTCDate(since.getUTCDate() - days);
  return getDb().select().from(funnelEvents).where(gte(funnelEvents.createdAt, since)).orderBy(desc(funnelEvents.createdAt)).limit(50000);
}

export async function fetchAudienceActions(): Promise<AudienceAction[]> {
  return getDb().select().from(audienceActions).orderBy(desc(audienceActions.updatedAt)).limit(200);
}

