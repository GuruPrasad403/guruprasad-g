import React, { useEffect, useState } from "react";
import { Github, Linkedin, Mail, ArrowDown, FileText, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { portfolioData } from "../../data/portfolioData";

const roles = [
  "Junior Software Engineer",
  "React & TypeScript Dev",
  "AEM Specialist",
  "UI/UX Enthusiast"
];

export default function Hero() {
  const [roleText, setRoleText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const handleTyping = () => {
      const currentFullText = roles[roleIndex];
      if (!isDeleting) {
        setRoleText(currentFullText.substring(0, roleText.length + 1));
        setTypingSpeed(100);

        if (roleText === currentFullText) {
          // Pause at the end of typing
          timer = setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
      } else {
        setRoleText(currentFullText.substring(0, roleText.length - 1));
        setTypingSpeed(50);

        if (roleText === "") {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }

      timer = setTimeout(handleTyping, typingSpeed);
    };

    timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [roleText, isDeleting, roleIndex, typingSpeed]);

  const handleDownloadResume = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
  e.preventDefault();

  // 1. Define the actual file path and the default saved file name
  const filePath = "../../../reume/Guruprasad_G_Junior_softwar_engineer.pdf"; 
  const fileName = "Chandu_Resume.pdf"; // Change extension if it is a .docx or image

  // 2. Create a temporary invisible link element
  const link = document.createElement('a');
  link.style.display = 'none';
  link.href = filePath;
  
  // 3. Force the browser to download instead of opening
  link.setAttribute('download', fileName);
  
  // 4. Append, trigger click, and clean up the DOM
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-6 overflow-hidden bg-[#09090B]"
    >
      {/* Immersive Floating Background Blobs with Smooth Swaying Motion */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[350px] md:w-[500px] h-[350px] md:h-[500px] bg-blue-600/10 dark:bg-blue-600/10 rounded-full blur-[100px]"
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -60, 40, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-cyan-600/10 dark:bg-cyan-600/5 rounded-full blur-[90px]"
          animate={{
            x: [0, -30, 50, 0],
            y: [0, 50, -30, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
        {/* Company Pill */}
        <motion.div
          className="mb-6 px-4 py-1.5 rounded-full bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md flex items-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold tracking-wider text-zinc-400 font-mono">
            Currently Engineering at <span className="text-blue-400 font-bold">{portfolioData.personalInfo.company}</span>
          </span>
        </motion.div>

        {/* Big Heading Greeting */}
        <motion.h1
          className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-none mb-6 text-zinc-900 dark:text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Guruprasad G
        </motion.h1>

        {/* Subtitle Roles with Typing Cursor */}
        <motion.div
          className="h-10 text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-zinc-600 dark:text-zinc-400 mb-10 flex items-center gap-1.5 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <span>I am a</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 font-bold">
            {roleText}
          </span>
          <span className="w-[3px] h-6 bg-blue-500 animate-pulse inline-block" />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4 mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {/* Main button - View projects */}
          <motion.a
            href="#projects"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-blue-600 text-white font-bold tracking-wider text-xs uppercase flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(59,130,246,0.3)] hover:bg-blue-500 hover:shadow-[0_15px_35px_rgba(59,130,246,0.45)] transition-all duration-300"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            View Projects
            <ChevronRight className="w-4 h-4" />
          </motion.a>

          {/* Secondary button - Download Resume */}
          <motion.button
            onClick={handleDownloadResume}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl border border-zinc-200/10 dark:border-zinc-800/80 bg-zinc-100/50 dark:bg-zinc-900/40 text-zinc-900 dark:text-zinc-300 font-bold tracking-wider text-xs uppercase flex items-center justify-center gap-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all duration-300"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <FileText className="w-4 h-4 text-blue-400" />
            Print Resume
          </motion.button>
        </motion.div>

        {/* Social Icons Grid */}
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <motion.a
            href={portfolioData.personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-2xl border border-zinc-200/10 dark:border-zinc-800/80 bg-zinc-100/50 dark:bg-zinc-900/40 text-zinc-500 hover:text-white dark:hover:text-white flex items-center justify-center transition-colors hover:border-zinc-400"
            whileHover={{ y: -4, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="GitHub Profile"
          >
            <Github className="w-5 h-5" />
          </motion.a>
          <motion.a
            href={portfolioData.personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-2xl border border-zinc-200/10 dark:border-zinc-800/80 bg-zinc-100/50 dark:bg-zinc-900/40 text-zinc-500 hover:text-blue-400 dark:hover:text-blue-400 flex items-center justify-center transition-colors hover:border-blue-500/50"
            whileHover={{ y: -4, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-5 h-5" />
          </motion.a>
          <motion.a
            href={`mailto:${portfolioData.personalInfo.email}`}
            className="w-12 h-12 rounded-2xl border border-zinc-200/10 dark:border-zinc-800/80 bg-zinc-100/50 dark:bg-zinc-900/40 text-zinc-500 hover:text-cyan-400 dark:hover:text-cyan-400 flex items-center justify-center transition-colors hover:border-cyan-500/50"
            whileHover={{ y: -4, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Email Address"
          >
            <Mail className="w-5 h-5" />
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-zinc-500 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        >
          <span className="text-[10px] font-mono tracking-widest uppercase">Scroll Down</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}
