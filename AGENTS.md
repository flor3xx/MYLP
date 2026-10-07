# Agent instructions

## What this project is

- Personal landing page for **Nicolò Florean**, a developer who builds landing pages. The site itself is the portfolio piece.
- Stack: **Vite + React + TypeScript** (React 19, Vite 8, TypeScript 6). Linting is `oxlint`.
- `src/App.tsx` composes the sections in `src/sections/` (`Nav`, `Hero`, `Range`, `Demo`, `Metodo`, `Contatti`). All styles and design tokens live in `src/index.css`; page copy and the real contact links live in `src/data/content.ts`.
- The hero ships a `three` + `@react-three/fiber` engine (`src/three/Engine.tsx`, lazy-loaded in `src/components/Scrubber.tsx` + `Engine`), driven by a progress ref and a timeline scrubber. `prefers-reduced-motion` disables both and shows a CSS fallback.

## Commands

Run these in order when verifying a change:

```bash
npm run lint      # oxlint
npm run build     # tsc -b && vite build  -> typechecks, then builds to dist/
npm run dev       # Vite dev server (default http://localhost:5173)
npm run preview   # serve the production build locally
```

- There is no test runner. `npm run lint` and `npm run build` are the only automated checks.
- `npm run build` runs `tsc -b` before Vite, so a type error fails the build. Use `npm run build`, not a bare `vite build`, when validating.
- `dist/` is generated and gitignored; never edit it.

## Design and motion are skill-driven (required)

Before any UI, layout, typography, color, or animation work, load and follow these skills:

- `emil-design-eng` — Emil Kowalski's UI polish, component design, and animation-decision philosophy.
- `impeccable` — interface design, hierarchy, cognitive load, accessibility, states, responsive behavior.

- Do not add motion or visual effects that these skills would reject. When they disagree with a generic default, the skills win.
- Respect `prefers-reduced-motion`, gate hover effects behind `@media (hover: hover) and (pointer: fine)`, and keep UI transitions under ~300ms.

## Penpot is the design source of truth

- UI is designed and verified in **Penpot** through the `penpot` MCP server (configured globally in `~/.config/opencode/opencode.jsonc`, not in this repo — never commit the `userToken`).
- Always call `tools.penpot.high_level_overview` first, then `tools.penpot.penpot_api_info` for the specific API types before writing design code.
- Run design operations with `tools.penpot.execute_code`. Use `tools.penpot.export_shape` on a board to capture the UI and compare it against the implementation.
- The Penpot plugin must be connected: open the file, then **File → MCP Server → Connect**. Only one browser tab can own MCP at a time, and that tab must stay active or the connection drops.
- Current file: `MYLP` (id `fd558256-f8c8-8184-8008-c0af0595637e`), page `Page 1`.
- Penpot MCP can write to the design: prefer read-only inspection first, and describe intended changes before applying them.

## Constraints

- The site must work as a real developer's landing page: real contact links, no placeholder `#` hrefs left at deploy, and a first viewport that communicates who this is and what to do next.
