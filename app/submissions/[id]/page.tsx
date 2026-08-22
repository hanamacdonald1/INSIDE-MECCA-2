import Link from "next/link";
import { AccessDenied, AdminShell, ConfigurationPending, StatusBadge } from "../admin-shell";
import { requireSubmissionsViewer } from "../auth";
import { fetchSubmission, SubmissionsConfigurationError, submissionStatuses, verificationStatuses } from "../data";

export const dynamic = "force-dynamic";

export default function SubmissionPage({ params }: { params: Promise<{ id: string }> }) {
  return <SubmissionDetail params={params} />;
}

async function SubmissionDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id: rawId } = await params;
  const id = Number(rawId);
  const returnTo = Number.isInteger(id) && id > 0 ? `/submissions/${id}` : "/submissions";
  const { user, allowed } = await requireSubmissionsViewer(returnTo);
  if (!allowed) return <AccessDenied user={user} />;
  if (!Number.isInteger(id) || id < 1) return <AdminShell user={user}><section className="sd-message inline"><h1>Submission not found.</h1><Link href="/submissions">Return to submissions</Link></section></AdminShell>;

  let record;
  try {
    record = await fetchSubmission(id);
  } catch (error) {
    if (error instanceof SubmissionsConfigurationError) return <AdminShell user={user}><ConfigurationPending /></AdminShell>;
    throw error;
  }
  if (!record) return <AdminShell user={user}><section className="sd-message inline"><h1>Submission not found.</h1><Link href="/submissions">Return to submissions</Link></section></AdminShell>;

  return <AdminShell user={user}>
    <section className="sd-detail-head"><div><Link href="/submissions">Back to submissions</Link><p className="sd-kicker">Private reference</p><h1>{record.submission_ref}</h1></div><StatusBadge value={record.status} /></section>
    <section className="sd-detail-grid">
      <article className="sd-panel sd-account"><p className="sd-kicker">Contributor account</p><h2>What happened</h2><p className="sd-long-answer">{record.account_text}</p></article>
      <article className="sd-panel"><p className="sd-kicker">Contact and consent</p><h2>Contributor choices</h2><Answer label="Contact email" value={record.contact_email} sensitive />
        <Answer label="Identity preference" value={structuredValue(record.identity_preference, record.consent_version)} />
        <Answer label="Preferred name or pseudonym" value={structuredValue(record.preferred_name_or_pseudonym, record.consent_version)} sensitive />
        <Answer label="Primary knowledge basis" value={structuredValue(record.primary_knowledge_basis, record.consent_version)} />
        <ListAnswer label="Contact preferences" values={record.contact_preferences} />
        <Answer label="Consent confirmations" value={`${record.consent_confirmations.length} recorded`} />
        <Answer label="Consent version" value={record.consent_version} />
        <Answer label="Publication permission" value={record.publication_permission ? "Granted" : "Not granted"} />
      </article>
      <article className="sd-panel"><p className="sd-kicker">Employment context</p><h2>Connection to MECCA</h2><Answer label="Connection" value={record.connection_to_mecca} /><Answer label="Employment period" value={record.employment_period} /><Answer label="Region" value={record.region} /><Answer label="Workplace type" value={record.workplace_type} /><Answer label="Broad role" value={record.broad_role_category} /></article>
      <article className="sd-panel"><p className="sd-kicker">Experience detail</p><h2>Context and corroboration</h2><Answer label="When" value={record.happened_when} /><Answer label="Where" value={record.happened_where} /><Answer label="Role at the time" value={record.role_at_time} /><Answer label="Direct witnesses" value={record.direct_witnesses} /><Answer label="Internal report and response" value={record.internal_report_and_response} /><Answer label="Repeated or affected others" value={record.repeated_or_affected_others} /><Answer label="Uncertainties" value={record.uncertainties} /><Answer label="Hearsay detail" value={record.hearsay_details} /></article>
      <article className="sd-panel"><p className="sd-kicker">Evidence coding</p><h2>Supporting information</h2><ListAnswer label="Materials" values={record.supporting_information} /><ListAnswer label="Themes" values={record.themes} /></article>
      <article className="sd-panel"><p className="sd-kicker">Delivery audit</p><h2>Secondary email copy</h2><Answer label="Status" value={record.email_delivery_status} /><Answer label="Attempted at" value={record.email_attempted_at} /><Answer label="Delivered at" value={record.email_delivered_at} /><Answer label="Provider message ID" value={record.email_provider_message_id} sensitive /><Answer label="Failure category" value={record.email_delivery_error_code} /></article>
      <article className="sd-panel sd-review"><p className="sd-kicker">Internal review</p><h2>Update this record</h2><form method="post" action="/api/admin/submissions/update"><input type="hidden" name="id" value={record.id} /><label><span>Status</span><select name="status" defaultValue={record.status}>{submissionStatuses.map((value) => <option key={value} value={value}>{value.replaceAll("_", " ")}</option>)}</select></label><label><span>Verification</span><select name="verification_status" defaultValue={record.verification_status}>{verificationStatuses.map((value) => <option key={value} value={value}>{value.replaceAll("_", " ")}</option>)}</select></label><label><span>Assigned reviewer</span><input name="assigned_reviewer" defaultValue={record.assigned_reviewer || ""} /></label><label className="sd-check"><input type="checkbox" name="follow_up_required" defaultChecked={record.follow_up_required} /> Follow-up required</label><label className="sd-check"><input type="checkbox" name="risk_or_safeguarding_flag" defaultChecked={record.risk_or_safeguarding_flag} /> Risk or safeguarding flag</label><label><span>Private notes</span><textarea name="internal_notes" rows={8} defaultValue={record.internal_notes || ""} /></label><button className="sd-button" type="submit">Save review</button></form></article>
    </section>
  </AdminShell>;
}

function Answer({ label, value, sensitive = false }: { label: string; value: string | null; sensitive?: boolean }) {
  return <div className="sd-answer"><strong>{label}</strong><p className={sensitive ? "sensitive" : ""}>{value || "Not provided"}</p></div>;
}

function ListAnswer({ label, values }: { label: string; values: string[] }) {
  return <div className="sd-answer"><strong>{label}</strong>{values.length ? <ul>{values.map((value) => <li key={value}>{value}</li>)}</ul> : <p>None recorded</p>}</div>;
}

function structuredValue(value: string | null, consentVersion: string) {
  if (value) return value;
  return consentVersion === "legacy_7_v1" ? "Not captured in legacy record" : "Not provided";
}
