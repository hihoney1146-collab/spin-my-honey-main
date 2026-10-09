import { Card } from "@/components/ui/card";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import {
  SITE_ORIGIN,
  siteIdentityJsonLd,
  articleJsonLd,
  breadcrumbListJsonLd,
  RAJA_AUTHOR,
} from "@/lib/schema";
import { ComparisonFeatureTable } from "@/components/ComparisonFeatureTable";
import { AuthorByline } from "@/components/AuthorByline";
import { getRouteLastmod } from "@/lib/routeLastmod";

const PATH = "/comparison-spin-wheel-vs-traditional-methods";
const PAGE_URL = `${SITE_ORIGIN}${PATH}`;
const TITLE = "Wheel vs Hat Draw vs Number Generator | Online Spin Wheel";
const DESCRIPTION =
  "When to use a spin wheel, a hat draw or a random number generator: how each one picks, a worked 30-name example, and the limits of each method.";

const faqs = [
  {
    q: "Is a spin wheel fairer than drawing names from a hat?",
    a: "It can be easier to trust, because everyone sees the same list and the result, and a secure random generator makes the choice instead of a hand. A hat draw with identical, well-mixed slips is fair too. The difference is how easy it is for other people to check.",
  },
  {
    q: "Can a spin wheel be rigged?",
    a: "Any tool can be rigged by whoever controls it. On this site the wheel runs in your own browser and the odds are the equal slices you set. Nothing on our side chooses the winner. If trust matters, show the list before you spin and record the screen.",
  },
  {
    q: "Should I use a random number generator for a raffle?",
    a: "If the tickets are numbered, yes, it is the direct way. Set the lowest and highest ticket number, draw, and match the number to a ticket. Use the wheel when names matter more to the room than numbers.",
  },
  {
    q: "Does Remove after pick make the draw fairer?",
    a: "It changes the rules, not the fairness. Without it, someone can win twice. With it, each person can win once. Decide which rule you want before the draw and tell people.",
  },
  {
    q: "How many names can I put on a wheel?",
    a: "The page has no fixed limit, but beyond about a dozen slices the labels get small. For a long roster, paste the list into the random name picker and turn on Remove after pick.",
  },
];

const ComparisonSpinWheelVsTraditionalMethods = () => {
  const lastUpdatedIso = getRouteLastmod(PATH);
  const lastUpdatedLabel = new Date(`${lastUpdatedIso}T12:00:00`).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  );

  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={PAGE_URL} />
        <script type="application/ld+json">
          {JSON.stringify([
            ...siteIdentityJsonLd(),
            breadcrumbListJsonLd([
              { name: "Home", url: `${SITE_ORIGIN}/` },
              { name: "Wheel vs hat draw vs number generator" },
            ]),
            articleJsonLd({
              title: "Spin wheel vs hat draw vs random number generator",
              description: DESCRIPTION,
              url: PAGE_URL,
              dateModified: lastUpdatedIso,
              authorName: RAJA_AUTHOR.name,
            }),
          ])}
        </script>
      </Helmet>

      <article className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Spin wheel, hat draw or number generator: which one fits?
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            Picking a name, a winner or an order sounds simple until someone
            asks whether it was fair. A hat, a prize wheel, a number generator
            and an online spin wheel can all be fair. They fail in different
            ways and they suit different rooms. This page compares them by how
            they actually pick, what each one needs, and where each one runs
            into trouble.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            The short version: use a spin wheel when people need to see the
            options and the result together, a number generator when the
            choices are already numbered, a hat or straws when there is no
            screen, and a coin when it is only between two.
          </p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <AuthorByline className="mb-2" variant="maintained" />
            <p className="text-sm text-muted-foreground mb-2">
              Last updated: <time dateTime={lastUpdatedIso}>{lastUpdatedLabel}</time>
            </p>
          </div>
        </header>

        <Card className="p-6 md:p-8 mb-8">
          <ComparisonFeatureTable
            title="Which method fits which situation"
            caption="Best fit by situation"
            columns={["Situation", "Best fit", "Why"]}
            rows={[
              ["Live class, meeting or stream where everyone should see the list", "Spin wheel", "The options and the result are on the same screen"],
              ["Raffle tickets numbered 1 to 500", "Number generator", "The choice is already a number, so no mapping is needed"],
              ["Deciding between two people or two options", "Coin flip", "Two outcomes and no setup"],
              ["Outdoor event with no power or screen", "Hat draw or straws", "Needs nothing but paper"],
              ["A stall where visitors walk up and spin", "Physical prize wheel", "People like a tangible prop"],
              ["Remote or hybrid call", "Online wheel with screen share", "Everyone sees the same spin"],
              ["You need a record afterwards", "Online wheel plus a screen recording", "The recording shows the draw, the proof link stores the result"],
            ]}
          />
        </Card>

        <div className="space-y-8">
          <Card className="p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              How each method picks a result
            </h2>

            <h3 className="text-xl font-semibold mt-2 mb-2">Hat draw, straws and dice</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              These rely on your hands and on the objects. A draw is only as
              fair as the slips are alike and as well mixed as they are. Slips
              folded differently, a name written on thicker paper, or a hand
              that reaches for the top of the pile can tilt the result. The
              tilt is usually small, but nobody in the room can check it. That
              is the real weakness: the fairness has to be taken on trust.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2">Physical prize wheel</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              A physical wheel picks by where friction and momentum leave the
              pointer. Equal sections only give equal odds if the wheel is
              balanced and level and the pointer does not catch more on some
              pegs than others. A wheel that is slightly off can favour some
              sections, and a worn one can drift over time. It makes a good
              prop and a poor measuring instrument.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2">Random number generator</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              A generator picks a whole number inside a range. The fairness
              question is how the number is made. A browser&apos;s secure
              generator is a sound source. A common shortcut, taking a random
              value and reducing it with a remainder, is very slightly uneven,
              but for ranges up to 1,000 the unevenness is smaller than one in
              four million, which no one will ever notice. The practical limit
              is different: you get a bare number. To pick a person you need a
              numbered list, and the audience sees nothing happen.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2">The spin wheel on this site</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              When you press the button, the wheel draws a random total
              rotation from the browser&apos;s secure random generator
              (crypto.getRandomValues, with Math.random only if that is
              missing) and plays it out. The slice under the pointer wins.
              Slices are equal in size, so every entry has the same chance
              unless you list a name more than once on purpose. The animation
              is the selection, so it cannot be changed after the fact, and
              earlier spins never influence later ones.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The draw runs on your own device. That has a consequence: nobody
              else can audit it unless they watch it or you record it. Our{" "}
              <Link to="/how-randomness-works" className="text-primary underline underline-offset-2">
                How Randomness Works
              </Link>{" "}
              page and the{" "}
              <Link to="/spin-wheel-fairness-study" className="text-primary underline underline-offset-2">
                fairness study
              </Link>{" "}
              go into more detail. The study publishes aggregate counts from
              simulated spins, not a log of every spin.
            </p>
          </Card>

          <Card className="p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              A worked example: three prizes among 30 names
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Say 30 people are in the draw and three prizes are given out. The
              rule you choose changes the odds more than the method does.
            </p>
            <ul className="space-y-3 text-muted-foreground leading-relaxed mb-4 list-disc pl-6">
              <li>
                <strong className="text-foreground">Each name leaves after it wins.</strong>{" "}
                This is a hat where you keep the drawn slip out, or the wheel
                with Remove after pick on. Each person has a 3 in 30 chance,
                exactly 10 percent, of winning a prize, and nobody wins twice.
              </li>
              <li>
                <strong className="text-foreground">Every spin uses all 30 names.</strong>{" "}
                A given person has about a 9.7 percent chance of winning at
                least once. The catch is repeats: in about one draw in ten,
                somebody wins two prizes.
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              The same arithmetic applies to a hat if you put the slip back
              each time. If repeat winners are not acceptable, say so before
              the draw and switch Remove after pick on.
            </p>
          </Card>

          <Card className="p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Remote calls and big groups
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              On a video call, a hat or a physical wheel only works if everyone
              trusts the camera angle. An online wheel shared on screen shows
              the same list to everyone, and the pointer lands in view.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              For big groups the slow part is entering the names, not the draw.
              Pasting a list is quicker than writing slips. The wheel itself is
              hard to read once it has more than about a dozen slices, so for a
              long roster use the{" "}
              <Link to="/random-name-picker-wheel" className="text-primary underline underline-offset-2">
                random name picker
              </Link>{" "}
              with Remove after pick, or number the tickets and use the{" "}
              <Link to="/random-number-wheel" className="text-primary underline underline-offset-2">
                random number wheel
              </Link>
              .
            </p>
          </Card>

          <Card className="p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Proof, records and trust
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              A hat draw leaves no record unless someone films it. On the{" "}
              <Link to="/winner-picker-wheel" className="text-primary underline underline-offset-2">
                winner picker
              </Link>{" "}
              and name picker pages, the proof link stores the winner, the
              number of entries, the time and the method label inside the link
              itself. It is a convenient record to post, not a certificate,
              because anyone can build a link of the same shape.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              When trust matters, show the list before you spin, state the
              rules in advance and record the screen.
            </p>
          </Card>

          <Card className="p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              When the older ways are the better choice
            </h2>
            <ul className="space-y-3 text-muted-foreground leading-relaxed list-disc pl-6">
              <li>There is no power, no screen or no signal, as at some outdoor events.</li>
              <li>
                It is a two-way tie. A{" "}
                <Link to="/coin-flip-wheel" className="text-primary underline underline-offset-2">
                  coin flip
                </Link>{" "}
                needs no setup at all.
              </li>
              <li>You are teaching probability and want children to handle the dice, the slips or the spinner themselves.</li>
              <li>The point is the ceremony, such as a prize wheel at a stall or a party.</li>
              <li>It is a one-off pick that is not worth setting up anything for.</li>
            </ul>
          </Card>

          <Card className="p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              What this comparison does not claim
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              It does not say one method is fairer in every case, and it does
              not compare other websites. It describes how these methods work
              and where this site&apos;s tools fit. What it says about hats and
              physical wheels is general and depends on the equipment you use.
            </p>
          </Card>

          <Card className="p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Questions people ask</h2>
            <div className="space-y-5">
              {faqs.map((f) => (
                <div key={f.q}>
                  <h3 className="text-lg font-semibold mb-1 text-foreground">{f.q}</h3>
                  <p className="text-muted-foreground leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </article>
    </>
  );
};

export default ComparisonSpinWheelVsTraditionalMethods;
