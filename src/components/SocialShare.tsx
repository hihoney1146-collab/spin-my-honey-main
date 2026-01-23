import { Facebook, Twitter, Linkedin, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface SocialShareProps {
  url?: string;
  title?: string;
  description?: string;
}

export const SocialShare = ({
  url = "https://onlinespinwheel.fun",
  title = "Free Spin Wheel - Random Name Picker Online",
  description = "Check out this amazing free spin wheel tool! Perfect for classrooms, giveaways, and team decisions.",
}: SocialShareProps) => {
  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `${title} - ${description}`
    )}&url=${encodeURIComponent(`${url}?utm_source=twitter&utm_medium=social&utm_campaign=share`)}`,
    
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      `${url}?utm_source=facebook&utm_medium=social&utm_campaign=share`
    )}`,
    
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      `${url}?utm_source=linkedin&utm_medium=social&utm_campaign=share`
    )}`,
    
    reddit: `https://reddit.com/submit?url=${encodeURIComponent(
      `${url}?utm_source=reddit&utm_medium=social&utm_campaign=share`
    )}&title=${encodeURIComponent(title)}`,
    
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
      `${url}?utm_source=pinterest&utm_medium=social&utm_campaign=share`
    )}&description=${encodeURIComponent(description)}`,
  };

  const handleShare = (platform: string, link: string) => {
    // Track share event in Google Analytics
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "share", {
        event_category: "social_share",
        event_label: platform,
        value: 1,
      });
    }
    
    window.open(link, "_blank", "width=600,height=400");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Spin Wheel</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => handleShare("twitter", shareLinks.twitter)}
            >
              <Twitter className="h-4 w-4" />
              Twitter
            </Button>
            
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => handleShare("facebook", shareLinks.facebook)}
            >
              <Facebook className="h-4 w-4" />
              Facebook
            </Button>
            
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => handleShare("linkedin", shareLinks.linkedin)}
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </Button>
            
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => handleShare("reddit", shareLinks.reddit)}
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
              </svg>
              Reddit
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

