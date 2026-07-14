import { Link } from "react-router-dom";
import { ARMGHANA_AUTHOR, ZOHA_AUTHOR, RAJA_AUTHOR } from "@/lib/teamAuthors";
import { TEAM_LINKEDIN } from "@/lib/teamLinks";
import { ORG_NAME, CONTACT_EMAIL } from "@/lib/schema";
import { AuthorProfilePage } from "@/components/AuthorProfilePage";

const AuthorArmghanaZeeshan = () => (
  <AuthorProfilePage
    canonical={ARMGHANA_AUTHOR.url}
    title="Armghana Zeeshan, CEO, Online Spin Wheel"
    metaDescription="Armghana Zeeshan is CEO of Online Spin Wheel. She sets product direction, business priorities, and the standards that keep every free spin wheel fast, fair, and trustworthy."
    ogDescription="Meet Armghana Zeeshan, CEO of Online Spin Wheel, leading product direction for a small team dedicated solely to fair random pickers."
    name={ARMGHANA_AUTHOR.name}
    roleLabel="Leadership"
    jobTitle={ARMGHANA_AUTHOR.jobTitle}
    initials="AZ"
    linkedIn={TEAM_LINKEDIN.armghanaZeeshan}
  >
    <p>
      I&apos;m Armghana Zeeshan, CEO of{" "}
      <Link to="/" className="font-medium text-primary underline underline-offset-2 hover:opacity-90">
        {ORG_NAME}
      </Link>
      . Our team built this site because too many online spinners were slow, cluttered, or vague about
      fairness. We focus on one product, free, browser-based wheels for classrooms, giveaways, and
      everyday decisions, and we treat that focus as a strength rather than a limitation.
    </p>
    <p>
      As CEO, I set product direction and business priorities: which wheels ship next, how we keep the
      core tool free without sacrificing speed, and how we communicate honestly about randomness and
      privacy. I work closely with{" "}
      <Link to={ZOHA_AUTHOR.path} className="font-medium text-primary underline underline-offset-2">
        Zoha Zeeshan
      </Link>{" "}
      on company direction and with{" "}
      <Link to={RAJA_AUTHOR.path} className="font-medium text-primary underline underline-offset-2">
        Raja Jahangir
      </Link>{" "}
      on content quality, SEO, and the testing bar every page must meet before it goes live.
    </p>
    <p>
      We are a small independent team dedicated solely to Online Spin Wheel, not a multi-property
      agency. That means every decision ties back to users who need a fair pick in front of a class,
      a livestream, or a comment section. When we add a specialty wheel or publish a guide, it is
      because real hosts and teachers asked for something we could verify works.
    </p>
    <p>
      Fairness is a team practice here. Before launch, wheels are checked for uniform distribution
      across 10,000 automated spins; if segments drift, the wheel does not ship. Randomness comes from
      the browser&apos;s secure generator, and user entries stay on the device. I hold the team to that
      standard on every release.
    </p>
    <p>
      Questions about partnerships, accessibility, or how we operate? Email{" "}
      <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-primary underline underline-offset-2">
        {CONTACT_EMAIL}
      </a>{" "}
      or connect on LinkedIn. Read more on our{" "}
      <Link to="/about-us" className="font-medium text-primary underline underline-offset-2">
        About us
      </Link>{" "}
      page.
    </p>
  </AuthorProfilePage>
);

export default AuthorArmghanaZeeshan;
