import { SpinWheel } from "@/components/SpinWheel";
import { TeamGeneratorWheel } from "./TeamGeneratorWheel";
import { SecretSantaWheel } from "./SecretSantaWheel";
import { RandomNumberWheel } from "./RandomNumberWheel";
import { RandomStudentPickerWheel } from "./RandomStudentPickerWheel";
import { WinnerPickerWheel } from "./WinnerPickerWheel";
import { CoinFlipWheel } from "./CoinFlipWheel";
import { AlphabetSpinnerWheel } from "./AlphabetSpinnerWheel";

type WheelBySlugProps = {
  slug: string;
  presetOptionLabels?: string[];
};

export function WheelBySlug({ slug, presetOptionLabels }: WheelBySlugProps) {
  switch (slug) {
    case "team-generator-wheel":
      return <TeamGeneratorWheel />;
    case "secret-santa-wheel-generator":
      return <SecretSantaWheel />;
    case "random-number-wheel":
      return <RandomNumberWheel presetOptionLabels={presetOptionLabels} />;
    case "random-student-picker":
      return (
        <RandomStudentPickerWheel presetOptionLabels={presetOptionLabels} />
      );
    case "winner-picker-wheel":
      return <WinnerPickerWheel presetOptionLabels={presetOptionLabels} />;
    case "coin-flip-wheel":
      return <CoinFlipWheel presetOptionLabels={presetOptionLabels} />;
    case "alphabet-spinner-wheel":
      return <AlphabetSpinnerWheel presetOptionLabels={presetOptionLabels} />;
    default:
      return (
        <SpinWheel
          key={slug}
          presetOptionLabels={presetOptionLabels}
        />
      );
  }
}
