import type { KeyboardEvent } from "react"
import { usePreferences } from "../app/usePreferences"
import { t } from "../data/translations"
import { methodUi } from "../data/copy/method"
import { Reveal } from "../components/Reveal"
import Specimen from "../components/Specimen"
import { useHorizontalScroll } from "../hooks/useHorizontalScroll"

const FRAME_KINDS = ["palette", "layout", "motion"] as const

export default function Metodo() {
  const { preferences } = usePreferences()
  const copy = t(preferences.language)
  const ui = methodUi[preferences.language]
  const { ref, progress, atStart, atEnd, canScroll, scrollByStep } =
    useHorizontalScroll<HTMLOListElement>()

  const smooth =
    preferences.motion !== "off" &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches

  // Keep a small accent anchor visible at the start of the row.
  const progressScale = Math.max(0.04, progress)

  const onKeyDown = (event: KeyboardEvent<HTMLOListElement>) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return
    event.preventDefault()
    scrollByStep(event.key === "ArrowRight" ? 1 : -1, smooth)
  }

  return (
    <section className="metodo" id="metodo" aria-label={copy.method.title}>
      <div className="container metodo__head">
        <Reveal as="h2" className="section-title metodo__title">
          {copy.method.title}
        </Reveal>
        <div className="metodo__meta">
          <p className="metodo__hint">{ui.hint}</p>
          <div className="metodo__controls">
            <button
              type="button"
              className="metodo__control"
              aria-label={ui.previous}
              disabled={atStart || !canScroll}
              onClick={() => scrollByStep(-1, smooth)}
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              type="button"
              className="metodo__control"
              aria-label={ui.next}
              disabled={atEnd || !canScroll}
              onClick={() => scrollByStep(1, smooth)}
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>

      <ol
        ref={ref}
        className="metodo__track"
        aria-label={ui.region}
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        {copy.method.steps.map((step, index) => (
          <Reveal
            as="li"
            className="metodo__step"
            delay={index * 70}
            key={step.title}
          >
            <div className="metodo__step-top">
              <span>{ui.stages[index]}</span>
            </div>
            <h3>{step.title}</h3>
            <p>{step.copy}</p>
            <div className="metodo__step-visual">
              <Specimen
                kind={FRAME_KINDS[index] ?? "palette"}
                label={`${step.title} — specimen`}
              />
            </div>
          </Reveal>
        ))}
      </ol>

      <div className="container metodo__foot">
        <div
          className="metodo__progress"
          role="progressbar"
          aria-label={ui.progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
        >
          <span
            className="metodo__progress-fill"
            style={{ transform: `scaleX(${progressScale})` }}
          />
        </div>
      </div>
    </section>
  )
}
