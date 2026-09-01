import Link from "next/link";
import type { Metadata } from "next";
import { SitePage } from "../../site-shell";
import { buildMetadata, defaultSocialImage, siteUrl } from "../../seo";
import { getAnalysisEntry } from "../data";

const entry = getAnalysisEntry("working-at-mecca-reviews")!;
const pageUrl = `${siteUrl}/analysis/${entry.slug}`;

export const metadata: Metadata = buildMetadata({
  title: "Working at MECCA Reviews & Workplace Culture",
  description: "Explore MECCA employee experiences and management reviews with source-led context on workplace culture, company commitments and evidence limits.",
  path: `/analysis/${entry.slug}`,
  type: "article",
  publishedTime: entry.published,
  modifiedTime: entry.updated,
});

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: entry.title,
    description: entry.description,
    datePublished: entry.published,
    dateModified: entry.updated,
    mainEntityOfPage: pageUrl,
    url: pageUrl,
    image: `${siteUrl}${defaultSocialImage}`,
    isAccessibleForFree: true,
    author: { "@id": `${siteUrl}/#organization` },
    publisher: { "@id": `${siteUrl}/#organization` },
    about: ["Working at MECCA", "MECCA Brands workplace culture", "MECCA employee experiences", "MECCA management reviews"],
    inLanguage: "en-AU",
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Analysis", item: `${siteUrl}/analysis` },
      { "@type": "ListItem", position: 3, name: entry.shortTitle, item: pageUrl },
    ],
  },
];

export default function WorkingAtMeccaReviewsPage() {
  return <SitePage>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <article className="analysis-article">
      <header className="analysis-hero">
        <nav aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/analysis">Analysis</Link></nav>
        <p className="rb-kicker">{entry.category}</p>
        <h1>Working at MECCA reviews: what can they really tell you?</h1>
        <p className="analysis-deck">Employee reviews are often the first thing people find when they search for MECCA&apos;s workplace culture. They can raise useful questions. They cannot make one person&apos;s experience stand in for an entire workforce.</p>
        <div className="analysis-byline"><time dateTime={entry.published}>Published {entry.displayDate}</time><span>Updated {entry.displayDate}</span><span>{entry.readingTime}</span></div>
      </header>

      <div className="analysis-body">
        <aside className="analysis-summary" aria-label="Article summary">
          <strong>The short version</strong>
          <p>Review sites are useful lead sources, not verified workforce surveys. Read across platforms, roles and time periods. Then compare any recurring themes with first-hand testimony, documents, company responses and evidence pointing the other way.</p>
        </aside>

        <section>
          <h2>Start with the review, but do not stop there</h2>
          <p>Public review platforms contain both positive and critical accounts of working at MECCA. They can show what individual reviewers chose to report about benefits, development, team relationships, workload, progression, workplace culture and management. They can also help identify questions that deserve closer examination.</p>
          <p>They do not, by themselves, establish how common an experience was, whether every detail is accurate or whether conditions were consistent across stores, support offices, distribution centres, regions, roles and time periods. Reviewers are self-selecting, identities are usually not independently available to readers and platform moderation is not the same as an evidence investigation.</p>
        </section>

        <section>
          <h2>People describe MECCA&apos;s workplace culture differently</h2>
          <p>A responsible assessment has to hold different kinds of evidence side by side. Employer descriptions and internal policies show the culture and systems a company says it intends to provide. Employee reviews and testimony show what particular people say they experienced. Public reporting and official records may establish additional facts, but each source has its own scope and limits.</p>
          <p>Positive reviews do not disprove critical accounts. Critical reviews do not prove that an alleged problem was universal or systemic. The central question is whether independently supported patterns emerge when accounts are compared with records, stated commitments, alternative explanations and the company&apos;s response.</p>
        </section>

        <section>
          <h2>Questions to ask while you read</h2>
          <ul className="analysis-steps">
            <li><strong>Check the reviewer&apos;s vantage point.</strong><span>Role, location, employment period and direct knowledge affect what an account can establish.</span></li>
            <li><strong>Separate a report from a finding.</strong><span>A review proves that a statement was published. It does not automatically prove the underlying conduct.</span></li>
            <li><strong>Look for independent support.</strong><span>Similar themes matter more when they arise independently and include specific, checkable detail.</span></li>
            <li><strong>Compare policy with practice.</strong><span>Policies establish stated expectations. They do not establish that a process operated consistently in every case.</span></li>
            <li><strong>Seek contradictory evidence.</strong><span>Positive accounts, different explanations and management responses must be considered, not edited out.</span></li>
            <li><strong>Keep scale in view.</strong><span>A collection of submissions to an investigation is not a representative survey of all current and former employees.</span></li>
          </ul>
        </section>

        <section>
          <h2>A review about a manager may be local, regional or part of something wider</h2>
          <p>Reviews that discuss managers can point to questions about local leadership, escalation, performance expectations, communication, scheduling, promotion and psychological safety. The level of management matters: a store-level decision, a regional practice and a company-wide policy are not interchangeable.</p>
          <p>Before drawing a broader conclusion, an investigation needs to ask whether the account concerns one decision or a repeated process, whether the reviewer had direct knowledge, whether records exist, whether others independently describe the same pattern and what the relevant manager or MECCA says in response.</p>
        </section>

        <section>
          <h2>Where else to look</h2>
          <p>Ratings and review counts change (scores shown were last checked in August 2026), so this page links to the live sources for current numbers. Inside MECCA does not treat a platform&apos;s aggregate rating as a prevalence estimate or an independent finding.</p>
          <ul className="analysis-sources">
            <li><a href="https://au.seek.com/companies/mecca-brands-813817/reviews" target="_blank" rel="noreferrer"><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}><strong>SEEK employee reviews</strong><div className="font-mono text-xs font-bold bg-[#eee9e2] text-[#b42025] px-2 py-1 rounded whitespace-nowrap">3.8 / 5</div></div><span>Individual reviews and category ratings, published under SEEK&apos;s platform rules.</span></a></li>
            <li><a href="https://au.seek.com/companies/mecca-brands-813817/culture" target="_blank" rel="noreferrer"><strong>SEEK company culture page</strong><span>Employer culture and benefits material alongside platform navigation to reviews.</span></a></li>
            <li><a href="https://au.indeed.com/cmp/Mecca-Brands/reviews?ftopic=culture" target="_blank" rel="noreferrer"><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}><strong>Indeed culture reviews</strong><div className="font-mono text-xs font-bold bg-[#eee9e2] text-[#b42025] px-2 py-1 rounded whitespace-nowrap">4.1 / 5</div></div><span>Employee-submitted reviews filtered around workplace culture.</span></a></li>
            <li><a href="https://www.glassdoor.com.au/Reviews/Mecca-Brands-Reviews-E876238.htm" target="_blank" rel="noreferrer"><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}><strong>Glassdoor reviews</strong><div className="font-mono text-xs font-bold bg-[#eee9e2] text-[#b42025] px-2 py-1 rounded whitespace-nowrap">3.6 / 5</div></div><span>Employee reviews and ratings across culture, management and other workplace categories.</span></a></li>
          </ul>
          <div className="analysis-commentary-link"><p><strong>New: Public Commentary</strong></p><p>Browse approved, de-identified excerpts from publicly posted comments. Usernames and identifying details are never shown, and each excerpt is labelled as unverified.</p><Link className="rb-button" href="/analysis/public-commentary">Open the public commentary section</Link></div>
          <div className="analysis-commentary-link"><p><strong>Analysis: Identity, inclusion and workplace experience</strong></p><p>An evidence-led examination of reported experiences involving appearance, race, disability, belonging, progression and speaking up.</p><Link className="rb-button" href="/analysis/identity-inclusion">Read the analysis</Link></div>
        </section>

        <section>
          <h2>How Inside MECCA uses these reviews</h2>
          <p>Inside MECCA uses public reviews as leads and context, not as findings. The project seeks first-hand accounts, checks consent, separates direct knowledge from hearsay, records supporting and conflicting material, assesses whether accounts are independent and gives relevant parties a fair opportunity to respond before material conclusions are published.</p>
          <p>The same standard applies to favourable and unfavourable claims. A claim is not a finding. Where evidence is incomplete, disputed, unrepresentative or unavailable, that limitation should remain visible.</p>
          <div className="analysis-links">
            <Link href="/research-centre/public-claims/2019-workplace-culture"><span>Source-led investigation</span><strong>The 2019 workplace-culture allegations and response</strong></Link>
            <Link href="/stories"><span>Employee experiences</span><strong>Carefully framed workplace case studies</strong></Link>
            <Link href="/employer-commitments"><span>Policy and practice</span><strong>MECCA employer commitments and document breakdowns</strong></Link>
            <Link href="/employer-commitments/categories/career-development"><span>Career progression</span><strong>MECCA career development guidance and evidence limits</strong></Link>
            <Link href="/employer-commitments/categories/performance-feedback"><span>Performance reviews</span><strong>MECCA performance and feedback frameworks</strong></Link>
            <Link href="/analysis/mecca-complaints-whistleblower-policy"><span>Complaints and speaking up</span><strong>What MECCA&apos;s public policies say about different reporting pathways</strong></Link>
            <Link href="/methodology"><span>Evidence standard</span><strong>How claims are assessed before publication</strong></Link>
          </div>
        </section>

        <section className="analysis-cta">
          <p className="rb-kicker">Worked at MECCA?</p>
          <h2>What happened to you may add context a rating cannot</h2>
          <p>If you are a current or former employee, you can share what you experienced or directly witnessed. You decide what to provide, whether to identify yourself and whether the project may contact you. Publication requires separate permission.</p>
          <div className="rb-actions"><Link className="rb-button red" href="/share-story">Share your experience</Link><Link className="rb-button" href="/evidence">Read the evidence standards</Link></div>
        </section>
      </div>
    </article>
  </SitePage>;
}
