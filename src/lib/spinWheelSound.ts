/** Shared Web Audio for the main spin wheel — singleton context, tracked sources, lifecycle cleanup. */

let audioCtx: AudioContext | null = null;
let tickBuffer: AudioBuffer | null = null;
let warmedUp = false;
let lifecycleRegistered = false;

const activeStops = new Set<() => void>();

function registerLifecycleCleanup(): void {
  if (lifecycleRegistered || typeof window === "undefined") return;
  lifecycleRegistered = true;
  const onPageExit = () => {
    stopAllSpinWheelSounds(true);
  };
  window.addEventListener("pagehide", onPageExit);
  window.addEventListener("beforeunload", onPageExit);
}

export function getSpinWheelAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const Ctor = window.AudioContext || window.webkitAudioContext;
    if (!Ctor) return null;
    audioCtx = new Ctor();
    registerLifecycleCleanup();
  }
  if (audioCtx.state === "suspended") {
    void audioCtx.resume();
  }
  return audioCtx;
}

function trackSource(stop: () => void): void {
  activeStops.add(stop);
}

function untrackSource(stop: () => void): void {
  activeStops.delete(stop);
}

/** Stop every active wheel sound and optionally suspend the shared context. */
export function stopAllSpinWheelSounds(suspend = false): void {
  for (const stop of activeStops) {
    try {
      stop();
    } catch {
      /* already stopped */
    }
  }
  activeStops.clear();
  if (suspend && audioCtx && audioCtx.state !== "closed") {
    void audioCtx.suspend();
  }
}

const ensureTickBuffer = (ctx: AudioContext) => {
  if (tickBuffer && tickBuffer.sampleRate === ctx.sampleRate) return tickBuffer;
  const len = Math.floor(ctx.sampleRate * 0.012);
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) {
    const t = i / ctx.sampleRate;
    const env = Math.exp(-t * 500);
    d[i] =
      env *
      (Math.sin(2 * Math.PI * 3200 * t) * 0.6 +
        Math.sin(2 * Math.PI * 1200 * t) * 0.4);
  }
  tickBuffer = buf;
  return buf;
};

function playTrackedOscillator(
  ctx: AudioContext,
  setup: (
    osc: OscillatorNode,
    gain: GainNode,
    now: number,
  ) => { startAt: number; stopAt: number },
): void {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  const now = ctx.currentTime;
  const { startAt, stopAt } = setup(osc, gain, now);
  const stop = () => {
    try {
      osc.stop();
    } catch {
      /* already stopped */
    }
    untrackSource(stop);
  };
  trackSource(stop);
  osc.onended = () => untrackSource(stop);
  osc.start(startAt);
  osc.stop(stopAt);
}

export function warmUpSpinWheelAudio(): void {
  if (warmedUp) return;
  warmedUp = true;
  const ctx = getSpinWheelAudioContext();
  if (!ctx) return;
  ensureTickBuffer(ctx);
  const g = ctx.createGain();
  g.gain.value = 0;
  g.connect(ctx.destination);
  const o = ctx.createOscillator();
  o.connect(g);
  o.start();
  o.stop(ctx.currentTime + 0.01);
}

export function playSpinWheelTick(volume = 0.5): void {
  const ctx = getSpinWheelAudioContext();
  if (!ctx) return;
  const buf = ensureTickBuffer(ctx);
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const gain = ctx.createGain();
  gain.gain.value = Math.min(1, Math.max(0.1, volume));
  src.connect(gain);
  gain.connect(ctx.destination);
  const stop = () => {
    try {
      src.stop();
    } catch {
      /* already stopped */
    }
    untrackSource(stop);
  };
  trackSource(stop);
  src.onended = () => untrackSource(stop);
  src.start(0);
}

export function playSpinWheelWinSound(): void {
  const ctx = getSpinWheelAudioContext();
  if (!ctx) return;
  stopAllSpinWheelSounds();
  const melody = [523.25, 659.25, 783.99, 1046.5];
  melody.forEach((freq, i) => {
    (["triangle", "sine"] as OscillatorType[]).forEach((type) => {
      playTrackedOscillator(ctx, (osc, gain, t0) => {
        osc.type = type;
        osc.frequency.value = freq;
        const t = t0 + i * 0.08;
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(type === "triangle" ? 0.18 : 0.1, t + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
        return { startAt: t, stopAt: t + 0.6 };
      });
    });
  });
  [1318.5, 1568, 2093].forEach((freq) => {
    playTrackedOscillator(ctx, (osc, gain, t0) => {
      osc.type = "sine";
      osc.frequency.value = freq;
      const t = t0 + 0.35;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.12, t + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 1.2);
      return { startAt: t, stopAt: t + 1.2 };
    });
  });
}

export function playSpinWheelClickSound(): void {
  const ctx = getSpinWheelAudioContext();
  if (!ctx) return;
  playTrackedOscillator(ctx, (osc, gain, now) => {
    osc.type = "sine";
    osc.frequency.value = 800;
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    return { startAt: now, stopAt: now + 0.1 };
  });
}

export function playSpinWheelSliderSound(value: number, minSec: number, maxSec: number): void {
  const ctx = getSpinWheelAudioContext();
  if (!ctx) return;
  stopAllSpinWheelSounds();

  const now = ctx.currentTime;
  const normalized = (value - minSec) / (maxSec - minSec);
  const startFreq = 420 + normalized * 320;
  const endFreq = startFreq + 95;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  osc.type = "sine";
  osc.frequency.setValueAtTime(startFreq, now);
  osc.frequency.exponentialRampToValueAtTime(endFreq, now + 0.11);

  filter.type = "lowpass";
  filter.frequency.setValueAtTime(1900, now);
  filter.Q.value = 0.7;

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.linearRampToValueAtTime(0.09, now + 0.018);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.13);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  const stop = () => {
    try {
      osc.stop();
    } catch {
      /* already stopped */
    }
    untrackSource(stop);
  };
  trackSource(stop);
  osc.onended = () => untrackSource(stop);
  osc.start(now);
  osc.stop(now + 0.14);
}
