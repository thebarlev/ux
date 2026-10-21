"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const Schema = z.object({
  email: z.string().email("נא להזין אימייל תקין"),
})

type Values = z.infer<typeof Schema>

export function CheckoutForm(props: { packageId: string }) {
  const form = useForm<Values>({
    resolver: zodResolver(Schema),
    defaultValues: { email: "" },
    mode: "onTouched",
  })

  const onSubmit = async (values: Values) => {
    const res = await fetch("/api/cardcom/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, packageId: props.packageId }),
    })

    const json = (await res.json().catch(() => null)) as
      | { redirectUrl?: string; error?: string }
      | null

    if (!res.ok || !json?.redirectUrl) {
      form.setError("email", {
        type: "server",
        message: "משהו השתבש. נסו שוב בעוד רגע.",
      })
      return
    }

    const url = new URL(json.redirectUrl, window.location.origin)
if (url.origin !== window.location.origin) throw new Error()
window.location.assign(url.toString())
  }

  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>אימייל</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  autoComplete="email"
                  placeholder="name@example.com"
                  dir="ltr"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" size="lg" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "מעביר לתשלום..." : "לתשלום"}
        </Button>
      </form>
    </Form>
  )
}

