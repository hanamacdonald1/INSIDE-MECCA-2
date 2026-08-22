import Link from "next/link";
import { PageHero, SitePage } from "../../site-shell";
import { CommentaryConfigurationError, commentaryTags, fetchPublishedCommentary, type PublishedCommentary } from "./data";

export const dynamic = "force-dynamic";

type Search = Promise<{ tag?: string }>;

export default async function PublicCommentaryPage({ searchParams }: { searchParams: Search }) {
  const query = await searchParams;
  let records: PublishedCommentary[] = [];
  try {
    records = await fetchPublishedCommentary();
  } catch (error) {
    if (!(error instanceof CommentaryConfigurationError)) throw error;
  }
  const selectedTag = commentaryTags.includes(query.tag as typeof commentaryTags[number]) ? query.tag : "";
  const tagCounts = new Map(commentaryTags.map((tag) => [tag, records.filter((record) => record.topics.includes(tag)).length]));
  const visibleRecords = selectedTag ? records.filter((record) => record.topics.includes(selectedTag)) : records;

  return <SitePage>
    <PageHero label="Analysis / Public commentary" title="What people have said publicly about working at MECCA">
      <p>This archive contains de-identified excerpts from public posts and review platforms. Every item is unverified public commentary. Its inclusion shows that the comment was posted. It does not show that the underlying claim is true or representative.</p>
    </PageHero>

    <section className="pc-principles" aria-label="How to read public commentary">
      <article><strong>Evidence status</strong><p>Unverified public commentary</p></article>
      <article><strong>What it establishes</strong><p>That the displayed words were posted publicly and captured for review.</p></article>
      <article><strong>What it does not establish</strong><p>Accuracy, prevalence, motive, context or a finding about MECCA.</p></article>
    </section>

    <section className="rb-section pc-privacy">
      <div><p className="rb-kicker">Privacy and de-identification</p><h2>Show the comment without turning the commenter into the story</h2></div>
      <div className="rb-lede">
        <p>Inside MECCA never publishes the commenter&apos;s username, account handle, profile image, contact details or other identifying information in this section. Names of private individuals and identifying details within the comment are removed before publication.</p>
        <p>Only comments originally posted in a publicly visible place are eligible. Private messages, direct messages, closed-group material and confidential submissions are excluded.</p>
        <p>Original links and full captured text may be retained privately for source checking, but they are not displayed here because they may identify the commenter.</p>
      </div>
    </section>

    <section className="rb-section dark">
      <p className="rb-kicker">How comments are prepared</p>
      <h2>Public commentary stays separate from testimony and findings</h2>
      <div className="rb-grid">
        <article className="rb-card"><h3>Capture the source</h3><p>Record the public comment and keep its source locator privately for checking.</p></article>
        <article className="rb-card"><h3>Remove identifying details</h3><p>Take out handles, names, links, contact details and contextual clues that could identify a private person.</p></article>
        <article className="rb-card"><h3>Review the excerpt</h3><p>Check the wording, topic and viewpoint before approving it for public display.</p></article>
        <article className="rb-card"><h3>Keep the limits attached</h3><p>Do not turn repetition, popularity or engagement into corroboration or a workforce-wide conclusion.</p></article>
      </div>
    </section>

    <section className="rb-section pc-feed">
      <p className="rb-kicker">Published excerpts</p>
      <h2>Read the comment and the caveat together</h2>
      <div className="pc-topic-guide">
        <div><strong>Browse by topic</strong><p>Tags describe what a comment discusses. They are not findings and do not verify the claim.</p></div>
        <nav aria-label="Filter public commentary by topic">
          <Link className={!selectedTag ? "active" : ""} href="/analysis/public-commentary">All comments <span>{records.length}</span></Link>
          {commentaryTags.map((tag) => {
            const count = tagCounts.get(tag) || 0;
            return count > 0
              ? <Link key={tag} className={selectedTag === tag ? "active" : ""} href={`/analysis/public-commentary?tag=${encodeURIComponent(tag)}`}>{tag} <span>{count}</span></Link>
              : <span className="disabled" key={tag}>{tag} <span>0</span></span>;
          })}
        </nav>
      </div>
      {selectedTag && <div className="pc-filter-summary"><p>Showing comments tagged <strong>{selectedTag}</strong>.</p><Link href="/analysis/public-commentary">Clear filter</Link></div>}
      {visibleRecords.length > 0 ? <div className="pc-grid">{visibleRecords.map((record) => <CommentaryCard key={record.id} record={record} />)}</div> : <div className="pc-empty"><h3>No excerpts have been approved for this topic yet.</h3><p>Comments will appear only after public-source and de-identification checks are complete.</p></div>}
    </section>

    <section className="rb-section pc-boundary">
      <p className="rb-kicker">Two different pathways</p>
      <h2>A public comment is not the same as a confidential submission</h2>
      <p className="rb-lede">First-hand accounts sent directly to Inside MECCA remain confidential research material unless the contributor separately agrees to publication. Public commentary is handled through this distinct archive.</p>
      <div className="rb-actions"><Link className="rb-button red" href="/evidence">Read the evidence standards</Link><Link className="rb-button" href="/share-story">Share a confidential account</Link></div>
    </section>
  </SitePage>;
}

function CommentaryCard({ record }: { record: PublishedCommentary }) {
  return <article className="pc-card">
    <header><span className="pc-label">Unverified public commentary</span><span>{record.platform}</span></header>
    <blockquote>“{record.publicExcerpt}”</blockquote>
    <div className="pc-card-meta"><span>Viewpoint: {record.perspective}</span>{record.sourcePostedAt && <time dateTime={record.sourcePostedAt}>Posted {formatSourceDate(record.sourcePostedAt)}</time>}</div>
    {record.topics.length > 0 && <ul aria-label="Topics">{record.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul>}
    <footer><strong>What this establishes</strong><p>This de-identified comment was posted publicly. The underlying account has not been independently verified.</p></footer>
  </article>;
}

function formatSourceDate(value: string) {
  const date = new Date(`${value}T12:00:00+10:00`);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("en-AU", { dateStyle: "medium", timeZone: "Australia/Melbourne" }).format(date);
}
