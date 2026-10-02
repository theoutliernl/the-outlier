#!/usr/bin/env python3
"""Importeer artikelen naar Payload CMS via REST API (upsert op slug)."""
import sys, json, urllib.request, urllib.parse

BASE = "https://theoutlier-site.vercel.app"

token = urllib.request.urlopen(urllib.request.Request(
    f"{BASE}/api/users/login",
    data=json.dumps({"email": sys.argv[1], "password": sys.argv[2]}).encode(),
    headers={"Content-Type": "application/json"})).json()["token"]

for f in sys.argv[3:]:
    a = json.load(open(f))
    slug = a["slug"]
    # check of slug al bestaat
    q = urllib.parse.urlencode({"where[slug][equals]": slug})
    existing = urllib.request.urlopen(urllib.request.Request(
        f"{BASE}/api/posts?{q}", headers={"Authorization": f"JWT {token}"})).json()
    body = {
        "title": a["title"], "slug": slug, "excerpt": a.get("excerpt",""),
        "coverImage": a.get("coverImage"), "author": a.get("author"),
        "content": a["content"], "publishedAt": "2026-10-02T12:00:00.000Z",
        "_status": "published",
    }
    if existing.get("docs") and existing["docs"]:
        pid = existing["docs"][0]["id"]
        urllib.request.urlopen(urllib.request.Request(
            f"{BASE}/api/posts/{pid}", data=json.dumps(body).encode(),
            method="PATCH",
            headers={"Authorization": f"JWT {token}", "Content-Type": "application/json"}))
        print(f"updated: {slug} (id={pid})")
    else:
        resp = urllib.request.urlopen(urllib.request.Request(
            f"{BASE}/api/posts", data=json.dumps(body).encode(),
            method="POST",
            headers={"Authorization": f"JWT {token}", "Content-Type": "application/json"}))
        doc = resp.json().get("doc", {})
        print(f"created: {slug} (id={doc.get('id')})")