"use client";
import { useMemo, useState } from "react";
import type { ResearchRecord } from "./data";

export function ResearchExplorer({records}:{records:ResearchRecord[]}) {
  const [query,setQuery]=useState("");
  const [label,setLabel]=useState("All evidence labels");
  const labels=["All evidence labels",...Array.from(new Set(records.map(r=>r.label)))];
  const shown=useMemo(()=>records.filter(r=>{
    const hay=[r.id,r.title,r.summary,r.label,r.source,r.status,...r.topics].join(" ").toLowerCase();
    return (!query || hay.includes(query.toLowerCase())) && (label==="All evidence labels" || r.label===label);
  }),[records,query,label]);
  return <div className="rc-explorer">
    <div className="rc-controls"><label><span>Search this collection</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search title, topic, source or reference" /></label><label><span>Evidence label</span><select value={label} onChange={e=>setLabel(e.target.value)}>{labels.map(x=><option key={x}>{x}</option>)}</select></label></div>
    <p className="rc-result-count" aria-live="polite">{shown.length} {shown.length===1?"record":"records"}</p>
    <div className="rc-records">{shown.map(record=><article className="rc-record" key={record.id}>
      <div className="rc-record-top"><span className={`rc-label ${record.label.toLowerCase().replaceAll(" ","-")}`}>{record.label}</span><code>{record.id}</code></div>
      <h2>{record.title}</h2><p>{record.summary}</p>
      <dl><div><dt>Date</dt><dd>{record.date}</dd></div><div><dt>Source</dt><dd>{record.source}</dd></div><div><dt>Citation</dt><dd>{record.citation}</dd></div><div><dt>Status</dt><dd>{record.status}</dd></div></dl>
      <div className="rc-tags">{record.topics.map(topic=><span key={topic}>{topic}</span>)}</div>
      {record.gap&&<p className="rc-gap"><strong>Evidence gap</strong>{record.gap}</p>}
    </article>)}</div>
    {!shown.length&&<div className="rc-empty"><h2>No matching records</h2><p>Try a broader term or reset the evidence-label filter.</p></div>}
  </div>;
}
