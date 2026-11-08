import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { counterpartPath, isEnglishPath } from "@/lib/i18n/counterpartPath"
import { GEO_HINT_COOKIE, LANG_PREF_COOKIE } from "@/lib/i18n/langPrefCookie"
import { hasEnglishTwin } from "@/lib/i18n/twins"

const GEO_HINT_MAX_AGE = 60 * 60 * 24 // 1 day — just long enough to survive the page load that reads it
const LANG_PREF_MAX_AGE = 60 * 60 * 24 * 365

/** Search/social/monitoring crawlers: never redirected, never given the geo
 *  hint (so they never see the language prompt). GPTBot, ClaudeBot,
 *  PerplexityBot and the like match "bot". */
const BOT_UA =
  /bot|crawl|spider|slurp|facebookexternalhit|whatsapp|telegrambot|discordbot|preview|headless|lighthouse|pagespeed|pingdom|uptimerobot|ahrefsbot|semrushbot|mj12bot|dotbot|petalbot|bytespider|yandex|baidu|duckduckbot|applebot|linkedinbot|twitterbot/i

/** The browser's first language (highest q, then the order given), or null
 *  when there is no Accept-Language at all. */
export function firstLanguage(header: string | null): string | null {
  if (!header) return null
  const tags = header
    .split(",")
    .map((part, i) => {
      const [tag, ...params] = part.trim().split(";")
      const q = params.map((p) => p.trim()).find((p) => p.startsWith("q="))
      return { tag: tag.trim(), q: q ? Number(q.slice(2)) : 1, i }
    })
    .filter((t) => t.tag && t.tag !== "*" && t.q > 0)
  tags.sort((a, b) => b.q - a.q || a.i - b.i)
  return tags[0]?.tag ?? null
}

const isHebrew = (tag: string) => /^(he|iw)(-|$)/i.test(tag)

const keep = (response: NextResponse, lang: "he" | "en") => {
  response.cookies.set(LANG_PREF_COOKIE, lang, { path: "/", maxAge: LANG_PREF_MAX_AGE, sameSite: "lax" })
  return response
}

/**
 * 050 (Itzik, 08.11): the first visit gets the browser's language. A visitor
 * with no lang_pref whose browser's first language is not Hebrew, asking for
 * a Hebrew page that has an English twin, is sent there (302, path and query
 * kept) and lang_pref=en is saved; a Hebrew browser stays and lang_pref=he is
 * saved. lang_pref=en is honoured on Hebrew pages. Nothing ever sends anyone
 * from /en to Hebrew, and requests with no Accept-Language, or from a known
 * bot, are never redirected, so crawlers keep both languages (hreflang stays).
 * The 039 loop cannot come back: every language switch on the site saves
 * lang_pref before it navigates (LanguageBanner, LangSwitchLink), so choosing
 * עברית means lang_pref=he.
 */
export function proxy(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") ?? ""
  if (BOT_UA.test(userAgent)) return NextResponse.next()

  const path = request.nextUrl.pathname
  const langPref = request.cookies.get(LANG_PREF_COOKIE)?.value
  const country = request.headers.get("x-vercel-ip-country")
  const first = firstLanguage(request.headers.get("accept-language"))

  if (!isEnglishPath(path) && hasEnglishTwin(path)) {
    const toEnglish = (save: boolean) => {
      const url = request.nextUrl.clone()
      url.pathname = counterpartPath(path)
      const response = NextResponse.redirect(url, 302)
      response.headers.set("Vary", "Accept-Language, Cookie")
      response.headers.set("Cache-Control", "private, no-store")
      return save ? keep(response, "en") : response
    }
    if (langPref === "en") return toEnglish(false)
    if (!langPref) {
      // a visitor in Israel is sent without saving lang_pref, so the English
      // page can still offer them Hebrew (rule 6); anyone else keeps English
      if (first && !isHebrew(first)) return toEnglish(country !== "IL")
      if (first) return keep(NextResponse.next(), "he")
    }
  }

  // the geo hint: only the language prompt reads it (039), which now has one
  // case left (050): a visitor in Israel with an English browser, on an English
  // page; anyone else gets no hint, so no prompt
  if (!langPref && isEnglishPath(path) && first && !isHebrew(first)) {
    if (country) {
      const response = NextResponse.next()
      response.cookies.set(GEO_HINT_COOKIE, country, {
        path: "/",
        maxAge: GEO_HINT_MAX_AGE,
        sameSite: "lax",
      })
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|admin|_next|_vercel|.*\\..*).*)"],
}
