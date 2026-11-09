# python3 smoke.py [base] — production smoke (since 044)
import re, urllib.request, urllib.error
import sys
B = sys.argv[1] if len(sys.argv) > 1 else "https://uxellent.com"
class NoRedir(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *a): return None
op = urllib.request.build_opener(NoRedir)
def st(u, h=None):
    try:
        r = op.open(urllib.request.Request(u, headers={"user-agent": "Mozilla/5.0 smoke044", **(h or {})}), timeout=60); return r.status, r.headers.get("location"), r.read().decode("utf-8", "replace")
    except urllib.error.HTTPError as e: return e.code, e.headers.get("location"), ""
fails = []
def ok(c, m): print(("OK  " if c else "FAIL") + " " + m); c or fails.append(m)
code, _, sm = st(B + "/sitemap.xml"); urls = re.findall(r"<loc>(.*?)</loc>", sm)
ok(code == 200 and len(urls) > 40 and all(u.startswith(B) for u in urls), f"sitemap.xml {code}, {len(urls)} URLs on uxellent.com")
bad = [(u, s) for u in urls for s, _, _ in [st(u)] if s != 200]; ok(not bad, f"every sitemap URL 200 {bad[:5]}")
for p in ["/nope-404", "/en/nope-404", "/blog/nope"]: ok(st(B + p)[0] == 404, f"{p} 404")
c, _, rb = st(B + "/robots.txt"); ok(c == 200 and "Sitemap: https://uxellent.com/sitemap.xml" in rb, "robots.txt")
c, _, ll = st(B + "/llms.txt"); ok(c == 200 and "Daily backup and restore, 30 days back" in ll and "7 days" not in ll and "Growth" not in ll, "llms.txt (30 days back, no Growth)")
for p in ["/design", "/seo-ai", "/new-home"]:
    s, loc, _ = st(B + p); ok(s == 301 and loc, f"{p} {s} → {loc}")
s, loc, _ = st("https://www.uxellent.com/pricing"); ok(s == 308 and loc == B + "/pricing", f"www → {s} {loc}")
# 050: lang_pref=en sends Hebrew pages to English (302); /en is never redirected
for p in ["/", "/pricing"]: ok(st(B + p, {"cookie": "lang_pref=en", "accept-language": "en-US"})[0] == 302, f"{p} with lang_pref=en: 302 to English")
for p in ["/en", "/en/pricing"]: ok(st(B + p, {"cookie": "lang_pref=he", "accept-language": "he-IL"})[0] == 200, f"{p} with lang_pref=he: 200, no redirect")
def vis(h):
    h = re.sub(r"<(script|style)\b.*?</\1>", " ", h, flags=re.S); h = re.sub(r"<!--.*?-->", " ", h, flags=re.S); return " ".join(re.sub(r"<[^>]+>", " ", h).split())
for lang in ["he", "en"]:
    pre = "" if lang == "he" else "/en"
    for p in ["", "/features"]:
        _, _, h = st(B + (pre + p or "/")); t = vis(h)
        mw = [w for w in (["רשימת תפוצה", "לקוחות חדשים, גם כשאתם עסוקים"] if lang == "he" else ["mailing list", "New clients, even when"]) if w in t]
        ok(not mw and "{{" not in t, f"{lang} {pre + p or '/'}: MAILING_LIVE parts off {mw}")
print("FAILS:", len(fails))
