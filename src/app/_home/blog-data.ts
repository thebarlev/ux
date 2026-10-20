import { allArticles } from "contentlayer/generated"

import type { Lang } from "./chrome"

/**
 * The blog index (uxb-019 v3 HE, uxb-029 v2 EN, tbl-028): the featured
 * article, three more and the eight growth guides, each with its own page at
 * /blog/<slug> and /en/blog/<slug>. Titles and reading times come from the
 * articles (content/articles, imported from tbl-028/articles); the topics and
 * the teasers are the approved sheets'.
 */

export type Card = { slug: string; href: string; k: string; t: string; p: string; m: string; n?: string }

export const INDEXED = ["seo-ai-engine", "slow-site", "wordpress-vs", "automation"] as const
export const GUIDES = [
  "guide-traffic", "guide-seo", "guide-leads", "guide-promote",
  "guide-clients", "guide-rank-fast", "guide-small-business", "guide-no-ads",
] as const

// the index cards' topic and teaser, as in the sheets
const SHEET: Record<Lang, Record<string, { k?: string; p: string }>> = {
  he: {
    "seo-ai-engine": { k: "קידום", p: "כדי להופיע בתשובות של Google AI, ChatGPT ו-Perplexity צריך לחשוב אחרת. מה לבנות, איך לכתוב, ואיך למדוד." },
    "slow-site": { k: "ביצועים", p: "כל שנייה של טעינה עולה לכם בפניות." },
    "wordpress-vs": { k: "פלטפורמות", p: "יתרונות, חסרונות ומתי כל פתרון מתאים." },
    automation: { k: "אוטומציה", p: "משימות שחוזרות על עצמן הן הגזלן הכי גדול של זמן." },
    "guide-traffic": { p: "לבנות תנועה קבועה לאתר, בלי להיות תלויים בקמפיינים בתשלום." },
    "guide-seo": { p: "לשדרג עמודים קיימים כדי להופיע יותר, לדרג גבוה יותר ולקבל יותר פניות." },
    "guide-leads": { p: "לבנות מערכת לידים איכותית מהאתר ומהחיפוש האורגני." },
    "guide-promote": { p: "לבחור ערוצי צמיחה שמחברים חשיפה לתוצאות שאפשר למדוד." },
    "guide-clients": { p: "דרכים מעשיות להביא יותר לקוחות מהאתר ומהערוצים הדיגיטליים." },
    "guide-rank-fast": { p: "הזדמנויות SEO מהירות, בלי קיצורי דרך שלא מחזיקים." },
    "guide-small-business": { p: "צמיחה ממוקדת לעסק קטן, בלי להתפזר על יותר מדי ערוצים." },
    "guide-no-ads": { p: "מערכת אורגנית יציבה שמפחיתה את התלות בקמפיינים." },
  },
  en: {
    "seo-ai-engine": { k: "Getting found", p: "Showing up in answers from Google AI, ChatGPT and Perplexity takes a different way of thinking. What to build, how to write, and how to measure it." },
    "slow-site": { k: "Speed", p: "Every extra second of loading costs you enquiries." },
    "wordpress-vs": { k: "Platforms", p: "The pros, the cons, and when each one makes sense." },
    automation: { k: "Automation", p: "Repetitive tasks are the biggest drain on your time." },
    "guide-traffic": { p: "Build steady traffic to your site, without depending on paid campaigns." },
    "guide-seo": { p: "Upgrade the pages you already have so they show up more, rank higher and bring more enquiries." },
    "guide-leads": { p: "Build a steady flow of quality leads from your site and from organic search." },
    "guide-promote": { p: "Pick growth channels that turn visibility into results you can measure." },
    "guide-clients": { p: "Practical ways to bring in more clients from your site and other digital channels." },
    "guide-rank-fast": { p: "Quick SEO wins, without shortcuts that don’t last." },
    "guide-small-business": { p: "Focused growth for a small business, without spreading yourself across too many channels." },
    "guide-no-ads": { p: "A steady organic system that makes you less dependent on campaigns." },
  },
}

// a guide's topic, for its breadcrumbs and tag: the index's section title
const GUIDE_TOPIC = { he: "מדריכי צמיחה", en: "Growth guides" } as const
// topics for the articles that are not on the index
const OTHER_TOPIC = { he: "כללי", en: "General" } as const

export function findArticle(slug: string, lang: Lang) {
  return allArticles.find((a) => a.slug === slug && ((a.locale as string | undefined) === "en") === (lang === "en"))
}

export const readLabel = (n: number, lang: Lang) => (lang === "en" ? `${n} min read` : `${n} דק׳ קריאה`)

export const isGuide = (slug: string) => (GUIDES as readonly string[]).includes(slug)

/** An article's reading time: its own (front matter), or counted from the text. */
export function readTime(slug: string, lang: Lang) {
  const a = findArticle(slug, lang)
  return (a?.readingTime as string | undefined) ?? readLabel(a?.readingTimeMinutes ?? 1, lang)
}

function card(slug: string, lang: Lang, n?: number): Card {
  const a = findArticle(slug, lang)
  if (!a) throw new Error(`no ${lang} article for ${slug}`)
  const s = SHEET[lang][slug]
  return {
    slug,
    href: `${lang === "en" ? "/en" : ""}/blog/${slug}`,
    k: s.k ?? GUIDE_TOPIC[lang],
    t: a.title,
    p: s.p,
    m: readTime(slug, lang),
    n: n === undefined ? undefined : String(n + 1).padStart(2, "0"),
  }
}

export const articleCards = (lang: Lang): Card[] => INDEXED.map((s) => card(s, lang))
export const guideCards = (lang: Lang): Card[] => GUIDES.map((s, i) => card(s, lang, i))

/** An article's topic, for its breadcrumbs and tag. */
export function articleTopic(slug: string, lang: Lang) {
  if (isGuide(slug)) return GUIDE_TOPIC[lang]
  return SHEET[lang][slug]?.k ?? OTHER_TOPIC[lang]
}

/** The next two on the index after this one, among the articles or among the guides. */
export function relatedCards(slug: string, lang: Lang): Card[] {
  const list = isGuide(slug) ? guideCards(lang) : articleCards(lang)
  const at = list.findIndex((c) => c.slug === slug)
  return at === -1 ? list.slice(0, 2) : [list[(at + 1) % list.length], list[(at + 2) % list.length]]
}
