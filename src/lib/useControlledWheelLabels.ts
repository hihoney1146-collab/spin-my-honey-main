import { useEffect, useState } from "react";

/** Keep Manage Entries synced with a computed pool; list edits override until the pool changes. */
export function useControlledWheelLabels(computedLabels: string[]) {
  const [overrideLabels, setOverrideLabels] = useState<string[] | null>(null);
  const computedKey = computedLabels.join("\u0001");

  useEffect(() => {
    setOverrideLabels(null);
  }, [computedKey]);

  const entryLabels = overrideLabels ?? computedLabels;

  return {
    entryLabels,
    onEntryLabelsChange: setOverrideLabels,
    hideBulkPaste: true as const,
  };
}
