/**
 * ScrollIndicator: barra laterale che si allunga gradualmente con lo scroll.
 * Nessun pallino: solo la linea di progresso che cresce in modo fluido.
 */
export default function ScrollIndicator({ active, progress, total }) {
  // Progresso globale 0→1 (scena attiva + progresso locale)
  const fillRatio = Math.max(0, Math.min(1, (active + progress) / total))

  return (
    <div className="scroll-indicator" aria-hidden="true">
      <div className="scroll-indicator__track">
        <div
          className="scroll-indicator__fill"
          style={{ height: `${fillRatio * 100}%` }}
        />
      </div>
    </div>
  )
}