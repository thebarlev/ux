#!/usr/bin/env python3
"""
Builds the home pages (/ and /en) from Itzik's approved review sheets.

    python3 scripts/home-sheets/build.py <home-sheet-dir> <pricing-sheet-dir>

<home-sheet-dir> holds uxb-009-v33-home-he.html, uxb-010-v4-home-en.html and
hero-law.webp (tbl-019); <pricing-sheet-dir> holds uxb-011-v11-pricing-he.html
and uxb-012-v2-pricing-en.html (tbl-020). The sheets are the source of truth for markup and CSS;
this script only:
  - drops the review chrome (.sheet-label, every .ztag),
  - wires the links (anchors, pricing/contact/legal pages, platform URLs),
  - turns the base64 CSS backgrounds into real responsive <img> files,
  - scopes every CSS rule under .uxh-he / .uxh-en so nothing leaks to other
    pages, and points font-family at the next/font Heebo variable,
  - adds the aria wiring the sheets leave out (tabs, carousel, menu).
Outputs: src/app/_home/{markup,pricing-markup}.{he,en}.ts and
{home,pricing}.{he,en}.css, plus public/home/*.{webp,avif}. Image variants need sharp (from node_modules).
"""
import base64
import glob
import json
import os
import re
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
HOME_SHEETS = sys.argv[1]
PRICING_SHEETS = sys.argv[2]
OUT = os.path.join(ROOT, "src/app/_home")
PUB = os.path.join(ROOT, "public/home")
os.makedirs(OUT, exist_ok=True)
os.makedirs(PUB, exist_ok=True)

PLATFORM = "https://ai.uxellent.com"  # the address every CTA on the live site already uses

LANGS = {
    "he": {
        "file": "uxb-009-v33-home-he.html",
        "pricing_file": "uxb-011-v11-pricing-he.html",
        "home": "/",
        "pricing": "/pricing",
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
        "pricing_file": "uxb-012-v2-pricing-en.html",
        "home": "/en",
        "pricing": "/en/pricing",
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


# One blue across the site (tbl-020): primary buttons and the blue band use the
# darker pair of the heading gradient, because white text on the heading blue
# (#1990d8 -> #2a6fdb) is only 3.49:1. #0f72b3 -> #2a5fcf is 5.15:1 at its
# lightest point. Hover = ink. Change it here, in one place.
BLUE_A, BLUE_B = "#0f72b3", "#2a5fcf"


def brand_blue_css(root):
    btns = ",".join(f"{root} {s}" for s in (".prompt button", ".m-acts a.p", ".cl-btn", ".pl-badge"))
    hovers = ",".join(f"{root} {s}" for s in (".prompt button:hover", ".m-acts a.p:hover", ".cl-btn:hover",
                                              ".pl-cta:hover", ".pl.pop .pl-cta:hover", ".pl-cta:focus-visible"))
    return f"""
/* ---- one blue (tbl-020): buttons + blue band, hover = ink ---- */
{root}{{--blue-a:{BLUE_A};--blue-b:{BLUE_B}}}
{btns}{{background:linear-gradient(90deg,var(--blue-a),var(--blue-b))!important;border-color:transparent!important;color:#fff!important}}
{hovers}{{background:var(--ink)!important;border-color:var(--ink)!important;color:#fff!important}}
{root} #inc.sec{{background:linear-gradient(100deg,var(--blue-a),var(--blue-b))!important}}
{root} .pl.pop .pl-cta{{border-color:var(--blue-a)!important;color:var(--blue-a)!important}}
{root} .pl.pop .pl-cta:hover,{root} .pl.pop .pl-cta:focus-visible{{color:#fff!important}}
"""


def build(lang, cfg, images, page="home"):
    home = page == "home"
    sheet = os.path.join(HOME_SHEETS, cfg["file"]) if home else os.path.join(PRICING_SHEETS, cfg["pricing_file"])
    src = open(sheet, encoding="utf-8").read()
    css = re.search(r"<style[^>]*>(.*?)</style>", src, re.S).group(1)
    body = re.search(r"<body[^>]*>(.*)</body>", src, re.S).group(1)
    body = re.sub(r"<script.*?</script>", "", body, flags=re.S)

    # -- review chrome out
    body = re.sub(r'<div class="sheet-label">.*?</div>\s*', "", body, flags=re.S)
    body = re.sub(r'<span class="ztag"[^>]*>.*?</span>', "", body, flags=re.S)
    assert "ztag" not in body and "sheet-label" not in body and "uxb-0" not in body

    # -- links
    body = body.replace('<a href="#"><svg class="logo-svg"', f'<a href="{cfg["home"]}" aria-label="{cfg["logo_label"]}"><svg class="logo-svg"', 1)

    nav = dict(cfg["nav"])
    if not home:
        # on the pricing page the section links go to the home page's sections
        for k, v in nav.items():
            if v.startswith("#"):
                nav[k] = ("/" if cfg["home"] == "/" else cfg["home"]) + v
        body = body.replace('href="#how"', f'href="{nav[next(k for k in nav if cfg["nav"][k] == "#how")]}"')
        body = body.replace('class="l" href="#faq"', f'class="l" href="{nav[next(k for k in nav if cfg["nav"][k] == "#faq")]}"')
        # plan buttons: same platform URLs as the live pricing page, billing follows the switch
        slugs = iter(["free", "start", "business", "pro"])
        def plan(m):
            slug = next(slugs)
            href = f"{PLATFORM}?plan=free" if slug == "free" else f"{PLATFORM}?plan={slug}&amp;billing=yearly"
            return f'<a class="pl-cta" href="{href}" data-plan="{slug}">{m.group(1)}</a>'
        body, nplans = re.subn(r'<a class="pl-cta" href="#">([^<]*)</a>', plan, body)
        assert nplans == 4, nplans
        body = body.replace('<a class="cl-btn" href="#">', f'<a class="cl-btn" href="{PLATFORM}">', 1)
        # language switch: pricing <-> pricing
        body = body.replace('<a href="/" lang="he"', '<a href="/pricing" lang="he"').replace('<a href="/en" lang="en"', '<a href="/en/pricing" lang="en"')
        # support address on its own line
        body, nmail = re.subn(r'(<a href="mailto:support@uxellent\.com")', r'<br>\1', body, count=1)
        assert nmail == 1

    def link(m):
        attrs, text = m.group(1), m.group(2)
        if 'href="#"' not in attrs:
            return m.group(0)
        href = nav.get(text.strip())
        assert href, f"no target for link {text!r} ({lang})"
        attrs = attrs.replace('href="#"', 'href="' + href + '"')
        if not home and href == cfg["pricing"] and "aria-current" not in attrs:
            attrs += ' aria-current="page"'
        return "<a" + attrs + ">" + text + "</a>"

    body = re.sub(r"<a([^>]*)>([^<]*)</a>", link, body)
    assert 'href="#"' not in body, f"unwired links left in {lang}"

    # -- menu / burger
    body = body.replace('<button class="burger" id="burger"', '<button type="button" class="burger" id="burger" aria-controls="menu" aria-expanded="false"', 1)

    if home:
        body = home_markup(body, cfg, images)
    else:
        assert body.count('<div class="bill"') == 1 and body.count('class="mq"') == 1
        body = body.replace('<button role="radio"', '<button type="button" role="radio"')

    # -- footer column titles become h2 (heading order), styled as before
    assert body.count("<h4>") == 2, "expected two footer h4"
    body = body.replace("<h4>", "<h2>").replace("</h4>", "</h2>")

    # -- CSS: no data URIs, scoped, Heebo from next/font, a few additions
    css = finish_css(css, lang, home)
    open(os.path.join(OUT, f"{'home' if home else 'pricing'}.{lang}.css"), "w", encoding="utf-8").write(css)

    faq = [
        {"q": re.sub(r"<[^>]+>", "", q).strip(), "a": re.sub(r"<[^>]+>", "", a).strip()}
        for q, a in re.findall(r"<summary>(.*?)<span class=\"pm\">\+</span></summary><div class=\"ans\">(.*?)</div>", body, re.S)
    ]
    want = 9 if home else 6
    assert len(faq) == want, f"expected {want} FAQ entries in {page}/{lang}, got {len(faq)}"
    name = "HOME" if home else "PRICING"
    ts = (
        f"// Generated by scripts/home-sheets/build.py from {os.path.basename(sheet)}. Do not edit by hand.\n"
        f"export const {name}_HTML_{lang.upper()} = {json.dumps(body.strip(), ensure_ascii=False)}\n\n"
        f"export const {name}_FAQ_{lang.upper()} = {json.dumps(faq, ensure_ascii=False, indent=2)} as const\n"
    )
    open(os.path.join(OUT, f"{'markup' if home else 'pricing-markup'}.{lang}.ts"), "w", encoding="utf-8").write(ts)
    print(page, lang, "markup", len(body), "css", len(css), "faq", len(faq))


def home_markup(body, cfg, images):
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

    return body


def finish_css(css, lang, home):
    css = re.sub(r"url\(data:image/[a-z+]+;base64,[A-Za-z0-9+/=]+\)", "none", css)
    # review chrome out of the CSS too: comments (they carry "uxb-0xx" version
    # notes) and every rule that targets .ztag / .sheet-label
    css = re.sub(r"/\*.*?\*/", "", css, flags=re.S)
    css = re.sub(r"(^|[{}])[^{}@]*(?:\.ztag|\.sheet-label)[^{}]*\{[^{}]*\}", r"\1", css)
    css = css.replace('font-family:"Heebo",', 'font-family:var(--font-heebo),"Heebo",')
    root = f".{'uxh' if home else 'uxp'}-{lang}"
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
    assert ".ft h4" not in css and (not home or " h5" not in css)
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
{root} .hw-n{{opacity:1}}
{root} .hw-t{{opacity:.48}}
{root} .hw-i:hover .hw-t{{opacity:.7}}
{root} .hw-i.on .hw-t{{opacity:1}}
{root} .gs-k{{color:#93712f}}
"""
    css += brand_blue_css(root)
    if home:
        # LCP (tbl-020): the demo headline is shown from the first paint
        css += f"{root} .gs-h.rv{{opacity:1!important;transform:none!important;filter:none!important;animation:none!important}}\n"
    else:
        # pricing FAQ (tbl-020): answers in black, support address on its own line
        css += f"{root} .faq .ans{{color:var(--ink)}}\n"
        # blue band with prefers-reduced-motion: no movement, items wrap and stay put
        css += (f"@media (prefers-reduced-motion:reduce){{{root} #inc .mq{{-webkit-mask:none;mask:none}}"
                f"{root} #inc .mq .inc{{flex-wrap:wrap!important;justify-content:center!important;width:auto!important;gap:10px 0!important;transform:none!important}}"
                f"{root} #inc .mq .in-c{{transform:none!important}}}}\n")
    return css


def main():
    images = {"hero-law": sharp_variants(os.path.join(HOME_SHEETS, "hero-law.webp"), "hero-law")}
    # The "how it works" site shot only exists inside the sheet, as a base64 CSS background.
    he = open(os.path.join(HOME_SHEETS, LANGS["he"]["file"]), encoding="utf-8").read()
    m = re.search(r"\.a2-img\{background:url\(data:image/webp;base64,([A-Za-z0-9+/=]+)\)", he)
    tmp = os.path.join(PUB, "_how-site-src.webp")
    open(tmp, "wb").write(base64.b64decode(m.group(1)))
    images["how-site"] = sharp_variants(tmp, "how-site")
    os.remove(tmp)
    for lang, cfg in LANGS.items():
        build(lang, cfg, images, "home")
        build(lang, cfg, images, "pricing")


main()
