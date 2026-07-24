"use client"

/* eslint-disable react-hooks/static-components */

import * as React from "react"
import Link from "next/link"
import { useMDXComponent } from "next-contentlayer2/hooks"
import { H2, H3 } from "@/components/ui/Heading"

function createMdxComponents(locale: "he" | "en") {
  const isLtr = locale === "en"
  const textAlign = isLtr ? "text-left" : "text-right"
  const listPadding = isLtr ? "pl-6" : "pr-6"

  return {
    a: (props: React.ComponentPropsWithoutRef<"a">) => (
      <a {...props} className="underline underline-offset-4 hover:text-[#5389BB]" />
    ),
    h2: (props: React.ComponentPropsWithoutRef<"h2">) => (
      <H2 {...props} className={`mt-12 ${textAlign}`} />
    ),
    h3: (props: React.ComponentPropsWithoutRef<"h3">) => (
      <H3 {...props} className={`mt-8 ${textAlign}`} />
    ),
    p: (props: React.ComponentPropsWithoutRef<"p">) => (
      <p {...props} className="mt-5 text-[18px] leading-[34px] text-black/80 sm:text-[20px]" />
    ),
    ul: (props: React.ComponentPropsWithoutRef<"ul">) => (
      <ul {...props} className={`mt-5 list-disc ${listPadding} text-[18px] leading-[34px] text-black/80 sm:text-[20px]`} />
    ),
    ol: (props: React.ComponentPropsWithoutRef<"ol">) => (
      <ol {...props} className={`mt-5 list-decimal ${listPadding} text-[18px] leading-[34px] text-black/80 sm:text-[20px]`} />
    ),
    li: (props: React.ComponentPropsWithoutRef<"li">) => (
      <li {...props} className="mt-2 text-[18px] leading-[34px] text-black/80 sm:text-[20px]" />
    ),
    pre: (props: React.ComponentPropsWithoutRef<"pre">) => (
      <pre
        {...props}
        className="mt-6 overflow-x-auto rounded-2xl border border-black/10 bg-black/[0.03] p-4 text-left text-[18px] leading-[26px]"
        dir="ltr"
      />
    ),
    code: (props: React.ComponentPropsWithoutRef<"code">) => (
      <code
        {...props}
        className="rounded-md bg-black/[0.06] px-1.5 py-0.5 text-[18px] text-black"
        dir="ltr"
      />
    ),
    Link,
  }
}

export function MdxContent({ code, locale = "he" }: { code: string; locale?: "he" | "en" }) {
  const Component = useMDXComponent(code)
  const mdxComponents = React.useMemo(() => createMdxComponents(locale), [locale])

  return (
    <div className={`mt-10 ${locale === "en" ? "text-left" : "text-right"}`} dir={locale === "en" ? "ltr" : "rtl"}>
      <Component components={mdxComponents} />
    </div>
  )
}

