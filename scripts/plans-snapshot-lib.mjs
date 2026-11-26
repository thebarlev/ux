// Shared by update-plans-snapshot.mjs and check-plans-snapshot.mjs, so the
// writer and the checker cannot disagree on the endpoint or on the format.
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { isDeepStrictEqual } from "node:util"

export const ENDPOINT = process.env.PLANS_ENDPOINT || "https://ai.uxellent.com/api/public/pricing"
export const SNAPSHOT_PATH = join(dirname(fileURLToPath(import.meta.url)), "..", "data", "plans.snapshot.json")

/** The endpoint's answer as JSON, or throws (HTTP error, timeout, not JSON, not an ILS plans list). */
export async function fetchPricing() {
  const res = await fetch(ENDPOINT, { signal: AbortSignal.timeout(10000), headers: { accept: "application/json" } })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const data = await res.json()
  if (data?.currency !== "ILS" || !Array.isArray(data?.plans) || data.plans.length === 0) throw new Error("not an ILS plans list")
  return data
}

/** The exact bytes the snapshot is written with. */
export const serialize = (data) => JSON.stringify(data, null, 2) + "\n"

export const readSnapshot = () => JSON.parse(readFileSync(SNAPSHOT_PATH, "utf8"))

export const sameAsSnapshot = (data) => isDeepStrictEqual(readSnapshot(), data)
