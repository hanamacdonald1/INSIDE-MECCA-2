import Link from "next/link";
import { notFound } from "next/navigation";
import { AccessDenied, AdminShell, StatusBadge } from "../../submissions/admin-shell";
import { requireSubmissionsViewer } from "../../submissions/auth";
import { commentaryPerspectives, commentaryPlatforms, commentaryStatuses, commentaryTags, fetchCommentaryRecord, normalizeCommentaryTopics } from "../../analysis/public-commentary/data";

export const dynamic = "force-dynamic";

type Params = Promise<{ id: string }>;
type Search = Promise<{ error?: string }>;

export default function CommentaryRecordPage({ params, searchParams }: { params: Params; searchParams: Search }) {
  return <CommentaryRecordDetail params={params} searchParams={searchParams} />;
}

async function CommentaryRecordDetail({ params, searchParams }: { params: Params; searchParams: Search }) {
  const { id } = await params;
  const query = await searchParams;
  const returnTo = `/commentary-admin/${encodeURIComponent(id)}`;
  const { user, allowed } = await requireSubmissionsViewer(returnTo);
  if (!allowed) return <AccessDenied user={user} area="Public commentary records" returnTo={returnTo} />;
  const record = await fetchCommentaryRecord(id);
  if (!record) notFound();
  const selectedTags = normalizeCommentaryTopics(record.topics);

  return <AdminShell user={user} section="Private public-commentary workspace">
    <section className="sd-detail-head"><div><Link href="/commentary-admin">← Back to commentary</Link><p className="sd-kicker">Private record</p><h1>{record.platform} comment</h1><StatusBadge value={record.status} /></div><a className="sd-button secondary" href="/analysis/public-commentary" target="_blank" rel="noreferrer">View public page</a></section>
    {query.error && <p className="pc-admin-error" role="alert">{query.error}</p>}
    <section className="pc-review-grid">
      <article className="pc-private-source"><p className="sd-kicker">Private source material</p><h2>Original pasted comment</h2><p className="pc-private-warning">This panel is private. Never copy its identifying details into the public excerpt.</p><blockquote>{record.rawComment}</blockquote>{record.sourceUrl && <p><strong>Private source link:</strong> <a href={record.sourceUrl} target="_blank" rel="noreferrer">Open original source</a></p>}<dl><div><dt>Platform</dt><dd>{record.platform}</dd></div><div><dt>Captured</dt><dd>{formatDate(record.capturedAt)}</dd></div><div><dt>Originally posted</dt><dd>{record.sourcePostedAt || "Not recorded"}</dd></div></dl></article>
      <article className="pc-review-form"><p className="sd-kicker">Publication review</p><h2>Approve only de-identified text</h2>
        <form className="pc-admin-form" method="post" action="/api/admin/public-commentary">
          <input type="hidden" name="intent" value="update" /><input type="hidden" name="id" value={record.id} />
          <div className="pc-admin-columns"><label><span>Platform</span><select name="platform" defaultValue={record.platform}>{commentaryPlatforms.map((value) => <option key={value}>{value}</option>)}</select></label><label><span>Viewpoint</span><select name="perspective" defaultValue={record.perspective}>{commentaryPerspectives.map((value) => <option key={value} value={value}>{value}</option>)}</select></label></div>
          <label><span>Private source link</span><input name="source_url" type="url" defaultValue={record.sourceUrl || ""} /></label>
          <label><span>Date originally posted</span><input name="source_posted_at" type="date" defaultValue={record.sourcePostedAt || ""} /></label>
          <label><span>Public excerpt, maximum 500 characters</span><textarea name="public_excerpt" rows={7} maxLength={500} defaultValue={record.publicExcerpt} required /></label>
          <fieldset className="pc-admin-tags"><legend>Topic tags</legend><p>Select every subject the comment directly discusses. A tag does not verify the claim.</p><div>{commentaryTags.map((tag) => <label key={tag}><input type="checkbox" name="tags" value={tag} defaultChecked={selectedTags.includes(tag)} /><span>{tag}</span></label>)}</div></fieldset>
          <label><span>Private review notes</span><textarea name="review_notes" rows={4} maxLength={5000} defaultValue={record.reviewNotes || ""} /></label>
          <label className="pc-admin-check"><input name="source_is_public" type="checkbox" defaultChecked={record.sourceIsPublic} /><span>I confirm this was posted publicly, not sent privately or shared in a closed group.</span></label>
          <label className="pc-admin-check"><input name="identifiers_reviewed" type="checkbox" defaultChecked={record.identifiersReviewed} /><span>I confirm all usernames, handles, names, profile details, contact details and identifying clues have been removed from the public excerpt.</span></label>
          <label><span>Publication status</span><select name="status" defaultValue={record.status}>{commentaryStatuses.map((value) => <option key={value} value={value}>{value}</option>)}</select></label>
          <button className="sd-button" type="submit">Save review</button>
        </form>
      </article>
    </section>
  </AdminShell>;
}

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("en-AU", { dateStyle: "medium", timeStyle: "short", timeZone: "Australia/Melbourne" }).format(value);
}
