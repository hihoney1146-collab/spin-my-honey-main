import { SpinWheel } from "@/components/SpinWheel";

type PrizeWheelProps = {
  presetOptionLabels?: string[];
};

export function PrizeWheel({ presetOptionLabels }: PrizeWheelProps) {
  const labels =
    presetOptionLabels?.length
      ? presetOptionLabels
      : [
          "Grand Prize",
          "Gift Card",
          "Free T-Shirt",
          "Bonus Entry",
          "Second Place",
          "Try Again",
          "Third Place",
          "10% Off",
        ];

  return <SpinWheel presetOptionLabels={labels} />;
}
