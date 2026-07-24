import type { Metadata } from "next"
import dynamic from "next/dynamic"
import Link from "next/link"
import { notFound } from "next/navigation"
import { allArticles } from "contentlayer/generated"
import { BlogShell } from "@/app/_components/blog/BlogShell"
import { JsonLd, articleSchema, breadcrumbListSchema } from "@/components/JsonLd"
import { BlogPostRow } from "@/app/_components/blog/BlogPostRow"
import { BlogCoverIcon } from "@/app/_components/blog/BlogCoverIcon"

const MdxContent = dynamic(
  () => import("@/app/_components/blog/MdxContent").then((m) => m.MdxContent),
  { ssr: true },
)
import { BlogEndCta } from "@/app/_components/blog/BlogEndCta"
import { CopyLinkButton } from "@/app/_components/blog/CopyLinkButton"
import { H2 } from "@/components/ui/Heading"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"

const SEO_DESCRIPTION_OVERRIDES_HE: Record<string, string> = {
  "fast-slow-web":
    "איך לשפר ביצועי אתר ולהגדיל המרות עם מהירות טעינה, UX ו-SEO טכני שמפחיתים נטישה ומחזקים תוצאות עסקיות.",
  "wordpress-vs-other":
    "השוואה בין וורדפרס לפלטפורמות אחרות עם יתרונות, חסרונות, SEO, גמישות עסקית ועלויות תחזוקה לאורך זמן.",
}

function findPostEn(slug: string) {
  return allArticles.find((a) => a.slug === slug && (a.locale as string | undefined) === "en")
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = allArticles.find(
    (a) => a.slug === slug && ((a.locale as string | undefined) !== "en" || !(a.locale as string | undefined))
  )
  if (!post) return { title: "בלוג | Uxellent" }

  const enPair = findPostEn(slug)
  const postSlug = post.slug ?? slug
  const seoDescription = SEO_DESCRIPTION_OVERRIDES_HE[postSlug] ?? post.description

  return {
    title: post.title,
    description: seoDescription ?? "מאמר של Uxellent על SEO, פיתוח אתרים, אוטומציות וצמיחה דיגיטלית לעסקים.",
    alternates: {
      canonical: `/blog/${postSlug}`,
      ...(enPair
        ? {
            languages: heEnAlternateLanguages(`/blog/${postSlug}`, `/en/blog/${postSlug}`),
          }
        : {}),
    },
    openGraph: {
      title: post.title,
      description: post.description ?? "מאמר בבלוג של Uxellent.",
      url: `/blog/${postSlug}`,
      type: "article",
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = allArticles.find(
    (a) => a.slug === slug && ((a.locale as string | undefined) !== "en" || !(a.locale as string | undefined))
  )
  if (!post) notFound()

  const related = allArticles
    .filter((a) => (a.locale as string | undefined) !== "en")
    .filter((a) => a.slug !== post.slug)
    .filter((a) => a.category === post.category)
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4)

  const shareUrl = `https://uxellent.com/blog/${post.slug}`
  const articleSchemaData = articleSchema({
    headline: post.title,
    description: post.description ?? undefined,
    image: post.coverImage ? (post.coverImage.startsWith("http") ? post.coverImage : `https://uxellent.com${post.coverImage}`) : undefined,
    url: shareUrl,
    inLanguage: "he-IL",
    datePublished: post.date,
  })

  const formattedDate = new Date(post.date).toLocaleDateString("he-IL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <BlogShell>
      <JsonLd data={articleSchemaData} />
      <JsonLd
        data={breadcrumbListSchema([
          { name: "בלוג", url: "https://uxellent.com/blog" },
          { name: post.title, url: shareUrl },
        ])}
      />
      <section
        dir="rtl"
        aria-label="מאמר"
        className="pt-10 pb-[var(--space-section)] sm:pt-14"
      >
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">

          {/* ─── Breadcrumbs ─── */}
          <div className="mx-auto max-w-[980px]">
            <nav
              aria-label="breadcrumb"
              className="flex items-center gap-2 text-[18px] leading-5 text-[#747474]"
            >
              <Link href="/blog" className="hover:text-black transition-colors">
                בלוג
              </Link>
              <span>/</span>
              <span className="text-black truncate">{post.title}</span>
            </nav>
          </div>

          {/* ─── Single column layout ─── */}
          <div className="mx-auto max-w-[980px] mt-6">
            <div className="max-w-[650px]">

              {/* Cover image */}
              <div className="relative aspect-[4/4] w-[300px] overflow-hidden rounded-3xl border border-black/10 bg-white/40">
                <BlogCoverIcon slug={post.slug} title={post.title} />
              </div>

              {/* Title */}
              <h1 className="mt-8 text-balance text-[40px] font-semibold leading-[1.06] text-black sm:text-[52px] lg:text-[64px]">
                {post.title}
              </h1>

              {/* Description */}
              {post.description ? (
                <p className="mt-4 text-pretty text-[18px] leading-[34px] text-[#747474] sm:text-[20px]">
                  {post.description}
                </p>
              ) : null}

              {/* ─── Desktop horizontal meta row (below title + description) ─── */}
              <div className="hidden lg:flex items-center gap-6 text-[18px] text-[#747474] mt-6 flex-wrap">

                {/* Category */}
                <div className="flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M9 21h6M12 3a6 6 0 0 1 6 6c0 2.2-1.2 4.1-3 5.2V17H9v-2.8A6 6 0 0 1 6 9a6 6 0 0 1 6-6z" />
                  </svg>
                  <span>קטגוריה:</span>
                  {Array.isArray(post.category) ? (
                    post.category.map((cat: string) => (
                      <Link key={cat} href={`/blog/category/${cat}`} className="underline text-black hover:opacity-70 transition-opacity">
                        {cat}
                      </Link>
                    ))
                  ) : (
                    <Link href={`/blog/category/${post.category}`} className="underline text-black hover:opacity-70 transition-opacity">
                      {post.category}
                    </Link>
                  )}
                </div>

                {/* Product */}
                <div className="flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <rect x="2" y="7" width="20" height="14" rx="2" />
                    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                  </svg>
                  <span>מוצר:</span>
                  <span className="text-black">Uxellent</span>
                </div>

                {/* Date */}
                <div className="flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                  <span>תאריך:</span>
                  <span className="text-black">{formattedDate}</span>
                </div>

                {/* Reading time */}
                <div className="flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 3" />
                  </svg>
                  <span>זמן קריאה:</span>
                  <span className="text-black font-medium">{post.readingTimeMinutes} דק׳</span>
                </div>

                {/* Share */}
                <div className="flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98" />
                  </svg>
                  <span>שיתוף:</span>
                  <CopyLinkButton href={shareUrl} />
                </div>

              </div>

              {/* ─── Mobile meta ─── */}
              <div className="mt-8 flex flex-col gap-4 text-[18px] text-[#1a1a1a] lg:hidden">
                <div className="inline-flex items-center gap-2 text-[#747474]">
                  <span>קטגוריה</span>
                  <span className="text-black font-medium">
                    {Array.isArray(post.category) ? post.category.join(", ") : post.category}
                  </span>
                </div>

                <div className="inline-flex items-center gap-2 text-[#747474]">
                  <span>תאריך</span>
                  <span className="text-black font-medium">{formattedDate}</span>
                </div>

                <div className="inline-flex items-center gap-2 text-[#747474]">
                  <span>זמן קריאה</span>
                  <span className="text-black font-medium">{post.readingTimeMinutes} דק׳</span>
                </div>

                <div className="inline-flex items-center gap-2 text-[#747474]">
                  <span>שיתוף</span>
                  <CopyLinkButton href={shareUrl} />
                </div>
              </div>

              {/* MDX body */}
              <div className="mt-10">
                <MdxContent code={post.body.code} />
                <BlogEndCta />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ─── Related posts ─── */}
      {related.length ? (
        <section
          aria-label="מאמרים נוספים"
          dir="rtl"
          className="pb-[var(--space-section)]"
        >
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[980px]">
              <H2 className="w-full">מאמרים נוספים באותה קטגוריה</H2>
            </div>
          </div>
          <div className="mt-2">
            {related.map((a) => (
              <BlogPostRow
                key={a.slug}
                href={`/blog/${a.slug}`}
                title={a.title}
                date={a.date}
                category={a.category}
                readingTimeMinutes={a.readingTimeMinutes}
              />
            ))}
          </div>
        </section>
      ) : null}
    </BlogShell>
  )
}