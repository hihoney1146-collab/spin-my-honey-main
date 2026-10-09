import { base64UrlToUtf8, utf8ToBase64Url } from "./base64Url";
import { shuffle } from "./secureShuffle";

export type ExclusionParse = {
  /** Directed pairs "A→B" in both directions for every understood rule. */
  pairs: Set<string>;
  /** Lines that could not be turned into a rule (so the page can say so). */
  ignored: string[];
};

const ARROW_SPLIT = /\s*(?:→|->|=>|>)\s*/;
const DASHES = new Set(["-", "–", "—"]);

function resolveName(raw: string, byLower: Map<string, string>): string | null {
  return byLower.get(raw.trim().toLowerCase()) ?? null;
}

/**
 * Parse exclusion lines such as "Alex → Jordan", "Alex -> Jordan", "Alex > Jordan" or "Alex - Jordan".
 * Names are matched against the participant list (case-insensitive), so names that contain a hyphen,
 * such as "Mary-Jane", work. Every understood rule blocks both directions.
 */
export function parseExclusions(raw: string, names: string[]): ExclusionParse {
  const byLower = new Map<string, string>();
  for (const n of names) byLower.set(n.trim().toLowerCase(), n);
  const pairs = new Set<string>();
  const ignored: string[] = [];

  for (const line of raw.split(/\r?\n/)) {
    const text = line.trim();
    if (!text) continue;
    let a: string | null = null;
    let b: string | null = null;

    const arrowParts = text.split(ARROW_SPLIT);
    if (arrowParts.length === 2) {
      a = resolveName(arrowParts[0], byLower);
      b = resolveName(arrowParts[1], byLower);
    } else {
      for (let i = 0; i < text.length && (!a || !b); i++) {
        if (!DASHES.has(text[i])) continue;
        const left = resolveName(text.slice(0, i), byLower);
        const right = resolveName(text.slice(i + 1), byLower);
        if (left && right) {
          a = left;
          b = right;
        }
      }
    }

    if (a && b && a !== b) {
      pairs.add(`${a}→${b}`);
      pairs.add(`${b}→${a}`);
    } else {
      ignored.push(text);
    }
  }
  return { pairs, ignored };
}

/**
 * Random assignment: each person gives to exactly one other person, nobody gets themselves, and no
 * excluded pair appears. Uses an unbiased shuffle and tries again until a valid arrangement appears, so
 * every valid arrangement is equally likely. Returns null if none is found within `maxAttempts`
 * (that means "not found", not a proof that none exists).
 */
export function assignSecretSanta(
  names: string[],
  exclusions: Set<string>,
  options: { maxAttempts?: number; nextUint32?: () => number } = {},
): Map<string, string> | null {
  const n = names.length;
  if (n < 2) return null;
  const { maxAttempts = 5000, nextUint32 } = options;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const receivers = shuffle(names, nextUint32);
    const map = new Map<string, string>();
    let valid = true;
    for (let i = 0; i < n; i++) {
      const giver = names[i];
      const receiver = receivers[i];
      if (giver === receiver || exclusions.has(`${giver}→${receiver}`)) {
        valid = false;
        break;
      }
      map.set(giver, receiver);
    }
    if (valid) return map;
  }
  return null;
}

export function encodeRevealToken(giver: string, receiver: string): string {
  return utf8ToBase64Url(JSON.stringify({ g: giver, r: receiver }));
}

export function decodeRevealToken(token: string): { g: string; r: string } | null {
  try {
    const parsed = JSON.parse(base64UrlToUtf8(token)) as { g?: unknown; r?: unknown };
    if (typeof parsed.g === "string" && typeof parsed.r === "string") {
      return { g: parsed.g, r: parsed.r };
    }
    return null;
  } catch {
    return null;
  }
}
