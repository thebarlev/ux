import Link from "next/link"
import { ArrowUpRight, ArrowRight } from "lucide-react"
import { H3 } from "@/components/ui/Heading"

export type GrowthGuidesCardLink = {
  href: string
  label: string
}

type GrowthGuidesCardProps = {
  title: string
  description: string
  links: GrowthGuidesCardLink[]
  indexLink: GrowthGuidesCardLink
  dir?: "ltr" | "rtl"
  sectionClassName?: string
  containerClassName?: string
}

export function GrowthGuidesCard({
  title,
  description,
  links,
  indexLink,
  dir = "ltr",
  sectionClassName = "mx-auto max-w-[1440px] px-4 pb-10 sm:px-6 lg:px-4",
  containerClassName,
}: GrowthGuidesCardProps) {
  const card = (
    <div className="mx-auto max-w-[820px] overflow-hidden rounded-2xl border border-black/[0.07] bg-white">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto]">

        <div className="border-b border-black/[0.07] p-8 md:border-b-0 md:border-r md:p-10">
          <div className="mb-3 flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-50">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <polyline points="1,10 5,5 8,7 13,2" stroke="#3b82f6" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <polyline points="10,2 13,2 13,5" stroke="#3b82f6" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <H3>{title}</H3>
          </div>
          <p className="max-w-[700px] text-[18px] leading-relaxed text-gray-500">
            {description}
          </p>
        </div>

        <div className="flex min-w-[260px] flex-col divide-y divide-black/[0.07]">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center justify-between gap-4 px-6 py-3.5 text-[16px] text-[#5389BB] transition-colors hover:bg-gray-50"
            >
              {link.label}
              <ArrowUpRight className="h-3 w-3 shrink-0 opacity-50" />
            </Link>
          ))}
          <Link
            href={indexLink.href}
            className="flex items-center justify-between gap-4 px-6 py-3.5 text-[13.5px] text-gray-500 transition-colors hover:bg-gray-50"
          >
            {indexLink.label}
            <ArrowRight className="h-3 w-3 shrink-0 opacity-40" />
          </Link>
        </div>

      </div>
    </div>
  )

  return (
    <section className={sectionClassName} aria-label={title} dir={dir}>
      {containerClassName ? (
        <div className={containerClassName}>{card}</div>
      ) : (
        card
      )}
    </section>
  )
}
