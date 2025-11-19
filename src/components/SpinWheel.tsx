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

// Enhanced realistic sound effects with improved audio synthesis
const playSound = (soundType: "spin" | "win" | "click") => {
  const audioContext = new (window.AudioContext ||
    (window as any).webkitAudioContext)();

  switch (soundType) {
    case "spin":
      // Create realistic ratchet/tick spinning sound with decreasing speed
      const tickDuration = 0.05;
      const tickCount = 35;

      for (let i = 0; i < tickCount; i++) {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        const filter = audioContext.createBiquadFilter();

        // Connect: oscillator -> filter -> gain -> destination
        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioContext.destination);

        // Use square wave for sharper tick sound
        oscillator.type = "square";

        // Band-pass filter for more realistic wood/plastic tick
        filter.type = "bandpass";
        filter.frequency.value = 1200 - i * 20; // Decreasing pitch
        filter.Q.value = 8; // Narrow band for click sound

        // Exponential timing for deceleration effect
        const delay = i < 15 ? i * 0.06 : 15 * 0.06 + (i - 15) * 0.1;
        const startTime = audioContext.currentTime + delay;

        // Sharp attack, quick decay
        oscillator.frequency.setValueAtTime(1200 - i * 15, startTime);
        gainNode.gain.setValueAtTime(0.12, startTime);
        gainNode.gain.exponentialRampToValueAtTime(
          0.001,
          startTime + tickDuration
        );

        oscillator.start(startTime);
        oscillator.stop(startTime + tickDuration);
      }
      break;

    case "win":
      // Create realistic crowd applause with multiple clap layers
      const clapDuration = 1.5;
      const clapsPerSecond = 8;
      const totalClaps = Math.floor(clapDuration * clapsPerSecond);

      for (let i = 0; i < totalClaps; i++) {
        // Create white noise burst for each clap
        const noise = audioContext.createBufferSource();
        const bufferSize = Math.floor(audioContext.sampleRate * 0.05);
        const buffer = audioContext.createBuffer(
          1,
          bufferSize,
          audioContext.sampleRate
        );
        const data = buffer.getChannelData(0);

        // Generate pink noise (more natural than white)
        let b0 = 0,
          b1 = 0,
          b2 = 0,
          b3 = 0,
          b4 = 0,
          b5 = 0,
          b6 = 0;
        for (let j = 0; j < bufferSize; j++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.969 * b2 + white * 0.153852;
          b3 = 0.8665 * b3 + white * 0.3104856;
          b4 = 0.55 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.016898;
          data[j] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
          b6 = white * 0.115926;
        }

        noise.buffer = buffer;

        // Multi-band filtering for realistic hand clap
        const lowpass = audioContext.createBiquadFilter();
        const highpass = audioContext.createBiquadFilter();
        const gainNode = audioContext.createGain();

        lowpass.type = "lowpass";
        lowpass.frequency.value = 2000;
        highpass.type = "highpass";
        highpass.frequency.value = 400;

        noise.connect(highpass);
        highpass.connect(lowpass);
        lowpass.connect(gainNode);
        gainNode.connect(audioContext.destination);

        // Randomize timing for natural crowd effect
        const startTime =
          audioContext.currentTime + i * 0.08 + Math.random() * 0.03;
        const volume = 0.08 + Math.random() * 0.04;

        gainNode.gain.setValueAtTime(volume, startTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + 0.08);

        noise.start(startTime);
        noise.stop(startTime + 0.08);
      }

      // Add celebratory fanfare with bell-like tones
      const fanfareTones = [
        { freq: 523.25, time: 0 }, // C5
        { freq: 659.25, time: 0.12 }, // E5
        { freq: 783.99, time: 0.24 }, // G5
        { freq: 1046.5, time: 0.36 }, // C6
      ];

      fanfareTones.forEach((tone) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.type = "sine";
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        const startTime = audioContext.currentTime + tone.time;
        oscillator.frequency.setValueAtTime(tone.freq, startTime);
        gainNode.gain.setValueAtTime(0.12, startTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);

        oscillator.start(startTime);
        oscillator.stop(startTime + 0.4);
      });
      break;

    case "click":
      // Short, crisp UI click sound
      const clickOsc = audioContext.createOscillator();
      const clickGain = audioContext.createGain();
      const clickFilter = audioContext.createBiquadFilter();

      clickOsc.type = "sine";
      clickFilter.type = "lowpass";
      clickFilter.frequency.value = 2000;

      clickOsc.connect(clickFilter);
      clickFilter.connect(clickGain);
      clickGain.connect(audioContext.destination);

      clickOsc.frequency.setValueAtTime(800, audioContext.currentTime);
      clickGain.gain.setValueAtTime(0.06, audioContext.currentTime);
      clickGain.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + 0.08
      );

      clickOsc.start();
      clickOsc.stop(audioContext.currentTime + 0.08);
      break;
  }
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

  // Save entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("spinWheelEntries", JSON.stringify(entries));
  }, [entries]);

  // Draw wheel when entries, rotation, or loadedImages change
  useEffect(() => {
    drawWheel();
  }, [entries, rotation, loadedImages]);

  // Continuous slow spinning when not actively spinning
  useEffect(() => {
    const activeEntries = entries.filter((entry) => entry.active);
    if (isSpinning || activeEntries.length < 2) {
      // Stop continuous spin during active spin or if not enough entries
      if (continuousSpinRef.current !== null) {
        cancelAnimationFrame(continuousSpinRef.current);
        continuousSpinRef.current = null;
      }
      return;
    }

    // Continuous slow spin - 0.1 degrees per frame at ~60fps = ~6 degrees/second
    const continuousSpin = () => {
      setRotation((prev) => (prev + 0.1) % 360);
      continuousSpinRef.current = requestAnimationFrame(continuousSpin);
    };

    continuousSpinRef.current = requestAnimationFrame(continuousSpin);

    return () => {
      if (continuousSpinRef.current !== null) {
        cancelAnimationFrame(continuousSpinRef.current);
        continuousSpinRef.current = null;
      }
      if (spinAnimationRef.current !== null) {
        cancelAnimationFrame(spinAnimationRef.current);
        spinAnimationRef.current = null;
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
    const radius = Math.min(centerX, centerY) - 20;

    // Use custom rotation if provided (for animations), otherwise use state
    const currentRotation = customRotation !== undefined ? customRotation : rotation;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((currentRotation * Math.PI) / 180);

    const activeEntries = entries.filter((entry) => entry.active);
    if (activeEntries.length === 0) {
      ctx.restore();

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fillStyle = "#f8fafc";
      ctx.fill();
      ctx.lineWidth = 4;
      ctx.strokeStyle = "rgba(148, 163, 184, 0.35)";
      ctx.stroke();

      // Draw pointer even when no entries are active
      const pointerX = centerX + radius + 5;
      const pointerY = centerY;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(pointerX, pointerY);
      ctx.lineTo(pointerX + 24, pointerY - 18);
      ctx.lineTo(pointerX + 24, pointerY + 18);
      ctx.closePath();
      ctx.fillStyle = "#ef4444";
      ctx.shadowColor = "rgba(239, 68, 68, 0.35)";
      ctx.shadowBlur = 12;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 6;
      ctx.fill();
      ctx.restore();

      ctx.beginPath();
      ctx.moveTo(pointerX, pointerY);
      ctx.lineTo(pointerX + 24, pointerY - 18);
      ctx.lineTo(pointerX + 24, pointerY + 18);
      ctx.closePath();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.85)";
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(pointerX + 20, pointerY, 6, 0, 2 * Math.PI);
      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = "rgba(15, 23, 42, 0.25)";
      ctx.shadowBlur = 6;
      ctx.fill();

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

      // Check if image is available
      const img = entry.imageUrl ? loadedImages.get(entry.id) : null;

      if (img) {
        // Save context and clip to slice
        ctx.save();
        ctx.clip();

        // Fill background with solid color as fallback
        ctx.fillStyle = entry.color;
        ctx.fill();

        // Calculate slice dimensions to fill entire area
        const sliceCenterAngle = startAngle + sliceAngle / 2;

        // Image should cover from near center (leaving space for center circle) to outer edge
        const innerRadius = 40; // Start after center circle
        const outerRadius = radius;
        const sliceWidth = outerRadius - innerRadius;

        // Calculate the angular width at the outer edge
        const arcLength = sliceAngle * outerRadius;

        // Position image to fill the slice
        const imgCenterDistance = innerRadius + sliceWidth / 2;
        const imgCenterX = Math.cos(sliceCenterAngle) * imgCenterDistance;
        const imgCenterY = Math.sin(sliceCenterAngle) * imgCenterDistance;

        // Calculate dimensions to cover the slice (object-fit: cover behavior)
        const imgAspect = img.width / img.height;
        const sliceAspect = arcLength / sliceWidth;

        let drawWidth, drawHeight;

        if (imgAspect > sliceAspect) {
          // Image is wider - fit to height and crop width
          drawHeight = sliceWidth * 1.4;
          drawWidth = drawHeight * imgAspect;
        } else {
          // Image is taller - fit to width and crop height
          drawWidth = arcLength * 1.4;
          drawHeight = drawWidth / imgAspect;
        }

        // Rotate image 180 degrees for proper orientation
        ctx.translate(imgCenterX, imgCenterY);
        ctx.rotate(Math.PI); // 180 degrees rotation
        ctx.translate(-imgCenterX, -imgCenterY);

        // Center the image in the slice
        const imgX = imgCenterX - drawWidth / 2;
        const imgY = imgCenterY - drawHeight / 2;

        // Draw image with slight opacity for color blend
        ctx.globalAlpha = 0.95;
        ctx.drawImage(img, imgX, imgY, drawWidth, drawHeight);
        ctx.globalAlpha = 1.0;

        ctx.restore();
      } else {
        // Draw solid color
        ctx.fillStyle = entry.color;
        ctx.fill();
      }

      // Polished slice separator
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.45)";
      ctx.stroke();

      // Draw text
      ctx.save();
      ctx.rotate(startAngle + sliceAngle / 2);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.font = "bold 16px Inter, sans-serif";
      const textX = radius * 0.68;

      // Subtle text outline for visibility over images
      ctx.strokeStyle = "rgba(0, 0, 0, 0.6)";
      ctx.lineWidth = 3;
      ctx.strokeText(entry.text, textX, 0);

      ctx.fillStyle = "#ffffff";
      ctx.fillText(entry.text, textX, 0);

      ctx.restore();
    });

    // Draw center circle
    ctx.beginPath();
    ctx.arc(0, 0, 35, 0, 2 * Math.PI);
    ctx.fillStyle = "#ffffff";
    ctx.fill();

    // Add 3D shadow effect to center circle
    ctx.beginPath();
    ctx.arc(0, 0, 35, 0, 2 * Math.PI);
    const gradient = ctx.createRadialGradient(0, -10, 5, 0, 0, 35);
    gradient.addColorStop(0, "rgba(255, 255, 255, 0.3)");
    gradient.addColorStop(0.5, "rgba(200, 200, 200, 0.1)");
    gradient.addColorStop(1, "rgba(150, 150, 150, 0.2)");
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw "SPIN" text in center with rotation (slower than wheel for 3D effect)
    ctx.save();
    ctx.rotate((rotation * 0.3 * Math.PI) / 180); // 30% of wheel speed for 3D depth
    ctx.fillStyle = "#000000";
    ctx.font = "bold 14px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Add subtle shadow for 3D effect
    ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
    ctx.shadowBlur = 2;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;

    ctx.fillText("SPIN", 0, 0);
    ctx.restore();

    ctx.restore();

    // Draw pointer (positioned at the right edge, pointing left into the wheel)
    const pointerX = centerX + radius + 5;
    const pointerY = centerY;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(pointerX, pointerY); // Tip of pointer
    ctx.lineTo(pointerX + 24, pointerY - 18); // Top right
    ctx.lineTo(pointerX + 24, pointerY + 18); // Bottom right
    ctx.closePath();
    ctx.fillStyle = "#ef4444";
    ctx.shadowColor = "rgba(239, 68, 68, 0.4)";
    ctx.shadowBlur = 14;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 6;
    ctx.fill();
    ctx.restore();

    ctx.beginPath();
    ctx.moveTo(pointerX, pointerY);
    ctx.lineTo(pointerX + 24, pointerY - 18);
    ctx.lineTo(pointerX + 24, pointerY + 18);
    ctx.closePath();
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
    ctx.stroke();

    ctx.save();
    ctx.beginPath();
    ctx.arc(pointerX + 20, pointerY, 6, 0, 2 * Math.PI);
    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = "rgba(15, 23, 42, 0.2)";
    ctx.shadowBlur = 6;
    ctx.fill();
    ctx.restore();
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
      playSound("click");
      toast.success("Entry added!");
    }
  };

  const removeEntry = (id: string) => {
    if (entries.length > 2) {
      setEntries(entries.filter((entry) => entry.id !== id));
      playSound("click");
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
    playSound("click");
  };

  const updateEntryImage = (id: string, imageUrl: string) => {
    setEntries(
      entries.map((entry) =>
        entry.id === id ? { ...entry, imageUrl: imageUrl || undefined } : entry
      )
    );
    playSound("click");
  };

  const toggleEntry = (id: string) => {
    setEntries(
      entries.map((entry) =>
        entry.id === id ? { ...entry, active: !entry.active } : entry
      )
    );
    playSound("click");
  };

  const shuffleEntries = () => {
    const shuffled = [...entries].sort(() => Math.random() - 0.5);
    setEntries(shuffled);
    playSound("click");
    toast.success("Entries shuffled!");
  };

  const sortEntries = () => {
    const sorted = [...entries].sort((a, b) => a.text.localeCompare(b.text));
    setEntries(sorted);
    playSound("click");
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
    playSound("click");
    toast.success("Entries reset to defaults!");
  };

  const removeWinner = () => {
    if (winnerId && entries.length > 2) {
      setEntries(entries.filter((entry) => entry.id !== winnerId));
      playSound("click");
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

    setIsSpinning(true);
    setWinner(null);
    playSound("spin");

    // More spins for realistic effect (6-10 full rotations)
    const spins = 6 + Math.random() * 4;
    const extraDegrees = Math.random() * 360;
    const totalRotation = spins * 360 + extraDegrees;

    // Get current rotation at start
    let currentRotation = rotation;
    // Realistic duration: 5-7 seconds for more dramatic effect
    const duration = 5000 + Math.random() * 2000;
    const startTime = Date.now();

    // Realistic easing function - easeOutQuart for smooth deceleration like physical wheels
    const easeOutQuart = (t: number): number => {
      return 1 - Math.pow(1 - t, 4);
    };

    // Advanced easing that mimics real wheel physics with smooth deceleration
    const easeOutExpo = (t: number): number => {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    };

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Use combination of easing functions for realistic deceleration
      // Starts fast, gradually slows down with smooth deceleration curve
      const easedProgress = progress < 0.7 
        ? easeOutQuart(progress / 0.7) * 0.7
        : 0.7 + easeOutExpo((progress - 0.7) / 0.3) * 0.3;

      const newRotation = (currentRotation + totalRotation * easedProgress) % 360;
      setRotation(newRotation);
      
      // Draw wheel directly with current rotation for smooth animation
      drawWheel(newRotation);

      if (progress < 1) {
        spinAnimationRef.current = requestAnimationFrame(animate);
      } else {
        // Animation complete
        const finalRotation = newRotation % 360;
        const sliceAngle = 360 / activeEntries.length;

        // Pointer is at right (0 degrees), calculate which slice is at that position
        // The wheel rotates clockwise, so we need to find which slice is at 0 degrees
        const pointerAngle = 0; // Right side
        const adjustedAngle = (360 - finalRotation + pointerAngle) % 360;
        const winningIndex =
          Math.floor(adjustedAngle / sliceAngle) % activeEntries.length;
        const winningEntry = activeEntries[winningIndex];

        setWinner(winningEntry.text);
        setWinnerColor(winningEntry.color);
        setWinnerId(winningEntry.id);
        setIsSpinning(false);
        spinAnimationRef.current = null;

        // Delay sound and confetti slightly for better effect
        setTimeout(() => {
          playSound("win");

          // Show winner dialog with party poppers
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
        <div className="w-full max-w-[340px] xs:max-w-[380px] sm:max-w-[440px] md:max-w-[500px] lg:max-w-[520px] xl:max-w-[560px] 2xl:max-w-[600px] mx-auto relative">
          <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-primary/25 via-primary/10 to-transparent blur-3xl opacity-60 pointer-events-none" />
          <canvas
            ref={canvasRef}
            width={480}
            height={480}
            onClick={spinWheel}
            className={`w-full h-auto block rounded-full bg-gradient-to-br from-white via-background/90 to-muted/50 shadow-[0_28px_70px_-32px_rgba(15,23,42,0.65)] transition-all duration-200 touch-manipulation ${
              isSpinning || activeEntries.length < 2
                ? "cursor-not-allowed opacity-70"
                : "cursor-pointer hover:scale-[1.04] active:scale-95 hover:shadow-[0_36px_90px_-38px_rgba(15,23,42,0.7)]"
            }`}
          />
        </div>

        {/* Spin Button */}
        <div className="w-full max-w-[340px] xs:max-w-[380px] sm:max-w-[440px] md:max-w-[500px] lg:max-w-[520px] xl:max-w-[560px] 2xl:max-w-[600px] mx-auto space-y-2">
          <Button
            onClick={spinWheel}
            disabled={isSpinning || activeEntries.length < 2}
            size="lg"
            className="text-sm sm:text-base lg:text-lg font-bold px-4 sm:px-6 lg:px-8 py-3 sm:py-4 h-auto bg-gradient-to-r from-primary via-primary to-primary/90 hover:from-primary/90 hover:via-primary hover:to-primary text-primary-foreground w-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border border-primary-foreground/20 relative overflow-hidden group touch-manipulation"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            {isSpinning ? (
              <>
                <div className="animate-spin mr-2 h-4 w-4 sm:h-5 sm:w-5 border-3 border-white border-t-transparent rounded-full relative z-10" />
                <span className="relative z-10">Spinning...</span>
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5 fill-current relative z-10" />
                <span className="relative z-10">Spin the Wheel!</span>
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
        <Card className="p-4 lg:p-5 xl:p-6 bg-card/95 border-2 border-border backdrop-blur-sm relative overflow-hidden w-full flex flex-col">
          {/* Header */}
          <div className="mb-3 lg:mb-4 relative z-10">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-1 h-5 lg:h-6 bg-primary rounded-sm shadow-sm" />
                <h2 className="text-base lg:text-lg font-bold text-foreground tracking-tight">
                  Manage Entries
                </h2>
              </div>
              <Badge
                variant="secondary"
                className="text-xs font-bold px-2 py-0.5 lg:px-2.5 lg:py-1 bg-primary/15 text-primary border border-primary/30 shadow-sm"
              >
                {activeEntries.length} Active
              </Badge>
            </div>
            <p className="text-[10px] lg:text-[11px] text-muted-foreground ml-3 leading-relaxed">
              Add, organize, and control your wheel entries
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
            <div className="space-y-1.5 lg:space-y-2 overflow-y-auto pr-1 lg:pr-1.5 scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-muted/30 hover:scrollbar-thumb-primary/50 flex-1">
              {entries.map((entry, index) => (
                <div
                  key={entry.id}
                  className={`group flex items-center gap-1.5 lg:gap-2 p-2 lg:p-2.5 rounded-lg border-2 transition-all duration-200 ${
                    entry.active
                      ? "bg-white/50 dark:bg-background/80 backdrop-blur-sm border-border hover:border-primary hover:bg-white dark:hover:bg-background shadow-sm hover:shadow-md"
                      : "bg-muted/30 border-muted opacity-60 hover:opacity-80"
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
                    className={`h-6 w-6 lg:h-7 lg:w-7 flex-shrink-0 transition-all rounded-md ${
                      entry.active
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
                      className={`h-6 w-6 lg:h-7 lg:w-7 flex-shrink-0 transition-all rounded-md flex items-center justify-center cursor-pointer ${
                        entry.imageUrl
                          ? "text-blue-600 hover:text-white hover:bg-blue-500 border border-blue-300"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted border border-transparent"
                      } ${
                        !entry.active ? "opacity-50 cursor-not-allowed" : ""
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
                    className={`flex-1 border-0 bg-transparent focus-visible:ring-1 focus-visible:ring-primary/50 px-1.5 lg:px-2 py-1 h-auto text-xs lg:text-sm font-semibold ${
                      entry.active ? "text-foreground" : "text-muted-foreground"
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
