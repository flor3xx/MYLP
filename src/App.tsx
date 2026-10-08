import Nav from "./sections/Nav"
import Hero from "./sections/Hero"
import Range from "./sections/Range"
import Metodo from "./sections/Metodo"
import Contatti from "./sections/Contatti"
import { useEffect, useState } from "react"
import { PreferencesProvider } from "./app/PreferencesProvider"
import { usePreferences } from "./app/usePreferences"
import CustomizerPill from "./components/CustomizerPill"
import CustomizerSheet from "./components/CustomizerSheet"
import { t } from "./data/translations"

function AppContent() {
  const { preferences } = usePreferences()
  const copy = t(preferences.language)
  const [customizerOpen, setCustomizerOpen] = useState(false)

  useEffect(() => {
    document.documentElement.lang = preferences.language
    document.title = copy.meta.title
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute("content", copy.meta.description)
    }
  }, [preferences.language, copy.meta.title, copy.meta.description])

  return (
    <div
      className="app-shell"
      data-theme={preferences.theme}
      data-motion={preferences.motion}
      data-density={preferences.density}
      data-radius={preferences.radius}
      data-color-scheme={preferences.colorScheme}
    >
      <a className="skip-link" href="#contenuto">
        {preferences.language === "it" ? "Vai al contenuto" : "Skip to content"}
      </a>
      <Nav />
      <main id="contenuto">
        <Hero />
        <Range />
        <Metodo />
        <Contatti />
      </main>
      <CustomizerPill
        open={customizerOpen}
        onToggle={() => setCustomizerOpen((open) => !open)}
        label={preferences.language === "it" ? "Personalizza" : "Customize"}
      />
      <CustomizerSheet open={customizerOpen} onClose={() => setCustomizerOpen(false)} />
    </div>
  )
}

export default function App() {
  return (
    <PreferencesProvider>
      <AppContent />
    </PreferencesProvider>
  )
}
