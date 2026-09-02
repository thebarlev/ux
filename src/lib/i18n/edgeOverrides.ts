import { get } from "@vercel/edge-config"

export const EDGE_CONFIG_KEY = "dictionary_overrides"

export type DictionaryOverrides = { he?: unknown; en?: unknown }

/** Live he/en copy overrides written by /admin, layered over the base
 *  he.json/en.json at request time. Returns {} whenever Edge Config isn't
 *  configured (no EDGE_CONFIG env var) or the read fails — the site must
 *  keep working off the static JSON either way. */
export async function readOverrides(): Promise<DictionaryOverrides> {
  if (!process.env.EDGE_CONFIG) return {}
  try {
    const value = await get<DictionaryOverrides>(EDGE_CONFIG_KEY)
    return value ?? {}
  } catch {
    return {}
  }
}
