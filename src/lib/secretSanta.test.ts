import { describe, expect, it } from "vitest";
import {
  assignSecretSanta,
  decodeRevealToken,
  encodeRevealToken,
  parseExclusions,
} from "./secretSanta";

const names = ["Alex", "Jordan", "Sam", "Mary-Jane", "علی"];

describe("parseExclusions", () => {
  it("understands the arrow shown on the page and common alternatives", () => {
    const raw = "Alex → Jordan\nSam -> Alex\nJordan => Sam\nAlex > Mary-Jane";
    const { pairs, ignored } = parseExclusions(raw, names);
    expect(ignored).toEqual([]);
    for (const p of ["Alex→Jordan", "Jordan→Alex", "Sam→Alex", "Alex→Sam", "Jordan→Sam", "Sam→Jordan", "Alex→Mary-Jane", "Mary-Jane→Alex"]) {
      expect(pairs.has(p)).toBe(true);
    }
  });

  it("keeps names that contain a hyphen", () => {
    const { pairs, ignored } = parseExclusions("Mary-Jane - Sam\nMary-Jane → Jordan\nAlex-Sam", names);
    expect(ignored).toEqual([]);
    expect(pairs.has("Mary-Jane→Sam")).toBe(true);
    expect(pairs.has("Mary-Jane→Jordan")).toBe(true);
    expect(pairs.has("Alex→Sam")).toBe(true);
  });

  it("matches names case-insensitively and supports Urdu names", () => {
    const { pairs } = parseExclusions("alex → علی", names);
    expect(pairs.has("Alex→علی")).toBe(true);
  });

  it("reports lines it cannot use instead of dropping them silently", () => {
    const { pairs, ignored } = parseExclusions("Alex → Nobody\njust some words\nAlex → Alex", names);
    expect(pairs.size).toBe(0);
    expect(ignored.length).toBe(3);
  });
});

describe("assignSecretSanta", () => {
  it("gives everyone exactly one recipient, never themselves, never an excluded person", () => {
    const { pairs } = parseExclusions("Alex → Jordan\nSam → Mary-Jane", names);
    for (let i = 0; i < 300; i++) {
      const result = assignSecretSanta(names, pairs);
      expect(result).not.toBeNull();
      const map = result as Map<string, string>;
      expect(new Set(map.values()).size).toBe(names.length);
      for (const [giver, receiver] of map) {
        expect(giver).not.toBe(receiver);
        expect(pairs.has(`${giver}→${receiver}`)).toBe(false);
      }
    }
  });

  it("returns null when no arrangement exists", () => {
    const { pairs } = parseExclusions("Alex → Jordan", ["Alex", "Jordan"]);
    expect(assignSecretSanta(["Alex", "Jordan"], pairs, { maxAttempts: 50 })).toBeNull();
  });

  it("is uniform over valid arrangements for three people (enumerated, not sampled)", () => {
    const people = ["a", "b", "c"];
    const counts = new Map<string, number>();
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 2; y++) {
        const values = [x, y];
        // First attempt uses the enumerated draw; any later attempt must not happen for these two derangements.
        const gen = () => (values.length ? (values.shift() as number) : 0);
        const result = assignSecretSanta(people, new Set(), { maxAttempts: 1, nextUint32: gen });
        if (result) {
          const key = [...result.entries()].map(([g, r]) => `${g}${r}`).join(",");
          counts.set(key, (counts.get(key) ?? 0) + 1);
        }
      }
    }
    expect(counts.size).toBe(2);
    expect([...counts.values()]).toEqual([1, 1]);
  });
});

describe("reveal tokens", () => {
  it("round-trips Latin, Urdu, Chinese and emoji names", () => {
    const cases: [string, string][] = [
      ["Alex", "Jordan"],
      ["علی", "زوئی"],
      ["王芳", "李明"],
      ["Sam 🎉", "Jo"],
    ];
    for (const [g, r] of cases) {
      expect(decodeRevealToken(encodeRevealToken(g, r))).toEqual({ g, r });
    }
  });

  it("returns null for junk", () => {
    expect(decodeRevealToken("???")).toBeNull();
    expect(decodeRevealToken("e30")).toBeNull();
  });
});
