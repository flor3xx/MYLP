import { MAILTO } from "../data/content"
import { usePreferences } from "../app/usePreferences"
import { t } from "../data/translations"
import { Reveal } from "../components/Reveal"
import FrameWall from "../components/FrameWall"
import StripRail from "../components/StripRail"

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true" focusable="false">
      <path
        d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ArrowDown() {
  return (
    <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true" focusable="false">
      <path
        d="M8 3.5v9M4.5 9 8 12.5 11.5 9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Hero() {
  const { preferences } = usePreferences()
  const copy = t(preferences.language)
  const italian = preferences.language === "it"

  return (
    <section className="hero" id="top">
      <div className="hero__meta container">
        <span>{copy.hero.eyebrow}</span>
        <span>{italian ? "siti / web app / motion" : "websites / web apps / motion"}</span>
      </div>

      <div className="hero__copy container">
        <Reveal as="h1" className="hero__statement">
          {copy.hero.title} <em>{copy.hero.titleEmphasis}.</em>
        </Reveal>
        <div className="hero__brief">
          <Reveal as="p" className="hero__lead" delay={60}>
            {copy.hero.lead}
          </Reveal>
          <Reveal className="hero__cta" delay={120}>
            <a className="btn btn--primary" href={MAILTO}>
              {copy.hero.contactCta} <ArrowUpRight />
            </a>
            <a className="link-arrow" href="#cosa-faccio">
              <span className="link-arrow__label">{copy.hero.moreCta}</span> <ArrowDown />
            </a>
          </Reveal>
        </div>
      </div>

      <FrameWall />

      <Reveal delay={560}>
        <StripRail />
      </Reveal>

      <Reveal className="hero__bottom container" delay={620}>
        <span className="hero__hint">
          {italian ? "Scorri per vedere il sistema" : "Scroll to see the system"}
        </span>
        <a href="#customizer-sheet" className="hero__customizer-link">
          {italian ? "Remixa la pagina" : "Remix the page"} <ArrowUpRight />
        </a>
      </Reveal>
    </section>
  )
}
