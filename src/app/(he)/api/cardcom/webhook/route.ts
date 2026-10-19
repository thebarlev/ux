import "server-only"
import { NextResponse } from "next/server"

import { getSupabaseAdmin } from "@/lib/supabase/admin"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

type CardcomWebhookPayload = {
  ResponseCode?: number
  Description?: string
  TerminalNumber?: number
  LowProfileId?: string
  TranzactionId?: number
  ReturnValue?: string
  UIValues?: {
    CardOwnerEmail?: string
  }
  TranzactionInfo?: {
    TranzactionId?: number
    CardOwnerEmail?: string
  }
}

function addDays(date: Date, days: number) {
  const d = new Date(date)
  d.setUTCDate(d.getUTCDate() + days)
  return d
}

async function findSubscription(params: { email: string; packageId: string }) {
  const supabase = getSupabaseAdmin()
  const table = process.env.SUPABASE_SUBSCRIPTIONS_TABLE ?? "subscriptions"

  // Try `package_id` first, then `packageId`.
  const attempt = async (packageField: "package_id" | "packageId") => {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .eq("email", params.email)
      .eq(packageField, params.packageId)
      .limit(1)
    if (error) throw error
    return data?.[0] ?? null
  }

  try {
    return await attempt("package_id")
  } catch {
    return await attempt("packageId")
  }
}

async function updateSubscriptionIdempotent(params: {
  email: string
  packageId: string
  status: "active" | "expired"
  startedAt?: string
  expiresAt?: string
  cardcomTransactionId?: number | null
  cardcomLowProfileId?: string | null
  cardcomTerminalNumber?: number | null
}) {
  const supabase = getSupabaseAdmin()
  const table = process.env.SUPABASE_SUBSCRIPTIONS_TABLE ?? "subscriptions"

  const baseFields: Record<string, unknown> = {
    ...(params.startedAt ? { started_at: params.startedAt } : {}),
    ...(params.expiresAt ? { expires_at: params.expiresAt } : {}),
  }

  const cardcomFieldsVariants: Array<Record<string, unknown>> = [
    {
      cardcom_transaction_id: params.cardcomTransactionId ?? null,
      cardcom_low_profile_id: params.cardcomLowProfileId ?? null,
      cardcom_terminal_number: params.cardcomTerminalNumber ?? null,
    },
    {
      tranzaction_id: params.cardcomTransactionId ?? null,
      low_profile_id: params.cardcomLowProfileId ?? null,
      terminal_number: params.cardcomTerminalNumber ?? null,
    },
    {},
  ]

  type Variant = {
    packageField: "package_id" | "packageId"
    statusField: "status" | "state"
    pendingValue: "pending"
  }

  const variants: Variant[] = [
    { packageField: "package_id", statusField: "status", pendingValue: "pending" },
    { packageField: "packageId", statusField: "status", pendingValue: "pending" },
    { packageField: "package_id", statusField: "state", pendingValue: "pending" },
    { packageField: "packageId", statusField: "state", pendingValue: "pending" },
  ]

  let lastError: unknown = null

  for (const v of variants) {
    for (const cardcomFields of cardcomFieldsVariants) {
      const updateFields = {
        ...baseFields,
        ...cardcomFields,
        [v.statusField]: params.status,
      }

      const { data, error } = await supabase
        .from(table)
        // Without generated Supabase Database types, `supabase-js` may infer `never`
        // for update payloads on dynamic table names during `next build`.
        .update(updateFields as never)
        .eq("email", params.email)
        .eq(v.packageField, params.packageId)
        .eq(v.statusField, v.pendingValue)
        .select("*")

      if (error) {
        lastError = error
        continue
      }

      // If we updated at least one row -> processed now.
      if (data && data.length > 0) {
        return { updated: true, row: data[0] as Record<string, unknown> }
      }

      // No rows updated: either already processed OR subscription not found.
      const existing = await findSubscription({
        email: params.email,
        packageId: params.packageId,
      }).catch(() => null)

      if (existing) {
        const existingRow = existing as Record<string, unknown>
        const currentStatus =
          existingRow["status"] ?? existingRow["state"] ?? null
        if (typeof currentStatus === "string" && currentStatus !== "pending") {
          return { updated: false, row: existing as Record<string, unknown> }
        }
      }

      return { updated: false, row: existing as Record<string, unknown> | null }
    }
  }

  return { updated: false, row: null, error: lastError }
}

async function callBillingWebhook(params: {
  email: string
  packageId: string
  expiresAt: string
}) {
  const url = process.env.VOW_BILLING_WEBHOOK_URL
  const secret = process.env.VOW_BILLING_WEBHOOK_SECRET
  if (!url || !secret) {
    console.warn("[cardcom-webhook] missing billing webhook envs")
    return
  }

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${secret}`,
    },
    body: JSON.stringify({
      email: params.email,
      packageId: params.packageId,
      status: "active",
      expires_at: params.expiresAt,
    }),
    cache: "no-store",
  }).catch((err) => {
    console.warn("[cardcom-webhook] billing webhook fetch failed", err)
    return null
  })

  if (!res) return
  if (!res.ok) {
    const text = await res.text().catch(() => "")
    console.warn("[cardcom-webhook] billing webhook non-200", res.status, text)
  }
}

export async function POST(req: Request) {
  // Always return 200 to Cardcom, even on internal errors.
  try {
    const raw = await req.text()
    console.info("[cardcom-webhook] raw", raw)

    let payload: CardcomWebhookPayload | null = null
    try {
      payload = JSON.parse(raw) as CardcomWebhookPayload
    } catch {
      payload = null
    }

    if (!payload) {
      return NextResponse.json({ ok: true })
    }

    const transactionId =
      payload.TranzactionId ?? payload.TranzactionInfo?.TranzactionId ?? null
    const lowProfileId = payload.LowProfileId ?? null
    const terminalNumber = payload.TerminalNumber ?? null

    const packageId = payload.ReturnValue ?? null
    const email =
      payload.UIValues?.CardOwnerEmail ??
      payload.TranzactionInfo?.CardOwnerEmail ??
      null

    const isSuccess = payload.ResponseCode === 0

    if (!email || !packageId) {
      console.warn("[cardcom-webhook] missing email/packageId", {
        email,
        packageId,
        transactionId,
        lowProfileId,
      })
      return NextResponse.json({ ok: true })
    }

    const now = new Date()
    const startedAt = now.toISOString()
    const expiresAt = addDays(now, 30).toISOString()

    if (isSuccess) {
      const result = await updateSubscriptionIdempotent({
        email,
        packageId,
        status: "active",
        startedAt,
        expiresAt,
        cardcomTransactionId: transactionId,
        cardcomLowProfileId: lowProfileId,
        cardcomTerminalNumber: terminalNumber,
      })

      // If it was already processed (idempotency) do nothing.
      if (result.row) {
        const existingExpiresAt =
          result.row["expires_at"] ?? result.row["expiresAt"] ?? null
        const toSendExpiresAt =
          typeof existingExpiresAt === "string" && existingExpiresAt
            ? existingExpiresAt
            : expiresAt
        await callBillingWebhook({ email, packageId, expiresAt: toSendExpiresAt })
      } else if ("error" in result && result.error) {
        console.warn("[cardcom-webhook] update active failed", result.error)
      }
    } else {
      const result = await updateSubscriptionIdempotent({
        email,
        packageId,
        status: "expired",
        expiresAt: now.toISOString(),
        cardcomTransactionId: transactionId,
        cardcomLowProfileId: lowProfileId,
        cardcomTerminalNumber: terminalNumber,
      })
      if ("error" in result && result.error) {
        console.warn("[cardcom-webhook] update expired failed", result.error)
      }
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.warn("[cardcom-webhook] handler error", err)
    return NextResponse.json({ ok: true })
  }
}

