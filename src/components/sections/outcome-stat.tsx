"use client";

// Client component: the signature count-up (docs/design-direction.md).
// Progressive enhancement (build-system/06 §7.6): the true number is always
// rendered and stays visible. Nothing is hidden in advance. Only at the
// moment the row enters view (motion allowed) does it start from 0 and
// count up; the hairline and caption animate in with it. If the observer
// never fires, the visitor simply sees the final figures.

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRightIcon } from "@/components/ui/icons";
import { duration, easeOut, prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface OutcomeStatProps {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  detail: string;
  /** Case study the figure comes from. */
  href?: string;
}

type Phase = "static" | "running";

const format = (n: number) => Math.round(n).toLocaleString("en-US");

export function OutcomeStat({ value, prefix = "", suffix = "", label, detail, href }: OutcomeStatProps) {
  const ref = useRef<HTMLLIElement>(null);
  const [phase, setPhase] = useState<Phase>("static");
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !("IntersectionObserver" in window)) return;
    // Already on screen at load: it has been seen at its final value.
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    let frame = 0;
    let fallback = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        setPhase("running");
        setDisplay(0);
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration.count);
          setDisplay(value * easeOut(t));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        // If frames are throttled, still land on the true figure.
        fallback = window.setTimeout(() => setDisplay(value), duration.count + 300);
      },
      { threshold: 0.35 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.clearTimeout(fallback);
    };
  }, [value]);

  const finalText = `${prefix}${format(value)}${suffix}`;

  return (
    <li ref={ref} data-phase={phase} className="group/stat border-t-2 border-text">
      {/* Screen readers get the true figure once, never the counting digits. */}
      <p className="sr-only">
        {finalText} {label}. {detail}
      </p>

      <div aria-hidden="true" className="grid gap-6 py-10 md:grid-cols-12 md:items-end md:gap-8 md:py-12">
        {/* The headline fact: the number runs straight into its sentence. */}
        <p className="font-display font-normal tracking-tighter text-text md:col-span-8">
          <span className="block text-display font-normal leading-[0.98] tracking-display tabular-nums text-accent">
            {prefix}
            {format(display)}
            {suffix}
          </span>
          <span
            className={cn(
              "mt-2 block text-2xl",
              "group-data-[phase=running]/stat:animate-rise",
              "group-data-[phase=running]/stat:[animation-delay:var(--duration-slow)]",
            )}
          >
            {label}
          </span>
        </p>

        <div
          className={cn(
            "md:col-span-4 md:pb-2",
            "group-data-[phase=running]/stat:animate-rise",
            "group-data-[phase=running]/stat:[animation-delay:calc(var(--duration-slow)+var(--stagger))]",
          )}
        >
          <p className="max-w-[34ch] text-base text-text-muted">{detail}</p>
        </div>
      </div>
      {href && (
        <p className="-mt-6 pb-10 md:-mt-8 md:pb-12">
          <Link
            href={href}
            className="group/case inline-flex min-h-11 items-center gap-2 font-semibold text-accent underline decoration-2 underline-offset-[7px] decoration-accent/35 hover:decoration-accent"
          >
            See the case
            <span className="sr-only">: {label}</span>
            <ArrowRightIcon className="transition-transform duration-(--duration-base) group-hover/case:translate-x-1 motion-reduce:transform-none" />
          </Link>
        </p>
      )}
    </li>
  );
}
