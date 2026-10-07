import { lazy, Suspense, useEffect, useRef, useState } from "react"
import { MAILTO } from "../data/content"
import Scrubber from "../components/Scrubber"
import ClipPicker from "../components/ClipPicker"

const Engine = lazy(() => import("../three/Engine"))

const CHIPS = ["Siti web", "Web app", "3D & motion", "Performance"]
const CHAPTERS = [
  { label: "Intro", href: "#top" },
  { label: "Cosa faccio", href: "#cosa-faccio" },
  { label: "Demo", href: "#demo" },
  { label: "Metodo", href: "#metodo" },
  { label: "Contatti", href: "#contatti" },
]

export default function Hero() {
  const progressRef = useRef(0)
  const [playing, setPlaying] = useState(true)
  const [reduced, setReduced] = useState(false)
  const [clip, setClip] = useState("Dance")

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  useEffect(() => {
    if (!playing || reduced) return
    let raf = 0
    let last = performance.now()
    const tick = (now: number) => {
      const dt = (now - last) / 1000
      last = now
      progressRef.current = (progressRef.current + dt / 14) % 1
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [playing, reduced])

  const handleSeek = (value: number) => {
    progressRef.current = value
    setPlaying(false)
  }

  return (
    <section className="hero" id="top">
      <div className="hero__stage">
        <div className="hero__fallback" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        {!reduced && (
          <div className="hero__canvas" aria-hidden="true">
            <Suspense fallback={null}>
              <Engine progress={progressRef} reduced={reduced} clip={clip} />
            </Suspense>
          </div>
        )}

        <div className="hero__overlay container">
          <p className="eyebrow">Sviluppatore · Landing page</p>
          <h1 className="hero__title">
            Costruisco landing page che <em>lavorano</em>.
          </h1>
          <p className="hero__lead">
            Siti, web app e grafica 3D. Il mech al centro è il motore che anima
            questa pagina: scrubba la timeline e scegli la sua animazione.
          </p>

          <div className="hero__cta">
            <a className="btn btn--primary" href={MAILTO}>
              Parliamone del tuo progetto <span aria-hidden="true">→</span>
            </a>
            <a className="link-arrow" href="#cosa-faccio">
              Scopri di più <span aria-hidden="true">↓</span>
            </a>
          </div>

          <ul className="chips">
            {CHIPS.map((chip) => (
              <li className="chip" key={chip}>
                {chip}
              </li>
            ))}
          </ul>
        </div>

        {!reduced && (
          <div className="hero__controls">
            <Scrubber
              valueRef={progressRef}
              playing={playing}
              onToggle={() => setPlaying((p) => !p)}
              onSeek={handleSeek}
              label="Scrubba l'animazione del mech 3D"
            />
            <ClipPicker value={clip} onChange={setClip} />
          </div>
        )}

        <nav className="hero__rail" aria-label="Capitoli">
          {CHAPTERS.slice(1).map((c) => (
            <a key={c.href} href={c.href} className="hero__rail-link">
              <span aria-hidden="true" />
              {c.label}
            </a>
          ))}
        </nav>
      </div>
    </section>
  )
}
