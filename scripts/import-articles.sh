#!/usr/bin/env bash
# Import articles into Payload CMS
set -euo pipefail
cd /workspace/outlier-site
set -a; source /root/.hermes/env.d/tokens.env; set +a

EMAIL="$PAYLOAD_ADMIN_EMAIL"
PASSWORD="$PAYLOAD_ADMIN_PASSWORD"

python3 <<PY
import json, urllib.request
BASE = "https://theoutlier-site.vercel.app"
EMAIL = "$EMAIL"
PASSWORD = "$PASSWORD"

token = json.loads(urllib.request.urlopen(urllib.request.Request(
    f"{BASE}/api/users/login",
    data=json.dumps({"email": EMAIL, "password": PASSWORD}).encode(),
    headers={"Content-Type": "application/json"})).read())["token"]

for f in "content/articles/mac-vs-pc-big-firms.json", "content/articles/pilot-to-production.json":
    a = json.load(open(f))
    slug = a["slug"]

    # check of slug al bestaat (API-query)
    existing = json.loads(urllib.request.urlopen(urllib.request.Request(
        f"{BASE}/api/posts?where%5Bslug%5D%5Bequals%5D={slug}",
        headers={"Authorization": f"JWT {token}"})).read())

    body = json.dumps({
        "title": a["title"], "slug": slug, "excerpt": a.get("excerpt", ""),
        "coverImage": a.get("coverImage"), "author": a.get("author"),
        "content": a["content"], "publishedAt": "2026-10-02T12:00:00.000Z",
        "_status": "published",
    }).encode()

    if existing.get("docs") and existing["docs"]:
        pid = existing["docs"][0]["id"]
        urllib.request.urlopen(urllib.request.Request(
            f"{BASE}/api/posts/{pid}", data=body, method="PATCH",
            headers={"Authorization": f"JWT {token}", "Content-Type": "application/json"}))
        print(f"updated: {slug}")
    else:
        resp = json.loads(urllib.request.urlopen(urllib.request.Request(
            f"{BASE}/api/posts", data=body, method="POST",
            headers={"Authorization": f"JWT {token}", "Content-Type": "application/json"})).read())
        print(f"created: {slug} (id={resp.get('doc',{}).get('id')})")
PY