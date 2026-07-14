import { Link } from "react-router-dom";
import { ZOHA_AUTHOR, ARMGHANA_AUTHOR, RAJA_AUTHOR } from "@/lib/teamAuthors";
import { TEAM_LINKEDIN } from "@/lib/teamLinks";
import { ORG_NAME, CONTACT_EMAIL } from "@/lib/schema";
import { AuthorProfilePage } from "@/components/AuthorProfilePage";

const AuthorZohaZeeshan = () => (
  <AuthorProfilePage
    canonical={ZOHA_AUTHOR.url}
    title="Zoha Zeeshan, Co-Founder, Online Spin Wheel"
    metaDescription="Zoha Zeeshan is Co-Founder of Online Spin Wheel. She helps shape company direction, user experience priorities, and the roadmap for free fair random pickers."
    ogDescription="Meet Zoha Zeeshan, Co-Founder of Online Spin Wheel: helping build a small team dedicated to fast, honest spin wheels."
    name={ZOHA_AUTHOR.name}
    roleLabel="Leadership"
    jobTitle={ZOHA_AUTHOR.jobTitle}
    initials="ZZ"
    linkedIn={TEAM_LINKEDIN.zohaZeeshan}
    extraSections={
      <section className="mt-8">
        <h2 className="text-xl font-bold mb-4 text-foreground">
          Co-Founder responsibilities
        </h2>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
          <li>
            Set company direction with the CEO: what we build next, what we say no to, and how we stay
            a one-product team.
          </li>
          <li>
            Own user experience: phone, tablet, projector, and livestream layouts that stay clear under
            time pressure.
          </li>
          <li>
            Prioritize the specialty-wheel roadmap so each page solves a real classroom, giveaway, or
            decision problem.
          </li>
          <li>
            Keep trust signals honest: visible mechanics, plain privacy language, and no surprise
            account walls.
          </li>
          <li>
            Coordinate releases with content and SEO so new wheels ship with accurate copy and testing.
          </li>
          <li>
            Turn support and community feedback into product improvements that hosts actually need.
          </li>
        </ul>
      </section>
    }
  >
    <p>
      I&apos;m Zoha Zeeshan, Co-Founder of{" "}
      <Link to="/" className="font-medium text-primary underline underline-offset-2 hover:opacity-90">
        {ORG_NAME}
      </Link>
      . Together with{" "}
      <Link to={ARMGHANA_AUTHOR.path} className="font-medium text-primary underline underline-offset-2">
        Armghana Zeeshan
      </Link>
      , I help steer a small team that builds one thing well: free spin wheels that load instantly,
      work on any device, and explain how they pick, without logins, paywalls, or hidden scripts.
    </p>
    <p>
      My work sits at the intersection of product experience and company direction. I focus on what
      users actually need when they open a wheel under time pressure: a teacher before period one, a
      streamer mid-giveaway, a couple deciding where to eat. That means clear defaults, responsive
      layouts, and specialty pages that answer a real question instead of chasing generic traffic.
    </p>
    <p>
      Online Spin Wheel is intentionally narrow in scope. We do not operate unrelated properties.
      Every roadmap item, from a new classroom spinner to a fairness study page or comparison guide,
      must earn its place by making the core product more useful or more trustworthy.
    </p>
    <p>
      Trust is built through visible mechanics and team discipline. We test wheels for even segment
      distribution across 10,000 automated spins before launch, document how randomness works on our{" "}
      <Link to="/how-randomness-works" className="font-medium text-primary underline underline-offset-2">
        how randomness works
      </Link>{" "}
      page, and stamp visible last-updated dates when content changes.{" "}
      <Link to={RAJA_AUTHOR.path} className="font-medium text-primary underline underline-offset-2">
        Raja Jahangir
      </Link>{" "}
      leads the content and SEO review that keeps those pages accurate.
    </p>
    <p>
      Feedback shapes what we build next. If you have an idea for a wheel, spotted confusing copy, or
      want to discuss how your organization uses the tool, reach us at{" "}
      <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-primary underline underline-offset-2">
        {CONTACT_EMAIL}
      </a>
      . You can also read the full team story on{" "}
      <Link to="/about-us" className="font-medium text-primary underline underline-offset-2">
        About us
      </Link>
      .
    </p>
  </AuthorProfilePage>
);

export default AuthorZohaZeeshan;
