import { SKILLS } from '../data/content'
import GeometricShapes from '../components/GeometricShapes'

/**
 * AboutScene: chi sono — testo + forme 2D + skill icons.
 * progress 0→0.3: testo about entra
 * progress 0.3→0.6: forme geometriche si muovono
 * progress 0.6→1.0: skill icons in cerchio
 */
export default function AboutScene({ progress }) {
  // Text entrance
  const textOpacity = Math.max(0, Math.min(1, progress * 4))
  const textX = (1 - Math.min(1, progress * 4)) * -60

  // Geometric shapes movement
  const shapesOpacity = Math.max(0, Math.min(1, (progress - 0.15) * 4))

  // Skills circle: compaiono distribuite da progress 0.28 a 0.85
  const skillsOpacity = Math.max(0, Math.min(1, (progress - 0.28) * 2.5))
  const skillsScale = 0.7 + Math.min(1, (progress - 0.28) * 2.5) * 0.3

  // Scene entrance
  const enterFade = progress < 0.05 ? progress / 0.05 : 1
  // Scene exit
  const exitFade = progress > 0.92 ? 1 - (progress - 0.92) / 0.08 : 1

  return (
    <div className="about-scene" style={{ opacity: enterFade * exitFade }}>
      {/* Animated geometric shapes background */}
      <div className="about-scene__shapes" style={{ opacity: shapesOpacity }}>
        <GeometricShapes progress={progress} />
      </div>

      <div className="about-scene__layout">
        {/* Left: Text content */}
        <div
          className="about-scene__text"
          style={{
            opacity: textOpacity,
            transform: `translateX(${textX}px)`,
          }}
        >
          <span className="section-label">// chi sono</span>
          <h2 className="about-scene__title">
            Nicolò Florean
          </h2>
          <p className="about-scene__bio">
            Sviluppatore web e designer con passione per le interazioni fluide
            e i siti che lasciano il segno. Creo esperienze digitali che
            combinano estetica curata e codice performante.
          </p>
          <p className="about-scene__bio about-scene__bio--muted">
            20 anni, in corso di Alta Formazione in Informatica a Rovereto.
            Autodidatta, curioso, sempre alla ricerca del progetto successivo
            che mi spinge oltre.
          </p>
        </div>

        {/* Right: Skills */}
        <div
          className="about-scene__skills"
          style={{
            opacity: skillsOpacity,
            transform: `scale(${skillsScale})`,
          }}
        >
          <h3 className="about-scene__skills-title">Stack & Skills</h3>
          <div className="about-scene__skills-grid">
            {SKILLS.map((skill, i) => {
              // Ogni pill appare in una finestra di 0.10, partendo da 0.30
              // 6 skill * 0.10 spacing = tutte visibili entro progress 0.85
              const delay = i * 0.1
              const skillProgress = Math.max(0, Math.min(1, (progress - 0.30 - delay) / 0.12))

              return (
                <div
                  key={skill.name}
                  className="skill-pill"
                  style={{
                    opacity: skillProgress,
                    transform: `translateY(${(1 - skillProgress) * 20}px)`,
                  }}
                >
                  <span className="skill-pill__icon">{skill.icon}</span>
                  <span className="skill-pill__name">{skill.name}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
