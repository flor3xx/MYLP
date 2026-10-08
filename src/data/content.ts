export const CONTACTS = {
  email: "06flonico@gmail.com",
  instagramHandle: "@69flore._",
  instagramUrl: "https://instagram.com/69flore._",
  githubLabel: "github.com/flor3xx",
  githubUrl: "https://github.com/flor3xx",
} as const

export const MAILTO = `mailto:${CONTACTS.email}`

export type Service = {
  name: string
  copy: string
  tags: string
  icon: "web" | "app" | "three"
}

export const SERVICES: Service[] = [
  {
    name: "Siti web",
    copy: "Landing page e siti vetrina veloci, curati e ottimizzati per convertire. Contenuto chiaro, caricamento immediato.",
    tags: "Landing · Siti vetrina · SEO di base",
    icon: "web",
  },
  {
    name: "Web app",
    copy: "Interfacce e prodotti interattivi: porto un'idea a uno strumento che funziona e che le persone usano volentieri.",
    tags: "Dashboard · Tool interni · Prototipi",
    icon: "app",
  },
  {
    name: "3D & motion",
    copy: "Grafica 3D e animazioni che rendono memorabile quello che mostri, senza appesantire la pagina.",
    tags: "Scena 3D · Micro-interazioni · Scroll",
    icon: "three",
  },
]

