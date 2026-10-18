"use client"

import Link from "next/link"
import { setLangPrefCookie } from "@/lib/i18n/langPrefCookie"

/** Sets lang_pref to the destination locale before the browser navigates, so
 *  a manual switch never gets fought by the middleware's own lang_pref
 *  redirect (e.g. a visitor who dismissed the geo banner on Hebrew, then
 *  deliberately clicks through to English from the footer). */
export function LangSwitchLink({
  href,
  target,
  lang,
  dir,
  className,
  onClick,
  children,
}: {
  href: string
  target: "he" | "en"
  lang?: string
  dir?: "ltr" | "rtl"
  className?: string
  onClick?: () => void
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      lang={lang}
      hrefLang={lang}
      dir={dir}
      className={className}
      onClick={() => {
        setLangPrefCookie(target)
        onClick?.()
      }}
    >
      {children}
    </Link>
  )
}
