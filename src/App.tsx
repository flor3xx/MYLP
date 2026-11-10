import Nav from './sections/Nav'
import Hero from './sections/Hero'
import Range from './sections/Range'
import Metodo from './sections/Metodo'
import Contatti from './sections/Contatti'
import { useCallback, useEffect, useRef, useState } from 'react'
import { PreferencesProvider } from './app/PreferencesProvider'
import { usePreferences } from './app/usePreferences'
import CustomizerPill from './components/CustomizerPill'
import CustomizerSheet from './components/CustomizerSheet'
import { t } from './data/translations'

const SHEET_ID = 'customizer-sheet'

function AppContent() {
  const { preferences } = usePreferences()
  const copy = t(preferences.language)
  const [customizerOpen, setCustomizerOpen] = useState(false)
  const pillRef = useRef<HTMLButtonElement>(null)

  const closeCustomizer = useCallback(() => setCustomizerOpen(false), [])
  const toggleCustomizer = useCallback(() => setCustomizerOpen((open) => !open), [])

  useEffect(() => {
    document.documentElement.lang = preferences.language
    document.title = copy.meta.title
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', copy.meta.description)
    }
  }, [preferences.language, copy.meta.title, copy.meta.description])

  // Any in-page link pointing at the panel opens it, so the hero invitation
  // keeps working no matter where the panel is mounted.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return
      if (!target.closest(`a[href="#${SHEET_ID}"]`)) return
      event.preventDefault()
      setCustomizerOpen(true)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return (
    <div
      className="app-shell"
      data-theme={preferences.theme}
      data-motion={preferences.motion}
      data-density={preferences.density}
      data-radius={preferences.radius}
      data-color-scheme={preferences.colorScheme}
      data-font={preferences.font}
      data-layout={preferences.layout}
      data-surface={preferences.surface}
      data-image-treatment={preferences.imageTreatment}
      data-accent-intensity={preferences.accentIntensity}
      data-type-scale={preferences.typeScale}
      data-heading-tracking={preferences.headingTracking}
      data-surface-style={preferences.surfaceStyle}
      data-accent-usage={preferences.accentUsage}
    >
      <a className="skip-link" href="#contenuto">
        {preferences.language === 'it' ? 'Vai al contenuto' : 'Skip to content'}
      </a>
      <Nav />
      <main id="contenuto">
        <Hero />
        <Range />
        <Metodo />
        <Contatti />
      </main>
      <CustomizerPill
        ref={pillRef}
        open={customizerOpen}
        onToggle={toggleCustomizer}
        controlsId={SHEET_ID}
        label={preferences.language === 'it' ? 'Personalizza' : 'Customize'}
      />
      <CustomizerSheet
        id={SHEET_ID}
        open={customizerOpen}
        onClose={closeCustomizer}
        returnFocusRef={pillRef}
      />
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
