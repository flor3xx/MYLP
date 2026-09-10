/**
 * Contact (sezione in ALTO): email + Instagram + CTA + footer.
 * Scende dall'alto quando la sua finestra di progress è attiva.
 */
export default function ContactScene({ progress = 0, reduced = false }) {
  const CONTACTS = [
    { label: 'Email', value: '06flonico@gmail.com', href: 'mailto:06flonico@gmail.com' },
    { label: 'Instagram', value: '@69flore._', href: 'https://instagram.com/69flore._' },
  ]

  const move = reduced ? 0 : 1
  const contactsBase = Math.max(0, Math.min(1, progress * 3.5))
  const ctaProgress = Math.max(0, Math.min(1, (progress - 0.6) * 3))

  return (
    <section
      className="info-bloc contact-info"
      style={{
        opacity: progress,
        transform: `translateY(${(1 - progress) * -30 * move}px)`,
      }}
    >
      <h2 className="contact-info__title">
        <span className="accent">Contatti</span>
      </h2>

      <div className="contact-info__links">
        {CONTACTS.map((contact, i) => {
          const delay = i * 0.1
          const itemProgress = Math.max(0, Math.min(1, (contactsBase - delay) * 4))

          return (
            <a
              key={contact.label}
              href={contact.href}
              target={contact.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="contact-link"
              style={{
                opacity: itemProgress,
                transform: `translateY(${(1 - itemProgress) * 20 * move}px)`,
              }}
            >
              <span className="contact-link__label">{contact.label}</span>
              <span className="contact-link__value">{contact.value}</span>
              <span className="contact-link__arrow">→</span>
            </a>
          )
        })}
      </div>

      <div
        className="contact-info__cta"
        style={{ opacity: ctaProgress, transform: `translateY(${(1 - ctaProgress) * 16 * move}px)` }}
      >
        <p className="contact-info__avail">
          Disponibile per progetti freelance e collaborazioni.
        </p>
      </div>

      <footer className="contact-info__footer">
        <span className="contact-info__brand">
          nicolò<span className="accent">.</span>florean
        </span>
        <span>© {new Date().getFullYear()}</span>
      </footer>
    </section>
  )
}