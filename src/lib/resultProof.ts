export const RESULT_METHOD = "crypto-rng" as const;

export type ResultProofPayload = {
  /** Winner label(s) */
  w: string[];
  /** UTC timestamp (ms) */
  t: number;
  /** Active entry count at spin time */
  n: number;
  /** Source wheel slug */
  s: string;
  /** Randomness method */
  m: typeof RESULT_METHOD;
};

function toBase64Url(json: string): string {
  return btoa(json)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function fromBase64Url(token: string): string {
  const padded = token.replace(/-/g, "+").replace(/_/g, "/");
  const pad =
    padded.length % 4 === 0 ? padded : padded + "=".repeat(4 - (padded.length % 4));
  return atob(pad);
}

export function encodeResultId(payload: ResultProofPayload): string {
  return toBase64Url(JSON.stringify(payload));
}

export function decodeResultId(id: string): ResultProofPayload | null {
  try {
    const parsed = JSON.parse(fromBase64Url(id)) as ResultProofPayload;
    if (!parsed || !Array.isArray(parsed.w) || typeof parsed.t !== "number") {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function buildResultProofUrl(
  payload: Omit<ResultProofPayload, "m" | "t"> & { t?: number },
): string {
  const origin =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://onlinespinwheel.fun";
  const full: ResultProofPayload = {
    ...payload,
    t: payload.t ?? Date.now(),
    m: RESULT_METHOD,
  };
  return `${origin}/result/${encodeResultId(full)}`;
}

/** @deprecated Use buildResultProofUrl — kept for legacy ?proof= query links */
export function encodeProofPayload(winners: string[]): string {
  return encodeResultId({
    w: winners,
    t: Date.now(),
    n: winners.length,
    s: "legacy",
    m: RESULT_METHOD,
  });
}

/** @deprecated */
export function decodeProofPayload(
  token: string,
): { w: string[]; t: number } | null {
  const data = decodeResultId(token);
  if (!data) return null;
  return { w: data.w, t: data.t };
}

/** @deprecated */
export function buildProofUrl(path: string, winners: string[]): string {
  const origin =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://onlinespinwheel.fun";
  return `${origin}${path}?proof=${encodeProofPayload(winners)}`;
}
