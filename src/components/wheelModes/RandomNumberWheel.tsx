import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { SpinWheel } from "@/components/SpinWheel";
import { Hash, RotateCcw } from "lucide-react";
import { toast } from "sonner";

type RandomNumberWheelProps = {
  presetOptionLabels?: string[];
};

function randomInt(min: number, max: number): number {
  const range = max - min + 1;
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  return min + (buf[0] % range);
}

export function RandomNumberWheel({ presetOptionLabels }: RandomNumberWheelProps) {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [noRepeat, setNoRepeat] = useState(false);
  const [used, setUsed] = useState<Set<number>>(() => new Set());
  const [result, setResult] = useState<number | null>(null);
  const [wheelLabels, setWheelLabels] = useState<string[] | undefined>(
    undefined,
  );

  const rangeSize = max - min + 1;
  const useWheelVisual = rangeSize > 0 && rangeSize <= 30;

  const spinNumber = () => {
    const lo = Math.min(min, max);
    const hi = Math.max(min, max);
    const size = hi - lo + 1;

    if (size < 1) {
      toast.error("Max must be greater than or equal to min.");
      return;
    }

    if (noRepeat && used.size >= size) {
      toast.info("All numbers in range used — reset to draw again.");
      return;
    }

    let pick: number;
    do {
      pick = randomInt(lo, hi);
    } while (noRepeat && used.has(pick));

    if (noRepeat) {
      setUsed((prev) => new Set(prev).add(pick));
    }
    setResult(pick);

    if (useWheelVisual) {
      const labels = Array.from({ length: size }, (_, i) => String(lo + i));
      setWheelLabels(labels);
    }
  };

  const wheelPreset = useMemo(() => {
    if (wheelLabels) return wheelLabels;
    if (presetOptionLabels?.length) return presetOptionLabels;
    return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  }, [wheelLabels, presetOptionLabels]);

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
        <div className="flex flex-wrap gap-3">
          <Button onClick={spinNumber} size="lg">
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
        <SpinWheel key={wheelPreset.join(",")} presetOptionLabels={wheelPreset} />
      ) : (
        <SpinWheel presetOptionLabels={wheelPreset} />
      )}
    </div>
  );
}
