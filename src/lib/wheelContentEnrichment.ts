import type { WheelPageRecord } from "./wheelPages";
import { getRelatedWheelPages } from "./wheelPages";
import { getAllBlogPosts } from "@/data/blogPosts";

export type ContentSection = {
  heading: string;
  items: string[];
};

export type EnrichedContent = {
  definitionSnippet: string;
  /** Optional first-person note for featured wheels only */
  personalNote?: string;
  useCases: ContentSection;
  benefits: ContentSection;
  tips: ContentSection;
  examples: ContentSection;
  whyUse: string;
  conclusion: string;
  relatedBlogSlugs: string[];
};

const CATEGORY_DATA: Record<
  string,
  {
    useCases: string[];
    benefits: string[];
    tips: string[];
    examplesIntro: string;
    examples: string[];
    whyPrefix: string;
  }
> = {
  Decision: {
    useCases: [
      "Settling everyday debates without arguments or lingering indecision",
      "Choosing between two or more options when every choice seems equally good",
      "Making quick household decisions such as chores, meal plans, or movie night picks",
      "Breaking deadlocks in friend groups, couples, or roommates",
      "Adding a fun, game-like element to otherwise stressful choices",
      "Livestreamers and content creators polling their audience in real time",
    ],
    benefits: [
      "Eliminates decision fatigue by letting randomness decide for you",
      "Removes personal bias so every option gets a truly fair chance",
      "Saves time compared to lengthy back-and-forth discussions",
      "Turns mundane decisions into exciting, shareable moments",
      "Works on any device with no downloads or sign-ups required",
    ],
    tips: [
      "Keep your option list concise; three to eight choices produce the most satisfying spins",
      "Commit to the result before you spin to preserve the fun",
      "Screen-record the spin when sharing the outcome with others",
      "Re-spin only if both parties genuinely agree the first result does not work",
      "Customize wheel colors to visually distinguish each option at a glance",
    ],
    examplesIntro:
      "Here are practical scenarios where a decision wheel saves time and stress:",
    examples: [
      "A couple cannot agree on dinner, so they list five restaurants and spin",
      "A group chat uses a decision spinner to pick the next Netflix series",
      "A team lead spins the wheel to assign who presents first at the meeting",
      "A student uses it to decide which subject to study first tonight",
    ],
    whyPrefix: "When every option looks equally appealing, indecision can waste hours.",
  },
  "Education & Learning": {
    useCases: [
      "Calling on students fairly without anyone feeling singled out",
      "Assigning random topics for essays, debates, or presentations",
      "Gamifying vocabulary drills, math facts, or spelling practice",
      "Generating random prompts for creative writing or art projects",
      "Running pop quizzes where the wheel selects the next question category",
      "Dividing a class into groups for collaborative activities",
    ],
    benefits: [
      "Keeps students attentive because anyone could be selected next",
      "Makes learning feel like a game, increasing participation and retention",
      "Ensures every student gets an equal share of speaking opportunities",
      "Reduces teacher bias in who gets called on or rewarded",
      "Saves lesson-planning time with a reusable, instant randomizer",
    ],
    tips: [
      "Project the wheel on a smartboard so the entire class can watch the spin",
      "Remove a student's name after selection if you want everyone picked once",
      "Pair the wheel with a reward chart to double student motivation",
      "Use subject-specific color themes to differentiate different activities",
      "Save custom wheels for different classes so setup takes seconds each day",
    ],
    examplesIntro:
      "Teachers and educators worldwide use education spinners like these:",
    examples: [
      "A primary teacher spins the alphabet wheel to pick the letter of the day",
      "A language teacher assigns random countries so students research cultures",
      "An art teacher spins the drawing-prompt wheel for warm-up sketches",
      "A debate coach uses the wheel to assign sides of an argument randomly",
    ],
    whyPrefix:
      "Traditional methods like popsicle sticks or raising hands can feel repetitive.",
  },
  "Utilities & Tools": {
    useCases: [
      "Picking random names for contests, giveaways, or raffles",
      "Generating random numbers for statistical sampling or lotteries",
      "Splitting participants into balanced teams for sports or projects",
      "Selecting winners from a large pool of entries quickly and transparently",
      "Creating randomized color palettes for design brainstorming",
      "Running icebreaker activities in corporate workshops",
    ],
    benefits: [
      "Produces cryptographically fair results every single time",
      "No installation needed; works instantly in any modern browser",
      "Handles large lists (hundreds of entries) without slowing down",
      "Screen-record the spin to provide a verifiable, transparent result",
      "Completely free with no limits on how many times you spin",
    ],
    tips: [
      "Double-check your entry list for duplicates before spinning",
      "Use the remove-after-win setting for multi-round eliminations",
      "Copy-paste names from a spreadsheet to save time entering data",
      "Share the direct link with participants so everyone can witness the spin",
      "Bookmark your customized wheel to reuse it for recurring events",
    ],
    examplesIntro:
      "Utility wheels solve real problems across many scenarios:",
    examples: [
      "An HR manager spins the name wheel to assign Secret Santa pairings",
      "A Twitch streamer uses the winner picker to select a subscriber giveaway winner",
      "A football league commissioner spins the NFL team wheel for a fantasy draft order",
      "A project manager uses the team generator to create random sprint pairs",
    ],
    whyPrefix:
      "Manual randomization is slow and error-prone.",
  },
  "Zodiac & Fortune": {
    useCases: [
      "Exploring daily horoscopes in a fun, interactive way",
      "Learning about zodiac sign traits, compatibility, and history",
      "Adding a mystical element to parties, sleepovers, or date nights",
      "Content creators generating zodiac-themed social media posts",
      "Discovering lesser-known zodiac systems like Chinese or Egyptian astrology",
      "Icebreaker conversations at events using zodiac wheel games",
    ],
    benefits: [
      "Combines entertainment with educational astrology content",
      "Makes zodiac exploration interactive rather than just reading text",
      "Covers Western, Chinese, and Egyptian zodiac systems in one place",
      "Creates shareable, social-media-friendly moments for astrology fans",
      "Works as a fun party game that sparks conversation and laughter",
    ],
    tips: [
      "Try each zodiac system to discover fascinating cultural differences",
      "Screenshot your result and share it with friends on social media",
      "Pair the zodiac wheel with a compatibility chart for date-night fun",
      "Use the planetary wheel to learn which planet rules each sign",
      "Spin daily for a quick horoscope-style prompt to start your morning",
    ],
    examplesIntro:
      "Zodiac and fortune wheels add magic to everyday moments:",
    examples: [
      "Friends spin the zodiac wheel at a sleepover to read each other's traits",
      "A content creator spins the Chinese zodiac wheel for a TikTok personality video",
      "A couple uses the compatibility wheel to explore how their signs interact",
      "An astrology class uses the planetary wheel to quiz students on ruling planets",
    ],
    whyPrefix:
      "Static horoscope pages can feel stale.",
  },
  "Games & Fun": {
    useCases: [
      "Adding randomness to board game nights with unexpected challenges",
      "Choosing which game to play next when the group cannot decide",
      "Running randomized challenges for YouTube or TikTok content",
      "Creating custom game rules like random dares or bonus rounds",
      "Picking random characters, items, or scenarios in tabletop RPGs",
      "Hosting virtual game nights where everyone watches the spin together",
    ],
    benefits: [
      "Injects unpredictability into familiar games, keeping them fresh",
      "Works as a standalone mini-game requiring no extra equipment",
      "Easy to customize with your own options for any game or challenge",
      "Creates excitement and suspense that flat random number generators lack",
      "Perfect for streaming and content creation with a visual element viewers love",
    ],
    tips: [
      "Create themed wheels (dare wheel, trivia category wheel) for specific game nights",
      "Let guests add their own entries for a collaborative, surprise-filled experience",
      "Record the spin for replay and social media content",
      "Combine multiple wheels for layered randomness (e.g., character + challenge)",
      "Set a timer after each spin to add urgency to challenges",
    ],
    examplesIntro:
      "Game and fun wheels turn any gathering into an event:",
    examples: [
      "A family spins the Twister spinner online when the physical spinner breaks",
      "Gamers use the randomizer to pick which character or starter to use in a challenge run",
      "A party host creates a dare wheel for New Year's Eve celebrations",
      "A D&D group spins the wheel to determine random encounter outcomes",
    ],
    whyPrefix:
      "Repetitive game routines get boring fast.",
  },
  "Events & Parties": {
    useCases: [
      "Running Secret Santa draws without revealing pairings early",
      "Choosing raffle winners at fundraisers and charity events",
      "Assigning random party games or activities throughout the night",
      "Picking door prize winners at corporate events or weddings",
      "Organizing holiday gift exchanges with family or coworkers",
      "Livestreaming the selection process for transparency at virtual events",
    ],
    benefits: [
      "Makes gift exchanges and draws effortless to organize",
      "Ensures complete fairness with cryptographic randomization",
      "Adds suspense and excitement to any event",
      "Works for both in-person and virtual gatherings",
      "No app install needed; guests just watch the browser spin",
    ],
    tips: [
      "Exclude pairings (like spouses) by running multiple spins if needed",
      "Screen-record the draw so absentees can watch later",
      "Set up the wheel before guests arrive to keep the event flowing",
      "Use festive wheel colors matching the event theme",
      "Share the wheel link so remote participants can spin too",
    ],
    examplesIntro:
      "Event organizers rely on spin wheels for seamless coordination:",
    examples: [
      "An office team runs Secret Santa with the wheel so nobody knows who draws whom",
      "A wedding MC spins the wheel to decide which table goes to the buffet first",
      "A charity gala uses the winner picker to draw raffle ticket numbers live on stage",
      "A virtual holiday party shares the wheel screen so remote employees can participate",
    ],
    whyPrefix:
      "Organizing event draws manually is tedious and easy to mess up.",
  },
  "Food & Lifestyle": {
    useCases: [
      "Deciding where or what to eat when options overwhelm you",
      "Building weekly meal plans with randomized variety",
      "Choosing self-care activities for mindful daily routines",
      "Selecting random recipes to try from a saved list",
      "Breaking fast-food ruts by letting the wheel pick a new chain",
      "Planning themed food nights (taco Tuesday or sushi Saturday) with variety",
    ],
    benefits: [
      "Eliminates the daily what-should-I-eat stress instantly",
      "Encourages trying new foods and restaurants you would otherwise skip",
      "Turns meal planning into a fun, low-pressure activity",
      "Promotes balanced self-care by randomizing wellness activities",
      "Customizable for dietary restrictions by only including suitable options",
    ],
    tips: [
      "Add only restaurants within delivery distance to keep results practical",
      "Include healthy options alongside indulgent ones for balanced randomness",
      "Save separate wheels for weekday lunches versus weekend dinners",
      "Combine a food wheel with a budget wheel for adventurous date nights",
      "Rotate entries seasonally to keep your options fresh",
    ],
    examplesIntro:
      "Food and lifestyle wheels make everyday choices effortless:",
    examples: [
      "A busy professional spins the fast-food wheel for a quick lunch decision",
      "A couple lists ten date-night restaurants and lets the wheel choose",
      "A wellness enthusiast spins the self-care wheel each morning for a daily ritual",
      "Roommates use the dinner-picker to rotate who decides what to cook",
    ],
    whyPrefix:
      "Decision fatigue around food is one of the most common daily frustrations.",
  },
  "Gaming & eSports": {
    useCases: [
      "Picking random drop locations in battle royale games for fun challenges",
      "Selecting which game to play from a large library",
      "Randomizing loadouts, characters, or difficulty levels for variety",
      "Running viewer challenges on Twitch or YouTube gaming streams",
      "Creating randomized tournament brackets or match-ups",
      "Adding challenge run constraints chosen by a spin",
    ],
    benefits: [
      "Prevents decision paralysis from huge game libraries",
      "Adds exciting unpredictability to gameplay and streams",
      "Creates engaging content that viewers love to watch and clip",
      "Works for any game genre from FPS to RPG to sandbox",
      "Customizable entries mean you can tailor it to any gaming scenario",
    ],
    tips: [
      "Let your stream chat add entries for maximum engagement",
      "Use a forfeits wheel alongside the main wheel for stakes",
      "Save game-specific wheels (Fortnite locations, Roblox games) for quick access",
      "Spin at the start of each stream for a recurring segment viewers anticipate",
      "Combine it with a timer for added pressure during challenge runs",
    ],
    examplesIntro:
      "Gamers and streamers use these wheels daily:",
    examples: [
      "A Fortnite streamer lets the wheel pick the drop location each match",
      "A Roblox player spins to discover a random game from thousands of options",
      "A gaming group randomizes who picks the next multiplayer game",
      "A speedrunner adds challenge constraints chosen by the wheel for a unique run",
    ],
    whyPrefix:
      "With thousands of games and in-game options, choosing where to start can eat into playtime.",
  },
  "Movies & Entertainment": {
    useCases: [
      "Ending the 'what should we watch tonight' debate in seconds",
      "Building movie marathon playlists with random genre picks",
      "Selecting horror movies for Halloween marathons or sleepovers",
      "Running movie-night polls where the wheel makes the final call",
      "Discovering films outside your usual comfort zone",
      "Content creators reviewing randomly selected films for challenge videos",
    ],
    benefits: [
      "Stops endless scrolling through streaming libraries",
      "Introduces variety by occasionally landing on genres you would skip",
      "Makes movie night a fun event rather than a frustrating negotiation",
      "Works for any group size from solo viewers to large watch parties",
      "Completely free and instant, no app downloads needed",
    ],
    tips: [
      "Create separate wheels for genres (comedy, horror, sci-fi) for themed nights",
      "Add only movies available on your current streaming platforms",
      "Let each group member add two picks for a collaborative wheel",
      "Spin twice: once for genre, once for the specific title",
      "Use the horror-specific wheel for Halloween or spooky sleepover events",
    ],
    examplesIntro:
      "Movie and entertainment wheels end the scroll and start the show:",
    examples: [
      "A family spins the movie wheel every Friday for movie night traditions",
      "Friends use the horror picker to choose a scary film for Halloween",
      "A film blogger spins the wheel to pick the next review subject",
      "A couple runs a double spin: genre first, then title, for maximum surprise",
    ],
    whyPrefix:
      "The average person spends 7 to 10 minutes scrolling before picking something to watch.",
  },
  "Parenting & Family": {
    useCases: [
      "Choosing bedtime stories without nightly arguments",
      "Picking family game night activities everyone can enjoy",
      "Assigning chores fairly among siblings or family members",
      "Deciding weekend activities when the family cannot agree",
      "Running reward wheels where kids earn spins for good behavior",
      "Creating fun learning activities by randomizing educational tasks",
    ],
    benefits: [
      "Reduces arguments between siblings about whose turn it is",
      "Makes routine decisions feel like a game rather than a chore",
      "Teaches children about fairness and probability in a hands-on way",
      "Saves parents from being the 'bad guy' who always decides",
      "Easy for kids to operate independently on a tablet or phone",
    ],
    tips: [
      "Let children add their own options so they feel ownership over the process",
      "Use the wheel as a reward mechanism: earn a spin by completing homework",
      "Create age-appropriate wheels for each child in the family",
      "Pair a chore wheel with a reward wheel for balanced motivation",
      "Save themed wheels (rainy day activities, outdoor games) for quick access",
    ],
    examplesIntro:
      "Families use spin wheels to keep things fair and fun:",
    examples: [
      "A parent spins the bedtime story wheel to let randomness pick tonight's book",
      "Siblings use the game night picker so nobody feels their choice was ignored",
      "A family of five spins the chore wheel every Sunday to assign weekly tasks",
      "Kids earn reward spins for completing homework, with prizes on the wheel",
    ],
    whyPrefix:
      "Keeping things fair among children is a constant parenting challenge.",
  },
  "Party Games": {
    useCases: [
      "Running truth-or-dare without anyone chickening out of choosing",
      "Adding random challenges to birthday parties and sleepovers",
      "Hosting interactive drinking games with unpredictable outcomes",
      "Creating custom dare wheels for bachelorette or bachelor parties",
      "Running icebreaker games at team-building events",
      "Virtual party games where remote guests watch the spin on a shared screen",
    ],
    benefits: [
      "Keeps the energy high with constant surprises and laughter",
      "Removes social pressure by letting the wheel decide who does what",
      "Endlessly customizable for any age group or event type",
      "No cards, boards, or props needed; just a phone or laptop",
      "Creates memorable, shareable moments that guests talk about afterward",
    ],
    tips: [
      "Mix easy and challenging dares for balanced fun",
      "Add a 'free pass' slice so the stakes feel real but fair",
      "Let guests submit anonymous entries for maximum surprise",
      "Keep a few backup dares ready in case the wheel lands on something impractical",
      "Use a countdown before revealing the result to build suspense",
    ],
    examplesIntro:
      "Party game wheels are the easiest way to keep guests entertained:",
    examples: [
      "A birthday party host creates a dare wheel with age-appropriate challenges",
      "A bachelorette party uses the truth-or-dare spinner for hilarious moments",
      "An office team runs an icebreaker wheel at the start of a retreat",
      "Friends on a video call share a screen and take turns spinning for challenges",
    ],
    whyPrefix:
      "Traditional party games often lose momentum or feel forced.",
  },
  "Business & Events": {
    useCases: [
      "Selecting giveaway winners transparently for social media contests",
      "Drawing raffle winners at corporate events, trade shows, or conferences",
      "Choosing which team member presents first in meetings",
      "Running employee recognition spins for monthly awards",
      "Assigning random tasks during brainstorming sessions",
      "Livestreaming winner announcements for maximum audience trust",
    ],
    benefits: [
      "Builds audience trust with a transparent, verifiable selection process",
      "Eliminates accusations of favoritism in winner selection",
      "Professional enough for corporate use, fun enough for social media",
      "Can be screen-recorded as proof for contest regulations",
      "Handles any number of entries efficiently",
    ],
    tips: [
      "Always announce the rules before the spin so participants know the process",
      "Record the spin and post it to your social media for accountability",
      "Use branded colors on the wheel to match your company identity",
      "Run a test spin before the live event to check your entry list",
      "Save the recording with a timestamp as proof for any disputes",
    ],
    examplesIntro:
      "Businesses and event organizers use winner wheels daily:",
    examples: [
      "An Instagram brand spins the giveaway wheel live on Stories to pick a winner",
      "A conference organizer draws door-prize winners with the wheel on stage",
      "A sales team uses the wheel to assign bonus leads fairly each week",
      "A YouTube creator runs a subscriber giveaway with the spin visible on camera",
    ],
    whyPrefix:
      "Manual winner selection invites bias complaints and erodes audience trust.",
  },
  "Health & Fitness": {
    useCases: [
      "Randomizing daily workouts to prevent exercise boredom",
      "Selecting exercises for circuit training without pre-planning",
      "Adding variety to home workouts when you lack a personal trainer",
      "Gamifying fitness challenges with friends or family",
      "Choosing warm-up or cool-down routines randomly",
      "Running fitness challenges on social media with random exercises",
    ],
    benefits: [
      "Prevents workout plateaus by forcing exercise variety",
      "Makes fitness decisions instant, removing one excuse to skip the gym",
      "Works as a personal trainer alternative for daily variety",
      "Fun and gamified approach keeps motivation high",
      "Customizable for any fitness level from beginner to advanced",
    ],
    tips: [
      "Include exercises from different muscle groups for a balanced spin",
      "Set rep counts or time durations alongside each exercise entry",
      "Spin three times for a quick mini-circuit that takes under 15 minutes",
      "Save separate wheels for cardio, strength, and flexibility days",
      "Share your spin results on social media to stay accountable",
    ],
    examplesIntro:
      "Fitness enthusiasts use exercise wheels to keep things fresh:",
    examples: [
      "A home gym user spins three times to build a custom daily circuit",
      "A fitness influencer uses the exercise wheel in TikTok workout videos",
      "A PE teacher spins the wheel to choose warm-up exercises for the class",
      "Friends compete to complete whatever exercise the wheel lands on first",
    ],
    whyPrefix:
      "Repeating the same workout routine leads to boredom and plateaus.",
  },
  "Lifestyle & Fun": {
    useCases: [
      "Planning date nights with random activity suggestions",
      "Choosing weekend activities when nothing comes to mind",
      "Breaking routine by letting randomness introduce new experiences",
      "Running couples' challenges where the wheel picks the activity",
      "Discovering new hobbies or places to visit in your city",
      "Content creators filming 'the wheel decides my day' videos",
    ],
    benefits: [
      "Injects spontaneity into daily life without the stress of planning",
      "Helps couples and friends avoid the 'I don't know, what do you want to do' loop",
      "Encourages trying new things you would never choose on your own",
      "Makes planning feel like a game rather than a chore",
      "Fully customizable to your budget, location, and preferences",
    ],
    tips: [
      "Mix adventurous and low-key options for realistic variety",
      "Include budget-friendly and splurge options for balance",
      "Spin weekly to build a fun routine around randomness",
      "Add seasonal activities and rotate them throughout the year",
      "Let your partner add secret entries for surprise-filled date nights",
    ],
    examplesIntro:
      "Lifestyle wheels turn ordinary days into adventures:",
    examples: [
      "A couple spins the date night wheel every Saturday for surprise plans",
      "A solo traveler uses it to pick which neighborhood to explore",
      "Friends spin the wheel to decide between hiking, bowling, or a movie",
      "A YouTuber films a 'wheel decides my weekend' vlog series",
    ],
    whyPrefix:
      "Routine is comfortable, but it can also make life feel monotonous.",
  },
  "Self Improvement": {
    useCases: [
      "Discovering new hobbies to try during free time",
      "Breaking creative blocks by randomizing project ideas",
      "Building a rotating hobby schedule for well-rounded personal growth",
      "Challenging yourself to step outside your comfort zone regularly",
      "Running '30-day challenge' wheels with different activities each day",
      "Using randomness to overcome perfectionism and just start something",
    ],
    benefits: [
      "Eliminates overthinking about what to try next",
      "Introduces variety that leads to unexpected passions",
      "Makes self-improvement feel playful rather than pressured",
      "Helps overcome the fear of commitment to a single hobby",
      "Encourages experimentation with zero financial risk",
    ],
    tips: [
      "Include a wide range of hobbies from physical to creative to intellectual",
      "Give each hobby at least a week before spinning again for a fair trial",
      "Track which hobbies you enjoyed most to build long-term interests",
      "Add hobbies you have always been curious about but never tried",
      "Spin with a friend and try the same hobby together for accountability",
    ],
    examplesIntro:
      "Self-improvement wheels help people grow in unexpected ways:",
    examples: [
      "Someone spins and discovers a love for watercolor painting they never expected",
      "A content creator tries a new hobby every week based on the wheel",
      "A student uses it to balance study time between different skills",
      "Friends challenge each other to complete whatever the wheel picks for the month",
    ],
    whyPrefix:
      "The paradox of choice makes starting something new harder than it should be.",
  },
  "Social Media & Tools": {
    useCases: [
      "Running Instagram giveaway draws with visual, shareable spins",
      "Choosing random followers to feature or shout out",
      "Generating content ideas by spinning topic and format wheels",
      "Selecting challenge participants from comment sections",
      "Adding interactive elements to Stories and Reels",
      "Running live spin-to-win events for follower engagement",
    ],
    benefits: [
      "Creates highly engaging, visual content followers love to watch",
      "Builds trust by showing a transparent, random selection process",
      "Works on any platform; just screen-record the spin",
      "Drives engagement through interactive contest formats",
      "Free alternative to expensive giveaway tools and apps",
    ],
    tips: [
      "Always state contest rules before spinning to stay platform-compliant",
      "Use the platform's native screen recording to capture the spin",
      "Tag the winner in your post for maximum reach and engagement",
      "Run the spin live on Instagram or TikTok for real-time excitement",
      "Save your winner picks as proof in case of disputes",
    ],
    examplesIntro:
      "Social media creators use wheel pickers to grow their audience:",
    examples: [
      "An Instagram influencer picks a giveaway winner live on Stories",
      "A TikTok creator spins a content-idea wheel for their next video",
      "A brand uses the wheel to select a follower for a product review",
      "A streamer runs a wheel-decides challenge chosen by their audience",
    ],
    whyPrefix:
      "Transparent giveaways build follower trust and boost engagement.",
  },
  "Travel & Lifestyle": {
    useCases: [
      "Picking your next travel destination when everywhere sounds good",
      "Randomizing road trip stops for spontaneous adventure",
      "Choosing between bucket-list destinations for your next vacation",
      "Travel bloggers creating 'the wheel picks my trip' content",
      "Planning surprise trips where the destination is a secret until the spin",
      "Selecting a random country to learn about and add to your list",
    ],
    benefits: [
      "Breaks the analysis paralysis of choosing from endless destinations",
      "Encourages exploring places you would never pick on your own",
      "Makes trip planning exciting from the very first moment",
      "Works for any budget; just add destinations within your range",
      "Creates viral content potential for travel influencers",
    ],
    tips: [
      "Filter destinations by budget, visa requirements, or travel season",
      "Spin for the region first, then narrow down to specific cities",
      "Include at least one wildcard destination for real surprise",
      "Save separate wheels for weekend getaways versus long vacations",
      "Combine with a budget wheel for a fully randomized travel plan",
    ],
    examplesIntro:
      "Travel wheels add spontaneity to trip planning:",
    examples: [
      "A couple spins the wheel to decide their anniversary trip destination",
      "A travel vlogger lets the wheel pick which country to visit next",
      "A student uses it to choose which city's study-abroad program to apply to",
      "A family spins for their next road trip stop and discovers a hidden gem",
    ],
    whyPrefix:
      "With hundreds of amazing destinations, choosing just one can feel impossible.",
  },
};

const FALLBACK = CATEGORY_DATA["Utilities & Tools"];

function getCategoryData(category: string) {
  return CATEGORY_DATA[category] ?? FALLBACK;
}

/** Authentic first-person intros for top wheels (E-E-A-T; not mass-generated). */
const FEATURED_PERSONAL_NOTES: Record<string, string> = {
  "random-name-picker-wheel":
    "We built this name picker after teachers and streamers told us they needed a fair draw without signup friction.",
  "yes-or-no-wheel":
    "This yes-or-no wheel started as a quick decision helper for our team and grew into one of the most-used tools on the site.",
  "random-student-picker":
    "Our classroom picker was designed with teachers who wanted every student to get an equal chance to participate.",
  "team-generator-wheel":
    "We added the team generator so groups could split fairly without arguing over who goes where.",
  "winner-picker-wheel":
    "Giveaway hosts asked for a visible, trustworthy winner pick, so we made this wheel easy to screen-record and share.",
  "dinner-picker-wheel":
    "We use this dinner wheel ourselves when the team cannot agree on where to eat after work.",
  "secret-santa-wheel-generator":
    "Secret Santa season pushed us to ship a dedicated wheel that keeps pairings random and easy to run online.",
  "movie-picker-wheel":
    "Movie night indecision is real, so we published this wheel to end the scroll-and-debate loop in one spin.",
};

const BLOG_WHEEL_MAP: Record<string, string[]> = {
  "random-name-picker-wheel": ["random-name-picker-fair-fun-easy"],
  "random-student-picker": [
    "random-name-picker-fair-fun-easy",
    "best-spin-wheel-games-for-students",
  ],
  "team-generator-wheel": ["best-icebreaker-games-office-meetings"],
  "winner-picker-wheel": ["random-name-picker-fair-fun-easy"],
  "dinner-picker-wheel": ["fun-ways-decide-where-to-eat-couples"],
  "fast-food-wheel": ["fun-ways-decide-where-to-eat-couples"],
  "date-night-wheel": ["fun-ways-decide-where-to-eat-couples"],
  "secret-santa-wheel-generator": ["virtual-secret-santa-online"],
  "alphabet-spinner-wheel": ["best-spin-wheel-games-for-students"],
  "random-word-generator-wheel": ["best-spin-wheel-games-for-students"],
  "abcd-spin-wheel": ["best-spin-wheel-games-for-students"],
  "truth-or-dare-spinner-online": ["best-icebreaker-games-office-meetings"],
  "twister-spinner-online": ["best-icebreaker-games-office-meetings"],
  "family-game-night-picker-wheel": [
    "best-icebreaker-games-office-meetings",
    "best-spin-wheel-games-for-students",
  ],
  "movie-picker-wheel": ["fun-ways-decide-where-to-eat-couples"],
  "horror-movie-picker-wheel": ["fun-ways-decide-where-to-eat-couples"],
  "exercise-picker-wheel": ["best-icebreaker-games-office-meetings"],
  "instagram-wheel-picker": ["random-name-picker-fair-fun-easy"],
  "pick-out-of-a-hat-generator": ["random-name-picker-fair-fun-easy"],
};

/**
 * Extra, hand-authored sections merged in from consolidated (301-redirected)
 * doorway pages so their unique value lives on the surviving canonical page.
 * Keyed by the surviving wheel slug. Rendered on both the client page and in the
 * server-rendered HTML (see scripts/static-content.mjs) for full SSR parity.
 */
export type AbsorbedSection = {
  heading: string;
  intro: string;
  items?: string[];
  table?: {
    columns: [string, string];
    rows: Array<[string, string]>;
  };
};

const ABSORBED_SECTIONS: Record<string, AbsorbedSection[]> = {
  "zodiac-sign-wheel": [
    {
      heading: "Party Game Mode: Zodiac Sign Wheel Game",
      intro:
        "Turn the zodiac sign wheel into a party game. Load it with astrology-themed dares and tasks, then take turns spinning and acting out whatever it lands on. It is a perfect icebreaker for sleepovers, birthdays, and hangouts with astrology-loving friends. Swap in your own inside jokes to make the game as mild or as wild as your group prefers.",
      items: [
        "Act like an Aries for the next minute",
        "Guess the Scorpio's secret",
        "Tell a Gemini a joke",
        "Give a Cancer a friendly hug",
        "Let the Leo take a group selfie",
        "Do a dare chosen by a Virgo",
        "Compliment a Libra sincerely",
        "Ignore the Capricorn for one minute",
      ],
    },
    {
      heading: "Zodiac Sign Dates Table",
      intro:
        "Each Western star sign maps to a range of calendar dates. Use this quick reference to match any birthday to its zodiac sign, or to check your own sign before you spin.",
      table: {
        columns: ["Zodiac Sign", "Dates"],
        rows: [
          ["Aries", "March 21 – April 19"],
          ["Taurus", "April 20 – May 20"],
          ["Gemini", "May 21 – June 20"],
          ["Cancer", "June 21 – July 22"],
          ["Leo", "July 23 – August 22"],
          ["Virgo", "August 23 – September 22"],
          ["Libra", "September 23 – October 22"],
          ["Scorpio", "October 23 – November 21"],
          ["Sagittarius", "November 22 – December 21"],
          ["Capricorn", "December 22 – January 19"],
          ["Aquarius", "January 20 – February 18"],
          ["Pisces", "February 19 – March 20"],
        ],
      },
    },
    {
      heading: "Ruling Planets of Each Zodiac Sign",
      intro:
        "In astrology, every sign is governed by a ruling planet that shapes its core energy — Mars brings bold, fiery drive to Aries, while dreamy Neptune rules Pisces. Here is the ruling planet for each Western zodiac sign.",
      table: {
        columns: ["Zodiac Sign", "Ruling Planet"],
        rows: [
          ["Aries", "Mars"],
          ["Taurus", "Venus"],
          ["Gemini", "Mercury"],
          ["Cancer", "Moon"],
          ["Leo", "Sun"],
          ["Virgo", "Mercury"],
          ["Libra", "Venus"],
          ["Scorpio", "Pluto"],
          ["Sagittarius", "Jupiter"],
          ["Capricorn", "Saturn"],
          ["Aquarius", "Uranus"],
          ["Pisces", "Neptune"],
        ],
      },
    },
    {
      heading: "Egyptian Zodiac Signs",
      intro:
        "Ancient Egyptian astrology assigns each person to a deity rather than a constellation. These twelve gods and goddesses form the Egyptian zodiac — a mystical alternative to the Western system that is popular with mythology lovers and history fans. Edit the wheel to spin for a random Egyptian sign instead.",
      items: [
        "Nile",
        "Amon-Ra",
        "Mut",
        "Geb",
        "Osiris",
        "Isis",
        "Thoth",
        "Horus",
        "Anubis",
        "Seth",
        "Bastet",
        "Sekhmet",
      ],
    },
  ],
};

export function getAbsorbedSections(slug: string): AbsorbedSection[] {
  return ABSORBED_SECTIONS[slug] ?? [];
}

export function getEnrichedContent(page: WheelPageRecord): EnrichedContent {
  const cat = getCategoryData(page.category);
  const keyword = page.keywordPrimary || page.h1;

  const definitionSnippet = `${keyword} is a free online tool that uses cryptographic randomization to deliver fair, instant results. Enter your options, click spin, and let the wheel decide. No sign-up, no downloads, no bias.`;

  const whyUse = `${cat.whyPrefix} The ${keyword.toLowerCase()} removes that friction entirely. Instead of debating, scrolling, or overthinking, you let a single spin settle the matter in seconds. The result is powered by your browser's cryptographic random number generator, so every outcome is provably fair and impossible to predict.`;

  const conclusion = `Whether you are using it for the first time or spinning daily, the ${keyword.toLowerCase()} is designed to make your decisions faster, fairer, and more fun. Bookmark this page, share it with friends, and let the wheel do the hard work for you. If you need more tools, explore our full collection of specialty wheels on the all spin wheels page.`;

  const relatedBlogSlugs = BLOG_WHEEL_MAP[page.slug] ?? [];

  return {
    definitionSnippet,
    personalNote: FEATURED_PERSONAL_NOTES[page.slug],
    useCases: { heading: `Best Use Cases for the ${keyword}`, items: cat.useCases },
    benefits: { heading: `Benefits of Using This ${keyword}`, items: cat.benefits },
    tips: { heading: `Tips for Getting the Most Out of Your Spin`, items: cat.tips },
    examples: { heading: "Real-World Examples", items: cat.examples },
    whyUse,
    conclusion,
    relatedBlogSlugs,
  };
}

export function getRelatedBlogPosts(slugs: string[]) {
  const all = getAllBlogPosts();
  return slugs
    .map((s) => all.find((b) => b.slug === s))
    .filter(Boolean) as Array<{
    slug: string;
    title: string;
    excerpt: string;
  }>;
}
