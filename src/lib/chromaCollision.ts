import { parseHex } from "./contrastColor";

/** sRGB → CIELAB (D65) for delta-E distance checks. */
function hexToLab(hex: string): { l: number; a: number; b: number } {
  const { r, g, b } = parseHex(hex);
  let R = r / 255;
  let G = g / 255;
  let B = b / 255;

  R = R > 0.04045 ? ((R + 0.055) / 1.055) ** 2.4 : R / 12.92;
  G = G > 0.04045 ? ((G + 0.055) / 1.055) ** 2.4 : G / 12.92;
  B = B > 0.04045 ? ((B + 0.055) / 1.055) ** 2.4 : B / 12.92;

  let X = (R * 0.4124564 + G * 0.3575761 + B * 0.1804375) / 0.95047;
  let Y = R * 0.2126729 + G * 0.7151522 + B * 0.072175;
  let Z = (R * 0.0193339 + G * 0.119192 + B * 0.9503041) / 1.08883;

  const f = (t: number) =>
    t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116;

  const fx = f(X);
  const fy = f(Y);
  const fz = f(Z);

  return {
    l: 116 * fy - 16,
    a: 500 * (fx - fy),
    b: 200 * (fy - fz),
  };
}

/** CIE76 delta-E between two hex colors. */
export function deltaE76(hexA: string, hexB: string): number {
  const A = hexToLab(hexA);
  const B = hexToLab(hexB);
  return Math.hypot(A.l - B.l, A.a - B.a, A.b - B.b);
}

const COLLISION_THRESHOLD = 20;

/** True when chroma key is visually close to any wheel segment color. */
export function hasChromaSegmentCollision(
  chromaHex: string,
  segmentColors: string[],
): boolean {
  const unique = [...new Set(segmentColors.map((c) => c.toUpperCase()))];
  return unique.some((seg) => deltaE76(chromaHex, seg) < COLLISION_THRESHOLD);
}
