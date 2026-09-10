import { SKILLS } from '../data/content'

/**
 * About (sezione laterale sinistra): chi sono — bio + skill pills compatte.
 * Le forme 2D e il 3D ora sono centrali e persistenti, qui solo contenuto.
 */
export default function AboutScene({ progress = 0, reduced = false }) {
  const move = reduced ? 0 : 1

  // Text entrance
  const textOpacity = Math.max(0, Math.min(1, progress * 4))
  const textX = (1 - Math.min(1, progress * 4)) * -30 * move

  // Skills circle: compaiono distribuite da progress 0.25 a 0.85
  const skillsOpacity = Math.max(0, Math.min(1, (progress - 0.25) * 2.5))

  return (
    <section
      className="info-bloc about-info"
      style={{ opacity: progress }}
    >
      <div
        className="about-info__text"
        style={{
          opacity: textOpacity,
          transform: `translateX(${textX}px)`,
        }}
      >
        <span className="section-label">// chi sono</span>
        <h2 className="about-info__title">Nicolò Florean</h2>
        <p className="about-info__bio">
          Sviluppatore web e designer con passione per le interazioni fluide
          e i siti che lasciano il segno. Creo esperienze digitali che
          combinano estetica curata e codice performante.
        </p>
        <p className="about-info__bio about-info__bio--muted">
          20 anni, in corso di Alta Formazione in Informatica a Rovereto.
          Autodidatta, curioso, sempre alla ricerca del progetto successivo.
        </p>
      </div>

      <div
        className="about-info__skills"
        style={{ opacity: skillsOpacity }}
      >
        <h3 className="about-info__skills-title">Stack & Skills</h3>
        <div className="about-info__skills-grid">
          {SKILLS.map((skill, i) => {
            const delay = i * 0.1
            const skillProgress = Math.max(0, Math.min(1, (progress - 0.3 - delay) / 0.12))

            return (
              <div
                key={skill.name}
                className="skill-pill"
                style={{
                  opacity: skillProgress,
                  transform: `translateY(${(1 - skillProgress) * 16 * move}px)`,
                }}
              >
                <span className="skill-pill__icon">{skill.icon}</span>
                <span className="skill-pill__name">{skill.name}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}