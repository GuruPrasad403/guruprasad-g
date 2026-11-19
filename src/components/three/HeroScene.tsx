import React, { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import * as THREE from "three";

/**
 * Real-time WebGL hero scene: a distorted crimson sphere, a torus knot,
 * floating wireframe geometry and a red particle field. The whole group
 * eases toward the pointer for parallax depth. Rendered only while the
 * hero is on screen (frameloop is controlled by the parent).
 */

type PointerRef = React.MutableRefObject<{ x: number; y: number }>;

function SceneContent({ pointerRef }: { pointerRef: PointerRef }) {
  const group = useRef<THREE.Group>(null);
  const knot = useRef<THREE.Mesh>(null);
  const sphere = useRef<THREE.Mesh>(null);

  const shapes = useMemo(
    () =>
      [
        { pos: [-3.4, 1.6, -1.5] as const, scale: 0.42, kind: "ico" },
        { pos: [-2.6, -1.9, -0.5] as const, scale: 0.3, kind: "octa" },
        { pos: [3.9, -2.1, -1.2] as const, scale: 0.36, kind: "ico" },
        { pos: [0.4, 2.6, -2.2] as const, scale: 0.26, kind: "octa" },
      ] as const,
    []
  );

  useFrame((state, delta) => {
    const g = group.current;
    if (g) {
      const targetY = pointerRef.current.x * 0.35;
      const targetX = -pointerRef.current.y * 0.22;
      g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetY, 2.2, delta);
      g.rotation.x = THREE.MathUtils.damp(g.rotation.x, targetX, 2.2, delta);
      g.position.x = THREE.MathUtils.damp(
        g.position.x,
        pointerRef.current.x * 0.35,
        2.2,
        delta
      );
      g.position.y = THREE.MathUtils.damp(
        g.position.y,
        -pointerRef.current.y * 0.25,
        2.2,
        delta
      );
    }
    if (knot.current) {
      knot.current.rotation.x += delta * 0.18;
      knot.current.rotation.y += delta * 0.24;
    }
    if (sphere.current) {
      sphere.current.rotation.y += delta * 0.08;
    }
    void state;
  });

  return (
    <group ref={group}>
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 6, 6]} intensity={1.1} color="#fff1e6" />
      <pointLight position={[-6, -2, 4]} intensity={26} color="#f59e0b" />
      <pointLight position={[6, 3, -2]} intensity={14} color="#fbbf24" />

      {/* Distorted hero sphere — sits behind the portrait side */}
      <mesh ref={sphere} position={[2.55, 0.15, -0.6]} scale={1.55}>
        <sphereGeometry args={[1, 48, 48]} />
        <MeshDistortMaterial
          color="#1d3a5f"
          emissive="#0a1626"
          roughness={0.22}
          metalness={0.35}
          distort={0.38}
          speed={1.5}
        />
      </mesh>

      {/* Torus knot — left accent */}
      <Float speed={1.4} rotationIntensity={0.5} floatIntensity={0.9}>
        <mesh ref={knot} position={[-3.1, -0.4, -1]} scale={0.52}>
          <torusKnotGeometry args={[1, 0.32, 140, 20]} />
          <meshStandardMaterial
            color="#d97706"
            emissive="#1a0e00"
            roughness={0.3}
            metalness={0.85}
          />
        </mesh>
      </Float>

      {/* Floating wireframe geometry */}
      {shapes.map((s, i) => (
        <Float
          key={i}
          speed={1.6 + i * 0.35}
          rotationIntensity={1.1}
          floatIntensity={1.4}
        >
          <mesh position={[s.pos[0], s.pos[1], s.pos[2]]} scale={s.scale}>
            {s.kind === "ico" ? (
              <icosahedronGeometry args={[1, 0]} />
            ) : (
              <octahedronGeometry args={[1, 0]} />
            )}
            <meshStandardMaterial
              color="#d97706"
              emissive="#2a1802"
              wireframe
              roughness={0.4}
              metalness={0.2}
            />
          </mesh>
        </Float>
      ))}

      {/* Particle fields */}
      <Sparkles
        count={110}
        scale={[13, 7.5, 4]}
        position={[0, 0, -1]}
        size={2.4}
        speed={0.32}
        color="#fcd34d"
        opacity={0.65}
      />
      <Sparkles
        count={50}
        scale={[11, 6.5, 3]}
        position={[0, 0.4, 0.5]}
        size={4.5}
        speed={0.2}
        color="#93c5fd"
        opacity={0.4}
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
      dpr={[1, 1.75]}
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
