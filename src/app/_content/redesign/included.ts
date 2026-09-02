import type { Feature } from "@/app/_content/redesign/products"
import { getDictionary, type Locale } from "@/content/i18n/dictionary"

export function getIncludedContent(locale: Locale = "he") {
  const t = getDictionary(locale).included
  const prefix = locale === "en" ? "/en" : ""
  const [f1, f2, f3] = t.features

  const features: Feature[] = [
    {
      no: f1.no,
      title: f1.title,
      body: f1.body,
      chips: f1.chips,
      cta: { label: `${f1.ctaLabel} >`, href: `${prefix}/products` },
      viz: { kind: "composer", typingText: f1.vizComposerText! },
    },
    {
      no: f2.no,
      title: f2.title,
      body: f2.body,
      chips: f2.chips,
      cta: { label: `${f2.ctaLabel} >`, href: `${prefix}/pricing` },
      flip: true,
      viz: {
        kind: "serp",
        url: "yourname.uxellent.site",
        title: f2.vizTitle!,
        description: f2.vizDescription!,
        badges: f2.vizBadges!,
      },
    },
    {
      no: f3.no,
      title: f3.title,
      body: f3.body,
      chips: f3.chips,
      cta: { label: `${f3.ctaLabel} >`, href: `${prefix}/how-it-works` },
      viz: {
        kind: "chat",
        messages: [
          { from: "me", text: f3.vizChatMe1! },
          { from: "ai", bold: f3.vizChatAiBold1!, text: f3.vizChatAi1! },
          { from: "me", text: f3.vizChatMe2! },
          { from: "ai", bold: f3.vizChatAiBold2!, text: f3.vizChatAi2! },
        ],
      },
    },
  ]

  return {
    hero: t.hero,
    features,
    notIncludedLabel: t.notIncludedLabel,
    notIncluded: t.notIncluded,
    closer: t.closer,
  }
}
