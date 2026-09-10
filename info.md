# MYLP — Portfolio "Film Scroll" (redesign 3D centrale)

> Website: portfolio personale di **Nicolò Florean** (Web Developer & Designer) con esperienza di scorrimento "a film" pilotata da GSAP ScrollTrigger.
>
> **Redesign in corso**: il layout è passato da 4 scene sequenziali a schermo pieno a un **layer 3D centrale persistente** (toro + ottaedro) con **info in overlay ai lati** che compaiono a finestre di scroll.
>
> Commit iniziale: `45f21c2` — "feat: portfolio film-scroll con GSAP, Three.js e React"
> Build: `dist/` (index-*.js ~1.07 MB)

---

## 1. Panoramica e concept

**Concept core**: ScrollTrigger GSAP con `scrub: 0.6` mappa lo scroll di un proxy (400vh/500vh mobile) su un numero `progress: 0 → 1`. Questo progresso globale:

1. guida il **3D centrale** (il toro ruota/deforma SOLO con lo scroll; l'ottaedro ruota sempre);
2. guida le **finestre** in cui ogni sezione informativa overlay appare/scompare.

Il 3D (toro deformato "anello" + ottaedro wireframe "prisma", quelli un tempo nella scena Contatti) è ora **il soggetto centrale di tutta la pagina** e non si smonta mai.

**Disposizione sezioni (overlay sul 3D):**
| Slot | Sezioni |
|------|---------|
| ✅ Sinistra | Hero (nome + sottotitolo) → About (bio + skill) |
| ✅ Destra | Portfolio (righe compatte) |
| ✅ Centro | Contatti (email + Instagram + CTA + footer) — **centrali, con vignette scura dedicata** |

**Finestre di progress** (`WINDOWS` in `FilmScroll.jsx`):
| Sezione | Range | Fade-out dopo |
|---------|-------|---------------|
| hero | 0 → 0.20 | 0.06 |
| about | 0.20 → 0.50 | 0.06 |
| portfolio | 0.50 → 0.78 | 0.06 |
| contact | 0.80 → 1.00 | nessuno (resta fino alla fine) |

---

## 2. Stack tecnologico

| Area | Tecnologia | Versione |
|------|------------|----------|
| Framework | React | ^18.3.1 |
| Build tool | Vite | ^5.4.11 |
| Linguaggio | JSX (no TypeScript) | — |
| 3D | Three.js + @react-three/fiber | ^0.160.1 / ^8.18.0 |
| 3D helpers | @react-three/drei (Float, MeshWobbleMaterial) | ^9.122.0 |
| Animazione scroll | GSAP + ScrollTrigger | ^3.15.0 |
| Animazione (dichiarata, NON usata) | animejs | ^4.0.0 |
| Styling | CSS puro (single `index.css` con design tokens) | — |
| Font | Space Grotesk (headings), Inter (body), JetBrains Mono (labels) via Google Fonts | — |

> **Nota**: `animejs` è in `package.json` ma non viene importato da nessun file sorgente (dipendenza morta — animazioni procedurali/GSAP). Niente Tailwind, niente test/lint.

**Script npm**:
```bash
npm run dev       # Vite dev server
npm run build     # Vite build → dist/
npm run preview   # Pre-view della build
```

---

## 3. Struttura dei file

```
MYLP/
├── index.html                  # lang="it", title, meta OG, font Google, favicon
├── vite.config.js              # Solo plugin react()
├── package.json
├── .gitignore                  # node_modules, dist, .DS_Store, *.local
├── public/
│   └── favicon.svg             # Riquadro scuro con gradiente viola 'NF'
├── dist/                       # Build prod (gitignored)
├── src/
│   ├── main.jsx                # ReactDOM root, StrictMode
│   ├── App.jsx                 # → renderizza <FilmScroll />
│   ├── index.css               # TUTTO lo styling + design tokens (nuovo layout a slot)
│   ├── data/
│   │   └── content.js          # SKILLS (usate), SERVICES/TIMELINE (pronti ma inutilizzati)
│   ├── components/
│   │   ├── ProgressBar.jsx     # Barra orizzontale in basso, cresce col progresso
│   │   └── ScrollHint.jsx      # Hint "Scrolla per esplorare ↓", si dissolve al primo scroll
│   ├── scenes/
│   │   ├── FilmScroll.jsx      # Orchestratore: 3D fisso + slot overlay + finestre
│   │   ├── HeroScene.jsx       # (SINISTRA) nome 'nicolò.florean' + sottotitolo
│   │   ├── AboutScene.jsx      # (SINISTRA) bio + skill pills
│   │   ├── PortfolioScene.jsx  # (DESTRA) righe compatte progetti + CTA
│   │   └── ContactScene.jsx    # (ALTO) contatti + CTA + footer
│   └── three/
│       └── CentralGeometry.jsx # Scene 3D centrale: toro (scroll-driven) + ottaedro (time-driven)
```

**Rimossi col redesign**: `components/ScrollIndicator.jsx`, `components/GeometricShapes.jsx`, `three/HeroGeometry.jsx`, `three/ContactGeometry.jsx` (sostituito da `CentralGeometry`).

---

## 4. Come funziona il FilmScroll

### 4.1 Layout
- `.film-viewport`: `position: fixed`, `inset: 0`. Contiene (in ordine di z-index): layer 3D (z0), slot sezioni (z2).
- `.film-scroll-proxy`: div invisibile alto 400vh (mobile 500vh) → crea lo spazio di scroll.
- Slot laterali (`.section-slot--left` / `--right`): centrati verticalmente al 50%, card in absolute con `top:50% translateY(-50%)`.
- Slot top (`.section-slot--top`): centrato orizzontalmente, in alto.
- Ogni `.info-bloc` (card con backdrop-blur) è renderizzata da una sezione; la visibilità è regolata dall'opacity che riceve come `progress`.

### 4.2 Orchestrazione (`FilmScroll.jsx`)
1. `gsap.context` crea `gsap.to(dummy, { progress: 1, scrub: 0.6 })` collegato al proxy.
2. `onUpdate` → `setProgress(self.progress)` (progresso globale 0→1).
3. `windowProgress(gp, start, end, fadeOut)` restituisce per ogni sezione il suo progresso:
   - 0→1 dentro la finestra, 1→0 nel breve fade-out dopo la fine (evita sovrapposizioni nello stesso slot).
4. Il 3D centrale riceve il `progress` globale (per il toro) + `reduced` (prefers-reduced-motion).

### 4.3 Convenzione animazione procedurale
Nessuna timeline GSAP interna alle sezioni: ogni sezione deriva i keyframe da funzioni matematiche su `progress` (pattern `clamp((progress - start) * speed)`). Con `reduced` (prefers-reduced-motion) gli spostamenti `translateX/Y` sono azzerati (`move = reduced ? 0 : 1`), restano solo i fade.

---

## 5. Il 3D centrale (`CentralGeometry.jsx`)

- **Ottaedro wireframe (il "prisma")** — viola chiaro `#c084fc`, emissive, `metalness 0.9`. **Ruota SEMPRE** via `useFrame`: `rotation.x = t*0.3`, `rotation.y = t*0.45`, piccolo oscillazione Z. Avvolto in `<Float>` (galleggia). Con `reduced`: fermo in una pose statica.
- **Toro deformato (l'"anello")** — viola scuro `#7c3aed`, `MeshWobbleMaterial`. **Si muove SOLO con lo scroll** (volutamente lento):
  - rotazione = `progress × 1.2π` (X) e `progress × 0.8π` (Y);
  - deformazione `factor`: **0 a riposo** (progress 0), `0.08 + progress*0.3` con lo scroll, `speed 1.0`;
  - con `reduced`: `speed = 0` (materiale congelato).
- **Intro**: all'ingresso il gruppo scala da 0.6 → 1 con GSAP (power2.out, delay 0.2), insieme al nome. Con `reduced`: nessun movimento (scala già 1).
- Camera `[0,0,6.5]` fov 40, `dpr=[1,1.5]`, alpha. Luci: ambient + directional + 2 point viola.

---

## 6. Le sezioni overlay

### 6.1 Hero (sinistra) — finestra 0→0.2
Nome "nicolò.florean" **letter-by-letter** (chiave `(progress*3 - i*0.06)*4`), punto in `.accent`, sottotitolo mono fade-in. Card che entra in `translateY`.

### 6.2 About (sinistra) — finestra 0.2→0.5
- Text block (label `// chi sono`, titolo, 2 bio) entra da `translateX(-30px)`.
- Skills pills (6, da `content.js`) appaiono in **stagger** (`i*0.1`), finestra `(progress-0.3-delay)/0.12`.

### 6.3 Portfolio (destra) — finestra 0.5→0.78
Sostituisce le vecchie 3D card con **righe compatte** (`.portfolio-row`): tag + titolo + descrizione + link "Visita →", hover con accento colore per progetto (`--card-accent`). Due progetti:
1. **Lucio Mior** → `https://luciomior.eu`
2. **Questo sito** → `#` (link da sostituire al deploy)

### 6.4 Contact (al centro, con vignette) — finestra 0.8→1
Slot centrato pieno schermo (`.section-slot--center`), accompagnato da una **vignette radiale scura** (`.contact-vignette`) la cui opacity segue la finestra. Contatti: **Email** `06flonico@gmail.com` (mailto) e **Instagram** `@69flore._`, entrance in stagger. CTA "Disponibile per progetti freelance e collaborazioni." + footer `nicolò.florean` / anno dinamico.

---

## 7. Design system (tokens in `index.css`)

| Token | Valore | Uso |
|-------|--------|-----|
| `--bg` | `#0a0a0a` | Sfondo principale |
| `--surface` | `#1a1a1a` | Righe portfolio, contact links, skill pills |
| `--purple` | `#a855f7` | Accent, bordi, link |
| `--purple-deep` | `#7c3aed` | Gradienti, emissive |
| `--purple-glow` | `#c084fc` | Glow, wireframe |
| `--text` | `#f5f5f5` | Testo principale |
| `--text-muted` | `#8a8a8a` | Sottotitoli, descrizioni |
| `--bloc-bg` | `rgba(10,10,10,0.72)` | Card overlay |
| `--bloc-border` | `rgba(255,255,255,0.07)` | Bordi card |
| `--radius` | `16px` | Card/alcune righe |
| Font | Space Grotesk / Inter / JetBrains Mono | headings / body / labels |

**Personalità**: dark + viola come unico accent, info in card fluttuanti (`backdrop-filter: blur`) ai lati di un 3D centrale, niente immagini raster.

**Elevated elements**: `.battery` (indicatore caricamento stile batteria telefono: 88px, centrato in basso, con terminale, riempimento viola a gradiente) e `.scroll-hint` (in basso al centro sopra la batteria, freccia con `hint-bounce`).

**Niente card**: le info-bloc sono trasparenti (solo text-shadow), righe portfolio e contact link usano un separatore leggero (border-bottom) invece del box. **L'unica vignette è quella dei contatti** (`.contact-vignette`, radiale scura). Il nome hero è `nowrap` (resta su una riga).

**Responsive**:
- `≤900px`: slot laterali più stretti (`min(340px, 42vw)`).
- `≤640px`: le sezioni si impilano verticalmente (left in alto, right al centro, top in alto), proxy a `500vh`, contact link in colonna, frecce nascoste.
- `prefers-reduced-motion`: azzera durate CSS + JS riduce trasformazioni e 3D.

**Preview mode**: `?preview` in URL → `.preview` su body, proxy ridotto a `100vh`, slot visibili tutte (utile per screenshot/QA).

---

## 8. SEO & meta (da `index.html`)
- `<title>`: "Nicolò Florean — Web Developer", descrizione + OG (title/description/type), `lang="it"`, favicon.
- **Non presenti**: og:image, canonical, robots.txt, sitemap, structured data.

---

## 9. Note tecniche e "gotcha"

1. **Niente TypeScript**: build = `npm run build` (solo sintassi/import Vite).
2. **`animejs` dipendenza morta** — non importata da nessun file.
3. **`SERVICES` e `TIMELINE` in `content.js` sono pronti ma inutilizzati** (probabile scena futura servizi/esperienze).
4. **Dati dei progetti e contatti hardcodati nei componenti** (`PortfolioScene`, `ContactScene`), non in `content.js`.
5. **Bundle JS ~1.07 MB** (Three.js incluso) → avviso Vite >500 kB; segmentabile con `manualChunks`.
6. **Il 3D è sempre montato**: `useFrame` sempre attivo. Costo basso (2 mesh). Se pesantissimo, si può sospendere con `frameloop="demand"` — SOLO con animazioni procedurali che usano `<Float>` (che richiede `frameloop` attivo).
7. **`scroll-hint` e `progress-bar` sono `pointer-events: none`** → non bloccano i clic.
8. **Il progetto "Questo sito" punta a `href="#"`** — sostituirlo col dominio reale al deploy.
9. **Slot con altezza 0**: `.section-slot` non ha altezza propria (figli absolute); centraggio avviene con `top:50% translateY(-50%)` su card. Non aggiungere `height` allo slot.
10. **`--card-accent`** è una custom property React inline: usare stringa `'--card-accent'` nel `style` (funziona senza warning).

---

## 10. Per aprire/rilanciare

```bash
cd /home/florexx/Lavoro/MYLP
npm install        # se node_modules mancante
npm run dev        # → Vite dev server (porta 5173)
npm run build      # build prod → dist/
npm run preview    # serve dist/ in locale
```

`/path/index.html?preview` → vedi le sezioni statiche senza scroll.

### 10.1 Comandi Git

Remote: `origin` → `https://github.com/flor3xx/MYLP.git`

```bash
git status                        # stato del working tree
git add -A                        # staging di tutte le modifiche
git commit -m "feat: breve descrizione"   # commit descrittivo
git push origin main              # push su GitHub
git log --oneline -5              # cronologia recente
```

> Nota: il remote usa HTTPS, quindi `git push` richiede credenziali GitHub
> (`gh auth login` o un Personal Access Token configurato come credential helper).
> L'ultimo commit del redesign (3D centrale + info overlay) è `22b3ab9`.

---

## 11. Possibili prossimi step

- Centralizzare PROJECTS/CONTACTS/SKILLS in `src/data/content.js`.
- Scena "Servizi / Esperienze" usando `SERVICES`/`TIMELINE` già pronti.
- Link reale per il progetto "Questo sito".
- Meta completo (og:image, JSON-LD, canonical).
- Check visivo reale su desktop/tablet/mobile (la build non è stata testata in browser dopo il redesign).
- `manualChunks` per il bundle Three.js.