# python3 lang-redirects.py <base> [bypass] — 050: first visit by the browser's language (redirect rules)
import sys, urllib.request, urllib.error
B = sys.argv[1]; BY = sys.argv[2] if len(sys.argv) > 2 else None
class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *a, **k): return None
op = urllib.request.build_opener(NoRedirect)
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36"
def go(path, al=None, ua=UA, cookie=None, country=None):
    h = {"user-agent": ua}
    if al: h["accept-language"] = al
    if cookie: h["cookie"] = cookie
    if BY: h["x-vercel-protection-bypass"] = BY
    try: r = op.open(urllib.request.Request(B + path, headers=h), timeout=60)
    except urllib.error.HTTPError as e: r = e
    sc = r.headers.get_all("set-cookie") or []
    return r.status, r.headers.get("location"), r.headers.get("vary"), [c.split(";")[0] for c in sc], r.headers.get("cache-control")
rows = []; bad = 0
def row(name, want, got_ok, got):
    global bad
    bad += 0 if got_ok else 1
    rows.append(f"{'OK  ' if got_ok else 'FAIL'} | {name} | {want} | {got}")
def loc(l): return (l or "").replace("https://uxellent.com", "").replace(B, "")
s, l, v, c, cc = go("/", "en-US,en;q=0.9"); row("en-US, no cookie, /", "302 → /en", s == 302 and loc(l) == "/en" and "lang_pref=en" in c and "Accept-Language" in (v or "") and "Cookie" in (v or ""), f"{s} → {loc(l)} · {c} · Vary: {v} · {cc}")
s, l, v, c, cc = go("/pricing?x=1", "en-US,en;q=0.9"); row("en-US, no cookie, /pricing?x=1", "302 → /en/pricing?x=1", s == 302 and loc(l) == "/en/pricing?x=1", f"{s} → {loc(l)}")
s, l, v, c, cc = go("/blog/automation", "fr-FR,fr;q=0.9,en;q=0.8"); row("fr-FR, no cookie, /blog/automation", "302 → /en/blog/automation", s == 302 and loc(l) == "/en/blog/automation", f"{s} → {loc(l)}")
s, l, v, c, cc = go("/", "en-US,he;q=1"); row("en-US + he;q=1 (he wins on q? equal q, order → en)", "302 → /en", s == 302, f"{s} → {loc(l)}")
s, l, v, c, cc = go("/", "he;q=0.5,en;q=0.9"); row("he;q=0.5,en;q=0.9", "302 → /en (en has the higher q)", s == 302, f"{s} → {loc(l)}")
s, l, v, c, cc = go("/pricing", "fr-FR,fr;q=0.9,he;q=0.8,en;q=0.7"); row("051: fr-FR then he (fr not on the site)", "200 Hebrew (he is the first one the site has)", s == 200 and not l, f"{s} {c}")
s, l, v, c, cc = go("/pricing", "de-DE,de;q=0.9"); row("051: de-DE only (none on the site)", "302 → /en/pricing (default)", s == 302 and loc(l) == "/en/pricing", f"{s} → {loc(l)}")
s, l, v, c, cc = go("/", "he-IL,he;q=0.9,en-US;q=0.8"); row("he-IL, no cookie, /", "200 Hebrew, lang_pref=he", s == 200 and "lang_pref=he" in c, f"{s} · {c}")
s, l, v, c, cc = go("/", "iw"); row("iw, no cookie, /", "200 Hebrew", s == 200, f"{s} · {c}")
for p in ("/", "/pricing", "/en", "/en/pricing"):
    s, l, v, c, cc = go(p); row(f"no Accept-Language, {p}", "200, no redirect", s == 200 and not l, f"{s}")
for ua in ("Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)", "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.2; +https://openai.com/gptbot)", "Mozilla/5.0 (compatible; ClaudeBot/1.0; +claudebot@anthropic.com)", "Mozilla/5.0 (compatible; PerplexityBot/1.0)", "Mozilla/5.0 (compatible; bingbot/2.0)"):
    for p in ("/", "/en"):
        s, l, v, c, cc = go(p, "en-US", ua=ua); row(f"{ua.split('compatible; ')[-1].split('/')[0] if 'compatible' in ua else ua[:20]} + en-US, {p}", "200, no redirect", s == 200 and not l and not c, f"{s} {c}")
s, l, v, c, cc = go("/en/pricing", "he-IL"); row("he-IL, /en/pricing", "200 English, no redirect", s == 200 and not l, f"{s}")
s, l, v, c, cc = go("/en/pricing", "he-IL", cookie="lang_pref=he"); row("lang_pref=he, /en/pricing", "200, no redirect", s == 200 and not l, f"{s}")
s, l, v, c, cc = go("/pricing", "en-US", cookie="lang_pref=he"); row("en-US + lang_pref=he (chose עברית), /pricing", "200 Hebrew", s == 200 and not l, f"{s}")
s, l, v, c, cc = go("/pricing", "he-IL", cookie="lang_pref=en"); row("he-IL + lang_pref=en, /pricing", "302 → /en/pricing", s == 302 and loc(l) == "/en/pricing", f"{s} → {loc(l)}")
s, l, v, c, cc = go("/seo-ai", "en-US"); row("en-US, a Hebrew page with no English twin (/seo-ai)", "no redirect", s != 302, f"{s}")
print("\n".join(rows)); print("FAILS", bad)
