import { useEffect, useRef, type RefObject } from "react"

type ScrubberProps = {
  valueRef: RefObject<number>
  playing: boolean
  onToggle: () => void
  onSeek: (value: number) => void
  label: string
}

const TICKS = 44

export default function Scrubber({
  valueRef,
  playing,
  onToggle,
  onSeek,
  label,
}: ScrubberProps) {
  const rangeRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const el = rangeRef.current
    if (!el) return
    let frame = 0
    const sync = () => {
      el.value = String(valueRef.current ?? 0)
      frame = requestAnimationFrame(sync)
    }
    frame = requestAnimationFrame(sync)
    return () => cancelAnimationFrame(frame)
  }, [valueRef])

  return (
    <div className="scrubber">
      <button
        type="button"
        className="scrubber__play"
        aria-label={playing ? "Pausa" : "Riproduci"}
        aria-pressed={playing}
        onClick={onToggle}
      >
        {playing ? (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="6" y="5" width="4" height="14" rx="1" />
            <rect x="14" y="5" width="4" height="14" rx="1" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8 5l11 7-11 7z" />
          </svg>
        )}
      </button>

      <div className="scrubber__track">
        <div className="scrubber__ticks" aria-hidden="true">
          {Array.from({ length: TICKS }).map((_, i) => (
            <span
              key={i}
              className={`scrubber__tick${i % 5 === 0 ? " is-major" : ""}`}
            />
          ))}
        </div>
        <input
          ref={rangeRef}
          className="scrubber__range"
          type="range"
          min={0}
          max={1}
          step={0.001}
          defaultValue={0}
          aria-label={label}
          onChange={(event) => onSeek(Number(event.target.value))}
        />
      </div>

      <span className="scrubber__label" aria-hidden="true">
        timeline
      </span>
    </div>
  )
}
