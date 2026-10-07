import { useState } from "react"

type Theme = "light" | "dark"

type SegmentedProps<T extends string> = {
  label: string
  options: { value: T; label: string }[]
  value: T
  onChange: (value: T) => void
}

function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
}: SegmentedProps<T>) {
  return (
    <div className="control">
      <span className="control__label">{label}</span>
      <div className="seg" role="group" aria-label={label}>
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            className={`seg__btn${value === option.value ? " is-active" : ""}`}
            aria-pressed={value === option.value}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function Demo() {
  const [theme, setTheme] = useState<Theme>("dark")
  const [motion, setMotion] = useState<"on" | "off">("on")
  const [density, setDensity] = useState<"comoda" | "densa">("comoda")

  return (
    <section className="demo" id="demo">
      <div className="container">
        <p className="eyebrow">La demo</p>
        <h2 className="section-title">Non fidarti delle parole. Provalo.</h2>
        <p className="section-lead">
          Questa è una demo reale: cambia le opzioni a sinistra e guarda la pagina
          reagire, come farà la tua.
        </p>

        <div className="demo__canvas">
          <div className="controls">
            <p className="controls__title">Pannello</p>
            <Segmented
              label="Tema"
              value={theme}
              onChange={setTheme}
              options={[
                { value: "light", label: "Chiaro" },
                { value: "dark", label: "Scuro" },
              ]}
            />
            <Segmented
              label="Animazioni"
              value={motion}
              onChange={setMotion}
              options={[
                { value: "on", label: "On" },
                { value: "off", label: "Off" },
              ]}
            />
            <Segmented
              label="Densità"
              value={density}
              onChange={setDensity}
              options={[
                { value: "comoda", label: "Comoda" },
                { value: "densa", label: "Densa" },
              ]}
            />
            <p className="controls__note">
              <i aria-hidden="true" />
              Demo live · nicolò
            </p>
          </div>

          <div
            className="preview"
            data-theme={theme}
            data-motion={motion}
            data-density={density}
          >
            <div className="preview__bar">
              <span className="preview__dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span className="preview__url">tuosito.it</span>
            </div>
            <div className="preview__page">
              <div className="preview__copy">
                <span className="preview__h" />
                <span className="preview__h preview__h--short" />
                <span className="preview__s" />
                <span className="preview__s preview__s--short" />
                <span className="preview__cta">Prova</span>
              </div>
              <div className="preview__visual">
                <span className="preview__orb" />
                <span className="preview__orb preview__orb--small" />
              </div>
              <div className="preview__cards">
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
