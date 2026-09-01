"use client";

import Link from "next/link";
import { SitePage } from "./site-shell";
import { GlobalSearch } from "./global-search";
import { useState, useRef, useEffect } from "react";

export default function NotFound() {
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchOpen && searchRef.current) {
      const input = searchRef.current.querySelector('input[type="search"]') as HTMLInputElement;
      if (input) {
        input.focus();
      }
    }
  }, [searchOpen]);

  return (
    <SitePage>
      <section className="rb-section py-16 md:py-24 flex flex-col items-center justify-center text-center">
        <div className="w-full max-w-3xl px-4">
          <h1 className="text-clamp-heading font-serif font-normal mb-6">
            Page not found
          </h1>
          <p className="rb-lede mx-auto mb-12 text-lg">
            The page may have moved, been removed or may not yet be public. Choose where to go next.
          </p>
          
          {searchOpen && (
            <div className="w-full max-w-md mx-auto mb-12 text-left" ref={searchRef}>
              <GlobalSearch />
            </div>
          )}

          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/" className="rb-button min-w-[180px] min-h-[44px]" aria-label="Go to Home page">
              Home
            </Link>
            
            <button 
              onClick={() => setSearchOpen(true)}
              className="rb-button min-w-[180px] min-h-[44px]"
              aria-label="Search the site"
            >
              Search the site
            </button>

            <Link href="/investigation" className="rb-button min-w-[180px] min-h-[44px]" aria-label="Go to Investigation page">
              Investigation
            </Link>
            <Link href="/evidence" className="rb-button min-w-[180px] min-h-[44px]" aria-label="Go to Evidence Library page">
              Evidence Library
            </Link>
            <Link href="/share-story" className="rb-button red min-w-[180px] min-h-[44px]" aria-label="Go to Share your experience page">
              Share your experience
            </Link>
          </div>
        </div>
      </section>
    </SitePage>
  );
}
