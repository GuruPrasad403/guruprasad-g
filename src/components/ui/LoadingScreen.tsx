import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const loadingSteps = [
  "Initializing systems...",
  "Retrieving credentials...",
  "Loading portfolio data...",
  "Compiling React components...",
  "Styling with Tailwind CSS...",
  "Rendering 3D viewport...",
  "Optimizing for recruiters..."
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Fast intro — full run ≈ 1.2s; a tap/click skips straight to 100%.
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        const inc = Math.floor(Math.random() * 9) + 9;
        return Math.min(prev + inc, 100);
      });
    }, 55);

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    // Advance steps based on progress
    const stepRatio = 100 / loadingSteps.length;
    const nextStep = Math.min(
      Math.floor(progress / stepRatio),
      loadingSteps.length - 1
    );
    if (nextStep !== stepIndex) {
      setStepIndex(nextStep);
    }

    if (progress === 100) {
      const timeout = setTimeout(() => {
        setVisible(false);
        // Wait for exit transition to complete
        setTimeout(onComplete, 450);
      }, 220);
      return () => clearTimeout(timeout);
    }
  }, [progress, stepIndex, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          id="loading-screen"
          onClick={() => setProgress(100)}
          className="fixed inset-0 bg-[#05050c] z-50 flex flex-col items-center justify-center p-6 cursor-pointer"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.45, ease: [0.6, 0.01, -0.05, 0.95] }}
        >
          {/* Ambient Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-violet-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-violet-500/5 rounded-full blur-[70px] pointer-events-none" />

          {/* Central Logo Monogram Container */}
          <div className="relative mb-12 flex items-center justify-center">
            <motion.div
              className="w-20 h-20 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-center relative overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {/* Inner animated border glow */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-violet-500/20 to-violet-700/10 opacity-0"
                animate={{ opacity: [0.2, 0.6, 0.2] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              
              <span className="text-3xl font-extrabold text-white tracking-widest relative z-10 font-sans">
                G
              </span>
            </motion.div>

            {/* Orbiting Ring */}
            <motion.div
              className="absolute w-24 h-24 border border-dashed border-violet-500/30 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <p className="text-sm font-black tracking-[0.3em] uppercase text-white mb-10 -mt-6">
            Guruprasad <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">G</span>
          </p>

          {/* Progress and Logging Information */}
          <div className="w-full max-w-sm flex flex-col items-center">
            {/* Percentage Indicator */}
            <motion.div 
              className="text-4xl font-extrabold tracking-tighter text-white mb-2 font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {progress}%
            </motion.div>

            {/* Simulated Log Line */}
            <AnimatePresence mode="wait">
              <motion.div
                key={stepIndex}
                className="text-slate-400 text-xs font-mono mb-6 h-4 text-center tracking-wide"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                &gt; {loadingSteps[stepIndex]}
              </motion.div>
            </AnimatePresence>

            {/* Outer Progress bar */}
            <div className="w-full h-[3px] bg-slate-900 rounded-full overflow-hidden relative border border-slate-800/20">
              <motion.div
                className="h-full bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-400 rounded-full shadow-[0_0_8px_rgba(139, 92, 246,0.5)]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
