export type Language = 'it' | 'en'
export type Theme = 'dark' | 'light'
export type Motion = 'off' | 'calm' | 'on' | 'expressive'
export type Density = 'comfortable' | 'compact' | 'dense'
export type Radius = 'soft' | 'rounded' | 'sharp'
export type ColorScheme = 'pink' | 'blue' | 'lime' | 'orange'
export type FontChoice = 'grotesk' | 'editorial' | 'geometric'
export type Layout = 'sheet' | 'split' | 'centered'
export type Surface = 'flat' | 'grain' | 'scanlines'
export type ImageTreatment = 'natural' | 'monochrome' | 'highContrast'
export type AccentIntensity = 'subtle' | 'standard' | 'vivid'
export type TypeScale = 'small' | 'regular' | 'large'
export type HeadingTracking = 'tight' | 'normal' | 'wide'
export type SurfaceStyle = 'solid' | 'panel' | 'outline'
export type AccentUsage = 'action' | 'everywhere'

export type Preferences = {
  language: Language
  theme: Theme
  motion: Motion
  density: Density
  radius: Radius
  colorScheme: ColorScheme
  font: FontChoice
  layout: Layout
  surface: Surface
  imageTreatment: ImageTreatment
  accentIntensity: AccentIntensity
  typeScale: TypeScale
  headingTracking: HeadingTracking
  surfaceStyle: SurfaceStyle
  accentUsage: AccentUsage
}

/** The shipped look: every additional field defaults to "no visual change". */
export const DEFAULT_PREFERENCES: Preferences = {
  language: 'it',
  theme: 'dark',
  motion: 'on',
  density: 'comfortable',
  radius: 'soft',
  colorScheme: 'pink',
  font: 'grotesk',
  layout: 'sheet',
  surface: 'grain',
  imageTreatment: 'natural',
  accentIntensity: 'standard',
  typeScale: 'regular',
  headingTracking: 'normal',
  surfaceStyle: 'solid',
  accentUsage: 'everywhere',
}

export const PREFERENCES_STORAGE_KEY = 'mylp-preferences-v2'

/**
 * A curated combination of preferences applied in one click. Language and
 * image treatment stay untouched so a preset never changes the reader's
 * language or the photography they already picked.
 */
export type PresetId = 'archivio' | 'editoriale' | 'segnale' | 'notte' | 'carta'

export type PresetPatch = Partial<Omit<Preferences, 'language'>> &
  Pick<Preferences, 'theme' | 'colorScheme'>

export type PreferencePreset = {
  readonly id: PresetId
  readonly patch: PresetPatch
}

export const PREFERENCE_PRESETS: readonly PreferencePreset[] = [
  {
    id: 'archivio',
    patch: {
      theme: 'dark',
      colorScheme: 'pink',
      font: 'grotesk',
      layout: 'sheet',
      density: 'comfortable',
      radius: 'soft',
      surface: 'grain',
      motion: 'on',
      accentIntensity: 'standard',
      typeScale: 'regular',
      headingTracking: 'normal',
      surfaceStyle: 'solid',
      accentUsage: 'everywhere',
    },
  },
  {
    id: 'editoriale',
    patch: {
      theme: 'light',
      colorScheme: 'orange',
      font: 'editorial',
      layout: 'split',
      density: 'comfortable',
      radius: 'rounded',
      surface: 'grain',
      motion: 'calm',
      accentIntensity: 'subtle',
      typeScale: 'large',
      headingTracking: 'normal',
      surfaceStyle: 'outline',
      accentUsage: 'action',
    },
  },
  {
    id: 'segnale',
    patch: {
      theme: 'dark',
      colorScheme: 'lime',
      font: 'geometric',
      layout: 'sheet',
      density: 'dense',
      radius: 'sharp',
      surface: 'scanlines',
      motion: 'expressive',
      accentIntensity: 'vivid',
      typeScale: 'small',
      headingTracking: 'tight',
      surfaceStyle: 'outline',
      accentUsage: 'everywhere',
    },
  },
  {
    id: 'notte',
    patch: {
      theme: 'dark',
      colorScheme: 'blue',
      font: 'grotesk',
      layout: 'centered',
      density: 'compact',
      radius: 'rounded',
      surface: 'flat',
      motion: 'calm',
      accentIntensity: 'standard',
      typeScale: 'small',
      headingTracking: 'wide',
      surfaceStyle: 'panel',
      accentUsage: 'action',
    },
  },
  {
    id: 'carta',
    patch: {
      theme: 'light',
      colorScheme: 'orange',
      font: 'editorial',
      layout: 'centered',
      density: 'comfortable',
      radius: 'soft',
      surface: 'flat',
      motion: 'off',
      accentIntensity: 'subtle',
      typeScale: 'regular',
      headingTracking: 'normal',
      surfaceStyle: 'solid',
      accentUsage: 'action',
    },
  },
]

/** True when every field the preset touches already matches the current state. */
export function matchesPreset(current: Preferences, patch: PresetPatch): boolean {
  return (Object.keys(patch) as Array<keyof PresetPatch>).every(
    (key) => current[key] === patch[key],
  )
}

export type PreferencesAction =
  | { type: 'SET_LANGUAGE'; language: Language }
  | { type: 'SET_THEME'; theme: Theme }
  | { type: 'SET_MOTION'; motion: Motion }
  | { type: 'SET_DENSITY'; density: Density }
  | { type: 'SET_RADIUS'; radius: Radius }
  | { type: 'SET_COLOR_SCHEME'; colorScheme: ColorScheme }
  | { type: 'SET_FONT'; font: FontChoice }
  | { type: 'SET_LAYOUT'; layout: Layout }
  | { type: 'SET_SURFACE'; surface: Surface }
  | { type: 'SET_IMAGE_TREATMENT'; imageTreatment: ImageTreatment }
  | { type: 'SET_ACCENT_INTENSITY'; accentIntensity: AccentIntensity }
  | { type: 'SET_TYPE_SCALE'; typeScale: TypeScale }
  | { type: 'SET_HEADING_TRACKING'; headingTracking: HeadingTracking }
  | { type: 'SET_SURFACE_STYLE'; surfaceStyle: SurfaceStyle }
  | { type: 'SET_ACCENT_USAGE'; accentUsage: AccentUsage }
  | { type: 'SET_PREFERENCES'; preferences: Partial<Preferences> }
  | { type: 'RESET_PREFERENCES' }

export const preferencesActions = {
  setLanguage: (language: Language): PreferencesAction => ({ type: 'SET_LANGUAGE', language }),
  setTheme: (theme: Theme): PreferencesAction => ({ type: 'SET_THEME', theme }),
  setMotion: (motion: Motion): PreferencesAction => ({ type: 'SET_MOTION', motion }),
  setDensity: (density: Density): PreferencesAction => ({ type: 'SET_DENSITY', density }),
  setRadius: (radius: Radius): PreferencesAction => ({ type: 'SET_RADIUS', radius }),
  setColorScheme: (colorScheme: ColorScheme): PreferencesAction => ({
    type: 'SET_COLOR_SCHEME',
    colorScheme,
  }),
  setFont: (font: FontChoice): PreferencesAction => ({ type: 'SET_FONT', font }),
  setLayout: (layout: Layout): PreferencesAction => ({ type: 'SET_LAYOUT', layout }),
  setSurface: (surface: Surface): PreferencesAction => ({ type: 'SET_SURFACE', surface }),
  setImageTreatment: (imageTreatment: ImageTreatment): PreferencesAction => ({
    type: 'SET_IMAGE_TREATMENT',
    imageTreatment,
  }),
  setAccentIntensity: (accentIntensity: AccentIntensity): PreferencesAction => ({
    type: 'SET_ACCENT_INTENSITY',
    accentIntensity,
  }),
  setTypeScale: (typeScale: TypeScale): PreferencesAction => ({
    type: 'SET_TYPE_SCALE',
    typeScale,
  }),
  setHeadingTracking: (headingTracking: HeadingTracking): PreferencesAction => ({
    type: 'SET_HEADING_TRACKING',
    headingTracking,
  }),
  setSurfaceStyle: (surfaceStyle: SurfaceStyle): PreferencesAction => ({
    type: 'SET_SURFACE_STYLE',
    surfaceStyle,
  }),
  setAccentUsage: (accentUsage: AccentUsage): PreferencesAction => ({
    type: 'SET_ACCENT_USAGE',
    accentUsage,
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
    case 'SET_FONT':
      return { ...state, font: action.font }
    case 'SET_LAYOUT':
      return { ...state, layout: action.layout }
    case 'SET_SURFACE':
      return { ...state, surface: action.surface }
    case 'SET_IMAGE_TREATMENT':
      return { ...state, imageTreatment: action.imageTreatment }
    case 'SET_ACCENT_INTENSITY':
      return { ...state, accentIntensity: action.accentIntensity }
    case 'SET_TYPE_SCALE':
      return { ...state, typeScale: action.typeScale }
    case 'SET_HEADING_TRACKING':
      return { ...state, headingTracking: action.headingTracking }
    case 'SET_SURFACE_STYLE':
      return { ...state, surfaceStyle: action.surfaceStyle }
    case 'SET_ACCENT_USAGE':
      return { ...state, accentUsage: action.accentUsage }
    case 'SET_PREFERENCES':
      return { ...state, ...action.preferences }
    case 'RESET_PREFERENCES':
      return { ...DEFAULT_PREFERENCES }
  }
}

const allowedValues: { [K in keyof Preferences]: readonly Preferences[K][] } = {
  language: ['it', 'en'],
  theme: ['dark', 'light'],
  motion: ['off', 'calm', 'on', 'expressive'],
  density: ['comfortable', 'compact', 'dense'],
  radius: ['soft', 'rounded', 'sharp'],
  colorScheme: ['pink', 'blue', 'lime', 'orange'],
  font: ['grotesk', 'editorial', 'geometric'],
  layout: ['sheet', 'split', 'centered'],
  surface: ['flat', 'grain', 'scanlines'],
  imageTreatment: ['natural', 'monochrome', 'highContrast'],
  accentIntensity: ['subtle', 'standard', 'vivid'],
  typeScale: ['small', 'regular', 'large'],
  headingTracking: ['tight', 'normal', 'wide'],
  surfaceStyle: ['solid', 'panel', 'outline'],
  accentUsage: ['action', 'everywhere'],
}

const preferenceKeys = Object.keys(allowedValues) as Array<keyof Preferences>

function isAllowedValue<K extends keyof Preferences>(
  key: K,
  value: unknown,
): value is Preferences[K] {
  return (
    typeof value === 'string' && (allowedValues[key] as readonly string[]).includes(value)
  )
}

function applyPreference<K extends keyof Preferences>(
  target: Preferences,
  key: K,
  value: unknown,
): void {
  if (!isAllowedValue(key, value)) return
  target[key] = value
}

/**
 * Reads persisted preferences, dropping unknown or outdated values and
 * falling back to the defaults for anything missing.
 */
export function loadPreferences(): Preferences {
  if (typeof window === 'undefined') return DEFAULT_PREFERENCES

  try {
    const raw = window.localStorage.getItem(PREFERENCES_STORAGE_KEY)
    if (!raw) return DEFAULT_PREFERENCES

    const candidate = JSON.parse(raw) as Record<string, unknown>
    const next: Preferences = { ...DEFAULT_PREFERENCES }

    for (const key of preferenceKeys) {
      applyPreference(next, key, candidate[key])
    }

    return next
  } catch {
    return DEFAULT_PREFERENCES
  }
}

export const actions = preferencesActions
export const reducer = preferencesReducer
export type PreferencesActions = typeof preferencesActions
