import type { CSSProperties } from 'react'
import { usePreferences } from '../app/usePreferences'
import { usePrefersReducedMotion } from '../hooks/useInView'
import { useScrollDrift } from '../hooks/useScrollDrift'
import ProfileFrame from './ProfileFrame'
import { Reveal } from './Reveal'
import Specimen, { type SpecimenKind } from './Specimen'

type WallCell =
  | { area: 'profile'; label: string; depth: number }
  | {
      area: 'window' | 'type' | 'grid' | 'code'
      kind: SpecimenKind
      label: string
      /** Multiplier for the scroll-linked translation; small values stay calm. */
      depth: number
    }

const CELLS: readonly WallCell[] = [
  { area: 'profile', label: 'nicolò florean', depth: 0.3 },
  { area: 'window', kind: 'window', label: 'interface', depth: 0.7 },
  { area: 'type', kind: 'type', label: 'type', depth: -0.4 },
  { area: 'grid', kind: 'grid', label: 'grid', depth: 0.9 },
  { area: 'code', kind: 'code', label: 'styles', depth: -0.6 },
]

/**
 * The hero wall: one dominant portrait cell, one large interface frame, a tall
 * type specimen and two small cells, all entered with a short stagger.
 */
export default function FrameWall() {
  const { preferences } = usePreferences()
  const reducedMotion = usePrefersReducedMotion()
  const wallRef = useScrollDrift<HTMLDivElement>(
    !reducedMotion && preferences.motion !== 'off',
  )

  return (
    <div className="hero__wall container" ref={wallRef}>
      <div className="hero__wall-grid">
        {CELLS.map((cell, index) => (
          <Reveal
            key={cell.area}
            className={`wall-cell wall-cell--${cell.area}`}
            delay={180 + index * 60}
          >
            <div
              className="wall-cell__drift"
              style={{ '--depth': cell.depth } as CSSProperties}
            >
              {cell.area === 'profile' ? (
                <ProfileFrame />
              ) : (
                <Specimen kind={cell.kind} label={cell.label} />
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
