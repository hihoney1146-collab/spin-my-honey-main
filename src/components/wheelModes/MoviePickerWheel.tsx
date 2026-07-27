import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SpinWheel } from "@/components/SpinWheel";
import { Clapperboard } from "lucide-react";

type MoviePickerWheelProps = {
  presetOptionLabels?: string[];
};

const POOLS: Record<string, string[]> = {
  any: [
    "Feel-good comedy",
    "Light drama",
    "Action night",
    "Animated pick",
    "Documentary",
    "Classic rewatch",
  ],
  short: [
    "Under 100 minutes",
    "TV movie night",
    "Two short episodes instead",
    "Stand-up special",
    "Animated short + featurette",
    "Quick comfort rewatch",
  ],
  cozy: [
    "Rom-com",
    "Feel-good indie",
    "Family adventure",
    "Music documentary",
    "Gentle animation",
    "Food travel film",
  ],
  horror: [
    "Classic horror",
    "Psychological thriller",
    "Found-footage scare",
    "Creature feature",
    "Horror comedy",
    "Slow-burn dread",
  ],
  list: [],
};

type Key = keyof typeof POOLS;

export function MoviePickerWheel({
  presetOptionLabels,
}: MoviePickerWheelProps) {
  const [filter, setFilter] = useState<Key>("any");
  const [listPaste, setListPaste] = useState("");

  const labels = useMemo(() => {
    if (filter === "list") {
      const pasted = listPaste
        .split(/\n/)
        .map((s) => s.trim())
        .filter(Boolean);
      return pasted.length >= 2
        ? pasted
        : ["Add at least two titles", "Paste your watchlist"];
    }
    if (presetOptionLabels?.length && filter === "any") return presetOptionLabels;
    return POOLS[filter];
  }, [filter, listPaste, presetOptionLabels]);

  return (
    <div className="space-y-4">
      <Card className="p-4 md:p-5 space-y-3">
        <div className="flex items-center gap-2 text-primary font-semibold">
          <Clapperboard className="h-5 w-5" />
          <span>Movie night filters</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(POOLS) as Key[]).map((key) => (
            <Button
              key={key}
              type="button"
              size="sm"
              variant={filter === key ? "default" : "outline"}
              onClick={() => setFilter(key)}
            >
              {key === "any"
                ? "Any mood"
                : key === "short"
                  ? "Short"
                  : key === "cozy"
                    ? "Cozy"
                    : key === "horror"
                      ? "Horror / thriller"
                      : "My list"}
            </Button>
          ))}
        </div>
        {filter === "list" ? (
          <div className="space-y-2">
            <Label htmlFor="movie-list">Paste titles (one per line)</Label>
            <Textarea
              id="movie-list"
              rows={5}
              value={listPaste}
              onChange={(e) => setListPaste(e.target.value)}
              placeholder="Title one&#10;Title two"
            />
          </div>
        ) : null}
      </Card>
      <SpinWheel key={labels.join("|") + filter} presetOptionLabels={labels} />
    </div>
  );
}
