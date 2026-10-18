"use client"

import { usePathname } from "next/navigation"
import { counterpartPath } from "@/lib/i18n/counterpartPath"
import { LangSwitchLink } from "@/app/_components/i18n/LangSwitchLink"
import type { Locale } from "@/content/i18n/dictionary"

/** The only client-only piece of the (otherwise server-rendered) redesign
 *  footer — usePathname() is needed to compute the current page's /en
 *  counterpart. `hrefOverride` covers the one case that isn't a straight
 *  path swap: a blog article without a translation. */
export function FooterLangSwitch({
  locale,
  label,
  hrefOverride,
  className,
}: {
  locale: Locale
  label: string
  hrefOverride?: string
  className?: string
}) {
  const pathname = usePathname()
  const homeHref = locale === "en" ? "/en" : "/"
  const href = hrefOverride ?? counterpartPath(pathname ?? homeHref)
  const target = locale === "en" ? "he" : "en"

  return (
    <LangSwitchLink href={href} target={target} lang={target} dir={target === "en" ? "ltr" : "rtl"} className={className}>
      {label}
    </LangSwitchLink>
  )
}
