"use client";

import { useMemo, useState } from "react";
import type React from "react";
import Link from "next/link";
import { getEditorialMeta, type EvidenceDocument } from "./data";
import { CheckCircle2, Clock, ShieldAlert } from "lucide-react";

export function DocumentExplorer({ documents, categoryNames }: { documents: EvidenceDocument[]; categoryNames: string[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All categories");
  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return documents.filter((document) => {
      const editorial = getEditorialMeta(document.slug);
      const matchesCategory = category === "All categories" || document.category === category;
      const haystack = [document.title, document.category, document.description, editorial.recordType, editorial.scope, editorial.sourceKey, ...document.tags].join(" ").toLowerCase();
      return matchesCategory && (!needle || haystack.includes(needle));
    });
  }, [query, category, documents]);

  return <div className="ec-explorer">
    <div className="ec-controls">
      <label><span>Search the archive</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search title, topic or tag" /></label>
      <label><span>Filter by category</span><select value={category} onChange={(event) => setCategory(event.target.value)}><option>All categories</option>{categoryNames.map((name) => <option key={name}>{name}</option>)}</select></label>
    </div>
    <p className="ec-result-count" aria-live="polite">{results.length} {results.length === 1 ? "reconstructed record" : "reconstructed records"}</p>
    <div className="ec-document-list">
      {results.map((document, index) => { 
        const editorial = getEditorialMeta(document.slug);
        
        const getStatusIcon = (status: string) => {
          switch (status) {
            case "Reviewed":
              return <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />;
            case "Legal hold":
              return <ShieldAlert className="w-3.5 h-3.5" aria-hidden="true" />;
            case "Awaiting source":
              return <Clock className="w-3.5 h-3.5" aria-hidden="true" />;
            default:
              return null;
          }
        };
        
        return <article className="ec-document" key={document.slug}>
        <div className="ec-doc-index">RECORD {String(index + 1).padStart(2, "0")}</div>
        <div>
          <p className="ec-meta">
            {editorial.recordType} / {editorial.sourceKey} /{" "}
            <span className="inline-flex items-center gap-1.5 font-medium">
              {getStatusIcon(document.status)}
              {document.status}
            </span>
          </p>
          <h3>{document.title}</h3>
          <p>{document.description}</p>
          <p className="ec-scope"><strong>Scope:</strong> {editorial.scope}</p>
          <div className="ec-tags">{document.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        </div>
        <div className="ec-doc-actions"><Link className="ec-button light" href={`/employer-commitments/documents/${document.slug}`}>{document.slug === "development-planning-guidebook" ? "Why this is on hold" : "Read the reconstruction"}</Link><Link className="ec-text-link" href={`/employer-commitments/source-access?document=${document.slug}`}>Why the original is restricted</Link></div>
      </article>})}
      {!results.length && <div className="ec-empty"><h3>No matching records</h3><p>Try a broader search or select all categories.</p></div>}
    </div>
  </div>;
}

export function EvidenceGraph() {
  const [active, setActive] = useState("Living Values");
  const nodes = [
    ["Living Values", "Defines behavioural expectations used in performance assessment."],
    ["Development Guidebook", "Turns growth expectations into a structured planning process."],
    ["Performance Reviews", "Combines behaviours and outcomes into an overall rating."],
    ["Core Competencies", "Describes skills and behaviours across role levels."],
    ["IDP", "Represents the documented development plan referenced by the process."],
    ["Career Meetings", "Connects aspirations, competency gaps and development actions."],
    ["Manager Responsibilities", "Links policy expectations to coaching, feedback and follow-up."],
    ["Workday", "Records performance inputs and supports the formal rating process."],
  ];
  return <div className="ec-graph-wrap"><div className="ec-graph" role="list" aria-label="Evidence relationships">{nodes.map(([name], index) => <button key={name} type="button" className={active === name ? "active" : ""} onMouseEnter={() => setActive(name)} onFocus={() => setActive(name)} onClick={() => setActive(name)} style={{ "--node": index } as React.CSSProperties} role="listitem"><span>{String(index + 1).padStart(2, "0")}</span>{name}</button>)}</div><aside aria-live="polite"><p className="ec-meta">Selected connection</p><h3>{active}</h3><p>{nodes.find(([name]) => name === active)?.[1]}</p></aside></div>;
}
