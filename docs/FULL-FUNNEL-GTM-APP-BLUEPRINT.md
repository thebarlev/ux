# Full Funnel GTM App Blueprint

This document describes the app-side integration points for the `app.uxellent.com` flow that is not present in this repository.

## Shared helpers

Use the same event helper shape as the marketing site:

```ts
import { pushEvent, inferFunnelPlan } from "@/lib/tracking/events"
import { trackPurchase } from "@/lib/tracking/purchase"
```

## 1. `scan_started`

Location:

- `app.uxellent.com/en/auditor`

Trigger:

- When the user starts the scan flow

Example:

```ts
pushEvent("scan_started", {
  plan: selectedPlan,
})
```

## 2. `register_started`

Location:

- `app.uxellent.com/en/auditor/register`

Trigger options:

- on first form interaction, or
- on initial registration screen load if that is the intended funnel start

Example:

```ts
pushEvent("register_started", {
  plan: selectedPlan,
})
```

## 3. `purchase`

Location:

- only after confirmed successful payment

Trigger:

- after success page receives a confirmed order/subscription payload

Example:

```ts
trackPurchase({
  transactionId: orderId,
  orderValue,
  planName: selectedPlan,
})
```

Equivalent raw payload:

```ts
pushEvent("purchase", {
  transaction_id: orderId,
  value: orderValue,
  currency: "USD",
  plan: selectedPlan,
})
```

## Plan mapping

Normalize plan values to:

- `basic`
- `pro`
- `expert`

If the app only has `link_id` or plan tokens from the URL/query string:

```ts
const selectedPlan =
  inferFunnelPlan(searchParams.get("link_id")) ?? "basic"
```

## Duplicate protection

`trackPurchase()` already prevents duplicate firing by storing a sent flag in `sessionStorage` using the transaction ID:

- first success render: sends event
- page reload: does not send again
- different transaction ID: sends again
