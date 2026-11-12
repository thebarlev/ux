"use client"

import { useEffect } from "react"

type Lang = "he" | "en"

const COPY = {
  he: { menu: "תפריט", close: "סגירת תפריט" },
  en: { menu: "Menu", close: "Close menu" },
} as const

/** Contact form wording (tbl-022). */
const FORM_COPY = {
  he: {
    name: "כתבו את השם שלכם.",
    email: "כתבו את כתובת המייל שלכם.",
    emailBad: "כתובת המייל לא נראית תקינה. בדקו אותה ונסו שוב.",
    msg: "כתבו לנו הודעה.",
    done: "תודה! קיבלנו את ההודעה ונחזור אליכם בהקדם.",
    fail: "משהו השתבש. אפשר לכתוב לנו ישירות ל-",
  },
  en: {
    name: "Please enter your name.",
    email: "Please enter your email address.",
    emailBad: "That email address doesn’t look right. Please check it.",
    msg: "Please write us a message.",
    done: "Thanks! We got your message and will get back to you soon.",
    fail: "Something went wrong. You can email us directly at ",
  },
} as const
const SUPPORT = "support@uxellent.com"
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/**
 * The sheets' behaviour, ported 1:1 (menu, benefits slider, "how it works" steps, "built right" rings) plus what the site
 * needs on top: keyboard support for the tabs,
 * pausing animations of sections that are off screen, and full cleanup.
 */
export function HomeBehaviors({ lang, rootId }: { lang: Lang; rootId: string }) {
  useEffect(() => {
    const root = document.getElementById(rootId)
    if (!root) return
    const rtl = lang === "he"
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const cleanups: Array<() => void> = []
    const on = <K extends keyof HTMLElementEventMap>(el: HTMLElement | Window, ev: K, fn: (e: HTMLElementEventMap[K]) => void) => {
      el.addEventListener(ev, fn as EventListener)
      cleanups.push(() => el.removeEventListener(ev, fn as EventListener))
    }
    const observe = (el: Element, cb: IntersectionObserverCallback, threshold: number) => {
      const io = new IntersectionObserver(cb, { threshold })
      io.observe(el)
      cleanups.push(() => io.disconnect())
      return io
    }

    // -- pause CSS animations of sections that are off screen
    root.querySelectorAll<HTMLElement>("header, section, footer").forEach((s) => {
      s.classList.add("uxh-off")
      observe(s, (e) => s.classList.toggle("uxh-off", !e[0].isIntersecting), 0)
    })

    // -- hamburger menu, turns into an X
    const burger = root.querySelector<HTMLButtonElement>("#burger")
    const menu = root.querySelector<HTMLElement>("#menu")
    const hdr = root.querySelector<HTMLElement>("#hdr")
    if (burger && menu && hdr) {
      const setOpen = (o: boolean) => {
        menu.classList.toggle("open", o)
        hdr.classList.toggle("open", o)
        burger.classList.toggle("x", o)
        burger.setAttribute("aria-expanded", String(o))
        burger.setAttribute("aria-label", o ? COPY[lang].close : COPY[lang].menu)
      }
      on(burger, "click", () => setOpen(!menu.classList.contains("open")))
      menu.querySelectorAll<HTMLElement>("a").forEach((a) => on(a, "click", () => setOpen(false)))
      on(window, "keydown", (e) => { if ((e as KeyboardEvent).key === "Escape" && menu.classList.contains("open")) { setOpen(false); burger.focus() } })
    }

    // -- 051: the language menu (three languages or more, lang-switch.ts): opens
    //    under its button, or as a sheet from the bottom up to 1060px; arrows move
    //    between the languages, Esc, the backdrop or a click outside close it, and
    //    focus goes back to the button
    root.querySelectorAll<HTMLElement>("[data-ls-menu]").forEach((box) => {
      const btn = box.querySelector<HTMLButtonElement>("button.ls")
      const list = box.querySelector<HTMLElement>(".ls-m")
      const bg = box.querySelector<HTMLElement>(".ls-bg")
      if (!btn || !list) return
      const items = () => [...list.querySelectorAll<HTMLAnchorElement>(".ls-i")]
      const setOpen = (o: boolean, back = false) => {
        list.hidden = !o
        if (bg) bg.hidden = !o
        btn.setAttribute("aria-expanded", String(o))
        hdr?.classList.toggle("ls-open", o)
        if (o) (items().find((a) => a.hasAttribute("aria-current")) ?? items()[0])?.focus()
        else if (back) btn.focus()
      }
      on(btn, "click", () => setOpen(list.hidden))
      on(btn, "keydown", (e) => {
        const k = (e as KeyboardEvent).key
        if (k === "ArrowDown" || k === "ArrowUp") { e.preventDefault(); setOpen(true) }
      })
      on(list, "keydown", (e) => {
        const k = (e as KeyboardEvent).key
        const all = items()
        const i = all.indexOf(document.activeElement as HTMLAnchorElement)
        const go = (n: number) => { e.preventDefault(); all[(n + all.length) % all.length]?.focus() }
        if (k === "ArrowDown") go(i + 1)
        else if (k === "ArrowUp") go(i - 1)
        else if (k === "Home") go(0)
        else if (k === "End") go(all.length - 1)
        else if (k === "Escape") { e.preventDefault(); setOpen(false, true) }
        else if (k === "Tab") setOpen(false)
      })
      if (bg) on(bg, "click", () => setOpen(false, true))
      on(window, "click", (e) => { if (!list.hidden && !box.contains(e.target as Node)) setOpen(false) })
    })

    // -- contact form: check the fields, send to /api/site-contact, then thank
    const form = root.querySelector<HTMLFormElement>("[data-uxc-form]")
    if (form) {
      const t = FORM_COPY[lang]
      const field = (n: string) => form.querySelector<HTMLInputElement | HTMLTextAreaElement>(`[name="${n}"]`)
      const setErr = (n: string, msg: string) => {
        const el = field(n)
        const err = root.querySelector<HTMLElement>(`#uxc-${n}-e`)
        if (!el || !err) return
        err.textContent = msg
        if (msg) el.setAttribute("aria-invalid", "true")
        else el.removeAttribute("aria-invalid")
      }
      const check = (n: string) => {
        const v = (field(n)?.value ?? "").trim()
        let msg = ""
        if (n === "name" && !v) msg = t.name
        if (n === "email") msg = !v ? t.email : EMAIL_RE.test(v) ? "" : t.emailBad
        if (n === "msg" && !v) msg = t.msg
        setErr(n, msg)
        return !msg
      }
      const REQUIRED = ["name", "email", "msg"]
      // once a field has shown an error, it re-checks as the person types
      REQUIRED.forEach((n) => {
        const el = field(n)
        if (!el) return
        on(el as HTMLElement, "input", () => { if (el.getAttribute("aria-invalid")) check(n) })
        on(el as HTMLElement, "blur", () => { if (el.value.trim()) check(n) })
      })
      const fail = form.querySelector<HTMLElement>(".uxc-fail")
      const done = root.querySelector<HTMLElement>(".uxc-done")
      const btn = form.querySelector<HTMLButtonElement>(".ct-btn")
      const showFail = () => {
        if (!fail) return
        fail.textContent = t.fail
        const a = document.createElement("a")
        a.href = `mailto:${SUPPORT}`
        a.className = "lnk"
        a.innerHTML = `<bdi>${SUPPORT}</bdi>`
        fail.appendChild(a)
        fail.hidden = false
      }
      let busy = false
      on(form as HTMLElement, "submit", async (e) => {
        e.preventDefault()
        if (busy) return
        const bad = REQUIRED.filter((n) => !check(n))
        if (bad.length) { field(bad[0])?.focus(); return }
        busy = true
        btn?.setAttribute("aria-busy", "true")
        if (fail) fail.hidden = true
        let ok = false
        try {
          const res = await fetch("/api/site-contact", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              name: field("name")?.value ?? "",
              email: field("email")?.value ?? "",
              topic: (form.querySelector<HTMLSelectElement>('[name="topic"]')?.value) ?? "",
              message: field("msg")?.value ?? "",
              website: field("website")?.value ?? "",
              lang,
            }),
          })
          ok = res.ok && (await res.json().catch(() => null))?.ok === true
        } catch {
          ok = false
        }
        busy = false
        btn?.removeAttribute("aria-busy")
        if (ok && done) {
          done.textContent = t.done
          form.hidden = true
          done.hidden = false
          done.focus()
        } else {
          showFail()
        }
      })
    }

    // -- benefits slider ("what you get")
    const track = root.querySelector<HTMLElement>("#track")
    const ben = root.querySelector<HTMLElement>("#ben")
    if (track && ben) {
      const cards = [...track.querySelectorAll<HTMLElement>(".ben")]
      let i = 0
      let inView = false
      let timer: number | undefined
      const goTo = (n: number) => {
        i = Math.max(0, Math.min(cards.length - 1, n))
        cards.forEach((c, k) => c.classList.toggle("on", k === i))
        window.setTimeout(() => {
          const tr = track.getBoundingClientRect()
          const cr = cards[i].getBoundingClientRect()
          const cs = getComputedStyle(track)
          if (rtl) {
            const pad = parseFloat(cs.scrollPaddingRight) || 48
            track.scrollBy({ left: cr.right - (tr.right - pad), behavior: reduced ? "auto" : "smooth" })
          } else {
            const pad = parseFloat(cs.scrollPaddingLeft) || 48
            track.scrollBy({ left: cr.left - (tr.left + pad), behavior: reduced ? "auto" : "smooth" })
          }
        }, 80)
      }
      const reset = () => {
        window.clearInterval(timer)
        if (reduced) return
        timer = window.setInterval(() => {
          if (!ben.classList.contains("paused") && inView) goTo((i + 1) % cards.length)
        }, 5000)
      }
      cleanups.push(() => window.clearInterval(timer))
      const next = root.querySelector<HTMLElement>("#next")
      const prev = root.querySelector<HTMLElement>("#prev")
      if (next) on(next, "click", () => { goTo(i + 1); reset() })
      if (prev) on(prev, "click", () => { goTo(i - 1); reset() })
      cards.forEach((c, k) => {
        on(c, "click", () => { goTo(k); reset() })
        on(c, "keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); goTo(k); reset() } })
      })
      observe(ben, (e) => { inView = e[0].isIntersecting; ben.classList.toggle("paused", !inView) }, 0.35)
      on(ben, "mouseenter", () => ben.classList.add("paused"))
      on(ben, "mouseleave", () => ben.classList.remove("paused"))
      on(ben, "focusin", () => ben.classList.add("paused"))
      on(ben, "focusout", () => ben.classList.remove("paused"))
      reset()
    }

    // -- "how it works": four steps that advance on their own while in view
    const hw = root.querySelector<HTMLElement>("#hw")
    if (hw) {
      const items = [...hw.querySelectorAll<HTMLButtonElement>(".hw-i")]
      const scenes = [...hw.querySelectorAll<HTMLElement>(".hw-sc")]
      const DUR = [5200, 5200, 5600, 4800]
      let i = 0
      let t: number | undefined
      let inView = false
      let hover = false
      const arm = () => {
        window.clearTimeout(t)
        if (inView && !hover && !reduced) t = window.setTimeout(() => goStep(i + 1), DUR[i])
      }
      const goStep = (n: number, focus = false) => {
        i = (n + items.length) % items.length
        items.forEach((b, k) => {
          b.classList.toggle("on", k === i)
          b.setAttribute("aria-selected", String(k === i))
          b.tabIndex = k === i ? 0 : -1
        })
        scenes.forEach((s, k) => {
          s.classList.remove("on")
          if (k === i) {
            void s.offsetWidth
            s.classList.add("on")
          }
        })
        hw.style.setProperty("--dur", `${DUR[i]}ms`)
        const bar = items[i].querySelector<HTMLElement>(".hw-bar i")
        if (bar) {
          bar.style.animation = "none"
          void bar.offsetWidth
          bar.style.animation = ""
        }
        if (focus) items[i].focus()
        arm()
      }
      cleanups.push(() => window.clearTimeout(t))
      items.forEach((b, k) => {
        on(b, "click", () => goStep(k))
        on(b, "keydown", (e) => {
          const ke = e as KeyboardEvent
          const fwd = rtl ? "ArrowLeft" : "ArrowRight"
          const back = rtl ? "ArrowRight" : "ArrowLeft"
          if (ke.key === fwd || ke.key === "ArrowDown") { e.preventDefault(); goStep(i + 1, true) }
          else if (ke.key === back || ke.key === "ArrowUp") { e.preventDefault(); goStep(i - 1, true) }
          else if (ke.key === "Home") { e.preventDefault(); goStep(0, true) }
          else if (ke.key === "End") { e.preventDefault(); goStep(items.length - 1, true) }
        })
      })
      on(hw, "mouseenter", () => { hover = true; hw.classList.add("paused"); window.clearTimeout(t) })
      on(hw, "mouseleave", () => { hover = false; hw.classList.remove("paused"); arm() })
      on(hw, "focusin", () => { hover = true; hw.classList.add("paused"); window.clearTimeout(t) })
      on(hw, "focusout", () => { hover = false; hw.classList.remove("paused"); arm() })
      observe(hw, (e) => {
        const was = inView
        inView = e[0].isIntersecting
        if (inView && !was) goStep(i)
        else if (!inView) window.clearTimeout(t)
      }, 0.35)
    }

    // -- pricing: monthly / yearly switch (default yearly). Prices come from the
    //    design's data-m / data-y; plan buttons keep billing= in step.
    const bill = [...root.querySelectorAll<HTMLButtonElement>(".bill button")]
    if (bill.length) {
      const set = (k: "m" | "y", focus = false) => {
        bill.forEach((b) => {
          const isOn = b.dataset.b === k
          b.classList.toggle("on", isOn)
          b.setAttribute("aria-checked", String(isOn))
          b.tabIndex = isOn ? 0 : -1
          if (isOn && focus) b.focus()
        })
        root.querySelectorAll<HTMLElement>(".pl-price b, .pl-yr").forEach((e) => {
          const v = e.dataset[k]
          if (v !== undefined) e.textContent = v
        })
        root.querySelectorAll<HTMLAnchorElement>(".pl-cta[data-plan]").forEach((a) => {
          if (a.dataset.plan === "free") return
          // keep the exact URL format the live pricing page uses
          a.setAttribute("href", a.getAttribute("href")!.replace(/billing=(monthly|yearly)/, `billing=${k === "m" ? "monthly" : "yearly"}`))
        })
      }
      bill.forEach((b) => {
        b.tabIndex = b.classList.contains("on") ? 0 : -1
        on(b, "click", () => set(b.dataset.b as "m" | "y"))
        on(b, "keydown", (e) => {
          if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
            e.preventDefault()
            set(b.dataset.b === "m" ? "y" : "m", true)
          }
        })
      })
    }

    // -- the moving strip (pricing, what you get and who it's for: the blue band;
    //    the home hero since 057: the professions): drifts in one row and the
    //    centre item grows (script from the design). Hebrew flows right,
    //    English flows left. Every .mq on the page gets one.
    root.querySelectorAll<HTMLElement>(".mq").forEach((mq) => {
      const strip = mq.querySelector<HTMLElement>(".inc")
      if (strip && !reduced) {
        const orig = [...strip.children] as HTMLElement[]
        const clones: HTMLElement[] = []
        for (let k = 0; k < 3; k++)
          orig.forEach((e) => {
            const c = e.cloneNode(true) as HTMLElement
            c.setAttribute("aria-hidden", "true")
            strip.appendChild(c)
            clones.push(c)
          })
        const half = strip.scrollWidth / 4
        let x = -half
        let last = performance.now()
        let raf = 0
        let paused = false
        let visible = true
        const step = (t: number) => {
          const dt = Math.min(64, t - last)
          last = t
          if (!paused) {
            if (rtl) {
              x += dt * 0.045
              if (x >= 0) x -= half
            } else {
              x -= dt * 0.045
              if (x <= -2 * half) x += half
            }
          }
          strip.style.transform = `translateX(${x}px)`
          const r = mq.getBoundingClientRect()
          const cx = r.left + r.width / 2
          const R = r.width * 0.3
          for (const e of strip.children as HTMLCollectionOf<HTMLElement>) {
            const bb = e.getBoundingClientRect()
            const d = Math.abs(bb.left + bb.width / 2 - cx)
            const k = Math.max(0, 1 - d / R)
            e.style.transform = `scale(${(1 + 0.38 * k * k).toFixed(3)})`
            e.classList.toggle("hot", k > 0.6)
          }
          raf = visible ? requestAnimationFrame(step) : 0
        }
        raf = requestAnimationFrame(step)
        on(mq, "mouseenter", () => { paused = true })
        on(mq, "mouseleave", () => { paused = false })
        observe(mq, (e) => {
          visible = e[0].isIntersecting
          if (visible && !raf) { last = performance.now(); raf = requestAnimationFrame(step) }
        }, 0)
        cleanups.push(() => {
          cancelAnimationFrame(raf)
          clones.forEach((c) => c.remove())
          strip.style.transform = ""
          orig.forEach((e) => { e.style.transform = ""; e.classList.remove("hot") })
        })
      }
    })

    // -- what you get (uxb-021, tbl-025): the mockups play while on screen
    //    (script from the design). The first frame is in the markup, which is
    //    also all that shows with reduced motion. Every box has a fixed height,
    //    so nothing on the page moves; the texts come from the sheet, via data-*.
    if (!reduced) {
      let alive = true
      const timers: number[] = []
      cleanups.push(() => { alive = false; timers.forEach((t) => window.clearInterval(t)) })
      const seen = (el: Element) => {
        let v = false
        observe(el, (e) => { v = e[0].isIntersecting }, 0.3)
        return () => v
      }
      const sites = root.querySelector<HTMLElement>(".mk-sites")
      if (sites) {
        const cards = [...sites.querySelectorAll<HTMLElement>(".st")].reverse()
        const shown = seen(sites)
        let o = 0
        timers.push(window.setInterval(() => {
          if (!shown()) return
          o = (o + 1) % 3
          cards.forEach((c, k) => { c.dataset.p = String((k - o + 3) % 3) })
        }, 3200))
      }
      const chat = root.querySelector<HTMLElement>('[data-anim="chat"]')
      const log = chat?.querySelector<HTMLElement>(".mk-log")
      const typ = chat?.querySelector<HTMLElement>(".mk-typ")
      if (chat && log && typ) {
        const q = JSON.parse(chat.dataset.q ?? "[]") as [string, string][]
        const hint = typ.textContent ?? ""
        const shown = seen(chat)
        const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))
        const add = (who: "me" | "ai", text: string) => {
          const d = document.createElement("div")
          d.className = `mk-msg ${who}`
          if (who === "ai") {
            const dot = document.createElement("span")
            dot.className = "mk-dot"
            const t = document.createElement("span")
            t.textContent = text
            d.append(dot, t)
          } else d.textContent = text
          log.appendChild(d)
          while (log.children.length > 4) log.firstElementChild!.remove()
        }
        ;(async () => {
          // the first request and answer are already there
          for (let i = 1; alive; i++) {
            while (alive && !shown()) await wait(500)
            if (!alive) return
            const [ask, answer] = q[i % q.length]
            typ.classList.remove("ph")
            typ.textContent = ""
            for (const c of ask) {
              if (!alive) return
              typ.textContent += c
              typ.scrollLeft = rtl ? -typ.scrollWidth : typ.scrollWidth
              await wait(45)
            }
            await wait(450)
            if (!alive) return
            typ.textContent = hint
            typ.classList.add("ph")
            add("me", ask)
            await wait(900)
            if (!alive) return
            add("ai", answer)
            await wait(2200)
          }
        })()
        cleanups.push(() => { typ.textContent = hint; typ.classList.add("ph") })
      }
      const leads = root.querySelector<HTMLElement>('[data-anim="leads"]')
      const feed = leads?.querySelector<HTMLElement>(".mk-feed")
      if (leads && feed) {
        const items = JSON.parse(leads.dataset.leads ?? "[]") as [number, string, string][]
        const icons = JSON.parse(leads.dataset.icons ?? "[]") as string[]
        const now = leads.dataset.now ?? ""
        const shown = seen(leads)
        let i = 3
        timers.push(window.setInterval(() => {
          if (!shown()) return
          const [icon, title, text] = items[i++ % items.length]
          const d = document.createElement("div")
          d.className = "mk-mail in"
          d.innerHTML = `${icons[icon]}<span><b></b><em></em></span><i class="mk-new"></i>`
          d.querySelector("b")!.textContent = title
          d.querySelector("em")!.textContent = text
          feed.querySelectorAll(".mk-new").forEach((n) => {
            const s = document.createElement("small")
            s.textContent = now
            n.replaceWith(s)
          })
          // always exactly three: the new one on top, the oldest goes
          feed.prepend(d)
          while (feed.children.length > 3) feed.lastElementChild!.remove()
          ;[...feed.children].forEach((c, k) => c.classList.toggle("old", k >= 1))
        }, 2600))
      }
    }

    // -- "built right": rings fill once in view; 048: the email account builds its sequence the same way
    root.querySelectorAll<HTMLElement>("#bq, #mail").forEach((sec) => {
      const io = observe(sec, (e) => {
        if (e[0].isIntersecting) {
          sec.classList.add("in")
          io.disconnect()
        }
      }, 0.3)
    })

    // -- article charts fill once they scroll into view (CSS keeps them static with reduced motion)
    root.querySelectorAll<HTMLElement>(".ar-chart").forEach((c) => {
      const io = observe(c, (e) => {
        if (e[0].isIntersecting) {
          c.classList.add("in")
          io.disconnect()
        }
      }, 0.4)
    })

    // -- FAQ topics / text-page contents: the topic in view is highlighted (on
    //    mobile its chip also scrolls into the row); at the very bottom, the last one
    const topics = root.querySelector<HTMLElement>("[data-uxf-nav]")
    if (topics) {
      const links = [...topics.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')]
      const targets = links.map((a) => document.getElementById(decodeURIComponent(a.hash.slice(1))))
      let current = -1
      let raf = 0
      const pick = () => {
        raf = 0
        const line = window.innerHeight * 0.35
        let k = 0
        targets.forEach((t, i) => { if (t && t.getBoundingClientRect().top <= line) k = i })
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) k = links.length - 1
        if (k === current) return
        current = k
        links.forEach((a, i) => {
          a.classList.toggle("on", i === k)
          if (i === k) a.setAttribute("aria-current", "true")
          else a.removeAttribute("aria-current")
        })
        if (topics.scrollWidth > topics.clientWidth) {
          const r = links[k].getBoundingClientRect(), n = topics.getBoundingClientRect()
          topics.scrollBy({ left: r.left + r.width / 2 - (n.left + n.width / 2), behavior: reduced ? "auto" : "smooth" })
        }
      }
      const queue = () => { if (!raf) raf = requestAnimationFrame(pick) }
      on(window, "scroll", queue)
      on(window, "resize", queue)
      cleanups.push(() => cancelAnimationFrame(raf))
      pick()
    }

    return () => cleanups.forEach((c) => c())
  }, [lang, rootId])

  return null
}
