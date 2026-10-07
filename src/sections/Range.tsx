import { SERVICES, type Service } from "../data/content"

function ServiceIcon({ kind }: { kind: Service["icon"] }) {
  if (kind === "web") {
    return (
      <svg viewBox="0 0 56 46" aria-hidden="true">
        <rect x="1.5" y="1.5" width="53" height="43" rx="8" />
        <path d="M1.5 12.5h53" />
      </svg>
    )
  }
  if (kind === "app") {
    return (
      <svg viewBox="0 0 58 58" aria-hidden="true">
        <rect x="1.5" y="1.5" width="55" height="55" rx="12" />
        <rect className="fill-cobalt" x="11" y="11" width="16" height="16" rx="4" />
        <rect className="fill-ink" x="33" y="11" width="16" height="16" rx="4" />
        <rect className="fill-ink" x="11" y="33" width="16" height="16" rx="4" />
        <rect className="fill-verm" x="33" y="33" width="16" height="16" rx="4" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 64 52" aria-hidden="true">
      <ellipse className="fill-violet" cx="32" cy="26" rx="17" ry="17" />
      <ellipse className="stroke-cobalt" cx="32" cy="30" rx="31" ry="14" />
      <circle className="fill-cobalt" cx="59" cy="9" r="5" />
    </svg>
  )
}

export default function Range() {
  return (
    <section className="range" id="cosa-faccio">
      <div className="container">
        <p className="eyebrow">Cosa faccio</p>
        <h2 className="section-title">Tre modi in cui posso aiutarti.</h2>
        <p className="section-lead">
          Dal sito vetrina alla web app, fino alla grafica 3D. Scegli quanto ti
          serve — o tutto insieme.
        </p>

        <ul className="cards">
          {SERVICES.map((service) => (
            <li className="card" key={service.name}>
              <span className="card__icon">
                <ServiceIcon kind={service.icon} />
              </span>
              <h3 className="card__title">{service.name}</h3>
              <p className="card__copy">{service.copy}</p>
              <p className="card__tags">{service.tags}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
