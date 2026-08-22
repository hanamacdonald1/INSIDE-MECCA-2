import Link from "next/link";
import { GlobalSearch } from "./global-search";

const nav = [["Investigation", "/investigation"], ["Research", "/research-centre"], ["Analysis", "/analysis"], ["Evidence", "/evidence"], ["Updates", "/updates"], ["Get involved", "/join-movement"]];

export function SiteHeader() { return <><div className="rb-announcement"><span>Worked at MECCA? Share what you experienced on your terms</span><Link href="/share-story" data-analytics-event="share_path_click" data-analytics-detail="announcement">Share your MECCA experience</Link></div><header className="rb-header"><Link className="rb-mark" href="/" aria-label="Inside MECCA home"><span>INSIDE</span><strong>MECCA</strong></Link><details className="rb-menu"><summary>Menu</summary><nav aria-label="Main navigation">{nav.map(([label,href])=><Link key={label} href={href}>{label}</Link>)}</nav></details><nav className="rb-nav" aria-label="Main navigation">{nav.map(([label,href])=><Link key={label} href={href}>{label}</Link>)}</nav><GlobalSearch/><div className="rb-header-actions"><Link className="rb-link-button" href="/join-movement">Work with us</Link><Link className="rb-button red" href="/share-story" data-analytics-event="share_path_click" data-analytics-detail="header">Share your MECCA experience</Link></div></header></>; }

export function SiteFooter() {
  return <footer className="rb-footer">
    <div>
      <Link className="rb-mark inverse" href="/"><span>INSIDE</span><strong>MECCA</strong></Link>
      <p>Independent workplace investigation and documentary project.</p>
    </div>
    <div className="rb-footer-links">
      <Link href="/investigation">Investigation</Link>
      <Link href="/research-centre">Research</Link>
      <Link href="/analysis">Analysis</Link>
      <Link href="/analysis/public-commentary">Public commentary</Link>
      <Link href="/methodology">Methodology</Link>
      <Link href="/accountability">Accountability</Link>
      <Link href="/updates">Project updates</Link>
      <Link href="/editorial-ethics">Editorial standards</Link>
      <Link href="/legal-publication-policy">Legal policy</Link>
      <Link href="/research-centre/research-updates#corrections">Corrections</Link>
      <Link href="/#source-safety">Source safety</Link>
      <Link href="/#contact">Contact</Link>
    </div>
    <div className="rb-independence">
      <strong>Independent project</strong>
      <p>Inside MECCA is not affiliated with, endorsed by or operated by MECCA Brands Pty Ltd. MECCA names and marks identify the subject of the investigation.</p>
      <div className="rb-social-block">
        <strong>Follow Inside MECCA</strong>
        <div className="rb-social-links">
          <a className="rb-social-link" href="https://www.instagram.com/insidemecca?igsh=dmdrNWNoYWluOW92&utm_source=qr" target="_blank" rel="noreferrer" aria-label="Inside MECCA on Instagram" title="Instagram"><span className="rb-social-icon instagram" aria-hidden="true"/><span className="rb-visually-hidden">Instagram</span></a>
          <a className="rb-social-link" href="https://www.tiktok.com/@insidemecca" target="_blank" rel="noreferrer" aria-label="Inside MECCA on TikTok" title="TikTok"><span className="rb-social-icon tiktok" aria-hidden="true">♪</span><span className="rb-visually-hidden">TikTok</span></a>
        </div>
      </div>
    </div>
  </footer>;
}

export function PageHero({label,title,children,dark=false}:{label:string;title:string;children:React.ReactNode;dark?:boolean}) { return <section className={`rb-page-hero ${dark?"dark":""}`}><p className="rb-kicker">{label}</p><h1>{title}</h1><div className="rb-page-lede">{children}</div></section>; }
export function SitePage({children}:{children:React.ReactNode}) { return <main className="rb-site"><SiteHeader />{children}<SiteFooter /></main>; }
