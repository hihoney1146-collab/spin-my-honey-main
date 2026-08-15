import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SpinWheel } from "@/components/SpinWheel";
import { History, Users } from "lucide-react";

type RandomNamePickerWheelProps = {
  presetOptionLabels?: string[];
};

type WeightedName = { name: string; weight: number };

const DEFAULT_NAMES = ["Alex", "Jordan", "Sam", "Taylor", "Casey", "Riley"];

function parseWeightedLines(raw: string): WeightedName[] {
  return raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const match = line.match(/^(.*?)(?:[:*|x×]\s*(\d+)\s*)?$/i);
      const name = (match?.[1] ?? line).trim();
      const weight = Math.min(20, Math.max(1, Number(match?.[2] || 1)));
      return name ? { name, weight } : null;
    })
    .filter((row): row is WeightedName => Boolean(row?.name));
}

function expandWeighted(rows: WeightedName[]): string[] {
  const out: string[] = [];
  for (const row of rows) {
    for (let i = 0; i < row.weight; i++) out.push(row.name);
  }
  return out.length >= 2 ? out : DEFAULT_NAMES;
}

function toWeightedLines(rows: WeightedName[], useWeights: boolean): string {
  return rows
    .map((r) => (useWeights && r.weight !== 1 ? `${r.name}:${r.weight}` : r.name))
    .join("\n");
}

export function RandomNamePickerWheel({
  presetOptionLabels,
}: RandomNamePickerWheelProps) {
  const initialRows: WeightedName[] = (
    presetOptionLabels?.length ? presetOptionLabels : DEFAULT_NAMES
  ).map((name) => ({ name, weight: 1 }));

  const [removeAfterPick, setRemoveAfterPick] = useState(true);
  const [useWeights, setUseWeights] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [rows, setRows] = useState<WeightedName[]>(initialRows);
  const [draft, setDraft] = useState(() =>
    toWeightedLines(initialRows, false)
  );

  const labels = useMemo(() => {
    if (!useWeights) return rows.map((r) => r.name);
    return expandWeighted(rows);
  }, [rows, useWeights]);

  const applyDraft = () => {
    const parsed = parseWeightedLines(draft);
    if (parsed.length >= 2) {
      setRows(parsed);
      setDraft(toWeightedLines(parsed, useWeights));
    }
  };

  const handleWinner = (name: string) => {
    setHistory((prev) => [name, ...prev]);
    if (removeAfterPick) {
      setRows((prev) => {
        const next = prev.filter((r) => r.name !== name);
        const safe = next.length >= 2 ? next : prev;
        setDraft(toWeightedLines(safe, useWeights));
        return safe;
      });
    }
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 md:p-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-primary font-semibold">
          <Users className="h-5 w-5" />
          <span>Name picker controls</span>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch
              id="name-remove"
              checked={removeAfterPick}
              onCheckedChange={setRemoveAfterPick}
            />
            <Label htmlFor="name-remove" className="cursor-pointer text-sm">
              Remove after pick
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              id="name-weights"
              checked={useWeights}
              onCheckedChange={(on) => {
                setUseWeights(on);
                setDraft(toWeightedLines(rows, on));
              }}
            />
            <Label htmlFor="name-weights" className="cursor-pointer text-sm">
              Weighted entries
            </Label>
          </div>
        </div>
      </Card>

      <Card className="p-4 md:p-5 space-y-3">
        <Label htmlFor="name-list">
          {useWeights
            ? "Names (one per line, optional Name:weight)"
            : "Names (one per line)"}
        </Label>
        <Textarea
          id="name-list"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={6}
          className="font-mono text-sm"
          placeholder={
            useWeights
              ? "Alex:2\nJordan\nSam:3"
              : "Alex\nJordan\nSam"
          }
        />
        {useWeights ? (
          <p className="text-xs text-muted-foreground">
            Weight multiplies slices (Alex:3 gives Alex three equal chances). Leave
            weights off for a classic equal hat draw.
          </p>
        ) : (
          <p className="text-xs text-muted-foreground">
            Same idea as pulling slips from a hat: every listed name gets an equal
            chance until you remove winners.
          </p>
        )}
        <Button type="button" size="sm" onClick={applyDraft}>
          Update wheel from list
        </Button>
        {useWeights && rows.some((r) => r.weight > 1) ? (
          <ul className="text-xs text-muted-foreground space-y-1">
            {rows.map((r) => (
              <li key={r.name}>
                {r.name}: weight {r.weight}
              </li>
            ))}
          </ul>
        ) : null}
      </Card>

      <SpinWheel
        key={`${labels.join("|")}-${useWeights ? "w" : "e"}`}
        presetOptionLabels={labels}
        autoRemoveWinner={false}
        onWinnerSelected={handleWinner}
        resultProofSlug="random-name-picker-wheel"
        shareEnabled
        streamerToggle
      />

      {history.length > 0 ? (
        <Card className="p-4 md:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <h3 className="font-bold flex items-center gap-2">
              <History className="h-4 w-4 text-primary" />
              Session history
            </h3>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setHistory([])}
            >
              Clear history
            </Button>
          </div>
          <ol className="space-y-1 text-sm text-muted-foreground">
            {history.map((name, i) => (
              <li key={`${name}-${i}`}>
                <span className="font-medium text-foreground">
                  {history.length - i}.
                </span>{" "}
                {name}
              </li>
            ))}
          </ol>
        </Card>
      ) : null}
    </div>
  );
}
