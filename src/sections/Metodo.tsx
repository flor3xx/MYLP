import { usePreferences } from "../app/usePreferences"
import { t } from "../data/translations"

export default function Metodo() {
  const { preferences } = usePreferences()
  const copy = t(preferences.language)
  return (
    <section className="metodo" id="metodo">
      <div className="container">
        <p className="eyebrow">{copy.method.eyebrow}</p>
        <h2 className="section-title">{copy.method.title}</h2>

        <ol className="steps">
          {copy.method.steps.map((step) => (
            <li className="step" key={step.number}>
              <span className="step__tick" aria-hidden="true" />
              <span className="step__number">{step.number}</span>
              <h3 className="step__title">{step.title}</h3>
              <p className="step__copy">{step.copy}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
