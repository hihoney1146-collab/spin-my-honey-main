#!/usr/bin/env node
/**
 * Distribution sanity check for pickCoinSide() — must match src/lib/coinFlip.ts.
 */

function cryptoRandom() {
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  return buf[0] / 2 ** 32;
}

function pickCoinSide() {
  return cryptoRandom() < 0.5 ? 0 : 1;
}

const N = 10_000;
let side0 = 0;
let side1 = 0;

for (let i = 0; i < N; i++) {
  if (pickCoinSide() === 0) side0++;
  else side1++;
}

const ratio0 = side0 / N;
const min = 0.47;
const max = 0.53;

if (ratio0 < min || ratio0 > max) {
  console.error(
    `Coin flip distribution FAIL: side 0 = ${side0}/${N} (${(ratio0 * 100).toFixed(2)}%), expected ~50% ±3%`,
  );
  process.exit(1);
}

console.log(
  `Coin flip distribution PASS: side 0 = ${side0}, side 1 = ${side1} (${(ratio0 * 100).toFixed(2)}% / ${((1 - ratio0) * 100).toFixed(2)}%) over ${N} flips`,
);
