"use client";

import React, { useState, useEffect } from "react";
import { 
  FileText, 
  Download, 
  ExternalLink, 
  Maximize2, 
  Minimize2, 
  AlertCircle,
  Eye,
  Smartphone
} from "lucide-react";

interface PdfViewerEmbedProps {
  /** Relative or absolute URL to the PDF document */
  src: string;
  /** Primary document title for header and accessibility */
  title?: string;
  /** Subtitle or source metadata */
  subtitle?: string;
  /** Approximate page count or file size hint */
  documentMeta?: {
    pages?: number | string;
    fileSize?: string;
    publication?: string;
    publishedDate?: string;
  };
  /** Height of the desktop embed container in pixels (default 780) */
  height?: number;
}

export function PdfViewerEmbed({
  src,
  title = "Media Update: Daily Mail Coverage (27 August 2026)",
  subtitle = "Original article archive including complete reporting, photo gallery and reader commentary",
  documentMeta = {
    pages: 34,
    fileSize: "PDF Document",
    publication: "Daily Mail Australia",
    publishedDate: "27 August 2026"
  },
  height = 780
}: PdfViewerEmbedProps) {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [embedLoadError, setEmbedLoadError] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Robust viewport & user-agent check for mobile PDF rendering constraints
  useEffect(() => {
    const checkMobile = () => {
      const isTouchOrSmall = 
        window.innerWidth < 768 || 
        /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
        (navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && window.innerWidth < 1024);
      setIsMobile(Boolean(isTouchOrSmall));
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      const absoluteUrl = new URL(src, window.location.origin).href;
      navigator.clipboard.writeText(absoluteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section 
      aria-labelledby="pdf-viewer-heading"
      className={`my-8 bg-[#fdfbf7] border border-stone-300 rounded-sm shadow-sm transition-all duration-200 overflow-hidden ${
        isFullscreen ? "fixed inset-0 z-50 rounded-none bg-stone-900/95 p-4 sm:p-6 flex flex-col justify-between" : ""
      }`}
    >
      {/* Header Bar */}
      <div className="p-4 sm:p-5 bg-stone-100 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-bold uppercase tracking-wider bg-[#b42025]/10 text-[#b42025]">
              ARCHIVED FACSIMILE
            </span>
            {documentMeta.pages && (
              <span className="text-xs font-mono text-stone-500">
                • {documentMeta.pages} pages
              </span>
            )}
          </div>
          <h3 id="pdf-viewer-heading" className="text-lg sm:text-xl font-serif font-bold text-slate-950 m-0">
            {title}
          </h3>
          <p className="text-xs text-stone-600 font-sans m-0">
            {subtitle}
          </p>
        </div>

        {/* Global Toolbar Actions */}
        <div className="flex flex-wrap items-center gap-2 pt-1 sm:pt-0">
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold font-sans bg-white border border-stone-300 hover:border-stone-400 hover:bg-stone-50 text-stone-800 rounded transition-colors shadow-2xs focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700"
            title="Open in new window"
          >
            <ExternalLink className="w-3.5 h-3.5 text-stone-600" />
            <span>Open in Tab</span>
          </a>

          <a
            href={src}
            download
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold font-sans bg-[#b42025] hover:bg-[#8e171b] text-white rounded transition-colors shadow-2xs focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
            title="Download PDF directly"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </a>

          {!isMobile && (
            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-200 rounded transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700"
              title={isFullscreen ? "Exit fullscreen" : "Expand viewer"}
              aria-label={isFullscreen ? "Exit fullscreen" : "Expand viewer"}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>

      {/* Main View Area */}
      <div className="relative w-full bg-stone-200">
        {/* Mobile-Optimized Direct-Access Card View (iOS/Android resilient pattern) */}
        {isMobile ? (
          <div className="p-6 sm:p-8 bg-[#fdfbf7] flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-[#b42025] mb-1">
              <FileText className="w-8 h-8" />
            </div>

            <div className="max-w-md space-y-2">
              <h4 className="text-base font-bold font-serif text-slate-900">
                Original 34-Page Daily Mail Article Facsimile
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                Mobile browser sandboxes restrict in-line multi-page PDF scrolling. Tap below to launch the complete unabridged PDF reader in your browser or download the file directly.
              </p>
            </div>

            {/* Mobile Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2.5 w-full max-w-sm pt-2">
              <a
                href={src}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#b42025] text-white font-bold text-sm rounded shadow-sm hover:bg-[#8e171b] active:scale-[0.99] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
              >
                <Eye className="w-4 h-4" />
                <span>Read Full Document (PDF)</span>
              </a>

              <a
                href={src}
                download
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-white border border-stone-300 text-stone-800 font-semibold text-xs rounded hover:bg-stone-100 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-stone-600" />
                <span>Download File</span>
              </a>
            </div>

            <div className="flex items-center gap-2 text-[11px] font-mono text-stone-500 pt-2">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Optimized for iPhone, iPad & Android viewing</span>
            </div>
          </div>
        ) : (
          /* Desktop In-line Object/IFrame Embed with Graceful Fallback */
          <div className="w-full relative" style={{ height: isFullscreen ? "calc(100vh - 120px)" : `${height}px` }}>
            <object
              data={`${src}#toolbar=1&navpanes=0&scrollbar=1&view=FitH`}
              type="application/pdf"
              className="w-full h-full border-0"
              onError={() => setEmbedLoadError(true)}
            >
              {/* Fallback 1: Nested iframe for browsers with object strictness */}
              <iframe
                src={`${src}#toolbar=1&navpanes=0&scrollbar=1`}
                title="Daily Mail Article PDF Facsimile"
                className="w-full h-full border-0"
              >
                {/* Fallback 2: Comprehensive static fallback card when plugin is disabled */}
                <div className="p-8 text-center flex flex-col items-center justify-center h-full bg-[#fdfbf7] space-y-4">
                  <AlertCircle className="w-10 h-10 text-amber-600" />
                  <div className="max-w-md space-y-1">
                    <p className="font-bold text-stone-800 text-base">Inline PDF preview is not enabled in your browser</p>
                    <p className="text-xs text-stone-600">
                      You can open or download the complete 34-page Daily Mail coverage archive below.
                    </p>
                  </div>
                  <a
                    href={src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#b42025] text-white text-sm font-bold rounded hover:bg-[#8e171b] transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download the full Daily Mail article (PDF)</span>
                  </a>
                </div>
              </iframe>
            </object>

            {/* Error Overlay if embed throws client-side error */}
            {embedLoadError && (
              <div className="absolute inset-0 bg-[#fdfbf7] flex flex-col items-center justify-center p-6 text-center space-y-3">
                <FileText className="w-10 h-10 text-[#b42025]" />
                <p className="font-bold text-stone-900">Document Reader Fallback</p>
                <a
                  href={src}
                  download
                  className="px-4 py-2 bg-[#b42025] text-white font-bold text-xs rounded hover:bg-[#8e171b]"
                >
                  Download the full Daily Mail article (PDF)
                </a>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Info & Share Bar */}
      <div className="p-3 bg-stone-50 border-t border-stone-200 flex flex-wrap items-center justify-between text-xs text-stone-600 gap-2 font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Verified media facsimile • Published 27 Aug 2026</span>
        </div>

        <button
          type="button"
          onClick={handleCopyLink}
          className="hover:text-stone-900 underline cursor-pointer text-[11px]"
        >
          {copied ? "✓ Document link copied" : "Copy document link"}
        </button>
      </div>
    </section>
  );
}
