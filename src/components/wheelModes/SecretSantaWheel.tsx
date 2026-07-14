import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Gift, Link2, Copy } from "lucide-react";
import { toast } from "sonner";
import { SITE_ORIGIN } from "@/lib/schema";

function parseNames(raw: string): string[] {
  return raw
    .split(/[\n,]+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function parseExclusions(raw: string): Set<string> {
  const pairs = new Set<string>();
  for (const line of raw.split("\n")) {
    const [a, b] = line.split(/[-–>]+/).map((s) => s.trim());
    if (a && b) {
      pairs.add(`${a}→${b}`);
      pairs.add(`${b}→${a}`);
    }
  }
  return pairs;
}

function assignSecretSanta(
  names: string[],
  exclusions: Set<string>,
): Map<string, string> | null {
  const n = names.length;
  if (n < 2) return null;

  for (let attempt = 0; attempt < 2000; attempt++) {
    const receivers = [...names].sort(
      () => crypto.getRandomValues(new Uint32Array(1))[0] - 2 ** 31,
    );
    const map = new Map<string, string>();
    let valid = true;
    for (let i = 0; i < n; i++) {
      const giver = names[i];
      const receiver = receivers[i];
      if (giver === receiver || exclusions.has(`${giver}→${receiver}`)) {
        valid = false;
        break;
      }
      map.set(giver, receiver);
    }
    if (valid) return map;
  }
  return null;
}

function encodeRevealToken(giver: string, receiver: string): string {
  return btoa(JSON.stringify({ g: giver, r: receiver }))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export function SecretSantaWheel() {
  const [namesText, setNamesText] = useState(
    "Alex\nJordan\nSam\nTaylor\nCasey\nMorgan",
  );
  const [exclusionText, setExclusionText] = useState("");
  const [assignments, setAssignments] = useState<Map<string, string> | null>(
    null,
  );

  const exclusions = useMemo(
    () => parseExclusions(exclusionText),
    [exclusionText],
  );

  const generate = () => {
    const names = parseNames(namesText);
    const unique = [...new Set(names)];
    if (unique.length < 2) {
      toast.error("Add at least two unique names.");
      return;
    }
    const result = assignSecretSanta(unique, exclusions);
    if (!result) {
      toast.error(
        "Could not assign with these exclusions. Remove a rule and try again.",
      );
      return;
    }
    setAssignments(result);
    toast.success("Secret Santa assignments ready, share reveal links below.");
  };

  const copyLink = async (giver: string, receiver: string) => {
    const token = encodeRevealToken(giver, receiver);
    const url = `${SITE_ORIGIN}/secret-santa-wheel-generator?reveal=${token}`;
    await navigator.clipboard.writeText(url);
    toast.success(`Reveal link copied for ${giver}.`);
  };

  return (
    <div className="space-y-6">
      <Card className="p-5 md:p-6 space-y-4">
        <div className="flex items-center gap-2 text-primary font-semibold">
          <Gift className="h-5 w-5" />
          <span>Secret Santa assignment mode</span>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="santa-names">Participants (one per line)</Label>
            <Textarea
              id="santa-names"
              value={namesText}
              onChange={(e) => setNamesText(e.target.value)}
              rows={6}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="santa-exclusions">
              Exclusions (optional, one pair per line: Alex → Jordan)
            </Label>
            <Textarea
              id="santa-exclusions"
              value={exclusionText}
              onChange={(e) => setExclusionText(e.target.value)}
              rows={6}
              placeholder="Spouse pairs, roommates, etc."
            />
          </div>
        </div>
        <Button onClick={generate} size="lg">
          <Gift className="mr-2 h-4 w-4" />
          Generate assignments
        </Button>
      </Card>

      {assignments ? (
        <Card className="p-5 md:p-6">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Link2 className="h-4 w-4 text-primary" />
            Per-person reveal links
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Send each giver their private link. Recipients see only who they
            draw, not the full list.
          </p>
          <ul className="space-y-3">
            {[...assignments.keys()].map((giver) => (
              <li
                key={giver}
                className="flex flex-wrap items-center justify-between gap-2 border-b border-border/50 pb-3 last:border-0"
              >
                <span className="font-medium">{giver}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyLink(giver, assignments.get(giver)!)}
                >
                  <Copy className="mr-2 h-3.5 w-3.5" />
                  Copy reveal link
                </Button>
              </li>
            ))}
          </ul>
        </Card>
      ) : null}

      <SecretSantaRevealBanner />
    </div>
  );
}

function SecretSantaRevealBanner() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("reveal");
  if (!token) return null;

  try {
    const padded = token.replace(/-/g, "+").replace(/_/g, "/");
    const json = atob(padded);
    const { g, r } = JSON.parse(json) as { g: string; r: string };
    return (
      <Card className="p-5 md:p-6 border-primary bg-primary/5">
        <p className="text-lg font-semibold text-center">
          🎁 {g}, you are buying for: <span className="text-primary">{r}</span>
        </p>
      </Card>
    );
  } catch {
    return null;
  }
}
