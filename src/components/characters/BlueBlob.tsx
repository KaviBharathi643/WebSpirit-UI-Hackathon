import React from 'react';
import { motion } from 'framer-motion';
import { Eye } from './Eye';
import { GazePosition, MascotMood } from '../../types/mascot';
import { sound } from '../../utils/sound';

interface BlueBlobProps {
  gaze: GazePosition;
  isBlinking: boolean;
  mood: MascotMood;
}

export const BlueBlob: React.FC<BlueBlobProps> = ({
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
        y: isCelebrating ? [-10, -32, -10] : [0, -8, 0],
        scaleY: isCelebrating ? [1, 1.12, 0.92, 1] : [1, 1.03, 0.98, 1],
        x: isShy ? -14 : 0,
        rotate: isShy ? -7 : 0,
        originX: '246px',
        originY: '420px',
      }}
      transition={{
        y: isCelebrating
          ? { repeat: Infinity, duration: 0.5, ease: 'easeInOut' }
          : { repeat: Infinity, duration: 3.8, ease: 'easeInOut', delay: 0.2 },
        scaleY: isCelebrating
          ? { repeat: Infinity, duration: 0.5, ease: 'easeInOut' }
          : { repeat: Infinity, duration: 3.8, ease: 'easeInOut', delay: 0.2 },
        x: { type: 'spring', damping: 15, stiffness: 160 },
        rotate: { type: 'spring', damping: 15, stiffness: 160 },
      }}
      whileHover={{
        scale: 1.06,
        y: -12,
        transition: { type: 'spring', damping: 10, stiffness: 350 },
      }}
      whileTap={{ scale: 0.92 }}
      onClick={() => sound.playPop(720)}
    >
      {/* Two Straight Blue Legs */}
      <path
        d="M 204 360 L 195 420 L 212 420 L 222 360 Z"
        fill="#2B83F6"
      />
      <path
        d="M 244 360 L 244 420 L 261 420 L 261 360 Z"
        fill="#2B83F6"
      />

      {/* Main Smooth Rounded Dome / Blob Body */}
      <ellipse
        cx="246"
        cy="332"
        rx="51"
        ry="49"
        fill="#2B83F6"
      />

      {/* Small Round Open Mouth on Lower-Right */}
      <g>
        <circle
          cx="283"
          cy="342"
          r="9.5"
          fill="#0D4DB0"
        />
        {/* Tiny White Tooth hanging from top */}
        <path
          d="M 280 333 C 280 338, 286 338, 286 333 Z"
          fill="#FFFFFF"
        />
      </g>

      {/* Two Expressive Cartoon Eyes */}
      {/* Left Eye */}
      <Eye
        cx={250}
        cy={310}
        r={13}
        gaze={gaze}
        isBlinking={isBlinking}
        pupilRatio={0.58}
        isCovered={isShy}
      />

      {/* Right Eye */}
      <Eye
        cx={276}
        cy={314}
        r={13}
        gaze={gaze}
        isBlinking={isBlinking}
        pupilRatio={0.58}
        isCovered={isShy}
      />
    </motion.g>
  );
};
