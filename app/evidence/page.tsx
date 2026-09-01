"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PageHero, SitePage } from "../site-shell";
import { documents } from "../employer-commitments/data";
import { corporateHistory, internalDocuments, legalTopics, publicClaims } from "../research-centre/data";

const categories=[
  ["First-hand testimony","What a person experienced or directly witnessed."],
  ["Contemporary records","Messages, notes, emails or calendar entries created near the event."],
  ["Supporting documents","Material that supports, challenges or adds context to part of an account."],
  ["Independent corroboration","A separate source supports a material detail."],
  ["Public record and response","Official records, attributed reporting, company statements and replies."],
];
const labels=[
  ["First-hand","Direct personal experience or observation."],
  ["Supported","A reliable source supports a material detail."],
  ["Corroborated","An independent source supports a material detail."],
  ["Disputed","A relevant party has provided conflicting information."],
  ["Unverified","Available information is not enough to support the claim."],
  ["Unable to determine","The evidence does not permit a conclusion."],
];
const steps=[
  ["Start with the account","Record what the contributor directly knows, the surrounding context and the choices they have made about contact and use."],
  ["Check the detail","Look at dates, records, source reliability and whether important parts of the account can be tested."],
  ["Look in both directions","Search for independent support, but also for contradictions and plausible alternative explanations."],
  ["Ask for a response","Give people or organisations facing material criticism a fair chance to answer it."],
  ["Make a decision","Publish, narrow or hold the claim according to the evidence, consent and legal or safety considerations."],
];

const matches=(item:string[],query:string)=>item.join(" ").toLowerCase().includes(query);

type SiteSearchItem={title:string;description:string;type:string;href:string;keywords:string[]};
const researchCollections=[
  ...corporateHistory.map(record=>({...record,href:"/research-centre/corporate-history"})),
  ...publicClaims.map(record=>({...record,href:"/research-centre/public-claims"})),
  ...internalDocuments.map(record=>({...record,href:"/research-centre/internal-documents"})),
  ...legalTopics.map(record=>({...record,href:"/research-centre/workplace-law"})),
];
const siteSearchItems:SiteSearchItem[]=[
  ...researchCollections.map(record=>({title:record.title,description:record.summary,type:record.label,href:record.href,keywords:[record.id,record.source,record.status,...record.topics]})),
  ...documents.map(document=>({title:document.title,description:document.description,type:`Employer commitment · ${document.category}`,href:`/employer-commitments/documents/${document.slug}`,keywords:[document.status,document.date,...document.tags,...document.commitments]})),
  {title:"Research Centre",description:"The central archive for verified research, source classifications, evidence gaps and working analysis.",type:"Research hub",href:"/research-centre",keywords:["archive","newsroom","evidence","research"]},
  {title:"Workforce and financial data",description:"Source-led workforce and financial research with limitations and unresolved evidence gaps.",type:"Research collection",href:"/research-centre/workforce-financial-data",keywords:["employees","revenue","profit","turnover","tenure","financial"]},
  {title:"Source and evidence register",description:"A structured register of sources, citations, classifications and verification status.",type:"Evidence register",href:"/research-centre/source-evidence",keywords:["citations","sources","references","verification"]},
  {title:"Investigation notebook",description:"Current research questions, evidence gaps and investigations in progress.",type:"Working research",href:"/research-centre/investigation-notebook",keywords:["questions","progress","gaps","notebook"]},
  {title:"Evidence graph",description:"Connections between documents, workplace systems, commitments and areas of inquiry.",type:"Interactive research",href:"/research-centre/evidence-graph",keywords:["connections","relationships","documents","systems"]},
  {title:"Research questions & inquiry areas",description:"The workplace topics and core questions guiding evidence collection and analysis.",type:"Investigation",href:"/investigation#research-questions",keywords:["bullying","leadership","promotion","casual","training","diversity","complaints","areas of inquiry","questions"]},
  {title:"Share your story",description:"Submit a confidential first-hand or direct-witness workplace account.",type:"Contributor pathway",href:"/share-story",keywords:["submission","testimony","witness","confidential"]},
  {title:"Employee Case Study 001: Reporting workplace concerns",description:"A former employee account concerning bereavement, complaint escalation, psychological safety, investigation support and a workplace transfer.",type:"First-hand testimony",href:"/stories/case-study-001",keywords:["bullying","bereavement","mental health","speaking up","management response","workplace investigation","transfer"]},
  {title:"The 2019 workplace-culture allegations",description:"An in-depth source-attributed investigation of the @estéelaundry reports, MECCA's response, the announced culture review and unresolved evidence gaps.",type:"In-depth investigation",href:"/research-centre/public-claims/2019-workplace-culture",keywords:["estee laundry","bullying","culture review","stopline","overtime","employee allegations","2019"]},
];

export default function Evidence(){
  const [search,setSearch]=useState("");
  const query=search.trim().toLowerCase();
  const filteredCategories=useMemo(()=>categories.filter(item=>matches(item,query)),[query]);
  const filteredLabels=useMemo(()=>labels.filter(item=>matches(item,query)),[query]);
  const filteredSteps=useMemo(()=>steps.filter(item=>matches(item,query)),[query]);
  const globalResults=useMemo(()=>query?siteSearchItems.filter(item=>[item.title,item.description,item.type,...item.keywords].join(" ").toLowerCase().includes(query)).slice(0,24):[],[query]);
  const guideResultCount=filteredCategories.length+filteredLabels.length+filteredSteps.length;
  const resultCount=query?globalResults.length+guideResultCount:guideResultCount;

  return <SitePage>
    <PageHero label="Evidence" title="A claim is the start of the work, not the end" dark>
      <p>First-hand testimony matters. So do records, independent sources, contradictions and responses. This page explains how those different forms of evidence are used without treating a submission as automatic proof.</p>
    </PageHero>
    <section className="rb-evidence-search" aria-labelledby="evidence-search-title">
      <div>
        <p className="rb-kicker" id="evidence-search-title">Looking for something?</p>
        <label htmlFor="evidence-search">Search the archive, documents and evidence guidance</label>
      </div>
      <div className="rb-search-field">
        <input id="evidence-search" type="search" value={search} onChange={event=>setSearch(event.target.value)} placeholder="Try: bullying, Workday, development, financial..." autoComplete="off"/>
        {search&&<button type="button" onClick={()=>setSearch("")} aria-label="Clear evidence search">Clear</button>}
      </div>
      <p className="rb-search-count" role="status" aria-live="polite">{resultCount} {resultCount===1?"result":"results"}</p>
    </section>
    {query&&globalResults.length>0&&<section className="rb-section rb-site-results"><p className="rb-kicker">Across Inside MECCA</p><h2>Matches from the research and document archive</h2><div className="rb-search-results">{globalResults.map((item,index)=><Link href={item.href} className="rb-search-result" key={`${item.href}-${item.title}-${index}`}><span>{item.type}</span><h3>{item.title}</h3><p>{item.description}</p><b>Open this record</b></Link>)}</div></section>}
    {resultCount===0&&<section className="rb-section rb-empty-search"><h2>We could not find a match</h2><p>Try a broader term such as workplace, development, complaints, performance or records.</p></section>}
    {filteredCategories.length>0&&<section className="rb-section"><p className="rb-kicker">Different kinds of evidence</p><h2>What might support or challenge a claim?</h2><p className="rb-lede">No single type is automatically decisive. Its value depends on the question being asked, the source and the surrounding context.</p><div className="rb-grid">{filteredCategories.map(([t,d])=><article className="rb-card" key={t}><h3>{t}</h3><p>{d}</p></article>)}</div></section>}
    {filteredLabels.length>0&&<section className="rb-section"><p className="rb-kicker">Status labels</p><h2>How to read our conclusions</h2><div className="rb-grid">{filteredLabels.map(([t,d])=><article className="rb-card" key={t}><h3>{t}</h3><p>{d}</p></article>)}</div><p className="rb-note">A label applies to a particular claim. It is not a judgement about a whole person.</p></section>}
    {filteredSteps.length>0&&<section className="rb-section dark"><p className="rb-kicker">Before publication</p><h2>What happens to a claim</h2><div className="rb-grid">{filteredSteps.map(([t,d])=><article className="rb-card" key={t}><h3>{t}</h3><p>{d}</p></article>)}</div></section>}
    {!query&&<section className="rb-section"><p className="rb-kicker">Limits</p><h2>What we cannot assume</h2><p className="rb-lede">Memory can be incomplete, and the people who choose to contribute are self-selecting. A pattern depends on source independence, detail, records, contradictions and context. There is no fixed number of accounts that turns a claim into a finding.</p><p className="rb-note">If the available evidence is not strong enough, we will say so.</p></section>}
  </SitePage>;
}
