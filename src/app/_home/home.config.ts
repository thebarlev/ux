/**
 * The accessibility sentence in "built right" (נגיש לכולם / Accessible to
 * everyone). One string per language, kept here so the wording can be swapped
 * before launch without touching the generated markup.
 */
export const A11Y_COPY = {
  // tbl-023: nothing after this sentence until the platform sites have been tested
  he: "נבנה עם נגישות בראש.",
  en: "Built with accessibility in mind.",
} as const

/** Routes rendered from the approved sheets (home tbl-019, pricing tbl-020, contact tbl-022, FAQ and text pages tbl-023). */
export const TEXT_PAGES = ["privacy", "terms", "accessibility", "account-deletion"] as const
export const SHEET_PAGES: ReadonlySet<string> = new Set([
  "/", "/en", "/pricing", "/en/pricing", "/contact", "/en/contact", "/faq", "/en/faq",
  ...TEXT_PAGES.flatMap((p) => [`/${p}`, `/en/${p}`]),
])
