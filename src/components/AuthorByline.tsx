import { Link } from "react-router-dom";
import { RAJA_AUTHOR } from "@/lib/schema";

const AUTHOR_PATH = RAJA_AUTHOR.url.replace("https://onlinespinwheel.fun", "");

type AuthorBylineProps = {
  className?: string;
};

export function AuthorByline({ className = "" }: AuthorBylineProps) {
  return (
    <p
      className={`text-sm text-muted-foreground mb-6 ${className}`.trim()}
      itemScope
      itemType="https://schema.org/Person"
    >
      Reviewed by{" "}
      <Link
        to={AUTHOR_PATH}
        rel="author"
        className="font-medium text-primary hover:underline"
        itemProp="url"
      >
        <span itemProp="name">{RAJA_AUTHOR.name}</span>
      </Link>
      , {RAJA_AUTHOR.jobTitle}
    </p>
  );
}
