/** Platform start page; the prompt text goes along as ?p= (encoded). */
export const PLATFORM_START_URL = "https://ai.uxellent.com/start"

/**
 * The accessibility sentence in "built right" (נגיש לכולם / Accessible to
 * everyone). One string per language, kept here so the wording can be swapped
 * before launch without touching the generated markup.
 */
export const A11Y_COPY = {
  he: "בנוי לפי תקן הנגישות הישראלי: ניווט במקלדת, קורא מסך, טקסט חלופי לתמונות.",
  en: "Built to WCAG accessibility guidelines: keyboard navigation, screen reader support, alt text on every image.",
} as const

/** Routes rendered from the approved sheets (home tbl-019, pricing tbl-020). */
export const SHEET_PAGES: ReadonlySet<string> = new Set(["/", "/en", "/pricing", "/en/pricing"])
