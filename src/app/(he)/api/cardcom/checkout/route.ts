import "server-only"
import { NextResponse } from "next/server"
import { z } from "zod"

import { createCheckoutRedirect } from "@/lib/checkout/createCheckout"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const BodySchema = z.object({
  email: z.string().email(),
  packageId: z.string().min(1),
})

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  const parsed = BodySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid body", details: parsed.error.flatten() },
      { status: 400 },
    )
  }

  const { redirectUrl } = await createCheckoutRedirect(parsed.data)
  return NextResponse.json({ redirectUrl })
}

