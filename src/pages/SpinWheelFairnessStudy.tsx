import { Card } from "@/components/ui/card";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Download, FlaskConical } from "lucide-react";
import {
  SITE_ORIGIN,
  RAJA_AUTHOR,
  siteIdentityJsonLd,
  articleJsonLd,
  breadcrumbListJsonLd,
} from "@/lib/schema";
import { getRouteLastmod } from "@/lib/routeLastmod";
import studyData from "@/generated/fairnessStudy.json";

const SpinWheelFairnessStudy = () => {
  const canonical = `${SITE_ORIGIN}/spin-wheel-fairness-study`;
  const ogImage = `${SITE_ORIGIN}/og/spin-wheel-fairness-study.png`;
  const allPass = studyData.summaries.every((s) => s.uniformPass);
  const lastUpdated = getRouteLastmod("/spin-wheel-fairness-study");

  return (
    <>
      <Helmet>
        <title>Spin Wheel Fairness Study: 100,000 Spins</title>
        <meta
          name="description"
          content="Original data: 100,000 automated spin-wheel simulations across segment counts. Chi-square uniformity tests, distribution tables, methodology, and downloadable CSV."
        />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content="Spin Wheel Fairness Study: 100,000 Spins" />
        <meta
          property="og:description"
          content="Original data: 100,000 automated spin-wheel simulations across segment counts. Chi-square uniformity tests, distribution tables, methodology, and downloadable CSV."
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content="Spin Wheel Fairness Study — preview" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content="Spin Wheel Fairness Study — preview" />
        <script type="application/ld+json">
          {JSON.stringify([
            ...siteIdentityJsonLd(),
            breadcrumbListJsonLd([
              { name: "Home", url: `${SITE_ORIGIN}/` },
              { name: "Spin Wheel Fairness Study" },
            ]),
            articleJsonLd({
              title: "Spin Wheel Fairness Study: 100,000 Spins",
              description:
                "100,000 automated equal-slice spin simulations with chi-square uniformity tests and downloadable CSV.",
              url: canonical,
              dateModified: lastUpdated,
              authorName: RAJA_AUTHOR.name,
            }),
          ])}
        </script>
      </Helmet>

      <article className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
        <div className="flex items-center gap-3 text-primary mb-4">
          <FlaskConical className="h-7 w-7" />
          <p className="text-sm font-semibold uppercase tracking-wide">Original research</p>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
          Spin Wheel Fairness Study
        </h1>
        <p className="text-sm text-muted-foreground mb-4">
          Last updated:{" "}
          <time dateTime={lastUpdated}>
            {new Date(`${lastUpdated}T12:00:00`).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </p>
        <p className="text-lg text-muted-foreground leading-relaxed mb-6 max-w-3xl">
          We ran {studyData.totalSpins.toLocaleString()} automated spins on equal-size wheel
          slices using the same landing-angle geometry as our live{" "}
          <Link to="/" className="text-primary hover:underline">
            spin wheel
          </Link>
          . Each configuration passed a chi-square test for uniform distribution at α = 0.05.
          Download the CSV to cite or reproduce the results.
        </p>

        <Card className="p-5 md:p-6 mb-8 border-primary/20 bg-primary/5">
          <p className="font-semibold mb-2">Summary</p>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
            <li>Total spins: {studyData.totalSpins.toLocaleString()}</li>
            <li>Spins per segment count: {studyData.spinsPerConfig.toLocaleString()}</li>
            <li>Segment counts tested: {studyData.segmentCounts.join(", ")}</li>
            <li>Method: {studyData.method}</li>
            <li>
              Uniformity result:{" "}
              {allPass ? "All configurations passed χ² at α = 0.05" : "See tables below"}
            </li>
            <li>Data as of: {studyData.generatedAt}</li>
          </ul>
          <Button asChild className="mt-4 gap-2" variant="secondary">
            <a href={studyData.csvUrl} download>
              <Download className="h-4 w-4" />
              Download CSV ({studyData.totalSpins.toLocaleString()} spin rows)
            </a>
          </Button>
        </Card>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Methodology</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              For each segment count k, we simulated {studyData.spinsPerConfig.toLocaleString()}{" "}
              independent spins. Each spin drew a landing angle with the same secure browser
              randomness used in production, then mapped the angle to a slice index using the same
              equal-arc formula as the live wheel (pointer on the right).
            </p>
            <p>
              Expected count per slice is n/k. We computed Pearson&apos;s chi-square statistic χ² =
              Σ(O−E)²/E with k−1 degrees of freedom and compared to the α = 0.05 critical value.
              Configurations with χ² ≤ critical value are consistent with a uniform distribution.
            </p>
            <p>
              This study does not cover weighted slices, removed entries mid-session, or human
              timing — only equal segments and cryptographic landing angles.
            </p>
          </div>
        </section>

        {studyData.summaries.map((summary) => (
          <section key={summary.segmentCount} className="mb-10">
            <h2 className="text-xl md:text-2xl font-bold mb-2">
              {summary.segmentCount} segments — {summary.totalSpins.toLocaleString()} spins
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              χ² = {summary.chiSquare} (df = {summary.degreesOfFreedom}, critical 0.05 ={" "}
              {summary.critical05}) —{" "}
              {summary.uniformPass ? "uniform (pass)" : "review needed"} · max deviation{" "}
              {summary.maxDeviationPct}%
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse min-w-[480px]">
                <thead>
                  <tr className="border-b border-border">
                    <th scope="col" className="text-left py-2 pr-4 font-semibold">
                      Slice index
                    </th>
                    <th scope="col" className="text-left py-2 pr-4 font-semibold">
                      Observed
                    </th>
                    <th scope="col" className="text-left py-2 pr-4 font-semibold">
                      Expected
                    </th>
                    <th scope="col" className="text-left py-2 font-semibold">
                      Deviation %
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {summary.distribution.map((row) => (
                    <tr key={row.segmentIndex} className="border-b border-border/50">
                      <td className="py-2 pr-4">{row.segmentIndex}</td>
                      <td className="py-2 pr-4">{row.observed}</td>
                      <td className="py-2 pr-4">{row.expected}</td>
                      <td className="py-2">{row.deviationPct}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">How to cite</h2>
          <p className="text-muted-foreground leading-relaxed">
            Raja Jahangir, Online Spin Wheel Fairness Study ({studyData.generatedAt}),{" "}
            {studyData.totalSpins.toLocaleString()} simulated spins,{" "}
            {SITE_ORIGIN}/spin-wheel-fairness-study, CSV: {SITE_ORIGIN}
            {studyData.csvUrl}
          </p>
        </section>

        <div className="flex flex-wrap gap-3">
          <Button asChild variant="outline">
            <Link to="/how-randomness-works">How randomness works</Link>
          </Button>
          <Button asChild>
            <Link to="/">Try the wheel</Link>
          </Button>
        </div>
      </article>
    </>
  );
};

export default SpinWheelFairnessStudy;
