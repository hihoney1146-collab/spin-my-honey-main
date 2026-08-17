import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SpinWheel } from "@/components/SpinWheel";
import { Star } from "lucide-react";

type ZodiacSignWheelProps = {
  presetOptionLabels?: string[];
};

const SIGNS: { name: string; start: [number, number]; end: [number, number] }[] =
  [
    { name: "Capricorn", start: [12, 22], end: [1, 19] },
    { name: "Aquarius", start: [1, 20], end: [2, 18] },
    { name: "Pisces", start: [2, 19], end: [3, 20] },
    { name: "Aries", start: [3, 21], end: [4, 19] },
    { name: "Taurus", start: [4, 20], end: [5, 20] },
    { name: "Gemini", start: [5, 21], end: [6, 20] },
    { name: "Cancer", start: [6, 21], end: [7, 22] },
    { name: "Leo", start: [7, 23], end: [8, 22] },
    { name: "Virgo", start: [8, 23], end: [9, 22] },
    { name: "Libra", start: [9, 23], end: [10, 22] },
    { name: "Scorpio", start: [10, 23], end: [11, 21] },
    { name: "Sagittarius", start: [11, 22], end: [12, 21] },
  ];

const SIGN_NAMES = SIGNS.map((s) => s.name);

function signForMd(month: number, day: number): string | null {
  for (const s of SIGNS) {
    const [sm, sd] = s.start;
    const [em, ed] = s.end;
    if (sm <= em) {
      if (
        (month === sm && day >= sd) ||
        (month === em && day <= ed) ||
        (month > sm && month < em)
      ) {
        return s.name;
      }
    } else if (
      (month === sm && day >= sd) ||
      (month === em && day <= ed) ||
      month > sm ||
      month < em
    ) {
      return s.name;
    }
  }
  return null;
}

export function ZodiacSignWheel({
  presetOptionLabels: _presetOptionLabels,
}: ZodiacSignWheelProps) {
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [highlight, setHighlight] = useState<string | null>(null);

  const labels = useMemo(() => {
    if (!highlight) return SIGN_NAMES;
    return [highlight, ...SIGN_NAMES.filter((l) => l !== highlight)];
  }, [highlight]);

  const lookup = () => {
    const m = Number(month);
    const d = Number(day);
    if (
      !Number.isFinite(m) ||
      !Number.isFinite(d) ||
      m < 1 ||
      m > 12 ||
      d < 1 ||
      d > 31
    ) {
      setHighlight(null);
      return;
    }
    setHighlight(signForMd(m, d));
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 md:p-5 space-y-3">
        <div className="flex items-center gap-2 text-primary font-semibold">
          <Star className="h-5 w-5" />
          <span>Birth date → Western sign</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Enter month and day to highlight that Western sign and pin it first on
          the wheel (tropical dates; not a natal chart).
        </p>
        <div className="flex flex-wrap items-end gap-3">
          <div className="space-y-2">
            <Label htmlFor="zodiac-month">Month</Label>
            <Input
              id="zodiac-month"
              inputMode="numeric"
              placeholder="7"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zodiac-day">Day</Label>
            <Input
              id="zodiac-day"
              inputMode="numeric"
              placeholder="27"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="w-20"
            />
          </div>
          <Button type="button" onClick={lookup}>
            Show sign
          </Button>
        </div>
        {highlight ? (
          <p className="text-sm font-medium">
            {month}/{day} → <strong>{highlight}</strong> (pinned first on the
            wheel)
          </p>
        ) : null}
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          On the wheel now ({labels.length})
        </p>
        <ul className="text-sm text-foreground grid sm:grid-cols-2 gap-1">
          {labels.map((label) => (
            <li key={label}>
              {label}
              {highlight === label ? " (highlighted)" : ""}
            </li>
          ))}
        </ul>
      </Card>
      <SpinWheel
        key={labels.join("|")}
        presetOptionLabels={labels}
        entriesListDefaultExpanded
      />
    </div>
  );
}
