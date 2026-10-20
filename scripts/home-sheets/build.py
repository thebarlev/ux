#!/usr/bin/env python3
"""
Builds the home pages (/ and /en) from Itzik's approved review sheets.

    python3 scripts/home-sheets/build.py <sheet-dir> <contact-sheet-dir> <image-dir> <page-sheet-dir> <nav-sheet-dir> <features-sheet-dir>

<sheet-dir> holds the four approved sheets (tbl-021): uxb-009-v35-home-he.html,
uxb-010-v6-home-en.html, uxb-011-v12-pricing-he.html, uxb-012-v3-pricing-en.html;
<contact-sheet-dir> holds uxb-013-v6-contact-he.html and uxb-014-v2-contact-en.html
(tbl-022); <image-dir> holds hero-law.webp (tbl-019); <page-sheet-dir> holds
uxb-015-v1-faq-he.html, uxb-016-v1-faq-en.html and the text-page templates
uxb-017-v1-text-page-he.html, uxb-018-v1-text-page-en.html (tbl-023); <nav-sheet-dir> holds
uxb-021-v2-navkit-reference-he.html (header, mobile menu, breadcrumbs and footer for
every page), uxb-019-v1-blog-he.html and uxb-020-v2-article-he.html (tbl-024);
<features-sheet-dir> holds uxb-021-v7-features-he.html and uxb-022-v1-features-en.html (tbl-025).
The English blog and article pages are built from the Hebrew sheets with the
English texts below (there is no English sheet for them). The sheets are the source of truth for markup and CSS;
this script only:
  - drops the review chrome (.sheet-label, every .ztag),
  - wires the links (anchors, pricing/contact/legal pages, platform URLs),
  - turns the base64 CSS backgrounds into real responsive <img> files,
  - scopes every CSS rule under .uxh-he / .uxh-en so nothing leaks to other
    pages, and points font-family at the next/font Heebo variable,
  - adds the aria wiring the sheets leave out (tabs, carousel, menu),
  - leaves out the sheets' copy of the mobile type rule: the site keeps it in
    one place, src/app/mobile-type.css, for these pages and every inner page.
Outputs: src/app/_home/{markup,pricing-markup,contact-markup,faq-markup,text-markup}.{he,en}.ts and
{home,pricing,contact,faq,text}.{he,en}.css, plus public/home/*.{webp,avif}. Image variants need sharp (from node_modules).
"""
import base64
import glob
import json
import os
import re
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
HOME_SHEETS = PRICING_SHEETS = sys.argv[1]
CONTACT_SHEETS = sys.argv[2]
IMAGES = sys.argv[3]
PAGE_SHEETS = sys.argv[4]
NAV_SHEETS = sys.argv[5]
FEATURES_SHEETS = sys.argv[6]
OUT = os.path.join(ROOT, "src/app/_home")
PUB = os.path.join(ROOT, "public/home")
os.makedirs(OUT, exist_ok=True)
os.makedirs(PUB, exist_ok=True)

PLATFORM = "https://ai.uxellent.com"  # the address every CTA on the live site already uses

LANGS = {
    "he": {
        "file": "uxb-009-v35-home-he.html",
        "pricing_file": "uxb-011-v12-pricing-he.html",
        "contact_file": "uxb-013-v6-contact-he.html",
        "faq_file": "uxb-015-v1-faq-he.html",
        "text_file": "uxb-017-v1-text-page-he.html",
        "features_file": "uxb-021-v7-features-he.html",
        "home": "/",
        "blog": "/blog",
        "pricing": "/pricing",
        "contact": "/contact",
        "faq": "/faq",
        "pre": "",
        "nav": {
            "איך זה עובד": "#how",
            "מה מקבלים": "/features",
            "למי זה מתאים": "#who",
            "מאמרים": "/blog",
            "הצהרת נגישות": "/accessibility",
            "מחירים": "/pricing",
            "שאלות נפוצות": "/faq",
            "צור קשר": "/contact",
            "כניסה": PLATFORM,
            "הצטרפות חינם": PLATFORM,
            "בנו לי אתר בחינם": PLATFORM,
            "בנו לי אתר": PLATFORM,
            "תנאי שימוש": "/terms",
            "מדיניות פרטיות": "/privacy",
            "עמוד המחירים": "/pricing",
            "לכל החבילות והמחירים": "/pricing",
        },
        "logo_label": "Uxellent, לעמוד הבית",
        # home FAQ, own domain (tbl-023): only on Business and Pro, same text as the FAQ page
        "domain_q": "אפשר לחבר דומיין משלי?",
        "domain_a": "כן, בחבילות עסקי ומקצועי. קונים דומיין אצל רשם, ואנחנו מחברים אותו. בלי דומיין, האתר עולה על כתובת חינמית שאנחנו נותנים.",
        "carousel": "מה מקבלים",
        "slide": "{n} מתוך {t}",
        "hero_alt": "",
    },
    "en": {
        "file": "uxb-010-v6-home-en.html",
        "pricing_file": "uxb-012-v3-pricing-en.html",
        "contact_file": "uxb-014-v2-contact-en.html",
        "faq_file": "uxb-016-v1-faq-en.html",
        "text_file": "uxb-018-v1-text-page-en.html",
        "features_file": "uxb-022-v1-features-en.html",
        "home": "/en",
        "blog": "/en/blog",
        "pricing": "/en/pricing",
        "contact": "/en/contact",
        "faq": "/en/faq",
        "pre": "/en",
        "nav": {
            "How it works": "#how",
            "What you get": "/en/features",
            "Who it’s for": "#who",
            "Blog": "/en/blog",
            "Accessibility statement": "/en/accessibility",
            "Pricing": "/en/pricing",
            "FAQ": "/en/faq",
            "Contact": "/en/contact",
            "Log in": PLATFORM,
            "Start free": PLATFORM,
            "Build my site, free": PLATFORM,
            "Build my site": PLATFORM,
            "Terms of use": "/en/terms",
            "Privacy policy": "/en/privacy",
            "pricing page": "/en/pricing",
            "See all plans and pricing": "/en/pricing",
        },
        "logo_label": "Uxellent, home",
        "domain_q": "Can I use my own domain?",
        "domain_a": "Yes, on Business and Pro. Buy a domain from any registrar and we’ll connect it for you. Without one, your site goes live on a free address we give you.",
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
            elif s.startswith("[dir="):
                d, rest = s.split(" ", 1)
                parts.append(f"{d} {root} {rest}")
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
    btns = ",".join(f"{root} {s}" for s in (".go-btn", ".m-acts a.p", ".cl-btn", ".ct-btn", ".pl-badge"))
    hovers = ",".join(f"{root} {s}" for s in (".go-btn:hover", ".go-btn:focus-visible", ".ct-btn:hover", ".ct-btn:focus-visible", ".m-acts a.p:hover", ".cl-btn:hover",
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
    sheet = {
        "home": os.path.join(HOME_SHEETS, cfg["file"]),
        "pricing": os.path.join(PRICING_SHEETS, cfg["pricing_file"]),
        "contact": os.path.join(CONTACT_SHEETS, cfg["contact_file"]),
        "faq": os.path.join(PAGE_SHEETS, cfg["faq_file"]),
        "text": os.path.join(PAGE_SHEETS, cfg["text_file"]),
        "blog": os.path.join(NAV_SHEETS, BLOG_SHEET),
        "guides": os.path.join(NAV_SHEETS, BLOG_SHEET),
        "article": os.path.join(NAV_SHEETS, ARTICLE_SHEET),
        "features": os.path.join(FEATURES_SHEETS, cfg["features_file"]),
    }[page]
    src = open(sheet, encoding="utf-8").read()
    css = re.search(r"<style[^>]*>(.*?)</style>", src, re.S).group(1)
    body = sheet_body(src)

    # -- one header, mobile menu and footer on every page (navkit, tbl-024)
    head, foot = chrome(lang)
    body, nh = re.subn(r"<header id=\"hdr\">.*?</header>", lambda m: head, body, count=1, flags=re.S)
    body, nf = re.subn(r"<footer\b.*?</footer>", lambda m: foot, body, count=1, flags=re.S)
    assert (nh, nf) == (1, 1), (page, nh, nf)
    if lang == "en" and page in ("blog", "guides", "article"):
        body = english_page(body, page)
        css = css.replace("text-align:right", "text-align:start")
    if page in ("blog", "guides"):
        body = blog_markup(body, lang, cfg, page)
    elif page == "article":
        body = article_markup(body, lang, cfg)
    elif page == "features":
        body = features_markup(body, lang, src)

    # -- links
    body = body.replace('<a href="#"><svg class="logo-svg"', f'<a href="{cfg["home"]}" aria-label="{cfg["logo_label"]}"><svg class="logo-svg"', 1)

    nav = dict(cfg["nav"])
    if not home:
        # on the inner pages the section links go to the home page's sections
        for k, v in nav.items():
            if v.startswith("#"):
                nav[k] = ("/" if cfg["home"] == "/" else cfg["home"]) + v
    if page == "pricing":
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
        # the current page is marked when the page renders (HomePage markCurrent)
        return "<a" + attrs + ">" + text + "</a>"

    body = re.sub(r"<a([^>]*)>([^<]*)</a>", link, body)
    assert 'href="#"' not in body, f"unwired links left in {lang}"

    # -- menu / burger
    body = body.replace('<button class="burger" id="burger"', '<button type="button" class="burger" id="burger" aria-controls="menu" aria-expanded="false"', 1)

    if home:
        body = home_markup(body, cfg, images)
    elif page == "contact":
        body = contact_markup(body, lang, cfg)
    elif page == "faq":
        body = faq_markup(body, lang, cfg)
    elif page == "text":
        body = text_markup(body, lang, cfg)
    elif page in ("blog", "guides", "article"):
        pass  # done before the links (see above)
    elif page == "features":
        pass  # done before the links (see above)
    else:
        assert body.count('<div class="bill"') == 1 and body.count('class="mq"') == 1
        body = body.replace('<button role="radio"', '<button type="button" role="radio"')
        # heading order: the plan names are h3 under the h1, so a visually hidden
        # h2 names the plans group (no visual change)
        assert body.count('<div class="plans">') == 1
        body = body.replace('<div class="plans">', f'<h2 class="uxh-vh">{"חבילות" if lang == "he" else "Plans"}</h2><div class="plans">')

    # -- footer column titles become h2 (heading order), styled as before
    assert body.count("<h4>") == 3, "expected three footer h4"
    body = body.replace("<h4>", "<h2>").replace("</h4>", "</h2>")

    # -- skip link, main landmark, breadcrumbs slot (tbl-024 accessibility pass)
    body = landmarks(body, lang, home)

    # -- CSS: no data URIs, scoped, Heebo from next/font, a few additions
    css = finish_css(css, lang, page)
    open(os.path.join(OUT, f"{page}.{lang}.css"), "w", encoding="utf-8").write(css)

    faq = [
        {"q": re.sub(r"<[^>]+>", "", q).strip(), "a": re.sub(r"<[^>]+>", "", a).strip()}
        for q, a in re.findall(r"<summary>(.*?)<span class=\"pm\">\+</span></summary><div class=\"ans\">(.*?)</div>", body, re.S)
    ]
    want = {"home": 9, "pricing": 6, "contact": 0, "faq": 18, "text": 0, "blog": 0, "guides": 0, "article": 0, "features": 0}[page]
    assert len(faq) == want, f"expected {want} FAQ entries in {page}/{lang}, got {len(faq)}"
    name = page.upper()
    ts = (
        f"// Generated by scripts/home-sheets/build.py from {os.path.basename(sheet)}. Do not edit by hand.\n"
        f"export const {name}_HTML_{lang.upper()} = {json.dumps(body.strip(), ensure_ascii=False)}\n\n"
        f"export const {name}_FAQ_{lang.upper()} = {json.dumps(faq, ensure_ascii=False, indent=2)} as const\n"
    )
    if page in ("blog", "guides", "article"):
        ts += extra_parts(body, lang, page)
    if page == "article":
        write_chrome(body, css, lang)
    open(os.path.join(OUT, f"{'markup' if home else page + '-markup'}.{lang}.ts"), "w", encoding="utf-8").write(ts)
    print(page, lang, "markup", len(body), "css", len(css), "faq", len(faq))


def contact_markup(body, lang, cfg):
    """Contact page (tbl-022): the sheet's form, wired for HomeBehaviors and /api/site-contact."""
    # language switch: contact <-> contact
    body = body.replace('<a href="/" lang="he"', '<a href="/contact" lang="he"').replace('<a href="/en" lang="en"', '<a href="/en/contact" lang="en"')
    assert body.count('<form class="ct-form" novalidate onsubmit="return false">') == 1
    body = body.replace('<form class="ct-form" novalidate onsubmit="return false">',
                        '<form class="ct-form" novalidate method="post" data-uxc-form>')
    # each field: its label names it, its error (filled in by the script) describes it
    for name in ("name", "email", "topic", "msg"):
        body, n = re.subn(rf'<label class="fld2"><span>([^<]*)</span><(input|select|textarea) name="{name}"',
                          rf'<label class="fld2"><span id="uxc-{name}-l">\1</span><\2 id="uxc-{name}" name="{name}" aria-labelledby="uxc-{name}-l"', body, count=1)
        assert n == 1, name
    for name in ("name", "email", "msg"):
        body, n = re.subn(rf'(<(?:input|textarea) id="uxc-{name}" [^>]*?) required>',
                          rf'\1 required aria-required="true" aria-describedby="uxc-{name}-e">', body, count=1)
        assert n == 1, name
        close = "</textarea>" if name == "msg" else ""
        body, n = re.subn(rf'(<(?:input|textarea) id="uxc-{name}" [^>]*>{close})</label>',
                          rf'\1<span class="uxc-err" id="uxc-{name}-e"></span></label>', body, count=1)
        assert n == 1, name
    # spam: a field people never see; bots fill it in
    hp = "Website" if lang == "en" else "אתר"
    body = body.replace('<button class="ct-btn" type="submit">',
                        f'<div class="uxc-hp" aria-hidden="true"><label>{hp}<input name="website" tabindex="-1" autocomplete="off"></label></div>'
                        '<p class="uxc-fail" role="alert" hidden></p><button class="ct-btn" type="submit">', 1)
    # after sending, the form makes way for this
    body = body.replace("</form>", '</form><p class="uxc-done" role="status" tabindex="-1" hidden></p>', 1)
    assert "<details" not in body and "tel:" not in body
    return body


# Contact page additions (tbl-022): errors, honeypot, the thank-you line.
CONTACT_CSS = """
/* ---- contact form (tbl-022) ---- */
{root} [hidden]{display:none!important}
{root} .uxc-hp{position:absolute!important;inset-inline-start:-10000px;width:1px;height:1px;overflow:hidden}
{root} .fld2>span.uxc-err{display:block;font-size:15px;line-height:1.4;color:#b42318;font-weight:500}
{root} .fld2>span.uxc-err:empty{display:none}
{root} .fld2 [aria-invalid=true]{border-color:#d92d20}
{root} .fld2 [aria-invalid=true]:focus{box-shadow:0 0 0 3px rgba(217,45,32,.16)}
{root} .uxc-fail{color:#b42318;font-weight:600;text-align:center;line-height:1.5}
{root} .uxc-done{max-width:560px;margin:0 auto;text-align:center;font-size:clamp(20px,1.6vw,22px);line-height:1.55;font-weight:600;color:var(--ink);background:#fff;border:1px solid var(--line);border-radius:24px;padding:clamp(28px,3vw,44px);box-shadow:var(--sh)}
{root} .uxc-done:focus{outline:none}
{root} .ct-btn[aria-busy=true]{opacity:.7;cursor:progress}
@media(max-width:768px){{root} .uxc-done{background:none;border:0;box-shadow:none;padding:8px 0}}
@media(max-width:1060px){{root} .fld2>span.uxc-err{font-size:16px!important}}
"""


ROOTS = {"home": "uxh", "pricing": "uxp", "contact": "uxc", "faq": "uxf", "text": "uxt", "blog": "uxb", "guides": "uxg", "article": "uxa", "features": "uxw"}


def faq_markup(body, lang, cfg):
    """FAQ page (tbl-023): 18 questions in 4 topics; the topic menu is driven by HomeBehaviors."""
    body = body.replace('<a href="/" lang="he"', '<a href="/faq" lang="he"').replace('<a href="/en" lang="en"', '<a href="/en/faq" lang="en"')
    assert body.count('<details>') == 18 and body.count('class="fq-g"') == 4 and body.count('class="fq-nav"') == 1
    body = body.replace('<nav class="fq-nav"', '<nav class="fq-nav" data-uxf-nav', 1)
    return body


def text_markup(body, lang, cfg):
    """Text-page template (tbl-023): one chrome per language; HomePage fills in the
    title, the date, the table of contents and the page's own text."""
    body = body.replace('<a href="/" lang="he"', '<a href="{{HE_PATH}}" lang="he"').replace('<a href="/en" lang="en"', '<a href="{{EN_PATH}}" lang="en"')
    body, n1 = re.subn(r'<h1 class="pr-h">.*?</h1>', '<h1 class="pr-h">{{TITLE}}</h1>', body, count=1, flags=re.S)
    body, n2 = re.subn(r'<p class="lg-date">.*?</p>', '<p class="lg-date">{{DATE}}</p>', body, count=1, flags=re.S)
    body, n3 = re.subn(r'(<nav class="fq-nav" aria-label="[^"]*")>.*?</nav>', r'\1 data-uxf-nav>{{TOC}}</nav>', body, count=1, flags=re.S)
    body, n4 = re.subn(r'<div class="lg-body">.*?</section></div>', '<div class="lg-body">{{BODY}}</div>', body, count=1, flags=re.S)
    assert (n1, n2, n3, n4) == (1, 1, 1, 1), (n1, n2, n3, n4)
    assert "closing" not in body and "<details" not in body
    return body


# Site-wide (tbl-023), on every sheet page: the blue words in headings use the
# button blue, and the footer's language links sit on the grid edge.
SITE_CSS = """
/* ---- one blue in headings, footer edge (tbl-023) ---- */
{root} :is(h1,h2) .bl{background:linear-gradient(90deg,var(--blue-a),var(--blue-b))!important;-webkit-background-clip:text!important;background-clip:text!important;color:transparent!important}
{root} footer{padding-bottom:28px!important}
{root} .lang{gap:24px!important}
{root} .lang a{padding-inline:0!important;margin:0!important}
{root} .uxh-vh{position:absolute!important;width:1px!important;height:1px!important;overflow:hidden!important;clip:rect(0 0 0 0)!important;white-space:nowrap!important;margin:0!important;padding:0!important}
"""

# FAQ page and the text pages' table of contents (tbl-023).
FAQ_CSS = """
/* ---- topic menu (tbl-023) ---- */
{root} .fq-nav a[aria-current=true]{background:var(--tint);color:var(--brand-d)}
{root} .fq-list,{root} .lg-body{min-width:0}
"""

# Text pages (tbl-023): the live texts also have sub-headings, labels and bold
# words, which the template's sample section does not show.
TEXT_CSS = """
/* ---- text pages (tbl-023) ---- */
{root} .lg-body{overflow-wrap:break-word}
{root} .lg-s h3{font-size:20px;font-weight:700;line-height:1.4;letter-spacing:-.01em;margin-top:24px}
{root} .lg-s h4{font-size:18px;font-weight:700;line-height:1.5;margin-top:16px}
{root} .lg-s h2+h3{margin-top:4px}
{root} .lg-s :is(h3,h4)+:is(p,ul){margin-top:6px}
{root} .lg-s ul+ul,{root} .lg-s p+h4,{root} .lg-s ul+h4{margin-top:12px}
{root} .lg-s strong{font-weight:700}
{root} .lg-s ul.lg-plain{list-style:none;padding-inline-start:0}
{root} .lg-s p:empty{display:none}
@media(min-width:1061px){{root} .lg .fq-nav{max-height:calc(100vh - 130px);overflow-y:auto;scrollbar-width:thin}}
@media(max-width:1060px){{root} .lg-s h3{font-size:22px!important}{root} .lg-s h4{font-size:20px!important}{root} .lg-date{font-size:16px!important}}
"""


BLOG_SHEET = "uxb-019-v1-blog-he.html"
ARTICLE_SHEET = "uxb-020-v2-article-he.html"
NAVKIT_SHEET = "uxb-021-v2-navkit-reference-he.html"


def sheet_body(src):
    """The sheet's body without its scripts and review chrome."""
    body = re.search(r"<body[^>]*>(.*)</body>", src, re.S).group(1)
    body = re.sub(r"<script.*?</script>", "", body, flags=re.S)
    body = re.sub(r'<div class="sheet-label">.*?</div>\s*', "", body, flags=re.S)
    body = re.sub(r'<span class="ztag"[^>]*>.*?</span>', "", body, flags=re.S)
    assert "ztag" not in body and "sheet-label" not in body and "uxb-0" not in body
    return body


# English for the navkit chrome (the reference sheet is Hebrew only), in the
# wording the English sheets already use.
CHROME_EN = {
    "מה מקבלים": "What you get", "למי זה מתאים": "Who it’s for", "מחירים": "Pricing", "מאמרים": "Blog",
    "שאלות נפוצות": "FAQ", "צור קשר": "Contact", "כניסה": "Log in", "הצטרפות חינם": "Start free",
    "איך זה עובד": "How it works", "האתר": "Product", "חשבון": "Account", "מידע": "Info",
    "תנאי שימוש": "Terms of use", "מדיניות פרטיות": "Privacy policy", "הצהרת נגישות": "Accessibility statement",
}


def chrome(lang):
    """Header, mobile menu and footer from the navkit reference (tbl-024), for every page."""
    body = sheet_body(open(os.path.join(NAV_SHEETS, NAVKIT_SHEET), encoding="utf-8").read())
    head = re.search(r'<header id="hdr">.*?</header>', body, re.S).group(0)
    foot = re.search(r"<footer\b.*?</footer>", body, re.S).group(0)
    # the sheet marks its own page; the site marks the current page when it renders
    head, foot = head.replace(' aria-current="page"', ""), foot.replace(' aria-current="page"', "")
    if lang == "he":
        return head, foot
    for he, en in CHROME_EN.items():
        head = head.replace(f">{he}<", f">{en}<")
        foot = foot.replace(f">{he}<", f">{en}<")
    head = head.replace('aria-label="ראשי"', 'aria-label="Main"').replace('aria-label="תפריט"', 'aria-label="Menu"')
    # footer lead and points: the English sheet's
    en_body = sheet_body(open(os.path.join(PAGE_SHEETS, LANGS["en"]["faq_file"]), encoding="utf-8").read())
    for cls in ("ft-lead", "ft-pts"):
        tag = "p" if cls == "ft-lead" else "ul"
        en_part = re.search(rf'<{tag} class="{cls}">.*?</{tag}>', en_body, re.S).group(0)
        foot, n = re.subn(rf'<{tag} class="{cls}">.*?</{tag}>', lambda m: en_part, foot, count=1, flags=re.S)
        assert n == 1, cls
    foot = foot.replace('hreflang="he" aria-current="true"', 'hreflang="he"').replace('hreflang="en">', 'hreflang="en" aria-current="true">')
    assert not re.search(r"[֐-׿]", re.sub(r'lang="he"[^>]*>[^<]*<', "", foot + head)), "Hebrew left in the English chrome"
    return head, foot


# English texts for the blog, guides and article pages (built from the Hebrew sheets).
BLOG_EN = {
    'דברים שלמדנו <span class="bl">תוך כדי עבודה.</span>': 'Things we learned <span class="bl">on the job.</span>',
    "מאמרים קצרים על אתרים, קידום ו-AI, לעסקים שמוכרים שירות.": "Short articles on websites, search and AI, for businesses that sell a service.",
    'מדריכי <span class="bl">צמיחה.</span>': 'Growth <span class="bl">guides.</span>',
    "מדריכים קצרים ומדויקים על SEO, תנועה, לידים וקידום דיגיטלי.": "Short, precise guides on SEO, traffic, leads and digital marketing.",
    'aria-label="במאמר הזה"': 'aria-label="In this article"',
}


def english_page(body, page):
    for he, en in BLOG_EN.items():
        body = body.replace(he, en)
    # closing: the English sheets' closing section
    en_body = sheet_body(open(os.path.join(PAGE_SHEETS, LANGS["en"]["faq_file"]), encoding="utf-8").read())
    en_close = re.search(r'<div class="closing">.*?</div></div>', en_body, re.S).group(0)
    body, n = re.subn(r'<div class="closing">.*?</div></div>', lambda m: en_close, body, count=1, flags=re.S)
    assert n == 1
    return body


PARTS = {}


def blog_markup(body, lang, cfg, page):
    """Blog index /blog and growth guides /growth-guides (uxb-019, tbl-024): the
    cards become templates that HomePage fills from the articles and guides."""
    feat = re.search(r'<a class="bl-feat" href="#">.*?</a>(?=<div class="bl-cards">)', body, re.S).group(0)
    card = re.search(r'<a class="bl-c" href="#">.*?</a>', body, re.S).group(0)
    guide = re.search(r'<a class="bl-g" href="#">.*?</a>', body, re.S).group(0)
    tok = lambda html: (re.sub(r'<span class="bl-k">[^<]*</span>', '<span class="bl-k">{{K}}</span>', html)
                        .replace('href="#"', 'href="{{HREF}}"'))
    feat = tok(feat)
    feat = re.sub(r"<h2>.*?</h2>", "<h2>{{T}}</h2>", feat, flags=re.S)
    feat = re.sub(r"<p>.*?</p>", "<p>{{P}}</p>", feat, flags=re.S)
    feat = re.sub(r'<span class="bl-m">[^<]*<i>', '<span class="bl-m">{{M}} <i aria-hidden="true">', feat)
    card = tok(card)
    card = re.sub(r"<h3>.*?</h3>", "<h3>{{T}}</h3>", card, flags=re.S)
    card = re.sub(r"<p>.*?</p>", "{{P}}", card, flags=re.S)
    card = re.sub(r'<span class="bl-m">[^<]*</span>', '<span class="bl-m">{{M}}</span>', card)
    guide = tok(guide)
    guide = re.sub(r'<span class="bl-n">[^<]*</span>', '<span class="bl-n">{{N}}</span>', guide)
    guide = re.sub(r"<h3>.*?</h3>", "<h3>{{T}}</h3>", guide, flags=re.S)
    guide = re.sub(r"<p>.*?</p>", "<p>{{P}}</p>", guide, flags=re.S)
    PARTS[(lang, page)] = {"featured": feat, "card": card, "guide": guide}

    top = '<div class="bl-top">{{FEATURED}}<div class="bl-cards">{{CARDS}}</div></div>'
    body, n1 = re.subn(r'<div class="bl-top">.*?</a></div></div>', lambda m: top, body, count=1, flags=re.S)
    body, n2 = re.subn(r'<div class="bl-grid">.*?</a></div>', lambda m: '<div class="bl-grid">{{GUIDES}}</div>', body, count=1, flags=re.S)
    assert (n1, n2) == (1, 1), (n1, n2)
    paths = ("/blog", "/en/blog") if page == "blog" else ("/growth-guides", "/en/growth-guides")
    if page == "guides":
        # same template with the guides only: the guides take the top of the page
        h1, lead = ('מדריכי <span class="bl">צמיחה.</span>', "מדריכים קצרים ומדויקים על SEO, תנועה, לידים וקידום דיגיטלי.")
        if lang == "en":
            h1, lead = BLOG_EN[h1], BLOG_EN[lead]
        body = re.sub(r'(<h1 class="pr-h">).*?(</h1>)', lambda m: m.group(1) + h1 + m.group(2), body, count=1, flags=re.S)
        body = re.sub(r'(<p class="pr-lead">).*?(</p>)', lambda m: m.group(1) + lead + m.group(2), body, count=1, flags=re.S)
        # heading order: the guide titles are h3, so a visually hidden h2 names the list
        body = body.replace(top, f'<h2 class="uxh-vh">{"המדריכים" if lang == "he" else "The guides"}</h2><div class="bl-grid">{{{{GUIDES}}}}</div>', 1)
        body, n = re.subn(r'<section class="sec zone" id="guides">.*?</section>\s*', "", body, count=1, flags=re.S)
        assert n == 1
    body = body.replace('<a href="/" lang="he"', f'<a href="{paths[0]}" lang="he"').replace('<a href="/en" lang="en"', f'<a href="{paths[1]}" lang="en"')
    return body


def article_markup(body, lang, cfg):
    """Article template (uxb-020, tbl-024b): the article itself is React (MDX or
    guide data, see ArticlePage); this keeps the related cards and the closing."""
    i = body.index('<section class="sec zone ct-top" id="article">')
    j = body.index('<section class="sec zone" id="related">')
    body = body[:i] + "{{ARTICLE}}" + body[j:]
    card = re.search(r'<div class="ar-rel">(<a class="bl-c" href="#">.*?</a>)', body, re.S).group(1)
    card = re.sub(r'<span class="bl-k">[^<]*</span>', '<span class="bl-k">{{K}}</span>', card).replace('href="#"', 'href="{{HREF}}"')
    card = re.sub(r"<h3>.*?</h3>", "<h3>{{T}}</h3>", card, flags=re.S)
    card = re.sub(r'<span class="bl-m">[^<]*</span>', '<span class="bl-m">{{M}}</span>', card)
    PARTS[(lang, "article")] = {"card": card}
    body, n1 = re.subn(r'<div class="ar-rel">.*?</a></div>', lambda m: '<div class="ar-rel">{{RELATED}}</div>', body, count=1, flags=re.S)
    body, n2 = re.subn(r'(<section class="sec zone" id="related"><div class="wrap">\s*<div class="sh bl-gh"><h2>).*?(</h2>)', r"\1{{REL_H}}\2", body, count=1, flags=re.S)
    body, n3 = re.subn(r'<p class="ar-all"><a class="lnk" href="#">[^<]*</a></p>', '<p class="ar-all"><a class="lnk" href="{{ALL_HREF}}">{{ALL_LABEL}}</a></p>', body, count=1)
    assert (n1, n2, n3) == (1, 1, 1), (n1, n2, n3)
    body = body.replace('<a href="/" lang="he"', '<a href="{{HE_PATH}}" lang="he"').replace('<a href="/en" lang="en"', '<a href="{{EN_PATH}}" lang="en"')
    return body


def features_markup(body, lang, src):
    """What you get, /features (uxb-021 HE, uxb-022 EN, tbl-025). The four
    mockups are pictures of the product, hidden from assistive technology.
    Their first frame is written into the markup (that is also the reduced
    motion view); HomeBehaviors plays the rest, with the sheet's own texts,
    which the script reads from data attributes."""
    body = body.replace('<a href="/" lang="he"', '<a href="/features" lang="he"').replace('<a href="/en" lang="en"', '<a href="/en/features" lang="en"')
    # the sheet's breadcrumbs: the site writes its own in the same place (landmarks, {{CRUMB}})
    body, n = re.subn(r'<nav class="crumb"[^>]*>.*?</nav>', "", body, count=1, flags=re.S)
    assert n == 1 and body.count('<div class="fr-v">') == 4
    body = body.replace('<div class="fr-v">', '<div class="fr-v" aria-hidden="true">')
    # the comparison table's corner cell names the row headers (screen readers only)
    corner = "מה משווים" if lang == "he" else "Compared"
    body, n = re.subn(r'<thead><tr><th></th>', f'<thead><tr><th><span class="uxh-vh">{corner}</span></th>', body, count=1)
    assert n == 1
    js = re.findall(r"<script>(.*?)</script>", src, re.S)[-1]
    attr = lambda v: json.dumps(v, ensure_ascii=False).replace("&", "&amp;").replace('"', "&quot;")
    # three sites: the front one first (the script's starting order)
    sites = re.findall(r'<div class="st st-[abc]">', body)
    assert len(sites) == 3
    for k, cls in enumerate(["st-c", "st-b", "st-a"]):
        body = body.replace(f'<div class="st {cls}">', f'<div class="st {cls}" data-p="{2 - k}">', 1)
    # chat: the first request and its answer
    q = re.findall(r"\['([^']*)','([^']*)'\]", re.search(r"const Q=\[(.*?)\];", js, re.S).group(1))
    assert len(q) == 5, q
    log = f'<div class="mk-msg me">{q[0][0]}</div><div class="mk-msg ai"><span class="mk-dot"></span><span>{q[0][1]}</span></div>'
    body, n1 = re.subn(r'<div class="mk mk-b" data-anim="chat"><div class="mk-log"></div><div class="mk-in"><span class="mk-typ">',
                       lambda m: f'<div class="mk mk-b" data-anim="chat" data-q="{attr(q)}"><div class="mk-log">{log}</div><div class="mk-in"><span class="mk-typ ph">', body, count=1)
    # enquiries: three items, the newest on top
    icons = dict(re.findall(r"\b([MW])='(<svg.*?</svg>)'", js, re.S))
    leads = [(["M", "W"].index(i), t, e) for i, t, e in re.findall(r"\[([MW]),'([^']*)','([^']*)'\]", js)]
    now = re.search(r"textContent:'([^']*)'", js).group(1)
    assert len(icons) == 2 and len(leads) == 6 and now
    ic = [icons["M"], icons["W"]]
    item = lambda it, k: (f'<div class="mk-mail{" old" if k else ""}">{ic[it[0]]}<span><b>{it[1]}</b><em>{it[2]}</em></span>'
                          + ('<i class="mk-new"></i>' if k == 0 else f"<small>{now}</small>") + "</div>")
    feed = "".join(item(leads[k], k) for k in range(3))
    body, n2 = re.subn(r'<div class="mk mk-d" data-anim="leads"><div class="mk-feed"></div>',
                       lambda m: f'<div class="mk mk-d" data-anim="leads" data-leads="{attr(leads)}" data-icons="{attr(ic)}" data-now="{now}"><div class="mk-feed">{feed}</div>', body, count=1)
    assert (n1, n2) == (1, 1), (n1, n2)
    return body


# Features page (tbl-025): the law-firm mockup uses the hero photo, as a file.
FEATURES_CSS = """
/* ---- features (tbl-025) ---- */
{root} .st-img:not(.st-img-b):not(.st-img-c){background:url(/home/hero-law-480.webp) center/cover}
/* the request being typed stays on one line (the box keeps its height on a 320px phone); the script keeps its end in view */
{root} .mk-typ{flex:1;min-width:0;overflow:hidden;white-space:nowrap;padding-inline-end:8px}
/* the site's base CSS makes every svg a block; in the table the check sits beside the text on desktop (above it on mobile, as in the sheet) */
@media(min-width:1061px){{root} .cmp td.us svg{display:inline-block}}
"""


SKIP = {"he": "דלג לתוכן", "en": "Skip to content"}


def landmarks(body, lang, home):
    """Skip link, <main>, and the breadcrumbs slot on inner pages (tbl-024)."""
    body = body.replace('<header id="hdr">', f'<a class="skip" href="#main">{SKIP[lang]}</a><header id="hdr">', 1)
    body = body.replace("</header>", '</header><main id="main" tabindex="-1">', 1)
    k = body.rindex("<footer")
    body = body[:k] + "</main>" + body[k:]
    if not home and "{{ARTICLE}}" not in body:
        if '<div class="lg-head">' in body:
            body = body.replace('<div class="lg-head">', '<div class="lg-head">{{CRUMB}}', 1)
        else:
            # inside the first section's wrap; a wrap that is also a layout
            # (contact: "wrap ct", a grid) gets its own wrap above it
            m = body.index('<main id="main" tabindex="-1">')
            w = body.index('<div class="wrap', m)
            if body.startswith('<div class="wrap">', w):
                w += len('<div class="wrap">')
                body = body[:w] + "{{CRUMB}}" + body[w:]
            else:
                body = body[:w] + '<div class="wrap">{{CRUMB}}</div>' + body[w:]
    return body


def extra_parts(body, lang, page):
    return (f"\nexport const {page.upper()}_PARTS_{lang.upper()} = "
            f"{json.dumps(PARTS[(lang, page)], ensure_ascii=False, indent=1)} as const\n")


# classes the page scripts add, kept when the chrome CSS is trimmed
JS_CLASSES = {"open", "x", "on", "in", "uxh-off", "hot", "scrolled", "crumb"}


def split_top(sel):
    """Split a selector list at its top-level commas (not inside :is(), :not()...)."""
    out, depth, cur = [], 0, ""
    for ch in sel:
        depth += {"(": 1, ")": -1}.get(ch, 0)
        if ch == "," and depth == 0:
            out.append(cur)
            cur = ""
        else:
            cur += ch
    return out + [cur]


def prune_css(css, markup, root):
    """Only the rules the chrome's own markup can match (for the pages that use
    just the header and footer)."""
    have = set(re.findall(r'class="([^"]*)"', markup))
    have = {c for group in have for c in group.split()} | set(re.findall(r'id="([^"]*)"', markup)) | JS_CLASSES | {root[1:]}

    def keep_sel(sel):
        return all(t in have for t in re.findall(r"[.#]([A-Za-z_][\w-]*)", re.sub(r"\[[^\]]*\]", "", sel)))

    def block(text):
        res, j = [], 0
        while j < len(text):
            k = text.find("{", j)
            if k == -1:
                break
            head = text[j:k].strip()
            depth, m = 1, k + 1
            while depth and m < len(text):
                depth += {"{": 1, "}": -1}.get(text[m], 0)
                m += 1
            inner = text[k + 1 : m - 1]
            if head.startswith("@media") or head.startswith("@supports"):
                sub = block(inner)
                if sub.strip():
                    res.append(f"{head}{{{sub}}}")
            elif head.startswith("@"):
                res.append(f"{head}{{{inner}}}")
            else:
                sels = [x for x in split_top(head) if keep_sel(x)]
                if sels:
                    res.append(f"{','.join(sels)}{{{inner}}}")
            j = m
        return "\n".join(res)

    return block(re.sub(r"/\*.*?\*/", "", css, flags=re.S))


def write_chrome(body, css, lang):
    """The header and footer alone, for the pages that keep their own content
    (SiteChrome): same markup and CSS as the sheet pages, trimmed."""
    head = body[: body.index('<main id="main" tabindex="-1">')]
    foot = body[body.index("</main>") + len("</main>") :]
    root = f".uxn-{lang}"
    css = prune_css(css.replace(f".uxa-{lang}", root), head + foot, root)
    css += f"\n{root} .uxn-crumbs{{padding-top:clamp(16px,2vw,40px)}}{root} .uxn-crumbs .crumb{{margin:0}}\n"
    open(os.path.join(OUT, f"chrome.{lang}.css"), "w", encoding="utf-8").write(css)
    ts = (f"// Generated by scripts/home-sheets/build.py (navkit chrome). Do not edit by hand.\n"
          f"export const CHROME_HEAD_{lang.upper()} = {json.dumps(head.strip(), ensure_ascii=False)}\n\n"
          f"export const CHROME_FOOT_{lang.upper()} = {json.dumps(foot.strip(), ensure_ascii=False)}\n")
    open(os.path.join(OUT, f"chrome-markup.{lang}.ts"), "w", encoding="utf-8").write(ts)
    print("chrome", lang, "css", len(css))


# Navkit L-nav (current page, breadcrumbs, footer columns), on every page; the
# current page is marked aria-current="page", its section (an article's Blog)
# aria-current="true", both styled the same. Plus the skip link.
NAV_CSS = """
#hdr nav a[aria-current]{color:var(--ink);font-weight:700;position:relative}
#hdr nav a[aria-current]::after{content:"";position:absolute;inset-inline:14px;bottom:2px;height:2px;border-radius:2px;background:linear-gradient(90deg,#0f72b3,#2a5fcf)}
.menu a.m[aria-current]{color:var(--brand-d);font-weight:700}
footer a.l[aria-current]{color:var(--ink);font-weight:700}
.crumb{display:flex;flex-wrap:wrap;align-items:center;gap:8px;font-size:15px;color:var(--ink2);margin-bottom:clamp(24px,3vw,40px);text-align:start}
.crumb{margin-top:calc(-1*clamp(20px,4vw,64px))}
.crumb a{color:var(--ink2)}.crumb a:hover{color:var(--ink);text-decoration:underline;text-underline-offset:3px}
.crumb svg{width:15px;height:15px;opacity:.6;flex:none}.crumb span[aria-current]{color:var(--ink);font-weight:600}
.ft{grid-template-columns:1.5fr 1fr 1fr 1fr!important}
@media(max-width:1060px){.crumb{font-size:16px}.ft{grid-template-columns:1fr 1fr!important}.ft>div:first-child{grid-column:1/-1}}
@media(max-width:1180px) and (min-width:1061px){#hdr nav a{padding:8px 10px}}
.skip{position:absolute;inset-inline-start:12px;top:-80px;z-index:200;background:var(--ink);color:#fff;font-weight:700;font-size:16px;padding:12px 18px;border-radius:12px;transition:top .15s}
.skip:focus{top:12px;color:#fff}
main:focus{outline:none}
"""

# Article template (tbl-024b): the text column is the MDX article or the guide's
# sections, which come as plain headings and paragraphs.
ARTICLE_CSS = """
/* ---- article body (tbl-024b) ---- */
{root} .ar-body h2,{root} .ar-body>section{scroll-margin-top:110px}
{root} .ar-body>h2:not(:first-child),{root} .ar-body>section+section{margin-top:clamp(36px,4vw,52px)}
{root} .ar-body :is(p,ul,ol,div,figure,aside)+:is(p,ul,ol,div,figure,aside){margin-top:16px}
{root} .ar-body h3{font-size:20px;font-weight:700;line-height:1.4;margin-top:24px}
{root} .ar-body :is(.ar-trio,.ar-tl) h3{margin-top:12px}
{root} .ar-body ol:not(.ar-tl){padding-inline-start:22px;display:grid;gap:6px}
{root} .ar-body strong{font-weight:700}
{root} .ar-note{border-inline-start:3px solid var(--brand);background:var(--tint);border-radius:14px;padding:16px 18px}
{root} .ar-note b{display:block;font-weight:700;margin-bottom:4px}
{root} .ar-cap{caption-side:top;text-align:start;font-weight:700;padding:14px 16px 4px}
{root} .ar-tbl:focus-visible{outline:2px solid var(--brand);outline-offset:2px}
{root} .ar-meta i{display:inline-block}
@media(max-width:1060px){{root} .ar-body h2,{root} .ar-body>section{scroll-margin-top:130px}{root} .ar-body h3{font-size:22px}}
"""


def home_markup(body, cfg, images):
    # -- FAQ, own domain: the FAQ page's answer (tbl-023)
    body, nd = re.subn(rf'(<summary>{re.escape(cfg["domain_q"])}<span class="pm">\+</span></summary><div class="ans">)[^<]*(</div>)',
                       lambda m: m.group(1) + cfg["domain_a"] + m.group(2), body, count=1)
    assert nd == 1, "domain answer not found"

    # -- hero and closing are a single sign-up button each (tbl-021): no field
    assert 'class="prompt"' not in body and "<input" not in body and body.count('class="go-btn"') == 2

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


def finish_css(css, lang, page):
    home = page == "home"
    # the sheets' copy of the mobile type rule; the site has it once, in src/app/mobile-type.css
    css, nmt = re.subn(r"/\* L-mobile-type.*?(?=/\* v35|/\* uxb-013 contact|/\* uxb-015 faq|\Z)", "", css, count=1, flags=re.S)
    assert nmt == 1 and "/* L-mobile-type" not in css and "body .sub,body .sh p" not in css
    css = re.sub(r"url\(data:image/[a-z+]+;base64,[A-Za-z0-9+/=]+\)", "none", css)
    # review chrome out of the CSS too: comments (they carry "uxb-0xx" version
    # notes) and every rule that targets .ztag / .sheet-label
    css = re.sub(r"/\*.*?\*/", "", css, flags=re.S)
    css = re.sub(r"(^|[{}])[^{}@]*(?:\.ztag|\.sheet-label)[^{}]*\{[^{}]*\}", r"\1", css)
    css = css.replace('font-family:"Heebo",', 'font-family:var(--font-heebo),"Heebo",')
    # current page, breadcrumbs, footer columns (navkit L-nav block), in every page's CSS
    css += "\n" + NAV_CSS
    root = f".{ROOTS[page]}-{lang}"
    css = scope_css(css, root)
    # The sheets were designed on plain browser defaults. The site's globals
    # (Tailwind preflight, base h2/li/ul rules) would otherwise leak in, so
    # inside the page root every property falls back to the browser default
    # unless the sheet sets it. :where() keeps this at zero specificity, so
    # every sheet rule still wins.
    # SVG is left out: its geometry (d, r, cx…) lives in CSS properties that
    # `all` would revert to nothing.
    nsvg = ":where(*:not(svg):not(svg *))"
    # `all` does not cover direction, and the site's globals force
    # direction:rtl on ul/ol/li, so lists take the page's direction back.
    css = (f":where({root}) {nsvg},:where({root}) {nsvg}::before,:where({root}) {nsvg}::after{{all:revert}}\n"
           f":where({root}) :where(ul,ol,li){{direction:inherit}}\n"
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
    css += SITE_CSS.replace("{root}", root)
    if page == "contact":
        css += CONTACT_CSS.replace("{root}", root)
    elif page == "faq":
        css += FAQ_CSS.replace("{root}", root)
    elif page == "text":
        css += FAQ_CSS.replace("{root}", root) + TEXT_CSS.replace("{root}", root)
    elif page == "article":
        css += FAQ_CSS.replace("{root}", root) + TEXT_CSS.replace("{root}", root) + ARTICLE_CSS.replace("{root}", root)
    elif page == "features":
        css += FEATURES_CSS.replace("{root}", root)
        css += (f"@media (prefers-reduced-motion:reduce){{{root} #inc .mq{{-webkit-mask:none;mask:none}}"
                f"{root} #inc .mq .inc{{flex-wrap:wrap!important;justify-content:center!important;width:auto!important;gap:10px 0!important;transform:none!important}}"
                f"{root} #inc .mq .in-c{{transform:none!important}}}}\n")
    elif home:
        # LCP (tbl-020): the demo headline is shown from the first paint
        css += f"{root} .gs-h.rv{{opacity:1!important;transform:none!important;filter:none!important;animation:none!important}}\n"
    elif page == "pricing":
        # pricing FAQ (tbl-020): answers in black, support address on its own line
        css += f"{root} .faq .ans{{color:var(--ink)}}\n"
        # AA (tbl-024 accessibility pass): the "-20%" badge text was 3.95:1
        css += f"{root} .bill em{{color:#106f41}}\n"
        css += f"{root} .uxh-vh{{position:absolute!important;width:1px!important;height:1px!important;overflow:hidden!important;clip:rect(0 0 0 0)!important;white-space:nowrap!important;margin:0!important;padding:0!important}}\n"
        # blue band with prefers-reduced-motion: no movement, items wrap and stay put
        css += (f"@media (prefers-reduced-motion:reduce){{{root} #inc .mq{{-webkit-mask:none;mask:none}}"
                f"{root} #inc .mq .inc{{flex-wrap:wrap!important;justify-content:center!important;width:auto!important;gap:10px 0!important;transform:none!important}}"
                f"{root} #inc .mq .in-c{{transform:none!important}}}}\n")
    return css


def main():
    images = {"hero-law": sharp_variants(os.path.join(IMAGES, "hero-law.webp"), "hero-law")}
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
        build(lang, cfg, images, "contact")
        build(lang, cfg, images, "faq")
        build(lang, cfg, images, "text")
        build(lang, cfg, images, "blog")
        build(lang, cfg, images, "guides")
        build(lang, cfg, images, "article")
        build(lang, cfg, images, "features")


main()
