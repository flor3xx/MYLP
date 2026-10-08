import { MAILTO } from "../data/content"
import { usePreferences } from "../app/usePreferences"
import { t } from "../data/translations"
import { Reveal } from "../components/Reveal"

export default function Hero() {
  const { preferences } = usePreferences()
  const copy = t(preferences.language)

  return (
    <section className="hero" id="top">
      <div className="hero__stage container">
        <Reveal className="hero__visual" delay={0}>
          <div className="hero__photo">
            <img src="/profilePick.jpeg" alt={copy.hero.photoAlt} />
          </div>
        </Reveal>

        <div className="hero__copy">
          <Reveal as="p" className="eyebrow" delay={80}>
            {copy.hero.eyebrow}
          </Reveal>
          <Reveal as="h1" className="hero__title" delay={160}>
            {copy.hero.title} <em>{copy.hero.titleEmphasis}</em>.
          </Reveal>
          <Reveal as="p" className="hero__lead" delay={240}>
            {copy.hero.lead}
          </Reveal>

          <Reveal className="hero__cta" delay={320}>
            <a className="btn btn--primary" href={MAILTO}>
              {copy.hero.contactCta} <span aria-hidden="true">→</span>
            </a>
            <a className="link-arrow" href="#cosa-faccio">
              {copy.hero.moreCta} <span aria-hidden="true">↓</span>
            </a>
          </Reveal>

          <Reveal className="chips" delay={400}>
            {copy.hero.chips.map((chip) => (
              <li className="chip" key={chip}>
                {chip}
              </li>
            ))}
          </Reveal>
        </div>
      </div>

      <nav className="hero__rail container" aria-label={copy.aria.heroChapters}>
        {copy.hero.chapters.slice(1).map((c) => (
          <a key={c.href} href={c.href} className="hero__rail-link">
            <span aria-hidden="true" />
            {c.label}
          </a>
        ))}
      </nav>
    </section>
  )
}
