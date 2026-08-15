/** Real tool behavior for differentiated wheels — must match shipped UI only. */
export const WHEEL_MODE_FEATURES: Record<string, string> = {
  "team-generator-wheel":
    "Paste participant names and choose how many teams you need. The generator shuffles the roster and distributes names in round-robin order so squad sizes stay balanced within one person, ideal for PE classes, office icebreakers, and gaming squads.",
  "secret-santa-wheel-generator":
    "Run a full Secret Santa assignment with optional exclusion pairs (spouses, roommates). Each participant gets a private reveal link they can open without seeing anyone else's match.",
  "random-number-wheel":
    "Set a minimum and maximum, toggle no-repeat mode to avoid duplicate draws, and pick a random integer in range. Small ranges also display on the visual wheel; large ranges show a bold numeric result.",
  "random-student-picker":
    "Built for US classrooms: enable remove-after-pick so called-on students drop from the pool, review session history for subs, and switch to fullscreen classroom mode with large tap-to-spin controls for projectors.",
  "winner-picker-wheel":
    "Draw multiple giveaway winners from a pasted comment list, dedupe @handles, and copy a shareable proof link with timestamp you can post to Instagram or TikTok Stories after a live spin recording.",
  "coin-flip-wheel":
    "Every flip updates a running heads-versus-tails tally and streak counter so tiebreakers, kickoff calls, and stream overlays show transparent stats on screen.",
  "alphabet-spinner-wheel":
    "Spin A through Z with an exclude-letters panel, uncheck glyphs already used in phonics drills, Scattergories, or spelling bees so only fresh letters remain on the wheel.",
  "raffle-wheel":
    "Choose ticket-number mode, entrant-name mode, or prize-label mode (classic prize-wheel slices). Draw multiple winners without replacement and copy a timestamped proof link after your live draw.",
  "classroom-spinner":
    "Teacher hub with student picker (remove-after-pick + history), balanced team generator, and a countdown timer, all in one fullscreen smartboard layout.",
  "random-name-picker-wheel":
    "Name picker (Wheel of Names / digital hat draw) with remove-after-pick, session history, optional Name:weight entries that multiply slices, proof link, and streamer-mode controls.",
  "abcd-spin-wheel":
    "Locks the wheel to A–D for multiple-choice call-outs, optional remove-after-pick, projector fullscreen, and a session list of answers already called.",
  "should-i-text-him-wheel":
    "Context chips (casual / mixed signals / high emotion) swap the outcome pool, then a one-minute cooldown after each spin slows impulsive re-rolls.",
  "chinese-zodiac-wheel":
    "Birth-year calculator highlights the matching Chinese zodiac animal and reorders the wheel so that animal is ready to spin (Gregorian approximation noted on-page).",
  "self-care-wheel":
    "Filter chips rebuild the wheel from structured pools: 5-minute, no-spend, evening, or movement prompts.",
  "pokemon-randomizer-wheel":
    "Challenge-pool filters (starters, types, nuzlocke-style rules, generation vibe) rebuild the wheel from rule labels rather than a static character list.",
  "outfit-picker-wheel":
    "Separate occasion (work / casual / date) and weather (any / rain / heat) toggles filter a tagged outfit dataset onto the wheel.",
  "yes-or-no-wheel":
    "Set Yes / No / Maybe weights that rebuild the wheel slices, plus an optional best-of-N tracker for majority outcomes.",
  "dinner-picker-wheel":
    "Filters rebuild dinner pools: anything, leftovers, delivery, cook-at-home, or fast-casual/chains (absorbs the old fast-food page).",
  "movie-picker-wheel":
    "Mood filters (any, short, cozy, horror) or paste your own watchlist so the wheel spins titles you already care about.",
  "date-night-wheel":
    "Budget and location filters (anything, at home, go out, budget, treat night) rebuild the plan pool before you spin.",
  "zodiac-sign-wheel":
    "Month/day birth-date helper highlights the matching Western sign and pins it first on the wheel; absorbed daily-theme slices live in page sections.",
};
