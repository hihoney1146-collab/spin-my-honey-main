import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SpinWheel } from "@/components/SpinWheel";
import { Trophy, Copy, Link2 } from "lucide-react";
import { toast } from "sonner";
import { SITE_ORIGIN } from "@/lib/schema";

type WinnerPickerWheelProps = {
  presetOptionLabels?: string[];
};

function encodeProof(winners: string[]): string {
  const payload = {
    w: winners,
    t: Date.now(),
  };
  return btoa(JSON.stringify(payload))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export function WinnerPickerWheel({
  presetOptionLabels,
}: WinnerPickerWheelProps) {
  const [winnerCount, setWinnerCount] = useState(1);
  const [winners, setWinners] = useState<string[]>([]);
  const [proofUrl, setProofUrl] = useState<string | null>(null);

  const handleWinner = (name: string) => {
    setWinners((prev) => {
      if (prev.includes(name)) return prev;
      const next = [...prev, name];
      if (next.length >= winnerCount) {
        const token = encodeProof(next.slice(0, winnerCount));
        setProofUrl(
          `${SITE_ORIGIN}/winner-picker-wheel?proof=${token}`,
        );
      }
      return next.slice(0, winnerCount);
    });
  };

  const copyProof = async () => {
    if (!proofUrl) return;
    await navigator.clipboard.writeText(proofUrl);
    toast.success("Proof link copied — paste in your giveaway post.");
  };

  const resetDraw = () => {
    setWinners([]);
    setProofUrl(null);
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 md:p-5 space-y-4">
        <div className="flex items-center gap-2 text-primary font-semibold">
          <Trophy className="h-5 w-5" />
          <span>Multi-winner giveaway draw</span>
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
        {proofUrl ? (
          <div className="flex flex-wrap gap-2 items-center pt-2 border-t border-border">
            <Link2 className="h-4 w-4 text-primary shrink-0" />
            <code className="text-xs truncate max-w-md text-muted-foreground">
              {proofUrl}
            </code>
            <Button size="sm" onClick={copyProof}>
              <Copy className="mr-2 h-3.5 w-3.5" />
              Copy proof link
            </Button>
          </div>
        ) : null}
      </Card>

      <SpinWheel
        presetOptionLabels={presetOptionLabels}
        autoRemoveWinner={winnerCount > 1}
        onWinnerSelected={handleWinner}
      />

      <WinnerProofBanner />
    </div>
  );
}

function WinnerProofBanner() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("proof");
  if (!token) return null;

  try {
    const padded = token.replace(/-/g, "+").replace(/_/g, "/");
    const { w, t } = JSON.parse(atob(padded)) as { w: string[]; t: number };
    const date = new Date(t).toLocaleString("en-US");
    return (
      <Card className="p-5 border-primary bg-primary/5">
        <p className="font-semibold mb-2">Verified giveaway result</p>
        <p className="text-sm text-muted-foreground mb-2">Drawn: {date}</p>
        <ul className="font-medium">
          {w.map((name) => (
            <li key={name}>🏆 {name}</li>
          ))}
        </ul>
      </Card>
    );
  } catch {
    return null;
  }
}
