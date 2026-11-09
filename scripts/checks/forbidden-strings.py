# python3 forbidden-strings.py <base> [bypass] — 046: strings that must not reach the browser, on every sitemap page and every JS chunk it loads
import re, sys, urllib.request
BASE = sys.argv[1]; BY = sys.argv[2] if len(sys.argv) > 2 else None
def get(u):
    if u.startswith("/"): u = BASE + u
    r = urllib.request.Request(u, headers={"user-agent": "Mozilla/5.0 f044", **({"x-vercel-protection-bypass": BY} if BY else {})})
    return urllib.request.urlopen(r, timeout=60).read().decode("utf-8", "replace")
BAD = ["7 ימים אחורה", "7 days back", "שנשמר 7", "kept for 7", "7 ימים אחרי", "7 days after", "7 ימים אחריה", "7 days later", "עד 7 ימים", "Up to 7 days", "גיבוי יומי וטופס", "daily backup and a lead form", "גיבויים יומיים כלולים", "daily backups are included"]
# what is not the old pricing list: the blog's "Growth guides" category, the law's 14 days to cancel a deal, and $50 (Pro's price)
ALLOW = []
sm = get("/sitemap.xml"); urls = [re.sub(r"^https://uxellent\.com", "", u) or "/" for u in re.findall(r"<loc>(.*?)</loc>", sm)]
hits, chunks = {}, set()
for u in urls:
    h = get(u)
    chunks |= set(re.findall(r'(/_next/static/[^"\']+\.js)', h))
    t = h
    for a in ALLOW: t = re.sub(a, "", t)
    for w in BAD:
        for m in re.finditer(re.escape(w), t):
            hits.setdefault((u, w), " ".join(re.sub(r"<[^>]+>", " ", t[max(0, m.start()-60):m.end()+40]).split()))
for ch in sorted(chunks):
    t = get(ch)
    for a in ALLOW: t = re.sub(a, "", t)
    for w in BAD:
        i = t.find(w)
        if i >= 0: hits.setdefault((ch, w), t[max(0, i-60):i+40])
print(f"{len(urls)} pages, {len(chunks)} JS chunks")
for (u, w), ctx in sorted(hits.items()): print("FOUND", w, "@", u, "|", ctx)
print("FOUND:", len(hits))
