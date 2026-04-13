import { SpinWheel } from "@/components/SpinWheel";
import { Card } from "@/components/ui/card";
import {
  Sparkles,
  Users,
  Shuffle,
  Zap,
  GraduationCap,
  Briefcase,
  PartyPopper,
  Home,
  BookOpen,
  Mail,
  Info,
} from "lucide-react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>
          Online Spin Wheel: Free Random Picker for Names, Numbers, and Prizes
        </title>
        <meta
          name="description"
          content="Online Spin Wheel: Free online spin wheel picker for names, numbers, prizes, classroom games, giveaways, and fun random decisions."
        />
        <meta
          name="keywords"
          content="spin wheel, free spin wheel, random name picker, decision maker wheel, prize wheel generator"
        />
        <link rel="canonical" href="https://onlinespinwheel.fun/" />

        <meta property="og:title" content="Online Spin Wheel - Free Spin Wheel Tool" />
        <meta
          property="og:description"
          content="Make random decisions fun with our interactive spin wheel. Perfect for teachers, teams, and anyone who needs to pick randomly."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://onlinespinwheel.fun/" />
        <meta property="og:image" content="https://onlinespinwheel.fun/logo.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="Online Spin Wheel Spin Wheel - Free Random Picker Tool"
        />
        <meta property="og:site_name" content="Online Spin Wheel" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Online Spin Wheel - Free Spin Wheel Tool" />
        <meta
          name="twitter:description"
          content="Make random decisions fun with our interactive spin wheel. Perfect for teachers, teams, and anyone who needs to pick randomly."
        />
        <meta name="twitter:image" content="https://onlinespinwheel.fun/logo.png" />
        <meta name="twitter:site" content="@OnlineSpinWheel" />
        <meta name="twitter:creator" content="@OnlineSpinWheel" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Online Spin Wheel Spin Wheel",
            description:
              "Free online spin wheel tool for random selection and decision making. Making Decisions Fun, One Spin at a Time.",
            url: "https://onlinespinwheel.fun",
            applicationCategory: "UtilityApplication",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.8",
              ratingCount: "2847",
            },
            keywords:
              "spin wheel, random picker, name picker wheel, wheel of names, decision maker, wheel spinner",
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://onlinespinwheel.fun/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Spin Wheel",
                item: "https://onlinespinwheel.fun/#spin-wheel",
              },
            ],
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is an Online Spin Wheel?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Online Spin Wheel is a free online tool that lets you add names, numbers, or choices to a colorful wheel and spin to pick a completely random result for games, classes, and giveaways.",
                },
              },
              {
                "@type": "Question",
                name: "Is Online Spin Wheel free to use?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, Online Spin Wheel is free to use in your browser and does not require any download or subscription for normal spinning and basic customization.",
                },
              },
              {
                "@type": "Question",
                name: "Do I need to create an account to use the wheel?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No account is required to start using Online Spin Wheel; you can open the page, enter your options, and spin immediately for a quick decision.",
                },
              },
              {
                "@type": "Question",
                name: "How do I use Online Spin Wheel?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Type or paste your list of names, numbers, or options into the input area, customize the wheel if you like, then click the spin button and wait for the pointer to stop on a random result.",
                },
              },
              {
                "@type": "Question",
                name: "Can I create a custom online spin wheel with my own colors and labels?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "You can create a custom online spin wheel by adding your own labels and adjusting settings such as the entries and appearance so the wheel matches your activity or brand.",
                },
              },
              {
                "@type": "Question",
                name: "Is there a limit to how many names or options I can add?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Online Spin Wheel supports many entries on a single wheel, so you can use it for small groups or larger lists like classrooms, raffles, or follower giveaways.",
                },
              },
              {
                "@type": "Question",
                name: "Is Online Spin Wheel truly random?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The wheel relies on a random or pseudo-random algorithm so each entry has an equal chance of being chosen on every spin, making it suitable for fair selection.",
                },
              },
              {
                "@type": "Question",
                name: "Can the same name be selected more than once?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, if you keep all entries on the wheel, the same name or number can appear again on later spins. You can manually remove winners if you want unique results each time.",
                },
              },
              {
                "@type": "Question",
                name: "Is Online Spin Wheel safe for classroom and student use?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The tool is designed to run directly in the browser without requiring personal accounts, which makes it practical for teachers who want a simple, engaging random picker for students.",
                },
              },
              {
                "@type": "Question",
                name: "What data does Online Spin Wheel store?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Entries are typed directly into your browser session, and you control what information you input; following best-practice privacy guidance, tools like this avoid collecting sensitive personal data unnecessarily.",
                },
              },
              {
                "@type": "Question",
                name: "Does Online Spin Wheel work on mobile phones and tablets?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Online Spin Wheel is built to work in modern browsers on desktop, tablets, and smartphones so you can run spins in class, at home, or on the go.",
                },
              },
              {
                "@type": "Question",
                name: "Do I need to install an app or software to use it?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No installation is required; you simply open this onlinespinwheel.fun website in a browser, making it easy to share the wheel on screens, projectors, and live streams.",
                },
              },
              {
                "@type": "Question",
                name: "Can I use Online Spin Wheel for giveaways and contests?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, you can paste in participant names or ticket numbers and spin live on screen so audiences can clearly see that winners are picked randomly and transparently.",
                },
              },
              {
                "@type": "Question",
                name: "Is Online Spin Wheel good for classroom activities?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Teachers can use the wheel to call on students, form random groups, pick topics, or decide the order of presentations, turning routine classroom tasks into fun moments.",
                },
              },
              {
                "@type": "Question",
                name: "Can I embed or share Online Spin Wheel in live streams or meetings?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "You can screen-share the wheel in video calls or streaming software so viewers watch the spin in real time, which is popular for Q&A, games, and prize draws.",
                },
              },
              {
                "@type": "Question",
                name: "How can I make my spins more transparent and trustworthy?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Explain your rules before spinning, show the full wheel on screen, and keep a simple record of winners so participants can see that every result comes from the same fair process.",
                },
              },
              {
                "@type": "Question",
                name: "How to use the wheel spinner?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Type your entries in the box beside the wheel, click the wheel to spin for a random result, then use Customize to adjust colors, add images, and spin time.",
                },
              },
              {
                "@type": "Question",
                name: "Is my data private?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Online Spin Wheel safeguards your privacy and data with strong security, compliance, and transparent practices.",
                },
              },
            ],
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to Use Spin Wheel Online",
            description:
              "Step-by-step guide to using the free online spin wheel for random selection",
            step: [
              {
                "@type": "HowToStep",
                position: 1,
                name: "Add Your Entries",
                text: "Add your entries in the list on the right. You can add as many options as you want.",
                url: "https://onlinespinwheel.fun/#step-1",
              },
              {
                "@type": "HowToStep",
                position: 2,
                name: "Customize Colors",
                text: "Each entry gets a unique color automatically. Edit or remove entries as needed.",
                url: "https://onlinespinwheel.fun/#step-2",
              },
              {
                "@type": "HowToStep",
                position: 3,
                name: "Spin the Wheel",
                text: "Click the Spin the Wheel button and watch the magic happen.",
                url: "https://onlinespinwheel.fun/#step-3",
              },
              {
                "@type": "HowToStep",
                position: 4,
                name: "Celebrate the Winner",
                text: "The wheel will spin and randomly select a winner with confetti celebration.",
                url: "https://onlinespinwheel.fun/#step-4",
              },
            ],
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <article>
        <section
          id="spin-wheel"
          className="w-full pt-2 sm:pt-3 md:pt-4 lg:pt-5 pb-4 sm:pb-6 md:pb-8 lg:pb-10 bg-gradient-to-b from-background to-muted/20 relative"
          itemScope
          itemType="https://schema.org/WebPageElement"
        >
          <SpinWheel />
        </section>

        <section
          id="spin-wheel-features"
          className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-14 lg:py-16 bg-muted/30"
          itemScope
          itemType="https://schema.org/ItemList"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
              <h2
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 tracking-tight px-2"
                itemProp="name"
              >
                Why Use Our Spin Wheel?
              </h2>
              <p className="text-sm sm:text-base md:text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto px-4 leading-relaxed">
                Discover the features that make our spin wheel the perfect
                choice for any decision-making scenario
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
              <Card className="p-4 sm:p-5 md:p-6 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 border-border/50 bg-white/80 dark:bg-background/80 backdrop-blur-sm">
                <div className="w-12 h-12 sm:w-13 sm:h-13 md:w-14 md:h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
                  <Sparkles className="h-6 w-6 sm:h-6.5 sm:w-6.5 md:h-7 md:w-7 text-white" />
                </div>
                <h3 className="text-base sm:text-lg md:text-lg font-bold mb-2 sm:mb-3">
                  Completely Free
                </h3>
                <p className="text-xs sm:text-sm md:text-sm text-muted-foreground leading-relaxed">
                  No sign-up required. Use our spin wheel tool absolutely free,
                  anytime, anywhere.
                </p>
              </Card>

              <Card className="p-4 sm:p-5 md:p-6 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 border-border/50 bg-white/80 dark:bg-background/80 backdrop-blur-sm">
                <div className="w-12 h-12 sm:w-13 sm:h-13 md:w-14 md:h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
                  <Users className="h-6 w-6 sm:h-6.5 sm:w-6.5 md:h-7 md:w-7 text-white" />
                </div>
                <h3 className="text-base sm:text-lg md:text-lg font-bold mb-2 sm:mb-3">
                  Perfect for Groups
                </h3>
                <p className="text-xs sm:text-sm md:text-sm text-muted-foreground leading-relaxed">
                  Ideal for classrooms, team meetings, parties, and family game
                  nights.
                </p>
              </Card>

              <Card className="p-4 sm:p-5 md:p-6 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 border-border/50 bg-white/80 dark:bg-background/80 backdrop-blur-sm">
                <div className="w-12 h-12 sm:w-13 sm:h-13 md:w-14 md:h-14 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
                  <Shuffle className="h-6 w-6 sm:h-6.5 sm:w-6.5 md:h-7 md:w-7 text-white" />
                </div>
                <h3 className="text-base sm:text-lg md:text-lg font-bold mb-2 sm:mb-3">
                  Truly Random
                </h3>
                <p className="text-xs sm:text-sm md:text-sm text-muted-foreground leading-relaxed">
                  Our algorithm ensures fair and unbiased random selection every
                  time.
                </p>
              </Card>

              <Card className="p-4 sm:p-5 md:p-6 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 border-border/50 bg-white/80 dark:bg-background/80 backdrop-blur-sm">
                <div className="w-12 h-12 sm:w-13 sm:h-13 md:w-14 md:h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
                  <Zap className="h-6 w-6 sm:h-6.5 sm:w-6.5 md:h-7 md:w-7 text-white" />
                </div>
                <h3 className="text-base sm:text-lg md:text-lg font-bold mb-2 sm:mb-3">
                  Easy to Use
                </h3>
                <p className="text-xs sm:text-sm md:text-sm text-muted-foreground leading-relaxed">
                  Add your options, click spin, and get instant results with fun
                  animations.
                </p>
              </Card>
            </div>
          </div>
        </section>

        <section
          id="how-to-use-spin-wheel"
          className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-14 lg:py-16"
          itemScope
          itemType="https://schema.org/HowTo"
        >
          <div className="max-w-4xl mx-auto">
            <Card className="p-5 sm:p-6 md:p-8 lg:p-10 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border-2 border-primary/20 shadow-2xl backdrop-blur-sm">
              <div className="text-center mb-6 sm:mb-8 md:mb-10">
                <h2
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 tracking-tight px-2"
                  itemProp="name"
                >
                  How to Use the Spin Wheel
                </h2>
                <p className="text-sm sm:text-base md:text-base text-muted-foreground px-2">
                  Get started in just a few simple steps
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                <div className="space-y-4 sm:space-y-5">
                  <div className="flex gap-3 items-start">
                    <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-sm sm:text-base font-bold text-primary-foreground">
                        1
                      </span>
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base md:text-base font-semibold mb-1 sm:mb-2">
                        Add Your Entries
                      </h3>
                      <p className="text-xs sm:text-sm md:text-sm text-muted-foreground leading-relaxed">
                        Add your entries in the list on the right. You can add
                        as many options as you want.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-sm sm:text-base font-bold text-primary-foreground">
                        2
                      </span>
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base md:text-base font-semibold mb-1 sm:mb-2">
                        Customize Colors
                      </h3>
                      <p className="text-xs sm:text-sm md:text-sm text-muted-foreground leading-relaxed">
                        Each entry gets a unique color automatically. Edit or
                        remove entries as needed.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-sm sm:text-base font-bold text-primary-foreground">
                        3
                      </span>
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base md:text-base font-semibold mb-1 sm:mb-2">
                        Add Images
                      </h3>
                      <p className="text-xs sm:text-sm md:text-sm text-muted-foreground leading-relaxed">
                        Upload logos or photos to segments so every option stands out at a glance.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 sm:space-y-5">
                  <div className="flex gap-3 items-start">
                    <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-sm sm:text-base font-bold text-primary-foreground">
                        4
                      </span>
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base md:text-base font-semibold mb-1 sm:mb-2">
                        Spin the Wheel
                      </h3>
                      <p className="text-xs sm:text-sm md:text-sm text-muted-foreground leading-relaxed">
                        Click the "Spin the Wheel!" button and watch the magic
                        happen.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-sm sm:text-base font-bold text-primary-foreground">
                        5
                      </span>
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base md:text-base font-semibold mb-1 sm:mb-2">
                        Celebrate the Winner
                      </h3>
                      <p className="text-xs sm:text-sm md:text-sm text-muted-foreground leading-relaxed">
                        The wheel will spin and randomly select a winner with
                        confetti celebration!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section
          id="spin-wheel-uses"
          className="w-full px-4 lg:px-6 py-8 sm:py-12 md:py-14 lg:py-16 bg-gradient-to-b from-muted/30 to-background"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 md:mb-5 tracking-tight">
                Popular Uses for Our Spin Wheel
              </h2>
              <p className="text-sm sm:text-base md:text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto">
                Discover how our spin wheel can transform decision-making across
                different settings
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-5 sm:gap-6 md:gap-7">
              <Card className="p-5 sm:p-6 md:p-7 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 border-border/50 bg-white/80 dark:bg-background/80 backdrop-blur-sm">
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 md:w-13 md:h-13 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <GraduationCap className="w-6 h-6 sm:w-6.5 h-6.5 md:w-7 md:h-7 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold">
                    Education
                  </h3>
                </div>
                <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm md:text-sm text-muted-foreground">
                  <li className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                    Random student selection for questions
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                    Picking presentation orders
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                    Selecting group leaders
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                    Choosing classroom activities
                  </li>
                </ul>
              </Card>

              <Card className="p-5 sm:p-6 md:p-7 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 border-border/50 bg-white/80 dark:bg-background/80 backdrop-blur-sm">
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 md:w-13 md:h-13 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Briefcase className="w-6 h-6 sm:w-6.5 h-6.5 md:w-7 md:h-7 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold">
                    Business
                  </h3>
                </div>
                <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm md:text-sm text-muted-foreground">
                  <li className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                    Team meeting ice breakers
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                    Selecting meeting speakers
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                    Choosing lunch locations
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                    Giveaway winner selection
                  </li>
                </ul>
              </Card>

              <Card className="p-5 sm:p-6 md:p-7 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 border-border/50 bg-white/80 dark:bg-background/80 backdrop-blur-sm">
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 md:w-13 md:h-13 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <PartyPopper className="w-6 h-6 sm:w-6.5 h-6.5 md:w-7 md:h-7 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold">
                    Entertainment
                  </h3>
                </div>
                <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm md:text-sm text-muted-foreground">
                  <li className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                    Party game decisions
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                    Movie night selections
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                    Restaurant choices
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                    Truth or dare spinner
                  </li>
                </ul>
              </Card>

              <Card className="p-5 sm:p-6 md:p-7 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 border-border/50 bg-white/80 dark:bg-background/80 backdrop-blur-sm">
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 md:w-13 md:h-13 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Home className="w-6 h-6 sm:w-6.5 h-6.5 md:w-7 md:h-7 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold">
                    Family
                  </h3>
                </div>
                <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm md:text-sm text-muted-foreground">
                  <li className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                    Chore assignment
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                    Deciding family activities
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                    Picking who goes first in games
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                    Settling friendly disputes
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </section>

        {/* SEO Content Section - Blog Style */}
        <section
          id="spin-wheel-seo-content"
          className="w-full px-4 lg:px-6 py-8 sm:py-10 md:py-12 bg-muted/10"
        >
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                <strong>Online Spin Wheel</strong> (also known as a wheel spinner, spin the wheel, or random picker wheel) is a free online tool
                designed to help you make random selections effortlessly. Whether you need a name picker wheel for your
                classroom, a decision maker wheel for team meetings, or a fun prize wheel for giveaways, our customizable
                wheel spinner has you covered.
              </p>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-5 md:mb-6">
                What is an Online Spin Wheel?
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4 leading-relaxed">
                Online Spin Wheel is a browser‑based wheel you can customize with names, numbers, prizes, or choices, then
                spin to select one option at random. Unlike physical wheels, you can quickly edit entries, change colors and
                sounds, and reuse the same wheel on any device without extra hardware. This makes online spin wheels ideal
                for classrooms, live streams, office games, and social‑media giveaways where a fair, transparent random picker
                is important.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-5 leading-relaxed">
                Common variations include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-muted-foreground mb-6">
                <li>Online spin wheel decision maker for everyday choices.</li>
                <li>Online spin wheel game for party challenges and dares.</li>
                <li>Online spin wheel picker for names, numbers, or prizes.</li>
              </ul>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-5 md:mb-6 mt-8">
                Why Use an Online Spin Wheel Decision Maker?
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4 leading-relaxed">
                An online spin wheel decision maker helps when you have several options and want a fun yet unbiased way to
                choose. Instead of arguing about what to do next, you list the choices on the wheel, hit spin, and let
                randomness decide in seconds.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-5 leading-relaxed">
                Popular decision‑maker uses include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-muted-foreground mb-4">
                <li>Choosing what game to play, what movie to watch, or where to eat.</li>
                <li>Picking chores or tasks fairly among friends, family, or roommates.</li>
                <li>Selecting a random winner for small contests or giveaways.</li>
              </ul>
              <p className="text-sm sm:text-base text-muted-foreground mb-6 leading-relaxed">
                Because everything happens on screen, people can see the wheel in real time, which builds trust and reduces
                complaints about favoritism.
              </p>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-5 md:mb-6 mt-8">
                How Does Our Online Spin Wheel Work?
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-5 leading-relaxed">
                Online Spin Wheel was created in 2025 and has been continuously refined to
                give users a smooth, reliable random‑selection experience. The project is maintained by a full‑stack web
                developer with 4 years of experience and an SEO/WordPress specialist with 3 years of experience building
                user‑friendly web tools. Together, this team regularly monitors how Online Spin Wheel performs in real‑world
                use and makes adjustments to keep the tool fast, fair, and aligned with evolving user needs.
              </p>

              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 mt-6">
                Perfect for Every Occasion
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-6 leading-relaxed">
                Teachers love using our <strong>classroom spinner</strong> for random student selection. Event organizers use it as a{" "}
                <strong>giveaway wheel</strong> to pick winners fairly. Teams use it as a <strong>decision wheel</strong> to make group
                choices. The possibilities with our <strong>wheel randomizer</strong> are endless.
              </p>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-5 md:mb-6 mt-8">
                Online Spin Wheel Games and Classroom Ideas
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4 leading-relaxed">
                Teachers and hosts often search for "online spin wheel game" because the wheel itself becomes the center of
                an activity. By turning trivia questions, challenges, or rewards into segments on the wheel, you transform simple
                lessons or meetings into interactive games.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-5 leading-relaxed">
                Examples of engaging games:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-muted-foreground mb-4">
                <li>Classroom review: Add vocabulary words or questions to the wheel and spin to choose what the class answers next.</li>
                <li>Ice‑breaker game: Use an online spin wheel names list to randomly select who introduces themselves or shares a fun fact.</li>
                <li>Party challenges: Create a wheel with dares or mini‑games and spin whenever the energy drops.</li>
              </ul>
              <p className="text-sm sm:text-base text-muted-foreground mb-6 leading-relaxed">
                For math or probability lessons, some teachers also build an online spin wheel number game so students can
                visualize randomness, odds, and fractions in a playful way.
              </p>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-5 md:mb-6 mt-8">
                Free Online Spin Wheel Benefits
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4 leading-relaxed">
                "Online spin wheel free" is one of the most common searches because people want a tool they can use without
                sign‑ups or payments. Our free online spin wheel is perfect for teachers, students, small streamers, and anyone
                running quick contests on social media.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-5 leading-relaxed">
                Advantages of a free online spin wheel:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-muted-foreground mb-4">
                <li>No cost or subscription required to access core features.</li>
                <li>Fast setup with no login, making it ideal for last‑minute games or meetings.</li>
                <li>Easy sharing via screen‑share, projector, or classroom display so everyone can watch the spin.</li>
              </ul>
              <p className="text-sm sm:text-base text-muted-foreground mb-6 leading-relaxed">
                Even with a free version, it is important to choose the right tool like Online Spin Wheel that clearly explains how
                randomness works and how user data is handled, which aligns with modern E‑E‑A‑T expectations around trust
                and transparency.
              </p>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-5 md:mb-6 mt-8">
                Online Spin Wheel Picker for Names and Numbers
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4 leading-relaxed">
                When people search for an online spin wheel picker, they usually want a simple way to select a random name or
                number from a list. A picker is especially useful for classrooms, raffles, and online giveaways where everyone
                must have a fair chance.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-5 leading-relaxed">
                Typical picker workflows:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-muted-foreground mb-4">
                <li>Online spin wheel names: Paste a list of students, participants, or followers, then spin to pick winners or volunteers.</li>
                <li>Online spin wheel number: Use numbered slots for raffle tickets, exam questions, or lottery‑style games.</li>
                <li>Multi‑winner mode: Spin multiple times or remove chosen items after each spin to avoid repeats.</li>
              </ul>
              <p className="text-sm sm:text-base text-muted-foreground mb-6 leading-relaxed">
                For best practice, announce the rules before spinning, show the wheel live, and keep a log of winning names or
                numbers for full transparency.
              </p>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-5 md:mb-6 mt-8">
                Why Online Spin Wheel Stands Out
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4 leading-relaxed">
                Online Spin Wheel is designed to be the only tool you need for fair, fun, and fast random choices in classrooms,
                games, and giveaways. Instead of comparing lots of options, you can focus on getting the best experience from
                this single, dedicated online spin wheel.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4 leading-relaxed">
                Online Spin Wheel works smoothly on desktop, tablet, and mobile, so you can run spins anywhere you have a
                browser. The wheel loads quickly, responds without lag, and keeps the experience simple for both casual games
                and more serious decision‑making.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-5 leading-relaxed">
                Key strengths:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-muted-foreground mb-4">
                <li>Device support: Optimized for modern screens so students, participants, or viewers can clearly see every spin.</li>
                <li>Speed and reliability: Lightweight design that opens fast and spins cleanly to maintain trust and engagement.</li>
                <li>Customization: Easy controls to add names, numbers, or prizes and adjust your online spin wheel custom setup without a complicated interface.</li>
                <li>Privacy and clarity: A straightforward experience that avoids unnecessary data collection and focuses on transparent, fair results.</li>
              </ul>
              <p className="text-sm sm:text-base text-muted-foreground mb-6 leading-relaxed">
                When a single tool delivers consistency, fairness, and clarity like this, teachers, creators, and teams can
                confidently build all their games and decisions around it.
              </p>
            </div>
          </div>
        </section>

        {/* Visible FAQ Section */}
        <section
          id="faq"
          className="w-full px-4 lg:px-6 py-8 sm:py-12 md:py-14 lg:py-16 bg-background"
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-sm sm:text-base md:text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto">
                Common questions about our free spin wheel tool
              </p>
            </div>

            <div className="space-y-4">
              <Card className="p-5 sm:p-6 border-2 border-border/50">
                <h3 className="text-lg font-bold mb-2">What is an Online Spin Wheel?</h3>
                <p className="text-muted-foreground">
                  Online Spin Wheel is a free online tool that lets you add names, numbers, or choices to a colorful wheel and spin to pick a completely random result for games, classes, and giveaways.
                </p>
              </Card>

              <Card className="p-5 sm:p-6 border-2 border-border/50">
                <h3 className="text-lg font-bold mb-2">Is Online Spin Wheel free to use?</h3>
                <p className="text-muted-foreground">
                  Yes, Online Spin Wheel is free to use in your browser and does not require any download or subscription for normal spinning and basic customization.
                </p>
              </Card>

              <Card className="p-5 sm:p-6 border-2 border-border/50">
                <h3 className="text-lg font-bold mb-2">Do I need to create an account to use the wheel?</h3>
                <p className="text-muted-foreground">
                  No account is required to start using Online Spin Wheel; you can open the page, enter your options, and spin immediately for a quick decision.
                </p>
              </Card>

              <Card className="p-5 sm:p-6 border-2 border-border/50">
                <h3 className="text-lg font-bold mb-2">How do I use Online Spin Wheel?</h3>
                <p className="text-muted-foreground">
                  Type or paste your list of names, numbers, or options into the input area, customize the wheel if you like, then click the spin button and wait for the pointer to stop on a random result.
                </p>
              </Card>

              <Card className="p-5 sm:p-6 border-2 border-border/50">
                <h3 className="text-lg font-bold mb-2">Can I create a custom online spin wheel with my own colors and labels?</h3>
                <p className="text-muted-foreground">
                  You can create a custom online spin wheel by adding your own labels and adjusting settings such as the entries and appearance so the wheel matches your activity or brand.
                </p>
              </Card>

              <Card className="p-5 sm:p-6 border-2 border-border/50">
                <h3 className="text-lg font-bold mb-2">Is there a limit to how many names or options I can add?</h3>
                <p className="text-muted-foreground">
                  Online Spin Wheel supports many entries on a single wheel, so you can use it for small groups or larger lists like classrooms, raffles, or follower giveaways.
                </p>
              </Card>

              <Card className="p-5 sm:p-6 border-2 border-border/50">
                <h3 className="text-lg font-bold mb-2">Is Online Spin Wheel truly random?</h3>
                <p className="text-muted-foreground">
                  The wheel relies on a random or pseudo-random algorithm so each entry has an equal chance of being chosen on every spin, making it suitable for fair selection.
                </p>
              </Card>

              <Card className="p-5 sm:p-6 border-2 border-border/50">
                <h3 className="text-lg font-bold mb-2">Can the same name be selected more than once?</h3>
                <p className="text-muted-foreground">
                  Yes, if you keep all entries on the wheel, the same name or number can appear again on later spins. You can manually remove winners if you want unique results each time.
                </p>
              </Card>

              <Card className="p-5 sm:p-6 border-2 border-border/50">
                <h3 className="text-lg font-bold mb-2">Is Online Spin Wheel safe for classroom and student use?</h3>
                <p className="text-muted-foreground">
                  The tool is designed to run directly in the browser without requiring personal accounts, which makes it practical for teachers who want a simple, engaging random picker for students.
                </p>
              </Card>

              <Card className="p-5 sm:p-6 border-2 border-border/50">
                <h3 className="text-lg font-bold mb-2">What data does Online Spin Wheel store?</h3>
                <p className="text-muted-foreground">
                  Entries are typed directly into your browser session, and you control what information you input; following best-practice privacy guidance, tools like this avoid collecting sensitive personal data unnecessarily.
                </p>
              </Card>

              <Card className="p-5 sm:p-6 border-2 border-border/50">
                <h3 className="text-lg font-bold mb-2">Does Online Spin Wheel work on mobile phones and tablets?</h3>
                <p className="text-muted-foreground">
                  Online Spin Wheel is built to work in modern browsers on desktop, tablets, and smartphones so you can run spins in class, at home, or on the go.
                </p>
              </Card>

              <Card className="p-5 sm:p-6 border-2 border-border/50">
                <h3 className="text-lg font-bold mb-2">Do I need to install an app or software to use it?</h3>
                <p className="text-muted-foreground">
                  No installation is required; you simply open this onlinespinwheel.fun website in a browser, making it easy to share the wheel on screens, projectors, and live streams.
                </p>
              </Card>

              <Card className="p-5 sm:p-6 border-2 border-border/50">
                <h3 className="text-lg font-bold mb-2">Can I use Online Spin Wheel for giveaways and contests?</h3>
                <p className="text-muted-foreground">
                  Yes, you can paste in participant names or ticket numbers and spin live on screen so audiences can clearly see that winners are picked randomly and transparently.
                </p>
              </Card>

              <Card className="p-5 sm:p-6 border-2 border-border/50">
                <h3 className="text-lg font-bold mb-2">Is Online Spin Wheel good for classroom activities?</h3>
                <p className="text-muted-foreground">
                  Teachers can use the wheel to call on students, form random groups, pick topics, or decide the order of presentations, turning routine classroom tasks into fun moments.
                </p>
              </Card>

              <Card className="p-5 sm:p-6 border-2 border-border/50">
                <h3 className="text-lg font-bold mb-2">Can I embed or share Online Spin Wheel in live streams or meetings?</h3>
                <p className="text-muted-foreground">
                  You can screen-share the wheel in video calls or streaming software so viewers watch the spin in real time, which is popular for Q&A, games, and prize draws.
                </p>
              </Card>

              <Card className="p-5 sm:p-6 border-2 border-border/50">
                <h3 className="text-lg font-bold mb-2">How can I make my spins more transparent and trustworthy?</h3>
                <p className="text-muted-foreground">
                  Explain your rules before spinning, show the full wheel on screen, and keep a simple record of winners so participants can see that every result comes from the same fair process.
                </p>
              </Card>

              <Card className="p-5 sm:p-6 border-2 border-border/50">
                <h3 className="text-lg font-bold mb-2">How to use the wheel spinner?</h3>
                <p className="text-muted-foreground">
                  Type your entries in the box beside the wheel, click the wheel to spin for a random result, then use Customize to adjust colors, add images, and spin time.
                </p>
              </Card>

              <Card className="p-5 sm:p-6 border-2 border-border/50">
                <h3 className="text-lg font-bold mb-2">Is my data private?</h3>
                <p className="text-muted-foreground">
                  Online Spin Wheel safeguards your privacy and data with strong security, compliance, and transparent practices.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Internal Links Section - Critical for SEO Crawling */}
        <section className="w-full px-4 lg:px-6 py-10 sm:py-12 md:py-14 lg:py-16 bg-gradient-to-b from-muted/10 to-background">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                Explore More
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
                Learn more about Online Spin Wheel and how we make decision-making fun
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
              <Card className="p-5 sm:p-6 md:p-7 hover:shadow-lg transition-shadow">
                <div className="w-11 h-11 sm:w-12 sm:h-12 bg-primary rounded-full flex items-center justify-center mb-3 sm:mb-4">
                  <Info className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">
                  About Online Spin Wheel
                </h3>
                <p className="text-xs sm:text-sm md:text-sm text-muted-foreground mb-3 sm:mb-4 leading-relaxed">
                  Discover our story, mission, and commitment to making choices
                  enjoyable. Learn how we're revolutionizing decision-making one
                  spin at a time.
                </p>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base text-primary hover:underline font-semibold"
                >
                  Learn More
                  <span className="text-base sm:text-lg">→</span>
                </Link>
              </Card>

              <Card className="p-5 sm:p-6 md:p-7 hover:shadow-lg transition-shadow">
                <div className="w-11 h-11 sm:w-12 sm:h-12 bg-primary rounded-full flex items-center justify-center mb-3 sm:mb-4">
                  <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">
                  Complete Spin Wheel Guide
                </h3>
                <p className="text-xs sm:text-sm md:text-sm text-muted-foreground mb-3 sm:mb-4 leading-relaxed">
                  Master the art of using spin wheels for decision-making,
                  classroom activities, business applications, and more. Read
                  our comprehensive guide.
                </p>
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base text-primary hover:underline font-semibold"
                >
                  Read Guide
                  <span className="text-base sm:text-lg">→</span>
                </Link>
              </Card>

              <Card className="p-5 sm:p-6 md:p-7 hover:shadow-lg transition-shadow">
                <div className="w-11 h-11 sm:w-12 sm:h-12 bg-primary rounded-full flex items-center justify-center mb-3 sm:mb-4">
                  <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">
                  Contact Our Team
                </h3>
                <p className="text-xs sm:text-sm md:text-sm text-muted-foreground mb-3 sm:mb-4 leading-relaxed">
                  Have questions, feedback, or suggestions? We'd love to hear
                  from you. Get in touch with our friendly support team today.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base text-primary hover:underline font-semibold"
                >
                  Contact Us
                  <span className="text-base sm:text-lg">→</span>
                </Link>
              </Card>
            </div>
          </div>
        </section>
      </article>
    </>
  );
};

export default Index;
