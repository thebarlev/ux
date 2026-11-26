// AV-936 guard, run in `build`: one purchase path only (the platform), one
// price source only. Fails the build if the old VOW checkout comes back in
// any form.
//   1 · no page or route under a "checkout" or "cardcom" segment, except the
//       two 410 stubs that re-export src/lib/gone.ts
//   2 · src/lib/gone.ts never reads the request and never logs
//   3 · next.config.ts sends every /checkout address to /pricing (308)
//   4 · no link, import or call to the old checkout anywhere in src/
//   5 · links to the platform carry no price and no billing cycle, and a
//       plan hint only from the platform's closed list
import { readFileSync, readdirSync, statSync } from "node:fs"
import { dirname, join, relative, sep } from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..")
const SRC = join(ROOT, "src")
const rel = (p) => relative(ROOT, p).split(sep).join("/")
const read = (p) => readFileSync(p, "utf8")
const fails = []
const fail = (msg) => fails.push(msg)

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p, out)
    else out.push(p)
  }
  return out
}
const files = walk(SRC)

// 1 · routes
const STUBS = new Set(["src/app/(he)/api/checkout/[[...path]]/route.ts", "src/app/(he)/api/cardcom/[[...path]]/route.ts"])
const STUB_BODY = /^\/\/[^\n]*\nexport \{ DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT \} from "@\/lib\/gone"\n$/
for (const f of files) {
  const r = rel(f)
  if (!/^src\/app\//.test(r) || !/\/(checkout|cardcom)(\/|$)/i.test(r)) continue
  if (!STUBS.has(r)) fail(`${r}: a route under checkout/cardcom (only the two 410 stubs may exist)`)
  else if (!STUB_BODY.test(read(f))) fail(`${r}: must only re-export the 410 handler from @/lib/gone`)
}
for (const s of STUBS) if (!files.some((f) => rel(f) === s)) fail(`${s}: missing (the address must answer 410, not fall through)`)

// 2 · the 410 handler
const gone = read(join(SRC, "lib/gone.ts")).replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, "")
if (!/status: 410/.test(gone)) fail("src/lib/gone.ts: must answer 410")
if (/\b(req|request|body|json|text|formData|headers\.get|console|log)\b\s*[.(]/.test(gone) || /\bfunction gone\([^)]/.test(gone)) {
  fail("src/lib/gone.ts: must not read the request or log anything")
}

// 3 · direct addresses
const nextConfig = read(join(ROOT, "next.config.ts"))
if (!/\{\s*source: "\/checkout\/:path\*", destination: "\/pricing", statusCode: 308 \}/.test(nextConfig)) {
  fail('next.config.ts: missing { source: "/checkout/:path*", destination: "/pricing", statusCode: 308 }')
}
if ((nextConfig.match(/source: "\/checkout/g) ?? []).length !== 1) fail("next.config.ts: exactly one /checkout rule (no rewrite or second redirect)")
if (/source: "\/api\/(checkout|cardcom)/.test(nextConfig)) fail("next.config.ts: /api/checkout and /api/cardcom answer 410 from the route, not a redirect or rewrite")

// 4 · nothing points at the old checkout
const OLD = [
  [/createCheckout|createCardcomLowProfile|lib\/checkout|lib\/payments/, "an import or call of the old checkout"],
  [/(href|action|formAction|fetch\(|redirect\(|push\()\s*=?\s*\{?\s*\\?["'`](https:\/\/(www\.)?uxellent\.com)?\/(checkout|api\/checkout|api\/cardcom)/, "a link or call to the old checkout"],
]
for (const f of files) {
  const r = rel(f)
  if (STUBS.has(r) || r === "src/lib/gone.ts" || !/\.(tsx?|jsx?|mjs|json|md|css)$/.test(r)) continue
  const s = read(f)
  for (const [re, what] of OLD) if (re.test(s)) fail(`${r}: ${what}`)
}

// 5 · links to the platform: plan hint from the closed list only, no price, no cycle
const PLAN_CODES = new Set(["basic", "plus", "pro"])
const PRICE_PARAMS = /^(price|amount|sum|total|cost|billing|cycle|period|currency)$/i
for (const f of files) {
  const r = rel(f)
  if (!/\.(tsx?|jsx?)$/.test(r)) continue
  for (const m of read(f).matchAll(/https:\/\/ai\.uxellent\.com[^"'`\s\\<>)]*/g)) {
    let url
    try { url = new URL(m[0].replace(/&amp;/g, "&")) } catch { continue }
    for (const [k, v] of url.searchParams) {
      if (PRICE_PARAMS.test(k)) fail(`${r}: ${m[0]}: "${k}" in a platform link (the price and cycle are set in the platform)`)
      if (k === "plan" && v && !PLAN_CODES.has(v)) fail(`${r}: ${m[0]}: plan="${v}" is not one of the platform's codes (${[...PLAN_CODES].join(", ")})`)
    }
  }
}

if (fails.length) {
  console.error(`✗ old checkout (AV-936): ${fails.length} problem(s)`)
  for (const f of fails) console.error(`  · ${f}`)
  process.exit(1)
}
console.log("✓ old checkout (AV-936): gone, no route, no link, no price in platform links")
