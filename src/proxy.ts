import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { GEO_HINT_COOKIE, LANG_PREF_COOKIE } from "@/lib/i18n/langPrefCookie"
import { DEFAULT_LOCALE, LOCALES, ROOT_LOCALE, basePath, localeByCode, localeOf, localePath } from "@/lib/i18n/locales"
import { localesOf } from "@/lib/i18n/twins"

const GEO_HINT_MAX_AGE = 60 * 60 * 24 // 1 day — just long enough to survive the page load that reads it
const LANG_PREF_MAX_AGE = 60 * 60 * 24 * 365

/** Search/social/monitoring crawlers: never redirected, never given the geo
 *  hint (so they never see the language prompt). GPTBot, ClaudeBot,
 *  PerplexityBot and the like match "bot". */
const BOT_UA =
  /bot|crawl|spider|slurp|facebookexternalhit|whatsapp|telegrambot|discordbot|preview|headless|lighthouse|pagespeed|pingdom|uptimerobot|ahrefsbot|semrushbot|mj12bot|dotbot|petalbot|bytespider|yandex|baidu|duckduckbot|applebot|linkedinbot|twitterbot/i

/** The browser's languages, highest q first (then the order given); none when
 *  there is no Accept-Language at all. */
export function browserLanguages(header: string | null): string[] {
  if (!header) return []
  return header
    .split(",")
    .map((part, i) => {
      const [tag, ...params] = part.trim().split(";")
      const q = params.map((p) => p.trim()).find((p) => p.startsWith("q="))
      return { tag: tag.trim().toLowerCase(), q: q ? Number(q.slice(2)) : 1, i }
    })
    .filter((t) => t.tag && t.tag !== "*" && t.q > 0)
    .sort((a, b) => b.q - a.q || a.i - b.i)
    .map((t) => t.tag)
}

/** 051: the first of the browser's languages the site has (iw is Hebrew's old
 *  code), else the default one; null without Accept-Language. */
export function pickLocale(header: string | null): string | null {
  const tags = browserLanguages(header)
  if (!tags.length) return null
  for (const tag of tags) {
    const code = tag.split("-")[0] === "iw" ? "he" : tag.split("-")[0]
    if (LOCALES.some((l) => l.code === code)) return code
  }
  return DEFAULT_LOCALE
}

const keep = (response: NextResponse, code: string) => {
  response.cookies.set(LANG_PREF_COOKIE, code, { path: "/", maxAge: LANG_PREF_MAX_AGE, sameSite: "lax" })
  return response
}

/**
 * 050, 051: the first visit gets the browser's language. Only pages in the root
 * language (Hebrew, no prefix) are ever redirected, and only to a language the
 * page exists in (src/lib/i18n/twins.ts); nothing sends anyone away from
 * /en/... (or any other prefix).
 * - lang_pref set to another language: honoured (302 there).
 * - No lang_pref: the first of the browser's languages the site has, by q (else
 *   English). Not Hebrew: 302 there, path and query kept, lang_pref saved (not
 *   for a visitor in Israel, so the page can still offer Hebrew, 050 rule 6).
 *   Hebrew: stay, lang_pref=he saved.
 * - No Accept-Language, or a known bot: never redirected (crawlers keep every
 *   language; hreflang stays).
 * The 039 loop cannot come back: every language switch saves lang_pref before
 * it navigates (LanguageBanner listens on a[data-ls]).
 */
export function proxy(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") ?? ""
  if (BOT_UA.test(userAgent)) return NextResponse.next()

  const path = request.nextUrl.pathname
  const page = localeOf(path)
  const base = basePath(path)
  const langPref = localeByCode(request.cookies.get(LANG_PREF_COOKIE)?.value)?.code
  const country = request.headers.get("x-vercel-ip-country")
  const chosen = pickLocale(request.headers.get("accept-language"))

  if (page.code === ROOT_LOCALE) {
    const has = localesOf(base)
    const toLocale = (code: string, save: boolean) => {
      const url = request.nextUrl.clone()
      url.pathname = localePath(base, code)
      const response = NextResponse.redirect(url, 302)
      response.headers.set("Vary", "Accept-Language, Cookie")
      response.headers.set("Cache-Control", "private, no-store")
      return save ? keep(response, code) : response
    }
    if (langPref && langPref !== ROOT_LOCALE && has.includes(langPref)) return toLocale(langPref, false)
    if (!langPref && chosen) {
      if (chosen === ROOT_LOCALE) return has.length ? keep(NextResponse.next(), ROOT_LOCALE) : NextResponse.next()
      if (has.includes(chosen)) return toLocale(chosen, country !== "IL")
    }
  }

  // the geo hint: only the language prompt reads it (039), which has one case
  // left (050): a page outside the root language, a browser not in it
  if (!langPref && page.code !== ROOT_LOCALE && chosen && chosen !== ROOT_LOCALE && country) {
    const response = NextResponse.next()
    response.cookies.set(GEO_HINT_COOKIE, country, { path: "/", maxAge: GEO_HINT_MAX_AGE, sameSite: "lax" })
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|admin|_next|_vercel|.*\\..*).*)"],
}
