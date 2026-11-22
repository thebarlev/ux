// node analytics-phase1-link-sweep.cjs <base> <routes.json>
// Every link into ai.uxellent.com on every page: the browser's href must equal the
// server-rendered href with lang=en added on English pages only — same path, every
// existing parameter kept with its value. Then real navigation on a sample, and the
// pricing billing toggle. Google / PostHog / Meta are aborted; the app is stubbed.
const { chromium } = require("playwright")
const fs = require("fs")
const BASE = process.argv[2] || "http://localhost:3917"
const routes = JSON.parse(fs.readFileSync(process.argv[3] || "/tmp/mkt-p1-routes.json", "utf8"))
let fails = 0, checked = 0
const fail = (m) => { fails++; console.log("FAIL | " + m) }
const ent = (s) => s.replace(/&amp;/g, "&")

function expected(serverHref, isEn) {
  const u = new URL(serverHref)
  if (isEn && u.searchParams.get("lang") !== "en") u.searchParams.set("lang", "en")
  return u
}
function sameUrl(a, b) {
  if (a.origin !== b.origin || a.pathname !== b.pathname || a.hash !== b.hash) return false
  const ka = [...a.searchParams].sort().join("&"), kb = [...b.searchParams].sort().join("&")
  return ka === kb
}

;(async () => {
  const b = await chromium.launch({ channel: "chrome" })
  const c = await b.newContext({ viewport: { width: 1280, height: 900 } })
  await c.addCookies([{ name: "ux_consent", value: "1%7C2026-11-22T00%3A00%3A00.000Z%7Ca1%7Cm0", domain: new URL(BASE).hostname, path: "/" }])
  await c.route(/googletagmanager|google-analytics|posthog|facebook|doubleclick/, (r) => r.abort())
  const navigated = []
  await c.route(/ai\.uxellent\.com/, (r) => { navigated.push(r.request().url()); r.fulfill({ status: 200, contentType: "text/html", body: "<html><body>app stub</body></html>" }) })

  for (const route of routes) {
    const isEn = route === "/en" || route.startsWith("/en/")
    const res = await fetch(BASE + route, { headers: { "accept-language": isEn ? "en-US" : "he-IL" }, redirect: "manual" })
    if (res.status !== 200) continue
    const html = await res.text()
    const server = [...html.matchAll(/href="(https:\/\/ai\.uxellent\.com[^"]*)"/g)].map((m) => ent(m[1]))
    const p = await c.newPage()
    await p.goto(BASE + route)
    await p.mouse.wheel(0, 40); await p.waitForTimeout(1800)
    const dom = await p.$$eval('a[href^="https://ai.uxellent.com"]', (as) => as.map((a) => a.href))
    // every server link must appear in the DOM in its expected form (multiset compare)
    const pool = dom.map((h) => new URL(h))
    for (const s of server) {
      const want = expected(s, isEn)
      const i = pool.findIndex((u) => sameUrl(u, want))
      if (i < 0) fail(`${route}: ${s} → expected ${want} not found in DOM`)
      else pool.splice(i, 1)
      checked++
    }
    if (!isEn && dom.some((h) => new URL(h).searchParams.has("lang") && !server.some((s) => new URL(s).searchParams.has("lang"))))
      fail(`${route}: lang added on a Hebrew page`)
    await p.close()
  }
  console.log(`links compared: ${checked} on ${routes.length} routes`)

  // real navigation: a click lands on the app with the exact expected URL
  for (const [route, isEn] of [["/en", true], ["/", false], ["/en/pricing", true], ["/pricing", false]]) {
    const p = await c.newPage(); await p.goto(BASE + route); await p.mouse.wheel(0, 40); await p.waitForTimeout(1800)
    const a = p.locator('a[href^="https://ai.uxellent.com"]:visible').first()
    const href = await a.evaluate((el) => el.href)
    navigated.length = 0
    await Promise.all([p.waitForURL(/ai\.uxellent\.com/, { timeout: 8000 }).catch(() => {}), a.click()])
    const landed = p.url()
    const ok = landed.startsWith("https://ai.uxellent.com") && sameUrl(new URL(landed), new URL(href)) && (new URL(landed).searchParams.get("lang") === "en") === isEn
    if (!ok) fail(`navigation from ${route}: href ${href} landed ${landed}`)
    else console.log(`OK   | navigation from ${route} → ${landed}`)
    await p.close()
  }

  // pricing billing toggle (HomeBehaviors rewrites billing=) keeps lang=en and plan
  {
    const p = await c.newPage(); await p.goto(BASE + "/en/pricing"); await p.mouse.wheel(0, 40); await p.waitForTimeout(1800)
    const before = await p.$$eval('a[href*="billing="]', (as) => as.map((a) => a.href))
    const toggle = p.locator('[data-k="m"], button:has-text("Monthly"), label:has-text("Monthly")').first()
    if (before.length && await toggle.count()) {
      await toggle.click(); await p.waitForTimeout(300)
      const after = await p.$$eval('a[href*="billing="]', (as) => as.map((a) => a.href))
      const ok = after.length === before.length && after.every((h) => { const u = new URL(h); return u.searchParams.get("billing") === "monthly" && u.searchParams.get("lang") === "en" && u.searchParams.get("plan") })
      if (!ok) fail(`billing toggle: ${JSON.stringify(after)}`)
      else console.log(`OK   | billing toggle → monthly, plan and lang=en kept (${after.length} links)`)
    } else console.log(`SKIP | billing toggle not found (${before.length} billing links)`)
    await p.close()
  }

  await b.close()
  console.log(fails ? `${fails} FAILED` : "ALL OK")
  process.exit(fails ? 1 : 0)
})()
