#!/usr/bin/env python3
"""
Imports Itzik's articles and growth guides (tbl-028) into the blog.

    python3 scripts/articles/import.py <tbl-028-dir>/articles

Each <slug>.he.md / <slug>.en.md (front matter: title, meta_title,
meta_description, category, reading_time, slug) becomes
content/articles/<slug>.mdx and content/articles/<slug>-en.mdx, on the article
template (uxb-020 v4 / uxb-023): a table becomes the template's table visual
(DataTable), a numbered list of bold-led steps its timeline (Timeline). The
closing "build my site" line links to the platform, like every other CTA.
"""
import glob
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
OUT = os.path.join(ROOT, "content/articles")
SRC = sys.argv[1]
PLATFORM = "https://ai.uxellent.com"
CTA = {"he": "בנו לי אתר בחינם", "en": "Build my site, free"}
DATE = "2026-10-20"
COVER = "/services/d-develop.webp"


def front(text):
    m = re.match(r"---\n(.*?)\n---\n", text, re.S)
    assert m, "no front matter"
    meta = {}
    for line in m.group(1).splitlines():
        k, v = line.split(":", 1)
        v = v.strip()
        meta[k.strip()] = json.loads(v) if v.startswith('"') else v
    return meta, text[m.end():]


def plain(s):
    return s.replace("**", "").strip()


def table(lines):
    rows = [[c.strip() for c in l.strip().strip("|").split("|")] for l in lines]
    assert set(rows[1][0]) <= set("-: "), rows[1]
    head, body = rows[0], rows[2:]
    assert all(len(r) == len(head) for r in body), head
    j = lambda v: json.dumps(v, ensure_ascii=False)
    return "<DataTable\n  head={" + j([plain(h) for h in head]) + "}\n  rows={[\n" + "".join(
        "    " + j([plain(c) for c in r]) + ",\n" for r in body) + "  ]}\n/>"


def steps(lines):
    out = []
    for l in lines:
        m = re.match(r"\d+\.\s+\*\*(.+?)\*\*\s*(.*)$", l)
        assert m, l
        out.append({"when": "", "title": m.group(1).rstrip(".").strip(), "text": m.group(2).strip()})
    return "<Timeline\n  steps={" + json.dumps(out, ensure_ascii=False, indent=2).replace("\n", "\n  ") + "}\n/>"


def body_mdx(body, lang):
    lines = body.strip("\n").split("\n")
    out, i, used = [], 0, set()
    while i < len(lines):
        l = lines[i]
        if l.startswith("|"):
            j = i
            while j < len(lines) and lines[j].startswith("|"):
                j += 1
            out.append(table(lines[i:j]))
            used.add("DataTable")
            i = j
            continue
        if re.match(r"\d+\.\s+\*\*", l):
            j = i
            while j < len(lines) and re.match(r"\d+\.\s+", lines[j]):
                j += 1
            out.append(steps(lines[i:j]))
            used.add("Timeline")
            i = j
            continue
        out.append(l)
        i += 1
    text = "\n".join(out).rstrip()
    # the closing line: its "build my site" phrase links to the platform
    last = text.rsplit("\n", 1)[-1]
    assert last.startswith("**") and last.endswith("**") and CTA[lang] in last, last
    cta = re.sub(r"\[([^\]]+)\]\([^)]*\)", r"\1", last)
    cta = cta.replace(CTA[lang], f"[{CTA[lang]}]({PLATFORM})", 1)
    text = text[: len(text) - len(last)] + cta
    assert "](/" not in text, "a relative link is left"
    assert not re.search(r"[{}<>]", re.sub(r"<(DataTable|Timeline)\b.*?/>", "", text, flags=re.S)), "MDX special characters in the text"
    imports = f'import {{ {", ".join(sorted(used))} }} from "@/app/_home/article/visuals";\n\n' if used else ""
    return imports + text + "\n"


def main():
    files = sorted(glob.glob(os.path.join(SRC, "*.md")))
    assert len(files) == 22, len(files)
    for f in files:
        slug, lang = os.path.basename(f)[:-3].rsplit(".", 1)
        meta, body = front(open(f, encoding="utf-8").read())
        assert meta["slug"] == slug, (meta["slug"], slug)
        fm = {
            "title": meta["title"],
            "description": meta["meta_description"],
            "metaTitle": meta["meta_title"],
            "readingTime": meta["reading_time"],
            "date": DATE,
            "coverImage": COVER,
            "category": meta["category"],
            "tags": [meta["category"]],
        }
        if lang == "en":
            fm["locale"] = "en"
        fm["slug"] = slug
        head = "".join(f"{k}: {v if k == 'date' else json.dumps(v, ensure_ascii=False)}\n" for k, v in fm.items())
        name = f"{slug}{'-en' if lang == 'en' else ''}.mdx"
        open(os.path.join(OUT, name), "w", encoding="utf-8").write(f"---\n{head}---\n\n" + body_mdx(body, lang))
        print(name)


main()
