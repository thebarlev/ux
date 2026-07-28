import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Script from "next/script";
import { Assistant } from "next/font/google";
import { JsonLd, ORGANIZATION_SCHEMA, WEBSITE_SCHEMA } from "@/components/JsonLd";
import { DeferredScripts } from "@/components/DeferredScripts";
import { LanguageBar } from "@/app/_components/LanguageBar";
import { TrackingProvider } from "@/app/_components/tracking/TrackingProvider";
import { MetaPixelRouteTracker } from "@/app/_components/tracking/MetaPixelRouteTracker";
import { getPixelId, metaPixelBootstrapScript } from "@/lib/analytics/meta-pixel";
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
  const metaPixelId = getPixelId();

  return (
    <html lang="he" dir="rtl" className={assistant.variable}>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        {/* Pixel now loads on arrival rather than on idle, so warm the connection. */}
        <link rel="preconnect" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://www.google.com" />
        <link rel="dns-prefetch" href="https://us-assets.i.posthog.com" />
      </head>
      <body className="antialiased font-sans">
        <JsonLd data={ORGANIZATION_SCHEMA} />
        <JsonLd data={WEBSITE_SCHEMA} />
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WNGC226Q"
            height={0}
            width={0}
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/*
          Meta Pixel bootstrap. Split out of DeferredScripts on purpose: that
          loader waits for interaction or idle, so a visitor who landed from an
          ad and bounced within a few seconds never fired PageView. Campaign
          landing pages need the arrival recorded, so this runs afterInteractive
          and the heavier tags (Ads, PostHog) stay deferred.
        */}
        {metaPixelId ? (
          <Script id="meta-pixel" strategy="afterInteractive">
            {metaPixelBootstrapScript(metaPixelId)}
          </Script>
        ) : null}

        <LanguageBar />
        {children}
        <Suspense fallback={null}>
          <TrackingProvider />
        </Suspense>
        <Suspense fallback={null}>
          <MetaPixelRouteTracker />
        </Suspense>
        <LeadPopupHost />
        <WhatsAppButton />
        <DeferredScripts />
      </body>
    </html>
  );
}