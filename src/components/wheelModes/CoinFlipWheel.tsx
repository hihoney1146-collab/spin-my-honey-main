import { useCallback, useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Coins, Download, RotateCcw } from "lucide-react";
import {
  computeFlipRotation,
  formatOddsText,
  normalizedSideRotation,
  pickCoinSide,
  pickCoinSides,
  type CoinSideIndex,
} from "@/lib/coinFlip";
import { cryptoRandom } from "@/lib/cryptoRandom";
import {
  COIN_FACE_PRESETS,
  getCoinFacePreset,
  type CoinFacePresetId,
} from "@/lib/coinFlipPresets";
import {
  processCoinFaceFile,
  revokeCoinFaceUrl,
} from "@/lib/coinFaceImage";
import { downloadCoinFlipResultPng } from "@/lib/coinFlipResultExport";
import { CoinFlipProofActions } from "./CoinFlipProofActions";
import { toast } from "sonner";

type CoinFlipWheelProps = {
  presetOptionLabels?: string[];
};

const FLIP_MS = 1800;
const MULTI_FLIP_MS = 900;
const MAX_MULTI = 50;
const MAX_QUESTION = 120;

type FlipSnapshot = {
  sideIndex: CoinSideIndex;
  timestampMs: number;
  question: string;
  labels: [string, string];
  side0Percent: number;
};

function defaultLabels(preset?: string[]): [string, string] {
  if (preset?.length >= 2) {
    return [preset[0], preset[1]];
  }
  return ["Heads", "Tails"];
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}

function CoinFaceContent({
  label,
  imageUrl,
  presetClass,
  glyph,
}: {
  label: string;
  imageUrl: string | null;
  presetClass: string;
  glyph?: string;
}) {
  return (
    <>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt=""
          className="absolute inset-0 h-full w-full rounded-full object-cover"
          draggable={false}
        />
      ) : null}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center rounded-full border-4 border-amber-500/80 px-3 text-center shadow-lg ${presetClass} ${imageUrl ? "bg-black/20" : ""}`}
      >
        {glyph && !imageUrl ? (
          <span className="text-4xl md:text-5xl leading-none mb-1" aria-hidden>
            {glyph}
          </span>
        ) : null}
        <span className="relative z-10 text-sm md:text-base font-bold drop-shadow-sm">
          {label}
        </span>
      </div>
    </>
  );
}

export function CoinFlipWheel({ presetOptionLabels }: CoinFlipWheelProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const coinRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(0);
  const lastSideIndexRef = useRef<CoinSideIndex | null>(null);
  const streakRef = useRef(0);

  const [presetId, setPresetId] = useState<CoinFacePresetId>("classic");
  const [sideLabels, setSideLabels] = useState<[string, string]>(() =>
    defaultLabels(presetOptionLabels),
  );
  const [faceImages, setFaceImages] = useState<[string | null, string | null]>([
    null,
    null,
  ]);
  const [question, setQuestion] = useState("");
  const [side0Weight, setSide0Weight] = useState(50);
  const [counts, setCounts] = useState<[number, number]>([0, 0]);
  const [streak, setStreak] = useState(0);
  const [lastSideIndex, setLastSideIndex] = useState<CoinSideIndex | null>(
    null,
  );
  const [multiCount, setMultiCount] = useState(10);
  const [lastResult, setLastResult] = useState<CoinSideIndex | null>(null);
  const [lastSnapshot, setLastSnapshot] = useState<FlipSnapshot | null>(null);
  const [sequence, setSequence] = useState<CoinSideIndex[]>([]);
  const [flipping, setFlipping] = useState(false);
  const [rotationDeg, setRotationDeg] = useState(0);
  const [tiltDeg, setTiltDeg] = useState(0);
  const [flipDurationMs, setFlipDurationMs] = useState(FLIP_MS);
  const [announcement, setAnnouncement] = useState("");

  const preset = getCoinFacePreset(presetId);
  const total = counts[0] + counts[1];
  const animMs = prefersReducedMotion ? 0 : FLIP_MS;
  const oddsText = formatOddsText(side0Weight, sideLabels[0], sideLabels[1]);
  const trimmedQuestion = question.trim().slice(0, MAX_QUESTION);

  useEffect(() => {
    return () => {
      revokeCoinFaceUrl(faceImages[0]);
      revokeCoinFaceUrl(faceImages[1]);
    };
  }, [faceImages]);

  const applyPreset = (id: CoinFacePresetId) => {
    setPresetId(id);
    const next = getCoinFacePreset(id);
    setSideLabels([next.sides[0].label, next.sides[1].label]);
  };

  const handleFaceUpload = async (side: CoinSideIndex, file: File | null) => {
    if (!file) return;
    try {
      const processed = await processCoinFaceFile(file);
      setFaceImages((prev) => {
        revokeCoinFaceUrl(prev[side]);
        const next: [string | null, string | null] = [...prev];
        next[side] = processed.objectUrl;
        return next;
      });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not load image.");
    }
  };

  const clearFaceImage = (side: CoinSideIndex) => {
    setFaceImages((prev) => {
      revokeCoinFaceUrl(prev[side]);
      const next: [string | null, string | null] = [...prev];
      next[side] = null;
      return next;
    });
  };

  const animateToSide = useCallback(
    async (sideIndex: CoinSideIndex, durationMs: number) => {
      if (prefersReducedMotion || durationMs === 0) {
        const snap = normalizedSideRotation(sideIndex);
        rotationRef.current = snap;
        setRotationDeg(snap);
        setTiltDeg(0);
        return;
      }

      setTiltDeg(8 + Math.round(cryptoRandom() * 6));
      const target = computeFlipRotation(rotationRef.current, sideIndex);
      rotationRef.current = target;
      setRotationDeg(target);
      await new Promise<void>((resolve) => {
        window.setTimeout(resolve, durationMs + 60);
      });
      setTiltDeg(0);
    },
    [prefersReducedMotion],
  );

  const recordFlip = useCallback(
    (sideIndex: CoinSideIndex, snapshot?: Omit<FlipSnapshot, "sideIndex">) => {
      setCounts((prev) => {
        const next: [number, number] = [...prev];
        next[sideIndex] += 1;
        return next;
      });
      const prevSide = lastSideIndexRef.current;
      const newStreak = prevSide === sideIndex ? streakRef.current + 1 : 1;
      streakRef.current = newStreak;
      lastSideIndexRef.current = sideIndex;
      setStreak(newStreak);
      setLastSideIndex(sideIndex);
      setLastResult(sideIndex);
      const label = sideLabels[sideIndex];
      setAnnouncement(`Result: ${label}`);
      if (snapshot) {
        setLastSnapshot({ sideIndex, ...snapshot });
      }
    },
    [sideLabels],
  );

  const flipOnce = useCallback(async () => {
    if (flipping) return;
    setFlipping(true);
    setFlipDurationMs(FLIP_MS);
    setSequence([]);
    const sideIndex = pickCoinSide(side0Weight);
    const timestampMs = Date.now();
    await animateToSide(sideIndex, animMs);
    recordFlip(sideIndex, {
      timestampMs,
      question: trimmedQuestion,
      labels: [...sideLabels] as [string, string],
      side0Percent: side0Weight,
    });
    setFlipping(false);
  }, [
    animateToSide,
    animMs,
    flipping,
    recordFlip,
    side0Weight,
    sideLabels,
    trimmedQuestion,
  ]);

  const flipMultiple = useCallback(async () => {
    if (flipping) return;
    const n = Math.min(Math.max(1, multiCount), MAX_MULTI);
    setFlipping(true);
    setFlipDurationMs(MULTI_FLIP_MS);
    setSequence([]);
    setLastSnapshot(null);
    const outcomes = pickCoinSides(n, side0Weight);
    const batchDuration = prefersReducedMotion ? 0 : MULTI_FLIP_MS;

    for (let i = 0; i < outcomes.length; i++) {
      const sideIndex = outcomes[i];
      await animateToSide(sideIndex, batchDuration);
      recordFlip(sideIndex);
      setSequence((prev) => [...prev, sideIndex]);
    }

    setFlipDurationMs(FLIP_MS);
    setFlipping(false);
  }, [
    animateToSide,
    flipping,
    multiCount,
    prefersReducedMotion,
    recordFlip,
    side0Weight,
  ]);

  const resetStats = () => {
    setCounts([0, 0]);
    streakRef.current = 0;
    lastSideIndexRef.current = null;
    setStreak(0);
    setLastSideIndex(null);
    setLastResult(null);
    setLastSnapshot(null);
    setSequence([]);
    setAnnouncement("");
  };

  const exportResult = async () => {
    if (!lastSnapshot) return;
    try {
      await downloadCoinFlipResultPng({
        question: lastSnapshot.question || undefined,
        labels: lastSnapshot.labels,
        winner: lastSnapshot.labels[lastSnapshot.sideIndex],
        timestampMs: lastSnapshot.timestampMs,
        oddsText:
          lastSnapshot.side0Percent !== 50
            ? formatOddsText(
                lastSnapshot.side0Percent,
                lastSnapshot.labels[0],
                lastSnapshot.labels[1],
              )
            : undefined,
      });
      toast.success("Result image downloaded.");
    } catch {
      toast.error("Could not export result image.");
    }
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 md:p-5 space-y-4">
        <div className="flex items-center gap-2 text-primary font-semibold">
          <Coins className="h-5 w-5" />
          <span>Coin flip controls</span>
        </div>

        <div className="space-y-2">
          <Label htmlFor="coin-question">Question (optional)</Label>
          <Input
            id="coin-question"
            value={question}
            maxLength={MAX_QUESTION}
            onChange={(e) => setQuestion(e.target.value.slice(0, MAX_QUESTION))}
            placeholder="Which team goes first?"
            data-testid="coin-question"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="coin-preset">Face preset</Label>
          <select
            id="coin-preset"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={presetId}
            onChange={(e) => applyPreset(e.target.value as CoinFacePresetId)}
            data-testid="coin-preset"
          >
            {COIN_FACE_PRESETS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {([0, 1] as const).map((side) => (
            <div key={side} className="space-y-2">
              <Label htmlFor={`coin-side-${side}`}>
                Side {side === 0 ? "A" : "B"} label
              </Label>
              <Input
                id={`coin-side-${side}`}
                value={sideLabels[side]}
                onChange={(e) =>
                  setSideLabels((prev) => {
                    const next: [string, string] = [...prev];
                    next[side] = e.target.value;
                    return next;
                  })
                }
                data-testid={`coin-label-${side}`}
              />
              <div className="flex flex-wrap gap-2 items-center">
                <Label
                  htmlFor={`coin-face-${side}`}
                  className="text-xs text-muted-foreground cursor-pointer"
                >
                  Optional face image (local only)
                </Label>
                <Input
                  id={`coin-face-${side}`}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="text-xs"
                  data-testid={`coin-face-input-${side}`}
                  onChange={(e) => {
                    const file = e.target.files?.[0] ?? null;
                    void handleFaceUpload(side, file);
                    e.target.value = "";
                  }}
                />
                {faceImages[side] ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => clearFaceImage(side)}
                  >
                    Remove image
                  </Button>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Label htmlFor="coin-weight">Weighted odds</Label>
            <p className="text-sm font-medium text-primary" data-testid="coin-odds">
              {oddsText}
            </p>
          </div>
          <Slider
            id="coin-weight"
            min={1}
            max={99}
            step={1}
            value={[side0Weight]}
            onValueChange={(v) => setSide0Weight(v[0] ?? 50)}
            data-testid="coin-weight-slider"
            aria-label={`${sideLabels[0]} win probability`}
          />
        </div>

        <div className="flex flex-wrap gap-3 items-end">
          <Button
            onClick={() => void flipOnce()}
            disabled={flipping}
            size="lg"
            data-testid="flip-once"
          >
            Flip coin
          </Button>
          <div className="flex flex-wrap items-end gap-2">
            <div className="space-y-2">
              <Label htmlFor="multi-count">Multi-flip count</Label>
              <Input
                id="multi-count"
                type="number"
                min={1}
                max={MAX_MULTI}
                value={multiCount}
                onChange={(e) =>
                  setMultiCount(Number(e.target.value) || 1)
                }
                className="w-24"
                data-testid="multi-count"
              />
            </div>
            <Button
              variant="secondary"
              onClick={() => void flipMultiple()}
              disabled={flipping}
              data-testid="flip-multi"
            >
              Flip {Math.min(Math.max(1, multiCount), MAX_MULTI)} times
            </Button>
          </div>
          {total > 0 ? (
            <Button variant="outline" size="sm" onClick={resetStats}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset stats
            </Button>
          ) : null}
        </div>
      </Card>

      <Card className="p-4 md:p-5">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div data-testid="tally-0">
            <p className="text-2xl font-bold text-primary">{counts[0]}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              {sideLabels[0] || "Side A"}
            </p>
          </div>
          <div data-testid="tally-1">
            <p className="text-2xl font-bold text-primary">{counts[1]}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              {sideLabels[1] || "Side B"}
            </p>
          </div>
          <div data-testid="streak">
            <p className="text-2xl font-bold text-primary">{streak}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              Streak
              {lastSideIndex !== null
                ? ` (${sideLabels[lastSideIndex]})`
                : ""}
            </p>
          </div>
        </div>
        {total > 0 ? (
          <p className="text-center text-sm text-muted-foreground mt-3">
            {total} flip{total !== 1 ? "s" : ""} recorded this session
          </p>
        ) : null}
      </Card>

      <Card className="p-6 md:p-8">
        <div
          className="flex flex-col items-center gap-6"
          style={{ perspective: "1000px" }}
        >
          {trimmedQuestion ? (
            <p
              className="text-lg md:text-xl font-semibold text-center text-foreground max-w-md"
              data-testid="coin-question-display"
            >
              {trimmedQuestion}
            </p>
          ) : null}

          <div
            ref={coinRef}
            role="img"
            aria-label={
              lastResult !== null
                ? `Coin showing ${sideLabels[lastResult]}`
                : "Coin ready to flip"
            }
            data-testid="coin"
            className="relative h-40 w-40 md:h-48 md:w-48"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateX(${tiltDeg}deg) rotateY(${rotationDeg}deg)`,
              transition: prefersReducedMotion
                ? "none"
                : `transform ${flipDurationMs}ms cubic-bezier(0.17, 0.67, 0.35, 0.96)`,
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                backfaceVisibility: "hidden",
                transform: "translateZ(6px)",
              }}
            >
              <CoinFaceContent
                label={sideLabels[0]}
                imageUrl={faceImages[0]}
                presetClass={preset.sides[0].className}
                glyph={preset.sides[0].glyph}
              />
            </div>
            <div
              className="absolute inset-0"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg) translateZ(6px)",
              }}
            >
              <CoinFaceContent
                label={sideLabels[1]}
                imageUrl={faceImages[1]}
                presetClass={preset.sides[1].className}
                glyph={preset.sides[1].glyph}
              />
            </div>
          </div>

          <p
            className="text-2xl md:text-3xl font-bold text-primary text-center min-h-[2.5rem]"
            aria-live="polite"
            data-testid="coin-result"
          >
            {lastResult !== null ? (
              <>
                {trimmedQuestion ? `${trimmedQuestion} — ` : ""}
                {sideLabels[lastResult]}
              </>
            ) : (
              "Tap flip to start"
            )}
          </p>
          <span className="sr-only" aria-live="polite">
            {announcement}
          </span>
        </div>
      </Card>

      {lastSnapshot ? (
        <Card className="p-4 md:p-5 space-y-4" data-testid="coin-result-card">
          <h3 className="font-bold text-lg">Result card</h3>
          {lastSnapshot.question ? (
            <p className="text-muted-foreground" data-testid="result-card-question">
              {lastSnapshot.question}
            </p>
          ) : null}
          <dl className="grid gap-2 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-muted-foreground">Side A</dt>
              <dd className="font-semibold" data-testid="result-card-label-0">
                {lastSnapshot.labels[0]}
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Side B</dt>
              <dd className="font-semibold" data-testid="result-card-label-1">
                {lastSnapshot.labels[1]}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-muted-foreground">Winner</dt>
              <dd className="text-xl font-bold text-primary" data-testid="result-card-winner">
                {lastSnapshot.labels[lastSnapshot.sideIndex]}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-muted-foreground">Drawn (UTC)</dt>
              <dd className="font-medium" data-testid="result-card-time">
                {new Date(lastSnapshot.timestampMs)
                  .toISOString()
                  .replace("T", " ")
                  .replace(/\.\d{3}Z$/, " UTC")}
              </dd>
            </div>
            {lastSnapshot.side0Percent !== 50 ? (
              <div className="sm:col-span-2">
                <dt className="text-muted-foreground">Odds used</dt>
                <dd className="font-medium">
                  {formatOddsText(
                    lastSnapshot.side0Percent,
                    lastSnapshot.labels[0],
                    lastSnapshot.labels[1],
                  )}
                </dd>
              </div>
            ) : null}
          </dl>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => void exportResult()}
              data-testid="download-result"
            >
              <Download className="mr-2 h-4 w-4" />
              Download result
            </Button>
            <CoinFlipProofActions
              payload={{
                w: [lastSnapshot.labels[lastSnapshot.sideIndex]],
                n: 2,
                s: "coin-flip-wheel",
                t: lastSnapshot.timestampMs,
                q: lastSnapshot.question || undefined,
                l: lastSnapshot.labels,
                p0:
                  lastSnapshot.side0Percent !== 50
                    ? Math.round(lastSnapshot.side0Percent)
                    : undefined,
              }}
            />
          </div>
        </Card>
      ) : null}

      {sequence.length > 0 ? (
        <Card className="p-4 md:p-5">
          <h3 className="font-bold mb-3">Multi-flip sequence</h3>
          <p className="text-sm text-muted-foreground mb-2">
            {sequence.length} flips — {sideLabels[0]}:{" "}
            {sequence.filter((s) => s === 0).length}, {sideLabels[1]}:{" "}
            {sequence.filter((s) => s === 1).length}
          </p>
          <p
            className="text-sm font-mono break-all leading-relaxed"
            data-testid="flip-sequence"
          >
            {sequence.map((s) => sideLabels[s]).join(" · ")}
          </p>
        </Card>
      ) : null}
    </div>
  );
}
