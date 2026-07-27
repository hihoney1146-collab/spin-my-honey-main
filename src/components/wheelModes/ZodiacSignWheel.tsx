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
    } else {
      // wraps year (Capricorn)
      if (
        (month === sm && day >= sd) ||
        (month === em && day <= ed) ||
        month > sm ||
        month < em
      ) {
        return s.name;
      }
    }
  }
  return null;
}

export function ZodiacSignWheel({
  presetOptionLabels,
}: ZodiacSignWheelProps) {
  const base =
    presetOptionLabels?.length === 12
      ? presetOptionLabels
      : SIGNS.map((s) => s.name);
  const [md, setMd] = useState("");
  const [highlight, setHighlight] = useState<string | null>(null);

  const labels = useMemo(() => {
    if (!highlight) return base;
    return [highlight, ...base.filter((l) => l !== highlight)];
  }, [base, highlight]);

  const lookup = () => {
    const m = md.match(/^(\d{1,2})[\/\-](\d{1,2})$/);
    if (!m) {
      setHighlight(null);
      return;
    }
    const month = Number(m[1]);
    const day = Number(m[2]);
    if (month < 1 || month > 12 || day < 1 || day > 31) {
      setHighlight(null);
      return;
    }
    setHighlight(signForMd(month, day));
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 md:p-5 space-y-3">
        <div className="flex items-center gap-2 text-primary font-semibold">
          <Star className="h-5 w-5" />
          <span>Birth date → Western sign</span>
        </div>
        <div className="flex flex-wrap items-end gap-3">
          <div className="space-y-2">
            <Label htmlFor="zodiac-md">Month / day</Label>
            <Input
              id="zodiac-md"
              placeholder="7/27"
              value={md}
              onChange={(e) => setMd(e.target.value)}
              className="w-28"
            />
          </div>
          <Button type="button" onClick={lookup}>
            Show sign
          </Button>
        </div>
        {highlight ? (
          <p className="text-sm font-medium">
            {md} → <strong>{highlight}</strong> (pinned first on the wheel)
          </p>
        ) : null}
      </Card>
      <SpinWheel key={labels.join("|")} presetOptionLabels={labels} />
    </div>
  );
}
