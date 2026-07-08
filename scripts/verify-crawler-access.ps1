<#
  Phase 0.2 - Crawler-access verification (PowerShell / Windows equivalent of
  verify-crawler-access.sh).

  Simulates the major search/ads/AI crawlers hitting critical URLs and prints the
  HTTP status for each. Every line MUST be 200. Any 403 / 429 / 503 means
  Cloudflare bot protection is still blocking that crawler - see
  docs/CLOUDFLARE_SEO.md.

  Usage:
    pwsh scripts/verify-crawler-access.ps1
    $env:ORIGIN="https://staging.example.com"; pwsh scripts/verify-crawler-access.ps1
#>

$Origin = if ($env:ORIGIN) { $env:ORIGIN } else { "https://onlinespinwheel.fun" }

$UserAgents = @(
  "Googlebot/2.1 (+http://www.google.com/bot.html)",
  "Mediapartners-Google",
  "AdsBot-Google",
  "Bingbot",
  "GPTBot",
  "ClaudeBot",
  "PerplexityBot"
)

$Paths = @("/", "/ads.txt", "/sitemap.xml", "/robots.txt", "/llms.txt", "/about-us", "/yes-or-no-wheel")

$fail = $false
Write-Host "Crawler-access check against $Origin"
Write-Host "-----------------------------------------------------------------"

foreach ($ua in $UserAgents) {
  foreach ($p in $Paths) {
    $url = "$Origin$p"
    try {
      $resp = Invoke-WebRequest -Uri $url -UserAgent $ua -MaximumRedirection 0 -SkipHttpErrorCheck -TimeoutSec 20
      $code = $resp.StatusCode
    } catch {
      $code = if ($_.Exception.Response) { [int]$_.Exception.Response.StatusCode } else { "ERR" }
    }
    $flag = ""
    if ("$code" -ne "200") { $flag = "   <-- NOT 200"; $fail = $true }
    "{0,-45} {1,-16} -> {2}{3}" -f $ua, $p, $code, $flag | Write-Host
  }
  Write-Host "-----------------------------------------------------------------"
}

if ($fail) {
  Write-Host "FAIL: at least one request did not return 200. Phase 0 is NOT complete."
  exit 1
}
Write-Host "PASS: every crawler received 200 on every path."
