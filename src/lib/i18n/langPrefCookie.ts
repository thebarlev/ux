/** First-party language preference, set client-side (by the footer switch
 *  link and the geo-suggestion banner) and read server-side by middleware to
 *  enforce it on future navigation. Not httpOnly: it holds no sensitive data
 *  and must be settable from the browser without a round trip. */
export const LANG_PREF_COOKIE = "lang_pref"
export const GEO_HINT_COOKIE = "geo_country"

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365

export function setLangPrefCookie(locale: "he" | "en"): void {
  if (typeof document === "undefined") return
  document.cookie = `${LANG_PREF_COOKIE}=${locale}; path=/; max-age=${ONE_YEAR_SECONDS}; samesite=lax`
}

export function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : null
}
