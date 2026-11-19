import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import { Check, ArrowUpRight, BadgeIndianRupee } from "lucide-react";
import { portfolioData } from "../../data/portfolioData";

export default function Services() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 34 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section
      id="services"
      ref={ref}
      className="relative py-24 px-6 bg-transparent border-t border-slate-800/20"
    >
      {/* Ambient red glow */}
      <div className="absolute top-0 right-0 w-[30vw] h-[30vw] bg-amber-700/[0.06] blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <div className="mb-6">
          <span className="text-xs font-bold font-mono tracking-widest text-amber-500 uppercase block mb-3">
            [ 03 / SERVICES ]
          </span>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight uppercase text-white">
            Services &amp; Pricing
          </h2>
        </div>
        <p className="max-w-2xl text-sm sm:text-base text-slate-400 leading-relaxed mb-14">
          Freelance builds for local businesses and product teams. Fixed-price website
          packages with a 50% advance to start — no hidden charges, and you own the site.
        </p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {portfolioData.services.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              className={`relative flex flex-col rounded-2xl p-6 backdrop-blur-md border transition-all duration-300 hover:-translate-y-1.5 ${
                service.popular
                  ? "bg-slate-900/70 border-amber-500/50 shadow-[0_18px_45px_rgba(239,68,68,0.12)]"
                  : "bg-slate-900/30 border-slate-800/80 hover:border-amber-500/30"
              }`}
            >
              {service.popular && (
                <span className="absolute -top-3 left-6 px-2.5 py-0.5 rounded-full bg-amber-600 text-white text-[10px] font-bold font-mono tracking-widest uppercase">
                  Most Picked
                </span>
              )}

              <h3 className="text-lg font-bold text-white leading-tight mb-1.5">
                {service.name}
              </h3>
              <p className="text-sm text-slate-400 mb-5 flex-none">{service.tagline}</p>

              <div className="flex items-center gap-1.5 mb-6">
                <BadgeIndianRupee className="w-4 h-4 text-amber-400" />
                <span className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                  {service.price.replace(/^From /, "")}
                </span>
                {service.price.startsWith("From") && (
                  <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mt-1.5">onwards</span>
                )}
              </div>

              <ul className="space-y-2.5 mb-7 flex-grow">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-[13px] text-slate-300">
                    <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`mt-auto px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors ${
                  service.popular
                    ? "bg-amber-600 hover:bg-amber-500 text-white"
                    : "bg-slate-800/60 hover:bg-amber-600 text-white"
                }`}
              >
                Start a Project
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
