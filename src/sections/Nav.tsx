import { usePreferences } from "../app/usePreferences"
import { t } from "../data/translations"

export default function Nav() {
  const { preferences } = usePreferences()
  const copy = t(preferences.language)
  return (
    <header className="nav">
      <div className="nav__inner container">
        <a className="nav__brand" href="#top">
          nicolò florean
        </a>

        <nav className="nav__links" aria-label="Sezioni della pagina">
          {copy.nav.links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <span className="badge">
            <span className="badge__dot" aria-hidden="true" />
            {copy.nav.availability}
          </span>
        </div>
      </div>
    </header>
  )
}
