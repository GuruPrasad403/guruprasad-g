import { Award, Calendar, CheckCircle } from "lucide-react";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import { portfolioData } from "../../data/portfolioData";

export default function Certifications() {
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section
      id="certifications"
      ref={ref}
      className="relative py-24 px-6 bg-transparent border-t border-zinc-200/10 dark:border-zinc-800/20"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-xs font-bold font-mono tracking-widest text-blue-500 uppercase block mb-3">
            [ 05 / CERTIFICATIONS ]
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-white">
            Professional Accreditation
          </h2>
        </div>

        {/* Certifications list */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {portfolioData.certifications.map((cert) => (
            <motion.div
              key={cert.id}
              variants={itemVariants}
              className="p-6 rounded-2xl bg-zinc-100/40 dark:bg-zinc-900/30 border border-zinc-200/10 dark:border-zinc-800/80 backdrop-blur-md relative group overflow-hidden hover:border-blue-500/20 dark:hover:border-blue-500/20 transition-all duration-300"
              whileHover={{ y: -3 }}
            >
              <div className="flex items-start gap-4">
                {/* Icon wrapper */}
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:bg-blue-500/20 transition-all duration-300">
                  <Award className="w-5 h-5 text-blue-400" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white tracking-tight leading-snug group-hover:text-blue-400 transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 font-mono">
                    {cert.issuer}
                  </p>
                  
                  {/* Date badge */}
                  <div className="pt-2 flex items-center gap-1.5 text-[10px] font-mono text-zinc-400">
                    <Calendar className="w-3.5 h-3.5 text-zinc-600" />
                    <span>Issued: {cert.date}</span>
                    <span className="text-zinc-700">•</span>
                    <span className="text-emerald-500 flex items-center gap-0.5">
                      <CheckCircle className="w-3 h-3 text-emerald-500" /> Verifiable
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
