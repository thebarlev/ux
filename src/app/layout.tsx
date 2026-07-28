import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Assistant } from "next/font/google";
import { JsonLd, ORGANIZATION_SCHEMA, WEBSITE_SCHEMA } from "@/components/JsonLd";
import { DeferredScripts } from "@/components/DeferredScripts";
import { SiteHeader } from "@/app/_components/layout/SiteHeader";
import { TrackingProvider } from "@/app/_components/tracking/TrackingProvider";
import { Suspense } from "react";
import "./globals.css";

const LeadPopupHost = dynamic(
  () => import("@/app/_components/home/LeadPopupHost").then((m) => m.LeadPopupHost),
)

const WhatsAppButton = dynamic(
  () => import("@/app/_components/WhatsAppButton").then((m) => m.WhatsAppButton),
)

const assistant = Assistant({
  variable: "--font-assistant",
  subsets: ["hebrew", "latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://uxellent.com"),
  title: "Uxellent | SEO, AI ופיתוח לעסקים",
  description: "Uxellent מספקת קידום אתרים, פיתוח מערכות AI ושיווק דיגיטלי לעסקים שרוצים יותר נוכחות, לידים וצמיחה.",
  icons: {
    icon: [
      { url: "/favicon.ico?v=2" },
      { url: "/favicon-32x32.png?v=2", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png?v=2", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico?v=2",
    apple: [
      { url: "/apple-touch-icon.png?v=2", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={assistant.variable}>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://www.google.com" />
        <link rel="dns-prefetch" href="https://us-assets.i.posthog.com" />
      </head>
      <body className="antialiased font-sans">
        <JsonLd data={ORGANIZATION_SCHEMA} />
        <JsonLd data={WEBSITE_SCHEMA} />

        {/* The language row above the header is gone: Hebrew is the focus, and
            the switch now lives quietly in the footer. SiteHeader returns null
            on its own for /lp, /checkout, /thanks and /en, so no route
            conditions belong here. */}
        <SiteHeader />
        {children}
        <Suspense fallback={null}>
          <TrackingProvider />
        </Suspense>
        <LeadPopupHost />
        <WhatsAppButton />
        <DeferredScripts />
      </body>
    </html>
  );
}