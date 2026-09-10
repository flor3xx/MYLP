import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshWobbleMaterial } from '@react-three/drei'
import { gsap } from 'gsap'

/**
 * CentralGeometry: layer 3D persistente per tutta la pagina.
 *
 * Questi sono i 2 oggetti che nella versione precedente comparivano nella scena
 * Contatti, ora resi la scena centrale fissa di tutto il sito:
 *
 * - Ottaedro wireframe (il "prisma"): ruota SEMPRE, animazione temporale continua
 *   (useFrame + clock). Con il suo Float leggero sembra fluttuare.
 * - Toro deformato (l'"anello"): si muove SOLO in risposta allo scroll (progress).
 *   A riposo è quasi rigido; deformazione + rotazione crescono con lo scroll.
 *
 * Il componente resta montato per tutta la durata: useFrame è sempre attivo,
 * ma il costo è basso (2 mesh, luci fisse).
 */
function CentralObject({ progress, reduced }) {
  const ringRef = useRef()    // toro (anello) — scroll-driven
  const prismRef = useRef()   // ottaedro (prisma) — time-driven
  const groupRef = useRef()   // container per l'intro scale
  const intro = useRef({ v: 0 })

  // Fade-in + scaletta all'ingresso, insieme al nome (power2.out, sfalsato).
  // Con reduced-motion: nessun movimento, oggetti già in scala piena.
  useEffect(() => {
    if (reduced) {
      intro.current.v = 1
      return
    }
    const tween = gsap.to(intro.current, {
      v: 1,
      duration: 1.4,
      ease: 'power2.out',
      delay: 0.2,
    })
    return () => { tween.kill() }
  }, [reduced])

  useFrame((state) => {
    const t = state.clock.elapsedTime

    // Ottaedro: rotazione continua (temporale). Con reduced-motion: fermo.
    if (prismRef.current) {
      if (reduced) {
        prismRef.current.rotation.set(0.4, 0.8, 0)
      } else {
        prismRef.current.rotation.x = t * 0.3 + 0.4
        prismRef.current.rotation.y = t * 0.45 + 0.8
        prismRef.current.rotation.z = Math.sin(t * 0.2) * 0.1
      }
    }

    // Toro: si muove solo quando scorri (progress). Fermo a riposo.
    // Rotazione volutamente lenta (progress * ~1 rad) per un effetto dolce.
    if (ringRef.current && !reduced) {
      ringRef.current.rotation.x = progress * Math.PI * 1.2
      ringRef.current.rotation.y = progress * Math.PI * 0.8
    }

    // Intro: gruppo parte a 0.6 di scala e cresce fino a 1
    if (groupRef.current) {
      const s = 0.6 + intro.current.v * 0.4
      groupRef.current.scale.setScalar(s)
    }
  })

  return (
    <group ref={groupRef}>
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
        {/* Prisma / ottaedro wireframe — si muove sempre */}
        <mesh ref={prismRef}>
          <octahedronGeometry args={[0.95, 0]} />
          <meshStandardMaterial
            color="#c084fc"
            emissive="#a855f7"
            emissiveIntensity={0.35}
            roughness={0.1}
            metalness={0.9}
            wireframe
          />
        </mesh>
      </Float>

      {/* Anello / toro deformato — si muove solo con lo scroll */}
      <mesh ref={ringRef}>
        <torusGeometry args={[1.8, 0.55, 24, 72]} />
        <MeshWobbleMaterial
          color="#7c3aed"
          emissive="#a855f7"
          emissiveIntensity={0.25}
          roughness={0.3}
          metalness={0.7}
          factor={progress === 0 ? 0 : 0.08 + progress * 0.3} // rigido a riposo, deformazione dolce
          speed={reduced ? 0 : 1}
        />
      </mesh>
    </group>
  )
}

export default function CentralGeometry({ progress = 0, reduced = false }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.5], fov: 40 }}
      style={{ background: 'transparent' }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 5, 5]} intensity={0.7} />
      <pointLight position={[-3, 2, 3]} intensity={0.4} color="#a855f7" />
      <pointLight position={[3, -2, 3]} intensity={0.3} color="#7c3aed" />

      <CentralObject progress={progress} reduced={reduced} />
    </Canvas>
  )
}