import Link from "next/link";
import type { Metadata } from "next";
import { PageHero, SitePage } from "../site-shell";
import { buildMetadata } from "../seo";
import { analysisEntries } from "./data";

export const metadata: Metadata = buildMetadata({
  title: "MECCA Workplace Culture Analysis & Updates",
  description: "Read original, evidence-led analysis of MECCA Brands workplace culture, employee experiences, management, company commitments and public records.",
  path: "/analysis",
});

export default function AnalysisPage() {
  return <SitePage>
    <PageHero label="Analysis" title="What the available evidence can actually tell us">
      <p>Read the project&apos;s analysis of employee experiences, management, workplace systems, company commitments and public records. Each piece shows its sources and limits. Allegations remain allegations unless the evidence supports a finding.</p>
    </PageHero>
    <section className="rb-section analysis-index">
      <p className="rb-kicker">Latest work</p>
      <h2>Research, context and document breakdowns</h2>
      <div className="analysis-list">
        {analysisEntries.map((entry) => <article key={entry.slug}>
          <div className="analysis-meta"><span>{entry.category}</span><time dateTime={entry.published}>{entry.displayDate}</time><span>{entry.readingTime}</span></div>
          <h3><Link href={`/analysis/${entry.slug}`}>{entry.title}</Link></h3>
          <p>{entry.excerpt}</p>
          <Link className="analysis-read" href={`/analysis/${entry.slug}`}>Read the analysis <span aria-hidden="true">→</span></Link>
        </article>)}
      </div>
    </section>
    <section className="rb-section seo-entry"><div className="rb-split"><div><p className="rb-kicker">Public commentary</p><h2>What people have said publicly</h2></div><div className="rb-lede"><p>This is a separate evidence category. It contains short excerpts from public posts and review platforms, with usernames and identifying details removed. Every excerpt remains labelled as unverified public commentary. It is not treated as first-hand testimony or a finding.</p><div className="rb-actions"><Link className="rb-button red" href="/analysis/public-commentary">Browse public commentary</Link></div></div></div></section>
    <section className="rb-section dark">
      <p className="rb-kicker">When we publish</p>
      <h2>A new date should mean there is something new to read</h2>
      <p className="rb-lede">We add an entry when there is substantive analysis, a document breakdown, a correction or a meaningful investigation update. Each page records when it was published, what it draws on and where the evidence falls short.</p>
      <div className="rb-actions"><Link className="rb-button red" href="/methodology">Read the evidence methodology</Link><Link className="rb-button" href="/updates">Track project progress</Link></div>
    </section>
  </SitePage>;
}
