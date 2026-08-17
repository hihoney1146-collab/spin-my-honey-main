import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { SpinWheel } from "@/components/SpinWheel";
import { Scale } from "lucide-react";

type YesOrNoWheelProps = {
  presetOptionLabels?: string[];
};

function clampWeight(n: number): number {
  if (!Number.isFinite(n)) return 0;
  return Math.min(10, Math.max(0, Math.round(n)));
}

function expandWeighted(yes: number, no: number, maybe: number): string[] {
  const out: string[] = [];
  for (let i = 0; i < yes; i++) out.push("Yes");
  for (let i = 0; i < no; i++) out.push("No");
  for (let i = 0; i < maybe; i++) out.push("Maybe");
  return out.length >= 2 ? out : ["Yes", "No"];
}

function majority(results: string[]): string {
  const counts = new Map<string, number>();
  for (const r of results) counts.set(r, (counts.get(r) || 0) + 1);
  const ranked = [...counts.entries()].sort((a, b) => b[1] - a[1]);
  if (ranked.length >= 2 && ranked[0][1] === ranked[1][1]) return "tie";
  return ranked[0]?.[0] || "tie";
}

export function YesOrNoWheel({
  presetOptionLabels: _presetOptionLabels,
}: YesOrNoWheelProps) {
  const [yesW, setYesW] = useState(2);
  const [noW, setNoW] = useState(2);
  const [maybeW, setMaybeW] = useState(1);
  const [bestOfThree, setBestOfThree] = useState(false);
  const [results, setResults] = useState<string[]>([]);

  const yes = clampWeight(yesW);
  const no = clampWeight(noW);
  const maybe = clampWeight(maybeW);
  const total = Math.max(2, yes + no + maybe);

  const labels = useMemo(
    () => expandWeighted(yes, no, maybe),
    [yes, no, maybe],
  );

  const handleWinner = (name: string) => {
    setResults((prev) => {
      const cap = bestOfThree ? 3 : 1;
      const next = [...prev, name];
      return next.slice(-cap);
    });
  };

  const series = bestOfThree ? results : results.slice(-1);
  const done = bestOfThree && series.length >= 3;

  return (
    <div className="space-y-4">
      <Card className="p-4 md:p-5 space-y-4">
        <div className="flex items-center gap-2 text-primary font-semibold">
          <Scale className="h-5 w-5" />
          <span>Weighted Yes / No / Maybe</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Weights rebuild the wheel: a weight of 3 gives that answer three equal
          slices (three times the chance of a weight of 1).
        </p>
        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-1">
            <Label htmlFor="w-yes">Yes weight</Label>
            <Input
              id="w-yes"
              type="number"
              min={0}
              max={10}
              value={yesW}
              onChange={(e) => setYesW(clampWeight(Number(e.target.value)))}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="w-no">No weight</Label>
            <Input
              id="w-no"
              type="number"
              min={0}
              max={10}
              value={noW}
              onChange={(e) => setNoW(clampWeight(Number(e.target.value)))}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="w-maybe">Maybe weight</Label>
            <Input
              id="w-maybe"
              type="number"
              min={0}
              max={10}
              value={maybeW}
              onChange={(e) => setMaybeW(clampWeight(Number(e.target.value)))}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            id="best-of-3"
            checked={bestOfThree}
            onCheckedChange={(on) => {
              setBestOfThree(on);
              setResults([]);
            }}
          />
          <Label htmlFor="best-of-3" className="cursor-pointer text-sm">
            Best of 3
          </Label>
        </div>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          On the wheel now ({labels.length} slices)
        </p>
        <ul className="text-sm text-foreground space-y-1">
          <li>
            Yes ×{yes} ({Math.round((yes / total) * 100)}%)
          </li>
          <li>
            No ×{no} ({Math.round((no / total) * 100)}%)
          </li>
          <li>
            Maybe ×{maybe} ({Math.round((maybe / total) * 100)}%)
          </li>
        </ul>
        {series.length > 0 ? (
          <div className="text-sm space-y-1">
            <p>
              {bestOfThree
                ? `Round ${Math.min(series.length, 3)} of 3: ${series.join(" · ")}`
                : `Last spin: ${series[0]}`}
            </p>
            {done ? (
              <p className="font-medium">
                Majority: {majority(series.slice(0, 3))}
              </p>
            ) : null}
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => setResults([])}
            >
              Reset run
            </Button>
          </div>
        ) : null}
      </Card>
      <SpinWheel
        key={labels.join("|")}
        presetOptionLabels={labels}
        onWinnerSelected={handleWinner}
        entriesListDefaultExpanded
      />
    </div>
  );
}
