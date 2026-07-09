import { useSearchParams } from "react-router-dom";

/** Streamer mode (?stream=1) synced with React Router (not raw replaceState). */
export function useStreamerMode() {
  const [searchParams, setSearchParams] = useSearchParams();
  const streamerMode = searchParams.get("stream") === "1";

  const setStreamerMode = (enabled: boolean) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (enabled) next.set("stream", "1");
        else next.delete("stream");
        return next;
      },
      { replace: true },
    );
  };

  return { streamerMode, setStreamerMode };
}
