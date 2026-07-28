import type { ReactNode } from "react"

/**
 * Isolates a Latin run inside RTL Hebrew copy. Without `unicode-bidi: isolate`
 * the bidi algorithm reorders the surrounding punctuation and the line reads
 * wrong — see the brief, §6.
 */
export function Ltr({ children }: { children: ReactNode }) {
  return (
    <span
      dir="ltr"
      style={{ unicodeBidi: "isolate", whiteSpace: "nowrap" }}
    >
      {children}
    </span>
  )
}

/**
 * Splits Hebrew copy around a Latin token and isolates that token, so the copy
 * itself can stay a single verbatim string that diffs cleanly against the
 * reference HTML. Returns the text unchanged if the token is not present.
 */
export function withLtr(text: string, token: string): ReactNode {
  const at = text.indexOf(token)
  if (at === -1) return text

  return (
    <>
      {text.slice(0, at)}
      <Ltr>{token}</Ltr>
      {text.slice(at + token.length)}
    </>
  )
}

/**
 * Keeps a short mixed-script run together across a line break. Unlike withLtr
 * this leaves direction alone — "ה-AI" is Hebrew plus Latin, and forcing LTR
 * would render it "AI-ה".
 */
export function withNowrap(text: string, token: string): ReactNode {
  const at = text.indexOf(token)
  if (at === -1) return text

  return (
    <>
      {text.slice(0, at)}
      <span style={{ whiteSpace: "nowrap" }}>{token}</span>
      {text.slice(at + token.length)}
    </>
  )
}
