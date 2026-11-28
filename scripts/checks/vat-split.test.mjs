// dij · #2996: the Hebrew base + VAT line reads the platform's split and never computes VAT.
// Run: node --test scripts/checks/vat-split.test.mjs
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { test } from "node:test"

import { addsUpTo, agorot, parseVatSplits } from "../../src/lib/vat-split-parse.ts"

const root = new URL("../../", import.meta.url)
const read = (p) => readFileSync(new URL(p, root), "utf8")

const LIVE = {
  currency: "ILS",
  plans: [
    { code: "free", ilsVat: { monthly: { net: 0, vat: 0 }, yearlyPerMonth: { net: 0, vat: 0 } } },
    { code: "basic", ilsVat: { monthly: { net: 50.85, vat: 9.15 }, yearlyPerMonth: { net: 40.68, vat: 7.32 } } },
    { code: "plus", ilsVat: { monthly: { net: 84.75, vat: 15.25 }, yearlyPerMonth: { net: 67.8, vat: 12.2 } } },
    { code: "pro", ilsVat: { monthly: { net: 169.49, vat: 30.51 }, yearlyPerMonth: { net: 135.59, vat: 24.41 } } },
  ],
}

test("the platform's codes map to the site's ids, the split as given", () => {
  const v = parseVatSplits(LIVE)
  assert.deepEqual(Object.keys(v).sort(), ["business", "pro", "start"])
  assert.deepEqual(v.start.month, { net: 50.85, vat: 9.15 })
  assert.deepEqual(v.business.yearPerMonth, { net: 67.8, vat: 12.2 })
})

test("a split is shown only when it adds up to the price on the card, to the agora", () => {
  const v = parseVatSplits(LIVE)
  assert.ok(addsUpTo(v.start.month, 60))
  assert.ok(addsUpTo(v.start.yearPerMonth, 48))
  assert.ok(addsUpTo(v.pro.month, 200))
  assert.ok(!addsUpTo(v.start.month, 61), "a different price on the card ⟵ no line")
  assert.ok(!addsUpTo(undefined, 60))
  assert.ok(!addsUpTo(v.start.month, undefined))
})

test("anything malformed is left out; not an ILS list ⟵ nothing", () => {
  assert.deepEqual(parseVatSplits({ currency: "USD", plans: LIVE.plans }), {})
  assert.deepEqual(parseVatSplits(null), {})
  const bad = parseVatSplits({ currency: "ILS", plans: [{ code: "basic", ilsVat: { monthly: { net: "50.85", vat: 9.15 } } }, { code: "nope", ilsVat: LIVE.plans[1].ilsVat }] })
  assert.deepEqual(bad, {})
})

test("two decimals always (agorot)", () => {
  assert.equal(agorot(9.1), "9.10")
  assert.equal(agorot(50.85), "50.85")
  assert.equal(agorot(0), "0.00")
})

test("the site never computes VAT (no rate, no 1.18 / 0.18, no division)", () => {
  for (const f of ["src/app/_home/plan-fill.ts", "src/lib/vat-split.ts", "src/lib/vat-split-parse.ts"]) {
    const src = read(f)
    assert.doesNotMatch(src, /vatRate|\b1\.18\b|\b0\.18\b|\/\s*1\.|\*\s*0\.\d/, f)
  }
})

test("the committed snapshot parses (the fallback when the endpoint fails)", () => {
  const v = parseVatSplits(JSON.parse(read("data/vat-split.snapshot.json")))
  assert.deepEqual(Object.keys(v).sort(), ["business", "pro", "start"])
  for (const id of ["start", "business", "pro"]) assert.ok(v[id].month && v[id].yearPerMonth, id)
})
