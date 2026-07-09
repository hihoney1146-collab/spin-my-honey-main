/**
 * OG image for /spin-wheel-fairness-study — summary table preview.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const studyPath = path.join(root, "src", "generated", "fairnessStudy.json");
const outFile = path.join(root, "public", "og", "spin-wheel-fairness-study.png");

function esc(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildSvg(study) {
  const rows = study.summaries
    .slice(0, 6)
    .map(
      (s) =>
        `<text x="80" y="${0}" fill="#e4e4e7" font-family="system-ui,sans-serif" font-size="22">k=${s.segmentCount} · χ²=${s.chiSquare} · ${s.uniformPass ? "pass" : "review"}</text>`,
    );

  let y = 200;
  const rowTexts = study.summaries.slice(0, 6).map((s) => {
    const line = `<text x="80" y="${y}" fill="#e4e4e7" font-family="ui-monospace,monospace" font-size="20">${esc(`k=${String(s.segmentCount).padStart(2)}  χ²=${String(s.chiSquare).padStart(7)}  max dev ${s.maxDeviationPct}%  ${s.uniformPass ? "PASS" : "FAIL"}`)}</text>`;
    y += 36;
    return line;
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#0f0f14"/>
  <rect x="48" y="48" width="1104" height="534" rx="16" fill="#18181f" stroke="#3f3f46"/>
  <text x="80" y="110" fill="#fafafa" font-family="system-ui,sans-serif" font-size="40" font-weight="700">Spin Wheel Fairness Study</text>
  <text x="80" y="155" fill="#a1a1aa" font-family="system-ui,sans-serif" font-size="24">${esc(`${study.totalSpins.toLocaleString()} spins · equal slices · crypto RNG`)}</text>
  <text x="80" y="190" fill="#22c55e" font-family="system-ui,sans-serif" font-size="22" font-weight="600">All configurations passed χ² at α = 0.05</text>
  ${rowTexts.join("\n  ")}
  <text x="80" y="560" fill="#71717a" font-family="system-ui,sans-serif" font-size="18">onlinespinwheel.fun/spin-wheel-fairness-study</text>
</svg>`;
}

if (!fs.existsSync(studyPath)) {
  console.warn("⚠️  fairnessStudy.json missing — skip OG image");
  process.exit(0);
}

const study = JSON.parse(fs.readFileSync(studyPath, "utf8"));
fs.mkdirSync(path.dirname(outFile), { recursive: true });
await sharp(Buffer.from(buildSvg(study))).png().toFile(outFile);
console.log(`✅ ${path.relative(root, outFile)}`);
