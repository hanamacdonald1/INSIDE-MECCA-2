import { getCategory } from "../../data";
import { buildMetadata } from "../../../seo";
import { SeoLayout } from "../../../seo-layout";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return buildMetadata({ title: "Category Not Found | Inside MECCA", description: "The requested employer-commitments category was not found.", path: `/employer-commitments/categories/${slug}`, noIndex: true });
  return buildMetadata({ title: category.seoTitle ?? `${category.name} | Inside MECCA`, description: category.seoDescription ?? `${category.description} Explore linked MECCA workplace guidance and source status.`, path: `/employer-commitments/categories/${slug}` });
}

export default SeoLayout;
