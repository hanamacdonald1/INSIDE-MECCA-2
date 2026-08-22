"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { contentAssistValues, type AnalyticsEvent, type ContentAssist } from "./audience-insight-model";

export type FunnelEvent = AnalyticsEvent;

type GoogleAnalyticsWindow = Window & {
  gtag?: (command: "event", eventName: string, parameters?: Record<string, string>) => void;
};

function deviceCategory() {
  if (window.matchMedia("(max-width: 767px)").matches) return "mobile";
  if (window.matchMedia("(max-width: 1023px)").matches) return "tablet";
  return "desktop";
}

function referrerHost() {
  if (!document.referrer) return null;
  try {
    const url = new URL(document.referrer);
    return url.hostname === window.location.hostname ? "internal" : url.hostname;
  } catch {
    return null;
  }
}

type Attribution = {
  referrer: string | null;
  landingPage: string;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
};

function currentAttribution(): Attribution {
  const params = new URLSearchParams(window.location.search);
  return {
    referrer: referrerHost(),
    landingPage: window.location.pathname,
    utmSource: params.get("utm_source"),
    utmMedium: params.get("utm_medium"),
    utmCampaign: params.get("utm_campaign"),
  };
}

function sessionAttribution() {
  const key = "inside_mecca_attribution";
  try {
    const existing = sessionStorage.getItem(key);
    if (existing) return JSON.parse(existing) as Attribution;
    const attribution = currentAttribution();
    sessionStorage.setItem(key, JSON.stringify(attribution));
    return attribution;
  } catch {
    return currentAttribution();
  }
}

const assistKey = "inside_mecca_content_assists";

function sessionContentAssists(): ContentAssist[] {
  try {
    const parsed: unknown = JSON.parse(sessionStorage.getItem(assistKey) || "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((value): value is ContentAssist => contentAssistValues.includes(value as ContentAssist));
  } catch {
    return [];
  }
}

export function recordContentAssist(assist: ContentAssist) {
  try {
    const assists = Array.from(new Set([...sessionContentAssists(), assist]));
    sessionStorage.setItem(assistKey, JSON.stringify(assists));
  } catch {
    // Content assists are optional and never block the public experience.
  }
}

function sendGoogleAnalyticsEvent(event: FunnelEvent, eventDetail: string | undefined, contentAssists: ContentAssist[]) {
  const gtag = (window as GoogleAnalyticsWindow).gtag;
  if (typeof gtag !== "function") return;
  gtag("event", event, {
    event_detail: eventDetail || "not_set",
    content_assists: contentAssists.join(",") || "none",
  });
}

const automaticPageEvents: Record<string, { event: AnalyticsEvent; detail: string; assist?: ContentAssist }> = {
  "/share-story": { event: "share_path_view", detail: "share_story_hub" },
  "/share-story/research-questionnaire": { event: "questionnaire_view", detail: "research_questionnaire" },
  "/share-story/evidence": { event: "evidence_guidance_view", detail: "evidence_guidance", assist: "evidence_guidance" },
};

const assistPages: Record<string, ContentAssist> = {
  "/methodology": "methodology_evidence",
  "/research-centre/methodology": "methodology_evidence",
  "/accountability": "accountability_updates",
  "/updates": "accountability_updates",
  "/research-centre/research-updates": "accountability_updates",
};

function trackPageEventOnce(pathname: string, event: AnalyticsEvent, detail: string) {
  const key = "inside_mecca_seen_page_events";
  const marker = `${pathname}:${event}:${detail}`;
  try {
    const seen: unknown = JSON.parse(sessionStorage.getItem(key) || "[]");
    const markers = Array.isArray(seen) ? seen.filter(value => typeof value === "string") : [];
    if (markers.includes(marker)) return;
    sessionStorage.setItem(key, JSON.stringify([...markers, marker]));
  } catch {
    // If device-only deduplication is unavailable, record the page event once per mount.
  }
  trackFunnelEvent(event, detail);
}

export function AnalyticsSession() {
  const pathname = usePathname();

  useEffect(() => {
    sessionAttribution();
    const assist = assistPages[pathname];
    if (assist) recordContentAssist(assist);
    const pageEvent = automaticPageEvents[pathname];
    if (pageEvent?.assist) recordContentAssist(pageEvent.assist);
    if (pageEvent) trackPageEventOnce(pathname, pageEvent.event, pageEvent.detail);
  }, [pathname]);

  useEffect(() => {
    function trackMarkedClick(event: MouseEvent) {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-analytics-event]") : null;
      const analyticsEvent = target?.dataset.analyticsEvent as AnalyticsEvent | undefined;
      if (!analyticsEvent) return;
      trackFunnelEvent(analyticsEvent, target?.dataset.analyticsDetail || undefined);
    }
    document.addEventListener("click", trackMarkedClick);
    return () => document.removeEventListener("click", trackMarkedClick);
  }, []);

  return null;
}

export function trackFunnelEvent(event: FunnelEvent, eventDetail?: string) {
  const attribution = sessionAttribution();
  const contentAssists = sessionContentAssists();
  const device = deviceCategory();
  const payload = {
    event,
    eventDetail: eventDetail || null,
    contentAssists,
    device,
    ...attribution,
  };

  sendGoogleAnalyticsEvent(event, eventDetail, contentAssists);

  const body = JSON.stringify(payload);
  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/analytics", new Blob([body], { type: "application/json" }));
    return;
  }
  void fetch("/api/analytics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  });
}
