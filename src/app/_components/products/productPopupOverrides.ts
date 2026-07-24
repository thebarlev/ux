import type { LeadSource } from "@/app/_components/home/Popup"

export type PopupIconVariant = "default" | "develop-ai"

export type PopupOverride = {
  title: string
  description: string
  toptext?: string
  source?: LeadSource
  iconVariant?: PopupIconVariant
  pagePathOverride?: string
}

export const POPUP_OVERRIDES_BY_PATH: Record<string, PopupOverride> = {
  "/develop-ai": {
    title: "פיתוח בהתאמה אישית בסביבת AI",
    description: "מאפיינים מעצבים ומפתחים מערכת פנימית בהתאמה מלאה",
    iconVariant: "develop-ai",
    pagePathOverride: "/develop-ai",
  },
  "/en/develop-ai": {
    title: "AI-Powered Custom Development",
    description: "We spec, design and build internal systems tailored to your business.",
    iconVariant: "develop-ai",
    pagePathOverride: "/en/develop-ai",
  },
}


