import { Home, ArrowLeft } from "lucide-react";
import { motion } from "motion/react";

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-[#09090B] flex flex-col items-center justify-center p-6 text-center overflow-hidden">
      {/* Decorative cosmic blurs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none animate-pulse" />
      <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Main Card */}
      <motion.div
        className="relative p-8 md:p-12 rounded-3xl bg-zinc-900/45 border border-zinc-800/80 backdrop-blur-md max-w-md w-full"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
      >
        <span className="text-[10px] font-bold font-mono tracking-widest text-blue-500 uppercase block mb-4">
          [ ERROR 404: COORDINATES NOT FOUND ]
        </span>
        
        {/* Massive 404 numbers */}
        <h1 className="text-7xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 leading-none mb-6">
          404
        </h1>

        <h2 className="text-xl font-bold text-white mb-3">
          Lost in Infinite Space
        </h2>

        <p className="text-sm text-zinc-400 leading-relaxed mb-8">
          The requested coordinate cluster is outside of Guruprasad's portfolio universe. Let's return you safely back to home base.
        </p>

        {/* Action button */}
        <motion.a
          href="/"
          className="px-6 py-3.5 rounded-xl bg-blue-600 text-white font-bold tracking-wider text-xs uppercase flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(59,130,246,0.3)] hover:bg-blue-500 transition-all cursor-pointer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Home className="w-4 h-4" />
          Back to Home Base
        </motion.a>
      </motion.div>
    </div>
  );
}
