import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SpinWheel } from "@/components/SpinWheel";
import { Sparkles } from "lucide-react";
import { useControlledWheelLabels } from "@/lib/useControlledWheelLabels";

type ChineseZodiacWheelProps = {
  presetOptionLabels?: string[];
};

const ANIMALS = [
  "Rat",
  "Ox",
  "Tiger",
  "Rabbit",
  "Dragon",
  "Snake",
  "Horse",
  "Goat",
  "Monkey",
  "Rooster",
  "Dog",
  "Pig",
];

/** Approximate Gregorian mapping (not lunar-new-year precise). */
function animalForYear(year: number): string {
  const idx = ((year - 1900) % 12 + 12) % 12;
  return ANIMALS[idx];
}

export function ChineseZodiacWheel({
  presetOptionLabels,
}: ChineseZodiacWheelProps) {
  const labels =
    presetOptionLabels?.length === 12 ? presetOptionLabels : ANIMALS;
  const [yearInput, setYearInput] = useState("");
  const [highlight, setHighlight] = useState<string | null>(null);

  const orderedLabels = useMemo(() => {
    if (!highlight) return labels;
    return [highlight, ...labels.filter((l) => l !== highlight)];
  }, [highlight, labels]);
  const wheelSync = useControlledWheelLabels(orderedLabels);

  const lookup = () => {
    const year = Number(yearInput);
    if (!Number.isFinite(year) || year < 1900 || year > 2100) {
      setHighlight(null);
      return;
    }
    setHighlight(animalForYear(year));
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 md:p-5 space-y-3">
        <div className="flex items-center gap-2 text-primary font-semibold">
          <Sparkles className="h-5 w-5" />
          <span>Birth-year → animal</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Enter a birth year to highlight that Chinese zodiac animal on the
          wheel (Gregorian approximation; lunar New Year boundaries can shift
          the result for late January / early February births).
        </p>
        <div className="flex flex-wrap items-end gap-3">
          <div className="space-y-2">
            <Label htmlFor="cn-year">Birth year</Label>
            <Input
              id="cn-year"
              inputMode="numeric"
              placeholder="1994"
              value={yearInput}
              onChange={(e) => setYearInput(e.target.value)}
              className="w-32"
            />
          </div>
          <Button type="button" onClick={lookup}>
            Show animal
          </Button>
        </div>
        {highlight ? (
          <p className="text-sm font-medium text-foreground">
            Year {yearInput} → <strong>{highlight}</strong> (also first on the
            wheel for a focused spin)
          </p>
        ) : null}
      </Card>

      <SpinWheel
        entryLabels={wheelSync.entryLabels}
        onEntryLabelsChange={wheelSync.onEntryLabelsChange}
        hideBulkPaste
      />
    </div>
  );
}
