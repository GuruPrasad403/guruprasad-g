import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import { Code, Server, Wrench, ShieldCheck } from "lucide-react";
import { portfolioData } from "../../data/portfolioData";

export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const getCategoryIcon = (category: string) => {
    if (category.toLowerCase().includes("frontend")) return <Code className="w-5 h-5 text-blue-400" />;
    if (category.toLowerCase().includes("backend")) return <Server className="w-5 h-5 text-cyan-400" />;
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="skills"
      ref={ref}
      className="relative py-24 px-6 bg-transparent border-t border-zinc-200/10 dark:border-zinc-800/20"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-xs font-bold font-mono tracking-widest text-blue-500 uppercase block mb-3">
            [ 02 / EXPERTISE ]
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-white">
            Technical Arsenal
          </h2>
        </div>

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
              className="p-6 rounded-2xl bg-zinc-100/40 dark:bg-zinc-900/30 border border-zinc-200/10 dark:border-zinc-800/80 backdrop-blur-md relative group overflow-hidden hover:border-blue-500/20 dark:hover:border-blue-500/20 transition-all duration-300"
            >
              {/* Card Header */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-zinc-200/50 dark:border-zinc-800/50">
                <div className="p-2.5 rounded-xl bg-zinc-200/60 dark:bg-zinc-800/60 border border-zinc-200/10 dark:border-zinc-700/50">
                  {getCategoryIcon(group.category)}
                </div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white tracking-tight uppercase font-mono">
                  {group.category}
                </h3>
              </div>

              {/* Skills List */}
              <div className="space-y-5">
                {group.skills.map((skill) => (
                  <div key={skill.name} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-zinc-700 dark:text-zinc-300 font-semibold uppercase tracking-wider">
                        {skill.name}
                      </span>
                      <span className="text-zinc-400 font-bold">
                        {skill.level}%
                      </span>
                    </div>

                    {/* Progress Track */}
                    <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-950 rounded-full overflow-hidden relative">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.2)]"
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
          className="mt-12  p-6 rounded-2xl bg-zinc-950/40 border border-zinc-200/5 dark:border-zinc-800/20 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl">
              <ShieldCheck className="w-4 h-4 animate-pulse" />
            </div>
            <p className="text-xs text-zinc-400 font-medium">
              Every technology is thoroughly applied in production pipelines, Agile codebases, or active engineering projects.
            </p>
          </div>
          <span className="text-[10px] font-mono tracking-widest text-zinc-600 dark:text-zinc-500 uppercase">
            VERIFIED STACK
          </span>
        </motion.div>
      </div>
    </section>
  );
}
