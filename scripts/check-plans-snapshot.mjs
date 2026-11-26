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
if (!sameAsSnapshot(data)) {
  console.error("✗ plans snapshot: data/plans.snapshot.json differs from the platform's prices.")
  console.error("  Run: node scripts/update-plans-snapshot.mjs, review the diff, commit.")
  process.exit(1)
}
console.log("✓ plans snapshot: same as the platform's prices")
