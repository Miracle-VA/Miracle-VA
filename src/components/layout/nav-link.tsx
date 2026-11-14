"use client";

// Client component: reads the current pathname to set aria-current.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface NavLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  /** light = on Vanilla/Oat grounds; field = on Cherry/Bordeaux fields. */
  tone?: "light" | "field";
  /** Rule that grows from the left on hover, and stays for the current page. */
  underline?: boolean;
  /** Called when the link starts a navigation (used to close the mobile menu). */
  onNavigate?: () => void;
}

function NavLinkBase({
  href,
  children,
  className,
  tone = "light",
  underline,
  onNavigate,
  isCurrent,
}: NavLinkProps & { isCurrent: boolean }) {
  const colours =
    tone === "field"
      ? isCurrent
        ? "text-on-field"
        : "text-on-field-muted hover:text-on-field"
      : isCurrent
        ? "text-text"
        : "text-text-muted hover:text-text";

  return (
    <Link
      href={href}
      aria-current={isCurrent ? "page" : undefined}
      onNavigate={onNavigate}
      className={cn(
        "transition-colors duration-(--duration-base)",
        colours,
        underline &&
          "relative inline-flex min-h-11 items-center after:absolute after:inset-x-0 after:bottom-2 after:h-0.5 after:origin-left after:bg-accent after:transition-transform after:duration-(--duration-slow)",
        underline && (isCurrent ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"),
        className,
      )}
    >
      {children}
    </Link>
  );
}

function NavLinkWithPath(props: NavLinkProps) {
  const pathname = usePathname();
  const isCurrent = pathname === props.href || pathname.startsWith(`${props.href}/`);
  return <NavLinkBase {...props} isCurrent={isCurrent} />;
}

/**
 * With cacheComponents, usePathname suspends while Next builds the static
 * shell for routes with dynamic params (e.g. /work/[slug]). The Suspense
 * boundary keeps that to this one link: the shell renders a plain link,
 * and the current-page marker appears once the pathname is known.
 */
export function NavLink(props: NavLinkProps) {
  return (
    <Suspense fallback={<NavLinkBase {...props} isCurrent={false} />}>
      <NavLinkWithPath {...props} />
    </Suspense>
  );
}
