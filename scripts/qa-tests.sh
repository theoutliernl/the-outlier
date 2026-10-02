#!/usr/bin/env bash
# qa-tests: Q&A verificationsuite voor the-outlier — alle checks moeten groen
set -uo pipefail
BASE="${BASE:-https://theoutlier-site.vercel.app}"
PASS=0; FAIL=0

check() { # check <omschrijving> <verwacht> <werkelijk>
  if [ "$2" = "$3" ]; then echo "PASS: $1"; PASS=$((PASS+1)); else echo "FAIL: $1 (verwacht $2, kreeg $3)"; FAIL=$((FAIL+1)); fi
}
code() { curl -s -o /dev/null -w '%{http_code}' "$1"; }

echo "=== ROUTES ==="
for p in "" blog contact start services admin; do
  check "GET /$p = 200" "200" "$(code "$BASE/$p")"
done

echo "=== CONTENT ==="
check "homepage bevat payoff" "1" "$(curl -s "$BASE/" | grep -c 'CORPORATE' | head -1)"
check "homepage sticky-nav"   "1" "$(curl -s "$BASE/" | grep -c 'sticky-nav' | head -1)"
check "homepage progress-bar" "1" "$(curl -s "$BASE/" | grep -c 'progress-bar' | head -1)"
check "blog heeft posts of nette lege staat" "1" "$(curl -s "$BASE/blog" | grep -cE 'blog-grid|blog-empty' | head -1)"
check "assessment aanwezig op /start" "1" "$(curl -s "$BASE/start" | grep -cE 'assessment|friction' | head -1)"

echo "=== SEO ==="
check "sitemap.xml 200" "200" "$(code "$BASE/sitemap.xml")"
check "robots.txt 200" "200" "$(code "$BASE/robots.txt")"
check "robots disallowt /admin" "1" "$(curl -s "$BASE/robots.txt" | grep -c '/admin' | head -1)"
check "homepage heeft JSON-LD" "1" "$(curl -s "$BASE/" | grep -c 'application/ld+json' | head -1)"
check "canonical aanwezig" "1" "$(curl -s "$BASE/" | grep -c 'rel="canonical"' | head -1)"

echo "=== FORMULIEREN ==="
code_r=$(curl -s -X POST "$BASE/api/contact" -d "name=QA&email=qa@theoutlier.test&message=qa-loop" -o /dev/null -w '%{http_code}')
check "contact POST -> 303 redirect" "303" "$code_r"
code_a=$(curl -s -X POST "$BASE/api/assessment" -H "Content-Type: application/json" -d '{"bureau_type":"hr","bureau_size":"1-5","friction":["sales"],"tooling":"excel","ambition":["marges"],"name":"QA","email":"qa@theoutlier.test"}' | head -c 40 | grep -c '"ok":true')
check "assessment POST -> ok:true" "1" "$code_a"
check "newsletter POST -> 303" "303" "$(curl -s -X POST "$BASE/api/newsletter" -d "email=qa@theoutlier.test" -o /dev/null -w '%{http_code}')"

echo "=== CMS ==="
check "admin login-pagina" "200" "$(code "$BASE/admin")"

echo ""
echo "=== RESULTAAT: $PASS groen, $FAIL rood ==="
exit $FAIL
