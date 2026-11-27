// Plans from the platform's one price source (dgs §3).
// Run: node --test scripts/checks/plans-source.test.mjs   (Node 24 strips TS types)
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { test } from "node:test"

import { PLAN_IDS, parsePricing } from "../../src/lib/plans-parse.ts"

// The shape GET ai.uxellent.com/api/public/pricing answers (26.11.2026).
const ANSWER = {
  currency: "ILS",
  plans: [
    { code: "free", name: null, monthly: 0, yearlyPerMonth: 0, yearlyTotal: 0, usd: { monthly: 0, yearlyPerMonth: 0, yearlyTotal: 0 }, aiActionsPerMonth: 20 },
    { code: "basic", name: "מתחילים", monthly: 60, yearlyPerMonth: 48, yearlyTotal: 576, usd: { monthly: 20, yearlyPerMonth: 16, yearlyTotal: 192 }, aiActionsPerMonth: 50 },
    { code: "plus", name: "עסקי", monthly: 100, yearlyPerMonth: 80, yearlyTotal: 960, usd: { monthly: 30, yearlyPerMonth: 24, yearlyTotal: 288 }, aiActionsPerMonth: 100 },
    { code: "pro", name: "פרו", monthly: 200, yearlyPerMonth: 160, yearlyTotal: 1920, usd: { monthly: 60, yearlyPerMonth: 48, yearlyTotal: 576 }, aiActionsPerMonth: 200 },
  ],
}
const FEATURES = JSON.parse(readFileSync(new URL("../../data/plan-features.json", import.meta.url), "utf8"))

test("platform codes map to the site's ids: basic ⟵ start, plus ⟵ business", () => {
  const plans = parsePricing(ANSWER, FEATURES)
  assert.deepEqual(Object.keys(plans).sort(), [...PLAN_IDS].sort())
  assert.equal(plans.start.priceIlsMonth, 60)
  assert.equal(plans.business.priceIlsMonth, 100)
  assert.equal(plans.pro.priceIlsMonth, 200)
})

test("prices, yearly per month, USD and the AI quota come from the endpoint", () => {
  const { start } = parsePricing(ANSWER, FEATURES)
  assert.equal(start.priceIlsYear, 48)
  assert.equal(start.priceUsdMonth, 20)
  assert.equal(start.priceUsdYear, 16)
  assert.equal(start.aiActionsMonth, 50)
})

test("the card facts come from the site's own file, unchanged from the old snapshot", () => {
  const plans = parsePricing(ANSWER, FEATURES)
  assert.equal(plans.start.backupDays, 30)
  assert.equal(plans.free.backupDays, null)
  assert.equal(plans.business.emailAutomations, true)
  assert.equal(plans.start.emailAutomations, false)
  assert.equal(plans.pro.leadForm, true)
  assert.equal(plans.free.trialDays, null)
})

test("a malformed field is left out, never shown wrong", () => {
  const bad = structuredClone(ANSWER)
  bad.plans[1].monthly = "60"
  bad.plans[2].usd = null
  bad.plans[3].aiActionsPerMonth = -1
  const plans = parsePricing(bad, FEATURES)
  assert.equal(plans.start.priceIlsMonth, undefined)
  assert.equal(plans.start.priceIlsYear, 48)
  assert.equal(plans.business.priceUsdMonth, undefined)
  assert.equal(plans.pro.aiActionsMonth, undefined)
})

test("unknown codes are skipped, a repeated code keeps the first", () => {
  const extra = structuredClone(ANSWER)
  extra.plans.push({ code: "enterprise", monthly: 999 }, { code: "basic", monthly: 1 })
  const plans = parsePricing(extra, FEATURES)
  assert.equal(Object.keys(plans).length, 4)
  assert.equal(plans.start.priceIlsMonth, 60)
})

test("not an ILS plans list ⟵ null (the snapshot is used)", () => {
  assert.equal(parsePricing(null, FEATURES), null)
  assert.equal(parsePricing({ ok: false }, FEATURES), null)
  assert.equal(parsePricing({ ...ANSWER, currency: "USD" }, FEATURES), null)
  assert.equal(parsePricing({ currency: "ILS", plans: [] }, FEATURES), null)
  // the old site-side shape (id / price_ils_month) is not read as prices
  assert.equal(parsePricing({ plans: [{ id: "start", price_ils_month: 60 }] }, FEATURES), null)
})

test("no features file ⟵ prices still show, the fact lines go", () => {
  const plans = parsePricing(ANSWER, undefined)
  assert.equal(plans.start.priceIlsMonth, 60)
  assert.equal(plans.start.backupDays, undefined)
  assert.equal(plans.start.leadForm, undefined)
})

test("the committed snapshot parses (the site cannot boot without it)", () => {
  const snap = JSON.parse(readFileSync(new URL("../../data/plans.snapshot.json", import.meta.url), "utf8"))
  const plans = parsePricing(snap, FEATURES)
  assert.ok(plans)
  for (const id of PLAN_IDS) assert.equal(typeof plans[id]?.priceIlsMonth, "number", id)
})

// dhh: the international display switch comes from the platform; anything unknown is "ils"
import { parseIntlDisplay } from "../../src/lib/plans-parse.ts"

test("the international display switch: the three settings, and shekels for anything else", () => {
  assert.equal(parseIntlDisplay({ ...ANSWER, international: { display: "usd" } }), "usd")
  assert.equal(parseIntlDisplay({ ...ANSWER, international: { display: "usd+ils" } }), "usd+ils")
  assert.equal(parseIntlDisplay({ ...ANSWER, international: { display: "ils" } }), "ils")
  assert.equal(parseIntlDisplay(ANSWER), "ils")
  assert.equal(parseIntlDisplay({ ...ANSWER, international: { display: "eur" } }), "ils")
  assert.equal(parseIntlDisplay({ ...ANSWER, international: "usd" }), "ils")
  assert.equal(parseIntlDisplay(null), "ils")
})

// SEC-agent6 (27.11, ux#17 דלתת dij): the yearly total comes from the source (yearlyTotal), never per-month × 12 in the site
test("the yearly totals are the endpoint's yearlyTotal, as given", () => {
  const odd = { currency: "ILS", plans: [{ code: "basic", monthly: 60, yearlyPerMonth: 48, yearlyTotal: 575, usd: { monthly: 15, yearlyPerMonth: 12, yearlyTotal: 143 } }] }
  const p = parsePricing(odd, FEATURES).start
  assert.equal(p.priceIlsYearTotal, 575)
  assert.equal(p.priceUsdYearTotal, 143)
  const none = parsePricing({ currency: "ILS", plans: [{ code: "basic", monthly: 60, yearlyPerMonth: 48 }] }, FEATURES).start
  assert.equal(none.priceIlsYearTotal, undefined)
})

test("plan-fill never multiplies a price by 12", () => {
  const src = readFileSync(new URL("../../src/app/_home/plan-fill.ts", import.meta.url), "utf8")
  assert.doesNotMatch(src, /\*\s*12\b/)
  assert.doesNotMatch(src, /\b12\s*\*/)
})

// dij · #2996: the Israeli base + VAT come from the platform (ilsVat), kept only when they add up to the price
test("ilsVat: base + VAT per period, as given, only when they add up to the price", () => {
  const src = { currency: "ILS", plans: [{ code: "basic", monthly: 60, yearlyPerMonth: 48, yearlyTotal: 576,
    ilsVat: { monthly: { net: 50.85, vat: 9.15 }, yearlyPerMonth: { net: 40.68, vat: 7.32 }, yearlyTotal: { net: 488.14, vat: 87.86 } } }] }
  const v = parsePricing(src, FEATURES).start.vatIls
  assert.deepEqual(v.month, { net: 50.85, vat: 9.15 })
  assert.deepEqual(v.yearPerMonth, { net: 40.68, vat: 7.32 })
  assert.deepEqual(v.yearTotal, { net: 488.14, vat: 87.86 })
  const off = { currency: "ILS", plans: [{ code: "basic", monthly: 60, yearlyPerMonth: 48, ilsVat: { monthly: { net: 50.84, vat: 9.15 }, yearlyPerMonth: { net: "40.68", vat: 7.32 } } }] }
  assert.equal(parsePricing(off, FEATURES).start.vatIls, undefined, "a split that does not add up, or is not a number, is dropped")
  assert.equal(parsePricing({ currency: "ILS", plans: [{ code: "basic", monthly: 60 }] }, FEATURES).start.vatIls, undefined)
})

test("plan-fill never computes VAT (no rate, no 1.18, no division)", () => {
  const src = readFileSync(new URL("../../src/app/_home/plan-fill.ts", import.meta.url), "utf8")
  assert.doesNotMatch(src, /vatRate|\b1\.18\b|\b0\.18\b|\/\s*1\.|\*\s*0\.\d/)
})
