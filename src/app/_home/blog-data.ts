import { allArticles } from "contentlayer/generated"

import { growthGuides as growthGuidesEn } from "@/app/(en)/en/growth-guides/growthGuides.data"
import { growthGuidesHe } from "@/app/(he)/growth-guides/growthGuides.data"
import { getBlogContent } from "@/app/_content/redesign/blog"

import type { Lang } from "./chrome"

/**
 * Cards for the blog index, the growth guides and the article pages' "more
 * articles" (tbl-024). The four articles on the index and their order, topics
 * and teasers are the ones the blog has today (src/content/i18n); the featured
 * card shows the article's own description, the small cards the first sentence
 * of their teaser, as in the approved sheet (uxb-019).
 */

export type Card = { slug: string; href: string; k: string; t: string; p: string; m: string; n?: string }

export const INDEXED = ["seo-ai-engine", "fast-slow-web", "wordpress-vs-other", "automatio-make"] as const

// topics for the articles that are not on the index
const OTHER_TOPIC = { he: "כללי", en: "General" } as const

export function findArticle(slug: string, lang: Lang) {
  return allArticles.find((a) => a.slug === slug && ((a.locale as string | undefined) === "en") === (lang === "en"))
}

export const readLabel = (n: number, lang: Lang) => (lang === "en" ? `${n} min read` : `${n} דק׳ קריאה`)

const firstSentence = (s: string) => (s.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? s).trim()

export async function articleCards(lang: Lang): Promise<Card[]> {
  const blog = await getBlogContent(lang)
  const prefix = lang === "en" ? "/en" : ""
  return [blog.featured, ...blog.rows].map((c, i) => {
    const a = findArticle(c.slug, lang)
    return {
      slug: c.slug,
      href: `${prefix}/blog/${c.slug}`,
      k: c.categoryLabel,
      t: c.title,
      p: i === 0 ? (a?.description ?? c.excerpt) : firstSentence(c.excerpt),
      m: readLabel(a?.readingTimeMinutes ?? 1, lang),
    }
  })
}

/** An article's topic, for its breadcrumbs and tag. */
export async function articleTopic(slug: string, lang: Lang) {
  return (await articleCards(lang)).find((c) => c.slug === slug)?.k ?? OTHER_TOPIC[lang]
}

// The guide teasers on the Hebrew index, as approved in the sheet (uxb-019).
const GUIDE_TEASER_HE: Record<string, string> = {
  "how-to-get-traffic-to-my-website": "לבנות תנועה קבועה לאתר, בלי להיות תלויים בקמפיינים בתשלום.",
  "how-to-improve-website-seo": "לשדרג עמודים קיימים כדי להופיע יותר, לדרג גבוה יותר ולקבל יותר פניות.",
  "how-to-get-leads": "לבנות מערכת לידים איכותית מהאתר ומהחיפוש האורגני.",
  "how-to-promote-my-business-online": "לבחור ערוצי צמיחה שמחברים חשיפה לתוצאות שאפשר למדוד.",
  "how-to-get-customers-online": "דרכים מעשיות להביא יותר לקוחות מהאתר ומהערוצים הדיגיטליים.",
  "how-to-rank-on-google-fast": "הזדמנויות SEO מהירות, בלי קיצורי דרך שלא מחזיקים.",
  "how-to-grow-small-business-online": "צמיחה ממוקדת לעסק קטן, בלי להתפזר על יותר מדי ערוצים.",
  "how-to-get-clients-without-ads": "מערכת אורגנית יציבה שמפחיתה את התלות בקמפיינים.",
}

export function guideCards(lang: Lang): Card[] {
  if (lang === "he") {
    return growthGuidesHe.map((g, i) => ({
      slug: g.slug,
      href: `/growth-guides/${g.slug}`,
      k: g.heroTags[0] ?? "",
      t: g.keyword,
      p: GUIDE_TEASER_HE[g.slug] ?? g.shortDescription,
      m: "",
      n: String(i + 1).padStart(2, "0"),
    }))
  }
  return growthGuidesEn.map((g, i) => ({
    slug: g.slug,
    href: `/en/growth-guides/${g.slug}`,
    k: g.heroTags[0] ?? "",
    t: g.keyword,
    p: g.shortDescription,
    m: "",
    n: String(i + 1).padStart(2, "0"),
  }))
}
