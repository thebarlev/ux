// AV-936: every old checkout address, asked directly (GET and POST), never
// answers 200. Also checks that the pricing buttons go to the platform.
// Run: node scripts/checks/checkout-removed-http.mjs <base>
//   e.g. http://localhost:3000, or a preview URL (VERCEL_BYPASS for protection)
const BASE = (process.argv[2] || "").replace(/\/$/, "")
if (!BASE) {
  console.error("usage: node scripts/checks/checkout-removed-http.mjs <base>")
  process.exit(2)
}
const headers = process.env.VERCEL_BYPASS ? { "x-vercel-protection-bypass": process.env.VERCEL_BYPASS } : {}

// [path, what it must answer]
const CASES = [
  ["/checkout", 308],
  ["/checkout/start", 308],
  ["/checkout/basic", 308],
  ["/checkout/success", 308],
  ["/checkout/failed", 308],
  ["/api/checkout", 410],
  ["/api/cardcom", 410],
  ["/api/cardcom/checkout", 410],
  ["/api/cardcom/webhook", 410],
]

let bad = 0
for (const [path, want] of CASES) {
  for (const method of ["GET", "POST"]) {
    const res = await fetch(BASE + path, {
      method,
      redirect: "manual",
      headers: { ...headers, "content-type": "application/json" },
      body: method === "POST" ? JSON.stringify({ ReturnValue: "probe", ResponseCode: 0 }) : undefined,
    })
    const loc = res.headers.get("location") ?? ""
    const okLoc = want !== 308 || new URL(loc, BASE).pathname === "/pricing"
    const ok = res.status === want && okLoc && res.status !== 200
    if (!ok) bad++
    console.log(`${ok ? "OK  " : "FAIL"} | ${method.padEnd(4)} ${path.padEnd(24)} ⟵ ${res.status}${loc ? ` → ${new URL(loc, BASE).pathname}` : ""} (want ${want}${want === 308 ? " → /pricing" : ""})`)
  }
}

// the pricing buttons, both languages: the platform's sign-up, no plan code, price or cycle (AV-938 §3a)
for (const page of ["/pricing", "/en/pricing"]) {
  const html = await (await fetch(BASE + page, { headers })).text()
  const ctas = [...html.matchAll(/<a class="pl-cta" href="([^"]+)" data-plan="([a-z]+)"/g)].map((m) => [m[2], m[1].replace(/&amp;/g, "&")])
  const toCheckout = /href="(https:\/\/(www\.)?uxellent\.com)?\/(checkout|api\/checkout|api\/cardcom)/.test(html)
  for (const [plan, href] of ctas) {
    const u = new URL(href)
    const wantSearch = page.startsWith("/en") ? "?lang=en" : ""
    const ok = u.origin === "https://ai.uxellent.com" && u.pathname === "/start" && u.search === wantSearch
    if (!ok) bad++
    console.log(`${ok ? "OK  " : "FAIL"} | ${page.padEnd(12)} ${plan.padEnd(9)} ⟵ ${href}`)
  }
  if (ctas.length !== 4) { bad++; console.log(`FAIL | ${page}: ${ctas.length} plan buttons, want 4`) }
  if (toCheckout) { bad++; console.log(`FAIL | ${page}: a link to the old checkout`) }
}

console.log(bad ? `✗ ${bad} failing` : "✓ every old checkout address answers 308/410, never 200; every plan button goes to the platform's sign-up")
process.exit(bad ? 1 : 0)
