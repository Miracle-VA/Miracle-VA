import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";
import { ArrowRightIcon } from "@/components/ui/icons";

export interface ServiceGridProps {
  heading: string;
  groups: ReadonlyArray<{
    title: string;
    description: string;
    includes: readonly string[];
    href: string;
  }>;
  allServices?: { label: string; href: string };
  id?: string;
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/**
 * Rung 2, Category fit: the contents index. A Bordeaux Noir field; her ten
 * areas grouped into six rows set in the display face, like a magazine's
 * contents page. The heading is her own line correcting the "assistants only
 * do calendars" assumption.
 *
 * Each row is one link named by its title (description attached as its
 * description). Hover and keyboard focus: Cherry Velvet fills the row from
 * the left and the arrow slides. On scroll, each rule draws and its text
 * settles in (CSS scroll-driven, see globals.css).
 *
 * The section paints its own field, so it receives its vertical padding
 * from the page (pass `className`).
 */
export function ServiceGrid({
  heading,
  groups,
  allServices,
  id,
  className,
}: ServiceGridProps & { className?: string }) {
  return (
    <section id={id} aria-labelledby="services-heading" className={`field-dark ${className ?? ""}`}>
      <div className="container-page">
        <h2 id="services-heading" className="max-w-[18ch] text-3xl text-on-field">
          {heading}
        </h2>

        <ul className="mt-12 md:mt-16">
          {groups.map((group) => {
            const key = slug(group.title);
            return (
              <li
                key={group.href}
                className="reveal-row group/row relative isolate has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-[-2px] has-[a:focus-visible]:outline-on-field"
              >
                <span
                  aria-hidden="true"
                  className="reveal-rule absolute inset-x-0 top-0 h-px bg-border-on-field"
                />
                {/* Cherry fill wipes across on hover/focus. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 origin-left scale-x-0 bg-field transition-transform duration-(--duration-slow) ease-out group-hover/row:scale-x-100 group-focus-within/row:scale-x-100 motion-reduce:transition-none"
                />
                {/* Stretched link: the title is the link (so its accessible name is
                    exactly its visible text, WCAG 2.5.3); ::after covers the row
                    so the whole row stays clickable. */}
                <div className="grid gap-3 py-7 md:grid-cols-12 md:items-baseline md:gap-8 md:px-4 md:py-9">
                  <h3 className="reveal-text text-2xl tracking-tighter text-on-field md:col-span-6">
                    <Link
                      href={group.href}
                      aria-describedby={`svc-${key}-desc`}
                      className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
                    >
                      {group.title}
                    </Link>
                  </h3>
                  <div className="reveal-text flex flex-col gap-2 md:col-span-5">
                    <p id={`svc-${key}-desc`} className="text-base text-on-field">
                      {group.description}
                    </p>
                    <p className="text-sm text-on-field-muted">
                      <span className="sr-only">Includes: </span>
                      {group.includes.join(" · ")}
                    </p>
                  </div>
                  <ArrowRightIcon className="reveal-text hidden size-7 justify-self-end text-on-field transition-transform duration-(--duration-base) ease-out group-hover/row:translate-x-1.5 group-focus-within/row:translate-x-1.5 motion-reduce:transform-none md:col-span-1 md:block" />
                </div>
              </li>
            );
          })}
        </ul>

        {allServices && (
          <div className="border-t border-border-on-field pt-8">
            <ButtonLink
              href={allServices.href}
              variant="quiet"
              className="text-on-field"
              trailing={<ArrowRightIcon />}
            >
              {allServices.label}
            </ButtonLink>
          </div>
        )}
      </div>
    </section>
  );
}
