import { useState } from 'react'

/**
 * Progetti — le 3 card 3D diventano righe compatte (laterale destra).
 * "Prossimamente" rimosso: due progetti con link + CTA contatti.
 */
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
    desc: 'Film scroll, Three.js, GSAP — la pagina che stai guardando.',
    url: '#',
    tags: ['React', 'Three.js', 'GSAP'],
    color: '#7c3aed',
  },
]

/**
 * Portfolio (sezione laterale destra): righe compatte con hover evidenziato.
 */
export default function PortfolioScene({ progress = 0, reduced = false }) {
  const [hoveredId, setHoveredId] = useState(null)
  const move = reduced ? 0 : 1

  const listBase = Math.max(0, Math.min(1, progress * 2.5))

  return (
    <section
      className="info-bloc portfolio-info"
      style={{ opacity: progress }}
    >
      <span className="section-label">// lavori</span>
      <h2 className="portfolio-info__title">Portfolio</h2>

      <div className="portfolio-info__list">
        {PROJECTS.map((project, i) => {
          const delay = i * 0.15
          const rowProgress = Math.max(0, Math.min(1, (listBase - delay) * 3))
          const isHovered = hoveredId === project.id

          return (
            <a
              key={project.id}
              href={project.url || undefined}
              target={project.url ? '_blank' : undefined}
              rel="noopener noreferrer"
              className={`portfolio-row ${isHovered ? 'is-hovered' : ''}`}
              style={{
                opacity: rowProgress,
                transform: `translateY(${(1 - rowProgress) * 20 * move}px)`,
                '--card-accent': project.color,
              }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="portfolio-row__tags">
                {project.tags.map(tag => (
                  <span key={tag} className="portfolio-row__tag">{tag}</span>
                ))}
              </div>
              <h3 className="portfolio-row__title">{project.title}</h3>
              <p className="portfolio-row__desc">{project.desc}</p>
              {project.url && (
                <span className="portfolio-row__link">Visita →</span>
              )}
            </a>
          )
        })}
      </div>
    </section>
  )
}