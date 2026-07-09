/**
 * Decode /result/<id> proof tokens at build time (mirrors src/lib/resultProof.ts).
 * @param {string} id
 */
export function decodeResultId(id) {
  try {
    const padded = id.replace(/-/g, "+").replace(/_/g, "/");
    const pad =
      padded.length % 4 === 0 ? padded : padded + "=".repeat(4 - (padded.length % 4));
    const parsed = JSON.parse(Buffer.from(pad, "base64").toString("utf8"));
    if (!parsed || !Array.isArray(parsed.w) || typeof parsed.t !== "number") {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}
