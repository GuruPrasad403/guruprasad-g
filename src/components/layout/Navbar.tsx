import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "Projects", href: "#projects" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
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
    };

    window.addEventListener("scroll", handleScroll);

    // Precise IntersectionObserver for section highlighting
    const sections = navLinks.map(link => link.href.substring(1));
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0
    });

    sections.forEach((sectionId) => {
      const el = document.getElementById(sectionId);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <motion.header
      id="main-navbar"
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
        isScrolled
          ? "bg-slate-950/75 dark:bg-[#09090B]/85 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.1)] border-b border-slate-200/5 dark:border-slate-800/20 py-3"
          : "bg-transparent py-5"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Scroll Progress Bar */}
      <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-amber-500 to-amber-700 z-50 transition-all duration-75" style={{ width: `${scrollProgress}%` }} />

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
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center group-hover:border-amber-500/50 transition-all duration-300">
            <span className="text-white text-base font-extrabold tracking-wider font-sans group-hover:text-amber-400 transition-colors">
              G
            </span>
          </div>
          <span className="text-sm font-bold tracking-wider text-slate-900 dark:text-white uppercase group-hover:text-amber-400 transition-colors">
            Guruprasad G
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-full bg-slate-100/40 dark:bg-slate-900/40 border border-slate-200/5 dark:border-slate-800/40 backdrop-blur-md">
          {navLinks.map((link) => {
            const isTargetActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                className={`relative px-4 py-2 text-xs font-semibold uppercase tracking-widest rounded-full transition-all duration-300 ${
                  isTargetActive
                    ? "text-white"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {isTargetActive && (
                  <motion.span
                    layoutId="activeNavTab"
                    className="absolute inset-0 bg-amber-600 rounded-full shadow-[0_2px_10px_rgba(245,158,11,0.4)]"
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
          <motion.a
            href="#contact"
            className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-white bg-slate-900 dark:bg-slate-800/60 hover:bg-amber-600 dark:hover:bg-amber-600 border border-slate-200/10 dark:border-slate-800/80 rounded-xl flex items-center gap-1.5 group transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_20px_rgba(245,158,11,0.3)]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Hire Me
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.a>
        </div>

        {/* Mobile Menu Controls */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl border border-slate-200/10 dark:border-slate-800/80 bg-slate-100/50 dark:bg-slate-900/40 backdrop-blur-md text-slate-600 dark:text-slate-400"
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
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden fixed top-[65px] left-0 w-full h-[calc(100vh-65px)] bg-slate-950/95 dark:bg-[#09090B]/95 backdrop-blur-2xl border-b border-slate-800/50 z-50 overflow-y-auto"
          >
            <div className="px-6 py-8 flex flex-col gap-3 min-h-full pb-20">
              {navLinks.map((link) => {
                const isTargetActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setMobileMenuOpen(false);
                      const targetId = link.href.substring(1);
                      const el = document.getElementById(targetId);
                      if (el) {
                        const offset = 80;
                        const bodyRect = document.body.getBoundingClientRect().top;
                        const elementRect = el.getBoundingClientRect().top;
                        const elementPosition = elementRect - bodyRect;
                        const offsetPosition = elementPosition - offset;
                        window.scrollTo({
                          top: offsetPosition,
                          behavior: "smooth"
                        });
                      }
                    }}
                    className={`py-3.5 px-5 rounded-2xl text-base font-bold tracking-wider uppercase transition-all flex items-center justify-between ${
                      isTargetActive
                        ? "bg-amber-600/20 text-amber-400 border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.15)]"
                        : "text-slate-400 hover:text-white bg-slate-900/40 border border-slate-800/40"
                    }`}
                  >
                    <span>{link.name}</span>
                    <div className={`w-2 h-2 rounded-full ${isTargetActive ? "bg-amber-400 shadow-[0_0_8px_#60A5FA]" : "bg-slate-800"}`} />
                  </a>
                );
              })}
              <motion.a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  const el = document.getElementById("contact");
                  if (el) {
                    const offset = 80;
                    const bodyRect = document.body.getBoundingClientRect().top;
                    const elementRect = el.getBoundingClientRect().top;
                    const elementPosition = elementRect - bodyRect;
                    const offsetPosition = elementPosition - offset;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: "smooth"
                    });
                  }
                }}
                className="mt-6 py-4 text-center text-xs font-bold uppercase tracking-widest text-white bg-amber-600 hover:bg-amber-500 rounded-2xl flex items-center justify-center gap-2 shadow-[0_10px_25px_rgba(245,158,11,0.3)] transition-all"
                whileTap={{ scale: 0.98 }}
              >
                Hire Me
                <ArrowUpRight className="w-4 h-4" />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
