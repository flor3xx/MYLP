import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

/**
 * Scena 3D per l'hero: geometria distorta che ruota e si deforma.
 * Wireframe + mesh distortMaterial per effetto organico.
 */
function HeroObject({ progress, isActive }) {
  const meshRef = useRef()
  const wireRef = useRef()

  useFrame((state) => {
    if (!meshRef.current || !isActive) return
    const t = state.clock.elapsedTime

    // Rotation driven by scroll + time
    meshRef.current.rotation.x = t * 0.15 + progress * Math.PI * 0.5
    meshRef.current.rotation.y = t * 0.2 + progress * Math.PI * 0.3

    // Scale based on scroll progress
    const scale = 1 + progress * 0.5
    meshRef.current.scale.setScalar(scale)

    // Wireframe follows
    if (wireRef.current) {
      wireRef.current.rotation.x = meshRef.current.rotation.x
      wireRef.current.rotation.y = meshRef.current.rotation.y
      wireRef.current.scale.setScalar(scale * 1.05)
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      {/* Solid mesh with distort */}
      <mesh ref={meshRef}>
        <dodecahedronGeometry args={[1.2, 1]} />
        <MeshDistortMaterial
          color="#a855f7"
          emissive="#7c3aed"
          emissiveIntensity={0.3}
          roughness={0.2}
          metalness={0.8}
          distort={0.3 + progress * 0.4}
          speed={2}
          wireframe={false}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh ref={wireRef}>
        <dodecahedronGeometry args={[1.25, 1]} />
        <meshBasicMaterial
          color="#c084fc"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>
    </Float>
  )
}

export default function HeroGeometry({ scale = 1, progress = 0, isActive = true }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ background: 'transparent' }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.5]}
    >
      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
      <pointLight position={[-3, -3, 2]} intensity={0.5} color="#a855f7" />
      <pointLight position={[3, 3, 2]} intensity={0.3} color="#7c3aed" />

      <HeroObject progress={progress} isActive={isActive} />
    </Canvas>
  )
}
