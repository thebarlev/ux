import he from "./he.json"
import en from "./en.json"

export type Locale = "he" | "en"

const dictionaries = { he, en }

/** Static dictionaries today. The planned /admin editor will save overrides
 *  to Vercel Edge Config; when that lands, this becomes the one place that
 *  merges an Edge Config read on top of the JSON below — every page already
 *  goes through here, so nothing else has to change. */
export function getDictionary(locale: Locale) {
  return dictionaries[locale]
}

export type Dictionary = typeof he
