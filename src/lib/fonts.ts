import { preload } from "react-dom"

/** 052: the fonts are hosted with the site (src/app/fonts.css), not downloaded
 *  from Google when building. Same as next/font did before: the Hebrew and
 *  Latin files of Heebo and Assistant are preloaded on every page (every page
 *  has the cookie banner in Heebo and the layout in Assistant), and the other
 *  ranges load only when a page uses them. */
const PRELOAD = [
  "/fonts/heebo-hebrew.5272f40e.woff2",
  "/fonts/heebo-latin.5968ef50.woff2",
  "/fonts/assistant-hebrew.4889f1d1.woff2",
  "/fonts/assistant-latin.93ba70e4.woff2",
]

/** Called by each root layout while it renders. */
export function preloadFonts() {
  for (const href of PRELOAD) preload(href, { as: "font", type: "font/woff2", crossOrigin: "anonymous" })
}

/** The class that sets --font-assistant on <html> (was next/font's .variable). */
export const ASSISTANT_VARIABLE = "ux-font-assistant"
