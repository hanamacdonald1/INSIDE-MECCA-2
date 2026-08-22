import { getSubmissionsApiAdmin } from "../../../../submissions/auth";
import { fetchSubmissions, type SubmissionRecord } from "../../../../submissions/data";

export async function GET(request: Request) {
  const user = await getSubmissionsApiAdmin();
  if (!user) return Response.json({ error: "Not authorised" }, { status: 403 });

  const redacted = new URL(request.url).searchParams.get("redacted") === "1";
  const records = await fetchSubmissions();
  const columns = redacted ? redactedColumns : fullColumns;
  const rows = [columns.map(([heading]) => heading), ...records.map((record) => columns.map(([, value]) => value(record)))];
  const csv = rows.map((row) => row.map(csvCell).join(",")).join("\r\n");
  const date = new Date().toISOString().slice(0, 10);
  const name = redacted ? `inside-mecca-submissions-redacted-${date}.csv` : `inside-mecca-submissions-full-${date}.csv`;
  return new Response(csv, { headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": `attachment; filename="${name}"`, "Cache-Control": "no-store" } });
}

type Column = [string, (record: SubmissionRecord) => unknown];
const analysisColumns: Column[] = [
  ["status", (r) => r.status], ["identity_preference", (r) => r.identity_preference],
  ["primary_knowledge_basis", (r) => r.primary_knowledge_basis], ["connection_to_mecca", (r) => r.connection_to_mecca],
  ["employment_period", (r) => r.employment_period], ["region", (r) => r.region], ["workplace_type", (r) => r.workplace_type],
  ["broad_role_category", (r) => r.broad_role_category], ["supporting_information", (r) => r.supporting_information.join(" | ")],
  ["themes", (r) => r.themes.join(" | ")], ["evidence_provided", (r) => r.evidence_provided], ["verification_status", (r) => r.verification_status],
  ["follow_up_required", (r) => r.follow_up_required], ["risk_or_safeguarding_flag", (r) => r.risk_or_safeguarding_flag],
];
const redactedColumns: Column[] = [
  ["received_date", (r) => r.received_at.slice(0, 10)], ["status", (r) => r.status],
  ["identity_preference", (r) => r.identity_preference], ["primary_knowledge_basis", (r) => r.primary_knowledge_basis],
  ["connection_to_mecca", (r) => r.connection_to_mecca], ["workplace_type", (r) => r.workplace_type],
  ["supporting_information", (r) => r.supporting_information.join(" | ")], ["themes", (r) => r.themes.join(" | ")],
  ["evidence_provided", (r) => r.evidence_provided], ["verification_status", (r) => r.verification_status],
  ["follow_up_required", (r) => r.follow_up_required], ["risk_or_safeguarding_flag", (r) => r.risk_or_safeguarding_flag],
];
const fullColumns: Column[] = [
  ["id", (r) => r.id], ["submission_ref", (r) => r.submission_ref], ["received_at", (r) => r.received_at], ...analysisColumns,
  ["preferred_name_or_pseudonym", (r) => r.preferred_name_or_pseudonym],
  ["account_text", (r) => r.account_text], ["happened_when", (r) => r.happened_when],
  ["happened_where", (r) => r.happened_where], ["role_at_time", (r) => r.role_at_time], ["direct_witnesses", (r) => r.direct_witnesses],
  ["internal_report_and_response", (r) => r.internal_report_and_response], ["repeated_or_affected_others", (r) => r.repeated_or_affected_others],
  ["uncertainties", (r) => r.uncertainties], ["hearsay_details", (r) => r.hearsay_details], ["contact_email", (r) => r.contact_email],
  ["contact_preferences", (r) => r.contact_preferences.join(" | ")], ["consent_confirmations", (r) => r.consent_confirmations.join(" | ")],
  ["consent_version", (r) => r.consent_version], ["publication_permission", (r) => r.publication_permission],
  ["email_delivery_status", (r) => r.email_delivery_status], ["email_attempted_at", (r) => r.email_attempted_at],
  ["email_delivered_at", (r) => r.email_delivered_at], ["email_provider_message_id", (r) => r.email_provider_message_id],
  ["email_delivery_error_code", (r) => r.email_delivery_error_code],
  ["assigned_reviewer", (r) => r.assigned_reviewer], ["internal_notes", (r) => r.internal_notes], ["source", (r) => r.source],
  ["user_agent", (r) => r.user_agent],
];

function csvCell(value: unknown) {
  const text = value == null ? "" : String(value);
  return `"${text.replaceAll('"', '""')}"`;
}
