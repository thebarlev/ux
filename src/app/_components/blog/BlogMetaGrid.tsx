import Link from "next/link"

import { CopyLinkButton } from "./CopyLinkButton"
import { formatDateHe, getCategoryLabel } from "./blog.utils"

type Props = {
  category: string
  author?: string
  date: string
  readingTimeMinutes?: number
  shareUrl: string
}

export function BlogMetaGrid({
  category,
  author = "Uxellent",
  date,
  readingTimeMinutes,
  shareUrl,
}: Props) {
  return (
    <section aria-label="פרטי מאמר" className="mt-8">
      <div className="grid grid-cols-1 gap-3 border-y border-black/10 py-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex items-start justify-between gap-4">
          <p className="text-[13px] font-semibold text-black/60">קטגוריה</p>
          <Link
            href={`/blog?category=${encodeURIComponent(category)}`}
            className="text-[14px] font-semibold text-black underline-offset-4 hover:underline"
          >
            {getCategoryLabel(category)}
          </Link>
        </div>

        <div className="flex items-start justify-between gap-4">
          <p className="text-[13px] font-semibold text-black/60">מחבר</p>
          <p className="text-[14px] font-semibold text-black">{author}</p>
        </div>

        <div className="flex items-start justify-between gap-4">
          <p className="text-[13px] font-semibold text-black/60">תאריך</p>
          <p className="text-[14px] font-semibold text-black">{formatDateHe(date)}</p>
        </div>

        <div className="flex items-start justify-between gap-4">
          <p className="text-[13px] font-semibold text-black/60">זמן קריאה</p>
          <p className="text-[14px] font-semibold text-black">
            {typeof readingTimeMinutes === "number" ? `${readingTimeMinutes} דק׳` : "-"}
          </p>
        </div>

        <div className="flex items-start justify-between gap-4 sm:col-span-2 lg:col-span-2">
          <p className="text-[13px] font-semibold text-black/60">שיתוף</p>
          <CopyLinkButton href={shareUrl} />
        </div>
      </div>
    </section>
  )
}

