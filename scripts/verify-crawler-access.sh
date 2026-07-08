#!/usr/bin/env bash
#
# Phase 0.2 — Crawler-access verification.
#
# Simulates the major search/ads/AI crawlers hitting critical URLs and prints the
# HTTP status for each. Every line MUST be 200. Any 403 / 429 / 503 means
# Cloudflare bot protection is still blocking that crawler — see
# docs/CLOUDFLARE_SEO.md and fix before considering Phase 0 complete.
#
# Usage:
#   bash scripts/verify-crawler-access.sh
#   ORIGIN=https://staging.example.com bash scripts/verify-crawler-access.sh
#
set -u

ORIGIN="${ORIGIN:-https://onlinespinwheel.fun}"

USER_AGENTS=(
  "Googlebot/2.1 (+http://www.google.com/bot.html)"
  "Mediapartners-Google"
  "AdsBot-Google"
  "Bingbot"
  "GPTBot"
  "ClaudeBot"
  "PerplexityBot"
)

PATHS=(
  "/"
  "/ads.txt"
  "/sitemap.xml"
  "/robots.txt"
  "/llms.txt"
  "/about-us"
  "/yes-or-no-wheel"
)

fail=0
echo "Crawler-access check against ${ORIGIN}"
echo "-----------------------------------------------------------------"

for UA in "${USER_AGENTS[@]}"; do
  for PATHX in "${PATHS[@]}"; do
    code=$(curl -s -o /dev/null -w "%{http_code}" -A "$UA" "${ORIGIN}${PATHX}")
    flag=""
    if [ "$code" != "200" ]; then
      flag="   <-- NOT 200"
      fail=1
    fi
    printf '%-45s %-16s -> %s%s\n' "$UA" "$PATHX" "$code" "$flag"
  done
  echo "-----------------------------------------------------------------"
done

if [ "$fail" -ne 0 ]; then
  echo "FAIL: at least one request did not return 200. Phase 0 is NOT complete."
  exit 1
fi

echo "PASS: every crawler received 200 on every path."
