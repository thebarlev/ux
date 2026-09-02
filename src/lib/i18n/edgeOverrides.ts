import { get } from "@vercel/global-config"

export const EDGE_CONFIG_KEY = "dictionary_overrides"

export type DictionaryOverrides = { he?: unknown; en?: unknown }

/** Live he/en copy overrides written by /admin, layered over the base
 *  he.json/en.json at request time. Returns {} whenever Global Config
 *  (formerly Edge Config) isn't configured — no GLOBAL_CONFIG/EDGE_CONFIG
 *  connection string — or the read fails — the site must keep working off
 *  the static JSON either way. @vercel/global-config reads
 *  process.env.GLOBAL_CONFIG, falling back to process.env.EDGE_CONFIG. */
export async function readOverrides(): Promise<DictionaryOverrides> {
  if (!process.env.GLOBAL_CONFIG && !process.env.EDGE_CONFIG) return {}
  try {
    const value = await get<DictionaryOverrides>(EDGE_CONFIG_KEY)
    return value ?? {}
  } catch {
    return {}
  }
}
