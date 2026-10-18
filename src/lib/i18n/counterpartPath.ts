/** Pure path mapping between a Hebrew URL and its /en counterpart. No Node
 *  APIs, so it's safe in middleware (edge), client components, and server
 *  components alike. Replaces the inline copy that used to live in
 *  RedesignHeader.tsx — same behavior, single source of truth now that the
 *  language switch and the geo-redirect middleware both need it. */
export function isEnglishPath(pathname: string): boolean {
  return pathname === "/en" || pathname.startsWith("/en/")
}

export function localeOfPath(pathname: string): "he" | "en" {
  return isEnglishPath(pathname) ? "en" : "he"
}

export function counterpartPath(pathname: string): string {
  if (pathname === "/en") return "/"
  if (pathname.startsWith("/en/")) return pathname.slice(3) || "/"
  if (pathname === "/") return "/en"
  return `/en${pathname}`
}
