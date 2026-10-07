import { STEPS } from "../data/content"

export default function Metodo() {
  return (
    <section className="metodo" id="metodo">
      <div className="container">
        <p className="eyebrow">Metodo</p>
        <h2 className="section-title">Come lavoro, in tre passi.</h2>

        <ol className="steps">
          {STEPS.map((step) => (
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
