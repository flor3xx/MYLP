import type { Language, Translation } from './types'
import type {
  AccentUsage,
  HeadingTracking,
  PresetId,
  SurfaceStyle,
  TypeScale,
} from '../../app/preferences'

export const customizerCopy: Record<Language, Translation['customizer']> = {
  it: {
    title: 'Personalizza esperienza',
    closeAria: 'Chiudi personalizzazione',
    reset: 'Ripristina predefiniti',
    done: 'Fatto',
  },
  en: {
    title: 'Customize experience',
    closeAria: 'Close customization',
    reset: 'Reset defaults',
    done: 'Done',
  },
}

export const settings: Record<Language, Translation['settings']> = {
  it: {
    language: 'Lingua',
    theme: 'Tema',
    light: 'Chiaro',
    dark: 'Scuro',
    motion: 'Animazioni',
    on: 'On',
    off: 'Off',
    calm: 'Calme',
    expressive: 'Espressive',
    density: 'Densità',
    comfortable: 'Comoda',
    compact: 'Compatta',
    dense: 'Densa',
    radius: 'Angoli',
    soft: 'Morbidi',
    rounded: 'Arrotondati',
    sharp: 'Netti',
    color: 'Colore',
    pink: 'Rosa',
    blue: 'Blu',
    lime: 'Lime',
    orange: 'Arancio',
    font: 'Tipografia',
    grotesk: 'Grottesca',
    editorial: 'Editoriale',
    geometric: 'Geometrica',
    layout: 'Composizione',
    sheet: 'Archivio',
    split: 'Divisa',
    centered: 'Centrata',
    surface: 'Atmosfera',
    flat: 'Piatta',
    grain: 'Grana',
    scanlines: 'Scanline',
    imageTreatment: 'Immagini',
    natural: 'Naturali',
    monochrome: 'Monocromo',
    highContrast: 'Contrasto',
    intensity: 'Intensità',
    subtle: 'Sottile',
    standard: 'Standard',
    vivid: 'Viva',
  },
  en: {
    language: 'Language',
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
    motion: 'Motion',
    on: 'On',
    off: 'Off',
    calm: 'Calm',
    expressive: 'Expressive',
    density: 'Density',
    comfortable: 'Comfortable',
    compact: 'Compact',
    dense: 'Dense',
    radius: 'Corners',
    soft: 'Soft',
    rounded: 'Rounded',
    sharp: 'Sharp',
    color: 'Color',
    pink: 'Pink',
    blue: 'Blue',
    lime: 'Lime',
    orange: 'Orange',
    font: 'Type',
    grotesk: 'Grotesk',
    editorial: 'Editorial',
    geometric: 'Geometric',
    layout: 'Composition',
    sheet: 'Archive',
    split: 'Split',
    centered: 'Centered',
    surface: 'Atmosphere',
    flat: 'Flat',
    grain: 'Grain',
    scanlines: 'Scanlines',
    imageTreatment: 'Images',
    natural: 'Natural',
    monochrome: 'Monochrome',
    highContrast: 'High contrast',
    intensity: 'Intensity',
    subtle: 'Subtle',
    standard: 'Standard',
    vivid: 'Vivid',
  },
}

/** Labels for the fields added on top of the original control set. */
export type AdvancedSettingsCopy = {
  typeScale: { label: string; options: Record<TypeScale, string> }
  headingTracking: { label: string; options: Record<HeadingTracking, string> }
  surfaceStyle: { label: string; options: Record<SurfaceStyle, string> }
  accentUsage: { label: string; options: Record<AccentUsage, string> }
}

export const advancedSettings: Record<Language, AdvancedSettingsCopy> = {
  it: {
    typeScale: {
      label: 'Scala tipografica',
      options: { small: 'Piccola', regular: 'Regolare', large: 'Ampia' },
    },
    headingTracking: {
      label: 'Titoli',
      options: { tight: 'Stretti', normal: 'Normali', wide: 'Ampi' },
    },
    surfaceStyle: {
      label: 'Superfici',
      options: { solid: 'Piene', panel: 'Pannello', outline: 'Contorno' },
    },
    accentUsage: {
      label: 'Accento',
      options: { action: 'Solo azioni', everywhere: 'Ovunque' },
    },
  },
  en: {
    typeScale: {
      label: 'Type scale',
      options: { small: 'Small', regular: 'Regular', large: 'Large' },
    },
    headingTracking: {
      label: 'Headings',
      options: { tight: 'Tight', normal: 'Normal', wide: 'Wide' },
    },
    surfaceStyle: {
      label: 'Surfaces',
      options: { solid: 'Solid', panel: 'Panel', outline: 'Outline' },
    },
    accentUsage: {
      label: 'Accent',
      options: { action: 'Actions only', everywhere: 'Everywhere' },
    },
  },
}

export type PresetCopy = { name: string; note: string }

export type PresetCopyMap = {
  title: string
  hint: string
  items: Record<PresetId, PresetCopy>
}

export const presetCopy: Record<Language, PresetCopyMap> = {
  it: {
    title: 'Schemi',
    hint: 'Cinque direzioni, un click.',
    items: {
      archivio: { name: 'Archivio', note: 'Scuro · rosa · grottesca' },
      editoriale: { name: 'Editoriale', note: 'Chiaro · arancio · serif' },
      segnale: { name: 'Segnale', note: 'Scuro · lime · scanline' },
      notte: { name: 'Notte', note: 'Scuro · blu · calmo' },
      carta: { name: 'Carta', note: 'Chiaro · arancio · piatta' },
    },
  },
  en: {
    title: 'Schemes',
    hint: 'Five directions, one click.',
    items: {
      archivio: { name: 'Archive', note: 'Dark · pink · grotesk' },
      editoriale: { name: 'Editorial', note: 'Light · orange · serif' },
      segnale: { name: 'Signal', note: 'Dark · lime · scanlines' },
      notte: { name: 'Night', note: 'Dark · blue · calm' },
      carta: { name: 'Paper', note: 'Light · orange · flat' },
    },
  },
}

/** Remaining panel chrome that is not part of the shared translation tree. */
export type CustomizerExtras = {
  sheetLead: string
  groupBase: string
  groupShape: string
  groupMatter: string
  previewTitle: string
  previewLive: string
  previewChrome: string
  previewBrand: string
  previewTitleText: string
  previewLine: string
  previewCta: string
  autoSave: string
  savedOne: string
  savedMany: string
}

export const customizerExtras: Record<Language, CustomizerExtras> = {
  it: {
    sheetLead: 'Regola il sistema e guarda la pagina cambiare, in tempo reale.',
    groupBase: 'Base',
    groupShape: 'Forma',
    groupMatter: 'Materia e movimento',
    previewTitle: 'Anteprima',
    previewLive: 'Live',
    previewChrome: '01 / window',
    previewBrand: 'nicolò florean',
    previewTitleText: 'Landing page fatte a mano.',
    previewLine: 'Una pagina che si adatta a chi la guarda.',
    previewCta: 'Scrivimi',
    autoSave: 'Le modifiche si salvano automaticamente',
    savedOne: '1 modifica salvata',
    savedMany: 'Modifiche salvate: {count}',
  },
  en: {
    sheetLead: 'Tune the system and watch the page change, live.',
    groupBase: 'Base',
    groupShape: 'Shape',
    groupMatter: 'Material and motion',
    previewTitle: 'Live preview',
    previewLive: 'Live',
    previewChrome: '01 / window',
    previewBrand: 'nicolò florean',
    previewTitleText: 'Landing pages, built by hand.',
    previewLine: 'A page that adapts to whoever is reading.',
    previewCta: 'Email me',
    autoSave: 'Changes save automatically',
    savedOne: '1 change saved',
    savedMany: 'Changes saved: {count}',
  },
}
