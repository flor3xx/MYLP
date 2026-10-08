export type CustomizerPillProps = {
  open: boolean
  onToggle: () => void
  label?: string
  controlsId?: string
}

/** Compact trigger for the preferences sheet. It owns no preference state. */
export default function CustomizerPill({
  open,
  onToggle,
  label = "Personalizza",
  controlsId = "customizer-sheet",
}: CustomizerPillProps) {
  return (
    <button
      type="button"
      className={`customizer-pill${open ? " is-active" : ""}`}
      aria-expanded={open}
      aria-controls={controlsId}
      onClick={onToggle}
    >
      <span className="customizer-pill__icon" aria-hidden="true">
        ✦
      </span>
      <span className="customizer-pill__label">{label}</span>
    </button>
  )
}
