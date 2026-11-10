export type Language = "it" | "en"

export type Translation = {
  nav: {
    links: readonly { label: string; href: string }[]
    ariaLabel: string
    availability: string
    contactCta: string
  }
  hero: {
    eyebrow: string
    title: string
    titleEmphasis: string
    lead: string
    photoAlt: string
    contactCta: string
    moreCta: string
    chips: readonly string[]
    chapters: readonly { label: string; href: string }[]
  }
  services: {
    eyebrow: string
    title: string
    lead: string
    items: readonly { name: string; copy: string; tags: string }[]
  }
  customizer: {
    title: string
    closeAria: string
    reset: string
    done: string
  }
  meta: {
    title: string
    description: string
  }
  method: {
    eyebrow: string
    title: string
    steps: readonly { title: string; copy: string }[]
  }
  contact: {
    eyebrow: string
    title: string
    lead: string
    email: string
    instagramHandle: string
    instagramUrl: string
    githubLabel: string
    githubUrl: string
    emailCta: string
    instagramCta: string
    githubCta: string
  }
  footer: {
    copyright: string
    credit: string
  }
  settings: {
    language: string
    theme: string
    light: string
    dark: string
    motion: string
    on: string
    off: string
    density: string
    comfortable: string
    compact: string
    radius: string
    soft: string
    rounded: string
    sharp: string
    color: string
    pink: string
    blue: string
    lime: string
    orange: string
    font: string
    grotesk: string
    editorial: string
    geometric: string
    layout: string
    sheet: string
    split: string
    centered: string
    surface: string
    flat: string
    grain: string
    scanlines: string
    imageTreatment: string
    natural: string
    monochrome: string
    highContrast: string
    intensity: string
    subtle: string
    standard: string
    vivid: string
    calm: string
    expressive: string
    dense: string
  }
  aria: {
    skipToContent: string
    heroChapters: string
  }
}

export type TranslationKey = keyof Translation
