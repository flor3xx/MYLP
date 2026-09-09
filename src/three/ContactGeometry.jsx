import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshWobbleMaterial } from '@react-three/drei'

/**
 * Geometria 3D per la scena contatti: toro deformabile che ruota lentamente.
 */
function ContactObject({ progress }) {
  const meshRef = useRef()
  const innerRef = useRef()

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime

    // Slow rotation driven by time + scroll
    meshRef.current.rotation.x = t * 0.08 + progress * Math.PI
    meshRef.current.rotation.y = t * 0.12

    // Inner object counter-rotation
    if (innerRef.current) {
      innerRef.current.rotation.x = -t * 0.1
      innerRef.current.rotation.z = t * 0.06 + progress * Math.PI * 0.5
    }
  })

  return (
    <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.3}>
      {/* Outer torus */}
      <mesh ref={meshRef}>
        <torusGeometry args={[1.5, 0.4, 16, 48]} />
        <MeshWobbleMaterial
          color="#7c3aed"
          emissive="#a855f7"
          emissiveIntensity={0.2}
          roughness={0.3}
          metalness={0.7}
          factor={0.3}
          speed={1}
        />
      </mesh>

      {/* Inner octahedron */}
      <mesh ref={innerRef}>
        <octahedronGeometry args={[0.6, 0]} />
        <meshStandardMaterial
          color="#c084fc"
          emissive="#a855f7"
          emissiveIntensity={0.4}
          roughness={0.1}
          metalness={0.9}
          wireframe
        />
      </mesh>
    </Float>
  )
}

export default function ContactGeometry({ progress = 0 }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 40 }}
      style={{ background: 'transparent' }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} />
      <pointLight position={[-3, 2, 3]} intensity={0.4} color="#a855f7" />
      <pointLight position={[3, -2, 3]} intensity={0.3} color="#7c3aed" />

      <ContactObject progress={progress} />
    </Canvas>
  )
}
