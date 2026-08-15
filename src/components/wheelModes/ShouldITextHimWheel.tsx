import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SpinWheel } from "@/components/SpinWheel";
import { MessageCircle } from "lucide-react";

type ShouldITextHimWheelProps = {
  presetOptionLabels?: string[];
};

const POOLS: Record<string, string[]> = {
  chill: [
    "Send a short hello",
    "Wait until tomorrow",
    "React to their story first",
    "Draft it, don't send yet",
    "Ask one low-stakes question",
    "Leave it for now",
  ],
  unclear: [
    "Send a clarifying question",
    "Wait for them to reply first",
    "Call instead of texting",
    "Delete the draft",
    "Text a friend for a sanity check",
    "Sleep on it",
  ],
  intense: [
    "Do not text tonight",
    "Delete the draft",
    "Journal first, then decide",
    "Wait 24 hours",
    "Mute the thread temporarily",
    "Talk in person later",
  ],
};

type ContextKey = keyof typeof POOLS;

export function ShouldITextHimWheel({
  presetOptionLabels: _presetOptionLabels,
}: ShouldITextHimWheelProps) {
  const [context, setContext] = useState<ContextKey>("chill");
  const [cooldownUntil, setCooldownUntil] = useState(0);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (cooldownUntil <= Date.now()) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [cooldownUntil]);

  const labels = useMemo(() => POOLS[context], [context]);

  const remainingSec = Math.max(0, Math.ceil((cooldownUntil - now) / 1000));
  const cooling = remainingSec > 0;

  return (
    <div className="space-y-4">
      <Card className="p-4 md:p-5 space-y-4">
        <div className="flex items-center gap-2 text-primary font-semibold">
          <MessageCircle className="h-5 w-5" />
          <span>Context changes the outcomes</span>
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Texting context">
          {(Object.keys(POOLS) as ContextKey[]).map((key) => (
            <Button
              key={key}
              type="button"
              size="sm"
              variant={context === key ? "default" : "outline"}
              onClick={() => setContext(key)}
            >
              {key === "chill"
                ? "Casual"
                : key === "unclear"
                  ? "Mixed signals"
                  : "High emotion"}
            </Button>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          After a spin, a short cooldown locks the wheel so you do not rapid-fire
          re-rolls when emotions are high.
        </p>
        {cooling ? (
          <p className="text-sm font-medium text-foreground">
            Cooldown: {remainingSec}s before the next spin
          </p>
        ) : null}
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          On the wheel now ({labels.length})
        </p>
        <ul className="text-sm text-foreground grid sm:grid-cols-2 gap-1">
          {labels.map((label) => (
            <li key={label}>{label}</li>
          ))}
        </ul>
      </Card>

      <SpinWheel
        key={labels.join("|")}
        presetOptionLabels={labels}
        entriesListDefaultExpanded
        onWinnerSelected={() => setCooldownUntil(Date.now() + 60_000)}
        className={cooling ? "pointer-events-none opacity-60" : undefined}
      />
    </div>
  );
}
