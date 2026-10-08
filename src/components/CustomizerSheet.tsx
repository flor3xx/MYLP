import { useId } from "react"
import { usePreferences } from "../app/usePreferences"
import type {
  ColorScheme,
  Density,
  Language,
  Motion,
  Radius,
  Theme,
} from "../app/preferences"
import PreferenceSegment from "./PreferenceSegment"
import { t } from "../data/translations"

export type CustomizerSheetProps = {
  open: boolean
  onClose: () => void
  id?: string
  title?: string
}

/** Preference panel bound to the shared PreferencesProvider. */
export default function CustomizerSheet({
  open,
  onClose,
  id = "customizer-sheet",
  title,
}: CustomizerSheetProps) {
  const titleId = useId()
  const { preferences, actions } = usePreferences()
  const copy = t(preferences.language)

  if (!open) return null

  return (
    <section
      id={id}
      className="customizer-sheet"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div className="customizer-sheet__header">
        <h2 className="customizer-sheet__title" id={titleId}>
          {title ?? copy.customizer.title}
        </h2>
        <button
          type="button"
          className="customizer-sheet__close"
          aria-label={copy.customizer.closeAria}
          onClick={onClose}
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>

      <div className="customizer-sheet__body">
        <PreferenceSegment<Language>
          label={copy.settings.language}
          value={preferences.language}
          onChange={actions.setLanguage}
          options={[
            { value: "it", label: "Italiano" },
            { value: "en", label: "English" },
          ]}
        />
        <PreferenceSegment<Theme>
          label={copy.settings.theme}
          value={preferences.theme}
          onChange={actions.setTheme}
          options={[
            { value: "dark", label: copy.settings.dark },
            { value: "light", label: copy.settings.light },
          ]}
        />
        <PreferenceSegment<Motion>
          label={copy.settings.motion}
          value={preferences.motion}
          onChange={actions.setMotion}
          options={[
            { value: "on", label: copy.settings.on },
            { value: "off", label: copy.settings.off },
          ]}
        />
        <PreferenceSegment<Density>
          label={copy.settings.density}
          value={preferences.density}
          onChange={actions.setDensity}
          options={[
            { value: "comfortable", label: copy.settings.comfortable },
            { value: "compact", label: copy.settings.compact },
          ]}
        />
        <PreferenceSegment<Radius>
          label={copy.settings.radius}
          value={preferences.radius}
          onChange={actions.setRadius}
          options={[
            { value: "soft", label: copy.settings.soft },
            { value: "rounded", label: copy.settings.rounded },
            { value: "sharp", label: copy.settings.sharp },
          ]}
        />
        <PreferenceSegment<ColorScheme>
          label={copy.settings.color}
          value={preferences.colorScheme}
          onChange={actions.setColorScheme}
          options={[
            { value: "pink", label: copy.settings.pink },
            { value: "blue", label: copy.settings.blue },
            { value: "lime", label: copy.settings.lime },
            { value: "orange", label: copy.settings.orange },
          ]}
        />
      </div>

      <div className="customizer-sheet__footer">
        <button
          type="button"
          className="customizer-sheet__reset"
          onClick={actions.reset}
        >
          {copy.customizer.reset}
        </button>
      </div>
    </section>
  )
}
