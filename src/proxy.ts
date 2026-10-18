import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { counterpartPath, localeOfPath } from "@/lib/i18n/counterpartPath"
import { GEO_HINT_COOKIE, LANG_PREF_COOKIE } from "@/lib/i18n/langPrefCookie"

const GEO_HINT_MAX_AGE = 60 * 60 * 24 // 1 day — just long enough to survive the page load that reads it

/** Search/social/monitoring crawlers: never redirected, never shown the geo
 *  banner. This is also what keeps this whole mechanism SEO-neutral — a bot
 *  never carries a lang_pref cookie in the first place, but skipping it here
 *  too means Googlebot's crawl of "/" and "/en" is untouched either way. */
const BOT_UA =
  /bot|crawl|spider|slurp|facebookexternalhit|whatsapp|telegrambot|discordbot|preview|headless|lighthouse|pagespeed|pingdom|uptimerobot|ahrefsbot|semrushbot|mj12bot|dotbot|petalbot|bytespider|yandex|baidu|duckduckbot|applebot|linkedinbot|twitterbot/i

export function proxy(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") ?? ""
  if (BOT_UA.test(userAgent)) return NextResponse.next()

  const pathname = request.nextUrl.pathname
  const currentLocale = localeOfPath(pathname)
  const langPref = request.cookies.get(LANG_PREF_COOKIE)?.value

  /** The only redirect this middleware ever issues: a visitor who already
   *  told us their preference (via the banner or the footer switch) hits a
   *  page in the other language — send them to the counterpart instead. No
   *  IP-based redirect ever runs without that explicit prior choice. */
  if ((langPref === "en" || langPref === "he") && langPref !== currentLocale) {
    const url = request.nextUrl.clone()
    url.pathname = counterpartPath(pathname)
    return NextResponse.redirect(url, 307)
  }

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
