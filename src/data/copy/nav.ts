import type { Language, Translation } from "./types"

export const navLinks = {
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

export const chapters = {
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

export const nav: Record<Language, Translation["nav"]> = {
  it: {
    links: navLinks.it,
    ariaLabel: "Sezioni della pagina",
    availability: "Disponibile ora",
    contactCta: "Parliamone",
  },
  en: {
    links: navLinks.en,
    ariaLabel: "Page sections",
    availability: "Available now",
    contactCta: "Let's talk",
  },
}

export type NavUi = {
  open: string
  close: string
  menuNav: string
  role: string
}

export const navUi: Record<Language, NavUi> = {
  it: {
    open: "Apri il menu",
    close: "Chiudi il menu",
    menuNav: "Menu di navigazione",
    role: "sviluppatore",
  },
  en: {
    open: "Open menu",
    close: "Close menu",
    menuNav: "Site menu",
    role: "developer",
  },
}

export const meta: Record<Language, Translation["meta"]> = {
  it: {
    title: "Nicolò Florean — Sviluppatore · Landing page che lavorano",
    description:
      "Sviluppatore versatile: siti web, web app e grafica 3D. Costruisco landing page veloci e curate. Scrivimi per il tuo progetto.",
  },
  en: {
    title: "Nicolò Florean — Developer · Landing pages that work",
    description:
      "Versatile developer: websites, web apps, and 3D graphics. I build fast, polished landing pages. Get in touch for your project.",
  },
}

export const footer: Record<Language, Translation["footer"]> = {
  it: {
    copyright: "© {year} nicolò florean",
    credit: "Design in Penpot, codice in React.",
  },
  en: {
    copyright: "© {year} nicolò florean",
    credit: "Design in Penpot, code in React.",
  },
}

export const aria: Record<Language, Translation["aria"]> = {
  it: { skipToContent: "Vai al contenuto", heroChapters: "Capitoli" },
  en: { skipToContent: "Skip to content", heroChapters: "Chapters" },
}
