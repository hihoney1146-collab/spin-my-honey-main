import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SpinWheel } from "@/components/SpinWheel";
import { Shirt } from "lucide-react";
import { useControlledWheelLabels } from "@/lib/useControlledWheelLabels";

type OutfitPickerWheelProps = {
  presetOptionLabels?: string[];
};

type Occasion = "work" | "casual" | "date";
type Weather = "any" | "rain" | "heat";

type OutfitItem = {
  label: string;
  occasion: Occasion[];
  weather: Weather[];
};

const OUTFITS: OutfitItem[] = [
  { label: "Blazer + trousers", occasion: ["work"], weather: ["any"] },
  { label: "Knit sweater + chinos", occasion: ["work", "casual"], weather: ["any"] },
  { label: "Button-down + dark jeans", occasion: ["work", "date"], weather: ["any"] },
  { label: "Midi dress + cardigan", occasion: ["work", "date"], weather: ["any"] },
  { label: "Smart polo + slacks", occasion: ["work"], weather: ["any", "heat"] },
  { label: "Tee + jeans", occasion: ["casual"], weather: ["any", "heat"] },
  { label: "Hoodie + joggers", occasion: ["casual"], weather: ["any", "rain"] },
  { label: "Flannel + denim", occasion: ["casual", "date"], weather: ["any"] },
  { label: "Sundress + sneakers", occasion: ["casual", "date"], weather: ["heat"] },
  { label: "Overshirt + shorts", occasion: ["casual"], weather: ["heat"] },
  { label: "Athleisure set", occasion: ["casual"], weather: ["any", "heat"] },
  { label: "Nice jeans + statement top", occasion: ["date"], weather: ["any"] },
  { label: "Blouse + skirt", occasion: ["date", "work"], weather: ["any", "heat"] },
  { label: "Dark denim + boots", occasion: ["date", "casual"], weather: ["any", "rain"] },
  { label: "Simple dress + jacket", occasion: ["date"], weather: ["any", "rain"] },
  { label: "Waterproof shell + jeans", occasion: ["work", "casual", "date"], weather: ["rain"] },
  { label: "Trench + boots", occasion: ["work", "date"], weather: ["rain"] },
  { label: "Hoodie under rain jacket", occasion: ["casual"], weather: ["rain"] },
  { label: "Linen shirt + shorts", occasion: ["casual", "date"], weather: ["heat"] },
  { label: "Tank + wide pants", occasion: ["casual"], weather: ["heat"] },
  { label: "Breathable tee + skirt", occasion: ["casual", "date"], weather: ["heat"] },
  { label: "Light dress + sandals", occasion: ["date", "casual"], weather: ["heat"] },
];

const FALLBACK = ["Tee + jeans", "Blazer + trousers", "Hoodie + joggers", "Simple dress + jacket"];

function filterOutfits(occasion: Occasion, weather: Weather): string[] {
  const matches = OUTFITS.filter(
    (item) =>
      item.occasion.includes(occasion) &&
      (weather === "any"
        ? item.weather.includes("any") || item.weather.length > 0
        : item.weather.includes(weather) || item.weather.includes("any"))
  ).map((item) => item.label);
  const unique = [...new Set(matches)];
  return unique.length >= 2 ? unique : FALLBACK;
}

export function OutfitPickerWheel({
  presetOptionLabels: _presetOptionLabels,
}: OutfitPickerWheelProps) {
  const [occasion, setOccasion] = useState<Occasion>("casual");
  const [weather, setWeather] = useState<Weather>("any");

  const labels = useMemo(() => filterOutfits(occasion, weather), [occasion, weather]);
  const wheelSync = useControlledWheelLabels(labels);

  return (
    <div className="space-y-4">
      <Card className="p-4 md:p-5 space-y-4">
        <div className="flex items-center gap-2 text-primary font-semibold">
          <Shirt className="h-5 w-5" />
          <span>Occasion &amp; weather filters</span>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Occasion
          </p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Occasion">
            {(["work", "casual", "date"] as Occasion[]).map((key) => (
              <Button
                key={key}
                type="button"
                size="sm"
                variant={occasion === key ? "default" : "outline"}
                onClick={() => setOccasion(key)}
              >
                {key === "work" ? "Work" : key === "casual" ? "Casual" : "Date"}
              </Button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Weather
          </p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Weather">
            {(["any", "rain", "heat"] as Weather[]).map((key) => (
              <Button
                key={key}
                type="button"
                size="sm"
                variant={weather === key ? "default" : "outline"}
                onClick={() => setWeather(key)}
              >
                {key === "any" ? "Any weather" : key === "rain" ? "Rain" : "Heat"}
              </Button>
            ))}
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Both toggles rebuild the wheel from a tagged outfit dataset (
          {labels.length} looks match).
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
