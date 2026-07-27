import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SpinWheel } from "@/components/SpinWheel";
import { ResultProofActions } from "@/components/ResultProofActions";
import { Trophy } from "lucide-react";

type WinnerPickerWheelProps = {
  presetOptionLabels?: string[];
};

function normalizeHandle(raw: string): string {
  const t = raw.trim();
  if (!t) return "";
  return t.startsWith("@") ? t : `@${t.replace(/^@+/, "")}`;
}

function dedupeHandles(lines: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const line of lines) {
    const n = normalizeHandle(line);
    if (!n) continue;
    const key = n.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(n);
  }
  return out;
}

export function WinnerPickerWheel({
  presetOptionLabels,
}: WinnerPickerWheelProps) {
  const [winnerCount, setWinnerCount] = useState(1);
  const [winners, setWinners] = useState<string[]>([]);
  const [entryCountAtDraw, setEntryCountAtDraw] = useState(0);
  const [paste, setPaste] = useState("");

  const labels = useMemo(() => {
    const pasted = dedupeHandles(paste.split(/[\n,]+/));
    if (pasted.length >= 2) return pasted;
    return (
      presetOptionLabels?.length
        ? dedupeHandles(presetOptionLabels)
        : ["@alex", "@jordan", "@sam", "@taylor", "@casey", "@morgan"]
    );
  }, [paste, presetOptionLabels]);

  const handleWinner = (name: string, ctx?: { entryCount: number }) => {
    if (ctx?.entryCount) setEntryCountAtDraw(ctx.entryCount);
    setWinners((prev) => {
      if (prev.includes(name)) return prev;
      const next = [...prev, name];
      return next.slice(0, winnerCount);
    });
  };

  const resetDraw = () => {
    setWinners([]);
    setEntryCountAtDraw(0);
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 md:p-5 space-y-4">
        <div className="flex items-center gap-2 text-primary font-semibold">
          <Trophy className="h-5 w-5" />
          <span>Multi-winner giveaway draw</span>
        </div>
        <div className="space-y-2">
          <Label htmlFor="winner-paste">Paste @handles (duplicates removed)</Label>
          <Textarea
            id="winner-paste"
            rows={4}
            value={paste}
            onChange={(e) => {
              setPaste(e.target.value);
              resetDraw();
            }}
            placeholder="@alex&#10;@jordan&#10;@sam"
          />
          <p className="text-xs text-muted-foreground">
            {labels.length} unique entrants on the wheel
            {paste.trim() ? " after @handle dedupe" : ""}
          </p>
        </div>
        <div className="flex flex-wrap items-end gap-4">
          <div className="space-y-2">
            <Label htmlFor="winner-count">Winners to draw</Label>
            <Input
              id="winner-count"
              type="number"
              min={1}
              max={20}
              value={winnerCount}
              onChange={(e) => {
                setWinnerCount(Math.max(1, Number(e.target.value) || 1));
                resetDraw();
              }}
              className="w-32"
            />
          </div>
          {winners.length > 0 ? (
            <Button variant="outline" onClick={resetDraw}>
              Reset draw
            </Button>
          ) : null}
        </div>
        {winners.length > 0 ? (
          <div className="text-sm">
            <p className="font-medium mb-1">
              Winners ({winners.length}/{winnerCount}):
            </p>
            <ul className="text-muted-foreground">
              {winners.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
          </div>
        ) : null}
        {winners.length >= winnerCount && winners.length > 0 ? (
          <ResultProofActions
            winners={winners.slice(0, winnerCount)}
            entryCount={entryCountAtDraw || labels.length}
            sourceSlug="winner-picker-wheel"
          />
        ) : null}
      </Card>

      <SpinWheel
        key={labels.join("|")}
        presetOptionLabels={labels}
        autoRemoveWinner={winnerCount > 1}
        onWinnerSelected={handleWinner}
        resultProofSlug="winner-picker-wheel"
        shareEnabled
        streamerToggle
      />
    </div>
  );
}
