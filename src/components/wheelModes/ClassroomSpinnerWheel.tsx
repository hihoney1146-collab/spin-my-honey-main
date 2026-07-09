import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RandomStudentPickerWheel } from "./RandomStudentPickerWheel";
import { TeamGeneratorWheel } from "./TeamGeneratorWheel";
import { GraduationCap, Maximize2, Minimize2, Timer } from "lucide-react";

type ClassroomSpinnerWheelProps = {
  presetOptionLabels?: string[];
};

export function ClassroomSpinnerWheel({
  presetOptionLabels,
}: ClassroomSpinnerWheelProps) {
  const [fullscreen, setFullscreen] = useState(false);
  const [timerMinutes, setTimerMinutes] = useState(3);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [timerRunning, setTimerRunning] = useState(false);

  const totalMs = (timerMinutes * 60 + timerSeconds) * 1000;

  const startTimer = useCallback(() => {
    setRemaining(totalMs);
    setTimerRunning(true);
  }, [totalMs]);

  const pauseTimer = () => setTimerRunning(false);

  const resetTimer = () => {
    setTimerRunning(false);
    setRemaining(null);
  };

  useEffect(() => {
    if (!timerRunning || remaining === null) return;
    if (remaining <= 0) {
      setTimerRunning(false);
      setRemaining(0);
      return;
    }
    const id = window.setInterval(() => {
      setRemaining((r) => (r !== null ? Math.max(0, r - 1000) : null));
    }, 1000);
    return () => window.clearInterval(id);
  }, [timerRunning, remaining]);

  const display =
    remaining !== null
      ? `${Math.floor(remaining / 60000)}:${String(Math.floor((remaining % 60000) / 1000)).padStart(2, "0")}`
      : `${timerMinutes}:${String(timerSeconds).padStart(2, "0")}`;

  const shellClass = fullscreen
    ? "fixed inset-0 z-50 bg-background p-4 overflow-auto"
    : "space-y-4";

  return (
    <div className={shellClass}>
      <Card className="p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-primary font-semibold">
          <GraduationCap className="h-5 w-5" />
          <span>Teacher mode hub</span>
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
      </Card>

      <Tabs defaultValue="students" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-lg">
          <TabsTrigger value="students">Student picker</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
          <TabsTrigger value="timer">Timer</TabsTrigger>
        </TabsList>

        <TabsContent value="students" className="mt-4">
          <RandomStudentPickerWheel presetOptionLabels={presetOptionLabels} />
        </TabsContent>

        <TabsContent value="teams" className="mt-4">
          <TeamGeneratorWheel />
        </TabsContent>

        <TabsContent value="timer" className="mt-4">
          <Card className="p-5 md:p-6 space-y-4">
            <div className="flex items-center gap-2 text-primary font-semibold">
              <Timer className="h-5 w-5" />
              <span>Classroom countdown</span>
            </div>
            <div className="flex flex-wrap gap-4 items-end">
              <div className="space-y-2">
                <Label htmlFor="tm-min">Minutes</Label>
                <Input
                  id="tm-min"
                  type="number"
                  min={0}
                  max={59}
                  value={timerMinutes}
                  onChange={(e) => setTimerMinutes(Number(e.target.value) || 0)}
                  className="w-24"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tm-sec">Seconds</Label>
                <Input
                  id="tm-sec"
                  type="number"
                  min={0}
                  max={59}
                  value={timerSeconds}
                  onChange={(e) => setTimerSeconds(Number(e.target.value) || 0)}
                  className="w-24"
                />
              </div>
            </div>
            <p className="text-5xl md:text-6xl font-bold text-center text-primary tabular-nums py-6">
              {display}
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {!timerRunning ? (
                <Button onClick={startTimer} size="lg">
                  Start timer
                </Button>
              ) : (
                <Button onClick={pauseTimer} variant="secondary" size="lg">
                  Pause
                </Button>
              )}
              <Button onClick={resetTimer} variant="outline" size="lg">
                Reset
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
