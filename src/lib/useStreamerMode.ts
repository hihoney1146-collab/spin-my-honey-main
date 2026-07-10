import { useSearchParams } from "react-router-dom";
import {
  DEFAULT_STREAM_BG,
  normalizeStreamBg,
  parseStreamBgParam,
  streamBgToUrlParam,
} from "./streamerMode";

/** Streamer mode (?stream=1&bg=HEX) synced with React Router. */
export function useStreamerMode() {
  const [searchParams, setSearchParams] = useSearchParams();
  const streamerMode = searchParams.get("stream") === "1";
  const streamBg = parseStreamBgParam(searchParams.get("bg"));

  const setStreamerMode = (enabled: boolean) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (enabled) {
          next.set("stream", "1");
          if (!next.get("bg")) {
            next.set("bg", streamBgToUrlParam(DEFAULT_STREAM_BG));
          }
        } else {
          next.delete("stream");
          next.delete("bg");
        }
        return next;
      },
      { replace: true },
    );
  };

  const setStreamBg = (hex: string) => {
    const normalized = normalizeStreamBg(hex);
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.set("stream", "1");
        next.set("bg", streamBgToUrlParam(normalized));
        return next;
      },
      { replace: true },
    );
  };

  return { streamerMode, streamBg, setStreamerMode, setStreamBg };
}
