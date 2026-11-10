import { CONTACTS, MAILTO } from "../data/content"
import { usePreferences } from "../app/usePreferences"
import { t } from "../data/translations"
import { contactUi } from "../data/copy/contact"
import { Reveal } from "../components/Reveal"

const YEAR = new Date().getFullYear()

export default function Contatti() {
  const { preferences } = usePreferences()
  const copy = t(preferences.language)
  const ui = contactUi[preferences.language]
  const { settings } = copy

  const channels = [
    {
      key: "email",
      label: ui.emailLabel,
      value: copy.contact.email,
      href: MAILTO,
      external: false,
    },
    {
      key: "instagram",
      label: ui.instagramLabel,
      value: copy.contact.instagramHandle,
      href: CONTACTS.instagramUrl,
      external: true,
    },
    {
      key: "github",
      label: ui.githubLabel,
      value: copy.contact.githubLabel,
      href: CONTACTS.githubUrl,
      external: true,
    },
  ] as const

  const themeRows = [
    { label: settings.theme, value: settings[preferences.theme] },
    { label: settings.color, value: settings[preferences.colorScheme] },
    { label: settings.font, value: settings[preferences.font] },
    { label: settings.motion, value: settings[preferences.motion] },
  ]

  return (
    <section className="contatti" id="contatti" aria-label={copy.contact.title}>
      <div className="contatti__field">
        <div className="container contatti__head">
          <Reveal as="h2" className="section-title contatti__title">
            {copy.contact.title}
          </Reveal>
          <Reveal as="p" className="contatti__lead" delay={70}>
            {copy.contact.lead}
          </Reveal>
        </div>

        <div className="container contatti__channels">
          {channels.map((channel) => (
            <a
              key={channel.key}
              className={`channel${channel.key === "email" ? " channel--email" : ""}`}
              href={channel.href}
              {...(channel.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              <span className="channel__label">{channel.label}</span>
              <span className="channel__value">{channel.value}</span>
              <span className="channel__arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          ))}
        </div>
      </div>

      <footer className="foot">
        <div className="container foot__grid">
          <div className="foot__tile foot__tile--brand">
            <span className="foot__wordmark">nicolò florean</span>
            <p>{ui.wordmarkLine}</p>
            <a className="foot__top" href="#top">
              {ui.backToTop}
              <span aria-hidden="true">↑</span>
            </a>
          </div>

          <nav className="foot__tile" aria-label={ui.linksLabel}>
            <h3 className="foot__label">{ui.linksLabel}</h3>
            <ul>
              {copy.nav.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="foot__tile">
            <h3 className="foot__label">{ui.contactLabel}</h3>
            <ul>
              <li>
                <a href={MAILTO}>{copy.contact.email}</a>
              </li>
              <li>
                <a
                  href={CONTACTS.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {copy.contact.instagramHandle}
                </a>
              </li>
              <li>
                <a href={CONTACTS.githubUrl} target="_blank" rel="noopener noreferrer">
                  {copy.contact.githubLabel}
                </a>
              </li>
            </ul>
          </div>

          <div className="foot__tile">
            <h3 className="foot__label">{ui.themeLabel}</h3>
            <dl className="foot__theme">
              {themeRows.map((row) => (
                <div key={row.label}>
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="container foot__base">
          <span>{copy.footer.copyright.replace("{year}", String(YEAR))}</span>
          <span>{copy.footer.credit}</span>
        </div>
      </footer>
    </section>
  )
}
