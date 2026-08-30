import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SpinWheel } from "@/components/SpinWheel";
import { Heart } from "lucide-react";
import { useControlledWheelLabels } from "@/lib/useControlledWheelLabels";

type DateNightWheelProps = {
  presetOptionLabels?: string[];
};

type Location = "any" | "home" | "out";
type Budget = "any" | "budget" | "treat";

type Plan = {
  label: string;
  location: Location[];
  budget: Budget[];
};

const PLANS: Plan[] = [
  { label: "Cook together", location: ["any", "home"], budget: ["any", "budget"] },
  { label: "Walk and dessert", location: ["any", "out"], budget: ["any", "budget"] },
  { label: "Board game night", location: ["any", "home"], budget: ["any", "budget"] },
  { label: "Movie and snacks", location: ["any", "home"], budget: ["any", "budget"] },
  { label: "Coffee date", location: ["any", "out"], budget: ["any", "budget"] },
  { label: "Museum or gallery", location: ["any", "out"], budget: ["any"] },
  { label: "Living-room picnic", location: ["home"], budget: ["any", "budget"] },
  { label: "Dance in the kitchen", location: ["home"], budget: ["budget"] },
  { label: "Puzzle night", location: ["home"], budget: ["budget"] },
  { label: "Plan a future trip", location: ["home"], budget: ["budget"] },
  { label: "Casual dinner out", location: ["out"], budget: ["any"] },
  { label: "Bowling or arcade", location: ["out"], budget: ["any"] },
  { label: "Bookstore browse and tea", location: ["out"], budget: ["budget"] },
  { label: "Sunset walk downtown", location: ["out"], budget: ["budget"] },
  { label: "Food-truck crawl", location: ["out"], budget: ["any"] },
  { label: "Free park picnic", location: ["out", "home"], budget: ["budget"] },
  { label: "Thrift-store hunt", location: ["out"], budget: ["budget"] },
  { label: "Library date", location: ["out"], budget: ["budget"] },
  { label: "Nice dinner reservation", location: ["out"], budget: ["treat"] },
  { label: "Spa-style night in", location: ["home"], budget: ["treat"] },
  { label: "Concert or show", location: ["out"], budget: ["treat"] },
  { label: "Dessert tasting flight", location: ["out"], budget: ["treat"] },
  { label: "Cooking class kit", location: ["home"], budget: ["treat"] },
];

const FALLBACK = ["Cook together", "Walk and dessert"];

function filterPlans(location: Location, budget: Budget): string[] {
  const matches = PLANS.filter((item) => {
    const locOk = location === "any" || item.location.includes(location);
    const budOk = budget === "any" || item.budget.includes(budget);
    return locOk && budOk;
  }).map((item) => item.label);
  const unique = [...new Set(matches)];
  return unique.length >= 2 ? unique : FALLBACK;
}

export function DateNightWheel({
  presetOptionLabels: _presetOptionLabels,
}: DateNightWheelProps) {
  const [location, setLocation] = useState<Location>("any");
  const [budget, setBudget] = useState<Budget>("any");
  const labels = useMemo(
    () => filterPlans(location, budget),
    [location, budget],
  );
  const wheelSync = useControlledWheelLabels(labels);

  return (
    <div className="space-y-4">
      <Card className="p-4 md:p-5 space-y-4">
        <div className="flex items-center gap-2 text-primary font-semibold">
          <Heart className="h-5 w-5" />
          <span>Date-night filters</span>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Where
          </p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Location">
            {(["any", "home", "out"] as Location[]).map((key) => (
              <Button
                key={key}
                type="button"
                size="sm"
                variant={location === key ? "default" : "outline"}
                onClick={() => setLocation(key)}
              >
                {key === "any" ? "Anywhere" : key === "home" ? "At home" : "Go out"}
              </Button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Budget
          </p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Budget">
            {(["any", "budget", "treat"] as Budget[]).map((key) => (
              <Button
                key={key}
                type="button"
                size="sm"
                variant={budget === key ? "default" : "outline"}
                onClick={() => setBudget(key)}
              >
                {key === "any"
                  ? "Any budget"
                  : key === "budget"
                    ? "Budget"
                    : "Treat night"}
              </Button>
            ))}
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Both filters rebuild the plan list from a tagged dataset (
          {labels.length} plans match).
        </p>
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
