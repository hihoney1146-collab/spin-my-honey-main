const MAX_SHARE_ENTRIES = 120;
const MAX_ENCODED_LEN = 1800;

import { parseStreamBgParam, streamBgToUrlParam } from "./streamerMode";

export type WheelShareState = {
  entries: string[];
  duration?: number;
  stream?: boolean;
  streamBg?: string;
};

function toBase64Url(text: string): string {
  return btoa(text)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function fromBase64Url(token: string): string {
  const padded = token.replace(/-/g, "+").replace(/_/g, "/");
  const pad =
    padded.length % 4 === 0 ? padded : padded + "=".repeat(4 - (padded.length % 4));
  return atob(pad);
}

/** Encode wheel labels into a compact share token (pipe-separated, base64url). */
export function encodeWheelEntries(entries: string[]): string | null {
  const labels = entries
    .map((e) => e.trim())
    .filter(Boolean)
    .slice(0, MAX_SHARE_ENTRIES);
  if (labels.length === 0) return null;
  const raw = labels.join("|");
  const encoded = toBase64Url(raw);
  if (encoded.length > MAX_ENCODED_LEN) return null;
  return encoded;
}

export function decodeWheelEntries(token: string): string[] | null {
  try {
    const raw = fromBase64Url(token);
    const labels = raw
      .split("|")
      .map((s) => s.trim())
      .filter(Boolean);
    return labels.length > 0 ? labels.slice(0, MAX_SHARE_ENTRIES) : null;
  } catch {
    return null;
  }
}

export function buildWheelShareUrl(
  pathname: string,
  state: WheelShareState,
): string | null {
  const origin =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://onlinespinwheel.fun";
  const e = encodeWheelEntries(state.entries);
  if (!e) return null;
  const params = new URLSearchParams();
  params.set("e", e);
  if (state.duration != null && state.duration !== 8) {
    params.set("d", String(state.duration));
  }
  if (state.stream) {
    params.set("stream", "1");
    if (state.streamBg) {
      params.set("bg", streamBgToUrlParam(state.streamBg));
    }
  }
  return `${origin}${pathname}?${params.toString()}`;
}

export function parseWheelShareParams(
  search: string,
): WheelShareState | null {
  const params = new URLSearchParams(search);
  const e = params.get("e");
  if (!e) return null;
  const entries = decodeWheelEntries(e);
  if (!entries) return null;
  const durationRaw = params.get("d");
  const duration = durationRaw ? Number(durationRaw) : undefined;
  const stream = params.get("stream") === "1";
  const streamBg = stream ? parseStreamBgParam(params.get("bg")) : undefined;
  return {
    entries,
    duration: Number.isFinite(duration) ? duration : undefined,
    stream,
    streamBg,
  };
}

export function applyShareParamsToUrl(
  pathname: string,
  state: WheelShareState,
): void {
  if (typeof window === "undefined") return;
  const url = buildWheelShareUrl(pathname, state);
  if (!url) return;
  const next = `${url}${window.location.hash}`;
  window.history.replaceState(null, "", next);
}
