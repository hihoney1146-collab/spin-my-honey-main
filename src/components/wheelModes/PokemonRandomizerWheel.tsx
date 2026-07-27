import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SpinWheel } from "@/components/SpinWheel";
import { Gamepad2 } from "lucide-react";

type PokemonRandomizerWheelProps = {
  presetOptionLabels?: string[];
};

/** Generic challenge labels (no franchise character names required). */
const POOLS: Record<string, string[]> = {
  starters: [
    "Grass starter run",
    "Fire starter run",
    "Water starter run",
    "Random starter only",
    "No starter evolves",
    "Starter stays in party always",
  ],
  types: [
    "Mono-type challenge",
    "Dual-type only",
    "No shared types",
    "Random type ban",
    "Type roulette weekly",
    "Resist the gym type",
  ],
  nuzlocke: [
    "First encounter only",
    "Nickname everything",
    "Permadeath on faint",
    "Dupes clause on",
    "Set mode battles",
    "No items in battle",
  ],
  gen: [
    "Gen 1 ruleset feel",
    "Gen 2 pairing night",
    "Gen 3 emerald vibe",
    "Gen 4 sinnoh pace",
    "Gen 5 story focus",
    "Modern catch rules",
  ],
};

type PoolKey = keyof typeof POOLS;

export function PokemonRandomizerWheel({
  presetOptionLabels,
}: PokemonRandomizerWheelProps) {
  const [pool, setPool] = useState<PoolKey>("starters");
  const labels = useMemo(() => {
    if (presetOptionLabels?.length && pool === "starters") {
      return presetOptionLabels;
    }
    return POOLS[pool];
  }, [pool, presetOptionLabels]);

  return (
    <div className="space-y-4">
      <Card className="p-4 md:p-5 space-y-3">
        <div className="flex items-center gap-2 text-primary font-semibold">
          <Gamepad2 className="h-5 w-5" />
          <span>Challenge pool</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Filters rebuild the wheel from challenge rulesets (starters, types,
          nuzlocke-style rules, generation vibe)—not a character name dump.
        </p>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Challenge pool">
          {(Object.keys(POOLS) as PoolKey[]).map((key) => (
            <Button
              key={key}
              type="button"
              size="sm"
              variant={pool === key ? "default" : "outline"}
              onClick={() => setPool(key)}
            >
              {key === "gen"
                ? "Generation vibe"
                : key === "nuzlocke"
                  ? "Nuzlocke-style"
                  : key === "types"
                    ? "Types"
                    : "Starters"}
            </Button>
          ))}
        </div>
      </Card>
      <SpinWheel key={labels.join("|")} presetOptionLabels={labels} />
    </div>
  );
}
