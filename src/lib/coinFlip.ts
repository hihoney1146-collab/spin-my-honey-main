import { cryptoRandom } from "@/lib/cryptoRandom";

export type CoinSideIndex = 0 | 1;

/** Fair 50/50 side using crypto.getRandomValues (via cryptoRandom). */
export function pickCoinSide(): CoinSideIndex {
  return cryptoRandom() < 0.5 ? 0 : 1;
}

export function pickCoinSides(count: number): CoinSideIndex[] {
  return Array.from({ length: count }, () => pickCoinSide());
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
