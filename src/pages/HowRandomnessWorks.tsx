import { Card } from "@/components/ui/card";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { WHEEL_HUB_PATH } from "@/lib/siteInternalLinks";

const CANONICAL = "https://onlinespinwheel.fun/how-randomness-works";

const HowRandomnessWorks = () => {
  return (
    <>
      <Helmet>
        <title>How Randomness Works | Online Spin Wheel</title>
        <meta
          name="description"
          content="How the Online Spin Wheel stays fair: crypto.getRandomValues() seeds, equal-probability segments, and why every spin is independent of the last."
        />
        <link rel="canonical" href={CANONICAL} />
        <meta property="og:title" content="How Randomness Works" />
        <meta
          property="og:description"
          content="A plain-English explanation of the cryptographic randomness behind every spin, and why past results never change the next one."
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={CANONICAL} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://onlinespinwheel.fun/" },
              { "@type": "ListItem", position: 2, name: "How Randomness Works", item: CANONICAL },
            ],
          })}
        </script>
      </Helmet>

      <article className="container mx-auto px-4 py-8 md:py-12 max-w-3xl">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
            <li>
              <Link to="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="px-1">/</li>
            <li className="text-foreground font-medium">How Randomness Works</li>
          </ol>
        </nav>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
          How Randomness Works on Online Spin Wheel
        </h1>
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl">
          Every spin on Online Spin Wheel is decided by cryptographically secure
          randomness generated on your device, not by a predictable pattern or a
          rigged outcome. This page explains exactly how a winner is chosen, why
          each entry has an equal chance, and why one spin never influences the
          next.
        </p>

        <div className="space-y-6 md:space-y-8">
          <Card className="p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold mb-4">
              Where the randomness comes from
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              When you press spin, the wheel asks your browser for random data
              using <code>crypto.getRandomValues()</code>. This is the Web Crypto
              API — the same cryptographically secure source browsers use to
              generate encryption keys and secure session tokens. It draws on
              your device&apos;s hardware entropy, so the value cannot be
              predicted or reproduced.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              That matters because the common alternative, <code>Math.random()</code>,
              is only pseudo-random: it follows a deterministic formula that a
              motivated observer could anticipate. For a fair draw in front of an
              audience, cryptographic randomness is the honest choice, and it is
              what we use on every wheel.
            </p>
          </Card>

          <Card className="p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold mb-4">
              How that seed becomes a winner
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              The secure random value seeds the wheel&apos;s physics: a starting
              velocity, a friction curve, and a natural deceleration. The wheel
              is not told the answer in advance and then animated backward —
              it genuinely spins and slows to a stop, and wherever the pointer
              lands is the result.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The winning entry is simply the segment beneath the pointer. Each
              segment&apos;s probability equals its arc divided by 360 degrees, so
              when every slice is the same size, every entry has exactly the same
              chance of being chosen.
            </p>
          </Card>

          <Card className="p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold mb-4">
              Why every spin is independent
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              The wheel has no memory. Each spin requests a fresh random seed, so
              previous results have zero effect on the next outcome. A name that
              just won is exactly as likely to win again on the following spin —
              there is no &quot;due&quot; entry and no streak-balancing.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              This property is called statistical independence, and it is what
              makes the wheel trustworthy for repeated draws. If you want unique
              winners across rounds, remove each winner from the wheel after they
              are picked; otherwise, leaving them in keeps every spin a clean,
              equal-odds event.
            </p>
          </Card>

          <Card className="p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold mb-4">
              Fairness you can verify
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              All of this runs in your browser. Your entries are never sent to a
              server, so there is no hidden step where an outcome could be edited.
              Because the spin is visible and continuous, you can screen-record it
              as proof for a giveaway or classroom draw.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Ready to try it? Spin the{" "}
              <Link to="/" className="text-primary hover:underline font-medium">
                free online spin wheel
              </Link>{" "}
              on the homepage, or browse the{" "}
              <Link to={WHEEL_HUB_PATH} className="text-primary hover:underline font-medium">
                full specialty wheel directory
              </Link>
              . The same fair randomness powers every wheel on the site, from the{" "}
              <Link to="/random-name-picker-wheel" className="text-primary hover:underline font-medium">
                random name picker wheel
              </Link>{" "}
              to the{" "}
              <Link to="/winner-picker-wheel" className="text-primary hover:underline font-medium">
                winner picker wheel
              </Link>
              .
            </p>
          </Card>
        </div>
      </article>
    </>
  );
};

export default HowRandomnessWorks;
