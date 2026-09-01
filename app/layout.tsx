import { Geist, Geist_Mono, Libre_Caslon_Display } from "next/font/google";
import "./globals.css";
import "./rebuild.css";
import { AnalyticsSession } from "./analytics";

const geist = Geist({ variable: "--font-sans", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });
const editorial = Libre_Caslon_Display({ weight: "400", variable: "--font-editorial", subsets: ["latin"] });

export const metadata = {
  title: "Inside MECCA",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AU">
      <body className={`${geist.variable} ${mono.variable} ${editorial.variable} min-h-screen`}>
        <AnalyticsSession />
        {children}
      </body>
    </html>
  );
}
