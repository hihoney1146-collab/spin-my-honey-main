/** Parse #RGB or #RRGGBB into sRGB channels 0–255. */
export function parseHex(hex: string): { r: number; g: number; b: number } {
  let h = hex.trim().replace(/^#/, "");
  if (h.length === 3) {
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  }
  if (!/^[0-9a-fA-F]{6}$/.test(h)) {
    return { r: 0, g: 255, b: 0 };
  }
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

function linearizeChannel(channel: number): number {
  const s = channel / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

/** WCAG 2.x relative luminance for sRGB. */
export function relativeLuminance(hex: string): number {
  const { r, g, b } = parseHex(hex);
  const R = linearizeChannel(r);
  const G = linearizeChannel(g);
  const B = linearizeChannel(b);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

/** WCAG contrast ratio between two hex colors (always >= 1). */
export function contrastRatio(fgHex: string, bgHex: string): number {
  const L1 = relativeLuminance(fgHex);
  const L2 = relativeLuminance(bgHex);
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  return (lighter + 0.05) / (darker + 0.05);
}

/** Pick #000000 or #FFFFFF — whichever contrasts more with the background. */
export function contrastForeground(bgHex: string): "#000000" | "#FFFFFF" {
  const onBlack = contrastRatio("#000000", bgHex);
  const onWhite = contrastRatio("#FFFFFF", bgHex);
  return onWhite >= onBlack ? "#FFFFFF" : "#000000";
}
