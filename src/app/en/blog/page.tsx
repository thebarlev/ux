import type { Metadata } from "next"
import { Suspense } from "react"

import { allArticles } from "contentlayer/generated"

import { BlogShell } from "@/app/_components/blog/BlogShell"
import { BlogIndexControls } from "@/app/_components/blog/BlogIndexControls"
import { BlogPostRow } from "@/app/_components/blog/BlogPostRow"
import { coerceBlogCategory, coerceBlogSort, parseTagsParam } from "@/app/_components/blog/blog.utils"
import { EnLink } from "../_components/EnLink"
import { prefixEnPath } from "../_lib/prefixEnPath"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"

export const metadata: Metadata = {
  title: "Uxellent Blog | SEO, Web Development & AI",
  description: "Read Uxellent insights on SEO, web development, automation, AI search, and digital marketing services for growing businesses.",
  alternates: {
    canonical: "/en/blog",
    languages: heEnAlternateLanguages("/blog", "/en/blog"),
  },
}

type SearchParams = Record<string, string | string[] | undefined>

export default async function BlogIndexPageEn({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>
}) {
  const sp = (await searchParams) ?? {}
  const category = coerceBlogCategory(sp.category)
  const sort = coerceBlogSort(sp.sort)
  const tags = parseTagsParam(sp.tags)

  const enArticles = allArticles.filter((a) => (a.locale as string | undefined) === "en")
  const enSlugs = new Set(enArticles.map((a) => a.slug))
  const heOnlyArticles = allArticles.filter(
    (a) => (a.locale as string | undefined) !== "en" && !enSlugs.has(a.slug)
  )
  const allForEnBlog = [...enArticles, ...heOnlyArticles]

  const availableTags = Array.from(
    new Set(
      allForEnBlog
        .flatMap((a) => (Array.isArray(a.tags) ? (a.tags as unknown[]) : []))
        .map((t) => (typeof t === "string" ? t : ""))
        .filter(Boolean)
    )
  ).sort((a, b) => a.localeCompare(b, "en"))

  const filtered = allForEnBlog
    .filter((a) => (category === "all" ? true : a.category === category))
    .filter((a) => {
      if (!tags.length) return true
      const articleTags = Array.isArray(a.tags) ? (a.tags as unknown[]) : []
      const set = new Set(articleTags.filter((t): t is string => typeof t === "string"))
      return tags.every((t) => set.has(t))
    })
    .slice()
    .sort((a, b) => {
      const ta = new Date(a.date).getTime()
      const tb = new Date(b.date).getTime()
      return sort === "oldest" ? ta - tb : tb - ta
    })

  return (
    <BlogShell locale="en">
      <section aria-label="Blog" className="pt-10 pb-8 sm:pt-14" dir="ltr">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-4">
          <div className="mx-auto max-w-[980px]">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h1 className="text-balance text-[44px] font-semibold leading-[1.05] text-black sm:text-[56px] lg:text-[70px]">
                  Blog
                </h1>
                <p className="mt-4 text-pretty text-[18px] leading-[30px] text-[#747474] sm:text-[20px] sm:leading-[34px]">
                  Short, practical insights on web development, automation, marketing, and AI - to build a digital process that delivers results.
                </p>
              </div>

              <div className="hidden sm:flex shrink-0 pt-2">
                <EnLink href="/contact" className="vow-btn-secondary">
                  Get in touch
                </EnLink>
              </div>
            </div>

            <div className="mt-6 sm:hidden">
              <EnLink href="/contact" className="vow-btn-secondary w-full justify-center">
                Get in touch
              </EnLink>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        <BlogIndexControls availableTags={availableTags} locale="en" />
      </Suspense>

      <section aria-label="Article list" className="pb-[var(--space-section)]" dir="ltr">
        <div className="mx-auto max-w-[1440px] px-0 sm:px-0 lg:px-0">
          {filtered.length ? (
            filtered.map((a) => (
              <BlogPostRow
                key={a.slug}
                href={(a.locale as string | undefined) === "en" ? prefixEnPath(`/blog/${a.slug}`) : `/blog/${a.slug}`}
                title={a.title}
                date={a.date}
                category={a.category}
                readingTimeMinutes={a.readingTimeMinutes}
                locale="en"
              />
            ))
          ) : (
            <div className="mx-auto max-w-[980px] px-4 sm:px-6 lg:px-0 py-10">
              <p className="text-[18px] font-semibold text-black">No articles found.</p>
              <p className="mt-2 text-[18px] text-[#747474]">Try changing filters or reset.</p>
            </div>
          )}
        </div>
      </section>
    </BlogShell>
  )
}
