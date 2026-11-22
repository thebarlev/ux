// node analytics-phase1-browser.cjs <base> — analytics phase 1 in a real browser.
// Google / PostHog / Meta requests are aborted, so nothing reaches the real properties;
// gtag calls are read from window.dataLayer and PostHog is a recording stub.
const { chromium } = require("playwright")
const BASE = process.argv[2] || "http://localhost:3917"
let fails = 0
const out = (ok, name, got) => { if (!ok) fails++; console.log(`${ok ? "OK  " : "FAIL"} | ${name} | ${got}`) }
// Vercel preview protection: VERCEL_BYPASS (env) sets the bypass cookie on the preview host only.
const BYPASS = process.env.VERCEL_BYPASS
async function unlock(c, base) {
  if (!BYPASS || !base.includes("vercel.app")) return
  const p = await c.newPage()
  await p.goto(`${base}/?x-vercel-protection-bypass=${encodeURIComponent(BYPASS)}&x-vercel-set-bypass-cookie=true`)
  await p.close()
}
const bypassHeaders = (base) => (BYPASS && base.includes("vercel.app") ? { "x-vercel-protection-bypass": BYPASS } : {})
const consent = (a, m) => `1%7C2026-11-22T00%3A00%3A00.000Z%7Ca${a}%7Cm${m}`

async function ctx(b, locale, a, m) {
  const c = await b.newContext({ locale, extraHTTPHeaders: { "accept-language": locale }, viewport: { width: 1280, height: 900 } })
  await c.route(/googletagmanager|google-analytics|posthog|facebook|doubleclick|ai\.uxellent\.com/, (r) => r.abort())
  await c.addCookies([{ name: "ux_consent", value: consent(a, m), domain: new URL(BASE).hostname, path: "/" }])
  await c.addInitScript(() => {
    window.__ph = []
    Object.defineProperty(window, "posthog", { value: { capture: (e, p) => window.__ph.push([e, p]), init() {} }, writable: true })
    // keep the browser on the page when a link into the app is clicked (bubble phase, after the tracker)
    document.addEventListener("click", (e) => { if (e.target.closest?.('a[href*="ai.uxellent.com"]')) e.preventDefault() })
  })
  await unlock(c, BASE)
  return c
}
const settle = (p) => p.mouse.move(5, 5).then(() => p.mouse.wheel(0, 50)).then(() => p.waitForTimeout(2500))
const gtagEvents = (p, name) => p.evaluate((n) => (window.dataLayer || []).filter((x) => x && x[0] === "event" && x[1] === n).map((x) => ({ ...x[2] })), name)
const dlObjects = (p, name) => p.evaluate((n) => (window.dataLayer || []).filter((x) => x && x.event === n).map((x) => ({ ...x })), name)
const appLinks = (p) => p.$$eval('a[href^="https://ai.uxellent.com"]', (as) => as.map((a) => a.href))

;(async () => {
  const b = await chromium.launch({ channel: "chrome" })

  // 1. English, analytics allowed, campaign link
  {
    const c = await ctx(b, "en-US", 1, 0); const p = await c.newPage()
    await p.goto(`${BASE}/en?utm_source=reddit&utm_medium=social&utm_campaign=qa1&utm_term=dan%40example.com`)
    await settle(p)
    const links = await appLinks(p)
    out(links.length > 0 && links.every((h) => new URL(h).searchParams.get("lang") === "en"), "EN: every link into the app has lang=en", `${links.length} links`)
    const pv = await dlObjects(p, "vow_page_view")
    out(pv.length === 1 && pv[0].page_language === "en" && pv[0].page_dir === "ltr", "EN: vow_page_view language", JSON.stringify(pv.map((x) => x.page_language)))
    out((await gtagEvents(p, "page_view")).length === 0, "no hand-sent page_view (config sends it)", "0 expected")
    const cfg = await p.evaluate(() => (window.dataLayer || []).filter((x) => x && x[0] === "config").map((x) => x[1]))
    out(cfg.length === 1 && cfg[0] === "G-HEX0NQF4WM", "GA4 configured once (analytics only, no Ads)", JSON.stringify(cfg))
    const ck = (await c.cookies()).find((x) => x.name === "ux_attr")
    const attr = ck ? JSON.parse(decodeURIComponent(ck.value)) : null
    out(attr?.ft?.source === "reddit" && attr.ft.campaign === "qa1" && attr.ft.lang === "en" && !attr.ft.term && attr.ft.lp === "/en", "ux_attr first touch (email-like term dropped, path only)", ck?.value && decodeURIComponent(ck.value))
    // review fix: a later page view without UTMs does not rewrite the touch
    const before = (await c.cookies()).find((x) => x.name === "ux_attr")?.value
    const p2 = await c.newPage(); await p2.goto(`${BASE}/en/pricing`); await settle(p2); await p2.close()
    await p.evaluate(() => history.pushState({}, "", "/en/faq")); await p.waitForTimeout(300)
    out((await c.cookies()).find((x) => x.name === "ux_attr")?.value === before, "later page views leave ux_attr unchanged", "")
    const a = p.locator('a[href^="https://ai.uxellent.com"]:visible').first()
    await a.dblclick()
    await p.waitForTimeout(300)
    const ev = await gtagEvents(p, "cta_build_click")
    out(ev.length === 1 && ev[0].send_to === "G-HEX0NQF4WM" && ev[0].page_language === "en", "double click → one cta_build_click to GA4", JSON.stringify(ev))
    const ph = await p.evaluate(() => window.__ph.filter((x) => x[0] === "cta_build_click").length)
    out(ph === 1, "… and one to PostHog", ph)
    await p.waitForTimeout(1100); await a.click(); await p.waitForTimeout(200)
    out((await gtagEvents(p, "cta_build_click")).length === 2, "a later, separate click counts again", "2 expected")
    // consent withdrawn → cookie removed
    await p.evaluate(() => { document.cookie = "ux_consent=1%7Cx%7Ca0%7Cm0; Path=/"; window.dispatchEvent(new CustomEvent("ux-consent", { detail: { version: 1, date: "x", analytics: false, marketing: false } })) })
    out(!(await c.cookies()).some((x) => x.name === "ux_attr"), "withdrawing analytics consent deletes ux_attr", "")
    await c.close()
  }

  // 2. Hebrew, analytics allowed
  {
    const c = await ctx(b, "he-IL", 1, 0); const p = await c.newPage()
    await p.goto(`${BASE}/`); await settle(p)
    const links = await appLinks(p)
    out(links.length > 0 && links.every((h) => !new URL(h).searchParams.has("lang")), "HE: links unchanged (no lang)", `${links.length} links`)
    const pv = await dlObjects(p, "vow_page_view")
    out(pv[0]?.page_language === "he" && pv[0]?.page_dir === "rtl", "HE: vow_page_view language", pv[0]?.page_language)
    out(!(await c.cookies()).some((x) => x.name === "ux_attr"), "direct visit writes no ux_attr", "")
    await c.close()
  }

  // review fix: consent gone (expired / deleted) → a leftover ux_attr is removed on the next view
  {
    const c = await ctx(b, "en-US", 1, 0); const p = await c.newPage()
    await p.goto(`${BASE}/en?utm_source=google`); await settle(p)
    const had = (await c.cookies()).some((x) => x.name === "ux_attr")
    await c.clearCookies({ name: "ux_consent" })
    await p.goto(`${BASE}/en`); await settle(p)
    out(had && !(await c.cookies()).some((x) => x.name === "ux_attr"), "consent cookie gone → ux_attr removed", `had=${had}`)
    await c.close()
  }

  // 3. No consent at all
  {
    const c = await ctx(b, "en-US", 0, 0); const p = await c.newPage()
    await p.goto(`${BASE}/en?utm_source=google`); await settle(p)
    await p.locator('a[href^="https://ai.uxellent.com"]:visible').first().click(); await p.waitForTimeout(200)
    out((await gtagEvents(p, "cta_build_click")).length === 0, "no consent: no GA4 event", "")
    out(await p.evaluate(() => window.__ph.length) === 0, "no consent: no PostHog event", "")
    out(!(await c.cookies()).some((x) => x.name === "ux_attr"), "no consent: no ux_attr cookie", "")
    const links = await appLinks(p)
    out(links.every((h) => new URL(h).searchParams.get("lang") === "en"), "no consent: lang=en still added (functional, not tracking)", `${links.length} links`)
    await c.close()
  }

  await b.close()
  console.log(fails ? `${fails} FAILED` : "ALL OK")
  process.exit(fails ? 1 : 0)
})()
