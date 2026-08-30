import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SpinWheel } from "@/components/SpinWheel";
import { Heart } from "lucide-react";
import { useControlledWheelLabels } from "@/lib/useControlledWheelLabels";

type SelfCareWheelProps = {
  presetOptionLabels?: string[];
};

const DATASET: Record<string, string[]> = {
  "5-min": [
    "Drink a full glass of water",
    "Box-breathe for one minute",
    "Stretch your neck and shoulders",
    "Step outside for fresh air",
    "Text someone a kind note",
    "Tidy one surface",
  ],
  "no-spend": [
    "Free walk around the block",
    "Library browse or ebook",
    "Cook with what you have",
    "Journal three gratitudes",
    "Call a friend",
    "Stretch along a free video",
  ],
  evening: [
    "Dim screens thirty minutes early",
    "Warm shower then stretch",
    "Prep clothes for tomorrow",
    "Herbal tea and a chapter",
    "Five-minute tidy",
    "Lights-out playlist",
  ],
  movement: [
    "Ten-minute walk",
    "Bodyweight circuit",
    "Dance to two songs",
    "Yoga sun salutations",
    "Stairs instead of elevator",
    "Mobility hip openers",
  ],
};

type FilterKey = keyof typeof DATASET;

export function SelfCareWheel({ presetOptionLabels: _presetOptionLabels }: SelfCareWheelProps) {
  const [filter, setFilter] = useState<FilterKey>("5-min");
  const labels = useMemo(() => DATASET[filter], [filter]);
  const wheelSync = useControlledWheelLabels(labels);

  return (
    <div className="space-y-4">
      <Card className="p-4 md:p-5 space-y-3">
        <div className="flex items-center gap-2 text-primary font-semibold">
          <Heart className="h-5 w-5" />
          <span>Self-care filters</span>
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Self-care filter">
          {(Object.keys(DATASET) as FilterKey[]).map((key) => (
            <Button
              key={key}
              type="button"
              size="sm"
              variant={filter === key ? "default" : "outline"}
              onClick={() => setFilter(key)}
            >
              {key === "5-min"
                ? "5 minutes"
                : key === "no-spend"
                  ? "No spend"
                  : key === "evening"
                    ? "Evening"
                    : "Movement"}
            </Button>
          ))}
        </div>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          On the wheel now ({labels.length})
        </p>
        <ul className="text-sm text-foreground grid sm:grid-cols-2 gap-1">
          {labels.map((label) => (
            <li key={label}>{label}</li>
          ))}
        </ul>
      </Card>
      <SpinWheel
        entryLabels={wheelSync.entryLabels}
        onEntryLabelsChange={wheelSync.onEntryLabelsChange}
        hideBulkPaste
        entriesListDefaultExpanded
      />
    </div>
  );
}
