import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ButtonLinkProps extends Omit<ComponentProps<"a">, "href"> {
  href: string;
  /**
   * primary  = Cherry Velvet fill on light grounds (the conversion action)
   * inverse  = Vanilla fill on Cherry/Bordeaux fields (same action, on colour)
   * quiet    = underlined text link, ≥44px tall
   */
  variant?: "primary" | "inverse" | "quiet";
  size?: "md" | "lg";
  /** Leading icon, decorative. */
  icon?: ReactNode;
  /** Trailing arrow that slides on hover. */
  trailing?: ReactNode;
  children: ReactNode;
}

const base =
  "group/btn inline-flex items-center justify-center gap-2.5 whitespace-nowrap transition-[color,background-color,text-decoration-color,transform] duration-(--duration-base)";

const variants = {
  primary:
    "rounded-sm bg-accent font-semibold tracking-[0.01em] text-accent-contrast hover:bg-accent-hover active:scale-[0.98] motion-reduce:active:scale-100",
  inverse:
    "rounded-sm bg-on-field font-semibold tracking-[0.01em] text-field-dark hover:bg-surface active:scale-[0.98] motion-reduce:active:scale-100",
  quiet:
    "min-h-11 font-semibold underline decoration-current/35 decoration-2 underline-offset-[7px] hover:decoration-current",
} as const;

const sizes = {
  md: "min-h-12 px-5 text-base",
  lg: "min-h-14 px-7 text-lg",
} as const;

/** The icon tilts slightly on hover; the trailing arrow slides on. */
const iconMotion =
  "inline-flex transition-transform duration-(--duration-slow) group-hover/btn:-translate-y-px group-hover/btn:-rotate-8 motion-reduce:transform-none";
const trailingMotion =
  "inline-flex transition-transform duration-(--duration-base) group-hover/btn:translate-x-1 motion-reduce:transform-none";

/**
 * A link styled as a button. Actions that navigate are links (<a>),
 * never <button>. External links (WhatsApp, LinkedIn) open in a new tab.
 */
export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  icon,
  trailing,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  const isExternal = /^https?:\/\//.test(href) || href.startsWith("mailto:");
  const classes = cn(base, variants[variant], variant !== "quiet" && sizes[size], className);
  const content = (
    <>
      {icon && <span className={iconMotion}>{icon}</span>}
      {children}
      {trailing && <span className={trailingMotion}>{trailing}</span>}
    </>
  );

  if (isExternal) {
    const newTab = !href.startsWith("mailto:");
    return (
      <a
        href={href}
        className={classes}
        {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {content}
    </Link>
  );
}
