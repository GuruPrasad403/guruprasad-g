import { GraduationCap, Calendar, BookOpen, Star } from "lucide-react";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import { portfolioData } from "../../data/portfolioData";

export default function Education() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="education"
      ref={ref}
      className="relative py-24 px-6 bg-[#09090B] border-t border-zinc-200/5 dark:border-zinc-800/20"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-xs font-bold font-mono tracking-widest text-blue-500 uppercase block mb-3">
            [ 06 / ACADEMICS ]
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-white">
            Educational Foundation
          </h2>
        </div>

        {/* Elegant Academic Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="p-6 sm:p-10 rounded-2xl bg-zinc-100/40 dark:bg-zinc-900/30 border border-zinc-200/10 dark:border-zinc-800/80 backdrop-blur-md relative overflow-hidden group hover:border-blue-500/20 dark:hover:border-blue-500/20 hover:shadow-[0_15px_30px_rgba(59,130,246,0.06)] transition-all duration-300"
        >
          {/* Accent light element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/10 transition-colors" />

          {/* Academic Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Degree Column */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 w-fit">
                <GraduationCap className="w-6 h-6 text-blue-400" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white group-hover:text-blue-400 transition-colors leading-tight">
                  {portfolioData.education.degree}
                </h3>
                <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 font-mono">
                  {portfolioData.education.institution}
                </p>
              </div>

              {/* Calendar period badge */}
              <div className="px-3 py-1.5 rounded-xl bg-zinc-200/60 dark:bg-zinc-800/60 border border-zinc-200/10 dark:border-zinc-700/50 flex items-center gap-1.5 text-xs font-mono text-zinc-600 dark:text-zinc-400 w-fit">
                <Calendar className="w-3.5 h-3.5 text-blue-500" />
                {portfolioData.education.period}
              </div>
            </div>

            {/* Right Coursework / Details Column */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400 font-mono pb-2 border-b border-zinc-200/50 dark:border-zinc-800/50">
                <BookOpen className="w-4 h-4 text-zinc-500" />
                <span>Academic Highlights</span>
              </div>

              <div className="space-y-3.5">
                {portfolioData.education.details.map((detail, index) => {
                  const isDistinction = index === 0;
                  return (
                    <motion.div
                      key={index}
                      className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans"
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                    >
                      <div className="mt-1 shrink-0">
                        {isDistinction ? (
                          <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        ) : (
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 mx-1" />
                        )}
                      </div>
                      <span>{detail}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
