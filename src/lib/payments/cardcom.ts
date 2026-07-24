import "server-only"

type CardcomCreateLowProfileResponse = {
  ResponseCode: number
  Description?: string
  LowProfileId?: string
  Url?: string
  UrlToPayPal?: string
  UrlToBit?: string
}

function requiredEnv(name: string) {
  const v = process.env[name]
  if (!v) throw new Error(`Missing env ${name}`)
  return v
}

function normalizeBaseUrl(baseUrl: string) {
  return baseUrl.replace(/\/+$/, "")
}

export async function createCardcomLowProfile(params: {
  amount: number
  returnValue?: string
  productName?: string
}) {
  const base = normalizeBaseUrl(requiredEnv("CARDCOM_API_BASE"))
  const terminalNumberRaw = requiredEnv("CARDCOM_TERMINAL_NUMBER")
  const apiName = requiredEnv("CARDCOM_API_NAME")

  const terminalNumber = Number(terminalNumberRaw)
  if (!Number.isInteger(terminalNumber) || terminalNumber <= 0) {
    throw new Error("Invalid env CARDCOM_TERMINAL_NUMBER (must be integer)")
  }

  const webHookUrl =
    process.env.CARDCOM_WEBHOOK_URL ?? "https://uxellent.com/api/cardcom/webhook"

  const successRedirectUrl = "https://uxellent.com/checkout/success"
  const failedRedirectUrl = "https://uxellent.com/checkout/failed"

  const body = {
    TerminalNumber: terminalNumber,
    ApiName: apiName,
    Amount: params.amount,
    SuccessRedirectUrl: successRedirectUrl,
    FailedRedirectUrl: failedRedirectUrl,
    WebHookUrl: webHookUrl,
    ReturnValue: params.returnValue ?? null,
    ProductName: params.productName ?? null,
    Language: "he",
  }

  const res = await fetch(`${base}/api/v11/LowProfile/Create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  })

  const json = (await res.json().catch(() => null)) as
    | CardcomCreateLowProfileResponse
    | null

  if (!res.ok) {
    throw new Error(
      `Cardcom HTTP ${res.status}: ${JSON.stringify(json ?? {})}`,
    )
  }

  if (!json || typeof json.ResponseCode !== "number") {
    throw new Error("Cardcom response malformed")
  }

  if (json.ResponseCode !== 0 || !json.Url) {
    throw new Error(
      `Cardcom error ${json.ResponseCode}: ${json.Description ?? "Unknown"}`,
    )
  }

  return {
    lowProfileId: json.LowProfileId ?? null,
    redirectUrl: json.Url,
    raw: json,
  }
}

