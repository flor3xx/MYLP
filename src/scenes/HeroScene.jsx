import { useMemo } from 'react'

/**
 * Hero (sezione laterale sinistra): nome animato letter-by-letter + sottotitolo.
 * Nessun 3D qui: il layer 3D centrale è persistente e condiviso.
 * Il `progress` riceve il valore della finestra (fade-in + eventuale fade-out).
 */
export default function HeroScene({ progress = 0, reduced = false }) {
  const name = 'nicolò.florean'
  const subtitle = 'Sviluppatore Web & Designer'
  const move = reduced ? 0 : 1

  // Letter-by-letter reveal
  const nameChars = useMemo(() => {
    return name.split('').map((char, i) => {
      const charProgress = Math.max(0, Math.min(1, (progress * 3 - i * 0.06) * 4))
      return { char, opacity: charProgress, y: (1 - charProgress) * 30 }
    })
  }, [progress])

  const subtitleOpacity = Math.max(0, Math.min(1, (progress - 0.25) * 4))

  return (
    <section
      className="info-bloc hero-info"
      style={{
        opacity: progress,
        transform: `translateY(${(1 - progress) * 30 * move}px)`,
      }}
    >
      <h1 className="hero-info__name">
        {nameChars.map((c, i) => (
          <span
            key={i}
            className="hero-info__letter"
            style={{
              opacity: c.opacity,
              transform: `translateY(${c.y * move}px)`,
              display: 'inline-block',
            }}
          >
            {c.char === '.' ? <span className="accent">.</span> : c.char}
          </span>
        ))}
      </h1>
      <p className="hero-info__subtitle" style={{ opacity: subtitleOpacity }}>
        {subtitle}
      </p>
    </section>
  )
}