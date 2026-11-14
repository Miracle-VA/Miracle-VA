import Link from "next/link";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export interface WordmarkProps {
  className?: string;
}

/** Her name as a masthead: spaced serif capitals, like her palette card. */
export function Wordmark({ className }: WordmarkProps) {
  return (
    <Link
      href="/"
      aria-label={`${site.name}, home`}
      className={cn(
        "inline-flex min-h-11 items-center whitespace-nowrap font-display text-sm font-normal uppercase tracking-[0.12em] min-[380px]:tracking-[0.2em] sm:text-base",
        className,
      )}
    >
      {site.name}
    </Link>
  );
}
