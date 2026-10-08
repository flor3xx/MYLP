import { CONTACTS } from "./content"

export type Language = "it" | "en"

type Translation = {
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
    items: readonly {
      name: string
      copy: string
      tags: string
    }[]
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
    steps: readonly {
      number: string
      title: string
      copy: string
    }[]
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
  }
  aria: {
    skipToContent: string
    heroChapters: string
  }
}

export type TranslationKey = keyof Translation

const sharedLinks = {
  it: [
    { label: "Cosa faccio", href: "#cosa-faccio" },
    { label: "Metodo", href: "#metodo" },
    { label: "Contatti", href: "#contatti" },
  ],
  en: [
    { label: "What I do", href: "#cosa-faccio" },
    { label: "Process", href: "#metodo" },
    { label: "Contact", href: "#contatti" },
  ],
} as const

const sharedChapters = {
  it: [
    { label: "Intro", href: "#top" },
    { label: "Cosa faccio", href: "#cosa-faccio" },
    { label: "Metodo", href: "#metodo" },
    { label: "Contatti", href: "#contatti" },
  ],
  en: [
    { label: "Intro", href: "#top" },
    { label: "What I do", href: "#cosa-faccio" },
    { label: "Process", href: "#metodo" },
    { label: "Contact", href: "#contatti" },
  ],
} as const

export const translations: Record<Language, Translation> = {
  it: {
    nav: {
      links: sharedLinks.it,
      ariaLabel: "Sezioni della pagina",
      availability: "Disponibile ora",
      contactCta: "Parliamone",
    },
    hero: {
      eyebrow: "Sviluppatore · Landing page",
      title: "Costruisco landing page che",
      titleEmphasis: "lavorano",
      lead: "Siti, web app e interfacce curate. Qui c’è il tuo profilo al centro: la pagina parla di te e di quello che costruiamo.",
      photoAlt: "Foto profilo di Nicolò Florean",
      contactCta: "Parliamone del tuo progetto",
      moreCta: "Scopri di più",
      chips: ["Siti web", "Web app", "3D & motion", "Performance"],
      chapters: sharedChapters.it,
    },
    services: {
      eyebrow: "Cosa faccio",
      title: "Tre modi in cui posso aiutarti.",
      lead: "Dal sito vetrina alla web app, fino alla grafica 3D. Scegli quanto ti serve — o tutto insieme.",
      items: [
        { name: "Siti web", copy: "Landing page e siti vetrina veloci, curati e ottimizzati per convertire. Contenuto chiaro, caricamento immediato.", tags: "Landing · Siti vetrina · SEO di base" },
        { name: "Web app", copy: "Interfacce e prodotti interattivi: porto un'idea a uno strumento che funziona e che le persone usano volentieri.", tags: "Dashboard · Tool interni · Prototipi" },
        { name: "3D & motion", copy: "Grafica 3D e animazioni che rendono memorabile quello che mostri, senza appesantire la pagina.", tags: "Scena 3D · Micro-interazioni · Scroll" },
      ],
    },
    customizer: { title: "Personalizza esperienza", closeAria: "Chiudi personalizzazione", reset: "Ripristina predefiniti", done: "Fatto" },
    meta: { title: "Nicolò Florean — Sviluppatore · Landing page che lavorano", description: "Sviluppatore versatile: siti web, web app e grafica 3D. Costruisco landing page veloci e curate. Scrivimi per il tuo progetto." },
    method: {
      eyebrow: "Metodo",
      title: "Come lavoro, in tre passi.",
      steps: [
        { number: "01", title: "Capisco", copy: "Obiettivo, pubblico e cosa deve ottenere la pagina. Una call, poi ti dico cosa serve davvero." },
        { number: "02", title: "Progetto", copy: "Struttura e interfaccia definite in Penpot. Vedi il risultato prima che diventi codice." },
        { number: "03", title: "Costruisco e verifico", copy: "Sviluppo con attenzione a velocità e accessibilità. Confronto il risultato col progetto e correggo." },
      ],
    },
    contact: {
      eyebrow: "Contatti",
      title: "Raccontami il tuo progetto.",
      lead: "Rispondo entro 24 ore. Scrivimi cosa vuoi costruire e ne parliamo.",
      email: CONTACTS.email,
      instagramHandle: CONTACTS.instagramHandle,
      instagramUrl: CONTACTS.instagramUrl,
      githubLabel: CONTACTS.githubLabel,
      githubUrl: CONTACTS.githubUrl,
      emailCta: `Scrivimi · ${CONTACTS.email}`,
      instagramCta: `Instagram · ${CONTACTS.instagramHandle}`,
      githubCta: `GitHub · ${CONTACTS.githubLabel}`,
    },
    footer: { copyright: "© {year} nicolò florean", credit: "Fatto con React, Penpot e molta attenzione." },
    settings: { language: "Lingua", theme: "Tema", light: "Chiaro", dark: "Scuro", motion: "Animazioni", on: "On", off: "Off", density: "Densità", comfortable: "Comoda", compact: "Densa", radius: "Angoli", soft: "Morbidi", rounded: "Arrotondati", sharp: "Netti", color: "Colore", pink: "Rosa", blue: "Blu", lime: "Lime", orange: "Arancio" },
    aria: { skipToContent: "Vai al contenuto", heroChapters: "Capitoli" },
  },
  en: {
    nav: { links: sharedLinks.en, ariaLabel: "Page sections", availability: "Available now", contactCta: "Let's talk" },
    hero: { eyebrow: "Developer · Landing pages", title: "I build landing pages that", titleEmphasis: "work", lead: "Websites, web apps, and polished interfaces. Your profile photo takes center stage — the page is about you and what we build.", photoAlt: "Profile photo of Nicolò Florean", contactCta: "Let's talk about your project", moreCta: "Learn more", chips: ["Websites", "Web apps", "3D & motion", "Performance"], chapters: sharedChapters.en },
    services: { eyebrow: "What I do", title: "Three ways I can help.", lead: "From a showcase site to a web app, all the way to 3D graphics. Choose what you need — or everything together.", items: [{ name: "Websites", copy: "Fast, polished landing pages and showcase sites optimized to convert. Clear content, instant loading.", tags: "Landing pages · Showcase sites · Basic SEO" }, { name: "Web apps", copy: "Interfaces and interactive products: I turn an idea into a tool that works and people enjoy using.", tags: "Dashboards · Internal tools · Prototypes" }, { name: "3D & motion", copy: "3D graphics and animation that make what you show memorable, without weighing down the page.", tags: "3D scenes · Micro-interactions · Scroll" }] },
    customizer: { title: "Customize experience", closeAria: "Close customization", reset: "Reset defaults", done: "Done" },
    meta: { title: "Nicolò Florean — Developer · Landing pages that work", description: "Versatile developer: websites, web apps, and 3D graphics. I build fast, polished landing pages. Get in touch for your project." },
    method: { eyebrow: "Process", title: "How I work, in three steps.", steps: [{ number: "01", title: "Understand", copy: "Goal, audience, and what the page needs to achieve. One call, then I tell you what you really need." }, { number: "02", title: "Design", copy: "Structure and interface defined in Penpot. You see the result before it becomes code." }, { number: "03", title: "Build and verify", copy: "I develop with speed and accessibility in mind. I compare the result with the design and refine it." }] },
    contact: { eyebrow: "Contact", title: "Tell me about your project.", lead: "I reply within 24 hours. Tell me what you want to build and let's talk.", email: CONTACTS.email, instagramHandle: CONTACTS.instagramHandle, instagramUrl: CONTACTS.instagramUrl, githubLabel: CONTACTS.githubLabel, githubUrl: CONTACTS.githubUrl, emailCta: `Email me · ${CONTACTS.email}`, instagramCta: `Instagram · ${CONTACTS.instagramHandle}`, githubCta: `GitHub · ${CONTACTS.githubLabel}` },
    footer: { copyright: "© {year} nicolò florean", credit: "Made with React, Penpot, and great attention to detail." },
    settings: { language: "Language", theme: "Theme", light: "Light", dark: "Dark", motion: "Motion", on: "On", off: "Off", density: "Density", comfortable: "Comfortable", compact: "Compact", radius: "Corners", soft: "Soft", rounded: "Rounded", sharp: "Sharp", color: "Color", pink: "Pink", blue: "Blue", lime: "Lime", orange: "Orange" },
    aria: { skipToContent: "Skip to content", heroChapters: "Chapters" },
  },
}

export function t(language: Language): Translation {
  return translations[language]
}
