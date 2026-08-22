import Link from "next/link";
import { AccessDenied, AdminShell, ConfigurationPending, StatusBadge } from "./admin-shell";
import { requireSubmissionsViewer } from "./auth";
import { fetchSubmissions, SubmissionsConfigurationError, submissionStatuses, type SubmissionRecord } from "./data";

export const dynamic = "force-dynamic";

type Search = Promise<{ q?: string; status?: string }>;

export default function SubmissionsPage({ searchParams }: { searchParams: Search }) {
  return <SubmissionsDashboard searchParams={searchParams} />;
}

async function SubmissionsDashboard({ searchParams }: { searchParams: Search }) {
  const query = await searchParams;
  const qs = new URLSearchParams();
  if (query.q) qs.set("q", query.q);
  if (query.status) qs.set("status", query.status);
  const returnTo = `/submissions${qs.size ? `?${qs}` : ""}`;
  const { user, allowed } = await requireSubmissionsViewer(returnTo);
  if (!allowed) return <AccessDenied user={user} />;

  let records: SubmissionRecord[];
  try {
    records = await fetchSubmissions();
  } catch (error) {
    if (error instanceof SubmissionsConfigurationError) return <AdminShell user={user}><ConfigurationPending /></AdminShell>;
    throw error;
  }

  const search = (query.q || "").trim().toLowerCase();
  const status = submissionStatuses.includes(query.status as typeof submissionStatuses[number]) ? query.status : "";
  const filtered = records.filter((record) => {
    if (status && record.status !== status) return false;
    if (!search) return true;
    return [record.submission_ref, record.identity_preference, record.primary_knowledge_basis, record.connection_to_mecca, record.region, record.workplace_type, record.broad_role_category, ...record.themes]
      .filter(Boolean).join(" ").toLowerCase().includes(search);
  });
  const evidence = records.filter((record) => record.evidence_provided).length;
  const contactable = records.filter((record) => Boolean(record.contact_email)).length;
  const followUp = records.filter((record) => record.follow_up_required).length;

  return <AdminShell user={user}>
    <section className="sd-hero"><div><p className="sd-kicker">Confidential research records</p><h1>Submissions</h1><p>Review questionnaire responses without exposing contributor information on the public site.</p></div><div className="sd-hero-actions"><a className="sd-button" href="/api/admin/submissions/export">Download full CSV</a><a className="sd-button secondary" href="/api/admin/submissions/export?redacted=1">Download redacted CSV</a></div></section>
    <section className="sd-kpis" aria-label="Submission summary">
      <article><span>Total records</span><strong>{records.length}</strong></article>
      <article><span>Evidence available</span><strong>{evidence}</strong></article>
      <article><span>Contact provided</span><strong>{contactable}</strong></article>
      <article><span>Follow-up required</span><strong>{followUp}</strong></article>
    </section>
    <section className="sd-workspace">
      <form className="sd-filters" method="get"><label><span>Search records</span><input name="q" defaultValue={query.q || ""} placeholder="Reference, theme, region or role" /></label><label><span>Status</span><select name="status" defaultValue={status}><option value="">All statuses</option>{submissionStatuses.map((value) => <option key={value} value={value}>{value.replaceAll("_", " ")}</option>)}</select></label><button className="sd-button" type="submit">Apply filters</button></form>
      <div className="sd-table-wrap"><table className="sd-table"><thead><tr><th>Received</th><th>Reference</th><th>Status</th><th>Connection</th><th>Region</th><th>Evidence</th><th>Follow-up</th><th></th></tr></thead><tbody>{filtered.map((record) => <SubmissionRow key={record.id} record={record} />)}</tbody></table></div>
      {filtered.length === 0 && <p className="sd-empty">No submissions match these filters.</p>}
    </section>
  </AdminShell>;
}

function SubmissionRow({ record }: { record: SubmissionRecord }) {
  return <tr><td>{formatDate(record.received_at)}</td><td><code>{record.submission_ref.slice(0, 8)}</code></td><td><StatusBadge value={record.status} /></td><td>{record.connection_to_mecca}</td><td>{record.region || "Not provided"}</td><td>{record.evidence_provided ? "Available" : "None noted"}</td><td>{record.follow_up_required ? "Yes" : "No"}</td><td><Link href={`/submissions/${record.id}`}>Review</Link></td></tr>;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-AU", { dateStyle: "medium", timeStyle: "short", timeZone: "Australia/Melbourne" }).format(new Date(value));
}
