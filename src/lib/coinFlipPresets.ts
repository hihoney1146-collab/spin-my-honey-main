export type CoinFacePresetId =
  | "classic"
  | "blue-gold"
  | "check-cross"
  | "thumbs";

export type CoinFacePresetSide = {
  label: string;
  className: string;
  glyph?: string;
};

export type CoinFacePreset = {
  id: CoinFacePresetId;
  name: string;
  sides: [CoinFacePresetSide, CoinFacePresetSide];
};

export const COIN_FACE_PRESETS: CoinFacePreset[] = [
  {
    id: "classic",
    name: "Classic gold",
    sides: [
      {
        label: "Heads",
        className:
          "bg-gradient-to-br from-amber-100 to-amber-300 dark:from-amber-900 dark:to-amber-700",
      },
      {
        label: "Tails",
        className:
          "bg-gradient-to-br from-amber-200 to-amber-400 dark:from-amber-800 dark:to-amber-600",
      },
    ],
  },
  {
    id: "blue-gold",
    name: "Blue / Gold",
    sides: [
      {
        label: "Blue",
        className:
          "bg-gradient-to-br from-sky-200 to-blue-600 text-white dark:from-sky-800 dark:to-blue-950",
      },
      {
        label: "Gold",
        className:
          "bg-gradient-to-br from-yellow-200 to-amber-500 text-amber-950 dark:from-yellow-700 dark:to-amber-800 dark:text-amber-50",
      },
    ],
  },
  {
    id: "check-cross",
    name: "Check / Cross",
    sides: [
      {
        label: "Yes",
        className: "bg-gradient-to-br from-emerald-100 to-emerald-400",
        glyph: "✓",
      },
      {
        label: "No",
        className: "bg-gradient-to-br from-rose-100 to-rose-400",
        glyph: "✗",
      },
    ],
  },
  {
    id: "thumbs",
    name: "👍 / 👎",
    sides: [
      {
        label: "Up",
        className: "bg-gradient-to-br from-lime-100 to-lime-300",
        glyph: "👍",
      },
      {
        label: "Down",
        className: "bg-gradient-to-br from-orange-100 to-orange-300",
        glyph: "👎",
      },
    ],
  },
];

export function getCoinFacePreset(id: CoinFacePresetId): CoinFacePreset {
  return COIN_FACE_PRESETS.find((p) => p.id === id) ?? COIN_FACE_PRESETS[0];
}
