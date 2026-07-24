import type { PageCategory, TrackingService } from "./dataLayer"

export type PageContext = {
  page_category: PageCategory
  page_slug: string
  service: TrackingService
}

function slugFromPathname(pathname: string): string {
  if (pathname === "/") return "home"
  const trimmed = pathname.replace(/^\/+|\/+$/g, "")
  return trimmed || "home"
}

export function inferPageContext(pathname: string): PageContext {
  const page_slug = slugFromPathname(pathname)

  if (pathname === "/") {
    return { page_category: "home", page_slug, service: "other" }
  }

  if (pathname === "/portfolio") {
    return { page_category: "portfolio", page_slug, service: "other" }
  }

  if (pathname === "/pricing") {
    return { page_category: "pricing", page_slug, service: "other" }
  }

  // Service pages in this repo (not nested under /services/*)
  if (
    pathname === "/design" ||
    pathname === "/develop" ||
    pathname === "/roi" ||
    pathname === "/idea-to-product" ||
    pathname === "/en/idea-to-product"
  ) {
    return { page_category: "service", page_slug, service: "web_development" }
  }

  if (pathname === "/seo-ai" || pathname === "/en/seo-ai") {
    return { page_category: "service", page_slug, service: "marketing" }
  }

  if (pathname === "/marketing" || pathname.startsWith("/marketing/")) {
    return { page_category: "service", page_slug, service: "marketing" }
  }

  // Product pages (not service, but still can map service for segmentation if desired)
  if (pathname === "/account-ai") {
    return { page_category: "other", page_slug, service: "ai_accountant" }
  }

  return { page_category: "other", page_slug, service: "other" }
}

export function mapLeadSourceToService(leadSource: string | undefined): TrackingService {
  switch (leadSource) {
    case "design_development":
      return "web_development"
    case "digital_marketing":
      return "marketing"
    case "smart_accounting_ai":
      return "ai_accountant"
    case "automation":
      return "automation"
    default:
      return "other"
  }
}

