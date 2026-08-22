import Link from "next/link";
import { PageHero, SitePage } from "../site-shell";
import { evidenceLabels, sourceRegister } from "./data";

const sections=[
  ["Dashboard","Key figures, dates, corrections and evidence gaps.","/research-centre/dashboard","Overview"],
  ["Sentiment and operational risk","Employee and customer ratings, issue priorities and proposed responses.","/research-centre/sentiment-analysis","Visual analysis"],
  ["2019 workplace allegations","Public reporting, MECCA's response and unresolved questions.","/research-centre/public-claims/2019-workplace-culture","Investigation"],
  ["Interactive map","People, claims, responses and sources linked across the 2019 record.","/research-centre/public-claims/2019-workplace-culture#estee-laundry-map-heading","Tool"],
  ["Workforce and financial data","Headcount, tenure and financial figures with source limits.","/research-centre/workforce-financial-data","Data"],
  ["Employer commitments","Independent reconstructions and linked public workplace statements.","/employer-commitments","Research archive"],
  ["Source evidence","Primary records and attributed reporting.","/research-centre/source-evidence","Library"],
  ["Public record","Regulatory records, reporting and open questions.","/public-record","Record"],
  ["Methodology","Evidence labels, publication thresholds and right of reply.","/methodology","Standards"],
  ["Updates and corrections","Dated changes to the research archive.","/research-centre/research-updates","Log"],
];

export default function ResearchCentre(){return <SitePage>
  <PageHero label="Research centre" title="See what the investigation is built on"><p>This is where we keep the records, source notes and working analysis behind the project. Each item says what kind of source it is, what has been checked and what is still missing.</p><div className="rb-actions"><Link className="rb-button red" href="/research-centre/public-claims/2019-workplace-culture#estee-laundry-map-heading">Explore the 2019 evidence map</Link><Link className="rb-button" href="/methodology">How the research works</Link></div></PageHero>
  <section className="rc-status-strip"><div><span>What we are doing now</span><strong>Reviewing sources</strong></div><div><span>Findings published</span><strong>None</strong></div><div><span>Last updated</span><strong>11 August 2026</strong></div></section>
  <section className="rb-section"><p className="rb-kicker">Browse the research</p><h2>Choose where to start</h2><div className="rc-module-grid">{sections.map(([title,description,href,type])=><Link href={href} className="rc-module" key={title}><div><small>{type}</small></div><h3>{title}</h3><p>{description}</p><b>Go to {title.toLowerCase()}</b></Link>)}</div></section>
  <section className="rb-section dark"><p className="rb-kicker">Reading the archive</p><h2>What the evidence labels mean</h2><p className="rb-lede">A label describes the source and the job it can do. It does not tell you that every claim in the source is true.</p><div className="rc-label-grid">{evidenceLabels.map(item=><article key={item.label}><span className={`rc-label ${item.label.toLowerCase().replaceAll(" ","-")}`}>{item.label}</span><p>{item.definition}</p></article>)}</div></section>
  <section className="rb-section"><p className="rb-kicker">Source register</p><h2>Sources currently in use</h2><p className="rb-lede">This is a working list, not a finished bibliography. Statuses will change as sources are checked or new gaps are identified.</p><div className="rc-source-table" role="table" aria-label="Research source register">{sourceRegister.map(([id,title,type,status])=><div role="row" key={id}><code role="cell">{id}</code><strong role="cell">{title}</strong><span role="cell">{type}</span><span role="cell">{status}</span></div>)}</div><p className="rb-note">If a URL, date or authentication step is missing, the gap remains visible.</p></section>
  </SitePage>}
