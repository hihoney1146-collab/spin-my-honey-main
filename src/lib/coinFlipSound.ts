const SOUND_MUTED_KEY = "coin-flip-sound-muted";
const SOUND_BASE = "/sounds/coin-flip";

const CLIPS = {
  flick: `${SOUND_BASE}/coin-flip-flick.wav`,
  spin: `${SOUND_BASE}/coin-flip-spin.wav`,
  land: `${SOUND_BASE}/coin-flip-land.wav`,
  edgeLand: `${SOUND_BASE}/coin-flip-edge-land.wav`,
} as const;

type ClipName = keyof typeof CLIPS;

/** Native spin clip length — keep in sync with process-coin-flip-sounds.mjs output. */
const SPIN_CLIP_MS = 2000;

let audioCtx: AudioContext | null = null;
let buffers: Partial<Record<ClipName, AudioBuffer>> | null = null;
let loadPromise: Promise<void> | null = null;

let activeSpinStop: (() => void) | null = null;
let activeSpinTimeout: ReturnType<typeof setTimeout> | null = null;

export function readCoinFlipSoundMuted(): boolean {
  try {
    const stored = sessionStorage.getItem(SOUND_MUTED_KEY);
    if (stored === null) return true;
    return stored === "true";
  } catch {
    return true;
  }
}

export function writeCoinFlipSoundMuted(muted: boolean): void {
  try {
    sessionStorage.setItem(SOUND_MUTED_KEY, String(muted));
  } catch {
    /* ignore */
  }
}

export function getCoinFlipAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const Ctor = window.AudioContext || window.webkitAudioContext;
    if (!Ctor) return null;
    audioCtx = new Ctor();
  }
  return audioCtx;
}

async function loadClip(ctx: AudioContext, name: ClipName): Promise<AudioBuffer> {
  const res = await fetch(CLIPS[name]);
  if (!res.ok) throw new Error(`Failed to load ${CLIPS[name]}`);
  const data = await res.arrayBuffer();
  return ctx.decodeAudioData(data);
}

async function ensureBuffers(): Promise<void> {
  const ctx = getCoinFlipAudioContext();
  if (!ctx || buffers) return;
  if (!loadPromise) {
    loadPromise = (async () => {
      const entries = await Promise.all(
        (Object.keys(CLIPS) as ClipName[]).map(async (name) => {
          const buffer = await loadClip(ctx, name);
          return [name, buffer] as const;
        }),
      );
      buffers = Object.fromEntries(entries) as Record<ClipName, AudioBuffer>;
    })();
  }
  await loadPromise;
}

export function warmUpCoinFlipAudio(): void {
  const ctx = getCoinFlipAudioContext();
  if (!ctx) return;
  if (ctx.state === "suspended") {
    void ctx.resume();
  }
  void ensureBuffers();
}

function clearSpinTimeout(): void {
  if (activeSpinTimeout !== null) {
    clearTimeout(activeSpinTimeout);
    activeSpinTimeout = null;
  }
}

export function stopCoinSpinSound(): void {
  clearSpinTimeout();
  activeSpinStop?.();
  activeSpinStop = null;
}

function playBuffer(
  buffer: AudioBuffer,
  {
    volume = 1,
    playbackRate = 1,
    loop = false,
    onEnded,
  }: {
    volume?: number;
    playbackRate?: number;
    loop?: boolean;
    onEnded?: () => void;
  } = {},
): () => void {
  const ctx = getCoinFlipAudioContext();
  if (!ctx) return () => undefined;

  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.loop = loop;
  source.playbackRate.value = playbackRate;

  const gain = ctx.createGain();
  const t = ctx.currentTime;
  gain.gain.setValueAtTime(Math.max(0.0001, volume), t);

  source.connect(gain);
  gain.connect(ctx.destination);
  source.start(t);

  source.onended = () => {
    onEnded?.();
  };

  return () => {
    try {
      source.stop();
    } catch {
      /* already stopped */
    }
  };
}

async function playClipAsync(
  name: ClipName,
  options: {
    volume?: number;
    playbackRate?: number;
    loop?: boolean;
    durationMs?: number;
  } = {},
): Promise<(() => void) | undefined> {
  await ensureBuffers();
  const buffer = buffers?.[name];
  if (!buffer) return undefined;
  return playBuffer(buffer, options);
}

function playClip(
  name: ClipName,
  options: {
    volume?: number;
    playbackRate?: number;
    loop?: boolean;
    durationMs?: number;
  } = {},
): void {
  void playClipAsync(name, options);
}

/** Short metallic flick at toss launch. */
export function playCoinFlickSound(volume = 0.55): void {
  playClip("flick", { volume: volume * 0.9 });
}

/** Airborne metallic spin — synced to flip animation duration. */
export function playCoinSpinSound(durationMs: number, volume = 0.42): void {
  stopCoinSpinSound();
  if (durationMs <= 0) return;

  void (async () => {
    await ensureBuffers();
    const buffer = buffers?.spin;
    const ctx = getCoinFlipAudioContext();
    if (!buffer || !ctx) return;

    const playbackRate = SPIN_CLIP_MS / Math.max(400, durationMs);
    const fadeSec = Math.min(0.12, (durationMs / 1000) * 0.08);

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = durationMs > SPIN_CLIP_MS;
    source.playbackRate.value = playbackRate;

    const gain = ctx.createGain();
    const t = ctx.currentTime;
    const playSec = durationMs / 1000;
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.linearRampToValueAtTime(volume, t + 0.025);
    gain.gain.setValueAtTime(volume, t + Math.max(0.03, playSec - fadeSec));
    gain.gain.exponentialRampToValueAtTime(0.0001, t + playSec);

    source.connect(gain);
    gain.connect(ctx.destination);
    source.start(t);
    source.stop(t + playSec + 0.02);

    activeSpinStop = () => {
      try {
        source.stop();
      } catch {
        /* already stopped */
      }
      activeSpinStop = null;
    };

    activeSpinTimeout = setTimeout(() => {
      activeSpinStop = null;
      activeSpinTimeout = null;
    }, durationMs + 40);
  })();
}

/** Flat landing clink when the coin settles. */
export function playCoinLandSound(volume = 0.62): void {
  stopCoinSpinSound();
  playClip("land", { volume });
}

/** Edge landing — sharper rattle. */
export function playCoinEdgeLandSound(volume = 0.58): void {
  stopCoinSpinSound();
  playClip("edgeLand", { volume });
}

/** Multi-flip batch: one flick + short spin bed (per-flip lands handled separately). */
export function playCoinBatchSound(volume = 0.38): void {
  playCoinFlickSound(volume);
  playCoinSpinSound(680, volume * 0.75);
}

/** @deprecated Use playCoinFlickSound + playCoinSpinSound */
export function playCoinTossSound(volume = 0.22): void {
  playCoinFlickSound(volume);
}
