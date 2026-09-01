import type { Metadata } from "next";

export const siteUrl = "https://insidemecca.net";
export const siteName = "Inside MECCA";
export const defaultSocialImage = "/og-v3.png";

type SeoInput = {
  title: string;
  description: string;
  path: string;
  socialImage?: string;
  socialImageAlt?: string;
  noIndex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

export function buildMetadata({
  title,
  description,
  path,
  socialImage = defaultSocialImage,
  socialImageAlt = "Inside MECCA workplace investigation",
  noIndex = false,
  type = "website",
  publishedTime,
  modifiedTime,
}: SeoInput): Metadata {
  const canonicalPath = path.startsWith("/") ? path : `/${path}`;
  const openGraph = type === "article"
    ? {
        type: "article" as const,
        locale: "en_AU",
        siteName,
        url: canonicalPath,
        title,
        description,
        publishedTime,
        modifiedTime,
        images: [{
          url: socialImage,
          width: 1200,
          height: 630,
          alt: socialImageAlt,
        }],
      }
    : {
        type: "website" as const,
        locale: "en_AU",
        siteName,
        url: canonicalPath,
        title,
        description,
        images: [{
          url: socialImage,
          width: 1200,
          height: 630,
          alt: socialImageAlt,
        }],
      };

  return {
    title,
    description,
    applicationName: siteName,
    creator: siteName,
    publisher: siteName,
    alternates: { canonical: canonicalPath },
    robots: noIndex
      ? { index: false, follow: false, nocache: true }
      : { index: true, follow: true },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}

export const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: siteName,
    alternateName: "Inside MECCA | Workplace Accountability Investigation",
    url: siteUrl,
    logo: `${siteUrl}/favicon.svg`,
    description: "An independent workplace accountability investigation examining employee experiences and workplace systems at MECCA Brands.",
    sameAs: [
      "https://www.instagram.com/insidemecca",
      "https://www.tiktok.com/@insidemecca",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: siteName,
    alternateName: "Inside MECCA | Workplace Accountability Investigation",
    description: "Independent evidence-led research and accountability investigation into workplace experiences and systems at MECCA Brands.",
    publisher: { "@id": `${siteUrl}/#organization` },
    inLanguage: "en-AU",
  },
];
