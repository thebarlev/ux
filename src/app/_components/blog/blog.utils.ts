import type { BlogCategory, BlogSort } from "./blog.constants"

function firstString(value: unknown): string {
  if (typeof value === "string") return value
  if (Array.isArray(value)) return typeof value[0] === "string" ? value[0] : ""
  return ""
}

export function coerceBlogCategory(value: unknown): BlogCategory {
  const v = firstString(value)
  switch (v) {
    case "web_development":
    case "automation":
    case "marketing":
    case "ai_accountant":
    case "other":
      return v
    default:
      return "all"
  }
}

export function coerceBlogSort(value: unknown): BlogSort {
  const v = firstString(value)
  return v === "oldest" ? "oldest" : "newest"
}

export function parseTagsParam(value: unknown): string[] {
  const raw = typeof value === "string" ? value : Array.isArray(value) ? value.join(",") : ""
  if (!raw) return []
  return raw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 12)
}

export function formatDateHe(dateLike: string | Date): string {
  const d = typeof dateLike === "string" ? new Date(dateLike) : dateLike
  if (!(d instanceof Date) || Number.isNaN(d.getTime())) return ""
  return new Intl.DateTimeFormat("he-IL", { dateStyle: "medium" }).format(d)
}

export function getCategoryLabel(category: string): string {
  switch (category) {
    case "web_development":
      return "פיתוח אתרים"
    case "automation":
      return "אוטומציות"
    case "marketing":
      return "שיווק"
    case "ai_accountant":
      return 'רו״ח AI'
    case "other":
    default:
      return "אחר"
  }
}

export function formatDateEn(dateLike: string | Date): string {
  const d = typeof dateLike === "string" ? new Date(dateLike) : dateLike
  if (!(d instanceof Date) || Number.isNaN(d.getTime())) return ""
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(d)
}

export function getCategoryLabelEn(category: string): string {
  switch (category) {
    case "web_development":
      return "Web development"
    case "automation":
      return "Automation"
    case "marketing":
      return "Marketing"
    case "ai_accountant":
      return "AI Accountant"
    case "other":
    default:
      return "Other"
  }
}

