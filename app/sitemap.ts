import type { MetadataRoute } from "next";
import { categories, documents } from "./employer-commitments/data";
import { siteUrl } from "./seo";

const staticRoutes = [
  "/",
  "/accountability",
  "/analysis",
  "/analysis/identity-inclusion",
  "/analysis/public-commentary",
  "/analysis/mecca-complaints-whistleblower-policy",
  "/analysis/working-at-mecca-reviews",
  "/change-agenda",
  "/documentary",
  "/editorial-ethics",
  "/employer-commitments",
  "/employer-commitments/source-access",
  "/evidence",
  "/investigation",
  "/investigation/development-planning",
  "/join-movement",
  "/legal-publication-policy",
  "/methodology",
  "/public-record",
  "/research-centre",
  "/research-centre/corporate-history",
  "/research-centre/dashboard",
  "/research-centre/evidence-graph",
  "/research-centre/internal-documents",
  "/research-centre/investigation-notebook",
  "/research-centre/public-claims",
  "/research-centre/public-claims/2019-workplace-culture",
  "/research-centre/research-updates",
  "/research-centre/sentiment-analysis",
  "/research-centre/source-evidence",
  "/research-centre/workforce-financial-data",
  "/research-centre/workplace-law",
  "/share-story",
  "/share-story/documentary",
  "/share-story/evidence",
  "/share-story/research-questionnaire",
  "/stories",
  "/stories/case-study-001",
  "/updates",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-31T12:00:00+10:00");
  const dynamicRoutes = [
    ...categories.map(({ slug }) => `/employer-commitments/categories/${slug}`),
    ...documents.map(({ slug }) => `/employer-commitments/documents/${slug}`),
  ];

  return [...staticRoutes, ...dynamicRoutes].map((path) => ({
    url: `${siteUrl}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency: path === "/" || path === "/analysis" || path === "/updates" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.split("/").length <= 2 ? 0.8 : 0.6,
  }));
}
