"use client";

// Client component: error boundaries must be client components (Next.js).

import { useEffect } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { ChatIcon } from "@/components/ui/icons";
import { primaryCtaLabel } from "@/lib/site";
import { whatsappUrl } from "@/lib/whatsapp";

/**
 * Error boundary for every public page (05 Functional). The header and
 * footer stay; the page body is replaced with a designed message, a retry,
 * and WhatsApp so the visitor can still reach her.
 */
export default function MarketingError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Reference only; no personal data. Shows up in the hosting logs.
    console.error(`[page-error] ${error.digest ?? error.message}`);
  }, [error]);

  return (
    <div className="container-page py-(--section-y)">
      <h1 className="max-w-[16ch] text-display font-normal leading-[1] tracking-display">
        Something went wrong on this page.
      </h1>
      <p className="mt-8 max-w-prose text-lg text-text-muted">
        Please try again. If it keeps happening, you can still reach me on WhatsApp.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
        <button
          type="button"
          onClick={reset}
          className="inline-flex min-h-14 items-center rounded-sm bg-accent px-7 text-lg font-semibold tracking-[0.01em] text-accent-contrast transition-colors hover:bg-accent-hover"
        >
          Try again
        </button>
        <ButtonLink
          href={whatsappUrl()}
          variant="quiet"
          icon={<ChatIcon />}
          data-cta="whatsapp"
          data-cta-location="error"
        >
          {primaryCtaLabel}
        </ButtonLink>
      </div>
    </div>
  );
}
