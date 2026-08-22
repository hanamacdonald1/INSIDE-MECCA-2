import Link from "next/link";
import { EditorialGuidePanel } from "../../employer-commitments/editorial-guide";
import { PageHero, SitePage } from "../../site-shell";

const reviewQuestions = [
  ["Provenance", "What is the document's origin, custody history and relationship to the contributor?"],
  ["Authority", "Was the contributor entitled to possess and provide it, and were any duties or restrictions attached?"],
  ["Authenticity and scope", "Can its date, version, intended audience and status be independently confirmed?"],
  ["Publication risk", "What confidentiality, copyright, privacy, source-safety or other legal issues arise from the file, excerpts or analysis?"],
  ["Public interest", "What, if anything, is necessary and proportionate to publish after considering safer alternatives?"],
  ["Fairness", "What verification, context and right of reply are required before any public use?"],
];

export default function DevelopmentPlanning() {
  return <SitePage>
    <PageHero label="Publication boundary / Legal hold" title="Why supplied development-planning material stays outside the public record">
      <p>This page records an editorial decision to withhold. It does not publish the source, describe its contents or make a finding from it.</p>
    </PageHero>
    <div className="ec-archive"><EditorialGuidePanel /></div>
    <section className="rb-section">
      <p className="rb-kicker">Before any public use</p>
      <h2>The checks required before any public use</h2>
      <div className="rb-grid">{reviewQuestions.map(([title, detail]) => <article className="rb-card" key={title}><h3>{title}</h3><p>{detail}</p></article>)}</div>
    </section>
    <section className="rb-section dark">
      <p className="rb-kicker">What the document does not establish</p>
      <h2>We are not making a finding from this material</h2>
      <div className="rb-split">
        <div><h3>Current status</h3><ul className="rb-list"><li>The source file is restricted.</li><li>Source-derived excerpts and analysis are withheld.</li><li>Independent authentication and publication clearance remain unresolved.</li></ul></div>
        <div><h3>What receipt does not establish</h3><ul className="rb-list"><li>That the document is authentic or current.</li><li>That the contributor was authorised to provide it.</li><li>That Inside MECCA is entitled to publish it.</li><li>That its contents were implemented in practice.</li></ul></div>
      </div>
      <p className="rb-note">This status page does not promise later publication. Any proposed use would depend on qualified legal review, evidence assessment, necessity and proportionality, contributor safety, and a fair opportunity for relevant parties to respond.</p>
      <div className="rb-actions"><Link className="rb-button red" href="/editorial-ethics">Read the publication safeguards</Link><Link className="rb-button" href="/accountability">Project accountability</Link></div>
    </section>
  </SitePage>;
}
