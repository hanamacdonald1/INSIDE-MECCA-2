import Link from "next/link";
import { PageHero, SitePage } from "../site-shell";
import { evidenceLabels } from "../research-centre/data";

const standards = [
  ["Direct knowledge", "Separate personal experience and direct observation from documents, inference and information supplied by another person."],
  ["Source independence", "Check whether accounts are genuinely separate or reflect shared discussion, copied material, the same incident or the same underlying source."],
  ["Corroboration", "Test material details against independent accounts, contemporary records, witnesses, public records and contrary evidence."],
  ["Contradictions", "Record conflicting accounts, missing information and reasonable alternative explanations instead of smoothing them away."],
  ["Proportion", "Do not make a broader claim than the evidence, sample and contributor consent support."],
  ["Right of reply", "Give materially affected people and organisations a fair opportunity to answer proposed substantive criticism."],
];

const verificationSteps = [
  ["Log", "The source or account is preserved with date, origin, access conditions and known limitations."],
  ["Assess", "Direct knowledge, authenticity, scope, consistency, relevance and possible conflicting evidence are considered."],
  ["Corroborate", "Material parts are compared with independent accounts, contemporary records or primary documents where available."],
  ["Seek response", "A person or organisation materially affected receives the substance of proposed findings, reasonable time and a practical way to respond."],
  ["Review", "Accuracy, fairness, privacy, source safety, legal risk and the limits of the evidence are checked before publication."],
  ["Publish or hold", "A finding is published only when its wording is proportionate to the evidence. Otherwise it remains under review, is narrowed or is not published."]
];

const codingThemes = [
  "Bullying and harassment",
  "Management and leadership",
  "Psychological safety",
  "Workload and staffing",
  "Training and development",
  "Pay and benefits",
  "Career progression",
  "Performance and evaluation",
  "Inclusion and accessibility",
  "Team culture",
  "Work-life balance",
  "Customer conduct and staff safety",
  "Reporting concerns and retaliation",
  "Employment security and rostering",
  "Other and uncoded material",
];

const codingDefinitions: Record<string, string> = {
  "Bullying and harassment": "Reported repeated unreasonable behaviour, humiliation, intimidation, exclusion, sexual harassment or other alleged harassment. The code describes the account, not a legal conclusion.",
  "Management and leadership": "Supervision, management conduct, decision-making, communication, support, favouritism or accountability.",
  "Psychological safety": "Ability to ask questions, raise concerns, admit mistakes or seek support without fear of humiliation or retaliation.",
  "Workload and staffing": "Staffing levels, workload, targets, unpaid or additional hours and operational pressure.",
  "Training and development": "Induction, product or role training, coaching, feedback and access to development.",
  "Pay and benefits": "Pay, discount, leave, entitlements, benefits or alleged underpayment.",
  "Career progression": "Promotion, acting opportunities, development pathways and selection decisions.",
  "Performance and evaluation": "Formal reviews, sales targets, KPIs, mystery shop audits, feedback consistency and disciplinary procedures.",
  "Inclusion and accessibility": "Disability, race, culture, gender, sexuality, religion, age, accessibility and inclusion concerns or positive experiences.",
  "Team culture": "Peer relationships, belonging, conflict, collaboration and differences between teams or locations.",
  "Work-life balance": "Breaks, availability, scheduling expectations, overtime and boundaries outside work.",
  "Customer conduct and staff safety": "Workplace harassment, aggressive customer interactions, retail theft protocols and store-level safety support.",
  "Reporting concerns and retaliation": "Internal complaints, whistleblowing, escalation, investigation response and alleged adverse treatment after speaking up.",
  "Employment security and rostering": "Casual hours, roster predictability, transfer, discipline, termination and security of employment.",
  "Other and uncoded material": "Material that does not fit the codebook. It is reviewed for a possible new code rather than forced into an existing category.",
};

export default function Methodology() {
  return <SitePage>
    <PageHero label="Methodology" title="What happens after someone submits an account">
      <p>Records, personal accounts, allegations, analysis and findings are not interchangeable. This page shows how we keep them separate and decide whether material is ready for public use.</p>
      <div className="rb-actions"><Link className="rb-button" href="/evidence">Evidence types and labels</Link><Link className="rb-button" href="/editorial-ethics">Editorial standards</Link></div>
    </PageHero>

    <section className="rb-section">
      <p className="rb-kicker">The basic tests</p>
      <h2>Questions we ask about every material claim</h2>
      <p className="rb-lede">The answer may strengthen a claim, narrow it or show that there is not enough evidence to publish it.</p>
      <div className="rb-grid">{standards.map(([title, description]) => <article className="rb-card" key={title}><h3>{title}</h3><p>{description}</p></article>)}</div>
    </section>

    <section className="rb-section dark" id="coding">
      <p className="rb-kicker">How accounts are organised</p>
      <h2>What a theme code means, and what it does not</h2>
      <p className="rb-lede">An eligible submission can have more than one theme code. We apply codes to the account and its supporting material, not to the conclusion a contributor wants us to reach. The original account remains separate from the analytical record.</p>
      <div className="rb-grid">{codingThemes.map(theme => <article className="rb-card" key={theme}><h3>{theme}</h3><p>{codingDefinitions[theme]}</p></article>)}</div>
    </section>

    <section className="rb-section" id="counting">
      <p className="rb-kicker">When the same theme appears more than once</p>
      <h2>How we count without making the numbers say too much</h2>
      <div className="rb-grid">
        <article className="rb-card"><h3>Unit of analysis</h3><p>The primary count is one eligible submission from one contributor. Multiple events or documents from the same contributor do not become multiple independent accounts.</p></article>
        <article className="rb-card"><h3>Deduplication</h3><p>Duplicate forms, follow-up messages, reposted reviews, coordinated accounts and descriptions of the same source are linked before counting.</p></article>
        <article className="rb-card"><h3>Recurring theme</h3><p>A code appearing in at least two independently sourced eligible accounts may be called recurring. This is a descriptive research flag, not proof of accuracy, prevalence or a systemic problem.</p></article>
        <article className="rb-card"><h3>Potential pattern</h3><p>Pattern language requires more than repetition: source independence, a checkable common mechanism or material detail, consideration of time and workplace context, and review of contrary material.</p></article>
        <article className="rb-card"><h3>Small groups</h3><p>Counts may be combined, suppressed or described without numbers where role, location, timing or a small subgroup could identify a contributor.</p></article>
        <article className="rb-card"><h3>Self-selection</h3><p>Contributors choose whether to respond. Submission counts cannot be presented as a workforce survey, incidence rate or estimate of how common an experience is across MECCA.</p></article>
      </div>
      <p className="rb-note"><strong>Public wording template:</strong> “Among Y eligible submissions received between [dates], X independently sourced accounts were coded to [theme]. Contributors were self-selected, so this does not estimate prevalence across the workforce.”</p>
    </section>

    <section className="rb-section dark" id="verification">
      <p className="rb-kicker">From source to publication</p>
      <h2>A claim is not a finding</h2>
      <p className="rb-lede">The order can vary, but each of these jobs must be done before a substantive finding is published.</p>
      <div className="rc-thresholds">{verificationSteps.map(([title, description], i) => <article key={title}><span>{(i + 1).toString().padStart(2, '0')}</span><div><h3>{title}</h3><p>{description}</p></div></article>)}</div>
      <p className="rb-note">There is no automatic numerical threshold. The decision depends on source independence, direct knowledge, documentary support, seriousness, public interest, contradictory material and the precision of the proposed wording.</p>
    </section>

    <section className="rb-section">
      <p className="rb-kicker">Evidence labels</p>
      <h2>What the labels tell you</h2>
      <p className="rb-lede">A label describes the status of a particular source or claim. It is not a judgement about the whole person who provided it.</p>
      <div className="rc-label-grid">{evidenceLabels.map(x => <article key={x.label}><span className={`rc-label ${x.label.toLowerCase().replaceAll(" ", "-")}`}>{x.label}</span><p>{x.definition}</p></article>)}</div>
    </section>

    <section className="rb-section dark">
      <p className="rb-kicker">Right of reply</p>
      <h2>A fair response needs detail, time and a visible record</h2>
      <div className="rb-grid">
        <article className="rb-card"><h3>What we send</h3><p>The substance of the proposed criticism, the factual basis that can safely be disclosed and clear questions for response.</p></article>
        <article className="rb-card"><h3>How much time</h3><p>For serious non-urgent criticism, the usual starting period is 14 calendar days. This is a default, not an absolute rule. A shorter period is used only for genuine urgency and the reason is recorded. Reasonable extension requests are considered, and the period and contact attempts are logged.</p></article>
        <article className="rb-card"><h3>How we use the response</h3><p>Relevant denials, context and supporting material are considered before publication and represented fairly where appropriate.</p></article>
      </div>
    </section>

    <section className="rb-section">
      <p className="rb-kicker">Corrections</p>
      <h2>Material changes should not disappear into a silent edit</h2>
      <p className="rb-lede">You can raise an accuracy concern through the project contact channel. A substantive correction will identify the page, the original publication date, the correction date, what changed and why.</p>
      <div className="rb-actions">
        <Link className="rb-button red" href="/research-centre/research-updates#corrections">View the corrections log</Link>
        <Link className="rb-button" href="/editorial-ethics">Editorial standards</Link>
      </div>
    </section>

    <section className="rb-section dark">
      <p className="rb-kicker">Privacy and security</p>
      <h2>What we keep, for how long and where the limits are</h2>
      <p className="rb-lede">The research questionnaire publishes separate retention periods for analytics, contact details, unused and active submissions, and the minimum records needed to document consent and accountability. Any extension needs a recorded reason and is limited to 12 months at a time. We review the schedule at least once a year.</p>
      <div className="rb-actions">
        <Link className="rb-button red" href="/share-story/research-questionnaire#data-handling">Read the contributor data notice</Link>
        <Link className="rb-button" href="/legal-publication-policy">Legal and publication controls</Link>
      </div>
      <p className="rb-note">No digital system can guarantee absolute anonymity or security.</p>
    </section>
  </SitePage>;
}
