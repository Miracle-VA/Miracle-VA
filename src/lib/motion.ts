/**
 * Motion values for JavaScript-driven animation (build-system/06 §7.2).
 * Mirrors the CSS tokens in styles/tokens.css. Change both together.
 */
export const duration = {
  instant: 100,
  fast: 160,
  base: 240,
  slow: 400,
  entrance: 700,
  /** The signature count-up of the outcome numbers. */
  count: 1400,
} as const;

/** easeOutExpo-like curve matching --ease-out for rAF-driven values. */
export function easeOut(t: number): number {
  return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
