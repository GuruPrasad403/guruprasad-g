import React, { useState } from "react";
import { Github, ExternalLink, ArrowUpRight, ListChecks, X, Boxes } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useInView } from "react-intersection-observer";
import Reveal3D from "../ui/Reveal3D";
import { portfolioData, Project } from "../../data/portfolioData";

const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const px = (e.clientX - r.left) / r.width - 0.5;
  const py = (e.clientY - r.top) / r.height - 0.5;
  el.style.transform = `rotateY(${px * 11}deg) rotateX(${-py * 11}deg) scale(1.02)`;
  el.style.setProperty("--mx", `${(px + 0.5) * 100}%`);
  el.style.setProperty("--my", `${(py + 0.5) * 100}%`);
};

const resetTilt = (e: React.MouseEvent<HTMLDivElement>) => {
  e.currentTarget.style.transform = "";
};

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 48, rotateX: -16, scale: 0.96, transformPerspective: 1100 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="projects"
      ref={ref}
      className="relative py-24 px-6 bg-transparent border-t border-slate-200/10 dark:border-slate-800/20"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <Reveal3D>
        <div className="mb-16">
          <span className="text-xs font-bold font-mono tracking-widest text-violet-500 uppercase block mb-3">
            [ 01 / SHOWCASE ]
          </span>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight uppercase text-slate-900 dark:text-white">
            Featured Projects
          </h2>
        </div>
        </Reveal3D>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 tilt-scene"
        >
          {portfolioData.projects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              className="h-full"
            >
            <div
              onMouseMove={handleTilt}
              onMouseLeave={resetTilt}
              className="tilt-card relative group flex flex-col h-full rounded-2xl bg-slate-100/40 dark:bg-slate-900/30 border border-slate-200/10 dark:border-slate-800/80 backdrop-blur-md overflow-hidden hover:border-violet-500/40 dark:hover:border-violet-500/40 hover:shadow-[0_22px_45px_rgba(124, 58, 237,0.16)]"
            >
              <div className="tilt-glare" aria-hidden />
              {/* Image Container with Zoom effect */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />
              </div>

              {/* Content Body */}
              <div className="tilt-inner p-6 flex flex-col flex-grow">
                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 border border-slate-300/30 dark:border-slate-700/50 text-[10px] font-bold font-mono text-slate-600 dark:text-slate-400"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="px-2 py-0.5 rounded bg-violet-500/10 border border-violet-500/20 text-[10px] font-bold font-mono text-violet-400">
                      +{project.techStack.length - 3} more
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-tight">
                  {project.title}
                </h3>

                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 flex-grow line-clamp-3">
                  {project.description}
                </p>

                {/* Actions Row */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-200/50 dark:border-slate-800/50">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="flex-grow px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800/50 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1 hover:bg-violet-600 dark:hover:bg-violet-600 transition-colors"
                  >
                    View Details
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-transparent hover:text-white text-slate-500 flex items-center justify-center hover:border-slate-400 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="View Source on GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </motion.a>
                </div>
              </div>
            </div>
            </motion.div>
          ))}
        </motion.div>

        {/* AEM Projects — enterprise work at Indegene */}
        <div className="mt-24">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600/25 to-violet-900/20 border border-violet-500/30 flex items-center justify-center">
              <Boxes className="w-5 h-5 text-violet-400" />
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              AEM Projects
            </h3>
            <span className="px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/25 text-[10px] font-bold font-mono tracking-widest text-violet-400 uppercase">
              Enterprise · Indegene
            </span>
          </div>
          <p className="max-w-3xl text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-10">
            Adobe Experience Manager work from my role at Indegene — AstraZeneca oncology
            brand and HCP (healthcare professional) websites where I build and maintain
            reusable AEM components, pages and splash experiences.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 tilt-scene">
            {portfolioData.aemProjects.map((site, i) => (
              <motion.div
                key={site.id}
                initial={{ opacity: 0, y: 42, rotateX: -14, transformPerspective: 1100 }}
                animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.08 * i, ease: "easeOut" }}
                className="h-full"
              >
                <div
                  onMouseMove={handleTilt}
                  onMouseLeave={resetTilt}
                  className="tilt-card relative group flex flex-col h-full rounded-2xl bg-slate-900/30 border border-slate-800/80 backdrop-blur-md overflow-hidden hover:border-violet-500/40 hover:shadow-[0_22px_45px_rgba(124, 58, 237,0.16)]"
                >
                  <div className="tilt-glare" aria-hidden />
                  {/* Gradient header band */}
                  <div className="relative px-6 py-5 bg-gradient-to-br from-slate-900 via-slate-900/70 to-slate-950 border-b border-violet-500/15 overflow-hidden">
                    <div className="absolute -top-8 -right-6 w-28 h-28 bg-violet-600/15 blur-2xl rounded-full pointer-events-none" />
                    <p className="relative text-[10px] font-bold font-mono tracking-widest text-violet-400 uppercase mb-1">
                      Adobe Experience Manager
                    </p>
                    <p className="relative font-mono text-sm font-semibold text-slate-100 break-all">
                      {site.domain || "Internal campaign pages"}
                    </p>
                  </div>

                  <div className="tilt-inner p-6 flex flex-col flex-grow">
                    <h4 className="text-lg font-bold text-white mb-2 leading-tight">
                      {site.title}
                    </h4>
                    <p className="text-sm text-slate-400 mb-6 flex-grow">
                      {site.description}
                    </p>
                    <div className="flex items-center gap-3 pt-4 border-t border-slate-800/50">
                      <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700/50 text-[10px] font-bold font-mono text-slate-300">
                        AEM
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700/50 text-[10px] font-bold font-mono text-slate-300">
                        Components &amp; Pages
                      </span>
                      {site.url ? (
                        <a
                          href={site.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-auto inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-violet-400 hover:text-violet-300 transition-colors"
                          aria-label={`Visit ${site.title}`}
                        >
                          Visit
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <span className="ml-auto text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                          Campaign work
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Expanded Modal case-study drawer */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Click-outside helper */}
            <div className="absolute inset-0 cursor-zoom-out" onClick={() => setSelectedProject(null)} />

            <motion.div
              className="relative w-full max-w-2xl bg-[#09090B] border border-slate-200/10 dark:border-slate-800/80 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden max-h-[90vh] flex flex-col"
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25 }}
            >
              {/* Header Image */}
              <div className="relative aspect-video md:h-64 overflow-hidden flex-shrink-0">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 bg-slate-950/60 hover:bg-slate-950/90 border border-slate-800/80 text-white rounded-full transition-colors"
                  aria-label="Close details"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="p-6 md:p-8 overflow-y-auto space-y-6">
                <div>
                  <h3 className="text-xl md:text-2xl font-black text-white mb-2 tracking-tight">
                    {selectedProject.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed font-sans">
                    {selectedProject.longDescription}
                  </p>
                </div>

                {/* Tech Stack Pills */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-violet-500 font-mono mb-2.5">
                    Technologies Applied
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold font-mono text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Core Features */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-violet-500 font-mono mb-3">
                    Engineered Features
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedProject.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2 text-xs text-slate-400">
                        <ListChecks className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA actions */}
                <div className="flex items-center gap-4 pt-4 border-t border-slate-800/60 flex-shrink-0">
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-grow md:flex-none px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-[0_5px_15px_rgba(124, 58, 237,0.3)] transition-colors"
                  >
                    Launch Live Demo
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-grow md:flex-none px-6 py-3 rounded-xl border border-slate-800 hover:bg-slate-800 hover:text-white text-slate-400 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                  >
                    GitHub Code
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
