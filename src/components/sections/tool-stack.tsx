export interface ToolStackProps {
  heading: string;
  groups: ReadonlyArray<{ group: string; items: readonly string[] }>;
  id?: string;
}

/**
 * Industry section `ToolStack` (docs/blueprint.md, rung 4: personal fit).
 * "She already knows my tools" stands in for "she won't need training".
 * A typeset list grouped by job, never a wall of brand logos.
 */
export function ToolStack({ heading, groups, id = "tools" }: ToolStackProps) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="container-page">
      <h2 id={`${id}-heading`} className="text-3xl">
        {heading}
      </h2>
      <dl className="mt-10 grid gap-x-8 border-t-2 border-text md:mt-14 md:grid-cols-2">
        {groups.map((g) => (
          <div key={g.group} className="reveal-row grid gap-3 border-b border-border py-6 sm:grid-cols-[12rem_1fr] sm:gap-6">
            <dt className="reveal-text label pt-1.5 text-text-muted">{g.group}</dt>
            <dd className="reveal-text font-display text-xl font-normal tracking-tight">
              {g.items.join(" · ")}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
