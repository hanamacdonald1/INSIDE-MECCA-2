import { getSubmissionsApiAdmin } from "../../../../submissions/auth";
import { submissionStatuses, updateSubmission, verificationStatuses } from "../../../../submissions/data";

export async function POST(request: Request) {
  const user = await getSubmissionsApiAdmin();
  if (!user) return Response.json({ error: "Not authorised" }, { status: 403 });

  const form = await request.formData();
  const id = Number(form.get("id"));
  const status = String(form.get("status") || "");
  const verificationStatus = String(form.get("verification_status") || "");
  if (!Number.isInteger(id) || id < 1 || !submissionStatuses.includes(status as typeof submissionStatuses[number]) || !verificationStatuses.includes(verificationStatus as typeof verificationStatuses[number])) {
    return Response.json({ error: "Invalid review update" }, { status: 400 });
  }

  await updateSubmission(id, {
    status: status as typeof submissionStatuses[number],
    verification_status: verificationStatus,
    assigned_reviewer: String(form.get("assigned_reviewer") || "").trim().slice(0, 250) || null,
    follow_up_required: form.get("follow_up_required") === "on",
    risk_or_safeguarding_flag: form.get("risk_or_safeguarding_flag") === "on",
    internal_notes: String(form.get("internal_notes") || "").trim().slice(0, 20000) || null,
  });
  return Response.redirect(new URL(`/submissions/${id}`, request.url), 303);
}
