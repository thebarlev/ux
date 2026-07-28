/**
 * Globals installed by DeferredScripts. Both are optional: the scripts load
 * lazily and are blocked outright by some browsers, so every call site must
 * check before firing.
 */
declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "js",
      target: string,
      params?: Record<string, unknown>
    ) => void
    fbq?: (command: "track" | "trackCustom" | "init", ...args: unknown[]) => void
  }
}

export {}
