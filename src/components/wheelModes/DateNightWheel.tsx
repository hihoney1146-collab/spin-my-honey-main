import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SpinWheel } from "@/components/SpinWheel";
import { Heart } from "lucide-react";

type DateNightWheelProps = {
  presetOptionLabels?: string[];
};

const POOLS: Record<string, string[]> = {
  any: [
    "Cook together",
    "Walk and dessert",
    "Board game night",
    "Movie + snacks",
    "Coffee date",
    "Museum or gallery",
  ],
  "at-home": [
    "Cook a new recipe",
    "Puzzle night",
    "Living-room picnic",
    "Dance in the kitchen",
    "Watch a comfort series",
    "Plan a future trip",
  ],
  out: [
    "Casual dinner out",
    "Bowling or arcade",
    "Live music if nearby",
    "Bookstore browse + tea",
    "Sunset walk downtown",
    "Food-truck crawl",
  ],
  budget: [
    "Free park picnic",
    "Home movie marathon",
    "Thrift-store hunt",
    "Potluck with friends",
    "Library date",
    "Game night with snacks you have",
  ],
  treat: [
    "Nice dinner reservation",
    "Spa-style night in",
    "Concert or show",
    "Weekend day trip plan",
    "Cooking class kit",
    "Dessert tasting flight",
  ],
};

type Key = keyof typeof POOLS;

export function DateNightWheel({
  presetOptionLabels,
}: DateNightWheelProps) {
  const [filter, setFilter] = useState<Key>("any");
  const labels = useMemo(() => {
    if (presetOptionLabels?.length && filter === "any") return presetOptionLabels;
    return POOLS[filter];
  }, [filter, presetOptionLabels]);

  return (
    <div className="space-y-4">
      <Card className="p-4 md:p-5 space-y-3">
        <div className="flex items-center gap-2 text-primary font-semibold">
          <Heart className="h-5 w-5" />
          <span>Date-night filters</span>
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
                ? "Anything"
                : key === "at-home"
                  ? "At home"
                  : key === "out"
                    ? "Go out"
                    : key === "budget"
                      ? "Budget"
                      : "Treat night"}
            </Button>
          ))}
        </div>
      </Card>
      <SpinWheel key={labels.join("|")} presetOptionLabels={labels} />
    </div>
  );
}
