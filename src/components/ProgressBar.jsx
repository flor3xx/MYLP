/**
 * ProgressBar: indicatore di caricamento stile "batteria del telefono".
 * Piccola sagoma di batteria centrata in basso, il riempimento cresce
 * da sinistra in modo sincrono con lo scroll (progress 0→1).
 */
export default function ProgressBar({ progress = 0 }) {
  const ratio = Math.max(0, Math.min(1, progress))

  return (
    <div
      className="battery"
      role="img"
      aria-label={`Avanzamento pagina: ${Math.round(ratio * 100)}%`}
    >
      <span className="battery__nub" aria-hidden="true" />
      <span className="battery__fill" style={{ width: `${ratio * 100}%` }} />
    </div>
  )
}