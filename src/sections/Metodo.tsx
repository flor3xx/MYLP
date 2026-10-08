import { usePreferences } from "../app/usePreferences"
import { t } from "../data/translations"
import { Reveal } from "../components/Reveal"

export default function Metodo() {
  const { preferences } = usePreferences()
  const copy = t(preferences.language)
  return (
    <section className="metodo" id="metodo">
      <div className="container">
        <Reveal as="p" className="eyebrow">{copy.method.eyebrow}</Reveal>
        <Reveal as="h2" className="section-title" delay={70}>{copy.method.title}</Reveal>

        <ol className="steps">
          {copy.method.steps.map((step) => (
            <Reveal as="li" className="step" delay={Number(step.number) * 70} key={step.number}>
              <span className="step__tick" aria-hidden="true" />
              <span className="step__number">{step.number}</span>
              <h3 className="step__title">{step.title}</h3>
              <p className="step__copy">{step.copy}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
