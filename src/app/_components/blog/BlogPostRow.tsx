import Link from "next/link"

import { formatDateEn, formatDateHe, getCategoryLabel, getCategoryLabelEn } from "./blog.utils"
import { H3 } from "@/components/ui/Heading"

type Props = {
  href: string
  title: string
  date: string
  category: string
  readingTimeMinutes?: number
  locale?: "he" | "en"
}

export function BlogPostRow({ href, title, date, category, readingTimeMinutes, locale = "he" }: Props) {
  const isEn = locale === "en"
  const formatDate = isEn ? formatDateEn : formatDateHe
  const getCategory = isEn ? getCategoryLabelEn : getCategoryLabel
  const readMoreText = isEn ? "Read more" : "קרא עוד"
  const readTimeText =
    typeof readingTimeMinutes === "number"
      ? isEn
        ? `${readingTimeMinutes} min read`
        : `${readingTimeMinutes} דק׳ קריאה`
      : undefined

  const metaParts = [formatDate(date), getCategory(category), readTimeText].filter(Boolean)

  return (
    <Link
      href={href}
      className="group block w-full border-b border-black/10 py-6 transition-colors hover:bg-black/[0.03] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black/10"
    >
      <div className="mx-auto max-w-[980px] px-4 sm:px-6 lg:px-0">
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0">
            <H3 className="text-balance text-black">
              <span className="underline-offset-4 group-hover:underline">{title}</span>
            </H3>
            <p className="mt-2 text-[18px] font-medium text-[#747474] sm:text-[20px]">
              {metaParts.join(" · ")}
            </p>
          </div>

          <div className="hidden shrink-0 sm:flex items-center gap-2 pt-1 text-[18px] font-semibold text-black/80">
            <span className="underline-offset-4 group-hover:underline">{readMoreText}</span>
            <span aria-hidden="true">{isEn ? "→" : "←"}</span>
          </div>
        </div>

        <div className="mt-3 sm:hidden text-[18px] font-semibold text-black/80">
          <span className="underline-offset-4 group-hover:underline">{readMoreText}</span>{" "}
          <span aria-hidden="true">{isEn ? "→" : "←"}</span>
        </div>
      </div>
    </Link>
  )
}

