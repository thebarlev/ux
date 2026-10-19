#!/usr/bin/env python3
"""
Builds the home pages (/ and /en) from Itzik's approved review sheets.

    python3 scripts/home-sheets/build.py <sheet-dir>

<sheet-dir> holds uxb-009-v33-home-he.html, uxb-010-v4-home-en.html and
hero-law.webp (tbl-019). The sheets are the source of truth for markup and CSS;
this script only:
  - drops the review chrome (.sheet-label, every .ztag),
  - wires the links (anchors, pricing/contact/legal pages, platform URLs),
  - turns the base64 CSS backgrounds into real responsive <img> files,
  - scopes every CSS rule under .uxh-he / .uxh-en so nothing leaks to other
    pages, and points font-family at the next/font Heebo variable,
  - adds the aria wiring the sheets leave out (tabs, carousel, menu).
Outputs: src/app/_home/{markup.he.ts,markup.en.ts,home.he.css,home.en.css}
and public/home/*.{webp,avif}. Image variants need sharp (from node_modules).
"""
import base64
import glob
import json
import os
import re
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SHEETS = sys.argv[1]
OUT = os.path.join(ROOT, "src/app/_home")
PUB = os.path.join(ROOT, "public/home")
os.makedirs(OUT, exist_ok=True)
os.makedirs(PUB, exist_ok=True)

PLATFORM = "https://ai.uxellent.com"  # the address every CTA on the live site already uses

LANGS = {
    "he": {
        "file": "uxb-009-v33-home-he.html",
        "home": "/",
        "pre": "",
        "nav": {
            "איך זה עובד": "#how",
            "מה מקבלים": "#ben",
            "מחירים": "/pricing",
            "שאלות נפוצות": "#faq",
            "צור קשר": "/contact",
            "כניסה": PLATFORM,
            "הצטרפות חינם": PLATFORM,
            "תנאי שימוש": "/terms",
            "מדיניות פרטיות": "/privacy",
        },
        "logo_label": "Uxellent, לעמוד הבית",
        "carousel": "מה מקבלים",
        "slide": "{n} מתוך {t}",
        "hero_alt": "",
    },
    "en": {
        "file": "uxb-010-v4-home-en.html",
        "home": "/en",
        "pre": "/en",
        "nav": {
            "How it works": "#how",
            "What you get": "#ben",
            "Pricing": "/en/pricing",
            "FAQ": "#faq",
            "Contact": "/en/contact",
            "Log in": PLATFORM,
            "Start free": PLATFORM,
            "Terms of use": "/en/terms",
            "Privacy policy": "/en/privacy",
        },
        "logo_label": "Uxellent, home",
        "carousel": "What you get",
        "slide": "{n} of {t}",
        "hero_alt": "",
    },
}

IMG_WIDTHS = [480, 750, 1000]


def sharp_variants(src, base):
    """webp + avif at IMG_WIDTHS, via the sharp copy that Next already installs."""
    sharp = sorted(glob.glob(os.path.join(ROOT, "node_modules/.pnpm/sharp@*/node_modules/sharp")))[-1]
    js = (
        f"const s=require({json.dumps(sharp)});const W={json.dumps(IMG_WIDTHS)};"
        f"Promise.all(W.flatMap(w=>[s({json.dumps(src)}).resize(w).webp({{quality:72}}).toFile({json.dumps(PUB)}+'/'+{json.dumps(base)}+'-'+w+'.webp'),"
        f"s({json.dumps(src)}).resize(w).avif({{quality:50}}).toFile({json.dumps(PUB)}+'/'+{json.dumps(base)}+'-'+w+'.avif')]))"
        f".then(()=>s({json.dumps(src)}).metadata()).then(m=>console.log(m.width+'x'+m.height))"
    )
    w, h = subprocess.check_output(["node", "-e", js], text=True).strip().split("x")
    return int(w), int(h)


def picture(base, w, h, sizes, eager, alt, pos="center"):
    srcset = lambda ext: ", ".join(f"/home/{base}-{x}.{ext} {x}w" for x in IMG_WIDTHS)
    load = 'fetchpriority="high" loading="eager"' if eager else 'loading="lazy"'
    return (
        f'<picture class="uxh-bg"><source type="image/avif" srcset="{srcset("avif")}" sizes="{sizes}">'
        f'<img src="/home/{base}-1000.webp" srcset="{srcset("webp")}" sizes="{sizes}" width="{w}" height="{h}" '
        f'alt="{alt}" decoding="async" {load} style="object-position:{pos}"></picture>'
    )


def scope_css(css, root):
    """Prefix every selector with the page root class; keep @keyframes as is."""
    out, i, n = [], 0, len(css)

    def scope_sel(sel):
        parts = []
        for s in sel.split(","):
            s = s.strip()
            if not s:
                continue
            if s in (":root", "html", "body"):
                parts.append(root)
            elif s == "*":
                parts += [root, f"{root} *"]
            elif s.startswith(("html ", "body ")):
                parts.append(root + s[4:] if s.startswith("html") else root + s[4:])
            else:
                parts.append(f"{root} {s}")
        return ",".join(parts)

    def block(text):
        res, j = [], 0
        while j < len(text):
            k = text.find("{", j)
            if k == -1:
                res.append(text[j:])
                break
            head = text[j:k]
            # find matching brace
            depth, m = 1, k + 1
            while depth and m < len(text):
                if text[m] == "{":
                    depth += 1
                elif text[m] == "}":
                    depth -= 1
                m += 1
            body = text[k + 1 : m - 1]
            h = head.strip()
            # keep comments that precede the selector
            lead = head[: len(head) - len(head.lstrip())]
            com = ""
            while h.startswith("/*"):
                e = h.find("*/") + 2
                com += h[:e] + "\n"
                h = h[e:].strip()
            if h.startswith("@media") or h.startswith("@supports"):
                res.append(f"{lead}{com}{h}{{{block(body)}}}")
            elif h.startswith("@keyframes") or h.startswith("@font-face") or h.startswith("@"):
                res.append(f"{lead}{com}{h}{{{body}}}")
            else:
                res.append(f"{lead}{com}{scope_sel(h)}{{{body}}}")
            j = m
        return "".join(res)

    return block(css)


def build(lang, cfg, images):
    src = open(os.path.join(SHEETS, cfg["file"]), encoding="utf-8").read()
    css = re.search(r"<style[^>]*>(.*?)</style>", src, re.S).group(1)
    body = re.search(r"<body[^>]*>(.*)</body>", src, re.S).group(1)
    body = re.sub(r"<script.*?</script>", "", body, flags=re.S)

    # -- review chrome out
    body = re.sub(r'<div class="sheet-label">.*?</div>\s*', "", body, flags=re.S)
    body = re.sub(r'<span class="ztag"[^>]*>.*?</span>', "", body, flags=re.S)
    assert "ztag" not in body and "sheet-label" not in body and "uxb-0" not in body

    # -- links
    body = body.replace('<a href="#"><svg class="logo-svg"', f'<a href="{cfg["home"]}" aria-label="{cfg["logo_label"]}"><svg class="logo-svg"', 1)

    def link(m):
        attrs, text = m.group(1), m.group(2)
        if 'href="#"' not in attrs:
            return m.group(0)
        href = cfg["nav"].get(text.strip())
        assert href, f"no target for link {text!r} ({lang})"
        attrs = attrs.replace('href="#"', 'href="' + href + '"')
        return "<a" + attrs + ">" + text + "</a>"

    body = re.sub(r"<a([^>]*)>([^<]*)</a>", link, body)
    assert 'href="#"' not in body, f"unwired links left in {lang}"

    # -- menu / burger
    body = body.replace('<button class="burger" id="burger"', '<button type="button" class="burger" id="burger" aria-controls="menu" aria-expanded="false"', 1)

    # -- prompts: real buttons with a hook for the behaviour script
    body = re.sub(r"<button>(.*?)</button>", r'<button type="button" data-uxh-go>\1</button>', body, flags=re.S)
    body = body.replace("<input placeholder=", '<input type="text" enterkeyhint="go" data-uxh-in placeholder=')

    # -- "how it works" tabs: ids + controls, panels as tabpanels
    for k in range(4):
        body = body.replace(f'role="tab" aria-selected="{"true" if k == 0 else "false"}" data-i="{k}"',
                            f'role="tab" id="hw-t{k}" aria-controls="hw-p{k}" aria-selected="{"true" if k == 0 else "false"}" tabindex="{0 if k == 0 else -1}" data-i="{k}"', 1)
        body = re.sub(rf'<div class="hw-sc( on)?" data-s="{k}">',
                      lambda m, k=k: f'<div class="hw-sc{m.group(1) or ""}" data-s="{k}" role="tabpanel" id="hw-p{k}" aria-labelledby="hw-t{k}">', body, 1)
    body = body.replace('<div class="hw-stage" aria-live="polite">', '<div class="hw-stage">')

    # -- benefits slider: carousel semantics
    body = body.replace('<div class="track" id="track">', f'<div class="track" id="track" role="region" aria-roledescription="carousel" aria-label="{cfg["carousel"]}">', 1)
    slides = re.findall(r'<div class="ben( on)?">', body)
    for n in range(len(slides)):
        lab = cfg["slide"].format(n=n + 1, t=len(slides))
        body = re.sub(r'<div class="ben( on)?">', lambda m: f'<div class="ben{m.group(1) or ""} uxh-slide" role="group" aria-roledescription="slide" aria-label="{lab}" tabindex="0">', body, 1)
    body = body.replace(" uxh-slide", "")

    # -- accessibility card: one replaceable string (see A11Y_COPY)
    body, nsub = re.subn(r'(<span class="bq-ic">.*?</span><h3>(?:נגיש לכולם|Accessible to everyone)</h3><p>)[^<]*(</p>)', r"\1{{A11Y}}\2", body, count=1, flags=re.S)
    assert nsub == 1, "accessibility card not found"

    # -- heading order and crawlable links (Lighthouse/axe): the hero demo is a
    #    picture of a site, so its heading and fake nav links become plain text
    #    elements; footer column titles become h2 (styled exactly as before).
    body = re.sub(r'<h3 class="gs-h([^"]*)">(.*?)</h3>', r'<p class="gs-h\1">\2</p>', body, count=1, flags=re.S)
    body = body.replace("<h5>", '<p class="f-h">').replace("</h5>", "</p>")
    assert body.count("<h4>") == 2, "expected two footer h4"
    body = body.replace("<h4>", "<h2>").replace("</h4>", "</h2>")
    body = re.sub(r"<a>([^<]*)</a>", r"<span>\1</span>", body)
    assert "<a>" not in body

    # -- the hero demo is an illustration of a generated site (fake law-firm
    #    copy, fading in and out), so it is hidden from assistive technology.
    assert body.count('<div class="stage">') == 1
    body = body.replace('<div class="stage">', '<div class="stage" aria-hidden="true">')

    # -- images: real files instead of base64 backgrounds
    body = body.replace('<div class="gs-img rv d4"></div>',
                        '<div class="gs-img rv d4">' + picture("hero-law", *images["hero-law"], "(max-width:1060px) 92vw, 620px", True, cfg["hero_alt"]) + "</div>", 1)
    body = re.sub(r'(<div class="(?:s2-hero|a3-site) a2-img">)',
                  lambda m: m.group(1) + picture("how-site", *images["how-site"], "(max-width:1060px) 92vw, 560px", False, "", "center 40%"), body)

    # -- CSS: no data URIs, scoped, Heebo from next/font, a few additions
    css = re.sub(r"url\(data:image/[a-z+]+;base64,[A-Za-z0-9+/=]+\)", "none", css)
    # review chrome out of the CSS too: comments (they carry "uxb-0xx" version
    # notes) and every rule that targets .ztag / .sheet-label
    css = re.sub(r"/\*.*?\*/", "", css, flags=re.S)
    css = re.sub(r"(^|[{}])[^{}@]*(?:\.ztag|\.sheet-label)[^{}]*\{[^{}]*\}", r"\1", css)
    css = css.replace('font-family:"Heebo",', 'font-family:var(--font-heebo),"Heebo",')
    root = f".uxh-{lang}"
    css = scope_css(css, root)
    # The sheets were designed on plain browser defaults. The site's globals
    # (Tailwind preflight, base h2/li/ul rules) would otherwise leak in, so
    # inside the page root every property falls back to the browser default
    # unless the sheet sets it. :where() keeps this at zero specificity, so
    # every sheet rule still wins.
    # SVG is left out: its geometry (d, r, cx…) lives in CSS properties that
    # `all` would revert to nothing.
    nsvg = ":where(*:not(svg):not(svg *))"
    css = (f":where({root}) {nsvg},:where({root}) {nsvg}::before,:where({root}) {nsvg}::after{{all:revert}}\n"
           + css)
    css = css.replace(f"{root} .ft h4", f"{root} .ft h2").replace(".f-ai h5", ".f-ai .f-h")
    assert ".ft h4" not in css and " h5" not in css
    # LCP: the hero demo "builds" by fading elements in from opacity 0, which
    # keeps them out of LCP until they appear. Starting at .01 is invisible but
    # lets the browser count them from the first paint.
    css = re.sub(r"@keyframes rv\{.*?\}\}", lambda m: m.group(0).replace("opacity:0;", "opacity:.01;"), css, count=1, flags=re.S)
    css = css.replace(f"{root} .rv{{opacity:0;", f"{root} .rv{{opacity:.01;")
    css += f"""
/* ---- added by scripts/home-sheets/build.py ---- */
{root} .gs-img,{root} .a2-img{{isolation:isolate}}
{root} .uxh-bg,{root} .uxh-bg img{{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:-1;display:block}}
{root} :focus-visible{{outline:2px solid var(--brand);outline-offset:3px;border-radius:6px}}
{root} .uxh-off,{root} .uxh-off *,{root} .uxh-off *::before,{root} .uxh-off *::after{{animation-play-state:paused!important}}
{root} .ben:focus-visible{{outline-offset:-3px}}
/* WCAG AA contrast (tbl-019 asks for AA). The only deviations from the sheet;
   delete this block to get the sheet colours back. */
{root} .prompt button{{background:#147bbb}}
{root} .prompt button:hover{{background:var(--brand-d)}}
{root} .hw-n{{opacity:1}}
{root} .hw-t{{opacity:.48}}
{root} .hw-i:hover .hw-t{{opacity:.7}}
{root} .hw-i.on .hw-t{{opacity:1}}
{root} .gs-k{{color:#93712f}}
"""
    open(os.path.join(OUT, f"home.{lang}.css"), "w", encoding="utf-8").write(css)

    faq = [
        {"q": re.sub(r"<[^>]+>", "", q).strip(), "a": re.sub(r"<[^>]+>", "", a).strip()}
        for q, a in re.findall(r"<summary>(.*?)<span class=\"pm\">\+</span></summary><div class=\"ans\">(.*?)</div>", body, re.S)
    ]
    assert len(faq) == 9, f"expected 9 FAQ entries in {lang}, got {len(faq)}"

    ts = (
        f"// Generated by scripts/home-sheets/build.py from {cfg['file']} (tbl-019). Do not edit by hand.\n"
        f"export const HOME_HTML_{lang.upper()} = {json.dumps(body.strip(), ensure_ascii=False)}\n\n"
        f"export const HOME_FAQ_{lang.upper()} = {json.dumps(faq, ensure_ascii=False, indent=2)} as const\n"
    )
    open(os.path.join(OUT, f"markup.{lang}.ts"), "w", encoding="utf-8").write(ts)
    print(lang, "markup", len(body), "css", len(css), "faq", len(faq))


def main():
    images = {"hero-law": sharp_variants(os.path.join(SHEETS, "hero-law.webp"), "hero-law")}
    # The "how it works" site shot only exists inside the sheet, as a base64 CSS background.
    he = open(os.path.join(SHEETS, LANGS["he"]["file"]), encoding="utf-8").read()
    m = re.search(r"\.a2-img\{background:url\(data:image/webp;base64,([A-Za-z0-9+/=]+)\)", he)
    tmp = os.path.join(PUB, "_how-site-src.webp")
    open(tmp, "wb").write(base64.b64decode(m.group(1)))
    images["how-site"] = sharp_variants(tmp, "how-site")
    os.remove(tmp)
    for lang, cfg in LANGS.items():
        build(lang, cfg, images)


main()
