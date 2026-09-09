import { useMemo } from 'react'
import HeroGeometry from '../three/HeroGeometry'

/**
 * HeroScene: scena iniziale con nome animato e geometria 3D.
 * progress 0→0.3: nome appare letter by letter
 * progress 0.3→0.6: sottotitolo appare
 * progress 0.6→1.0: nome si sposta in alto, 3D si espande
 */
export default function HeroScene({ progress, isActive }) {
  const name = 'nicolò.florean'
  const subtitle = 'Sviluppatore Web & Designer'

  // Letter-by-letter reveal
  const nameChars = useMemo(() => {
    return name.split('').map((char, i) => {
      const charProgress = Math.max(0, Math.min(1, (progress * 3 - i * 0.06) * 4))
      return { char, opacity: charProgress, y: (1 - charProgress) * 30 }
    })
  }, [progress])

  // Subtitle fade in
  const subtitleOpacity = Math.max(0, Math.min(1, (progress - 0.3) * 4))

  // Name position — moves up as scene progresses past 0.5
  const nameY = progress > 0.5
    ? -((progress - 0.5) * 2) * 15 // moves up 15vh max
    : 0

  // Name scale — shrinks slightly
  const nameScale = progress > 0.5
    ? 1 - ((progress - 0.5) * 2) * 0.3
    : 1

  // 3D object opacity and scale
  const geometryOpacity = Math.max(0, Math.min(1, (progress - 0.4) * 3))
  const geometryScale = 0.5 + progress * 0.8

  // Scene exit fade
  const exitFade = progress > 0.85 ? 1 - (progress - 0.85) / 0.15 : 1

  return (
    <div className="hero-scene" style={{ opacity: exitFade }}>
      {/* Three.js 3D background */}
      <div className="hero-scene__3d" style={{ opacity: geometryOpacity }}>
        <HeroGeometry scale={geometryScale} progress={progress} isActive={isActive} />
      </div>

      {/* Gradient overlay */}
      <div className="hero-scene__gradient" />

      {/* Text content */}
      <div
        className="hero-scene__content"
        style={{ transform: `translateY(${nameY}vh)` }}
      >
        {/* Name — letter by letter */}
        <h1
          className="hero-scene__name"
          style={{ transform: `scale(${nameScale})` }}
        >
          {nameChars.map((c, i) => (
            <span
              key={i}
              className="hero-scene__char"
              style={{
                opacity: c.opacity,
                transform: `translateY(${c.y}px)`,
                display: 'inline-block',
                transition: 'none',
              }}
            >
              {c.char === '.' ? <span className="accent">.</span> : c.char}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          className="hero-scene__subtitle"
          style={{ opacity: subtitleOpacity }}
        >
          {subtitle}
        </p>

        {/* Scroll hint */}
        <div
          className="hero-scene__hint"
          style={{ opacity: progress < 0.2 ? 1 - progress * 5 : 0 }}
        >
          <span>Scroll per esplorare</span>
          <div className="hero-scene__arrow">↓</div>
        </div>
      </div>
    </div>
  )
}
