import { getDictionary, type Locale } from "@/content/i18n/dictionary"

export type Plan = {
  slug: "free" | "start" | "business" | "pro"
  name: string
  forWhom: string
  monthly: number | null
  yearly: number | null
  best?: boolean
  tag?: string
  features: string[]
  ctaLabel: string
}

const PRICES: Record<Plan["slug"], { monthly: number | null; yearly: number | null; best?: boolean }> = {
  free: { monthly: null, yearly: null },
  start: { monthly: 60, yearly: 48 },
  business: { monthly: 147, yearly: 118, best: true },
  pro: { monthly: 257, yearly: 206 },
}

export function getPricingContent(locale: Locale = "he") {
  const t = getDictionary(locale).pricing

  const plans: Plan[] = t.plans.map((p) => ({
    slug: p.slug as Plan["slug"],
    name: p.name,
    forWhom: p.forWhom,
    features: p.features,
    ctaLabel: p.ctaLabel,
    tag: p.tag,
    ...PRICES[p.slug as Plan["slug"]],
  }))

  return { hero: t.hero, billing: t.billing, plans, notes: t.notes }
}
