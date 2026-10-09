/**
 * URL-safe base64 for text that may contain any Unicode (Urdu, Arabic, Chinese, emoji, accents).
 *
 * `btoa(text)` throws on any character outside Latin-1, so links built that way crashed for most
 * non-English names. Here the text is turned into UTF-8 bytes first.
 *
 * Tokens created by the old Latin-1 encoder are still readable: for ASCII text the two formats are
 * identical, and for Latin-1 text (for example "Zoë") the bytes are not valid UTF-8, so decoding
 * falls back to Latin-1.
 */

function bytesToBinary(bytes: Uint8Array): string {
  let out = "";
  for (let i = 0; i < bytes.length; i += 0x8000) {
    out += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  return out;
}

export function utf8ToBase64Url(text: string): string {
  const bytes = new TextEncoder().encode(text);
  return btoa(bytesToBinary(bytes))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export function base64UrlToUtf8(token: string): string {
  const padded = token.replace(/-/g, "+").replace(/_/g, "/");
  const pad =
    padded.length % 4 === 0 ? padded : padded + "=".repeat(4 - (padded.length % 4));
  const binary = atob(pad);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    // Legacy token written with the old Latin-1 encoder.
    return binary;
  }
}
