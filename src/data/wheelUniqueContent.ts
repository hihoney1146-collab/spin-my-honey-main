export type WheelUseCase = { heading: string; body: string };

export type WheelUniqueContent = {
  directAnswer: string;
  useCases: WheelUseCase[];
  faqs: { question: string; answer: string }[];
  title: string;
  metaDescription: string;
  h1?: string;
  relatedWheels: { slug: string; anchor: string }[];
  /** Optional extra SSR/content blocks (e.g. buyer-intent sections). */
  supplementalSections?: WheelUseCase[];
};

export const WHEEL_UNIQUE_CONTENT: Record<string, WheelUniqueContent> = {
  "yes-or-no-wheel": {
    directAnswer:
      "A Yes or No Wheel settles binary dilemmas by landing on Yes, No, or Maybe instead of replaying the same mental loop. Hold your question in mind, tap Spin, and let the slice under the pointer become your answer. Each result is independent, so the wheel suits lunch votes, roommate chores, and low-stakes choices where momentum beats perfection.",
    title: "Yes or No Wheel, Maybe Slice Included",
    metaDescription:
      "Weighing a simple yes-or-no call? Spin for Yes, No, or Maybe in seconds and move on without another group chat debate.",
    useCases: [
      {
        heading: "Morning micro-decisions",
        body: "Should you hit snooze, grab coffee to go, or walk to work? One spin replaces three rounds of second-guessing before your alarm wins again.",
      },
      {
        heading: "Roommate chore standoffs",
        body: "List who handles dishes versus trash, spin once, and whoever lands on the slice owns the task tonight, no passive-aggressive sticky notes required.",
      },
      {
        heading: "Group lunch votes",
        body: "When four coworkers each want a different spot, map each option to Yes or No slices and spin until one meal plan sticks.",
      },
      {
        heading: "Creative permission slips",
        body: "Writers and artists spin before deleting a paragraph or posting a draft, turning perfectionism into a quick ritual instead of a stall.",
      },
    ],
    faqs: [
      {
        question: "Does the Yes or No Wheel include Maybe?",
        answer:
          "Yes. Default weights are Yes 2, No 2, and Maybe 1, so Maybe is on the wheel with a smaller slice. Set Maybe weight to 0 to run a strict Yes/No spin.",
      },
      {
        question: "How do the Yes / No / Maybe weights work?",
        answer:
          "Each weight is how many equal slices that answer gets. Yes 3 and No 1 means Yes has three times the chance of No. The On the wheel now list shows slice counts and percentages before you spin.",
      },
      {
        question: "What is Best of 3?",
        answer:
          "Turn on Best of 3 to track three spins and show the majority (or a tie). Reset the run when you start a new question.",
      },
      {
        question: "Should I type my question on the wheel?",
        answer:
          "You do not have to, the wheel does not store questions. Many people silently hold the dilemma in mind, spin, and treat the landing slice as the nudge they needed.",
      },
      {
        question: "Is every spin independent?",
        answer:
          "Each spin uses fresh randomness in your browser. Prior results do not change the odds of the next landing, so a streak of No answers does not mean Yes is due.",
      },
      {
        question: "Can couples use this for date-night choices?",
        answer:
          "Absolutely. Replace the default labels with two restaurant names or two movie genres, spin once, and commit to the outcome before you talk yourselves out of it.",
      },
      {
        question: "Will this replace professional advice?",
        answer:
          "No. The wheel is entertainment for everyday choices. Medical, legal, or financial decisions still belong with qualified professionals, not a spinner.",
      },
    ],
    relatedWheels: [
      { slug: "coin-flip-wheel", anchor: "Heads-or-tails coin flip" },
      { slug: "should-i-text-him-wheel", anchor: "Should I text him spinner" },
      { slug: "dinner-picker-wheel", anchor: "Tonight's dinner picker" },
      { slug: "date-night-wheel", anchor: "Couples date night wheel" },
      { slug: "abcd-spin-wheel", anchor: "Multiple-choice ABCD wheel" },
      { slug: "random-day-picker-wheel", anchor: "Random day picker" },
    ],
  },

  "dinner-picker-wheel": {
    directAnswer:
      "The Dinner Picker Wheel ends the nightly what-should-we-eat spiral by randomly selecting cuisines and dishes you actually enjoy. Load pizza, tacos, stir-fry, or delivery favorites, spin once, and let the highlighted slice dictate dinner. Families skip veto rounds, roommates rotate cooking duty, and solo diners escape the same three takeout apps.",
    title: "Dinner Picker Wheel, End Menu Paralysis",
    metaDescription:
      "Staring at an empty fridge and zero ideas? Spin preloaded meals or your own list and let dinner pick itself tonight.",
    useCases: [
      {
        heading: "Weeknight family meals",
        body: "Parents paste six kid-approved dinners onto the wheel Sunday night, then spin each evening so nobody argues about repeating spaghetti again.",
      },
      {
        heading: "Roommate cooking rotation",
        body: "Assign each slice to a roommate's signature dish; whoever's meal lands cooks while the others set the table.",
      },
      {
        heading: "Meal-prep variety",
        body: "Batch cooks spin among protein bowls, sheet-pan veggies, and soup bases so Sunday prep covers four distinct flavors.",
      },
      {
        heading: "Dietary reset weeks",
        body: "Health-focused households load only Mediterranean, vegetarian, or low-sodium options, making randomness align with nutrition goals.",
      },
    ],
    faqs: [
      {
        question: "What do the dinner filter chips change?",
        answer:
          "Cuisine, leftovers, delivery, cook-at-home, and fast-casual/chains each load a different meal list onto the wheel. The default Cuisine chip owns the pool as soon as the page opens.",
      },
      {
        question: "Where did the fast-food wheel go?",
        answer:
          "It redirects here. Use the Fast-casual / chains chip for burger, pizza, chicken sandwich, taco, and similar chain-style picks.",
      },
      {
        question: "What if someone hates the result?",
        answer:
          "Agree on a one-respin rule before spinning, or remove disliked options permanently so the wheel only shows meals everyone accepts.",
      },
      {
        question: "How many dinner options fit?",
        answer:
          "There is no practical cap for home use. Paste a dozen weekly meals and the wheel resizes slices automatically.",
      },
      {
        question: "Does it work for lunch planning too?",
        answer:
          "Swap the labels to sandwiches, leftovers, or cafeteria choices and use the same wheel at noon.",
      },
    ],
    relatedWheels: [
      { slug: "raffle-wheel", anchor: "Raffle after dinner events" },
      { slug: "date-night-wheel", anchor: "Date night activity picker" },
      { slug: "yes-or-no-wheel", anchor: "Quick yes-or-no decisions" },
      { slug: "self-care-wheel", anchor: "Self-care activity wheel" },
      { slug: "random-color-wheel", anchor: "Plate color challenge wheel" },
      { slug: "movie-picker-wheel", anchor: "Post-dinner movie picker" },
    ],
  },

  "movie-picker-wheel": {
    directAnswer:
      "The Movie Picker Wheel stops streaming scroll fatigue by randomly choosing a genre or title from your shortlist. Load action, documentary, romance, or exact film names, spin, and start watching before the popcorn gets cold. Couples end veto wars, friend groups run watch parties, and solo viewers finally pick something without another couch scroll session.",
    title: "Movie Picker Wheel, Stop Endless Scrolling",
    metaDescription:
      "Three streaming apps open and still nothing to watch? Spin genres or titles from your queue and press play immediately.",
    useCases: [
      {
        heading: "Friday family movie night",
        body: "Kids add three animated picks, parents add two dramas, and the wheel decides which disc or stream opens first.",
      },
      {
        heading: "Genre roulette dates",
        body: "Couples who never agree on horror versus comedy load both genres, spin once, and dress the couch accordingly.",
      },
      {
        heading: "Film club rotations",
        body: "Book clubs spin among member-nominated titles so nobody hosts twice in a row unless the wheel says so.",
      },
      {
        heading: "Content creator challenges",
        body: "Reviewers spin a random genre each week, forcing fresh takes outside their comfort-watch list.",
      },
    ],
    faqs: [
      {
        question: "How do mood and length filters work?",
        answer:
          "Mood (any, cozy, horror) and length (any, short) rebuild the wheel from a tagged title-style dataset. Horror / thriller is the old horror-movie page dataset. The default Any mood + Any length pool is on the wheel immediately.",
      },
      {
        question: "Can I paste Netflix titles directly?",
        answer:
          "Yes. Choose Paste my watchlist and enter at least two titles, one per line. Those titles become the slices.",
      },
      {
        question: "Does the wheel stream movies?",
        answer:
          "No. It only selects a title or genre, you still open your streaming app or library to watch.",
      },
      {
        question: "What if we land on something we already saw?",
        answer:
          "Remove watched titles after each spin or keep a fresh list of unwatched options only.",
      },
      {
        question: "Is double-spinting fair for picky groups?",
        answer:
          "Set a house rule: one spin counts unless everyone agrees to respin. That keeps the tool decisive instead of endless.",
      },
      {
        question: "Can I weight favorites?",
        answer:
          "Duplicate a beloved genre on multiple slices to increase its odds without excluding other choices entirely.",
      },
    ],
    relatedWheels: [
      { slug: "date-night-wheel", anchor: "Date night plan spinner" },
      { slug: "family-game-night-picker-wheel", anchor: "Family game night picker" },
      { slug: "dinner-picker-wheel", anchor: "Dinner before the movie" },
      { slug: "yes-or-no-wheel", anchor: "Yes-or-no watch decision" },
      { slug: "bedtime-story-picker-wheel", anchor: "Bedtime story picker" },
    ],
  },

  "should-i-text-him-wheel": {
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
  },

  "outfit-picker-wheel": {
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
  },

  "date-night-wheel": {
    directAnswer:
      "The Date Night Wheel assigns couple activities, bowling, stargazing, cooking together, arcade nights, from a shared list so neither partner carries the planning burden alone. Customize slices with local spots, spin on Saturday afternoon, and treat the result as the plan unless you both agree to respin. Long-distance pairs spin over video chat and sync activities in parallel cities.",
    title: "Date Night Wheel, Shared Plans, Zero Debate",
    metaDescription:
      "Both of you saying I don't know what to do? Spin romantic and playful date ideas and leave the house with a plan already picked.",
    useCases: [
      {
        heading: "New relationship icebreakers",
        body: "Early daters load low-pressure activities, mini golf, coffee walk, to avoid expensive dinners every Friday.",
      },
      {
        heading: "Anniversary surprises",
        body: "Partners secretly add dream experiences; the wheel reveals one on the morning of the big day.",
      },
      {
        heading: "Budget-conscious months",
        body: "Only free or under-twenty-dollar slices stay active while saving for a bigger trip later.",
      },
      {
        heading: "Rainy weekend backups",
        body: "Switch Where to At home and Budget to Budget so indoor plans like escape rooms and cooking classes stay on the wheel without a separate weather app.",
      },
    ],
    faqs: [
      {
        question: "How do the Where and Budget filters work?",
        answer:
          "They independently filter a tagged plan dataset. At home plus Budget shows low-cost indoor plans; Go out plus Treat night shows pricier outings. Both default to Anywhere / Any budget so the full pool is on the wheel immediately.",
      },
      {
        question: "Can we mix at-home and going-out ideas?",
        answer:
          "Leave Where on Anywhere, or switch between At home and Go out. Budget stays separate so a cheap night out is not mixed with a treat-night reservation unless you choose Any budget.",
      },
      {
        question: "What if one partner hates the result?",
        answer:
          "Set a one-time veto before spinning or remove disliked options permanently from the shared list.",
      },
      {
        question: "Does it book reservations?",
        answer:
          "It only picks the activity, you still call the restaurant or buy tickets after the spin.",
      },
      {
        question: "Can long-distance couples use it?",
        answer:
          "Spin the same wheel on a video call and do parallel activities like simultaneous cooking or synced movie streams.",
      },
    ],
    relatedWheels: [
      { slug: "dinner-picker-wheel", anchor: "Dinner before date night" },
      { slug: "movie-picker-wheel", anchor: "Movie after your date" },
      { slug: "self-care-wheel", anchor: "Couples self-care wheel" },
      { slug: "random-travel-destination-wheel", anchor: "Dream trip destination wheel" },
      { slug: "yes-or-no-wheel", anchor: "Go-out-or-stay-in wheel" },
    ],
  },

  "coin-flip-wheel": {
    directAnswer:
      "The Coin Flip Wheel is a digital heads-or-tails toss with CSS 3D animation, variable flip physics, and a rare edge landing (about 1 in 6,000). Tap the coin or press FLIP THE COIN; upload local face images per side; use match toss mode for cricket or football kickoffs; track a session journal; toggle Web Audio sound (off by default); and share proof links. Outcomes are chosen with crypto.getRandomValues before the animation plays—physics and sound never change the result.",
    title: "Coin Flip Wheel — Heads or Tails Online",
    metaDescription:
      "Flip a 3D coin online: tap to flip, match toss mode, edge landings, local face images, session journal, optional sound, weighted odds, and proof links.",
    useCases: [
      {
        heading: "Board game first-player picks",
        body: "Add a short question, flip once, and share the result card or proof link so everyone sees the same outcome.",
      },
      {
        heading: "Pickup sports kickoffs",
        body: "Rename sides Team A and Team B, use blue/gold presets, and track streak stats across the match.",
      },
      {
        heading: "Couples debate tiebreakers",
        body: "Type the question above the coin, flip, and download a text-only PNG without uploading photos to any server.",
      },
      {
        heading: "Classroom probability labs",
        body: "Shift the weight slider to 70/30, run multi-flip batches, and compare empirical totals to the displayed odds.",
      },
    ],
    faqs: [
      {
        question: "Can I upload photos for each coin face?",
        answer:
          "Yes. Each side has a Use your own image button in the controls card. Images stay on your device (PNG, JPEG, or WebP under 5 MB), are downscaled locally, and never upload to our servers.",
      },
      {
        question: "How do I flip the coin?",
        answer:
          "Tap the coin, click FLIP THE COIN below it, or press Space when no input is focused. All three paths use the same fair draw.",
      },
      {
        question: "What is match toss mode?",
        answer:
          "Enable Match toss mode to name both sides, pick who calls, and choose heads or tails before the flip. The page announces who wins the toss—ideal for cricket, football, or playground kickoffs—and includes toss details in proof links.",
      },
      {
        question: "Can the coin land on its edge?",
        answer:
          "Rarely—about 1 in 6,000 flips, matching real-world physics. An edge result shows the coin standing upright, offers Flip again, and does not count toward either side's tally or weighted odds.",
      },
      {
        question: "How does randomness work on this page?",
        answer:
          "Each flip draws from crypto.getRandomValues before the animation starts. Weighted odds only change the side probabilities among heads and tails—edge landings are separate. Animation length and spin count are visual only. Read more at /how-randomness-works and our /spin-wheel-fairness-study.",
      },
      {
        question: "How does weighted flip work?",
        answer:
          "Move the slider to set Side A win percentage; the label always shows the exact odds (e.g. 70% Heads / 30% Tails). Randomness still uses crypto.getRandomValues and edge landings stay at ~1 in 6,000.",
      },
      {
        question: "Does the coin make sound?",
        answer:
          "Optional Web Audio toss and landing sounds are generated in-browser—no large downloads. Sound defaults off for classrooms and offices; use the Sound off/on toggle next to the flip button after your first click.",
      },
      {
        question: "What is the session journal?",
        answer:
          "An in-memory list of this tab's flips: question, both labels, winner, toss winner if applicable, and time. Copy it as plain text or clear it anytime. Nothing is saved to disk or uploaded—refresh clears it.",
      },
      {
        question: "What is on the downloadable result image?",
        answer:
          "Question, both labels, winner, UTC timestamp, odds if weighted, and the site URL. Custom uploaded face images are not included in exports or proof links.",
      },
      {
        question: "What does the proof link contain?",
        answer:
          "Question, both labels, winner, toss caller/call/winner when match toss mode was used, UTC time, crypto RNG method, and odds if weighted—encoded in the URL with no server lookup. Proof pages are noindex.",
      },
    ],
    relatedWheels: [
      { slug: "yes-or-no-wheel", anchor: "Yes-no-maybe decision wheel" },
      { slug: "random-number-wheel", anchor: "Number range picker" },
      { slug: "winner-picker-wheel", anchor: "Giveaway winner picker" },
      { slug: "abcd-spin-wheel", anchor: "ABCD quiz guess wheel" },
      { slug: "random-student-picker", anchor: "Classroom student picker" },
    ],
  },

  "exercise-picker-wheel": {
    directAnswer:
      "The Exercise Picker Wheel assigns your next move, pushups, squats, planks, yoga flows, from a list you control, keeping home workouts from repeating the same three exercises. Spin between sets for circuit training, let PE teachers call warm-ups randomly, or run fitness challenges with friends. Edit slices anytime to match injury limits or available equipment.",
    title: "Exercise Picker Wheel, Random Workout Moves",
    metaDescription:
      "Same gym routine every Tuesday? Spin pushups, cardio, yoga, or custom moves and build a fresh circuit in under a minute.",
    useCases: [
      {
        heading: "Living-room HIIT circuits",
        body: "Spin five times, write down five moves, and cycle through them for a fifteen-minute sweat without a trainer app.",
      },
      {
        heading: "PE warm-up roulette",
        body: "Coaches project the wheel so each class period starts with a different dynamic stretch or agility drill.",
      },
      {
        heading: "Accountability group chats",
        body: "Friends screenshot their spin results nightly and post completion videos before midnight.",
      },
      {
        heading: "Physical therapy variety",
        body: "Therapists load approved mobility drills so patients randomize homework without skipping boring-but-important reps.",
      },
    ],
    faqs: [
      {
        question: "Can beginners limit difficulty?",
        answer:
          "Delete advanced slices and keep walking, wall pushups, and gentle stretches until strength improves.",
      },
      {
        question: "How do I add rep counts?",
        answer:
          "Include numbers in slice text, 10 squats, 30-second plank, so each spin specifies volume.",
      },
      {
        question: "Does it track calories?",
        answer:
          "No metrics here, pair the wheel with your watch or fitness app for burn estimates.",
      },
      {
        question: "Can I save separate leg-day and arm-day wheels?",
        answer:
          "Bookmark two customized URLs after editing slices; each page keeps its own list in browser storage.",
      },
    ],
    relatedWheels: [
      { slug: "self-care-wheel", anchor: "Recovery self-care wheel" },
      { slug: "random-number-wheel", anchor: "Rep count number wheel" },
      { slug: "team-generator-wheel", anchor: "Workout team generator" },
      { slug: "random-student-picker", anchor: "PE class student picker" },
      { slug: "random-day-picker-wheel", anchor: "Workout day scheduler" },
      { slug: "random-hobby-generator-wheel", anchor: "Try a new active hobby" },
    ],
  },

  "zodiac-sign-wheel": {
    directAnswer:
      "The Zodiac Sign Wheel randomly highlights one of twelve Western star signs, Aries through Pisces, for party games, astrology study, or social posts. Spin during sleepovers to assign faux readings, let classroom groups research whichever sign lands, or screenshot results for Instagram stories. Each sign occupies an equal slice, so every spin gives every constellation the same chance.",
    title: "Zodiac Sign Wheel, Random Star Sign Draw",
    metaDescription:
      "Hosting an astrology-themed hangout? Spin Aries through Pisces at random and build games, readings, or posts around whichever sign appears.",
    useCases: [
      {
        heading: "Sleepover personality games",
        body: "Guests spin, then act out stereotypes of the assigned sign while others guess which one landed.",
      },
      {
        heading: "Content prompt calendars",
        body: "Creators spin weekly to decide which sign gets a dedicated TikTok or Reel that week.",
      },
      {
        heading: "Classroom research prompts",
        body: "Students spin a sign and present one historical figure or myth tied to that constellation.",
      },
      {
        heading: "Compatibility icebreakers",
        body: "Pairs spin two signs, one each, and compare popular compatibility charts for laughs, not life decisions.",
      },
    ],
    faqs: [
      {
        question: "Which signs appear on the wheel?",
        answer:
          "All twelve Western signs: Aries, Taurus, Gemini, Cancer, Leo, Virgo, Libra, Scorpio, Sagittarius, Capricorn, Aquarius, and Pisces. That list is on the wheel as soon as the page loads.",
      },
      {
        question: "Does the wheel know my birth date?",
        answer:
          "Enter month and day, then Show sign. The matching tropical sign is highlighted and pinned first on the wheel. This is not a natal chart.",
      },
      {
        question: "Can I remove signs already used in a game?",
        answer:
          "Delete or deactivate a sign after it is picked so the remaining spins cover only unused options.",
      },
      {
        question: "Does this calculate my birth chart?",
        answer:
          "No natal chart. Month and day only highlight a tropical sign for games and prompts.",
      },
      {
        question: "Is Chinese zodiac included?",
        answer:
          "This wheel focuses on Western signs; use the Chinese Zodiac Wheel for Rat-through-Pig animals.",
      },
    ],
    relatedWheels: [
      { slug: "chinese-zodiac-wheel", anchor: "Chinese zodiac animal wheel" },
      { slug: "date-night-wheel", anchor: "Astrology date night ideas" },
      { slug: "truth-or-dare-spinner-online", anchor: "Party truth or dare spinner" },
      { slug: "random-color-wheel", anchor: "Lucky color of the day" },
      { slug: "random-day-picker-wheel", anchor: "Lucky day picker" },
    ],
  },

  "daily-horoscope-wheel": {
    directAnswer:
      "The Daily Horoscope Wheel delivers a playful daily theme, Lucky Day, Romantic Energy, Stay Cautious, in one spin instead of reading long horoscope columns. Treat it like a morning prompt card: spin once, note the vibe, and carry that intention through meetings or errands. It does not replace professional charts; it offers a quick ritual for lighthearted fortune flavor.",
    title: "Daily Horoscope Wheel, One-Spin Day Themes",
    metaDescription:
      "Skip the lengthy horoscope sites. Spin once for a fun daily theme like Lucky Day or Focus on Health and start your morning with a prompt.",
    useCases: [
      {
        heading: "Morning journal prompts",
        body: "Writers spin, then freewrite for five minutes about how Romantic Energy might show up at work.",
      },
      {
        heading: "Office Slack rituals",
        body: "Teams post a shared spin result each Monday to kick off the week with an inside joke.",
      },
      {
        heading: "Wellness check-ins",
        body: "Therapists' clients spin between sessions as a low-stakes mood conversation starter, not a diagnosis.",
      },
      {
        heading: "Storytime with kids",
        body: "Parents spin Unexpected Surprise and invent a bedtime tale around that theme.",
      },
    ],
    faqs: [
      {
        question: "Do I need my birth date?",
        answer:
          "No birth data required, themes apply generally, not by natal chart.",
      },
      {
        question: "What themes ship by default?",
        answer:
          "Lucky Day, Unexpected Surprise, Stay Cautious, Romantic Energy, Financial Gain, Focus on Health, Great News Coming, and Relax and Chill.",
      },
      {
        question: "Can I spin more than once a day?",
        answer:
          "You can, though many users treat the first spin as their daily card for consistency.",
      },
      {
        question: "Is this predictive astrology?",
        answer:
          "It is entertainment. Real forecasts need full chart work from qualified astrologers.",
      },
    ],
    relatedWheels: [
      { slug: "zodiac-sign-wheel", anchor: "Western zodiac sign spinner" },
      { slug: "chinese-zodiac-wheel", anchor: "Chinese horoscope animals" },
      { slug: "self-care-wheel", anchor: "Wellness self-care wheel" },
      { slug: "random-color-wheel", anchor: "Color-of-the-day wheel" },
      { slug: "yes-or-no-wheel", anchor: "Yes-no daily decisions" },
      { slug: "random-day-picker-wheel", anchor: "Pick a focus day" },
    ],
  },

  "chinese-zodiac-wheel": {
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
  },

  "random-name-picker-wheel": {
    directAnswer:
      "The Random Name Picker Wheel (Wheel of Names) is a digital hat draw: paste names, spin, and optionally remove the winner so the next pick comes from the remaining slips. Turn on weighted entries with Name:weight lines when someone deserves extra chances, review session history for substitutes, then share a proof link for livestreams.",
    title: "Random Name Picker, Wheel of Names Online",
    metaDescription:
      "Paste names, spin a fair Wheel of Names, remove winners after each pick, add optional weights, and keep session history for class or stream giveaways.",
    useCases: [
      {
        heading: "Classroom participation",
        body: "Teachers paste rosters, enable remove-after-pick, and work through the list until everyone has a turn.",
      },
      {
        heading: "Meeting speaker order",
        body: "Managers randomize who presents first so the same volunteer does not always go last.",
      },
      {
        heading: "Baby shower and party hat draws",
        body: "Hosts load gift-giver names like slips in a hat and spin to decide who opens the next present.",
      },
      {
        heading: "Weighted livestream shoutouts",
        body: "Creators give subscribers extra weight (Name:3) while still spinning live with a proof link.",
      },
    ],
    faqs: [
      {
        question: "What is remove-after-pick?",
        answer:
          "When enabled, the chosen name drops from the pool after each spin so later rounds only include remaining people, the same fairness rule as emptying a hat.",
      },
      {
        question: "How do weighted entries work?",
        answer:
          "Toggle Weighted entries and write Name:weight on a line (Alex:3). That name gets three equal slices. Leave the toggle off for classic equal chances.",
      },
      {
        question: "Where is session history?",
        answer:
          "Every completed spin appends to the Session history list under the wheel so you can see who already went without guessing.",
      },
      {
        question: "Is this the same as a pick-out-of-a-hat generator?",
        answer:
          "Yes. This page is the hat-style name draw: paste slips, spin, remove winners, or weight a few names when the rules call for it.",
      },
      {
        question: "Can I prove the spin for a raffle?",
        answer:
          "Use the proof link after a spin and screen-record if auditors want timestamped evidence of the random selection.",
      },
    ],
    relatedWheels: [
      { slug: "random-student-picker", anchor: "Classroom student picker" },
      { slug: "winner-picker-wheel", anchor: "Social giveaway winner wheel" },
      { slug: "team-generator-wheel", anchor: "Random team generator" },
      { slug: "secret-santa-wheel-generator", anchor: "Secret Santa name draw" },
      { slug: "raffle-wheel", anchor: "Raffle and prize draw wheel" },
      { slug: "classroom-spinner", anchor: "Classroom spinner hub" },
    ],
  },

  "random-number-wheel": {
    directAnswer:
      "The Random Number Wheel picks integers inside a min–max range you set. Changing minimum or maximum reloads the visual wheel immediately for ranges of 30 or fewer. Optional no-repeat mode keeps one shared used pool for both the Pick random number button and the spin wheel—drawn integers leave both until you reset or the pool empties. Larger ranges skip the wheel graphic and show a bold numeric result. Use it for board-game substitutes, bingo-style calls, or classroom math warm-ups.",
    title: "Random Number Wheel, Range and No-Repeat",
    metaDescription:
      "Set min and max—the wheel reloads instantly for ranges ≤30. No-repeat shares one pool between the quick-pick button and the spin wheel.",
    useCases: [
      {
        heading: "Bingo caller replacement",
        body: "Enable no-repeat mode for numbers 1–75 so every call stays unique until the card fills (large ranges use the numeric result display).",
      },
      {
        heading: "Tabletop RPG dice substitute",
        body: "Set 1–20 for d20 rolls during D&D sessions when physical dice roll under the couch; that range fits on the visual wheel.",
      },
      {
        heading: "Statistics sampling demos",
        body: "Professors pick repeated samples so students see distribution patterns live.",
      },
      {
        heading: "Prize number draws",
        body: "Events map ticket numbers to a range and pick on stage for transparent winner announcements.",
      },
    ],
    faqs: [
      {
        question: "How do I set min and max values?",
        answer:
          "Use the Minimum and Maximum fields in the mode card. For ranges of 30 or fewer, those integers load onto the visual wheel and Manage Entries list as soon as you change either field—no extra button needed.",
      },
      {
        question: "What does no-repeat mode do?",
        answer:
          "Drawn numbers leave one shared pool used by both Pick random number and the spin wheel until you tap Reset used or change the range. That prevents duplicate picks in one session.",
      },
      {
        question: "When do I see a spinning wheel vs a big number?",
        answer:
          "Ranges of 30 values or fewer show every integer on the visual wheel; both the button and the wheel draw from that same list. Larger ranges hide the wheel graphic and show the result as a large number so the UI stays readable.",
      },
      {
        question: "Is this cryptographically secure for high-stakes lotteries?",
        answer:
          "It suits classrooms and parties. Regulated lotteries need certified hardware; this is a visual browser tool.",
      },
    ],
    relatedWheels: [
      { slug: "coin-flip-wheel", anchor: "Binary coin flip" },
      { slug: "winner-picker-wheel", anchor: "Raffle winner name wheel" },
      { slug: "abcd-spin-wheel", anchor: "Letter answer ABCD wheel" },
      { slug: "alphabet-spinner-wheel", anchor: "A-Z letter spinner" },
      { slug: "yes-or-no-wheel", anchor: "Weighted yes or no wheel" },
    ],
  },

  "team-generator-wheel": {
    directAnswer:
      "The Team Generator Wheel spins from your participant list for a quick random pick, and also splits that same roster into balanced teams with round-robin assignment. Paste PE, workshop, or gaming names once, spin or generate squads, and skip captains arguing over who picks first.",
    title: "Team Generator Wheel, Balanced Group Splits",
    metaDescription:
      "Split PE classes, office workshops, or gaming lobbies into balanced teams from one name list, spin for a quick pick or generate squads.",
    useCases: [
      {
        heading: "PE class scrimmages",
        body: "Gym teachers paste the roster, choose four teams, and generate balanced groups each period.",
      },
      {
        heading: "Corporate retreat tables",
        body: "HR pastes attendee names, generates table groups, and breaks silos before brainstorming sessions.",
      },
      {
        heading: "Discord squad nights",
        body: "Admins paste eight players and generate two stacks so rank grinders cannot stack every ace on one side.",
      },
      {
        heading: "Science fair judging pairs",
        body: "Teachers generate random judge pairs so no student knows who evaluates their board beforehand.",
      },
    ],
    faqs: [
      {
        question: "How does the spin wheel work with team generation?",
        answer:
          "The same participant list fills the wheel for a simple random spin and feeds Generate teams for a balanced multi-team split.",
      },
      {
        question: "How many teams can I create?",
        answer:
          "Set the team count (2–20, up to your roster size). Names distribute round-robin so sizes stay within one person.",
      },
      {
        question: "Does it balance skill levels automatically?",
        answer:
          "Random assignment spreads players evenly over many runs; for strict skill balance, order star players manually first.",
      },
      {
        question: "Can I reuse the same roster weekly?",
        answer:
          "Paste the same list each time, or keep the tab open. Team labels are the generated groups, not fixed browser storage for this tool.",
      },
    ],
    relatedWheels: [
      { slug: "random-student-picker", anchor: "Pick students for teams" },
      { slug: "random-name-picker-wheel", anchor: "Name picker for captains" },
      { slug: "classroom-spinner", anchor: "Classroom spinner hub" },
      { slug: "winner-picker-wheel", anchor: "Tournament winner draw" },
      { slug: "secret-santa-wheel-generator", anchor: "Holiday gift assignments" },
    ],
  },

  "winner-picker-wheel": {
    directAnswer:
      "The Winner Picker Wheel draws giveaway champions from pasted Instagram or TikTok comment lists with duplicate-entry cleanup and screen-record proof you can post to Stories. Paste @handles, dedupe repeat tags, spin live, and archive the video for US sweepstakes disclosure basics, official rules, free entry, no purchase necessary, not legal advice. Brands gain transparent winner moments followers trust.",
    title: "Winner Picker Wheel, IG and TikTok Draws",
    metaDescription:
      "Paste commenter @handles, remove duplicate entries, spin live, and screen-record proof for Instagram or TikTok giveaway winners.",
    useCases: [
      {
        heading: "Instagram comment giveaways",
        body: "Export eligible @usernames, paste them in, spin on camera, and post the recording to your Story.",
      },
      {
        heading: "TikTok live prize drops",
        body: "Hosts spin between songs so chat sees the exact moment a handle wins merch.",
      },
      {
        heading: "Multi-tier prize rounds",
        body: "Spin for grand prize, remove the winner, respin for runner-up slots without duplicate names.",
      },
      {
        heading: "Local business raffles",
        body: "Coffee shops paste receipt numbers or emails, spin at closing time, and email the clip to participants.",
      },
    ],
    faqs: [
      {
        question: "How do I handle duplicate entries?",
        answer:
          "Search your pasted list for repeated @handles and delete extras before spinning so each person appears once.",
      },
      {
        question: "What proof should I save for followers?",
        answer:
          "Screen-record the full spin, note the date, and share the clip or a hosted link in your winner announcement post.",
      },
      {
        question: "Does this satisfy US contest disclosure rules?",
        answer:
          "You still need written official rules covering eligibility, odds, and NO PURCHASE NECESSARY, consult counsel for regulated promos; this wheel only randomizes picks.",
      },
      {
        question: "Can I pick multiple winners in one session?",
        answer:
          "Spin, remove the winner, and repeat until every prize tier has a unique name.",
      },
      {
        question: "Does it pull comments automatically from Instagram?",
        answer:
          "No API import, you paste the eligible list you exported or copied from the platform.",
      },
    ],
    relatedWheels: [
      { slug: "instagram-wheel-picker", anchor: "Instagram-focused giveaway wheel" },
      { slug: "random-name-picker-wheel", anchor: "General Wheel of Names" },
      { slug: "secret-santa-wheel-generator", anchor: "Holiday name assignment" },
      { slug: "coin-flip-wheel", anchor: "Coin-flip tiebreaker" },
      { slug: "random-number-wheel", anchor: "Numbered ticket draw" },
    ],
  },

  "pick-out-of-a-hat-generator": {
    directAnswer:
      "The Pick Out of a Hat Generator replaces crumpled paper slips with a digital draw that feels like reaching into a top hat. Paste names or ticket numbers, spin, and reveal one random entry while optionally removing it from the pool for the next round. PTA raffles, podcast giveaways, and coffee clubs use it when nobody brought a real hat.",
    title: "Pick Out of a Hat, Digital Name Draw",
    metaDescription:
      "Forgot the paper slips? Paste names into our magic hat spinner, draw winners fairly, and remove picks so nobody wins twice.",
    useCases: [
      {
        heading: "School carnival booths",
        body: "Volunteers spin for prize bucket numbers while kids watch the colorful wheel instead of a fishbowl.",
      },
      {
        heading: "Podcast listener drawings",
        body: "Hosts paste Patreon names, spin on-air, and read the winner live with audible drumroll energy.",
      },
      {
        heading: "Office coffee fund",
        body: "Teams spin monthly to pick who buys beans, removing names until everyone contributes once.",
      },
      {
        heading: "Wedding reception games",
        body: "MCs spin among guest table numbers for bouquet-adjacent mini prizes.",
      },
    ],
    faqs: [
      {
        question: "How is this different from Wheel of Names?",
        answer:
          "Same fair random engine, this page frames the experience as a classic hat draw for users searching that phrase.",
      },
      {
        question: "Can I put numbers instead of names?",
        answer:
          "Yes. Ticket stubs, bingo cards, or seat numbers work as slice text.",
      },
      {
        question: "What happens after someone wins?",
        answer:
          "Remove or deactivate that entry so subsequent draws only include remaining slips.",
      },
      {
        question: "Does it work on a phone at the event?",
        answer:
          "The responsive layout fits phones held by emcees walking the crowd.",
      },
    ],
    relatedWheels: [
      { slug: "random-name-picker-wheel", anchor: "Wheel of Names picker" },
      { slug: "winner-picker-wheel", anchor: "Giveaway winner spinner" },
      { slug: "secret-santa-wheel-generator", anchor: "Secret Santa hat draw" },
      { slug: "random-number-wheel", anchor: "Numbered ticket spinner" },
      { slug: "instagram-wheel-picker", anchor: "Social media comment draw" },
      { slug: "coin-flip-wheel", anchor: "Quick hat-or-tails flip" },
    ],
  },

  "nfl-team-picker-wheel": {
    directAnswer:
      "The NFL Team Picker Wheel assigns a franchise, from Chiefs to Cowboys to Ravens, for Madden tournaments, fantasy draft order, and friendly wagers. Spin before kickoff to decide which team you must win with, or randomize draft slots so nobody grabs the same powerhouse every season. Edit slices each year to match current rosters or trim to playoff contenders only.",
    title: "NFL Team Picker Wheel, Madden Draft Randomizer",
    metaDescription:
      "Setting up a Madden bracket or fantasy draft order? Spin all 32 NFL teams, or your custom list, and play whoever the wheel assigns.",
    useCases: [
      {
        heading: "Madden house rules",
        body: "Friend groups spin once per quarter so players cannot reroll until they win with a bad team.",
      },
      {
        heading: "Fantasy draft order",
        body: "League commissioners spin to set pick positions before the live draft board opens.",
      },
      {
        heading: "Super Bowl party bets",
        body: "Guests spin neutral teams for prop-bet side pools during the big game.",
      },
      {
        heading: "Sports journalism prompts",
        body: "Bloggers spin a franchise and write a hot take about that roster for content calendars.",
      },
    ],
    faqs: [
      {
        question: "Are all 32 teams included?",
        answer:
          "The default wheel lists every active NFL franchise; delete any you do not want before spinning.",
      },
      {
        question: "Can I limit to AFC West only?",
        answer:
          "Remove other divisions and keep Chiefs, Chargers, Raiders, and Broncos slices active.",
      },
      {
        question: "Does it update when teams relocate?",
        answer:
          "You manually edit slice labels when names or cities change.",
      },
      {
        question: "Will it simulate a schedule?",
        answer:
          "It picks one team per spin, build a season manually by spinning multiple times.",
      },
    ],
    relatedWheels: [
      { slug: "team-generator-wheel", anchor: "Player team generator" },
      { slug: "coin-flip-wheel", anchor: "Coin toss for kickoff" },
      { slug: "winner-picker-wheel", anchor: "Fantasy league winner draw" },
      { slug: "random-number-wheel", anchor: "Draft slot numbers" },
      { slug: "fortnite-drop-location-wheel", anchor: "Battle royale drop picker" },
      { slug: "roblox-game-picker-wheel", anchor: "Roblox game randomizer" },
    ],
  },

  "alphabet-spinner-wheel": {
    directAnswer:
      "The A to Z alphabet wheel (also called a random letter spinner or alphabet letter spin wheel) picks one letter for phonics drills, Scattergories rounds, and spelling bees. Exclude letters already used so the next spin only shows remaining consonants and vowels. Kindergarten teachers project it on smartboards, ESL tutors randomize vocabulary starts, and party hosts spin before naming categories.",
    title: "A to Z Alphabet Wheel, Random Letter Spinner",
    h1: "A to Z Alphabet Wheel, Random Letter Spinner",
    metaDescription:
      "Spin an A to Z alphabet wheel for phonics, word games, and letter-of-the-day picks. Exclude used letters and call the random letter on a smartboard.",
    useCases: [
      {
        heading: "Kindergarten letter-of-the-day",
        body: "Teachers spin, exclude prior letters, and build crafts around whichever glyph remains.",
      },
      {
        heading: "Scattergories starter",
        body: "Hosts spin one letter; every answer that round must begin with that character.",
      },
      {
        heading: "Spelling bee warm-ups",
        body: "Coaches spin vowels only by excluding all consonants temporarily for pronunciation drills.",
      },
      {
        heading: "Password game nights",
        body: "Teams spin letters to seed codenames before the guessing round begins.",
      },
    ],
    faqs: [
      {
        question: "How does exclude-letters work?",
        answer:
          "Deactivate or delete any letter after it is picked so the next spin only considers remaining characters in the alphabet.",
      },
      {
        question: "Can I spin lowercase letters?",
        answer:
          "Edit slice text to a, b, c if young readers need lowercase practice.",
      },
      {
        question: "Does it include digraphs?",
        answer:
          "Default slices are single A–Z letters; add TH or CH manually for advanced phonics.",
      },
      {
        question: "Is it smartboard friendly?",
        answer:
          "Use Projector fullscreen to expand the wheel with a large tap-to-spin button so back-row students can read slices clearly.",
      },
    ],
    relatedWheels: [
      { slug: "random-word-generator-wheel", anchor: "Random vocabulary word wheel" },
      { slug: "abcd-spin-wheel", anchor: "Multiple-choice ABCD spinner" },
      { slug: "random-student-picker", anchor: "Call on students fairly" },
      { slug: "random-name-picker-wheel", anchor: "Student name picker" },
      { slug: "what-to-draw-wheel", anchor: "Art prompt drawing wheel" },
      { slug: "random-country-wheel", anchor: "Geography letter quizzes" },
    ],
  },

  "random-word-generator-wheel": {
    directAnswer:
      "The Random Word Generator Wheel surfaces vocabulary words for Pictionary, Charades, creative writing, and ESL drills. Spin to land on nouns like Ocean or Whisper, then draw, act, or define the term. Authors break writer's block, teachers review spelling lists, and party hosts avoid repeating the same easy words every round by editing slices between games.",
    title: "Random Word Generator, Vocabulary Spinner",
    metaDescription:
      "Running Pictionary or fighting writer's block? Spin nouns and verbs from our word list or paste your own vocabulary for instant prompts.",
    useCases: [
      {
        heading: "Pictionary night",
        body: "Teams spin, sketch the word in sixty seconds, and score points before the timer buzzes.",
      },
      {
        heading: "Creative writing warm-ups",
        body: "Students spin three words and weave all three into a paragraph opening exercise.",
      },
      {
        heading: "ESL pronunciation pairs",
        body: "Tutors spin, learners use the word in a sentence, then spin again for the next partner.",
      },
      {
        heading: "Spelling bee practice",
        body: "Coaches load weekly lists so contestants rehearse whatever word appears.",
      },
    ],
    faqs: [
      {
        question: "Can I paste my own word list?",
        answer:
          "Bulk paste replaces defaults with classroom spelling words or foreign-language vocabulary.",
      },
      {
        question: "Are words filtered for kids?",
        answer:
          "Defaults are family-friendly; review custom lists before projecting in class.",
      },
      {
        question: "Does it generate definitions?",
        answer:
          "Only the word appears, you look up meanings or act them out in games.",
      },
      {
        question: "Can I weight harder words?",
        answer:
          "Duplicate challenging terms on multiple slices to make them appear more often.",
      },
    ],
    relatedWheels: [
      { slug: "alphabet-spinner-wheel", anchor: "A-Z letter spinner" },
      { slug: "what-to-draw-wheel", anchor: "Drawing prompt wheel" },
      { slug: "abcd-spin-wheel", anchor: "Quiz letter ABCD wheel" },
      { slug: "random-animal-picker-wheel", anchor: "Animal vocabulary wheel" },
      { slug: "random-country-wheel", anchor: "Country name wheel" },
      { slug: "truth-or-dare-spinner-online", anchor: "Party game word dares" },
    ],
  },

  "random-country-wheel": {
    directAnswer:
      "The Random Country Wheel lands on nations like Japan, Brazil, or Egypt for geography quizzes, travel brainstorming, and classroom research assignments. Spin once, then name the capital, flag colors, or continent of the highlighted country. Travel vloggers film spin-to-fly challenges, teachers replace flashcards, and trivia hosts keep rounds unpredictable by removing countries already used.",
    title: "Random Country Wheel, Geography Quiz Spinner",
    metaDescription:
      "Brushing up on capitals or picking your next trip? Spin countries from around the globe and quiz yourself on flags, maps, and facts.",
    useCases: [
      {
        heading: "Middle school geography bees",
        body: "Students spin, then recite capital cities before a five-second timer expires.",
      },
      {
        heading: "Travel bucket lists",
        body: "Couples spin among dream destinations and research flights for whichever nation appears.",
      },
      {
        heading: "Model UN prep",
        body: "Delegates spin to receive a random nation brief for mock debate practice.",
      },
      {
        heading: "Flag identification drills",
        body: "Spin a country, then name its flag colors and one neighboring nation before the timer runs out.",
      },
      {
        heading: "UNESCO heritage research",
        body: "High schoolers spin a nation, then present one UNESCO site located there with a photo and two facts.",
      },
    ],
    faqs: [
      {
        question: "Does it include every UN member state?",
        answer:
          "Defaults highlight popular nations; paste all 195 names if you need exhaustive coverage.",
      },
      {
        question: "Can I filter by continent?",
        answer:
          "Delete non-European slices when running a Europe-only unit.",
      },
      {
        question: "Does it show maps or flags?",
        answer:
          "Text labels only, learners look up visuals after the spin.",
      },
      {
        question: "Can I spin for capitals instead?",
        answer:
          "Replace country names with capital cities on the slices.",
      },
      {
        question: "Can I add territories and regions?",
        answer:
          "Paste any label you want, territories, states, or regions, into the entry list.",
      },
    ],
    supplementalSections: [
      {
        heading: "Building a full country list",
        body: "Start with the default nations, then paste all 195 UN members when your class needs exhaustive coverage. Remove countries after they appear in a quiz so students cycle through the whole wheel before repeats.",
      },
    ],
    relatedWheels: [
      { slug: "random-travel-destination-wheel", anchor: "Vacation city picker" },
      { slug: "random-animal-picker-wheel", anchor: "Country animal research" },
      { slug: "random-day-picker-wheel", anchor: "Country-of-the-week schedule" },
      { slug: "alphabet-spinner-wheel", anchor: "Capital starts-with letter game" },
      { slug: "random-color-wheel", anchor: "Flag color challenge" },
      { slug: "random-word-generator-wheel", anchor: "Foreign vocabulary words" },
    ],
  },

  "random-animal-picker-wheel": {
    directAnswer:
      "The Random Animal Picker Wheel selects creatures, from lions to penguins, for science reports, sketch prompts, and zoo-trip games. Young learners spin, then draw or research whichever animal appears, while art teachers assign daily wildlife studies. Customize slices for marine-only units or jungle habitats, and remove species after use so biodiversity lessons cover the whole wheel over time.",
    title: "Random Animal Picker, Wildlife Spinner",
    metaDescription:
      "Need a science fair topic or sketch subject? Spin lions, sharks, penguins, or your custom creature list and learn about whatever lands.",
    useCases: [
      {
        heading: "Elementary research reports",
        body: "Third graders spin, check out library books on that species, and present one fact Friday.",
      },
      {
        heading: "Daily sketch challenges",
        body: "Artists spin each morning and practice gesture drawing the assigned animal.",
      },
      {
        heading: "Zoo scavenger hunts",
        body: "Families spin before entering and race to photograph the chosen exhibit first.",
      },
      {
        heading: "Habitat sorting games",
        body: "Spin an animal, then classify it as land, sea, or sky dweller and name one adaptation that fits.",
      },
      {
        heading: "Scout badge requirements",
        body: "Troop leaders spin to assign which animal a scout must identify, sketch, or track for a nature badge.",
      },
    ],
    faqs: [
      {
        question: "Can I limit to ocean animals?",
        answer:
          "Clear defaults and paste sharks, whales, and octopus names only.",
      },
      {
        question: "Are extinct animals included?",
        answer:
          "Add dinosaurs or megafauna manually if your unit covers paleontology.",
      },
      {
        question: "Does it play animal sounds?",
        answer:
          "No audio, kids mimic sounds themselves during games.",
      },
      {
        question: "Can pet names go on the wheel?",
        answer:
          "Yes. Paste household pet names for chore assignment games.",
      },
      {
        question: "How many animals ship on the wheel?",
        answer:
          "Defaults include dozens of common species; paste your full class list to replace them.",
      },
    ],
    supplementalSections: [
      {
        heading: "Fair spins for young learners",
        body: "Each animal slice has equal width, so a lion is exactly as likely as a penguin. Spins use the same browser cryptography as every other wheel on this site, which keeps classroom draws transparent when parents or administrators ask how winners are chosen. Remove a species after it is assigned so your class cycles through the full list before any creature repeats.",
      },
    ],
    relatedWheels: [
      { slug: "what-to-draw-wheel", anchor: "Creative drawing prompts" },
      { slug: "chinese-zodiac-wheel", anchor: "Zodiac animal wheel" },
      { slug: "random-country-wheel", anchor: "Native habitat countries" },
      { slug: "random-word-generator-wheel", anchor: "Animal vocabulary words" },
      { slug: "pokemon-randomizer-wheel", anchor: "Pokemon creature picker" },
      { slug: "bedtime-story-picker-wheel", anchor: "Animal bedtime stories" },
    ],
  },

  "random-day-picker-wheel": {
    directAnswer:
      "The Random Day Picker Wheel chooses weekdays, Monday through Sunday, for chore charts, study schedules, and toddler calendar lessons. Spin to assign dish duty, rotate which child picks dinner, or teach young kids the sequence of days with a colorful spinner. Swap slices for months when you need a random January-through-December picker instead of weekdays.",
    title: "Random Day Picker, Weekday Scheduler",
    metaDescription:
      "Assign chores or study blocks fairly. Spin Monday through Sunday, or swap in months, and let the calendar pick who does what.",
    useCases: [
      {
        heading: "Sibling chore rotation",
        body: "Each child spins; whichever day lands is their laundry responsibility that week.",
      },
      {
        heading: "Toddler calendar time",
        body: "Preschool teachers spin while singing days-of-the-week songs on circle rugs.",
      },
      {
        heading: "Study subject planner",
        body: "College students map calculus, history, and lab prep to specific weekdays via random assignment.",
      },
      {
        heading: "Weekly meeting themes",
        body: "Remote teams spin a weekday to decide which stand-up includes a show-and-tell segment.",
      },
      {
        heading: "Podcast release scheduling",
        body: "Indie hosts spin among Tue, Thu, and Sat to pick the next episode drop when their calendar is open.",
      },
    ],
    faqs: [
      {
        question: "Can I switch to months?",
        answer:
          "Replace weekday labels with January through December for monthly random picks.",
      },
      {
        question: "What if Saturday lands twice in a row?",
        answer:
          "Each spin is independent, remove Saturday temporarily if you need variety.",
      },
      {
        question: "Does it integrate with Google Calendar?",
        answer:
          "No export, you manually add the chosen day to your planner.",
      },
      {
        question: "Can I add holidays?",
        answer:
          "Insert Thanksgiving or Spring Break as custom slices alongside weekdays.",
      },
      {
        question: "Can I spin for weekends only?",
        answer:
          "Delete weekdays and keep Saturday and Sunday slices for weekend-only picks.",
      },
    ],
    supplementalSections: [
      {
        heading: "Calendar fairness for families",
        body: "Weekday slices are equal size, so Monday is no more likely than Friday. That matters when siblings track chore charts or when teachers rotate line-leader duty. Remove a day after it wins if you need each weekday used once before repeats, or swap in month names when you want a January-through-December picker instead.",
      },
    ],
    relatedWheels: [
      { slug: "random-student-picker", anchor: "Daily student caller" },
      { slug: "self-care-wheel", anchor: "Daily wellness activity" },
      { slug: "exercise-picker-wheel", anchor: "Workout day randomizer" },
      { slug: "dinner-picker-wheel", anchor: "Meal plan by day" },
      { slug: "family-game-night-picker-wheel", anchor: "Game night scheduler" },
      { slug: "random-hobby-generator-wheel", anchor: "Weekend hobby picker" },
    ],
  },

  "random-student-picker": {
    directAnswer:
      "The Random Student Picker helps US teachers call on learners fairly using remove-after-pick mode, session history, and fullscreen classroom mode designed for projectors. Paste your roster, spin, and the chosen name can drop from the pool automatically so every student participates before repeats. History logs who went already, which subs trust on day one.",
    title: "Random Student Picker, Classroom Fair Call",
    metaDescription:
      "Paste your class roster, spin in fullscreen mode, auto-remove picked students, and review session history so every kid gets a turn.",
    useCases: [
      {
        heading: "Cold-call reading rounds",
        body: "ELA teachers spin before each paragraph so shy readers know the wheel, not favoritism, decides.",
      },
      {
        heading: "Lab partner assignment",
        body: "Science classes spin twice per table group and pair students who have not appeared in history yet.",
      },
      {
        heading: "Substitute teacher handoff",
        body: "Session history shows who already answered so guest teachers continue fair rotation.",
      },
      {
        heading: "Reward seat picker",
        body: "Positive behavior classes spin for flexible seating passes once homework checks finish.",
      },
    ],
    faqs: [
      {
        question: "What is remove-after-pick mode?",
        answer:
          "When enabled, the selected student leaves the active wheel automatically after each spin until you reset the roster.",
      },
      {
        question: "Where does session history appear?",
        answer:
          "A running list shows names picked during the current class period so you never lose track mid-lesson.",
      },
      {
        question: "How do I use fullscreen classroom mode?",
        answer:
          "Expand the wheel to fill the projector or smartboard so back-row students see slices clearly.",
      },
      {
        question: "Can I import from Google Classroom?",
        answer:
          "Copy names from your gradebook and bulk paste, no direct LMS sync yet.",
      },
      {
        question: "Does it work offline after loading?",
        answer:
          "Spins run locally once the page caches, handy when school Wi-Fi drops briefly.",
      },
    ],
    relatedWheels: [
      { slug: "random-name-picker-wheel", anchor: "General name picker wheel" },
      { slug: "team-generator-wheel", anchor: "Split students into teams" },
      { slug: "alphabet-spinner-wheel", anchor: "Letter-of-the-day spinner" },
      { slug: "abcd-spin-wheel", anchor: "Quiz answer ABCD wheel" },
      { slug: "random-number-wheel", anchor: "Math problem number picker" },
      { slug: "winner-picker-wheel", anchor: "Classroom prize draw" },
    ],
  },

  "what-to-draw-wheel": {
    directAnswer:
      "The What to Draw Wheel generates art prompts, a flying cat, haunted house, alien spaceship, when blank pages intimidate sketchers. Illustrators spin once before opening Procreate, art teachers assign warm-up subjects, and kids' camps run timed drawing races. Customize slices with anatomy drills or landscape themes, and delete prompts after use so weekly challenges never repeat until you reset the list.",
    title: "What to Draw Wheel, Art Prompt Generator",
    metaDescription:
      "Blank sketchbook staring back? Spin surreal, cute, or spooky drawing prompts and start sketching before perfectionism kicks in.",
    useCases: [
      {
        heading: "Inktober daily lists",
        body: "Artists paste thirty October prompts and spin each morning instead of following a fixed calendar order.",
      },
      {
        heading: "Middle school art class",
        body: "Teachers spin for five-minute gesture sketches before longer portrait units begin.",
      },
      {
        heading: "Twitch draw-alongs",
        body: "Streamers spin live so chat watches the prompt reveal in real time.",
      },
      {
        heading: "Family rainy-day crafts",
        body: "Parents spin with kids, then compare crayon interpretations on the fridge.",
      },
    ],
    faqs: [
      {
        question: "Are default prompts kid-safe?",
        answer:
          "Yes, flying cats and cute monsters dominate; edit slices if teens want edgier themes.",
      },
      {
        question: "Can I add reference links?",
        answer:
          "Slice text is plain words only, keep Pinterest tabs open separately.",
      },
      {
        question: "Does it specify medium?",
        answer:
          "Add tags like watercolor or pencil in the label text yourself.",
      },
      {
        question: "Can I spin twice for mashups?",
        answer:
          "Many artists spin twice and combine both prompts into one scene.",
      },
    ],
    relatedWheels: [
      { slug: "random-color-wheel", anchor: "Three-marker color challenge" },
      { slug: "random-word-generator-wheel", anchor: "Vocabulary sketch prompts" },
      { slug: "random-animal-picker-wheel", anchor: "Draw this animal wheel" },
      { slug: "alphabet-spinner-wheel", anchor: "Draw something starting with…" },
      { slug: "pokemon-randomizer-wheel", anchor: "Draw this Pokemon wheel" },
      { slug: "random-hobby-generator-wheel", anchor: "Pick up drawing as a hobby" },
    ],
  },

  "abcd-spin-wheel": {
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
  },

  "twister-spinner-online": {
    directAnswer:
      "Twister Spinner Online replaces lost cardboard spinners with digital Left Hand Red and Right Foot Green combinations during living-room party games. Tap spin between poses so referees call moves fairly when the physical arrow breaks. All sixteen classic color-and-limb pairings ship ready, and phones sit beside the mat while one player operates the virtual dial.",
    title: "Twister Spinner Online, Virtual Party Dial",
    metaDescription:
      "Missing the Twister arrow? Spin Left Hand Red and Right Foot Green combos on your phone while friends stay on the mat.",
    useCases: [
      {
        heading: "Birthday party rescue",
        body: "Hosts pull up the online spinner when the original board piece vanished years ago.",
      },
      {
        heading: "Dorm game nights",
        body: "College students cast the spinner to a laptop while the mat covers the common-room floor.",
      },
      {
        heading: "Referee mode",
        body: "One person sits out, spins each round, and reads commands so players keep both hands free.",
      },
      {
        heading: "Outdoor picnic Twister",
        body: "Tablets sit on grass while wind would blow a lightweight plastic spinner away.",
      },
    ],
    faqs: [
      {
        question: "Are all classic moves included?",
        answer:
          "Yes, left and right hands and feet across red, yellow, blue, and green match the retail game.",
      },
      {
        question: "Can I add custom dares?",
        answer:
          "Edit slice text to mix Twister commands with party challenges if mats get too crowded.",
      },
      {
        question: "Does it work one-handed?",
        answer:
          "A single tap starts the spin, ideal when your other limbs are already tangled.",
      },
      {
        question: "Is audio available for calls?",
        answer:
          "Visual labels only, referees shout the result for players on the mat.",
      },
    ],
    relatedWheels: [
      { slug: "truth-or-dare-spinner-online", anchor: "Truth or dare party wheel" },
      { slug: "family-game-night-picker-wheel", anchor: "Family board game picker" },
      { slug: "random-color-wheel", anchor: "Color-only challenge wheel" },
      { slug: "exercise-picker-wheel", anchor: "Fitness dare wheel" },
      { slug: "random-number-wheel", anchor: "Timer round numbers" },
      { slug: "yes-or-no-wheel", anchor: "Play again yes-no wheel" },
    ],
  },

  "fast-food-wheel": {
    directAnswer:
      "The Fast Food Wheel picks chains like Taco Bell, Wendy's, or local spots when lunch debates stall at the office. Load drive-thru favorites, spin once, and whoever suggested the wheel pays, or follow house rules. Road trips, dorm dinners, and DoorDash groups use it to escape the same three delivery apps every weekday.",
    title: "Fast Food Wheel, Lunch Roulette Picker",
    metaDescription:
      "Office lunch stalemate again? Spin McDonald's, Taco Bell, local spots, or your own list and head to whatever restaurant wins.",
    useCases: [
      {
        heading: "Office Friday rituals",
        body: "Teams spin at eleven-thirty and walk together to the winning franchise before lines peak.",
      },
      {
        heading: "Road trip drive-thru",
        body: "Families spin at each highway exit to try regional chains they would normally skip.",
      },
      {
        heading: "Dorm delivery pools",
        body: "Roommates spin, split the app bill, and rate the surprise cuisine afterward.",
      },
      {
        heading: "Diet cheat-day picks",
        body: "Fitness trackers spin among approved treat meals so indulgence still feels structured.",
      },
    ],
    faqs: [
      {
        question: "Can I add local-only restaurants?",
        answer:
          "Delete national defaults and paste city-specific taco trucks or delis.",
      },
      {
        question: "What if someone is vegetarian?",
        answer:
          "Keep only places with reliable plant-based menus on the wheel.",
      },
      {
        question: "Does it integrate with delivery apps?",
        answer:
          "It names the restaurant, you still order through your preferred app.",
      },
      {
        question: "Can we ban a result permanently?",
        answer:
          "Remove that slice after a bad experience so it never spins again.",
      },
    ],
    relatedWheels: [
      { slug: "dinner-picker-wheel", anchor: "Home dinner meal wheel" },
      { slug: "date-night-wheel", anchor: "Date night restaurant spin" },
      { slug: "random-color-wheel", anchor: "Order the color meal challenge" },
      { slug: "yes-or-no-wheel", anchor: "Delivery or cook yes-no" },
      { slug: "self-care-wheel", anchor: "Mindful eating break wheel" },
      { slug: "movie-picker-wheel", anchor: "Movie after fast food" },
    ],
  },

  "random-color-wheel": {
    directAnswer:
      "The Random Color Wheel selects hues, red, cyan, magenta, for art challenges, design brainstorming, and classroom games. Creators spin before three-marker YouTube videos, UI designers pick accent colors randomly, and teachers organize color-of-the-day activities. Paste hex codes on slices when brand guidelines need exact values instead of basic color names.",
    title: "Random Color Wheel, Palette Spinner",
    metaDescription:
      "Running a three-marker art challenge or need an accent hue? Spin named colors or paste hex codes for instant palette picks.",
    useCases: [
      {
        heading: "Three-marker challenge",
        body: "Artists spin three times, lock those markers, and illustrate one scene with limited pigments.",
      },
      {
        heading: "Brand mood boards",
        body: "Freelancers spin hex slices when clients say surprise me for secondary palette exploration.",
      },
      {
        heading: "Toddler color drills",
        body: "Preschoolers spin, then hunt the room for objects matching the chosen primary color.",
      },
      {
        heading: "Fashion coordination",
        body: "Stylists spin accessory colors to pair with neutral outfits before photo shoots.",
      },
    ],
    faqs: [
      {
        question: "Can I enter hex values?",
        answer:
          "Replace slice labels with #FF5733 or RGB notes for precise design work.",
      },
      {
        question: "Does it show swatches?",
        answer:
          "Wheel slice colors visualize each entry; text can still spell the color name.",
      },
      {
        question: "Can I exclude neutrals?",
        answer:
          "Delete black, white, and gray slices when you need vibrant results only.",
      },
      {
        question: "Will custom palettes save?",
        answer:
          "Browser storage keeps edited lists on the same device between sessions.",
      },
    ],
    relatedWheels: [
      { slug: "what-to-draw-wheel", anchor: "Drawing subject prompts" },
      { slug: "outfit-picker-wheel", anchor: "Outfit color pairing" },
      { slug: "alphabet-spinner-wheel", anchor: "Color starts with letter game" },
      { slug: "twister-spinner-online", anchor: "Twister color limbs" },
      { slug: "random-word-generator-wheel", anchor: "Describe this color word" },
      { slug: "self-care-wheel", anchor: "Creative self-care color journal" },
    ],
  },

  "self-care-wheel": {
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
  },

  "pokemon-randomizer-wheel": {
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
  },

  "secret-santa-wheel-generator": {
    directAnswer:
      "The Secret Santa Wheel Generator spins a wheel from your participant list for a quick random draw, and also runs full gift-exchange assignment mode with spouse exclusions and shareable per-person reveal links. Organizers paste coworker or family names once, spin or generate pairings, and send each participant a unique URL when using assignment mode.",
    title: "Secret Santa Wheel, Assignments and Exclusions",
    metaDescription:
      "Run office or family Secret Santa with assignment mode, couple exclusions, and private reveal links so each gifter sees only their match.",
    useCases: [
      {
        heading: "Corporate holiday parties",
        body: "HR loads departments, excludes managers from direct reports if policy requires, and emails reveal links.",
      },
      {
        heading: "Extended family exchanges",
        body: "Cousins spin with spouse exclusions so partners never draw each other.",
      },
      {
        heading: "Remote team celebrations",
        body: "Distributed staff receive individual links during a Zoom toast instead of passing a hat.",
      },
      {
        heading: "Budget-friendly friend groups",
        body: "Slices include twenty-dollar cap reminders in the label text before assignments finalize.",
      },
    ],
    faqs: [
      {
        question: "How does assignment mode work?",
        answer:
          "Each participant gets a dedicated draw sequence so every name maps to exactly one recipient without duplicates.",
      },
      {
        question: "Can I block certain pairings?",
        answer:
          "Set exclusions, roommates, spouses, last year's match, before generating assignments.",
      },
      {
        question: "What are per-person reveal links?",
        answer:
          "Unique URLs show only your giftee, keeping other pairings secret until gift night.",
      },
      {
        question: "What if someone draws themselves?",
        answer:
          "The generator rerolls invalid assignments automatically before sharing links.",
      },
      {
        question: "Does it store addresses?",
        answer:
          "Only names on the wheel, shipping details stay in your separate chat thread.",
      },
    ],
    relatedWheels: [
      { slug: "random-name-picker-wheel", anchor: "General name draw wheel" },
      { slug: "winner-picker-wheel", anchor: "Holiday raffle winner" },
      { slug: "instagram-wheel-picker", anchor: "Social giveaway spinner" },
      { slug: "family-game-night-picker-wheel", anchor: "Holiday game night picker" },
      { slug: "bedtime-story-picker-wheel", anchor: "Seasonal story picker" },
    ],
  },

  "horror-movie-picker-wheel": {
    directAnswer:
      "The Horror Movie Picker Wheel chooses subgenres, slasher, found footage, paranormal, for spooky nights when everyone wants scares but nobody picks the title. Load classic categories or specific films, spin in the dark, and commit before someone suggests a comedy instead. Halloween hosts, horror YouTubers, and sleepover teens use it to escape endless Shudder browsing.",
    title: "Horror Movie Picker, Scary Night Roulette",
    metaDescription:
      "Lights off and nobody picked a scary movie yet? Spin slasher, paranormal, or your watchlist titles and start screaming together.",
    useCases: [
      {
        heading: "Halloween marathon",
        body: "Hosts spin each hour to rotate subgenres from creature features to psychological thrillers.",
      },
      {
        heading: "YouTube review roulette",
        body: "Critics spin a genre bucket, then review the highest-rated unseen film inside it.",
      },
      {
        heading: "Sleepover dares",
        body: "Teens spin; whoever suggests turning on the lights buys snacks.",
      },
      {
        heading: "Couples cozy horror",
        body: "Partners load mild thriller slices when one person scares easily but still wants October vibes.",
      },
    ],
    faqs: [
      {
        question: "Can I remove gore-heavy genres?",
        answer:
          "Delete slices like Found Footage and keep Supernatural or Classic Monster instead.",
      },
      {
        question: "Does it know streaming availability?",
        answer:
          "It only names genres or titles, you check apps afterward.",
      },
      {
        question: "Can I list specific franchises?",
        answer:
          "Replace genres with Halloween, Scream, or Conjuring entries for marathon order.",
      },
      {
        question: "Is it too scary for kids?",
        answer:
          "Customize slices to Goosebumps-level titles for younger audiences.",
      },
    ],
    relatedWheels: [
      { slug: "movie-picker-wheel", anchor: "General movie night wheel" },
      { slug: "truth-or-dare-spinner-online", anchor: "Scary party dare spinner" },
      { slug: "family-game-night-picker-wheel", anchor: "Family-friendly game night" },
      { slug: "bedtime-story-picker-wheel", anchor: "Mild bedtime story wheel" },
      { slug: "date-night-wheel", anchor: "Spooky date night ideas" },
      { slug: "yes-or-no-wheel", anchor: "Watch or skip yes-no" },
    ],
  },

  "family-game-night-picker-wheel": {
    directAnswer:
      "The Family Game Night Picker Wheel selects board games, card games, or active games like Twister when kids and parents argue over what to play. Load Monopoly, Uno, Charades, or video-game titles, let the youngest spin, and setup starts immediately. Removing played games keeps month-long Friday traditions fresh without repeating the same shelf favorite every week.",
    title: "Family Game Night Wheel, Pick What to Play",
    metaDescription:
      "Kids fighting over Monopoly versus Mario Kart? Spin your family's game list and start playing whatever the wheel chooses.",
    useCases: [
      {
        heading: "Rainy Friday rituals",
        body: "Families keep a shelf list on the wheel and spin before pizza arrives.",
      },
      {
        heading: "Mixed-age households",
        body: "Parents tag slices 5+, 10+, or teen so results match the youngest player present.",
      },
      {
        heading: "Holiday cousin visits",
        body: "Extended family bulk-pastes party games before everyone arrives.",
      },
      {
        heading: "Screen-time tradeoffs",
        body: "Board-game slices sit next to Switch titles so digital and analog nights rotate fairly.",
      },
    ],
    faqs: [
      {
        question: "Can we add video games?",
        answer:
          "Yes, Mario Kart and Minecraft slices coexist with Jenga and Scrabble.",
      },
      {
        question: "What if setup takes too long?",
        answer:
          "Remove heavy games on school nights and keep quick card games active.",
      },
      {
        question: "Does it teach fairness?",
        answer:
          "Kids see the wheel, not parents, pick, which reduces my-game-was-ignored meltdowns.",
      },
      {
        question: "Can grandparents use it on tablets?",
        answer:
          "Large tap targets and bright slices work well for older relatives.",
      },
    ],
    relatedWheels: [
      { slug: "twister-spinner-online", anchor: "Twister virtual spinner" },
      { slug: "truth-or-dare-spinner-online", anchor: "Teen party dare wheel" },
      { slug: "bedtime-story-picker-wheel", anchor: "Post-game bedtime story" },
      { slug: "random-student-picker", anchor: "Pick who goes first" },
      { slug: "movie-picker-wheel", anchor: "Movie after game night" },
      { slug: "secret-santa-wheel-generator", anchor: "Holiday gift exchange" },
    ],
  },

  "bedtime-story-picker-wheel": {
    directAnswer:
      "The Bedtime Story Picker Wheel chooses fairy tales and bedtime titles so kids feel involved in storytime while parents escape reading the same book nightly. Let children tap spin on a tablet, read whichever tale lands, and remove stories already heard this week. Custom slices can list library books on the shelf for a personalized routine.",
    title: "Bedtime Story Wheel, Nightly Tale Picker",
    metaDescription:
      "Kids demanding the same book again? Spin Cinderella, Peter Pan, or your shelf titles and make bedtime stories feel brand new.",
    useCases: [
      {
        heading: "Rotating sibling picks",
        body: "Each child spins on alternate nights so both feel ownership over storytime.",
      },
      {
        heading: "Travel bedtime routine",
        body: "Hotels use the wheel on phones when packed books are not available.",
      },
      {
        heading: "Early reader practice",
        body: "First graders spin short tales and read aloud to parents instead of listening.",
      },
      {
        heading: "Grandparent video calls",
        body: "Grandma spins remotely while grandchildren listen through FaceTime.",
      },
    ],
    faqs: [
      {
        question: "Can I add our physical book titles?",
        answer:
          "Type exact names from the shelf so results match books you already own.",
      },
      {
        question: "What if the story runs too long?",
        answer:
          "Remove lengthy tales on weeknights and keep five-minute options active.",
      },
      {
        question: "Are defaults scary?",
        answer:
          "Classic gentle fairy tales ship by default, edit if your child prefers nonfiction.",
      },
      {
        question: "Can we spin twice for chapter books?",
        answer:
          "Use one slice per chapter series and spin to pick which installment tonight.",
      },
    ],
    relatedWheels: [
      { slug: "family-game-night-picker-wheel", anchor: "Pre-bed game picker" },
      { slug: "random-animal-picker-wheel", anchor: "Animal character stories" },
      { slug: "self-care-wheel", anchor: "Parent wind-down rituals" },
      { slug: "random-color-wheel", anchor: "Color-themed story night" },
      { slug: "what-to-draw-wheel", anchor: "Draw tomorrow's story scene" },
      { slug: "horror-movie-picker-wheel", anchor: "Teen scary movie wheel" },
    ],
  },

  "instagram-wheel-picker": {
    directAnswer:
      "The Instagram Wheel Picker selects giveaway winners from pasted comment @handles with the visual spin followers expect on Stories. Copy eligible entries, dedupe tags, spin on camera, and post the recording so your audience trusts the drawing. Micro-influencers, bakeries, and boutiques use it instead of screenshotting comment threads manually.",
    title: "Instagram Wheel Picker, Story Giveaway Draw",
    metaDescription:
      "Running an IG giveaway? Paste comment @handles, spin on camera, and post the recording so followers see a transparent winner pick.",
    useCases: [
      {
        heading: "Product launch promos",
        body: "Shops spin live when a new SKU drops and tag the winning commenter immediately.",
      },
      {
        heading: "Follower milestone gifts",
        body: "Creators celebrate ten-K followers by spinning among engaged commenters from the announcement post.",
      },
      {
        heading: "Collaboration giveaways",
        body: "Two brands paste combined entry lists and co-host the spin on dual Stories.",
      },
      {
        heading: "Local service raffles",
        body: "Salons spin among clients who tagged friends during a booking promo.",
      },
    ],
    faqs: [
      {
        question: "Does it pull Instagram comments automatically?",
        answer:
          "You paste eligible @handles manually after moderating entries.",
      },
      {
        question: "Why record the spin?",
        answer:
          "Video proof reduces accusations that giveaways were fixed offline.",
      },
      {
        question: "Can I match brand colors?",
        answer:
          "Customize slice colors before recording so the wheel fits your feed aesthetic.",
      },
      {
        question: "Does TikTok work the same way?",
        answer:
          "Yes, paste TikTok usernames and record the spin for parallel platforms.",
      },
    ],
    relatedWheels: [
      { slug: "winner-picker-wheel", anchor: "Multi-platform winner picker" },
      { slug: "random-name-picker-wheel", anchor: "Wheel of Names draw" },
      { slug: "coin-flip-wheel", anchor: "Coin-flip backup tiebreak" },
      { slug: "secret-santa-wheel-generator", anchor: "Holiday name assignments" },
      { slug: "random-number-wheel", anchor: "Numbered entry draw" },
    ],
  },

  "fortnite-drop-location-wheel": {
    directAnswer:
      "The Fortnite Drop Location Wheel picks map POIs, Tilted Towers, Retail Row, Loot Lake, for squads tired of landing the same hotspot. Update slice labels each season, spin in the lobby, and drop wherever the wheel mandates for challenge streams or casual nights. Streamers boost engagement by letting chat suggest locations before the spin.",
    title: "Fortnite Drop Wheel, Squad Landing Picker",
    metaDescription:
      "Squad stuck asking where we dropping? Spin current POIs, land on the result, and add randomness to every battle bus jump.",
    useCases: [
      {
        heading: "Streamer challenge runs",
        body: "Creators spin every match so viewers watch them fight unfamiliar zones.",
      },
      {
        heading: "Squad rank nights",
        body: "Friends agree the wheel overrides habitual sweaty drops for one evening.",
      },
      {
        heading: "Zero-build experiments",
        body: "Teams spin only remote POIs to practice survival without city loot.",
      },
      {
        heading: "Tournament warmups",
        body: "Esports trainees randomize drops to rehearse varied rotation paths.",
      },
    ],
    faqs: [
      {
        question: "Does it update automatically each season?",
        answer:
          "You edit slice names when Epic reshapes the island, no live API sync.",
      },
      {
        question: "Can I ban hot drops?",
        answer:
          "Remove Tilted or Mega City slices if you want slower starts.",
      },
      {
        question: "Will it run on a second monitor?",
        answer:
          "Lightweight page fits beside the game on laptops or phones.",
      },
      {
        question: "Does it work for Zero Build?",
        answer:
          "Same POI names apply, strategy changes but landing points do not.",
      },
    ],
    relatedWheels: [
      { slug: "roblox-game-picker-wheel", anchor: "Roblox game randomizer" },
      { slug: "pokemon-randomizer-wheel", anchor: "Pokemon challenge wheel" },
      { slug: "team-generator-wheel", anchor: "Squad team generator" },
      { slug: "winner-picker-wheel", anchor: "Stream giveaway picker" },
      { slug: "nfl-team-picker-wheel", anchor: "Sports team randomizer" },
      { slug: "yes-or-no-wheel", anchor: "Drop or glide yes-no" },
    ],
  },

  "roblox-game-picker-wheel": {
    directAnswer:
      "The Roblox Game Picker Wheel chooses experiences, Adopt Me, Blox Fruits, Tower of Hell, when millions of titles overwhelm players. Paste favorites, spin before opening the app, and commit to the result for YouTube challenge videos or friend-group nights. No account linking occurs; the wheel only outputs the next game name to search.",
    title: "Roblox Game Picker, Experience Roulette",
    metaDescription:
      "Bored of the same Roblox sim? Spin Adopt Me, Blox Fruits, or your favorites list and play whatever experience the wheel names.",
    useCases: [
      {
        heading: "YouTube challenge videos",
        body: "Creators film whatever game the wheel picks for the thumbnail hook.",
      },
      {
        heading: "Birthday party lobbies",
        body: "Guests spin together before joining a private server of the winning title.",
      },
      {
        heading: "Parent screen-time variety",
        body: "Families limit slices to approved games so randomness stays within house rules.",
      },
      {
        heading: "Developer playtesting breaks",
        body: "Studios spin competitor experiences for research nights.",
      },
    ],
    faqs: [
      {
        question: "Does it launch Roblox automatically?",
        answer:
          "No, you copy the title into Roblox search yourself after the spin.",
      },
      {
        question: "Can I mix horror and tycoon games?",
        answer:
          "Any genre fits on one wheel; organize by deleting slices you dislike.",
      },
      {
        question: "How often should I update the list?",
        answer:
          "Refresh when trending games change so spins feel current.",
      },
      {
        question: "Is login required?",
        answer:
          "The picker runs in your browser without Roblox credentials.",
      },
    ],
    relatedWheels: [
      { slug: "fortnite-drop-location-wheel", anchor: "Fortnite landing picker" },
      { slug: "pokemon-randomizer-wheel", anchor: "Pokemon character wheel" },
      { slug: "family-game-night-picker-wheel", anchor: "Offline family games" },
      { slug: "team-generator-wheel", anchor: "Roblox squad teams" },
      { slug: "winner-picker-wheel", anchor: "Roblox giveaway draw" },
      { slug: "random-hobby-generator-wheel", anchor: "Offline hobby ideas" },
    ],
  },

  "truth-or-dare-spinner-online": {
    directAnswer:
      "Truth or Dare Spinner Online assigns Truth, Dare, Double Dare, or Pass slices so party groups skip the empty bottle in the middle of the circle. Customize dares for your friend group, share the screen on Zoom, or let teens tap spins during sleepovers. Generic labels keep the tool family-safe until you add your own inside jokes.",
    title: "Truth or Dare Spinner, Party Bottle Replacement",
    metaDescription:
      "No bottle handy? Spin Truth, Dare, or Double Dare online for sleepovers, teen parties, or video-call hangouts with your custom prompts.",
    useCases: [
      {
        heading: "Teen sleepovers",
        body: "Guests add mild dares to slices before parents hand over the phone.",
      },
      {
        heading: "Bachelorette weekends",
        body: "Bridal parties load inside jokes as dares and spin between brunch and shows.",
      },
      {
        heading: "Remote friend groups",
        body: "Discord screenshare the wheel while everyone drinks the same dare outcome.",
      },
      {
        heading: "Icebreaker retreats",
        body: "Corporate trainers use tame Truth slices only for PG-rated team bonding.",
      },
    ],
    faqs: [
      {
        question: "Can I write custom dares on slices?",
        answer:
          "Edit every label with text specific to your group before spinning.",
      },
      {
        question: "Is the default wheel spicy?",
        answer:
          "Defaults are generic Truth/Dare text, you control intensity via edits.",
      },
      {
        question: "Does Pass mean skip?",
        answer:
          "Pass slices let players bow out once per round if house rules allow.",
      },
      {
        question: "Can younger kids play?",
        answer:
          "Use only Truth slices with silly questions for elementary parties.",
      },
    ],
    relatedWheels: [
      { slug: "twister-spinner-online", anchor: "Twister mat spinner" },
      { slug: "should-i-text-him-wheel", anchor: "Relationship truth wheel" },
      { slug: "family-game-night-picker-wheel", anchor: "Family game selector" },
      { slug: "date-night-wheel", anchor: "Couples date dare night" },
      { slug: "yes-or-no-wheel", anchor: "Accept dare yes-no" },
      { slug: "random-word-generator-wheel", anchor: "Word-based dare prompts" },
    ],
  },

  "random-travel-destination-wheel": {
    directAnswer:
      "The Random Travel Destination Wheel points wanderlusters toward cities like Paris, Tokyo, Bali, or Cape Town when bucket lists grow faster than budgets allow. Spin for actual trip planning, classroom geography prompts, or daydream research sessions. Filter slices to domestic road-trip stops or luxury escapes by editing the list before you spin.",
    title: "Random Travel Wheel, Vacation Roulette",
    metaDescription:
      "Every destination sounds amazing? Spin Paris, Tokyo, Bali, or your bucket list and start planning the trip the wheel selects.",
    useCases: [
      {
        heading: "Anniversary trip lottery",
        body: "Couples spin among saved Pinterest boards and book flights for the winner.",
      },
      {
        heading: "Travel vlog series",
        body: "Creators let the wheel pick the next country they film for subscribers.",
      },
      {
        heading: "Study-abroad research",
        body: "Students spin continents first, then cities within the chosen region.",
      },
      {
        heading: "Language immersion picks",
        body: "Language clubs spin a destination and spend the week cooking one dish from that city.",
      },
      {
        heading: "Remote-work location roulette",
        body: "Digital nomads spin among visa-friendly cities and compare coworking costs for the winner.",
      },
    ],
    faqs: [
      {
        question: "Can I limit to US states?",
        answer:
          "Replace international cities with state names or national parks.",
      },
      {
        question: "Does it book flights?",
        answer:
          "It only names a place, you handle logistics separately.",
      },
      {
        question: "Can I weight dream trips?",
        answer:
          "Duplicate must-visit cities on extra slices to increase their odds.",
      },
      {
        question: "Is visa info included?",
        answer:
          "No travel advisories, research entry rules after the spin.",
      },
      {
        question: "Can couples save different lists?",
        answer:
          "Each person can bookmark a share link with their own city list pasted into the wheel.",
      },
    ],
    supplementalSections: [
      {
        heading: "Planning after the spin",
        body: "Treat the wheel as a shortlist generator, not a booking engine. After Paris or Tokyo lands, compare flight costs, visa rules, and season weather before you commit. Duplicate dream cities on extra slices if you want higher odds without editing the whole list.",
      },
    ],
    relatedWheels: [
      { slug: "random-country-wheel", anchor: "Country geography wheel" },
      { slug: "random-hobby-generator-wheel", anchor: "Travel hobby ideas" },
      { slug: "date-night-wheel", anchor: "Local date adventure wheel" },
      { slug: "fast-food-wheel", anchor: "Airport food picker" },
      { slug: "self-care-wheel", anchor: "Travel self-care breaks" },
      { slug: "movie-picker-wheel", anchor: "Inflight movie picker" },
    ],
  },

  "random-hobby-generator-wheel": {
    directAnswer:
      "The Random Hobby Generator Wheel suggests pastimes, photography, gardening, coding, yoga, when weekends disappear into scrolling. Spin once, try the activity for a week, and track what sticks. Parents assign screen-free options to bored kids, retirees explore new skills, and accountability partners spin together to learn the same hobby in parallel.",
    title: "Random Hobby Generator, New Passion Picker",
    metaDescription:
      "Weekend disappearing into scrolling? Spin photography, baking, coding, or custom hobbies and commit to trying whatever lands this week.",
    useCases: [
      {
        heading: "Summer break boredom",
        body: "Parents load screen-free slices so kids pick crafts before reaching for tablets.",
      },
      {
        heading: "New Year resolutions",
        body: "Friend groups spin monthly and share progress photos in a group chat.",
      },
      {
        heading: "Retirement exploration",
        body: "Recent retirees spin gentle hobbies like gardening or watercolor until one clicks.",
      },
      {
        heading: "Corporate wellness weeks",
        body: "HR offers spin-to-try sessions for meditation, walking clubs, or journaling.",
      },
    ],
    faqs: [
      {
        question: "Are hobbies expensive to start?",
        answer:
          "Defaults mix free options like writing with gear-based ones like photography, edit to match your budget.",
      },
      {
        question: "Can I remove hobbies I already do?",
        answer:
          "Delete mastered skills so spins surface novel activities.",
      },
      {
        question: "Should I spin daily or weekly?",
        answer:
          "Weekly trials give enough time to judge fit before the next spin.",
      },
      {
        question: "Can teens customize slices?",
        answer:
          "Yes, add skateboarding, coding, or baking tailored to their interests.",
      },
    ],
    relatedWheels: [
      { slug: "self-care-wheel", anchor: "Wellness hobby wheel" },
      { slug: "what-to-draw-wheel", anchor: "Art hobby prompts" },
      { slug: "exercise-picker-wheel", anchor: "Active hobby movement wheel" },
      { slug: "random-travel-destination-wheel", anchor: "Travel as a hobby" },
      { slug: "random-color-wheel", anchor: "Color craft hobbies" },
      { slug: "pokemon-randomizer-wheel", anchor: "Gaming hobby challenges" },
    ],
  },

  "raffle-wheel": {
    directAnswer:
      "The Raffle Wheel runs prize draws and ticket raffles in one tool: paste entrant names, switch to ticket-number mode, or load labeled prize slices (Grand Prize, gift card, bonus entry) for game-show-style spins. Draw multiple winners without replacement, screen-record the animation, and copy a timestamped proof link followers can verify after the live stream ends.",
    title: "Raffle Wheel — Prize Draws, Tickets & Multi-Winner Picks",
    metaDescription:
      "Run prize-wheel style giveaways or ticket raffles: labeled prizes, ticket numbers, multi-winner draws, and a shareable proof link for streams and school events.",
    h1: "Raffle Wheel — Prize Draws & Multi-Winner Raffles",
    useCases: [
      {
        heading: "School carnival ticket stubs",
        body: "PTA volunteers paste Ticket #001 through #200, spin live on the gym projector, and remove each winning stub so the next round cannot repeat a holder.",
      },
      {
        heading: "Labeled prize-wheel promos",
        body: "Retail and stream giveaways load Grand Prize, gift card, free merch, and Try Again slices—the same prize-wheel job—then spin once per customer or subscriber while the audience watches the landing label.",
      },
      {
        heading: "Church raffle nights",
        body: "Youth groups sell numbered tickets for gift baskets; the wheel lands on one stub at a time while the audience watches the pointer stop.",
      },
      {
        heading: "Instagram live giveaways",
        body: "Creators paste @handles, set three winners, record the spin, and post the proof URL in Stories so commenters see the draw was fair.",
      },
      {
        heading: "Trade-show booth draws",
        body: "Exhibitors collect business cards, assign each a ticket number on-site, and spin hourly for branded swag without a physical drum.",
      },
      {
        heading: "Nonprofit silent auctions",
        body: "Volunteers load paid raffle entries as numbers, draw the grand prize live, and archive the proof link for board records.",
      },
    ],
    faqs: [
      {
        question: "Can I spin ticket numbers instead of names?",
        answer:
          "Yes. Toggle ticket-number mode, paste stubs like #047, or auto-generate a numbered range. The wheel treats each ticket as its own slice.",
      },
      {
        question: "Is this also a prize wheel?",
        answer:
          "Yes. Use labeled prize slices (Grand Prize, discounts, merch) for classic prize-wheel giveaways, or switch to ticket/name mode for numbered raffles. One page covers both intents after we merged the old prize-wheel URL here.",
      },
      {
        question: "How do multi-winner raffle draws work?",
        answer:
          "Set how many winners you need. Each spin removes the prior winner from the pool when drawing multiple prizes in one session.",
      },
      {
        question: "What is the raffle proof link for?",
        answer:
          "After the final winner, copy the proof URL with timestamp and results. Post it beside your live recording so entrants can verify the outcome.",
      },
      {
        question: "Do I need accounts or uploads?",
        answer:
          "No. Entries stay in your browser. Paste names, tickets, or prize labels, spin, and optionally record the screen—nothing is sent to our servers.",
      },
    ],
    relatedWheels: [
      { slug: "winner-picker-wheel", anchor: "Social giveaway winner picker" },
      { slug: "random-name-picker-wheel", anchor: "Name-only raffle picker" },
      { slug: "classroom-spinner", anchor: "Teacher classroom hub" },
      { slug: "coin-flip-wheel", anchor: "Coin-flip tiebreaker" },
      { slug: "team-generator-wheel", anchor: "Split entrants into teams" },
    ],
  },

  "prize-wheel": {
    directAnswer:
      "The Prize Wheel labels each slice with rewards, Grand Prize, gift cards, bonus entries, so carnivals, retail promos, and stream giveaways feel like a game show. Spin once for a single winner or run several rounds, customize colors, and screen-record the landing slice for your audience. Need hardware instead? The buyer guide below explains what to look for in tabletop prize wheels.",
    title: "Prize Wheel, Free Spinning Giveaway Tool",
    metaDescription:
      "Spin labeled prize slices for store promos, stream giveaways, or party games, plus an honest guide if you want a physical wheel instead.",
    h1: "Prize Wheel, Spin for Giveaways & Promos",
    useCases: [
      {
        heading: "Retail grand-opening promos",
        body: "Managers load Grand Prize, 10% Off, and Free T-Shirt slices, spin when a customer completes a purchase, and photograph the result for social posts.",
      },
      {
        heading: "Twitch subscriber rewards",
        body: "Streamers assign sub-giveaway tiers to slices, spin live on overlay, and read the highlighted label when the wheel stops.",
      },
      {
        heading: "Birthday party game stations",
        body: "Parents set Candy, Small Toy, and Try Again slices so kids take turns spinning between cake and presents.",
      },
      {
        heading: "Corporate wellness challenges",
        body: "HR teams swap slices weekly, water bottle, gift card, extra PTO hour, and spin at all-hands to reward participation milestones.",
      },
      {
        heading: "Farmers market vendors",
        body: "Booth owners spin for free samples or discount codes, turning foot traffic into a visible, shareable moment.",
      },
    ],
    supplementalSections: [
      {
        heading: "Need a physical prize wheel? What to look for",
        body: "Dry-erase tabletop wheels ($30–$120) let staff rewrite prizes with markers, ideal for rotating retail promos. Look for a stable base, smooth bearing spin, and segments you can relabel without peeling stickers. Floor-standing wheels ($150–$400) suit trade shows but need transport storage. Check weight balance so the pointer does not favor one wedge after repeated spins. If you only run occasional online giveaways, a free browser prize wheel avoids storage, shipping, and bias from worn hardware, spin live on a tablet and screen-record instead.",
      },
    ],
    faqs: [
      {
        question: "Can I rename every prize slice?",
        answer:
          "Yes. Delete the defaults and type Grand Prize, Gift Card, or any label. Colors adjust automatically as you add slices.",
      },
      {
        question: "Is this better than buying a tabletop wheel?",
        answer:
          "Digital wheels need zero storage, update instantly, and use cryptographic randomness. Physical wheels shine when you want a tactile prop customers can touch in-store.",
      },
      {
        question: "Can I run multiple prize rounds?",
        answer:
          "Spin again after each winner or remove winning slices so the remaining prizes stay in the pool for the next round.",
      },
      {
        question: "Does it work on a phone at my booth?",
        answer:
          "Yes. Open the page on any phone or tablet, tap to spin, and tilt the screen toward customers, no app install required.",
      },
      {
        question: "How is this different from the raffle wheel?",
        answer:
          "The prize wheel emphasizes labeled rewards on each slice. The raffle wheel focuses on ticket numbers and multi-winner proof links for numbered entries.",
      },
    ],
    relatedWheels: [
      { slug: "raffle-wheel", anchor: "Ticket-number raffle draws" },
      { slug: "winner-picker-wheel", anchor: "Commenter giveaway picker" },
      { slug: "instagram-wheel-picker", anchor: "Instagram prize spinner" },
      { slug: "family-game-night-picker-wheel", anchor: "Family game prizes" },
      { slug: "random-color-wheel", anchor: "Color prize challenges" },
    ],
  },

  "classroom-spinner": {
    directAnswer:
      "The Classroom Spinner is a teacher hub with three tabs: random student selection (spin wheel with remove-after-pick), balanced team creation from the same roster style, and a fullscreen countdown timer. Call on learners fairly, split groups for lab days, and run think-pair-share timers without juggling three separate apps, built for US K–12 classrooms and subs who need obvious controls on day one.",
    title: "Classroom Spinner, Teacher Wheel Hub",
    metaDescription:
      "Teacher hub with three tabs: student spinner, team maker, and countdown timer, plus fullscreen mode for smartboards.",
    h1: "Classroom Spinner, Teacher Wheel Hub",
    useCases: [
      {
        heading: "Cold-calling in middle school ELA",
        body: "Teachers paste period-two rosters on the Student picker tab, enable remove-after-pick, and spin so every reader shares analysis before anyone repeats.",
      },
      {
        heading: "PE squads on field day",
        body: "Coaches switch to the Teams tab, paste 28 names, choose four teams, and send balanced groups to stations in under a minute.",
      },
      {
        heading: "Think-pair-share timing",
        body: "Open the Timer tab, set three minutes, fullscreen the hub, and students see the countdown.",
      },
      {
        heading: "Substitute teacher plans",
        body: "Session history on the student picker shows who was already called, so guest teachers continue fair participation without a paper roster.",
      },
      {
        heading: "ESL small-group rotations",
        body: "Lead teachers spin for table leaders on the student tab, generate teams of four on the Teams tab, and run five-minute speaking drills with the timer.",
      },
    ],
    faqs: [
      {
        question: "Does this replace the random student picker?",
        answer:
          "It includes the same student-picker behavior plus team generation and a timer, one bookmark for daily classroom routines.",
      },
      {
        question: "How does fullscreen classroom mode work?",
        answer:
          "Tap fullscreen to expand the hub for smartboards. The Student picker and Teams tabs include a spin wheel; the Timer tab is a countdown only.",
      },
      {
        question: "Can I see who was already picked?",
        answer:
          "Yes. Session history on the Student picker tab logs each selected student during the period so you can balance participation before the bell.",
      },
      {
        question: "Is student data stored online?",
        answer:
          "No. Rosters and history stay in your browser session on that device, nothing is uploaded to our servers.",
      },
      {
        question: "Does the team maker balance sizes?",
        answer:
          "Teams shuffle randomly and distribute names round-robin so counts stay within one person even with odd class sizes.",
      },
    ],
    relatedWheels: [
      { slug: "random-student-picker", anchor: "Standalone student picker" },
      { slug: "team-generator-wheel", anchor: "Dedicated team generator" },
      { slug: "random-name-picker-wheel", anchor: "Wheel of names style picker" },
      { slug: "abcd-spin-wheel", anchor: "Multiple-choice quiz wheel" },
      { slug: "alphabet-spinner-wheel", anchor: "Letter-of-the-day spinner" },
      { slug: "winner-picker-wheel", anchor: "Classroom reward draw" },
    ],
  },
};

export function getWheelUniqueContent(slug: string): WheelUniqueContent | null {
  return WHEEL_UNIQUE_CONTENT[slug] ?? null;
}
