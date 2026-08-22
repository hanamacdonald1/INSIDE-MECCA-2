import Link from "next/link";
import { PageHero, SitePage } from "../site-shell";
import type { ResearchRecord } from "./data";
import { ResearchExplorer } from "./research-explorer";

export function CollectionPage({label,title,intro,records,notice,featured,relatedLinks=[]}:{label:string;title:string;intro:string;records:ResearchRecord[];notice:string;featured?:React.ReactNode;relatedLinks?:{href:string;label:string}[]}) {
  return <SitePage><PageHero label={label} title={title}><p>{intro}</p></PageHero>
    <section className="rc-disclaimer"><strong>Before you use these records</strong><p>{notice}</p></section>
    {featured}
    <section className="rc-collection"><ResearchExplorer records={records}/></section>
    <section className="rc-related"><p className="rb-kicker">Keep exploring</p><h2>See where the records came from and how they are used</h2><div className="rc-link-grid"><Link href="/research-centre">Back to the Research Centre</Link><Link href="/methodology">How evidence is assessed</Link><Link href="/research-centre/evidence-graph">How sources connect</Link><Link href="/legal-publication-policy">Legal and publication policy</Link>{relatedLinks.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}</div></section>
  </SitePage>;
}
