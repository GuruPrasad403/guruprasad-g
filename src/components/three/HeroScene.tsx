import React, { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import * as THREE from "three";

/**
 * Real-time WebGL hero scene (navy + gold):
 * - a liquid distorted sphere wrapped in a gold wireframe shell, orbited by
 *   two tilted gold rings (saturn-style) that spin on different axes
 * - a metallic gold torus knot and a cluster of floating solid + wireframe
 *   geometry at different depths
 * - three layers of drifting particles
 * The whole group AND the camera ease toward the pointer, so moving the
 * mouse swings the scene in 3D — near objects shift more than far ones.
 * Rendered only while the hero is on screen (frameloop is parent-controlled)
 * and the pixel ratio is capped for mid-range phones.
 */

type PointerRef = React.MutableRefObject<{ x: number; y: number }>;

function SceneContent({ pointerRef }: { pointerRef: PointerRef }) {
  const group = useRef<THREE.Group>(null);
  const knot = useRef<THREE.Mesh>(null);
  const sphere = useRef<THREE.Mesh>(null);
  const shell = useRef<THREE.Mesh>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);

  const shapes = useMemo(
    () =>
      [
        { pos: [-3.4, 1.7, -1.5] as const, scale: 0.44, kind: "ico", wire: true },
        { pos: [-2.5, -2.0, -0.4] as const, scale: 0.3, kind: "octa", wire: false },
        { pos: [4.0, -2.2, -1.2] as const, scale: 0.38, kind: "ico", wire: false },
        { pos: [0.5, 2.7, -2.3] as const, scale: 0.27, kind: "octa", wire: true },
        { pos: [-4.3, -0.6, -2.6] as const, scale: 0.34, kind: "dode", wire: false },
        { pos: [4.4, 1.9, -2.8] as const, scale: 0.3, kind: "ring", wire: false },
      ] as const,
    []
  );

  useFrame((state, delta) => {
    const p = pointerRef.current;

    // Camera rig: the viewpoint itself drifts toward the pointer, which is
    // what makes near/far objects separate — unmistakable real 3D parallax.
    const cam = state.camera;
    cam.position.x = THREE.MathUtils.damp(cam.position.x, p.x * 0.9, 2.4, delta);
    cam.position.y = THREE.MathUtils.damp(cam.position.y, -p.y * 0.6, 2.4, delta);
    cam.lookAt(0, 0, 0);

    const g = group.current;
    if (g) {
      g.rotation.y = THREE.MathUtils.damp(g.rotation.y, p.x * 0.3, 2.2, delta);
      g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -p.y * 0.18, 2.2, delta);
      g.position.x = THREE.MathUtils.damp(g.position.x, p.x * 0.3, 2.2, delta);
      g.position.y = THREE.MathUtils.damp(g.position.y, -p.y * 0.22, 2.2, delta);
    }
    if (knot.current) {
      knot.current.rotation.x += delta * 0.18;
      knot.current.rotation.y += delta * 0.24;
    }
    if (sphere.current) sphere.current.rotation.y += delta * 0.08;
    if (shell.current) {
      shell.current.rotation.y -= delta * 0.12;
      shell.current.rotation.x += delta * 0.05;
    }
    if (ringA.current) ringA.current.rotation.z += delta * 0.25;
    if (ringB.current) ringB.current.rotation.z -= delta * 0.18;
  });

  return (
    <group ref={group}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 6, 6]} intensity={1.2} color="#fff1e6" />
      <spotLight position={[-7, 8, 5]} angle={0.5} penumbra={1} intensity={60} color="#fde68a" />
      <pointLight position={[-6, -2, 4]} intensity={26} color="#f59e0b" />
      <pointLight position={[6, 3, -2]} intensity={14} color="#fbbf24" />

      {/* Hero cluster: distorted sphere + wireframe shell + orbit rings */}
      <group position={[2.55, 0.15, -0.6]}>
        <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.7}>
          <mesh ref={sphere} scale={1.5}>
            <sphereGeometry args={[1, 48, 48]} />
            <MeshDistortMaterial
              color="#1d3a5f"
              emissive="#0a1626"
              roughness={0.18}
              metalness={0.4}
              distort={0.36}
              speed={1.6}
            />
          </mesh>
          {/* Gold wireframe shell counter-rotating around the sphere */}
          <mesh ref={shell} scale={1.78}>
            <icosahedronGeometry args={[1, 1]} />
            <meshStandardMaterial
              color="#f59e0b"
              emissive="#3a2402"
              wireframe
              roughness={0.35}
              metalness={0.6}
            />
          </mesh>
        </Float>
        {/* Saturn-style orbit rings, tilted, spinning on their own axes */}
        <mesh ref={ringA} rotation={[Math.PI / 2.4, 0.3, 0]}>
          <torusGeometry args={[2.45, 0.028, 12, 90]} />
          <meshStandardMaterial color="#d97706" emissive="#241300" roughness={0.25} metalness={0.9} />
        </mesh>
        <mesh ref={ringB} rotation={[Math.PI / 1.9, -0.5, 0.4]} scale={1.18}>
          <torusGeometry args={[2.45, 0.018, 12, 90]} />
          <meshStandardMaterial color="#fbbf24" emissive="#241300" roughness={0.3} metalness={0.85} />
        </mesh>
      </group>

      {/* Torus knot — left accent */}
      <Float speed={1.4} rotationIntensity={0.5} floatIntensity={0.9}>
        <mesh ref={knot} position={[-3.1, -0.4, -1]} scale={0.55}>
          <torusKnotGeometry args={[1, 0.32, 160, 24]} />
          <meshStandardMaterial
            color="#d97706"
            emissive="#1a0e00"
            roughness={0.22}
            metalness={0.9}
          />
        </mesh>
      </Float>

      {/* Floating geometry cluster at staggered depths */}
      {shapes.map((s, i) => (
        <Float
          key={i}
          speed={1.5 + i * 0.3}
          rotationIntensity={1.2}
          floatIntensity={1.5}
        >
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
              color={s.wire ? "#f59e0b" : i % 2 ? "#1d3a5f" : "#b45309"}
              emissive={s.wire ? "#2a1802" : "#0a1420"}
              wireframe={s.wire}
              roughness={0.3}
              metalness={s.wire ? 0.3 : 0.75}
            />
          </mesh>
        </Float>
      ))}

      {/* Particle fields — three depths */}
      <Sparkles
        count={110}
        scale={[13, 7.5, 4]}
        position={[0, 0, -1.5]}
        size={2.4}
        speed={0.32}
        color="#fcd34d"
        opacity={0.65}
      />
      <Sparkles
        count={55}
        scale={[11, 6.5, 3]}
        position={[0, 0.4, 0.5]}
        size={4.5}
        speed={0.2}
        color="#93c5fd"
        opacity={0.45}
      />
      <Sparkles
        count={36}
        scale={[12, 7, 2]}
        position={[0, -0.3, 1.6]}
        size={6.5}
        speed={0.14}
        color="#fde68a"
        opacity={0.35}
      />
    </group>
  );
}

export default function HeroScene({ active }: { active: boolean }) {
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
      <SceneContent pointerRef={pointerRef} />
    </Canvas>
  );
}
