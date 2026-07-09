export const STREAMER_GREEN = "#00FF00";

export function isStreamerModeFromSearch(search: string): boolean {
  return new URLSearchParams(search).get("stream") === "1";
}

export function setStreamerModeInUrl(enabled: boolean): void {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  if (enabled) params.set("stream", "1");
  else params.delete("stream");
  const qs = params.toString();
  const next = `${window.location.pathname}${qs ? `?${qs}` : ""}${window.location.hash}`;
  window.history.replaceState(null, "", next);
}
