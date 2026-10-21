"use client"

import Link from "next/link"
import { setLangPrefCookie } from "@/lib/i18n/langPrefCookie"

/** Sets lang_pref to the destination locale before the browser navigates, so
 *  the language prompt is not offered again after a manual switch. */
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
