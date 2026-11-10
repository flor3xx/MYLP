# Agent instructions

## What this project is

- Personal landing page for **Nicolò Florean**, a developer who builds landing pages,
  websites, web apps, and 3D & motion work. The site itself is the portfolio piece.
- Stack: **Vite 8 + React 19 + TypeScript 6**. Linting is `oxlint`. There is no test
  runner and no CSS framework; styling is plain CSS driven by custom properties.
- Single page, no router, no backend, no CMS, no analytics. Five sections in
  `src/sections/`: `Nav`, `Hero`, `Range`, `Metodo`, `Contatti`.
- The page is customizable at runtime. Preferences (theme, accent color and
  intensity, typeface, layout, density, radius, motion, atmosphere, image treatment,
  language) live in `src/app/preferences.ts`, are provided by
  `PreferencesProvider`, and persist in `localStorage` under
  `mylp-preferences-v2`.
- Deploy target is **Vercel**, configured entirely by `vercel.json`. There is no
  GitHub Actions deploy workflow and no `process.env.GITHUB_ACTIONS` base switch; do
  not add either.

## Commands

```bash
npm run lint      # oxlint
npm run build     # tsc -b && vite build -> typechecks, then builds to dist/
npm run dev       # Vite dev server (default http://localhost:5173)
npm run preview   # serves the production build locally
```

- `npm run build` runs `tsc -b` before Vite, so a type error fails the build. Use
  `npm run build`, not a bare `vite build`, when validating.
- `npm run lint` and `npm run build` are the only automated checks.
- `dist/` is generated and gitignored; never edit it.

## Architecture

- `src/main.tsx` mounts `App` in `StrictMode`.
- `src/App.tsx` wraps everything in `PreferencesProvider`, renders the skip link and
  the sections inside `<main id="contenuto">`, mounts `CustomizerPill` /
  `CustomizerSheet`, and mirrors preferences into `data-*` attributes on
  `.app-shell` (`data-theme`, `data-color-scheme`, `data-accent-intensity`,
  `data-font`, `data-layout`, `data-density`, `data-radius`, `data-motion`,
  `data-surface`, `data-image-treatment`, `data-type-scale`,
  `data-heading-tracking`, `data-surface-style`, `data-accent-usage`). It also
  keeps `<html lang>` and the document title/description in sync with the
  selected language.
- `src/app/preferences.ts` owns the union types, defaults, reducer,
  `loadPreferences()` validation and `PREFERENCE_PRESETS` — five curated schemes
  applied with one dispatch by `CustomizerPresets`. The provider merges stored
  values over defaults, discards unknown ones, and writes back on every change;
  storage failures must never break the page. Adding a preference means touching all
  of: union type, default, action, reducer case, provider binding, `data-*` in
  `App.tsx`, CSS override, and the IT/EN labels in `src/data/copy/customizer.ts`.
- Styles: `src/index.css` imports, in order, `src/styles/tokens.css`, `base.css`,
  `components.css`, `nav.css`, `hero.css`, `sections.css`, `customizer.css`. All
  visual values are custom properties in `tokens.css`; variants are selectors on
  `.app-shell[data-*]`. Components must not hardcode colors, radii, or durations.
- Copy: one module per area in `src/data/copy/` (`nav`, `hero`, `services`,
  `method`, `contact`, `customizer`), typed by `copy/types.ts`; `translations.ts`
  aggregates them and `t(language)` selects the tree. Every user-visible string must
  exist in both Italian and English.
- Contacts: `src/data/content.ts` exports `CONTACTS` and `MAILTO` — email
  `06flonico@gmail.com`, Instagram `@69flore._`, GitHub `github.com/flor3xx`. These
  are the only verified personal facts on the page.
- Assets: import from `src/assets` (Vite hashes the URL and applies `base`).
  `src/assets/profile.ts` exposes `PROFILE_IMAGE`. Do not reference bundled media
  through a root-absolute `/public` path.
- Motion: `Reveal` + `useInView` (IntersectionObserver) plus CSS transitions and
  keyframes. No animation dependency, no scroll hijacking; horizontal strips use
  native overflow with `scroll-snap`.

## Design rules

- Direction is a **contact sheet / visual archive**: dense, strict rows of specimen
  frames, one small text size for metadata, one committed accent. Read
  `DESIGN.md` before changing layout, type, color, or motion.
- The customizer is the product's core interaction and must not regress: it stays
  openable from anywhere, keyboard usable, closable with Escape, and changes persist
  across reloads. Extend it; do not simplify or remove controls.
- Every preference must change a CSS variable, a data attribute, or real component
  behavior. No decorative-only controls.
- Tokens first: new visual values go in `tokens.css`, not inline in a section.
- Motion budget: UI transitions stay under ~300ms; entrance reveals use the
  `--motion-duration` / `--motion-distance` / `--motion-stagger` tokens
  (480–820ms depending on the motion preference). Animate transform and opacity.
- Respect `prefers-reduced-motion`: content stays visible, travel and drift stop,
  hover effects are gated behind `@media (hover: hover) and (pointer: fine)`.
- Specimens (`src/components/Specimen.tsx`) are CSS diagrams of the page's own
  capabilities. Label them as specimens; never present them as client work, case
  studies, or screenshots of real projects.
- No emoji, no gradient/glass decoration, no fake dashboards, no logo walls, no
  invented numbers or social proof.

## Constraints

- Never invent clients, testimonials, metrics, pricing, projects, locations, awards,
  or performance figures. `EVIDENCE.md` is the ledger of claims that may be
  published; the only confirmed data are the three contact channels and the real
  profile photo.
- Keep the page bilingual (IT/EN) and keep real links only — no placeholder `#`
  hrefs in the shipped page.
- No WebGL canvas, 3D model asset, or animation timeline control ships. "3D & motion"
  is an offered service in copy, demonstrated through CSS motion only; do not add a 3D
  dependency or a model file.
- Do not add analytics or third-party scripts. Do not add SPA rewrites to
  `vercel.json`: the site is one page and real 404s should stay 404s.
- Keep the site fast and accessible over visual effect.

## Deployment

- `vercel.json`: framework `vite`, `npm ci`, `npm run build`, output `dist`, immutable
  cache for `/assets/*`, and `X-Content-Type-Options`, `Referrer-Policy`,
  `Permissions-Policy` on every response.
- `vite.config.ts` uses `base: '/'`. Imported assets inherit it; never hardcode `/`
  paths for bundled files.
- Metadata: `index.html` carries the static Italian title, description, Open Graph,
  `theme-color`, and the Google Fonts links. Runtime language switching updates
  `<title>` and `<meta name="description">` from `copy.meta`.

## Design and motion are skill-driven

Before UI, layout, typography, color, or animation work, load and follow:

- `emil-design-eng` — UI polish, component design, animation decisions.
- `impeccable` — hierarchy, cognitive load, accessibility, states, responsive
  behavior.

When these skills disagree with a generic default, the skills win.

## Penpot is the design source of truth

- UI is designed and verified in **Penpot** through the `penpot` MCP server
  (configured globally outside this repo — never commit the `userToken`).
- Call `high_level_overview` first, then `penpot_api_info` for the API types before
  writing design code. Run operations with `execute_code`; capture boards with
  `export_shape` and compare them against the implementation.
- The plugin must be connected: open the file, then **File → MCP Server → Connect**.
  One browser tab owns MCP at a time and must stay active.
- Current file: `MYLP` (id `fd558256-f8c8-8184-8008-c0af0595637e`), page `Page 1`.
- Prefer read-only inspection first, and describe intended changes before applying
  them.

## Verification

1. `npm run lint`
2. `npm run build`
3. Browser pass at 1440, 768, 390, and 320px.
4. Keyboard pass: skip link, nav, customizer trigger, every control in the sheet,
   Escape to close.
5. Exercise every preference in both themes and both languages, plus
   `prefers-reduced-motion: reduce` with `motion: off` — content must stay visible.
6. Confirm no dead links, no placeholder hrefs, and no invented claims.
