"use client";

import { useState } from "react";
import Link from "next/link";
import { SitePage } from "../../../site-shell";

const sources=[
  {id:1,title:"‘It’s all fake’: Beauty giant MECCA facing bullying claims",publisher:"The Sydney Morning Herald",date:"17 November 2019",url:"https://www.smh.com.au/business/companies/its-all-fake-beauty-giant-mecca-facing-bullying-claims-20191117-p539q4.html",type:"Major news reporting"},
  {id:2,title:"MECCA investigation",publisher:"Yahoo Finance Australia",date:"19 November 2019",url:"https://au.finance.yahoo.com/news/mecca-investigation-011344896.html",type:"Major news reporting"},
  {id:3,title:"MECCA employees have ‘zero hope’ review will bring change",publisher:"Pedestrian.TV",date:"9 December 2019",url:"https://www.pedestrian.tv/news/mecca-employees-zero-hope-review-alleged-bullying-will-bring-change/",type:"Media reporting with anonymous employee sources"},
  {id:4,title:"MECCA investigating bullying claims",publisher:"Pedestrian.TV",date:"19 November 2019",url:"https://www.pedestrian.tv/news/mecca-investigating-bullying-claims/",type:"Media reporting"},
  {id:5,title:"Modern Slavery Statement 2020",publisher:"Commonwealth Modern Slavery Statements Register",date:"June 2021",url:"https://modernslaveryregister.gov.au/statements/7CwzBinQ2U2Esx7/pdf/",type:"Government register / company statement"},
  {id:6,title:"Modern Slavery Statement 2023",publisher:"Commonwealth Modern Slavery Statements Register",date:"2024",url:"https://modernslaveryregister.gov.au/statements/ZBcti6EeyHydkEb/pdf/",type:"Government register / company statement"},
  {id:7,title:"Beauty giant MECCA underpaid staff on 17-year-old zombie agreements",publisher:"Australian Financial Review",date:"23 March 2023",url:"https://www.afr.com/work-and-careers/workplace/beauty-giant-mecca-underpaid-staff-on-17-year-old-zombie-agreements-20230323-p5cuo3",type:"Major news reporting"},
  {id:8,title:"MECCA companies pay $594,000 in infringement notices",publisher:"Australian Securities and Investments Commission",date:"31 March 2026",url:"https://asic.gov.au/about-asic/news-centre/find-a-media-release/2026-releases/26-057mr-mecca-companies-pay-594-000-in-infringement-notices-for-failing-to-lodge-financial-reports-on-time/",type:"Government / regulator"},
];

const Cite=({ids}:{ids:number[]})=><sup className="ri-citations">{ids.map((id,index)=><span key={id}>{index>0?" ":""}<a href={sources.find(source=>source.id===id)?.url} target="_blank" rel="noreferrer">[{id}]</a></span>)}</sup>;
const Badge=({kind,children}:{kind:string;children:React.ReactNode})=><span className={`ri-badge ${kind}`}>{children}</span>;

export default function Investigation(){
  const [tab,setTab]=useState("overview");
  return <SitePage>
    <header className="ri-hero"><p className="rb-kicker">Research Centre / In-depth investigation</p><h1>In 2019, MECCA announced a culture review. What happened next?</h1><p>We traced what employees and journalists reported, what MECCA said it would do, what appears in later records and what is still missing from the public account.</p><div className="ri-meta"><span>Published 4 August 2026</span><span>Source-led analysis</span><span>Allegations are not findings</span></div></header>
    <nav className="ri-tabs" aria-label="Investigation sections" role="tablist">{[["overview","Overview"],["evidence","Evidence"],["cases","Related Case Studies"],["sources","Sources & References"]].map(([id,label])=><button key={id} role="tab" className={tab===id?"active":""} onClick={()=>setTab(id)} aria-selected={tab===id}>{label}</button>)}</nav>

    {tab==="overview"&&<main className="ri-content">
      <section className="ri-lead"><Badge kind="reported">Major news reporting</Badge><h2>How the allegations became public</h2><p>In October and November 2019, the anonymous beauty-industry account @estéelaundry published accounts attributed to current and former MECCA employees. The Sydney Morning Herald and Yahoo Finance Australia reported that more than 50 accounts had been posted.<Cite ids={[1,2]}/></p><p>The reported allegations included bullying and harassment, racism, favouritism, nepotism, discrimination, unpaid overtime and mental-health impacts. The number of reports establishes that a public controversy occurred. It does not establish that every allegation was accurate or that the experiences represented the workforce.</p>
        <details className="ri-source-card"><summary>View sources for this section</summary>{sources.slice(0,4).map(source=><a href={source.url} target="_blank" rel="noreferrer" key={source.id}><b>[{source.id}] {source.publisher}</b><span>{source.date} · {source.title}</span></a>)}</details>
      </section>
      <section aria-labelledby="estee-laundry-map-heading">
        <Badge kind="analysis">Interactive data tool</Badge>
        <h2 id="estee-laundry-map-heading">How the people, claims and responses connect</h2>
        <p>Explore the reporting, company responses and related events connected with the 2019 workplace-culture controversy.</p>
        <iframe src="/scandal-map.html" title="Interactive Estée Laundry scandal map" style={{width:"100%",height:"100vh",border:"none"}} />
      </section>
      <section><Badge kind="testimony">Employee testimony</Badge><h2>Accounts reported by journalists</h2><p>The Sydney Morning Herald named former retail employee Narita Salima and reported her account that managers bullied and ridiculed her, that she raised concerns, and that her employment ended shortly afterwards.<Cite ids={[1]}/> The same article reported anonymous accounts from a former head-office employee and a former makeup artist. These are attributed reports of testimony, not adjudicated facts.</p><p>In December 2019, Pedestrian.TV published accounts from two employees under pseudonyms. They questioned whether staff could participate safely and whether the listening process was sufficiently independent. MECCA disputed that characterisation and said all team members had been offered ways to engage with the external culture specialist.<Cite ids={[3]}/></p></section>
      <section><Badge kind="company">Company statement</Badge><h2>MECCA&apos;s response</h2><p>Reporting quoted founder Jo Horgan acknowledging that some employees had not experienced the positive workplace the company intended. MECCA said bullying and discrimination had no place in the company and announced additional feedback channels, Respect in the Workplace training, and an independent culture review involving a listening tour.<Cite ids={[1,2,4]}/></p><p>MECCA also reported that 0.2 per cent of its retail workforce had made a bullying complaint in the preceding two years and disputed allegations of unpaid overtime.<Cite ids={[1]}/> The available public material does not disclose the underlying complaint register, definitions or benchmark methodology needed to independently assess that statistic.</p><blockquote>Central accountability question: did the organisation implement, measure and report the changes it announced?</blockquote></section>

      <section>
        <Badge kind="reported">Reported allegations</Badge>
        <h2>From the Estée Laundry reporting to MECCA&apos;s response</h2>
        <p>In October and November 2019, the Instagram account @esteelaundry published accounts attributed to current and former MECCA workers. Media outlets subsequently reported allegations involving bullying, harassment, discrimination, favouritism, underpayment and workplace culture.</p>
        <p>These were reported allegations. They were not findings by a court, tribunal or regulator, and the number of published accounts does not establish that the experiences represented MECCA&apos;s workforce.</p>
        <p>Inside Retail and 7NEWS reported that MECCA responded by announcing additional reporting options, accelerated Respect in the Workplace training and an independent culture review involving an external specialist and listening process.<Cite ids={[1,2,4]}/></p>
        <p>The contemporaneous connection is documented: the Estée Laundry reporting and resulting public controversy formed part of the stated context for MECCA&apos;s immediate response.</p>
      </section>
      
      <section>
        <Badge kind="company">Company statement</Badge>
        <h2>What MECCA said the review involved</h2>
        <p>Contemporary reporting said an independent HR consultant or external culture specialist had been engaged to review the business and make recommendations.</p>
        <p>A listening process was said to have commenced across MECCA&apos;s markets. Workers were offered opportunities to provide feedback individually, in groups, by telephone, by email and in person.</p>
        <p>The review was initially expected to take approximately two months. In December 2019, MECCA told Pedestrian.TV that the participation period had been extended into January 2020 to allow more workers to participate.<Cite ids={[3]}/></p>
        <p>These reports establish what MECCA announced. They do not independently establish the review&apos;s methodology, structural independence, completion or outcome.</p>
      </section>
      
      <section>
        <Badge kind="testimony">Employee testimony</Badge>
        <h2>Concerns about participation</h2>
        <p>Pedestrian.TV reported concerns from two pseudonymous workers about access, privacy and confidence in the listening process.<Cite ids={[3]}/></p>
        <p>One worker reportedly said a session was at capacity. Another said she decided not to participate because she feared her identity would not remain private and that she might experience retaliation.</p>
        <p>MECCA disputed parts of that characterisation and said all team members had been offered several ways to engage with the external culture specialist.</p>
      </section>

      <section>
        <Badge kind="gap">Evidence gap</Badge>
        <h2>The public evidence gap</h2>
        <p>Inside MECCA has not located a publicly released final report, methodology, findings, recommendations, implementation plan or independent follow-up from the culture review.</p>
        <p>This does not prove:</p>
        <ul>
          <li>That the review was incomplete</li>
          <li>That no report was delivered</li>
          <li>That it was kept confidential</li>
          <li>That findings were never shared internally</li>
          <li>That no recommendations were implemented</li>
          <li>That no workplace changes occurred</li>
        </ul>
        <p>The narrower conclusion is that the available public material does not allow the review&apos;s methods, findings, recommendations or implementation to be independently evaluated.</p>
      </section>

      <section>
        <Badge kind="company">Company statement</Badge>
        <h2>Stopline and the immediate reporting response</h2>
        <p>Inside Retail and Pedestrian.TV reported that Stopline was introduced as part of MECCA&apos;s 2019 response.<Cite ids={[3,4]}/></p>
        <p>Stopline was described as an external and confidential reporting channel available to staff. Respect in the Workplace training was also brought forward.</p>
        <p>This establishes that MECCA announced and introduced these measures during the 2019 response. It does not establish:</p>
        <ul>
          <li>Whether Stopline was intended to be temporary or permanent</li>
          <li>How workers experienced the channel</li>
          <li>How reports were assessed or resolved</li>
          <li>Whether people experienced detrimental treatment</li>
          <li>Whether the system operated consistently across workplaces</li>
        </ul>
      </section>

      <section>
        <Badge kind="government">Company policy</Badge>
        <h2>The later Whistleblower Policy record</h2>
        <p>MECCA&apos;s public Whistleblower Policy page identifies February 2022 as the policy&apos;s last amendment date.</p>
        <p>This establishes an amendment date. It does not establish when the policy was first created or whether the 2019 culture review caused the amendment.</p>
        <p>The policy distinguishes protected whistleblower disclosures from personal work-related grievances. It says personal grievances are generally directed to a manager, Human Resources manager or another MECCA leader.</p>
        <p>The policy also recognises that a personal grievance may overlap with a disclosable matter in limited circumstances. This can include information concerning misconduct beyond the person&apos;s individual circumstances or detrimental treatment connected with a disclosure.</p>
        <p>The policy identifies Stopline as an independent and confidential reporting intermediary between the person reporting and MECCA.</p>
        <p>A separate Discrimination, Bullying &amp; Harassment Policy is publicly hosted through MECCA&apos;s Stopline site. The PDF states an effective date of December 2015. Its current internal status and whether it has subsequently been replaced or amended have not been independently confirmed.</p>
      </section>

      <section>
        <Badge kind="analysis">Editorial analysis</Badge>
        <h2>What the sequence establishes</h2>
        <p>The public sources support a connection between the Estée Laundry controversy and MECCA&apos;s immediate 2019 response, including the external culture review, listening process, Stopline and accelerated workplace training.</p>
        <p>A later Whistleblower Policy amendment is documented. Its relationship to the culture review is not established.</p>
        <div className="rb-note mt-6">
          <p><strong>The Estée Laundry reporting formed part of the documented context for MECCA&apos;s immediate 2019 review, reporting-channel and training response. A later policy amendment is documented, but its relationship to the culture review remains unconfirmed.</strong></p>
        </div>
      </section>

      <section>
        <Badge kind="analysis">Right-of-reply</Badge>
        <h2>Accountability questions</h2>
        <ul>
          <li>Was the culture review completed, and when was a final report delivered?</li>
          <li>Who conducted the review?</li>
          <li>What were its terms of reference?</li>
          <li>What findings and recommendations resulted?</li>
          <li>Which recommendations were implemented?</li>
          <li>Were findings shared with employees, leadership or the board?</li>
          <li>Did the review lead to changes in Stopline, the Whistleblower Policy or other reporting procedures?</li>
          <li>When was MECCA&apos;s Whistleblower Policy first introduced?</li>
          <li>What changed in the February 2022 amendment?</li>
          <li>Which current process applies to bullying, harassment and personal workplace grievances?</li>
          <li>What evidence is available about reporting volumes, response times, outcomes and detrimental treatment?</li>
          <li>Will MECCA publish a summary of the review and its implementation?</li>
        </ul>
      </section>
    </main>}

    {tab==="evidence"&&<main className="ri-content"><section><h2>Evidence map</h2><p>The records below are separated by what each source can establish.</p><div className="ri-evidence-grid"><article><Badge kind="reported">Major news reporting</Badge><h3>2019 allegations</h3><p>Supports what sources alleged, what named and anonymous contributors told journalists, and how MECCA responded publicly.<Cite ids={[1,2,3,4]}/></p></article><article><Badge kind="company">Company statement</Badge><h3>Response measures</h3><p>Supports that MECCA announced a culture review, additional reporting channels and training. It does not prove implementation or effectiveness.<Cite ids={[1,2,4]}/></p></article><article><Badge kind="government">Government register</Badge><h3>Later systems</h3><p>Supports that later company filings described Stopline and mandatory workplace modules.<Cite ids={[5,6]}/></p></article><article><Badge kind="reported">Major news reporting</Badge><h3>2023 payroll review</h3><p>MECCA reportedly disclosed a historical underpayment found through its own review and self-reported it. This was distinct from the 2019 unpaid-overtime allegations.<Cite ids={[7]}/></p></article><article><Badge kind="government">Regulator</Badge><h3>2026 ASIC notices</h3><p>ASIC reported infringement notices concerning late financial reporting. ASIC stated that payment was not an admission of guilt or liability. This is corporate-governance context, not workplace-culture proof.<Cite ids={[8]}/></p></article><article><Badge kind="gap">Evidence gap</Badge><h3>Review outcome</h3><p>No public review outcome was located in the supplied research. Further source retrieval and right-of-reply work are required.</p></article></div></section><section><h2>Research questions</h2><ol className="ri-questions"><li>Who conducted the external culture review and under what terms?</li><li>How many employees participated, and how were they selected?</li><li>What findings and recommendations were delivered?</li><li>Which measures were implemented, by when, and with what evaluation?</li><li>What complaint, substantiation, retaliation and resolution data exists after 2019?</li><li>How were employees informed of outcomes while protecting individual privacy?</li></ol></section></main>}

    {tab==="cases"&&<main className="ri-content"><section><h2>Related employee case studies</h2><p>Case studies are first-hand accounts published separately from this public-record investigation. They do not corroborate every 2019 allegation and are not treated as representative of the workforce.</p><Link className="ri-case-link" href="/stories/case-study-001"><span>First-hand testimony</span><h3>Employee Case Study 001</h3><p>Reporting workplace concerns, complaint escalation, investigation support and a workplace transfer.</p><b>Read the case study →</b></Link></section><section><h2>Related company commitments and public policies</h2><div className="rb-actions"><Link className="rb-button" href="/analysis/mecca-complaints-whistleblower-policy">MECCA complaints and whistleblower policy explainer</Link><Link className="rb-button" href="/employer-commitments/categories/speaking-up">Speaking-up commitments</Link><Link className="rb-button" href="/employer-commitments/categories/workplace-values">Workplace values</Link><Link className="rb-button" href="/research-centre/internal-documents">Internal documents</Link></div></section></main>}

    {tab==="sources"&&<main className="ri-content"><section><h2>Sources and references</h2><p>Source reliability applies to what a source can establish. News reporting can reliably record that allegations and responses were published without proving the underlying allegations.</p><div className="ri-sources">{sources.map(source=><details key={source.id} open={source.id<3}><summary><b>[{source.id}] {source.publisher}</b><span>{source.type}</span></summary><div><strong>{source.title}</strong><p>{source.date}</p><a href={source.url} target="_blank" rel="noreferrer">Open original source ↗</a></div></details>)}</div></section><section className="ri-method-note"><h2>Editorial limitations</h2><p>This investigation was developed from the supplied Part G research report and cross-checked against the project&apos;s existing source register. Anonymous Instagram and social-media posts are not treated as verified facts. No conclusion of unlawful conduct is made unless established by a court, tribunal, regulator or the organisation&apos;s own admission.</p></section></main>}
  </SitePage>;
}
