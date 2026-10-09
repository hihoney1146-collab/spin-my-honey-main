import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Gift, Link2, Copy } from "lucide-react";
import { toast } from "sonner";
import { SITE_ORIGIN } from "@/lib/schema";
import { SpinWheel } from "@/components/SpinWheel";
import {
  duplicateNotice,
  labelsToMultiline,
  parseEntryLines,
} from "@/lib/wheelEntryLabels";
import {
  assignSecretSanta,
  decodeRevealToken,
  encodeRevealToken,
  parseExclusions,
} from "@/lib/secretSanta";

function parseNames(raw: string): string[] {
  return parseEntryLines(raw);
}

const DEFAULT_NAMES = "Alex\nJordan\nSam\nTaylor\nCasey\nMorgan";

export function SecretSantaWheel() {
  const [namesText, setNamesText] = useState(DEFAULT_NAMES);
  const [exclusionText, setExclusionText] = useState("");
  const [assignments, setAssignments] = useState<Map<string, string> | null>(
    null,
  );

  const parsedNames = useMemo(() => parseNames(namesText), [namesText]);

  const parsedExclusions = useMemo(
    () => parseExclusions(exclusionText, [...new Set(parsedNames)]),
    [exclusionText, parsedNames],
  );
  const exclusions = parsedExclusions.pairs;
  const duplicateCount = useMemo(() => {
    const seen = new Set<string>();
    let dupes = 0;
    for (const name of parsedNames) {
      const key = name.toLowerCase();
      if (seen.has(key)) dupes++;
      else seen.add(key);
    }
    return dupes;
  }, [parsedNames]);

  const entryLabels = useMemo(() => {
    return parsedNames.length >= 2 ? parsedNames : parseNames(DEFAULT_NAMES);
  }, [parsedNames]);

  const duplicateMessage = duplicateNotice("warn", 0, duplicateCount);

  const generate = () => {
    const names = parsedNames;
    const unique = [...new Set(names)];
    if (unique.length < 2) {
      toast.error("Add at least two unique names.");
      return;
    }
    const result = assignSecretSanta(unique, exclusions);
    if (!result) {
      toast.error(
        "No valid assignment was found with these exclusions. Remove a rule and try again.",
      );
      return;
    }
    setAssignments(result);
    toast.success("Secret Santa assignments ready, share reveal links below.");
  };

  const copyLink = async (giver: string, receiver: string) => {
    const token = encodeRevealToken(giver, receiver);
    const url = `${SITE_ORIGIN}/secret-santa-wheel-generator?reveal=${token}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success(`Reveal link copied for ${giver}.`);
    } catch {
      toast.error("Could not copy automatically. Select the link and copy it by hand.");
    }
  };

  const handleLabelsChange = (labels: string[]) => {
    setNamesText(labelsToMultiline(labels));
    setAssignments(null);
  };

  return (
    <div className="space-y-6">
      <Card className="p-5 md:p-6 space-y-4">
        <div className="flex items-center gap-2 text-primary font-semibold">
          <Gift className="h-5 w-5" />
          <span>Secret Santa assignment mode</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Participants below feed both the spin wheel and assignment mode. Spin
          for a quick random pick, or generate full gift-exchange pairings with
          optional exclusions and private reveal links.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="santa-names">Participants (one per line)</Label>
            <Textarea
              id="santa-names"
              value={namesText}
              onChange={(e) => {
                setNamesText(e.target.value);
                setAssignments(null);
              }}
              rows={6}
            />
            {duplicateMessage ? (
              <p className="text-xs text-muted-foreground">{duplicateMessage}</p>
            ) : null}
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
            {parsedExclusions.ignored.length > 0 ? (
              <p className="text-xs text-destructive" role="status">
                {parsedExclusions.ignored.length === 1
                  ? "1 line was not used because it does not match two names from the list: "
                  : `${parsedExclusions.ignored.length} lines were not used because they do not match two names from the list: `}
                {parsedExclusions.ignored.slice(0, 3).join(" | ")}
              </p>
            ) : null}
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          On the wheel now ({entryLabels.length})
        </p>
        <Button onClick={generate} size="lg">
          <Gift className="mr-2 h-4 w-4" />
          Generate assignments
        </Button>
      </Card>

      <SpinWheel
        entryLabels={entryLabels}
        onEntryLabelsChange={handleLabelsChange}
        hideBulkPaste
        entriesListDefaultExpanded
      />

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
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    setToken(new URLSearchParams(window.location.search).get("reveal"));
  }, []);
  if (!token) return null;

  const decoded = decodeRevealToken(token);
  if (!decoded) return null;
  return (
    <Card className="p-5 md:p-6 border-primary bg-primary/5">
      <p className="text-lg font-semibold text-center">
        🎁 {decoded.g}, you are buying for:{" "}
        <span className="text-primary">{decoded.r}</span>
      </p>
    </Card>
  );
}
