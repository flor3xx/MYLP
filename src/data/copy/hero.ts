import type { Language, Translation } from "./types"
import { chapters, navLinks } from "./nav"

export const hero: Record<Language, Translation["hero"]> = {
  it: {
    eyebrow: "Sviluppatore · Landing page",
    title: "Landing page che",
    titleEmphasis: "lavorano",
    lead: "Sono Nicolò Florean, sviluppatore. Costruisco siti, web app e interfacce curate. Questa pagina è la dimostrazione: cambia tema, tipografia e ritmo e guarda il sistema reagire.",
    photoAlt: "Ritratto di Nicolò Florean",
    contactCta: "Parliamo del tuo progetto",
    moreCta: "Scopri cosa faccio",
    chips: ["Siti web", "Web app", "3D & motion", "Performance"],
    chapters: chapters.it,
  },
  en: {
    eyebrow: "Developer · Landing pages",
    title: "Landing pages that",
    titleEmphasis: "work",
    lead: "I'm Nicolò Florean, a developer. I build websites, web apps and considered interfaces. This page is the demonstration: change theme, type and rhythm and watch the system respond.",
    photoAlt: "Portrait of Nicolò Florean",
    contactCta: "Let's talk about your project",
    moreCta: "See what I do",
    chips: ["Websites", "Web apps", "3D & motion", "Performance"],
    chapters: chapters.en,
  },
}

export const navCopy = navLinks
