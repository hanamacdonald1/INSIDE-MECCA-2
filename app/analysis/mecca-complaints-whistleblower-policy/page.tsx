import Link from "next/link";
import type { Metadata } from "next";
import { SitePage } from "../../site-shell";
import { buildMetadata, defaultSocialImage, siteUrl } from "../../seo";
import { getAnalysisEntry } from "../data";

const entry = getAnalysisEntry("mecca-complaints-whistleblower-policy")!;
const pageUrl = `${siteUrl}/analysis/${entry.slug}`;
const whistleblowerPolicyUrl = "https://www.mecca.com/en-au/policies/whistleblower-policy/";
const bullyingPolicyUrl = "https://mecca.stoplinereport.com/wp-content/uploads/2024/11/Discrimination-Bullying-Harassment-Policy.pdf";

export const metadata: Metadata = buildMetadata({
  title: "MECCA Complaints & Whistleblower Policy Explained",
  description: "A source-labelled guide to MECCA complaint and whistleblower pathways, what the published policies say, and what they do not establish about practice.",
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
    about: ["MECCA complaints process", "MECCA whistleblower policy", "workplace complaints", "speaking up at work"],
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

const evidenceClasses = [
  ["Verified public company policy", "MECCA's whistleblower policy is published on the company's website. The page states that it was last amended in February 2022. This article was checked against the live page on 12 August 2026."],
  ["Publicly hosted company policy", "A Discrimination, Bullying & Harassment Policy is publicly available through MECCA's Stopline site. The PDF states an effective date of December 2015. Its current internal status has not been independently confirmed."],
  ["Public employee reviews", "Reviews may describe what individual people say they experienced, but they are not used here to establish what MECCA's formal complaint process was or how it operated in any particular case."],
  ["Submissions to Inside MECCA", "Private submissions are not used on this page. A separately published case study remains first-hand testimony with its own consent, evidence status and limitations."],
  ["Inside MECCA analysis", "This page compares what the public policies say, identifies distinctions between pathways and records what the documents cannot establish about practice."],
] as const;

export default function MeccaComplaintsWhistleblowerPolicyPage() {
  return <SitePage>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <article className="analysis-article">
      <header className="analysis-hero">
        <nav aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/analysis">Analysis</Link></nav>
        <p className="rb-kicker">{entry.category}</p>
        <h1>MECCA complaints and whistleblower policy: what the public sources say</h1>
        <p className="analysis-deck">People searching for MECCA&apos;s complaints process may be looking for more than one pathway. The company&apos;s public sources distinguish personal workplace grievances, bullying and harassment complaints, and protected whistleblower disclosures.</p>
        <div className="analysis-byline"><time dateTime={entry.published}>Published {entry.displayDate}</time><span>{entry.readingTime}</span><span>Sources checked 12 August 2026</span></div>
      </header>

      <div className="analysis-body">
        <aside className="analysis-summary" aria-label="Important limits">
          <strong>The short version</strong>
          <p>A published policy shows how a company says a process should work. It does not prove that the process was followed consistently, that a particular complaint was substantiated, or that any person or organisation breached the law.</p>
        </aside>

        <section>
          <h2>Keep the source categories separate</h2>
          <p>The material on this page does not all have the same evidentiary role. Company policies describe stated procedures. Public reviews and first-hand accounts describe individual experiences. Inside MECCA analysis identifies what can be compared and which questions remain unanswered.</p>
          <div className="rb-grid">{evidenceClasses.map(([title, description]) => <article className="rb-card" key={title}><h3>{title}</h3><p>{description}</p></article>)}</div>
        </section>

        <section>
          <h2>The public sources describe more than one reporting pathway</h2>
          <p>MECCA&apos;s public whistleblower policy says statutory protection depends on who makes the disclosure, what is disclosed and who receives it. It distinguishes a protected disclosure from a personal work-related grievance. The policy says personal grievances should generally be raised with a manager, a Human Resources manager or another MECCA leader the employee feels comfortable approaching.</p>
          <p>The same policy says some personal grievances can overlap with a disclosable matter in limited circumstances, including where the disclosure indicates misconduct beyond the individual&apos;s circumstances or where detrimental treatment follows a disclosure. The legal classification depends on the facts. This page cannot determine which pathway applies to an individual.</p>
          <p>The separate bullying and harassment policy describes manager and Talent and Culture responsibilities, informal and formal intervention, record keeping, investigation steps and possible outcomes. Because the PDF is dated December 2015, it should not be assumed to be the current internal procedure without confirmation.</p>
        </section>

        <section>
          <h2>What the public whistleblower policy says</h2>
          <ul className="analysis-steps">
            <li><strong>Eligibility matters.</strong><span>The policy links statutory protection to an eligible whistleblower, an eligible recipient and a disclosable matter.</span></li>
            <li><strong>Anonymous reporting is contemplated.</strong><span>The policy says a person may report anonymously, while noting that an investigation can only work with the information available.</span></li>
            <li><strong>An external channel is listed.</strong><span>The policy identifies Stopline as an independent and confidential reporting service that acts as an intermediary between the reporter and MECCA.</span></li>
            <li><strong>Assessment is not the same as a formal investigation.</strong><span>The policy says reports are assessed and a decision is made about whether and how they should be investigated.</span></li>
            <li><strong>Confidentiality affects feedback.</strong><span>The policy says feedback may be provided where appropriate, subject to confidentiality and other constraints.</span></li>
          </ul>
          <p className="rb-note">Contact names, recipients and reporting details can change. Open the current company policy directly before relying on a reporting channel.</p>
        </section>

        <section>
          <h2>What the public bullying and harassment policy says</h2>
          <p>The publicly hosted PDF describes a staged resolution process. It says a person may raise conduct directly if they feel comfortable, then approach a manager, another manager or Talent and Culture. It also describes written escalation, informal intervention and a formal process involving interviews, records and relevant evidence.</p>
          <p>The document says complaints should be taken seriously and confidentially, and that action may follow depending on the evidence and outcome. Those are policy statements. This page does not establish whether the process operated that way in a particular workplace, period or case.</p>
        </section>

        <section>
          <h2>Questions the public documents cannot answer on their own</h2>
          <ul>
            <li>Which policy version applied to a particular employee, workplace and date?</li>
            <li>Whether employees knew about and could access the relevant pathway.</li>
            <li>How quickly a particular report was acknowledged, assessed or investigated.</li>
            <li>Whether records were complete and whether affected people had a fair opportunity to respond.</li>
            <li>What outcome was reached and what could lawfully be communicated to the parties.</li>
            <li>Whether anyone experienced detrimental treatment after speaking up.</li>
          </ul>
          <p>Answering those questions requires case-specific records, first-hand evidence, responses from relevant parties and current legal context. A policy alone is not enough.</p>
        </section>

        <section>
          <h2>Public sources</h2>
          <ul className="analysis-sources">
            <li><a href={whistleblowerPolicyUrl} target="_blank" rel="noreferrer"><strong>MECCA Whistleblower Policy</strong><span>Official company webpage. The page states that the policy was last amended in February 2022.</span></a></li>
            <li><a href={bullyingPolicyUrl} target="_blank" rel="noreferrer"><strong>MECCA Discrimination, Bullying & Harassment Policy</strong><span>Public PDF hosted on MECCA&apos;s Stopline site. The document states an effective date of December 2015; current status is not independently confirmed.</span></a></li>
          </ul>
        </section>

        <section>
          <h2>Related Inside MECCA material</h2>
          <div className="analysis-links">
            <Link href="/employer-commitments/categories/speaking-up"><span>Company guidance</span><strong>Speaking up at MECCA: documented commitments</strong></Link>
            <Link href="/research-centre/workplace-law"><span>General legal context</span><strong>Workplace bullying, complaints and retaliation</strong></Link>
            <Link href="/research-centre/public-claims/2019-workplace-culture"><span>Public record</span><strong>The 2019 workplace-culture allegations, response and review gap</strong></Link>
            <Link href="/stories/case-study-001"><span>First-hand testimony</span><strong>A former employee account of reporting workplace concerns</strong></Link>
            <Link href="/evidence"><span>Evidence standards</span><strong>How policy, testimony, records and findings are distinguished</strong></Link>
          </div>
        </section>

        <section className="analysis-cta">
          <p className="rb-kicker">Important</p>
          <h2>This is research context, not legal advice or a reporting service</h2>
          <p>Inside MECCA is not MECCA&apos;s whistleblower hotline, a regulator, an employee representative body or a law firm. If you need to rely on legal protections or decide where to report, obtain independent advice about your circumstances and check the current official pathway.</p>
          <div className="rb-actions"><a className="rb-button red" href={whistleblowerPolicyUrl} target="_blank" rel="noreferrer">Open MECCA&apos;s current policy</a><Link className="rb-button" href="/legal-publication-policy">Inside MECCA&apos;s legal and publication safeguards</Link></div>
        </section>
      </div>
    </article>
  </SitePage>;
}
