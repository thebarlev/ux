/**
 * Copy for /products (products.html) and /en/products (en/products.html).
 * Text lives in src/content/i18n/{he,en}.json; this file holds the
 * locale-agnostic structure (hrefs, viz configuration, image/URL strings).
 */
import { getLiveDictionary, type Locale } from "@/content/i18n/dictionary"

export type FeatureViz =
  | { kind: "composer"; typingText: string }
  | { kind: "before-after" }
  | { kind: "landing" }
  | { kind: "chat"; messages: { from: "me" | "ai"; text: string; bold?: string }[] }
  | { kind: "serp"; url: string; title: string; description: string; badges: string[] }
  | { kind: "studio"; url: string; navItems: string[]; activeIndex: number; zoneLabel: string }

export type Feature = {
  no: string
  title: string
  body: string
  chips: string[]
  cta?: { label: string; href: string }
  flip?: boolean
  viz: FeatureViz
}

export async function getProductsContent(locale: Locale = "he") {
  const t = (await getLiveDictionary(locale)).products
  const prefix = locale === "en" ? "/en" : ""
  const [f1, f2, f3, f4, f5, f6] = t.features

  const features: Feature[] = [
    {
      no: f1.no,
      title: f1.title,
      body: f1.body,
      chips: f1.chips,
      cta: { label: `${f1.ctaLabel} >`, href: "https://uxellent.site" },
      viz: { kind: "composer", typingText: f1.vizComposerText! },
    },
    {
      no: f2.no,
      title: f2.title,
      body: f2.body,
      chips: f2.chips,
      cta: { label: `${f2.ctaLabel} >`, href: "https://uxellent.site" },
      flip: true,
      viz: { kind: "before-after" },
    },
    {
      no: f3.no,
      title: f3.title,
      body: f3.body,
      chips: f3.chips,
      cta: { label: `${f3.ctaLabel} >`, href: "https://uxellent.site" },
      viz: { kind: "landing" },
    },
    {
      no: f4.no,
      title: f4.title,
      body: f4.body,
      chips: f4.chips,
      cta: { label: `${f4.ctaLabel} >`, href: `${prefix}/how-it-works` },
      flip: true,
      viz: {
        kind: "chat",
        messages: [
          { from: "me", text: f4.vizChatMe1! },
          { from: "ai", bold: f4.vizChatAiBold1!, text: f4.vizChatAi1! },
          { from: "me", text: f4.vizChatMe2! },
          { from: "ai", bold: f4.vizChatAiBold2!, text: f4.vizChatAi2! },
        ],
      },
    },
    {
      no: f5.no,
      title: f5.title,
      body: f5.body,
      chips: f5.chips,
      cta: { label: `${f5.ctaLabel} >`, href: `${prefix}/included` },
      viz: {
        kind: "serp",
        url: "yourname.uxellent.site",
        title: f5.vizTitle!,
        description: f5.vizDescription!,
        badges: f5.vizBadges!,
      },
    },
    {
      no: f6.no,
      title: f6.title,
      body: f6.body,
      chips: f6.chips,
      cta: { label: `${f6.ctaLabel} >`, href: "https://uxellent.site" },
      flip: true,
      viz: {
        kind: "studio",
        url: "ronel.uxellent.site",
        navItems: f6.vizNavItems!,
        activeIndex: 1,
        zoneLabel: f6.vizZoneLabel!,
      },
    },
  ]

  return { hero: t.hero, features, closer: t.closer }
}
