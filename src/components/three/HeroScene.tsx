import React, { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import * as THREE from "three";

/**
 * REAL-TIME ANIMATED 3D HERO (violet → cyan on near-black):
 * - Centrepiece: a liquid MORPHING sphere — its vertices are displaced by a
 *   noise shader every frame (MeshDistortMaterial), wrapped in a
 *   counter-rotating cyan wireframe shell, orbited by a second smaller
 *   morphing orb and two tilted glowing rings.
 * - A PARTICLE WAVE (1,400+ points) ripples continuously beneath the scene.
 * - A cluster of floating geometry tumbles at staggered depths, and three
 *   layers of sparkles drift through the frame.
 * - The whole scene NEVER sits still: the group slowly rotates on its own,
 *   the camera idles in a gentle orbit, eases toward the pointer, and pulls
 *   back / rises as the user scrolls the hero away (scrollRef 0 → 1).
 * Rendering pauses when the hero is off-screen or the tab is hidden
 * (frameloop is parent-controlled) and DPR is capped at 1.5 for phones.
 */

type PointerRef = React.MutableRefObject<{ x: number; y: number }>;
type ScrollRef = React.MutableRefObject<number>;

/** Continuously rippling particle wave floor. */
function ParticleWave() {
  const ref = useRef<THREE.Points>(null);
  const { geometry, base } = useMemo(() => {
    const cols = 72;
    const rows = 20;
    const count = cols * rows;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const baseArr = new Float32Array(count * 2);
    const violet = new THREE.Color("#8b5cf6");
    const cyan = new THREE.Color("#22d3ee");
    const tmp = new THREE.Color();
    let i = 0;
    for (let x = 0; x < cols; x++) {
      for (let z = 0; z < rows; z++) {
        const px = (x / (cols - 1) - 0.5) * 17;
        const pz = (z / (rows - 1) - 0.5) * 7 - 1.2;
        positions[i * 3] = px;
        positions[i * 3 + 1] = -2.6;
        positions[i * 3 + 2] = pz;
        baseArr[i * 2] = px;
        baseArr[i * 2 + 1] = pz;
        tmp.copy(violet).lerp(cyan, x / (cols - 1));
        colors[i * 3] = tmp.r;
        colors[i * 3 + 1] = tmp.g;
        colors[i * 3 + 2] = tmp.b;
        i++;
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return { geometry: geo, base: baseArr };
  }, []);

  useFrame((state) => {
    const pts = ref.current;
    if (!pts) return;
    const t = state.clock.elapsedTime;
    const pos = pts.geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    for (let i = 0; i < pos.count; i++) {
      const bx = base[i * 2];
      const bz = base[i * 2 + 1];
      arr[i * 3 + 1] =
        -2.6 +
        Math.sin(bx * 0.55 + t * 1.5) * 0.32 +
        Math.cos(bz * 0.9 + t * 1.1) * 0.22;
    }
    pos.needsUpdate = true;
    pts.rotation.y = Math.sin(t * 0.05) * 0.04;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.75}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

function SceneContent({
  pointerRef,
  scrollRef,
}: {
  pointerRef: PointerRef;
  scrollRef: ScrollRef;
}) {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const shell = useRef<THREE.Mesh>(null);
  const orbiter = useRef<THREE.Mesh>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const knot = useRef<THREE.Mesh>(null);

  const shapes = useMemo(
    () =>
      [
        { pos: [-3.6, 1.8, -1.6] as const, scale: 0.42, kind: "ico", wire: true, cyan: true },
        { pos: [-2.6, -2.1, -0.5] as const, scale: 0.3, kind: "octa", wire: false, cyan: false },
        { pos: [4.1, -2.3, -1.3] as const, scale: 0.36, kind: "ico", wire: false, cyan: true },
        { pos: [0.4, 2.8, -2.4] as const, scale: 0.26, kind: "octa", wire: true, cyan: false },
        { pos: [-4.4, -0.7, -2.7] as const, scale: 0.33, kind: "dode", wire: false, cyan: false },
        { pos: [4.5, 2.0, -2.9] as const, scale: 0.3, kind: "ring", wire: false, cyan: true },
      ] as const,
    []
  );

  useFrame((state, delta) => {
    const p = pointerRef.current;
    const s = scrollRef.current;
    const t = state.clock.elapsedTime;

    // Camera: idle orbit drift + pointer easing + scroll pull-back/rise.
    const cam = state.camera;
    const idleX = Math.sin(t * 0.12) * 0.35;
    const idleY = Math.cos(t * 0.09) * 0.22;
    cam.position.x = THREE.MathUtils.damp(cam.position.x, p.x * 1.0 + idleX, 2.2, delta);
    cam.position.y = THREE.MathUtils.damp(cam.position.y, -p.y * 0.65 + idleY + s * 1.5, 2.2, delta);
    cam.position.z = THREE.MathUtils.damp(cam.position.z, 8 + s * 2.6, 2.2, delta);
    cam.lookAt(0, 0, 0);

    const g = group.current;
    if (g) {
      // Continuous self-rotation — the scene moves even with no input.
      g.rotation.y += delta * 0.05;
      g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -p.y * 0.16 - s * 0.25, 2.2, delta);
      g.position.y = THREE.MathUtils.damp(g.position.y, -p.y * 0.2 - s * 0.6, 2.2, delta);
    }
    if (core.current) {
      core.current.rotation.y += delta * 0.12;
      const pulse = 1 + Math.sin(t * 1.4) * 0.03;
      core.current.scale.setScalar(1.5 * pulse);
    }
    if (shell.current) {
      shell.current.rotation.y -= delta * 0.16;
      shell.current.rotation.x += delta * 0.07;
    }
    if (orbiter.current) {
      // Small morphing moon circling the core.
      const a = t * 0.45;
      orbiter.current.position.set(Math.cos(a) * 2.9, Math.sin(a * 1.3) * 0.7, Math.sin(a) * 0.9);
      orbiter.current.rotation.y += delta * 0.4;
    }
    if (ringA.current) ringA.current.rotation.z += delta * 0.3;
    if (ringB.current) ringB.current.rotation.z -= delta * 0.22;
    if (knot.current) {
      knot.current.rotation.x += delta * 0.22;
      knot.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={group}>
      <ambientLight intensity={0.45} />
      <directionalLight position={[5, 6, 6]} intensity={1.1} color="#ede9fe" />
      <spotLight position={[-7, 8, 5]} angle={0.5} penumbra={1} intensity={60} color="#a78bfa" />
      <pointLight position={[-6, -2, 4]} intensity={30} color="#8b5cf6" />
      <pointLight position={[6, 3, -2]} intensity={18} color="#22d3ee" />

      {/* === Centrepiece: morphing sphere + wireframe shell + orbit rings === */}
      <group position={[2.55, 0.2, -0.6]}>
        <Float speed={1.6} rotationIntensity={0.3} floatIntensity={0.8}>
          <mesh ref={core}>
            <sphereGeometry args={[1, 64, 64]} />
            <MeshDistortMaterial
              color="#5b21b6"
              emissive="#2e1065"
              roughness={0.16}
              metalness={0.35}
              distort={0.52}
              speed={2.6}
            />
          </mesh>
          {/* Cyan wireframe shell counter-rotating around the core */}
          <mesh ref={shell} scale={1.82}>
            <icosahedronGeometry args={[1, 1]} />
            <meshStandardMaterial
              color="#22d3ee"
              emissive="#083344"
              wireframe
              roughness={0.3}
              metalness={0.6}
            />
          </mesh>
        </Float>

        {/* Orbiting morphing moon */}
        <mesh ref={orbiter} scale={0.34}>
          <sphereGeometry args={[1, 32, 32]} />
          <MeshDistortMaterial
            color="#0e7490"
            emissive="#164e63"
            roughness={0.2}
            metalness={0.4}
            distort={0.45}
            speed={3.2}
          />
        </mesh>

        {/* Glowing orbit rings spinning on their own axes */}
        <mesh ref={ringA} rotation={[Math.PI / 2.4, 0.3, 0]}>
          <torusGeometry args={[2.5, 0.028, 12, 90]} />
          <meshStandardMaterial color="#8b5cf6" emissive="#2e1065" roughness={0.25} metalness={0.9} />
        </mesh>
        <mesh ref={ringB} rotation={[Math.PI / 1.9, -0.5, 0.4]} scale={1.18}>
          <torusGeometry args={[2.5, 0.018, 12, 90]} />
          <meshStandardMaterial color="#22d3ee" emissive="#083344" roughness={0.3} metalness={0.85} />
        </mesh>
      </group>

      {/* Torus knot — left accent, tumbling */}
      <Float speed={1.8} rotationIntensity={0.6} floatIntensity={1.0}>
        <mesh ref={knot} position={[-3.1, -0.4, -1]} scale={0.55}>
          <torusKnotGeometry args={[1, 0.32, 160, 24]} />
          <meshStandardMaterial
            color="#7c3aed"
            emissive="#1e1b4b"
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>
      </Float>

      {/* Floating geometry cluster at staggered depths */}
      {shapes.map((s, i) => (
        <Float key={i} speed={1.6 + i * 0.3} rotationIntensity={1.3} floatIntensity={1.6}>
          <mesh position={[s.pos[0], s.pos[1], s.pos[2]]} scale={s.scale}>
            {s.kind === "ico" ? (
              <icosahedronGeometry args={[1, 0]} />
            ) : s.kind === "octa" ? (
              <octahedronGeometry args={[1, 0]} />
            ) : s.kind === "dode" ? (
              <dodecahedronGeometry args={[1, 0]} />
            ) : (
              <torusGeometry args={[1, 0.34, 14, 36]} />
            )}
            <meshStandardMaterial
              color={s.wire ? (s.cyan ? "#22d3ee" : "#a78bfa") : s.cyan ? "#155e75" : "#4c1d95"}
              emissive={s.cyan ? "#083344" : "#1e1b4b"}
              wireframe={s.wire}
              roughness={0.3}
              metalness={s.wire ? 0.3 : 0.75}
            />
          </mesh>
        </Float>
      ))}

      {/* Rippling particle wave floor */}
      <ParticleWave />

      {/* Drifting sparkle fields — three depths */}
      <Sparkles count={100} scale={[13, 7.5, 4]} position={[0, 0, -1.5]} size={2.4} speed={0.35} color="#c4b5fd" opacity={0.65} />
      <Sparkles count={50} scale={[11, 6.5, 3]} position={[0, 0.4, 0.5]} size={4.5} speed={0.22} color="#67e8f9" opacity={0.45} />
      <Sparkles count={32} scale={[12, 7, 2]} position={[0, -0.3, 1.6]} size={6.5} speed={0.16} color="#ddd6fe" opacity={0.35} />
    </group>
  );
}

export default function HeroScene({
  active,
  scrollRef,
}: {
  active: boolean;
  scrollRef: ScrollRef;
}) {
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointerRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerRef.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 8], fov: 45 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      style={{ pointerEvents: "none" }}
    >
      <SceneContent pointerRef={pointerRef} scrollRef={scrollRef} />
    </Canvas>
  );
}
