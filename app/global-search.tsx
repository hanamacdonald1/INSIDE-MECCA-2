"use client";



import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { categories, documents } from "./employer-commitments/data";
import { corporateHistory, internalDocuments, legalTopics, publicClaims } from "./research-centre/data";

type SearchItem={title:string;description:string;href:string;type:string;keywords?:string};
const pages:SearchItem[]=[
  {title:"Home",description:"Inside MECCA workplace investigation",href:"/",type:"Page",keywords:"contact faq source safety privacy"},
  {title:"Project Accountability",description:"Creator context, anonymity, conflicts, funding disclosure and challenge process",href:"/accountability",type:"Governance",keywords:"who runs creator identity bias independence advocacy correction"},
  {title:"Investigation",description:"Scope, accountability framework and research questions",href:"/investigation",type:"Page",keywords:"promise practice pattern response finding"},
  {title:"Development Planning Guidebook review status",description:"Why the supplied source and source-derived analysis are withheld pending qualified legal review",href:"/investigation/development-planning",type:"Investigation",keywords:"development planning guidebook internal document legal review provenance publication hold"},
  {title:"Research Centre",description:"Evidence archive and source register",href:"/research-centre",type:"Research hub"},
  {title:"MECCA Workplace Culture Analysis",description:"Original analysis of working at MECCA, employee experiences, management and workplace systems",href:"/analysis",type:"Analysis hub",keywords:"working at MECCA reviews MECCA Brands workplace culture employee experiences management"},
  {title:"Working at MECCA Reviews",description:"What employee reviews and workplace experiences can and cannot establish",href:"/analysis/working-at-mecca-reviews",type:"Analysis",keywords:"MECCA Brands workplace culture employee experiences management reviews Indeed SEEK Glassdoor"},
  {title:"MECCA Complaints and Whistleblower Policy",description:"What MECCA's public complaint, bullying and whistleblower policies say and do not establish",href:"/analysis/mecca-complaints-whistleblower-policy",type:"Policy analysis",keywords:"HR complaints process speaking up Stopline bullying harassment retaliation grievance protected disclosure"},
  {title:"Public Commentary About Working at MECCA",description:"De-identified excerpts from publicly posted comments, clearly labelled as unverified commentary",href:"/analysis/public-commentary",type:"Public commentary",keywords:"TikTok Reddit social media reviews comments unverified anonymous"},
  {title:"Interactive Estée Laundry Scandal Map",description:"Explore the entities, allegations, media coverage, legal actions and evidence trail connected with the 2019 workplace-culture controversy.",href:"/research-centre/public-claims/2019-workplace-culture#estee-laundry-map-heading",type:"Interactive data tool",keywords:"scandal map network timeline estee laundry evidence entities allegations"},
  {title:"Public Source Evidence",description:"Official public records and attributed media reporting",href:"/research-centre/source-evidence",type:"Evidence library",keywords:"M01700495 ASIC Pedestrian SMH bullying payroll underpayment public source"},
  {title:"Turnover, Tenure & Financial Data",description:"Part F workforce estimates, headcount and reported financial figures",href:"/research-centre/workforce-financial-data",type:"Research",keywords:"retention loyalty Revelio SignalHire RTCH revenue profit WGEA"},
  {title:"Corporate History",description:"Source-controlled corporate chronology",href:"/research-centre/corporate-history",type:"Timeline"},
  {title:"Restricted-Source Register",description:"High-level status summaries with no source-file access",href:"/research-centre/internal-documents",type:"Archive",keywords:"internal documents restricted sources no download reconstruction"},
  {title:"Public Claims",description:"Attributed public statements and representations",href:"/research-centre/public-claims",type:"Database"},
  {title:"Australian Workplace Law",description:"General legal context and evidence questions",href:"/research-centre/workplace-law",type:"Legal library",keywords:"bullying adverse action psychosocial WHS complaints"},
  {title:"Evidence Methodology",description:"Reporting thresholds, right of reply and corrections",href:"/methodology",type:"Standards"},
  {title:"Investigation Notebook",description:"Research status, open questions and evidence gaps",href:"/research-centre/investigation-notebook",type:"Notebook"},
  {title:"Research Updates",description:"Archive changes and corrections log",href:"/research-centre/research-updates",type:"Updates"},
  {title:"Evidence Graph",description:"Relationships between documents, claims and research questions",href:"/research-centre/evidence-graph",type:"Map"},
  {title:"Evidence Library and Assessment",description:"Evidence categories, status labels and assessment process",href:"/evidence",type:"Methodology"},
  {title:"Employer Commitments",description:"Internal guidance and stated expectations",href:"/employer-commitments",type:"Database"},
  {title:"Public Record",description:"Regulatory, payroll and reported workplace matters",href:"/public-record",type:"Public record"},
  {title:"Editorial Standards",description:"Attribution, verification and corrections standards",href:"/editorial-ethics",type:"Policy"},
  {title:"Legal and Publication Policy",description:"Publication safeguards, legal review and right of reply",href:"/legal-publication-policy",type:"Policy"},
  {title:"Share Your Story",description:"Confidential contributor submission form",href:"/share-story",type:"Contribute",keywords:"submission account evidence confidentiality contact"},
  {title:"Research Questions",description:"Workplace topics and core questions guiding the investigation",href:"/investigation#research-questions",type:"Investigation",keywords:"areas of inquiry topics research questions culture management progression speaking up"},
  {title:"Change Agenda",description:"Potential evidence-led workplace reforms",href:"/change-agenda",type:"Campaign"},
  {title:"Documentary interview",description:"Interview choices, consent and next steps",href:"/documentary",type:"Project"},
  {title:"Get involved",description:"Contribute, collaborate or share responsibly",href:"/join-movement",type:"Participate"},
  {title:"Work with the project",description:"Unpaid project collaborator roles",href:"/join-movement",type:"Collaborate"},
  {title:"Project Updates",description:"Investigation and campaign updates",href:"/updates",type:"Updates"},
];
const generated:SearchItem[]=[
  ...documents.map(d=>({title:d.title,description:`${d.category}. ${d.description}`,href:`/employer-commitments/documents/${d.slug}`,type:"Document",keywords:[d.date,d.status,...d.tags].join(" ")})),
  ...categories.map(c=>({title:c.name,description:c.description,href:`/employer-commitments/categories/${c.slug}`,type:"Document category"})),
  ...[...corporateHistory,...internalDocuments,...publicClaims,...legalTopics].map(r=>({title:r.title,description:r.summary,href:r.id.startsWith("CH")?"/research-centre/corporate-history":r.id.startsWith("ID")?"/research-centre/internal-documents":r.id.startsWith("PC")?"/research-centre/public-claims":"/research-centre/workplace-law",type:r.label,keywords:[r.id,r.source,r.status,...r.topics].join(" ")})),
];
const index=[...pages,...generated];


export function GlobalSearch(){
  const [query,setQuery]=useState(""); const [open,setOpen]=useState(false); const wrap=useRef<HTMLDivElement>(null);
  useEffect(()=>{const close=(e:MouseEvent)=>{if(!wrap.current?.contains(e.target as Node))setOpen(false)};document.addEventListener("mousedown",close);return()=>document.removeEventListener("mousedown",close)},[]);
  const results=useMemo(()=>{const q=query.trim().toLowerCase();if(q.length<2)return[];return index.map(item=>{const title=item.title.toLowerCase(),text=`${item.title} ${item.description} ${item.type} ${item.keywords||""}`.toLowerCase();const score=title===q?100:title.startsWith(q)?50:title.includes(q)?25:text.includes(q)?10:0;return{item,score}}).filter(x=>x.score).sort((a,b)=>b.score-a.score||a.item.title.localeCompare(b.item.title)).slice(0,8).map(x=>x.item)},[query]);
  return <div className="rb-global-search" ref={wrap} onKeyDown={e=>{if(e.key==="Escape")setOpen(false)}}><label><span className="sr-only">Search the entire website</span><div className="relative"><svg xmlns="http://www.w3.org/2000/svg" className="absolute left-2.5 top-2.5 h-4 w-4 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg><input type="search" value={query} onChange={e=>{setQuery(e.target.value);setOpen(true)}} onFocus={()=>setOpen(true)} placeholder="Search the site..." aria-controls="global-search-results" className="pl-9" /></div></label>{open&&query.length>=2&&<div className="rb-search-results" id="global-search-results"><div className="rb-search-summary">{results.length?`${results.length} best matches`:"No matching pages"}</div>{results.map(item=><Link href={item.href} key={`${item.href}-${item.title}`} onClick={()=>setOpen(false)}><span>{item.type}</span><strong>{item.title}</strong><small>{item.description}</small></Link>)}{!results.length&&<p>Try a topic, document name, evidence reference or page title.</p>}</div>}</div>;
}
