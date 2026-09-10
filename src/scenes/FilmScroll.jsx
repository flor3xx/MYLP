import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CentralGeometry from '../three/CentralGeometry'
import HeroScene from './HeroScene'
import AboutScene from './AboutScene'
import PortfolioScene from './PortfolioScene'
import ContactScene from './ContactScene'
import ProgressBar from '../components/ProgressBar'
import ScrollHint from '../components/ScrollHint'

gsap.registerPlugin(ScrollTrigger)

/**
 * Finestre di progress (0→1 globale) in cui ogni sezione è "attiva".
 * Dopo la fine della finestra la sezione esce con un breve fadeOut,
 * così le sezioni nello stesso slot non si sovrappongono.
 */
const WINDOWS = [
  { id: 'hero', start: 0, end: 0.2, fadeOut: 0.06 },
  { id: 'about', start: 0.2, end: 0.5, fadeOut: 0.06 },
  { id: 'portfolio', start: 0.5, end: 0.78, fadeOut: 0.06 },
  { id: 'contact', start: 0.8, end: 1, fadeOut: 0 },
]

/** progress della sezione: 0→1 dentro la finestra, poi 1→0 nel fadeOut finale. */
function windowProgress(gp, start, end, fadeOut) {
  const inP = Math.max(0, Math.min(1, (gp - start) / (end - start)))
  if (gp > end && fadeOut > 0) {
    const outP = Math.max(0, Math.min(1, 1 - (gp - end) / fadeOut))
    return Math.min(inP, 1) * outP
  }
  return inP
}

/** Rileva prefers-reduced-motion (reattivo al cambio di preferenza). */
function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener?.('change', update)
    return () => mq.removeEventListener?.('change', update)
  }, [])
  return reduced
}

/**
 * FilmScroll: il cuore dell'esperienza.
 *
 * Viewport fisso contenente:
 *  - un layer 3D centrale PERSISTENTE (toro + ottaedro) per tutta la pagina,
 *  - sezioni informative in OVERLAY ai lati (hero/about a sinistra,
 *    portfolio a destra) che appaiono a finestre di progress;
 *  - i contatti in una slot CENTRALE con una vignette scura dedicata.
 * Lo scroll pilota il progresso 0→1 con GSAP ScrollTrigger (scrub).
 */
export default function FilmScroll() {
  const proxyRef = useRef(null)
  const [progress, setProgress] = useState(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'auto'

    const ctx = gsap.context(() => {
      const dummy = { progress: 0 }
      gsap.to(dummy, {
        progress: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: proxyRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          onUpdate: (self) => setProgress(self.progress),
        },
      })
    })

    return () => ctx.revert()
  }, [])

  // progress locale di ogni sezione
  const get = (id) => {
    const w = WINDOWS.find(x => x.id === id)
    return windowProgress(progress, w.start, w.end, w.fadeOut)
  }

  return (
    <>
      {/* Fixed viewport — 3D centrale + sezioni overlay */}
      <div className="film-viewport">
        {/* Layer 3D persistente */}
        <div className="film-viewport__3d">
          <CentralGeometry progress={progress} reduced={reduced} />
        </div>

        {/* Slot laterale SINISTRA: hero + about */}
        <div className="section-slot section-slot--left">
          <HeroScene progress={get('hero')} reduced={reduced} />
          <AboutScene progress={get('about')} reduced={reduced} />
        </div>

        {/* Slot laterale DESTRA: portfolio */}
        <div className="section-slot section-slot--right">
          <PortfolioScene progress={get('portfolio')} reduced={reduced} />
        </div>

        {/* Vignette dedicata: solo quando i contatti sono visibili */}
        <div
          className="contact-vignette"
          style={{ opacity: get('contact') }}
        />

        {/* Slot CENTRALE: contatti (gli unici "dentro" una vignette) */}
        <div className="section-slot section-slot--center">
          <ContactScene progress={get('contact')} reduced={reduced} />
        </div>
      </div>

      {/* Hint iniziale + barra di caricamento */}
      <ScrollHint visible={progress < 0.05} />
      <ProgressBar progress={progress} />

      {/* Scroll proxy — invisibile, crea l'altezza di scroll */}
      <div ref={proxyRef} className="film-scroll-proxy" />
    </>
  )
}