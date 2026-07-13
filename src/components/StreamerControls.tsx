import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Copy } from "lucide-react";
import { CHROMA_PRESETS } from "@/lib/streamerMode";
import { hasChromaSegmentCollision } from "@/lib/chromaCollision";

type StreamerControlsProps = {
  streamerMode: boolean;
  onStreamerModeChange: (enabled: boolean) => void;
  streamBg: string;
  onStreamBgChange: (hex: string) => void;
  onCopyLink?: () => void;
  shareEnabled?: boolean;
  segmentColors?: string[];
};

export function StreamerControls({
  streamerMode,
  onStreamerModeChange,
  streamBg,
  onStreamBgChange,
  onCopyLink,
  shareEnabled = true,
  segmentColors = [],
}: StreamerControlsProps) {
  const collision =
    streamerMode &&
    segmentColors.length > 0 &&
    hasChromaSegmentCollision(streamBg, segmentColors);

  const streamControlStyle = streamerMode
    ? ({
        color: "var(--stream-fg)",
        borderColor: "var(--stream-fg)",
        backgroundColor: "transparent",
      } as const)
    : undefined;

  return (
    <div className="relative z-20 w-full max-w-[660px] mx-auto flex flex-col gap-3 mb-1">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <label
          htmlFor="streamer-mode"
          className="flex items-center gap-2 cursor-pointer rounded-md py-1 pr-2 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
          style={streamerMode ? { color: "var(--stream-fg)" } : undefined}
        >
          <Switch
            id="streamer-mode"
            checked={streamerMode}
            onCheckedChange={onStreamerModeChange}
            aria-label="Streamer mode (chroma key background)"
          />
          <span className="text-sm font-medium select-none">
            Streamer mode (chroma key)
          </span>
        </label>
        {shareEnabled && onCopyLink ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onCopyLink}
            className={
              streamerMode
                ? "gap-2 border-2 !bg-transparent hover:!bg-transparent hover:!opacity-90 shadow-none !text-[color:var(--stream-fg)] !border-[color:var(--stream-fg)] hover:!text-[color:var(--stream-fg)] [&_svg]:!text-[color:var(--stream-fg)]"
                : "gap-2"
            }
            style={streamControlStyle}
          >
            <Copy className="h-3.5 w-3.5" aria-hidden="true" />
            Copy link
          </Button>
        ) : null}
      </div>

      {streamerMode ? (
        <div
          className="flex flex-wrap items-center gap-3 text-sm"
          style={{ color: "var(--stream-fg)" }}
          data-testid="stream-chroma-controls"
        >
          <label htmlFor="stream-chroma-color" className="font-medium shrink-0">
            Chroma color
          </label>
          <input
            id="stream-chroma-color"
            type="color"
            value={streamBg}
            onChange={(e) => onStreamBgChange(e.target.value)}
            className="h-9 w-12 cursor-pointer rounded border bg-transparent p-0.5"
            style={{ borderColor: "var(--stream-fg)" }}
            aria-label="Chroma key background color"
          />
          <div className="flex items-center gap-2" role="group" aria-label="Chroma presets">
            {CHROMA_PRESETS.map((preset) => (
              <button
                key={preset.hex}
                type="button"
                title={preset.label}
                aria-label={`${preset.label} chroma preset`}
                aria-pressed={streamBg.toUpperCase() === preset.hex.toUpperCase()}
                onClick={() => onStreamBgChange(preset.hex)}
                className="h-8 w-8 rounded-md border-2 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{
                  backgroundColor: preset.hex,
                  borderColor: "var(--stream-fg)",
                }}
              />
            ))}
          </div>
        </div>
      ) : null}

      {collision ? (
        <p
          role="alert"
          className="text-xs leading-relaxed max-w-[660px]"
          style={{ color: "var(--stream-fg)" }}
          data-testid="chroma-collision-warning"
        >
          This color is close to one of your wheel&apos;s segment colors and may cause that
          segment to disappear on a green/blue screen. Consider a different color.
        </p>
      ) : null}
    </div>
  );
}
