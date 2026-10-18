import he from "./he.json"
import en from "./en.json"
import { readOverrides } from "@/lib/i18n/edgeOverrides"
import { deepMergeDictionary } from "@/lib/i18n/dictionaryPath"

export type Locale = "he" | "en"

const dictionaries = { he, en }

/** The shipped default — always available, build-time, no I/O. Also the
 *  schema /admin validates writes against (see validateDictionaryWrite). */
export function getDictionary(locale: Locale) {
  return dictionaries[locale]
}

/** getDictionary() plus any live /admin edits from Edge Config layered on
 *  top. Async and I/O-bound (falls back to the static dictionary if Edge
 *  Config isn't configured or the read fails), so callers that want live
 *  copy — the redesign pages, /admin itself — read through this instead of
 *  getDictionary() directly. */
export async function getLiveDictionary(locale: Locale) {
  const base = getDictionary(locale)
  const overrides = await readOverrides()
  return deepMergeDictionary(base, overrides[locale])
}

export type Dictionary = typeof he
