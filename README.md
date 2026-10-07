# MYLP — landing page di Nicolò Florean

Landing page personale di **Nicolò Florean**, sviluppatore che costruisce landing page.
Il sito è esso stesso il pezzo di portfolio: dark cinematografico, con un motore 3D
(Three.js / React Three Fiber) guidato da una **timeline scrubber**.

## Stack

- **Vite 8 + React 19 + TypeScript 6**
- **three** + **@react-three/fiber** per il motore 3D (lazy-loaded)
- **oxlint** per il lint

## Comandi

```bash
npm install       # dipendenze
npm run dev       # dev server (http://localhost:5173)
npm run lint      # oxlint
npm run build     # tsc -b && vite build -> dist/
npm run preview   # serve la build di produzione
```

## Struttura

```
src/
├── App.tsx                 # composizione delle sezioni
├── index.css               # design token + tutti gli stili
├── data/content.ts         # contenuti e contatti reali
├── components/Scrubber.tsx # timeline scrubber
├── three/Engine.tsx        # motore 3D (lazy chunk)
└── sections/               # Nav, Hero, Range, Demo, Metodo, Contatti
```

La UI è progettata e verificata in **Penpot**. Il sistema di design è in
[`DESIGN.md`](./DESIGN.md) e la verità di prodotto in [`PRODUCT.md`](./PRODUCT.md).

## Accessibilità

Skip link, focus visibile, controlli con `aria-pressed`, e `prefers-reduced-motion`
che disattiva il 3D e lo scrubber mostrando un fallback CSS.

## Deploy

Il deploy avviene su **GitHub Pages** tramite GitHub Actions
(`.github/workflows/deploy.yml`) ad ogni push su `main`.
