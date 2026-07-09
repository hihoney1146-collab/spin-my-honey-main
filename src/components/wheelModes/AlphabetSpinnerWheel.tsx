import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { SpinWheel } from "@/components/SpinWheel";
import { Type } from "lucide-react";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

type AlphabetSpinnerWheelProps = {
  presetOptionLabels?: string[];
};

export function AlphabetSpinnerWheel({
  presetOptionLabels,
}: AlphabetSpinnerWheelProps) {
  const [excluded, setExcluded] = useState<Set<string>>(() => new Set());

  const activeLetters = useMemo(() => {
    const base =
      presetOptionLabels?.length === 26
        ? presetOptionLabels
        : ALPHABET;
    return base.filter((letter) => !excluded.has(letter.toUpperCase()));
  }, [presetOptionLabels, excluded]);

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
    <div className="space-y-4">
      <Card className="p-4 md:p-5">
        <div className="flex items-center gap-2 text-primary font-semibold mb-3">
          <Type className="h-5 w-5" />
          <span>Exclude letters</span>
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
                <span className={isActive ? "font-medium" : "text-muted-foreground line-through"}>
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
          key={activeLetters.join("")}
          presetOptionLabels={activeLetters}
        />
      ) : (
        <Card className="p-6 text-center text-muted-foreground">
          Enable at least two letters to spin.
        </Card>
      )}
    </div>
  );
}
