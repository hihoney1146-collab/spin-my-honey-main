import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, Shuffle } from "lucide-react";
import { toast } from "sonner";

function parseNames(raw: string): string[] {
  return raw
    .split(/[\n,]+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function buildBalancedTeams(names: string[], teamCount: number): string[][] {
  const shuffled = [...names].sort(() => crypto.getRandomValues(new Uint32Array(1))[0] - 2 ** 31);
  const teams: string[][] = Array.from({ length: teamCount }, () => []);
  shuffled.forEach((name, i) => {
    teams[i % teamCount].push(name);
  });
  return teams.filter((t) => t.length > 0);
}

export function TeamGeneratorWheel() {
  const [namesText, setNamesText] = useState(
    "Alex\nJordan\nSam\nTaylor\nCasey\nMorgan\nRiley\nQuinn",
  );
  const [teamCount, setTeamCount] = useState(2);
  const [teams, setTeams] = useState<string[][] | null>(null);

  const generate = () => {
    const names = parseNames(namesText);
    if (names.length < 2) {
      toast.error("Add at least two names to split into teams.");
      return;
    }
    const count = Math.min(Math.max(2, teamCount), names.length);
    setTeams(buildBalancedTeams(names, count));
    toast.success(`Created ${count} balanced teams.`);
  };

  return (
    <div className="space-y-6">
      <Card className="p-5 md:p-6 space-y-4">
        <div className="flex items-center gap-2 text-primary font-semibold">
          <Users className="h-5 w-5" />
          <span>Balanced team generator</span>
        </div>
        <div className="grid gap-4 md:grid-cols-[1fr_140px]">
          <div className="space-y-2">
            <Label htmlFor="team-names">Participant names (one per line)</Label>
            <Textarea
              id="team-names"
              value={namesText}
              onChange={(e) => setNamesText(e.target.value)}
              rows={8}
              placeholder="Paste roster, one name per line"
            />
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
      </Card>

      {teams ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {teams.map((team, i) => (
            <Card key={i} className="p-4 border-primary/20">
              <h3 className="font-bold text-lg mb-3 text-primary">
                Team {i + 1} ({team.length})
              </h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {team.map((name) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      ) : null}
    </div>
  );
}
