# python3 hreflang-sitemap.py <base> — 051: every sitemap URL answers 200, canonical is itself, hreflang lists itself and
# a matching twin set (reciprocal), x-default is the English page, and the sitemap's alternates match the page's
import re, sys, urllib.request, urllib.error
B = sys.argv[1]; SITE = "https://uxellent.com"
class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *a, **k): return None
op = urllib.request.build_opener(NoRedirect)
def get(u):
    try: r = op.open(urllib.request.Request(u.replace(SITE, B), headers={"user-agent": "Mozilla/5.0 seo051"}), timeout=60)
    except urllib.error.HTTPError as e: return e.code, ""
    return r.status, r.read().decode("utf-8", "replace")
sc, sm = get(B + "/sitemap.xml")
entries = re.findall(r"<url>(.*?)</url>", sm, re.S)
side = {}
for e in entries:
    loc = re.search(r"<loc>(.*?)</loc>", e).group(1)
    side[loc] = dict(re.findall(r'<xhtml:link rel="alternate" hreflang="([^"]+)" href="([^"]+)"', e))
N = lambda u: u.rstrip("/") if u.rstrip("/") == SITE else u  # "https://uxellent.com/" and "https://uxellent.com" are the same address
side = {N(k): {c: N(v) for c, v in a.items()} for k, a in side.items()}
fails = []; seen = {}
for url, alts in side.items():
    s, h = get(url)
    if s != 200: fails.append(f"{url}: {s}"); continue
    head = h[: h.find("</head>")]
    can = re.search(r'<link rel="canonical" href="([^"]+)"', head)
    page = {c: N(v) for c, v in re.findall(r'<link rel="alternate" hrefLang="([^"]+)" href="([^"]+)"', head)}
    lang = re.search(r'<html[^>]* lang="([^"]+)"', h); d = re.search(r'<html[^>]* dir="([^"]+)"', h)
    seen[url] = page
    if not can or N(can.group(1)) != url: fails.append(f"{url}: canonical {can and can.group(1)}")
    if page != alts: fails.append(f"{url}: page hreflang {page} != sitemap {alts}")
    if page:
        if url not in page.values(): fails.append(f"{url}: hreflang misses itself")
        if page.get("x-default") != page.get("en"): fails.append(f"{url}: x-default {page.get('x-default')} != en {page.get('en')}")
    want = "en" if url.startswith(SITE + "/en") else "he"
    if not lang or lang.group(1) != want or not d or d.group(1) != ("ltr" if want == "en" else "rtl"): fails.append(f"{url}: <html lang={lang and lang.group(1)} dir={d and d.group(1)}>")
for url, page in seen.items():
    for code, twin in page.items():
        if code == "x-default": continue
        if twin not in seen: fails.append(f"{url}: twin {twin} not in the sitemap"); continue
        if seen[twin] != page: fails.append(f"{url}: twin {twin} has a different set {seen[twin]}")
print(f"{len(side)} sitemap URLs, {sum(1 for p in seen.values() if p)} with hreflang")
for f in fails: print("FAIL", f)
print("FAILS", len(fails))
