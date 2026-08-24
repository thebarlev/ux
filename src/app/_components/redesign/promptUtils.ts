import { PLATFORM_URL, PROMPT_MAX_LENGTH } from "@/app/_content/redesign/home"

/** Strips control/bidi tokens and markup-ish characters from the hero prompt,
 *  same rules as the approved home.html demo. Returns null when nothing usable
 *  is left, so callers can disable the send button. */
export function sanitizePrompt(raw: string | null | undefined): string | null {
  if (raw === null || raw === undefined) return null
  let s = String(raw)
    .replace(/CTRL/g, " ")
    .replace(/BIDI/g, " ")
    .replace(/[<>{}\\^`|"]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
  if (s.length > PROMPT_MAX_LENGTH) s = s.slice(0, PROMPT_MAX_LENGTH).trim()
  return s.length ? s : null
}

export function buildPlatformUrl(value: string): string {
  const clean = sanitizePrompt(value)
  return clean ? `${PLATFORM_URL}?p=${encodeURIComponent(clean)}` : PLATFORM_URL
}
