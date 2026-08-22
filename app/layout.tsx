import { Geist, Geist_Mono, Libre_Caslon_Display } from "next/font/google";
import "./globals.css";
import "./rebuild.css";
import { AnalyticsSession } from "./analytics";
import { buildMetadata, structuredData } from "./seo";

const geist = Geist({ variable: "--font-sans", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });
const editorial = Libre_Caslon_Display({ weight: "400", variable: "--font-editorial", subsets: ["latin"] });
const googleAnalyticsId = "G-DQEJ9434ZT";

export const metadata = {
  metadataBase: new URL("https://insidemecca.net"),
  ...buildMetadata({
    title: "Inside MECCA Workplace Investigation",
    description: "Independent workplace investigation documenting MECCA employee experiences, company commitments and evidence-led recommendations for reform.",
    path: "/",
  }),
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-AU"><head><script async src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`} /><script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${googleAnalyticsId}',{allow_google_signals:false,allow_ad_personalization_signals:false});` }} /></head><body className={`${geist.variable} ${mono.variable} ${editorial.variable}`}><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /><AnalyticsSession />{children}</body></html>;
}
