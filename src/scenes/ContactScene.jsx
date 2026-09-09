import ContactGeometry from '../three/ContactGeometry'

/**
 * ContactScene: finale con contatti + Three.js background.
 * progress 0→0.3: email e social appaiono con stagger
 * progress 0.3→0.7: 3D background ruota
 * progress 0.7→1.0: CTA finale con glow
 */
export default function ContactScene({ progress }) {
  const CONTACTS = [
    { label: 'Email', value: '06flonico@gmail.com', href: 'mailto:06flonico@gmail.com' },
    { label: 'Instagram', value: '@69flore._', href: 'https://instagram.com/69flore._' },
  ]

  // Contacts stagger entrance
  const contactsBase = Math.max(0, Math.min(1, progress * 3.5))

  // 3D background
  const geometryOpacity = Math.max(0, Math.min(1, (progress - 0.1) * 3))

  // CTA
  const ctaProgress = Math.max(0, Math.min(1, (progress - 0.6) * 3))

  // Scene entrance
  const enterFade = progress < 0.05 ? progress / 0.05 : 1

  return (
    <div className="contact-scene" style={{ opacity: enterFade }}>
      {/* Three.js background */}
      <div className="contact-scene__3d" style={{ opacity: geometryOpacity * 0.4 }}>
        <ContactGeometry progress={progress} />
      </div>

      {/* Gradient overlay */}
      <div className="contact-scene__gradient" />

      <div className="contact-scene__content">
        <h2 className="contact-scene__title">
          <span className="accent">Contatti</span>
        </h2>

        <div className="contact-scene__links">
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
                  transform: `translateY(${(1 - itemProgress) * 30}px)`,
                }}
              >
                <span className="contact-link__label">{contact.label}</span>
                <span className="contact-link__value">{contact.value}</span>
                <span className="contact-link__arrow">→</span>
              </a>
            )
          })}
        </div>

        {/* Final CTA */}
        <div
          className="contact-scene__cta"
          style={{ opacity: ctaProgress, transform: `translateY(${(1 - ctaProgress) * 20}px)` }}
        >
          <p className="contact-scene__avail">
            Disponibile per progetti freelance e collaborazioni.
          </p>
        </div>

        {/* Footer */}
        <footer className="contact-scene__footer">
          <span className="contact-scene__brand">
            nicolò<span className="accent">.</span>florean
          </span>
          <span className="contact-scene__year">© {new Date().getFullYear()}</span>
        </footer>
      </div>
    </div>
  )
}
