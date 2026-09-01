import Link from "next/link";
import { PageHero, SitePage } from "../../site-shell";
import { CommentaryConfigurationError, commentaryTags, fetchPublishedCommentary, type PublishedCommentary } from "./data";

export const dynamic = "force-dynamic";

type Search = Promise<{ tag?: string }>;

type ExtendedCommentary = PublishedCommentary & { caption?: string };

const hardcodedRecords: ExtendedCommentary[] = [
  {
    id: "hc-1", platform: "Reddit", perspective: "positive", sourcePostedAt: "2019-01-01", capturedAt: new Date(),
    publicExcerpt: "The training was so much fun, it was a really exciting time for me getting to play with makeup.",
    topics: ["Training & development"], publishedAt: new Date(),
    caption: "Self-described former worker, public Reddit comment, 2019. Account not independently verified."
  },
  {
    id: "hc-2", platform: "Reddit", perspective: "critical", sourcePostedAt: "2023-01-01", capturedAt: new Date(),
    publicExcerpt: "Training happened 6 months in. I got in trouble for things I did but no one had told me.",
    topics: ["Training & development", "Management & leadership"], publishedAt: new Date(),
    caption: "Self-described former worker, public Reddit comment, 2023. Account not independently verified."
  },
  {
    id: "hc-3", platform: "Reddit", perspective: "positive", sourcePostedAt: "2019-01-01", capturedAt: new Date(),
    publicExcerpt: "I've been shown nothing but love and empathy.",
    topics: ["Management & leadership", "Psychological safety"], publishedAt: new Date(),
    caption: "Self-described worker discussing local management support, public Reddit comment, 2019. Account not independently verified."
  },
  {
    id: "hc-4", platform: "Reddit", perspective: "positive", sourcePostedAt: "2020-01-01", capturedAt: new Date(),
    publicExcerpt: "My favourite part of the job was the customers, everyday was so different.",
    topics: ["Customer-facing work"], publishedAt: new Date(),
    caption: "Self-described former worker, public Reddit comment, 2020. Account not independently verified."
  },
  {
    id: "hc-5", platform: "Indeed", perspective: "positive", sourcePostedAt: "2024-01-01", capturedAt: new Date(),
    publicExcerpt: "Workplace culture is immensely supportive and I built many lasting friendships during my time in Mecca.",
    topics: ["Team culture"], publishedAt: new Date(),
    caption: "Former worker review, public employee-review site, 2024. Account not independently verified."
  },
  {
    id: "hc-6", platform: "Reddit", perspective: "critical", sourcePostedAt: "2021-01-01", capturedAt: new Date(),
    publicExcerpt: "It feels a lot like favouritism masked as visibility.",
    topics: ["Career progression", "Management & leadership"], publishedAt: new Date(),
    caption: "Self-described worker discussing progression, public Reddit comment, 2021. Account not independently verified."
  },
  {
    id: "hc-7", platform: "Reddit", perspective: "critical", sourcePostedAt: "2026-01-01", capturedAt: new Date(),
    publicExcerpt: "Casual Mecca workers these days aren't getting as many hours/inconsistent hours.",
    topics: ["Workload & staffing", "Work-life balance"], publishedAt: new Date(),
    caption: "Public Reddit comment discussing casual employment, 2026. Employment status not independently verified."
  },
  {
    id: "hc-8", platform: "Indeed", perspective: "critical", sourcePostedAt: "2025-01-01", capturedAt: new Date(),
    publicExcerpt: "Not enough training but inflated expectations.",
    topics: ["Training & development", "Management & leadership"], publishedAt: new Date(),
    caption: "Worker review, public employee-review site, 2025. Account not independently verified."
  }
];

export default async function PublicCommentaryPage({ searchParams }: { searchParams: Search }) {
  const query = await searchParams;
  let baseRecords: PublishedCommentary[] = [];
  try {
    baseRecords = await fetchPublishedCommentary();
  } catch (error) {
    if (!(error instanceof CommentaryConfigurationError)) throw error;
  }
  
  const existingExcerpts = new Set(baseRecords.map(r => r.publicExcerpt.trim().toLowerCase()));
  const uniqueAdditional = hardcodedRecords.filter(r => !existingExcerpts.has(r.publicExcerpt.trim().toLowerCase()));
  const records: ExtendedCommentary[] = [...baseRecords, ...uniqueAdditional];

  const selectedTag = commentaryTags.includes(query.tag as typeof commentaryTags[number]) ? query.tag : "";
  const tagCounts = new Map(commentaryTags.map((tag) => [tag, records.filter((record) => record.topics.includes(tag)).length]));
  const visibleRecords = selectedTag ? records.filter((record) => record.topics.includes(selectedTag)) : records;
  
  return <SitePage>
    <PageHero label="Analysis / Public commentary" title="What people have said publicly about working at MECCA">
      <p>This archive contains de-identified excerpts from public posts and review platforms. Every item is unverified public commentary. Its inclusion shows that the comment was posted. It does not show that the underlying claim is true or representative.</p>
    </PageHero>

    <section className="rb-section !pt-12 !pb-6 border-b-0">
      <div className="rb-note">
        <h2 className="!text-2xl !mb-4 !mt-0 font-bold">Read the evidence status with the material</h2>
        <div className="space-y-3">
          <p>Inside MECCA distinguishes allegations, public commentary, first-hand accounts, company statements, records and findings.</p>
          <p>Publication means that material has been documented and attributed. It does not mean that every underlying statement has been independently verified or accepted as fact. Where evidence is incomplete, disputed or unavailable, that limitation remains visible.</p>
          <p>MECCA and other materially affected parties are invited to provide corrections, relevant records and responses. Substantive corrections will be dated and explained.</p>
        </div>
      </div>
    </section>
    
    <section className="pc-principles" aria-label="How to read public commentary">
      <article><strong>Evidence status</strong><p>Unverified public commentary</p></article>
      <article><strong>What it establishes</strong><p>That the displayed words were posted publicly and captured for review.</p></article>
      <article><strong>What it does not establish</strong><p>Accuracy, prevalence, motive, context or a finding about MECCA.</p></article>
    </section>
    
    <section className="rb-section pc-privacy">
      <div><p className="rb-kicker">Privacy and de-identification</p><h2>Show the comment without turning the commenter into the story</h2></div>
      <div className="rb-lede">
        <p>Removing a username is not complete de-identification. Exact quotations may be searchable and can sometimes lead back to the original post. Inside MECCA therefore removes names, handles, profile images and unnecessary identifying details while retaining private source records for editorial verification.</p>
        <p>Only comments originally posted in a publicly visible place are eligible. Private messages, direct messages, closed-group material and confidential submissions are excluded.</p>
        <p>If you recognise your words and would like an excerpt reviewed, corrected or removed, <Link href="/#contact" className="underline hover:text-[#b42025]">contact Inside MECCA</Link>. Requests will be handled privately.</p>
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
    
    <section className="rb-section">
      <p className="rb-kicker">Patterns in the public commentary reviewed</p>
      <h2>The clearest pattern is variation</h2>
      <div className="rb-lede">
        <p>Public discussion about working at MECCA is not uniformly negative. Some self-described workers praise product learning, colleagues, customers, benefits and supportive local managers. Other comments describe inconsistent training, uneven management, insecure hours, limited progression and difficulty raising concerns.</p>
        <p>The clearest pattern is variation. Experiences appear to differ by manager, team, location, role and period. These public accounts cannot establish how common any experience is, but they identify questions that warrant closer examination.</p>
        <p>Research reviewed public material published between 2019 and August 2026 across Reddit, SEEK, Indeed, Glassdoor and contextual public records. The collection was purposive rather than representative.</p>
      </div>
      <div className="rb-grid mt-8">
        <article className="rb-card">
          <h3>Learning and training</h3>
          <p>Product education is described as a major attraction, while other comments describe delayed or insufficient role-specific training.</p>
        </article>
        <article className="rb-card">
          <h3>Management variation</h3>
          <p>Supportive local managers appear alongside accounts of inconsistent, controlling or unsupportive management.</p>
        </article>
        <article className="rb-card">
          <h3>Colleagues and customers</h3>
          <p>Teams, friendships, customer contact and product enthusiasm are frequent positive features.</p>
        </article>
        <article className="rb-card">
          <h3>Hours and progression</h3>
          <p>Some comments raise irregular casual hours, limited visibility of development pathways and perceived favouritism.</p>
        </article>
        <article className="rb-card">
          <h3>Speaking up and wellbeing</h3>
          <p>Some public accounts describe difficulty raising concerns, psychological strain or feeling unheard.</p>
        </article>
      </div>
      
      <div className="analysis-commentary-link mt-8"><p><strong>Analysis: Identity, inclusion and workplace experience</strong></p><p>An evidence-led examination of reported experiences involving appearance, race, disability, belonging, progression and speaking up.</p><Link className="rb-button" href="/analysis/identity-inclusion">Read the analysis</Link></div>
    </section>

    <section className="rb-section pc-feed">
      <div className="mb-6">
        <div>
          <p className="rb-kicker">Published excerpts</p>
          <h2>Read the comment and the caveat together</h2>
        </div>
      </div>
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
    
    <section className="rb-section">
      <p className="rb-kicker">Company response and historical context</p>
      <h2>What MECCA has said and done previously</h2>
      <div className="rb-lede">
        <p>In November 2019, MECCA said it was taking allegations about bullying, harassment and discrimination seriously, apologised to anyone whose experience had not been positive, and announced an independent culture review and expanded reporting channels. Contemporary reporting also described a listening tour, Stopline, respect-at-work training and an Employee Assistance Program.</p>
        <p>A 2019 Fair Work Commission appeal decision records that an applicant sought stop-bullying orders and that workplace changes were implemented without an admission that bullying had occurred. The decision is evidence of proceedings and remedial steps. It is not a finding that the alleged bullying occurred.</p>
        <p>Later online comments show that some people continued to describe similar concerns. They do not prove that the 2019 measures failed, that conditions are uniform, or that any alleged conduct occurred as described.</p>
      </div>
      <div className="mt-8 space-y-4">
        <p><strong>Public context sources:</strong></p>
        <ul className="list-disc pl-5 space-y-2">
          <li><a href="https://www.pedestrian.tv/news/mecca-investigating-bullying-claims/" target="_blank" rel="noreferrer" className="underline hover:text-[#b42025]">MECCA Investigating Bullying Claims (Pedestrian.tv)</a></li>
          <li><a href="https://insideretail.com.au/news/our-culture-may-have-been-tested-mecca-201911" target="_blank" rel="noreferrer" className="underline hover:text-[#b42025]">&quot;Our culture may have been tested&quot;: MECCA (Inside Retail)</a></li>
          <li><a href="https://www.fwc.gov.au/documents/decisionssigned/html/pdf/2019fwcfb2771.pdf" target="_blank" rel="noreferrer" className="underline hover:text-[#b42025]">Fair Work Commission Appeal Decision PR713735 (PDF)</a></li>
          <li><a href="https://au.seek.com/companies/mecca-brands-813817/culture" target="_blank" rel="noreferrer" className="underline hover:text-[#b42025]">MECCA Brands on SEEK</a></li>
        </ul>
      </div>
      <div className="mt-12 p-6 bg-stone-100 dark:bg-stone-900 rounded border border-stone-200 dark:border-stone-800">
        <p className="font-bold mb-2">Right of reply</p>
        <p>Before Inside MECCA publishes analytical conclusions based on these themes, MECCA should be offered a specific opportunity to respond, including information about current reporting channels, training standards, management oversight, casual hours and changes made following the 2019 culture review.</p>
      </div>
    </section>

    <section className="rb-section pc-boundary">
      <p className="rb-kicker">Two different pathways</p>
      <h2>A public comment is not the same as a confidential submission</h2>
      <p className="rb-lede">First-hand accounts sent directly to Inside MECCA remain confidential research material unless the contributor separately agrees to publication. Public commentary is handled through this distinct archive.</p>
      <div className="rb-actions"><Link className="rb-button red" href="/evidence">Read the evidence standards</Link><Link className="rb-button" href="/share-story">Share a confidential account</Link></div>
    </section>
  </SitePage>;
}

function CommentaryCard({ record }: { record: ExtendedCommentary }) {
  return <article className="pc-card">
    <header><span className="pc-label">Unverified public commentary</span><span>{record.platform}</span></header>
    <blockquote>“{record.publicExcerpt}”</blockquote>
    {record.caption && <p className="text-sm italic text-stone-600 dark:text-stone-400 mt-3">{record.caption}</p>}
    <div className="pc-card-meta mt-3"><span>Viewpoint: {record.perspective}</span>{record.sourcePostedAt && <time dateTime={record.sourcePostedAt}>Posted {formatSourceDate(record.sourcePostedAt)}</time>}</div>
    {record.topics.length > 0 && <ul aria-label="Topics" className="mt-2">{record.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul>}
    <footer className="mt-4 pt-3 border-t border-stone-200 dark:border-stone-800">
      <details className="text-sm">
        <summary className="cursor-pointer font-bold text-stone-800 dark:text-stone-200">Evidence limits</summary>
        <div className="mt-2 space-y-2 text-stone-600 dark:text-stone-400">
          <p><strong>What this establishes:</strong> A person publicly posted this description of their experience.</p>
          <p><strong>What this does not establish:</strong> The person&apos;s identity or employment has not been independently verified, and the comment does not establish that the experience was representative.</p>
        </div>
      </details>
    </footer>
  </article>;
}

function formatSourceDate(value: string) {
  const date = new Date(`${value}T12:00:00+10:00`);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("en-AU", { dateStyle: "medium", timeZone: "Australia/Melbourne" }).format(date);
}
