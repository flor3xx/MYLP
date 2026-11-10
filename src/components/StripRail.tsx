import { useRef } from 'react'
import { usePreferences } from '../app/usePreferences'
import { usePrefersReducedMotion } from '../hooks/useInView'
import Specimen, { type SpecimenKind } from './Specimen'

type StripFrame = {
  kind: SpecimenKind
  label: string
}

const STRIP_FRAMES: readonly StripFrame[] = [
  { kind: 'window', label: 'interface' },
  { kind: 'palette', label: 'accent' },
  { kind: 'motion', label: 'timing' },
  { kind: 'chart', label: 'trace' },
  { kind: 'layout', label: 'columns' },
  { kind: 'type', label: 'type' },
]

function ArrowLeft() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false">
      <path
        d="M10 3.5 5.5 8 10 12.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ArrowRight() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false">
      <path
        d="M6 3.5 10.5 8 6 12.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * The horizontal strip stays a native scroll container: it is keyboard
 * focusable, snaps, and gets explicit previous/next buttons for pointers.
 */
export default function StripRail() {
  const { preferences } = usePreferences()
  const reducedMotion = usePrefersReducedMotion()
  const scrollerRef = useRef<HTMLDivElement>(null)
  const italian = preferences.language === 'it'
  const instant = reducedMotion || preferences.motion === 'off'

  const step = (direction: 1 | -1) => {
    const scroller = scrollerRef.current
    if (!scroller) return

    scroller.scrollBy({
      left: direction * Math.max(scroller.clientWidth * 0.72, 260),
      behavior: instant ? 'auto' : 'smooth',
    })
  }

  return (
    <div className="hero__strip-band">
      <div className="hero__strip-head container">
        <span className="hero__strip-label">
          {italian ? 'striscia specimen' : 'specimen strip'}
        </span>
        <div className="hero__strip-nav">
          <button
            type="button"
            className="strip-nav__btn"
            onClick={() => step(-1)}
            aria-label={italian ? 'Specimen precedenti' : 'Previous specimens'}
          >
            <ArrowLeft />
          </button>
          <button
            type="button"
            className="strip-nav__btn"
            onClick={() => step(1)}
            aria-label={italian ? 'Specimen successivi' : 'Next specimens'}
          >
            <ArrowRight />
          </button>
        </div>
      </div>

      <div
        className="hero__strip"
        ref={scrollerRef}
        tabIndex={0}
        role="group"
        aria-label={
          italian
            ? 'Specimen visivi, scorri in orizzontale'
            : 'Visual specimens, scroll horizontally'
        }
      >
        <div className="hero__strip-track">
          {STRIP_FRAMES.map((frame) => (
            <Specimen key={frame.kind} kind={frame.kind} label={frame.label} />
          ))}
        </div>
      </div>
    </div>
  )
}
