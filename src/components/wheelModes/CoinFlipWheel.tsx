import { useCallback, useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Coins,
  Copy,
  Download,
  ImagePlus,
  Play,
  RotateCcw,
  Trash2,
  Volume2,
  VolumeX,
} from "lucide-react";
import {
  computeEdgePhysics,
  computeFlipPhysics,
  formatOddsText,
  normalizedSideRotation,
  pickFlipOutcome,
  resolveTossWinner,
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
import {
  playCoinBatchSound,
  playCoinEdgeLandSound,
  playCoinFlickSound,
  playCoinLandSound,
  playCoinSpinSound,
  readCoinFlipSoundMuted,
  warmUpCoinFlipAudio,
  writeCoinFlipSoundMuted,
} from "@/lib/coinFlipSound";
import { CoinFlipProofActions } from "./CoinFlipProofActions";
import { toast } from "sonner";

type CoinFlipWheelProps = {
  presetOptionLabels?: string[];
};

const MULTI_FLIP_MS = 900;
const MAX_MULTI = 50;
const MAX_QUESTION = 120;
const WOBBLE_MS = 320;

const PRIMARY_FLIP_BTN =
  "text-sm sm:text-base lg:text-lg font-bold px-6 sm:px-8 lg:px-10 py-3 sm:py-4 h-auto bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground w-full max-w-md shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none rounded-xl border-t border-white/20 relative overflow-hidden group touch-manipulation tracking-wide";

type FlipSnapshot = {
  sideIndex: CoinSideIndex;
  timestampMs: number;
  question: string;
  labels: [string, string];
  side0Percent: number;
  tossWinner?: string;
  tossCaller?: string;
  tossCall?: string;
};

type JournalEntry = {
  timestampMs: number;
  question: string;
  labels: [string, string];
  winner: string;
  tossWinner?: string;
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
  side,
  label,
  imageUrl,
  presetClass,
  glyph,
}: {
  side: CoinSideIndex;
  label: string;
  imageUrl: string | null;
  presetClass: string;
  glyph?: string;
}) {
  if (imageUrl) {
    return (
      <div
        className="relative h-full w-full overflow-hidden rounded-full border-4 border-amber-500/80 shadow-lg"
        data-testid={`coin-face-${side}`}
      >
        <img
          src={imageUrl}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
          draggable={false}
          data-testid={`coin-face-image-${side}`}
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/50"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center px-2 pb-2 pt-6 bg-gradient-to-t from-black/70 via-black/45 to-transparent">
          <span
            className="relative z-10 max-w-full truncate text-center text-sm md:text-base font-bold text-white"
            style={{
              textShadow:
                "0 1px 2px rgba(0,0,0,0.95), 0 0 8px rgba(0,0,0,0.65), 0 2px 4px rgba(0,0,0,0.85)",
            }}
          >
            {label}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative h-full w-full overflow-hidden rounded-full border-4 border-amber-500/80 shadow-lg ${presetClass}`}
      data-testid={`coin-face-${side}`}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center px-3 text-center">
        {glyph ? (
          <span className="text-4xl md:text-5xl leading-none mb-1" aria-hidden>
            {glyph}
          </span>
        ) : null}
        <span className="relative z-10 text-sm md:text-base font-bold drop-shadow-sm">
          {label}
        </span>
      </div>
    </div>
  );
}

function CoinFaceUpload({
  side,
  imageUrl,
  onUpload,
  onClear,
}: {
  side: CoinSideIndex;
  imageUrl: string | null;
  onUpload: (file: File) => void;
  onClear: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const sideName = side === 0 ? "A" : "B";

  return (
    <div className="space-y-2 rounded-md border border-dashed border-input p-3">
      <p className="text-sm font-medium">Side {sideName} face image</p>
      {imageUrl ? (
        <div className="flex items-center gap-3">
          <img
            src={imageUrl}
            alt={`Side ${sideName} preview`}
            className="h-14 w-14 rounded-full object-cover border"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onClear}
            data-testid={`coin-face-remove-${side}`}
          >
            Remove image
          </Button>
        </div>
      ) : (
        <>
          <input
            ref={inputRef}
            id={`coin-face-${side}`}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="sr-only"
            data-testid={`coin-face-input-${side}`}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onUpload(file);
              e.target.value = "";
            }}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-full sm:w-auto"
            onClick={() => inputRef.current?.click()}
            data-testid={`coin-face-upload-${side}`}
          >
            <ImagePlus className="mr-2 h-4 w-4" />
            Use your own image
          </Button>
          <p className="text-xs text-muted-foreground">
            PNG, JPEG, or WebP under 5 MB — stays on your device only.
          </p>
        </>
      )}
    </div>
  );
}

export function CoinFlipWheel({ presetOptionLabels }: CoinFlipWheelProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const rotationRef = useRef(0);
  const lastSideIndexRef = useRef<CoinSideIndex | null>(null);
  const streakRef = useRef(0);
  const userInteractedRef = useRef(false);

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
  const [edgeZDeg, setEdgeZDeg] = useState(0);
  const [onEdge, setOnEdge] = useState(false);
  const [flipDurationMs, setFlipDurationMs] = useState(1800);
  const [announcement, setAnnouncement] = useState("");
  const [soundMuted, setSoundMuted] = useState(() => readCoinFlipSoundMuted());
  const [tossMode, setTossMode] = useState(false);
  const [tossCaller, setTossCaller] = useState<CoinSideIndex>(0);
  const [tossCall, setTossCall] = useState<CoinSideIndex>(0);
  const [journal, setJournal] = useState<JournalEntry[]>([]);
  const [lastTossWinner, setLastTossWinner] = useState<string | null>(null);

  const preset = getCoinFacePreset(presetId);
  const total = counts[0] + counts[1];
  const oddsText = formatOddsText(side0Weight, sideLabels[0], sideLabels[1]);
  const trimmedQuestion = question.trim().slice(0, MAX_QUESTION);
  const flipDisabled = flipping;

  useEffect(() => {
    return () => {
      revokeCoinFaceUrl(faceImages[0]);
      revokeCoinFaceUrl(faceImages[1]);
    };
  }, [faceImages]);

  const markInteraction = useCallback(() => {
    userInteractedRef.current = true;
    warmUpCoinFlipAudio();
  }, []);

  const maybePlaySound = useCallback(
    (play: () => void) => {
      if (soundMuted || !userInteractedRef.current) return;
      play();
    },
    [soundMuted],
  );

  const toggleSound = () => {
    markInteraction();
    setSoundMuted((prev) => {
      const next = !prev;
      writeCoinFlipSoundMuted(next);
      return next;
    });
  };

  const applyPreset = (id: CoinFacePresetId) => {
    setPresetId(id);
    const next = getCoinFacePreset(id);
    setSideLabels([next.sides[0].label, next.sides[1].label]);
  };

  const handleFaceUpload = async (side: CoinSideIndex, file: File) => {
    markInteraction();
    try {
      const processed = await processCoinFaceFile(file);
      setFaceImages((prev) => {
        revokeCoinFaceUrl(prev[side]);
        const next: [string | null, string | null] = [...prev];
        next[side] = processed.objectUrl;
        return next;
      });
      toast.success(`Side ${side === 0 ? "A" : "B"} image loaded.`);
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

  const runWobble = async (wobbleDeg: number) => {
    if (prefersReducedMotion) return;
    setTiltDeg(wobbleDeg);
    await new Promise<void>((r) => window.setTimeout(r, WOBBLE_MS / 2));
    setTiltDeg(-wobbleDeg * 0.45);
    await new Promise<void>((r) => window.setTimeout(r, WOBBLE_MS / 2));
    setTiltDeg(0);
  };

  const animateEdge = useCallback(async () => {
    const physics = computeEdgePhysics();
    setOnEdge(false);
    setFlipDurationMs(physics.durationMs);

    if (prefersReducedMotion) {
      setOnEdge(true);
      setEdgeZDeg(physics.edgeZDeg);
      setTiltDeg(90);
      return;
    }

    setTiltDeg(8 + Math.round(cryptoRandom() * 6));
    await new Promise<void>((r) =>
      window.setTimeout(r, physics.durationMs * 0.55),
    );
    setOnEdge(true);
    setEdgeZDeg(physics.edgeZDeg);
    setTiltDeg(90);
    await new Promise<void>((r) =>
      window.setTimeout(r, physics.durationMs * 0.45),
    );
    await runWobble(physics.wobbleDeg);
  }, [prefersReducedMotion]);

  const animateToSide = useCallback(
    async (sideIndex: CoinSideIndex, durationMs?: number) => {
      setOnEdge(false);
      const physics = computeFlipPhysics(rotationRef.current, sideIndex);
      const ms = durationMs ?? (prefersReducedMotion ? 0 : physics.durationMs);
      setFlipDurationMs(ms);

      if (prefersReducedMotion || ms === 0) {
        const snap = normalizedSideRotation(sideIndex);
        rotationRef.current = snap;
        setRotationDeg(snap);
        setTiltDeg(0);
        return;
      }

      setTiltDeg(physics.tiltDeg);
      rotationRef.current = physics.targetDeg;
      setRotationDeg(physics.targetDeg);
      await new Promise<void>((resolve) => {
        window.setTimeout(resolve, ms + 40);
      });
      await runWobble(physics.wobbleDeg);
      setTiltDeg(0);
    },
    [prefersReducedMotion],
  );

  const addJournalEntry = useCallback((entry: JournalEntry) => {
    setJournal((prev) => [...prev, entry]);
  }, []);

  const recordFlip = useCallback(
    (
      sideIndex: CoinSideIndex,
      snapshot?: Omit<FlipSnapshot, "sideIndex">,
    ) => {
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
      const tossWinner =
        snapshot?.tossWinner ??
        (tossMode
          ? resolveTossWinner(tossCaller, tossCall, sideIndex, sideLabels)
          : undefined);

      if (tossMode && tossWinner) {
        setLastTossWinner(tossWinner);
        setAnnouncement(`${tossWinner} wins the toss`);
      } else {
        setLastTossWinner(null);
        setAnnouncement(`Result: ${label}`);
      }

      if (snapshot) {
        setLastSnapshot({ sideIndex, ...snapshot, tossWinner });
      }

      addJournalEntry({
        timestampMs: snapshot?.timestampMs ?? Date.now(),
        question: snapshot?.question ?? trimmedQuestion,
        labels: snapshot?.labels ?? sideLabels,
        winner: label,
        tossWinner: tossWinner ?? undefined,
      });
    },
    [
      addJournalEntry,
      sideLabels,
      tossCall,
      tossCaller,
      tossMode,
      trimmedQuestion,
    ],
  );

  const flipOnce = useCallback(async () => {
    if (flipping) return;
    markInteraction();
    setFlipping(true);
    setSequence([]);
    setLastTossWinner(null);

    const outcome = pickFlipOutcome(side0Weight);
    const timestampMs = Date.now();

    if (outcome.kind === "edge") {
      const edgePhysics = computeEdgePhysics();
      const edgeMs = prefersReducedMotion ? 0 : edgePhysics.durationMs;
      maybePlaySound(() => {
        playCoinFlickSound();
        playCoinSpinSound(edgeMs);
      });
      await animateEdge();
      maybePlaySound(() => playCoinEdgeLandSound());
      setLastResult(null);
      setLastSnapshot(null);
      setAnnouncement("It landed on its edge!");
      setFlipping(false);
      return;
    }

    const sideIndex = outcome.sideIndex;
    const flipPhysics = computeFlipPhysics(rotationRef.current, sideIndex);
    const flipMs = prefersReducedMotion ? 0 : flipPhysics.durationMs;
    maybePlaySound(() => {
      playCoinFlickSound();
      playCoinSpinSound(flipMs);
    });
    await animateToSide(sideIndex);
    maybePlaySound(() => playCoinLandSound());

    const tossWinner = tossMode
      ? resolveTossWinner(tossCaller, tossCall, sideIndex, sideLabels)
      : undefined;

    recordFlip(sideIndex, {
      timestampMs,
      question: trimmedQuestion,
      labels: [...sideLabels] as [string, string],
      side0Percent: side0Weight,
      tossWinner,
      tossCaller: tossMode ? sideLabels[tossCaller] : undefined,
      tossCall: tossMode ? sideLabels[tossCall] : undefined,
    });
    setFlipping(false);
  }, [
    animateEdge,
    animateToSide,
    flipping,
    markInteraction,
    maybePlaySound,
    prefersReducedMotion,
    recordFlip,
    side0Weight,
    sideLabels,
    tossCall,
    tossCaller,
    tossMode,
    trimmedQuestion,
  ]);

  const flipMultiple = useCallback(async () => {
    if (flipping) return;
    markInteraction();
    const n = Math.min(Math.max(1, multiCount), MAX_MULTI);
    setFlipping(true);
    setFlipDurationMs(MULTI_FLIP_MS);
    setSequence([]);
    setLastSnapshot(null);
    setLastTossWinner(null);
    setOnEdge(false);

    maybePlaySound(() => playCoinBatchSound());

    const batchDuration = prefersReducedMotion ? 0 : MULTI_FLIP_MS;
    const outcomes: CoinSideIndex[] = [];

    for (let i = 0; i < n; i++) {
      const outcome = pickFlipOutcome(side0Weight);
      if (outcome.kind === "edge") {
        await animateEdge();
        setOnEdge(false);
        setTiltDeg(0);
        setAnnouncement("Edge landing — not counted in batch.");
        continue;
      }
      outcomes.push(outcome.sideIndex);
    }

    for (const sideIndex of outcomes) {
      await animateToSide(sideIndex, batchDuration);
      recordFlip(sideIndex);
      setSequence((prev) => [...prev, sideIndex]);
    }

    setFlipDurationMs(1800);
    setFlipping(false);
  }, [
    animateEdge,
    animateToSide,
    flipping,
    markInteraction,
    maybePlaySound,
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
    setLastTossWinner(null);
    setSequence([]);
    setOnEdge(false);
    setAnnouncement("");
  };

  const clearJournal = () => {
    setJournal([]);
    toast.success("Session journal cleared.");
  };

  const copyJournal = async () => {
    if (journal.length === 0) return;
    const lines = journal.map((e) => {
      const time = new Date(e.timestampMs)
        .toISOString()
        .replace("T", " ")
        .replace(/\.\d{3}Z$/, " UTC");
      const q = e.question ? `"${e.question}" — ` : "";
      const toss = e.tossWinner ? ` (toss: ${e.tossWinner})` : "";
      return `${time}: ${q}${e.labels[0]} vs ${e.labels[1]} → ${e.winner}${toss}`;
    });
    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      toast.success("Journal copied.");
    } catch {
      toast.error("Could not copy journal.");
    }
  };

  const exportResult = async () => {
    if (!lastSnapshot) return;
    try {
      await downloadCoinFlipResultPng({
        question: lastSnapshot.question || undefined,
        labels: lastSnapshot.labels,
        winner: lastSnapshot.tossWinner
          ? `${lastSnapshot.tossWinner} (toss)`
          : lastSnapshot.labels[lastSnapshot.sideIndex],
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

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code !== "Space" && e.key !== " ") return;
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return;
      }
      e.preventDefault();
      if (!flipDisabled) void flipOnce();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [flipDisabled, flipOnce]);

  const coinTransform = onEdge
    ? `rotateX(90deg) rotateZ(${edgeZDeg}deg)`
    : `rotateX(${tiltDeg}deg) rotateY(${rotationDeg}deg)`;

  const resultDisplay = onEdge
    ? "It landed on its edge!"
    : lastTossWinner
      ? `${lastTossWinner} wins the toss!`
      : lastResult !== null
        ? `${trimmedQuestion ? `${trimmedQuestion} — ` : ""}${sideLabels[lastResult]}`
        : "Tap the coin or flip button to start";

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
            <div key={side} className="space-y-3">
              <div className="space-y-2">
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
              </div>
              <CoinFaceUpload
                side={side}
                imageUrl={faceImages[side]}
                onUpload={(file) => void handleFaceUpload(side, file)}
                onClear={() => clearFaceImage(side)}
              />
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

        <div className="rounded-md border p-4 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-medium">Match toss mode</p>
              <p className="text-xs text-muted-foreground">
                One team calls before the flip — cricket, football, or kickoff.
              </p>
            </div>
            <Switch
              id="toss-mode"
              checked={tossMode}
              onCheckedChange={setTossMode}
              data-testid="toss-mode"
            />
          </div>
          {tossMode ? (
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="toss-caller">Who calls the toss?</Label>
                <select
                  id="toss-caller"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={tossCaller}
                  onChange={(e) =>
                    setTossCaller(Number(e.target.value) as CoinSideIndex)
                  }
                  data-testid="toss-caller"
                >
                  <option value={0}>{sideLabels[0] || "Side A"}</option>
                  <option value={1}>{sideLabels[1] || "Side B"}</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="toss-call">They call</Label>
                <select
                  id="toss-call"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={tossCall}
                  onChange={(e) =>
                    setTossCall(Number(e.target.value) as CoinSideIndex)
                  }
                  data-testid="toss-call"
                >
                  <option value={0}>{sideLabels[0] || "Side A"}</option>
                  <option value={1}>{sideLabels[1] || "Side B"}</option>
                </select>
              </div>
            </div>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-3 items-end">
          <div className="flex flex-wrap items-end gap-2">
            <div className="space-y-2">
              <Label htmlFor="multi-count">Multi-flip count</Label>
              <Input
                id="multi-count"
                type="number"
                min={1}
                max={MAX_MULTI}
                value={multiCount}
                onChange={(e) => setMultiCount(Number(e.target.value) || 1)}
                className="w-24"
                data-testid="multi-count"
              />
            </div>
            <Button
              variant="secondary"
              onClick={() => void flipMultiple()}
              disabled={flipDisabled}
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
              {lastSideIndex !== null ? ` (${sideLabels[lastSideIndex]})` : ""}
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
          className="flex flex-col items-center gap-5"
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

          <button
            type="button"
            onClick={() => void flipOnce()}
            onPointerDown={markInteraction}
            disabled={flipDisabled}
            aria-label={
              onEdge
                ? "Coin landed on edge — flip again"
                : lastResult !== null
                  ? `Coin showing ${sideLabels[lastResult]}. Flip again.`
                  : "Flip the coin"
            }
            data-testid="coin"
            className="relative h-40 w-40 md:h-48 md:w-48 rounded-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 disabled:cursor-not-allowed disabled:opacity-70 touch-manipulation"
            style={{ perspective: "1000px" }}
          >
            <div
              className="relative h-full w-full"
              style={{
                transformStyle: "preserve-3d",
                transform: coinTransform,
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
                  side={0}
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
                  side={1}
                  label={sideLabels[1]}
                  imageUrl={faceImages[1]}
                  presetClass={preset.sides[1].className}
                  glyph={preset.sides[1].glyph}
                />
              </div>
              {onEdge ? (
                <div
                  className="absolute inset-y-4 left-1/2 w-2 -translate-x-1/2 rounded-full bg-amber-600 shadow-md border border-amber-800"
                  aria-hidden
                />
              ) : null}
            </div>
          </button>

          <p
            className="text-2xl md:text-3xl font-bold text-primary text-center min-h-[2.5rem] max-w-lg"
            aria-live="polite"
            data-testid="coin-result"
          >
            {resultDisplay}
          </p>
          <span className="sr-only" aria-live="polite">
            {announcement}
          </span>

          {onEdge ? (
            <Button
              onClick={() => void flipOnce()}
              disabled={flipDisabled}
              size="lg"
              data-testid="flip-again-edge"
            >
              Flip again
            </Button>
          ) : (
            <div className="flex flex-col items-center gap-2 w-full max-w-md">
              <Button
                onClick={() => void flipOnce()}
                onPointerDown={markInteraction}
                disabled={flipDisabled}
                size="lg"
                className={PRIMARY_FLIP_BTN}
                data-testid="flip-once"
              >
                {flipping ? (
                  <>
                    <div className="animate-spin mr-2.5 h-4 w-4 sm:h-5 sm:w-5 border-[3px] border-white/30 border-t-white rounded-full relative z-10" />
                    <span className="relative z-10">Flipping…</span>
                  </>
                ) : (
                  <>
                    <Play className="mr-2.5 h-4 w-4 sm:h-5 sm:w-5 fill-current relative z-10" />
                    <span className="relative z-10">FLIP THE COIN</span>
                  </>
                )}
              </Button>
              <div className="flex flex-wrap items-center justify-center gap-3 w-full">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={toggleSound}
                  aria-pressed={!soundMuted}
                  data-testid="coin-sound-toggle"
                >
                  {soundMuted ? (
                    <>
                      <VolumeX className="mr-2 h-4 w-4" />
                      Sound off
                    </>
                  ) : (
                    <>
                      <Volume2 className="mr-2 h-4 w-4" />
                      Sound on
                    </>
                  )}
                </Button>
                <p className="text-xs text-muted-foreground">
                  Press{" "}
                  <kbd className="rounded border px-1.5 py-0.5 font-mono text-[11px]">
                    Space
                  </kbd>{" "}
                  to flip
                </p>
              </div>
            </div>
          )}
        </div>
      </Card>

      {journal.length > 0 ? (
        <Card className="p-4 md:p-5 space-y-3" data-testid="coin-journal">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-bold text-lg">
              Session journal ({journal.length} decision
              {journal.length !== 1 ? "s" : ""})
            </h3>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => void copyJournal()}
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </Button>
              <Button type="button" variant="ghost" size="sm" onClick={clearJournal}>
                <Trash2 className="mr-2 h-4 w-4" />
                Clear
              </Button>
            </div>
          </div>
          <ul className="space-y-2 text-sm max-h-48 overflow-y-auto">
            {journal.map((entry, i) => (
              <li
                key={`${entry.timestampMs}-${i}`}
                className="border-b pb-2 last:border-0"
              >
                <span className="text-muted-foreground">
                  {new Date(entry.timestampMs)
                    .toISOString()
                    .replace("T", " ")
                    .slice(11, 19)}{" "}
                  UTC
                </span>
                {" — "}
                {entry.question ? (
                  <span className="italic">{entry.question}: </span>
                ) : null}
                <span className="font-medium">{entry.winner}</span>
                {entry.tossWinner ? (
                  <span className="text-primary">
                    {" "}
                    ({entry.tossWinner} wins toss)
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </Card>
      ) : null}

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
            {lastSnapshot.tossWinner ? (
              <div className="sm:col-span-2">
                <dt className="text-muted-foreground">Toss winner</dt>
                <dd
                  className="text-xl font-bold text-primary"
                  data-testid="result-card-toss-winner"
                >
                  {lastSnapshot.tossWinner}
                </dd>
              </div>
            ) : null}
            <div className="sm:col-span-2">
              <dt className="text-muted-foreground">
                {lastSnapshot.tossWinner ? "Landed on" : "Winner"}
              </dt>
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
                w: [
                  lastSnapshot.tossWinner ??
                    lastSnapshot.labels[lastSnapshot.sideIndex],
                ],
                n: 2,
                s: "coin-flip-wheel",
                t: lastSnapshot.timestampMs,
                q: lastSnapshot.question || undefined,
                l: lastSnapshot.labels,
                p0:
                  lastSnapshot.side0Percent !== 50
                    ? Math.round(lastSnapshot.side0Percent)
                    : undefined,
                tc: lastSnapshot.tossCaller,
                cl: lastSnapshot.tossCall,
                tw: lastSnapshot.tossWinner,
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
