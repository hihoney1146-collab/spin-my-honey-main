import { describe, expect, it } from "vitest";
import { contrastForeground, contrastRatio } from "./contrastColor";

const TEST_BACKGROUNDS = [
  { name: "pure green", hex: "#00FF00" },
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
});
