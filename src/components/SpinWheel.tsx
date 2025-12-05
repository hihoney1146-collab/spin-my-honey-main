import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Plus,
  Trash2,
  Play,
  Shuffle,
  ArrowUpDown,
  Check,
  Minus,
  RotateCcw,
  PartyPopper,
  X,
  Image as ImageIcon,
} from "lucide-react";
import confetti from "canvas-confetti";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface WheelEntry {
  id: string;
  text: string;
  color: string;
  active: boolean;
  imageUrl?: string;
}

const defaultColors = [
  "#e74c3c", // Red
  "#e67e22", // Orange
  "#f39c12", // Yellow
  "#2ecc71", // Green
  "#1abc9c", // Cyan
  "#3498db", // Blue
  "#9b59b6", // Purple
  "#e91e63", // Pink
];

// Sound synthesis helper functions
const createTickSound = (ctx: AudioContext) => {
  // WheelOfNames style "Tick" (Filtered Noise + High Resonance)
  const bufferSize = ctx.sampleRate * 0.05; // 50ms buffer
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  // Generate white noise
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const noiseFilter = ctx.createBiquadFilter();
  noiseFilter.type = 'lowpass';
  noiseFilter.frequency.value = 1000;
  noiseFilter.Q.value = 5; // Higher resonance for "wood/plastic" tone

  const noiseGain = ctx.createGain();

  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(ctx.destination);

  const now = ctx.currentTime;

  // Sharp, short envelope
  noiseGain.gain.setValueAtTime(0.8, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

  noise.start(now);
};

const createWinSound = (ctx: AudioContext) => {
  // Victory Fanfare (WheelOfNames style)
  const now = ctx.currentTime;

  // Bright, celebratory chord (C Major Add9)
  const notes = [523.25, 659.25, 783.99, 1046.50, 1174.66, 1567.98]; // C5, E5, G5, C6, D6, G6

  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle'; // Brighter than sine
    osc.frequency.value = freq;

    osc.connect(gain);
    gain.connect(ctx.destination);

    // Staggered entry
    const startTime = now + (i * 0.05);
    const duration = 2.0;

    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.2, startTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.1);
  });
};

const createClickSound = (ctx: AudioContext) => {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.value = 800;

  osc.connect(gain);
  gain.connect(ctx.destination);

  const now = ctx.currentTime;
  gain.gain.setValueAtTime(0.1, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

  osc.start(now);
  osc.stop(now + 0.1);
};

export const SpinWheel = () => {
  const [entries, setEntries] = useState<WheelEntry[]>(() => {
    // Load from localStorage or use defaults
    const saved = localStorage.getItem("spinWheelEntries");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure all entries have active property
        return parsed.map((entry: any) => ({
          ...entry,
          active: entry.active !== undefined ? entry.active : true,
        }));
      } catch (e) {
        console.error("Failed to parse saved entries:", e);
      }
    }
    return [
      { id: "1", text: "Jahangir", color: defaultColors[0], active: true },
      { id: "2", text: "Adam", color: defaultColors[1], active: true },
      { id: "3", text: "Jacob", color: defaultColors[2], active: true },
      { id: "4", text: "Abdal", color: defaultColors[3], active: true },
      { id: "5", text: "Mudabber", color: defaultColors[4], active: true },
      { id: "6", text: "Gabriel", color: defaultColors[5], active: true },
      { id: "7", text: "Hanna", color: defaultColors[6], active: true },
    ];
  });

  const [newEntry, setNewEntry] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winner, setWinner] = useState<string | null>(null);
  const [showWinnerDialog, setShowWinnerDialog] = useState(false);
  const [winnerColor, setWinnerColor] = useState<string>("");
  const [winnerId, setWinnerId] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loadedImages, setLoadedImages] = useState<
    Map<string, HTMLImageElement>
  >(new Map());
  const continuousSpinRef = useRef<number | null>(null);
  const spinAnimationRef = useRef<number | null>(null);
  const rotationRef = useRef<number>(rotation);
  const entriesRef = useRef<WheelEntry[]>(entries);
  const loadedImagesRef = useRef<Map<string, HTMLImageElement>>(loadedImages);

  // Audio refs - rhythmic spinning background + tick accents + applause
  const rhythmAudioRef = useRef<HTMLAudioElement | null>(null);
  const tickAudioPoolRef = useRef<HTMLAudioElement[]>([]);
  const tickPoolIndexRef = useRef<number>(0);
  const winAudioRef = useRef<HTMLAudioElement | null>(null);
  const clickAudioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const lastTickTimeRef = useRef<number>(0);

  // Initialize audio on component mount
  useEffect(() => {
    // Continuous rhythmic spinning background sound
    const rhythmAudio = new Audio('/sounds/spin_rhythm.mp3');
    rhythmAudio.volume = 0.5;
    rhythmAudio.loop = true;
    rhythmAudio.preload = 'auto';
    rhythmAudioRef.current = rhythmAudio;

    // Create pool of tick sounds for subtle segment accents
    const tickPool: HTMLAudioElement[] = [];
    for (let i = 0; i < 10; i++) {
      const audio = new Audio('/sounds/tick.mp3');
      audio.volume = 0.15; // Softer ticks over rhythmic background
      audio.preload = 'auto';
      tickPool.push(audio);
    }
    tickAudioPoolRef.current = tickPool;

    // Win sound (applause/clapping)
    const winAudio = new Audio('/sounds/win.mp3');
    winAudio.volume = 0.7;
    winAudio.preload = 'auto';
    winAudioRef.current = winAudio;

    // Click sound for UI interactions
    const clickAudio = new Audio();
    clickAudio.volume = 0.2;
    clickAudioRef.current = clickAudio;

    // Initialize Web Audio context for fallback
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioContextRef.current = new AudioContextClass();
    }

    return () => {
      rhythmAudio.pause();
      winAudio.pause();
    };
  }, []);

  const startRhythmSound = () => {
    const rhythmAudio = rhythmAudioRef.current;
    if (rhythmAudio) {
      rhythmAudio.currentTime = 0;
      rhythmAudio.play().catch(() => {});
    }
  };

  const stopRhythmSound = () => {
    const rhythmAudio = rhythmAudioRef.current;
    if (rhythmAudio) {
      // Smooth fade out over 800ms
      const fadeInterval = setInterval(() => {
        if (rhythmAudio.volume > 0.05) {
          rhythmAudio.volume = Math.max(0, rhythmAudio.volume - 0.05);
        } else {
          rhythmAudio.pause();
          rhythmAudio.volume = 0.5; // Reset for next spin
          clearInterval(fadeInterval);
        }
      }, 80);
    }
  };

  const playTickSound = (speedMultiplier: number = 1.0) => {
    const now = Date.now();
    // Rate limiting: minimum 60ms between ticks (softer, more spaced)
    if (now - lastTickTimeRef.current < 60) return;
    lastTickTimeRef.current = now;

    const tickAudio = tickAudioPoolRef.current[tickPoolIndexRef.current];
    if (tickAudio) {
      tickAudio.currentTime = 0;
      tickAudio.playbackRate = Math.max(0.7, Math.min(1.5, speedMultiplier));
      tickAudio.play().catch(() => {});
      tickPoolIndexRef.current = (tickPoolIndexRef.current + 1) % tickAudioPoolRef.current.length;
    }
  };

  const playSoundEffect = (type: 'rhythm_start' | 'rhythm_stop' | 'tick' | 'win' | 'click', speedMultiplier?: number) => {
    try {
      switch (type) {
        case 'rhythm_start':
          startRhythmSound();
          break;
        case 'rhythm_stop':
          stopRhythmSound();
          break;
        case 'tick':
          playTickSound(speedMultiplier ?? 1.0);
          break;
        case 'win':
          playWinSound();
          break;
        case 'click':
          playClickSound();
          break;
      }
    } catch (e) {
      console.warn('Audio playback error:', e);
    }
  };

  const playWinSound = () => {
    const winAudio = winAudioRef.current;
    if (winAudio) {
      winAudio.currentTime = 0;
      winAudio.play().catch(() => {
        // Fallback to synthesis
        const ctx = audioContextRef.current;
        if (ctx) {
          if (ctx.state === 'suspended') ctx.resume();
          createWinSound(ctx);
        }
      });
    }
  };

  const playClickSound = () => {
    const ctx = audioContextRef.current;
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();
    createClickSound(ctx);
  };

  // Save entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("spinWheelEntries", JSON.stringify(entries));
    entriesRef.current = entries;
  }, [entries]);

  // Update refs whenever state changes
  useEffect(() => {
    rotationRef.current = rotation;
  }, [rotation]);

  useEffect(() => {
    loadedImagesRef.current = loadedImages;
  }, [loadedImages]);

  // Draw wheel when entries, rotation, or loadedImages change (only when not animating)
  useEffect(() => {
    // Only draw if not in an active animation loop (animations handle their own drawing)
    if (!continuousSpinRef.current && !spinAnimationRef.current) {
      drawWheel();
    }
  }, [entries, rotation, loadedImages]);

  // Continuous slow spinning when not actively spinning
  useEffect(() => {
    const activeEntries = entries.filter((entry) => entry.active);

    // Stop continuous spin if spinning or not enough entries
    if (isSpinning || activeEntries.length < 2) {
      if (continuousSpinRef.current !== null) {
        cancelAnimationFrame(continuousSpinRef.current);
        continuousSpinRef.current = null;
      }
      // Update state when stopping animation
      if (!isSpinning && activeEntries.length >= 2) {
        setRotation(rotationRef.current);
      }
      return;
    }

    // Start continuous slow spin - 0.15 degrees per frame at ~60fps = ~9 degrees/second
    let animationRotation = rotationRef.current;

    const continuousSpin = () => {
      // Check if we should continue using refs (avoid closure issues)
      const shouldContinue = !isSpinning &&
        canvasRef.current &&
        entriesRef.current.filter((e) => e.active).length >= 2;

      if (!shouldContinue) {
        continuousSpinRef.current = null;
        // Sync state when stopping
        setRotation(rotationRef.current);
        return;
      }

      // Update rotation - smooth increment for continuous spin
      animationRotation = (animationRotation + 0.15) % 360;
      rotationRef.current = animationRotation;

      // Draw wheel directly with current rotation - NO state update during animation!
      // This ensures 60fps smooth animation without React re-renders
      drawWheel(animationRotation);

      // Schedule next frame immediately
      continuousSpinRef.current = requestAnimationFrame(continuousSpin);
    };

    // Start the animation loop immediately
    continuousSpinRef.current = requestAnimationFrame(continuousSpin);

    return () => {
      if (continuousSpinRef.current !== null) {
        cancelAnimationFrame(continuousSpinRef.current);
        continuousSpinRef.current = null;
        // Sync state when cleanup
        setRotation(rotationRef.current);
      }
    };
  }, [isSpinning, entries]);

  // Preload images when entries change
  useEffect(() => {
    const newImages = new Map<string, HTMLImageElement>();
    let loadedCount = 0;
    const entriesToLoad = entries.filter((e) => e.imageUrl);

    if (entriesToLoad.length === 0) {
      setLoadedImages(newImages);
      return;
    }

    entriesToLoad.forEach((entry) => {
      if (entry.imageUrl) {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          newImages.set(entry.id, img);
          loadedCount++;
          if (loadedCount === entriesToLoad.length) {
            setLoadedImages(new Map(newImages));
          }
        };
        img.onerror = () => {
          loadedCount++;
          if (loadedCount === entriesToLoad.length) {
            setLoadedImages(new Map(newImages));
          }
        };
        img.src = entry.imageUrl;
      }
    });
  }, [entries.map((e) => e.id + e.imageUrl).join(",")]);

  const drawWheel = (customRotation?: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    // Reduce radius slightly to make room for the rim
    const radius = Math.min(centerX, centerY) - 25;

    const currentRotation = customRotation !== undefined ? customRotation : rotation;
    const currentEntries = customRotation !== undefined ? entriesRef.current : entries;
    const currentLoadedImages = customRotation !== undefined ? loadedImagesRef.current : loadedImages;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Outer Rim (Metallic/Gradient effect)
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 15, 0, 2 * Math.PI);
    const rimGradient = ctx.createLinearGradient(centerX - radius, centerY - radius, centerX + radius, centerY + radius);
    rimGradient.addColorStop(0, "#e2e8f0");
    rimGradient.addColorStop(0.5, "#94a3b8");
    rimGradient.addColorStop(1, "#e2e8f0");
    ctx.fillStyle = rimGradient;
    ctx.fill();

    // Inner rim shadow
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 2, 0, 2 * Math.PI);
    ctx.fillStyle = "rgba(0,0,0,0.1)";
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((currentRotation * Math.PI) / 180);

    const activeEntries = currentEntries.filter((entry) => entry.active);
    if (activeEntries.length === 0) {
      ctx.restore();
      // Empty state wheel
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fillStyle = "#f8fafc";
      ctx.fill();
      ctx.lineWidth = 4;
      ctx.strokeStyle = "#cbd5e1";
      ctx.stroke();
      return;
    }

    const sliceAngle = (2 * Math.PI) / activeEntries.length;

    activeEntries.forEach((entry, index) => {
      const startAngle = index * sliceAngle;
      const endAngle = startAngle + sliceAngle;

      // Draw slice
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, startAngle, endAngle);
      ctx.closePath();

      // Slice Gradient (3D effect)
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
      gradient.addColorStop(0, entry.color);
      gradient.addColorStop(1, adjustColorBrightness(entry.color, -20)); // Darker at edges
      ctx.fillStyle = gradient;
      ctx.fill();

      // Image handling
      const img = entry.imageUrl ? currentLoadedImages.get(entry.id) : null;
      if (img) {
        ctx.save();
        ctx.clip();

        const sliceCenterAngle = startAngle + sliceAngle / 2;
        const innerRadius = 45;
        const outerRadius = radius;
        const sliceWidth = outerRadius - innerRadius;
        const arcLength = sliceAngle * outerRadius;

        const imgCenterDistance = innerRadius + sliceWidth / 2;
        const imgCenterX = Math.cos(sliceCenterAngle) * imgCenterDistance;
        const imgCenterY = Math.sin(sliceCenterAngle) * imgCenterDistance;

        const imgAspect = img.width / img.height;
        const sliceAspect = arcLength / sliceWidth;
        let drawWidth, drawHeight;

        if (imgAspect > sliceAspect) {
          drawHeight = sliceWidth * 1.4;
          drawWidth = drawHeight * imgAspect;
        } else {
          drawWidth = arcLength * 1.4;
          drawHeight = drawWidth / imgAspect;
        }

        ctx.translate(imgCenterX, imgCenterY);
        ctx.rotate(Math.PI);
        ctx.translate(-imgCenterX, -imgCenterY);

        const imgX = imgCenterX - drawWidth / 2;
        const imgY = imgCenterY - drawHeight / 2;

        ctx.globalAlpha = 0.9;
        ctx.drawImage(img, imgX, imgY, drawWidth, drawHeight);
        ctx.restore();
      }

      // Slice borders
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, startAngle, endAngle);
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
      ctx.stroke();

      // Text
      ctx.save();
      ctx.rotate(startAngle + sliceAngle / 2);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "bold 15px 'Inter', sans-serif";

      const textX = radius * 0.7;

      // Text Shadow
      ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;

      ctx.fillStyle = "#ffffff";
      ctx.fillText(entry.text, textX, 0);
      ctx.restore();
    });

    // Center Hub (3D Button look)
    ctx.beginPath();
    ctx.arc(0, 0, 30, 0, 2 * Math.PI);
    const hubGradient = ctx.createRadialGradient(0, -10, 0, 0, 0, 30);
    hubGradient.addColorStop(0, "#ffffff");
    hubGradient.addColorStop(1, "#e2e8f0");
    ctx.fillStyle = hubGradient;
    ctx.shadowColor = "rgba(0,0,0,0.2)";
    ctx.shadowBlur = 10;
    ctx.fill();

    // Inner Hub Ring
    ctx.beginPath();
    ctx.arc(0, 0, 25, 0, 2 * Math.PI);
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 1;
    ctx.stroke();

    // "SPIN" Text
    ctx.save();
    ctx.rotate((rotation * 0.3 * Math.PI) / 180);
    ctx.fillStyle = "#475569";
    ctx.font = "800 12px 'Inter', sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = "transparent";
    ctx.fillText("SPIN", 0, 0);
    ctx.restore();

    ctx.restore();

    // Pointer (Floating effect)
    const pointerX = centerX + radius + 18;
    const pointerY = centerY;

    ctx.save();
    // Pointer Shadow
    ctx.beginPath();
    ctx.moveTo(pointerX + 2, pointerY + 2);
    ctx.lineTo(pointerX + 26, pointerY - 16);
    ctx.lineTo(pointerX + 26, pointerY + 20);
    ctx.closePath();
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.fill();

    // Pointer Body
    ctx.beginPath();
    ctx.moveTo(pointerX, pointerY);
    ctx.lineTo(pointerX + 24, pointerY - 18);
    ctx.lineTo(pointerX + 24, pointerY + 18);
    ctx.closePath();
    const pointerGradient = ctx.createLinearGradient(pointerX, pointerY - 18, pointerX + 24, pointerY + 18);
    pointerGradient.addColorStop(0, "#ef4444");
    pointerGradient.addColorStop(1, "#dc2626");
    ctx.fillStyle = pointerGradient;
    ctx.fill();

    // Pointer Highlight
    ctx.beginPath();
    ctx.moveTo(pointerX + 24, pointerY - 18);
    ctx.lineTo(pointerX + 24, pointerY + 18);
    ctx.strokeStyle = "rgba(255,255,255,0.4)";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Pointer Hub
    ctx.beginPath();
    ctx.arc(pointerX + 20, pointerY, 6, 0, 2 * Math.PI);
    ctx.fillStyle = "#f1f5f9";
    ctx.fill();
    ctx.restore();
  };

  // Helper to darken colors for gradient
  const adjustColorBrightness = (hex: string, percent: number) => {
    let num = parseInt(hex.replace("#", ""), 16),
      amt = Math.round(2.55 * percent),
      R = (num >> 16) + amt,
      B = ((num >> 8) & 0x00ff) + amt,
      G = (num & 0x0000ff) + amt;
    return (
      "#" +
      (
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (B < 255 ? (B < 1 ? 0 : B) : 255) * 0x100 +
        (G < 255 ? (G < 1 ? 0 : G) : 255)
      )
        .toString(16)
        .slice(1)
    );
  };

  const addEntry = () => {
    if (newEntry.trim()) {
      const colorIndex = entries.length % defaultColors.length;
      setEntries([
        ...entries,
        {
          id: Date.now().toString(),
          text: newEntry.trim(),
          color: defaultColors[colorIndex],
          active: true,
        },
      ]);
      setNewEntry("");
      playSoundEffect("click");
      toast.success("Entry added!");

      // Track customization
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'wheel_customized', {
          'event_category': 'engagement',
          'event_label': 'added_option'
        });
      }
    }
  };

  const removeEntry = (id: string) => {
    if (entries.length > 2) {
      setEntries(entries.filter((entry) => entry.id !== id));
      playSoundEffect("click");
      toast.success("Entry removed!");
    } else {
      toast.error("You need at least 2 entries!");
    }
  };

  const updateEntry = (id: string, text: string) => {
    setEntries(
      entries.map((entry) => (entry.id === id ? { ...entry, text } : entry))
    );
  };

  const updateEntryColor = (id: string, color: string) => {
    setEntries(
      entries.map((entry) => (entry.id === id ? { ...entry, color } : entry))
    );
    playSoundEffect("click");
  };

  const updateEntryImage = (id: string, imageUrl: string) => {
    setEntries(
      entries.map((entry) =>
        entry.id === id ? { ...entry, imageUrl: imageUrl || undefined } : entry
      )
    );
    playSoundEffect("click");
  };

  const toggleEntry = (id: string) => {
    setEntries(
      entries.map((entry) =>
        entry.id === id ? { ...entry, active: !entry.active } : entry
      )
    );
    playSoundEffect("click");
  };

  const shuffleEntries = () => {
    const shuffled = [...entries].sort(() => Math.random() - 0.5);
    setEntries(shuffled);
    playSoundEffect("click");
    toast.success("Entries shuffled!");
  };

  const sortEntries = () => {
    const sorted = [...entries].sort((a, b) => a.text.localeCompare(b.text));
    setEntries(sorted);
    playSoundEffect("click");
    toast.success("Entries sorted alphabetically!");
  };

  const resetEntries = () => {
    const reset = [
      { id: "1", text: "Jahangir", color: defaultColors[0], active: true },
      { id: "2", text: "Adam", color: defaultColors[1], active: true },
      { id: "3", text: "Jacob", color: defaultColors[2], active: true },
      { id: "4", text: "Abdal", color: defaultColors[3], active: true },
      { id: "5", text: "Mudabber", color: defaultColors[4], active: true },
      { id: "6", text: "Gabriel", color: defaultColors[5], active: true },
      { id: "7", text: "Hanna", color: defaultColors[6], active: true },
    ];
    setEntries(reset);
    playSoundEffect("click");
    toast.success("Entries reset to defaults!");
  };

  const removeWinner = () => {
    if (winnerId && entries.length > 2) {
      setEntries(entries.filter((entry) => entry.id !== winnerId));
      playSoundEffect("click");
      toast.success(`${winner} removed from the wheel!`);
      setShowWinnerDialog(false);
      setWinner(null);
      setWinnerId("");
      setWinnerColor("");
    } else if (entries.length <= 2) {
      toast.error("Cannot remove - at least 2 entries are required!");
    }
  };

  const spinWheel = () => {
    const activeEntries = entries.filter((entry) => entry.active);
    if (isSpinning || activeEntries.length < 2) return;

    // Stop continuous spin
    if (continuousSpinRef.current !== null) {
      cancelAnimationFrame(continuousSpinRef.current);
      continuousSpinRef.current = null;
    }

    // CRITICAL: Set state immediately to prevent double clicks
    setIsSpinning(true);
    setWinner(null);

    // Track spin event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'wheel_spin', {
        'event_category': 'engagement',
        'event_label': 'user_spun_wheel'
      });
    }

    // High speed, long duration spin for realistic physics
    // 40-60 full rotations (very fast start)
    const spins = 40 + Math.random() * 20;
    const extraDegrees = Math.random() * 360;
    const totalRotation = spins * 360 + extraDegrees;

    // Get current rotation at start
    const startRotation = rotationRef.current;
    // Long duration: 10-14 seconds
    const duration = 10000 + Math.random() * 4000;
    const startTime = Date.now();

    const sliceAngle = 360 / activeEntries.length;
    let lastSegmentIndex = -1;
    let lastRotation = startRotation;

    // Physics-based easing with realistic deceleration
    const easeOutQuart = (t: number): number => {
      return 1 - Math.pow(1 - t, 4);
    };

    // Helper to calculate current segment under the pointer
    const getCurrentSegment = (rot: number): number => {
      const pointerAngle = 0;
      const adjustedAngle = (360 - rot + pointerAngle) % 360;
      return Math.floor(adjustedAngle / sliceAngle) % activeEntries.length;
    };

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth deceleration using Quartic easing
      const easedProgress = easeOutQuart(progress);

      const newRotation = (startRotation + totalRotation * easedProgress) % 360;
      
      // Calculate wheel speed (degrees per frame) for tick sound speed matching
      const rotationDelta = Math.abs(newRotation - lastRotation);
      const speedMultiplier = Math.min(2.0, Math.max(0.8, rotationDelta * 8)); // Map rotation speed to playback rate
      
      rotationRef.current = newRotation;

      // Check for segment change and play tick sound
      const currentSegment = getCurrentSegment(newRotation);
      if (currentSegment !== lastSegmentIndex) {
        playSoundEffect("tick", speedMultiplier);
        lastSegmentIndex = currentSegment;
      }

      lastRotation = newRotation;
      drawWheel(newRotation);

      if (progress < 1) {
        spinAnimationRef.current = requestAnimationFrame(animate);
      } else {
        // Animation complete
        const finalRotation = newRotation % 360;
        const winningIndex = getCurrentSegment(finalRotation);
        const winningEntry = activeEntries[winningIndex];

        // Only update state at the very end
        setRotation(finalRotation);
        setWinner(winningEntry.text);
        setWinnerColor(winningEntry.color);
        setWinnerId(winningEntry.id);
        setIsSpinning(false);
        spinAnimationRef.current = null;

        setTimeout(() => {
          playSoundEffect("win");
          setShowWinnerDialog(true);

          // Left side party popper
          confetti({
            particleCount: 100,
            spread: 60,
            origin: { x: 0.2, y: 0.6 },
            angle: 60,
            colors: ["#ff6b6b", "#feca57", "#48dbfb", "#ff9ff3", "#54a0ff"],
          });

          // Right side party popper
          confetti({
            particleCount: 100,
            spread: 60,
            origin: { x: 0.8, y: 0.6 },
            angle: 120,
            colors: ["#ff6b6b", "#feca57", "#48dbfb", "#ff9ff3", "#54a0ff"],
          });

          // Center burst
          setTimeout(() => {
            confetti({
              particleCount: 150,
              spread: 100,
              origin: { y: 0.5 },
              colors: ["#ff6b6b", "#feca57", "#48dbfb", "#ff9ff3", "#54a0ff"],
            });
          }, 200);
        }, 300);
      }
    };

    spinAnimationRef.current = requestAnimationFrame(animate);
  };

  const activeEntries = entries.filter((entry) => entry.active);

  return (
    <>
      {/* Wheel Section - Centered */}
      <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 w-full px-4 sm:px-6 lg:px-8 lg:pl-6 lg:pr-[300px] xl:pr-[340px] 2xl:pr-[360px]">
        {/* Wheel Card */}
        <div className="w-full max-w-[340px] xs:max-w-[380px] sm:max-w-[440px] md:max-w-[500px] lg:max-w-[520px] xl:max-w-[560px] 2xl:max-w-[600px] mx-auto relative group">
          <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-primary/20 via-primary/5 to-transparent blur-3xl opacity-50 transition-opacity duration-500 group-hover:opacity-70 pointer-events-none" />
          <canvas
            ref={canvasRef}
            width={480}
            height={480}
            onClick={spinWheel}
            className={`w-full h-auto block rounded-full shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] transition-all duration-500 touch-manipulation ${isSpinning || activeEntries.length < 2
              ? "cursor-not-allowed opacity-80 grayscale-[0.2]"
              : "cursor-pointer hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)]"
              }`}
          />
        </div>

        {/* Spin Button */}
        <div className="w-full max-w-[340px] xs:max-w-[380px] sm:max-w-[440px] md:max-w-[500px] lg:max-w-[520px] xl:max-w-[560px] 2xl:max-w-[600px] mx-auto space-y-2">
          <Button
            onClick={spinWheel}
            disabled={isSpinning || activeEntries.length < 2}
            size="lg"
            className="text-sm sm:text-base lg:text-lg font-bold px-6 sm:px-8 lg:px-10 py-3 sm:py-4 h-auto bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground w-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none rounded-xl border-t border-white/20 relative overflow-hidden group touch-manipulation tracking-wide"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
            {isSpinning ? (
              <>
                <div className="animate-spin mr-2.5 h-4 w-4 sm:h-5 sm:w-5 border-[3px] border-white/30 border-t-white rounded-full relative z-10" />
                <span className="relative z-10">Spinning...</span>
              </>
            ) : (
              <>
                <Play className="mr-2.5 h-4 w-4 sm:h-5 sm:w-5 fill-current relative z-10" />
                <span className="relative z-10">SPIN THE WHEEL</span>
              </>
            )}
          </Button>

          {activeEntries.length < 2 && (
            <div className="flex items-center justify-center gap-2 text-destructive">
              <div className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" />
              <p className="text-xs font-medium">
                Add at least 2 active entries to spin
              </p>
            </div>
          )}
        </div>

        {/* Winner Display */}
        {winner && (
          <Card
            className="p-3 sm:p-4 lg:p-5 w-full max-w-[340px] xs:max-w-[380px] sm:max-w-[440px] md:max-w-[500px] lg:max-w-[520px] xl:max-w-[560px] 2xl:max-w-[600px] mx-auto border-2 shadow-2xl animate-in fade-in zoom-in duration-500 relative overflow-hidden backdrop-blur-sm"
            style={{
              backgroundColor: `${winnerColor}10`,
              borderColor: winnerColor,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div
                  className="w-2 h-2 rounded-full animate-pulse shadow-lg"
                  style={{
                    backgroundColor: winnerColor,
                    boxShadow: `0 0 10px ${winnerColor}`,
                  }}
                />
                <h3
                  className="text-sm sm:text-base lg:text-lg font-bold text-center tracking-wide"
                  style={{ color: winnerColor }}
                >
                  🎉 WINNER 🎉
                </h3>
                <div
                  className="w-2 h-2 rounded-full animate-pulse shadow-lg"
                  style={{
                    backgroundColor: winnerColor,
                    boxShadow: `0 0 10px ${winnerColor}`,
                  }}
                />
              </div>
              <p
                className="text-lg sm:text-xl lg:text-2xl font-extrabold text-center break-words"
                style={{ color: winnerColor }}
              >
                {winner}
              </p>
            </div>
          </Card>
        )}
      </div>

      {/* Controls Section - Right Sidebar */}
      <div className="w-full lg:w-[340px] xl:w-[400px] 2xl:w-[420px] px-4 lg:px-0 mt-8 lg:mt-0 lg:absolute lg:right-0 lg:top-0 lg:z-40">
        <Card className="p-4 lg:p-6 bg-card/95 border border-border/50 shadow-xl backdrop-blur-xl relative overflow-hidden w-full flex flex-col rounded-2xl h-[calc(100vh-2rem)] lg:h-auto lg:max-h-[calc(100vh-2rem)]">
          {/* Header */}
          <div className="mb-4 relative z-10">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-1 h-5 lg:h-6 bg-primary rounded-full shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
                <h2 className="text-base lg:text-lg font-bold text-foreground tracking-tight">
                  Manage Entries
                </h2>
              </div>
              <Badge
                variant="secondary"
                className="text-xs font-semibold px-2.5 py-0.5 bg-primary/10 text-primary border-0"
              >
                {activeEntries.length} Active
              </Badge>
            </div>
            <p className="text-[11px] text-muted-foreground ml-3.5 font-medium">
              Customize your wheel options below
            </p>
          </div>

          <Separator className="mb-3 lg:mb-4" />

          {/* Add New Entry */}
          <div className="mb-3 lg:mb-4 relative z-10">
            <label className="text-[10px] lg:text-[11px] font-bold text-foreground/80 mb-1.5 lg:mb-2 flex items-center gap-1.5 uppercase tracking-wide">
              <div className="w-1 h-1 rounded-full bg-primary" />
              Add New Entry
            </label>
            <div className="flex gap-2">
              <Input
                value={newEntry}
                onChange={(e) => setNewEntry(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addEntry()}
                placeholder="Enter name..."
                className="flex-1 h-9 lg:h-10 text-xs lg:text-sm border-2 border-border focus:border-primary bg-background/80 backdrop-blur-sm transition-all shadow-sm focus:shadow-md focus:ring-2 focus:ring-primary/20"
              />
              <Button
                onClick={addEntry}
                size="sm"
                className="px-3 lg:px-4 h-9 lg:h-10 bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all font-semibold text-primary-foreground"
              >
                <Plus className="h-3.5 w-3.5 lg:h-4 lg:w-4 mr-1" />
                <span className="text-xs lg:text-sm">Add</span>
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mb-3 lg:mb-4 relative z-10">
            <label className="text-[10px] lg:text-[11px] font-bold text-foreground/80 mb-1.5 lg:mb-2 flex items-center gap-1.5 uppercase tracking-wide">
              <div className="w-1 h-1 rounded-full bg-primary" />
              Quick Actions
            </label>
            <div className="grid grid-cols-3 gap-1.5 lg:gap-2">
              <Button
                onClick={shuffleEntries}
                disabled={isSpinning}
                variant="outline"
                size="sm"
                className="h-8 lg:h-9 text-[10px] lg:text-[11px] font-bold hover:bg-blue-50 hover:border-blue-500 hover:text-blue-600 transition-all border-2 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Shuffle className="h-3 w-3 lg:h-3.5 lg:w-3.5 mr-0.5 lg:mr-1" />
                Shuffle
              </Button>
              <Button
                onClick={sortEntries}
                disabled={isSpinning}
                variant="outline"
                size="sm"
                className="h-8 lg:h-9 text-[10px] lg:text-[11px] font-bold hover:bg-purple-50 hover:border-purple-500 hover:text-purple-600 transition-all border-2 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowUpDown className="h-3 w-3 lg:h-3.5 lg:w-3.5 mr-0.5 lg:mr-1" />
                Sort
              </Button>
              <Button
                onClick={resetEntries}
                disabled={isSpinning}
                variant="outline"
                size="sm"
                className="h-8 lg:h-9 text-[10px] lg:text-[11px] font-bold hover:bg-red-50 hover:border-red-500 hover:text-red-600 transition-all border-2 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RotateCcw className="h-3 w-3 lg:h-3.5 lg:w-3.5 mr-0.5 lg:mr-1" />
                Reset
              </Button>
            </div>
          </div>

          <Separator className="mb-3 lg:mb-4" />

          {/* Entries List */}
          <div className="relative z-10 flex-1 flex flex-col min-h-0">
            <label className="text-[10px] lg:text-[11px] font-bold text-foreground/80 mb-1.5 lg:mb-2 flex items-center justify-between uppercase tracking-wide">
              <span className="flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-primary" />
                Entries List
              </span>
              <span className="text-muted-foreground font-bold text-[9px] lg:text-[10px] bg-muted px-1.5 lg:px-2 py-0.5 rounded-full">
                {entries.length} Total
              </span>
            </label>
            <div className="space-y-2 overflow-y-auto pr-1 lg:pr-2 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent hover:scrollbar-thumb-primary/50 flex-1">
              {entries.map((entry, index) => (
                <div
                  key={entry.id}
                  className={`group flex items-center gap-2 p-2 rounded-lg border transition-all duration-200 ${entry.active
                    ? "bg-card border-border/50 hover:border-primary/30 hover:shadow-sm"
                    : "bg-muted/30 border-transparent opacity-60 hover:opacity-80"
                    }`}
                >
                  {/* Entry Number */}
                  <div className="flex items-center justify-center min-w-[20px] lg:min-w-[24px] h-5 lg:h-6 rounded-md bg-primary/10 border border-primary/20 flex-shrink-0">
                    <span className="text-[9px] lg:text-[10px] font-bold text-primary">
                      {index + 1}
                    </span>
                  </div>

                  {/* Toggle Active Button */}
                  <Button
                    onClick={() => toggleEntry(entry.id)}
                    size="icon"
                    variant="ghost"
                    className={`h-6 w-6 lg:h-7 lg:w-7 flex-shrink-0 transition-all rounded-md ${entry.active
                      ? "text-green-600 hover:text-white hover:bg-green-500 border border-green-300"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted border border-border"
                      }`}
                    title={entry.active ? "Deactivate" : "Activate"}
                  >
                    {entry.active ? (
                      <Check className="h-3 w-3 lg:h-3.5 lg:w-3.5" />
                    ) : (
                      <Minus className="h-3 w-3 lg:h-3.5 lg:w-3.5" />
                    )}
                  </Button>

                  {/* Color Picker */}
                  <div className="relative w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0">
                    <div
                      className="w-4 h-4 lg:w-5 lg:h-5 rounded-full border-2 border-white dark:border-border shadow-sm ring-1 ring-black/10 transition-transform group-hover:scale-110 cursor-pointer overflow-hidden"
                      style={{ backgroundColor: entry.color }}
                    >
                      <input
                        type="color"
                        value={entry.color}
                        onChange={(e) =>
                          updateEntryColor(entry.id, e.target.value)
                        }
                        className="w-full h-full opacity-0 cursor-pointer"
                        title="Change color"
                        disabled={!entry.active}
                      />
                    </div>
                  </div>

                  {/* Image Upload Button */}
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            const dataUrl = event.target?.result as string;
                            updateEntryImage(entry.id, dataUrl);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="hidden"
                      id={`image-upload-${entry.id}`}
                      disabled={!entry.active}
                    />
                    <label
                      htmlFor={`image-upload-${entry.id}`}
                      className={`h-6 w-6 lg:h-7 lg:w-7 flex-shrink-0 transition-all rounded-md flex items-center justify-center cursor-pointer ${entry.imageUrl
                        ? "text-blue-600 hover:text-white hover:bg-blue-500 border border-blue-300"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted border border-transparent"
                        } ${!entry.active ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      title={entry.imageUrl ? "Change image" : "Add image"}
                    >
                      <ImageIcon className="h-3 w-3 lg:h-3.5 lg:w-3.5" />
                    </label>
                  </div>

                  {/* Remove Image Button */}
                  {entry.imageUrl && entry.active && (
                    <Button
                      onClick={() => updateEntryImage(entry.id, "")}
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6 lg:h-7 lg:w-7 flex-shrink-0 text-red-600 hover:text-white hover:bg-red-500 border border-transparent hover:border-red-400 rounded-md"
                      title="Remove image"
                    >
                      <X className="h-3 w-3 lg:h-3.5 lg:w-3.5" />
                    </Button>
                  )}

                  {/* Entry Text Input */}
                  <Input
                    value={entry.text}
                    onChange={(e) => updateEntry(entry.id, e.target.value)}
                    className={`flex-1 border-0 bg-transparent focus-visible:ring-1 focus-visible:ring-primary/50 px-1.5 lg:px-2 py-1 h-auto text-xs lg:text-sm font-semibold ${entry.active ? "text-foreground" : "text-muted-foreground"
                      }`}
                    disabled={!entry.active}
                    placeholder="Entry name"
                  />

                  {/* Remove Button */}
                  <Button
                    onClick={() => removeEntry(entry.id)}
                    size="icon"
                    variant="ghost"
                    className="h-6 w-6 lg:h-7 lg:w-7 text-muted-foreground hover:text-white hover:bg-red-500 opacity-0 group-hover:opacity-100 transition-all flex-shrink-0 border border-transparent hover:border-red-400 rounded-md"
                    title="Remove"
                  >
                    <Trash2 className="h-3 w-3 lg:h-3.5 lg:w-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {entries.length === 0 && (
            <div className="text-center py-6 lg:py-8 px-3 lg:px-4 border-2 border-dashed border-primary/30 rounded-lg bg-primary/5 backdrop-blur-sm relative z-10">
              <div className="text-3xl lg:text-4xl mb-2 lg:mb-3 animate-bounce">
                🎯
              </div>
              <p className="text-xs lg:text-sm font-bold text-foreground mb-1 lg:mb-1.5">
                No Entries Yet
              </p>
              <p className="text-[10px] lg:text-[11px] text-muted-foreground leading-relaxed">
                Add some names above to get started
              </p>
            </div>
          )}
        </Card>
      </div>

      {/* Winner Dialog */}
      <Dialog open={showWinnerDialog} onOpenChange={setShowWinnerDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl lg:text-2xl font-bold">
              🎉 We Have a Winner! 🎉
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 lg:gap-6 py-4 lg:py-6">
            <div className="flex items-center gap-3 lg:gap-4">
              <PartyPopper className="h-10 w-10 lg:h-12 lg:w-12 text-yellow-500 animate-bounce" />
              <div
                className="px-6 py-4 lg:px-8 lg:py-6 rounded-xl shadow-2xl border-4 border-white transform hover:scale-105 transition-transform"
                style={{ backgroundColor: winnerColor }}
              >
                <p className="text-2xl lg:text-3xl font-bold text-white text-center drop-shadow-lg">
                  {winner}
                </p>
              </div>
              <PartyPopper
                className="h-10 w-10 lg:h-12 lg:w-12 text-yellow-500 animate-bounce"
                style={{ animationDelay: "0.2s" }}
              />
            </div>
            <p className="text-base lg:text-lg text-muted-foreground text-center">
              Congratulations! 🎊
            </p>
            <div className="flex gap-2 lg:gap-3 w-full">
              <Button
                onClick={() => setShowWinnerDialog(false)}
                size="lg"
                variant="outline"
                className="flex-1 text-sm lg:text-base"
              >
                Close
              </Button>
              <Button
                onClick={removeWinner}
                size="lg"
                variant="destructive"
                className="flex-1 text-sm lg:text-base"
              >
                <Trash2 className="mr-2 h-3.5 w-3.5 lg:h-4 lg:w-4" />
                Remove Winner
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
