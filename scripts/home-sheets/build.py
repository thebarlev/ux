#!/usr/bin/env python3
"""
Builds the home pages (/ and /en) from Itzik's approved review sheets.

    python3 scripts/home-sheets/build.py <sheet-dir> <contact-sheet-dir> <image-dir> <page-sheet-dir> <nav-sheet-dir> <features-sheet-dir> <tbl-028-dir> <who-he-dir> <consent-dir> <tbl-029-dir>

<sheet-dir> holds the four approved sheets (tbl-021): uxb-009-v35-home-he.html,
uxb-010-v6-home-en.html, uxb-011-v12-pricing-he.html, uxb-012-v3-pricing-en.html;
<contact-sheet-dir> holds uxb-013-v6-contact-he.html and uxb-014-v2-contact-en.html
(tbl-022); <image-dir> holds hero-law.webp (tbl-019); <page-sheet-dir> holds
uxb-015-v1-faq-he.html, uxb-016-v1-faq-en.html and the text-page templates
uxb-017-v1-text-page-he.html, uxb-018-v1-text-page-en.html (tbl-023); <nav-sheet-dir> holds
uxb-021-v2-navkit-reference-he.html (header, mobile menu, breadcrumbs and footer for
every page), uxb-019-v1-blog-he.html and uxb-020-v2-article-he.html (tbl-024);
<features-sheet-dir> holds the article templates uxb-020-v4-article-he.html (tbl-025b) and uxb-023-v1-article-en.html (tbl-025c);
<tbl-028-dir> holds what you get uxb-021-v10 / uxb-022-v2, who it's for in English uxb-028-v1, the blog
indexes uxb-019-v3 / uxb-029-v2, the 404 pages uxb-030-v2 / uxb-031-v2 and legal-pages/ (HE) and
legal-pages/en/ (EN); <who-he-dir> holds uxb-024-v4-who-uxellent.html (who it's for, Hebrew);
<consent-dir> holds the cookie banner sheets uxb-026-v2 / uxb-027-v2 (tbl-027);
<tbl-029-dir> holds the Hebrew article template uxb-020-v5-article-uxellent.html (tbl-029).
The sheets are the source of truth for markup and CSS;
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
NEW_SHEETS = sys.argv[7]
WHO_HE_SHEETS = sys.argv[8]
CONSENT_SHEETS = sys.argv[9]
FIXES_SHEETS = sys.argv[10]
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
        "features_file": "uxb-021-v10-features-uxellent.html",
        "article_file": os.path.join(FIXES_SHEETS, "uxb-020-v5-article-uxellent.html"),
        "blog_file": "uxb-019-v3-blog-uxellent.html",
        "who_file": os.path.join(WHO_HE_SHEETS, "uxb-024-v4-who-uxellent.html"),
        "nf_file": "uxb-030-v2-404-uxellent.html",
        "legal_dir": "legal-pages", "legal_suffix": "",
        "consent_file": "uxb-026-v2-cookie-banner-uxellent.html",
        "home": "/",
        "blog": "/blog",
        "pricing": "/pricing",
        "contact": "/contact",
        "faq": "/faq",
        "pre": "",
        "nav": {
            "איך זה עובד": "#how",
            "מה מקבלים": "/features",
            "למי זה מתאים": "/for-who",
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
            "מדיניות עוגיות": "/cookies",
            "ביטול עסקה": "/cancel",
            "שימוש מותר": "/acceptable-use",
            "הגדרות עוגיות": "/cookies#c-banner",
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
        "features_file": "uxb-022-v2-features-en-uxellent.html",
        "article_file": "uxb-023-v1-article-en.html",
        "blog_file": "uxb-029-v2-blog-en-uxellent.html",
        "who_file": "uxb-028-v1-who-en-uxellent.html",
        "nf_file": "uxb-031-v2-404-en-uxellent.html",
        "legal_dir": "legal-pages/en", "legal_suffix": "-en",
        "consent_file": "uxb-027-v2-cookie-banner-en-uxellent.html",
        "home": "/en",
        "blog": "/en/blog",
        "pricing": "/en/pricing",
        "contact": "/en/contact",
        "faq": "/en/faq",
        "pre": "/en",
        "nav": {
            "How it works": "#how",
            "What you get": "/en/features",
            "Who it’s for": "/en/for-who",
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
            "Cookie policy": "/en/cookies",
            "Cancellation": "/en/cancel",
            "Acceptable use": "/en/acceptable-use",
            "Cookie settings": "/en/cookies#c-banner",
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


# tbl-031: UXellent is for every business, not only for those that sell a
# service: companies and manufacturers, offices and clinics, studios and
# freelancers. Stores are not mentioned at all. Applied to the sheets as they
# are read, so the page, its FAQ data and its JSON-LD all follow.
FAQ_ANY = {
    "he": ("לאילו עסקים זה מתאים?", "לכל עסק וארגון שצריך אתר: חברות ומפעלים, משרדים וקליניקות, סטודיואים ועצמאים. אפשר לבנות אתר תדמית, אתר שיווקי, דף נחיתה או אתר תיק עבודות."),
    "en": ("What kind of businesses is it for?", "Any business or organization that needs a website: companies and manufacturers, offices and clinics, studios and freelancers. You can build a brand site, a marketing site, a landing page or a portfolio site."),
}
ORB_CO = '<path d="M4 21V5.5L12 3v18M12 8.5l8 2.5v10M2.5 21h19"/><path d="M7.5 8.5h1.5M7.5 12h1.5M7.5 15.5h1.5M15 13.5h1.5M15 17h1.5"/>'
POSITIONING = {
    ("he", "home"): [
        ('<h2>לכל עסק <span class="bl">שמוכר שירות.</span></h2>', '<h2>לכל עסק <span class="bl">ולכל חברה.</span></h2>'),
        ("<p>משרד, קליניקה, סטודיו או עצמאי בתחילת הדרך. אם אתם מוכרים ידע, ניסיון או מקצועיות, האתר הזה נבנה בשבילכם.</p>",
         "<p>חברות ומפעלים, משרדים וקליניקות, סטודיואים ועצמאים. כל מי שצריך אתר תדמית, אתר שיווקי או דף נחיתה, האתר הזה נבנה בשבילכם.</p>"),
    ],
    ("en", "home"): [
        ("AI websites for service businesses", "AI websites for every business"),
        ('<h2>For every business <span class="bl">that sells a service.</span></h2>', '<h2>For every business <span class="bl">and every company.</span></h2>'),
        ("<p>An office, a clinic, a studio, or a freelancer just starting out. If you sell knowledge, experience or expertise, this was built for you.</p>",
         "<p>Companies and manufacturers, offices and clinics, studios and freelancers. If you need a brand site, a marketing site or a landing page, this was built for you.</p>"),
    ],
    ("he", "blog"): [("לעסקים ולבעלי מקצוע.</p>", "לעסקים, לחברות ולבעלי מקצוע.</p>")],
    ("en", "blog"): [("for businesses and professionals.</p>", "for businesses, companies and professionals.</p>")],
    ("he", "who"): [('<h2>שלושה סוגי אתרים, <span class="bl">אחד בשבילכם.</span></h2>', '<h2>כל סוג של אתר, <span class="bl">לכל עסק.</span></h2>')],
    ("en", "who"): [('<h2>Three types of website, <span class="bl">one for you.</span></h2>', '<h2>Every kind of website, <span class="bl">for every business.</span></h2>')],
}
# for-who: two cards at the start of the site types (uxb-024c)
WHO_CARDS = {
    "he": [("חברות ומפעלים", "אתר תדמית שמציג את החברה, את המוצרים ואת היכולות, ברמה של חברה גדולה.", ORB_CO),
           ("ארגונים", "אתר ברור לארגון, לעמותה או למוסד, עם כל המידע במקום אחד.",
            '<circle cx="12" cy="7" r="2.6"/><circle cx="5.5" cy="10.5" r="2"/><circle cx="18.5" cy="10.5" r="2"/><path d="M7.5 20v-1.5a4.5 4.5 0 0 1 9 0V20M2.5 20v-1a3 3 0 0 1 4.2-2.8M21.5 20v-1a3 3 0 0 0-4.2-2.8"/>')],
    "en": [("Companies and manufacturers", "A brand site that presents the company, its products and its capabilities, at a big-company level.", ORB_CO),
           ("Organizations", "A clear site for an organization, nonprofit or institution, with everything in one place.",
            '<circle cx="12" cy="7" r="2.6"/><circle cx="5.5" cy="10.5" r="2"/><circle cx="18.5" cy="10.5" r="2"/><path d="M7.5 20v-1.5a4.5 4.5 0 0 1 9 0V20M2.5 20v-1a3 3 0 0 1 4.2-2.8M21.5 20v-1a3 3 0 0 0-4.2-2.8"/>')],
}
ORB_LABEL = {"he": "חברות", "en": "Companies"}


def positioning(body, css, lang, page):
    for old, new in POSITIONING.get((lang, page), []):
        assert body.count(old) == 1, (lang, page, old[:60])
        body = body.replace(old, new)
    if page in ("home", "faq"):
        # the "why not online stores" question becomes "what kind of businesses is it for"
        q, a = FAQ_ANY[lang]
        body, n = re.subn(r"<details><summary>(?:למה לא חנויות אונליין\?|Why not online stores\?|Why no online stores\?)(<span class=\"pm\">\+</span></summary><div class=\"ans\">).*?(</div></details>)",
                          lambda m: f"<details><summary>{q}{m.group(1)}{a}{m.group(2)}", body, count=1, flags=re.S)
        assert n == 1, (lang, page)
    if page == "home":
        # no "except online stores" line, and the struck-out stores icon becomes companies (same spot, the line style of the others)
        body, n1 = re.subn(r'\s*<span class="no"><i>✕</i>[^<]*</span>', "", body, count=1)
        body, n2 = re.subn(r'<span class="orb no-orb"( style="[^"]*")><svg ([^>]*)>.*?</svg><em>[^<]*</em></span>',
                           lambda m: f'<span class="orb co-orb"{m.group(1)}><svg {m.group(2)}>{ORB_CO}</svg><em>{ORB_LABEL[lang]}</em></span>', body, count=1, flags=re.S)
        assert (n1, n2) == (1, 1), (lang, n1, n2)
        # on a phone the extra icons hide, but this one stays where the stores icon stood
        assert ":not(.no-orb)" in css
        css = css.replace(":not(.no-orb)", ":not(.co-orb)")
    if page == "who":
        cards = "".join(f'<article class="ty"><span class="ty-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">{ic}</svg></span><h3>{t}</h3><p>{p}</p></article>'
                        for t, p, ic in WHO_CARDS[lang])
        assert body.count('<div class="ty-grid">') == 1
        body = body.replace('<div class="ty-grid">', '<div class="ty-grid">' + cards, 1)
    return body, css


def build(lang, cfg, images, page="home", legal=None):
    home = page == "home"
    sheet = {
        "home": os.path.join(HOME_SHEETS, cfg["file"]),
        "pricing": os.path.join(PRICING_SHEETS, cfg["pricing_file"]),
        "contact": os.path.join(CONTACT_SHEETS, cfg["contact_file"]),
        "faq": os.path.join(PAGE_SHEETS, cfg["faq_file"]),
        "text": os.path.join(PAGE_SHEETS, cfg["text_file"]),
        "blog": os.path.join(NEW_SHEETS, cfg["blog_file"]),
        "article": os.path.join(FEATURES_SHEETS, cfg["article_file"]),
        "features": os.path.join(NEW_SHEETS, cfg["features_file"]),
        "who": os.path.join(NEW_SHEETS, cfg["who_file"]),
        "nf": os.path.join(NEW_SHEETS, cfg["nf_file"]),
        "legal": os.path.join(NEW_SHEETS, cfg["legal_dir"], f"legal-{legal}{cfg['legal_suffix']}.html"),
    }[page]
    src = open(sheet, encoding="utf-8").read()
    css = re.search(r"<style[^>]*>(.*?)</style>", src, re.S).group(1)
    body = sheet_body(src)
    body, css = positioning(body, css, lang, page)

    # -- one header, mobile menu and footer on every page (navkit, tbl-024)
    head, foot = chrome(lang)
    body, nh = re.subn(r"<header id=\"hdr\">.*?</header>", lambda m: head, body, count=1, flags=re.S)
    body, nf = re.subn(r"<footer\b.*?</footer>", lambda m: foot, body, count=1, flags=re.S)
    assert (nh, nf) == (1, 1), (page, nh, nf)
    if page == "blog":
        body = blog_markup(body, lang, cfg)
    elif page == "article":
        body = article_markup(body, lang, cfg)
    elif page == "features":
        body = features_markup(body, lang, src)
    elif page == "who":
        body = who_markup(body, lang)
    elif page == "nf":
        body = nf_markup(body, lang)
    elif page == "legal":
        body = legal_markup(body, lang, cfg, legal)

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
    # "Cookie settings" opens the settings window (ConsentBanner); without JS it is the policy's consent section
    body, nck = re.subn(r'(<a class="l" href="(?:/en)?/cookies#c-banner")>', r'\1 data-ck-open>', body)
    assert nck == 1, nck

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
    elif page in ("blog", "article", "features", "who", "nf", "legal"):
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
    body = landmarks(body, lang, home or page == "nf")

    # -- CSS: no data URIs, scoped, Heebo from next/font, a few additions
    css = finish_css(css, lang, page)
    open(os.path.join(OUT, f"{page}.{lang}.css"), "w", encoding="utf-8").write(css)

    body = plan_tokens(body, lang, page)
    body = site_040(body, lang, page)

    faq = [
        {"q": re.sub(r"<[^>]+>", "", q).strip(), "a": re.sub(r"<[^>]+>", "", a).strip()}
        for q, a in re.findall(r"<summary>(.*?)<span class=\"pm\">\+</span></summary><div class=\"ans\">(.*?)</div>", body, re.S)
    ]
    want = {"home": 9, "pricing": 6, "contact": 0, "faq": 18, "text": 0, "blog": 0, "article": 0, "features": 0, "who": 0, "nf": 0, "legal": 0}[page]
    assert len(faq) == want, f"expected {want} FAQ entries in {page}/{lang}, got {len(faq)}"
    name = page.upper()
    ts = (
        f"// Generated by scripts/home-sheets/build.py from {os.path.basename(sheet)}. Do not edit by hand.\n"
        f"export const {name}_HTML_{lang.upper()} = {json.dumps(body.strip(), ensure_ascii=False)}\n\n"
        f"export const {name}_FAQ_{lang.upper()} = {json.dumps(faq, ensure_ascii=False, indent=2)} as const\n"
    )
    if page in ("blog", "article"):
        ts += extra_parts(body, lang, page)
    if page == "article":
        write_chrome(body, css, lang)
    if page == "legal":
        # six pages per language, one CSS (the six sheets share it)
        LEGAL_OUT.setdefault(lang, {})[legal] = body.strip()
        print(page, legal, lang, "markup", len(body), "css", len(css))
        return
    open(os.path.join(OUT, f"{'markup' if home else page + '-markup'}.{lang}.ts"), "w", encoding="utf-8").write(ts)
    print(page, lang, "markup", len(body), "css", len(css), "faq", len(faq))



# tbl-034: prices and AI action counts come from the platform (src/lib/plans.ts),
# never from the sheet. The sheet's numbers become placeholders that HomePage
# fills from the plans data when the page renders; a value the data lacks
# leaves its line out. The 2x / 3x lines go: they compared numbers that now
# live in the data.
PLAN_IDS = ["free", "start", "business", "pro"]
PLAN_SAVE_ANSWER = {"he": "20% על כל החבילות בתשלום, לעומת חיוב חודשי.", "en": "20% on every paid plan, compared with monthly billing."}
PLAN_FROM = {"he": "<span>מ-₪0 לחודש</span>", "en": "<span>From $0 a month</span>"}
# tbl-035: the card lines, in the order every card shows them, and which plans have each
_ALL, _PAID = ("free", "start", "business", "pro"), ("start", "business", "pro")
# 042: the leads and email lines, from the plans data (plan-fill.ts, leadsHtml), right after the editor
LEADS = "{{LEADS}}"
PLAN_FEATURES = {
    "he": [
        ('כתובת באוויר: <bdi dir="ltr">yourname.uxellent.site</bdi>', _ALL),
        ("צ'אט AI שמעצב וכותב", _ALL),
        ("עורך ייעודי בקליק", _ALL),
        (LEADS, _ALL),
        ("מתאים לעדכונים שוטפים", _PAID),
        ("דומיין משלכם, ואנחנו מחברים אותו", ("business", "pro")),
        ('בלי הקרדיט "נבנה ב-UXellent"', ("pro",)),
        ("בלי כרטיס אשראי", ("free",)),
    ],
    "en": [
        ('Live address: <bdi dir="ltr">yourname.uxellent.site</bdi>', _ALL),
        ("AI chat that designs and writes", _ALL),
        ("Click-to-edit editor", _ALL),
        (LEADS, _ALL),
        ("Made for ongoing updates", _PAID),
        ("Your own domain, connected for you", ("business", "pro")),
        ("No “Built with UXellent” credit", ("pro",)),
        ("No credit card", ("free",)),
    ],
}
PLAN_MUST = {
    "he": [("אחסון האתר כלול", ()), ("עריכה ידנית ללא הגבלה<small>המכסה סופרת רק פעולות AI</small>", ())],
    "en": [("Hosting included", ()), ("Unlimited manual editing<small>The quota counts AI actions only</small>", ())],
}


def plan_tokens(body, lang, page):
    if page == "pricing":
        ids = iter(PLAN_IDS)
        def card(m):
            pid = next(ids)
            a = m.group(0)
            a, n1 = re.subn(r'<div class="pl-price">.*?</div>', "{{PLAN_PRICE:%s}}" % pid, a, count=1, flags=re.S)
            a, n2 = re.subn(r'<span class="pl-yr"[^>]*>[^<]*</span>', "{{PLAN_YEAR:%s}}" % pid, a, count=1)
            a, n3 = re.subn(r'<div class="pl-act">.*?</div>', "{{PLAN_ACT:%s}}" % pid, a, count=1, flags=re.S)
            assert (n1, n2, n3) == (1, 0 if pid == "free" else 1, 1), (lang, pid, n1, n2, n3)
            a, nx = re.subn(r'<li>(?:(?!</li>).)*?(?:פי [23] פעולות AI|[23]× the AI actions)</span></li>', "", a, flags=re.S)
            assert nx == (0 if pid == "free" else 1), (lang, pid, nx)
            # tbl-035: no "Everything in X, plus:"; each card lists all it has, in one order for every card
            a, nl = re.subn(r'\s*<p class="pl-lead">[^<]*</p>', "", a)
            assert nl == (0 if pid == "free" else 1), (lang, pid, nl)
            a, nu = re.subn(r"<ul>.*?</ul>", lambda m: "<ul>" + "".join(("{{PLAN_LEADS:%s}}" % pid) if x[0] == LEADS else li(x) for x in PLAN_FEATURES[lang] if pid in x[1]) + "</ul>", a, count=1, flags=re.S)
            assert nu == 1, (lang, pid)
            # tbl-035: two lines on every card, right after the AI actions line
            a = a.replace("{{PLAN_ACT:%s}}" % pid, "{{PLAN_ACT:%s}}" % pid + '<ul class="pl-must">' + "".join(li(x) for x in PLAN_MUST[lang]) + "</ul>", 1)
            return a
        check = '<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>'
        assert body.count(check) >= 10, lang
        def li(x):
            return f"<li>{check}<span>{x[0]}</span></li>"
        # every list line the sheet has, so none is lost when the lists are rebuilt
        sheet_lines = set(re.findall(r'<li><svg viewBox="0 0 24 24"><path d="M5 12\.5l4\.5 4\.5L19 7\.5"/></svg><span>(.*?)</span></li>', body))
        kept = {x[0] for x in PLAN_FEATURES[lang] if x[0] != LEADS}
        assert sheet_lines - kept <= {"פי 2 פעולות AI", "פי 3 פעולות AI", "2× the AI actions", "3× the AI actions"} and kept <= sheet_lines, (lang, sheet_lines ^ kept)
        body, n = re.subn(r'<article class="pl[^"]*">.*?</article>', card, body, flags=re.S)
        assert n == 4 and next(ids, None) is None, n
        body, nb = re.subn(r'<em>(?:20%-|Save 20%)</em>', "{{PLAN_SAVE_BADGE}}", body)
        assert nb == 1, nb
    if page in ("pricing", "faq"):
        assert body.count(PLAN_SAVE_ANSWER[lang]) == 1, (lang, page)
        body = body.replace(PLAN_SAVE_ANSWER[lang], "{{PLAN_SAVE_ANSWER}}")
    if page == "features":
        assert body.count(PLAN_FROM[lang]) == 1, lang
        body = body.replace(PLAN_FROM[lang], "<span>{{PLAN_FROM}}</span>")
    left = re.findall(r"₪\s?\d|\$\d|\d[\d,]* (?:פעולות|AI actions)|פי [23] פעולות|[23]× the AI|\d+%", re.sub(r"<[^>]+>", " ", re.sub(r"<(style|script)\b.*?</\1>", "", body, flags=re.S)))
    # what stays written by hand: the credit add-on and a registrar's domain price (not plan data)
    left = [x for x in left if x not in ("₪1", "₪8", "$5", "$1")]
    assert not left or page not in ("pricing", "faq", "features", "home"), (lang, page, left)
    return body


# 040 / 041 / 042: plan names, the leads and email parts, and yearly billing.
# - Names: התחלה is מתחילים, מקצועי is צומח, Pro is Growth, wherever a plan is named.
# - Parts that show only on a condition are marked <!--name-->…<!--/name-->, and
#   HomePage keeps or drops them when the page renders (src/app/_home/plan-fill.ts,
#   gate): "yearly" while the plans data has yearly prices (042: none until Itzik
#   approves), "mailing" while MAILING_LIVE=true (042: preview yes, production no).
PLAN_RENAMES = {
    "he": [
        ("<h3>התחלה</h3>", "<h3>מתחילים</h3>"),
        ("<h3>מקצועי</h3>", "<h3>צומח</h3>"),
        ("בחבילה המקצועית היא לא מופיעה. בהתחלה ובעסקי", "בחבילת צומח היא לא מופיעה. במתחילים ובעסקי"),
        ("בחבילות עסקי ומקצועי", "בחבילות עסקי וצומח"),
        ("חינם, התחלה, עסקי ומקצועי", "חינם, מתחילים, עסקי וצומח"),
        ("בחבילות חינם, התחלה ועסקי", "בחבילות חינם, מתחילים ועסקי"),
        ("בחבילות התחלה ועסקי", "בחבילות מתחילים ועסקי"),
        ("בחבילה מקצועי הקרדיט", "בחבילת צומח הקרדיט"),
    ],
    "en": [
        ("<h3>Pro</h3>", "<h3>Growth</h3>"),
        ("Business and Pro", "Business and Growth"),
        ("doesn’t appear on Pro.", "doesn’t appear on Growth."),
        ("On the Pro plan", "On the Growth plan"),
    ],
}
PLAN_RENAMED = set()  # (lang, old) seen on some page; every rename must be used

YEARLY = ("<!--yearly-->", "<!--/yearly-->")
MAILING = ("<!--mailing-->", "<!--/mailing-->")

PRICING_ALL = {
    "he": '<p class="pr-all">בכל חבילה: אחסון, עורך בקליק וטופס לידים.</p>',
    "en": '<p class="pr-all">On every plan: hosting, the click editor and a lead form.</p>',
}

_CK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>'
_SV = 'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"'
_PERSON = f'<svg {_SV}><circle cx="12" cy="8.5" r="3.5"/><path d="M5 19.5c1.2-3.6 4-5.5 7-5.5s5.8 1.9 7 5.5"/></svg>'
_LIST = f'<svg {_SV}><rect x="3.5" y="5.5" width="17" height="13" rx="2"/><path d="M4 7l8 6 8-6"/></svg>'
LEADS_FEATURE = {
    "he": {
        "kick": "לידים ודיוור",
        "h2": 'לקוחות חדשים, <span class="bl">גם כשאתם עסוקים.</span>',
        "p": "האתר לא רק מציג את העסק. הוא אוסף פניות, בונה רשימת תפוצה ושולח את המיילים בשבילכם, בלי לחבר שום כלי חיצוני.",
        "li": ["טופס שמייצר ליד אמיתי. כל פנייה נשמרת אצלכם בחשבון, ולא נעלמת בתיבת המייל.",
               "רשימת תפוצה שנבנית מהאתר עצמו, מכל מי שנרשם.",
               "דיוור ואוטומציות מתוך החשבון שלכם, בלי להיכנס לשום מערכת אחרת.",
               "<b>ואנחנו אלה שדואגים שזה יעבוד.</b>"],
        "form": "השאירו פרטים", "name": "דנה כהן", "send": "שליחה",
        "lead": ("ליד חדש", "דנה כהן · מהטופס באתר"), "new": "חדש",
        "list": ("נוספה לרשימת התפוצה", "dana@gmail.com"),
    },
    "en": {
        "kick": "Leads and email",
        "h2": 'New clients, <span class="bl">even when you’re busy.</span>',
        "p": "Your site doesn’t just present your business. It collects enquiries, builds your mailing list and sends the emails for you, with no outside tools to connect.",
        "li": ["A form that creates a real lead. Every enquiry is saved in your account, not lost in your inbox.",
               "A mailing list that builds itself from your site, from everyone who signs up.",
               "Email campaigns and automations from your own account, without logging in to any other system.",
               "<b>And we’re the ones who make sure it works.</b>"],
        "form": "Leave your details", "name": "Dana Cohen", "send": "Send",
        "lead": ("New lead", "Dana Cohen · from your site’s form"), "new": "New",
        "list": ("Added to your mailing list", "dana@gmail.com"),
    },
}
HOME_LEADS_CARD = {
    "he": ("לידים ודיוור", "לידים, רשימת תפוצה ודיוור, בתוך האתר.", "ואנחנו אלה שדואגים שזה יעבוד.", "5 מתוך 5"),
    "en": ("Leads and email", "Leads, mailing list and email, built into your site.", "And we’re the ones who make sure it works.", "5 of 5"),
}
_ART = '<svg viewBox="0 0 100 100" fill="none" stroke="#0b1220" stroke-width="4" stroke-linejoin="round"><rect x="12" y="24" width="76" height="54" rx="9" fill="#1990d8"/><path d="M15 29l35 27 35-27" stroke="#fff"/></svg>'
AUP_MAILING = {
    "he": ('<a href="#u-mail">דיוור</a>',
           '<section class="lg-s" id="u-mail"><h2>דיוור</h2><p>מי ששולח דיוור מהחשבון שלו אחראי לשלוח אותו רק למי שהסכים לקבל אותו, כפי שדורש סעיף 30א לחוק התקשורת (בזק ושידורים). בכל דיוור צריכה להיות דרך פשוטה להסיר את עצמכם מהרשימה.</p><p>אם דיוור נשלח בלי הסכמה, אנחנו רשאים להשעות את הדיוור מהחשבון.</p></section>'),
    "en": ('<a href="#u-mail">Email campaigns</a>',
           '<section class="lg-s" id="u-mail"><h2>Email campaigns</h2><p>If you send email from your account, you are responsible for sending it only to people who agreed to receive it, as section 30A of Israel’s Communications (Telecommunications and Broadcasting) Law requires. Every email must include a simple way to unsubscribe.</p><p>If email is sent without consent, we may suspend sending from your account.</p></section>'),
}
PRIVACY_MAILING = {
    "he": ("<p>במילים פשוטות: פנייה שהגיעה לאתר של לקוח שייכת ללקוח. אנחנו לא משתמשים בה לשום מטרה שלנו.</p>",
           "<p>כך גם רשימת התפוצה של לקוח: אנשי הקשר ברשימה הם מידע של הלקוח, ואנחנו מעבדים אותו בשבילו, כדי לשלוח את הדיוור שהוא שולח. אנחנו לא משתמשים בו לשום מטרה שלנו.</p>"),
    "en": ("<p>Put simply: an enquiry that arrives on a customer's site belongs to the customer. We don't use it for any purpose of our own.</p>",
           "<p>The same goes for a customer's mailing list: the contacts on it are the customer's information, and we process it on their behalf, to send the email they send. We don't use it for any purpose of our own.</p>"),
}


def leads_fr(lang):
    t = LEADS_FEATURE[lang]
    lis = "".join(f"<li>{_CK}<span>{x}</span></li>" for x in t["li"])
    mock = (f'<div class="mk mk-e"><div class="mke-form"><b>{t["form"]}</b>'
            f'<span class="mke-in"><i class="mke-t1">{t["name"]}</i></span><span class="mke-in"><i class="mke-t2" dir="ltr">{t["list"][1]}</i></span>'
            f'<span class="mke-btn">{t["send"]}</span></div>'
            f'<div class="mke-row mke-r1">{_PERSON}<span><b>{t["lead"][0]}</b><em>{t["lead"][1]}</em></span><small class="mke-new">{t["new"]}</small></div>'
            f'<div class="mke-row mke-r2">{_LIST}<span><b>{t["list"][0]}</b><em dir="ltr">{t["list"][1]}</em></span></div></div>')
    return (f'{MAILING[0]}<div class="fr"><div class="fr-t"><span class="kick">{t["kick"]}</span><h2>{t["h2"]}</h2><p>{t["p"]}</p>'
            f'<ul class="ft-ck">{lis}</ul></div><div class="fr-v" aria-hidden="true">{mock}</div></div>{MAILING[1]}')


def site_040(body, lang, page):
    for old, new in PLAN_RENAMES[lang]:
        if old in body:
            PLAN_RENAMED.add((lang, old))
            body = body.replace(old, new)
    if page == "pricing":
        body, n = re.subn(r'<div class="bill" role="radiogroup".*?</div>', lambda m: YEARLY[0] + m.group(0) + YEARLY[1], body, count=1, flags=re.S)
        assert n == 1, lang
        foot = re.search(r'<p class="pr-foot">', body)
        assert foot, lang
        body = body[:foot.start()] + PRICING_ALL[lang] + "\n " + body[foot.start():]
    if page in ("pricing", "faq"):
        body, n = re.subn(r'<details>(?:(?!</details>).)*?\{\{PLAN_SAVE_ANSWER\}\}.*?</details>', lambda m: YEARLY[0] + m.group(0) + YEARLY[1], body, count=1, flags=re.S)
        assert n == 1, (lang, page)
    if page == "legal" and "{{PLAN_SAVE_TERMS}}" in body:
        body, n = re.subn(r'<li>(?:(?!</li>).)*?\{\{PLAN_SAVE_TERMS\}\}.*?</li>', lambda m: YEARLY[0] + m.group(0) + YEARLY[1], body, count=1, flags=re.S)
        assert n == 1, lang
    if page == "features":
        i = body.index('<section class="sec zone" id="pillars">')
        j = body.index('</div></section>', i)
        body = body[:j] + leads_fr(lang) + body[j:]
    if page == "home":
        i = body.index('id="ben"')
        j = body.index(" </div></section>", i)
        kick, h3, p, lab = HOME_LEADS_CARD[lang]
        card = (f'{MAILING[0]}<div class="ben" role="group" aria-roledescription="slide" aria-label="{lab}" tabindex="0"><span class="pbar"></span>'
                f'<div class="art">{_ART}</div><span class="kick">{kick}</span><h3>{h3}</h3><p>{p}</p></div>{MAILING[1]}\n')
        body = body[:j] + card + body[j:]
    if page == "legal" and 'id="u-banned"' in body:
        nav, sec = AUP_MAILING[lang]
        link = re.search(r'<a href="#u-banned">[^<]*</a>', body)
        body = body[:link.end()] + MAILING[0] + nav + MAILING[1] + body[link.end():]
        k = body.index('<section class="lg-s" id="u-enforce">')
        body = body[:k] + MAILING[0] + sec + MAILING[1] + body[k:]
    if page == "legal" and 'id="p-roles"' in body:
        old, new = PRIVACY_MAILING[lang]
        assert body.count(old) == 1, lang
        body = body.replace(old, old + MAILING[0] + new + MAILING[1])
    return body


def check_renames():
    missing = [(l, o) for l in PLAN_RENAMES for o, _ in PLAN_RENAMES[l] if (l, o) not in PLAN_RENAMED]
    assert not missing, missing


# the leads mockup on "what you get" (040): a form fills, a new lead drops in,
# then the address joins the mailing list; fixed height, so nothing below moves
SITE040_CSS = {
    "features": """
.mk-e{display:grid;gap:12px;height:426px;box-sizing:border-box;align-content:start;overflow:hidden}
.mke-form,.mke-row{background:#fff;border:1px solid var(--line);border-radius:16px;box-sizing:border-box}
.mke-form{height:196px;padding:16px;display:grid;gap:10px;align-content:start}
.mke-form b{font-size:16px}
.mke-in{display:block;height:38px;border:1px solid var(--line);border-radius:10px;padding:0 12px;line-height:38px;font-size:14.5px;color:var(--ink);overflow:hidden;white-space:nowrap}
.mke-in i{font-style:normal;display:inline-block}
.mke-btn{justify-self:start;background:linear-gradient(90deg,#0f72b3,#2a5fcf);color:#fff;font-weight:700;font-size:14.5px;border-radius:10px;padding:8px 18px}
.mke-row{height:84px;display:flex;gap:12px;align-items:center;padding:14px}
.mke-row svg{width:40px;height:40px;padding:9px;border-radius:12px;background:var(--tint);color:var(--brand-d);flex:none}
.mke-row span{min-width:0}
.mke-row b{display:block;font-size:15px}
.mke-row em{display:block;font-style:normal;font-size:14px;color:var(--ink2);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.mke-new{margin-inline-start:auto;align-self:flex-start;font-size:12px;font-weight:700;color:#1fae63;background:#e8f7ef;border-radius:99px;padding:3px 9px}
.mke-t1{animation:mke-t1 9s infinite}
.mke-t2{animation:mke-t2 9s infinite}
.mke-btn{animation:mke-btn 9s infinite}
.mke-r1{animation:mke-r1 9s cubic-bezier(.16,1,.3,1) infinite}
.mke-r2{animation:mke-r2 9s cubic-bezier(.16,1,.3,1) infinite}
@keyframes mke-t1{0%,4%{opacity:0;transform:translateX(6px)}9%,90%{opacity:1;transform:none}96%,100%{opacity:0}}
@keyframes mke-t2{0%,12%{opacity:0;transform:translateX(6px)}17%,90%{opacity:1;transform:none}96%,100%{opacity:0}}
@keyframes mke-btn{0%,20%,25%,100%{filter:none;transform:none}22%{filter:brightness(.85);transform:scale(.95)}}
@keyframes mke-r1{0%,26%{opacity:0;transform:translateY(-12px)}32%,90%{opacity:1;transform:none}96%,100%{opacity:0}}
@keyframes mke-r2{0%,42%{opacity:0;transform:translateY(-12px)}48%,90%{opacity:1;transform:none}96%,100%{opacity:0}}
@media(prefers-reduced-motion:reduce){.mke-t1,.mke-t2,.mke-btn,.mke-r1,.mke-r2{animation:none}}
@media(max-width:1060px){
.mk-e{height:auto;padding-bottom:2px}
.mke-form{height:auto;padding:16px}
.mke-in{font-size:16px;height:44px;line-height:44px}
.mke-btn{font-size:16px}
.mke-row{height:92px;padding:14px 16px}
.mke-row b{font-size:17px}
.mke-row em{font-size:15.5px}
}
""",
    "pricing": """
.pr-all{text-align:center;font-size:16px;font-weight:600;color:var(--ink);margin-top:30px}
.pr-all+.pr-foot{margin-top:8px}
""",
}


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
    # tbl-027: a short privacy note right under the send button
    body, npv = re.subn(r'(<button class="ct-btn" type="submit">[^<]*</button>)', lambda m: m.group(1) + PRIVACY_NOTE[lang], body, count=1)
    assert npv == 1
    # after sending, the form makes way for this
    body = body.replace("</form>", '</form><p class="uxc-done" role="status" tabindex="-1" hidden></p>', 1)
    assert "<details" not in body and "tel:" not in body
    return body


PRIVACY_NOTE = {
    "he": '<p class="uxc-priv">את הפרטים מקבלת UXellent כדי לחזור אליכם. מסירתם רשות. פרטים נוספים ב<a class="lnk" href="/privacy">מדיניות הפרטיות</a>.</p>',
    "en": '<p class="uxc-priv">UXellent receives these details to get back to you. Providing them is optional. See our <a class="lnk" href="/en/privacy">Privacy policy</a>.</p>',
}

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
{root} .uxc-priv{font-size:15px;line-height:1.55;color:var(--ink2);text-align:center}
@media(max-width:768px){{root} .uxc-done{background:none;border:0;box-shadow:none;padding:8px 0}}
@media(max-width:1060px){{root} .fld2>span.uxc-err{font-size:16px!important}}
"""


ROOTS = {"home": "uxh", "pricing": "uxp", "contact": "uxc", "faq": "uxf", "text": "uxt", "blog": "uxb", "article": "uxa", "features": "uxw",
         "who": "uxo", "nf": "uxz", "legal": "uxl"}


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


NAVKIT_SHEET = "uxb-021-v2-navkit-reference-he.html"


def sheet_body(src):
    """The sheet's body without its scripts and review chrome."""
    body = re.search(r"<body[^>]*>(.*)</body>", src, re.S).group(1)
    body = re.sub(r"<script.*?</script>", "", body, flags=re.S)
    body = re.sub(r'<div class="sheet-label">.*?</div>\s*', "", body, flags=re.S)
    body = re.sub(r'<span class="ztag"[^>]*>.*?</span>', "", body, flags=re.S)
    # a legal sheet's open-point marks (‼️) may name a design sheet
    assert "ztag" not in body and "sheet-label" not in body and "uxb-0" not in re.sub(r'<mark class="flag">.*?</mark>', "", body)
    return body


# English for the navkit chrome (the reference sheet is Hebrew only), in the
# wording the English sheets already use.
CHROME_EN = {
    "מה מקבלים": "What you get", "למי זה מתאים": "Who it’s for", "מחירים": "Pricing", "מאמרים": "Blog",
    "שאלות נפוצות": "FAQ", "צור קשר": "Contact", "כניסה": "Log in", "הצטרפות חינם": "Start free",
    "איך זה עובד": "How it works", "האתר": "Product", "חשבון": "Account", "מידע": "Info",
    "תנאי שימוש": "Terms of use", "מדיניות פרטיות": "Privacy policy", "הצהרת נגישות": "Accessibility statement",
    "מדיניות עוגיות": "Cookie policy", "ביטול עסקה": "Cancellation", "שימוש מותר": "Acceptable use", "הגדרות עוגיות": "Cookie settings",
}

# tbl-027 / tbl-028: the footer's Info column, the six legal pages and the cookie settings
FOOT_INFO = ('<div><h4>מידע</h4><a class="l" href="#">תנאי שימוש</a><a class="l" href="#">מדיניות פרטיות</a>'
             '<a class="l" href="#">מדיניות עוגיות</a><a class="l" href="#">הצהרת נגישות</a><a class="l" href="#">ביטול עסקה</a>'
             '<a class="l" href="#">שימוש מותר</a><a class="l" href="#">הגדרות עוגיות</a></div>')


def chrome(lang):
    """Header, mobile menu and footer from the navkit reference (tbl-024), for every page."""
    body = sheet_body(open(os.path.join(NAV_SHEETS, NAVKIT_SHEET), encoding="utf-8").read())
    head = re.search(r'<header id="hdr">.*?</header>', body, re.S).group(0)
    foot = re.search(r"<footer\b.*?</footer>", body, re.S).group(0)
    # the sheet marks its own page; the site marks the current page when it renders
    head, foot = head.replace(' aria-current="page"', ""), foot.replace(' aria-current="page"', "")
    # tbl-025c: the blog is not in the header or the menu, only in the footer
    head, nb = re.subn(r'<a(?: class="m")? href="#">מאמרים</a>', "", head)
    assert nb == 2 and "מאמרים" not in head, nb
    # tbl-028: no logo in the footer (only in the header); it starts with the lead line and the points
    foot, nl = re.subn(r'(<div class="ft"><div>)\s*<svg class="logo-svg".*?</svg>\s*', r"\1", foot, count=1, flags=re.S)
    foot, ni = re.subn(r"<div><h4>מידע</h4>.*?</div>", lambda m: FOOT_INFO, foot, count=1, flags=re.S)
    assert (nl, ni) == (1, 1) and "logo-svg" not in foot, (nl, ni)
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


PARTS = {}


def blog_markup(body, lang, cfg):
    """Blog index /blog (uxb-019 v3 HE, uxb-029 v2 EN, tbl-028): the featured
    article, three more and the eight growth guides; the cards become templates
    that HomePage fills from the articles (blog-data)."""
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
    PARTS[(lang, "blog")] = {"featured": feat, "card": card, "guide": guide}

    top = '<div class="bl-top">{{FEATURED}}<div class="bl-cards">{{CARDS}}</div></div>'
    body, n1 = re.subn(r'<div class="bl-top">.*?</a></div></div>', lambda m: top, body, count=1, flags=re.S)
    body, n2 = re.subn(r'<div class="bl-grid">.*?</a></div>', lambda m: '<div class="bl-grid">{{GUIDES}}</div>', body, count=1, flags=re.S)
    # the sheet's breadcrumbs: the site writes its own in the same place (landmarks, {{CRUMB}})
    body, n3 = re.subn(r'<nav class="crumb"[^>]*>.*?</nav>', "", body, count=1, flags=re.S)
    assert (n1, n2, n3) == (1, 1, 1), (n1, n2, n3)
    body = body.replace('<a href="/" lang="he"', '<a href="/blog" lang="he"').replace('<a href="/en" lang="en"', '<a href="/en/blog" lang="en"')
    return body


def article_markup(body, lang, cfg):
    """Article template (uxb-020, tbl-024b): the article itself is React (MDX or
    guide data, see ArticlePage); this keeps the related cards and the closing."""
    # "With UXellent" (v4): the section stays, its texts are per article (ArticlePage, ours.ts)
    ours = re.search(r'<section class="sec zone" id="ours">.*?</section>', body, re.S).group(0)
    item = re.search(r'<ul class="ou-l">\s*(<li>.*?</li>)', ours, re.S).group(1)
    item = re.sub(r"<b>.*?</b>", "<b>{{B}}</b>", item, flags=re.S)
    item = re.sub(r"<span>.*?</span>", "<span>{{S}}</span>", item, flags=re.S)
    ours = re.sub(r'(<span class="kick">).*?(</span>)', r"\1{{OU_KICK}}\2", ours, count=1, flags=re.S)
    ours = re.sub(r"(<h2>).*?(</h2>)", r"\1{{OU_H}}\2", ours, count=1, flags=re.S)
    ours = re.sub(r'(<div class="ou-t">.*?<p>).*?(</p>)', r"\1{{OU_P}}\2", ours, count=1, flags=re.S)
    ours, nb = re.subn(r'<a class="go-btn" href="#">[^<]*</a>', f'<a class="go-btn" href="{PLATFORM}">{{{{OU_BTN}}}}</a>', ours, count=1)
    ours, nl = re.subn(r'<ul class="ou-l">.*?</ul>', '<ul class="ou-l">{{OU_ITEMS}}</ul>', ours, count=1, flags=re.S)
    assert (nb, nl) == (1, 1) and "{{OU_KICK}}" in ours and "{{OU_H}}" in ours and "{{OU_P}}" in ours
    i = body.index('<section class="sec zone ct-top" id="article">')
    j = body.index('<section class="sec zone" id="related">')
    body = body[:i] + "{{ARTICLE}}{{OURS}}" + body[j:]
    card = re.search(r'<div class="ar-rel">(<a class="bl-c" href="#">.*?</a>)', body, re.S).group(1)
    card = re.sub(r'<span class="bl-k">[^<]*</span>', '<span class="bl-k">{{K}}</span>', card).replace('href="#"', 'href="{{HREF}}"')
    card = re.sub(r"<h3>.*?</h3>", "<h3>{{T}}</h3>", card, flags=re.S)
    card = re.sub(r'<span class="bl-m">[^<]*</span>', '<span class="bl-m">{{M}}</span>', card)
    PARTS[(lang, "article")] = {"card": card, "ours": ours, "ours_item": item}
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


def who_markup(body, lang):
    """Who it's for, /for-who (uxb-024 v4 HE, uxb-028 v1 EN, tbl-028): three site
    types and the professions band (HomeBehaviors drives the band, as on pricing)."""
    body = body.replace('<a href="/" lang="he"', '<a href="/for-who" lang="he"').replace('<a href="/en" lang="en"', '<a href="/en/for-who" lang="en"')
    body, n = re.subn(r'<nav class="crumb"[^>]*>.*?</nav>', "", body, count=1, flags=re.S)
    assert n == 1 and body.count('<span class="ty-ic">') == 5 and body.count('class="mq"') == 1
    body = body.replace('<span class="ty-ic">', '<span class="ty-ic" aria-hidden="true">')
    return body


def nf_markup(body, lang):
    """404 (uxb-030 v2 HE, uxb-031 v2 EN, tbl-028): no breadcrumbs; the site adds
    the <main> landmark itself, so the sheet's own one goes."""
    body, n = re.subn(r"<main>(.*?)</main>", r"\1", body, count=1, flags=re.S)
    assert n == 1 and "<main" not in body
    for a, b in (('href="/who"', 'href="/for-who"'), ('href="/en/who"', 'href="/en/for-who"')):
        body = body.replace(a, b)
    assert "/who\"" not in body
    return body


# the legal sheets (uxb-025, tbl-027 / tbl-028) and their addresses on the site
LEGAL = {"terms": "terms", "privacy": "privacy", "cookies": "cookies", "accessibility": "accessibility", "cancel": "cancel", "aup": "acceptable-use"}
LEGAL_OUT = {}


# tbl-029: the legal texts follow what actually runs on the site. The trackers
# in the code are PostHog and GA4 (measurement), Google Ads and the Meta Pixel
# (marketing), each loaded only after its category is approved; there is no
# Clarity, TikTok or Taboola. The cancellation form lives in the account on the
# platform, so the page links there (the header's "Log in" address).
MEASURE = {
    "he": ("<tr><td>מדידה</td><td>PostHog</td><td>מדידת צפיות בעמודים באתר</td><td>כן</td></tr>"
           "<tr><td>מדידה</td><td>Google Analytics 4</td><td>מדידת ביקורים באתר: עמודים שנצפו ומקור ההגעה</td><td>כן</td></tr>"),
    "en": ("<tr><td>Measurement</td><td>PostHog</td><td>Measuring page views on the site</td><td>Yes</td></tr>"
           "<tr><td>Measurement</td><td>Google Analytics 4</td><td>Measuring visits to the site: pages viewed and where visitors came from</td><td>Yes</td></tr>"),
}
VENDORS = {
    "he": ("<tr><td>PostHog</td><td>מדידת צפיות בעמודים באתר uxellent.com</td><td><mark class=\"flag\">‼️ להשלים מדינה</mark></td></tr>"
           "<tr><td>Google Analytics 4</td><td>מדידת ביקורים באתר uxellent.com: עמודים שנצפו ומקור ההגעה</td><td><mark class=\"flag\">‼️ להשלים מדינה</mark></td></tr>"),
    "en": ("<tr><td>PostHog</td><td>Measuring page views on uxellent.com</td><td><mark class=\"flag\">‼️ Fill in country</mark></td></tr>"
           "<tr><td>Google Analytics 4</td><td>Measuring visits to uxellent.com: pages viewed and where visitors came from</td><td><mark class=\"flag\">‼️ Fill in country</mark></td></tr>"),
}
CANCEL_LINK = {
    "he": (f'<div class="lg-cancel"><a class="ct-btn" href="{PLATFORM}">לטופס הביטול בחשבון</a>'
           '<p class="ct-note">אפשר לבטל גם במייל ל-<a class="lnk" href="mailto:support@uxellent.com"><bdi>support@uxellent.com</bdi></a>.</p></div>'),
    "en": (f'<div class="lg-cancel"><a class="ct-btn" href="{PLATFORM}">Go to the cancellation form in your account</a>'
           '<p class="ct-note">You can also cancel by email at <a class="lnk" href="mailto:support@uxellent.com">support@uxellent.com</a>.</p></div>'),
}
LEGAL_FIXES = {
    ("he", "cookies"): [
        ("<p>כרגע פועלות באתר רק עוגיות הכרחיות. כלי מדידה ושיווק יתווספו בקרוב, והם ייטענו רק אחרי שתאשרו אותם בבאנר. אלה הכלים שאנחנו מתכננים להפעיל:</p>",
         "<p>כלי מדידה ושיווק נטענים רק אחרי שאישרתם אותם בבאנר. אלה הכלים שפועלים באתר:</p>"),
        ("<tr><td>מדידה</td><td>Microsoft Clarity</td><td>להבין איך גולשים באתר: קליקים, גלילה והקלטות גלישה</td><td>כן</td></tr>", MEASURE["he"]),
        ("<tr><td>שיווק</td><td>TikTok</td><td>מדידת קמפיינים ופרסום מותאם</td><td>כן</td></tr>", ""),
        ("<tr><td>שיווק</td><td>Taboola</td><td>מדידת קמפיינים ופרסום מותאם</td><td>כן</td></tr>", ""),
        ('<p><mark class="flag">‼️ כרגע אין באתר כלי מדידה או שיווק. כשיתווספו, הבאנר חייב לחסום אותם עד אישור</mark></p>', ""),
    ],
    ("en", "cookies"): [
        ("<p>Right now only necessary cookies run on the site. Measurement and marketing tools will be added soon, and they will load only after you approve them in the banner. These are the tools we plan to use:</p>",
         "<p>Measurement and marketing tools load only after you approve them in the banner. These are the tools on the site:</p>"),
        ("<tr><td>Measurement</td><td>Microsoft Clarity</td><td>Understanding how people browse the site: clicks, scrolling and session recordings (coming soon, only with consent)</td><td>Yes</td></tr>", MEASURE["en"]),
        ("<tr><td>Marketing</td><td>TikTok</td><td>Campaign measurement and personalised ads</td><td>Yes</td></tr>", ""),
        ("<tr><td>Marketing</td><td>Taboola</td><td>Campaign measurement and personalised ads</td><td>Yes</td></tr>", ""),
        ('<p><mark class="flag">‼️ There are currently no measurement or marketing tools on the site. When they are added, the banner must block them until approved</mark></p>', ""),
    ],
    ("he", "privacy"): [
        ("<tr><td>Google Ads</td><td>פרסום ומדידת קמפיינים באתר uxellent.com (יתווסף בקרוב, רק בהסכמה)</td>", VENDORS["he"] + "<tr><td>Google Ads</td><td>פרסום ומדידת קמפיינים באתר uxellent.com</td>"),
        ("<tr><td>Meta (פייסבוק ואינסטגרם)</td><td>פרסום ומדידת קמפיינים באתר uxellent.com (יתווסף בקרוב, רק בהסכמה)</td>", "<tr><td>Meta (פייסבוק ואינסטגרם)</td><td>פרסום ומדידת קמפיינים באתר uxellent.com</td>"),
        ('<tr><td>TikTok</td><td>פרסום ומדידת קמפיינים באתר uxellent.com (יתווסף בקרוב, רק בהסכמה)</td><td><mark class="flag">‼️ להשלים מדינה</mark></td></tr>', ""),
        ('<tr><td>Taboola</td><td>פרסום ומדידת קמפיינים באתר uxellent.com (יתווסף בקרוב, רק בהסכמה)</td><td><mark class="flag">‼️ להשלים מדינה</mark></td></tr>', ""),
        ('<tr><td>Microsoft Clarity</td><td>מדידת שימוש באתר uxellent.com: קליקים, גלילה והקלטות גלישה (יתווסף בקרוב, רק בהסכמה)</td><td><mark class="flag">‼️ להשלים מדינה</mark></td></tr>', ""),
        ("<p>כרגע פועלות באתר uxellent.com רק עוגיות הכרחיות. כלי מדידה ופרסום יתווספו בקרוב, וייטענו רק אחרי שתאשרו אותם. הרשימה",
         "<p>כלי מדידה ושיווק נטענים רק אחרי שאישרתם אותם בבאנר. הרשימה"),
    ],
    ("en", "privacy"): [
        ("<tr><td>Google Ads</td><td>Advertising and campaign measurement on uxellent.com (coming soon, only with consent)</td>", VENDORS["en"] + "<tr><td>Google Ads</td><td>Advertising and campaign measurement on uxellent.com</td>"),
        ("<tr><td>Meta (Facebook and Instagram)</td><td>Advertising and campaign measurement on uxellent.com (coming soon, only with consent)</td>", "<tr><td>Meta (Facebook and Instagram)</td><td>Advertising and campaign measurement on uxellent.com</td>"),
        ('<tr><td>TikTok</td><td>Advertising and campaign measurement on uxellent.com (coming soon, only with consent)</td><td><mark class="flag">‼️ Fill in country</mark></td></tr>', ""),
        ('<tr><td>Taboola</td><td>Advertising and campaign measurement on uxellent.com (coming soon, only with consent)</td><td><mark class="flag">‼️ Fill in country</mark></td></tr>', ""),
        ('<tr><td>Microsoft Clarity</td><td>Usage measurement on uxellent.com: clicks, scrolling and session recordings (coming soon, only with consent)</td><td><mark class="flag">‼️ Fill in country</mark></td></tr>', ""),
        ("<p>Right now only necessary cookies run on uxellent.com. Measurement and advertising tools will be added soon, and they will load only after you allow them. The list",
         "<p>Measurement and marketing tools load only after you approve them in the banner. The list"),
    ],
    ("he", "accessibility"): [
        ('<li>אין עדיין קישור "דלגו לתוכן" בראש העמוד.</li>', ""),
    ],
    ("en", "accessibility"): [
        ('<li>There is no "Skip to content" link at the top of the page yet.</li>', ""),
    ],
    ("he", "cancel"): [
        ("<li>הדרך הכי פשוטה לבטל: הטופס בתחתית העמוד.</li>", "<li>הדרך הכי פשוטה לבטל: טופס הביטול בחשבון.</li>"),
        ("<tr><td>טופס ביטול</td><td>בתחתית העמוד הזה. הדרך הכי מהירה.</td></tr>", ""),
        ('<td>בהגדרות החשבון בפלטפורמה. <mark class="flag">‼️ אושר: טופס הביטול קיים באזור החשבון</mark></td>', "<td>טופס הביטול בהגדרות החשבון בפלטפורמה. הדרך הכי מהירה.</td>"),
    ],
    ("en", "cancel"): [
        ("<li>The simplest way to cancel: the form at the bottom of this page.</li>", "<li>The simplest way to cancel: the cancellation form in your account.</li>"),
        ("<tr><td>Cancellation form</td><td>At the bottom of this page. The fastest way.</td></tr>", ""),
        ('<td>In the account settings on the platform. <mark class="flag">‼️ Confirmed: the cancellation form exists in the account area</mark></td>', "<td>The cancellation form in the account settings on the platform. The fastest way.</td>"),
    ],
}


def legal_fixes(body, lang, legal):
    for old, new in LEGAL_FIXES.get((lang, legal), []):
        assert body.count(old) == 1, (lang, legal, old[:60])
        body = body.replace(old, new)
    if legal == "cancel":
        # the form is in the account: a button there instead of the sheet's unconnected form (and its ‼️ marks)
        body, n = re.subn(r'<form class="ct-form lg-form".*?</form>', lambda m: CANCEL_LINK[lang], body, count=1, flags=re.S)
        assert n == 1 and "<form" not in body
    if legal in ("cookies", "privacy"):
        assert not re.search(r"Clarity|TikTok|Taboola|יתווסף בקרוב|coming soon|רק עוגיות הכרחיות|only necessary cookies", body), (lang, legal)
    if legal == "accessibility":
        assert "דלגו לתוכן" not in body and "Skip to content" not in body
    return body


# tbl-031: the legal pages go live without review marks (Itzik's decision). Each
# ‼️ is handled on purpose: a question for the lawyer or the owner whose sentence
# is complete loses only the mark ("strip"); a missing fact that the code, the
# settings or DNS confirm is filled in ("sub"); a claim that cannot be confirmed,
# or that the platform code shows is not so, goes ("drop" removes its paragraph,
# list item or table row). Facts checked on 21.10.2026 in uxellent-platform
# (agent5-otpw), in DNS (Cloudflare NS; Resend's eu-west-1 MX) and on the Preview
# (cookies, the marketing site's iad1 functions, PostHog's host, eu.i.posthog.com since 038).
# Nothing is left half empty.
EFFECTIVE = {"he": "בתוקף מ-21 באוקטובר 2026", "en": "Effective from 21 October 2026"}
LEGAL_PUBLISH = {
    ("he", "terms"): [
        ("sub", "הפלטפורמה בונה אתרים לעסקי שירות: אתרי תדמית ומותג, אתרי שיווק ודפי נחיתה, ואתרי תיק עבודות וגלריה. הפלטפורמה אינה מציעה חנות מקוונת.",
         "הפלטפורמה בונה אתרים לעסקים ולארגונים: אתרי תדמית ומותג, אתרי שיווק ודפי נחיתה, ואתרי תיק עבודות וגלריה."),
        ("strip", "‼️ לאמת מול המערכת שהשמירה פועלת כך"),
        ("strip", "‼️ לעו״ד: האם המחיר בדולר"),
        ("strip", "‼️ לאמת מה בדיוק נשמר אצלנו"),
        ("sub", "בכל חבילה יש מכסה חודשית של פעולות AI ותקרה יומית. למכסה אין ערך כספי ואי אפשר להמיר אותה לכסף או להעביר אותה. <mark class=\"flag\">‼️ לאשר: מכסה שלא נוצלה אינה עוברת לחודש הבא</mark>",
         "בכל חבילה יש מכסה חודשית של פעולות AI. מכסה שלא נוצלה אינה עוברת לחודש הבא. למכסה אין ערך כספי ואי אפשר להמיר אותה לכסף או להעביר אותה."),
        ("strip", "‼️ לבעלים: כמה ימים מראש"),
        ("drop", "<b>מנוי שנתי.</b> לפני סוף השנה נשלח לכם מייל"),
        ("sub", "מתחילה תקופה שנתית ומחויבת. <mark class=\"flag\">‼️ לאשר איך מזכים את יתרת החודש</mark>",
         "מתחילה תקופה שנתית חדשה מאותו יום. מהחיוב מנכים את החלק שלא נוצל מהחודש הנוכחי, לפי ימים."),
        ("strip", "‼️ תלוי מימוש: החזרה אוטומטית של פעולה שנכשלה"),
        ("sub", " לפי ההסכם איתו, המידע הזה לא משמש לאימון המודלים שלו. <mark class=\"flag\">‼️ לאמת מול תנאי Anthropic העדכניים</mark>", ""),
        ("strip", "‼️ לעו״ד: האם נדרש נספח עיבוד מידע"),
        ("strip", "‼️ החלטת בעלים: האם להתחייב לזמינות"),
        ("strip", "‼️ לבעלים: האם לקוח יכול לבקש שחזור"),
        ("strip", "‼️ לעו״ד: לאשר את גובה הרצפה"),
        ("strip", "‼️ לעו״ד: האם פטור לאירוע אבטחה"),
        ("strip", "‼️ לעו״ד: האם להשאיר את קיצור ההתיישנות"),
        ("sub", "אחרי סגירה יהיו לכם 30 יום לצפות בתוכן ובפניות ולהוריד אותם. אחרי 30 יום הם יימחקו. <mark class=\"flag\">‼️ תלוי מימוש: כלי ייצוא תוכן ופניות, ומחיקה אוטומטית אחרי 30 יום</mark>",
         "סגירת החשבון מוחקת אותו ואת התוכן מיד. רישומי תשלום נשמרים כפי שהדין מחייב."),
        ("strip", "‼️ תלוי מימוש: בקשת אישור מחדש"),
        ("strip", "‼️ תלוי מימוש: ארכיון גרסאות גלוי"),
        ("sub", "לבתי המשפט המוסמכים במחוז <mark class=\"flag\">‼️ מחוז לבחירת עו״ד. משרד החברה במודיעין-מכבים-רעות</mark>,", "לבתי המשפט המוסמכים בישראל,"),
        # tbl-032: both AI providers, as the platform code calls them (Anthropic directly; Flux through Vercel AI Gateway)
        ("sub", "<p>אתם כותבים הנחיה, וה-AI מייצר טקסט, עיצוב ומבנה.", "<p>אתם כותבים הנחיה, וה-AI מייצר טקסט, עיצוב, מבנה ותמונות."),
        ("sub", "<p>הבקשות שלכם והתוכן הרלוונטי נשלחים לספק המודל (Anthropic) כדי לבצע את הפעולה.</p>",
         "<p>הבקשות שלכם והתוכן הרלוונטי נשלחים לספקי ה-AI כדי לבצע את הפעולה: Anthropic לטקסט ולעיצוב, ו-Black Forest Labs (Flux) לתמונות, דרך Vercel AI Gateway.</p>"),
        # tbl-032: cancelling and closing are two things, as in the platform code: cancelling keeps everything
        # (free plan at the end of the paid period, the domain detached and kept); closing deletes, on request,
        # after a paid subscription is cancelled; deleted accounts leave the backup 30 days later
        ("sub", "<a href=\"#t-end\">סיום וייצוא</a>", "<a href=\"#t-end\">סיום ההתקשרות</a>"),
        ("sub", "<p>אתם רשאים לבטל את המנוי בכל עת, כמפורט למעלה. אחרי הביטול האתר עובר לחבילת חינם והתוכן נשמר.</p><p>אתם רשאים גם לסגור את החשבון. סגירת החשבון מוחקת אותו ואת התוכן מיד. רישומי תשלום נשמרים כפי שהדין מחייב.</p><p>עותקים בגיבוי נמחקים כשהגיבוי מתחלף, בתוך 30 לילות. נשמור",
         "<p><b>ביטול מנוי.</b> אתם רשאים לבטל את המנוי בכל עת, כמפורט למעלה. החבילה בתשלום ממשיכה לפעול עד סוף התקופה ששולמה. אחר כך האתר נשאר באוויר בחבילת חינם, בכתובת שלנו, והתוכן נשמר. הדומיין האישי מתנתק, ומתחבר שוב אם תרכשו חבילה מחדש. ביטול לא מוחק דבר.</p><p><b>סגירת חשבון.</b> זה צעד נפרד מביטול. כדי לסגור את החשבון, כתבו לנו ל-<a class=\"lnk\" href=\"mailto:support@uxellent.com\"><bdi>support@uxellent.com</bdi></a>. אם יש מנוי בתשלום, הוא מבוטל קודם. סגירת החשבון מוחקת אותו ואת התוכן מיד. רישומי תשלום נשמרים כפי שהדין מחייב.</p><p>עותקים בגיבוי נמחקים אוטומטית 30 יום אחרי סגירת החשבון. נשמור"),
        # tbl-036: the yearly saving is computed from the plans data (src/app/_home/plan-fill.ts)
        ("sub", "בתשלום שנתי המחיר החודשי נמוך ב-20 אחוז,", "בתשלום שנתי המחיר החודשי {{PLAN_SAVE_TERMS}},"),
    ],
    ("en", "terms"): [
        ("sub", "The platform builds websites for service businesses: brand and company sites, marketing sites and landing pages, and portfolio and gallery sites. The platform does not offer an online store.",
         "The platform builds websites for businesses and organizations: brand and company sites, marketing sites and landing pages, and portfolio and gallery sites."),
        ("strip", "‼️ Verify against the system that it is saved this way"),
        ("strip", "‼️ For the lawyer: does the dollar price"),
        ("strip", "‼️ Verify exactly what we store"),
        ("sub", "Every plan has a monthly quota of AI actions and a daily cap. The quota has no cash value and cannot be converted to money or transferred. <mark class=\"flag\">‼️ Confirm: unused quota does not roll over to the next month</mark>",
         "Every plan has a monthly quota of AI actions. Unused quota does not roll over to the next month. The quota has no cash value and cannot be converted to money or transferred."),
        ("strip", "‼️ For the owner: how many days in advance"),
        ("drop", "<b>Annual subscription.</b> Before the year ends we will email you"),
        ("sub", "An annual period starts and is charged. <mark class=\"flag\">‼️ Confirm how the rest of the month is credited</mark>",
         "A new annual period starts that day. The unused part of the current month is deducted from the charge, by days."),
        ("strip", "‼️ Depends on implementation: automatic return of a failed action"),
        ("sub", " Under our agreement with them, this information is not used to train their models. <mark class=\"flag\">‼️ Verify against Anthropic's current terms</mark>", ""),
        ("strip", "‼️ For the lawyer: is a full data processing appendix"),
        ("strip", "‼️ Owner decision: whether to commit to availability"),
        ("strip", "‼️ For the owner: can a customer ask for a restore"),
        ("strip", "‼️ For the lawyer: confirm the floor amount"),
        ("strip", "‼️ For the lawyer: will the exemption for a security incident"),
        ("strip", "‼️ For the lawyer: whether to keep the shortened limitation period"),
        ("sub", "After closing it you will have 30 days to view and download your content and enquiries. After 30 days they will be deleted. <mark class=\"flag\">‼️ Depends on implementation: export tool for content and enquiries, and automatic deletion after 30 days</mark>",
         "Closing the account deletes it and its content right away. Payment records are kept as the law requires."),
        ("strip", "‼️ Depends on implementation: asking for acceptance again"),
        ("strip", "‼️ Depends on implementation: visible version archive"),
        ("sub", "the competent courts of the <mark class=\"flag\">‼️ District to be chosen by the lawyer. The company's office is in Modi'in-Maccabim-Re'ut</mark> district.", "the competent courts in Israel."),
        # "store" as a verb, in the translation only (the Hebrew is binding): the page names no store at all (tbl-031)
        ("sub", "We do not store the full card number.", "We do not keep the full card number."),
        ("sub", "permission to store, copy, adapt and display", "permission to keep, copy, adapt and display"),
        # tbl-032: both AI providers; cancelling and closing (see the Hebrew)
        ("sub", "<p>You write a prompt, and the AI produces text, design and structure.", "<p>You write a prompt, and the AI produces text, design, structure and images."),
        ("sub", "<p>Your requests and the relevant content are sent to the model provider (Anthropic) to carry out the action.</p>",
         "<p>Your requests and the relevant content are sent to the AI providers to carry out the action: Anthropic for text and design, and Black Forest Labs (Flux) for images, through Vercel AI Gateway.</p>"),
        ("sub", "<a href=\"#t-end\">Ending and export</a>", "<a href=\"#t-end\">Ending the agreement</a>"),
        ("sub", "<p>You may cancel your subscription at any time, as described above. After cancelling, the site moves to the Free plan and your content is kept.</p><p>You may also close your account. Closing the account deletes it and its content right away. Payment records are kept as the law requires.</p><p>Copies in backups are deleted when the backup is replaced, within 30 nights. We will",
         "<p><b>Cancelling the subscription.</b> You may cancel your subscription at any time, as described above. The paid plan keeps running until the end of the paid period. After that the site stays online on the Free plan, at our address, and your content is kept. The custom domain is disconnected, and connects again if you buy a plan again. Cancelling deletes nothing.</p><p><b>Closing the account.</b> This is a separate step from cancelling. To close your account, write to us at <a class=\"lnk\" href=\"mailto:support@uxellent.com\">support@uxellent.com</a>. A paid subscription, if there is one, is cancelled first. Closing the account deletes it and its content right away. Payment records are kept as the law requires.</p><p>Copies in backups are deleted automatically 30 days after the account is closed. We will"),
        # tbl-036: the yearly saving is computed from the plans data (src/app/_home/plan-fill.ts)
        ("sub", "With annual billing the monthly price is 20 percent lower,", "With annual billing the monthly price {{PLAN_SAVE_TERMS}},"),
    ],
    ("he", "privacy"): [
        ("strip", "‼️ לעו״ד: האם חלה עלינו חובה למנות ממונה"),
        ("sub", "פרטי הכרטיס נמסרים ישירות ל-Cardcom. <mark class=\"flag\">‼️ לאמת מה אנחנו מקבלים מ-Cardcom</mark>",
         "פרטי הכרטיס נמסרים ישירות ל-Cardcom. אנחנו שומרים רק אסימון מוצפן לחיוב החודשי ואת תוקף הכרטיס, בלי מספר הכרטיס."),
        ("sub", "<td>אחסון האתרים והאפליקציה, הפצת תוכן, תעודות SSL</td><td><mark class=\"flag\">‼️ להשלים מדינה</mark></td>",
         "<td>אחסון האתרים והאפליקציה, הפצת תוכן, תעודות SSL</td><td>הפלטפורמה ואתרי הלקוחות: האיחוד האירופי (פרנקפורט). האתר uxellent.com: ארצות הברית. הפצת התוכן: רשת עולמית.</td>"),
        ("sub", "<mark class=\"flag\">‼️ לאמת: לפי מסמכי הפרויקט האיחוד האירופי (פרנקפורט)</mark>", "האיחוד האירופי (פרנקפורט)"),
        ("sub", "<mark class=\"flag\">‼️ לאמת: לפי מסמכי הפרויקט האיחוד האירופי (אירלנד)</mark>", "האיחוד האירופי (אירלנד)"),
        ("sub", "<mark class=\"flag\">‼️ לאמת: לפי מסמכי הפרויקט ארצות הברית</mark>", "ארצות הברית"),
        ("sub", "<td>ניהול DNS</td><td><mark class=\"flag\">‼️ להשלים מדינה</mark></td>", "<td>ניהול DNS</td><td>רשת עולמית</td>"),
        ("sub", "<td>מדידת צפיות בעמודים באתר uxellent.com</td><td><mark class=\"flag\">‼️ להשלים מדינה</mark></td>", "<td>מדידת צפיות בעמודים באתר uxellent.com</td><td>האיחוד האירופי</td>"),
        ("sub", "<td>מדידת ביקורים באתר uxellent.com: עמודים שנצפו ומקור ההגעה</td><td><mark class=\"flag\">‼️ להשלים מדינה</mark></td>", "<td>מדידת ביקורים באתר uxellent.com: עמודים שנצפו ומקור ההגעה</td><td>ארצות הברית</td>"),
        ("sub", "<tr><td>Google Ads</td><td>פרסום ומדידת קמפיינים באתר uxellent.com</td><td><mark class=\"flag\">‼️ להשלים מדינה</mark></td>", "<tr><td>Google Ads</td><td>פרסום ומדידת קמפיינים באתר uxellent.com</td><td>ארצות הברית</td>"),
        ("sub", "<tr><td>Meta (פייסבוק ואינסטגרם)</td><td>פרסום ומדידת קמפיינים באתר uxellent.com</td><td><mark class=\"flag\">‼️ להשלים מדינה</mark></td>", "<tr><td>Meta (פייסבוק ואינסטגרם)</td><td>פרסום ומדידת קמפיינים באתר uxellent.com</td><td>ארצות הברית</td>"),
        ("drop", "‼️ לעו״ד: לאשר את הבסיס להעברה"),
        ("sub", " לפי ההסכם איתו, המידע לא משמש לאימון המודלים שלו. <mark class=\"flag\">‼️ לאמת מול תנאי Anthropic העדכניים</mark>", ""),
        ("sub", "נשלח לכם דיוור שיווקי רק אם הסכמתם מראש, בתיבה נפרדת שאינה מסומנת מראש. <mark class=\"flag\">‼️ תלוי מימוש: תיבת הסכמה נפרדת ושמירת תיעוד ההסכמה</mark>",
         "נשלח לכם דיוור שיווקי רק אם הסכמתם לכך מראש."),
        ("strip", "‼️ לאמת</mark></li>"),
        ("drop", "ספקי תשתית מוכרים, שמחויבים בהסכם"),
        ("drop", "אנחנו מנהלים מסמך הגדרות מאגר ונוהל אבטחה"),
        ("sub", "<td>30 יום לצפייה והורדה, ואז מחיקה. <mark class=\"flag\">‼️ תלוי מימוש</mark></td>", "<td>נמחקים מיד. רישומי תשלום נשמרים כפי שהדין מחייב.</td>"),
        ("strip", "‼️ לעו״ד: לאשר את התקופה"),
        ("sub", "<td>תיעוד הסכמה לתנאים ולדיוור</td>", "<td>תיעוד ההסכמה לתנאים</td>"),
        ("drop", "<td>לוגים טכניים</td>"),
        ("strip", "‼️ הבאנר עוצב (uxb-026)"),
        # tbl-032: both AI providers (Flux through Vercel AI Gateway); BFL's country from its public privacy
        # policy: outside the EEA the controller is Black Forest Labs Inc, San Francisco
        ("sub", "<tr><td>Vercel</td><td>אחסון האתרים והאפליקציה, הפצת תוכן, תעודות SSL</td>", "<tr><td>Vercel</td><td>אחסון האתרים והאפליקציה, הפצת תוכן, תעודות SSL, ו-Vercel AI Gateway, שדרכו נשלחות הבקשות ליצירת תמונות</td>"),
        ("sub", "<tr><td>Anthropic</td><td>מודל ה-AI שמעצב וכותב את האתר</td><td>ארצות הברית</td></tr>",
         "<tr><td>Anthropic</td><td>מודל ה-AI שכותב ומעצב את האתר: טקסט ועיצוב</td><td>ארצות הברית</td></tr><tr><td>Black Forest Labs (Flux)</td><td>יצירת תמונות לאתר</td><td>ארצות הברית</td></tr>"
         # tbl-036: Pexels (stock photos); its policy: Canva Germany GmbH, Berlin, processing also in the US, Australia, Singapore and more
         "<tr><td>Pexels</td><td>מאגר תמונות. נשלחות אליו מילות חיפוש לתמונות לאתר, בלי מידע אישי</td><td>גרמניה. לפי המדיניות שלהם, העיבוד גם בארצות הברית, באוסטרליה, בסינגפור ובמדינות נוספות.</td></tr>"),
        ("sub", "ההנחיה ותוכן רלוונטי מהאתר נשלחים לספק המודל.</p>", "ההנחיה ותוכן רלוונטי מהאתר נשלחים לספקי ה-AI: Anthropic לטקסט ולעיצוב, ו-Black Forest Labs (Flux) לתמונות, דרך Vercel AI Gateway.</p>"),
        ("sub", "<td>נמחקים מיד. רישומי תשלום נשמרים כפי שהדין מחייב.</td>", "<td>נמחקים מיד. עותקים בגיבוי נמחקים 30 יום אחרי הסגירה. רישומי תשלום נשמרים כפי שהדין מחייב.</td>"),
        ("sub", "<tr><td>גיבויים</td><td>עד 30 לילות.</td></tr>", "<tr><td>גיבויים</td><td>עד 30 יום.</td></tr>"),
    ],
    ("en", "privacy"): [
        ("strip", "‼️ For the lawyer: are we required to appoint"),
        ("sub", "Card details go directly to Cardcom. <mark class=\"flag\">‼️ Verify what we receive from Cardcom</mark>",
         "Card details go directly to Cardcom. We keep only an encrypted token for the recurring charge and the card's expiry date, never the card number."),
        ("sub", "<td>Hosting the sites and the app, content delivery, SSL certificates</td><td><mark class=\"flag\">‼️ Fill in country</mark></td>",
         "<td>Hosting the sites and the app, content delivery, SSL certificates</td><td>The platform and customers' sites: European Union (Frankfurt). The uxellent.com site: United States. Content delivery: a worldwide network.</td>"),
        ("sub", "<mark class=\"flag\">‼️ Verify: per project documents, European Union (Frankfurt)</mark>", "European Union (Frankfurt)"),
        ("sub", "<mark class=\"flag\">‼️ Verify: per project documents, European Union (Ireland)</mark>", "European Union (Ireland)"),
        ("sub", "<mark class=\"flag\">‼️ Verify: per project documents, United States</mark>", "United States"),
        ("sub", "<td>DNS management</td><td><mark class=\"flag\">‼️ Fill in country</mark></td>", "<td>DNS management</td><td>A worldwide network</td>"),
        ("sub", "<td>Measuring page views on uxellent.com</td><td><mark class=\"flag\">‼️ Fill in country</mark></td>", "<td>Measuring page views on uxellent.com</td><td>European Union</td>"),
        ("sub", "<td>Measuring visits to uxellent.com: pages viewed and where visitors came from</td><td><mark class=\"flag\">‼️ Fill in country</mark></td>", "<td>Measuring visits to uxellent.com: pages viewed and where visitors came from</td><td>United States</td>"),
        ("sub", "<tr><td>Google Ads</td><td>Advertising and campaign measurement on uxellent.com</td><td><mark class=\"flag\">‼️ Fill in country</mark></td>", "<tr><td>Google Ads</td><td>Advertising and campaign measurement on uxellent.com</td><td>United States</td>"),
        ("sub", "<tr><td>Meta (Facebook and Instagram)</td><td>Advertising and campaign measurement on uxellent.com</td><td><mark class=\"flag\">‼️ Fill in country</mark></td>", "<tr><td>Meta (Facebook and Instagram)</td><td>Advertising and campaign measurement on uxellent.com</td><td>United States</td>"),
        ("drop", "‼️ For the lawyer: confirm the basis for transfers"),
        ("sub", " Under our agreement with them, the information is not used to train their models. <mark class=\"flag\">‼️ Verify against Anthropic's current terms</mark>", ""),
        ("sub", "We will send you marketing email only if you agreed in advance, in a separate box that is not pre-ticked. <mark class=\"flag\">‼️ Depends on implementation: separate consent box and record of consent</mark>",
         "We will send you marketing email only if you agreed to it in advance."),
        ("strip", "‼️ Verify</mark></li>"),
        ("drop", "Established infrastructure providers, bound by contract"),
        ("drop", "We maintain a database definitions document and a security procedure"),
        ("sub", "<td>30 days to view and download, then deletion. <mark class=\"flag\">‼️ Depends on implementation</mark></td>", "<td>Deleted right away. Payment records are kept as the law requires.</td>"),
        ("strip", "‼️ For the lawyer: confirm the period"),
        ("sub", "<td>Record of consent to the terms and to marketing email</td>", "<td>Record of consent to the terms</td>"),
        ("drop", "<td>Technical logs</td>"),
        ("strip", "‼️ The banner has been designed (uxb-026)"),
        # tbl-032: both AI providers (see the Hebrew)
        ("sub", "<tr><td>Vercel</td><td>Hosting the sites and the app, content delivery, SSL certificates</td>", "<tr><td>Vercel</td><td>Hosting the sites and the app, content delivery, SSL certificates, and Vercel AI Gateway, through which image requests are sent</td>"),
        ("sub", "<tr><td>Anthropic</td><td>The AI model that designs and writes the site</td><td>United States</td></tr>",
         "<tr><td>Anthropic</td><td>The AI model that writes and designs the site: text and design</td><td>United States</td></tr><tr><td>Black Forest Labs (Flux)</td><td>Creating images for the site</td><td>United States</td></tr>"
         "<tr><td>Pexels</td><td>A stock photo library. It receives search words for the site's photos, with no personal information</td><td>Germany. Under its policy, processing also takes place in the United States, Australia, Singapore and other countries.</td></tr>"),
        ("sub", "the prompt and relevant content from the site are sent to the model provider.</p>", "the prompt and relevant content from the site are sent to the AI providers: Anthropic for text and design, and Black Forest Labs (Flux) for images, through Vercel AI Gateway.</p>"),
        ("sub", "<td>Deleted right away. Payment records are kept as the law requires.</td>", "<td>Deleted right away. Copies in backups are deleted 30 days after closing. Payment records are kept as the law requires.</td>"),
        ("sub", "<tr><td>Backups</td><td>Up to 30 nights.</td></tr>", "<tr><td>Backups</td><td>Up to 30 days.</td></tr>"),
    ],
    ("he", "cookies"): [
        ("sub", "<th scope=\"col\">צריך הסכמה?</th>", "<th scope=\"col\">עוגיות ותוקף</th><th scope=\"col\">צריך הסכמה?</th>"),
        ("sub", "<td>עוגיות של הפלטפורמה <mark class=\"flag\">‼️ להשלים שמות ותוקף</mark></td><td>שמירת ההתחברות, אבטחה, ושמירת בחירת העוגיות שלכם</td>",
         "<td>עוגיות של UXellent</td><td>שמירת ההתחברות, אבטחה, ושמירת בחירת העוגיות שלכם</td><td>{COOKIES_NEC}</td>"),
        ("sub", "<td>מדידת צפיות בעמודים באתר</td>", "<td>מדידת צפיות בעמודים באתר</td><td>{COOKIES_PH}</td>"),
        ("sub", "<td>מדידת ביקורים באתר: עמודים שנצפו ומקור ההגעה</td>", "<td>מדידת ביקורים באתר: עמודים שנצפו ומקור ההגעה</td><td>{COOKIES_GA}</td>"),
        ("sub", "<td>Google Ads</td><td>מדידת קמפיינים ופרסום מותאם</td>", "<td>Google Ads</td><td>מדידת קמפיינים ופרסום מותאם</td><td>{COOKIES_ADS}</td>"),
        ("sub", "<td>Meta (פייסבוק ואינסטגרם)</td><td>מדידת קמפיינים ופרסום מותאם</td>", "<td>Meta (פייסבוק ואינסטגרם)</td><td>מדידת קמפיינים ופרסום מותאם</td><td>{COOKIES_META}</td>"),
        ("drop", "‼️ לאמת שזו הרשימה המלאה"),
        ("sub", "<p><mark class=\"flag\">‼️ לבעלים: אילו עוגיות הפלטפורמה עצמה מפעילה באתרי הלקוחות, אם בכלל</mark></p>",
         "<p>הפלטפורמה עצמה כותבת באתר של לקוח עוגייה טכנית אחת, <bdi>__Host-ux_pl</bdi>, שמגינה על הטפסים מספאם ונשמרת 6 שעות. אם בעל האתר מציג באנר עוגיות, הבחירה של הגולש נשמרת בעוגייה <bdi>uxellent_consent</bdi> ל-12 חודשים.</p>"),
    ],
    ("en", "cookies"): [
        ("sub", "<th scope=\"col\">Needs consent?</th>", "<th scope=\"col\">Cookies and duration</th><th scope=\"col\">Needs consent?</th>"),
        ("sub", "<td>Platform cookies <mark class=\"flag\">‼️ Fill in names and duration</mark></td><td>Keeping you logged in, security, and remembering your cookie choice</td>",
         "<td>UXellent cookies</td><td>Keeping you logged in, security, and remembering your cookie choice</td><td>{COOKIES_NEC}</td>"),
        ("sub", "<td>Measuring page views on the site</td>", "<td>Measuring page views on the site</td><td>{COOKIES_PH}</td>"),
        ("sub", "<td>Measuring visits to the site: pages viewed and where visitors came from</td>", "<td>Measuring visits to the site: pages viewed and where visitors came from</td><td>{COOKIES_GA}</td>"),
        ("sub", "<td>Google Ads</td><td>Campaign measurement and personalised ads</td>", "<td>Google Ads</td><td>Campaign measurement and personalised ads</td><td>{COOKIES_ADS}</td>"),
        ("sub", "<td>Meta (Facebook and Instagram)</td><td>Campaign measurement and personalised ads</td>", "<td>Meta (Facebook and Instagram)</td><td>Campaign measurement and personalised ads</td><td>{COOKIES_META}</td>"),
        ("drop", "‼️ Verify that this is the full, current list"),
        ("sub", "<p><mark class=\"flag\">‼️ For the owner: which cookies, if any, the platform itself sets on customers' sites</mark></p>",
         "<p>The platform itself sets one technical cookie on a customer's site, <bdi>__Host-ux_pl</bdi>, which protects the forms from spam and is kept for 6 hours. If the site owner shows a cookie banner, the visitor's choice is kept in the <bdi>uxellent_consent</bdi> cookie for 12 months.</p>"),
    ],
    ("he", "accessibility"): [
        ("drop", "‼️ לאמת כל שורה באתר החי"),
        ("drop", "לחברה אין משרד שמקבל קהל."),
        ("drop", "<b>הערה לבעלים, לא לפרסום:</b> לא כותבים"),
        ("sub", "<mark class=\"flag\">‼️ למלא ביום הפרסום</mark>", "21 באוקטובר 2026"),
        ("sub", "<li>כשנוסיף לאתר כלי מדידה ופרסום של צד שלישי, לא תהיה לנו שליטה על הנגישות שלהם.</li>", "<li>לכלי המדידה והפרסום של צד שלישי באתר אין לנו שליטה על הנגישות שלהם.</li>"),
    ],
    ("en", "accessibility"): [
        ("drop", "‼️ Verify every line on the live site"),
        ("drop", "The company has no office that receives the public."),
        ("drop", "<b>Note for the owner, not for publication:</b> Do not write"),
        ("sub", "<mark class=\"flag\">‼️ Fill in on the day of publication</mark>", "21 October 2026"),
        ("sub", "<li>When we add third-party measurement and advertising tools to the site, we will have no control over their accessibility.</li>", "<li>We have no control over the accessibility of the third-party measurement and advertising tools on the site.</li>"),
    ],
    ("he", "cancel"): [
        ("strip", "‼️ לעו״ד: האם שיחה עם צ׳אט ה-AI"),
        ("strip", "‼️ לעו״ד: מנוי שנתי ששולם מראש"),
        ("drop", "‼️ לעו״ד: האם להעניק את זכויות הביטול"),
        ("drop", "‼️ לעו״ד: החוק מאפשר הודעת ביטול גם בעל פה"),
        ("sub", "<li>נשלח לכם אישור במייל עם מועד הביטול. <mark class=\"flag\">‼️ תלוי מימוש</mark></li>", "<li>נשלח לכם אישור במייל, עם התאריך שעד אליו החבילה ממשיכה לפעול.</li>"),
        ("drop", "<b>הערה לבעלים, לא לפרסום:</b> החוק מחייב"),
        # tbl-032: the same as the terms: cancelling keeps the site on the Free plan; closing is separate
        ("sub", "<li>התוכן שלכם נשמר בחבילת חינם. אם תרצו לסגור את החשבון לגמרי, כתבו לנו.</li>",
         "<li>בסוף התקופה ששולמה האתר נשאר באוויר בחבילת חינם, והתוכן נשמר. הדומיין האישי מתנתק, ומתחבר שוב אם תרכשו חבילה מחדש. ביטול לא מוחק דבר.</li><li>סגירת חשבון היא צעד נפרד: כתבו לנו ל-<a class=\"lnk\" href=\"mailto:support@uxellent.com\"><bdi>support@uxellent.com</bdi></a>. הסגירה מוחקת את החשבון ואת התוכן מיד, ועותקים בגיבוי נמחקים 30 יום אחריה.</li>"),
    ],
    ("en", "cancel"): [
        ("strip", "‼️ For the lawyer: does a conversation with the AI chat"),
        ("strip", "‼️ For the lawyer: annual subscription paid in advance"),
        ("drop", "‼️ For the lawyer: whether to give the cancellation rights"),
        ("drop", "‼️ For the lawyer: the law also allows a cancellation notice by phone"),
        ("sub", "<li>We will email you a confirmation with the cancellation date. <mark class=\"flag\">‼️ Depends on implementation</mark></li>", "<li>We will email you a confirmation, with the date until which your plan keeps running.</li>"),
        ("drop", "<b>Note for the owner, not for publication:</b> The law requires"),
        # tbl-032: the same as the terms
        ("sub", "<li>Your content is kept on the Free plan. If you want to close the account completely, write to us.</li>",
         "<li>At the end of the paid period the site stays online on the Free plan, and your content is kept. The custom domain is disconnected, and connects again if you buy a plan again. Cancelling deletes nothing.</li><li>Closing the account is a separate step: write to us at <a class=\"lnk\" href=\"mailto:support@uxellent.com\">support@uxellent.com</a>. Closing deletes the account and its content right away, and copies in backups are deleted 30 days later.</li>"),
    ],
    ("he", "aup"): [
        ("sub", "אישור קבלה ורישום ההודעה עם תאריך ושעה. <mark class=\"flag\">‼️ תלוי מימוש: יומן הודעות</mark>", "אישור קבלת ההודעה."),
        ("strip", "‼️ לעו״ד: לאשר את ההתחייבות"),
    ],
    ("en", "aup"): [
        ("sub", "Confirming receipt and logging the notice with date and time. <mark class=\"flag\">‼️ Depends on implementation: notice log</mark>", "Confirming receipt of the notice."),
        ("strip", "‼️ For the lawyer: confirm this commitment"),
    ],
}
# the cookie column (cookies and how long they are kept), as measured on the Preview
LEGAL_COOKIES = {
    "he": {
        "NEC": "באתר הזה: <bdi>ux_consent</bdi> (בחירת העוגיות, 12 חודשים), <bdi>lang_pref</bdi> (שפת האתר, 12 חודשים), <bdi>geo_country</bdi> (הצעת שפה, יום אחד). בפלטפורמה: <bdi>__Host-ux-auth</bdi> (ההתחברות, עד 400 יום) ועוגיות עזר שנשמרות עד 30 יום.",
        "PH": "<bdi>ph_…_posthog</bdi>, 12 חודשים",
        "GA": "<bdi>_ga</bdi>, <bdi>_ga_HEX0NQF4WM</bdi>, עד 400 יום",
        "ADS": "<bdi>_gcl_au</bdi>, 90 יום. <bdi>IDE</bdi> (בדומיין doubleclick.net), עד 400 יום",
        "META": "<bdi>_fbp</bdi>, 90 יום. <bdi>_fbc</bdi>, 90 יום, רק כשמגיעים מפרסומת",
    },
    "en": {
        "NEC": "On this site: <bdi>ux_consent</bdi> (your cookie choice, 12 months), <bdi>lang_pref</bdi> (site language, 12 months), <bdi>geo_country</bdi> (language suggestion, 1 day). On the platform: <bdi>__Host-ux-auth</bdi> (login, up to 400 days) and helper cookies kept up to 30 days.",
        "PH": "<bdi>ph_…_posthog</bdi>, 12 months",
        "GA": "<bdi>_ga</bdi>, <bdi>_ga_HEX0NQF4WM</bdi>, up to 400 days",
        "ADS": "<bdi>_gcl_au</bdi>, 90 days. <bdi>IDE</bdi> (on doubleclick.net), up to 400 days",
        "META": "<bdi>_fbp</bdi>, 90 days. <bdi>_fbc</bdi>, 90 days, only when arriving from an ad",
    },
}
LEGAL_LOG = []


def legal_publish(body, lang, legal):
    """Publishes a legal page without review marks (tbl-031); see LEGAL_PUBLISH."""
    body, n = re.subn(r'<p class="lg-date">.*?</p>', f'<p class="lg-date">{EFFECTIVE[lang]}</p>', body, count=1, flags=re.S)
    assert n == 1, (lang, legal)
    LEGAL_LOG.append((lang, legal, "fill", "effective date", EFFECTIVE[lang]))
    for op in LEGAL_PUBLISH.get((lang, legal), []):
        kind, a = op[0], op[1]
        if kind == "strip":
            # a prefix of the mark's text, or (ending in </mark>) the whole of it
            needle = '<mark class="flag">' + a.split("</mark>")[0] + ("</mark>" if "</mark>" in a else "")
            assert body.count(needle) == 1, (lang, legal, a)
            m = re.search(r"\s*" + re.escape(needle) + ("" if "</mark>" in a else r"[^<]*</mark>"), body)
            body = body[:m.start()] + body[m.end():]
            LEGAL_LOG.append((lang, legal, "mark removed, text kept", re.sub(r"<[^>]+>", "", m.group(0)).strip(), ""))
        elif kind == "sub":
            new = op[2].format(**{f"COOKIES_{k}": v for k, v in LEGAL_COOKIES[lang].items()}) if "{COOKIES_" in op[2] else op[2]
            assert body.count(a) == 1, (lang, legal, a[:70])
            body = body.replace(a, new)
            LEGAL_LOG.append((lang, legal, "filled" if new else "removed", re.sub(r"<[^>]+>", "", a).strip(), re.sub(r"<[^>]+>", "", new).strip()))
        elif kind == "drop":
            i = body.index(a)
            assert body.count(a) == 1, (lang, legal, a)
            s = max(body.rfind(t, 0, i) for t in ("<p>", "<p ", "<li>", "<tr>"))
            tag = re.match(r"<(p|li|tr)", body[s:]).group(1)
            e = body.index(f"</{tag}>", i) + len(f"</{tag}>")
            LEGAL_LOG.append((lang, legal, "removed", re.sub(r"<[^>]+>", " ", body[s:e]).strip(), ""))
            body = body[:s] + body[e:]
    if legal == "privacy":
        # "Short text to show next to forms" is drafting material for the forms, not part of the policy
        body, n = re.subn(r'<section class="lg-s" id="p-forms">.*?</section>', "", body, count=1, flags=re.S)
        body, n2 = re.subn(r'<a href="#p-forms">[^<]*</a>', "", body, count=1)
        assert (n, n2) == (1, 1), (lang, n, n2)
        LEGAL_LOG.append((lang, legal, "removed", "the section of short texts to place next to forms (drafting material, with its contents link)", ""))
    left = re.findall(r"‼️|הערה לבעלים|Note for the owner|<mark", body)
    assert not left, (lang, legal, left)
    return body


def legal_markup(body, lang, cfg, legal):
    """A legal page (uxb-025, tbl-027 / tbl-028) on the text-page template. The
    yellow ‼️ marks stay on Preview, so the open points are visible (tbl-027)."""
    pre = cfg["pre"]
    route = LEGAL[legal]
    body = legal_fixes(body, lang, legal)
    body = legal_publish(body, lang, legal)
    body = body.replace('<a href="/" lang="he"', f'<a href="/{route}" lang="he"').replace('<a href="/en" lang="en"', f'<a href="/en/{route}" lang="en"')
    body, n1 = re.subn(r'<main id="main">(.*?)</main>', r"\1", body, count=1, flags=re.S)
    body, n2 = re.subn(r'<nav class="crumb"[^>]*>.*?</nav>', "", body, count=1, flags=re.S)
    assert (n1, n2) == (1, 1) and "<main" not in body, (legal, n1, n2)
    # links between the legal pages
    body, nl = re.subn(r'href="legal-([a-z]+)(?:-en)?\.html"', lambda m: f'href="{pre}/{LEGAL[m.group(1)]}"', body)
    assert ".html" not in body, legal
    body = body.replace('<nav class="fq-nav"', '<nav class="fq-nav" data-uxf-nav', 1)
    # a table that scrolls on a phone can be reached and scrolled with the keyboard; it is named by its section
    def tables(m):
        h = re.sub(r"<[^>]+>", "", re.search(r"<h2>(.*?)</h2>", m.group(0), re.S).group(1)).strip()
        return m.group(0).replace('<div class="tw">', f'<div class="tw" tabindex="0" role="region" aria-label="{h}">')
    body = re.sub(r'<section class="lg-s".*?</section>', tables, body, flags=re.S)
    assert '<div class="tw">' not in body
    return body


# Legal pages: a long contents list scrolls inside its own column on desktop.
LEGAL_CSS = """
/* ---- legal pages (tbl-028) ---- */
@media(min-width:1061px){{root} .lg .fq-nav{max-height:calc(100vh - 130px);overflow-y:auto;scrollbar-width:thin}}
{root} .fq-nav a[aria-current=true]{background:var(--tint);color:var(--brand-d)}
{root} .fq-list,{root} .lg-body{min-width:0}
/* tables keep whole words (the page's overflow-wrap:anywhere would split "קטגוריה" in a narrow column) */
{root} .tw{overflow-wrap:normal}
{root} .tw:focus-visible{outline:2px solid var(--brand);outline-offset:2px}
/* cancellation (tbl-029): a link to the form in the account, styled as the form's button */
{root} .lg-cancel{display:grid;gap:14px;justify-items:start;margin-top:8px}
{root} .lg-cancel .ct-btn{display:inline-block;text-decoration:none;text-align:center}
@media(max-width:1060px){{root} .lg-cancel{justify-items:stretch}}
"""


def write_legal():
    # what the publish step removed and filled in, for the lawyer (LEGAL_LOG=<file> to keep it)
    if os.environ.get("LEGAL_LOG"):
        with open(os.environ["LEGAL_LOG"], "w", encoding="utf-8") as f:
            for lang, legal, kind, was, now in LEGAL_LOG:
                f.write(f"{lang}\t{LEGAL[legal]}\t{kind}\t{was}\t{now}\n")
    for lang, pages in LEGAL_OUT.items():
        assert sorted(pages) == sorted(LEGAL), pages.keys()
        ts = (f"// Generated by scripts/home-sheets/build.py from the legal sheets (uxb-025, tbl-028). Do not edit by hand.\n"
              f"export const LEGAL_HTML_{lang.upper()} = {json.dumps({LEGAL[k]: v for k, v in pages.items()}, ensure_ascii=False, indent=1)} as const\n")
        open(os.path.join(OUT, f"legal-markup.{lang}.ts"), "w", encoding="utf-8").write(ts)


def write_consent():
    """The cookie banner and its settings window (uxb-026 v2 HE, uxb-027 v2 EN,
    tbl-027): markup and CSS from the sheets, scoped under .uxk-<lang>;
    ConsentBanner adds the behaviour (the sheet's own script is a demo)."""
    for lang, cfg in LANGS.items():
        src = open(os.path.join(CONSENT_SHEETS, cfg["consent_file"]), encoding="utf-8").read()
        body = re.search(r"<body[^>]*>(.*)</body>", src, re.S).group(1)
        body = re.sub(r'<span class="ztag"[^>]*>.*?</span>', "", body, flags=re.S)
        ck = re.search(r'<div class="ck" id="ck".*?(?=<script>)', body, re.S).group(0).strip()
        assert ck.count('id="ckm"') == 1 and "ztag" not in ck
        # the banner starts hidden (ConsentBanner shows it when no choice is stored); buttons are buttons
        ck = ck.replace('<div class="ck" id="ck"', '<div class="ck off" id="ck" hidden', 1)
        ck = ck.replace("<button ", '<button type="button" ')
        ck = ck.replace('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">', '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">')
        policy = "/cookies" if lang == "he" else "/en/cookies"
        ck, n = re.subn(r'<a class="lnk" href="#">', f'<a class="lnk" href="{policy}">', ck)
        assert n == 1 and 'href="#"' not in ck, n
        css = re.search(r"<style[^>]*>(.*?)</style>", src, re.S).group(1)
        rootvars = re.search(r":root\{[^}]*\}", css).group(0)
        block = re.search(r"/\* uxb-026 cookie banner \*/(.*?)(?=/\*|\Z)", css, re.S).group(1)
        root = f".uxk-{lang}"
        base = (f"{rootvars.replace(':root', root)}\n{root}{{font-family:var(--font-heebo),\"Heebo\",system-ui,sans-serif;color:var(--ink);"
                f"line-height:1.5;-webkit-font-smoothing:antialiased}}\n{root} *{{box-sizing:border-box;margin:0}}\n"
                f"{root} [hidden]{{display:none!important}}\n{root} .lnk{{color:var(--brand-d);text-decoration:underline;text-underline-offset:3px}}\n")
        out = base + scope_css(block, root)
        open(os.path.join(OUT, f"consent.{lang}.css"), "w", encoding="utf-8").write(out)
        ts = (f"// Generated by scripts/home-sheets/build.py from {cfg['consent_file']}. Do not edit by hand.\n"
              f"export const CONSENT_HTML_{lang.upper()} = {json.dumps(ck, ensure_ascii=False)}\n")
        open(os.path.join(OUT, f"consent-markup.{lang}.ts"), "w", encoding="utf-8").write(ts)
        print("consent", lang, len(ck), len(out))


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
/* tbl-028: h1 > h2. The article title is smaller than on the other pages (long titles), so the section titles below it are too */
@media(min-width:1061px){{root} :is(.sh,.closing,.ou) h2{font-size:min(56px,3.6vw)!important}}
"""


# Mobile law (tbl-025b): up to 1060px only ONE container level, never a box in a box.
# Home "how it works": the tinted stage drops, and so do the panels that hold
# fields (brief, chat, publish), like the features mockups; the site picture
# (scene 2) stays a picture.
ONE_LEVEL_HOME = """
/* ---- mobile: one container level (tbl-025b) ---- */
@media(max-width:1060px){
 {root} .hw-stage{background:none;border-radius:0}{root} .hw-stage::before{display:none}
 {root} .hw-sc{padding:0}
 {root} .hw-sc .pn:is(.a1,.a3-chat,.a4){background:none;box-shadow:none;border:0;border-radius:0;padding:0;width:100%;max-width:none}
}
"""
# Pricing: the plan card is the one container; the AI-actions box inside it
# becomes a plain row between two lines.
ONE_LEVEL_PRICING = """
/* ---- mobile: one container level (tbl-025b) ---- */
@media(max-width:1060px){{root} .pl-act{background:none;border-radius:0;padding:14px 0;border-block:1px solid var(--line)}}
/* tbl-034: the actions line is built from the plans data (a trial line is longer), so it wraps when it must */
{root} .pl-act span{white-space:normal;min-width:0}
/* tbl-035: the two lines every card has, right under the AI actions line */
{root} .pl ul.pl-must{margin-top:14px;padding-top:0;border-top:0;gap:9px}
{root} .pl-must li span{display:grid}
{root} .pl-must small{font-size:12.5px;font-weight:500;color:var(--ink2)}
/* the cards side by side share their rows (the free plan's AI line is longer), so the AI line, the two lines and the button align */
@media(min-width:761px){{root} .pl{display:grid;grid-row:span 8;grid-template-rows:subgrid;row-gap:0;align-content:start}{root} .pl ul{align-content:start}}
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
    # the footer bullets on a phone, as in the current designs (עיצובים/, 21.10.2026): a wrapped point keeps its dot on the first line
    css += "\n@media(max-width:1060px){.ft-pts li{align-items:flex-start}.ft-pts li::before{margin-top:.62em}}\n"
    css += SITE040_CSS.get(page, "")
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
    elif page == "legal":
        css += LEGAL_CSS.replace("{root}", root)
    elif page in ("features", "who"):
        css += FEATURES_CSS.replace("{root}", root)
        css += (f"@media (prefers-reduced-motion:reduce){{{root} #inc .mq{{-webkit-mask:none;mask:none}}"
                f"{root} #inc .mq .inc{{flex-wrap:wrap!important;justify-content:center!important;width:auto!important;gap:10px 0!important;transform:none!important}}"
                f"{root} #inc .mq .in-c{{transform:none!important}}}}\n")
    elif home:
        css += ONE_LEVEL_HOME.replace("{root}", root)
        # LCP (tbl-020): the demo headline is shown from the first paint
        css += f"{root} .gs-h.rv{{opacity:1!important;transform:none!important;filter:none!important;animation:none!important}}\n"
    elif page == "pricing":
        css += ONE_LEVEL_PRICING.replace("{root}", root)
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
        build(lang, cfg, images, "article")
        build(lang, cfg, images, "features")
        build(lang, cfg, images, "who")
        build(lang, cfg, images, "nf")
        for legal in LEGAL:
            build(lang, cfg, images, "legal", legal)
    check_renames()
    write_legal()
    write_consent()


main()
