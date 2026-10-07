import { CONTACTS, MAILTO } from "../data/content"

const YEAR = new Date().getFullYear()

export default function Contatti() {
  return (
    <section className="contatti" id="contatti">
      <div className="container">
        <p className="eyebrow">Contatti</p>
        <h2 className="section-title section-title--xl">
          Raccontami il tuo progetto.
        </h2>
        <p className="section-lead">
          Rispondo entro 24 ore. Scrivimi cosa vuoi costruire e ne parliamo.
        </p>

        <a className="btn btn--primary btn--lg" href={MAILTO}>
          Scrivimi · {CONTACTS.email}
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
              Instagram · {CONTACTS.instagramHandle}
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
              GitHub · {CONTACTS.githubLabel}
            </a>
          </li>
        </ul>
      </div>

      <footer className="footer container">
        <span>© {YEAR} nicolò florean</span>
        <span>Fatto con React, Penpot e molta attenzione.</span>
      </footer>
    </section>
  )
}
