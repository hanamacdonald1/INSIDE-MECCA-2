import { getSubmissionsApiAdmin } from "../../../submissions/auth";
import {
  CommentaryValidationError,
  commentaryPerspectives,
  commentaryPlatforms,
  commentaryStatuses,
  createCommentaryRecord,
  parseTopics,
  updateCommentaryRecord,
  validSourceUrl,
} from "../../../analysis/public-commentary/data";

export async function POST(request: Request) {
  const user = await getSubmissionsApiAdmin();
  if (!user) return Response.json({ error: "Not authorised" }, { status: 403 });
  if (!sameOrigin(request)) return Response.json({ error: "Invalid request origin" }, { status: 403 });

  const form = await request.formData();
  const intent = String(form.get("intent") || "");
  try {
    if (intent === "create") {
      const platform = String(form.get("platform") || "");
      const perspective = String(form.get("perspective") || "");
      if (!commentaryPlatforms.includes(platform as typeof commentaryPlatforms[number]) || !commentaryPerspectives.includes(perspective as typeof commentaryPerspectives[number])) throw new CommentaryValidationError("Choose a valid platform and viewpoint.");
      const id = await createCommentaryRecord({
        platform: platform as typeof commentaryPlatforms[number],
        perspective: perspective as typeof commentaryPerspectives[number],
        sourceUrl: validSourceUrl(String(form.get("source_url") || "")),
        sourcePostedAt: validDate(String(form.get("source_posted_at") || "")),
        rawComment: String(form.get("raw_comment") || ""),
        topics: selectedTopics(form),
        sourceIsPublic: form.get("source_is_public") === "on",
        createdByUserId: user.userId,
      });
      return Response.redirect(new URL(`/commentary-admin/${id}`, request.url), 303);
    }

    if (intent === "update") {
      const id = String(form.get("id") || "");
      const platform = String(form.get("platform") || "");
      const perspective = String(form.get("perspective") || "");
      const status = String(form.get("status") || "");
      if (!id || !commentaryPlatforms.includes(platform as typeof commentaryPlatforms[number]) || !commentaryPerspectives.includes(perspective as typeof commentaryPerspectives[number]) || !commentaryStatuses.includes(status as typeof commentaryStatuses[number])) throw new CommentaryValidationError("Choose valid review settings.");
      await updateCommentaryRecord(id, {
        platform: platform as typeof commentaryPlatforms[number],
        perspective: perspective as typeof commentaryPerspectives[number],
        sourceUrl: validSourceUrl(String(form.get("source_url") || "")),
        sourcePostedAt: validDate(String(form.get("source_posted_at") || "")),
        publicExcerpt: String(form.get("public_excerpt") || ""),
        topics: selectedTopics(form),
        status: status as typeof commentaryStatuses[number],
        sourceIsPublic: form.get("source_is_public") === "on",
        identifiersReviewed: form.get("identifiers_reviewed") === "on",
        reviewNotes: String(form.get("review_notes") || "").trim().slice(0, 5000) || null,
      });
      return Response.redirect(new URL(`/commentary-admin/${id}`, request.url), 303);
    }
    throw new CommentaryValidationError("Unknown commentary action.");
  } catch (error) {
    const message = error instanceof CommentaryValidationError ? error.message : "The commentary record could not be saved.";
    const destination = intent === "update" && form.get("id") ? `/commentary-admin/${encodeURIComponent(String(form.get("id")))}` : "/commentary-admin";
    return Response.redirect(new URL(`${destination}?error=${encodeURIComponent(message)}`, request.url), 303);
  }
}

function selectedTopics(form: FormData) {
  const checked = form.getAll("tags").map(String);
  return parseTopics(checked.length > 0 ? checked.join(",") : String(form.get("topics") || ""));
}

function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  return !origin || origin === new URL(request.url).origin;
}

function validDate(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(trimmed) || Number.isNaN(new Date(`${trimmed}T00:00:00Z`).getTime())) throw new CommentaryValidationError("Enter a valid original posting date or leave it blank.");
  return trimmed;
}
