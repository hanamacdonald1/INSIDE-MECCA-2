"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { GlobalSearch } from "./global-search";
import { Disclosure } from "./disclosure";

const primaryNav = [
  ["Home", "/"],
  ["Investigation", "/investigation"],
  ["Research Centre", "/research-centre"],
  ["Evidence Library", "/evidence"],
  ["Public Record", "/public-record"],
  ["Updates", "/updates"],
];

const secondaryNav = [
  ["Analysis", "/analysis"],
  ["Public commentary", "/analysis/public-commentary"],
  ["Methodology", "/methodology"],
  ["Change Agenda", "/change-agenda"],
  ["FAQ", "/faq"],
  ["Get Involved", "/join-movement"],
];

export function SiteHeader() { 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const pathname = usePathname();

  const isLinkActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href || pathname?.startsWith(`${href}/`);
  };

  return (
    <>
      {showBanner && (
        <div className="bg-zinc-950 text-white relative">
          <div className="px-4 py-2.5 max-w-7xl mx-auto md:flex md:items-center md:justify-between text-sm md:text-[13px] leading-snug">
            <div className="pr-8">
              <p className="font-mono uppercase tracking-wider font-semibold text-zinc-300">
                Independent project. Not affiliated with MECCA Brands. Submissions and public comments are not findings.
              </p>
              <Disclosure
                id="important-context"
                containerClassName="mt-2 group relative z-50 inline-block"
                summaryClassName="cursor-pointer underline underline-offset-4 hover:text-red-400 font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded px-1 -mx-1 py-1 inline-flex items-center min-h-[44px] md:min-h-0"
                summary={<>Read important context</>}
                contentClassName="absolute left-0 md:left-auto md:right-0 top-full mt-2 w-[calc(100vw-2rem)] md:w-96 bg-zinc-900 border border-zinc-700 p-4 rounded shadow-xl text-zinc-200 z-50"
              >
                Important context: Inside MECCA is an independent public-interest research and advocacy project. It is not affiliated with or endorsed by MECCA Brands. Allegations and public comments are not findings. Material may be disputed, incomplete or unverified. Corrections and responses are welcomed.
              </Disclosure>
            </div>
            <button 
              onClick={() => setShowBanner(false)}
              className="absolute top-1/2 -translate-y-1/2 right-2 p-2 hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-white flex items-center justify-center min-w-[44px] min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
              aria-label="Dismiss banner"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
        </div>
      )}
      <header className="sticky top-0 z-40 bg-[#f7f5f1]/95 backdrop-blur border-b border-[#cfc7bd]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between min-h-[64px] md:min-h-[72px]">
          <Link className="flex items-center gap-1.5 text-zinc-950 hover:opacity-80 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700 rounded-sm min-h-[48px]" href="/" aria-label="Inside MECCA home">
            <span className="bg-[#b42025] text-white px-2 py-1.5 font-mono font-bold text-[10px] sm:text-xs tracking-widest">INSIDE</span>
            <strong className="text-xl sm:text-2xl font-serif tracking-tight">MECCA</strong>
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-7">
            <nav aria-label="Main navigation" className="flex items-center gap-3 lg:gap-5 xl:gap-6">
              {primaryNav.map(([label, href]) => {
                const active = isLinkActive(href);
                return (
                  <Link 
                    key={label} 
                    href={href} 
                    className={`text-[13px] font-bold tracking-wide transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700 rounded-sm flex items-center min-h-[48px] border-b-2 ${
                      active
                        ? "text-[#b42025] border-[#b42025]"
                        : "text-zinc-800 border-transparent hover:text-[#b42025]"
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    {label}
                  </Link>
                );
              })}
              
              <Disclosure
                id="desktop-more-menu"
                containerClassName="relative group"
                summaryClassName="cursor-pointer text-[13px] font-bold tracking-wide text-zinc-800 hover:text-[#b42025] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700 rounded-sm list-none flex items-center gap-1 min-h-[48px]"
                summary={
                  <>
                    More
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </>
                }
                contentClassName="absolute right-0 top-full mt-2 w-56 bg-white border border-stone-200 shadow-lg p-2 rounded flex flex-col gap-1 z-50"
              >
                  {secondaryNav.map(([label, href]) => {
                    const active = isLinkActive(href);
                    return (
                      <Link 
                        key={label} 
                        href={href} 
                        className={`px-3 py-2 text-[13px] font-semibold rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700 min-h-[48px] flex items-center ${
                          active
                            ? "bg-red-50 text-[#b42025] font-bold"
                            : "text-zinc-800 hover:bg-stone-100"
                        }`}
                        aria-current={active ? "page" : undefined}
                      >
                        {label}
                      </Link>
                    );
                  })}
                  <div className="border-t border-stone-200 my-1"></div>
                  <div className="px-2 pb-1">
                    <GlobalSearch />
                  </div>
              </Disclosure>
            </nav>
            <div className="w-px h-6 bg-stone-300"></div>
            <div className="flex items-center gap-3">
              <Link className="flex items-center justify-center min-h-[48px] bg-[#b42025] text-white px-4 font-bold text-sm hover:bg-[#8e171b] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700 focus-visible:ring-offset-2 rounded-sm" href="/share-story" data-analytics-event="share_path_click" data-analytics-detail="header">
                Share your experience
              </Link>
            </div>
          </div>

          {/* Mobile Nav Toggle & Actions */}
          <div className="flex md:hidden items-center gap-2">
            <Link 
              className="flex items-center justify-center min-h-[44px] bg-[#b42025] text-white px-3 font-bold text-xs sm:text-sm hover:bg-[#8e171b] transition-colors rounded-sm"
              href="/share-story"
            >
              Share
            </Link>
            <button 
              className="flex items-center gap-1.5 min-h-[44px] px-3 border border-stone-300 rounded font-bold text-xs sm:text-sm bg-white hover:bg-stone-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav-drawer"
            >
              Menu
              {isMobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {isMobileMenuOpen && (
          <div id="mobile-nav-drawer" className="md:hidden absolute left-0 right-0 top-full bg-[#f7f5f1] border-b border-stone-300 shadow-xl flex flex-col p-4 z-50 max-h-[calc(100vh-64px)] overflow-y-auto">
            <nav aria-label="Mobile navigation">
              <div className="mb-4">
                <GlobalSearch />
              </div>
              <div className="flex flex-col gap-1 border-t border-stone-200 pt-4 pb-2">
                {[...primaryNav, ...secondaryNav].map(([label, href]) => {
                  const active = isLinkActive(href);
                  return (
                    <Link 
                      key={label} 
                      href={href} 
                      onClick={() => setIsMobileMenuOpen(false)} 
                      className={`px-4 py-3 font-bold text-base border-b border-stone-200 last:border-0 rounded-sm focus:outline-none focus-visible:bg-stone-200 min-h-[48px] flex items-center transition-colors ${
                        active
                          ? "text-[#b42025] bg-stone-100 font-extrabold border-l-4 border-l-[#b42025]"
                          : "text-zinc-900 hover:text-[#b42025] hover:bg-stone-100"
                      }`}
                      aria-current={active ? "page" : undefined}
                    >
                      {label}
                    </Link>
                  );
                })}
              </div>
              <div className="mt-4 pt-4 border-t border-stone-300 flex flex-col gap-2">
                <Link onClick={() => setIsMobileMenuOpen(false)} className="flex justify-center items-center w-full bg-[#b42025] text-white px-4 font-bold text-base hover:bg-[#8e171b] focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 rounded-sm min-h-[48px]" href="/share-story">
                  Share your experience
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="rb-footer">
      <div>
        <Link className="rb-mark inverse" href="/">
          <span>INSIDE</span>
          <strong>MECCA</strong>
        </Link>
        <p className="text-sm text-stone-400 mt-2">Inside MECCA — Workplace Accountability Investigation.</p>
      </div>

      <div className="rb-footer-links">
        <Link href="/">Home</Link>
        <Link href="/investigation">Investigation</Link>
        <Link href="/research-centre">Research</Link>
        <Link href="/evidence">Evidence Library</Link>
        <Link href="/public-record">Public Record</Link>
        <Link href="/updates">Updates</Link>
        <Link href="/share-story">Share Your Story</Link>
        <Link href="/analysis">Analysis</Link>
        <Link href="/methodology">Methodology</Link>
        <Link href="/faq">FAQ</Link>
        <Link href="/editorial-ethics">Editorial standards</Link>
        <Link href="/legal-publication-policy">Legal policy</Link>
        <Link href="/legal-publication-policy#privacy">Privacy</Link>
        <Link href="/research-centre/research-updates#corrections">Corrections</Link>
        <Link href="/share-story/evidence">Source safety</Link>
        <a href="mailto:insidemecca@mail2australia.com?subject=Privacy%20Request">Contact / Privacy</a>
      </div>

      <div className="rb-independence">
        <strong>Independent project</strong>
        <p>Inside MECCA is not affiliated with, endorsed by or operated by MECCA Brands Pty Ltd. MECCA names and marks identify the subject of the investigation.</p>
        <div className="rb-social-block mt-4 pt-3 border-t border-neutral-800">
          <strong className="block text-white font-bold text-xs uppercase tracking-widest mb-2.5">Follow Inside MECCA</strong>
          <div className="rb-social-links flex flex-col gap-2">
            <a
              className="inline-flex items-center gap-2.5 text-stone-300 hover:text-white font-semibold text-xs py-1 transition-colors group"
              href="https://www.instagram.com/insidemecca/"
              target="_blank"
              rel="noreferrer"
              aria-label="Inside MECCA on Instagram"
            >
              <span className="flex items-center justify-center w-7 h-7 rounded bg-neutral-800 border border-neutral-700 text-stone-300 group-hover:text-white group-hover:border-neutral-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </span>
              <span>Instagram <span className="text-neutral-500 text-[11px] font-normal">@insidemecca</span></span>
            </a>

            <a
              className="inline-flex items-center gap-2.5 text-stone-300 hover:text-white font-semibold text-xs py-1 transition-colors group"
              href="https://www.tiktok.com/@inside.mecca.work"
              target="_blank"
              rel="noreferrer"
              aria-label="Inside MECCA on TikTok"
            >
              <span className="flex items-center justify-center w-7 h-7 rounded bg-neutral-800 border border-neutral-700 text-stone-300 group-hover:text-white group-hover:border-neutral-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.88 2.89 2.89 0 0 1-2.88-2.88 2.89 2.89 0 0 1 2.88-2.88c.4 0 .78.08 1.12.22V9.45a6.34 6.34 0 0 0-1.12-.1 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 4.76 1.52V6.82a4.85 4.85 0 0 1-1-.13z"/>
                </svg>
              </span>
              <span>TikTok <span className="text-neutral-500 text-[11px] font-normal">@inside.mecca.work</span></span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function PageHero({label,title,children,dark=false}:{label:string;title:string;children:React.ReactNode;dark?:boolean}) { 
  return <section className={`rb-page-hero ${dark?"dark":""}`}><p className="rb-kicker">{label}</p><h1>{title}</h1><div className="rb-page-lede">{children}</div></section>; 
}

export function SitePage({children}:{children:React.ReactNode}) {
  return (
    <main className="rb-site">
      <SiteHeader />
      {children}
      <SiteFooter />
    </main>
  );
}
