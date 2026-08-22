import Link from "next/link";
import { AccessDenied, AdminShell, StatusBadge } from "../submissions/admin-shell";
import { requireSubmissionsViewer } from "../submissions/auth";
import {
  CommentaryConfigurationError,
  commentaryPerspectives,
  commentaryPlatforms,
  commentaryStatuses,
  commentaryTags,
  fetchCommentaryRecords,
  type CommentaryRecord,
} from "../analysis/public-commentary/data";

export const dynamic = "force-dynamic";

type Search = Promise<{ status?: string; error?: string }>;

export default function CommentaryAdminPage({ searchParams }: { searchParams: Search }) {
  return <CommentaryDashboard searchParams={searchParams} />;
}

async function CommentaryDashboard({ searchParams }: { searchParams: Search }) {
  const query = await searchParams;
  const { user, allowed } = await requireSubmissionsViewer("/commentary-admin");
  if (!allowed) return <AccessDenied user={user} area="Public commentary records" returnTo="/commentary-admin" />;

  let records: CommentaryRecord[] = [];
  let configurationPending = false;
  try {
    records = await fetchCommentaryRecords();
  } catch (error) {
    if (error instanceof CommentaryConfigurationError) configurationPending = true;
    else throw error;
  }
  const status = commentaryStatuses.includes(query.status as typeof commentaryStatuses[number]) ? query.status : "";
  const filtered = status ? records.filter((record) => record.status === status) : records;

  return <AdminShell user={user} section="Private public-commentary workspace">
    <section className="sd-hero"><div><p className="sd-kicker">Private editorial staging</p><h1>Public commentary</h1><p>Paste publicly posted comments, remove identifying details and approve only the excerpt that may appear publicly.</p></div><div className="sd-hero-actions"><a className="sd-button secondary" href="/analysis/public-commentary" target="_blank" rel="noreferrer">View public page</a></div></section>
    <section className="pc-admin-rules"><strong>Nothing publishes automatically.</strong><span>Usernames, profile images, contact details and identifying information must never appear in the public excerpt.</span><span>Only publicly posted comments are eligible.</span></section>
    {query.error && <p className="pc-admin-error" role="alert">{query.error}</p>}
    <section className="sd-workspace pc-admin-layout">
      <article className="pc-admin-panel"><p className="sd-kicker">New private draft</p><h2>Paste a public comment</h2>
        <form className="pc-admin-form" method="post" action="/api/admin/public-commentary">
          <input type="hidden" name="intent" value="create" />
          <div className="pc-admin-columns"><label><span>Platform</span><select name="platform" required>{commentaryPlatforms.map((value) => <option key={value}>{value}</option>)}</select></label><label><span>Viewpoint</span><select name="perspective" required>{commentaryPerspectives.map((value) => <option key={value} value={value}>{value}</option>)}</select></label></div>
          <label><span>Private source link</span><input name="source_url" type="url" placeholder="Stored privately and never shown publicly" /></label>
          <label><span>Date originally posted</span><input name="source_posted_at" type="date" /></label>
          <label><span>Paste the comment</span><textarea name="raw_comment" rows={9} maxLength={10000} required placeholder="Paste only material that was posted publicly. The first public excerpt will automatically remove obvious handles, links, emails and phone numbers." /></label>
          <fieldset className="pc-admin-tags"><legend>Topic tags</legend><p>Select every subject the comment directly discusses. A tag does not verify the claim.</p><div>{commentaryTags.map((tag) => <label key={tag}><input type="checkbox" name="tags" value={tag} /><span>{tag}</span></label>)}</div></fieldset>
          <label className="pc-admin-check"><input name="source_is_public" type="checkbox" required /><span>I confirm this comment was posted in a publicly visible place, not a private message or closed group.</span></label>
          <button className="sd-button" type="submit" disabled={configurationPending}>Save private draft</button>
        </form>
        {configurationPending && <p className="pc-admin-help">Storage will become available after the database update is published. No record can be created until then.</p>}
      </article>
      <section className="pc-admin-records"><div className="pc-admin-records-head"><div><p className="sd-kicker">Review queue</p><h2>{records.length} records</h2></div><form method="get"><label><span>Status</span><select name="status" defaultValue={status}><option value="">All statuses</option>{commentaryStatuses.map((value) => <option key={value} value={value}>{value}</option>)}</select></label><button className="sd-button secondary" type="submit">Filter</button></form></div>
        <div className="pc-admin-list">{filtered.map((record) => <CommentaryAdminCard key={record.id} record={record} />)}</div>
        {!configurationPending && filtered.length === 0 && <p className="sd-empty">No commentary records match this view.</p>}
      </section>
    </section>
  </AdminShell>;
}

function CommentaryAdminCard({ record }: { record: CommentaryRecord }) {
  return <article><div><StatusBadge value={record.status} /><span>{record.platform}</span><span>{record.perspective}</span></div><p>{record.publicExcerpt || "No public excerpt yet."}</p><footer><span>{record.identifiersReviewed ? "Identifiers reviewed" : "Identity review required"}</span><Link href={`/commentary-admin/${record.id}`}>Review record</Link></footer></article>;
}
