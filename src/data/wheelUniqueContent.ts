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
  /** Optional step-by-step instructions; replaces the one-line "How to use" text from the CSV. */
  howToSteps?: string[];
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
        body: "Turn the dilemma into a question with a yes or no answer, such as \"Do I take the earlier train?\", and set Maybe to 0 so there is no fence-sitting slice. One spin ends the loop so you can get on with your morning. The wheel does not know better than you; it simply stops the second-guessing.",
      },
      {
        heading: "Roommate chore standoffs",
        body: "Ask \"Is it my turn to take out the trash tonight?\" and agree on the rule before anyone spins: Yes means the person who asked does it, No means the other person does. Settling the rule first matters, because a result nobody agreed to honour is just another argument.",
      },
      {
        heading: "Group lunch votes",
        body: "Offer one restaurant at a time as a yes or no question. A Yes ends the debate; a No moves the group on to the next option. To let the first suggestion win a little more often, set Yes 3, No 2 and Maybe 0, which gives Yes a 60% chance.",
      },
      {
        heading: "Creative permission slips",
        body: "Writers and artists spin before deleting a paragraph or posting a draft, turning perfectionism into a quick ritual instead of a stall. If the answer makes you wince, that reaction is useful information too.",
      },
      {
        heading: "Teaching basic probability",
        body: "Ask a class to predict how often Yes will come up in ten spins, then compare the result with the percentages shown under \"On the wheel now\". Short runs rarely match those percentages exactly, which makes a good starting point for talking about why small samples look uneven.",
      },
    ],
    howToSteps: [
      "Decide on a question you can answer with yes or no, and agree what each answer will mean before you spin. The wheel does not store questions, so nothing you think or write about the dilemma is saved.",
      "Set the odds. The defaults are Yes 2, No 2 and Maybe 1, which puts five slices on the wheel: 40% Yes, 40% No and 20% Maybe. Each weight can be any whole number from 0 to 10, and a weight of 0 removes that answer, so Maybe 0 gives a strict Yes or No wheel.",
      "Check the \"On the wheel now\" list under the weights. It shows how many slices each answer has and its percentage chance before you spin.",
      "Press SPIN THE WHEEL. The spin timer is 7 seconds by default and can be set anywhere from 3 seconds to 1 minute. The slice under the pointer when the wheel stops is your answer.",
      "For a tie-breaker, switch on Best of 3. The page keeps your last three results and reports the majority, or \"tie\" if all three answers are different. Use Reset run when you start a new question.",
    ],
    supplementalSections: [
      {
        heading: "How the weights change your odds",
        body: "Every answer gets as many equal slices as its weight, and your chance of landing on an answer is its slices divided by the total number of slices. Yes 2, No 2 and Maybe 1 makes five slices, so 40%, 40% and 20%. Yes 3, No 1 and Maybe 0 makes four slices, so Yes has a 75% chance and No 25%. Yes 1, No 1 and Maybe 0 makes two equal slices, a plain 50/50 choice. The percentages shown on the page are rounded to whole numbers, and the wheel never has fewer than two slices.",
      },
      {
        heading: "Worked example: Best of 3 with the default weights",
        body: "With the default weights each spin gives Yes 40%, No 40% and Maybe 20%. Over three spins, Yes wins the majority 35.2% of the time, No wins it 35.2% of the time, and Maybe wins it 10.4% of the time. In the remaining 19.2% of runs you get one Yes, one No and one Maybe, which the page reports as a tie. If you want Best of 3 to give a clear winner every time, set Maybe to 0: with only two possible answers, three spins always produce a majority.",
      },
      {
        heading: "How each spin is decided",
        body: "When you press the button, the wheel chooses a random total rotation using your browser's cryptographic random number generator (crypto.getRandomValues, with Math.random only as a fallback in browsers that lack it). The animation then plays that rotation out, and the slice at the pointer is the result, so the animation is the selection rather than a decoration. The spin timer only changes how long the spin takes, and earlier results never influence the next one. Our How Randomness Works page and the spin wheel fairness study explain the method in more depth.",
      },
      {
        heading: "When a Yes or No wheel is the wrong tool",
        body: "Use it for low-stakes choices where either answer would be fine. Medical, legal, financial and safety decisions deserve real advice. A simple test: if you would be upset by one of the answers, do not spin, because you already know which result you are hoping for.",
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
          "Each weight, from 0 to 10, is how many equal slices that answer gets. Yes 3 and No 1 means Yes has three times the chance of No. The On the wheel now list shows slice counts and percentages before you spin.",
      },
      {
        question: "Is the wheel biased towards Yes?",
        answer:
          "No. With the default weights Yes and No each take 40% of the wheel and Maybe takes 20%. Any bias is one you set yourself with the weights.",
      },
      {
        question: "What is Best of 3?",
        answer:
          "Turn on Best of 3 to keep your last three results and show the majority. Switching it on or off clears the run, and the Reset run button clears it too.",
      },
      {
        question: "Why did Best of 3 say tie?",
        answer:
          "A tie appears only when the three results are all different: one Yes, one No and one Maybe. With the default weights that happens in about 19% of runs. Set Maybe to 0 and a tie becomes impossible.",
      },
      {
        question: "Should I type my question on the wheel?",
        answer:
          "You do not have to, the wheel does not store questions. Many people silently hold the dilemma in mind, spin, and treat the landing slice as the nudge they needed.",
      },
      {
        question: "Is every spin independent?",
        answer:
          "Yes. Each spin uses fresh randomness from your browser's random number generator. Prior results do not change the odds of the next landing, so a streak of No answers does not mean Yes is due.",
      },
      {
        question: "Can couples use this for date-night choices?",
        answer:
          "Yes. Phrase the choice as a question such as \"Do we order Thai tonight?\" and spin once, or rename the entries in the list under the wheel. Your edits to that list stay until you change a weight, which rebuilds the wheel. Agree to honour the outcome before you spin.",
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
        body: "Open the entries list (it is expanded by default on this page), replace the preset names with six dinners the whole family accepts, and spin each evening. Your edits stay until you switch to a different filter chip, so keep the list you like before you explore the others.",
      },
      {
        heading: "Roommate cooking rotation",
        body: "Type each roommate's signature dish as a slice; whoever's meal lands cooks while the others set the table. Agree before the first spin whether a dish can repeat two nights in a row.",
      },
      {
        heading: "Meal-prep variety",
        body: "Pick the Cook at home chip for six ready-made ideas such as Sheet-pan veggies and protein or One-pot pasta. Spin four times on Sunday and write down the four results so prep covers four distinct dinners.",
      },
      {
        heading: "Dietary reset weeks",
        body: "Replace the preset names with only the meals that fit your plan, such as Mediterranean, vegetarian or low-sodium options, so the randomness stays inside your nutrition goals.",
      },
      {
        heading: "Using up what is in the fridge",
        body: "The Leftovers chip loads six ideas, from Fried rice with leftovers to Clean-out-fridge omelet. Spin when you would otherwise order delivery, and cook whichever slice comes up.",
      },
    ],
    howToSteps: [
      "Choose a filter chip: Cuisine (the default), Leftovers, Delivery, Cook at home, or Fast-casual / chains. Each chip loads its own list of meal ideas onto the wheel.",
      "Read \"On the wheel now\" under the chips to see the exact list and how many options it holds.",
      "Optional: edit the names in the entries list under the wheel, for example to the six dinners your household actually eats. Your edits stay until you switch to another chip, which loads that chip's list again.",
      "Press SPIN THE WHEEL. The spin timer is 7 seconds by default and can be set from 3 seconds to 1 minute. The slice under the pointer when the wheel stops is tonight's dinner.",
      "Agree on a rule before you spin, such as one re-spin allowed or none. Then cook, order or heat up whatever the wheel picked.",
    ],
    supplementalSections: [
      {
        heading: "What is on each wheel",
        body: "Cuisine has 8 options: Italian pasta, Mexican tacos, Thai curry, Japanese bowls, Indian dal and rice, Mediterranean mezze, Chinese stir-fry and American comfort food. Leftovers, Delivery, Cook at home and Fast-casual / chains each have 6. That means each Cuisine option has a 1 in 8 chance (12.5%) and every option on the other four wheels has a 1 in 6 chance (about 16.7%) on every spin.",
      },
      {
        heading: "How to make the odds your own",
        body: "Every slice is the same size, so the way to favour a meal is to list it more than once. Typing the same dinner on two of six slices gives it a 2 in 6 chance, about 33%. To cut a meal out, press Remove beside its name in the entries list, or press Deactivate to keep it in the list without putting it on the wheel. Keep the list short: with more than about a dozen slices the labels get hard to read on a phone.",
      },
      {
        heading: "How each spin is decided",
        body: "When you press the button, the wheel chooses a random total rotation using your browser's cryptographic random number generator (crypto.getRandomValues, with Math.random only as a fallback in browsers that lack it). The animation plays that rotation out, and the slice at the pointer is the result. The spin timer only changes how long the spin takes, and earlier results never influence the next one. Our How Randomness Works page explains the method in more depth.",
      },
      {
        heading: "What this wheel does not do",
        body: "It does not know allergies, dietary needs, what is in your fridge or what anyone dislikes. The preset ideas are generic, so remove anything that is unsafe or unsuitable for your household before you spin.",
      },
    ],
    faqs: [
      {
        question: "What do the dinner filter chips change?",
        answer:
          "Cuisine, Leftovers, Delivery, Cook at home, and Fast-casual / chains each load a different meal list onto the wheel: 8 options for Cuisine and 6 for each of the others. Cuisine is selected when the page opens.",
      },
      {
        question: "Where did the fast-food wheel go?",
        answer:
          "It redirects here. Use the Fast-casual / chains chip for burger, pizza, chicken sandwich, taco, sandwich shop and coffee-plus-bakery picks.",
      },
      {
        question: "What if someone hates the result?",
        answer:
          "Agree on a one-respin rule before spinning, or remove disliked options so the wheel only shows meals everyone accepts. Edits to the entries list stay until you switch chips.",
      },
      {
        question: "Are all options equally likely?",
        answer:
          "Yes. Every slice is the same size, so each option has the same chance. With the Cuisine chip that is 1 in 8, and with the other chips 1 in 6. To favour a meal, list it on more than one slice.",
      },
      {
        question: "How many dinner options fit?",
        answer:
          "The page has no fixed limit, but the entries list shows 10 names per page, and the wheel gets hard to read with more than about a dozen slices. A weekly list of 6 to 8 meals works well.",
      },
      {
        question: "Does it work for lunch planning too?",
        answer:
          "Yes. Edit the entries to sandwiches, leftovers or cafeteria choices and use the same wheel at noon.",
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
        body: "Choose Cozy, which leaves 9 gentle options such as Family adventure, Gentle animation and Feel-good comedy. Or press Paste my watchlist, let everyone add a title, and let the wheel decide which one opens first.",
      },
      {
        heading: "Genre roulette dates",
        body: "Couples who never agree on horror versus comedy can start from Any mood, which puts all 20 genre and format ideas on the wheel, including horror ones. Agree before spinning that the result stands, then dress the couch accordingly.",
      },
      {
        heading: "Film club rotations",
        body: "Paste the member-nominated titles, one per line, and spin so nobody hosts twice in a row unless the wheel says so. Remove each title once it has been watched.",
      },
      {
        heading: "Short on time",
        body: "Pick Short to keep only options that fit a quick evening: Animated pick, Stand-up special, Under 100 minutes, Two short episodes instead and similar. Combined with Cozy, that leaves 4 options.",
      },
      {
        heading: "Content creator challenges",
        body: "Reviewers spin a random genre each week, forcing fresh takes outside their comfort-watch list. Note the genre first, then pick a title that fits it.",
      },
    ],
    howToSteps: [
      "Choose a mood: Any mood, Cozy, or Horror / thriller. Any mood shows every option on the list, including the horror ones.",
      "Choose a length: Any length or Short. The wheel rebuilds immediately, and \"On the wheel now\" shows the exact options and how many there are.",
      "Or switch to your own list: press Paste my watchlist and type or paste at least two titles, one per line. Those titles become the slices. If you have fewer than two, the wheel shows two reminder slices instead.",
      "Press SPIN THE WHEEL. The spin timer is 7 seconds by default and can be set from 3 seconds to 1 minute. The slice under the pointer when the wheel stops is tonight's pick.",
      "The wheel only chooses; it does not stream anything. Open your streaming app or library and play the title or a film that fits the genre.",
    ],
    supplementalSections: [
      {
        heading: "How many options each filter leaves",
        body: "The wheel is built from a list of 20 genre and format ideas, each tagged with a mood and a length. Counts for mood and length: Any mood and Any length 20, Any mood and Short 7, Cozy and Any length 9, Cozy and Short 4, Horror / thriller and Any length 7, Horror / thriller and Short 2. Any mood means no mood filter, so horror ideas appear in that pool. Pick Cozy if you want to be sure no horror comes up.",
      },
      {
        heading: "How to weight a favourite",
        body: "Every slice is the same size, so the way to favour a title or genre is to list it more than once in your watchlist. Typing the same title on two of eight slices gives it a 2 in 8 chance, 25%, instead of 1 in 8, 12.5%. Removing a title takes it out of the draw entirely.",
      },
      {
        heading: "How each spin is decided",
        body: "When you press the button, the wheel chooses a random total rotation using your browser's cryptographic random number generator (crypto.getRandomValues, with Math.random only as a fallback in browsers that lack it). The animation plays that rotation out, and the slice at the pointer is the result. The spin timer only changes how long the spin takes, and earlier results never influence the next one. Our How Randomness Works page explains the method in more depth.",
      },
      {
        heading: "What this wheel does not do",
        body: "It does not know your streaming catalogue, ratings or age guidance. The preset slices are broad genre and format ideas, not specific films, so check suitability for children yourself before you press play.",
      },
    ],
    faqs: [
      {
        question: "How do mood and length filters work?",
        answer:
          "Mood (Any, Cozy, Horror / thriller) and length (Any, Short) rebuild the wheel from a list of 20 tagged genre and format ideas. Any mood and Any length shows all 20, and the page shows how many options are on the wheel.",
      },
      {
        question: "Does Any mood include horror?",
        answer:
          "Yes. Any mood is the same as no mood filter, so horror ideas can appear. Choose Cozy to keep them off the wheel.",
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
          "Remove watched titles from your watchlist after each spin, or keep a list of unwatched options only.",
      },
      {
        question: "Is re-spinning fair for picky groups?",
        answer:
          "Set a house rule: one spin counts unless everyone agrees to respin. That keeps the tool decisive instead of endless.",
      },
      {
        question: "Can I weight favorites?",
        answer:
          "Yes. Write a title or genre on more than one slice to increase its odds without excluding the other choices.",
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
      { heading: "Post-first-date anxiety", body: "Pick Casual. Its six outcomes mix light contact (send a short hello, react to their story first, ask one low-stakes question) with holding back (wait until tomorrow, draft it but do not send, leave it for now). Half the wheel says go and half says wait, so the spin works as a nudge to stop circling rather than as a verdict." },
      { heading: "Mixed signals nights", body: "Mixed signals loads: send a clarifying question, wait for them to reply first, call instead of texting, delete the draft, text a friend for a sanity check, and sleep on it. Only two of the six involve contacting them (a clarifying question or a call); the rest slow things down or bring in a second opinion." },
      { heading: "High emotion spirals", body: "None of the six High emotion outcomes tells you to send a message: do not text tonight, delete the draft, journal first then decide, wait 24 hours, mute the thread temporarily, or talk in person later. That is deliberate. Strong feelings are the worst moment to hit send, and the one-minute cooldown makes rapid re-spinning harder." },
      { heading: "Friend interventions", body: "Pass the phone, pick the context together, and agree to honour one spin plus the cooldown. Agreeing the rule before the spin matters more than the result itself." },
      { heading: "Drafting before you spin", body: "Write the message in your notes app first, then spin. If the wheel says wait or delete the draft, you still have the wording ready for tomorrow and you have not sent anything you might regret." },
    ],
    howToSteps: [
      "Choose the context that matches how you feel: Casual, Mixed signals or High emotion. Each one loads its own six outcomes onto the wheel, listed under \"On the wheel now\".",
      "Read the six outcomes before you spin and decide that you will take the result seriously for a few minutes. If you already know you will ignore any answer you do not like, it is better not to spin.",
      "Press SPIN THE WHEEL. The spin timer is 7 seconds by default and can be set from 3 seconds to 1 minute. The slice under the pointer when the wheel stops is your outcome.",
      "Wait out the cooldown. After a spin the wheel dims and a counter reads \"Cooldown: Ns before the next spin\", counting down from 60 seconds. It is a speed bump against re-rolling until you get the answer you wanted, not a hard lock: reloading the page resets it.",
      "Do the one thing the result says, or nothing at all. If you want different wording, edit the entries list under the wheel; your edits stay until you pick a different context.",
    ],
    supplementalSections: [
      {
        heading: "What is on each wheel",
        body: "Casual: send a short hello, wait until tomorrow, react to their story first, draft it but do not send yet, ask one low-stakes question, leave it for now. Mixed signals: send a clarifying question, wait for them to reply first, call instead of texting, delete the draft, text a friend for a sanity check, sleep on it. High emotion: do not text tonight, delete the draft, journal first then decide, wait 24 hours, mute the thread temporarily, talk in person later. Each wheel has six equal slices, so every outcome has a 1 in 6 chance, about 16.7%. Delete the draft appears in both Mixed signals and High emotion.",
      },
      {
        heading: "How each spin is decided",
        body: "When you press the button, the wheel chooses a random total rotation using your browser's cryptographic random number generator (crypto.getRandomValues, with Math.random only as a fallback in browsers that lack it). The animation plays that rotation out, and the slice at the pointer is the result. The spin timer only changes how long the spin takes, and earlier results never influence the next one. Our How Randomness Works page explains the method in more depth.",
      },
      {
        heading: "What this wheel is for, and what it is not",
        body: "It interrupts rumination: it gives you a small, low-stakes reason to stop re-reading a thread and do something else. It is not relationship advice and it cannot tell you how the other person feels. If the situation involves pressure, threats, stalking or you feel unsafe, do not use a wheel; talk to someone you trust or a local support service.",
      },
    ],
    faqs: [
      { question: "What do the context chips change?", answer: "Each chip loads a different curated set of six outcomes (Casual, Mixed signals, or High emotion) onto the wheel before you spin. The outcomes for each chip are listed under \"On the wheel now\"." },
      { question: "What is the cooldown?", answer: "After a spin, the wheel dims and a 60-second countdown runs before you can spin again, so impulsive re-rolls are harder when feelings are loud. It is a speed bump rather than a hard lock, and reloading the page resets it." },
      { question: "Does the wheel ever tell me to send a message?", answer: "Sometimes, depending on the context. Casual includes three outcomes that involve messaging them, Mixed signals includes two (a clarifying question or a call), and High emotion includes none that involve sending a message; its only contact outcome is talking in person later." },
      { question: "Is every outcome equally likely?", answer: "Yes. Each context has six equal slices, so every outcome has a 1 in 6 chance on each spin, and earlier spins never change the odds." },
      { question: "Is this relationship advice?", answer: "No. It is a playful randomizer that interrupts rumination. Trust your boundaries and context." },
      { question: "Can I use it for someone other than him?", answer: "Yes. The outcomes are not gendered, so the wheel works for any person you are deciding whether to text." },
      { question: "Can I rename slices?", answer: "Yes. Edit labels in the entries list after a context loads if you want different wording. Your edits stay until you choose another context." },
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
      { heading: "Rainy commute mornings", body: "Pick Work and Rain. Eight looks stay on the wheel, including Waterproof shell + jeans and Trench + boots, along with the work outfits that are tagged for any weather. Spin once and the question of what to wear is settled before the umbrella hunt starts." },
      { heading: "Hot weekend plans", body: "Casual and Heat leaves 12 looks, from Tee + jeans and Linen shirt + shorts to Tank + wide pants. The pool drops anything tagged only for rain, so you are not offered a trench coat on a hot day." },
      { heading: "Date night packing", body: "Date with Any weather shows 13 looks, from Nice jeans + statement top to Simple dress + jacket. If you already know the forecast, narrow it: Date and Rain keeps 9 looks, Date and Heat keeps 11." },
      { heading: "Capsule closet days", body: "Replace the preset names with your own clothes in the entries list under the wheel. Your edits stay until you change a filter, so a small wardrobe can still produce a different combination each morning." },
      { heading: "Mornings you are short on time", body: "Set a rule before you spin: you wear what the wheel picks unless it is clearly unsuitable for the day, and you may re-spin once. The point is to remove ten minutes of deliberating, not to find the perfect outfit." },
    ],
    howToSteps: [
      "Choose an occasion: Work, Casual or Date. Casual is selected when the page opens.",
      "Choose the weather: Any weather (the default), Rain or Heat. The wheel rebuilds immediately, and the page shows how many looks match, for example 14 for Casual with Any weather.",
      "Read the list under the filters. The labels are generic ideas such as Blazer + trousers or Hoodie + joggers, so match each one to something you own.",
      "Optional: edit the names in the entries list to your real clothes. Your edits stay until you change a filter, which rebuilds the wheel from the dataset again.",
      "Press SPIN THE WHEEL. The spin timer is 7 seconds by default and can be set from 3 seconds to 1 minute. The slice under the pointer when the wheel stops is today's look.",
    ],
    supplementalSections: [
      {
        heading: "How the filters work",
        body: "The wheel is built from a list of 22 outfit ideas, each tagged with the occasions and weather it suits. Rain and Heat keep the looks tagged for that weather and also the looks tagged for any weather, so Rain means \"works when it rains\", not \"only rain gear\". Any weather applies no weather filter at all, so every look tagged for the occasion appears, including rain-only and heat-only ones. Looks per combination, Any weather / Rain / Heat: Work 8 / 8 / 6, Casual 14 / 8 / 12, Date 13 / 9 / 11. One look can belong to several occasions, which is why the three Any weather counts (8, 14 and 13) add up to more than 22.",
      },
      {
        heading: "How each spin is decided",
        body: "When you press the button, the wheel chooses a random total rotation using your browser's cryptographic random number generator (crypto.getRandomValues, with Math.random only as a fallback in browsers that lack it). The animation plays that rotation out, and the slice at the pointer is the result. Every look on the wheel has the same size slice, so the same chance, and earlier spins never influence the next one. Our How Randomness Works page explains the method in more depth.",
      },
      {
        heading: "What this wheel cannot do",
        body: "It does not know your wardrobe, the temperature in degrees, your office dress code or what suits you. Treat the result as a prompt to stop deliberating and swap anything that does not fit the day. The list is a fixed set of everyday ideas, not a personal style recommendation.",
      },
    ],
    faqs: [
      { question: "How do occasion and weather work together?", answer: "Both choices filter one list of 22 outfit ideas. Only looks tagged for that occasion, and for that weather or for any weather, stay on the wheel. The page shows how many looks match." },
      { question: "Does Rain show only rain outfits?", answer: "No. Rain keeps rain-tagged looks and also looks tagged for any weather, so Work with Rain has 8 looks. Pick Any weather to see everything tagged for the occasion." },
      { question: "How many outfits are there?", answer: "The list has 22 outfit ideas in total. Each filter combination leaves between 6 and 14 of them on the wheel, depending on the occasion and weather you choose." },
      { question: "Does the wheel know my wardrobe?", answer: "No inventory tracking. You interpret each label with whatever hangs in your closet, or replace the names with your own clothes." },
      { question: "What occasions are available?", answer: "Work, Casual, and Date. Pair any of them with Any weather, Rain, or Heat." },
      { question: "Can I edit the resulting list?", answer: "Yes. After a filter loads its looks, edit the names in the entries list under the wheel if you want personal outfits. Changing a filter rebuilds the list and replaces your edits." },
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
        body: "Early daters can pick Budget to keep expensive dinners off the wheel. That leaves 14 low-cost ideas such as Coffee date, Walk and dessert, Library date and Free park picnic, so the first few dates stay low-pressure.",
      },
      {
        heading: "Anniversary surprises",
        body: "One partner can switch to Treat night, which leaves 5 bigger ideas: Nice dinner reservation, Spa-style night in, Concert or show, Dessert tasting flight and Cooking class kit. Spin together, then book the one that lands.",
      },
      {
        heading: "Budget-conscious months",
        body: "Choose Budget and keep Where on Anywhere to spin only the 14 low-cost plans. Combine it with At home for 8 ideas or Go out for 7.",
      },
      {
        heading: "Rainy weekend backups",
        body: "Switch Where to At home and Budget to Any budget for 10 indoor ideas such as Board game night, Puzzle night, Living-room picnic and Cooking class kit, without checking a weather app.",
      },
      {
        heading: "Planning in turns",
        body: "Take turns being the person who picks the filters, and let the other person press SPIN THE WHEEL. Neither partner carries all of the planning, and the result belongs to both of you.",
      },
    ],
    howToSteps: [
      "Choose where: Anywhere (the default), At home, or Go out.",
      "Choose a budget: Any budget (the default), Budget, or Treat night. The wheel rebuilds immediately, and the page shows how many plans match, for example 14 for Anywhere with Budget.",
      "Read the list under the filters and delete or edit any plan that does not suit you in the entries list under the wheel. Your edits stay until you change a filter.",
      "Press SPIN THE WHEEL. The spin timer is 7 seconds by default and can be set from 3 seconds to 1 minute. The slice under the pointer when the wheel stops is your plan.",
      "Agree before you spin whether the result is final, then do it. The wheel only picks an idea; you still book any tickets or tables yourself.",
    ],
    supplementalSections: [
      {
        heading: "How many plans each filter leaves",
        body: "The wheel is built from 23 date ideas, each tagged with where it happens and its budget. Plans per combination, Any budget / Budget / Treat night: Anywhere 23 / 14 / 5, At home 10 / 8 / 2, Go out 14 / 7 / 3. Some plans fit more than one place, such as Free park picnic, which is tagged for both at home and going out.",
      },
      {
        heading: "How each spin is decided",
        body: "When you press the button, the wheel chooses a random total rotation using your browser's cryptographic random number generator (crypto.getRandomValues, with Math.random only as a fallback in browsers that lack it). The animation plays that rotation out, and the slice at the pointer is the result. Every plan has an equal chance, so with the full list of 23 each plan has about a 4.3% chance, and with At home and Treat night each of the 2 plans has 50%. Earlier spins never influence the next one. Our How Randomness Works page explains the method in more depth.",
      },
      {
        heading: "What this wheel does not do",
        body: "It does not know your location, opening hours, budget amounts or accessibility needs. The budget tags are rough categories, not prices, so check costs before you commit. Skip any idea that does not suit one of you.",
      },
    ],
    faqs: [
      {
        question: "How do the Where and Budget filters work?",
        answer:
          "They independently filter a list of 23 tagged date ideas. At home plus Budget shows 8 low-cost indoor plans; Go out plus Treat night shows 3 bigger outings. Both default to Anywhere / Any budget so all 23 plans are on the wheel when the page opens.",
      },
      {
        question: "Can we mix at-home and going-out ideas?",
        answer:
          "Yes. Leave Where on Anywhere to keep both. Budget is a separate filter, so a cheap night out is only mixed with a treat-night reservation if you choose Any budget.",
      },
      {
        question: "What if one partner hates the result?",
        answer:
          "Set a one-time veto before spinning or remove disliked options from the list. Edits to the list stay until you change a filter.",
      },
      {
        question: "Does it book reservations?",
        answer:
          "It only picks the activity, you still call the restaurant or buy tickets after the spin.",
      },
      {
        question: "Is every plan equally likely?",
        answer:
          "Yes. Every slice is the same size, so each plan on the wheel has the same chance, and earlier spins never change the odds.",
      },
      {
        question: "Can long-distance couples use it?",
        answer:
          "Spin the same wheel on a video call and do parallel activities like simultaneous cooking or synced movie streams. Pick the Anywhere and Budget filters, then edit the list so every plan can be done from two different cities.",
      },
    ],
    relatedWheels: [
      { slug: "dinner-picker-wheel", anchor: "Dinner before date night" },
      { slug: "movie-picker-wheel", anchor: "Movie after your date" },
      { slug: "self-care-wheel", anchor: "Couples self-care wheel" },
      { slug: "random-travel-destination-wheel", anchor: "Dream trip destination wheel" },
      { slug: "yes-or-no-wheel", anchor: "Go-out-or-stay-in wheel" },
      { slug: "outfit-picker-wheel", anchor: "What to wear on date night" },
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
    howToSteps: [
      "Optional: type a question of up to 120 characters, such as \"Who goes first?\". It appears above the coin and is saved with the result.",
      "Optional: choose a Face preset (Classic gold with Heads and Tails, Blue / Gold, Check / Cross with Yes and No, or the thumbs-up and thumbs-down set) or type your own text for Side A and Side B. You can also add your own image to either side; images stay on your device.",
      "Optional: move the Weighted odds slider to change Side A's chance anywhere from 1% to 99%. The label next to it always shows the exact odds, for example 70% Heads / 30% Tails.",
      "Flip: tap the coin, press FLIP THE COIN, or press Space when no text box is selected. The result appears under the coin, and the tally and streak counters update.",
      "For a match toss, switch on Match toss mode, choose which side calls and which side they call, then flip. The caller wins the toss if the coin lands on the side they called; otherwise the other side wins.",
      "For many flips at once, set Multi-flip count between 1 and 50 and press the Flip N times button, where N is your count. The page lists the sequence and the totals for each side. Reset stats clears the counters.",
    ],
    supplementalSections: [
      {
        heading: "What a fair coin looks like over a few flips",
        body: "On a fair 50/50 setting, 10 flips give exactly 5 of each side only 24.6% of the time, and 4 to 6 of one side 65.6% of the time, so uneven short runs are normal. Streaks are common too: in 20 flips there is a 45.8% chance of at least one run of 5 or more identical results, and in 50 flips there is a 54.4% chance of a run of 6 or more. A streak on its own is not evidence that the coin is biased.",
      },
      {
        heading: "What weighted odds do",
        body: "The slider sets the chance of Side A on every flip, and Side B gets the rest. At 70/30, Side A wins on average 7 flips in 10, but a short run can still look off: Side A wins 7 or more of 10 flips only about 65% of the time, and 5 or fewer about 15% of the time. Weighted flips are useful for demonstrations and games with handicaps, not for fair decisions between people.",
      },
      {
        heading: "Edge landings",
        body: "About 1 flip in 6,000 (roughly 0.017%) lands on its edge, and the coin stands upright with a Flip again button. In 50 flips the chance of seeing at least one edge is about 0.8%. Edge results do not count toward either side's tally, are not affected by the weighted odds, and are skipped in a multi-flip batch.",
      },
      {
        heading: "How each flip is decided",
        body: "Before the animation starts, the page draws the result with your browser's cryptographic random number generator (crypto.getRandomValues, with Math.random only as a fallback in browsers that lack it): first whether the coin lands on its edge, then which side. The spinning and the sound are visual only and cannot change a result that has already been drawn. Our How Randomness Works page and the spin wheel fairness study explain the method in more depth.",
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
      { heading: "Lunar New Year classroom units", body: "Students type their birth year, press Show animal, and see their animal pinned first on the wheel. Each student can then present customs or traits linked to that animal. Remind classmates born in January or February that the animal changes at the Lunar New Year, so they should check the date for their birth year." },
      { heading: "Restaurant promotion nights", body: "Owners look up the year of the table host and feature a zodiac-themed dish special. Spinning the twelve-animal wheel with the whole table gives everyone a quick, shared moment before ordering." },
      { heading: "Family reunion games", body: "Relatives enter birth years and the page shows lines such as \"Year 1958 → Dog\". Spin the wheel afterwards to pick whose animal everyone talks about next." },
      { heading: "Museum scavenger hunts", body: "Visitors work out their animal, then find one artifact related to that creature in the gallery. The wheel gives groups a random animal to hunt for when nobody wants to go first." },
      { heading: "Checking one year quickly", body: "You do not need to spin to use the lookup. Type any year from 1900 to 2100 and press Show animal: 1994 gives Dog, 2000 gives Dragon and 2026 gives Horse." },
    ],
    howToSteps: [
      "Type a four-digit year between 1900 and 2100 into the Birth year box.",
      "Press Show animal. The line under the box reads, for example, \"Year 1994 → Dog\", and that animal moves to the first slice of the wheel.",
      "If you only want a random animal, skip the lookup and spin the twelve-animal wheel as it is.",
      "Press SPIN THE WHEEL. The spin timer is 7 seconds by default and can be set from 3 seconds to 1 minute. The animal under the pointer when the wheel stops is the result.",
      "For anyone born in January or February, check the Lunar New Year date for that year. The animal changes at the Lunar New Year, not on 1 January, and this page counts calendar years only.",
    ],
    supplementalSections: [
      {
        heading: "How the year lookup works",
        body: "The twelve animals repeat in a fixed cycle: Rat, Ox, Tiger, Rabbit, Dragon, Snake, Horse, Goat, Monkey, Rooster, Dog and Pig. The tool counts from 1900, a Rat year, and uses the remainder after dividing the years since 1900 by twelve. That is why 1900 gives Rat, 1994 gives Dog, 2000 gives Dragon and 2026 gives Horse. The real boundary is the Lunar New Year, which falls between about 21 January and 20 February, so someone born before it in their birth year belongs to the previous year's animal. If the year is outside 1900 to 2100, or is not a number, nothing is highlighted.",
      },
      {
        heading: "Does pinning an animal change the odds?",
        body: "No. Pressing Show animal only moves that animal to the first slice so it is easy to find. All twelve slices are the same size, so each animal has a 1 in 12 chance, about 8.3%, on every spin. The animation is the selection: the wheel picks a random total rotation with your browser's cryptographic random number generator (crypto.getRandomValues, with Math.random only as a fallback) and the animal at the pointer is the result.",
      },
      {
        heading: "What this wheel does not do",
        body: "It does not look up Lunar New Year dates, give personality readings or check compatibility, and it is meant for games, classes and curiosity rather than for predictions. Traditions vary between cultures and regions. The Goat in this list is called the Sheep or the Ram in some places.",
      },
    ],
    faqs: [
      { question: "How does the birth-year calculator work?", answer: "Enter a year between 1900 and 2100 and tap Show animal. The tool maps the year onto the twelve-animal cycle and pins that animal first on the wheel. For example, 1994 shows Dog and 2000 shows Dragon." },
      { question: "Is the year mapping exact for lunar New Year?", answer: "No, it uses calendar years. The animal really changes at the Lunar New Year, which falls between about 21 January and 20 February, so births in January or February can belong to the previous year's animal." },
      { question: "What happens if I type a year outside 1900 to 2100?", answer: "Nothing is highlighted, and any animal you looked up earlier is cleared. The lookup only works for years from 1900 to 2100." },
      { question: "Does my animal have a better chance on the wheel?", answer: "No. Show animal only moves your animal to the first slice. All twelve animals have the same 1 in 12 chance on every spin." },
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
        body: "Paste the roster, keep Remove after pick on (it is on by default), and work through the list until everyone has had a turn. The wheel never drops below two names, so when only two students are left, call the second one yourself.",
      },
      {
        heading: "Meeting speaker order",
        body: "Paste the attendees and spin repeatedly with Remove after pick on, so the same volunteer does not always go last. The numbered Session history under the wheel doubles as the speaking order: 1 is the first name drawn, 2 the second, and so on.",
      },
      {
        heading: "Baby shower and party hat draws",
        body: "Type each gift-giver once and spin to decide who opens the next present, the way you would draw slips from a hat. Copy link opens the wheel with the same names filled in, which helps if a guest joins by video call and wants to see the list.",
      },
      {
        heading: "Weighted livestream shoutouts",
        body: "Creators can give subscribers extra chances by writing a weight after the name, such as Alex:3. With four other names at weight 1, Alex holds 3 of 7 slices, about a 43% chance. Use Streamer mode for a plain background that is easy to capture in OBS.",
      },
      {
        heading: "Giveaway rules everyone can follow",
        body: "Write the rules before you draw: one entry per person, who is eligible, and how many winners. Then paste the final list, spin on camera, and share the proof link so entrants can see the winner, the number of entries and the time of the draw.",
      },
    ],
    howToSteps: [
      "Type or paste one name per line in the Names box. You need at least two names, and the wheel updates as you type.",
      "Decide whether winners should leave the wheel. Remove after pick is on by default, which works like keeping drawn slips out of the hat. Switch it off if the same name may win more than once.",
      "Optional: switch on Weighted entries and add a weight after a name, for example Alex:3. A colon, asterisk, vertical bar or the letter x all work as the separator. Weights run from 1 to 20, and a name without a weight counts as 1.",
      "Look at the duplicate notice under the box. If a name appears twice, the page says so and each copy gets its own slice. With Remove after pick on, a winning name removes every copy of it, so give two people with the same first name different labels, such as Sam K. and Sam R.",
      "Press SPIN THE WHEEL. The spin timer is 7 seconds by default and can be set from 3 seconds to 1 minute. The name under the pointer when the wheel stops is the winner, and it is added to Session history.",
      "To show the result to others, use Copy link to open the wheel with the same names, Streamer mode for a plain background layout, or Get proof link after a spin. Links you copy contain the names in the address itself, so only share them with people who are allowed to see the list.",
    ],
    supplementalSections: [
      {
        heading: "How weighted entries change the odds",
        body: "A weight is the number of equal slices a name gets, so its chance is its slices divided by all slices on the wheel. Five names at weight 1 give everyone 20%. If one of them is written as Alex:3, there are seven slices and Alex has a 3 in 7 chance, about 43%, while each other name has 1 in 7, about 14%. Large weights add many slices, so keep them modest on a long list.",
      },
      {
        heading: "How each spin is decided",
        body: "When you press the button, the wheel chooses a random total rotation using your browser's cryptographic random number generator (crypto.getRandomValues, with Math.random only as a fallback in browsers that lack it). The animation plays that rotation out, and the name at the pointer is the winner. The spin timer only changes how long the spin takes, and with equal slices every name has the same chance on every spin. Our How Randomness Works page and the spin wheel fairness study explain the method in more depth.",
      },
      {
        heading: "What the proof link shows, and what it does not",
        body: "The proof link records the winner, the number of entries, the time of the draw and the method label inside the link itself. It is a convenient record to post in a chat or a story, not a tamper-proof certificate, because anyone can build a link of the same shape. For giveaways where trust matters, screen-record the whole draw, show the list before you spin, and keep the rules public.",
      },
    ],
    faqs: [
      {
        question: "What is remove-after-pick?",
        answer:
          "When enabled, the chosen name drops from the pool after each spin so later rounds only include remaining people, the same fairness rule as emptying a hat. The wheel never drops below two names, so the last two stay on the wheel.",
      },
      {
        question: "How do weighted entries work?",
        answer:
          "Toggle Weighted entries and write Name:weight on a line (Alex:3). That name gets three equal slices. Weights run from 1 to 20. Leave the toggle off for classic equal chances.",
      },
      {
        question: "Can the same name be picked twice?",
        answer:
          "Only if Remove after pick is off. With it on, a winning name leaves the wheel, including every copy of the same name, so label two people with the same name differently. The one exception is the final pair: the wheel never drops below two names, so once two remain they both stay and either can be drawn again.",
      },
      {
        question: "Where is session history?",
        answer:
          "Every completed spin appends to the Session history list under the wheel, numbered in the order the names were drawn, so you can see who already went without guessing. Clear history empties the list.",
      },
      {
        question: "Are my names saved or uploaded?",
        answer:
          "The page does not upload your list. When you spin, it sends an anonymous spin counter request that contains no names. Links you copy, such as the share link or the proof link, carry the names inside the address, so treat them like the list itself.",
      },
      {
        question: "Is this the same as a pick-out-of-a-hat generator?",
        answer:
          "Yes. This page is the hat-style name draw: paste slips, spin, remove winners, or weight a few names when the rules call for it.",
      },
      {
        question: "Can I prove the spin for a raffle?",
        answer:
          "Use the proof link after a spin, which records the winner, entry count and time. It is a record rather than a tamper-proof certificate, so screen-record the draw as well if others will want evidence.",
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
      { slug: "pokemon-randomizer-wheel", anchor: "Challenge run for game nights" },
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
        body: "Spin, then uncheck the letter once the class has covered it, so the next spin only offers letters you have not done yet. Build the craft or phonics activity around whichever letter comes up. The page does not remember unchecked letters after a reload, so keep a list of the letters you have already done.",
      },
      {
        heading: "Scattergories starter",
        body: "Hosts spin one letter, and every answer that round must begin with it. Classic Scattergories letter dice leave out hard letters such as Q, U, V, X, Y and Z, so uncheck those six first. That leaves 20 letters, each with a 5% chance.",
      },
      {
        heading: "Spelling bee warm-ups",
        body: "To drill vowels, uncheck every consonant so only A, E, I, O and U remain, each with a 20% chance. It takes a few clicks, so set it up before the session starts, then spin once per word.",
      },
      {
        heading: "Password game nights",
        body: "Teams spin letters to seed codenames before the guessing round begins. Spin once per team so every team starts from a different letter.",
      },
      {
        heading: "ESL vocabulary starts",
        body: "Tutors spin a letter and ask the learner to say three words that begin with it. Uncheck letters the learner finds especially hard, or add them back later as confidence grows.",
      },
    ],
    howToSteps: [
      "Open the page. The wheel starts with all 26 letters, and the line under the checkboxes reads \"26 letters active on the wheel\".",
      "Uncheck any letter you want to leave out. The wheel rebuilds at once and the count updates. Every letter that stays has the same chance.",
      "Keep at least two letters checked. With fewer than two, the wheel is replaced by a message asking you to enable at least two letters.",
      "Optional: press Projector fullscreen for a classroom screen. The spin button becomes a large TAP TO SPIN control, and Exit projector returns to the normal page.",
      "Press SPIN THE WHEEL. The spin timer is 7 seconds by default and can be set from 3 seconds to 1 minute. The letter under the pointer when the wheel stops is the result.",
      "If a letter should not come up again, uncheck it before the next spin. Letters are not removed automatically after a spin.",
    ],
    supplementalSections: [
      {
        heading: "How the odds work",
        body: "Every active letter has a slice of the same size, so its chance is 1 divided by the number of active letters. With all 26 letters that is about 3.8% each. With 20 letters it is 5% each, with 5 vowels 20% each, and with only two letters left it is a plain 50/50. Unchecking a letter never favours any other letter: the remaining letters simply share the odds equally.",
      },
      {
        heading: "How each spin is decided",
        body: "When you press the button, the wheel chooses a random total rotation using your browser's cryptographic random number generator (crypto.getRandomValues, with Math.random only as a fallback in browsers that lack it). The animation plays that rotation out, and the letter at the pointer is the result. The spin timer only changes how long the spin takes, and earlier letters never influence the next one. Our How Randomness Works page explains the method in more depth.",
      },
      {
        heading: "What this wheel does not do",
        body: "It does not remember which letters you used, check spelling or supply word lists. It gives you a random letter and leaves the game to you. For multiple-choice call-outs use the ABCD Spin Wheel, and for random words use the random word wheel.",
      },
    ],
    faqs: [
      {
        question: "How does exclude-letters work?",
        answer:
          "Uncheck a letter and it leaves the wheel immediately, so the next spin only considers the letters that are still checked. The line under the checkboxes shows how many letters are active.",
      },
      {
        question: "Are all letters equally likely?",
        answer:
          "Yes. Each active letter has a slice of the same size, so each has the same chance, about 3.8% with all 26 letters and higher as you uncheck more.",
      },
      {
        question: "Why does the wheel disappear?",
        answer:
          "The wheel needs at least two letters. If you uncheck all but one, it is replaced by a message asking you to enable at least two letters. Check another letter and the wheel returns.",
      },
      {
        question: "Does it remember my unchecked letters?",
        answer:
          "Not after a reload. The unchecked letters live only on the page you have open, so keep your own list if a game runs across several sessions.",
      },
      {
        question: "Can I spin lowercase letters?",
        answer:
          "Yes. Under the wheel, press Expand on the Entries List, then change the text of any entry, for example from A to a, if young readers need lowercase practice. Checking or unchecking letters rebuilds the wheel from the capital letters again.",
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
      { heading: "SAT practice games", body: "Tutors spin when a student is stuck between two choices, then discuss why the letter that came up was or was not correct. The aim is the discussion about the reasoning, not the guess itself." },
      { heading: "Projector review days", body: "Fullscreen classroom mode puts a large TAP TO SPIN control on the board. With Remove letter after pick on, letters that have already been called drop off the wheel, so a review round does not keep repeating the same answer." },
      { heading: "Workshop polling", body: "Write four discussion topics on the board, label them A to D, and spin to pick which breakout question starts. With Remove letter after pick on, the first two topics called drop away, and the final two can be settled with one more spin." },
      { heading: "Session logging", body: "The Answers called list shows which letters already came up, newest first and numbered from 1, so nobody has to argue about repeats halfway through the period." },
      { heading: "Placing the correct answer in a quiz", body: "When you write multiple-choice questions, spin to decide which letter holds the correct answer so your answer key does not fall into a pattern. Write the correct option in the spun letter's position, then fill in the other three." },
    ],
    howToSteps: [
      "Open the page. The wheel loads with four equal slices labelled A, B, C and D.",
      "Choose how letters repeat. Leave Remove letter after pick off if any letter may come up again, or switch it on to take each called letter off the wheel.",
      "For a classroom screen, press Projector fullscreen. The spin button becomes a large TAP TO SPIN control, and Exit projector returns to the normal layout.",
      "Spin the wheel. The spin timer is 7 seconds by default and can be set from 3 seconds to 1 minute. The slice under the pointer when the wheel stops is the letter.",
      "Read the Answers called list under the wheel. It shows every letter spun in this session, newest first, with numbers counting from the first spin.",
      "To start a fresh round, reload the page. The wheel returns to all four letters and the list is cleared.",
    ],
    supplementalSections: [
      {
        heading: "How the odds work",
        body: "Each letter has an equal slice. With all four letters on the wheel, each has a 25% chance. If Remove letter after pick is on, three letters left means about 33.3% each, and two letters left means 50% each. The wheel stops removing at two letters, so it never runs out of options, and the final pair stays on the wheel.",
      },
      {
        heading: "How each spin is decided",
        body: "When you press the button, the wheel chooses a random total rotation using your browser's cryptographic random number generator (crypto.getRandomValues, with Math.random only as a fallback in browsers that lack it). The animation plays that rotation out, and the letter at the pointer is the result. The spin timer only changes how long the spin takes, and earlier letters never influence the next one. Our How Randomness Works page explains the method in more depth.",
      },
      {
        heading: "What a random letter can and cannot do",
        body: "A random letter is not a clue about the right answer. It works well for call-outs, warm-ups and discussion prompts, and for placing answers in a quiz you are writing. It is not a way to grade a test, and for true or false questions the Yes or No Wheel is a closer fit.",
      },
    ],
    faqs: [
      { question: "Does the wheel always show A to D?", answer: "Yes. Each time the page loads it starts with four slices labelled A, B, C and D, ready for multiple-choice call-outs." },
      { question: "Are all four letters equally likely?", answer: "Yes. The four slices are the same size, so each letter has a 25% chance on a fresh wheel. If you remove letters after each pick, the remaining letters share the odds equally." },
      { question: "What does remove letter after pick do?", answer: "After a spin, that letter drops from the wheel so the next spin only chooses among the remaining letters. It stops at two letters, so the wheel always has at least two options, and reloading the page restores all four." },
      { question: "What is projector fullscreen?", answer: "It expands the wheel to a full-screen classroom layout with a large TAP TO SPIN button meant for smartboards and projectors. Exit projector returns to the normal page." },
      { question: "Where do I see past answers?", answer: "The Answers called list under the wheel keeps an ordered history of every letter spun this session, newest first. Reloading the page clears it." },
      { question: "Does a random letter tell me the correct answer?", answer: "No. The letter is random and carries no information about which option is right, so use it for call-outs and discussion rather than for answering questions." },
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
      "The Secret Santa Wheel Generator spins the same participant list for a quick single pick, or switches to assignment mode to pair every participant with exactly one other person using an unbiased shuffle, exclusions for couples or last year's match, and a private reveal link per giver. Paste names once, add exclusion rules if you need them, then spin for a casual pick or press Generate assignments for a full exchange.",
    title: "Secret Santa Wheel, Assignments and Exclusions",
    metaDescription:
      "Run office or family Secret Santa with assignment mode, couple exclusions, and private reveal links so each gifter sees only their match.",
    useCases: [
      {
        heading: "Office holiday parties with manager exclusions",
        body: "HR pastes the department roster, adds an exclusion line for any pairing company policy rules out, such as a manager and their own direct report, then generates assignments and sends each person their private reveal link instead of a paper slip passed around the break room.",
      },
      {
        heading: "Extended family exchanges with couple exclusions",
        body: "Exclusion rules block both directions automatically, so writing \"Alex → Jordan\" once is enough to stop Alex drawing Jordan and Jordan drawing Alex. A family with three married couples needs only three exclusion lines, not six, to keep every spouse pair apart.",
      },
      {
        heading: "Remote team celebrations",
        body: "A distributed team generates assignments once during a video call, then each person opens their own link afterward instead of a pairing being read aloud or typed into a shared chat where everyone can see it.",
      },
      {
        heading: "A quick single pick without full assignments",
        body: "When the goal is just one random person, such as who presents first or who opens gifts first, the same participant list also feeds the ordinary spin wheel shown above the Generate button. Spinning once skips assignment mode entirely.",
      },
      {
        heading: "Re-running after someone drops out",
        body: "Remove the name of anyone who can no longer join, then press Generate assignments again. The new pairing can differ from the old one for other participants too, so previously sent reveal links may now describe the wrong match. See \"What the reveal link does and does not protect\" below before resending.",
      },
    ],
    howToSteps: [
      "Paste participant names into the Participants box, one per line. Each distinct name becomes one entry on both the quick-spin wheel and assignment mode.",
      "If two participants share the exact same first name, give one of them a distinguishing label, such as a last initial. Assignment mode treats identical names (matched case-insensitively) as a single participant, so an unedited duplicate silently drops one person from the exchange.",
      "If you need exclusions, add them in the second box, one pair per line, using the arrow shown on the page (\"Alex → Jordan\"), a plain dash (\"Alex - Jordan\"), or \"->\". Each rule blocks the pairing in both directions, so a couple or roommate pair needs only one line.",
      "Check the \"On the wheel now\" count under the boxes matches the number of participants you expect before generating.",
      "Press Generate assignments. The tool shuffles the list with an unbiased draw and checks the result against your exclusions and the no-self-match rule, trying again automatically, up to 5,000 times, until a valid arrangement appears.",
      "Copy each person's reveal link from the \"Per-person reveal links\" list and send it to that participant individually. Opening the link shows only that person's own match.",
    ],
    supplementalSections: [
      {
        heading: "How exclusions work",
        body: "Each exclusion line blocks a pairing in both directions automatically: writing \"Alex → Jordan\" once also stops Jordan from drawing Alex, so a couple or roommate pair needs only one line, not two. The parser matches names from your participant list case-insensitively, and understands the arrow shown on the page, \"->\", \"=>\", \">\", or a plain dash between two names, including hyphenated names such as \"Mary-Jane\". A line that does not match two real names on the list, or that excludes a name from itself, is not applied silently; it is listed under the exclusions box so you can fix it, with the first three unmatched lines shown by name.",
      },
      {
        heading: "What \"no valid assignment\" means",
        body: "Generate assignments tries up to 5,000 random draws before giving up, so a failure almost always means your exclusions genuinely rule out every possible pairing for that group, not a fluke of the random draw. The simplest failing case is two participants with one exclusion between them: there is no second person left to assign, so every attempt fails immediately. With larger groups and a handful of exclusions, a valid pairing is normally found within the first few tries; in 300 separate test runs with two exclusion rules among five participants, every run succeeded on the first draw or shortly after. Treat a \"no valid assignment\" message as a sign to loosen one rule, not as a bug.",
      },
      {
        heading: "How fair the pairing is",
        body: "The shuffle behind assignment mode is drawn from the same unbiased, rejection-sampled method used for the team generator and the wheel's Shuffle button, not a sort-based shuffle, which would favor some orderings over others. For the smallest possible group, three people with no exclusions, there are only two valid arrangements, since nobody can be assigned to themselves; testing the selection logic directly confirms both of those two arrangements occur with equal likelihood, not one more often than the other.",
      },
      {
        heading: "Duplicate names behave differently in each mode",
        body: "The quick-spin wheel above the Generate button treats every line as its own slice, so a name entered twice gets two slices and double the chance on a single spin. Assignment mode works differently: it collapses repeated names, matched case-insensitively, into one participant before pairing, because a real gift exchange needs exactly one assignment per person. Give participants distinct labels if two of them share a first name.",
      },
      {
        heading: "What the reveal link does and does not protect",
        body: "A reveal link encodes the giver's name and their assigned recipient directly in the link itself; opening it decodes and displays that pair in the browser, with nothing looked up from a server. That makes it a convenient way to keep pairings out of a shared chat, not a secure secret: anyone holding the link can read it, and generating assignments again (after editing the participant list) replaces the pairing shown on the page, so a link sent before that point may describe a match that no longer applies. For stricter privacy, send each link over a private channel rather than posting all of them together, and avoid changing the roster once links have gone out.",
      },
    ],
    faqs: [
      {
        question: "How does assignment mode work?",
        answer:
          "Pressing Generate assignments shuffles your participant list with an unbiased draw, then checks that nobody is assigned to themselves and no excluded pair appears. If a draw fails either check, the tool tries again, up to 5,000 times, so every valid arrangement for your group has an equal chance of being the one you get.",
      },
      {
        question: "Does one exclusion line block both directions?",
        answer:
          "Yes. Writing \"Alex → Jordan\" stops Alex from drawing Jordan and Jordan from drawing Alex, so a couple or roommate pair only needs one line.",
      },
      {
        question: "What if assignment mode says no valid arrangement was found?",
        answer:
          "It means your exclusions leave no way to pair everyone validly, most often because a small group excludes the only people left to assign. Remove or loosen one exclusion rule and press Generate assignments again.",
      },
      {
        question: "Can two participants have the same name?",
        answer:
          "Give them distinct labels instead, such as a last initial. The quick-spin wheel treats repeated names as separate slices, but assignment mode merges matching names into one participant, so an unedited duplicate removes someone from the exchange.",
      },
      {
        question: "Are the per-person reveal links private?",
        answer:
          "Each link shows only that person's own match when opened, but the pairing is encoded in the link itself rather than stored on a server, so anyone who receives or guesses the link can read it. Send links individually rather than posting them all in one group thread.",
      },
      {
        question: "Can I still just spin for one random name instead of generating assignments?",
        answer:
          "Yes. The same participant list feeds the ordinary spin wheel shown above the Generate button, so one tap and spin picks a single name without creating a full set of pairings.",
      },
      {
        question: "What happens to the reveal links if I edit the participant list after generating?",
        answer:
          "Editing the Participants box clears the assignments and reveal links currently shown on the page, so you will need to press Generate assignments again. Resend fresh links afterward, since any links you already shared described the earlier pairing.",
      },
      {
        question: "Does it store names or addresses anywhere?",
        answer:
          "No. Participant names and exclusions stay in the browser tab; only a reveal token (the giver and recipient names, encoded in the link) travels in the URL you choose to share. Shipping or gift details stay in your own separate chat thread.",
      },
    ],
    relatedWheels: [
      { slug: "random-name-picker-wheel", anchor: "General name draw wheel" },
      { slug: "winner-picker-wheel", anchor: "Holiday raffle or giveaway winner" },
      { slug: "raffle-wheel", anchor: "Multi-winner prize draw" },
      { slug: "team-generator-wheel", anchor: "Split a group for sub-exchanges" },
      { slug: "dinner-picker-wheel", anchor: "Pick the holiday dinner menu" },
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
