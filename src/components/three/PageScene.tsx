import React, { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

/**
 * FULL-PAGE 3D BACKGROUND — the hero's 3D language, extended down the
 * ENTIRE page. A fixed canvas sits behind every section; inside it, a
 * tall "world" of drifting particles, sparkles and floating violet→cyan
 * geometry is spread over ~60 world units. As the user scrolls, the
 * world slides upward in sync with page progress, so fresh 3D shapes
 * continuously drift through view behind Projects, About, Skills,
 * Experience, Contact — the animation never stops at the hero.
 *
 * Performance guards: DPR capped at 1.5, frameloop paused while the
 * tab is hidden (parent-controlled), reduced counts vs the hero scene,
 * and the parent only mounts this when WebGL exists and the user has
 * not asked for reduced motion.
 */

const WORLD_SPAN = 58; // world units of content below the first screen

type ScrollRef = React.MutableRefObject<number>;

/** Particle river flowing down the whole page. */
function ParticleRiver() {
  const ref = useRef<THREE.Points>(null);
  const { geometry, base } = useMemo(() => {
    const count = 1100;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const baseArr = new Float32Array(count * 3);
    const violet = new THREE.Color("#8b5cf6");
    const cyan = new THREE.Color("#22d3ee");
    const tmp = new THREE.Color();
    for (let i = 0; i < count; i++) {
      const px = (Math.random() - 0.5) * 17;
      const py = 4 - Math.random() * (WORLD_SPAN + 8);
      const pz = -1.5 - Math.random() * 3.5;
      positions[i * 3] = px;
      positions[i * 3 + 1] = py;
      positions[i * 3 + 2] = pz;
      baseArr[i * 3] = px;
      baseArr[i * 3 + 1] = py;
      baseArr[i * 3 + 2] = pz;
      tmp.copy(violet).lerp(cyan, Math.random());
      colors[i * 3] = tmp.r;
      colors[i * 3 + 1] = tmp.g;
      colors[i * 3 + 2] = tmp.b;
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
      const bx = base[i * 3];
      const by = base[i * 3 + 1];
      arr[i * 3] = bx + Math.sin(by * 0.35 + t * 0.35 + i) * 0.22;
      arr[i * 3 + 1] = by + Math.sin(bx * 0.4 + t * 0.5 + i * 0.7) * 0.18;
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.055}
        vertexColors
        transparent
        opacity={0.55}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

const SHAPES = [
  { pos: [-5.2, -3, -2.5], scale: 0.55, kind: "ico", wire: true, cyan: true },
  { pos: [5.6, -8, -3], scale: 1.15, kind: "ico", wire: true, cyan: false },
  { pos: [-5.8, -13, -2], scale: 0.5, kind: "octa", wire: false, cyan: true },
  { pos: [5.2, -18, -2.6], scale: 0.62, kind: "torus", wire: false, cyan: false },
  { pos: [-5.4, -23, -3.2], scale: 0.9, kind: "knot", wire: false, cyan: false },
  { pos: [5.9, -28, -2.2], scale: 0.48, kind: "dode", wire: true, cyan: true },
  { pos: [-5.7, -33, -2.8], scale: 0.58, kind: "ico", wire: false, cyan: false },
  { pos: [5.3, -38, -3.1], scale: 1.05, kind: "dode", wire: true, cyan: false },
  { pos: [-5.3, -43, -2.4], scale: 0.52, kind: "torus", wire: true, cyan: true },
  { pos: [5.8, -48, -2.7], scale: 0.6, kind: "octa", wire: false, cyan: false },
  { pos: [-5.9, -52, -3], scale: 0.85, kind: "knot", wire: false, cyan: true },
  { pos: [5.4, -56, -2.3], scale: 0.5, kind: "ico", wire: true, cyan: true },
] as const;

function WorldContent({ scrollRef }: { scrollRef: ScrollRef }) {
  const world = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const w = world.current;
    if (!w) return;
    const t = state.clock.elapsedTime;
    // Slide the world up in sync with page scroll progress (0 → 1),
    // with a whisper of idle sway so it breathes even between scrolls.
    const target = scrollRef.current * WORLD_SPAN;
    w.position.y = THREE.MathUtils.damp(w.position.y, target, 3.2, delta);
    w.rotation.y = Math.sin(t * 0.05) * 0.03;
  });

  return (
    <group ref={world}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 6, 6]} intensity={0.9} color="#ede9fe" />
      <pointLight position={[-6, -20, 3]} intensity={26} color="#8b5cf6" />
      <pointLight position={[6, -42, 2]} intensity={20} color="#22d3ee" />

      <ParticleRiver />

      {SHAPES.map((s, i) => (
        <Float key={i} speed={1.4 + (i % 4) * 0.35} rotationIntensity={1.2} floatIntensity={1.5}>
          <mesh position={[s.pos[0], s.pos[1], s.pos[2]]} scale={s.scale}>
            {s.kind === "ico" ? (
              <icosahedronGeometry args={[1, 0]} />
            ) : s.kind === "octa" ? (
              <octahedronGeometry args={[1, 0]} />
            ) : s.kind === "dode" ? (
              <dodecahedronGeometry args={[1, 0]} />
            ) : s.kind === "knot" ? (
              <torusKnotGeometry args={[0.8, 0.27, 120, 18]} />
            ) : (
              <torusGeometry args={[1, 0.34, 14, 36]} />
            )}
            <meshStandardMaterial
              color={s.wire ? (s.cyan ? "#22d3ee" : "#a78bfa") : s.cyan ? "#155e75" : "#4c1d95"}
              emissive={s.cyan ? "#083344" : "#1e1b4b"}
              wireframe={s.wire}
              roughness={0.3}
              metalness={s.wire ? 0.3 : 0.75}
              transparent
              opacity={0.85}
            />
          </mesh>
        </Float>
      ))}

      {/* Sparkle bands spaced down the page */}
      <Sparkles count={70} scale={[15, 9, 3]} position={[0, -6, -2]} size={3} speed={0.3} color="#c4b5fd" opacity={0.5} />
      <Sparkles count={70} scale={[15, 9, 3]} position={[0, -24, -2]} size={3.4} speed={0.26} color="#67e8f9" opacity={0.45} />
      <Sparkles count={70} scale={[15, 9, 3]} position={[0, -42, -2]} size={3} speed={0.3} color="#ddd6fe" opacity={0.5} />
    </group>
  );
}

export default function PageScene({ active }: { active: boolean }) {
  const scrollRef = useRef(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        scrollRef.current = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 9], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
    >
      <WorldContent scrollRef={scrollRef} />
    </Canvas>
  );
}
