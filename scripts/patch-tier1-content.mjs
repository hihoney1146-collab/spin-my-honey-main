import fs from "fs";

const path = "src/data/wheelUniqueContent.ts";
let s = fs.readFileSync(path, "utf8");

function replaceBlock(key, block) {
  const start = s.indexOf(`  "${key}": {`);
  if (start < 0) throw new Error("missing " + key);
  let depth = 0;
  let end = -1;
  for (let i = start + 3; i < s.length; i++) {
    if (s[i] === "{") depth++;
    else if (s[i] === "}") {
      depth--;
      if (depth === 0) {
        end = i + 1;
        break;
      }
    }
  }
  if (end < 0) throw new Error("end " + key);
  let j = end;
  if (s[j] === ",") j++;
  s = s.slice(0, start) + block + s.slice(j);
}

const blocks = {
  "abcd-spin-wheel": `  "abcd-spin-wheel": {
    directAnswer:
      "The ABCD Spin Wheel locks to A, B, C, and D for multiple-choice call-outs. Teachers enable remove-after-pick so used letters drop out, open projector fullscreen for the smartboard, and review the answers-called list under the wheel. Equal letter slices keep blind-guess games fair during quiz review.",
    title: "ABCD Spin Wheel, Multiple Choice Picker",
    metaDescription:
      "Lock A-D for quiz call-outs, remove letters after each pick, and use projector fullscreen so the whole class can see the spin.",
    useCases: [
      { heading: "SAT practice games", body: "Tutors spin when students freeze on elimination questions, then discuss why the letter was or was not correct." },
      { heading: "Projector review days", body: "Fullscreen classroom mode puts a large tap-to-spin control on the board while remove-after-pick cycles through leftover letters." },
      { heading: "Workshop polling", body: "Facilitators map A-D to four discussion topics and spin to pick which breakout question starts." },
      { heading: "Session logging", body: "The answers-called list shows which letters already appeared so you do not argue about repeats mid-period." },
    ],
    faqs: [
      { question: "Are the letters locked to A-D?", answer: "Yes. This mode always seeds four slices labeled A through D for multiple-choice call-outs." },
      { question: "What does remove letter after pick do?", answer: "After a spin, that letter drops from the pool so the next spin only chooses among remaining options until you reload." },
      { question: "What is projector fullscreen?", answer: "It expands the wheel to a full-screen classroom layout with a large tap-to-spin button meant for smartboards and projectors." },
      { question: "Where do I see past answers?", answer: "The Answers called list under the wheel keeps an ordered history of every letter spun this session." },
    ],
    relatedWheels: [
      { slug: "alphabet-spinner-wheel", anchor: "Full alphabet A-Z spinner" },
      { slug: "yes-or-no-wheel", anchor: "True-false yes-no wheel" },
      { slug: "random-student-picker", anchor: "Pick who answers next" },
      { slug: "random-number-wheel", anchor: "Numeric quiz picker" },
      { slug: "classroom-spinner", anchor: "Classroom spinner hub" },
      { slug: "coin-flip-wheel", anchor: "Fifty-fifty answer coin flip" },
    ],
  }`,
  "chinese-zodiac-wheel": `  "chinese-zodiac-wheel": {
    directAnswer:
      "The Chinese Zodiac Wheel pairs a birth-year calculator with the twelve animals. Enter a year, see which animal matches (Gregorian approximation), and the wheel reorders so that animal is ready to spin for Lunar New Year games or classroom units.",
    title: "Chinese Zodiac Wheel, Lunar Animal Picker",
    metaDescription:
      "Enter a birth year to highlight the matching Chinese zodiac animal, then spin the twelve-animal wheel for class, parties, or trivia.",
    useCases: [
      { heading: "Lunar New Year classroom units", body: "Students look up their birth year, then present customs for the highlighted animal." },
      { heading: "Restaurant promotion nights", body: "Owners look up the year of the table host and feature a zodiac-themed dish special." },
      { heading: "Family reunion games", body: "Relatives enter birth years and spin conversation starters about each person's animal." },
      { heading: "Museum scavenger hunts", body: "Visitors calculate their animal, then find one artifact related to that creature in the gallery." },
    ],
    faqs: [
      { question: "How does the birth-year calculator work?", answer: "Enter a year between 1900 and 2100 and tap Show animal. The tool maps the year onto the twelve-animal cycle and pins that animal first on the wheel." },
      { question: "Is the year mapping exact for lunar New Year?", answer: "It uses a Gregorian approximation. Births in late January or early February can fall in the prior animal depending on the lunar New Year date that year." },
      { question: "Which animals are included?", answer: "Rat, Ox, Tiger, Rabbit, Dragon, Snake, Horse, Goat, Monkey, Rooster, Dog, and Pig." },
      { question: "How is this different from Western zodiac?", answer: "Chinese astrology uses a twelve-year animal cycle, not monthly sun signs. Use the Western zodiac wheel for month-and-day signs." },
    ],
    relatedWheels: [
      { slug: "zodiac-sign-wheel", anchor: "Western star sign wheel" },
      { slug: "secret-santa-wheel-generator", anchor: "Holiday gift exchange wheel" },
      { slug: "random-name-picker-wheel", anchor: "Name picker for party games" },
      { slug: "yes-or-no-wheel", anchor: "Quick yes-no decision wheel" },
      { slug: "date-night-wheel", anchor: "Date night idea wheel" },
      { slug: "self-care-wheel", anchor: "Wellness self-care wheel" },
    ],
  }`,
  "self-care-wheel": `  "self-care-wheel": {
    directAnswer:
      "The Self Care Wheel rebuilds its pool from filter chips: 5-minute, no-spend, evening, or movement. Tap a chip, spin once, and take the highlighted ritual during a break when deciding feels harder than resting.",
    title: "Self Care Wheel, Daily Wellness Nudge",
    metaDescription:
      "Filter self-care prompts by 5-minute, no-spend, evening, or movement, then spin a matching wellness action for your break.",
    useCases: [
      { heading: "Pomodoro breaks", body: "After focus sprints, choose the 5-minute chip and spin for a quick reset." },
      { heading: "Budget burnout days", body: "No-spend filters keep suggestions free when money stress is already high." },
      { heading: "Evening wind-down", body: "Evening chips favor low-light rituals before bed instead of another scroll session." },
      { heading: "Movement snacks", body: "Movement chips rebuild the wheel with walks, mobility, and short circuits." },
    ],
    faqs: [
      { question: "What do the filter chips do?", answer: "Each chip swaps the entire wheel pool from a structured dataset (5-minute, no-spend, evening, or movement)." },
      { question: "Can I still customize slices?", answer: "Yes. After a filter loads, you can edit the wheel entries like any other spinner if you need personal coping strategies." },
      { question: "Are activities clinical treatment?", answer: "These are gentle suggestions, not medical advice. Follow your care team for serious needs." },
      { question: "Does it track streaks?", answer: "No built-in habit tracker. Mark completions in your journal or habit app." },
    ],
    relatedWheels: [
      { slug: "date-night-wheel", anchor: "Couples recharge date" },
      { slug: "yes-or-no-wheel", anchor: "Take a break yes-no" },
      { slug: "outfit-picker-wheel", anchor: "Outfit for a walk outside" },
      { slug: "should-i-text-him-wheel", anchor: "Pause before texting" },
      { slug: "movie-picker-wheel", anchor: "Cozy movie night" },
      { slug: "dinner-picker-wheel", anchor: "Simple dinner decision" },
    ],
  }`,
  "outfit-picker-wheel": `  "outfit-picker-wheel": {
    directAnswer:
      "The Outfit Picker Wheel filters a tagged outfit dataset with separate occasion and weather toggles. Choose work, casual, or date, then any weather, rain, or heat. The wheel rebuilds to matching looks so mornings stop in one spin.",
    title: "Outfit Picker Wheel, Morning Style in One Spin",
    metaDescription:
      "Set occasion and weather filters to rebuild outfit slices, then spin a matching look for work, casual days, or dates.",
    useCases: [
      { heading: "Rainy commute mornings", body: "Pick Work plus Rain to keep waterproof shells and boots in the pool." },
      { heading: "Hot weekend plans", body: "Casual plus Heat favors linen, shorts, and breathable layers." },
      { heading: "Date night packing", body: "Date occasion with Any weather spins statement tops and dress-plus-jacket combos." },
      { heading: "Capsule closet days", body: "Filters shrink options so a small wardrobe still feels intentional." },
    ],
    faqs: [
      { question: "How do occasion and weather work together?", answer: "Both toggles filter one structured dataset. Only outfits tagged for that occasion and weather (or any-weather) stay on the wheel." },
      { question: "Does the wheel know my wardrobe?", answer: "No inventory tracking. You interpret each label with whatever hangs in your closet." },
      { question: "What occasions are available?", answer: "Work, Casual, and Date. Pair any of them with Any weather, Rain, or Heat." },
      { question: "Can I edit the resulting list?", answer: "Yes. After filters load slices, edit names on the wheel if you want personal outfits." },
    ],
    relatedWheels: [
      { slug: "date-night-wheel", anchor: "Date night outfit pairing" },
      { slug: "should-i-text-him-wheel", anchor: "Text-or-wait relationship wheel" },
      { slug: "self-care-wheel", anchor: "Self-care morning ritual" },
      { slug: "yes-or-no-wheel", anchor: "Wear-it-or-change yes-no wheel" },
      { slug: "dinner-picker-wheel", anchor: "Dinner after you get dressed" },
      { slug: "movie-picker-wheel", anchor: "Movie night stay-in look" },
    ],
  }`,
  "pokemon-randomizer-wheel": `  "pokemon-randomizer-wheel": {
    directAnswer:
      "The Pokemon Randomizer Wheel rebuilds challenge pools with filters for starters, types, nuzlocke-style rules, and generation vibe. Labels stay generic-safe for licensing, focusing on run rules rather than a character name dump.",
    title: "Pokemon Randomizer, Challenge Rules Wheel",
    metaDescription:
      "Filter starter, type, nuzlocke-style, or generation-vibe challenge rules, then spin a fair constraint for your next run or stream.",
    useCases: [
      { heading: "Nuzlocke rule nights", body: "Spin the nuzlocke-style pool for first-encounter, nickname, or permadeath constraints." },
      { heading: "Starter locks", body: "Starter filters force grass, fire, water, or no-evolve rules before the run begins." },
      { heading: "Type challenges", body: "Type filters load mono-type, dual-type, or ban rules for creative teams." },
      { heading: "Generation vibe sessions", body: "Generation chips set a ruleset feel without requiring licensed creature names on the wheel." },
    ],
    faqs: [
      { question: "What do the challenge filters change?", answer: "Each chip reloads a fixed dataset of rule labels (starters, types, nuzlocke-style, or generation vibe) onto the wheel." },
      { question: "Why are there no character names?", answer: "The utility is the filter UX with generic-safe challenge labels to avoid licensing issues while still randomizing run constraints." },
      { question: "Does it connect to Nintendo games?", answer: "No game integration. It is a planning and challenge tool only." },
      { question: "Can I customize after filtering?", answer: "Yes. Edit slices after a pool loads if your house rules need extra constraints." },
    ],
    relatedWheels: [
      { slug: "team-generator-wheel", anchor: "Multiplayer team split" },
      { slug: "winner-picker-wheel", anchor: "Stream giveaway picker" },
      { slug: "yes-or-no-wheel", anchor: "Keep or reroll challenge" },
      { slug: "random-name-picker-wheel", anchor: "Pick who chooses the rule" },
      { slug: "coin-flip-wheel", anchor: "Fifty-fifty tiebreaker" },
      { slug: "what-to-draw-wheel", anchor: "General art prompt wheel" },
    ],
  }`,
  "should-i-text-him-wheel": `  "should-i-text-him-wheel": {
    directAnswer:
      "The Should I Text Him Wheel swaps curated outcome sets with context chips (casual, mixed signals, high emotion), then starts a one-minute cooldown after each spin so you cannot rapid-fire re-rolls when emotions run hot.",
    title: "Should I Text Him Wheel, End the Draft Loop",
    metaDescription:
      "Pick a texting context to swap outcomes, spin once, then wait out the cooldown before another roll so overthinking slows down.",
    useCases: [
      { heading: "Post-first-date anxiety", body: "Casual context offers short hello vs wait-until-tomorrow outcomes instead of a midnight novel." },
      { heading: "Mixed signals nights", body: "Mixed signals chips favor clarifying questions, waiting, or deleting the draft." },
      { heading: "High emotion spirals", body: "High emotion pools lean toward not texting tonight and journaling first, then the cooldown locks re-spins." },
      { heading: "Friend interventions", body: "Pass the phone, choose a context together, and honor one spin plus the cooldown." },
    ],
    faqs: [
      { question: "What do the context chips change?", answer: "Each chip loads a different curated outcome set (casual, mixed signals, or high emotion) onto the wheel before you spin." },
      { question: "What is the cooldown?", answer: "After a spin, the wheel locks for about 60 seconds so impulsive re-rolls are harder when feelings are loud." },
      { question: "Is this relationship advice?", answer: "No. It is a playful randomizer that interrupts rumination. Trust your boundaries and context." },
      { question: "Can I rename slices?", answer: "Yes. Edit labels after a context loads if you need Should I text her or call instead." },
    ],
    relatedWheels: [
      { slug: "yes-or-no-wheel", anchor: "Binary yes-or-no wheel" },
      { slug: "date-night-wheel", anchor: "Date night idea wheel" },
      { slug: "outfit-picker-wheel", anchor: "Outfit picker for date night" },
      { slug: "coin-flip-wheel", anchor: "Fifty-fifty coin flip" },
      { slug: "self-care-wheel", anchor: "Self-care instead of texting" },
      { slug: "movie-picker-wheel", anchor: "Stay-in movie night" },
    ],
  }`,
};

for (const [key, block] of Object.entries(blocks)) {
  replaceBlock(key, block);
  console.log("updated", key);
}

fs.writeFileSync(path, s);
console.log("done");
