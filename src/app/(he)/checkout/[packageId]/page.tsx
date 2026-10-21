import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { CheckoutForm } from "./CheckoutForm"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ packageId: string }>
}): Promise<Metadata> {
  const { packageId } = await params
  return {
    title: "תשלום מאובטח | Uxellent",
    description: "עמוד תשלום מאובטח של Uxellent להשלמת רכישה עבור שירותים, מנויים או חבילות דיגיטליות.",
    alternates: {
      canonical: `/checkout/${packageId}`,
    },
    robots: {
      index: false,
      follow: true,
    },
  }
}

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ packageId: string }>
}) {
  const { packageId } = await params

  return (
    <div className="min-h-screen bg-background px-4 py-12" dir="rtl">
      <div className="mx-auto w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">תשלום</CardTitle>
          </CardHeader>
          <CardContent>
            <CheckoutForm packageId={packageId} />
          </CardContent>
        </Card>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          מזהה חבילה: <span className="font-mono">{packageId}</span>
        </p>
      </div>
    </div>
  )
}

