import { getDocument } from "../../data";
import { buildMetadata } from "../../../seo";
import { SeoLayout } from "../../../seo-layout";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const document = getDocument(slug);
  if (!document) return buildMetadata({ title: "Document Not Found | Inside MECCA", description: "The requested employer-commitments document was not found.", path: `/employer-commitments/documents/${slug}`, noIndex: true });
  return buildMetadata({ title: document.seoTitle ?? `${document.title} | Inside MECCA`, description: document.seoDescription ?? document.description, path: `/employer-commitments/documents/${slug}` });
}

export default SeoLayout;
