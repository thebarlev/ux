import { isEnglishPath } from "@/lib/i18n/counterpartPath"
import { GEO_HINT_COOKIE, LANG_PREF_COOKIE, readCookie } from "@/lib/i18n/langPrefCookie"

/** Fired once the language prompt is closed without leaving the page; the
 *  cookie banner waits for it (039: the prompt comes first). */
export const LANG_DONE_EVENT = "ux:lang-done"

/** The visitor's country: the geo_country hint the proxy sets from
 *  x-vercel-ip-country. Off production, ?geo=XX overrides it for testing. */
export function visitorCountry(): string | null {
  if (typeof window === "undefined") return null
  if (window.location.hostname !== "uxellent.com") {
    const geo = new URLSearchParams(window.location.search).get("geo")
    if (geo && /^[a-z]{2}$/i.test(geo)) return geo.toUpperCase()
  }
  return readCookie(GEO_HINT_COOKIE)
}

/** The language to offer, or null: a visitor outside Israel on a Hebrew page,
 *  or in Israel on an English page, who has not chosen a language yet. */
export function langToOffer(pathname: string): "he" | "en" | null {
  if (typeof document === "undefined" || pathname.startsWith("/admin")) return null
  if (readCookie(LANG_PREF_COOKIE)) return null
  const country = visitorCountry()
  if (!country) return null
  const isEn = isEnglishPath(pathname)
  if (!isEn && country !== "IL") return "en"
  if (isEn && country === "IL") return "he"
  return null
}
