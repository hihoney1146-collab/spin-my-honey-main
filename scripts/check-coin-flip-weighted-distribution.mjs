#!/usr/bin/env node
/**
 * Weighted distribution check — must match src/lib/coinFlip.ts pickWeightedCoinSide.
 */

function cryptoRandom() {
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  return buf[0] / 2 ** 32;
}

function pickWeightedCoinSide(side0Percent) {
  const p = Math.min(100, Math.max(0, side0Percent)) / 100;
  return cryptoRandom() < p ? 0 : 1;
}

const TARGET = 70;
const N = 1000;
let side0 = 0;

for (let i = 0; i < N; i++) {
  if (pickWeightedCoinSide(TARGET) === 0) side0++;
}

const ratio0 = side0 / N;
const min = 0.65;
const max = 0.75;

if (ratio0 < min || ratio0 > max) {
  console.error(
    `Weighted coin flip FAIL at ${TARGET}%: side 0 = ${side0}/${N} (${(ratio0 * 100).toFixed(2)}%), expected ~70% ±5%`,
  );
  process.exit(1);
}

console.log(
  `Weighted coin flip PASS at ${TARGET}%: side 0 = ${side0}/${N} (${(ratio0 * 100).toFixed(2)}%)`,
);
