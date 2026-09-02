/** Walks a dot-separated path (array indices as plain numeric segments,
 *  e.g. "blog.rows.0.title") through a nested dictionary object. */
export function getAtPath(obj: unknown, path: string): unknown {
  const segments = path.split(".")
  let current: unknown = obj
  for (const segment of segments) {
    if (current === null || typeof current !== "object") return undefined
    current = (current as Record<string, unknown>)[segment]
  }
  return current
}

/** Returns a new object with the string leaf at `path` replaced by `value`.
 *  Only ever called after the caller has confirmed the existing value at
 *  that path is itself a string — see admin/validate.ts. */
export function setAtPath<T>(obj: T, path: string, value: string): T {
  const segments = path.split(".")
  const clone = structuredClone(obj) as Record<string, unknown>
  let current: Record<string, unknown> = clone
  for (let i = 0; i < segments.length - 1; i++) {
    current = current[segments[i]] as Record<string, unknown>
  }
  current[segments[segments.length - 1]] = value
  return clone as T
}

/** Deep-merges a sparse overrides tree (same shape/subset of the base
 *  dictionary, string leaves only) over the base dictionary. Arrays are
 *  merged index-by-index so a single overridden row doesn't require
 *  restating the whole array. */
export function deepMergeDictionary<T>(base: T, overrides: unknown): T {
  if (overrides === null || overrides === undefined) return base
  if (Array.isArray(base)) {
    if (!Array.isArray(overrides)) return base
    return base.map((item, i) => deepMergeDictionary(item, overrides[i])) as unknown as T
  }
  if (typeof base === "object" && base !== null) {
    if (typeof overrides !== "object" || overrides === null) return base
    const result: Record<string, unknown> = { ...(base as Record<string, unknown>) }
    for (const key of Object.keys(overrides as Record<string, unknown>)) {
      if (key in result) {
        result[key] = deepMergeDictionary(result[key], (overrides as Record<string, unknown>)[key])
      }
    }
    return result as T
  }
  return typeof overrides === typeof base ? (overrides as T) : base
}

/** Flattens all string leaves of a dictionary into dot-path entries, for the
 *  admin search UI. Skips non-string leaves (numbers, discriminator unions,
 *  etc.) — those stay code-owned, not admin-editable. */
export function flattenStringLeaves(obj: unknown, prefix = ""): { path: string; value: string }[] {
  const out: { path: string; value: string }[] = []
  if (typeof obj === "string") {
    out.push({ path: prefix, value: obj })
    return out
  }
  if (Array.isArray(obj)) {
    obj.forEach((item, i) => out.push(...flattenStringLeaves(item, prefix ? `${prefix}.${i}` : String(i))))
    return out
  }
  if (obj !== null && typeof obj === "object") {
    for (const [key, val] of Object.entries(obj)) {
      out.push(...flattenStringLeaves(val, prefix ? `${prefix}.${key}` : key))
    }
  }
  return out
}
