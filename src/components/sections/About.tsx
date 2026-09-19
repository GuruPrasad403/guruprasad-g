import { Award, Briefcase, Calendar, GraduationCap, Flame } from "lucide-react";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import { portfolioData } from "../../data/portfolioData";

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  const stats = [
    { label: "Years of Experience", value: `${portfolioData.personalInfo.yearsOfExperience}+`, icon: Calendar },
    { label: "Current Company", value: portfolioData.personalInfo.company, icon: Briefcase },
    { label: "Leadership Role", value: "Backup POD Lead", icon: Award },
    { label: "Primary Field", value: "Computer Science", icon: GraduationCap },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 px-6 bg-transparent border-t border-zinc-200/10 dark:border-zinc-800/20"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-xs font-bold font-mono tracking-widest text-blue-500 uppercase block mb-3">
            [ 01 / ABOUT ME ]
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-white">
            Professional Summary
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
        >
          {/* Bio Column */}
          <div className="lg:col-span-7 space-y-6">
            <motion.p
              variants={itemVariants}
              className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans"
            >
              {portfolioData.personalInfo.bio}
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed"
            >
              Beyond core software engineering in React.js, AEM, and Node.js, I take pride in bridging AI tools with day-to-day work tasks. As an appointed <strong className="text-blue-500 dark:text-blue-400 font-semibold">AI Champion at Indegene</strong>, I closely collaborate with team leads and team members to analyze daily operational friction points, recommend tailored AI solutions (GitHub Copilot, ROVO), and streamline access and permissions across internal departments.
            </motion.p>

            {/* AI Champion Leadership Spotlight Card */}
            <motion.div
              variants={itemVariants}
              className="p-6 rounded-2xl bg-zinc-100/50 dark:bg-zinc-900/30 border border-zinc-200/10 dark:border-zinc-800/80 backdrop-blur-md relative overflow-hidden"
            >
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-500 shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-white mb-2 flex items-center gap-1.5 font-mono">
                    AI Champion &amp; Team Enablement
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    Appointed as <strong className="text-blue-500 dark:text-blue-400">AI Champion</strong> at Indegene alongside core Web Development responsibilities. Engaged monthly with groups of <strong className="text-blue-500 dark:text-blue-400">30+ employees</strong> to evaluate daily workflows, conduct AI tool demonstrations, match practical Copilot/ROVO capabilities to engineering tasks, and coordinate permissions with IT to drive measurable efficiency gains across the organization.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Professional Growth Callout */}
            <motion.div
              variants={itemVariants}
              className="p-6 rounded-2xl bg-zinc-100/50 dark:bg-zinc-900/30 border border-zinc-200/10 dark:border-zinc-800/80 backdrop-blur-md relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shrink-0">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-white mb-2 flex items-center gap-1.5 font-mono">
                    Career Milestone &amp; Ownership
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    Successfully converted from <strong className="text-cyan-500 dark:text-cyan-400">Web Developer Apprentice/Trainee to full-time Software Engineer</strong> at Indegene through consistent quality output, rapid debugging, enterprise AEM component delivery, and strong peer collaboration.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats Grid Column */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  className="p-5 rounded-2xl bg-zinc-100/40 dark:bg-zinc-900/40 border border-zinc-200/10 dark:border-zinc-800/80 backdrop-blur-md hover:border-blue-500/30 transition-colors duration-300 relative group overflow-hidden"
                  whileHover={{ y: -4 }}
                >
                  <div className="absolute -right-2 -bottom-2 opacity-5 text-zinc-400 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-24 h-24" />
                  </div>
                  <div className="p-2.5 rounded-xl bg-zinc-200/50 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-400 w-fit mb-4 border border-zinc-200/10 dark:border-zinc-700/50">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
