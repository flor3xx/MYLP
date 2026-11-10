import { contact } from "./copy/contact"
import { customizerCopy, settings } from "./copy/customizer"
import { hero } from "./copy/hero"
import { method } from "./copy/method"
import { aria, footer, meta, nav } from "./copy/nav"
import { services } from "./copy/services"
import type { Language, Translation } from "./copy/types"

export type { Language, Translation, TranslationKey } from "./copy/types"

export const translations: Record<Language, Translation> = {
  it: {
    nav: nav.it,
    hero: hero.it,
    services: services.it,
    customizer: customizerCopy.it,
    meta: meta.it,
    method: method.it,
    contact: contact.it,
    footer: footer.it,
    settings: settings.it,
    aria: aria.it,
  },
  en: {
    nav: nav.en,
    hero: hero.en,
    services: services.en,
    customizer: customizerCopy.en,
    meta: meta.en,
    method: method.en,
    contact: contact.en,
    footer: footer.en,
    settings: settings.en,
    aria: aria.en,
  },
}

export function t(language: Language): Translation {
  return translations[language]
}
