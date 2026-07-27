import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { SpinWheel } from "@/components/SpinWheel";
import { History, Users } from "lucide-react";

type RandomNamePickerWheelProps = {
  presetOptionLabels?: string[];
};

export function RandomNamePickerWheel({
  presetOptionLabels,
}: RandomNamePickerWheelProps) {
  const [removeAfterPick, setRemoveAfterPick] = useState(true);
  const [history, setHistory] = useState<string[]>([]);

  return (
    <div className="space-y-4">
      <Card className="p-4 md:p-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-primary font-semibold">
          <Users className="h-5 w-5" />
          <span>Name picker controls</span>
        </div>
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
      </Card>

      <SpinWheel
        presetOptionLabels={presetOptionLabels}
        autoRemoveWinner={removeAfterPick}
        onWinnerSelected={(name) => setHistory((h) => [name, ...h])}
        resultProofSlug="random-name-picker-wheel"
        shareEnabled
        streamerToggle
      />

      {history.length > 0 ? (
        <Card className="p-4 md:p-5">
          <h3 className="font-bold mb-3 flex items-center gap-2">
            <History className="h-4 w-4 text-primary" />
            Session history
          </h3>
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
