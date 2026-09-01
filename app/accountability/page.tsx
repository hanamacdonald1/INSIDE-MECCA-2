import Link from "next/link";
import { ResponsiveTable } from "../components/ResponsiveTable";
import { PageHero, SitePage } from "../site-shell";

const projectLeadDisclosure =
  "As at 27 August 2026, I remain employed by MECCA and have worked there for seven years and ten months across multiple stores and Australian states. I created and run Inside MECCA independently. I do not act or speak on behalf of MECCA Brands, and this project is not affiliated with, endorsed by or operated by the company.";

const operatorDisclosure =
  "Inside MECCA is operated personally by me, the project lead. No separate incorporated company, association, trust, charity, newsroom, union or other legal entity operates the project.";

const fundingDisclosure =
  "Inside MECCA is self-funded by me, the project lead. No external funding, sponsorship or material in-kind support has been received.";

const adviserDisclosure =
  "Inside MECCA has received advice from individuals whose names are not published because I do not have their permission to identify them publicly. Their involvement is described only at this general level and should not be taken as public endorsement of the project or any publication.";

const controls = [
  ["Who leads the project", "Created and run independently by a current MECCA employee with 7 years and 10 months of experience across multiple stores and Australian states. Further identifying details are withheld during research and production for privacy and safety."],
  ["Public anonymity limits", "I use a public pseudonym. This can reduce casual identification risk, but it cannot guarantee anonymity against valid legal process, records held by service providers or re-identification from surrounding facts."],
  ["Relevant interests", "My current employment and the campaign's reform goals may affect perspective. They are disclosed so readers can judge the work in context."],
  ["Editorial controls", "Claims must be sourced, limits stated, conflicts disclosed and corrections recorded. Advocacy does not establish a finding."],
  ["Right of reply", "MECCA and anyone materially criticised will receive the substance of proposed findings and a reasonable chance to respond."],
];

const possibleOutcomes = [
  "The evidence supports a recurring pattern or a narrower issue.",
  "The evidence is mixed or too limited for a finding.",
  "The proposition is not supported.",
];

const successMeasures = [
  ["Representation", "A responsible spread of roles, workplace types, regions and employment periods, with gaps disclosed."],
  ["Evidence quality", "Material claims assessed for direct knowledge, documentary support, independent corroboration and contradictions."],
  ["Fair process", "Right-of-reply requests recorded and relevant responses represented before publication."],
  ["Contributor control", "Consent, contact, identity and publication preferences honoured throughout the work."],
  ["Transparent findings", "Published conclusions meet the evidence threshold and state uncertainty, limits and alternative explanations."],
  ["Practical response", "Recommendations are acknowledged, considered, adopted, challenged or implemented by those able to act."],
  ["Verified change", "Claims of reform are assessed against public commitments, timeframes, employee evidence and independent review where access allows."],
];

const governance = [
  ["Editorial decisions", "The project lead is responsible for final publication decisions. Planned external review is not represented as review that has already occurred."],
  ["Legal operator", operatorDisclosure],
  ["Sensitive access", "Contributor identities and sensitive records are restricted to people who need access for verification, editorial or legal purposes."],
  ["Funding and support", fundingDisclosure],
  ["External review and advisers", adviserDisclosure],
  ["Complaints and escalation", "Accuracy, fairness, privacy and consent concerns can be raised directly and escalated for independent advice where the issue cannot be resolved internally."],
  ["Identity-risk review", "Public disclosures, service-provider records and re-identification risk are reviewed before major publication. No promise of absolute anonymity is made."],
];

const conflicts = [
  {
    interest: "Project lead's current employment relationship with MECCA",
    why: "The project lead has direct workplace experience and an ongoing employment relationship with the organisation being examined.",
    management: "Prominent disclosure, source labelling, contrary-evidence review, proportionate findings, meaningful right of reply, corrections and independent review before high-risk publication.",
    status: "Active disclosure",
    reviewed: "26 August 2026",
  },
  {
    interest: "Workplace-reform and advocacy objectives",
    why: "The project seeks practical workplace change where supported findings justify it.",
    management: "Advocacy is disclosed and does not determine findings. Proposed conclusions may be narrowed, held or rejected when evidence is insufficient or contradictory.",
    status: "Active disclosure",
    reviewed: "26 August 2026",
  },
];

export default function AccountabilityPage() {
  return (
    <SitePage>
      <PageHero label="Project accountability" title="Who is behind Inside MECCA, and who checks the work?">
        <p>{projectLeadDisclosure}</p>
      </PageHero>

      <section className="rb-section">
        <p className="rb-kicker">Why this project exists</p>
        <h2>Test the difference between commitments and experience</h2>
        <p className="rb-lede">
          Inside MECCA was created to examine whether published workplace commitments align with employee experiences, using first-hand accounts, records, public sources and a meaningful right of reply. The project does not begin with a predetermined conclusion. The evidence may indicate shared concerns, isolated experiences, mixed evidence or insufficient support for a proposed claim.
        </p>
      </section>

      <section className="rb-section dark">
        <p className="rb-kicker">What readers are entitled to know</p>
        <h2>The perspective and controls behind the project</h2>
        <div className="rb-grid">
          {controls.map(([title, copy]) => (
            <article className="rb-card" key={title}>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rb-section">
        <p className="rb-kicker">Funding and external review</p>
        <h2>What is disclosed, and what is not yet confirmed</h2>
        <div className="rb-grid">
          <article className="rb-card">
            <h3>Funding and support</h3>
            <p>{fundingDisclosure}</p>
          </article>
          <article className="rb-card">
            <h3>External review and advisers</h3>
            <p>{adviserDisclosure}</p>
          </article>
        </div>
      </section>

      <section className="rb-section dark">
        <p className="rb-kicker">Conflicts of interest register</p>
        <h2>Relevant interests and how they are managed</h2>
        <div className="overflow-x-auto">
          <ResponsiveTable><table className="w-full border-collapse text-left">
            <thead>
              <tr>
                <th className="p-3 border-b border-stone-600">Interest</th>
                <th className="p-3 border-b border-stone-600">Why it matters</th>
                <th className="p-3 border-b border-stone-600">How it is managed</th>
                <th className="p-3 border-b border-stone-600">Status</th>
                <th className="p-3 border-b border-stone-600">Last reviewed</th>
              </tr>
            </thead>
            <tbody>
              {conflicts.map((item) => (
                <tr key={item.interest}>
                  <th scope="row" className="p-3 align-top border-b border-stone-800">{item.interest}</th>
                  <td className="p-3 align-top border-b border-stone-800">{item.why}</td>
                  <td className="p-3 align-top border-b border-stone-800">{item.management}</td>
                  <td className="p-3 align-top border-b border-stone-800">{item.status}</td>
                  <td className="p-3 align-top border-b border-stone-800">{item.reviewed}</td>
                </tr>
              ))}
            </tbody>
          </table></ResponsiveTable>
        </div>
      </section>

      <section className="rb-section">
        <p className="rb-kicker">The result is not decided in advance</p>
        <h2>What the evidence might show</h2>
        <p className="rb-lede">The investigation is testing whether MECCA&apos;s workplace commitments were followed in practice. It has to remain capable of reaching any of these outcomes:</p>
        <ul className="rb-list">{possibleOutcomes.map((item) => <li key={item}>{item}</li>)}</ul>
      </section>

      <section className="rb-section dark">
        <p className="rb-kicker">Judging the project</p>
        <h2>Reach is not the same thing as quality, and attention is not impact</h2>
        <p className="rb-lede">Traffic, social attention, submission volume and publication do not establish that the work is sound or that anything changed. The immediate test is whether the research is fair, safe and well supported. The longer-term test is whether decision-makers respond and any claimed change can be checked.</p>
        <div className="rb-grid">
          {successMeasures.map(([title, copy]) => (
            <article className="rb-card" key={title}>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rb-section">
        <p className="rb-kicker">How decisions are controlled</p>
        <h2>Who decides, who can see sensitive material and when outside review is needed</h2>
        <div className="governance-list">
          {governance.map(([title, copy]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
        <p className="rb-note">These are the standards the project intends to meet. If a control is still being established, I will say that plainly rather than imply outside oversight already exists.</p>
      </section>

      <section className="rb-section dark">
        <p className="rb-kicker">Challenge the work</p>
        <h2>Think I have something wrong?</h2>
        <p className="rb-lede">Tell me which statement you are concerned about, provide any supporting information you can share, and explain the correction or qualification you are asking for.</p>
        <div className="rb-actions">
          <a className="rb-button red" href="mailto:contact@insidemecca.net?subject=Inside%20MECCA%20accountability%20or%20correction">Raise a concern</a>
          <Link className="rb-button" href="/methodology">Read the methodology</Link>
          <Link className="rb-button" href="/editorial-ethics">Read the editorial standards</Link>
        </div>
      </section>
    </SitePage>
  );
}
