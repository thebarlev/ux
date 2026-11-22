// Analytics phase 1: pure helpers (attribution cookie, links into the app).
// Run: node --test scripts/checks/analytics-phase1.test.mjs   (Node 24 strips TS types)
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { test } from "node:test"

import {
  buildTouch, cookieDomainFor, externalReferrerHost, mergeTouch, parseAttr, sanitizeValue, serializeAttr,
} from "../../src/lib/tracking/attributionCookie.ts"
import { isDuplicateClick, parseAppUrl, planFromAppUrl, withEnglishLang } from "../../src/lib/tracking/appCtaLink.ts"

const NOW = new Date("2026-11-22T10:00:00.000Z")

test("sanitize drops e-mail and phone-like values, caps length", () => {
  assert.equal(sanitizeValue(" google "), "google")
  assert.equal(sanitizeValue("dan@example.com"), undefined)
  assert.equal(sanitizeValue("050-123-4567"), undefined)
  assert.equal(sanitizeValue("summer_2026"), "summer_2026")
  assert.equal(sanitizeValue("x".repeat(300)).length, 100)
  assert.equal(sanitizeValue(""), undefined)
})

test("referrer: external host only, never our own domains or the path", () => {
  assert.equal(externalReferrerHost("https://www.google.com/search?q=private"), "www.google.com")
  assert.equal(externalReferrerHost("https://uxellent.com/en"), undefined)
  assert.equal(externalReferrerHost("https://ai.uxellent.com/start"), undefined)
  assert.equal(externalReferrerHost("not a url"), undefined)
  assert.equal(externalReferrerHost(""), undefined)
})

test("touch: none for a direct visit; landing path without query", () => {
  assert.equal(buildTouch({}, "", "/en", "en", NOW), null)
  const t = buildTouch({ utm_source: "reddit", utm_campaign: "launch", utm_term: "a@b.c" }, "", "/en/pricing?p=secret", "en", NOW)
  assert.deepEqual(t, { ts: NOW.toISOString(), source: "reddit", campaign: "launch", lp: "/en/pricing", lang: "en" })
  assert.ok(!JSON.stringify(t).includes("secret"))
})

test("first touch kept, last touch follows; a direct visit changes nothing", () => {
  const a = buildTouch({ utm_source: "google" }, "", "/", "he", NOW)
  const b = buildTouch({}, "https://www.linkedin.com/feed", "/blog", "he", new Date("2026-11-23T00:00:00Z"))
  const first = mergeTouch(null, a)
  assert.equal(mergeTouch(first, null), first)
  const second = mergeTouch(first, b)
  assert.equal(second.ft.source, "google")
  assert.equal(second.lt.ref, "www.linkedin.com")
})

test("cookie round trip and rejection of garbage / other versions", () => {
  const c = mergeTouch(null, buildTouch({ utm_source: "tiktok" }, "", "/", "he", NOW))
  assert.deepEqual(parseAttr(serializeAttr(c)), c)
  assert.equal(parseAttr("%7Bbad"), null)
  assert.equal(parseAttr(encodeURIComponent(JSON.stringify({ ...c, v: 9 }))), null)
  assert.ok(!serializeAttr(c).includes(";"))
})

test("cookie domain: shared on uxellent.com, host-only elsewhere", () => {
  assert.equal(cookieDomainFor("uxellent.com"), ".uxellent.com")
  assert.equal(cookieDomainFor("www.uxellent.com"), ".uxellent.com")
  assert.equal(cookieDomainFor("localhost"), undefined)
  assert.equal(cookieDomainFor("x.vercel.app"), undefined)
  assert.equal(cookieDomainFor("evil-uxellent.com"), undefined)
})

test("app links: only ai.uxellent.com; lang=en added on English pages only, once", () => {
  assert.equal(parseAppUrl("https://app.uxellent.com/auditor"), null)
  assert.ok(parseAppUrl("https://ai.uxellent.com"))
  assert.equal(withEnglishLang("https://ai.uxellent.com", "he"), null)
  assert.equal(withEnglishLang("https://ai.uxellent.com", "en"), "https://ai.uxellent.com/?lang=en")
  assert.equal(
    withEnglishLang("https://ai.uxellent.com?plan=pro&billing=yearly", "en"),
    "https://ai.uxellent.com/?plan=pro&billing=yearly&lang=en",
  )
  assert.equal(withEnglishLang("https://ai.uxellent.com/?lang=en", "en"), null)
  assert.equal(withEnglishLang("https://uxellent.com/en/pricing", "en"), null)
})

test("event plan comes from `plan` only; the description `p` is never read", () => {
  assert.equal(planFromAppUrl(new URL("https://ai.uxellent.com/?plan=pro&p=my%20bakery")), "pro")
  assert.equal(planFromAppUrl(new URL("https://ai.uxellent.com/?p=my%20bakery")), undefined)
  assert.equal(planFromAppUrl(new URL("https://ai.uxellent.com/?plan=<script>")), undefined)
})

test("one click, one event", () => {
  assert.equal(isDuplicateClick(null, "h", 1000), false)
  assert.equal(isDuplicateClick({ href: "h", at: 1000 }, "h", 1500), true)
  assert.equal(isDuplicateClick({ href: "h", at: 1000 }, "h", 2500), false)
  assert.equal(isDuplicateClick({ href: "h", at: 1000 }, "other", 1100), false)
})

test("source guards: no page_view forwarded, consent gate, GA4-only send_to", () => {
  const dl = readFileSync(new URL("../../src/lib/tracking/dataLayer.ts", import.meta.url), "utf8")
  const ga = readFileSync(new URL("../../src/lib/tracking/ga4.ts", import.meta.url), "utf8")
  const cta = readFileSync(new URL("../../src/lib/tracking/appCtaTracking.ts", import.meta.url), "utf8")
  assert.ok(!/sendGa4Event\("page_view"/.test(dl), "page_view must not be sent by hand")
  assert.ok(!/page_language: "he"/.test(dl.split("function getBasePayload")[1].split("return {").pop()), "language must not be hard-coded in the browser payload")
  assert.match(ga, /hasConsentFor\("analytics"\)[\s\S]*send_to: GA_MEASUREMENT_ID/)
  assert.match(cta, /recordAttribution[\s\S]*hasConsentFor\("analytics"\)/)
  assert.ok(!/gclid|fbclid/.test(readFileSync(new URL("../../src/lib/tracking/attributionCookie.ts", import.meta.url), "utf8").split("*/").slice(1).join("")), "no ad identifiers in the cookie")
})

test("review fix: campaign IDs and dated names survive; phone shapes don't", () => {
  assert.equal(sanitizeValue("12345678901"), "12345678901")
  assert.equal(sanitizeValue("bf_2026-11-22"), "bf_2026-11-22")
  assert.equal(sanitizeValue("2026-11-22"), "2026-11-22")
  assert.equal(sanitizeValue("+972501234567"), undefined)
  assert.equal(sanitizeValue("0501234567"), undefined)
  assert.equal(sanitizeValue("050 123 4567"), undefined)
})

test("review fix: a planted cookie is rebuilt from known fields only", () => {
  const planted = { v: 1, ft: { ts: "2026-11-01T00:00:00Z", source: "x", evil: "<script>", lp: "javascript:alert(1)", ref: "a b/c", lang: "fr", term: "dan@x.com" }, lt: { ts: "2026-11-01T00:00:00Z" } }
  const a = parseAttr(encodeURIComponent(JSON.stringify(planted)))
  assert.deepEqual(a.ft, { ts: "2026-11-01T00:00:00.000Z", source: "x" })
  assert.equal(parseAttr(encodeURIComponent(JSON.stringify({ v: 1, ft: { ts: "nope" }, lt: { ts: "nope" } }))), null)
  assert.equal(parseAttr("x".repeat(2001)), null)
  assert.equal(parseAttr(encodeURIComponent(JSON.stringify({ v: 1, ft: 5, lt: null }))), null)
})
