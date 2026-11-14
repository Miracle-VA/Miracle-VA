# Miracle Joy Mangsal — Website

Portfolio site for Miracle Joy Mangsal, remote Executive Assistant. Built by XU Web Studios.

The site's job is to turn a business owner into a WhatsApp conversation. The WhatsApp action must stay reachable on every page.

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16.4.6, App Router, `cacheComponents` on |
| Language | TypeScript, strict |
| Styling | Tailwind CSS 4.3.3, tokens in `src/styles/tokens.css` (no `tailwind.config.*`) |
| Fonts | Spectral (display) and Hanken Grotesk (body) via `next/font/google` (self-hosted at build) |
| Validation | Zod 4.6.7 (environment only) |
| Content | MDX / TypeScript in the repo. **No CMS** by decision: all edits are made by the developer |
| Hosting | Vercel (commercial plan, client's account) |

## Getting started

Requires Node.js 20.9 or later (developed on 22.17).

```bash
npm install
npm run dev        # http://localhost:3000
```

Before every commit:

```bash
npm run check      # typecheck → lint (incl. jsx-a11y at error level) → unit tests → production build → bundle budget
```

## Environment variables

Documented in `.env.example`. Copy it to `.env.local` for local work.

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Every build (optional in `next dev`) | Base URL for canonical links, Open Graph and the sitemap. Validated in `src/lib/env.ts`; the build fails if it's missing |

That is the only variable: there's no form, email service or database.

## How enquiries reach her

**No form** (client decision, 2026-11-13). Every contact action links out, so there is nothing to configure or keep running:

- **WhatsApp** (primary): `whatsappUrl()` in `src/lib/whatsapp.ts` builds a `wa.me` link to her number with a pre-filled message.
- **Email**: `emailUrl()` in `src/lib/email.ts` opens Gmail's compose window (`mail.google.com/mail/?view=cm`) with her address, a subject and an opening line filled in. Visitors without Gmail can copy the address shown beside the button.
- **LinkedIn**: her profile.

Both builders take an optional context (a page or case name) so she can see where an enquiry came from.

## Tests

```bash
npm run test:e2e   # builds, starts on :3100, runs Playwright (mobile + desktop)
```

`tests/e2e/contact.spec.ts` checks that every email link on every page opens Gmail compose addressed to her (no `mailto:` left), that `/contact` offers WhatsApp and email with no form, and axe (WCAG 2.2 AA) on `/contact`. `tests/e2e/navigation.spec.ts` checks that every "Let's Work Together" opens her WhatsApp, plus scroll and menu behaviour. `tests/unit/contact-links.test.ts` pins her number and address. First run: `npx playwright install chromium`.

## Where things are

```
src/
├── app/
│   ├── (marketing)/      public pages; layout = header, main, footer, sticky CTA
│   ├── layout.tsx        root: font, metadata
│   ├── globals.css       Tailwind + base styles
│   └── not-found.tsx
├── components/
│   ├── layout/           header, mobile menu, footer, sticky mobile CTA, skip link
│   ├── sections/         page sections, named after the section library
│   └── ui/               primitives (ButtonLink, icons)
├── lib/
│   ├── site.ts           name, navigation, contact routes: single source of truth
│   ├── whatsapp.ts       wa.me link builder with pre-filled message
│   ├── email.ts          Gmail compose link builder
│   └── env.ts            validated environment
└── styles/tokens.css     design tokens
```

## Rules for anyone editing this site

- **Contact details live only in `src/lib/site.ts`.** Never hard-code a phone number, email or link elsewhere.
- **Primary action is WhatsApp**, built with `whatsappUrl()`; email links use `emailUrl()`, never `mailto:`. Every CTA carries `data-cta` and `data-cta-location` attributes for analytics.
- **No colour, size or spacing literals in components.** Use the tokens.
- **Sections don't set their own outer spacing.** The page layout owns rhythm (`.section-y`, `.container-page`).
- **Work samples must be redacted before they enter `public/`.** No former client's names, brands, contact details or faces without written permission.
- **Only verified numbers may be published:** 79 booked appointments at $4.86 per booking; approximately 21,000 Instagram views on one post; more than 11,000 emails removed or organised.

## Deployment

| Branch | Environment |
|---|---|
| `main` | Production |
| `develop` | Staging (password-protected, `noindex`) |
| `feature/*` | Preview per PR |
