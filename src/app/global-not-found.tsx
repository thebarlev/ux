import type { Metadata } from "next"
import { Assistant } from "next/font/google"

import NotFound from "./(he)/not-found"
import "./globals.css"
import "./mobile-type.css"

// Unmatched URLs no longer have a single root layout to render inside (the
// site has (he) and (en) root layouts), so this page brings its own html, font
// and global styles and reuses the existing 404 content.
const assistant = Assistant({
  variable: "--font-assistant",
  subsets: ["hebrew", "latin"],
  weight: ["400", "600", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "העמוד לא נמצא | Uxellent",
  robots: { index: false, follow: true },
}

export default function GlobalNotFound() {
  return (
    <html lang="he" dir="rtl" className={assistant.variable}>
      <body className="antialiased font-sans">
        <NotFound />
      </body>
    </html>
  )
}
