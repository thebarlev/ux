const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

let loadPromise: Promise<void> | null = null

function loadScript(): Promise<void> {
  if (!SITE_KEY) return Promise.reject(new Error("reCAPTCHA not configured"))

  if (loadPromise) return loadPromise

  if (typeof window !== "undefined" && window.grecaptcha) {
    return Promise.resolve()
  }

  loadPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script")
    script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`
    script.async = true
    script.onload = () => {
      window.grecaptcha.ready(() => resolve())
    }
    script.onerror = () => {
      loadPromise = null
      reject(new Error("Failed to load reCAPTCHA"))
    }
    document.head.appendChild(script)
  })

  return loadPromise
}

export async function executeRecaptcha(action: string): Promise<string> {
  if (!SITE_KEY) throw new Error("reCAPTCHA not configured")
  await loadScript()
  return window.grecaptcha.execute(SITE_KEY, { action })
}
