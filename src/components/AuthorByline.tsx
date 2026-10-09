import { Link } from "react-router-dom";
import { RAJA_AUTHOR } from "@/lib/schema";

const AUTHOR_PATH = RAJA_AUTHOR.url.replace("https://onlinespinwheel.fun", "");

type AuthorBylineProps = {
  className?: string;
  /**
   * "reviewed" keeps the editorial line used on guides ("Reviewed by name, job title").
   * "maintained" is for tool pages, where the honest claim is that the owner builds and maintains them.
   */
  variant?: "reviewed" | "maintained";
};

export function AuthorByline({
  className = "",
  variant = "reviewed",
}: AuthorBylineProps) {
  return (
    <p
      className={`text-sm text-muted-foreground mb-6 ${className}`.trim()}
      itemScope
      itemType="https://schema.org/Person"
    >
      {variant === "maintained" ? "Built and maintained by" : "Reviewed by"}{" "}
      <Link
        to={AUTHOR_PATH}
        rel="author"
        className="font-medium text-primary hover:underline"
        itemProp="url"
      >
        <span itemProp="name">{RAJA_AUTHOR.name}</span>
      </Link>
      {variant === "maintained" ? null : <>, {RAJA_AUTHOR.jobTitle}</>}
    </p>
  );
}
