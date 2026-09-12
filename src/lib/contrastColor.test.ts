import { describe, expect, it } from "vitest";
import {
  contrastForeground,
  contrastRatio,
  readableOnSurface,
} from "./contrastColor";

const TEST_BACKGROUNDS = [
  { name: "pure green", hex: "#00FF00" },
  { name: "wheel green", hex: "#2ecc71" },
  { name: "light pink", hex: "#FFC0CB" },
  { name: "wheel pink", hex: "#e91e63" },
  { name: "pure blue", hex: "#0047FF" },
  { name: "pure magenta", hex: "#FF00FF" },
  { name: "black", hex: "#000000" },
  { name: "white", hex: "#FFFFFF" },
  { name: "mid gray", hex: "#808080" },
  { name: "pastel", hex: "#FFDAB9" },
  { name: "dark navy", hex: "#001F3F" },
] as const;

describe("contrastColor", () => {
  for (const { name, hex } of TEST_BACKGROUNDS) {
    it(`picks a foreground with contrast >= 4.5 on ${name}`, () => {
      const fg = contrastForeground(hex);
      expect(contrastRatio(fg, hex)).toBeGreaterThanOrEqual(4.5);
    });
  }

  it("returns black on pure green (higher WCAG contrast than white)", () => {
    expect(contrastForeground("#00FF00")).toBe("#000000");
  });

  it("returns black on white", () => {
    expect(contrastForeground("#FFFFFF")).toBe("#000000");
  });

  it("returns black on wheel green and light pink", () => {
    expect(contrastForeground("#2ecc71")).toBe("#000000");
    expect(contrastForeground("#FFC0CB")).toBe("#000000");
  });

  it("falls back when an accent is too light on a white surface", () => {
    expect(readableOnSurface("#2ecc71", "#ffffff")).toBe("#000000");
    expect(readableOnSurface("#FFC0CB", "#ffffff")).toBe("#000000");
  });

  it("keeps a dark accent on a light surface", () => {
    expect(readableOnSurface("#001F3F", "#ffffff")).toBe("#001F3F");
  });
});
