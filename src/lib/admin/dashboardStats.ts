import "server-only"
import { get } from "@vercel/global-config"
import {
  EDGE_CONFIG_KEY,
  EDGE_CONFIG_META_KEY,
  type DictionaryOverrides,
  type DictionaryOverridesMeta,
} from "@/lib/i18n/edgeOverrides"
import { flattenStringLeaves } from "@/lib/i18n/dictionaryPath"

export type SystemStatus = "ok" | "not_configured" | "error"

export type DashboardStats = {
  editedCount: number
  lastUpdatedAt: string | null
  systemStatus: SystemStatus
}

/** Reads Global Config directly (not via readOverrides, which swallows
 *  errors so the public site degrades to static JSON) — the dashboard needs
 *  to tell "not configured" apart from "configured but the read failed". */
export async function getDashboardStats(): Promise<DashboardStats> {
  if (!process.env.GLOBAL_CONFIG && !process.env.EDGE_CONFIG) {
    return { editedCount: 0, lastUpdatedAt: null, systemStatus: "not_configured" }
  }

  try {
    const [overrides, meta] = await Promise.all([
      get<DictionaryOverrides>(EDGE_CONFIG_KEY),
      get<DictionaryOverridesMeta>(EDGE_CONFIG_META_KEY),
    ])
    const hePaths = flattenStringLeaves(overrides?.he ?? {}).map((leaf) => leaf.path)
    const enPaths = flattenStringLeaves(overrides?.en ?? {}).map((leaf) => leaf.path)
    return {
      editedCount: new Set([...hePaths, ...enPaths]).size,
      lastUpdatedAt: meta?.lastUpdatedAt ?? null,
      systemStatus: "ok",
    }
  } catch {
    return { editedCount: 0, lastUpdatedAt: null, systemStatus: "error" }
  }
}
