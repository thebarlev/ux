import { Assistant } from "next/font/google"

/** The 2026-08 redesign uses weights (300, 500, 800) the site-wide Assistant
 *  loader in layout.tsx doesn't carry, so it gets its own next/font instance
 *  rather than widening the global one. */
export const redesignFont = Assistant({
  variable: "--font-assistant-redesign",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
})
