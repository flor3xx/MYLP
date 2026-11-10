import type { Language, Translation } from "./types"

export const method: Record<Language, Translation["method"]> = {
  it: {
    eyebrow: "Metodo",
    title: "Come lavoro, in tre passi.",
    steps: [
      {
        title: "Capisco",
        copy: "Obiettivo, pubblico e cosa deve ottenere la pagina. Una call, poi ti dico cosa serve davvero.",
      },
      {
        title: "Progetto",
        copy: "Struttura e interfaccia definite in Penpot. Vedi il risultato prima che diventi codice.",
      },
      {
        title: "Costruisco e verifico",
        copy: "Sviluppo con attenzione a velocità e accessibilità, confronto il risultato col progetto e correggo.",
      },
    ],
  },
  en: {
    eyebrow: "Process",
    title: "How I work, in three steps.",
    steps: [
      {
        title: "Understand",
        copy: "Goal, audience, and what the page needs to achieve. One call, then I tell you what you really need.",
      },
      {
        title: "Design",
        copy: "Structure and interface defined in Penpot. You see the result before it becomes code.",
      },
      {
        title: "Build and verify",
        copy: "I develop with speed and accessibility in mind, compare the result with the design, and refine it.",
      },
    ],
  },
}

export type MethodUi = {
  region: string
  hint: string
  previous: string
  next: string
  progress: string
  stages: readonly string[]
}

export const methodUi: Record<Language, MethodUi> = {
  it: {
    region: "Metodo, tre passi",
    hint: "Trascina per esplorare",
    previous: "Passo precedente",
    next: "Passo successivo",
    progress: "Avanzamento del metodo",
    stages: ["brief", "direzione", "sviluppo"],
  },
  en: {
    region: "Process, three steps",
    hint: "Drag to explore",
    previous: "Previous step",
    next: "Next step",
    progress: "Process progress",
    stages: ["brief", "direction", "build"],
  },
}
