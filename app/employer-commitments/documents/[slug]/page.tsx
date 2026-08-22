import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero, SitePage } from "../../../site-shell";
import { documents, getDocument, getEditorialMeta } from "../../data";
import { EditorialGuidePanel } from "../../editorial-guide";

export function generateStaticParams() { return documents.map((document) => ({ slug: document.slug })); }

const Lists = ({ title, items }: { title: string; items: string[] }) => <section className="ec-analysis-block"><p className="ec-meta">{title}</p><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></section>;

export default async function DocumentAnalysisPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const document = getDocument(slug);
  if (!document) notFound();
  const editorial = getEditorialMeta(slug);
  const related = document.related.map(getDocument).filter(Boolean);

  if (slug === "development-planning-guidebook") {
    return <SitePage><div className="ec-archive">
      <PageHero label="Restricted source / Publication decision" title="Why the supplied development-planning material is not public" dark>
        <p>This page records an editorial withholding decision. It does not publish, reproduce or summarise the source&apos;s contents.</p>
        <p className="ec-scope"><strong>Status:</strong> Source file, excerpts and source-derived analysis remain outside public access</p>
      </PageHero>
      <EditorialGuidePanel />
      <section className="ec-integrity"><p className="rb-kicker">What we can publish at this stage</p><h2>No finding or source-derived analysis</h2><p>Receiving the material does not establish that it is authentic, that the contributor could lawfully disclose it, that Inside MECCA may publish it or that the process it describes was implemented.</p></section>
    </div></SitePage>;
  }

  return <SitePage><div className="ec-archive">
    <PageHero label={`Independent reconstruction / ${editorial.sourceKey} / ${document.status}`} title={document.title} dark>
      <p>{document.description}</p>
      <p className="ec-scope"><strong>Scope:</strong> {editorial.scope}</p>
      <p className="ec-callout">This page was written by Inside MECCA. It is not an official MECCA document, a copy, an extract or a downloadable substitute for the source.</p>
      <div className="ec-tags">{document.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
    </PageHero>
    <section className="ec-section ec-document-analysis">
      <aside className="ec-record-meta">
        <p className="ec-meta">Evidence record</p>
        <dl>
          <div><dt>Date</dt><dd>{document.date}</dd></div>
          <div><dt>Public record type</dt><dd>Independent paraphrased reconstruction</dd></div>
          <div><dt>Research locator</dt><dd>{editorial.sourceKey}: restricted internal reference</dd></div>
          <div><dt>Source status</dt><dd>{editorial.sourceStatus}</dd></div>
          <div><dt>Source access</dt><dd>Restricted</dd></div>
          <div><dt>Implementation</dt><dd>Not determined</dd></div>
        </dl>
        <Link className="ec-button light" href={`/employer-commitments/source-access?document=${document.slug}`}>Original source restricted</Link>
      </aside>
      <div className="ec-analysis-content">
        <section><p className="rb-kicker">Independent editorial reconstruction</p><h2>{document.overview}</h2><p>The wording below is a research paraphrase created by Inside MECCA. It should not be read as MECCA&apos;s wording or as proof of an official, current or universally applied process.</p></section>
        <section><p className="ec-meta">Purpose</p><p>{document.purpose}</p></section>
        <div className="ec-analysis-grid"><Lists title="Who it applies to" items={document.appliesTo} /><Lists title="Manager responsibilities" items={document.managerResponsibilities} /><Lists title="Employee expectations" items={document.employeeExpectations} /><Lists title="Systems referenced" items={document.systems} /></div>
        <section className="ec-analysis-block"><p className="ec-meta">Review frequency</p><p>{document.reviewFrequency}</p></section>
        <Lists title="Stated expectations" items={document.commitments} />
        <section className="ec-analysis-block"><p className="ec-meta">Research paraphrase</p><div className="ec-extractions">{document.extractions.map((item) => <article key={item.label}><span>Research theme</span><h3>{item.label}</h3><p>{item.text}</p></article>)}</div></section>
        <Lists title="Questions to compare with employee experience" items={document.questions} />
        <section className="ec-analysis-block"><p className="ec-meta">Document timeline</p><div className="ec-mini-timeline">{document.timeline.map((item, index) => <div key={item.label}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item.label}</strong><p>{item.detail}</p></div>)}</div></section>
        <section className="ec-analysis-block"><p className="ec-meta">Related documents</p><div className="ec-related">{related.map((item) => item && <Link key={item.slug} href={`/employer-commitments/documents/${item.slug}`}>{item.title}<span>View connection</span></Link>)}</div></section>
        <div className="ec-future-grid"><section><p className="ec-meta">What could strengthen this record</p><h3>More evidence can be linked as it becomes available</h3><p>That may include an authenticated version, implementation records, meeting notes, training material or an organisational response.</p></section><section><p className="ec-meta">Employee accounts</p><h3>Experience is assessed separately from policy</h3><p>Contributor accounts are not merged into the organisational source. They are coded, assessed and linked only where consent, relevance and source safety allow.</p></section></div>
      </div>
    </section>
    <section className="ec-integrity"><p className="rb-kicker">Where the evidence stops</p><h2>This reconstruction does not authenticate a source or establish workplace practice.</h2><p>It does not establish that any underlying material was official, current, mandatory, complete, distributed to employees or consistently followed. The original source is not available through this site.</p></section>
  </div></SitePage>;
}
