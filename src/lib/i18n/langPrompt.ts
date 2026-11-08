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

/** The language to offer, or null. 050: the proxy now serves the browser's
 *  language on the first visit, so one case is left: a visitor in Israel, with
 *  no lang_pref, on an English page (an English browser), is offered Hebrew. */
export function langToOffer(pathname: string): "he" | "en" | null {
  if (typeof document === "undefined" || pathname.startsWith("/admin")) return null
  if (readCookie(LANG_PREF_COOKIE)) return null
  const country = visitorCountry()
  if (!country) return null
  return isEnglishPath(pathname) && country === "IL" ? "he" : null
}
