import type { Feature } from "./products"
import { getDictionary, type Locale } from "@/content/i18n/dictionary"

export function getHowItWorksContent(locale: Locale = "he") {
  const t = getDictionary(locale).howItWorks
  const [s1, s2, s3] = t.steps

  const steps: Feature[] = [
    {
      no: s1.no,
      title: s1.title,
      body: s1.body,
      chips: s1.chips,
      viz: { kind: "composer", typingText: s1.vizComposerText! },
    },
    {
      no: s2.no,
      title: s2.title,
      body: s2.body,
      chips: s2.chips,
      flip: true,
      viz: { kind: "before-after" },
    },
    {
      no: s3.no,
      title: s3.title,
      body: s3.body,
      chips: s3.chips,
      viz: {
        kind: "chat",
        messages: [
          { from: "me", text: s3.vizChatMe1! },
          { from: "ai", bold: s3.vizChatAiBold1!, text: s3.vizChatAi1! },
          { from: "me", text: s3.vizChatMe2! },
          { from: "ai", bold: s3.vizChatAiBold2!, text: s3.vizChatAi2! },
        ],
      },
    },
  ]

  return { hero: t.hero, steps, closer: t.closer }
}
