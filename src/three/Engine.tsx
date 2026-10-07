import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { memo, useEffect, useMemo, useRef } from "react"
import * as THREE from "three"
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js"

type NumRef = { current: number }

type EngineProps = {
  progress: NumRef
  reduced: boolean
}

function Environment() {
  const { gl, scene } = useThree()
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl)
    const room = new RoomEnvironment()
    const env = pmrem.fromScene(room, 0.04)
    /* oxlint-disable react/immutability */
    scene.environment = env.texture
    scene.environmentIntensity = 0.55
    /* oxlint-enable react/immutability */
    return () => {
      env.dispose()
      pmrem.dispose()
      room.dispose()
      /* oxlint-disable-next-line react/immutability */
      scene.environment = null
    }
  }, [gl, scene])
  return null
}

function Rig({ progress, reduced }: { progress: NumRef; reduced: boolean }) {
  const group = useRef<THREE.Group>(null)
  const rings = useRef<THREE.Group>(null)
  const satellites = useRef<THREE.Group>(null)
  const core = useRef<THREE.Mesh>(null)
  const { size } = useThree()

  useFrame((state, delta) => {
    const p = progress.current ?? 0
    const t = state.clock.elapsedTime
    const aspect = size.width / Math.max(size.height, 1)
    const targetX = THREE.MathUtils.clamp((aspect - 1.15) * 3.6, 0, 2.0)

    if (group.current) {
      group.current.position.x = THREE.MathUtils.lerp(
        group.current.position.x,
        targetX,
        0.08,
      )
      group.current.rotation.y = -0.5 + p * Math.PI * 2 + (reduced ? 0 : t * 0.06)
      group.current.rotation.x = 0.2 + p * 0.55
    }
    if (rings.current) {
      rings.current.rotation.z = p * Math.PI * 2
    }
    if (satellites.current) {
      satellites.current.rotation.y = -p * Math.PI * 4
      satellites.current.rotation.x = p * 0.9
    }
    if (core.current && !reduced) {
      const s = 0.92 + Math.sin(t * 1.3) * 0.035
      core.current.scale.setScalar(s)
      core.current.rotation.y += delta * 0.4
    }
  })

  const satellitePositions = useMemo(
    () =>
      new Array(5).fill(0).map((_, i) => {
        const a = (i / 5) * Math.PI * 2
        return [Math.cos(a) * 3.15, Math.sin(a) * 0.5, Math.sin(a) * 3.15] as const
      }),
    [],
  )

  return (
    <group ref={group} position={[0, 0.05, 0]} scale={0.94}>
      <mesh ref={core}>
        <icosahedronGeometry args={[0.95, 2]} />
        <meshStandardMaterial
          color="#c9773f"
          emissive="#ff5c2e"
          emissiveIntensity={1}
          metalness={0.4}
          roughness={0.28}
        />
      </mesh>

      <group ref={rings}>
        <mesh rotation={[Math.PI / 2.1, 0, 0]}>
          <torusGeometry args={[2.35, 0.14, 24, 160]} />
          <meshStandardMaterial
            color="#6b5a46"
            emissive="#2a1d12"
            emissiveIntensity={0.5}
            metalness={0.95}
            roughness={0.3}
          />
        </mesh>
        <mesh rotation={[Math.PI / 1.6, 0.5, 0]}>
          <torusGeometry args={[1.85, 0.1, 20, 140]} />
          <meshStandardMaterial
            color="#8a7159"
            metalness={0.9}
            roughness={0.26}
          />
        </mesh>
        <mesh rotation={[Math.PI / 2.4, -0.6, 0]}>
          <torusGeometry args={[2.9, 0.055, 16, 160]} />
          <meshStandardMaterial
            color="#ff6a3d"
            emissive="#ff6a3d"
            emissiveIntensity={0.9}
            metalness={0.3}
            roughness={0.4}
          />
        </mesh>
      </group>

      <group ref={satellites}>
        {satellitePositions.map((pos, i) => (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[i % 2 === 0 ? 0.12 : 0.08, 18, 18]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#ffb27a" : "#9db6ff"}
              emissive={i % 2 === 0 ? "#ff6a3d" : "#3b5bff"}
              emissiveIntensity={1}
              metalness={0.2}
              roughness={0.35}
            />
          </mesh>
        ))}
      </group>
    </group>
  )
}

function seededRandom(seed: number) {
  let state = seed
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296
    return state / 4294967296
  }
}

function Dust() {
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry()
    const count = 140
    const positions = new Float32Array(count * 3)
    const rand = seededRandom(7)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (rand() - 0.5) * 14
      positions[i * 3 + 1] = (rand() - 0.5) * 9
      positions[i * 3 + 2] = (rand() - 0.5) * 8
    }
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    return g
  }, [])

  const ref = useRef<THREE.Points>(null)
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.02
  })

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial size={0.035} color="#d8b48c" transparent opacity={0.6} />
    </points>
  )
}

function StaticFrame() {
  const { invalidate } = useThree()
  useEffect(() => {
    invalidate()
  }, [invalidate])
  return null
}

function Engine({ progress, reduced }: EngineProps) {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0.4, 7.4], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={reduced ? "demand" : "always"}
    >
      <ambientLight intensity={0.5} color="#4a4658" />
      <directionalLight position={[6, 7, 6]} intensity={2.4} color="#ffd7b0" />
      <pointLight position={[-6, -2, -4]} intensity={60} color="#ff6a3d" />
      <Environment />
      <Rig progress={progress} reduced={reduced} />
      <Dust />
      {reduced && <StaticFrame />}
    </Canvas>
  )
}

export default memo(Engine)
