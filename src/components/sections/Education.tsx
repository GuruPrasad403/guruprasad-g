import { useState } from "react";
import { GraduationCap, Calendar, Trophy, Users, Briefcase, ExternalLink, Github, Video, X, Award } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useInView } from "react-intersection-observer";
import Reveal3D from "../ui/Reveal3D";
import { portfolioData, Hackathon } from "../../data/portfolioData";

export default function Education() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="education"
      ref={ref}
      className="relative py-24 px-6 bg-transparent border-t border-slate-200/10 dark:border-slate-800/20"
    >
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Section Header */}
        <Reveal3D>
        <div>
          <span className="text-xs font-bold font-mono tracking-widest text-violet-500 uppercase block mb-3">
            [ 07 / ACADEMICS & HACKATHONS ]
          </span>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight uppercase text-slate-900 dark:text-white">
            Education &amp; Hackathon Achievements
          </h2>
        </div>
        </Reveal3D>

        {/* Elegant Academic & Work Card */}
        <motion.div
          initial={{ opacity: 0, y: 44, rotateX: -13, transformPerspective: 1100 }}
          animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="p-6 sm:p-8 rounded-2xl bg-slate-100/40 dark:bg-slate-900/30 border border-slate-200/10 dark:border-slate-800/80 backdrop-blur-md relative overflow-hidden space-y-6"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200/50 dark:border-slate-800/50">
            <div className="flex items-start gap-4">
              <div className="p-3.5 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400 shrink-0">
                <GraduationCap className="w-6 h-6 text-violet-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
                  {portfolioData.education.degree}
                </h3>
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 font-mono">
                  {portfolioData.education.institution}
                </p>
              </div>
            </div>

            <div className="px-3.5 py-1.5 rounded-xl bg-slate-200/60 dark:bg-slate-800/60 border border-slate-200/10 dark:border-slate-700/50 flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-400 shrink-0 w-fit">
              <Calendar className="w-4 h-4 text-violet-500" />
              {portfolioData.education.period}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Concurrent Work */}
            <div className="p-5 rounded-xl bg-violet-500/5 border border-violet-500/15 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold font-mono text-violet-400 uppercase tracking-wider">
                <Briefcase className="w-4 h-4 text-violet-400" />
                <span>Concurrent Professional Career</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {portfolioData.education.concurrentWork}
              </p>
            </div>

            {/* Event Coordination */}
            <div className="p-5 rounded-xl bg-slate-800/30 border border-slate-700/40 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold font-mono text-slate-300 uppercase tracking-wider">
                <Users className="w-4 h-4 text-violet-400" />
                <span>Event Coordination &amp; Leadership</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {portfolioData.education.campusActivities}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Hackathons Showcase */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-violet-400" />
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Hackathon Competitions &amp; Recognitions
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {portfolioData.education.hackathons.map((hack: Hackathon) => (
              <motion.div
                key={hack.id}
                initial={{ opacity: 0, y: 36, rotateX: -12, transformPerspective: 1100 }}
                animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="p-6 rounded-2xl bg-slate-100/40 dark:bg-slate-900/30 border border-slate-200/10 dark:border-slate-800/80 backdrop-blur-md flex flex-col justify-between space-y-4 hover:border-violet-500/30 transition-all duration-300 group"
              >
                <div className="space-y-3">
                  {/* Photo thumbnail if present */}
                  {hack.image && (
                    <div 
                      onClick={() => setSelectedImage(hack.image!)}
                      className="relative aspect-video rounded-xl overflow-hidden border border-slate-800/60 cursor-pointer group-hover:border-violet-500/40 transition-all"
                    >
                      <img 
                        src={hack.image} 
                        alt={hack.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-mono font-bold gap-1">
                        <Award className="w-4 h-4 text-violet-400" />
                        View Event Showcase
                      </div>
                    </div>
                  )}

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-violet-400 block font-bold">
                      {hack.location}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white leading-snug group-hover:text-violet-400 transition-colors">
                      {hack.title}
                    </h4>
                  </div>

                  {/* Result & Prize Badges */}
                  <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 items-start">
                    <span className="w-full sm:w-auto px-2.5 py-1 rounded-md bg-violet-500/15 border border-violet-500/30 text-violet-400 text-xs font-bold font-mono flex items-center justify-start gap-1">
                      <Trophy className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                      <span>{hack.result}</span>
                    </span>
                    {hack.prize && (
                      <span className="w-full sm:w-auto px-2.5 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-mono text-left">
                        {hack.prize}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                    {hack.description}
                  </p>
                </div>

                {/* External links */}
                <div className="pt-3 border-t border-slate-200/30 dark:border-slate-800/50 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                  {hack.videoUrl && (
                    <a
                      href={hack.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-3 py-2 rounded-lg bg-violet-600/10 hover:bg-violet-600 text-violet-400 hover:text-white border border-violet-500/20 text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Video className="w-3.5 h-3.5" />
                      Watch Video Demo
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}

                  {hack.githubUrl && (
                    <a
                      href={hack.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-3 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-slate-300 border border-slate-700/50 text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Github className="w-3.5 h-3.5 text-slate-400" />
                      {hack.id === "hack1" ? "SYC Frontend Code" : "Vidyaloop Repo"}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Image Modal Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative max-w-3xl max-h-[90vh] rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2 bg-slate-950/70 hover:bg-slate-950 border border-slate-700 text-white rounded-full z-10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <img src={selectedImage} alt="Hackathon Runner Up Award" className="w-full h-auto max-h-[85vh] object-contain" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
