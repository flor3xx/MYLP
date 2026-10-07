import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber"
import { memo, Suspense, useEffect, useMemo, useRef } from "react"
import * as THREE from "three"
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"

type NumRef = { current: number }

type EngineProps = {
  progress: NumRef
  reduced: boolean
  clip: string
}

const MODEL_URL = `${import.meta.env.BASE_URL}mech.glb`
const TARGET_SIZE = 3.3
const FADE = 0.35

function Environment() {
  const { gl, scene } = useThree()
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl)
    const room = new RoomEnvironment()
    const env = pmrem.fromScene(room, 0.04)
    /* oxlint-disable react/immutability */
    scene.environment = env.texture
    scene.environmentIntensity = 0.6
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

function Mech({
  progress,
  reduced,
  clip,
}: {
  progress: NumRef
  reduced: boolean
  clip: string
}) {
  const gltf = useLoader(GLTFLoader, MODEL_URL)
  const group = useRef<THREE.Group>(null)
  const { size } = useThree()

  const model = useMemo(() => {
    const box = new THREE.Box3().setFromObject(gltf.scene)
    const dims = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3()).negate()
    const maxDim = Math.max(dims.x, dims.y, dims.z) || 1
    return { scene: gltf.scene, center, factor: TARGET_SIZE / maxDim }
  }, [gltf.scene])

  // The chosen clip always plays on real time, independently of the timeline:
  // pausing the scrubber must not freeze the robot.
  const mixer = useMemo(
    () => (gltf.animations.length ? new THREE.AnimationMixer(gltf.scene) : null),
    [gltf],
  )
  const currentAction = useRef<THREE.AnimationAction | null>(null)

  useEffect(() => {
    if (!mixer) return
    const key = clip.toLowerCase()
    const target =
      gltf.animations.find((c) => c.name.toLowerCase().includes(key)) ??
      gltf.animations[0]
    if (!target) return
    const next = mixer.clipAction(target)
    if (currentAction.current === next) return
    next.reset().setEffectiveTimeScale(1).setEffectiveWeight(1).fadeIn(FADE).play()
    currentAction.current?.fadeOut(FADE)
    currentAction.current = next
  }, [mixer, gltf, clip])

  useFrame((state, delta) => {
    const p = progress.current ?? 0
    const time = state.clock.elapsedTime
    const aspect = size.width / Math.max(size.height, 1)
    // Wide screens: large, shifted right. Narrow screens: smaller, lower-right,
    // so it stops overlapping the overlay text.
    const k = THREE.MathUtils.clamp((aspect - 1) / 0.5, 0, 1)
    const targetX = THREE.MathUtils.lerp(0.95, 2.1, k)
    const targetY = THREE.MathUtils.lerp(-1.15, 0.1, k)
    const targetScale = THREE.MathUtils.lerp(0.78, 0.94, k)

    if (mixer) mixer.update(Math.min(delta, 0.05))

    if (group.current) {
      group.current.position.x = THREE.MathUtils.lerp(
        group.current.position.x,
        targetX,
        0.08,
      )
      group.current.position.y = THREE.MathUtils.lerp(
        group.current.position.y,
        targetY,
        0.08,
      )
      group.current.scale.setScalar(
        THREE.MathUtils.lerp(group.current.scale.x, targetScale, 0.08),
      )
      group.current.rotation.y =
        -0.7 + p * Math.PI * 2 + (reduced ? 0 : time * 0.12)
    }
  })

  return (
    <group ref={group} position={[0.95, -1.15, 0]} scale={0.78}>
      <group
        scale={model.factor}
        position={[
          model.center.x * model.factor,
          model.center.y * model.factor,
          model.center.z * model.factor,
        ]}
      >
        <primitive object={model.scene} />
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
      <pointsMaterial size={0.035} color="#e6b4d0" transparent opacity={0.55} />
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

function Engine({ progress, reduced, clip }: EngineProps) {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0.5, 7.4], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={reduced ? "demand" : "always"}
    >
      <ambientLight intensity={0.5} color="#6a455a" />
      <directionalLight position={[6, 7, 6]} intensity={2.6} color="#ffe6f0" />
      <directionalLight position={[-5, 2, -7]} intensity={1.4} color="#b14dff" />
      <pointLight position={[-6, -2, -4]} intensity={45} color="#ff4d8d" />
      <pointLight position={[5, -3, 5]} intensity={25} color="#ffa3d1" />
      <Environment />
      <Suspense fallback={null}>
        <Mech progress={progress} reduced={reduced} clip={clip} />
      </Suspense>
      <Dust />
      {reduced && <StaticFrame />}
    </Canvas>
  )
}

export default memo(Engine)
