# Product

<!-- impeccable:product-schema 1 -->

## Platform

web (static single page, deployed on Vercel)

## Stack

Vite 8 + React 19 + TypeScript 6, linted with oxlint. Plain CSS with custom properties
in `src/styles/`; no CSS framework, no animation library, no test runner. Preferences
persist in `localStorage` under `mylp-preferences-v2`.

## Users

Primary: prospective freelance clients — small businesses, professionals, and founders
who need a landing page, a website, or a small web product built. They usually arrive
from Instagram or word of mouth, scan the page in seconds on a phone or laptop, and
decide whether Nicolò looks capable enough to contact. Their job: judge ability and
craft quickly enough to start a conversation.

## Product Purpose

Personal landing page for Nicolò Florean, a developer who builds landing pages. It
exists to convert a visitor into a contact. Success is a real inquiry via email,
Instagram, or GitHub from someone who understood what he does.

A second, smaller purpose: the page is itself the demonstration. It is dense,
bilingual, accessible, and fully re-styleable from a live control panel, so the craft
argument is something the visitor can operate rather than read.

## Positioning

A developer who builds landing pages — and, beyond that, websites, web apps, and 3D &
motion work. Not a single-trick template seller.

## Operating Context

- Most first visits come from Instagram or a shared link, often on mobile.
- The page is the portfolio piece: its own quality is the argument for hiring him.
- Visitors compare him against agencies and template sellers; the differentiator is
  craft, range, and the fact that the page can be reshaped on the spot.
- There is no case-study material to show, so the page demonstrates system thinking
  through its own visual specimens instead of inventing projects.

## Capabilities and Constraints

- Single page, five sections: navigation, hero, range of services, method, contact.
  No backend, CMS, e-commerce, form submission, or analytics.
- Live customization: theme (dark/light), accent color (pink, blue, lime, orange),
  accent intensity, typeface pairing (grotesk, editorial, geometric), hero layout,
  density, corner radius, motion level, surface atmosphere, image treatment, and
  language. Every control has a real visual or behavioral effect and persists across
  reloads.
- Bilingual Italian and English, switched at runtime; page copy lives in
  `src/data/copy/`.
- Only these contact channels exist: email, Instagram, GitHub.
- Must stay fast on mobile, keyboard accessible, and respect
  `prefers-reduced-motion`.
- No WebGL or 3D asset ships. "3D & motion" is an offered service, described in copy
  and supported by CSS motion, not demonstrated with a 3D model.
- No fabricated claims, testimonials, client logos, metrics, or pricing.

## Brand Commitments

- Name: Nicolò Florean.
- Contact: email `06flonico@gmail.com`, Instagram `@69flore._`, GitHub
  `github.com/flor3xx`.
- Voice: first person, short sentences, concrete. Italian and English carry the same
  meaning, not a literal translation of each other's idioms.

## Evidence on Hand

- The three confirmed contact links above.
- The real profile photo in `src/assets/profile.jpg`, imported through
  `src/assets/profile.ts`.
- The page's own design system: tokens, specimens, and the customizer are verifiable
  by using the site.
- No testimonials, case studies, project write-ups, client names, or benchmarks are
  confirmed. Future work must not invent them; ask before adding any claim or
  third-party brand. `EVIDENCE.md` is the ledger of what may be published.

## Product Principles

1. Lead with demonstrated capability, not adjectives.
2. Make contact frictionless and obvious from the first viewport.
3. Show range (websites, web apps, 3D & motion) without becoming a menu of everything.
4. Craft is the pitch: the page must feel better than the alternatives, and the
   customizer must feel like an instrument, not a gimmick.
5. Never trade speed, clarity, or accessibility for visual effect.

## Accessibility & Inclusion

Keyboard-reachable contact actions, skip link, visible focus, `aria-pressed` on
preference controls, a dialog that closes with Escape, readable contrast in both
themes and all accent schemes, and a reduced-motion path that keeps all content
visible. Language is switchable at runtime and reflected in `<html lang>`.
