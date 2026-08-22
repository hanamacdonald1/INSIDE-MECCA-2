import { funnelEvents } from "../../../db/schema";
import { getDb } from "../../../db";
import { lt } from "drizzle-orm";
import { analyticsEventDetails, analyticsEvents, contentAssistValues, type AnalyticsEvent, type ContentAssist } from "../../audience-insight-model";

const allowedEvents = new Set<string>(analyticsEvents);

function clean(value: unknown, max = 160) {
  return typeof value === "string" && value ? value.slice(0, max) : null;
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, unknown>;
    const event = String(body.event);
    if (!allowedEvents.has(event)) {
      return Response.json({ error: "Unknown analytics event." }, { status: 400 });
    }
    const eventDetail = clean(body.eventDetail, 64);
    const allowedDetails = analyticsEventDetails[event as AnalyticsEvent];
    if (eventDetail && (!allowedDetails || !allowedDetails.includes(eventDetail))) {
      return Response.json({ error: "Unknown analytics detail." }, { status: 400 });
    }
    const contentAssists = Array.isArray(body.contentAssists)
      ? Array.from(new Set(body.contentAssists
        .filter((value): value is ContentAssist => typeof value === "string" && contentAssistValues.includes(value as ContentAssist))))
      : [];

    const db = getDb();
    const retentionCutoff = new Date();
    retentionCutoff.setUTCFullYear(retentionCutoff.getUTCFullYear() - 1);
    await db.delete(funnelEvents).where(lt(funnelEvents.createdAt, retentionCutoff));
    await db.insert(funnelEvents).values({
      id: crypto.randomUUID(),
      event,
      eventDetail,
      contentAssists: contentAssists.length ? contentAssists : null,
      createdAt: new Date(),
      device: ["mobile", "tablet", "desktop"].includes(String(body.device)) ? String(body.device) : "unknown",
      referrer: clean(body.referrer),
      landingPage: clean(body.landingPage, 240) || "/",
      utmSource: clean(body.utmSource),
      utmMedium: clean(body.utmMedium),
      utmCampaign: clean(body.utmCampaign),
    });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Analytics event was not recorded." }, { status: 400 });
  }
}
