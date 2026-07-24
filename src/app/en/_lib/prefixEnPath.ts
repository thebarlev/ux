/**
 * Prefixes an internal path with /en for English locale.
 * Returns href unchanged for external URLs, hashes, mailto, tel, or paths already under /en.
 */
export function prefixEnPath(href: string): string {
  if (typeof href !== "string" || !href.trim()) return href
  const trimmed = href.trim()
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return href
  }
  if (trimmed.startsWith("#") || trimmed.startsWith("mailto:") || trimmed.startsWith("tel:")) {
    return href
  }
  if (trimmed.startsWith("/en")) {
    return href
  }
  if (!trimmed.startsWith("/")) {
    return href
  }
  const pathEnd = trimmed.search(/[?#]/)
  const path = pathEnd >= 0 ? trimmed.slice(0, pathEnd) : trimmed
  const rest = pathEnd >= 0 ? trimmed.slice(pathEnd) : ""
  const prefixed = path === "/" ? "/en" : `/en${path}`
  return prefixed + rest
}
