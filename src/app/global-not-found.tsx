import type { Metadata } from "next"
import { ASSISTANT_VARIABLE, preloadFonts } from "@/lib/fonts"

import NotFound from "./(he)/not-found"
import { ConsentBanner } from "./_home/ConsentBanner"
import "./fonts.css"
import "./globals.css"
import "./mobile-type.css"
import "./text-links.css"

// Unmatched URLs no longer have a single root layout to render inside (the
// site has (he) and (en) root layouts), so this page brings its own html, font
// and global styles and reuses the existing 404 content.

export const metadata: Metadata = {
  title: "העמוד לא נמצא | UXellent",
  robots: { index: false, follow: true },
}

export default function GlobalNotFound() {
  preloadFonts()
  return (
    <html lang="he" dir="rtl" className={ASSISTANT_VARIABLE}>
      <body className="antialiased font-sans">
        <NotFound />
        <ConsentBanner lang="he" />
      </body>
    </html>
  )
}
