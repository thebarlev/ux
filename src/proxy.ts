import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { GEO_HINT_COOKIE, LANG_PREF_COOKIE } from "@/lib/i18n/langPrefCookie"

const GEO_HINT_MAX_AGE = 60 * 60 * 24 // 1 day — just long enough to survive the page load that reads it

/** Search/social/monitoring crawlers: never given the geo hint, so they never
 *  see the language prompt. */
const BOT_UA =
  /bot|crawl|spider|slurp|facebookexternalhit|whatsapp|telegrambot|discordbot|preview|headless|lighthouse|pagespeed|pingdom|uptimerobot|ahrefsbot|semrushbot|mj12bot|dotbot|petalbot|bytespider|yandex|baidu|duckduckbot|applebot|linkedinbot|twitterbot/i

export function proxy(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") ?? ""
  if (BOT_UA.test(userAgent)) return NextResponse.next()

  const langPref = request.cookies.get(LANG_PREF_COOKIE)?.value

  /** 039: no redirect between languages, ever. The path decides the
   *  language ("/" Hebrew, "/en/..." English) for people and crawlers alike;
   *  lang_pref only records a choice so the language prompt is not shown
   *  again. (It used to send a visitor with lang_pref=en from every Hebrew
   *  page back to English, and the sheet pages' plain switch links never
   *  updated it, so "עברית" led back to English.) */
  if (!langPref) {
    const country = request.headers.get("x-vercel-ip-country")
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
