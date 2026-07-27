import { SpinWheel } from "@/components/SpinWheel";
import { TeamGeneratorWheel } from "./TeamGeneratorWheel";
import { SecretSantaWheel } from "./SecretSantaWheel";
import { RandomNumberWheel } from "./RandomNumberWheel";
import { RandomStudentPickerWheel } from "./RandomStudentPickerWheel";
import { WinnerPickerWheel } from "./WinnerPickerWheel";
import { CoinFlipWheel } from "./CoinFlipWheel";
import { RaffleWheel } from "./RaffleWheel";
import { ClassroomSpinnerWheel } from "./ClassroomSpinnerWheel";
import { AlphabetSpinnerWheel } from "./AlphabetSpinnerWheel";
import { RandomNamePickerWheel } from "./RandomNamePickerWheel";
import { AbcdSpinWheel } from "./AbcdSpinWheel";
import { ShouldITextHimWheel } from "./ShouldITextHimWheel";
import { ChineseZodiacWheel } from "./ChineseZodiacWheel";
import { SelfCareWheel } from "./SelfCareWheel";
import { PokemonRandomizerWheel } from "./PokemonRandomizerWheel";
import { OutfitPickerWheel } from "./OutfitPickerWheel";
import { YesOrNoWheel } from "./YesOrNoWheel";
import { DinnerPickerWheel } from "./DinnerPickerWheel";
import { MoviePickerWheel } from "./MoviePickerWheel";
import { DateNightWheel } from "./DateNightWheel";
import { ZodiacSignWheel } from "./ZodiacSignWheel";

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
    case "classroom-spinner":
      return (
        <ClassroomSpinnerWheel presetOptionLabels={presetOptionLabels} />
      );
    case "abcd-spin-wheel":
      return <AbcdSpinWheel presetOptionLabels={presetOptionLabels} />;
    case "should-i-text-him-wheel":
      return <ShouldITextHimWheel presetOptionLabels={presetOptionLabels} />;
    case "chinese-zodiac-wheel":
      return <ChineseZodiacWheel presetOptionLabels={presetOptionLabels} />;
    case "self-care-wheel":
      return <SelfCareWheel presetOptionLabels={presetOptionLabels} />;
    case "pokemon-randomizer-wheel":
      return (
        <PokemonRandomizerWheel presetOptionLabels={presetOptionLabels} />
      );
    case "outfit-picker-wheel":
      return <OutfitPickerWheel presetOptionLabels={presetOptionLabels} />;
    case "yes-or-no-wheel":
      return <YesOrNoWheel presetOptionLabels={presetOptionLabels} />;
    case "dinner-picker-wheel":
      return <DinnerPickerWheel presetOptionLabels={presetOptionLabels} />;
    case "movie-picker-wheel":
      return <MoviePickerWheel presetOptionLabels={presetOptionLabels} />;
    case "date-night-wheel":
      return <DateNightWheel presetOptionLabels={presetOptionLabels} />;
    case "zodiac-sign-wheel":
      return <ZodiacSignWheel presetOptionLabels={presetOptionLabels} />;
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
