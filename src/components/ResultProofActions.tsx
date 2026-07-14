import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Link2 } from "lucide-react";
import { toast } from "sonner";
import { buildResultProofUrl } from "@/lib/resultProof";

type ResultProofActionsProps = {
  winners: string[];
  entryCount: number;
  sourceSlug: string;
  label?: string;
};

export function ResultProofActions({
  winners,
  entryCount,
  sourceSlug,
  label = "Get proof link",
}: ResultProofActionsProps) {
  const [proofUrl, setProofUrl] = useState<string | null>(null);

  const createProofLink = async () => {
    const url = buildResultProofUrl({
      w: winners,
      n: entryCount,
      s: sourceSlug,
    });
    setProofUrl(url);
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Proof link copied, paste in your giveaway post.");
    } catch {
      toast.success("Proof link ready, copy it below.");
    }
  };

  const copyAgain = async () => {
    if (!proofUrl) return;
    await navigator.clipboard.writeText(proofUrl);
    toast.success("Proof link copied.");
  };

  if (winners.length === 0) return null;

  return (
    <div className="flex flex-col gap-2 w-full">
      {!proofUrl ? (
        <Button type="button" variant="secondary" onClick={createProofLink} className="w-full">
          <Link2 className="mr-2 h-4 w-4" />
          {label}
        </Button>
      ) : (
        <div className="flex flex-wrap gap-2 items-center">
          <code className="text-xs truncate max-w-full text-muted-foreground flex-1">
            {proofUrl}
          </code>
          <Button type="button" size="sm" onClick={copyAgain}>
            <Copy className="mr-2 h-3.5 w-3.5" />
            Copy again
          </Button>
        </div>
      )}
    </div>
  );
}
