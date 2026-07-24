import { promises as fs } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const ROOT_DIR = path.resolve(__dirname, "..")
const APP_DIR = path.join(ROOT_DIR, "src", "app")
const OUTPUT_FILE = path.join(ROOT_DIR, "public", "ai-sitemap.json")

const SITE_URL = "https://uxellent.com"
const DESCRIPTION =
  "AI-powered accountant, digital invoicing and website development platform."

const EXCLUDED_SEGMENTS = new Set([
  "api",
  "admin",
  "dashboard",
  "auditor",
  "privacy",
  "terms",
  "accessibility",
  "account-deletion",
  "checkout",
])

function isRouteGroup(segment) {
  return segment.startsWith("(") && segment.endsWith(")")
}

function isDynamicSegment(segment) {
  return segment.includes("[") || segment.includes("]")
}

async function getPageFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true })
  const pageFiles = []

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name)

    if (entry.isDirectory()) {
      pageFiles.push(...(await getPageFiles(fullPath)))
      continue
    }

    if (entry.isFile() && entry.name === "page.tsx") {
      pageFiles.push(fullPath)
    }
  }

  return pageFiles
}

async function isRedirectPage(filePath) {
  const content = await fs.readFile(filePath, "utf8")
  return /\b(permanentRedirect|redirect)\(/.test(content)
}

function toRoutePath(filePath) {
  const relativeDirectory = path.relative(APP_DIR, path.dirname(filePath))
  const segments =
    relativeDirectory === "" ? [] : relativeDirectory.split(path.sep)

  if (
    segments.some(
      (segment) =>
        EXCLUDED_SEGMENTS.has(segment) ||
        isRouteGroup(segment) ||
        isDynamicSegment(segment),
    )
  ) {
    return null
  }

  return segments.length === 0 ? "/" : `/${segments.join("/")}`
}

function inferPageType(routePath) {
  if (routePath === "/") return "homepage"
  if (routePath === "/en") return "homepage_en"

  const localizedPath =
    routePath === "/en"
      ? "/"
      : routePath.startsWith("/en/")
        ? routePath.slice(3)
        : routePath

  if (localizedPath === "/account-ai" || localizedPath === "/invoice") {
    return "product"
  }

  if (localizedPath === "/blog") return "blog"

  if (localizedPath.includes("seo")) return "seo"

  if (
    localizedPath === "/design" ||
    localizedPath.includes("develop")
  ) {
    return "development"
  }

  if (
    localizedPath === "/marketing/ppc" ||
    localizedPath === "/portfolio" ||
    localizedPath === "/pricing" ||
    localizedPath === "/roi"
  ) {
    return "services"
  }

  return "page"
}

function toAbsoluteUrl(routePath) {
  return routePath === "/" ? SITE_URL : `${SITE_URL}${routePath}`
}

function getTypeRank(type) {
  switch (type) {
    case "homepage":
    case "homepage_en":
      return 0
    case "product":
      return 1
    case "services":
    case "seo":
    case "development":
      return 2
    case "blog":
      return 3
    default:
      return 4
  }
}

async function main() {
  const pageFiles = await getPageFiles(APP_DIR)
  const routePaths = []

  for (const filePath of pageFiles) {
    const routePath = toRoutePath(filePath)
    if (!routePath) continue
    if (await isRedirectPage(filePath)) continue
    routePaths.push(routePath)
  }

  const uniqueRoutePaths = [...new Set(routePaths)].sort((a, b) => {
    const typeDelta = getTypeRank(inferPageType(a)) - getTypeRank(inferPageType(b))
    if (typeDelta !== 0) return typeDelta
    return a.localeCompare(b)
  })

  const priorityPages = uniqueRoutePaths.map((routePath) => ({
    url: toAbsoluteUrl(routePath),
    type: inferPageType(routePath),
  }))

  const payload = {
    site: SITE_URL,
    brand: "VOW",
    description: DESCRIPTION,
    generated_at: new Date().toISOString(),
    priority_pages: priorityPages,
  }

  await fs.writeFile(OUTPUT_FILE, `${JSON.stringify(payload, null, 2)}\n`, "utf8")

  console.log("Discovered routes:")
  for (const routePath of uniqueRoutePaths) {
    console.log(`- ${routePath}`)
  }
  console.log(`\nGenerated ${OUTPUT_FILE}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
