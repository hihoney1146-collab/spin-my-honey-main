import { cryptoRandom } from "@/lib/cryptoRandom";

export type CoinSideIndex = 0 | 1;

/** Roughly 1 in 6000 — honest edge-landing rate for FAQ copy. */
export const COIN_EDGE_PROBABILITY = 1 / 6000;

export type CoinFlipOutcome =
  | { kind: "side"; sideIndex: CoinSideIndex }
  | { kind: "edge" };

declare global {
  interface Window {
    /** Playwright / test hook — forces the next flip to land on edge. */
    __COIN_FLIP_FORCE_EDGE__?: boolean;
  }
}

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

/**
 * Decide outcome before animation. Edge is independent of weighted odds.
 * Edge results must not increment tallies or affect weighting stats.
 */
export function pickFlipOutcome(
  side0Percent = 50,
  random: () => number = cryptoRandom,
): CoinFlipOutcome {
  if (typeof window !== "undefined" && window.__COIN_FLIP_FORCE_EDGE__) {
    window.__COIN_FLIP_FORCE_EDGE__ = false;
    return { kind: "edge" };
  }
  if (random() < COIN_EDGE_PROBABILITY) {
    return { kind: "edge" };
  }
  const p = Math.min(100, Math.max(0, side0Percent)) / 100;
  return { kind: "side", sideIndex: random() < p ? 0 : 1 };
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

export type FlipPhysics = {
  targetDeg: number;
  durationMs: number;
  tiltDeg: number;
  wobbleDeg: number;
  edgeZDeg: number;
};

/** Visual-only physics — never changes the pre-selected side. */
export function computeFlipPhysics(
  currentDeg: number,
  sideIndex: CoinSideIndex,
  random: () => number = cryptoRandom,
): FlipPhysics {
  const minSpins = 4 + Math.floor(random() * 3);
  const extraSpins = Math.floor(random() * 2);
  const fullRotations = (minSpins + extraSpins) * 360;
  const sideAngle = sideIndex === 0 ? 0 : 180;
  let target =
    Math.floor(currentDeg / 360) * 360 + fullRotations + sideAngle;
  if (target <= currentDeg) {
    target += 360;
  }
  return {
    targetDeg: target,
    durationMs: 1400 + Math.floor(random() * 900),
    tiltDeg: 6 + Math.round(random() * 12),
    wobbleDeg: 2 + random() * 5,
    edgeZDeg: Math.round(random() * 360),
  };
}

export type EdgePhysics = {
  durationMs: number;
  edgeZDeg: number;
  wobbleDeg: number;
};

export function computeEdgePhysics(
  random: () => number = cryptoRandom,
): EdgePhysics {
  return {
    durationMs: 1600 + Math.floor(random() * 600),
    edgeZDeg: Math.round(random() * 360),
    wobbleDeg: 3 + random() * 4,
  };
}

/** Target rotateY (deg) for a natural decelerating flip landing on sideIndex. */
export function computeFlipRotation(
  currentDeg: number,
  sideIndex: CoinSideIndex,
): number {
  return computeFlipPhysics(currentDeg, sideIndex).targetDeg;
}

export function normalizedSideRotation(sideIndex: CoinSideIndex): number {
  return sideIndex === 0 ? 0 : 180;
}

/** Match toss: caller wins if the landed side matches their call. */
export function resolveTossWinner(
  callerSideIndex: CoinSideIndex,
  callSideIndex: CoinSideIndex,
  landedSideIndex: CoinSideIndex,
  labels: [string, string],
): string {
  const callerWins = callSideIndex === landedSideIndex;
  return callerWins ? labels[callerSideIndex] : labels[callerSideIndex === 0 ? 1 : 0];
}
