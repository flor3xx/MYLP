import { usePreferences } from "../app/usePreferences"
import { Frame } from "./Frame"

export type SpecimenKind =
  | "window"
  | "palette"
  | "motion"
  | "layout"
  | "type"
  | "grid"
  | "chart"
  | "code"

type SpecimenProps = {
  kind: SpecimenKind
  label: string
  className?: string
}

/** Four lines of real CSS describing this page, used as a type sample. */
const CODE_LINES = [
  { text: ".sheet {", accent: true },
  { text: "  gap: var(--frame-gap);", accent: false },
  { text: "  color: var(--accent);", accent: false },
  { text: "}", accent: true },
] as const

const CHART_BARS = 18

export default function Specimen({ kind, label, className = "" }: SpecimenProps) {
  const { preferences } = usePreferences()

  const fontLabel =
    preferences.font === "editorial"
      ? "DM Serif Display"
      : preferences.font === "geometric"
        ? "Syne"
        : "Bricolage Grotesque"

  return (
    <Frame label={label} className={`specimen specimen--${kind}${className ? ` ${className}` : ""}`}>
      {kind === "window" && (
        <div className="specimen__window">
          <i />
          <i />
          <i />
          <i />
          <strong>
            {preferences.font === "editorial"
              ? "Shape the sheet"
              : preferences.font === "geometric"
                ? "Cut the grid"
                : "Build the sheet"}
          </strong>
        </div>
      )}

      {kind === "palette" && (
        <div className="specimen__swatches">
          <i />
          <i />
          <i />
          <i />
        </div>
      )}

      {kind === "motion" && (
        <div className="specimen__orbit">
          <i />
          <i />
          <i />
        </div>
      )}

      {kind === "layout" && (
        <div className="specimen__layout">
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
      )}

      {kind === "type" && (
        <div className="specimen__type">
          <span className="specimen__type-glyph" aria-hidden="true">
            Aa
          </span>
          <span className="specimen__type-weights" aria-hidden="true">
            <span>Regular 400</span>
            <span>Semibold 600</span>
            <span>Bold 700</span>
          </span>
          <span className="specimen__type-meta">
            <span>{fontLabel}</span>
            <span className="specimen__type-set" aria-hidden="true">
              Aa Bb Cc Dd Ee Ff Gg 0123456789
            </span>
          </span>
        </div>
      )}

      {kind === "grid" && (
        <div className="specimen__grid" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
      )}

      {kind === "chart" && (
        <div className="specimen__chart" aria-hidden="true">
          {Array.from({ length: CHART_BARS }, (_, index) => (
            <i key={index} />
          ))}
        </div>
      )}

      {kind === "code" && (
        <pre className="specimen__code" aria-hidden="true">
          <code>
            {CODE_LINES.map((line) => (
              <span key={line.text} className={line.accent ? "is-accent" : "is-ink"}>
                {line.text}
              </span>
            ))}
          </code>
        </pre>
      )}
    </Frame>
  )
}
