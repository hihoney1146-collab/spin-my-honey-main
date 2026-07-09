import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { SpinWheel } from "@/components/SpinWheel";
import { Maximize2, Minimize2, History, GraduationCap } from "lucide-react";

type RandomStudentPickerWheelProps = {
  presetOptionLabels?: string[];
};

export function RandomStudentPickerWheel({
  presetOptionLabels,
}: RandomStudentPickerWheelProps) {
  const [removeAfterPick, setRemoveAfterPick] = useState(true);
  const [history, setHistory] = useState<string[]>([]);
  const [fullscreen, setFullscreen] = useState(false);

  const handleWinner = (name: string) => {
    setHistory((prev) => [name, ...prev]);
  };

  const wheel = (
    <SpinWheel
      presetOptionLabels={presetOptionLabels}
      autoRemoveWinner={removeAfterPick}
      onWinnerSelected={handleWinner}
      spinButtonLabel={fullscreen ? "TAP TO SPIN" : undefined}
      className={fullscreen ? "student-fullscreen-wheel" : undefined}
    />
  );

  return (
    <div className={fullscreen ? "fixed inset-0 z-50 bg-background p-4 overflow-auto" : "space-y-4"}>
      <Card className="p-4 md:p-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-primary font-semibold">
          <GraduationCap className="h-5 w-5" />
          <span>Classroom mode</span>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch
              id="remove-after-pick"
              checked={removeAfterPick}
              onCheckedChange={setRemoveAfterPick}
            />
            <Label htmlFor="remove-after-pick" className="cursor-pointer text-sm">
              Remove after pick
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
                Exit fullscreen
              </>
            ) : (
              <>
                <Maximize2 className="mr-2 h-4 w-4" />
                Fullscreen classroom
              </>
            )}
          </Button>
        </div>
      </Card>

      {wheel}

      {history.length > 0 ? (
        <Card className="p-4 md:p-5">
          <h3 className="font-bold mb-3 flex items-center gap-2">
            <History className="h-4 w-4 text-primary" />
            Session history
          </h3>
          <ol className="space-y-1 text-sm text-muted-foreground">
            {history.map((name, i) => (
              <li key={`${name}-${i}`}>
                <span className="font-medium text-foreground">{history.length - i}.</span>{" "}
                {name}
              </li>
            ))}
          </ol>
        </Card>
      ) : null}
    </div>
  );
}
