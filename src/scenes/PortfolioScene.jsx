import { useState } from 'react'

const PROJECTS = [
  {
    id: 1,
    title: 'Lucio Mior',
    desc: 'Portfolio personale con animazioni avanzate e design sperimentale.',
    url: 'https://luciomior.eu',
    tags: ['React'],
    color: '#a855f7',
  },
  {
    id: 2,
    title: 'Questo sito',
    desc: 'Il sito che stai guardando — film scroll, Three.js, GSAP.',
    url: '#',
    tags: ['React', 'Three.js', 'GSAP'],
    color: '#7c3aed',
  },
  {
    id: 3,
    title: 'Prossimamente',
    desc: 'Nuovi progetti in arrivo. Resta connesso.',
    url: null,
    tags: ['Coming soon'],
    color: '#c084fc',
  },
]

/**
 * PortfolioScene: cards 3D che entrano con transform.
 * progress 0→0.4: cards entrano da sotto con rotateX
 * progress 0.4→0.7: cards sono visibili, hover/click possibile
 * progress 0.7→1.0: cards si riducono, link finale appare
 */
export default function PortfolioScene({ progress }) {
  const [hoveredId, setHoveredId] = useState(null)

  // Cards entrance
  const cardsBase = Math.max(0, Math.min(1, progress * 2.5))

  // CTA at the end
  const ctaOpacity = Math.max(0, Math.min(1, (progress - 0.75) * 4))

  // Scene transitions
  const enterFade = progress < 0.05 ? progress / 0.05 : 1
  const exitFade = progress > 0.9 ? 1 - (progress - 0.9) / 0.1 : 1

  return (
    <div className="portfolio-scene" style={{ opacity: enterFade * exitFade }}>
      <div className="portfolio-scene__header">
        <span className="section-label">// lavori</span>
        <h2 className="portfolio-scene__title">
          Portfolio
        </h2>
      </div>

      <div className="portfolio-scene__grid">
        {PROJECTS.map((project, i) => {
          const delay = i * 0.12
          const cardProgress = Math.max(0, Math.min(1, (cardsBase - delay) * 3))
          const isHovered = hoveredId === project.id

          // 3D card transforms
          const rotateX = (1 - cardProgress) * 25
          const translateZ = (1 - cardProgress) * -100
          const translateY = (1 - cardProgress) * 80

          return (
            <a
              key={project.id}
              href={project.url || undefined}
              target={project.url ? '_blank' : undefined}
              rel="noopener noreferrer"
              className={`portfolio-card ${isHovered ? 'is-hovered' : ''}`}
              style={{
                opacity: cardProgress,
                transform: `
                  perspective(1000px)
                  rotateX(${isHovered ? 0 : rotateX}deg)
                  translateZ(${isHovered ? 30 : translateZ}px)
                  translateY(${translateY}px)
                `,
                '--card-accent': project.color,
              }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="portfolio-card__glow" />
              <div className="portfolio-card__content">
                <div className="portfolio-card__tags">
                  {project.tags.map(tag => (
                    <span key={tag} className="portfolio-card__tag">{tag}</span>
                  ))}
                </div>
                <h3 className="portfolio-card__title">{project.title}</h3>
                <p className="portfolio-card__desc">{project.desc}</p>
                {project.url && (
                  <span className="portfolio-card__link">
                    Visita →
                  </span>
                )}
              </div>
            </a>
          )
        })}
      </div>

      {/* CTA */}
      <div className="portfolio-scene__cta" style={{ opacity: ctaOpacity }}>
        <p>Hai un progetto in mente?</p>
        <button
          className="portfolio-scene__cta-link"
          onClick={() => {
            const max = document.documentElement.scrollHeight - window.innerHeight
            window.scrollTo({ top: max, behavior: 'smooth' })
          }}
        >
          Contatti ↓
        </button>
      </div>
    </div>
  )
}
