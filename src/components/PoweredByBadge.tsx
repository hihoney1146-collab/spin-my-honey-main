import { ExternalLink } from "lucide-react";
import { gtagEvent } from "@/lib/analytics";

interface PoweredByBadgeProps {
  variant?: "default" | "minimal" | "gradient";
  showIcon?: boolean;
}

export const PoweredByBadge = ({
  variant = "default",
  showIcon = true,
}: PoweredByBadgeProps) => {
  const handleClick = () => {
    // Track badge clicks
    gtagEvent("powered_by_click", {
      event_category: "embed",
      event_label: "badge_backlink",
      value: 1,
    });
  };

  const variants = {
    default: "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground",
    minimal: "bg-muted text-foreground border border-border",
    gradient:
      "bg-gradient-to-r from-orange-500 via-purple-500 to-pink-500 text-white",
  };

  return (
    <a
      href="https://onlinespinwheel.fun?utm_source=badge&utm_medium=referral&utm_campaign=powered_by"
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg font-semibold text-sm transition-all hover:shadow-lg hover:scale-105 ${variants[variant]}`}
    >
      {showIcon && <span className="text-lg">⚡</span>}
      <span>Powered by Online Spin Wheel</span>
      <ExternalLink className="h-3 w-3 opacity-70" />
    </a>
  );
};
