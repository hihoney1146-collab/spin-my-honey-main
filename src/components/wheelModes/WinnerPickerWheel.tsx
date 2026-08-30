import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SpinWheel } from "@/components/SpinWheel";
import { ResultProofActions } from "@/components/ResultProofActions";
import { Trophy } from "lucide-react";
import {
  applyDuplicatePolicy,
  duplicateNotice,
  labelsToMultiline,
  parseEntryLines,
} from "@/lib/wheelEntryLabels";

type WinnerPickerWheelProps = {
  presetOptionLabels?: string[];
};

const DEFAULT_HANDLES = ["@alex", "@jordan", "@sam", "@taylor", "@casey", "@morgan"];

function normalizeHandle(raw: string): string {
  const t = raw.trim();
  if (!t) return "";
  return t.startsWith("@") ? t : `@${t.replace(/^@+/, "")}`;
}

export function WinnerPickerWheel({
  presetOptionLabels: _presetOptionLabels,
}: WinnerPickerWheelProps) {
  const [winnerCount, setWinnerCount] = useState(1);
  const [winners, setWinners] = useState<string[]>([]);
  const [entryCountAtDraw, setEntryCountAtDraw] = useState(0);
  const [paste, setPaste] = useState("");

  const parsedPaste = useMemo(
    () => applyDuplicatePolicy(parseEntryLines(paste), "dedupe", normalizeHandle),
    [paste],
  );

  const entryLabels = useMemo(() => {
    if (paste.trim()) return parsedPaste.labels;
    return DEFAULT_HANDLES;
  }, [paste, parsedPaste.labels]);

  const duplicateMessage = paste.trim()
    ? duplicateNotice("dedupe", parsedPaste.removedCount, 0)
    : null;

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

  const handleLabelsChange = (labels: string[]) => {
    setPaste(labelsToMultiline(labels));
    resetDraw();
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
            {entryLabels.length} unique entrants on the wheel
            {duplicateMessage ? ` — ${duplicateMessage}` : paste.trim() ? " after @handle dedupe" : ""}
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
            entryCount={entryCountAtDraw || entryLabels.length}
            sourceSlug="winner-picker-wheel"
          />
        ) : null}
      </Card>

      <SpinWheel
        entryLabels={entryLabels}
        onEntryLabelsChange={handleLabelsChange}
        hideBulkPaste
        autoRemoveWinner={winnerCount > 1}
        onWinnerSelected={handleWinner}
        resultProofSlug="winner-picker-wheel"
        shareEnabled
        streamerToggle
      />
    </div>
  );
}
