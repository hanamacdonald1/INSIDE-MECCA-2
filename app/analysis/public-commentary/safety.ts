export function sanitizePublicExcerpt(value: string): string {
  return value
    .replace(/https?:\/\/\S+/gi, "[link removed]")
    .replace(/\b[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}\b/g, "[email removed]")
    .replace(/(^|\s)@[A-Za-z0-9_.-]+\b/g, "$1[account removed]")
    .replace(/\b(?:\+?61|0)[2-478](?:[\s-]?\d){8}\b/g, "[phone removed]")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 500);
}
