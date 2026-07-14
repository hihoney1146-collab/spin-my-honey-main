/**
 * Run 100,000 simulated wheel spins (equal slices) and export CSV + JSON summary.
 * Mirrors getCurrentSegment() + crypto.getRandomValues() landing angle.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { randomInt } from "node:crypto";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outCsv = path.join(root, "public", "downloads", "spin-wheel-fairness-study-100k.csv");
const outJson = path.join(root, "src", "generated", "fairnessStudy.json");

const TOTAL_SPINS = 100_000;
const SEGMENT_COUNTS = [2, 3, 4, 6, 8, 10, 12, 16, 20, 36];
const SPINS_PER_CONFIG = TOTAL_SPINS / SEGMENT_COUNTS.length;

/** χ² critical values at α = 0.05 (common df). */
const CHI2_CRIT_05 = {
  1: 3.841,
  2: 5.991,
  3: 7.815,
  4: 9.488,
  5: 11.07,
  7: 14.067,
  9: 16.919,
  11: 19.675,
  15: 25.0,
  19: 30.144,
  35: 49.998,
};

function cryptoFloat() {
  return randomInt(0, 2 ** 32) / 2 ** 32;
}

/** Same geometry as SpinWheel.getCurrentSegment for equal slices. */
function pickSegment(segmentCount) {
  const sliceAngle = 360 / segmentCount;
  const rot = (cryptoFloat() * 360) % 360;
  return Math.floor((((360 - rot) % 360) + 360) % 360 / sliceAngle) % segmentCount;
}

function chiSquare(observed, expected) {
  let chi2 = 0;
  for (let i = 0; i < observed.length; i++) {
    const diff = observed[i] - expected;
    chi2 += (diff * diff) / expected;
  }
  return chi2;
}

function critical05(df) {
  if (CHI2_CRIT_05[df] != null) return CHI2_CRIT_05[df];
  // Rough upper bound for large df (Wilson-Hilferty not needed, table covers our range).
  return df + 1.645 * Math.sqrt(2 * df);
}

const csvLines = [
  "segment_count,segment_index,observed,expected,deviation_pct,total_spins_config,chi_square,df,critical_05,uniform_pass",
];
const summaries = [];

for (const k of SEGMENT_COUNTS) {
  const counts = Array(k).fill(0);
  for (let i = 0; i < SPINS_PER_CONFIG; i++) {
    counts[pickSegment(k)]++;
  }
  const expected = SPINS_PER_CONFIG / k;
  const chi2 = chiSquare(counts, expected);
  const df = k - 1;
  const crit = critical05(df);
  const pass = chi2 <= crit;

  summaries.push({
    segmentCount: k,
    totalSpins: SPINS_PER_CONFIG,
    chiSquare: Number(chi2.toFixed(4)),
    degreesOfFreedom: df,
    critical05: Number(crit.toFixed(3)),
    uniformPass: pass,
    maxDeviationPct: Number(
      (
        (Math.max(...counts.map((c) => Math.abs(c - expected))) / expected) *
        100
      ).toFixed(3),
    ),
    distribution: counts.map((obs, idx) => ({
      segmentIndex: idx,
      observed: obs,
      expected: Number(expected.toFixed(2)),
      deviationPct: Number((((obs - expected) / expected) * 100).toFixed(3)),
    })),
  });

  for (let idx = 0; idx < k; idx++) {
    const obs = counts[idx];
    const dev = (((obs - expected) / expected) * 100).toFixed(3);
    csvLines.push(
      `${k},${idx},${obs},${expected.toFixed(2)},${dev},${SPINS_PER_CONFIG},${chi2.toFixed(4)},${df},${crit.toFixed(3)},${pass ? "yes" : "no"}`,
    );
  }
}

fs.mkdirSync(path.dirname(outCsv), { recursive: true });
fs.mkdirSync(path.dirname(outJson), { recursive: true });
fs.writeFileSync(outCsv, csvLines.join("\n") + "\n", "utf8");

const payload = {
  generatedAt: new Date().toISOString().slice(0, 10),
  totalSpins: TOTAL_SPINS,
  spinsPerConfig: SPINS_PER_CONFIG,
  method: "crypto.getRandomValues (Node crypto.randomInt) landing angle → getCurrentSegment geometry",
  segmentCounts: SEGMENT_COUNTS,
  summaries,
  csvUrl: "/downloads/spin-wheel-fairness-study-100k.csv",
};

fs.writeFileSync(outJson, JSON.stringify(payload, null, 2), "utf8");
console.log(`✅ Fairness study: ${TOTAL_SPINS.toLocaleString()} spins → ${path.relative(root, outCsv)}`);
console.log(`✅ Summary JSON → ${path.relative(root, outJson)}`);
