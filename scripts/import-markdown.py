#!/usr/bin/env python3
"""
Import Markdown articles into Payload (posts) as Lexical rich text.

Usage:
  PAYLOAD_ADMIN_EMAIL=... PAYLOAD_ADMIN_PASSWORD=... \
  python3 scripts/import-markdown.py --base https://theoutlier-site.vercel.app --status draft content/articles/*.md

- Frontmatter keys: title, slug, excerpt, coverImage (other keys are ignored).
- Comparison articles must have a slug starting with "vs-" (they then appear under /compare).
- Upserts by slug: an existing post with the same slug is updated, otherwise created.
- --status draft (default) or published. Comparisons stay draft until Fariza approves them.
- Supported Markdown: #/##/### headings, paragraphs, - and 1. lists, > quotes, --- rules,
  **bold**, *italic*, [links](url), and | tables | (converted to a list, Payload has no table node).
- A leading H1 is dropped (the title is rendered by the page).
"""
import argparse, json, os, re, sys, urllib.request, urllib.parse

def text(t, fmt=0):
    return {"type": "text", "version": 1, "text": t, "format": fmt, "detail": 0, "mode": "normal", "style": ""}

def block(kind, children, **extra):
    node = {"type": kind, "version": 1, "direction": "ltr", "format": "", "indent": 0, "children": children}
    node.update(extra)
    return node

INLINE = re.compile(r"\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*|_([^_]+)_")

def inline(s, fmt=0):
    out, pos = [], 0
    for m in INLINE.finditer(s):
        if m.start() > pos:
            out.append(text(s[pos:m.start()], fmt))
        if m.group(1) is not None:
            url = m.group(2)
            ext = url.startswith("http")
            out.append(block("link", inline(m.group(1), fmt), version=3, fields={"url": url, "newTab": ext, "linkType": "custom"}))
        elif m.group(3) is not None:
            out.extend(inline(m.group(3), fmt | 1))
        else:
            out.extend(inline(m.group(4) or m.group(5), fmt | 2))
        pos = m.end()
    if pos < len(s):
        out.append(text(s[pos:], fmt))
    return out or [text("")]

def parse(md):
    lines = md.split("\n")
    nodes, i, first = [], 0, True
    while i < len(lines):
        ln = lines[i].rstrip()
        if not ln.strip():
            i += 1; continue
        h = re.match(r"^(#{1,4})\s+(.*)", ln)
        if h:
            level = len(h.group(1))
            if level == 1 and first:
                i += 1; first = False; continue
            tag = "h2" if level <= 2 else ("h3" if level == 3 else "h4")
            nodes.append(block("heading", inline(h.group(2).strip()), tag=tag))
        elif re.match(r"^(-{3,}|\*{3,})$", ln.strip()):
            nodes.append({"type": "horizontalrule", "version": 1})
        elif ln.lstrip().startswith(">"):
            buf = []
            while i < len(lines) and lines[i].lstrip().startswith(">"):
                buf.append(lines[i].lstrip()[1:].strip()); i += 1
            nodes.append(block("quote", inline(" ".join(buf)))); first = False; continue
        elif ln.lstrip().startswith("|"):
            rows = []
            while i < len(lines) and lines[i].lstrip().startswith("|"):
                cells = [c.strip() for c in lines[i].strip().strip("|").split("|")]
                if not all(re.match(r"^:?-{2,}:?$", c) for c in cells):
                    rows.append(cells)
                i += 1
            header, body = rows[0], rows[1:]
            items = []
            for n, r in enumerate(body, 1):
                parts = [f"**{r[0]}**"] + [f"{header[k]}: {r[k]}" for k in range(1, min(len(r), len(header)))]
                items.append(block("listitem", inline(" · ".join(parts)), value=n))
            nodes.append(block("list", items, listType="bullet", tag="ul", start=1)); first = False; continue
        elif re.match(r"^\s*([-*]|\d+\.)\s+", ln):
            ordered = bool(re.match(r"^\s*\d+\.", ln))
            items, n = [], 1
            while i < len(lines) and re.match(r"^\s*([-*]|\d+\.)\s+", lines[i]):
                items.append(block("listitem", inline(re.sub(r"^\s*([-*]|\d+\.)\s+", "", lines[i]).strip()), value=n)); n += 1; i += 1
            nodes.append(block("list", items, listType="number" if ordered else "bullet", tag="ol" if ordered else "ul", start=1)); first = False; continue
        else:
            buf = []
            while i < len(lines) and lines[i].strip() and not re.match(r"^(#{1,4}\s|>|\||\s*([-*]|\d+\.)\s+|-{3,}$)", lines[i]):
                buf.append(lines[i].strip()); i += 1
            nodes.append(block("paragraph", inline(" ".join(buf)), textFormat=0)); first = False; continue
        first = False
        i += 1
    return {"root": {"type": "root", "version": 1, "direction": "ltr", "format": "", "indent": 0, "children": nodes}}

def frontmatter(raw):
    m = re.match(r"^---\n(.*?)\n---\n(.*)$", raw, re.S)
    if not m:
        sys.exit("missing frontmatter")
    meta = {}
    for line in m.group(1).split("\n"):
        if ":" in line:
            k, v = line.split(":", 1)
            meta[k.strip()] = v.strip().strip('"')
    return meta, m.group(2)

def api(base, method, path, token=None, body=None):
    req = urllib.request.Request(base + path, method=method, data=json.dumps(body).encode() if body is not None else None,
                                 headers={"Content-Type": "application/json", **({"Authorization": f"JWT {token}"} if token else {})})
    return json.load(urllib.request.urlopen(req))

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--base", default=os.environ.get("BASE", "https://theoutlier-site.vercel.app"))
    ap.add_argument("--status", choices=["draft", "published"], default="draft")
    ap.add_argument("--date", default=None, help="publishedAt ISO date, default now")
    ap.add_argument("files", nargs="+")
    a = ap.parse_args()
    token = api(a.base, "POST", "/api/users/login", body={"email": os.environ["PAYLOAD_ADMIN_EMAIL"], "password": os.environ["PAYLOAD_ADMIN_PASSWORD"]})["token"]
    author = api(a.base, "GET", "/api/users/me", token)["user"]["id"]
    for f in a.files:
        meta, md = frontmatter(open(f, encoding="utf-8").read())
        slug = meta["slug"]
        doc = {"title": meta["title"], "slug": slug, "excerpt": meta.get("excerpt", ""), "coverImage": meta.get("coverImage"),
               "author": author, "content": parse(md), "_status": a.status}
        if a.date or a.status == "published":
            doc["publishedAt"] = a.date or __import__("datetime").datetime.now(__import__("datetime").timezone.utc).strftime("%Y-%m-%dT%H:%M:%S.000Z")
        q = urllib.parse.urlencode({"where[slug][equals]": slug, "draft": "true", "depth": 0})
        existing = api(a.base, "GET", f"/api/posts?{q}", token).get("docs", [])
        draft = "?draft=true" if a.status == "draft" else ""
        if existing:
            api(a.base, "PATCH", f"/api/posts/{existing[0]['id']}{draft}", token, doc); print(f"updated  {slug}  ({a.status})")
        else:
            api(a.base, "POST", f"/api/posts{draft}", token, doc); print(f"created  {slug}  ({a.status})")

if __name__ == "__main__":
    main()
