import { SpinWheel } from "@/components/SpinWheel";
import { TeamGeneratorWheel } from "./TeamGeneratorWheel";
import { SecretSantaWheel } from "./SecretSantaWheel";
import { RandomNumberWheel } from "./RandomNumberWheel";
import { RandomStudentPickerWheel } from "./RandomStudentPickerWheel";
import { WinnerPickerWheel } from "./WinnerPickerWheel";
import { CoinFlipWheel } from "./CoinFlipWheel";
import { RaffleWheel } from "./RaffleWheel";
import { PrizeWheel } from "./PrizeWheel";
import { ClassroomSpinnerWheel } from "./ClassroomSpinnerWheel";
import { AlphabetSpinnerWheel } from "./AlphabetSpinnerWheel";
import { RandomNamePickerWheel } from "./RandomNamePickerWheel";

type WheelBySlugProps = {
  slug: string;
  presetOptionLabels?: string[];
  compactEmbed?: boolean;
};

export function WheelBySlug({
  slug,
  presetOptionLabels,
  compactEmbed = false,
}: WheelBySlugProps) {
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
    case "random-name-picker-wheel":
      return (
        <RandomNamePickerWheel presetOptionLabels={presetOptionLabels} />
      );
    case "winner-picker-wheel":
      return <WinnerPickerWheel presetOptionLabels={presetOptionLabels} />;
    case "coin-flip-wheel":
      return <CoinFlipWheel presetOptionLabels={presetOptionLabels} />;
    case "alphabet-spinner-wheel":
      return <AlphabetSpinnerWheel presetOptionLabels={presetOptionLabels} />;
    case "raffle-wheel":
      return <RaffleWheel presetOptionLabels={presetOptionLabels} />;
    case "prize-wheel":
      return <PrizeWheel presetOptionLabels={presetOptionLabels} />;
    case "classroom-spinner":
      return (
        <ClassroomSpinnerWheel presetOptionLabels={presetOptionLabels} />
      );
    default:
      return (
        <SpinWheel
          key={slug}
          presetOptionLabels={presetOptionLabels}
          shareEnabled={!compactEmbed}
          streamerToggle={!compactEmbed}
          compactEmbed={compactEmbed}
        />
      );
  }
}
