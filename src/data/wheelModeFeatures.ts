/** Real tool behavior for differentiated wheels — must match shipped UI only. */
export const WHEEL_MODE_FEATURES: Record<string, string> = {
  "team-generator-wheel":
    "Paste participant names once to drive both the spin wheel (quick random pick) and balanced team generation. Choose how many teams you need; the generator shuffles and distributes names round-robin so squad sizes stay within one person.",
  "secret-santa-wheel-generator":
    "Paste participants once to drive both the spin wheel (quick random draw) and full Secret Santa assignment mode with optional exclusion pairs. Each participant can get a private reveal link so they see only their match.",
  "random-number-wheel":
    "Set a minimum and maximum, toggle no-repeat mode to avoid duplicate draws, and pick a random integer in range. Small ranges also display on the visual wheel; large ranges show a bold numeric result.",
  "random-student-picker":
    "Built for US classrooms: enable remove-after-pick so called-on students drop from the pool, review session history for subs, and switch to fullscreen classroom mode with large tap-to-spin controls for projectors.",
  "winner-picker-wheel":
    "Draw multiple giveaway winners from a pasted comment list, dedupe @handles, and copy a shareable proof link with timestamp you can post to Instagram or TikTok Stories after a live spin recording.",
  "coin-flip-wheel":
    "Every flip updates a running heads-versus-tails tally and streak counter so tiebreakers, kickoff calls, and stream overlays show transparent stats on screen.",
  "alphabet-spinner-wheel":
    "Spin A through Z with an exclude-letters panel, uncheck glyphs already used in phonics drills, Scattergories, or spelling bees so only fresh letters remain on the wheel, plus projector fullscreen for smartboards.",
  "raffle-wheel":
    "Choose ticket-number mode, entrant-name mode, or prize-label mode (classic prize-wheel slices). Draw multiple winners without replacement and copy a timestamped proof link after your live draw.",
  "classroom-spinner":
    "Teacher hub with three tabs: student picker (remove-after-pick + history + spin wheel), balanced team generator (same roster pattern + spin wheel), and a countdown timer, all in one fullscreen smartboard layout.",
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
    "Editable Yes / No / Maybe weights rebuild slice sizes (and shown percentages), plus an optional Best of 3 run that reports the majority.",
  "dinner-picker-wheel":
    "Cuisine, leftovers, delivery, cook-at-home, and fast-casual/chains chips each load their own meal list (chains absorb the old fast-food page). The default Cuisine pool is on the wheel immediately.",
  "movie-picker-wheel":
    "Mood (any, cozy, horror) and length (any, short) filters rebuild a tagged dataset; Paste my watchlist drives slices from your titles. Horror absorbs the old horror-movie page.",
  "date-night-wheel":
    "Separate Where (anywhere / at home / go out) and Budget (any / budget / treat) filters rebuild a tagged plan dataset. Defaults own the full pool on load.",
  "zodiac-sign-wheel":
    "Month and day inputs highlight the matching Western sign and pin it first on the wheel (tropical dates; not a natal chart).",
};
