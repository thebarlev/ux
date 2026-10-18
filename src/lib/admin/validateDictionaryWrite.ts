import "server-only"
import { getAtPath } from "@/lib/i18n/dictionaryPath"
import { getDictionary, type Locale } from "@/content/i18n/dictionary"

const MAX_VALUE_LENGTH = 2000
/** Blocks any tag-like content outright. Every dictionary string renders as
 *  plain React text (never dangerouslySetInnerHTML), so this is defense in
 *  depth, not the only thing standing between a write and script injection. */
const HTML_LIKE = /[<>]/

export type ValidationResult = { ok: true } | { ok: false; error: string }

/** A write is only ever a replacement of an EXISTING string leaf: the path
 *  must already resolve to a string in the shipped he.json/en.json. That
 *  alone rules out both "new key" and "non-string value" — there's no
 *  separate schema to keep in sync, the static dictionary IS the schema. */
export function validateDictionaryWrite(locale: Locale, path: string, value: unknown): ValidationResult {
  if (typeof path !== "string" || path.length === 0 || path.length > 200) {
    return { ok: false, error: "invalid_path" }
  }
  if (typeof value !== "string") {
    return { ok: false, error: "value_must_be_string" }
  }
  if (value.length > MAX_VALUE_LENGTH) {
    return { ok: false, error: "value_too_long" }
  }
  if (HTML_LIKE.test(value)) {
    return { ok: false, error: "value_must_not_contain_markup" }
  }
  const existing = getAtPath(getDictionary(locale), path)
  if (typeof existing !== "string") {
    return { ok: false, error: "path_not_an_existing_string_key" }
  }
  return { ok: true }
}
