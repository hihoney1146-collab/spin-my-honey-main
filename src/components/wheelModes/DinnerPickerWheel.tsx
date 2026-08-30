import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SpinWheel } from "@/components/SpinWheel";
import { Utensils } from "lucide-react";
import { useControlledWheelLabels } from "@/lib/useControlledWheelLabels";

type DinnerPickerWheelProps = {
  presetOptionLabels?: string[];
};

const POOLS: Record<string, string[]> = {
  cuisine: [
    "Italian pasta",
    "Mexican tacos",
    "Thai curry",
    "Japanese bowls",
    "Indian dal and rice",
    "Mediterranean mezze",
    "Chinese stir-fry",
    "American comfort food",
  ],
  leftovers: [
    "Remix leftovers into a bowl",
    "Soup from scraps",
    "Quesadilla from fridge finds",
    "Fried rice with leftovers",
    "Open-face sandwich night",
    "Clean-out-fridge omelet",
  ],
  delivery: [
    "Pizza delivery",
    "Thai takeout",
    "Burgers delivered",
    "Sushi order",
    "Indian takeout",
    "Mediterranean bowls to-go",
  ],
  cook: [
    "Sheet-pan veggies and protein",
    "One-pot pasta",
    "Stir-fry in 20 minutes",
    "Taco assembly line",
    "Soup from pantry",
    "Grill or skillet night",
  ],
  chains: [
    "Burger chain",
    "Pizza chain",
    "Chicken sandwich spot",
    "Taco / Mexican fast casual",
    "Sandwich shop",
    "Coffee plus bakery dinner",
  ],
};

const LABELS: Record<keyof typeof POOLS, string> = {
  cuisine: "Cuisine",
  leftovers: "Leftovers",
  delivery: "Delivery",
  cook: "Cook at home",
  chains: "Fast-casual / chains",
};

type Key = keyof typeof POOLS;

export function DinnerPickerWheel({
  presetOptionLabels: _presetOptionLabels,
}: DinnerPickerWheelProps) {
  const [filter, setFilter] = useState<Key>("cuisine");
  const labels = useMemo(() => POOLS[filter], [filter]);
  const wheelSync = useControlledWheelLabels(labels);

  return (
    <div className="space-y-4">
      <Card className="p-4 md:p-5 space-y-3">
        <div className="flex items-center gap-2 text-primary font-semibold">
          <Utensils className="h-5 w-5" />
          <span>Dinner filters</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Each chip loads its own meal list. Fast-casual / chains is the old
          fast-food wheel dataset.
        </p>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Dinner filter">
          {(Object.keys(POOLS) as Key[]).map((key) => (
            <Button
              key={key}
              type="button"
              size="sm"
              variant={filter === key ? "default" : "outline"}
              onClick={() => setFilter(key)}
            >
              {LABELS[key]}
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
