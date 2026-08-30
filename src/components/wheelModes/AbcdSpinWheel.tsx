import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { SpinWheel } from "@/components/SpinWheel";
import { Maximize2, Minimize2, History, ListChecks } from "lucide-react";
import { useControlledWheelLabels } from "@/lib/useControlledWheelLabels";

type AbcdSpinWheelProps = {
  presetOptionLabels?: string[];
};

const ABCD = ["A", "B", "C", "D"];

export function AbcdSpinWheel({ presetOptionLabels }: AbcdSpinWheelProps) {
  const labels =
    presetOptionLabels?.length === 4 ? presetOptionLabels : ABCD;
  const wheelSync = useControlledWheelLabels(labels);
  const [removeAfterPick, setRemoveAfterPick] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <div
      className={
        fullscreen
          ? "fixed inset-0 z-50 bg-background p-4 overflow-auto"
          : "space-y-4"
      }
    >
      <Card className="p-4 md:p-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-primary font-semibold">
          <ListChecks className="h-5 w-5" />
          <span>Multiple-choice quiz mode</span>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch
              id="abcd-remove"
              checked={removeAfterPick}
              onCheckedChange={setRemoveAfterPick}
            />
            <Label htmlFor="abcd-remove" className="cursor-pointer text-sm">
              Remove letter after pick
            </Label>
          </div>
          <Button
            variant={fullscreen ? "default" : "outline"}
            size="sm"
            onClick={() => setFullscreen((f) => !f)}
          >
            {fullscreen ? (
              <>
                <Minimize2 className="mr-2 h-4 w-4" />
                Exit projector
              </>
            ) : (
              <>
                <Maximize2 className="mr-2 h-4 w-4" />
                Projector fullscreen
              </>
            )}
          </Button>
        </div>
      </Card>

      <SpinWheel
        entryLabels={wheelSync.entryLabels}
        onEntryLabelsChange={wheelSync.onEntryLabelsChange}
        hideBulkPaste
        autoRemoveWinner={removeAfterPick}
        onWinnerSelected={(name) => setHistory((h) => [name, ...h])}
        spinButtonLabel={fullscreen ? "TAP TO SPIN" : undefined}
      />

      {history.length > 0 ? (
        <Card className="p-4 md:p-5">
          <h3 className="font-bold mb-3 flex items-center gap-2">
            <History className="h-4 w-4 text-primary" />
            Answers called
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
