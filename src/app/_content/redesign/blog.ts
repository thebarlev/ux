/**
 * Copy + display metadata for /blog and /blog/[slug] (articles.html, article.html)
 * and their /en counterparts. `slug` always points at the real MDX in
 * content/articles/*.mdx — this file only carries the approved index-page
 * teaser copy and cover art, never the article bodies themselves.
 */
import { getDictionary, type Locale } from "@/content/i18n/dictionary"

export type BlogCard = {
  slug: string
  categoryLabel: string
  title: string
  excerpt: string
  readingTime: string
  image: string
}

const FEATURED_STRUCTURE = { slug: "seo-ai-engine", image: "/redesign/blog/seo-ai-engine.webp" }
const ROWS_STRUCTURE = [
  { slug: "fast-slow-web", image: "/redesign/blog/fast-slow-web.webp" },
  { slug: "wordpress-vs-other", image: "/redesign/blog/wordpress-vs-other.webp" },
  { slug: "automatio-make", image: "/redesign/blog/automatio-make.webp" },
]

/** "קריאה של 2 דק׳" in Hebrew, "A 2 minute read" in English — same shape used
 *  for the index teasers below and for the article page's own (dynamic,
 *  contentlayer-computed) reading time. */
export function formatReadingTime(minutes: number, locale: Locale = "he") {
  return locale === "en" ? `A ${minutes} minute read` : `קריאה של ${minutes} דק׳`
}

export function getBlogContent(locale: Locale = "he") {
  const t = getDictionary(locale).blog

  const featured: BlogCard = {
    ...FEATURED_STRUCTURE,
    categoryLabel: t.featured.categoryLabel,
    title: t.featured.title,
    excerpt: t.featured.excerpt,
    readingTime: formatReadingTime(t.featured.readingTime, locale),
  }

  const rows: BlogCard[] = ROWS_STRUCTURE.map((s, i) => ({
    ...s,
    categoryLabel: t.rows[i].categoryLabel,
    title: t.rows[i].title,
    excerpt: t.rows[i].excerpt,
    readingTime: formatReadingTime(t.rows[i].readingTime, locale),
  }))

  return {
    hero: t.hero,
    featured,
    rows,
    closer: t.closer,
    crumbSeparator: t.crumbSeparator,
    moreGuides: t.moreGuides,
    allArticles: t.allArticles,
    tocLabel: t.tocLabel,
    articleCloser: t.articleCloser,
    readMore: t.featured.readMore,
    metaTags: t.featured.metaTags,
    featuredNo: t.featured.no,
  }
}
