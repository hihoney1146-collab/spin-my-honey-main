/** Real tool behavior for differentiated wheels (Phase 5.6). */
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
    "Switch between entrant names and ticket-number mode, draw multiple winners without replacement, and copy a timestamped proof link to post after your live raffle stream.",
  "prize-wheel":
    "Load labeled prize slices, Grand Prize, gift cards, bonus entries, and spin for game-show-style giveaways on a phone, tablet, or booth display.",
  "classroom-spinner":
    "Teacher hub with student picker (remove-after-pick + history), balanced team generator, and a countdown timer, all in one fullscreen smartboard layout.",
};
