export const STREAMER_GREEN = "#00FF00";
export const DEFAULT_STREAM_BG = STREAMER_GREEN;

export const CHROMA_PRESETS = [
  { label: "Green", hex: "#00FF00" },
  { label: "Blue", hex: "#0047FF" },
  { label: "Magenta", hex: "#FF00FF" },
] as const;

export function normalizeStreamBg(input: string): string {
  let h = input.trim().replace(/^#/, "");
  if (h.length === 3) {
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  }
  if (!/^[0-9a-fA-F]{6}$/.test(h)) {
    return DEFAULT_STREAM_BG;
  }
  return `#${h.toUpperCase()}`;
}

export function parseStreamBgParam(param: string | null | undefined): string {
  if (!param) return DEFAULT_STREAM_BG;
  return normalizeStreamBg(param);
}

/** URL-safe bg token without # (e.g. 00FF00). */
export function streamBgToUrlParam(hex: string): string {
  return normalizeStreamBg(hex).replace(/^#/, "");
}

export function isStreamerModeFromSearch(search: string): boolean {
  return new URLSearchParams(search).get("stream") === "1";
}
