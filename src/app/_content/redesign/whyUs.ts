import type { Feature } from "@/app/_content/redesign/products"
import { getLiveDictionary, type Locale } from "@/content/i18n/dictionary"

export async function getWhyUsContent(locale: Locale = "he") {
  const t = (await getLiveDictionary(locale)).whyUs
  const [f1, f2, f3] = t.features
  // The blocks used to link to /how-it-works, /products and /included, which are
  // retired in both languages (tbl-023, tbl-024), so they have no link.

  const hero = {
    eyebrow: t.hero.eyebrow,
    title: t.hero.title,
    lede: t.hero.lede,
    stats: t.hero.stats,
  }

  const features: Feature[] = [
    {
      no: f1.no,
      title: f1.title,
      body: f1.body,
      chips: f1.chips,
      viz: { kind: "composer", typingText: f1.vizComposerText! },
    },
    {
      no: f2.no,
      title: f2.title,
      body: f2.body,
      chips: f2.chips,
      flip: true,
      viz: {
        kind: "studio",
        url: "yourname.uxellent.site",
        navItems: f2.vizNavItems!,
        activeIndex: 1,
        zoneLabel: f2.vizZoneLabel!,
      },
    },
    {
      no: f3.no,
      title: f3.title,
      body: f3.body,
      chips: f3.chips,
      viz: {
        kind: "serp",
        url: "yourname.uxellent.site",
        title: f3.vizTitle!,
        description: f3.vizDescription!,
        badges: f3.vizBadges!,
      },
    },
  ]

  return { hero, features, closer: t.closer }
}
