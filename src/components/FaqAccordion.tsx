import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqItemInput = {
  question?: string;
  answer?: string;
  q?: string;
  a?: string;
};

export function normalizeFaqItems(items: FaqItemInput[]): FaqItem[] {
  return items.map((item) => ({
    question: item.question ?? item.q ?? "",
    answer: item.answer ?? item.a ?? "",
  }));
}

type FaqAccordionProps = {
  items: FaqItemInput[];
  /** Adds FAQPage / Question / Answer microdata for SEO */
  includeSchema?: boolean;
  className?: string;
  itemClassName?: string;
  triggerClassName?: string;
  answerClassName?: string;
  preserveAnswerWhitespace?: boolean;
};

export function FaqAccordion({
  items,
  includeSchema = false,
  className,
  itemClassName,
  triggerClassName,
  answerClassName,
  preserveAnswerWhitespace = false,
}: FaqAccordionProps) {
  const faqs = normalizeFaqItems(items);
  if (faqs.length === 0) return null;

  const accordion = (
    <Accordion type="single" collapsible className={cn("w-full", className)}>
      {faqs.map((faq, index) => (
        <AccordionItem
          key={`${index}-${faq.question}`}
          value={`faq-${index}`}
          className={cn("border-b border-border/60", itemClassName)}
          {...(includeSchema
            ? {
                itemScope: true,
                itemProp: "mainEntity",
                itemType: "https://schema.org/Question",
              }
            : {})}
        >
          <AccordionTrigger
            className={cn(
              "min-h-[3rem] gap-4 py-4 text-left text-base font-semibold leading-snug hover:no-underline sm:text-lg",
              triggerClassName,
            )}
            {...(includeSchema ? { itemProp: "name" } : {})}
          >
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-sm sm:text-base">
            <div
              {...(includeSchema
                ? {
                    itemScope: true,
                    itemProp: "acceptedAnswer",
                    itemType: "https://schema.org/Answer",
                  }
                : {})}
            >
              <p
                className={cn(
                  "text-muted-foreground leading-relaxed",
                  preserveAnswerWhitespace && "whitespace-pre-line",
                  answerClassName,
                )}
                {...(includeSchema ? { itemProp: "text" } : {})}
              >
                {faq.answer}
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );

  if (includeSchema) {
    return (
      <div itemScope itemType="https://schema.org/FAQPage">
        {accordion}
      </div>
    );
  }

  return accordion;
}
