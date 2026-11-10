import { useId } from 'react'
import { PREFERENCE_PRESETS, matchesPreset } from '../app/preferences'
import { usePreferences } from '../app/usePreferences'
import type { PresetCopyMap } from '../data/copy/customizer'

export type CustomizerPresetsProps = {
  copy: PresetCopyMap
}

/**
 * Curated schemes. Applying one dispatches a single partial update, and the
 * pressed state is derived from the current preferences rather than stored,
 * so a preset lights up again as soon as the state matches it.
 */
export default function CustomizerPresets({ copy }: CustomizerPresetsProps) {
  const { preferences, actions } = usePreferences()
  const titleId = useId()
  const activeId = PREFERENCE_PRESETS.find((preset) =>
    matchesPreset(preferences, preset.patch),
  )?.id

  return (
    <div className="customizer-presets" role="group" aria-labelledby={titleId}>
      <div className="customizer-presets__head">
        <h3 className="customizer-group__title" id={titleId}>
          {copy.title}
        </h3>
        <p className="customizer-presets__hint">{copy.hint}</p>
      </div>

      <div className="customizer-presets__list">
        {PREFERENCE_PRESETS.map((preset) => {
          const text = copy.items[preset.id]
          const active = activeId === preset.id

          return (
            <button
              key={preset.id}
              type="button"
              className={`customizer-preset${active ? ' is-active' : ''}`}
              aria-pressed={active}
              onClick={() => actions.setPreferences(preset.patch)}
            >
              <span className="customizer-preset__text">
                <span className="customizer-preset__name">{text.name}</span>
                <span className="customizer-preset__note">{text.note}</span>
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
