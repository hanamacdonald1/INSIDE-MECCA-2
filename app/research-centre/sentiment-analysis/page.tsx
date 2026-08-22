import Link from "next/link";
import { SitePage } from "../../site-shell";
import { siteUrl } from "../../seo";

const metrics = [
  { label: "Online store rating", value: 1.8, note: "ProductReview snapshot" },
  { label: "Physical store average", value: 2.9, note: "Google Maps synthesis" },
  { label: "Management rating", value: 3.7, note: "Indeed snapshot" },
  { label: "Overall service metric", value: 2.5, note: "Compiled in the supplied analysis" },
];

const issues = [
  {
    priority: "P1",
    level: "Critical research priority",
    tone: "critical",
    title: "Workplace culture",
    summary: "Reports concerning manager bullying, roster or shift effects following availability boundaries, and staff feeling shamed for sick leave or skin conditions.",
    sources: "Reddit, Indeed and 7NEWS",
  },
  {
    priority: "P1",
    level: "Critical research priority",
    tone: "critical",
    title: "Youth skincare marketing",
    summary: "Reports and public discussion about high-potency skincare being promoted to younger customers, including accounts of irritation or chemical burns.",
    sources: "TikTok, YouTube and CHOICE",
  },
  {
    priority: "P1",
    level: "Critical research priority",
    tone: "critical",
    title: "Product integrity",
    summary: "Reports describing clearance or Boxing Day stock as contaminated or expired, including claims that some products were up to four years old.",
    sources: "ProductReview and Threads",
  },
  {
    priority: "P2",
    level: "High research priority",
    tone: "high",
    title: "Service and demographic bias",
    summary: "Accounts of customers feeling refused, profiled or overlooked because of age, race, appearance or arriving without makeup.",
    sources: "Reddit beauty communities",
  },
  {
    priority: "P2",
    level: "High research priority",
    tone: "high",
    title: "Beauty Loop value",
    summary: "Public criticism of smaller samples, promotional expectations and the amount of spending required to reach or retain loyalty tiers.",
    sources: "r/MeccaBeautyLoop",
  },
  {
    priority: "P2",
    level: "High research priority",
    tone: "high",
    title: "Market concentration",
    summary: "The supplied analysis records a 70% portfolio exclusivity estimate and concerns about competition and pricing. The estimate requires a source-level methodology note.",
    sources: "Consumer-watchdog material named in the supplied analysis",
  },
];

const risks = [
  ["Workplace operations", "Performance pressure, local management and escalation systems", "Critical"],
  ["Inventory management", "Stock-age controls, quality checks and clearance processes", "Critical"],
  ["Beauty Loop and loyalty", "Promotional value, tier rules and customer expectations", "High"],
  ["Digital retailing", "Fulfilment automation, exceptions and service recovery", "Medium"],
];

const responses = [
  ["01", "Governance and psychological safety", "Test whether sales-linked management measures create unintended pressure. Assess independent reporting channels, employee retention and psychological-safety indicators."],
  ["02", "Equitable customer service", "Test consistent service protocols across stores, including how age, race, presentation and complexion needs affect access to assistance and shade matching."],
  ["03", "Inventory integrity", "Review clearance-stock age, batch controls, storage conditions and escalation. Preserve the distinction between a reported product concern and verified contamination."],
  ["04", "Age-appropriate skincare", "Assess screening, staff guidance and customer information for high-potency formulations promoted or sold to children and young teenagers."],
];

const researchSchema = {
  "@context": "https://schema.org",
  "@type": "Report",
  headline: "Cross-platform MECCA sentiment and operational risk snapshot",
  description: "A source-labelled synthesis of employee and customer sentiment themes, ratings, research priorities and proposed responses.",
  datePublished: "2026-08-11",
  dateModified: "2026-08-11",
  url: `${siteUrl}/research-centre/sentiment-analysis`,
  publisher: { "@id": `${siteUrl}/#organization` },
  about: ["MECCA Brands", "employee sentiment", "customer sentiment", "operational risk"],
  inLanguage: "en-AU",
};

function MetricBar({ label, value, note }: (typeof metrics)[number]) {
  return <div className="sa-bar-row">
    <div><strong>{label}</strong><small>{note}</small></div>
    <div className="sa-bar-track" aria-hidden="true"><i style={{ width: `${value / 5 * 100}%` }} /></div>
    <b>{value.toFixed(1)}</b>
  </div>;
}

export default function SentimentAnalysisPage() {
  return <SitePage>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(researchSchema) }} />
    <article className="sa-page">
      <header className="sa-hero">
        <nav aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/research-centre">Research Centre</Link></nav>
        <p className="rb-kicker">A cross-platform research snapshot</p>
        <h1>What employee and customer commentary is pointing us towards</h1>
        <p className="sa-deck">This page brings together employee commentary, customer reviews and public discussion about workplace culture, service, loyalty, product integrity and youth skincare. It shows where the supplied research suggests looking next, not what the investigation has proven.</p>
        <div className="sa-tags" aria-label="Research characteristics"><span>Employee and customer sentiment</span><span>Multi-platform snapshot</span><span>Research priorities, not findings</span></div>
      </header>

      <section className="sa-status" aria-label="Research status">
        <div><span>Evidence class</span><strong>Research synthesis and lead sources</strong></div>
        <div><span>Source groups</span><strong>Reviews, social discussion and reporting</strong></div>
        <div><span>Page reviewed</span><strong>11 August 2026</strong></div>
      </section>

      <section className="sa-section sa-intro">
        <div><p className="rb-kicker">How to read this page</p><h2>The gap is a reason to investigate, not a conclusion</h2></div>
        <div><p>The supplied research identifies a difference between MECCA&apos;s public positioning and critical experiences reported across several platforms. It groups those concerns into questions that can be tested against first-hand evidence, documents, current platform data, contrary material and MECCA&apos;s response.</p><p className="sa-callout"><strong>A claim is not a finding.</strong> Ratings and self-selected commentary show what people chose to report. They do not establish prevalence, causation, company-wide conditions or a legal breach.</p></div>
      </section>

      <section className="sa-section dark sa-ratings">
        <div className="sa-heading"><p className="rb-kicker">Ratings in the supplied research</p><h2>The apparent satisfaction gap</h2><p>These scores are reproduced from the supplied analysis on a five-point scale. They are not live ratings.</p></div>
        <div className="sa-rating-layout">
          <div className="sa-bars" role="img" aria-label="Online store 1.8 out of 5, physical store average 2.9, management 3.7 and compiled overall service metric 2.5">{metrics.map(metric => <MetricBar key={metric.label} {...metric} />)}</div>
          <aside><strong>Source note</strong><p>The artifact attributes these figures to ProductReview, Indeed and Google Maps. It does not record review counts, store sample, collection dates or the method used to calculate the physical-store and overall-service figures. They are displayed as a supplied snapshot, not as current live ratings.</p></aside>
        </div>
      </section>

      <section className="sa-section">
        <div className="sa-heading"><p className="rb-kicker">Questions raised by the snapshot</p><h2>Six groups of issues to investigate</h2><p>The priority labels come from the supplied research&apos;s assessment of potential safety, regulatory and trust implications. They are not regulator determinations.</p></div>
        <div className="sa-issue-grid">{issues.map(issue => <article className={`sa-issue ${issue.tone}`} key={issue.title}>
          <header><span>{issue.level}</span><code>{issue.priority}</code></header>
          <h3>{issue.title}</h3><p>{issue.summary}</p>
          <footer><strong>Source groups named</strong><span>{issue.sources}</span></footer>
        </article>)}</div>
      </section>

      <section className="sa-section dark sa-risk-section">
        <div className="sa-heading"><p className="rb-kicker">Where to look first</p><h2>How the supplied analysis prioritises further work</h2><p>The 45 / 35 / 20 split is a working risk model from the supplied material. It describes editorial priority, not how often an incident occurred.</p></div>
        <div className="sa-risk-layout">
          <div className="sa-donut-wrap"><div className="sa-donut" role="img" aria-label="Working risk allocation: 45 percent critical regulatory risk, 35 percent high brand erosion risk, 20 percent medium operational friction"><div><strong>45%</strong><span>critical focus</span></div></div><ul><li><i className="critical"/>45% critical regulatory focus</li><li><i className="high"/>35% high brand and trust focus</li><li><i className="medium"/>20% medium operational focus</li></ul></div>
          <div className="sa-risk-table" role="table" aria-label="Strategic research risk map">
            <div className="head" role="row"><span role="columnheader">Operational category</span><span role="columnheader">Mechanism to test</span><span role="columnheader">Priority</span></div>
            {risks.map(([category, mechanism, risk]) => <div role="row" key={category}><strong role="cell">{category}</strong><span role="cell">{mechanism}</span><b className={risk.toLowerCase()} role="cell">{risk}</b></div>)}
          </div>
        </div>
      </section>

      <section className="sa-section">
        <div className="sa-heading"><p className="rb-kicker">Possible responses</p><h2>Ideas that would need to be tested, not assumed to work</h2><p>These proposals are separate from the findings. Each would need consultation, a clear baseline, implementation evidence and independent review before anyone could claim it was effective.</p></div>
        <div className="sa-response-grid">{responses.map(([number, title, body]) => <article key={number}><div><h3>{title}</h3><p>{body}</p></div></article>)}</div>
      </section>

      <section className="sa-section sa-method">
        <div><p className="rb-kicker">What the snapshot is good for</p><h2>What this page can and cannot support</h2></div>
        <div className="sa-method-grid"><article><strong>It can show</strong><p>The ratings, themes, priorities and proposals contained in the supplied cross-platform synthesis.</p></article><article><strong>It cannot show alone</strong><p>How common any experience was, whether accounts were independent, or whether a concern reflects one location, period or company-wide practice.</p></article><article><strong>Next verification step</strong><p>Preserve URLs, dates, review counts and exact extracts, then compare them with first-hand accounts, documents, contrary evidence and right of reply.</p></article></div>
        <div className="rb-actions"><Link className="rb-button red" href="/methodology">Read the evidence methodology</Link><Link className="rb-button" href="/analysis/working-at-mecca-reviews">How public reviews are assessed</Link><Link className="rb-button" href="/share-story">Share first-hand evidence</Link></div>
      </section>
    </article>
  </SitePage>;
}
