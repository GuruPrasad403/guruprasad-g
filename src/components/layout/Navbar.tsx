import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ThemeToggle from "../ui/ThemeToggle";

const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" }
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Scrolled state
      setIsScrolled(window.scrollY > 20);

      // Scroll progress
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }

      // Active section detection
      const scrollPosition = window.scrollY + 150;
      const sections = navLinks.map(link => link.href.substring(1));
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      id="main-navbar"
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
        isScrolled
          ? "bg-zinc-950/75 dark:bg-[#09090B]/85 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.1)] border-b border-zinc-200/5 dark:border-zinc-800/20 py-3"
          : "bg-transparent py-5"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Scroll Progress Bar */}
      <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-500 to-cyan-400 z-50 transition-all duration-75" style={{ width: `${scrollProgress}%` }} />

      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          className="flex items-center gap-2.5 group"
          onClick={() => {
            setMobileMenuOpen(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:border-blue-500/50 transition-all duration-300">
            <span className="text-white text-base font-extrabold tracking-wider font-sans group-hover:text-blue-400 transition-colors">
              G
            </span>
          </div>
          <span className="text-sm font-bold tracking-wider text-zinc-900 dark:text-white uppercase group-hover:text-blue-400 transition-colors">
            Guruprasad G
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-full bg-zinc-100/40 dark:bg-zinc-900/40 border border-zinc-200/5 dark:border-zinc-800/40 backdrop-blur-md">
          {navLinks.map((link) => {
            const isTargetActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                className={`relative px-4 py-2 text-xs font-semibold uppercase tracking-widest rounded-full transition-all duration-300 ${
                  isTargetActive
                    ? "text-white"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                {isTargetActive && (
                  <motion.span
                    layoutId="activeNavTab"
                    className="absolute inset-0 bg-blue-600 rounded-full shadow-[0_2px_10px_rgba(59,130,246,0.4)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <motion.a
            href="#contact"
            className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-white bg-zinc-900 dark:bg-zinc-800/60 hover:bg-blue-600 dark:hover:bg-blue-600 border border-zinc-200/10 dark:border-zinc-800/80 rounded-xl flex items-center gap-1.5 group transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_20px_rgba(59,130,246,0.3)]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Hire Me
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.a>
        </div>

        {/* Mobile Menu Controls */}
        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl border border-zinc-200/10 dark:border-zinc-800/80 bg-zinc-100/50 dark:bg-zinc-900/40 backdrop-blur-md text-zinc-600 dark:text-zinc-400"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-full left-0 w-full bg-zinc-950 dark:bg-[#09090B] border-b border-zinc-200/5 dark:border-zinc-800/40 backdrop-blur-xl"
          >
            <div className="px-6 py-8 flex flex-col gap-4">
              {navLinks.map((link) => {
                const isTargetActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`py-2 px-4 rounded-xl text-sm font-semibold tracking-wider uppercase transition-colors flex items-center justify-between ${
                      isTargetActive
                        ? "bg-blue-600/15 text-blue-400 border border-blue-500/20"
                        : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                    }`}
                  >
                    <span>{link.name}</span>
                    <div className={`w-1.5 h-1.5 rounded-full ${isTargetActive ? "bg-blue-400" : "bg-transparent"}`} />
                  </a>
                );
              })}
              <motion.a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 py-3 text-center text-xs font-bold uppercase tracking-widest text-white bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center justify-center gap-1.5 transition-all"
                whileTap={{ scale: 0.98 }}
              >
                Hire Me
                <ArrowUpRight className="w-3.5 h-3.5" />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
