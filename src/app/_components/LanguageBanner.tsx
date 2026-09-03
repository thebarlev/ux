"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { counterpartPath, isEnglishPath } from "@/lib/i18n/counterpartPath"
import { GEO_HINT_COOKIE, LANG_PREF_COOKIE, readCookie, setLangPrefCookie } from "@/lib/i18n/langPrefCookie"

type Suggestion = "en" | "he" | null

/** Geo-suggested language banner. Never redirects on its own — it only ever
 *  offers a choice, and either choice (switch or dismiss) writes lang_pref,
 *  which is what middleware.ts actually acts on for future navigation. Non
 *  IL visitors on a Hebrew page get offered English; IL visitors on an
 *  English page get offered Hebrew. Renders in normal document flow (not
 *  fixed/overlaid) so it never covers page content, and only ever appears
 *  once per visitor — reading lang_pref first means a past decision (switch
 *  or dismiss) suppresses it for good. */
export function LanguageBanner() {
  const pathname = usePathname() ?? "/"
  const router = useRouter()
  const isEn = isEnglishPath(pathname)
  const [suggestion, setSuggestion] = useState<Suggestion>(null)

  useEffect(() => {
    if (pathname.startsWith("/admin")) return
    if (readCookie(LANG_PREF_COOKIE)) return
    const country = readCookie(GEO_HINT_COOKIE)
    if (!country) return

    const next = !isEn && country !== "IL" ? "en" : isEn && country === "IL" ? "he" : null
    if (!next) return
    // document.cookie only exists client-side, so the decision can't be
    // computed during the SSR render pass — deferring it to an effect (and
    // rendering nothing until then) is what keeps the first client render
    // matching the server-rendered HTML instead of a hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSuggestion(next)
  }, [isEn, pathname])

  if (!suggestion) return null

  function switchLanguage() {
    setLangPrefCookie(suggestion as "he" | "en")
    setSuggestion(null)
    router.push(counterpartPath(pathname))
  }

  function dismiss() {
    setLangPrefCookie(isEn ? "en" : "he")
    setSuggestion(null)
  }

  const copy =
    suggestion === "en"
      ? { dir: "ltr" as const, message: "Prefer English?", action: "View this site in English", close: "Close" }
      : { dir: "rtl" as const, message: "מעדיפים עברית?", action: "צפייה באתר בעברית", close: "סגירה" }

  return (
    <div dir={copy.dir} className="flex items-center justify-center gap-3 bg-[#151515] px-4 py-2.5 text-center text-sm text-white">
      <span>{copy.message}</span>
      <button
        onClick={switchLanguage}
        className="rounded-md bg-white/15 px-3 py-1 font-medium text-white transition-colors hover:bg-white/25"
      >
        {copy.action}
      </button>
      <button onClick={dismiss} aria-label={copy.close} className="text-white/60 transition-colors hover:text-white">
        ✕
      </button>
    </div>
  )
}
