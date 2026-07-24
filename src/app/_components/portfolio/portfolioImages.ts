import fs from "node:fs"
import path from "node:path"

export type PortfolioImage = { src: string; alt: string }

export function getPortfolioImages(locale: "he" | "en" = "he"): PortfolioImage[] {
  const dir = path.join(process.cwd(), "public", "portfolio")
  let filenames: string[] = []

  try {
    filenames = fs.readdirSync(dir)
  } catch {
    return []
  }

  const numericWebps = filenames
    .filter((name) => /^\d+\.webp$/.test(name))
    .map((name) => ({ name, n: Number.parseInt(name, 10) }))
    .filter((x) => Number.isFinite(x.n))
    .sort((a, b) => a.n - b.n)

  return numericWebps.map((x, idx) => ({
    src: `/portfolio/${x.name}`,
    alt:
      locale === "en"
        ? `Uxellent website development project ${idx + 1} - AI-powered design and digital marketing`
        : `פרויקט פיתוח אתר של Uxellent ${idx + 1} - עיצוב, AI ושיווק דיגיטלי`,
  }))
}
