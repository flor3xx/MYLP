import { CONTACTS } from "../content"
import type { Language, Translation } from "./types"

export const contact: Record<Language, Translation["contact"]> = {
  it: {
    eyebrow: "Contatti",
    title: "Raccontami il tuo progetto.",
    lead: "Scrivimi cosa vuoi costruire e ne parliamo.",
    email: CONTACTS.email,
    instagramHandle: CONTACTS.instagramHandle,
    instagramUrl: CONTACTS.instagramUrl,
    githubLabel: CONTACTS.githubLabel,
    githubUrl: CONTACTS.githubUrl,
    emailCta: `Scrivimi · ${CONTACTS.email}`,
    instagramCta: `Instagram · ${CONTACTS.instagramHandle}`,
    githubCta: `GitHub · ${CONTACTS.githubLabel}`,
  },
  en: {
    eyebrow: "Contact",
    title: "Tell me about your project.",
    lead: "Tell me what you want to build and let's talk.",
    email: CONTACTS.email,
    instagramHandle: CONTACTS.instagramHandle,
    instagramUrl: CONTACTS.instagramUrl,
    githubLabel: CONTACTS.githubLabel,
    githubUrl: CONTACTS.githubUrl,
    emailCta: `Email me · ${CONTACTS.email}`,
    instagramCta: `Instagram · ${CONTACTS.instagramHandle}`,
    githubCta: `GitHub · ${CONTACTS.githubLabel}`,
  },
}

export type ContactUi = {
  emailLabel: string
  instagramLabel: string
  githubLabel: string
  linksLabel: string
  contactLabel: string
  themeLabel: string
  backToTop: string
  wordmarkLine: string
}

export const contactUi: Record<Language, ContactUi> = {
  it: {
    emailLabel: "Email",
    instagramLabel: "Instagram",
    githubLabel: "GitHub",
    linksLabel: "Sezioni",
    contactLabel: "Contatti",
    themeLabel: "Tema attivo",
    backToTop: "Torna su",
    wordmarkLine: "Siti, web app, 3D e motion.",
  },
  en: {
    emailLabel: "Email",
    instagramLabel: "Instagram",
    githubLabel: "GitHub",
    linksLabel: "Sections",
    contactLabel: "Contact",
    themeLabel: "Current theme",
    backToTop: "Back to top",
    wordmarkLine: "Websites, web apps, 3D and motion.",
  },
}
