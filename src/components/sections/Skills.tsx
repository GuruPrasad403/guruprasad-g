import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import { Code, Server, Wrench, ShieldCheck } from "lucide-react";
import Reveal3D from "../ui/Reveal3D";
import { portfolioData } from "../../data/portfolioData";

export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const getCategoryIcon = (category: string) => {
    if (category.toLowerCase().includes("frontend")) return <Code className="w-5 h-5 text-violet-400" />;
    if (category.toLowerCase().includes("backend")) return <Server className="w-5 h-5 text-violet-400" />;
    return <Wrench className="w-5 h-5 text-emerald-400" />;
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
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
      id="skills"
      ref={ref}
      className="relative py-24 px-6 bg-transparent border-t border-slate-200/10 dark:border-slate-800/20"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <Reveal3D>
        <div className="mb-16">
          <span className="text-xs font-bold font-mono tracking-widest text-violet-500 uppercase block mb-3">
            [ 03 / EXPERTISE ]
          </span>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight uppercase text-slate-900 dark:text-white">
            Technical Skills
          </h2>
        </div>
        </Reveal3D>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {portfolioData.skills.map((group) => (
            <motion.div
              key={group.category}
              variants={cardVariants}
              className="p-6 rounded-2xl bg-slate-100/40 dark:bg-slate-900/30 border border-slate-200/10 dark:border-slate-800/80 backdrop-blur-md relative group overflow-hidden hover:border-violet-500/20 dark:hover:border-violet-500/20 transition-all duration-300"
            >
              {/* Card Header */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200/50 dark:border-slate-800/50">
                <div className="p-2.5 rounded-xl bg-slate-200/60 dark:bg-slate-800/60 border border-slate-200/10 dark:border-slate-700/50">
                  {getCategoryIcon(group.category)}
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight uppercase font-mono">
                  {group.category}
                </h3>
              </div>

              {/* Skills List */}
              <div className="space-y-5">
                {group.skills.map((skill) => (
                  <div key={skill.name} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-slate-700 dark:text-slate-300 font-semibold uppercase tracking-wider">
                        {skill.name}
                      </span>
                      <span className="text-slate-400 font-bold">
                        {skill.level}%
                      </span>
                    </div>

                    {/* Progress Track */}
                    <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-950 rounded-full overflow-hidden relative">
                      <motion.div
                        className="h-full bg-gradient-to-r from-violet-500 to-violet-700 rounded-full shadow-[0_0_8px_rgba(139, 92, 246,0.2)]"
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Dynamic Trust Ribbon */}
        <motion.div
          className="mt-12  p-6 rounded-2xl bg-slate-950/40 border border-slate-200/5 dark:border-slate-800/20 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl">
              <ShieldCheck className="w-4 h-4 animate-pulse" />
            </div>
            <p className="text-xs text-slate-400 font-medium">
              Every technology is thoroughly applied in production pipelines, Agile codebases, or active engineering projects.
            </p>
          </div>
          <span className="text-[10px] font-mono tracking-widest text-slate-600 dark:text-slate-500 uppercase">
            VERIFIED STACK
          </span>
        </motion.div>
      </div>
    </section>
  );
}
