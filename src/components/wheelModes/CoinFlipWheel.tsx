import { useCallback, useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Coins, RotateCcw } from "lucide-react";
import {
  computeFlipRotation,
  normalizedSideRotation,
  pickCoinSide,
  pickCoinSides,
  type CoinSideIndex,
} from "@/lib/coinFlip";
import { cryptoRandom } from "@/lib/cryptoRandom";

type CoinFlipWheelProps = {
  presetOptionLabels?: string[];
};

const FLIP_MS = 1800;
const MULTI_FLIP_MS = 900;
const MAX_MULTI = 50;

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

export function CoinFlipWheel({ presetOptionLabels }: CoinFlipWheelProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const coinRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(0);
  const lastSideIndexRef = useRef<CoinSideIndex | null>(null);
  const streakRef = useRef(0);

  const [sideLabels, setSideLabels] = useState<[string, string]>(() =>
    defaultLabels(presetOptionLabels),
  );
  const [counts, setCounts] = useState<[number, number]>([0, 0]);
  const [streak, setStreak] = useState(0);
  const [lastSideIndex, setLastSideIndex] = useState<CoinSideIndex | null>(
    null,
  );
  const [multiCount, setMultiCount] = useState(10);
  const [lastResult, setLastResult] = useState<CoinSideIndex | null>(null);
  const [sequence, setSequence] = useState<CoinSideIndex[]>([]);
  const [flipping, setFlipping] = useState(false);
  const [rotationDeg, setRotationDeg] = useState(0);
  const [tiltDeg, setTiltDeg] = useState(0);
  const [flipDurationMs, setFlipDurationMs] = useState(FLIP_MS);
  const [announcement, setAnnouncement] = useState("");

  const total = counts[0] + counts[1];
  const animMs = prefersReducedMotion ? 0 : FLIP_MS;

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

  const recordFlip = useCallback((sideIndex: CoinSideIndex) => {
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
    setAnnouncement(`Result: ${sideLabels[sideIndex]}`);
  }, [sideLabels]);

  const flipOnce = useCallback(async () => {
    if (flipping) return;
    setFlipping(true);
    setFlipDurationMs(FLIP_MS);
    setSequence([]);
    const sideIndex = pickCoinSide();
    await animateToSide(sideIndex, animMs);
    recordFlip(sideIndex);
    setFlipping(false);
  }, [animateToSide, animMs, flipping, recordFlip]);

  const flipMultiple = useCallback(async () => {
    if (flipping) return;
    const n = Math.min(Math.max(1, multiCount), MAX_MULTI);
    setFlipping(true);
    setFlipDurationMs(MULTI_FLIP_MS);
    setSequence([]);
    const outcomes = pickCoinSides(n);
    const batchDuration = prefersReducedMotion ? 0 : MULTI_FLIP_MS;

    for (let i = 0; i < outcomes.length; i++) {
      const sideIndex = outcomes[i];
      await animateToSide(sideIndex, batchDuration);
      recordFlip(sideIndex);
      setSequence((prev) => [...prev, sideIndex]);
    }

    setFlipDurationMs(FLIP_MS);
    setFlipping(false);
  }, [animateToSide, flipping, multiCount, prefersReducedMotion, recordFlip]);

  const resetStats = () => {
    setCounts([0, 0]);
    streakRef.current = 0;
    lastSideIndexRef.current = null;
    setStreak(0);
    setLastSideIndex(null);
    setLastResult(null);
    setSequence([]);
    setAnnouncement("");
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 md:p-5 space-y-4">
        <div className="flex items-center gap-2 text-primary font-semibold">
          <Coins className="h-5 w-5" />
          <span>Coin flip controls</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="coin-side-a">Side A label</Label>
            <Input
              id="coin-side-a"
              value={sideLabels[0]}
              onChange={(e) =>
                setSideLabels(([_, b]) => [e.target.value, b])
              }
              data-testid="coin-label-0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="coin-side-b">Side B label</Label>
            <Input
              id="coin-side-b"
              value={sideLabels[1]}
              onChange={(e) =>
                setSideLabels(([a]) => [a, e.target.value])
              }
              data-testid="coin-label-1"
            />
          </div>
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
              className="absolute inset-0 flex items-center justify-center rounded-full border-4 border-amber-500/80 bg-gradient-to-br from-amber-100 to-amber-300 text-center text-lg font-bold text-amber-950 shadow-lg dark:from-amber-900 dark:to-amber-700 dark:text-amber-50 px-3"
              style={{
                backfaceVisibility: "hidden",
                transform: "translateZ(6px)",
              }}
            >
              {sideLabels[0]}
            </div>
            <div
              className="absolute inset-0 flex items-center justify-center rounded-full border-4 border-amber-500/80 bg-gradient-to-br from-amber-200 to-amber-400 text-center text-lg font-bold text-amber-950 shadow-lg dark:from-amber-800 dark:to-amber-600 dark:text-amber-50 px-3"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg) translateZ(6px)",
              }}
            >
              {sideLabels[1]}
            </div>
          </div>

          <p
            className="text-2xl md:text-3xl font-bold text-primary text-center min-h-[2.5rem]"
            aria-live="polite"
            data-testid="coin-result"
          >
            {lastResult !== null ? sideLabels[lastResult] : "Tap flip to start"}
          </p>
          <span className="sr-only" aria-live="polite">
            {announcement}
          </span>
        </div>
      </Card>

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
