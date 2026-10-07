import { MAILTO, NAV_LINKS } from "../data/content"

export default function Nav() {
  return (
    <header className="nav">
      <div className="nav__inner container">
        <a className="nav__brand" href="#top">
          nicolò florean
        </a>

        <nav className="nav__links" aria-label="Sezioni della pagina">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <span className="badge">
            <span className="badge__dot" aria-hidden="true" />
            Disponibile ora
          </span>
          <a className="btn btn--dark btn--sm" href={MAILTO}>
            Parliamone
          </a>
        </div>
      </div>
    </header>
  )
}
