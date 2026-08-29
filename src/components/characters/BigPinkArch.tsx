import React from 'react';
import { motion } from 'framer-motion';
import { Eye } from './Eye';
import { GazePosition, MascotMood } from '../../types/mascot';
import { sound } from '../../utils/sound';

interface BigPinkArchProps {
  gaze: GazePosition;
  isBlinking: boolean;
  mood: MascotMood;
}

export const BigPinkArch: React.FC<BigPinkArchProps> = ({
  gaze,
  isBlinking,
  mood,
}) => {
  const isShy = mood === 'shy-password';
  const isCelebrating = mood === 'celebrating';

  return (
    <motion.g
      className="cursor-pointer"
      initial={false}
      animate={{
        scaleY: isCelebrating ? [1, 1.06, 0.96, 1] : [1, 1.02, 1],
        x: isShy ? -10 : 0,
        rotate: isShy ? -4 : 0,
        originY: '420px',
        originX: '270px',
      }}
      transition={{
        scaleY: isCelebrating
          ? { repeat: Infinity, duration: 0.5, ease: 'easeInOut' }
          : { repeat: Infinity, duration: 4.8, ease: 'easeInOut' },
        x: { type: 'spring', damping: 16, stiffness: 160 },
        rotate: { type: 'spring', damping: 16, stiffness: 160 },
      }}
      whileHover={{
        scale: 1.03,
        transition: { type: 'spring', damping: 14, stiffness: 280 },
      }}
      whileTap={{ scale: 0.97 }}
      onClick={() => sound.playGiggle()}
    >
      {/* Big Arch / Dome Body */}
      <path
        d="M 190 420 L 190 250 C 190 180, 356 180, 356 280 L 356 420 Z"
        fill="#FFA7C4"
      />

      {/* Giant Single Cyclops Eye */}
      <Eye
        cx={250}
        cy={232}
        r={28}
        gaze={gaze}
        isBlinking={isBlinking}
        pupilRatio={0.58}
        maxOffset={15}
        isCovered={isShy}
      />

      {/* Cute Open Mouth on Front of Dome */}
      <g>
        {/* Inner Dark Mouth */}
        <ellipse
          cx="302"
          cy="282"
          rx="15"
          ry="13"
          fill="#8E3557"
        />
        {/* Two Cute White Teeth pointing down from top of mouth */}
        <rect x="295" y="271" width="5.5" height="7.5" rx="2.5" fill="#FFFFFF" />
        <rect x="302.5" y="271" width="5.5" height="7.5" rx="2.5" fill="#FFFFFF" />
      </g>
    </motion.g>
  );
};
