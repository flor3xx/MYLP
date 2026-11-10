import { useEffect, useState } from "react"

/**
 * Tracks which page section currently crosses the reading line so the
 * navigation can expose it with aria-current.
 */
export function useScrollSpy(ids: readonly string[]) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const idsKey = ids.join("|")

  useEffect(() => {
    if (!idsKey) return
    const sections = idsKey
      .split("|")
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)

    if (sections.length === 0) return

    let frame = 0
    const update = () => {
      frame = 0
      const line = window.innerHeight * 0.42
      let current: string | null = null
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) current = section.id
      }
      setActiveId(current)
    }
    const schedule = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
    }
  }, [idsKey])

  return activeId
}
