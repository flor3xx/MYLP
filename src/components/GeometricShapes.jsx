import { useMemo } from 'react'

/**
 * Forme geometriche 2D animate che reagiscono allo scroll.
 * Cerchi, triangoli, linee che si muovono e ruotano.
 */
export default function GeometricShapes({ progress }) {
  const shapes = useMemo(() => [
    { type: 'circle', cx: 15, cy: 20, r: 80, speed: 1.2, color: '#a855f7' },
    { type: 'circle', cx: 85, cy: 70, r: 50, speed: 0.8, color: '#7c3aed' },
    { type: 'circle', cx: 70, cy: 15, r: 35, speed: 1.5, color: '#c084fc' },
    { type: 'triangle', cx: 90, cy: 30, size: 60, speed: 1.0, color: '#a855f7' },
    { type: 'line', x1: 10, y1: 60, x2: 40, y2: 80, speed: 0.7, color: '#333' },
    { type: 'line', x1: 60, y1: 10, x2: 90, y2: 40, speed: 1.1, color: '#333' },
  ], [])

  return (
    <svg
      className="geometric-shapes"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    >
      {shapes.map((shape, i) => {
        const t = progress * shape.speed * Math.PI * 2
        const offsetX = Math.sin(t + i) * 5
        const offsetY = Math.cos(t + i * 0.7) * 5
        const rotation = progress * 360 * shape.speed * 0.3
        const opacity = 0.08 + progress * 0.12

        if (shape.type === 'circle') {
          return (
            <circle
              key={i}
              cx={shape.cx + offsetX}
              cy={shape.cy + offsetY}
              r={shape.r / 10}
              fill="none"
              stroke={shape.color}
              strokeWidth="0.15"
              opacity={opacity}
              style={{
                transform: `rotate(${rotation}deg)`,
                transformOrigin: `${shape.cx}% ${shape.cy}%`,
              }}
            />
          )
        }

        if (shape.type === 'triangle') {
          const s = shape.size / 10
          const cx = shape.cx + offsetX
          const cy = shape.cy + offsetY
          const points = [
            `${cx},${cy - s}`,
            `${cx - s * 0.866},${cy + s * 0.5}`,
            `${cx + s * 0.866},${cy + s * 0.5}`,
          ].join(' ')

          return (
            <polygon
              key={i}
              points={points}
              fill="none"
              stroke={shape.color}
              strokeWidth="0.12"
              opacity={opacity}
              style={{
                transform: `rotate(${rotation}deg)`,
                transformOrigin: `${cx}% ${cy}%`,
              }}
            />
          )
        }

        if (shape.type === 'line') {
          return (
            <line
              key={i}
              x1={shape.x1 + offsetX}
              y1={shape.y1 + offsetY}
              x2={shape.x2 + offsetX * 0.5}
              y2={shape.y2 + offsetY * 0.5}
              stroke={shape.color}
              strokeWidth="0.08"
              opacity={opacity * 0.6}
            />
          )
        }

        return null
      })}
    </svg>
  )
}
