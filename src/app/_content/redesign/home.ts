import { getDictionary, type Locale } from "@/content/i18n/dictionary"

export const PLATFORM_URL = "https://uxellent.site"
export const PROMPT_MAX_LENGTH = 120

export function getHomeContent(locale: Locale = "he") {
  return getDictionary(locale).home
}
