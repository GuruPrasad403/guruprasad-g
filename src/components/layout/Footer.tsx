import { useEffect, useState } from "react";
import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { portfolioData } from "../../data/portfolioData";

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-slate-950 dark:bg-[#09090B] border-t border-slate-200/5 dark:border-slate-800/20 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand/Monogram */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
            <span className="text-white text-sm font-extrabold font-sans">G</span>
          </div>
          <p className="text-xs text-slate-500 font-mono">
            &lt; Guruprasad G /&gt;
          </p>
        </div>

        {/* Copy text */}
        <p className="text-xs text-slate-600 dark:text-slate-500 text-center tracking-wide font-sans">
          &copy; {new Date().getFullYear()} Guruprasad G. Crafted with absolute precision. All rights reserved.
        </p>

        {/* Social Icons */}
        <div className="flex items-center gap-3">
          <motion.a
            href={portfolioData.personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-xl border border-slate-200/5 dark:border-slate-800/80 bg-slate-100/50 dark:bg-slate-900/40 text-slate-500 hover:text-white dark:hover:text-white flex items-center justify-center transition-colors hover:border-slate-400"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </motion.a>
          <motion.a
            href={portfolioData.personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-xl border border-slate-200/5 dark:border-slate-800/80 bg-slate-100/50 dark:bg-slate-900/40 text-slate-500 hover:text-violet-400 dark:hover:text-violet-400 flex items-center justify-center transition-colors hover:border-violet-500/50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </motion.a>
          <motion.a
            href={`mailto:${portfolioData.personalInfo.email}`}
            className="w-9 h-9 rounded-xl border border-slate-200/5 dark:border-slate-800/80 bg-slate-100/50 dark:bg-slate-900/40 text-slate-500 hover:text-violet-400 dark:hover:text-violet-400 flex items-center justify-center transition-colors hover:border-violet-500/50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Email Address"
          >
            <Mail className="w-4 h-4" />
          </motion.a>
        </div>
      </div>

      {/* Floating Back To Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            id="scroll-to-top"
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-30 w-11 h-11 rounded-full bg-violet-600 hover:bg-violet-500 border border-violet-400/20 text-white flex items-center justify-center shadow-[0_4px_20px_rgba(139, 92, 246,0.5)] transition-colors focus:outline-none"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
