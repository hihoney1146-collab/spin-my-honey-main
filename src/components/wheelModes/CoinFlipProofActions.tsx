import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Link2 } from "lucide-react";
import { toast } from "sonner";
import { buildResultProofUrl, type ResultProofPayload } from "@/lib/resultProof";

type CoinFlipProofActionsProps = {
  payload: Omit<ResultProofPayload, "m" | "t"> & { t?: number };
  label?: string;
};

export function CoinFlipProofActions({
  payload,
  label = "Get proof link",
}: CoinFlipProofActionsProps) {
  const [proofUrl, setProofUrl] = useState<string | null>(null);

  const createProofLink = async () => {
    const url = buildResultProofUrl(payload);
    setProofUrl(url);
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Proof link copied.");
    } catch {
      toast.success("Proof link ready, copy it below.");
    }
  };

  const copyAgain = async () => {
    if (!proofUrl) return;
    await navigator.clipboard.writeText(proofUrl);
    toast.success("Proof link copied.");
  };

  if (payload.w.length === 0) return null;

  return (
    <div className="flex flex-col gap-2 w-full" data-testid="coin-proof-actions">
      {!proofUrl ? (
        <Button
          type="button"
          variant="secondary"
          onClick={() => void createProofLink()}
          className="w-full"
          data-testid="coin-proof-link"
        >
          <Link2 className="mr-2 h-4 w-4" />
          {label}
        </Button>
      ) : (
        <div className="flex flex-wrap gap-2 items-center">
          <code
            className="text-xs truncate max-w-full text-muted-foreground flex-1"
            data-testid="coin-proof-url"
          >
            {proofUrl}
          </code>
          <Button type="button" size="sm" onClick={() => void copyAgain()}>
            <Copy className="mr-2 h-3.5 w-3.5" />
            Copy again
          </Button>
        </div>
      )}
    </div>
  );
}
