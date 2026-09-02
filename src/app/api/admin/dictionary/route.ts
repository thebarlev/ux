import { NextRequest, NextResponse } from "next/server"
import { hasValidSession } from "@/lib/admin/requireSession"
import { validateDictionaryWrite } from "@/lib/admin/validateDictionaryWrite"
import { writeOverride } from "@/lib/admin/edgeConfigWrite"
import { revalidateRedesignPages } from "@/lib/admin/revalidateRedesignPages"
import { getLiveDictionary } from "@/content/i18n/dictionary"

export async function GET(req: NextRequest) {
  if (!hasValidSession(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  const [he, en] = await Promise.all([getLiveDictionary("he"), getLiveDictionary("en")])
  return NextResponse.json({ he, en })
}

export async function POST(req: NextRequest) {
  if (!hasValidSession(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 })

  const body = await req.json().catch(() => null)
  const locale = body?.locale
  const path = body?.path
  const value = body?.value

  if (locale !== "he" && locale !== "en") {
    return NextResponse.json({ error: "invalid_locale" }, { status: 400 })
  }

  const validation = validateDictionaryWrite(locale, path, value)
  if (!validation.ok) {
    return NextResponse.json({ error: validation.error }, { status: 400 })
  }

  try {
    await writeOverride(locale, path, value)
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "write_failed" }, { status: 500 })
  }

  revalidateRedesignPages()
  return NextResponse.json({ ok: true })
}
