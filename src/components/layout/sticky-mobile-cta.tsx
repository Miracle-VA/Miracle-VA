"use client";

// Client component: hides itself while a form field has focus, so it
// never sits over the on-screen keyboard or the field being typed in.

import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { ChatIcon } from "@/components/ui/icons";
import { primaryCtaLabel } from "@/lib/site";
import { cn } from "@/lib/utils";
import { whatsappUrl } from "@/lib/whatsapp";

function isFormField(target: EventTarget | null): boolean {
  return (
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement
  );
}

/**
 * The conversion action, permanently reachable on mobile.
 * One action only (WhatsApp). Space for it is reserved at the end of the
 * page by the marketing layout, so it never covers the footer.
 */
export function StickyMobileCta() {
  const [formFocused, setFormFocused] = useState(false);

  useEffect(() => {
    function onFocusIn(event: FocusEvent) {
      if (isFormField(event.target)) setFormFocused(true);
    }
    function onFocusOut(event: FocusEvent) {
      if (isFormField(event.target)) setFormFocused(false);
    }
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);
    return () => {
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 border-t border-border-strong bg-bg lg:hidden",
        // Slides up shortly after load; slides away while a form field has focus.
        "pb-[env(safe-area-inset-bottom)] animate-slide-up [animation-delay:600ms] motion-reduce:[animation-delay:0ms]",
        "transition-[transform,opacity] duration-(--duration-base) motion-reduce:translate-y-0",
        formFocused && "translate-y-full opacity-0",
      )}
      style={{ viewTransitionName: "sticky-cta" }}
      aria-hidden={formFocused || undefined}
      inert={formFocused || undefined}
    >
      <div className="container-page flex h-(--sticky-cta-h) items-center">
        <ButtonLink
          href={whatsappUrl()}
          icon={<ChatIcon />}
          className="w-full"
          data-cta="whatsapp"
          data-cta-location="sticky"
        >
          {primaryCtaLabel}
        </ButtonLink>
      </div>
    </div>
  );
}
