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

type Mood = "any" | "cozy" | "horror";
type Length = "any" | "short";

type MovieItem = {
  label: string;
  mood: Mood[];
  length: Length[];
};

const MOVIES: MovieItem[] = [
  { label: "Feel-good comedy", mood: ["any", "cozy"], length: ["any"] },
  { label: "Light drama", mood: ["any"], length: ["any"] },
  { label: "Action night", mood: ["any"], length: ["any"] },
  { label: "Animated pick", mood: ["any", "cozy"], length: ["any", "short"] },
  { label: "Documentary", mood: ["any"], length: ["any"] },
  { label: "Classic rewatch", mood: ["any", "cozy"], length: ["any"] },
  { label: "Rom-com", mood: ["cozy"], length: ["any"] },
  { label: "Family adventure", mood: ["cozy"], length: ["any"] },
  { label: "Music documentary", mood: ["cozy"], length: ["any"] },
  { label: "Gentle animation", mood: ["cozy"], length: ["any", "short"] },
  { label: "Stand-up special", mood: ["any", "cozy"], length: ["short"] },
  { label: "Under 100 minutes", mood: ["any"], length: ["short"] },
  { label: "Two short episodes instead", mood: ["any", "cozy"], length: ["short"] },
  { label: "Classic horror", mood: ["horror"], length: ["any"] },
  { label: "Psychological thriller", mood: ["horror"], length: ["any"] },
  { label: "Found-footage scare", mood: ["horror"], length: ["any", "short"] },
  { label: "Creature feature", mood: ["horror"], length: ["any"] },
  { label: "Horror comedy", mood: ["horror"], length: ["any"] },
  { label: "Slow-burn dread", mood: ["horror"], length: ["any"] },
];

const FALLBACK = ["Feel-good comedy", "Classic rewatch"];

function filterMovies(mood: Mood, length: Length): string[] {
  const matches = MOVIES.filter((item) => {
    const moodOk = mood === "any" || item.mood.includes(mood);
    const lengthOk = length === "any" || item.length.includes(length);
    return moodOk && lengthOk;
  }).map((item) => item.label);
  const unique = [...new Set(matches)];
  return unique.length >= 2 ? unique : FALLBACK;
}

export function MoviePickerWheel({
  presetOptionLabels: _presetOptionLabels,
}: MoviePickerWheelProps) {
  const [mood, setMood] = useState<Mood>("any");
  const [length, setLength] = useState<Length>("any");
  const [useList, setUseList] = useState(false);
  const [listPaste, setListPaste] = useState("");

  const labels = useMemo(() => {
    if (useList) {
      const pasted = listPaste
        .split(/\n/)
        .map((s) => s.trim())
        .filter(Boolean);
      return pasted.length >= 2
        ? pasted
        : ["Add at least two titles", "Paste your watchlist"];
    }
    return filterMovies(mood, length);
  }, [mood, length, useList, listPaste]);

  return (
    <div className="space-y-4">
      <Card className="p-4 md:p-5 space-y-4">
        <div className="flex items-center gap-2 text-primary font-semibold">
          <Clapperboard className="h-5 w-5" />
          <span>Movie night filters</span>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Mood
          </p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Mood">
            {(["any", "cozy", "horror"] as Mood[]).map((key) => (
              <Button
                key={key}
                type="button"
                size="sm"
                variant={!useList && mood === key ? "default" : "outline"}
                onClick={() => {
                  setUseList(false);
                  setMood(key);
                }}
              >
                {key === "any"
                  ? "Any mood"
                  : key === "cozy"
                    ? "Cozy"
                    : "Horror / thriller"}
              </Button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Length
          </p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Length">
            {(["any", "short"] as Length[]).map((key) => (
              <Button
                key={key}
                type="button"
                size="sm"
                variant={!useList && length === key ? "default" : "outline"}
                onClick={() => {
                  setUseList(false);
                  setLength(key);
                }}
              >
                {key === "any" ? "Any length" : "Short"}
              </Button>
            ))}
          </div>
        </div>
        <Button
          type="button"
          size="sm"
          variant={useList ? "default" : "outline"}
          onClick={() => setUseList(true)}
        >
          Paste my watchlist
        </Button>
        {useList ? (
          <div className="space-y-2">
            <Label htmlFor="movie-list">Titles (one per line)</Label>
            <Textarea
              id="movie-list"
              rows={5}
              value={listPaste}
              onChange={(e) => setListPaste(e.target.value)}
              placeholder={"Title one\nTitle two"}
            />
          </div>
        ) : null}
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
        key={labels.join("|") + String(useList)}
        presetOptionLabels={labels}
        entriesListDefaultExpanded
      />
    </div>
  );
}
