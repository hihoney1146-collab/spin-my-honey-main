export function encodeProofPayload(winners: string[]): string {
  const payload = { w: winners, t: Date.now() };
  return btoa(JSON.stringify(payload))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export function decodeProofPayload(token: string): { w: string[]; t: number } | null {
  try {
    const padded = token.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(padded)) as { w: string[]; t: number };
  } catch {
    return null;
  }
}

export function buildProofUrl(path: string, winners: string[]): string {
  const origin =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://onlinespinwheel.fun";
  return `${origin}${path}?proof=${encodeProofPayload(winners)}`;
}
