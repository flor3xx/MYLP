# Design

Direction: **the contact sheet** — the page reads as an archive of small specimen
frames in strict rows, with one display statement and one committed accent. Nothing
is "featured" as client work, because no client work can be claimed: the frames are
CSS diagrams of the page's own capabilities (layout, palette, type, motion), and the
visitor can re-cut the whole sheet live through the customizer.

## Surface & mode

- Mode: **Persuade** (personal marketing page).
- Audience: prospective freelance clients — small businesses, professionals, founders
  — arriving from Instagram or word of mouth, usually on a phone.
- Default look: dark ground, pink accent, Bricolage Grotesque + Schibsted Grotesk.
  Every visual property below is a starting point the visitor can change.

## Color

Base tokens (dark, default) live in `src/styles/tokens.css`; the light theme is a set
of overrides on `.app-shell[data-theme="light"]`.

| Token | Dark (default) | Light | Role |
| --- | --- | --- | --- |
| `--bg` | `#0a0a0b` | `#f1efec` | page ground, also `<html>`/`<body>` |
| `--surface` | `#151518` | `#e2dfdc` | frames, method band, quiet blocks |
| `--surface-2` | `#1d1d22` | `#d7d3d0` | customizer sheet, pill, controls |
| `--line` | `#303036` | `#beb8b5` | hairlines and borders |
| `--ink` | `#f7f6f4` | `#171516` | primary text |
| `--muted` | `#a4a1a3` | `#655f60` | secondary text, metadata |
| `--accent` | `#ff4d8d` | inherits | primary action, live state, focus |
| `--accent-ink` | `#1a0710` | `#fff6fa` | text on the accent field |
| `--accent-rgb` | `255, 77, 141` | inherits | basis for `--accent-soft` |
| `--accent-soft` | `rgba(255,77,141,.16)` | inherits | tinted fills, halos |

Accent schemes (`data-color-scheme`): pink `#ff4d8d` (default), blue `#78a5ff`,
lime `#cced3a`, orange `#ff9d54`, each with its own `--accent-ink` and
`--accent-rgb`. `data-accent-intensity` scales only `--accent-soft`: subtle `.08`,
standard `.16`, vivid `.25`.

`data-accent-usage="action"` pulls the accent back to actions, focus and live
state, and remaps the contact field to a neutral surface; `everywhere` (default)
also paints the statement emphasis and the whole contact field.

`data-surface-style` switches frames and the method band between `solid`, `panel`
(raised tone) and `outline` (bordered, unfilled). `data-type-scale` scales the type
ramp (`small` `.94`, `regular` `1`, `large` `1.07`) and `data-heading-tracking`
changes title tracking (`tight` `-.075em`, `normal`, `wide` `-.012em`).

Strategy: one accent at a time. Everything else stays neutral so the accent field
is the only saturated surface, and a preset can move that surface without breaking
contrast.

## Typography

Three selectable pairings, declared in `index.html` and switched by `data-font`:

| `font` | Display (`--font-display`) | Body (`--font-body`) |
| --- | --- | --- |
| `grotesk` (default) | Bricolage Grotesque | Schibsted Grotesk, Helvetica Neue |
| `editorial` | DM Serif Display, Georgia serif | Bricolage Grotesque |
| `geometric` | Syne | Syne |

Scale:

- Hero statement: `clamp(48px, 8.2vw, 128px)`, line-height `.9`, tracking `-.065em`;
  the emphasised word is set in `--accent` and is not italicised.
- Section titles: `600 clamp(36px, 5vw, 76px) / .93`, tracking `-.06em`;
  the contact title uses `--xl`: `clamp(44px, 7vw, 104px)`.
- Body: `16px / 1.55`; section lead `18px`, max `58ch`; hero lead
  `clamp(16px, 1.5vw, 20px)`, max `52ch`.
- Metadata, captions, labels: `13–14px` in sentence case, in `--muted`. No
  monospace face and no tiny tracked uppercase labels; only the diagram chrome
  inside a specimen frame goes smaller, because it is scaled-down furniture rather
  than reading text.

Hierarchy comes from scale and position, not from many weights: regular and 600,
occasionally 700 for the wordmark.

## Shape & density

| Token | Default | `compact` | `dense` |
| --- | --- | --- | --- |
| `--page-pad` | `clamp(18px, 4vw, 64px)` | `clamp(14px, 3vw, 40px)` | `clamp(12px, 2.4vw, 32px)` |
| `--section-gap` | `clamp(96px, 14vw, 220px)` | `clamp(76px, 10vw, 150px)` | `clamp(62px, 8vw, 120px)` |
| `--frame-gap` | `10px` | `6px` | `4px` |
| `--motion-stagger` | `70ms` | `52ms` | `38ms` |

Radii follow `data-radius`: `soft` (default) `8px` on cards, `rounded` `24px`,
`sharp` `0px` with controls dropping to `4px`. Controls are pills
(`--radius-control: 999px`) except in `sharp`. The `18px` value in `:root` is only
the pre-attribute fallback; the default preference always overrides it.

Density changes rhythm (padding, gaps, section spacing), never font size or content.

## Composition

One column of full-width sections, max content width `min(100% - 2 * --page-pad, 1440px)`.

1. **Nav** — absolute overlay, `min-height: 78px`: display-face wordmark, three
   anchor links (`#cosa-faccio`, `#metodo`, `#contatti`), and an availability badge
   with an accent dot and halo. No background, no sticky behaviour.
2. **Hero** (`#top`) — `min-height: 100svh`, centered column. A three-part metadata
   row at the top (name, availability, disciplines), the display statement whose last
   word is accented, a lead paragraph, then a primary `mailto:` button plus a quiet
   anchor link. Below sits a horizontally scrolling strip of five specimen frames
   (`window`, `palette`, `motion`, `layout`, `window`), the middle one larger, with
   `scroll-snap` and a bottom gradient scrim into the page ground. A bottom row holds
   a scroll hint and a "remix the page" link.
3. **Range** (`#cosa-faccio`) — section title and lead above an asymmetric 12-column
   frame run (`6 / 3 / 3`): one large specimen at `390px` and two at `235px`, each
   captioned with service name, tags, and a short paragraph. Hover highlights a
   single frame and dims its siblings (fine pointers only).
4. **Metodo** (`#metodo`) — a `--surface` band. Header with title and a drag hint,
   then a horizontal snap track of three moments (`01–03`): number, stage label,
   title, copy, and a specimen at the bottom, so the cards read top-to-bottom while
   the row moves sideways.
5. **Contatti** (`#contatti`) — a full accent field in `--accent-ink` text. A strip of
   three specimens drifts slowly at the top (`24s` linear loop), then the largest
   statement, the lead, an inverse primary button for email, and Instagram/GitHub
   pills. A footer row closes with the year and the credit line.

The `layout` preference only touches the hero composition (`sheet` is the base with
no extra rules; `split` narrows and indents the copy; `centered` centers copy and
CTA). Section order and anchors never change, so navigation stays stable.

## Specimens

`src/components/Specimen.tsx` renders four CSS-only variants, each with a 34px chrome
bar (three dots and a label) and a `min-height: 180px` frame:

- `window` — a 4×2 layout miniature with an accent block and a short display line.
- `palette` — four swatches reading accent, surface, ink, accent-soft.
- `motion` — concentric orbit rings with three dots.
- `layout` — a `1.3fr / 0.7fr` three-row miniature.

They always read from live tokens, so switching theme, accent, type, or radius
recomposes the visuals too. They are diagrams, never screenshots or client work.

## Motion

Token-driven, CSS only.

| Token | Default | `calm` | `expressive` |
| --- | --- | --- | --- |
| `--motion-duration` | `620ms` | `480ms` | `820ms` |
| `--motion-distance` | `24px` | `12px` | `38px` |
| `--motion-stagger` | `70ms` | `90ms` | `88ms` |

Easing: `--ease-out: cubic-bezier(.23, 1, .32, 1)` for entrances and presses,
`--ease-in-out: cubic-bezier(.77, 0, .175, 1)` for two-way changes.

- **Entrance** — `Reveal` renders `opacity: 0` plus `translateY(--motion-distance)`
  and flips to visible once `useInView` reports intersection (threshold `.1`,
  `rootMargin: 0 0 -40px`). Delay comes from a per-item prop, produced by
  `index * --motion-stagger`-ish values in the sections. If JS never runs, the CSS
  `prefers-reduced-motion` path and the `motion: off` preference both force content
  visible.
- **Press** — `transform: scale(.97)` on buttons and controls, `140–150ms`.
- **Hover** — fine pointers only: frames lift `-6px` with a `0.4deg` rotation; in the
  hero strip siblings dim to `brightness(.55)` and the hovered frame lifts `-10px`
  with `-1deg`. Links shift color, `180ms`.
- **Drift** — the contact specimen strip translates from `-4%` to `-28%` over `24s`,
  linear, decorative only.
- **Customizer** — sheet enters from the top right in `220ms`; on mobile it becomes a
  bottom sheet with a `260ms` upward entry.
- **Scroll** — native `overflow-x` with `scroll-snap` on the hero strip, the method
  track, and the contact strip. Vertical scroll is never intercepted.

`prefers-reduced-motion: reduce` removes travel entirely: reveals fade in without
translation (`180ms`), drift stops, hover lifts and press scales are cancelled, and
smooth scrolling is disabled. The `motion: off` preference goes further and kills
every animation and transition (`1ms`) while keeping content visible.

## Atmosphere

`body::before` is a fixed, pointer-transparent noise layer built from an inline SVG
`feTurbulence` filter, `mix-blend-mode: soft-light`, opacity `--grain-opacity: .07`.
`data-surface` switches it: `flat` sets the opacity to `0`, `scanlines` replaces the
noise with a `5px` repeating rule at `.1` opacity. Both are static; neither affects
legibility or hit targets.

## Images

`src/assets/profile.jpg` is the only real photograph, exposed as `PROFILE_IMAGE`
through `src/assets/profile.ts`. `data-image-treatment` filters every `<img>`:
`monochrome` = `grayscale(1) contrast(1.12)`, `highContrast` =
`contrast(1.3) saturate(1.18)`, `natural` = no filter.

## Responsive

- `≤900px`: nav links hidden (wordmark and availability remain), Range drops to two
  columns with the large frame spanning both, hero metadata tightens.
- `≤640px`: hero padding and statement scale down, the third metadata item hides, CTAs
  stack full width, hero strip frames become `78vw`, Range becomes one column, the
  method track narrows to `78vw` cards, the customizer becomes a full-width bottom
  sheet capped at `88svh`, and the footer stacks.

## Accessibility

- Skip link to `#contenuto`, visible on focus; `:focus-visible` draws a `3px` accent
  outline with `4px` offset.
- Preference controls are buttons with `aria-pressed`, grouped in `fieldset` with
  `legend` and `role="group"` + `aria-labelledby`.
- The sheet is `role="dialog" aria-modal="true"` labelled by its title, closes on
  Escape, and moves focus to its close button on open. A polite live region reports
  that changes save automatically.
- Native semantics for links and buttons; external links use
  `rel="noopener noreferrer"`.
- Reduced motion and the `motion: off` preference never leave content invisible.
- Color: body text is `--ink` on `--bg`/`--surface`; `--muted` is used only for
  secondary text at `13–18px`; the accent field always pairs with `--accent-ink`.

## Known gaps

- No Open Graph image and no canonical URL are configured; `index.html` carries a
  `twitter:card` of `summary` and no `og:image`.
- The sheet moves focus to its close button but does not trap focus or return focus
  to the trigger on close.
- Nav links are hidden below `900px`; the anchors remain reachable from the hero and
  by scrolling.
- Specimen frames carry `aria-label` on a plain `div` (no role), so the label is not
  reliably exposed to assistive tech; the visible chrome text carries the meaning.
- No 3D scene ships. The "3D & motion" service is described in copy and demonstrated
  through CSS motion only.

## Deliberate deviations from the generic house rules

These are decisions, not leftovers. They are recorded so a future pass does not
"fix" them back into a generic page:

- **1px lines on frame chrome and section heads.** The contact-sheet direction is
  an archive grid; the hairline is the frame edge, not decoration. Lines never
  separate ordinary prose blocks — those are separated by space and tone.
- **Shadow on the dialog and the floating trigger.** The customizer sheet and pill
  genuinely float over the page, so they keep elevation. Nothing at rest carries a
  shadow, and the accent halos around live dots were removed.
- **One gradient, used as a scrim.** The gradient at the bottom of the hero only
  darkens the photograph so the strip below stays legible. The scanline atmosphere
  mode uses a repeating pattern as texture, not as a decorative colour wash.
- **Accent fields instead of greys.** The contact section is one saturated field;
  contrast on it is checked in both themes.

The design-taste linter still reports these patterns; the Inspector and the
rationale above are the intended state of the page, not a defect to chase.
