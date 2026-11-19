import { motion } from "motion/react";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/sections/Hero";
import Projects from "../components/sections/Projects";
import About from "../components/sections/About";
import Services from "../components/sections/Services";
import Skills from "../components/sections/Skills";
import TechStack from "../components/sections/TechStack";
import Experience from "../components/sections/Experience";
import Certifications from "../components/sections/Certifications";
import Education from "../components/sections/Education";
import Contact from "../components/sections/Contact";
import Footer from "../components/layout/Footer";

export default function Home() {
  return (
    <div className="dark relative min-h-screen bg-[#060a13] text-white overflow-x-hidden selection:bg-amber-500/30 selection:text-white">
      {/* Ambient deep-red glows through the page */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[32%] left-[-12%] w-[38vw] h-[38vw] rounded-full bg-slate-500/[0.05] blur-[130px]" />
        <div className="absolute top-[58%] right-[-12%] w-[34vw] h-[34vw] rounded-full bg-amber-600/[0.05] blur-[120px]" />
        <div className="absolute bottom-[4%] left-[8%] w-[40vw] h-[40vw] rounded-full bg-slate-500/[0.04] blur-[140px]" />
      </div>

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
            <Services />
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
