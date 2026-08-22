import Link from "next/link";

export type CaseStudySection={heading:string;paragraphs?:string[];items?:string[]};
export type CaseStudyData={
  reference:string;
  title:string;
  subject:string;
  evidenceStatus:string;
  evidenceNote:string;
  categories:string[];
  sections:CaseStudySection[];
  responseStatus:string;
  publicationNote:string;
};

export function CaseStudy({study}:{study:CaseStudyData}){
  return <>
    <header className="cs-hero">
      <div className="cs-reference"><span>Employee account</span><strong>{study.reference}</strong></div>
      <p className="rb-kicker">{study.subject}</p>
      <h1>{study.title}</h1>
      <div className="cs-status"><span>How to read this account</span><strong>{study.evidenceStatus}</strong><p>{study.evidenceNote}</p></div>
    </header>
    <section className="cs-categories" aria-label="Case study categories">{study.categories.map(category=><span key={category}>{category}</span>)}</section>
    <article className="cs-article">
      {study.sections.map((section)=><section className="cs-section" key={section.heading}>
        <div><h2>{section.heading}</h2></div>
        <div>{section.paragraphs?.map((paragraph,i)=><p key={i}>{paragraph}</p>)}{section.items&&<ul>{section.items.map(item=><li key={item}>{item}</li>)}</ul>}</div>
      </section>)}
    </article>
    <section className="cs-editorial">
      <div><span>Company response</span><p>{study.responseStatus}</p></div>
      <div><span>Publication and privacy</span><p>{study.publicationNote}</p></div>
      <div><span>What this account does not establish</span><p>This page records one contributor&apos;s experience. It is not a finding that any person or organisation acted unlawfully, and it does not establish a broader workplace pattern.</p></div>
    </section>
    <section className="cs-actions"><Link className="rb-button" href="/stories">All case studies</Link><Link className="rb-button red" href="/share-story">Share your experience</Link></section>
  </>;
}
