import { useMemo, useReducer, type Dispatch, type PropsWithChildren } from 'react'
import {
  DEFAULT_PREFERENCES,
  preferencesActions,
  preferencesReducer,
  type Preferences,
  type PreferencesAction,
} from './preferences'
import { PreferencesContext } from './PreferencesContext'

export type PreferencesProviderProps = PropsWithChildren<{
  initialPreferences?: Partial<Preferences>
}>

function bindActions(dispatch: Dispatch<PreferencesAction>) {
  return {
    setLanguage: (language: Parameters<typeof preferencesActions.setLanguage>[0]) =>
      dispatch(preferencesActions.setLanguage(language)),
    setTheme: (theme: Parameters<typeof preferencesActions.setTheme>[0]) =>
      dispatch(preferencesActions.setTheme(theme)),
    setMotion: (motion: Parameters<typeof preferencesActions.setMotion>[0]) =>
      dispatch(preferencesActions.setMotion(motion)),
    setDensity: (density: Parameters<typeof preferencesActions.setDensity>[0]) =>
      dispatch(preferencesActions.setDensity(density)),
    setRadius: (radius: Parameters<typeof preferencesActions.setRadius>[0]) =>
      dispatch(preferencesActions.setRadius(radius)),
    setColorScheme: (colorScheme: Parameters<typeof preferencesActions.setColorScheme>[0]) =>
      dispatch(preferencesActions.setColorScheme(colorScheme)),
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
    () => ({ ...DEFAULT_PREFERENCES, ...initialPreferences }),
    [initialPreferences],
  )
  const [preferences, dispatch] = useReducer(
    preferencesReducer,
    initialState,
  )

  const actions = useMemo(() => bindActions(dispatch), [dispatch])

  const value = useMemo(
    () => ({ preferences, dispatch, actions, ...actions }),
    [preferences, dispatch, actions],
  )

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  )
}
