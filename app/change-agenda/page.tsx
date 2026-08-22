import { PageHero, SitePage } from "../site-shell";
import { changePrinciples } from "../research-data";

const impactConditions = [
  ["Safe employee voice", "Employees can raise concerns through trusted pathways, understand what will happen next and participate without retaliation."],
  ["Fair, reviewable decisions", "Performance, development, promotion, rostering and complaint decisions use clear criteria, written reasons and meaningful review options."],
  ["Visible responsibility", "Workplace commitments have named owners, timeframes and measures, with progress and setbacks reported rather than asserted."],
  ["Independent verification", "Claims of reform can be tested through employee input, records, outcomes and review that is not controlled by the people whose work is being assessed."],
];

const accountabilityPath = [
  ["Publish", "Set out supported findings, evidence limits, disagreements, relevant responses and practical recommendations."],
  ["Respond", "Invite MECCA and other decision-makers to accept, partly accept or reject each recommendation and explain why."],
  ["Implement", "Translate accepted recommendations into named responsibilities, safeguards, measures and timeframes."],
  ["Verify", "Assess claimed progress against records, employee experience, published measures and independent review."],
  ["Sustain", "Track whether change lasts, identify new gaps and revise recommendations when the evidence requires it."],
];

export default function Change(){return <SitePage>
  <PageHero label="Change agenda" title="What would change look like if it were real?" dark><p>Publishing an investigation can create attention. It cannot, by itself, make a workplace safer or fairer. The point of this project is to turn supported findings into practical action, then make the response and any claimed progress visible.</p><p>Inside MECCA has an advocacy purpose. That is disclosed openly, but it does not decide what the investigation finds.</p></PageHero>
  <section className="rb-section"><p className="rb-kicker">The longer-term test</p><h2>Can employees see and experience the difference?</h2><p className="rb-lede">A promise of reform is not the result. Meaningful change should show up in everyday work and leave evidence that other people can check.</p><div className="rb-grid">{impactConditions.map(([t,d])=><article className="rb-card" key={t}><h3>{t}</h3><p>{d}</p></article>)}</div></section>
  <section className="rb-section dark"><p className="rb-kicker">After recommendations are published</p><h2>The work is not finished when the report is released</h2><p className="rb-lede">This is the path from a proposed reform to something that can be tested over time.</p><div className="progress-timeline">{accountabilityPath.map(([t,d],i)=><article key={t}><span>{String(i+1).padStart(2,"0")}</span><div><h3>{t}</h3><p>{d}</p></div></article>)}</div></section>
  <section className="rb-section"><p className="rb-kicker">Ideas to test, not conclusions</p><h2>What practical reform might involve</h2><p className="rb-lede">These principles help organise the research. They may become recommendations if the evidence supports them. They may also be narrowed, changed or dropped.</p><div className="rb-grid">{changePrinciples.map(([t,d])=><article className="rb-card" key={t}><h3>{t}</h3><p>{d}</p></article>)}</div><p className="rb-note">They are not findings against MECCA. Any final recommendation will depend on testimony, corroboration, conflicting evidence, expert input and MECCA&apos;s response.</p></section>
  <section className="rb-section dark"><p className="rb-kicker">What this project can do</p><h2>Investigation can support change. It cannot compel it.</h2><p className="rb-lede">Inside MECCA can document evidence, test propositions, seek responses, publish supported findings, recommend action and track public commitments. It cannot force MECCA to act, speak for every employee or verify internal reform without enough access and independent evidence.</p></section>
</SitePage>}
