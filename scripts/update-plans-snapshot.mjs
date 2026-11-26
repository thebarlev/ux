// Writes data/plans.snapshot.json from the platform's price source.
// Run: node scripts/update-plans-snapshot.mjs   ⟵ the only way that file changes. Never by hand.
import { writeFileSync } from "node:fs"

import { ENDPOINT, SNAPSHOT_PATH, fetchPricing, sameAsSnapshot, serialize } from "./plans-snapshot-lib.mjs"

const data = await fetchPricing().catch((err) => {
  console.error(`✗ plans snapshot: ${ENDPOINT} failed (${err.message}); the snapshot was not changed`)
  process.exit(1)
})
if (sameAsSnapshot(data)) {
  console.log("✓ plans snapshot: already the same as the endpoint")
} else {
  writeFileSync(SNAPSHOT_PATH, serialize(data))
  console.log(`✓ plans snapshot: written from ${ENDPOINT}. Review the diff before committing.`)
}
