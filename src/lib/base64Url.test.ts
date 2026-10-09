import { describe, expect, it } from "vitest";
import { base64UrlToUtf8, utf8ToBase64Url } from "./base64Url";

const samples: Record<string, string> = {
  latin: "Alex|Jordan|Sam",
  accented: "Zoë|René|José",
  urdu: "علی|زوئی|احمد",
  arabic: "محمد|فاطمة",
  chinese: "王芳|李明|张伟",
  emoji: "Sam 🎉|Alex 🎁|Jo",
  long: Array.from({ length: 120 }, (_, i) => "نام" + i).join("|"),
  empty: "",
};

describe("utf8ToBase64Url / base64UrlToUtf8", () => {
  for (const [name, text] of Object.entries(samples)) {
    it(`round-trips ${name}`, () => {
      const token = utf8ToBase64Url(text);
      expect(token).toMatch(/^[A-Za-z0-9_-]*$/);
      expect(base64UrlToUtf8(token)).toBe(text);
    });
  }

  it("matches the old encoder for ASCII text", () => {
    const old = btoa("Alex|Jordan").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    expect(utf8ToBase64Url("Alex|Jordan")).toBe(old);
  });

  it("still reads tokens written by the old Latin-1 encoder", () => {
    const legacy = btoa("Zoë|René").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    expect(base64UrlToUtf8(legacy)).toBe("Zoë|René");
  });

  it("throws on tokens that are not base64", () => {
    expect(() => base64UrlToUtf8("%%%not base64%%%")).toThrow();
  });
});
