export type BlogCategory =
  | "all"
  | "web_development"
  | "automation"
  | "marketing"
  | "ai_accountant"
  | "other"

export const BLOG_CATEGORIES: ReadonlyArray<{ value: BlogCategory; label: string }> = [
  { value: "all", label: "הכל" },
  { value: "web_development", label: "פיתוח אתרים" },
  { value: "automation", label: "אוטומציות" },
  { value: "marketing", label: "שיווק" },
  { value: "ai_accountant", label: 'רו״ח AI' },
  { value: "other", label: "אחר" },
]

export type BlogSort = "newest" | "oldest"

export const BLOG_SORTS: ReadonlyArray<{ value: BlogSort; label: string }> = [
  { value: "newest", label: "הכי חדש" },
  { value: "oldest", label: "הכי ישן" },
]

export const BLOG_CATEGORIES_EN: ReadonlyArray<{ value: BlogCategory; label: string }> = [
  { value: "all", label: "All" },
  { value: "web_development", label: "Web development" },
  { value: "automation", label: "Automation" },
  { value: "marketing", label: "Marketing" },
  { value: "ai_accountant", label: "AI Accountant" },
  { value: "other", label: "Other" },
]

export const BLOG_SORTS_EN: ReadonlyArray<{ value: BlogSort; label: string }> = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
]

