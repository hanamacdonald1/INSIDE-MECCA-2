/**
 * Source Register citation catalog and extraction engine.
 * Maps project evidence, internal document status records, legal frameworks,
 * and public documents to interactive citation chips.
 */

export interface SourceCitation {
  id: string;
  code: string;
  title: string;
  category:
    | "Verified primary fact"
    | "Company statement"
    | "Media report"
    | "Internal document"
    | "Legal context"
    | "Master synthesis"
    | "Research dossier"
    | "Public claims"
    | "Evidence standard";
  href: string;
  status: string;
  summary?: string;
  external?: boolean;
}

export const SOURCE_REGISTER_CATALOG: SourceCitation[] = [
  // --- Core Source Register Documents ---
  {
    id: "CRR",
    code: "CRR",
    title: "Comprehensive Research Report",
    category: "Master synthesis",
    href: "/investigation",
    status: "Working research source",
    summary: "Master synthesis and investigative framework establishing the 12 areas of inquiry and evidence tests.",
  },
  {
    id: "A",
    code: "Part A",
    title: "Part A: Corporate History & Chronology",
    category: "Research dossier",
    href: "/research-centre/corporate-history",
    status: "Source checking ongoing",
    summary: "Chronology of corporate milestones, entity registrations, and store network transformations.",
  },
  {
    id: "B",
    code: "Part B",
    title: "Part B: Public Culture Claims",
    category: "Public claims",
    href: "/research-centre/public-claims",
    status: "Claims register",
    summary: "Public employer representations and culture claims logged for comparative verification.",
  },
  {
    id: "C",
    code: "Part C",
    title: "Part C: Australian Workplace Law Framework",
    category: "Legal context",
    href: "/research-centre/workplace-law",
    status: "General legal context",
    summary: "Fair Work Act, WHS psychosocial hazards, adverse action protections, and complaint mechanics.",
  },
  {
    id: "D",
    code: "Part D",
    title: "Part D: Factual-Risk & Accuracy Audit",
    category: "Evidence standard",
    href: "/methodology",
    status: "Editorial control source",
    summary: "Multi-layered verification protocols, right-of-reply requirements, and evidentiary weight scales.",
  },
  {
    id: "E",
    code: "Part E",
    title: "Part E: Stakeholder Review & Governance",
    category: "Master synthesis",
    href: "/accountability",
    status: "Working analysis",
    summary: "Governance structures, conflict disclosures, funding independence, and editorial accountability.",
  },
  {
    id: "F",
    code: "Part F",
    title: "Part F: Turnover, Tenure & Financial Deep Dive",
    category: "Research dossier",
    href: "/research-centre/workforce-financial-data",
    status: "Primary-source checks ongoing",
    summary: "Synthesis of retail workforce demographics, tenure trends, and WGEA gender remuneration data.",
  },
  {
    id: "INT-LV",
    code: "INT-LV",
    title: "MECCA's Living Values (2024)",
    category: "Internal document",
    href: "/employer-commitments",
    status: "Authentication & clearance pending",
    summary: "Stated company values including Customer Focus, Innovation, Leadership, and Collaboration.",
  },
  {
    id: "INT-DPG",
    code: "INT-DPG",
    title: "Development Planning Guidebook (Restricted)",
    category: "Internal document",
    href: "/investigation/development-planning",
    status: "Pre-publication legal hold",
    summary: "Contributor-supplied guidebook withheld pending qualified legal advice and provenance review.",
  },
  {
    id: "INT-PGRS-01",
    code: "INT-PGRS-01",
    title: "Performance & Growth Rating Scale",
    category: "Internal document",
    href: "/employer-commitments",
    status: "Scope identified; Support Centre",
    summary: "1-5 performance rating criteria and calibration framework documented in review records.",
  },
  {
    id: "CORP",
    code: "CORP",
    title: "MECCA Brands Corporate & Leadership Dossier",
    category: "Research dossier",
    href: "/research-centre/corporate-history",
    status: "Evidence-led corporate dossier",
    summary: "ABN/ACN entity records, governance overview, and private shareholding structure analysis.",
  },
  {
    id: "EMP",
    code: "EMP",
    title: "MECCA Brands Workplace Investigation Series",
    category: "Master synthesis",
    href: "/investigation",
    status: "Employment & litigation synthesis",
    summary: "Comparative analysis testing floor worker testimony against published company commitments.",
  },
  {
    id: "LEGAL",
    code: "LEGAL",
    title: "Legal Framework for Independent Workplace Investigations",
    category: "Legal context",
    href: "/research-centre/workplace-law",
    status: "General legal research",
    summary: "Analysis of Australian journalist shield laws, interview consent, and statutory whistleblower rights.",
  },
  {
    id: "SENTIMENT",
    code: "SENTIMENT",
    title: "Recurring Themes in MECCA Employee Discourse",
    category: "Research dossier",
    href: "/research-centre/sentiment-analysis",
    status: "Review-platform synthesis",
    summary: "Qualitative synthesis of employee sentiment on training, progression, scheduling, and store culture.",
  },

  // --- Specific Public Records & Media Evidence in the Register ---
  {
    id: "REG-ASIC-001",
    code: "REG-ASIC-001",
    title: "ASIC Infringement Notice M01700495",
    category: "Verified primary fact",
    href: "/research-centre/source-evidence",
    status: "Official regulator record checked",
    summary: "Official ASIC infringement notice and media release 26-057MR regarding FY2024 financial reporting.",
  },
  {
    id: "MEDIA-PED-001",
    code: "MEDIA-PED-001",
    title: "Pedestrian.TV 2019 Bullying Investigation",
    category: "Media report",
    href: "/research-centre/public-claims/2019-workplace-culture",
    status: "Attributed media report",
    summary: "November 2019 reporting on ex-employee accounts, Young Workers Centre reports, and culture review announcement.",
  },
  {
    id: "MEDIA-SMH-001",
    code: "MEDIA-SMH-001",
    title: "Sydney Morning Herald Culture Review Report",
    category: "Media report",
    href: "/research-centre/public-claims/2019-workplace-culture",
    status: "Attributed media report",
    summary: "17 November 2019 investigative reporting on workplace bullying claims and executive response.",
  },
  {
    id: "MEDIA-APA-001",
    code: "MEDIA-APA-001",
    title: "Australian Payroll Association $560k Review",
    category: "Media report",
    href: "/research-centre/source-evidence",
    status: "Secondary media report",
    summary: "March 2023 report regarding historical payroll review covering roughly 1,600 staff between 2016-2022.",
  },
  {
    id: "LAW-WB-01",
    code: "LAW-WB-01",
    title: "Whistleblower Protections & Stopline Channel",
    category: "Legal context",
    href: "/analysis/mecca-complaints-whistleblower-policy",
    status: "Policy & statutory analysis",
    summary: "Analysis of MECCA's Stopline intake mechanism vs Corporations Act qualifying disclosure criteria.",
  },
  {
    id: "LAW-001",
    code: "LAW-001",
    title: "Workplace Bullying & Fair Work Context",
    category: "Legal context",
    href: "/research-centre/workplace-law",
    status: "Legal research framework",
    summary: "Statutory definitions of repeated unreasonable behaviour creating risks to health and safety.",
  },
  {
    id: "LAW-005",
    code: "LAW-005",
    title: "Source Confidentiality & Shield Laws",
    category: "Legal context",
    href: "/share-story/evidence",
    status: "Source protection framework",
    summary: "Australian journalist-source privilege limits and digital source safety safeguards.",
  },
  {
    id: "WGEA-MECCA-2026",
    code: "WGEA-MECCA-2026",
    title: "WGEA Gender Pay Gap Reporting Data",
    category: "Company statement",
    href: "/research-centre/workforce-financial-data",
    status: "Regulator dataset cross-check",
    summary: "WGEA employer pay gap data and workforce composition analysis.",
  },
  {
    id: "SAFETY-GUIDE",
    code: "SRC-SAFE",
    title: "Source Safety & Contributor Protocol",
    category: "Evidence standard",
    href: "/share-story/evidence",
    status: "Contributor security protocol",
    summary: "Protocols on personal devices, metadata scrubbing, pseudonymity, and separate publication consent.",
  },
];

/**
 * Keyword and pattern triggers to match text to relevant Source Register items.
 */
const SOURCE_TRIGGERS: { id: string; patterns: RegExp[] }[] = [
  {
    id: "REG-ASIC-001",
    patterns: [
      /ASIC/i,
      /infringement notice/i,
      /26-057MR/i,
      /M01700495/i,
      /financial report/i,
      /lodgement/i,
      /RTCH/i,
    ],
  },
  {
    id: "MEDIA-PED-001",
    patterns: [
      /pedestrian/i,
      /est[ée]e laundry/i,
      /2019 review/i,
      /young workers centre/i,
      /2019 workplace/i,
      /2019 culture/i,
      /2019 controvers/i,
    ],
  },
  {
    id: "MEDIA-SMH-001",
    patterns: [
      /sydney morning herald/i,
      /smh/i,
      /it's all fake/i,
      /jo horgan/i,
    ],
  },
  {
    id: "MEDIA-APA-001",
    patterns: [
      /payroll association/i,
      /560,?000/i,
      /back-payment/i,
      /backpay/i,
      /underpayment/i,
      /historical payroll/i,
    ],
  },
  {
    id: "LAW-WB-01",
    patterns: [
      /stopline/i,
      /whistleblower/i,
      /corporations act/i,
      /qualifying disclosure/i,
      /complaint pathway/i,
      /reporting concern/i,
      /speaking up/i,
      /retaliation/i,
    ],
  },
  {
    id: "INT-DPG",
    patterns: [
      /development planning guidebook/i,
      /legal hold/i,
      /pre-publication hold/i,
      /restricted source/i,
      /provenance/i,
      /2024 guidebook/i,
    ],
  },
  {
    id: "INT-LV",
    patterns: [
      /living values/i,
      /corporate values/i,
      /customer focus/i,
      /stated values/i,
    ],
  },
  {
    id: "INT-PGRS-01",
    patterns: [
      /rating scale/i,
      /performance and growth/i,
      /1-5 rating/i,
      /performance review/i,
      /formal review/i,
      /support centre rating/i,
    ],
  },
  {
    id: "WGEA-MECCA-2026",
    patterns: [
      /wgea/i,
      /gender pay gap/i,
      /total remuneration/i,
      /workforce composition/i,
    ],
  },
  {
    id: "LAW-001",
    patterns: [
      /bullying/i,
      /fair work/i,
      /psychosocial/i,
      /psychological safety/i,
      /unreasonable behaviour/i,
      /harassment/i,
    ],
  },
  {
    id: "LAW-005",
    patterns: [
      /shield law/i,
      /journalist privilege/i,
      /confidential source/i,
      /subpoena/i,
    ],
  },
  {
    id: "SAFETY-GUIDE",
    patterns: [
      /home network/i,
      /personal device/i,
      /metadata/i,
      /pseudonym/i,
      /anonym/i,
      /submit.*story/i,
      /share.*experience/i,
      /safe.*submit/i,
      /taking part/i,
    ],
  },
  {
    id: "SENTIMENT",
    patterns: [
      /sentiment/i,
      /glassdoor/i,
      /indeed/i,
      /review platform/i,
      /employee discourse/i,
      /casual employment/i,
      /rostering/i,
    ],
  },
  {
    id: "CORP",
    patterns: [
      /abn/i,
      /acn/i,
      /private company/i,
      /proprietary company/i,
      /ownership/i,
      /trust/i,
      /chadstone/i,
      /concession/i,
      /myer/i,
    ],
  },
  {
    id: "CRR",
    patterns: [
      /12 areas/i,
      /areas of inquiry/i,
      /investigation scope/i,
      /evidence standard/i,
      /corroborat/i,
      /methodology/i,
    ],
  },
  {
    id: "D",
    patterns: [
      /factual-risk/i,
      /right of reply/i,
      /editorial standard/i,
      /accuracy audit/i,
    ],
  },
  {
    id: "E",
    patterns: [
      /founder/i,
      /who runs/i,
      /accountability/i,
      /conflict/i,
      /funding/i,
      /bias/i,
      /independence/i,
    ],
  },
];

/**
 * Automatically extracts relevant Source Register citations from generated text and user prompt.
 */
export function extractSourceCitations(
  assistantText: string,
  userQuery = ""
): SourceCitation[] {
  const combined = `${userQuery} \n\n ${assistantText}`;
  const catalogMap = new Map(SOURCE_REGISTER_CATALOG.map((item) => [item.id, item]));
  const matchedIds = new Set<string>();

  // 1. Direct explicit tags extraction (e.g. [Source: INT-LV], [Ref: REG-ASIC-001], [Source Register: CRR], `INT-DPG`, etc.)
  const explicitPatterns = [
    /\[(?:Source|Citation|Ref|Register|Source Register):\s*([A-Za-z0-9\-_]+)\]/gi,
    /\b(REG-ASIC-001|MEDIA-PED-001|MEDIA-SMH-001|MEDIA-APA-001|INT-DPG|INT-LV|INT-PGRS-01|WGEA-MECCA-2026|LAW-WB-01|LAW-001|LAW-005|CRR|CORP|SENTIMENT)\b/gi,
  ];

  for (const regex of explicitPatterns) {
    let match: RegExpExecArray | null;
    while ((match = regex.exec(combined)) !== null) {
      const code = match[1]?.toUpperCase();
      if (code && catalogMap.has(code)) {
        matchedIds.add(code);
      }
    }
  }

  // 2. Keyword and Semantic Pattern Matching
  for (const trigger of SOURCE_TRIGGERS) {
    for (const pattern of trigger.patterns) {
      if (pattern.test(combined)) {
        matchedIds.add(trigger.id);
        break;
      }
    }
  }

  // 3. Fallback: If no citations matched, provide master reference (CRR + Methodology / Source Register)
  if (matchedIds.size === 0) {
    matchedIds.add("CRR");
    matchedIds.add("D");
  }

  // Convert to array and limit to the top 4 most specific and relevant citations
  const result: SourceCitation[] = [];
  for (const id of matchedIds) {
    const item = catalogMap.get(id);
    if (item) {
      result.push(item);
    }
  }

  // Sort citations: Specific records (REG-, MEDIA-, INT-, LAW-) first, then general dossiers (CRR, A, B, etc.)
  result.sort((a, b) => {
    const aIsSpecific = a.id.includes("-");
    const bIsSpecific = b.id.includes("-");
    if (aIsSpecific && !bIsSpecific) return -1;
    if (!aIsSpecific && bIsSpecific) return 1;
    return a.title.localeCompare(b.title);
  });

  return result.slice(0, 4);
}

/**
 * Cleans any raw bracket citation tags like [Source: XYZ] from display text if needed
 */
export function cleanCitationTags(text: string): string {
  return text.replace(
    /\[(?:Source|Citation|Ref|Source Register):\s*([A-Za-z0-9\-_]+)\]/gi,
    ""
  );
}
