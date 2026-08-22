import { NextRequest, NextResponse } from "next/server";

const canonicalRoutes: Record<string, string> = {
  "/research-centre/methodology": "/methodology",
  "/share-story/documentary": "/documentary",
  "/join": "/join-movement",
};

const nonCanonicalHosts = new Set([
  "inside-mecca-investigation.hanastone.chatgpt.site",
  "www.insidemecca.net",
]);

export function proxy(request: NextRequest) {
  const destination = canonicalRoutes[request.nextUrl.pathname] ?? request.nextUrl.pathname;
  const hostname = request.headers.get("host")?.split(":")[0]?.toLowerCase();

  if (hostname && nonCanonicalHosts.has(hostname)) {
    const canonicalUrl = new URL(request.url);
    canonicalUrl.protocol = "https:";
    canonicalUrl.host = "insidemecca.net";
    canonicalUrl.pathname = destination;
    return NextResponse.redirect(canonicalUrl, 308);
  }

  if (destination === request.nextUrl.pathname) return NextResponse.next();

  return NextResponse.redirect(new URL(destination, request.url), 301);
}

export const config = {
  matcher: ["/:path*"],
};
