import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const plans = [
  {
    id: "exempt",
    title: "עוסק פטור",
    description: "מסלול פשוט ומהיר להתחלה.",
    features: ["התחלה מהירה", "תהליך תשלום מובנה", "עמודי תוצאה מוכנים"],
  },
  {
    id: "accountant",
    title: "רואה חשבון",
    description: "מסלול מתקדם יותר עם התאמות.",
    features: ["שדות מסודרים", "מוכנות להתרחבות", "UX נקי ורספונסיבי"],
  },
] as const

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            Uxellent
          </Link>
          <Button asChild variant="ghost">
            <Link href="/">חזרה</Link>
          </Button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-14">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            תמחור
          </h1>
          <p className="mt-4 text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
            בחרו מסלול והתחילו בתשלום. הכפתור יוביל אתכם ל‑Checkout עם מזהה
            החבילה.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {plans.map((p) => (
            <Card key={p.id} className="h-full">
              <CardHeader>
                <CardTitle className="text-2xl">{p.title}</CardTitle>
                <CardDescription>{p.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid gap-2 text-sm text-muted-foreground">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span aria-hidden>•</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="justify-start">
                <Button asChild size="lg">
                  <Link href={`/checkout/${p.id}`}>התחל</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

