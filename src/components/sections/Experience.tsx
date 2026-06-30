import { Briefcase, Calendar, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import { portfolioData } from "../../data/portfolioData";

export default function Experience() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="experience"
      ref={ref}
      className="relative py-24 px-6 bg-[#09090B] border-t border-zinc-200/5 dark:border-zinc-800/20"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-xs font-bold font-mono tracking-widest text-blue-500 uppercase block mb-3">
            [ 03 / TIMELINE ]
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-white">
            Professional Journey
          </h2>
        </div>

        {/* Timeline Path Container */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-zinc-200/40 dark:border-zinc-800/60 ml-4 space-y-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-12"
          >
            {portfolioData.experience.map((exp, index) => {
              const isLatest = index === 0;
              return (
                <motion.div
                  key={exp.id}
                  variants={itemVariants}
                  className="relative group"
                >
                  {/* Timeline Glowing Node */}
                  <div className={`absolute -left-[35px] sm:-left-[43px] top-1.5 w-6 h-6 rounded-full border-2 bg-zinc-950 flex items-center justify-center transition-all duration-300 ${
                    isLatest
                      ? "border-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.6)]"
                      : "border-zinc-700 group-hover:border-blue-500/50"
                  }`}>
                    {isLatest && (
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                    )}
                  </div>

                  {/* Card Container */}
                  <div className="p-6 sm:p-8 rounded-2xl bg-zinc-100/40 dark:bg-zinc-900/30 border border-zinc-200/10 dark:border-zinc-800/80 backdrop-blur-md relative overflow-hidden hover:border-blue-500/20 dark:hover:border-blue-500/20 transition-all duration-300">
                    
                    {/* Header Block */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white group-hover:text-blue-400 transition-colors">
                            {exp.role}
                          </h3>
                        </div>
                        <p className="text-sm font-semibold tracking-wide text-zinc-500 dark:text-zinc-400 font-mono">
                          {exp.company}
                        </p>
                      </div>

                      {/* Period Badge */}
                      <div className="px-3 py-1.5 rounded-xl bg-zinc-200/60 dark:bg-zinc-800/60 border border-zinc-200/10 dark:border-zinc-700/50 flex items-center gap-1.5 text-xs font-mono text-zinc-600 dark:text-zinc-400 w-fit h-fit">
                        <Calendar className="w-3.5 h-3.5 text-blue-500" />
                        {exp.period}
                      </div>
                    </div>

                    {/* Achievements List */}
                    <ul className="space-y-3.5">
                      {exp.achievements.map((ach, idx) => (
                        <motion.li
                          key={idx}
                          className="flex items-start gap-2.5 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans"
                          initial={{ opacity: 0 }}
                          animate={inView ? { opacity: 1 } : {}}
                          transition={{ duration: 0.4, delay: 0.2 + idx * 0.05 }}
                        >
                          <ChevronRight className="w-4 h-4 text-blue-500 shrink-0 mt-1" />
                          <span>{ach}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
