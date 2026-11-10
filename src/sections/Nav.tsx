import { useEffect, useMemo, useState } from "react"
import { MAILTO } from "../data/content"
import { usePreferences } from "../app/usePreferences"
import { t } from "../data/translations"
import { navUi } from "../data/copy/nav"
import { useScrollSpy } from "../hooks/useScrollSpy"
import NavMobileMenu from "../components/NavMobileMenu"

export default function Nav() {
  const { preferences } = usePreferences()
  const copy = t(preferences.language)
  const ui = navUi[preferences.language]
  const [scrolled, setScrolled] = useState(false)

  const sectionIds = useMemo(
    () => copy.nav.links.map((link) => link.href.replace("#", "")),
    [copy.nav.links],
  )
  const activeId = useScrollSpy(sectionIds)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className={`nav${scrolled ? " nav--scrolled" : ""}`}>
      <div className="nav__inner container">
        <a className="nav__brand" href="#top">
          <span className="nav__wordmark">nicolò florean</span>
          <span className="nav__role">{ui.role}</span>
        </a>

        <nav className="nav__links" aria-label={copy.nav.ariaLabel}>
          {copy.nav.links.map((link) => {
            const isCurrent = activeId === link.href.slice(1)
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isCurrent ? "location" : undefined}
              >
                {link.label}
              </a>
            )
          })}
        </nav>

        <div className="nav__actions">
          <span className="nav__availability">
            <span className="nav__dot" aria-hidden="true" />
            {copy.nav.availability}
          </span>
          <a className="nav__cta" href={MAILTO}>
            {copy.nav.contactCta}
            <span aria-hidden="true">↗</span>
          </a>
          <NavMobileMenu
            links={copy.nav.links}
            availability={copy.nav.availability}
            contactCta={copy.nav.contactCta}
            ui={ui}
            activeId={activeId}
          />
        </div>
      </div>
    </header>
  )
}
