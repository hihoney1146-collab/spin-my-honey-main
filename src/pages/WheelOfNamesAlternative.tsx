import { Card } from "@/components/ui/card";
import { Helmet } from "react-helmet";
import { GitCompare, CheckCircle2, MinusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import {
  SITE_ORIGIN,
  RAJA_AUTHOR,
  siteIdentityJsonLd,
  articleJsonLd,
  breadcrumbListJsonLd,
  faqPageJsonLd,
} from "@/lib/schema";

const FAQS = [
  {
    q: "Do I need an account to use Online Spin Wheel?",
    a: "No. Core spinning works without signup. Your entries stay in the browser on your device.",
  },
  {
    q: "How is Online Spin Wheel different from a generic name spinner?",
    a: "Besides a free name picker, we publish 40+ specialty pages — raffles, classroom hubs, prize wheels — plus multi-winner proof links and ticket-number raffle mode.",
  },
  {
    q: "Do my names get uploaded to a server?",
    a: "No. Entries are processed in your browser and stay on your device. We do not require you to store lists online to spin.",
  },
  {
    q: "Which tool is best for Instagram giveaways?",
    a: "Look for multi-winner draws and shareable proof links. Our winner picker and raffle wheels support both; many generic pickers only offer manual remove-after-spin.",
  },
  {
    q: "Can I import a class list?",
    a: "Yes — paste one name per line (up to 400). The classroom spinner hub adds remove-after-pick, teams, and a timer for teachers.",
  },
];

type Row = {
  feature: string;
  ours: string;
  others: string;
};

const TABLE_ROWS: Row[] = [
  {
    feature: "Account required",
    ours: "No",
    others: "Varies — some require signup for extra entries or saving",
  },
  {
    feature: "Entries stay on your device",
    ours: "Yes, browser-only processing",
    others: "Varies — some process/store entries on a server",
  },
  {
    feature: "Image slices on wheel",
    ours: "Yes",
    others: "Varies",
  },
  {
    feature: "Specialty tool pages (40+)",
    ours: "Yes — raffles, classrooms, prizes",
    others: "Typically a single generic wheel",
  },
  {
    feature: "Multi-winner + proof link",
    ours: "Yes, raffle & winner wheels",
    others: "Often manual remove-after-spin",
  },
  {
    feature: "Classroom hub (picker + teams + timer)",
    ours: "Yes, classroom spinner page",
    others: "Often name picker only",
  },
  {
    feature: "Ticket-number raffle mode",
    ours: "Yes, raffle wheel",
    others: "Often requires manual numeric entries",
  },
];

const WheelOfNamesAlternative = () => {
  const canonical = `${SITE_ORIGIN}/wheel-of-names-alternative`;
  const title = "Online Spin Wheel — Feature Comparison";

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta
          name="description"
          content="Compare Online Spin Wheel with other free pickers: no account, browser-only entries, 40+ specialty pages, raffle proof links, and a classroom hub."
        />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">
          {JSON.stringify([
            ...siteIdentityJsonLd(),
            breadcrumbListJsonLd([
              { name: "Home", url: `${SITE_ORIGIN}/` },
              { name: "Comparisons", url: `${SITE_ORIGIN}/all-spin-wheels` },
              { name: "Feature Comparison" },
            ]),
            articleJsonLd({
              title,
              description:
                "Feature comparison of Online Spin Wheel versus other free online pickers and spinner apps.",
              url: canonical,
              dateModified: "2026-07-14",
              authorName: RAJA_AUTHOR.name,
            }),
            faqPageJsonLd(FAQS.map((f) => ({ q: f.q, a: f.a }))),
          ])}
        </script>
      </Helmet>

      <article className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
        <div className="text-center mb-8 md:mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <GitCompare className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Online Spin Wheel — Feature Comparison
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            See how Online Spin Wheel compares with other free online pickers and
            spinner apps — what we include by default, and what often varies
            elsewhere.
          </p>
        </div>

        <Card className="p-6 md:p-8 mb-8">
          <p className="text-muted-foreground leading-relaxed mb-4">
            Online Spin Wheel is a free browser spinner for classrooms, meetings,
            and giveaways. Beyond a basic name list, we ship specialty pages for{" "}
            <Link to="/raffle-wheel" className="text-primary font-medium hover:underline">
              raffles
            </Link>
            ,{" "}
            <Link to="/prize-wheel" className="text-primary font-medium hover:underline">
              prize spins
            </Link>
            , and a{" "}
            <Link to="/classroom-spinner" className="text-primary font-medium hover:underline">
              classroom hub
            </Link>
            — all without signup, with entries processed on your device.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Try our{" "}
            <Link to="/random-name-picker-wheel" className="text-primary font-medium hover:underline">
              random name picker wheel
            </Link>{" "}
            for a direct name-list spinner.
          </p>
        </Card>

        <Card className="p-4 md:p-6 mb-8 overflow-x-auto">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Feature comparison</h2>
          <table className="w-full text-sm md:text-base border-collapse min-w-[520px]">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 pr-4 font-semibold">Feature</th>
                <th className="text-left py-3 pr-4 font-semibold text-primary">
                  Online Spin Wheel (Us)
                </th>
                <th className="text-left py-3 font-semibold">Others</th>
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map((row) => (
                <tr key={row.feature} className="border-b border-border/50">
                  <td className="py-3 pr-4 font-medium text-foreground align-top">
                    {row.feature}
                  </td>
                  <td className="py-3 pr-4 text-muted-foreground align-top">{row.ours}</td>
                  <td className="py-3 text-muted-foreground align-top">{row.others}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 border-primary/20">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              Best for Online Spin Wheel
            </h2>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>Teachers who want picker + teams + timer in one tab</li>
              <li>Giveaway hosts who need proof links and ticket-number raffles</li>
              <li>Organizers who want 40+ preset specialty wheels beyond names</li>
              <li>Anyone who wants entries to stay on their device</li>
            </ul>
          </Card>
          <Card className="p-6">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
              <MinusCircle className="h-5 w-5 text-muted-foreground" />
              When another tool may fit
            </h2>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>You only need a single generic name spinner and already prefer that interface.</li>
              <li>You need offline spins with no browser tab (check ads and privacy first).</li>
              <li>You want account-based cloud saving more than a free browser-only flow.</li>
            </ul>
          </Card>
        </div>

        <Card className="p-6 md:p-8 mb-8">
          <h2 className="text-xl font-bold mb-4">Related pages</h2>
          <ul className="grid sm:grid-cols-2 gap-2 text-sm">
            <li>
              <Link to="/raffle-wheel" className="text-primary hover:underline">
                Raffle wheel — ticket numbers &amp; proof links
              </Link>
            </li>
            <li>
              <Link to="/prize-wheel" className="text-primary hover:underline">
                Prize wheel — labeled giveaway slices
              </Link>
            </li>
            <li>
              <Link to="/classroom-spinner" className="text-primary hover:underline">
                Classroom spinner — teacher hub
              </Link>
            </li>
            <li>
              <Link to="/random-name-picker-wheel" className="text-primary hover:underline">
                Random name picker wheel
              </Link>
            </li>
          </ul>
        </Card>

        <Card className="p-6 md:p-8">
          <h2 className="text-xl font-bold mb-6">Frequently asked questions</h2>
          <dl className="space-y-6">
            {FAQS.map((f) => (
              <div key={f.q} className="border-b border-border/60 pb-6 last:border-0">
                <dt className="font-semibold mb-2">{f.q}</dt>
                <dd className="text-muted-foreground leading-relaxed">{f.a}</dd>
              </div>
            ))}
          </dl>
        </Card>
      </article>
    </>
  );
};

export default WheelOfNamesAlternative;
