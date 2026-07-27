import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SpinWheel } from "@/components/SpinWheel";
import { Scale } from "lucide-react";

type YesOrNoWheelProps = {
  presetOptionLabels?: string[];
};

function expandWeighted(yes: number, no: number, maybe: number): string[] {
  const out: string[] = [];
  for (let i = 0; i < yes; i++) out.push("Yes");
  for (let i = 0; i < no; i++) out.push("No");
  for (let i = 0; i < maybe; i++) out.push("Maybe");
  return out.length >= 2 ? out : ["Yes", "No"];
}

export function YesOrNoWheel({ presetOptionLabels }: YesOrNoWheelProps) {
  const [yesW, setYesW] = useState(2);
  const [noW, setNoW] = useState(2);
  const [maybeW, setMaybeW] = useState(1);
  const [bestOf, setBestOf] = useState(1);
  const [results, setResults] = useState<string[]>([]);

  const labels = useMemo(() => {
    if (presetOptionLabels?.length && yesW === 2 && noW === 2 && maybeW === 1) {
      return presetOptionLabels;
    }
    return expandWeighted(yesW, noW, maybeW);
  }, [yesW, noW, maybeW, presetOptionLabels]);

  const handleWinner = (name: string) => {
    setResults((prev) => {
      const next = [...prev, name];
      return next.slice(-Math.max(1, bestOf));
    });
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 md:p-5 space-y-4">
        <div className="flex items-center gap-2 text-primary font-semibold">
          <Scale className="h-5 w-5" />
          <span>Weighted Yes / No / Maybe</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="space-y-1">
            <Label htmlFor="w-yes">Yes weight</Label>
            <Input
              id="w-yes"
              type="number"
              min={0}
              max={10}
              value={yesW}
              onChange={(e) => setYesW(Math.max(0, Number(e.target.value) || 0))}
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
              onChange={(e) => setNoW(Math.max(0, Number(e.target.value) || 0))}
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
              onChange={(e) => setMaybeW(Math.max(0, Number(e.target.value) || 0))}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="w-best">Best of</Label>
            <Input
              id="w-best"
              type="number"
              min={1}
              max={5}
              value={bestOf}
              onChange={(e) => setBestOf(Math.max(1, Number(e.target.value) || 1))}
            />
          </div>
        </div>
        {results.length > 0 ? (
          <p className="text-sm text-muted-foreground">
            Recent: {results.join(" · ")}
            {bestOf > 1 && results.length >= bestOf
              ? ` — majority leans ${majority(results)}`
              : ""}
          </p>
        ) : null}
      </Card>
      <SpinWheel
        key={labels.join("|")}
        presetOptionLabels={labels}
        onWinnerSelected={handleWinner}
      />
    </div>
  );
}

function majority(results: string[]): string {
  const counts = new Map<string, number>();
  for (const r of results) counts.set(r, (counts.get(r) || 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] || "tie";
}
