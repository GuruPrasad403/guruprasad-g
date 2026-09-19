import { useState } from "react";
import { Github, ExternalLink, ArrowUpRight, ListChecks, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useInView } from "react-intersection-observer";
import { portfolioData, Project } from "../../data/portfolioData";

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="projects"
      ref={ref}
      className="relative py-24 px-6 bg-transparent border-t border-zinc-200/10 dark:border-zinc-800/20"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-xs font-bold font-mono tracking-widest text-blue-500 uppercase block mb-3">
            [ 04 / SHOWCASE ]
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-white">
            Featured Projects
          </h2>
        </div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {portfolioData.projects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              className="group flex flex-col h-full rounded-2xl bg-zinc-100/40 dark:bg-zinc-900/30 border border-zinc-200/10 dark:border-zinc-800/80 backdrop-blur-md overflow-hidden hover:border-blue-500/20 dark:hover:border-blue-500/20 hover:shadow-[0_10px_30px_rgba(59,130,246,0.08)] transition-all duration-300"
            >
              {/* Image Container with Zoom effect */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-60" />
              </div>

              {/* Content Body */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 border border-zinc-300/30 dark:border-zinc-700/50 text-[10px] font-bold font-mono text-zinc-600 dark:text-zinc-400"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold font-mono text-blue-400">
                      +{project.techStack.length - 3} more
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2 leading-tight">
                  {project.title}
                </h3>

                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 flex-grow line-clamp-3">
                  {project.description}
                </p>

                {/* Actions Row */}
                <div className="flex items-center gap-3 pt-4 border-t border-zinc-200/50 dark:border-zinc-800/50">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="flex-grow px-4 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-800/50 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1 hover:bg-blue-600 dark:hover:bg-blue-600 transition-colors"
                  >
                    View Details
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-transparent hover:text-white text-zinc-500 flex items-center justify-center hover:border-zinc-400 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="View Source on GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Expanded Modal case-study drawer */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Click-outside helper */}
            <div className="absolute inset-0 cursor-zoom-out" onClick={() => setSelectedProject(null)} />

            <motion.div
              className="relative w-full max-w-2xl bg-[#09090B] border border-zinc-200/10 dark:border-zinc-800/80 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden max-h-[90vh] flex flex-col"
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
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 bg-zinc-950/60 hover:bg-zinc-950/90 border border-zinc-800/80 text-white rounded-full transition-colors"
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
                  <p className="text-sm text-zinc-400 leading-relaxed font-sans">
                    {selectedProject.longDescription}
                  </p>
                </div>

                {/* Tech Stack Pills */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-blue-500 font-mono mb-2.5">
                    Technologies Applied
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-semibold font-mono text-zinc-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Core Features */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-blue-500 font-mono mb-3">
                    Engineered Features
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedProject.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2 text-xs text-zinc-400">
                        <ListChecks className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA actions */}
                <div className="flex items-center gap-4 pt-4 border-t border-zinc-800/60 flex-shrink-0">
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-grow md:flex-none px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-[0_5px_15px_rgba(59,130,246,0.3)] transition-colors"
                  >
                    Launch Live Demo
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-grow md:flex-none px-6 py-3 rounded-xl border border-zinc-800 hover:bg-zinc-800 hover:text-white text-zinc-400 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
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
