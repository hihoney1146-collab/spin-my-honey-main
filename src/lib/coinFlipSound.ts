const SOUND_MUTED_KEY = "coin-flip-sound-muted";

let audioCtx: AudioContext | null = null;
let activeSpinStop: (() => void) | null = null;

/** Per-flip pitch jitter so repeats do not sound mechanical. */
function pitchFactor(): number {
  return 0.94 + Math.random() * 0.12;
}

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

export function warmUpCoinFlipAudio(): void {
  const ctx = getCoinFlipAudioContext();
  if (!ctx) return;
  if (ctx.state === "suspended") {
    void ctx.resume();
  }
}

function playFilteredNoiseBurst(
  ctx: AudioContext,
  start: number,
  duration: number,
  volume: number,
  centerHz: number,
  q: number,
) {
  const sampleRate = ctx.sampleRate;
  const length = Math.max(1, Math.floor(sampleRate * duration));
  const buffer = ctx.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) {
    const fade = 1 - i / length;
    data[i] = (Math.random() * 2 - 1) * fade;
  }
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = centerHz;
  filter.Q.value = q;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(volume, start);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  source.start(start);
  source.stop(start + duration + 0.02);
}

function playMetallicPartial(
  ctx: AudioContext,
  frequency: number,
  start: number,
  attack: number,
  decay: number,
  volume: number,
  type: OscillatorType = "triangle",
) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(frequency * pitchFactor(), start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.linearRampToValueAtTime(volume, start + attack);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + attack + decay);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(start);
  osc.stop(start + attack + decay + 0.04);
}

export function stopCoinSpinSound(): void {
  activeSpinStop?.();
  activeSpinStop = null;
}

/** THE FLICK — short bright metallic ping at launch. */
export function playCoinFlickSound(volume = 0.22): void {
  const ctx = getCoinFlipAudioContext();
  if (!ctx) return;
  const t = ctx.currentTime;
  playMetallicPartial(ctx, 3180, t, 0.002, 0.065, volume * 0.42, "triangle");
  playMetallicPartial(ctx, 4120, t + 0.001, 0.0015, 0.048, volume * 0.32, "sine");
  playMetallicPartial(ctx, 5280, t + 0.002, 0.001, 0.035, volume * 0.22, "triangle");
  playFilteredNoiseBurst(ctx, t, 0.035, volume * 0.18, 4900, 9);
}

/** THE SPIN — very quiet whir while airborne; fades with deceleration. */
export function playCoinSpinSound(durationMs: number, volume = 0.055): void {
  stopCoinSpinSound();
  if (durationMs <= 0) return;

  const ctx = getCoinFlipAudioContext();
  if (!ctx) return;

  const durationSec = durationMs / 1000;
  const t = ctx.currentTime;
  const sampleRate = ctx.sampleRate;
  const bufferLen = Math.max(1, Math.floor(sampleRate * 0.04));
  const buffer = ctx.createBuffer(1, bufferLen, sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferLen; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;

  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 1350 + Math.random() * 350;
  filter.Q.value = 2.8;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.linearRampToValueAtTime(volume, t + 0.035);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + durationSec * 0.88);

  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  source.start(t);
  source.stop(t + durationSec + 0.02);

  activeSpinStop = () => {
    try {
      source.stop();
    } catch {
      /* already stopped */
    }
    activeSpinStop = null;
  };
}

/** THE LANDING — lower metallic clink with short ring-out. */
export function playCoinLandSound(volume = 0.26): void {
  stopCoinSpinSound();
  const ctx = getCoinFlipAudioContext();
  if (!ctx) return;
  const t = ctx.currentTime;
  playMetallicPartial(ctx, 780, t, 0.002, 0.26, volume * 0.48, "triangle");
  playMetallicPartial(ctx, 1180, t + 0.006, 0.003, 0.2, volume * 0.36, "sine");
  playMetallicPartial(ctx, 1760, t + 0.01, 0.002, 0.14, volume * 0.22, "triangle");
  playFilteredNoiseBurst(ctx, t + 0.004, 0.09, volume * 0.16, 2100, 4.5);
}

/** Edge landing — wobble/rattle distinct from flat landing. */
export function playCoinEdgeLandSound(volume = 0.24): void {
  stopCoinSpinSound();
  const ctx = getCoinFlipAudioContext();
  if (!ctx) return;
  const t = ctx.currentTime;
  for (let i = 0; i < 4; i++) {
    const offset = i * 0.052;
    playMetallicPartial(
      ctx,
      560 + i * 70,
      t + offset,
      0.002,
      0.085,
      volume * (0.34 - i * 0.05),
      "square",
    );
    playFilteredNoiseBurst(ctx, t + offset, 0.045, volume * 0.1, 880 + i * 180, 3.2);
  }
}

/** One short batch sequence for multi-flip — not once per flip. */
export function playCoinBatchSound(volume = 0.2): void {
  const ctx = getCoinFlipAudioContext();
  if (!ctx) return;
  playCoinFlickSound(volume * 0.88);
  playCoinSpinSound(680, volume * 0.45);
  window.setTimeout(() => playCoinLandSound(volume * 0.72), 540);
  window.setTimeout(() => playCoinLandSound(volume * 0.38), 760);
}

/** @deprecated Use playCoinFlickSound + playCoinSpinSound */
export function playCoinTossSound(volume = 0.22): void {
  playCoinFlickSound(volume);
}
