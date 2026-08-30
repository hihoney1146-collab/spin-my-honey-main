import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, Shuffle } from "lucide-react";
import { toast } from "sonner";
import { SpinWheel } from "@/components/SpinWheel";
import {
  duplicateNotice,
  labelsToMultiline,
  parseEntryLines,
} from "@/lib/wheelEntryLabels";

const DEFAULT_NAMES =
  "Alex\nJordan\nSam\nTaylor\nCasey\nMorgan\nRiley\nQuinn";

function buildBalancedTeams(names: string[], teamCount: number): string[][] {
  const shuffled = [...names].sort(() => crypto.getRandomValues(new Uint32Array(1))[0] - 2 ** 31);
  const teams: string[][] = Array.from({ length: teamCount }, () => []);
  shuffled.forEach((name, i) => {
    teams[i % teamCount].push(name);
  });
  return teams.filter((t) => t.length > 0);
}

export function TeamGeneratorWheel() {
  const [namesText, setNamesText] = useState(DEFAULT_NAMES);
  const [teamCount, setTeamCount] = useState(2);
  const [teams, setTeams] = useState<string[][] | null>(null);

  const parsedNames = useMemo(() => parseEntryLines(namesText), [namesText]);
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
    return parsedNames.length >= 2 ? parsedNames : parseEntryLines(DEFAULT_NAMES);
  }, [parsedNames]);

  const duplicateMessage = duplicateNotice("warn", 0, duplicateCount);

  const generate = () => {
    const names = parsedNames;
    if (names.length < 2) {
      toast.error("Add at least two names to split into teams.");
      return;
    }
    const count = Math.min(Math.max(2, teamCount), names.length);
    setTeams(buildBalancedTeams(names, count));
    toast.success(`Created ${count} balanced teams.`);
  };

  const handleLabelsChange = (labels: string[]) => {
    setNamesText(labelsToMultiline(labels));
    setTeams(null);
  };

  return (
    <div className="space-y-6">
      <Card className="p-5 md:p-6 space-y-4">
        <div className="flex items-center gap-2 text-primary font-semibold">
          <Users className="h-5 w-5" />
          <span>Balanced team generator</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Participants below feed both the spin wheel and team generation. Spin
          for a quick random pick, or generate balanced squads with the button.
        </p>
        <div className="grid gap-4 md:grid-cols-[1fr_140px]">
          <div className="space-y-2">
            <Label htmlFor="team-names">Participant names (one per line)</Label>
            <Textarea
              id="team-names"
              value={namesText}
              onChange={(e) => {
                setNamesText(e.target.value);
                setTeams(null);
              }}
              rows={8}
              placeholder="Paste roster, one name per line"
            />
            {duplicateMessage ? (
              <p className="text-xs text-muted-foreground">{duplicateMessage}</p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="team-count">Number of teams</Label>
            <Input
              id="team-count"
              type="number"
              min={2}
              max={20}
              value={teamCount}
              onChange={(e) => setTeamCount(Number(e.target.value) || 2)}
            />
            <Button onClick={generate} className="w-full mt-2" size="lg">
              <Shuffle className="mr-2 h-4 w-4" />
              Generate teams
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          On the wheel now ({entryLabels.length})
        </p>
      </Card>

      <SpinWheel
        entryLabels={entryLabels}
        onEntryLabelsChange={handleLabelsChange}
        hideBulkPaste
        entriesListDefaultExpanded
      />

      {teams ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {teams.map((team, i) => (
            <Card key={i} className="p-4 border-primary/20">
              <h3 className="font-bold text-lg mb-3 text-primary">
                Team {i + 1} ({team.length})
              </h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {team.map((name, j) => (
                  <li key={`${name}-${j}`}>{name}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      ) : null}
    </div>
  );
}
