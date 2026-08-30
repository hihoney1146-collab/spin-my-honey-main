import { cryptoRandom } from "@/lib/cryptoRandom";

export type CoinSideIndex = 0 | 1;

/** Side 0 win probability in percent (0–100). Uses cryptoRandom(). */
export function pickWeightedCoinSide(side0Percent: number): CoinSideIndex {
  const p = Math.min(100, Math.max(0, side0Percent)) / 100;
  return cryptoRandom() < p ? 0 : 1;
}

/** Fair 50/50 side using crypto.getRandomValues (via cryptoRandom). */
export function pickCoinSide(side0Percent = 50): CoinSideIndex {
  return pickWeightedCoinSide(side0Percent);
}

export function pickCoinSides(
  count: number,
  side0Percent = 50,
): CoinSideIndex[] {
  return Array.from({ length: count }, () => pickCoinSide(side0Percent));
}

export function formatOddsText(
  side0Percent: number,
  label0: string,
  label1: string,
): string {
  const p0 = Math.round(Math.min(100, Math.max(0, side0Percent)));
  const p1 = 100 - p0;
  return `${p0}% ${label0} / ${p1}% ${label1}`;
}

/** Target rotateY (deg) for a natural decelerating flip landing on sideIndex. */
export function computeFlipRotation(
  currentDeg: number,
  sideIndex: CoinSideIndex,
): number {
  const minSpins = 4;
  const extraSpins = Math.floor(cryptoRandom() * 2);
  const fullRotations = (minSpins + extraSpins) * 360;
  const sideAngle = sideIndex === 0 ? 0 : 180;
  let target =
    Math.floor(currentDeg / 360) * 360 + fullRotations + sideAngle;
  if (target <= currentDeg) {
    target += 360;
  }
  return target;
}

export function normalizedSideRotation(sideIndex: CoinSideIndex): number {
  return sideIndex === 0 ? 0 : 180;
}
