import type { Ref } from 'react'

export type CustomizerPillProps = {
  open: boolean
  onToggle: () => void
  label?: string
  controlsId?: string
  ref?: Ref<HTMLButtonElement>
}

/** Compact trigger for the preferences panel. It owns no preference state. */
export default function CustomizerPill({
  open,
  onToggle,
  label = 'Personalizza',
  controlsId = 'customizer-sheet',
  ref,
}: CustomizerPillProps) {
  return (
    <button
      ref={ref}
      type="button"
      className="customizer-pill"
      data-state={open ? 'open' : 'closed'}
      aria-expanded={open}
      aria-controls={controlsId}
      aria-haspopup="dialog"
      inert={open}
      onClick={onToggle}
    >
      <span className="customizer-pill__icon" aria-hidden="true">
        <svg viewBox="0 0 16 16" width="13" height="13" focusable="false">
          <path
            d="M8 1.5v13M1.5 8h13M3.4 3.4l9.2 9.2M12.6 3.4 3.4 12.6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="customizer-pill__label">{label}</span>
    </button>
  )
}
