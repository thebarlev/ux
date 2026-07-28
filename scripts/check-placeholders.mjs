/**
 * Fails a production build while any home-section placeholder is still open.
 *
 * The brief (§5) leaves four values for Itzik to supply. Two are now resolved
 * in the repo; the rest are literal placeholder strings so that shipping one by
 * accident is loud rather than silent — a visitor would otherwise land on
 * "[INVOICE_LP_URL]" or submit a lead that Web3Forms drops on the floor.
 *
 * Preview deploys are allowed through so the branch can be reviewed before the
 * values exist. Only VERCEL_ENV=production is gated.
 */
import { readFileSync } from "node:fs"

const SOURCE = "src/app/_components/new-home/homeSections.constants.ts"

const PLACEHOLDERS = [
  { token: "WEB3FORMS_ACCESS_KEY", note: "Web3Forms access key (brief §3)" },
  { token: "[GOOGLE_REVIEWS_URL]", note: "Google Business Profile reviews URL" },
]

const isProduction = process.env.VERCEL_ENV === "production"
const source = readFileSync(SOURCE, "utf8")

// Matches only the assigned string literal, so the surrounding prose comments
// explaining each placeholder do not count as occurrences.
const unresolved = PLACEHOLDERS.filter(({ token }) =>
  source.includes(`= "${token}"`)
)

if (unresolved.length === 0) {
  console.log("✓ placeholders: all home-section values resolved")
  process.exit(0)
}

const lines = unresolved.map((p) => `  · ${p.token} — ${p.note}`).join("\n")

if (!isProduction) {
  console.log(
    `▲ placeholders: ${unresolved.length} still open (allowed outside production)\n${lines}`
  )
  process.exit(0)
}

console.error(
  `✗ placeholders: ${unresolved.length} unresolved value(s) in ${SOURCE}.\n` +
    `${lines}\n` +
    `Resolve them before deploying to production.`
)
process.exit(1)
