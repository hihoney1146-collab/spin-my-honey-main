import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SpinWheel } from "@/components/SpinWheel";
import { ResultProofActions } from "@/components/ResultProofActions";
import { Gift, Ticket, Trophy, Users } from "lucide-react";
import {
  applyDuplicatePolicy,
  duplicateNotice,
  labelsToMultiline,
  parseEntryLines,
} from "@/lib/wheelEntryLabels";

type RaffleWheelProps = {
  presetOptionLabels?: string[];
};

type DrawMode = "tickets" | "names" | "prizes";

const DEFAULT_PRIZES = [
  "Grand Prize",
  "Gift Card",
  "Free T-Shirt",
  "Bonus Entry",
  "Second Place",
  "Try Again",
  "Third Place",
  "10% Off",
];

const DEFAULT_NAMES = ["Alex", "Jordan", "Sam", "Taylor", "Casey", "Morgan", "Riley", "Quinn"];

function padTicket(n: number, width: number): string {
  return `#${String(n).padStart(width, "0")}`;
}

function generateTicketRange(count: number): string[] {
  const width = Math.max(3, String(count).length);
  return Array.from({ length: count }, (_, i) => padTicket(i + 1, width));
}

export function RaffleWheel({ presetOptionLabels }: RaffleWheelProps) {
  const [mode, setMode] = useState<DrawMode>("tickets");
  const [ticketCount, setTicketCount] = useState(20);
  const [ticketPaste, setTicketPaste] = useState("");
  const [namePaste, setNamePaste] = useState(
    presetOptionLabels?.length ? presetOptionLabels.join("\n") : DEFAULT_NAMES.join("\n"),
  );
  const [prizePaste, setPrizePaste] = useState(DEFAULT_PRIZES.join("\n"));
  const [winnerCount, setWinnerCount] = useState(1);
  const [winners, setWinners] = useState<string[]>([]);
  const [entryCountAtDraw, setEntryCountAtDraw] = useState(0);

  const ticketParsed = useMemo(() => {
    const pasted = parseEntryLines(ticketPaste);
    if (pasted.length > 0) {
      return applyDuplicatePolicy(pasted, "dedupe");
    }
    return { labels: generateTicketRange(Math.min(Math.max(2, ticketCount), 400)), removedCount: 0, duplicateCount: 0 };
  }, [ticketPaste, ticketCount]);

  const nameParsed = useMemo(
    () => applyDuplicatePolicy(parseEntryLines(namePaste), "dedupe"),
    [namePaste],
  );

  const prizeLabels = useMemo(() => {
    const pasted = parseEntryLines(prizePaste);
    return pasted.length >= 2 ? pasted : DEFAULT_PRIZES;
  }, [prizePaste]);

  const entryLabels =
    mode === "tickets"
      ? ticketParsed.labels
      : mode === "prizes"
        ? prizeLabels
        : nameParsed.labels.length >= 2
          ? nameParsed.labels
          : DEFAULT_NAMES;

  const duplicateMessage =
    mode === "tickets" && ticketPaste.trim()
      ? duplicateNotice("dedupe", ticketParsed.removedCount, 0)
      : mode === "names"
        ? duplicateNotice("dedupe", nameParsed.removedCount, 0)
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

  const setModeAndReset = (next: DrawMode) => {
    setMode(next);
    resetDraw();
  };

  const handleLabelsChange = (labels: string[]) => {
    if (mode === "tickets") setTicketPaste(labelsToMultiline(labels));
    else if (mode === "names") setNamePaste(labelsToMultiline(labels));
    else setPrizePaste(labelsToMultiline(labels));
    resetDraw();
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 md:p-5 space-y-4">
        <div className="flex items-center gap-2 text-primary font-semibold">
          <Ticket className="h-5 w-5" />
          <span>Raffle &amp; prize draw controls</span>
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Draw mode">
          <Button
            type="button"
            size="sm"
            variant={mode === "tickets" ? "default" : "outline"}
            onClick={() => setModeAndReset("tickets")}
          >
            <Ticket className="h-4 w-4 mr-1" />
            Ticket numbers
          </Button>
          <Button
            type="button"
            size="sm"
            variant={mode === "names" ? "default" : "outline"}
            onClick={() => setModeAndReset("names")}
          >
            <Users className="h-4 w-4 mr-1" />
            Entrant names
          </Button>
          <Button
            type="button"
            size="sm"
            variant={mode === "prizes" ? "default" : "outline"}
            onClick={() => setModeAndReset("prizes")}
          >
            <Gift className="h-4 w-4 mr-1" />
            Prize labels
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="space-y-2">
            <Label htmlFor="raffle-winners">Winners to draw</Label>
            <Input
              id="raffle-winners"
              type="number"
              min={1}
              max={20}
              value={winnerCount}
              onChange={(e) => {
                setWinnerCount(Math.max(1, Number(e.target.value) || 1));
                resetDraw();
              }}
              className="w-28"
            />
          </div>
          {winners.length > 0 ? (
            <Button variant="outline" onClick={resetDraw}>
              Reset draw
            </Button>
          ) : null}
        </div>

        {mode === "tickets" ? (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="ticket-count">Auto-generate ticket count</Label>
              <Input
                id="ticket-count"
                type="number"
                min={2}
                max={400}
                value={ticketCount}
                onChange={(e) => setTicketCount(Number(e.target.value) || 20)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ticket-paste">Or paste ticket numbers</Label>
              <Textarea
                id="ticket-paste"
                value={ticketPaste}
                onChange={(e) => setTicketPaste(e.target.value)}
                rows={3}
                placeholder="#001, #002, #003…"
              />
              {duplicateMessage ? (
                <p className="text-xs text-muted-foreground">{duplicateMessage}</p>
              ) : null}
            </div>
          </div>
        ) : null}

        {mode === "names" ? (
          <div className="space-y-2">
            <Label htmlFor="raffle-names">Entrant names (one per line)</Label>
            <Textarea
              id="raffle-names"
              value={namePaste}
              onChange={(e) => setNamePaste(e.target.value)}
              rows={5}
              placeholder="Alex&#10;Jordan&#10;Sam"
            />
            {duplicateMessage ? (
              <p className="text-xs text-muted-foreground">{duplicateMessage}</p>
            ) : null}
          </div>
        ) : null}

        {mode === "prizes" ? (
          <div className="space-y-2">
            <Label htmlFor="prize-paste">Prize labels (one per line)</Label>
            <Textarea
              id="prize-paste"
              value={prizePaste}
              onChange={(e) => setPrizePaste(e.target.value)}
              rows={5}
              placeholder="Grand Prize&#10;Gift Card&#10;Try Again"
            />
            <p className="text-xs text-muted-foreground">
              Classic prize-wheel slices: edit labels for store promos, streams, or party stations.
            </p>
          </div>
        ) : null}

        <p className="text-xs text-muted-foreground">
          {entryLabels.length} entrant{entryLabels.length === 1 ? "" : "s"} on the wheel
        </p>

        {winners.length > 0 ? (
          <div className="text-sm border-t border-border pt-3">
            <p className="font-medium flex items-center gap-2 mb-1">
              <Trophy className="h-4 w-4 text-primary" />
              {mode === "prizes" ? "Prizes landed" : "Raffle winners"} ({winners.length}/
              {winnerCount})
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
            sourceSlug="raffle-wheel"
          />
        ) : null}
      </Card>

      <SpinWheel
        entryLabels={entryLabels}
        onEntryLabelsChange={handleLabelsChange}
        hideBulkPaste
        autoRemoveWinner={winnerCount > 1}
        onWinnerSelected={handleWinner}
        resultProofSlug="raffle-wheel"
        shareEnabled
        streamerToggle
      />
    </div>
  );
}
