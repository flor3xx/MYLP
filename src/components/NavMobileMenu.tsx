import { useEffect, useRef, useState } from "react"
import { MAILTO } from "../data/content"
import type { NavUi } from "../data/copy/nav"

const PANEL_ID = "nav-mobile-menu"

type NavMobileMenuProps = {
  links: readonly { label: string; href: string }[]
  availability: string
  contactCta: string
  ui: NavUi
  activeId: string | null
}

/**
 * Small-screen disclosure navigation. Owns its open state, moves focus into
 * the panel, closes on Escape (returning focus to the trigger), outside click
 * and hash change, and stays out of the tab order while collapsed.
 */
export default function NavMobileMenu({
  links,
  availability,
  contactCta,
  ui,
  activeId,
}: NavMobileMenuProps) {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const frame = window.requestAnimationFrame(() => {
      const firstLink = panelRef.current?.querySelector<HTMLAnchorElement>("a")
      firstLink?.focus()
    })
    return () => window.cancelAnimationFrame(frame)
  }, [open])

  useEffect(() => {
    if (!open) return

    const close = () => setOpen(false)
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return
      event.stopPropagation()
      setOpen(false)
      buttonRef.current?.focus()
    }
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target
      if (!(target instanceof Node)) return
      if (panelRef.current?.contains(target) || buttonRef.current?.contains(target)) return
      close()
    }
    const onHashChange = () => close()

    document.addEventListener("keydown", onKeyDown)
    document.addEventListener("pointerdown", onPointerDown)
    window.addEventListener("hashchange", onHashChange)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.removeEventListener("pointerdown", onPointerDown)
      window.removeEventListener("hashchange", onHashChange)
    }
  }, [open])

  useEffect(() => {
    const query = window.matchMedia("(min-width: 901px)")
    const onChange = () => {
      if (query.matches) setOpen(false)
    }
    query.addEventListener("change", onChange)
    return () => query.removeEventListener("change", onChange)
  }, [])

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className="nav__toggle"
        aria-expanded={open}
        aria-controls={PANEL_ID}
        aria-label={open ? ui.close : ui.open}
        onClick={() => setOpen((value) => !value)}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>

      <div
        ref={panelRef}
        id={PANEL_ID}
        className="nav__menu"
        data-open={open}
        inert={!open}
      >
        <nav className="nav__menu-links" aria-label={ui.menuNav}>
          {links.map((link) => {
            const isCurrent = activeId === link.href.slice(1)
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isCurrent ? "location" : undefined}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            )
          })}
        </nav>
        <div className="nav__menu-foot">
          <span className="nav__availability">
            <span className="nav__dot" aria-hidden="true" />
            {availability}
          </span>
          <a className="nav__menu-cta" href={MAILTO} onClick={() => setOpen(false)}>
            {contactCta}
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </>
  )
}
