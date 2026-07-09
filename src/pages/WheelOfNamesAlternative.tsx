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
    q: "Is Online Spin Wheel the same as WheelOfNames.com?",
    a: "No. We are a separate site (onlinespinwheel.fun) built by Raja Jahangir. This page compares features honestly so you can pick the tool that fits — including our random name picker wheel if you want a WheelOfNames-style experience with specialty pages for classrooms and giveaways.",
  },
  {
    q: "What is the best free wheel of names alternative?",
    a: "For US teachers and giveaway hosts who want one bookmark, Online Spin Wheel offers a name picker plus classroom hub, raffle wheel, and proof links without an account. WheelOfNames.com remains a solid choice if you only need a basic name spinner and prefer that interface.",
  },
  {
    q: "Do I need to download an app?",
    a: "None of the browser-based tools in this comparison require a download. Generic spinner apps from app stores may need installs and often show more ads.",
  },
  {
    q: "Which tool is best for Instagram giveaways?",
    a: "Look for multi-winner draws and shareable proof links. Our winner picker and raffle wheels support both; basic name pickers may require manual screenshots only.",
  },
  {
    q: "Can I import a class list?",
    a: "Yes on Online Spin Wheel — paste one name per line (up to 400). The classroom spinner hub adds remove-after-pick and session history for teachers.",
  },
];

type Row = {
  feature: string;
  ours: string;
  wheelOfNames: string;
  pickerWheel: string;
  apps: string;
};

const TABLE_ROWS: Row[] = [
  {
    feature: "Account required",
    ours: "No",
    wheelOfNames: "No (basic use)",
    pickerWheel: "Optional for saves",
    apps: "Often yes",
  },
  {
    feature: "Entries stay on your device",
    ours: "Yes — browser-only processing",
    wheelOfNames: "Yes for standard spins",
    pickerWheel: "Varies by mode",
    apps: "Varies; check privacy policy",
  },
  {
    feature: "Image slices on wheel",
    ours: "Yes",
    wheelOfNames: "Yes",
    pickerWheel: "Yes",
    apps: "Some apps only",
  },
  {
    feature: "Specialty tool pages (40+)",
    ours: "Yes — raffles, classrooms, prizes",
    wheelOfNames: "Single generic wheel",
    pickerWheel: "Several modes",
    apps: "One app per install",
  },
  {
    feature: "Multi-winner + proof link",
    ours: "Yes (raffle & winner wheels)",
    wheelOfNames: "Manual remove-after-pick",
    pickerWheel: "Varies",
    apps: "Rare",
  },
  {
    feature: "Classroom hub (picker + teams + timer)",
    ours: "Yes — classroom spinner page",
    wheelOfNames: "Name picker only",
    pickerWheel: "Separate tools",
    apps: "Not typical",
  },
  {
    feature: "Ticket-number raffle mode",
    ours: "Yes — raffle wheel",
    wheelOfNames: "Use numeric entries manually",
    pickerWheel: "Some number modes",
    apps: "Uncommon",
  },
  {
    feature: "Smartboard / phone friendly",
    ours: "Yes + fullscreen classroom mode",
    wheelOfNames: "Yes",
    pickerWheel: "Yes",
    apps: "Phone-only often",
  },
  {
    feature: "Explains randomness openly",
    ours: "Yes — how randomness works page",
    wheelOfNames: "Limited public detail",
    pickerWheel: "Varies",
    apps: "Rare",
  },
];

const WheelOfNamesAlternative = () => {
  const canonical = `${SITE_ORIGIN}/wheel-of-names-alternative`;

  return (
    <>
      <Helmet>
        <title>Wheel of Names Alternative — Compare Free Pickers</title>
        <meta
          name="description"
          content="Honest comparison: Online Spin Wheel vs WheelOfNames.com, PickerWheel, and spinner apps. Feature table, who each tool fits, and links to our free name picker."
        />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">
          {JSON.stringify([
            ...siteIdentityJsonLd(),
            breadcrumbListJsonLd([
              { name: "Home", url: `${SITE_ORIGIN}/` },
              { name: "Comparisons", url: `${SITE_ORIGIN}/all-spin-wheels` },
              { name: "Wheel of Names Alternative" },
            ]),
            articleJsonLd({
              title: "Wheel of Names Alternative — Compare Free Pickers",
              description:
                "Honest comparison of Online Spin Wheel vs WheelOfNames.com, PickerWheel, and spinner apps.",
              url: canonical,
              dateModified: "2026-07-09",
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
            Wheel of Names Alternative — Compare Free Pickers
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Looking for a WheelOfNames-style spinner? This page compares Online
            Spin Wheel with WheelOfNames.com, PickerWheel, and generic mobile
            spinner apps — without impersonating any brand. We are an independent
            project by{" "}
            <Link to="/author/raja-jahangir" className="text-primary hover:underline">
              Raja Jahangir
            </Link>
            .
          </p>
        </div>

        <Card className="p-6 md:p-8 mb-8">
          <p className="text-muted-foreground leading-relaxed mb-4">
            A wheel-of-names tool randomly selects one entry from a pasted list —
            perfect for classrooms, meetings, and giveaways. WheelOfNames.com
            popularized the format. Online Spin Wheel offers the same core behavior
            plus specialty pages for raffles, prize spins, and teacher hubs, all
            running in your browser with no signup.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Try our{" "}
            <Link to="/random-name-picker-wheel" className="text-primary font-medium hover:underline">
              random name picker wheel
            </Link>{" "}
            for a direct name-list spinner, or browse the{" "}
            <Link to="/classroom-spinner" className="text-primary font-medium hover:underline">
              classroom spinner
            </Link>{" "}
            if you need teams and a timer on the same page.
          </p>
        </Card>

        <Card className="p-4 md:p-6 mb-8 overflow-x-auto">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Feature comparison</h2>
          <table className="w-full text-sm md:text-base border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 pr-4 font-semibold">Feature</th>
                <th className="text-left py-3 pr-4 font-semibold text-primary">
                  Online Spin Wheel
                </th>
                <th className="text-left py-3 pr-4 font-semibold">WheelOfNames.com</th>
                <th className="text-left py-3 pr-4 font-semibold">PickerWheel.com</th>
                <th className="text-left py-3 font-semibold">Spinner apps</th>
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map((row) => (
                <tr key={row.feature} className="border-b border-border/50">
                  <td className="py-3 pr-4 font-medium text-foreground">{row.feature}</td>
                  <td className="py-3 pr-4 text-muted-foreground">{row.ours}</td>
                  <td className="py-3 pr-4 text-muted-foreground">{row.wheelOfNames}</td>
                  <td className="py-3 pr-4 text-muted-foreground">{row.pickerWheel}</td>
                  <td className="py-3 text-muted-foreground">{row.apps}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-muted-foreground mt-4">
            Competitor details reflect publicly visible features as of 2026 and may
            change. We do not speak for WheelOfNames.com or PickerWheel.com.
          </p>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 border-primary/20">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              Best for Online Spin Wheel
            </h2>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>US teachers who want picker + teams + timer in one tab</li>
              <li>Giveaway hosts who need proof links and ticket-number raffles</li>
              <li>Organizers who want 40+ preset specialty wheels beyond names</li>
              <li>Anyone who wants published randomness documentation</li>
            </ul>
          </Card>
          <Card className="p-6">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
              <MinusCircle className="h-5 w-5 text-muted-foreground" />
              When another tool may fit
            </h2>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>
                <strong className="text-foreground">WheelOfNames.com:</strong> you
                only need a familiar single-page name spinner and already use that
                workflow daily.
              </li>
              <li>
                <strong className="text-foreground">PickerWheel.com:</strong> you
                want their specific multi-tool layout and saved-wheel account flow.
              </li>
              <li>
                <strong className="text-foreground">Mobile apps:</strong> you need
                offline spins with no browser tab (check ads and privacy first).
              </li>
            </ul>
          </Card>
        </div>

        <Card className="p-6 md:p-8 mb-8">
          <h2 className="text-xl font-bold mb-4">Related money pages</h2>
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
