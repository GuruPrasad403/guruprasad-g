import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import {
  Braces, FileCode2, Atom, Server, Database, Wind, Globe, Layers,
  KeyRound, Boxes, GitBranch, Bot, Sparkles, Cpu
} from "lucide-react";
import { portfolioData } from "../../data/portfolioData";

const iconFor = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes("typescript")) return FileCode2;
  if (n.includes("javascript")) return Braces;
  if (n.includes("react")) return Atom;
  if (n.includes("node")) return Server;
  if (n.includes("express")) return Layers;
  if (n.includes("mongo")) return Database;
  if (n.includes("tailwind")) return Wind;
  if (n.includes("html") || n.includes("css")) return Globe;
  if (n.includes("rest")) return Globe;
  if (n.includes("jwt")) return KeyRound;
  if (n.includes("aem")) return Boxes;
  if (n.includes("git")) return GitBranch;
  if (n.includes("copilot")) return Bot;
  if (n.includes("genai") || n.includes("nlp")) return Sparkles;
  return Cpu;
};

export default function TechStack() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const items = portfolioData.techStack;

  return (
    <section
      id="techstack"
      ref={ref}
      className="relative py-24 px-6 bg-transparent border-t border-slate-800/20 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <span className="text-xs font-bold font-mono tracking-widest text-amber-500 uppercase block mb-3">
            [ 04 / TOOLBOX ]
          </span>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight uppercase text-white">
            My Tech Stack
          </h2>
        </div>

        {/* Icon grid */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 mb-10"
        >
          {items.map((tech, i) => {
            const Icon = iconFor(tech);
            return (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                whileHover={{ y: -5, scale: 1.04 }}
                className="group flex flex-col items-center justify-center gap-2.5 py-5 px-2 rounded-2xl bg-slate-900/30 border border-slate-800/80 backdrop-blur-md hover:border-amber-500/40 hover:shadow-[0_12px_30px_rgba(245,158,11,0.15)] transition-colors"
              >
                <span className="w-11 h-11 rounded-xl bg-slate-800/70 border border-slate-700/50 flex items-center justify-center text-amber-400 group-hover:text-amber-300 transition-colors">
                  <Icon className="w-5 h-5" />
                </span>
                <span className="text-[11px] sm:text-xs font-bold font-mono text-slate-300 text-center leading-tight">
                  {tech}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Scrolling marquee strip */}
      <div className="relative border-y border-slate-800/70 bg-slate-900/40 py-3.5 overflow-hidden">
        <div className="flex w-max animate-marquee gap-0">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center shrink-0" aria-hidden={copy === 1}>
              {items.map((tech) => (
                <span key={`${copy}-${tech}`} className="flex items-center text-sm font-black tracking-[0.2em] uppercase text-slate-500">
                  <span className="px-5">{tech}</span>
                  <span className="text-amber-500">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
