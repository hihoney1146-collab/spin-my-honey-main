const SOUND_MUTED_KEY = "coin-flip-sound-muted";

let audioCtx: AudioContext | null = null;

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

function playTone(
  ctx: AudioContext,
  frequency: number,
  duration: number,
  volume: number,
  type: OscillatorType = "triangle",
) {
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(frequency, now);
  gain.gain.setValueAtTime(volume, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + duration + 0.02);
}

function playNoiseBurst(ctx: AudioContext, duration: number, volume: number) {
  const sampleRate = ctx.sampleRate;
  const length = Math.floor(sampleRate * duration);
  const buffer = ctx.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / length);
  }
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 2800;
  filter.Q.value = 0.8;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(volume, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  source.start();
}

/** Metallic toss/spin during the flip animation. */
export function playCoinTossSound(volume = 0.28): void {
  const ctx = getCoinFlipAudioContext();
  if (!ctx) return;
  playNoiseBurst(ctx, 0.18, volume * 0.55);
  playTone(ctx, 920, 0.22, volume * 0.35, "sine");
  playTone(ctx, 640, 0.16, volume * 0.2, "triangle");
}

/** Distinct landing clink when the coin settles. */
export function playCoinLandSound(volume = 0.32): void {
  const ctx = getCoinFlipAudioContext();
  if (!ctx) return;
  playTone(ctx, 180, 0.08, volume * 0.5, "square");
  playTone(ctx, 420, 0.12, volume * 0.35, "triangle");
  playNoiseBurst(ctx, 0.06, volume * 0.25);
}

/** One short sequence for multi-flip batches (not once per flip). */
export function playCoinBatchSound(volume = 0.26): void {
  const ctx = getCoinFlipAudioContext();
  if (!ctx) return;
  playCoinTossSound(volume * 0.85);
  window.setTimeout(() => playCoinLandSound(volume * 0.9), 280);
  window.setTimeout(() => playCoinLandSound(volume * 0.55), 520);
}
