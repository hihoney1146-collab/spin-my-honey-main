import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SpinWheel } from "@/components/SpinWheel";
import { Utensils } from "lucide-react";

type DinnerPickerWheelProps = {
  presetOptionLabels?: string[];
};

const POOLS: Record<string, string[]> = {
  any: [
    "Pasta night",
    "Tacos",
    "Stir-fry",
    "Salad bowls",
    "Soup + bread",
    "Grain bowls",
    "Eggs-for-dinner",
    "Leftovers remix",
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
    "Burgers",
    "Sushi order",
    "Indian takeout",
    "Mediterranean bowls",
  ],
  cook: [
    "Sheet-pan veggies + protein",
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
    "Coffee + bakery dinner",
  ],
};

type Key = keyof typeof POOLS;

export function DinnerPickerWheel({
  presetOptionLabels,
}: DinnerPickerWheelProps) {
  const [filter, setFilter] = useState<Key>("any");
  const labels = useMemo(() => {
    if (presetOptionLabels?.length && filter === "any") return presetOptionLabels;
    return POOLS[filter];
  }, [filter, presetOptionLabels]);

  return (
    <div className="space-y-4">
      <Card className="p-4 md:p-5 space-y-3">
        <div className="flex items-center gap-2 text-primary font-semibold">
          <Utensils className="h-5 w-5" />
          <span>Dinner filters</span>
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
                : key === "leftovers"
                  ? "Leftovers"
                  : key === "delivery"
                    ? "Delivery"
                    : key === "cook"
                      ? "Cook at home"
                      : "Fast-casual / chains"}
            </Button>
          ))}
        </div>
      </Card>
      <SpinWheel key={labels.join("|")} presetOptionLabels={labels} />
    </div>
  );
}
