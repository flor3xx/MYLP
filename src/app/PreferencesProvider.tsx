import { useEffect, useMemo, useReducer, type Dispatch, type PropsWithChildren } from 'react'
import {
  preferencesActions,
  preferencesReducer,
  loadPreferences,
  PREFERENCES_STORAGE_KEY,
  type AccentIntensity,
  type AccentUsage,
  type ColorScheme,
  type Density,
  type FontChoice,
  type HeadingTracking,
  type ImageTreatment,
  type Language,
  type Layout,
  type Motion,
  type Preferences,
  type PreferencesAction,
  type Radius,
  type Surface,
  type SurfaceStyle,
  type Theme,
  type TypeScale,
} from './preferences'
import { PreferencesContext } from './PreferencesContext'

export type PreferencesProviderProps = PropsWithChildren<{
  initialPreferences?: Partial<Preferences>
}>

function bindActions(dispatch: Dispatch<PreferencesAction>) {
  return {
    setLanguage: (language: Language) => dispatch(preferencesActions.setLanguage(language)),
    setTheme: (theme: Theme) => dispatch(preferencesActions.setTheme(theme)),
    setMotion: (motion: Motion) => dispatch(preferencesActions.setMotion(motion)),
    setDensity: (density: Density) => dispatch(preferencesActions.setDensity(density)),
    setRadius: (radius: Radius) => dispatch(preferencesActions.setRadius(radius)),
    setColorScheme: (colorScheme: ColorScheme) =>
      dispatch(preferencesActions.setColorScheme(colorScheme)),
    setFont: (font: FontChoice) => dispatch(preferencesActions.setFont(font)),
    setLayout: (layout: Layout) => dispatch(preferencesActions.setLayout(layout)),
    setSurface: (surface: Surface) => dispatch(preferencesActions.setSurface(surface)),
    setImageTreatment: (imageTreatment: ImageTreatment) =>
      dispatch(preferencesActions.setImageTreatment(imageTreatment)),
    setAccentIntensity: (accentIntensity: AccentIntensity) =>
      dispatch(preferencesActions.setAccentIntensity(accentIntensity)),
    setTypeScale: (typeScale: TypeScale) =>
      dispatch(preferencesActions.setTypeScale(typeScale)),
    setHeadingTracking: (headingTracking: HeadingTracking) =>
      dispatch(preferencesActions.setHeadingTracking(headingTracking)),
    setSurfaceStyle: (surfaceStyle: SurfaceStyle) =>
      dispatch(preferencesActions.setSurfaceStyle(surfaceStyle)),
    setAccentUsage: (accentUsage: AccentUsage) =>
      dispatch(preferencesActions.setAccentUsage(accentUsage)),
    setPreferences: (prefs: Parameters<typeof preferencesActions.setPreferences>[0]) =>
      dispatch(preferencesActions.setPreferences(prefs)),
    reset: () => dispatch(preferencesActions.reset()),
    resetPreferences: () => dispatch(preferencesActions.resetPreferences()),
  }
}

export function PreferencesProvider({
  children,
  initialPreferences,
}: PreferencesProviderProps) {
  const initialState = useMemo(
    () => ({ ...loadPreferences(), ...initialPreferences }),
    [initialPreferences],
  )
  const [preferences, dispatch] = useReducer(preferencesReducer, initialState)

  const actions = useMemo(() => bindActions(dispatch), [dispatch])

  useEffect(() => {
    try {
      window.localStorage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify(preferences))
    } catch {
      // Storage can be unavailable in privacy mode; the session still works.
    }
  }, [preferences])

  const value = useMemo(
    () => ({ preferences, dispatch, actions, ...actions }),
    [preferences, dispatch, actions],
  )

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>
}
