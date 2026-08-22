import Link from "next/link";
import { PageHero, SitePage } from "../site-shell";

const controls = [
  ["Who leads the project", "A former MECCA employee established the project. Further employment and identifying details are withheld during research and production for privacy and safety."],
  ["Public anonymity limits", "The project lead uses a public pseudonym. This can reduce casual identification risk, but it cannot guarantee anonymity against valid legal process or records held by service providers."],
  ["Relevant interests", "The founder's former employment and the campaign's reform goals may affect perspective. They are disclosed so readers can judge the work in context."],
  ["Editorial controls", "Claims must be sourced, limits stated, conflicts disclosed and corrections recorded. Advocacy does not establish a finding."],
  ["Right of reply", "MECCA and anyone materially criticised will receive the substance of proposed findings and a reasonable chance to respond."],
];

const possibleOutcomes = [
  "The evidence supports a recurring pattern or a narrower issue.",
  "The evidence is mixed or too limited for a finding.",
  "The proposition is not supported.",
];

const successMeasures=[
  ["Representation","A responsible spread of roles, workplace types, regions and employment periods, with gaps disclosed."],
  ["Evidence quality","Material claims assessed for direct knowledge, documentary support, independent corroboration and contradictions."],
  ["Fair process","Right-of-reply requests recorded and relevant responses represented before publication."],
  ["Contributor control","Consent, contact, identity and publication preferences honoured throughout the work."],
  ["Transparent findings","Published conclusions meet the evidence threshold and state uncertainty, limits and alternative explanations."],
  ["Practical response","Recommendations are acknowledged, considered, adopted, challenged or implemented by those able to act."],
  ["Verified change","Claims of reform are assessed against public commitments, timeframes, employee evidence and independent review where access allows."],
];

const governance=[
  ["Editorial decisions","The project lead is responsible for final publication decisions. Significant findings and any proposed use of supplied internal material require appropriate independent editorial, methodological and qualified legal review before publication."],
  ["Conflicts","Personal, employment, financial and advocacy interests must be recorded and managed through disclosure, reassignment or additional review."],
  ["Sensitive access","Contributor identities and sensitive records are restricted to people who need access for verification, editorial or legal purposes."],
  ["Funding and support","Material funding, sponsorship or in-kind support capable of affecting perceived independence will be disclosed."],
  ["Complaints and escalation","Accuracy, fairness, privacy and consent concerns can be raised directly and escalated for independent advice where the issue cannot be resolved internally."],
  ["Identity-risk review","Public disclosures, service-provider records and re-identification risk are reviewed before major publication. No promise of absolute anonymity is made."],
];

export default function AccountabilityPage(){return <SitePage>
  <PageHero label="Project accountability" title="Who is behind Inside MECCA, and who checks the work?"><p>Inside MECCA was established by a former MECCA employee. The project lead uses a public pseudonym during research and production, but the work itself remains open to scrutiny, correction and reply.</p></PageHero>
  <section className="rb-section"><p className="rb-kicker">What readers are entitled to know</p><h2>The perspective and controls behind the project</h2><div className="rb-grid">{controls.map(([title,copy])=><article className="rb-card" key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
  <section className="rb-section dark"><p className="rb-kicker">The result is not decided in advance</p><h2>What the evidence might show</h2><p className="rb-lede">The investigation is testing whether MECCA&apos;s workplace commitments were followed in practice. It has to remain capable of reaching any of these outcomes:</p><ul className="rb-list">{possibleOutcomes.map(x=><li key={x}>{x}</li>)}</ul></section>
  <section className="rb-section"><p className="rb-kicker">Judging the project</p><h2>Reach is not the same thing as quality, and attention is not impact</h2><p className="rb-lede">Traffic, social attention, submission volume and publication do not establish that the work is sound or that anything changed. The immediate test is whether the research is fair, safe and well supported. The longer-term test is whether decision-makers respond and any claimed change can be checked.</p><div className="rb-grid">{successMeasures.map(([t,d])=><article className="rb-card" key={t}><h3>{t}</h3><p>{d}</p></article>)}</div></section>
  <section className="rb-section dark"><p className="rb-kicker">How decisions are controlled</p><h2>Who decides, who can see sensitive material and when outside review is needed</h2><div className="governance-list">{governance.map(([t,d])=><article key={t}><h3>{t}</h3><p>{d}</p></article>)}</div><p className="rb-note">These are the standards the project intends to meet. If a control is still being established, we should say that plainly rather than imply outside oversight already exists.</p></section>
  <section className="rb-section"><p className="rb-kicker">Challenge the work</p><h2>Think we have something wrong?</h2><p className="rb-lede">Tell us which statement you are concerned about, provide any supporting information you can share, and explain the correction or qualification you are asking for.</p><div className="rb-actions"><a className="rb-button red" href="mailto:insidemecca@mail2australia.com?subject=Inside%20MECCA%20accountability%20or%20correction">Raise a concern</a><Link className="rb-button" href="/methodology">Read the methodology</Link><Link className="rb-button" href="/editorial-ethics">Read the editorial standards</Link></div></section>
</SitePage>}
