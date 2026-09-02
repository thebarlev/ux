import "server-only"
import { EDGE_CONFIG_KEY, readOverrides } from "@/lib/i18n/edgeOverrides"

/** Writes go through the Vercel REST API — the read-only @vercel/global-config
 *  SDK has no write path. Requires VERCEL_API_TOKEN (a Global Config-scoped
 *  token, server-only env) and EDGE_CONFIG_ID (the store's id — still that
 *  name in this project's env, the id value itself didn't change with the
 *  Edge Config -> Global Config rename); VERCEL_TEAM_ID is added to the
 *  query string when the store lives under a team. Endpoint path is
 *  /v1/global-config/{id}/items — the old /v1/edge-config/{id}/items path
 *  from before the rename. */
export async function writeOverride(locale: "he" | "en", path: string, value: string): Promise<void> {
  const token = process.env.VERCEL_API_TOKEN
  const configId = process.env.EDGE_CONFIG_ID
  if (!token || !configId) {
    throw new Error("Global Config is not provisioned: set VERCEL_API_TOKEN and EDGE_CONFIG_ID.")
  }

  const current = await readOverrides()
  const patch = buildPathPatch(path, value)
  const nextLocaleOverrides = deepMergeDictionaryLoose(current[locale], patch)
  const nextOverrides = { ...current, [locale]: nextLocaleOverrides }

  const teamQuery = process.env.VERCEL_TEAM_ID ? `?teamId=${encodeURIComponent(process.env.VERCEL_TEAM_ID)}` : ""
  const res = await fetch(`https://api.vercel.com/v1/global-config/${configId}/items${teamQuery}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: [{ operation: "upsert", key: EDGE_CONFIG_KEY, value: nextOverrides }],
    }),
  })
  if (!res.ok) {
    const body = await res.text().catch(() => "")
    throw new Error(`Global Config write failed (${res.status}): ${body.slice(0, 300)}`)
  }
}

/** Builds a sparse object shaped like the dot path, e.g. "blog.rows.0.title"
 *  -> { blog: { rows: [ , , { title: value }] } } (arrays get holes, which
 *  deepMergeDictionary's index-based merge treats as "no override"). */
function buildPathPatch(path: string, value: string): unknown {
  const segments = path.split(".")
  let node: unknown = value
  for (let i = segments.length - 1; i >= 0; i--) {
    const segment = segments[i]
    const isIndex = /^\d+$/.test(segment)
    if (isIndex) {
      const arr: unknown[] = []
      arr[Number(segment)] = node
      node = arr
    } else {
      node = { [segment]: node }
    }
  }
  return node
}

/** Same shape-aware merge as deepMergeDictionary, but without requiring the
 *  key to already exist on `base` — `base` here is the overrides tree itself
 *  (sparse by construction), not the full dictionary. */
function deepMergeDictionaryLoose(base: unknown, patch: unknown): unknown {
  if (Array.isArray(patch)) {
    const result = Array.isArray(base) ? [...base] : []
    patch.forEach((item, i) => {
      if (item !== undefined) result[i] = deepMergeDictionaryLoose(result[i], item)
    })
    return result
  }
  if (patch !== null && typeof patch === "object") {
    const result: Record<string, unknown> = base !== null && typeof base === "object" && !Array.isArray(base) ? { ...(base as Record<string, unknown>) } : {}
    for (const [key, val] of Object.entries(patch as Record<string, unknown>)) {
      result[key] = deepMergeDictionaryLoose(result[key], val)
    }
    return result
  }
  return patch
}
