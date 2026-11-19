import { Suspense, lazy, useEffect, useState } from "react";
import { motion } from "motion/react";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/sections/Hero";
import Projects from "../components/sections/Projects";
import About from "../components/sections/About";
import Skills from "../components/sections/Skills";
import TechStack from "../components/sections/TechStack";
import Experience from "../components/sections/Experience";
import Certifications from "../components/sections/Certifications";
import Education from "../components/sections/Education";
import Contact from "../components/sections/Contact";
import Footer from "../components/layout/Footer";

const PageScene = lazy(() => import("../components/three/PageScene"));

function webglAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

export default function Home() {
  // Full-page 3D background: mounted only when WebGL exists and motion
  // is allowed; its frameloop pauses while the tab is hidden.
  const [pageSceneOn, setPageSceneOn] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setPageSceneOn(webglAvailable() && !reduced);
    const onVis = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  return (
    <div className="dark relative min-h-screen bg-[#05050c] text-white overflow-x-hidden selection:bg-violet-500/30 selection:text-white">
      {/* Animated aurora background — the whole page stays alive */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="aurora-blob-a absolute top-[-10%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-violet-700/[0.13] blur-[130px]" />
        <div className="aurora-blob-b absolute top-[38%] right-[-14%] w-[40vw] h-[40vw] rounded-full bg-cyan-500/[0.08] blur-[120px]" />
        <div className="aurora-blob-a absolute bottom-[-14%] left-[16%] w-[42vw] h-[42vw] rounded-full bg-indigo-600/[0.10] blur-[140px]" />
      </div>

      {/* Full-page animated 3D background — particles + floating geometry
          drift behind EVERY section, driven by page scroll progress */}
      {pageSceneOn && (
        <div className="fixed inset-0 z-[1] pointer-events-none" aria-hidden>
          <Suspense fallback={null}>
            <PageScene active={tabVisible} />
          </Suspense>
        </div>
      )}

      {/* Active layout contents */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Hero />
          </motion.div>

          <div className="space-y-0 relative">
            <Projects />
            <About />
            <Skills />
            <TechStack />
            <Experience />
            <Certifications />
            <Education />
            <Contact />
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
