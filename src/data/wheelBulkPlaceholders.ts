/** Bulk-add textarea placeholder + hint per indexed wheel (UI only — never wheel state). */
export type WheelBulkPlaceholder = {
  sample: string;
  hint: string;
};

export const GENERIC_BULK_PLACEHOLDER: WheelBulkPlaceholder = {
  sample: "Alice\nBob\nCharlie\nDana\nSam\nJordan",
  hint: "Paste a list, one option per line (from Notes, Excel, etc.).",
};

export const WHEEL_BULK_PLACEHOLDERS: Record<string, WheelBulkPlaceholder> = {
  "random-student-picker": {
    sample: "Emma\nLiam\nSophia\nNoah\nAva\nMason",
    hint: "Paste your class roster, one student name per line.",
  },
  "winner-picker-wheel": {
    sample: "@alex_reads\n@jamie_cooks\n@taylor_art\n@casey_wins\n@riley_live",
    hint: "Paste commenter @handles from your giveaway, one per line.",
  },
  "raffle-wheel": {
    sample: "1042\n1043\n1047\n1051\n1055\n1058",
    hint: "Paste ticket numbers or entrant names, one per line.",
  },
  "team-generator-wheel": {
    sample: "Alex\nJordan\nSam\nTaylor\nRiley\nCasey",
    hint: "Paste player or teammate names to split into balanced squads.",
  },
  "secret-santa-wheel-generator": {
    sample: "Chris\nDana\nMorgan\nQuinn\nRobin\nJamie",
    hint: "Paste everyone in the gift exchange, one name per line.",
  },
  "random-number-wheel": {
    sample: "7\n14\n21\n28\n35\n42",
    hint: "Paste custom numbers to pick from, one per line.",
  },
  "classroom-spinner": {
    sample: "Aiden\nBrooke\nCarlos\nDiana\nEthan\nFatima",
    hint: "Paste your class roster for picker, teams, or timer sessions.",
  },
  "coin-flip-wheel": {
    sample: "Heads\nTails\nSide A\nSide B",
    hint: "Coin flip uses its own panel; bulk add applies on other wheels.",
  },
  "alphabet-spinner-wheel": {
    sample: "A\nB\nC\nD\nE\nF",
    hint: "Paste letters or short labels to spin, one per line.",
  },
  "abcd-spin-wheel": {
    sample: "A\nB\nC\nD",
    hint: "MC answers lock to A–D; paste custom labels if needed.",
  },
  "should-i-text-him-wheel": {
    sample: "Send it\nWait till morning\nAsk a friend\nSleep on it\nCall instead",
    hint: "Paste your own options to override the default pool, one per line.",
  },
  "chinese-zodiac-wheel": {
    sample: "Rat\nOx\nTiger\nRabbit\nDragon\nSnake",
    hint: "Paste animals or labels for a custom spin pool, one per line.",
  },
  "self-care-wheel": {
    sample: "Stretch break\nDrink water\nStep outside\nTidy one corner\nJournal 5 min",
    hint: "Paste your own self-care prompts, one per line.",
  },
  "pokemon-randomizer-wheel": {
    sample: "Pikachu\nCharmander\nBulbasaur\nSquirtle\nEevee\nSnorlax",
    hint: "Paste Pokémon names or challenge labels, one per line.",
  },
  "outfit-picker-wheel": {
    sample: "Jeans + tee\nMidi dress\nBlazer look\nSneakers day\nRain boots",
    hint: "Paste outfit ideas for your occasion, one per line.",
  },
  "random-name-picker-wheel": {
    sample: "Alex\nJordan:2\nSam\nTaylor:3\nRiley",
    hint: "Paste names (optional Name:weight), one per line.",
  },
  "yes-or-no-wheel": {
    sample: "Yes\nNo\nMaybe\nAsk again\nNot today",
    hint: "Paste custom choices (optional Choice:weight), one per line.",
  },
  "dinner-picker-wheel": {
    sample: "Tacos\nStir-fry\nPasta night\nSalmon bowl\nLeftover pizza",
    hint: "Paste meals or cuisines for tonight, one per line.",
  },
  "movie-picker-wheel": {
    sample: "Coco\nKnives Out\nPaddington 2\nSpirited Away\nPrincess Bride",
    hint: "Paste titles from your watchlist, one per line.",
  },
  "date-night-wheel": {
    sample: "Cook together\nBoard game night\nSunset walk\nMovie at home\nTry a new cafe",
    hint: "Paste date ideas that fit your budget and vibe, one per line.",
  },
  "zodiac-sign-wheel": {
    sample: "Aries\nTaurus\nGemini\nCancer\nLeo\nVirgo",
    hint: "Paste sign names or custom labels, one per line.",
  },
};

export function slugFromWheelPath(pathname: string): string | undefined {
  const trimmed = pathname.replace(/^\/+|\/+$/g, "");
  if (!trimmed || trimmed === "result") return undefined;
  const parts = trimmed.split("/");
  if (parts[0] === "embed") return parts[1] || undefined;
  return parts[0];
}

export function getWheelBulkPlaceholder(pathname: string): WheelBulkPlaceholder {
  const slug = slugFromWheelPath(pathname);
  if (slug && WHEEL_BULK_PLACEHOLDERS[slug]) {
    return WHEEL_BULK_PLACEHOLDERS[slug];
  }
  return GENERIC_BULK_PLACEHOLDER;
}
