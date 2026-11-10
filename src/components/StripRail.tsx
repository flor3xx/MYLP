import { useCallback, useEffect, useRef, useState } from 'react'
import { usePreferences } from '../app/usePreferences'
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
 *
 * The frame closest to the middle of the viewport is the one that is emphasised
 * (full brightness, slightly larger). It is derived from the live scroll
 * position rather than a fixed child index, so arrows, trackpad and touch all
 * move the emphasis with the strip.
 */
export default function StripRail() {
  const { preferences } = usePreferences()
  const scrollerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<number | null>(null)
  const [focusIndex, setFocusIndex] = useState(0)
  const italian = preferences.language === 'it'
  const instant = preferences.motion === 'off'

  const measure = useCallback(() => {
    const scroller = scrollerRef.current
    const track = trackRef.current
    if (!scroller || !track) return

    const bounds = scroller.getBoundingClientRect()
    const center = bounds.left + bounds.width / 2
    const frames = Array.from(track.children) as HTMLElement[]
    if (frames.length === 0) return

    let closest = 0
    let smallest = Number.POSITIVE_INFINITY

    frames.forEach((frame, index) => {
      const rect = frame.getBoundingClientRect()
      const distance = Math.abs(rect.left + rect.width / 2 - center)
      if (distance < smallest) {
        smallest = distance
        closest = index
      }
    })

    setFocusIndex((current) => (current === closest ? current : closest))
  }, [])

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    const schedule = () => {
      if (frameRef.current !== null) return
      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null
        measure()
      })
    }

    measure()
    scroller.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    const observer = new ResizeObserver(schedule)
    observer.observe(scroller)

    return () => {
      scroller.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      observer.disconnect()
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current)
        frameRef.current = null
      }
    }
  }, [measure])

  const scrollToFrame = (index: number) => {
    const scroller = scrollerRef.current
    const track = trackRef.current
    const frame = track?.children[index] as HTMLElement | undefined
    if (!scroller || !frame) return

    const bounds = scroller.getBoundingClientRect()
    const rect = frame.getBoundingClientRect()
    const target =
      scroller.scrollLeft + (rect.left + rect.width / 2) - (bounds.left + bounds.width / 2)

    scroller.scrollTo({ left: target, behavior: instant ? 'auto' : 'smooth' })
  }

  const step = (direction: 1 | -1) => {
    const next = Math.min(Math.max(focusIndex + direction, 0), STRIP_FRAMES.length - 1)
    scrollToFrame(next)
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
            disabled={focusIndex === 0}
            aria-label={italian ? 'Specimen precedenti' : 'Previous specimens'}
          >
            <ArrowLeft />
          </button>
          <button
            type="button"
            className="strip-nav__btn"
            onClick={() => step(1)}
            disabled={focusIndex === STRIP_FRAMES.length - 1}
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
        <div className="hero__strip-track" ref={trackRef}>
          {STRIP_FRAMES.map((frame, index) => (
            <Specimen
              key={frame.kind}
              kind={frame.kind}
              label={frame.label}
              className={index === focusIndex ? 'is-focused' : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
