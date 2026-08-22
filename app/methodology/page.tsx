import Link from "next/link";
import { PageHero, SitePage } from "../site-shell";
import { themes } from "../share-story/research-questionnaire/config";

const standards = [
  ["Direct knowledge", "Separate personal experience and direct observation from documents, inference and information supplied by another person."],
  ["Source independence", "Check whether accounts are genuinely separate or reflect shared discussion, copied material, the same incident or the same underlying source."],
  ["Corroboration", "Test material details against independent accounts, contemporary records, witnesses, public records and contrary evidence."],
  ["Contradictions", "Record conflicting accounts, missing information and reasonable alternative explanations instead of smoothing them away."],
  ["Proportion", "Do not make a broader claim than the evidence, sample and contributor consent support."],
  ["Right of reply", "Give materially affected people and organisations a fair opportunity to answer proposed substantive criticism."],
];

const verificationSteps = [
  ["Intake and preserve", "Record the source, date, original wording, contributor choices and known limits. Preserve original records separately from public working copy."],
  ["Clarify knowledge", "Identify what the contributor experienced, directly witnessed, inferred, documented or heard from another person."],
  ["Check the timeline", "Test dates, roles, locations, sequence and internal consistency without treating imperfect memory as proof of falsity."],
  ["Authenticate records", "Where possible, check provenance, metadata, surrounding context and whether a document is complete, altered or independently obtainable."],
  ["Test independence", "Look for shared sources, coordinated accounts, duplicated events and contamination from public discussion before counting accounts separately."],
  ["Seek contrary material", "Actively look for records and accounts that challenge, narrow or provide another explanation for the proposed claim."],
  ["Seek response", "Provide sufficient particulars for a meaningful answer while protecting contributors and material that cannot safely be disclosed."],
  ["Decide and review", "Publish, narrow or hold the proposition based on evidence, consent, public interest, privacy, fairness and legal review."],
];

const codingDefinitions: Record<string, string> = {
  "Bullying and harassment": "Reported repeated unreasonable behaviour, humiliation, intimidation, exclusion, sexual harassment or other alleged harassment. The code describes the account, not a legal conclusion.",
  "Management and leadership": "Supervision, management conduct, decision-making, communication, support, favouritism or accountability.",
  "Psychological safety": "Ability to ask questions, raise concerns, admit mistakes or seek support without fear of humiliation or retaliation.",
  "Workload and staffing": "Staffing levels, workload, targets, unpaid or additional hours and operational pressure.",
  "Training and development": "Induction, product or role training, coaching, feedback and access to development.",
  "Pay and benefits": "Pay, discount, leave, entitlements, benefits or alleged underpayment.",
  "Career progression": "Promotion, acting opportunities, development pathways and selection decisions.",
  "Inclusion and accessibility": "Disability, race, culture, gender, sexuality, religion, age, accessibility and inclusion concerns or positive experiences.",
  "Team culture": "Peer relationships, belonging, conflict, collaboration and differences between teams or locations.",
  "Work-life balance": "Breaks, availability, scheduling expectations, overtime and boundaries outside work.",
  "Reporting concerns and retaliation": "Internal complaints, whistleblowing, escalation, investigation response and alleged adverse treatment after speaking up.",
  "Employment security and rostering": "Casual hours, roster predictability, transfer, discipline, termination and security of employment.",
  "Other": "Material that does not fit the codebook. It is reviewed for a possible new code rather than forced into an existing category.",
};

export default function Methodology() {
  return <SitePage>
    <PageHero label="Methodology" title="What happens after someone submits an account">
      <p>We collect an account, code the topics it raises, test the material details and then make a separate publication decision. Those are different jobs. A theme tag tells us what an account discusses. It does not verify the account or establish misconduct.</p>
      <div className="rb-actions"><Link className="rb-button" href="/evidence">Evidence types and labels</Link><Link className="rb-button" href="/editorial-ethics">Editorial standards</Link></div>
    </PageHero>

    <section className="rb-section"><p className="rb-kicker">The basic tests</p><h2>Questions we ask about every material claim</h2><p className="rb-lede">The answer may strengthen a claim, narrow it or show that there is not enough evidence to publish it.</p><div className="rb-grid">{standards.map(([title, description]) => <article className="rb-card" key={title}><h3>{title}</h3><p>{description}</p></article>)}</div></section>

    <section className="rb-section dark" id="coding"><p className="rb-kicker">How accounts are organised</p><h2>What a theme code means, and what it does not</h2><p className="rb-lede">An eligible submission can have more than one theme code. We apply codes to the account and its supporting material, not to the conclusion a contributor wants us to reach. The original account remains separate from the analytical record.</p><div className="rb-grid">{themes.map(theme => <article className="rb-card" key={theme}><h3>{theme}</h3><p>{codingDefinitions[theme]}</p></article>)}</div></section>

    <section className="rb-section" id="counting"><p className="rb-kicker">When the same theme appears more than once</p><h2>How we count without making the numbers say too much</h2><div className="rb-grid">
      <article className="rb-card"><h3>Unit of analysis</h3><p>The primary count is one eligible submission from one contributor. Multiple events or documents from the same contributor do not become multiple independent accounts.</p></article>
      <article className="rb-card"><h3>Deduplication</h3><p>Duplicate forms, follow-up messages, reposted reviews, coordinated accounts and descriptions of the same source are linked before counting.</p></article>
      <article className="rb-card"><h3>Recurring theme</h3><p>A code appearing in at least two independently sourced eligible accounts may be called recurring. This is a descriptive research flag, not proof of accuracy, prevalence or a systemic problem.</p></article>
      <article className="rb-card"><h3>Potential pattern</h3><p>Pattern language requires more than repetition: source independence, a checkable common mechanism or material detail, consideration of time and workplace context, and review of contrary material.</p></article>
      <article className="rb-card"><h3>Small groups</h3><p>Counts may be combined, suppressed or described without numbers where role, location, timing or a small subgroup could identify a contributor.</p></article>
      <article className="rb-card"><h3>Self-selection</h3><p>Contributors choose whether to respond. Submission counts cannot be presented as a workforce survey, incidence rate or estimate of how common an experience is across MECCA.</p></article>
    </div><p className="rb-note"><strong>Public wording template:</strong> “Among Y eligible submissions received between [dates], X independently sourced accounts were coded to [theme]. Contributors were self-selected, so this does not estimate prevalence across the workforce.”</p></section>

    <section className="rb-section dark" id="verification"><p className="rb-kicker">Checking a claim</p><h2>What we do before substantive material is considered for publication</h2><p className="rb-lede">The order can vary, and new information may send us back to an earlier check.</p><div className="rc-thresholds">{verificationSteps.map(([title, description]) => <article key={title}><div><h3>{title}</h3><p>{description}</p></div></article>)}</div><p className="rb-note">Corroboration applies to a particular material detail. It does not automatically verify every part of an account or support a broader conclusion about the organisation.</p></section>

    <section className="rb-section"><p className="rb-kicker">Right of reply</p><h2>People need enough information and time to give a meaningful answer</h2><div className="rb-grid"><article className="rb-card"><h3>What we send</h3><p>The substance of the proposed criticism and the factual basis that can safely be disclosed.</p></article><article className="rb-card"><h3>How much time</h3><p>A reasonable period based on seriousness, complexity, urgency and any agreed extension.</p></article><article className="rb-card"><h3>What happens to the response</h3><p>Relevant denials, context and supporting material are considered before publication and represented fairly where appropriate.</p></article></div></section>

    <section className="rb-section dark"><p className="rb-kicker">The publication decision</p><h2>There is no number that automatically makes a claim publishable</h2><p className="rb-lede">The decision depends on direct knowledge, source independence, documentary support, contradictions, seriousness, public interest, privacy risk, contributor permission, the proposed wording and the relevant party&apos;s response. If those checks are not satisfied, the material is narrowed or held.</p><div className="rb-actions"><Link className="rb-button red" href="/legal-publication-policy">Legal and publication controls</Link><Link className="rb-button" href="/share-story/research-questionnaire#data-handling">Contributor data handling</Link></div></section>
  </SitePage>;
}
