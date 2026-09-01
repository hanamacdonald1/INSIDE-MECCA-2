"use client";
import Link from "next/link";

export function MobileBottomBar() {
  return (
    <aside
      id="mobile-sticky-bar"
      aria-label="Mobile actions navigation"
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-zinc-950/95 backdrop-blur-md border-t border-zinc-800 px-4 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(0,0,0,0.5)]"
    >
      <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
        {/* Quick Nav Shortcuts */}
        <Link
          href="/investigation"
          id="mobile-nav-investigation"
          className="flex-1 flex items-center justify-center min-h-[44px] rounded text-zinc-300 hover:text-white hover:bg-zinc-900 text-sm font-bold tracking-wide transition-colors"
          title="Investigation"
        >
          Explore
        </Link>
        <Link
          href="/evidence"
          id="mobile-nav-evidence"
          className="flex-1 flex items-center justify-center min-h-[44px] rounded text-zinc-300 hover:text-white hover:bg-zinc-900 text-sm font-bold tracking-wide transition-colors"
          title="Evidence Standards"
        >
          Evidence
        </Link>
        {/* Primary High-Contrast Prominent Action CTA */}
        <Link
          href="/share-story"
          id="mobile-nav-share-cta"
          data-analytics-event="share_path_click"
          data-analytics-detail="mobile_sticky_bottom_bar"
          className="flex-1 flex items-center justify-center min-h-[44px] py-2 px-3 bg-[#b42025] hover:bg-[#8b181c] active:bg-[#6e1215] text-white font-bold text-sm tracking-wide rounded border border-red-500/40 shadow-lg shadow-red-950/50 transition-all text-center"
        >
          Share
        </Link>
      </div>
    </aside>
  );
}
