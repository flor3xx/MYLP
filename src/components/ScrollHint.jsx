/**
 * ScrollHint: suggerimento iniziale "scrolla" in basso al centro.
 * Pulsa finché non arriva il primo scroll, poi si dissolve.
 * Ottenere l'attenzione dell'utente sull'azione di scorrimento.
 */
export default function ScrollHint({ visible = false }) {
  return (
    <div
      className="scroll-hint"
      aria-hidden="true"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translate(-50%, 0)' : 'translate(-50%, 12px)',
      }}
    >
      <span className="scroll-hint__text">Scrolla per esplorare</span>
      <span className="scroll-hint__arrow">↓</span>
    </div>
  )
}