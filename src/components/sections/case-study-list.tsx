import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/icons";
import type { CaseStudy } from "@/content/work";

export interface CaseStudyListProps {
  cases: readonly CaseStudy[];
  /** Heading level for each case title (h2 on /work, h3 under a section heading). */
  titleLevel?: "h2" | "h3";
}

const figure = (c: CaseStudy) =>
  c.metric ? `${c.metric.prefix ?? ""}${c.metric.value.toLocaleString("en-US")}${c.metric.suffix ?? ""}` : null;

/**
 * Library section `CaseStudyCard`, set as a feature list rather than a card
 * wall: each case is a ruled row with its title in the display face, her
 * summary, and, where one is verified, its figure in Cherry. The whole row
 * is the link; hover lifts the title colour and slides the arrow.
 */
export function CaseStudyList({ cases, titleLevel = "h3" }: CaseStudyListProps) {
  const Title = titleLevel;
  return (
    <ul className="border-b-2 border-text">
      {cases.map((c) => {
        const fig = figure(c);
        return (
          <li key={c.slug} className="reveal-row group/case relative border-t-2 border-text">
            <Link
              href={`/work/${c.slug}`}
              className="grid gap-4 py-8 md:grid-cols-12 md:items-end md:gap-8 md:py-10"
            >
              <span className="reveal-text md:col-span-7">
                <Title className="text-2xl transition-colors duration-(--duration-base) group-hover/case:text-accent">
                  {c.title}
                </Title>
                <span className="mt-3 block max-w-[52ch] text-base text-text-muted">{c.summary}</span>
              </span>
              <span className="reveal-text flex items-end justify-between gap-6 md:col-span-5">
                {fig ? (
                  <span className="font-display text-3xl font-normal tracking-display tabular-nums text-accent">
                    {fig}
                    <span className="sr-only"> {c.metric?.label}</span>
                  </span>
                ) : (
                  <span />
                )}
                <ArrowRightIcon className="mb-2 size-7 shrink-0 text-text transition-transform duration-(--duration-base) group-hover/case:translate-x-1.5 motion-reduce:transform-none" />
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
