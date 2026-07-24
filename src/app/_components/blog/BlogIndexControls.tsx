"use client"

import { useMemo, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { BLOG_CATEGORIES, BLOG_CATEGORIES_EN, BLOG_SORTS, BLOG_SORTS_EN, type BlogCategory, type BlogSort } from "./blog.constants"
import { coerceBlogCategory, coerceBlogSort, parseTagsParam } from "./blog.utils"

type Props = {
  availableTags: string[]
  locale?: "he" | "en"
}

export function BlogIndexControls({ availableTags, locale = "he" }: Props) {
  const isEn = locale === "en"
  const categories = isEn ? BLOG_CATEGORIES_EN : BLOG_CATEGORIES
  const sorts = isEn ? BLOG_SORTS_EN : BLOG_SORTS

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const initialCategory = coerceBlogCategory(searchParams?.get("category"))
  const initialSort = coerceBlogSort(searchParams?.get("sort"))
  const initialTags = parseTagsParam(searchParams?.get("tags"))

  const [draftCategory, setDraftCategory] = useState<BlogCategory>(initialCategory)
  const [draftSort, setDraftSort] = useState<BlogSort>(initialSort)
  const [draftTags, setDraftTags] = useState<string[]>(initialTags)
  const [open, setOpen] = useState(false)

  const hasChanges =
    draftCategory !== initialCategory ||
    draftSort !== initialSort ||
    draftTags.join(",") !== initialTags.join(",")

  const summaryText = useMemo(() => {
    const tagLabel = draftTags.length
      ? isEn ? `${draftTags.length} tags` : `${draftTags.length} תגיות`
      : isEn ? "All tags" : "כל התגיות"
    const catLabel = categories.find((c) => c.value === draftCategory)?.label ?? (isEn ? "All" : "הכל")
    const sortLabel = sorts.find((s) => s.value === draftSort)?.label ?? (isEn ? "Newest" : "הכי חדש")
    return `${sortLabel} · ${catLabel} · ${tagLabel}`
  }, [draftCategory, draftSort, draftTags, isEn, categories, sorts])

  const apply = () => {
    const params = new URLSearchParams(searchParams?.toString() ?? "")
    if (draftCategory === "all") params.delete("category")
    else params.set("category", draftCategory)

    if (draftSort === "newest") params.delete("sort")
    else params.set("sort", draftSort)

    if (!draftTags.length) params.delete("tags")
    else params.set("tags", draftTags.join(","))

    const qs = params.toString()
    router.push(qs ? `${pathname}?${qs}` : `${pathname}`)
    setOpen(false)
  }

  const reset = () => {
    setDraftCategory("all")
    setDraftSort("newest")
    setDraftTags([])
  }

  const toggleTag = (tag: string) => {
    setDraftTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  return (
    <section aria-label={isEn ? "Filter and sort" : "סינון ומיון"} className="mt-8">
      <div className="mx-auto max-w-[980px] px-4 sm:px-6 lg:px-0">
        {/* Filter + sort bar */}
        <div className="flex flex-col gap-3 border-b border-black/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-[18px] font-semibold text-black/70">
            <span>{isEn ? "Sort & filter" : "מיון וסינון"}</span>
            <span className="text-black/30" aria-hidden="true">
              ·
            </span>
            <span className="font-medium text-black/60">{summaryText}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <label className="sr-only" htmlFor="blog-sort">
              {isEn ? "Sort" : "מיון"}
            </label>
            <select
              id="blog-sort"
              value={draftSort}
              onChange={(e) => setDraftSort(coerceBlogSort(e.target.value))}
              className="h-[42px] rounded-xl border border-black/10 bg-white/60 px-3 text-[18px] font-semibold text-black outline-none focus-visible:ring-4 focus-visible:ring-black/10"
            >
              {sorts.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>

            <div className="relative">
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="h-[42px] rounded-xl border border-black/10 bg-white/60 px-4 text-[18px] font-semibold text-black outline-none transition-colors hover:bg-white focus-visible:ring-4 focus-visible:ring-black/10"
                aria-expanded={open}
              >
                {isEn ? "Filters" : "פילטרים"}
              </button>

              {open && (
                <div className="absolute left-0 top-[46px] z-40 w-[320px] rounded-2xl border border-black/10 bg-white p-4 shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
                  <div className="flex items-center justify-between">
                    <p className="text-[18px] font-semibold text-black">{isEn ? "Category" : "קטגוריה"}</p>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {categories.filter((c) => c.value !== "all").map((c) => {
                      const active = draftCategory === c.value
                      return (
                        <button
                          key={c.value}
                          type="button"
                          onClick={() => setDraftCategory(c.value)}
                          className={[
                            "rounded-full px-3 py-1 text-[18px] font-semibold transition-colors",
                            active ? "bg-black text-white" : "bg-black/5 text-black hover:bg-black/10",
                          ].join(" ")}
                        >
                          {c.label}
                        </button>
                      )
                    })}
                  </div>

                  <p className="mt-5 text-[18px] font-semibold text-black">{isEn ? "Tags" : "תגיות"}</p>
                  <div className="mt-3 max-h-[220px] overflow-auto pr-1">
                    <div className="flex flex-wrap gap-2">
                      {availableTags.map((tag) => {
                        const active = draftTags.includes(tag)
                        return (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => toggleTag(tag)}
                            className={[
                              "rounded-full px-3 py-1 text-[18px] font-semibold transition-colors",
                              active ? "bg-black text-white" : "bg-black/5 text-black hover:bg-black/10",
                            ].join(" ")}
                          >
                            {tag}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={reset}
                      className="h-[42px] rounded-xl border border-black/10 bg-white px-4 text-[18px] font-semibold text-black transition-colors hover:bg-black/5"
                    >
                      {isEn ? "Reset" : "איפוס"}
                    </button>
                    <button
                      type="button"
                      onClick={apply}
                      disabled={!hasChanges}
                      className="h-[42px] rounded-xl bg-black px-5 text-[18px] font-semibold text-white transition-colors hover:bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {isEn ? "Apply" : "החל"}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={apply}
              disabled={!hasChanges}
              className="hidden h-[42px] rounded-xl bg-black px-5 text-[18px] font-semibold text-white transition-colors hover:bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-40 sm:inline-flex"
            >
              {isEn ? "Apply" : "החל"}
            </button>
          </div>
        </div>

        {/* Category chips */}
        <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch]">
          {categories.map((c) => {
            const active = draftCategory === c.value
            return (
              <button
                key={c.value}
                type="button"
                onClick={() => setDraftCategory(c.value)}
                className={[
                  "shrink-0 rounded-full px-4 py-2 text-[18px] font-semibold transition-colors",
                  active ? "bg-black/10 text-black" : "bg-transparent text-black/70 hover:bg-black/5",
                ].join(" ")}
              >
                {c.label}
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

