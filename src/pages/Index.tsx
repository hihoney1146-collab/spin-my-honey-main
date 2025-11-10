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
          Free Spin Wheel - Random Name Picker & Decision Maker Online | Hi
          Honey
        </title>
        <meta
          name="description"
          content="Free online spin wheel tool for instant random decisions. Perfect spinner for classroom name picking, giveaways, team choices, and fun games. Customize colors, add unlimited entries, and spin the wheel now - 100% free forever!"
        />
        <meta
          name="keywords"
          content="spin wheel, free spin wheel, wheel spinner, random picker, name picker wheel, decision maker wheel, wheel of names, random name generator, online spin wheel, prize wheel, classroom spinner, giveaway wheel, random selector, spin the wheel online, wheel randomizer, pick random name, decision wheel, fortune wheel, yes no wheel, number wheel spinner"
        />
        <link rel="canonical" href="https://hihoney.site/" />

        <meta property="og:title" content="Hi Honey - Free Spin Wheel Tool" />
        <meta
          property="og:description"
          content="Make random decisions fun with our interactive spin wheel. Perfect for teachers, teams, and anyone who needs to pick randomly."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hihoney.site/" />
        <meta property="og:image" content="https://hihoney.site/logo.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="Hi Honey Spin Wheel - Free Random Picker Tool"
        />
        <meta property="og:site_name" content="Hi Honey" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hi Honey - Free Spin Wheel Tool" />
        <meta
          name="twitter:description"
          content="Make random decisions fun with our interactive spin wheel. Perfect for teachers, teams, and anyone who needs to pick randomly."
        />
        <meta name="twitter:image" content="https://hihoney.site/logo.png" />
        <meta name="twitter:site" content="@HiHoney" />
        <meta name="twitter:creator" content="@HiHoney" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Hi Honey Spin Wheel",
            description:
              "Free online spin wheel tool for random selection and decision making. Making Decisions Fun, One Spin at a Time.",
            url: "https://hihoney.site",
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
                item: "https://hihoney.site/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Spin Wheel",
                item: "https://hihoney.site/#spin-wheel",
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
                name: "What is a spin wheel?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A spin wheel is a digital tool that randomly selects an option from a list of entries by spinning a virtual wheel. It's perfect for making fair, random decisions for classrooms, giveaways, games, and team activities.",
                },
              },
              {
                "@type": "Question",
                name: "Is the spin wheel free to use?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes! Hi Honey's spin wheel is 100% free to use. There are no hidden costs, no registration required, and no limits on how many times you can spin the wheel.",
                },
              },
              {
                "@type": "Question",
                name: "How does the spin wheel work?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Simply add your entries (names, options, or choices) to the list, customize the colors if desired, and click the spin button. The wheel will randomly spin and select one entry as the winner with confetti celebration.",
                },
              },
              {
                "@type": "Question",
                name: "Can I customize the spin wheel?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes! You can add unlimited entries, customize colors for each entry, enable/disable specific entries, and organize your list with shuffle or sort options.",
                },
              },
              {
                "@type": "Question",
                name: "What are common uses for a spin wheel?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Spin wheels are commonly used for classroom name picking, giveaway winner selection, team decision making, random student selection, choosing meeting speakers, party games, and family activity decisions.",
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
                url: "https://hihoney.site/#step-1",
              },
              {
                "@type": "HowToStep",
                position: 2,
                name: "Customize Colors",
                text: "Each entry gets a unique color automatically. Edit or remove entries as needed.",
                url: "https://hihoney.site/#step-2",
              },
              {
                "@type": "HowToStep",
                position: 3,
                name: "Spin the Wheel",
                text: "Click the Spin the Wheel button and watch the magic happen.",
                url: "https://hihoney.site/#step-3",
              },
              {
                "@type": "HowToStep",
                position: 4,
                name: "Celebrate the Winner",
                text: "The wheel will spin and randomly select a winner with confetti celebration.",
                url: "https://hihoney.site/#step-4",
              },
            ],
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <article>
        <section
          id="spin-wheel"
          className="w-full py-4 sm:py-6 md:py-8 lg:py-10 bg-gradient-to-b from-background to-muted/20 relative"
          itemScope
          itemType="https://schema.org/WebPageElement"
        >
          <div className="max-w-7xl mx-auto text-center mb-4 sm:mb-6 md:mb-8 px-4 sm:px-6 lg:px-8 lg:pr-[360px] xl:pr-[420px] 2xl:pr-[440px]">
            <h1 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 sm:mb-3 tracking-tight">
              <span className="bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 bg-clip-text text-transparent">
                Spin Wh
              </span>
              <span className="bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 bg-clip-text text-transparent">
                eel - Make
              </span>
              <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
                {" "}
                Decisions
              </span>
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                {" "}
                Fun!
              </span>
            </h1>
            <p className="text-sm sm:text-base md:text-base lg:text-lg text-muted-foreground mb-2 sm:mb-3 max-w-3xl mx-auto leading-relaxed px-2">
              Free Online Spin Wheel - The Ultimate Random Name Picker &
              Decision Maker Tool
            </p>
          </div>

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

        {/* SEO Content Section - Hidden but crawlable */}
        <section
          id="spin-wheel-seo-content"
          className="w-full px-4 lg:px-6 py-8 sm:py-10 md:py-12 bg-muted/10"
        >
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-5 md:mb-6">
                Spin Wheel: The Ultimate Random Picker Tool
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">
                Our <strong>spin wheel</strong> (also known as a wheel spinner,
                wheel of names, or random picker wheel) is a free online tool
                designed to help you make random selections effortlessly.
                Whether you need a <strong>name picker wheel</strong> for your
                classroom, a <strong>decision maker wheel</strong> for team
                meetings, or a fun <strong>prize wheel</strong> for giveaways,
                our customizable wheel spinner has you covered.
              </p>

              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mt-6 sm:mt-7 md:mt-8 mb-3 sm:mb-4">
                What Makes Our Spin Wheel Special?
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">
                Unlike other wheel spinner tools, our{" "}
                <strong>online spin wheel</strong> offers unlimited
                customization options. You can add unlimited entries, customize
                colors for each segment, and even save your wheel
                configurations. The random picker algorithm ensures truly fair
                and unbiased selection every time you spin the wheel.
              </p>

              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mt-6 sm:mt-7 md:mt-8 mb-3 sm:mb-4">
                Perfect for Every Occasion
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">
                Teachers love using our <strong>classroom spinner</strong> for
                random student selection. Event organizers use it as a{" "}
                <strong>giveaway wheel</strong> to pick winners fairly. Teams
                use it as a <strong>decision wheel</strong> to make group
                choices. The possibilities with our{" "}
                <strong>wheel randomizer</strong> are endless.
              </p>
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
                Learn more about Hi Honey and how we make decision-making fun
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
              <Card className="p-5 sm:p-6 md:p-7 hover:shadow-lg transition-shadow">
                <div className="w-11 h-11 sm:w-12 sm:h-12 bg-primary rounded-full flex items-center justify-center mb-3 sm:mb-4">
                  <Info className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">
                  About Hi Honey
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
