import React, { useEffect, useState } from "react";
import { Github, Linkedin, Mail, ArrowDown, FileText, ChevronRight, Sparkles, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { portfolioData } from "../../data/portfolioData";
import { profilePhotoDataUri } from "../../assets/profilePhoto";

const roles = [
  "Web Developer Trainee at Indegene",
  "AI Champion at Indegene",
  "React & MERN Stack Developer",
  "AEM Platform Specialist"
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
    const link = document.createElement('a');
    link.href = '/reume/Guruprasad_G.pdf';
    link.setAttribute('download', 'Guruprasad_G_Resume.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-28 pb-20 px-6 overflow-hidden hero-red-bg"
    >
      {/* Red abstract swirl + grid overlays */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 hero-red-swirl" />
        <div className="absolute inset-0 hero-grain" />
        <motion.div
          className="absolute -top-24 right-[8%] w-[420px] h-[420px] bg-red-600/25 rounded-full blur-[110px]"
          animate={{ x: [0, 30, -10, 0], y: [0, -40, 20, 0], scale: [1, 1.12, 0.95, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-10%] left-[-5%] w-[380px] h-[380px] bg-red-900/40 rounded-full blur-[100px]"
          animate={{ x: [0, -25, 35, 0], y: [0, 30, -20, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        {/* Giant outline watermark */}
        <span aria-hidden className="absolute -bottom-6 left-0 text-[22vw] leading-none font-black tracking-tighter text-stroke-red opacity-[0.07] select-none whitespace-nowrap">
          DEVELOPER
        </span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-14 items-center w-full">
        {/* Left: type block */}
        <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
          <motion.div
            className="mb-6 px-4 py-1.5 rounded-full bg-zinc-950/60 border border-red-500/30 backdrop-blur-md flex items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold tracking-wider text-zinc-300 font-mono">
              Currently Engineering at <span className="text-red-400 font-bold">{portfolioData.personalInfo.company}</span>
            </span>
          </motion.div>

          <motion.p
            className="text-sm md:text-base font-mono tracking-[0.35em] uppercase text-red-400 mb-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Hello, I am
          </motion.p>

          {/* Oversized name typography */}
          <motion.h1
            className="font-black tracking-tight leading-[0.9] mb-5 text-white"
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="block text-6xl sm:text-7xl md:text-8xl xl:text-[7.5rem]">GURUPRASAD</span>
            <span className="block text-6xl sm:text-7xl md:text-8xl xl:text-[7.5rem]">
              G<span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-red-600">.</span>
            </span>
          </motion.h1>

          {/* Fixed headline */}
          <motion.h2
            className="text-lg sm:text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-red-500 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.55 }}
          >
            {portfolioData.personalInfo.headline}
          </motion.h2>

          {/* Typewriter roles */}
          <motion.div
            className="h-8 text-base sm:text-xl font-medium text-zinc-400 mb-8 flex items-center gap-1.5 justify-center lg:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.65 }}
          >
            <span className="text-zinc-500 font-mono text-sm sm:text-base">&gt;</span>
            <span className="text-zinc-200 font-semibold">{roleText}</span>
            <span className="w-[3px] h-5 bg-red-500 animate-pulse inline-block" />
          </motion.div>

          <motion.p
            className="max-w-xl text-sm sm:text-base text-zinc-400 leading-relaxed mb-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.72 }}
          >
            Web Developer Trainee at Indegene building responsive HCP portals, reusable AEM
            components and full-stack MERN experiences — and an AI Champion helping teams
            ship faster with Copilot and GenAI workflows.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center gap-4 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.a
              href="#projects"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-red-600 text-white font-bold tracking-wider text-xs uppercase flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(239,68,68,0.35)] hover:bg-red-500 hover:shadow-[0_15px_35px_rgba(239,68,68,0.5)] transition-all duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              View Projects
              <ChevronRight className="w-4 h-4" />
            </motion.a>

            <motion.button
              onClick={handleDownloadResume}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl border border-zinc-800 bg-zinc-950/50 text-zinc-200 font-bold tracking-wider text-xs uppercase flex items-center justify-center gap-2 hover:bg-zinc-900 hover:border-red-500/40 transition-all duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <FileText className="w-4 h-4 text-red-400" />
              Download Resume
            </motion.button>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.95 }}
          >
            <motion.a
              href={portfolioData.personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-2xl border border-zinc-800 bg-zinc-950/50 text-zinc-400 hover:text-white flex items-center justify-center transition-colors hover:border-red-500/50"
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
              className="w-12 h-12 rounded-2xl border border-zinc-800 bg-zinc-950/50 text-zinc-400 hover:text-red-400 flex items-center justify-center transition-colors hover:border-red-500/50"
              whileHover={{ y: -4, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5" />
            </motion.a>
            <motion.a
              href={`mailto:${portfolioData.personalInfo.email}`}
              className="w-12 h-12 rounded-2xl border border-zinc-800 bg-zinc-950/50 text-zinc-400 hover:text-orange-400 flex items-center justify-center transition-colors hover:border-orange-500/50"
              whileHover={{ y: -4, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Email Address"
            >
              <Mail className="w-5 h-5" />
            </motion.a>
            <span className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-zinc-500 ml-2">
              <MapPin className="w-3.5 h-3.5 text-red-500" />
              {portfolioData.personalInfo.location}
            </span>
          </motion.div>
        </div>

        {/* Right: portrait */}
        <motion.div
          className="relative mx-auto w-full max-w-sm lg:max-w-md"
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
        >
          <div className="absolute -inset-6 bg-red-600/25 blur-[70px] rounded-full pointer-events-none" />
          <div className="animate-float-soft relative">
            <div className="relative rounded-[2rem] p-[2px] bg-gradient-to-br from-red-500 via-orange-500/60 to-red-900 shadow-[0_30px_80px_rgba(239,68,68,0.30)]">
              <img
                src={profilePhotoDataUri}
                alt="Guruprasad G"
                className="w-full aspect-[3/4] object-cover object-top rounded-[calc(2rem-2px)]"
              />
              <div className="absolute inset-0 rounded-[calc(2rem-2px)] bg-gradient-to-t from-[#0a0305]/70 via-transparent to-transparent" />
              {/* Name strip on photo */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <p className="text-white font-black text-lg leading-tight drop-shadow">Guruprasad G</p>
                  <p className="text-red-300 text-[11px] font-mono tracking-widest uppercase">Web Developer Trainee · Indegene</p>
                </div>
              </div>
            </div>
            {/* Floating badge */}
            <motion.div
              className="absolute -right-3 sm:-right-6 top-6 px-3.5 py-2.5 rounded-2xl bg-zinc-950/85 border border-red-500/40 backdrop-blur-md flex items-center gap-2 shadow-xl"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="w-4 h-4 text-orange-400" />
              <div className="leading-tight">
                <p className="text-[11px] font-bold text-white">AI Champion</p>
                <p className="text-[10px] text-zinc-400 font-mono">Indegene</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-7 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 text-zinc-500 hover:text-zinc-300 transition-colors z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
      >
        <span className="text-[10px] font-mono tracking-widest uppercase">Scroll Down</span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
      </motion.div>
    </section>
  );
}
