import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/**
 * SECTION HEADER 3D ACCENT — a palm-sized cluster of floating violet→cyan
 * geometry (drei Float + a slow spin) that sits beside each section title,
 * so every part of the page carries its own living 3D moment, not just
 * the hero.
 *
 * Performance: the tiny canvas is only MOUNTED while the header is near
 * the viewport (IntersectionObserver, 250px margin) — off-screen accents
 * unmount and release their WebGL context, keeping the total context
 * count low on phones. A gradient orb placeholder holds the space
 * otherwise, and is also the permanent fallback for reduced motion.
 */

function AccentShapes({ variant }: { variant: number }) {
  const group = useRef<THREE.Group>(null);
  const orbit = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.45;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.6) * 0.25;
    }
    if (orbit.current) {
      const t = state.clock.elapsedTime * 0.9;
      orbit.current.position.set(Math.cos(t) * 1.35, Math.sin(t * 1.25) * 0.45, Math.sin(t) * 0.4);
    }
  });

  return (
    <group ref={group}>
      <ambientLight intensity={0.7} />
      <pointLight position={[3, 3, 4]} intensity={14} color="#a78bfa" />
      <pointLight position={[-3, -2, 3]} intensity={10} color="#22d3ee" />

      <Float speed={2.2} rotationIntensity={0.7} floatIntensity={1.4}>
        {variant % 3 === 0 ? (
          <mesh scale={0.95}>
            <icosahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color="#22d3ee" emissive="#083344" wireframe roughness={0.3} metalness={0.5} />
          </mesh>
        ) : variant % 3 === 1 ? (
          <mesh scale={0.72}>
            <torusKnotGeometry args={[0.8, 0.28, 110, 16]} />
            <meshStandardMaterial color="#7c3aed" emissive="#1e1b4b" roughness={0.22} metalness={0.85} />
          </mesh>
        ) : (
          <mesh scale={0.95}>
            <dodecahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color="#a78bfa" emissive="#2e1065" wireframe roughness={0.3} metalness={0.5} />
          </mesh>
        )}
      </Float>

      {/* Small satellite shape orbiting the main one */}
      <mesh ref={orbit} scale={0.3}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={variant % 3 === 1 ? "#22d3ee" : "#8b5cf6"}
          emissive={variant % 3 === 1 ? "#083344" : "#2e1065"}
          roughness={0.25}
          metalness={0.7}
        />
      </mesh>
    </group>
  );
}

export default function SectionAccent({ variant = 0 }: { variant?: number }) {
  const holderRef = useRef<HTMLDivElement | null>(null);
  const [near, setNear] = useState(false);
  const [reduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const el = holderRef.current;
    if (!el || reduced) return;
    const io = new IntersectionObserver(([entry]) => setNear(entry.isIntersecting), {
      rootMargin: "250px 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <div
      ref={holderRef}
      aria-hidden
      className="relative w-14 h-14 sm:w-20 sm:h-20 shrink-0 pointer-events-none select-none"
    >
      {/* Static orb — placeholder + reduced-motion fallback */}
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(139,92,246,0.5),rgba(34,211,238,0.18)_55%,transparent_72%)] blur-[6px]" />
      {near && !reduced && (
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 4], fov: 40 }}
          gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
          style={{ pointerEvents: "none" }}
        >
          <AccentShapes variant={variant} />
        </Canvas>
      )}
    </div>
  );
}
