import { SpinWheel } from "@/components/SpinWheel";

type RandomNamePickerWheelProps = {
  presetOptionLabels?: string[];
};

export function RandomNamePickerWheel({
  presetOptionLabels,
}: RandomNamePickerWheelProps) {
  return (
    <SpinWheel
      presetOptionLabels={presetOptionLabels}
      resultProofSlug="random-name-picker-wheel"
      shareEnabled
      streamerToggle
    />
  );
}
