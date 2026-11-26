// Build-time check: data/plans.snapshot.json must equal the platform's price
// source, so the fallback the site shows when the endpoint is down is never
// an old price.
//   different   ⟵ fails the build (run node scripts/update-plans-snapshot.mjs)
//   unreachable ⟵ warns and passes: a platform outage must not block deploys
//                  of unrelated site work. The live page still reads the
//                  endpoint itself every 5 minutes.
import { ENDPOINT, fetchPricing, sameAsSnapshot } from "./plans-snapshot-lib.mjs"

let data
try {
  data = await fetchPricing()
} catch (err) {
  console.warn(`⚠ plans snapshot: ${ENDPOINT} unreachable (${err.message}); not checked`)
  process.exit(0)
}
// dhg: one price list per currency, the same ratio on every paid row (today
// ₪ final ÷ $ = 4). A row off the ratio is most likely a typo in the admin.
// A warning, never a failure: the owner may change one price on purpose.
const ratios = data.plans.flatMap((p) => [
  [`${p.code} monthly`, p.monthly, p.usd?.monthly],
  [`${p.code} yearly`, p.yearlyPerMonth, p.usd?.yearlyPerMonth],
]).filter(([, ils, usd]) => ils > 0 && usd > 0).map(([row, ils, usd]) => [row, Math.round((ils / usd) * 1000) / 1000])
if (new Set(ratios.map(([, r]) => r)).size > 1) {
  console.warn(`⚠ plans: the ₪ ÷ $ ratio differs between rows (${ratios.map(([row, r]) => `${row} ${r}`).join(" · ")})`)
}
if (!sameAsSnapshot(data)) {
  console.error("✗ plans snapshot: data/plans.snapshot.json differs from the platform's prices.")
  console.error("  Run: node scripts/update-plans-snapshot.mjs, review the diff, commit.")
  process.exit(1)
}
console.log("✓ plans snapshot: same as the platform's prices")
