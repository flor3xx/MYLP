import { CONTACTS, MAILTO } from "../data/content"
import { usePreferences } from "../app/usePreferences"
import { t } from "../data/translations"

const YEAR = new Date().getFullYear()

export default function Contatti() {
  const { preferences } = usePreferences()
  const copy = t(preferences.language)
  return (
    <section className="contatti" id="contatti">
      <div className="container">
        <p className="eyebrow">{copy.contact.eyebrow}</p>
        <h2 className="section-title section-title--xl">
          {copy.contact.title}
        </h2>
        <p className="section-lead">
          {copy.contact.lead}
        </p>

        <a className="btn btn--primary btn--lg" href={MAILTO}>
          {copy.contact.emailCta}
        </a>

        <ul className="contact-links">
          <li>
            <a
              className="contact-pill"
              href={CONTACTS.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="contact-pill__dot" aria-hidden="true" />
              {copy.contact.instagramCta}
            </a>
          </li>
          <li>
            <a
              className="contact-pill"
              href={CONTACTS.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="contact-pill__dot" aria-hidden="true" />
              {copy.contact.githubCta}
            </a>
          </li>
        </ul>
      </div>

      <footer className="footer container">
        <span>{copy.footer.copyright.replace("{year}", String(YEAR))}</span>
        <span>{copy.footer.credit}</span>
      </footer>
    </section>
  )
}
