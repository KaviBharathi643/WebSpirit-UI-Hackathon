import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PinkCreature } from './characters/PinkCreature';
import { BigPinkArch } from './characters/BigPinkArch';
import { TealCloud } from './characters/TealCloud';
import { BlueBlob } from './characters/BlueBlob';
import { MascotMood } from '../types/mascot';
import { useMascotGaze } from '../hooks/useMascotGaze';
import { sound } from '../utils/sound';
import { Sparkles, EyeOff } from 'lucide-react';

interface MascotSceneProps {
  mood: MascotMood;
}

export const MascotScene: React.FC<MascotSceneProps> = ({ mood }) => {
  const { gaze, isBlinking } = useMascotGaze(mood);

  // Play soft raindrop landing pops on initial drop
  useEffect(() => {
    const t1 = setTimeout(() => sound.playPop(520), 240);
    const t2 = setTimeout(() => sound.playPop(600), 380);
    const t3 = setTimeout(() => sound.playPop(680), 520);
    const t4 = setTimeout(() => sound.playPop(780), 660);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[380px] lg:min-h-[500px] flex items-center justify-center p-4 select-none overflow-hidden">
      {/* Mood Feedback Overlays / Speech Badges */}
      <AnimatePresence>
        {mood === 'watching-email' && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-6 left-8 z-20 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm text-xs font-semibold text-gray-700 flex items-center gap-1.5 border border-gray-100"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            Watching you type... 👀
          </motion.div>
        )}

        {mood === 'shy-password' && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-6 left-8 z-20 bg-pink-100/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm text-xs font-semibold text-pink-700 flex items-center gap-1.5 border border-pink-200"
          >
            <EyeOff className="w-3.5 h-3.5 text-pink-500" />
            No peeking! 🙈
          </motion.div>
        )}

        {mood === 'celebrating' && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: [0, 1.2, 1] }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute top-6 left-8 z-20 bg-emerald-100 text-emerald-800 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-md flex items-center gap-1.5 border border-emerald-200"
          >
            <Sparkles className="w-4 h-4 text-emerald-600 animate-spin" />
            Yay! Welcome back! 🎉
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Vector SVG Stage */}
      <svg
        viewBox="45 80 330 360"
        className="w-full h-full max-h-[500px] lg:max-h-[640px] max-w-[620px] object-contain drop-shadow-sm transition-transform duration-300 overflow-visible"
      >
        {/* Definitions / Gradients */}
        <defs>
          <radialGradient id="stageGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#E9EBEF" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Subtle Stage Glow */}
        <circle cx="210" cy="280" r="160" fill="url(#stageGlow)" />

        {/* 1. Tall Pink Creature (Back-Left) - Raindrop drop-in */}
        <motion.g
          initial={{ y: -420, opacity: 0, scaleY: 1.28, scaleX: 0.82 }}
          animate={{ y: 0, opacity: 1, scaleY: 1, scaleX: 1 }}
          transition={{
            y: { type: 'spring', damping: 13, stiffness: 140, mass: 1.1, delay: 0.1 },
            scaleY: { type: 'spring', damping: 12, stiffness: 200, delay: 0.1 },
            scaleX: { type: 'spring', damping: 12, stiffness: 200, delay: 0.1 },
            opacity: { duration: 0.25, delay: 0.1 },
          }}
        >
          <PinkCreature gaze={gaze} isBlinking={isBlinking} mood={mood} />
        </motion.g>

        {/* 2. Giant Pink Arch Creature (Back-Right) - Raindrop drop-in */}
        <motion.g
          initial={{ y: -440, opacity: 0, scaleY: 1.25, scaleX: 0.85 }}
          animate={{ y: 0, opacity: 1, scaleY: 1, scaleX: 1 }}
          transition={{
            y: { type: 'spring', damping: 14, stiffness: 130, mass: 1.2, delay: 0.22 },
            scaleY: { type: 'spring', damping: 12, stiffness: 200, delay: 0.22 },
            scaleX: { type: 'spring', damping: 12, stiffness: 200, delay: 0.22 },
            opacity: { duration: 0.25, delay: 0.22 },
          }}
        >
          <BigPinkArch gaze={gaze} isBlinking={isBlinking} mood={mood} />
        </motion.g>

        {/* 3. Mint/Teal Cloud Creature (Front-Left) - Raindrop drop-in */}
        <motion.g
          initial={{ y: -450, opacity: 0, scaleY: 1.3, scaleX: 0.8 }}
          animate={{ y: 0, opacity: 1, scaleY: 1, scaleX: 1 }}
          transition={{
            y: { type: 'spring', damping: 12, stiffness: 150, mass: 1.0, delay: 0.35 },
            scaleY: { type: 'spring', damping: 11, stiffness: 220, delay: 0.35 },
            scaleX: { type: 'spring', damping: 11, stiffness: 220, delay: 0.35 },
            opacity: { duration: 0.25, delay: 0.35 },
          }}
        >
          <TealCloud gaze={gaze} isBlinking={isBlinking} mood={mood} />
        </motion.g>

        {/* 4. Bright Blue Blob Creature (Front-Right) - Raindrop drop-in */}
        <motion.g
          initial={{ y: -460, opacity: 0, scaleY: 1.32, scaleX: 0.78 }}
          animate={{ y: 0, opacity: 1, scaleY: 1, scaleX: 1 }}
          transition={{
            y: { type: 'spring', damping: 13, stiffness: 160, mass: 0.9, delay: 0.48 },
            scaleY: { type: 'spring', damping: 11, stiffness: 240, delay: 0.48 },
            scaleX: { type: 'spring', damping: 11, stiffness: 240, delay: 0.48 },
            opacity: { duration: 0.25, delay: 0.48 },
          }}
        >
          <BlueBlob gaze={gaze} isBlinking={isBlinking} mood={mood} />
        </motion.g>
      </svg>


    </div>
  );
};
