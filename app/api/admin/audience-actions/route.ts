import { eq } from "drizzle-orm";
import { getDb } from "../../../../db";
import { audienceActions } from "../../../../db/schema";
import { getSubmissionsApiAdmin } from "../../../submissions/auth";

const statuses = new Set(["planned", "testing", "review_due", "complete", "held"]);
const strengths = new Set(["hypothesis", "directional", "repeated", "supported"]);

function clean(value: FormDataEntryValue | null, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function redirectToDashboard(request: Request, days: string, error?: string) {
  const url = new URL("/audience-insights", request.url);
  if (["30", "90", "365"].includes(days)) url.searchParams.set("days", days);
  if (error) url.searchParams.set("error", error);
  return Response.redirect(url, 303);
}

export async function POST(request: Request) {
  const user = await getSubmissionsApiAdmin();
  if (!user) return Response.json({ error: "Not authorised." }, { status: 403 });
  const form = await request.formData();
  const intent = clean(form.get("intent"), 20);
  const days = clean(form.get("days"), 3);
  const db = getDb();

  if (intent === "create") {
    const signal = clean(form.get("signal"), 1000);
    const interpretation = clean(form.get("interpretation"), 2000);
    const proposedAction = clean(form.get("proposed_action"), 2000);
    const evidenceStrength = clean(form.get("evidence_strength"), 30);
    if (!signal || !interpretation || !proposedAction || !strengths.has(evidenceStrength)) return redirectToDashboard(request, days, "Complete the signal, interpretation, action and evidence strength.");
    const now = new Date();
    await db.insert(audienceActions).values({
      id: crypto.randomUUID(),
      signal,
      interpretation,
      proposedAction,
      evidenceStrength,
      owner: clean(form.get("owner"), 120) || null,
      reviewDate: clean(form.get("review_date"), 10) || null,
      status: "planned",
      result: null,
      createdByUserId: user.userId,
      createdAt: now,
      updatedAt: now,
    });
    return redirectToDashboard(request, days);
  }

  if (intent === "update") {
    const id = clean(form.get("id"), 80);
    const status = clean(form.get("status"), 30);
    if (!id || !statuses.has(status)) return redirectToDashboard(request, days, "The action status could not be updated.");
    await db.update(audienceActions).set({
      status,
      owner: clean(form.get("owner"), 120) || null,
      reviewDate: clean(form.get("review_date"), 10) || null,
      result: clean(form.get("result"), 3000) || null,
      updatedAt: new Date(),
    }).where(eq(audienceActions.id, id));
    return redirectToDashboard(request, days);
  }

  return redirectToDashboard(request, days, "Unknown action request.");
}
