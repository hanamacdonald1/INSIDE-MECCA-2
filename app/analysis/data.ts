export const analysisEntries = [
  {
    slug: "mecca-complaints-whistleblower-policy",
    title: "What do MECCA's public complaints and whistleblower policies say?",
    shortTitle: "MECCA complaints and whistleblower policy",
    description: "A source-labelled guide to MECCA complaint and whistleblower pathways, what the published policies say and what they do not establish about practice.",
    excerpt: "MECCA's public sources describe different pathways for personal workplace grievances, bullying and harassment complaints, and protected whistleblower disclosures. This guide keeps those categories separate.",
    published: "2026-08-12",
    updated: "2026-08-12",
    displayDate: "12 August 2026",
    readingTime: "7 minute read",
    category: "Policy and process explainer",
  },
  {
    slug: "working-at-mecca-reviews",
    title: "What can a workplace review really tell you about MECCA?",
    shortTitle: "Working at MECCA reviews",
    description: "A practical guide to reading MECCA workplace reviews alongside employee accounts, company commitments and the limits of anonymous platforms.",
    excerpt: "Review sites can raise useful questions, but one rating or story cannot describe a whole workforce. Here is how we read them against other evidence.",
    published: "2026-08-11",
    updated: "2026-08-11",
    displayDate: "11 August 2026",
    readingTime: "8 minute read",
    category: "Workplace culture analysis",
  },
] as const;

export function getAnalysisEntry(slug: string) {
  return analysisEntries.find((entry) => entry.slug === slug);
}
