import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SpinWheel } from "@/components/SpinWheel";
import { Shirt } from "lucide-react";

type OutfitPickerWheelProps = {
  presetOptionLabels?: string[];
};

const DATASET: Record<string, string[]> = {
  work: [
    "Blazer + trousers",
    "Knit sweater + chinos",
    "Button-down + dark jeans",
    "Midi dress + cardigan",
    "Smart polo + slacks",
    "Layered shirt + blazer",
  ],
  casual: [
    "Tee + jeans",
    "Hoodie + joggers",
    "Flannel + denim",
    "Sundress + sneakers",
    "Overshirt + shorts",
    "Athleisure set",
  ],
  date: [
    "Nice jeans + statement top",
    "Blouse + skirt",
    "Dark denim + boots",
    "Simple dress + jacket",
    "Button-up + chinos",
    "Layered neutrals",
  ],
  rain: [
    "Waterproof shell + jeans",
    "Trench + boots",
    "Hoodie under rain jacket",
    "Dark layers + umbrella",
    "Quick-dry pants + sneakers",
    "Knit + packable shell",
  ],
  heat: [
    "Linen shirt + shorts",
    "Tank + wide pants",
    "Breathable tee + skirt",
    "Light dress + sandals",
    "Open shirt + tee",
    "Athletic shorts set",
  ],
};

type FilterKey = keyof typeof DATASET;

export function OutfitPickerWheel({
  presetOptionLabels,
}: OutfitPickerWheelProps) {
  const [filter, setFilter] = useState<FilterKey>("casual");
  const labels = useMemo(() => {
    if (presetOptionLabels?.length && filter === "casual") {
      return presetOptionLabels;
    }
    return DATASET[filter];
  }, [filter, presetOptionLabels]);

  return (
    <div className="space-y-4">
      <Card className="p-4 md:p-5 space-y-3">
        <div className="flex items-center gap-2 text-primary font-semibold">
          <Shirt className="h-5 w-5" />
          <span>Occasion &amp; weather</span>
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Outfit filter">
          {(Object.keys(DATASET) as FilterKey[]).map((key) => (
            <Button
              key={key}
              type="button"
              size="sm"
              variant={filter === key ? "default" : "outline"}
              onClick={() => setFilter(key)}
            >
              {key === "work"
                ? "Work"
                : key === "casual"
                  ? "Casual"
                  : key === "date"
                    ? "Date"
                    : key === "rain"
                      ? "Rain"
                      : "Heat"}
            </Button>
          ))}
        </div>
      </Card>
      <SpinWheel key={labels.join("|")} presetOptionLabels={labels} />
    </div>
  );
}
