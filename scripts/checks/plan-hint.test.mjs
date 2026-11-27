// AV-938 phase b: the pricing buttons send the platform's plan code, from its
// closed list, and nothing else that could carry a price or a cycle.
// Run: node --test scripts/checks/plan-hint.test.mjs
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { test } from "node:test"

const root = new URL("../../", import.meta.url)
const read = (p) => readFileSync(new URL(p, root), "utf8")

// The platform's closed list (planByCode, lib/auth/start-intent.ts), per AV-938.
const PLATFORM_CODES = ["basic", "plus", "pro"]
// The site's ids (URLs, analytics, data-plan) ⟵ the platform's codes.
const EXPECTED = { free: null, start: "basic", business: "plus", pro: "pro" }

// AV-1028 §1 · p24 (1): USD payments are off, so on the English page the paid plans lead to the
// existing contact form ("Notify me"), never to a purchase. Those buttons carry no plan code at all.
const NOTIFY = { href: "/en/contact", text: "Notify me" }
const isNotify = (lang, plan) => lang === "en" && plan !== "free"

function buttons(lang) {
  const src = read(`src/app/_home/pricing-markup.${lang}.ts`).replace(/\\"/g, '"')
  return [...src.matchAll(/<a class="pl-cta" href="([^"]+)" data-plan="([a-z]+)">([^<]*)</g)].map((m) => ({
    plan: m[2],
    href: m[1],
    text: m[3],
    url: new URL(m[1].replace(/&amp;/g, "&"), "https://uxellent.com"),
  }))
}

for (const lang of ["he", "en"]) {
  test(`${lang}: four buttons, each to the platform's sign-up with its plan code`, () => {
    const bs = buttons(lang)
    assert.deepEqual(bs.map((b) => b.plan), ["free", "start", "business", "pro"])
    for (const { plan, url, href, text } of bs) {
      if (isNotify(lang, plan)) {
        assert.equal(href, NOTIFY.href, plan)
        assert.equal(text, NOTIFY.text, plan)
        continue
      }
      assert.equal(url.origin + url.pathname, "https://ai.uxellent.com/start", plan)
      assert.equal(url.searchParams.get("plan"), EXPECTED[plan], plan)
    }
  })

  test(`${lang}: only plan and lang in the URL, never a price, amount or cycle`, () => {
    for (const { plan, url } of buttons(lang)) {
      if (isNotify(lang, plan)) continue
      const keys = [...url.searchParams.keys()]
      assert.ok(keys.every((k) => k === "plan" || k === "lang"), `${plan}: ${keys}`)
      assert.equal(url.searchParams.get("lang"), lang === "en" ? "en" : null, plan)
    }
  })
}

test("every code sent is on the platform's closed list", () => {
  for (const lang of ["he", "en"]) {
    for (const { url } of buttons(lang)) {
      const code = url.searchParams.get("plan")
      if (code !== null) assert.ok(PLATFORM_CODES.includes(code), code)
    }
  }
})

test("the generator carries the same mapping, so a rebuild cannot drift", () => {
  const py = read("scripts/home-sheets/build.py")
  const m = py.match(/^PLATFORM_PLAN = \{(.*)\}$/m)
  assert.ok(m, "PLATFORM_PLAN in build.py")
  const map = Object.fromEntries([...m[1].matchAll(/"(\w+)": (None|"(\w+)")/g)].map((x) => [x[1], x[3] ?? null]))
  assert.deepEqual(map, EXPECTED)
})

test("en: every paid plan says USD payments are not available yet, next to its price", () => {
  const src = read("src/app/_home/pricing-markup.en.ts").replace(/\\"/g, '"')
  for (const plan of ["start", "business", "pro"]) {
    assert.ok(src.includes(`<div class="pl-meta">{{PLAN_YEAR:${plan}}}<span class="pl-note">USD payments are not yet available.</span></div>`), plan)
  }
  assert.ok(!/ai\.uxellent\.com\/start\?plan=/.test(src), "no English button leads to a paid sign-up")
  const he = read("src/app/_home/pricing-markup.he.ts")
  assert.ok(!he.includes("USD payments"), "the Hebrew page is unchanged")
})
