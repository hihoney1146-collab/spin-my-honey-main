/** Uniform float in [0, 1) using crypto.getRandomValues (falls back to Math.random). */
export function cryptoRandom(): number {
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    const buf = new Uint32Array(1);
    crypto.getRandomValues(buf);
    return buf[0] / 2 ** 32;
  }
  return Math.random();
}
