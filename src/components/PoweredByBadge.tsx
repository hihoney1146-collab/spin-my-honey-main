import { ExternalLink } from "lucide-react";

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
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "powered_by_click", {
        event_category: "parasite_seo",
        event_label: "badge_backlink",
        value: 1,
      });
    }
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

// Component to generate embed code for users
export const EmbedCodeGenerator = () => {
  const embedCode = `<iframe 
  src="https://onlinespinwheel.fun/embed" 
  width="500" 
  height="500" 
  frameborder="0"
  title="Online Spin Wheel Spin Wheel"
  style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"
></iframe>
<div style="text-align: center; margin-top: 12px;">
  <a 
    href="https://onlinespinwheel.fun?utm_source=embed&utm_medium=widget&utm_campaign=backlink"
    target="_blank"
    rel="noopener noreferrer"
    style="display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px; background: linear-gradient(to right, #9b87f5, #7e69ab); color: white; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; transition: transform 0.2s;"
  >
    <span>⚡</span>
    <span>Powered by Online Spin Wheel Spin Wheel</span>
  </a>
</div>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCode);
    
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "embed_code_generated", {
        event_category: "parasite_seo",
        event_label: "widget_distribution",
        value: 1,
      });
    }
  };

  return (
    <div className="space-y-4 p-4 bg-muted rounded-lg">
      <div>
        <h3 className="font-semibold mb-2">Embed Code</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Copy this code to embed the spin wheel on your website
        </p>
      </div>
      <pre className="bg-background p-3 rounded text-xs overflow-x-auto">
        <code>{embedCode}</code>
      </pre>
      <button
        onClick={copyToClipboard}
        className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition"
      >
        Copy Embed Code
      </button>
    </div>
  );
};

