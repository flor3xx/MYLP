# MYLP — landing page di Nicolò Florean

Landing page personale di **Nicolò Florean**, sviluppatore che costruisce landing
page, siti web, web app e grafica 3D & motion. Il sito è il pezzo di portfolio: una
pagina unica e densa, composta come un contact sheet di specimen visivi disegnati in
CSS.

La pagina si personalizza dal vivo — tema, colore d'accento, intensità, tipografia,
composizione, densità, angoli, motion, atmosfera, trattamento immagini e lingua — e
le scelte restano salvate in `localStorage`.

## Stack

- **Vite 8 + React 19 + TypeScript 6**
- **oxlint** per il lint; nessun test runner
- CSS puro con token in `src/styles/`; nessun framework CSS e nessuna libreria di
  animazione (solo transizioni/keyframe CSS e `IntersectionObserver`)
- Quattro famiglie Google Fonts dichiarate in `index.html`: Bricolage Grotesque,
  Schibsted Grotesk, DM Serif Display, Syne
- Deploy statico su **Vercel**

## Comandi

| Comando | Cosa fa |
| --- | --- |
| `npm install` | installa le dipendenze |
| `npm run dev` | dev server su http://localhost:5173 |
| `npm run lint` | oxlint (React, TypeScript) |
| `npm run build` | `tsc -b` + `vite build` → `dist/` |
| `npm run preview` | serve la build di produzione |

`npm run build` esegue il type-check prima di Vite: un errore di tipo ferma il build,
quindi è il comando da usare per validare una modifica. Non esiste un test runner:
lint e build sono gli unici controlli automatici. `dist/` è generata e ignorata da git.

## Struttura

```
src/
├── main.tsx                    # bootstrap React (StrictMode)
├── App.tsx                     # composizione delle sezioni + data-attribute delle preferenze
├── index.css                   # importa, in ordine, i fogli di src/styles/
├── app/
│   ├── preferences.ts          # tipi, valori ammessi, default, reducer, lettura da storage
│   ├── PreferencesProvider.tsx # stato, persistenza, azioni legate al dispatch
│   ├── PreferencesContext.tsx  # context tipizzato
│   └── usePreferences.ts       # hook di accesso
├── components/
│   ├── Reveal.tsx              # reveal all'ingresso, rispetta la preferenza motion
│   ├── Specimen.tsx            # frame visivo CSS (window, palette, motion, layout)
│   ├── CustomizerPill.tsx      # trigger fisso del pannello preferenze
│   ├── CustomizerSheet.tsx     # pannello/dialog delle preferenze
│   └── PreferenceSegment.tsx   # controllo segmentato accessibile
├── data/
│   ├── content.ts              # contatti reali (email, Instagram, GitHub) e MAILTO
│   ├── translations.ts         # aggrega IT/EN ed espone t(language)
│   └── copy/                   # nav, hero, services, method, contact, customizer, types
├── hooks/useInView.ts          # IntersectionObserver per i reveal
├── sections/                   # Nav, Hero, Range, Metodo, Contatti
├── assets/                     # profile.jpg + helper PROFILE_IMAGE
└── styles/                     # tokens, base, components, nav, hero, sections, customizer
```

## Preferenze

`src/app/preferences.ts` è la fonte unica: union types, default, reducer e
`loadPreferences()`. Il provider carica lo stato da `localStorage` (chiave
`mylp-preferences-v2`), valida ogni campo contro i valori ammessi, scarta quelli
sconosciuti e risalva ad ogni modifica. Se lo storage non è disponibile la pagina
funziona comunque con i default.

`App.tsx` traduce le preferenze in attributi su `.app-shell`, e il CSS reagisce a
quegli attributi:

| Preferenza | Attributo | Cosa cambia |
| --- | --- | --- |
| `theme` | `data-theme` | ground, superfici, linee, inchiostro (dark/light) |
| `colorScheme` | `data-color-scheme` | accento: pink (default), blue, lime, orange |
| `accentIntensity` | `data-accent-intensity` | opacità di `--accent-soft`: subtle, standard, vivid |
| `font` | `data-font` | coppia tipografica: grotesk, editorial, geometric |
| `layout` | `data-layout` | geometria della hero: sheet (default), split, centered |
| `density` | `data-density` | `--page-pad`, `--section-gap`, `--frame-gap`, stagger |
| `radius` | `data-radius` | raggi di card e controlli |
| `motion` | `data-motion` | durata/distanza/stagger dei reveal; `off` spegne le animazioni |
| `surface` | `data-surface` | atmosfera: grain (default), flat, scanlines |
| `imageTreatment` | `data-image-treatment` | filtro sulle immagini: natural, monochrome, highContrast |
| `language` | `lang` su `<html>` | copy IT/EN e metadata del documento |

Regola: ogni preferenza deve produrre un effetto reale — una variabile CSS, un
attributo o un comportamento. Nessun controllo solo decorativo.

## Stili

`src/index.css` importa i fogli in un ordine preciso:

1. `styles/tokens.css` — variabili e override per tema, colore, font, radius, densità,
   atmosfera, accento; include le regole `data-motion`
2. `styles/base.css` — reset leggero, tipografia di base, bottoni, link, reveal,
   `prefers-reduced-motion`
3. `styles/components.css` — badge e specimen
4. `styles/nav.css`, `styles/hero.css`, `styles/sections.css`, `styles/customizer.css`
   — un foglio per area

I valori visivi passano da variabili CSS: i componenti non introducono colori o raggi
hardcoded. Un nuovo componente riusa i token esistenti.

## Contenuti e copy

- `src/data/content.ts` — contatti reali, `MAILTO`, e il tipo `Service`
- `src/data/copy/*` — un modulo per area (`nav`, `hero`, `services`, `method`,
  `contact`, `customizer`), tipizzati da `copy/types.ts`
- `src/data/translations.ts` — unisce le due lingue ed espone `t(language)`

Ogni stringa visibile esiste in italiano e in inglese. I contatti sono gli unici dati
personali verificati: niente clienti, testimonial, metriche, prezzi o progetti
inventati. `EVIDENCE.md` è il registro delle affermazioni ammesse.

## Asset

La foto profilo è `src/assets/profile.jpg`, esportata da `src/assets/profile.ts` come
`PROFILE_IMAGE`. Gli asset vanno importati da `src/assets`, non referenziati da
`public/`: così Vite genera URL con hash e con la base corretta, e funzionano sia in
produzione sia nelle preview. `public/` contiene solo `favicon.svg`.

## Deploy su Vercel

- `vercel.json` fissa framework `vite`, install `npm ci`, build `npm run build`,
  output `dist`
- `vite.config.ts` usa `base: '/'`: nessun percorso hardcoded o sotto-cartella
- header: `Cache-Control: public, max-age=31536000, immutable` per `/assets/*`
  (i file sono hashati); su tutte le risposte `X-Content-Type-Options: nosniff`,
  `Referrer-Policy: strict-origin-when-cross-origin` e una `Permissions-Policy`
  restrittiva
- nessuna rewrite SPA: la pagina è una sola e la navigazione usa anchor (`#top`,
  `#cosa-faccio`, `#metodo`, `#contatti`). Una rewrite maschererebbe i 404 reali.

Il deploy non passa da GitHub Actions: su Vercel basta collegare il repository e
lasciare a `vercel.json` build e directory di output. Non servono variabili
d'ambiente.

## Accessibilità

- skip link a `#contenuto` e focus visibile con outline d'accento
- controlli delle preferenze come bottoni con `aria-pressed` dentro `fieldset`/`legend`
- pannello preferenze come `role="dialog"` con `aria-modal`, chiusura con Escape,
  focus sul pulsante di chiusura all'apertura e stato `aria-live` nel footer
- strip orizzontali con scroll nativo e `scroll-snap`: nessun sequestro dello scroll
  verticale
- `prefers-reduced-motion: reduce` e la preferenza `motion: off` mantengono il
  contenuto visibile e spengono spostamenti, drift e hover-lift

## Documenti

- [DESIGN.md](./DESIGN.md) — direzione visiva, token, motion, accessibilità
- [PRODUCT.md](./PRODUCT.md) — prodotto, pubblico, vincoli, evidenze disponibili
- [AGENTS.md](./AGENTS.md) — istruzioni operative per agenti
