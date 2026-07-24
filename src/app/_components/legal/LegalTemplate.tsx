import type { ReactNode } from "react"

type LegalTemplateProps = {
  title: string
  subtitle?: string
  lastUpdated?: string
  children: ReactNode
  dir?: "rtl" | "ltr"
}

export function LegalTemplate({
  title,
  subtitle,
  lastUpdated,
  children,
  dir = "rtl",
}: LegalTemplateProps) {
  return (
    <section
      aria-label={title}
      className="py-[var(--space-section)] print:py-8"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div
        dir={dir}
        className={`mx-auto w-full max-w-3xl ${dir === "ltr" ? "text-left [&_ul]:!text-left [&_ul]:![direction:ltr] [&_li]:!text-left [&_li]:![direction:ltr]" : ""}`}
      >
          {/* Header */}
          <header className="text-center">
            <h1 className="text-[34px] font-semibold leading-[1.15] tracking-[-0.2px] text-black sm:text-[44px] lg:text-[56px]">
              {title}
            </h1>
            {subtitle && (
              <p className="mx-auto mt-4 max-w-[48rem] text-[16px] font-semibold leading-[1.85] text-[color:var(--vow-muted)] sm:text-[18px]">
                {subtitle}
              </p>
            )}
            {lastUpdated && (
              <time className="mt-2 block text-[14px] text-[color:var(--vow-muted)]" dir={dir}>
                {dir === "ltr" ? "Last updated: " : "עדכון אחרון: "}{lastUpdated}
              </time>
            )}
          </header>

          {/* Content */}
          <article className="mt-10 whitespace-pre-wrap break-words space-y-5 text-[16px] leading-[1.9] text-black/90 sm:text-[18px]">
            {children}
          </article>
        </div>
      </div>
    </section>
  )
}