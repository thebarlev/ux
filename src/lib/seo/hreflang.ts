/**
 * hreflang alternates for paired Hebrew / English marketing routes.
 * x-default points to the Hebrew URL (primary market).
 */
export function heEnAlternateLanguages(hePath: string, enPath: string) {
  return {
    "he-IL": hePath,
    en: enPath,
    "x-default": hePath,
  } as const
}
