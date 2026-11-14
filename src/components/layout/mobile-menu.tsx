"use client";

// Client component: open/close state with enter/exit transitions,
// focus trap, Escape, inert background.

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { createPortal } from "react-dom";
import { NavLink } from "@/components/layout/nav-link";
import { ButtonLink } from "@/components/ui/button-link";
import { ChatIcon, CloseIcon, MenuIcon } from "@/components/ui/icons";
import { contact, primaryCtaLabel, primaryNav } from "@/lib/site";
import { cn } from "@/lib/utils";
import { duration } from "@/lib/motion";
import { whatsappUrl } from "@/lib/whatsapp";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
/** Matches the longest exit transition below (panel fade, --duration-base).
 *  Reduced motion keeps the fade, so the same wait applies. */
const EXIT_MS = duration.base + 20;

export function MobileMenu() {
  // mounted: panel is in the DOM. visible: panel is in its "open" visual state.
  // Opening: mount → flush start state → visible. Closing: hide → unmount after exit.
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const exitTimer = useRef<number | undefined>(undefined);
  /** Releases the scroll lock; restore=false when leaving for another page. */
  const lockRef = useRef<((restore: boolean) => void) | null>(null);

  const open = useCallback(() => {
    window.clearTimeout(exitTimer.current);
    setMounted(true);
  }, []);

  const close = useCallback(() => {
    setVisible(false);
    window.clearTimeout(exitTimer.current);
    exitTimer.current = window.setTimeout(() => setMounted(false), EXIT_MS);
  }, []);

  // Following a menu link: release the lock without restoring the old offset,
  // so the new page starts at the top (ScrollToTop), then close.
  const closeForNavigation = useCallback(() => {
    lockRef.current?.(false);
    close();
  }, [close]);

  // With cacheComponents, routes stay mounted (hidden) after navigation.
  // Reset the menu when this route is hidden so it never reappears open.
  useLayoutEffect(
    () => () => {
      window.clearTimeout(exitTimer.current);
      setVisible(false);
      setMounted(false);
    },
    [],
  );

  // Enter: force the browser to compute the hidden start state, then flip to
  // visible so the transition runs. A style flush is used instead of
  // requestAnimationFrame, which can be throttled; a stalled frame would leave
  // the menu invisible while the page behind it is inert.
  useLayoutEffect(() => {
    if (!mounted || !panelRef.current) return;
    void panelRef.current.offsetHeight;
    setVisible(true);
  }, [mounted]);

  // While mounted: inert background, scroll lock, focus trap, Escape.
  useEffect(() => {
    if (!mounted) return;

    const panel = panelRef.current;
    const trigger = triggerRef.current;
    const siblings = Array.from(document.body.children).filter(
      (el): el is HTMLElement => el instanceof HTMLElement && el !== panel?.parentElement,
    );
    siblings.forEach((el) => (el.inert = true));

    // Scroll lock that keeps the reader's place: pin the body at its current
    // offset, then restore that exact position on close. (Toggling
    // overflow:hidden let the browser re-scroll the page on open and close.)
    const body = document.body;
    const html = document.documentElement;
    const y = window.scrollY;
    const saved = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
    };
    Object.assign(body.style, { position: "fixed", top: `-${y}px`, left: "0", right: "0", width: "100%" });
    lockRef.current = (restore: boolean) => {
      Object.assign(body.style, saved);
      if (restore) {
        // Jump straight back: no smooth-scroll animation from the top.
        const behavior = html.style.scrollBehavior;
        html.style.scrollBehavior = "auto";
        window.scrollTo(0, y);
        html.style.scrollBehavior = behavior;
      }
      lockRef.current = null;
    };

    panel?.querySelector<HTMLElement>(FOCUSABLE)?.focus({ preventScroll: true });

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab" || !panel) return;
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      siblings.forEach((el) => (el.inert = false));
      lockRef.current?.(true);
      trigger?.focus({ preventScroll: true });
    };
  }, [mounted, close]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="-mr-2 inline-flex min-h-11 min-w-11 items-center justify-center text-text lg:hidden"
        aria-expanded={visible}
        aria-controls="mobile-menu"
        onClick={open}
      >
        <MenuIcon />
        <span className="sr-only">Open menu</span>
      </button>

      {mounted &&
        createPortal(
          <div>
            <div
              ref={panelRef}
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              data-visible={visible}
              className={cn(
                // A Bordeaux field sweeps down from the top; reduced motion: a fade.
                "field-dark group fixed inset-0 z-50 flex flex-col lg:hidden",
                "transition-[clip-path,opacity] duration-(--duration-slow)",
                visible
                  ? "opacity-100 ease-out [clip-path:inset(0_0_0_0)]"
                  : "opacity-0 ease-in [clip-path:inset(0_0_100%_0)] motion-reduce:[clip-path:inset(0_0_0_0)]",
              )}
            >
              <div className="container-page flex h-(--header-h) items-center justify-end">
                <button
                  type="button"
                  className={cn(
                    "-mr-2 inline-flex min-h-11 min-w-11 items-center justify-center text-on-field",
                    "transition-transform duration-(--duration-slow)",
                    "-rotate-90 group-data-[visible=true]:rotate-0 motion-reduce:rotate-0",
                  )}
                  onClick={close}
                >
                  <CloseIcon />
                  <span className="sr-only">Close menu</span>
                </button>
              </div>

              <nav aria-label="Main" className="container-page flex-1 pt-8">
                <ul className="flex flex-col">
                  {primaryNav.map((item, index) => (
                    <li
                      key={item.href}
                      className="relative"
                      style={{ "--i": index } as CSSProperties}
                    >
                      {/* Motion lives on this wrapper so it doesn't fight the
                          link's own colour transition. Rise in one after
                          another; leave together, quickly. */}
                      <div
                        className={cn(
                          "translate-y-3 opacity-0 transition-[opacity,transform] motion-reduce:translate-y-0",
                          "duration-(--duration-fast) ease-in",
                          "group-data-[visible=true]:translate-y-0 group-data-[visible=true]:opacity-100",
                          "group-data-[visible=true]:duration-(--duration-slow) group-data-[visible=true]:ease-out",
                          "group-data-[visible=true]:delay-[calc(120ms+var(--i)*var(--stagger))]",
                        )}
                      >
                        <NavLink
                          href={item.href}
                          tone="field"
                          onNavigate={closeForNavigation}
                          className="block py-4 font-display text-3xl font-normal tracking-tighter"
                        >
                          {item.label}
                        </NavLink>
                      </div>
                      {/* Divider draws from the left as each item arrives. */}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-border-on-field motion-reduce:scale-x-100",
                          "transition-transform duration-(--duration-fast)",
                          "group-data-[visible=true]:scale-x-100 group-data-[visible=true]:duration-(--duration-entrance)",
                          "group-data-[visible=true]:ease-out",
                          "group-data-[visible=true]:delay-[calc(160ms+var(--i)*var(--stagger))]",
                        )}
                      />
                    </li>
                  ))}
                </ul>
              </nav>

              <div
                className={cn(
                  "container-page pb-[calc(2rem+env(safe-area-inset-bottom))]",
                  "translate-y-3 opacity-0 transition-[opacity,transform] duration-(--duration-fast) motion-reduce:translate-y-0",
                  "group-data-[visible=true]:translate-y-0 group-data-[visible=true]:opacity-100",
                  "group-data-[visible=true]:duration-(--duration-slow)",
                  "group-data-[visible=true]:delay-[calc(120ms+4*var(--stagger)+60ms)]",
                )}
              >
                <ButtonLink
                  href={whatsappUrl()}
                  variant="inverse"
                  size="lg"
                  icon={<ChatIcon />}
                  className="w-full"
                  data-cta="whatsapp"
                  data-cta-location="mobile-menu"
                >
                  {primaryCtaLabel}
                </ButtonLink>
                <p className="mt-3 text-center text-sm text-on-field-muted">
                  WhatsApp {contact.whatsappDisplay}
                </p>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
