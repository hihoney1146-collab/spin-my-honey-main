import { describe, expect, it } from "vitest";
import { balancedTeams, randomInt, shuffle } from "./secureShuffle";

describe("randomInt", () => {
  it("rejects the biased tail instead of using it", () => {
    const sequence = [0xffffffff, 4];
    expect(randomInt(3, () => sequence.shift() as number)).toBe(1);
    expect(sequence.length).toBe(0);
  });

  it("accepts the full 2^32 range and rejects bad ranges", () => {
    expect(randomInt(2 ** 32, () => 0xffffffff)).toBe(0xffffffff);
    for (const bad of [0, -1, 1.5, 2 ** 32 + 1, Number.NaN]) {
      expect(() => randomInt(bad)).toThrow(RangeError);
    }
  });

  it("rejects a source that is not a uint32", () => {
    expect(() => randomInt(3, () => -1)).toThrow(RangeError);
    expect(() => randomInt(3, () => 1.5)).toThrow(RangeError);
  });

  it("stays in range with the real source", () => {
    for (let i = 0; i < 2000; i++) {
      const v = randomInt(7);
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(7);
    }
  });
});

describe("shuffle", () => {
  it("reaches all 6 orders of three items, each through exactly one path", () => {
    const seen = new Map<string, number>();
    for (let a = 0; a < 3; a++) {
      for (let b = 0; b < 2; b++) {
        const values = [a, b];
        const out = shuffle(["a", "b", "c"], () => values.shift() as number).join("");
        seen.set(out, (seen.get(out) ?? 0) + 1);
      }
    }
    expect(seen.size).toBe(6);
    expect([...seen.values()].every((n) => n === 1)).toBe(true);
  });

  it("keeps every item exactly once and does not change the input", () => {
    const input = ["x", "y", "z", "x", "w"];
    const copy = [...input];
    const out = shuffle(input);
    expect(input).toEqual(copy);
    expect([...out].sort()).toEqual([...input].sort());
  });

  it("handles empty and single item lists", () => {
    expect(shuffle([])).toEqual([]);
    expect(shuffle(["only"])).toEqual(["only"]);
  });
});

describe("balancedTeams", () => {
  it("splits 7 people into 3 teams of 3, 2 and 2 without losing anyone", () => {
    const people = ["a", "b", "c", "d", "e", "f", "g"];
    const teams = balancedTeams(people, 3);
    expect(teams.map((t) => t.length).sort()).toEqual([2, 2, 3]);
    expect(teams.flat().sort()).toEqual([...people].sort());
  });

  it("rejects impossible team counts", () => {
    expect(() => balancedTeams(["a", "b"], 3)).toThrow(RangeError);
    expect(() => balancedTeams(["a", "b"], 0)).toThrow(RangeError);
  });
});
