#!/usr/bin/env bash
# qa-tests: verification suite for the-outlier. All checks must pass before a merge to main.
# Usage: bash scripts/qa-tests.sh [base-url]   (default: the review site)
# Form checks send x-qa-dry-run + a .test address: the routes store nothing and send no mail.
set -uo pipefail
BASE="${1:-${BASE:-https://theoutlier-site.vercel.app}}"
BASE="${BASE%/}"
QA_H="x-qa-dry-run: 1"
PASS=0; FAIL=0

check() { # check <description> <expected> <actual>
  if [ "$2" = "$3" ]; then echo "PASS: $1"; PASS=$((PASS+1)); else echo "FAIL: $1 (expected $2, got $3)"; FAIL=$((FAIL+1)); fi
}
code() { curl -s -o /dev/null -w '%{http_code}' "$1"; }
has() { [ "$(echo "$1" | grep -c -- "$2" | head -1)" -ge 1 ] && echo 1 || echo 0; }

PAGES="/ /services /start /about /team /projects /compare /blog /contact /privacy"

echo "=== ROUTES + SHELL (every page) ==="
for p in $PAGES; do
  html="$(curl -s "$BASE$p")"
  check "GET $p = 200" "200" "$(code "$BASE$p")"
  check "$p: header + main + footer" "1" "$( [ "$(has "$html" 'aria-label="Main"')$(has "$html" 'id="main"')$(has "$html" 'aria-label="Footer"')" = "111" ] && echo 1 || echo 0)"
  check "$p: logo THE beside OUTLIER" "1" "$(has "$html" 'wm-the')"
  check "$p: one h1" "1" "$(echo "$html" | grep -o '<h1' | wc -l | tr -d ' ')"
  check "$p: meta description" "1" "$(has "$html" '<meta name="description"')"
  check "$p: canonical" "1" "$(has "$html" 'rel="canonical"')"
done
check "GET /thank-you = 200" "200" "$(code "$BASE/thank-you")"
check "GET /admin = 200" "200" "$(code "$BASE/admin")"
check "legacy /bedankt redirects" "308" "$(code "$BASE/bedankt")"

echo "=== CONTENT ==="
home="$(curl -s "$BASE/")"
check "home: hero headline" "1" "$(has "$home" 'Corporate')"
check "home: Book a call drives the gold bar" "1" "$(has "$home" 'data-outlier-cta')"
check "home: WhatsApp widget" "1" "$(has "$home" 'Chat on WhatsApp')"
check "home: FAQPage schema" "1" "$(has "$home" 'FAQPage')"
check "start: assessment" "1" "$(has "$(curl -s "$BASE/start")" 'What kind of firm are you')"
check "blog: has articles" "1" "$(has "$(curl -s "$BASE/blog")" 'min read')"
check "no Dutch UI left on /contact" "0" "$(curl -s "$BASE/contact" | grep -ciE 'verstuur|bericht|naam' | head -1)"
check "no em-dash in home copy" "0" "$(echo "$home" | sed 's/<script.*<\/script>//g' | grep -c '—' | head -1)"

echo "=== SEO ==="
check "sitemap.xml 200" "200" "$(code "$BASE/sitemap.xml")"
check "sitemap lists /compare" "1" "$(has "$(curl -s "$BASE/sitemap.xml")" '/compare')"
check "robots.txt disallows /admin" "1" "$(has "$(curl -s "$BASE/robots.txt")" 'Disallow: /admin')"
check "logo-mark.png 200" "200" "$(code "$BASE/logo-mark.png")"

echo "=== FORMS (dry-run) ==="
check "contact POST -> 303" "303" "$(curl -s -X POST "$BASE/api/contact" -H "$QA_H" -d "name=QA&email=qa@theoutlier.test&message=qa" -o /dev/null -w '%{http_code}')"
check "contact POST json -> ok" "1" "$(has "$(curl -s -X POST "$BASE/api/contact" -H "$QA_H" -H 'Accept: application/json' -d "name=QA&email=qa@theoutlier.test&message=qa")" '"ok":true')"
check "assessment POST -> ok" "1" "$(has "$(curl -s -X POST "$BASE/api/assessment" -H "$QA_H" -H 'Content-Type: application/json' -d '{"firmType":"advisory","size":"50-100","friction":["proposals"],"hours":"5-10","tooling":"scattered","ambition":"margin","role":"partner","timing":"3m","name":"QA","email":"qa@theoutlier.test","company":"QA"}')" '"ok":true')"
check "newsletter POST -> 303" "303" "$(curl -s -X POST "$BASE/api/newsletter" -H "$QA_H" -d "email=qa@theoutlier.test" -o /dev/null -w '%{http_code}')"

echo ""
echo "=== RESULT: $PASS passed, $FAIL failed ==="
exit $FAIL
