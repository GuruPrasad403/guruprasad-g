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
    // Increment progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Random increments for a realistic feel
        const inc = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + inc, 100);
      });
    }, 80);

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
        setTimeout(onComplete, 600);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [progress, stepIndex, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          id="loading-screen"
          className="fixed inset-0 bg-[#09090B] z-50 flex flex-col items-center justify-center p-6"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.6, ease: [0.6, 0.01, -0.05, 0.95] }}
        >
          {/* Ambient Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-cyan-500/5 rounded-full blur-[70px] pointer-events-none" />

          {/* Central Logo Monogram Container */}
          <div className="relative mb-12 flex items-center justify-center">
            <motion.div
              className="w-20 h-20 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 flex items-center justify-center relative overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {/* Inner animated border glow */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 opacity-0"
                animate={{ opacity: [0.2, 0.6, 0.2] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              
              <span className="text-3xl font-extrabold text-white tracking-widest relative z-10 font-sans">
                G
              </span>
            </motion.div>

            {/* Orbiting Ring */}
            <motion.div
              className="absolute w-24 h-24 border border-dashed border-blue-500/30 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
          </div>

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
                className="text-zinc-400 text-xs font-mono mb-6 h-4 text-center tracking-wide"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                &gt; {loadingSteps[stepIndex]}
              </motion.div>
            </AnimatePresence>

            {/* Outer Progress bar */}
            <div className="w-full h-[3px] bg-zinc-900 rounded-full overflow-hidden relative border border-zinc-800/20">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]"
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
