# MYLP Redesign Handoff

## Decision

Preserve the product truth and the live customizer. Replace the current generic vertical landing page with a **contact-sheet / archive-strip portfolio**: Nicolò's page is a visible, remixable instrument. The page should feel like a working design specimen, not a template.

**Art direction:** The contact sheet (seed 1783279769). Chosen because the brief asks for visual density, and the product's strongest evidence is the page itself plus the visitor's ability to change it. No generic dashboard, testimonial, pricing, logo wall or fabricated case study.

**Idea sentence:** On this page, Nicolò's real design controls and visual range become a living contact sheet that visitors can remix.

**Live thing:** the visitor opens the customizer, switches a preset or changes individual visual controls, and sees the entire page—including motion timing, scroll behavior, color accents, typography, density and image treatment—adapt as one coherent system. Changes persist on reload.

## Non-negotiables

- Keep real facts and links: Nicolò Florean, `06flonico@gmail.com`, `@69flore._`, `github.com/flor3xx`.
- Keep Italian/English support.
- Keep reduced-motion support and keyboard accessibility.
- Do not invent clients, metrics, testimonials, prices, projects, locations or performance claims.
- Keep the customizer. Expand it; never remove or simplify it.
- Vercel deployment: asset URLs must work under `/` and any configured `base`; use Vite `import.meta.env.BASE_URL` or imported assets, never an unscoped root URL for bundled media.
- Do not add a dependency only for animation. CSS transitions/keyframes plus IntersectionObserver/native horizontal scrolling are enough.

## Information architecture

1. **Hero / lit strip**
   - Plain top bar: wordmark, 3 links, availability/action.
   - Four-corner metadata blocks; no tiny eyebrow badge above the heading.
   - Large short statement: “Landing page che lavorano.” / “Landing pages that work.”
   - Horizontal strip of visual frames: profile photo crops plus CSS-built interface specimens (theme swatches, type samples, layout miniatures, motion glyphs). Native horizontal scroll + snap; no hijacked vertical scroll.
   - Primary mail CTA and secondary anchor link.
   - Small “remix this page” affordance that opens the customizer.

2. **Range / visual specimen sheet**
   - Not three identical cards. Use an asymmetric 12-column frame run: one large visual frame, two narrow specimens, a text-light metadata rail.
   - Services remain the truth: Websites, Web apps, 3D & motion. The visuals are drawn UI specimens, not fake client work.
   - Hover/focus highlights a frame; keyboard users get the same state.

3. **Method / horizontal process row**
   - Four visual moments: Capisco, Progetto, Costruisco, Verifico. Existing copy remains factual; labels can be localized.
   - Horizontal scroll-snap row with a visible progress bar. Buttons only on desktop; native touch scrolling on mobile.
   - Each item contains an abstract CSS “frame” demonstrating the current theme/font/accent, so controls visibly alter the process visuals too.

4. **Customizer showcase / “make it yours”**
   - A dense split section: live preview mini-frame on one side; controls on the other.
   - The floating pill remains available globally. The sheet becomes a responsive dialog/drawer with focus handling, close-on-Escape, and focus return.
   - Group controls into Preset, Color, Type, Layout, Motion, Atmosphere.

5. **Contact / saturated close**
   - Keep real email, Instagram and GitHub links.
   - Strong flat accent field, image/frame strip, one clear CTA. No fake form submission.
   - Footer tiles: wordmark, links, contact, current theme summary.

## Expanded preference model

Keep existing fields and add these typed fields:

- `language`: `it | en`
- `theme`: `dark | light`
- `motion`: `off | calm | on | expressive` (existing `on/off` values migrate to `on/off`)
- `density`: `comfortable | compact | dense`
- `radius`: `soft | rounded | sharp`
- `colorScheme`: `pink | blue | lime | orange`
- `font`: `grotesk | editorial | geometric` (load only declared Google font families)
- `layout`: `sheet | split | centered` (changes composition tokens, not content)
- `surface`: `flat | grain | scanlines` (decorative atmosphere, disabled under reduced motion if animated)
- `imageTreatment`: `natural | monochrome | highContrast`
- `accentIntensity`: `subtle | standard | vivid`

Migration rules: validate stored data against unions, merge with defaults, discard unknown values, and preserve a version key. Persist to `localStorage` under `mylp-preferences-v2`; do not block first paint if storage is unavailable.

Every preference must affect either a CSS variable/data attribute or a real component behavior. No control may be decorative-only.

## Token system

All visual values flow through CSS variables on `.app-shell`:

- Color: `--bg`, `--surface`, `--surface-2`, `--line`, `--ink`, `--muted`, `--accent`, `--accent-ink`, `--accent-rgb`, `--accent-soft`.
- Type: `--font-display`, `--font-body`, `--font-scale`, `--tracking-display`.
- Layout: `--page-pad`, `--section-gap`, `--frame-gap`, `--density-multiplier`, `--content-max`.
- Shape: `--radius-card`, `--radius-control`, `--stroke-width`.
- Motion: `--motion-duration`, `--motion-stagger`, `--motion-distance`, `--ease-out`, `--ease-in-out`, `--marquee-duration`.
- Atmosphere: `--grain-opacity`, `--image-filter`, `--surface-contrast`.

Theme changes update variables, not isolated component rules. The same tokens drive CSS animation durations/delays and JS scroll-reveal timing. `data-motion="off"` must disable transforms but retain readable opacity/color transitions.

## Motion system

Purposeful motions only:

- **Hero signature:** horizontal frame strip enters with staggered clip reveal; on pointer hover (fine pointer only), neighbouring frames dim and the focused frame lifts using transform/opacity.
- **Scroll entrance:** each section's visual parts reveal once with `clip-path`/opacity + translateY 16–24px; stagger 50–80ms. Content remains visible if JS fails.
- **Frame run:** scroll-snap and a tokenized progress indicator communicate spatial continuation.
- **Atmosphere:** optional low-amplitude grain/scanline drift; never necessary for legibility.
- **Controls:** button press `scale(.97)` for 120ms; sheet uses drawer curve and trigger-aware origin.
- **Customizer adaptation:** changing `motion` updates reveal distance, stagger, strip drift and hover lift; changing `density` updates stagger cadence; changing `surface` changes texture animation; changing `layout` changes reveal origin. The page must visibly recompose, not only recolor.

Use CSS for predetermined motion and IntersectionObserver for entry state. Use transform/opacity/clip-path only for movement. Respect `prefers-reduced-motion: reduce` by disabling travel, marquee and parallax while preserving state/color transitions. Gate hover styles with `(hover: hover) and (pointer: fine)`.

## Visual anti-slop rules

- No purple gradient, glass cards, floating pill nav, fake dashboard, generic three-card feature grid, meaningless statistics, invented social proof, or decorative emoji.
- One strong concept: contact sheet / archive drawer. Visual density comes from deliberate frames and specimens, not extra copy.
- Use square or one consistent corner treatment selected by the customizer; do not mix radii.
- Keep copy short and concrete. Headings maximum two lines at mobile.
- Use the profile image only as Nicolò's actual image; all other frames are explicitly labelled visual specimens or service diagrams.
- Keep body text at least 16px and controls at least 44px.

## Acceptance checks

- `npm run lint`
- `npm run build`
- Manual/browser checks at 1440, 768, 390 and 320px.
- Keyboard: skip link, nav, customizer trigger, dialog controls, close/Escape, focus return, horizontal row controls.
- Test every preference in dark/light and IT/EN; verify coherent adaptation of layout, type, color, density, image treatment and motion.
- Verify `prefers-reduced-motion` and `motion=off` never leave content hidden.
- Verify Vercel/base asset paths and no dead links.
- Run Impeccable detector once on changed UI targets and fix all blocking findings.
- Run design-taste inspector if browser tooling is available; review screenshots rather than trusting CSS.

## Implementation order for the coding agent

1. Extend `src/app/preferences.ts` with new unions, defaults, migration and persistence in the provider.
2. Extend translations for all new labels and short live specimen copy.
3. Rebuild shared token layer and responsive layout in `src/index.css`.
4. Recompose `Hero`, `Range`, `Metodo`, `Contatti`; add a visual specimen component and process strip component if needed.
5. Upgrade `CustomizerSheet` to grouped controls and accessible responsive dialog behavior.
6. Add reveal/scroll-strip motion using existing hooks; update `Reveal` to tokenized motion and reduced-motion behavior.
7. Fix asset handling for Vercel (`profilePick.jpeg` imported or `import.meta.env.BASE_URL`).
8. Run lint/build/browser checks and detector; then update stale README/DESIGN docs.

## Open decisions for implementation

- Whether layout presets should materially reorder sections or only change column geometry; default to geometry so anchors and accessibility remain stable.
- Whether to use local image imports or public URLs; prefer imported `profilePick.jpeg` for Vercel-safe hashing.
- Custom accent color input is optional only if contrast validation is implemented; otherwise keep curated schemes and expose intensity.
