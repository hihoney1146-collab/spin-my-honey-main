import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { gtagEvent } from "@/lib/analytics";
import { SITE_ORIGIN } from "@/lib/schema";

type EmbedWidgetSnippetProps = {
  slug: string;
  wheelTitle: string;
};

export function EmbedWidgetSnippet({ slug, wheelTitle }: EmbedWidgetSnippetProps) {
  const toolUrl = `${SITE_ORIGIN}/${slug}`;
  const embedSrc = `${SITE_ORIGIN}/embed/${slug}`;

  const embedCode = `<iframe
  src="${embedSrc}"
  width="500"
  height="520"
  frameborder="0"
  title="${wheelTitle.replace(/"/g, "&quot;")} — Online Spin Wheel"
  style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"
></iframe>
<p style="text-align:center;margin-top:10px;font-size:14px;">
  <a href="${toolUrl}?utm_source=embed&amp;utm_medium=widget&amp;utm_campaign=backlink"
     target="_blank" rel="noopener noreferrer">${wheelTitle} — Online Spin Wheel</a>
</p>`;

  const [copied, setCopied] = useState(false);

  const copySnippet = async () => {
    await navigator.clipboard.writeText(embedCode);
    setCopied(true);
    toast.success("Embed code copied.");
    gtagEvent("embed_code_generated", {
      event_category: "parasite_seo",
      event_label: slug,
    });
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-border bg-muted/30 p-5 md:p-6 space-y-3">
      <h3 className="text-lg font-bold">Embed this wheel</h3>
      <p className="text-sm text-muted-foreground">
        Paste this iframe on your site. The attribution link below points back to{" "}
        <a href={toolUrl} className="text-primary hover:underline">
          {toolUrl.replace("https://", "")}
        </a>{" "}
        (followed link for SEO).
      </p>
      <pre className="bg-background border border-border rounded-lg p-3 text-xs overflow-x-auto max-h-48">
        <code>{embedCode}</code>
      </pre>
      <Button type="button" onClick={copySnippet} variant="secondary" className="gap-2">
        <Copy className="h-4 w-4" />
        {copied ? "Copied!" : "Copy embed code"}
      </Button>
    </div>
  );
}
