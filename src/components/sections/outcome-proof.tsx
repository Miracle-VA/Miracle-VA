import { OutcomeStat } from "@/components/sections/outcome-stat";

export interface OutcomeProofProps {
  heading: string;
  /** Verified results only (CLAUDE.md: no other numbers). */
  items: ReadonlyArray<{
    value: number;
    prefix?: string;
    suffix?: string;
    label: string;
    detail: string;
    href?: string;
  }>;
  id?: string;
}

/**
 * Rung 3, Competence: the headline facts. Each verified figure is set in
 * Cherry Velvet at display size and runs straight into its sentence, the way
 * a magazine profile sets a key fact. Each counts up once as it enters view.
 */
export function OutcomeProof({ heading, items, id }: OutcomeProofProps) {
  return (
    <section id={id} aria-labelledby="outcomes-heading" className="container-page">
      <h2 id="outcomes-heading" className="max-w-[16ch] text-3xl">
        {heading}
      </h2>

      <ul className="mt-10 border-b-2 border-text md:mt-14">
        {items.map((item) => (
          <OutcomeStat key={item.label} {...item} />
        ))}
      </ul>
    </section>
  );
}
