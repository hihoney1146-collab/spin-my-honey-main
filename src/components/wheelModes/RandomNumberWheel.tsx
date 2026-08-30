import { useState, useMemo, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { SpinWheel } from "@/components/SpinWheel";
import { Hash, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { useControlledWheelLabels } from "@/lib/useControlledWheelLabels";

type RandomNumberWheelProps = {
  presetOptionLabels?: string[];
};

function pickRandomLabel(labels: string[]): string | null {
  if (labels.length === 0) return null;
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  return labels[buf[0] % labels.length] ?? null;
}

export function RandomNumberWheel(_props: RandomNumberWheelProps) {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [noRepeat, setNoRepeat] = useState(false);
  const [used, setUsed] = useState<Set<number>>(() => new Set());
  const [result, setResult] = useState<number | null>(null);

  const lo = Math.min(min, max);
  const hi = Math.max(min, max);
  const size = hi - lo + 1;

  useEffect(() => {
    setUsed(new Set());
    setResult(null);
  }, [lo, hi]);

  const rangeLabels = useMemo(() => {
    if (size < 1) return [];
    return Array.from({ length: size }, (_, i) => String(lo + i));
  }, [lo, hi, size]);

  const poolLabels = useMemo(() => {
    if (!noRepeat) return rangeLabels;
    return rangeLabels.filter((label) => !used.has(Number(label)));
  }, [rangeLabels, noRepeat, used]);

  const wheelSync = useControlledWheelLabels(poolLabels);
  const poolCount = wheelSync.entryLabels.length;
  const useWheelVisual = size > 0 && size <= 30 && poolCount >= 2;

  const pickRandom = useCallback(() => {
    if (size < 1) {
      toast.error("Max must be greater than or equal to min.");
      return;
    }

    const labels = wheelSync.entryLabels;
    if (labels.length === 0) {
      toast.info("All numbers in range used — reset to draw again.");
      return;
    }

    const pickedLabel = pickRandomLabel(labels);
    if (!pickedLabel) return;

    const pick = Number(pickedLabel);
    if (noRepeat) {
      setUsed((prev) => new Set(prev).add(pick));
    }
    setResult(pick);
  }, [size, wheelSync.entryLabels, noRepeat]);

  const handleWinnerSelected = useCallback(
    (name: string) => {
      const pick = Number(name);
      if (!Number.isFinite(pick)) return;
      setResult(pick);
      if (noRepeat) {
        setUsed((prev) => new Set(prev).add(pick));
      }
    },
    [noRepeat],
  );

  return (
    <div className="space-y-6">
      <Card className="p-5 md:p-6 space-y-4">
        <div className="flex items-center gap-2 text-primary font-semibold">
          <Hash className="h-5 w-5" />
          <span>Random number range</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-3 items-end">
          <div className="space-y-2">
            <Label htmlFor="num-min">Minimum</Label>
            <Input
              id="num-min"
              type="number"
              value={min}
              onChange={(e) => setMin(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="num-max">Maximum</Label>
            <Input
              id="num-max"
              type="number"
              value={max}
              onChange={(e) => setMax(Number(e.target.value))}
            />
          </div>
          <div className="flex items-center gap-3 pb-2">
            <Switch
              id="no-repeat"
              checked={noRepeat}
              onCheckedChange={setNoRepeat}
            />
            <Label htmlFor="no-repeat" className="cursor-pointer">
              No repeat
            </Label>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          {useWheelVisual
            ? `On the wheel now (${poolCount})`
            : size > 30
              ? `${size} numbers in range — use Pick random number (wheel hidden for ranges over 30).`
              : size >= 2
                ? `On the wheel now (${poolCount})`
                : "Set a valid min–max range with at least two integers."}
          {noRepeat && used.size > 0 ? ` · ${used.size} already drawn` : ""}
        </p>
        <div className="flex flex-wrap gap-3">
          <Button onClick={pickRandom} size="lg">
            Pick random number
          </Button>
          {noRepeat && used.size > 0 ? (
            <Button
              variant="outline"
              onClick={() => {
                setUsed(new Set());
                setResult(null);
                toast.success("Used numbers cleared.");
              }}
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset used
            </Button>
          ) : null}
        </div>
        {result !== null ? (
          <p className="text-4xl md:text-5xl font-bold text-center text-primary py-4">
            {result}
          </p>
        ) : null}
      </Card>

      {useWheelVisual ? (
        <SpinWheel
          entryLabels={wheelSync.entryLabels}
          onEntryLabelsChange={wheelSync.onEntryLabelsChange}
          hideBulkPaste={wheelSync.hideBulkPaste}
          onWinnerSelected={handleWinnerSelected}
        />
      ) : null}
    </div>
  );
}
