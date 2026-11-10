import { useEffect, useRef } from 'react'

/**
 * Writes the wall's viewport progress into a `--drift-y` custom property on the
 * container. Frames translate by a small, depth-weighted amount; the text block
 * never moves, and the value stops updating when `enabled` is false.
 */
export function useScrollDrift<T extends HTMLElement>(enabled: boolean, distance = 22) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    if (!enabled) {
      element.style.removeProperty('--drift-y')
      return
    }

    let frame = 0

    const update = () => {
      frame = 0
      const rect = element.getBoundingClientRect()
      const viewport = window.innerHeight || 1
      const progress = Math.min(Math.max((viewport - rect.top) / (viewport + rect.height), 0), 1)
      element.style.setProperty('--drift-y', `${(progress - 0.5) * distance}px`)
    }

    const request = () => {
      if (frame === 0) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', request, { passive: true })
    window.addEventListener('resize', request)

    return () => {
      window.removeEventListener('scroll', request)
      window.removeEventListener('resize', request)
      if (frame !== 0) window.cancelAnimationFrame(frame)
      element.style.removeProperty('--drift-y')
    }
  }, [enabled, distance])

  return ref
}
