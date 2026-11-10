import type { Language, Translation } from "./types"

export const services: Record<Language, Translation["services"]> = {
  it: {
    eyebrow: "Cosa faccio",
    title: "Tre modi di aiutarti.",
    lead: "Dal sito vetrina alla web app, fino alla grafica 3D. Scegli quanto ti serve — o tutto insieme.",
    items: [
      {
        name: "Siti web",
        copy: "Landing page e siti vetrina veloci e curati, pensati per convertire. Contenuto chiaro, caricamento immediato.",
        tags: "Landing · Siti vetrina · SEO di base",
      },
      {
        name: "Web app",
        copy: "Interfacce e prodotti interattivi: dall'idea a uno strumento che funziona e che le persone usano volentieri.",
        tags: "Dashboard · Tool interni · Prototipi",
      },
      {
        name: "3D & motion",
        copy: "Grafica 3D e animazioni che rendono memorabile ciò che mostri, senza appesantire la pagina.",
        tags: "Scena 3D · Micro-interazioni · Scroll",
      },
    ],
  },
  en: {
    eyebrow: "What I do",
    title: "Three ways I can help.",
    lead: "From a showcase site to a web app, all the way to 3D graphics. Choose what you need — or everything together.",
    items: [
      {
        name: "Websites",
        copy: "Fast, polished landing pages and showcase sites built to convert. Clear content, instant loading.",
        tags: "Landing pages · Showcase sites · Basic SEO",
      },
      {
        name: "Web apps",
        copy: "Interfaces and interactive products: from an idea to a tool that works and that people enjoy using.",
        tags: "Dashboards · Internal tools · Prototypes",
      },
      {
        name: "3D & motion",
        copy: "3D graphics and animation that make what you show memorable, without weighing down the page.",
        tags: "3D scenes · Micro-interactions · Scroll",
      },
    ],
  },
}
