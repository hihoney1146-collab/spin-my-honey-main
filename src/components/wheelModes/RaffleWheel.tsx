import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { SpinWheel } from "@/components/SpinWheel";
import { ResultProofActions } from "@/components/ResultProofActions";
import { Ticket, Trophy } from "lucide-react";

type RaffleWheelProps = {
  presetOptionLabels?: string[];
};

function padTicket(n: number, width: number): string {
  return `#${String(n).padStart(width, "0")}`;
}

function generateTicketRange(count: number): string[] {
  const width = Math.max(3, String(count).length);
  return Array.from({ length: count }, (_, i) => padTicket(i + 1, width));
}

export function RaffleWheel({ presetOptionLabels }: RaffleWheelProps) {
  const [ticketMode, setTicketMode] = useState(true);
  const [ticketCount, setTicketCount] = useState(20);
  const [ticketPaste, setTicketPaste] = useState("");
  const [winnerCount, setWinnerCount] = useState(1);
  const [winners, setWinners] = useState<string[]>([]);
  const [entryCountAtDraw, setEntryCountAtDraw] = useState(0);

  const ticketLabels = useMemo(() => {
    const pasted = ticketPaste
      .split(/[\n,]+/)
      .map((s) => s.trim())
      .filter(Boolean);
    if (pasted.length > 0) return pasted;
    return generateTicketRange(Math.min(Math.max(2, ticketCount), 400));
  }, [ticketPaste, ticketCount]);

  const nameLabels =
    presetOptionLabels?.length && !ticketMode
      ? presetOptionLabels
      : ["Alex", "Jordan", "Sam", "Taylor", "Casey", "Morgan", "Riley", "Quinn"];

  const activeLabels = ticketMode ? ticketLabels : nameLabels;

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
          <Ticket className="h-5 w-5" />
          <span>Raffle draw controls</span>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch
              id="ticket-mode"
              checked={ticketMode}
              onCheckedChange={(v) => {
                setTicketMode(v);
                resetDraw();
              }}
            />
            <Label htmlFor="ticket-mode" className="cursor-pointer">
              Ticket-number mode
            </Label>
          </div>
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

        {ticketMode ? (
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
            </div>
          </div>
        ) : null}

        {winners.length > 0 ? (
          <div className="text-sm border-t border-border pt-3">
            <p className="font-medium flex items-center gap-2 mb-1">
              <Trophy className="h-4 w-4 text-primary" />
              Raffle winners ({winners.length}/{winnerCount})
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
            entryCount={entryCountAtDraw || activeLabels.length}
            sourceSlug="raffle-wheel"
          />
        ) : null}
      </Card>

      <SpinWheel
        key={activeLabels.join("|") + winnerCount}
        presetOptionLabels={activeLabels}
        autoRemoveWinner={winnerCount > 1}
        onWinnerSelected={handleWinner}
        resultProofSlug="raffle-wheel"
        shareEnabled
        streamerToggle
      />
    </div>
  );
}
