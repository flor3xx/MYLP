# Design

Direction: **“Il mech”** — dark cinematic. A 3D robot mech (`public/mech.glb`, loaded with React Three Fiber) fills the hero and is driven by a drag/scrub **timeline** control, echoing animejs.com. The rest of the page stays on the dark ground.

## Surface & mode

- Mode: **Persuade** (marketing landing page).
- Audience: prospective freelance clients (small businesses, professionals, founders) arriving from Instagram/word of mouth, usually on mobile.

## Color

| Token | Value | Role |
| --- | --- | --- |
| `--bg` | `#0b0b0d` | Near-black ground |
| `--surface` | `#141417` | Cards, pills |
| `--surface-2` | `#1a1a1f` | Inputs, controls panel |
| `--line` | `#26262c` | Hairline borders |
| `--ink` | `#f5f5f7` | Primary text |
| `--muted` | `#8a8a92` | Secondary text |
| `--accent` | `#ff4d8d` | Pink: primary action, live state, 3D highlights |
| `--accent-ink` | `#16050d` | Text on pink |
| `--cobalt` | `#b14dff` | 3D secondary light + demo orb only |
| `--violet` | `#d67bff` | Demo orb only |

Strategy: near-black ground with a single committed pink accent. The pink/violet family appears in the 3D lighting and the demo; UI chrome stays neutral.

## Typography

- Display: **Bricolage Grotesque** (700/600/500) — wordmark, H1/H2, card/step titles.
- Body/UI: **Schibsted Grotesk** (400–600).
- No monospace; technical labels use uppercase Schibsted with wide tracking.
- H1: `clamp(38px, 5vw, 68px)`, weight 700, line-height 1.02, tracking −0.03em, `em` in pink.

## Form & components

- Capsule-first: buttons, chips, pills, segmented controls, scrubber use `border-radius: 999px`.
- Hero is **full-bleed** (`min-height: 100svh`) with the 3D canvas behind, a left-to-right scrim for text legibility, overlay text on the left, a chapter rail on the right and the scrubber at the bottom.
- Reusable pieces: `.btn` (`--primary` pink, `--dark` ghost, `--sm`, `--lg`), `.chip`, `.badge`, `.card`, `.seg`, `.contact-pill`, `.scrubber`.

## 3D engine

- `src/three/Engine.tsx` — React Three Fiber canvas rendering **`public/mech.glb`** (a Quaternius mech, glTF 2.0).
- The model is auto-normalized at load (bounding box → centered + scaled to a target size), so its native scale/orientation in the file does not matter.
- Reflections come from `RoomEnvironment` via `PMREMGenerator`; there is **no external HDRI asset**.
- Driven by a `progress` ref (0→1): the mech spins as the timeline is scrubbed. The engine (and the model) is lazy-loaded as a separate chunk so the initial bundle stays small.
- The model ships **17 skeletal clips** (Idle, Walk, Run, Dance, …). The **Dance** clip runs continuously through an `AnimationMixer` on real time, so the robot keeps dancing even when the timeline is paused.
- The mech's horizontal offset is proportional to viewport aspect (centered on narrow screens, shifted right on wide ones).

## Motion

- Easing: `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`; UI transitions under ~300ms.
- Press feedback: `transform: scale(0.97)` on buttons/pills.
- The **scrubber** (native `input[type=range]`) seeks the animation, pauses auto-play on scrub, and has a play/pause control.
- `prefers-reduced-motion: reduce`: the 3D engine and scrubber are not rendered at all; a CSS ring fallback is shown. Hover effects only under `@media (hover: hover) and (pointer: fine)`.

## Layout & responsive

- `≤1080px`: single-column cards, demo canvas stacks, chapter rail hidden.
- `≤900px`: nav links hidden; steps stack with a left rail.
- `≤640px`: 3D canvas hidden (CSS fallback used), full-width buttons/pills, single-column demo preview, stacked footer.

## Accessibility

- Skip link to `#contenuto`; focus ring in pink.
- Segmented controls use `aria-pressed`; the scrubber is a labelled range input; decorative layers are `aria-hidden`.
- Real links only (mailto, Instagram, GitHub).

## Unresolved / next

- The mech's embedded `Dance` clip plays rather than a bespoke animation; other clips (Idle, Walk, Run, Shoot…) are available in the file if a different interaction is wanted.
- No work/case-study section yet (no confirmed project evidence).
