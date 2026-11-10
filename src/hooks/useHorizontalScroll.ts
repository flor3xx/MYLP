import { useCallback, useEffect, useRef, useState } from "react"

export type HorizontalScrollState = {
  /** Scroll position across the row, 0 at the start and 1 at the end. */
  progress: number
  atStart: boolean
  atEnd: boolean
  canScroll: boolean
}

const INITIAL_STATE: HorizontalScrollState = {
  progress: 0,
  atStart: true,
  atEnd: true,
  canScroll: false,
}

/**
 * Reads real scroll geometry from a horizontal strip and moves it one card
 * at a time. Kept dependency-free on purpose: native overflow does the work.
 */
export function useHorizontalScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [state, setState] = useState<HorizontalScrollState>(INITIAL_STATE)

  const update = useCallback(() => {
    const element = ref.current
    if (!element) return

    const max = Math.max(0, element.scrollWidth - element.clientWidth)
    const canScroll = max > 2
    const progress = canScroll ? Math.min(1, Math.max(0, element.scrollLeft / max)) : 1

    setState({
      progress,
      atStart: !canScroll || element.scrollLeft <= 2,
      atEnd: !canScroll || element.scrollLeft >= max - 2,
      canScroll,
    })
  }, [])

  useEffect(() => {
    const element = ref.current
    if (!element) return

    let frame = 0
    const schedule = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        update()
      })
    }

    const observer = new ResizeObserver(schedule)
    observer.observe(element)
    const firstChild = element.firstElementChild
    if (firstChild) observer.observe(firstChild)

    element.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    schedule()

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      observer.disconnect()
      element.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
    }
  }, [update])

  const scrollByStep = useCallback((direction: 1 | -1, smooth: boolean) => {
    const element = ref.current
    if (!element) return

    const firstChild = element.firstElementChild
    const gap = Number.parseFloat(window.getComputedStyle(element).columnGap || "0")
    const step =
      firstChild instanceof HTMLElement
        ? firstChild.offsetWidth + (Number.isFinite(gap) ? gap : 0)
        : element.clientWidth * 0.8

    element.scrollBy({
      left: step * direction,
      behavior: smooth ? "smooth" : "auto",
    })
  }, [])

  return { ref, ...state, scrollByStep }
}
