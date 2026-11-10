import { MAILTO } from "../data/content"
import { usePreferences } from "../app/usePreferences"
import { t } from "../data/translations"
import { Reveal } from "../components/Reveal"
import Specimen from "../components/Specimen"

const FRAME_KINDS = ["window", "layout", "motion"] as const

export default function Range() {
  const { preferences } = usePreferences()
  const copy = t(preferences.language)

  return (
    <section className="range" id="cosa-faccio" aria-label={copy.services.title}>
      <div className="container range__head">
        <Reveal as="h2" className="section-title range__title">
          {copy.services.title}
        </Reveal>
        <Reveal as="p" className="range__lead" delay={70}>
          {copy.services.lead}
        </Reveal>
      </div>

      <div className="container range__sheet">
        {copy.services.items.map((service, index) => (
          <Reveal
            as="article"
            className={`range__frame range__frame--${index + 1}`}
            delay={index * 80}
            key={service.name}
          >
            <div className="range__visual">
              <Specimen
                kind={FRAME_KINDS[index] ?? "window"}
                label={`${service.name} — specimen`}
              />
            </div>
            <div className="range__caption">
              <div className="range__caption-head">
                <h3>{service.name}</h3>
                <a
                  className="range__link"
                  href={MAILTO}
                  aria-label={`${copy.nav.contactCta} — ${service.name}`}
                >
                  {copy.nav.contactCta}
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
              <p className="range__copy">{service.copy}</p>
              <p className="range__tags">{service.tags}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
