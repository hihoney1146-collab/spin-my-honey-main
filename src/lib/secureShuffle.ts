/**
 * Unbiased random integers and shuffles.
 *
 * `array.sort(() => random)` is not a uniform shuffle (a random comparator breaks the sort contract),
 * and `value % n` is very slightly uneven. This module uses rejection sampling and Fisher-Yates.
 *
 * The random source is the browser's `crypto.getRandomValues`. Like `cryptoRandom`, it falls back to
 * `Math.random` only when `crypto` is missing; the algorithm stays unbiased either way.
 */

const UINT32_RANGE = 2 ** 32;

export function secureUint32(): number {
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    return crypto.getRandomValues(new Uint32Array(1))[0];
  }
  return Math.floor(Math.random() * UINT32_RANGE);
}

/** Uniform integer in [0, maxExclusive). `nextUint32` can be injected for tests. */
export function randomInt(
  maxExclusive: number,
  nextUint32: () => number = secureUint32,
): number {
  if (!Number.isSafeInteger(maxExclusive) || maxExclusive < 1 || maxExclusive > UINT32_RANGE) {
    throw new RangeError("maxExclusive must be an integer from 1 to 2^32.");
  }
  const limit = UINT32_RANGE - (UINT32_RANGE % maxExclusive);
  for (let attempt = 0; attempt < 128; attempt++) {
    const value = nextUint32();
    if (!Number.isInteger(value) || value < 0 || value >= UINT32_RANGE) {
      throw new RangeError("Random source did not return a uint32.");
    }
    if (value < limit) return value % maxExclusive;
  }
  throw new Error("Random source repeatedly returned rejected values.");
}

/** Fisher-Yates shuffle. Returns a new array and leaves the input untouched. */
export function shuffle<T>(
  items: readonly T[],
  nextUint32: () => number = secureUint32,
): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = randomInt(i + 1, nextUint32);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/** Split into `teamCount` teams whose sizes differ by at most one. */
export function balancedTeams<T>(
  participants: readonly T[],
  teamCount: number,
  nextUint32: () => number = secureUint32,
): T[][] {
  if (!Number.isInteger(teamCount) || teamCount < 1 || teamCount > participants.length) {
    throw new RangeError("Choose between 1 team and one team per participant.");
  }
  const teams: T[][] = Array.from({ length: teamCount }, () => []);
  shuffle(participants, nextUint32).forEach((p, i) => teams[i % teamCount].push(p));
  return teams;
}
