import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero, SitePage } from "../../../site-shell";
import { categories, documents, getCategory, getEditorialMeta } from "../../data";

export function generateStaticParams() { return categories.map((category) => ({ slug: category.slug })); }

export default async function CommitmentCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  const linked = documents.filter((document) => category.documentSlugs.includes(document.slug));

  return <SitePage><div className="ec-archive">
    <PageHero label="Employer commitments / Topic" title={category.seoH1 ?? category.name} dark><p>{category.description}</p><p>These are independent, paraphrased research records. They are not official MECCA documents and do not provide access to an original source.</p><p>They identify themes and questions for research. They do not establish authenticity, implementation or how consistently any guidance was followed.</p></PageHero>
    <section className="ec-section">
      <p className="rb-kicker">Records connected with this topic</p>
      <h2>{linked.length ? `${linked.length} ${linked.length === 1 ? "reconstruction is" : "reconstructions are"} currently linked` : "We are still collecting sources"}</h2>
      {linked.length ? <div className="ec-document-list">{linked.map((document) => { const editorial = getEditorialMeta(document.slug); return <article className="ec-document" key={document.slug}>
        <div><p className="ec-meta">{editorial.recordType} / {editorial.sourceKey} / {document.status}</p><h3>{document.title}</h3><p>{document.description}</p><p className="ec-scope"><strong>Scope:</strong> {editorial.scope}</p><div className="ec-tags">{document.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
        <div className="ec-doc-actions"><Link className="ec-button light" href={`/employer-commitments/documents/${document.slug}`}>Read the independent reconstruction</Link></div>
      </article>})}</div> : <div className="ec-empty"><p>No reviewed source document has yet been assigned to this category. Its presence identifies a planned research area, not a claim about current policy.</p></div>}
      {category.relatedLinks?.length ? <div><p className="rb-kicker">Related research</p><div className="rb-actions">{category.relatedLinks.map((item) => <Link className="ec-button light" href={item.href} key={item.href}>{item.label}</Link>)}</div></div> : null}
      <Link className="ec-back" href="/employer-commitments">← Back to employer commitments</Link>
    </section>
  </div></SitePage>;
}
