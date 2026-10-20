import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ArticlePage } from "@/app/_home/article/ArticlePage"
import { GuideBody, guideMinutes, guideToc } from "@/app/_home/article/GuideBody"
import { guideCards, readLabel } from "@/app/_home/blog-data"
import { JsonLd, articleSchema, faqPageSchema } from "@/components/JsonLd"
import { growthGuides as topics } from "@/lib/growth-guides/topics"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"

import { getGrowthGuideHe, growthGuideSlugsHe } from "../growthGuides.data"

import "@/app/_home/article.he.css"

export const dynamicParams = false

export function generateStaticParams() {
  return growthGuideSlugsHe.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const guide = getGrowthGuideHe(slug)

  if (!guide) {
    return { title: "מדריכי צמיחה | Uxellent" }
  }

  return {
    title: `${guide.keyword} | Uxellent`,
    description: guide.metaDescription,
    alternates: {
      canonical: `/growth-guides/${guide.slug}`,
      languages: heEnAlternateLanguages(
        `/growth-guides/${guide.slug}`,
        `/en/growth-guides/${guide.slug}`,
      ),
    },
    openGraph: {
      title: `${guide.keyword} | מדריך צמיחה של Uxellent`,
      description: guide.metaDescription,
      url: `/growth-guides/${guide.slug}`,
      type: "article",
    },
  }
}

// Growth guide in the article template (uxb-020, tbl-024b).
export default async function GrowthGuidePageHe({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = getGrowthGuideHe(slug)
  if (!guide) notFound()

  const pageUrl = `https://uxellent.com/growth-guides/${guide.slug}`
  const cards = guideCards("he")
  const relatedSlugs = topics.find((t) => t.slug === guide.slug)?.related ?? []
  const related = relatedSlugs
    .slice(0, 2)
    .map((r) => cards.find((c) => c.slug === r))
    .filter((c): c is (typeof cards)[number] => Boolean(c))
    .map((c) => {
      const g = getGrowthGuideHe(c.slug)
      return { ...c, m: g ? readLabel(guideMinutes(g), "he") : "" }
    })

  return (
    <>
      <JsonLd
        data={articleSchema({
          headline: guide.keyword,
          description: guide.metaDescription,
          image: "https://uxellent.com/new-hero.webp",
          url: pageUrl,
          inLanguage: "he",
        })}
      />
      <JsonLd data={faqPageSchema(guide.faq.map((item) => ({ question: item.question, answer: item.answer })))} />
      <ArticlePage
        lang="he"
        kind="guide"
        slug={guide.slug}
        title={guide.keyword}
        sub={guide.heroIntro}
        readTime={readLabel(guideMinutes(guide), "he")}
        tags={guide.heroTags}
        topic={guide.heroTags[0] ?? ""}
        toc={guideToc(guide, "he")}
        related={related}
      >
        <GuideBody guide={guide} lang="he" />
      </ArticlePage>
    </>
  )
}
