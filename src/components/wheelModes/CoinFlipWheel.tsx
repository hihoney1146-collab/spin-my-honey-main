import { useState } from "react";
import { Card } from "@/components/ui/card";
import { SpinWheel } from "@/components/SpinWheel";
import { Coins } from "lucide-react";

type CoinFlipWheelProps = {
  presetOptionLabels?: string[];
};

export function CoinFlipWheel({ presetOptionLabels }: CoinFlipWheelProps) {
  const [heads, setHeads] = useState(0);
  const [tails, setTails] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lastSide, setLastSide] = useState<"heads" | "tails" | null>(null);

  const labels = presetOptionLabels?.length
    ? presetOptionLabels
    : ["Heads", "Tails"];

  const handleWinner = (name: string) => {
    const side = name.toLowerCase().includes("tail") ? "tails" : "heads";
    if (side === "heads") setHeads((h) => h + 1);
    else setTails((t) => t + 1);

    setStreak((prev) => {
      if (lastSide === side) return prev + 1;
      return 1;
    });
    setLastSide(side);
  };

  const total = heads + tails;

  return (
    <div className="space-y-4">
      <Card className="p-4 md:p-5">
        <div className="flex items-center gap-2 text-primary font-semibold mb-4">
          <Coins className="h-5 w-5" />
          <span>Flip stats</span>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-primary">{heads}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              Heads
            </p>
          </div>
          <div>
            <p className="text-2xl font-bold text-primary">{tails}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              Tails
            </p>
          </div>
          <div>
            <p className="text-2xl font-bold text-primary">{streak}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              Streak
              {lastSide ? ` (${lastSide})` : ""}
            </p>
          </div>
        </div>
        {total > 0 ? (
          <p className="text-center text-sm text-muted-foreground mt-3">
            {total} flip{total !== 1 ? "s" : ""} recorded this session
          </p>
        ) : null}
      </Card>

      <SpinWheel
        presetOptionLabels={labels.slice(0, 2)}
        onWinnerSelected={handleWinner}
      />
    </div>
  );
}
