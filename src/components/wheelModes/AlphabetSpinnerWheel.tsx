import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { SpinWheel } from "@/components/SpinWheel";
import { Maximize2, Minimize2, Type } from "lucide-react";
import { useControlledWheelLabels } from "@/lib/useControlledWheelLabels";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

type AlphabetSpinnerWheelProps = {
  presetOptionLabels?: string[];
};

export function AlphabetSpinnerWheel({
  presetOptionLabels,
}: AlphabetSpinnerWheelProps) {
  const [excluded, setExcluded] = useState<Set<string>>(() => new Set());
  const [fullscreen, setFullscreen] = useState(false);

  const activeLetters = useMemo(() => {
    const base =
      presetOptionLabels?.length === 26
        ? presetOptionLabels
        : ALPHABET;
    return base.filter((letter) => !excluded.has(letter.toUpperCase()));
  }, [presetOptionLabels, excluded]);
  const wheelSync = useControlledWheelLabels(activeLetters);

  const toggleLetter = (letter: string) => {
    setExcluded((prev) => {
      const next = new Set(prev);
      const key = letter.toUpperCase();
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <div
      className={
        fullscreen
          ? "fixed inset-0 z-50 bg-background p-4 overflow-auto"
          : "space-y-4"
      }
    >
      <Card className="p-4 md:p-5">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-2 text-primary font-semibold">
            <Type className="h-5 w-5" />
            <span>Exclude letters</span>
          </div>
          <Button
            variant={fullscreen ? "default" : "outline"}
            size="sm"
            onClick={() => setFullscreen((f) => !f)}
          >
            {fullscreen ? (
              <>
                <Minimize2 className="mr-2 h-4 w-4" />
                Exit projector
              </>
            ) : (
              <>
                <Maximize2 className="mr-2 h-4 w-4" />
                Projector fullscreen
              </>
            )}
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Uncheck letters already used in your game so the spinner only lands on
          remaining options.
        </p>
        <div className="grid grid-cols-6 sm:grid-cols-9 md:grid-cols-13 gap-2">
          {ALPHABET.map((letter) => {
            const isActive = !excluded.has(letter);
            return (
              <label
                key={letter}
                className="flex items-center gap-1.5 text-sm cursor-pointer"
              >
                <Checkbox
                  checked={isActive}
                  onCheckedChange={() => toggleLetter(letter)}
                  id={`letter-${letter}`}
                />
                <span
                  className={
                    isActive ? "font-medium" : "text-muted-foreground line-through"
                  }
                >
                  {letter}
                </span>
              </label>
            );
          })}
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          {activeLetters.length} letter{activeLetters.length !== 1 ? "s" : ""}{" "}
          active on the wheel
        </p>
      </Card>

      {activeLetters.length >= 2 ? (
        <SpinWheel
          entryLabels={wheelSync.entryLabels}
          onEntryLabelsChange={wheelSync.onEntryLabelsChange}
          hideBulkPaste
          spinButtonLabel={fullscreen ? "TAP TO SPIN" : undefined}
        />
      ) : (
        <Card className="p-6 text-center text-muted-foreground">
          Enable at least two letters to spin.
        </Card>
      )}
    </div>
  );
}
