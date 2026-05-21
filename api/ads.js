/** Serves ads.txt at /ads.txt (rewrite in vercel.json) for reliable AdSense crawler access. */
const ADS_TXT_LINE =
  "google.com, pub-2823129698767735, DIRECT, f08c47fec0942fa0\n";

export default function handler(_req, res) {
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=86400");
  res.status(200).send(ADS_TXT_LINE);
}
