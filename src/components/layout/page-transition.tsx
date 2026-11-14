import { ViewTransition, type ReactNode } from "react";

export interface PageTransitionProps {
  children: ReactNode;
}

/**
 * Navigation layer (build-system/06 §7.3): a calm cross-fade with a 12px rise
 * between pages, matching the Fluid motion personality. Wrap each page's
 * content (not the layout: layouts persist, so enter/exit never fire there).
 * CSS lives in globals.css (::view-transition-*(.page)). Browsers without the
 * View Transitions API simply swap pages, as before.
 */
export function PageTransition({ children }: PageTransitionProps) {
  return (
    <ViewTransition enter="page" exit="page" default="none">
      {children}
    </ViewTransition>
  );
}
