export type Language = 'it' | 'en'
export type Theme = 'dark' | 'light'
export type Motion = 'on' | 'off'
export type Density = 'comfortable' | 'compact'
export type Radius = 'soft' | 'rounded' | 'sharp'
export type ColorScheme = 'pink' | 'blue' | 'lime' | 'orange'

export type Preferences = {
  language: Language
  theme: Theme
  motion: Motion
  density: Density
  radius: Radius
  colorScheme: ColorScheme
}

export const DEFAULT_PREFERENCES: Preferences = {
  language: 'it',
  theme: 'dark',
  motion: 'on',
  density: 'comfortable',
  radius: 'soft',
  colorScheme: 'pink',
}

export type PreferencesAction =
  | { type: 'SET_LANGUAGE'; language: Language }
  | { type: 'SET_THEME'; theme: Theme }
  | { type: 'SET_MOTION'; motion: Motion }
  | { type: 'SET_DENSITY'; density: Density }
  | { type: 'SET_RADIUS'; radius: Radius }
  | { type: 'SET_COLOR_SCHEME'; colorScheme: ColorScheme }
  | { type: 'SET_PREFERENCES'; preferences: Partial<Preferences> }
  | { type: 'RESET_PREFERENCES' }

export const preferencesActions = {
  setLanguage: (language: Language): PreferencesAction => ({
    type: 'SET_LANGUAGE',
    language,
  }),
  setTheme: (theme: Theme): PreferencesAction => ({
    type: 'SET_THEME',
    theme,
  }),
  setMotion: (motion: Motion): PreferencesAction => ({
    type: 'SET_MOTION',
    motion,
  }),
  setDensity: (density: Density): PreferencesAction => ({
    type: 'SET_DENSITY',
    density,
  }),
  setRadius: (radius: Radius): PreferencesAction => ({
    type: 'SET_RADIUS',
    radius,
  }),
  setColorScheme: (colorScheme: ColorScheme): PreferencesAction => ({
    type: 'SET_COLOR_SCHEME',
    colorScheme,
  }),
  setPreferences: (preferences: Partial<Preferences>): PreferencesAction => ({
    type: 'SET_PREFERENCES',
    preferences,
  }),
  reset: (): PreferencesAction => ({ type: 'RESET_PREFERENCES' }),
  resetPreferences: (): PreferencesAction => ({ type: 'RESET_PREFERENCES' }),
}

export const preferencesReducer = (
  state: Preferences,
  action: PreferencesAction,
): Preferences => {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return { ...state, language: action.language }
    case 'SET_THEME':
      return { ...state, theme: action.theme }
    case 'SET_MOTION':
      return { ...state, motion: action.motion }
    case 'SET_DENSITY':
      return { ...state, density: action.density }
    case 'SET_RADIUS':
      return { ...state, radius: action.radius }
    case 'SET_COLOR_SCHEME':
      return { ...state, colorScheme: action.colorScheme }
    case 'SET_PREFERENCES':
      return { ...state, ...action.preferences }
    case 'RESET_PREFERENCES':
      return { ...DEFAULT_PREFERENCES }
  }
}

export const actions = preferencesActions
export const reducer = preferencesReducer

export type PreferencesActions = typeof preferencesActions
