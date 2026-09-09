import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroScene from './HeroScene'
import AboutScene from './AboutScene'
import PortfolioScene from './PortfolioScene'
import ContactScene from './ContactScene'
import ScrollIndicator from '../components/ScrollIndicator'

gsap.registerPlugin(ScrollTrigger)

const SCENES = [
  { id: 'hero', component: HeroScene, weight: 1 },
  { id: 'about', component: AboutScene, weight: 1.8 },
  { id: 'portfolio', component: PortfolioScene, weight: 1 },
  { id: 'contact', component: ContactScene, weight: 1 },
]

function resolveScene(totalProgress) {
  let acc = 0
  for (let i = 0; i < SCENES.length; i++) {
    const start = acc
    const end = acc + SCENES[i].weight / 4.8 // 4.8 = somma pesi
    if (totalProgress < end || i === SCENES.length - 1) {
      const local = (totalProgress - start) / (end - start)
      return { scene: i, progress: Math.max(0, Math.min(1, local)) }
    }
    acc = end
  }
  return { scene: 0, progress: 0 }
}

/**
 * FilmScroll: il cuore dell'esperienza.
 * Viewport fisso, scroll pilota una timeline GSAP.
 * La scena "chi sono" ha più scroll space così tutte le skill hanno tempo di apparire.
 */
export default function FilmScroll() {
  const proxyRef = useRef(null)
  const [activeScene, setActiveScene] = useState(0)
  const [sceneProgress, setSceneProgress] = useState(0)

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'auto'

    const ctx = gsap.context(() => {
      const dummy = { progress: 0 }
      gsap.to(dummy, {
        progress: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: proxyRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          onUpdate: (self) => {
            const { scene, progress } = resolveScene(self.progress)
            setActiveScene(scene)
            setSceneProgress(progress)
          },
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* Fixed viewport — all scenes render here */}
      <div className="film-viewport">
        {SCENES.map((scene, i) => {
          const SceneComponent = scene.component
          const isActive = i === activeScene
          const isPrev = i < activeScene
          const isNext = i > activeScene

          return (
            <div
              key={scene.id}
              className="film-scene"
              style={{
                opacity: isActive ? 1 : 0,
                zIndex: isActive ? 1 : 0,
                pointerEvents: isActive ? 'auto' : 'none',
                transform: isPrev
                  ? `translateY(-${Math.min(sceneProgress, 1) * 100}%)`
                  : isNext
                    ? `translateY(${(1 - Math.min(sceneProgress, 1)) * 100}%)`
                    : 'none',
              }}
            >
              <SceneComponent
                progress={isActive ? sceneProgress : isPrev ? 1 : 0}
                isActive={isActive}
              />
            </div>
          )
        })}
      </div>

      {/* Scroll progress indicator */}
      <ScrollIndicator
        total={SCENES.length}
        active={activeScene}
        progress={sceneProgress}
      />

      {/* Scroll proxy — invisible, creates scrollable height */}
      <div ref={proxyRef} className="film-scroll-proxy" />
    </>
  )
}
