import React from 'react';
import { motion } from 'framer-motion';
import { Eye } from './Eye';
import { GazePosition, MascotMood } from '../../types/mascot';
import { sound } from '../../utils/sound';

interface TealCloudProps {
  gaze: GazePosition;
  isBlinking: boolean;
  mood: MascotMood;
}

export const TealCloud: React.FC<TealCloudProps> = ({
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
        rotate: isCelebrating ? [-4, 4, -4] : isShy ? -8 : [-1.5, 1.5, -1.5],
        x: isShy ? -12 : 0,
        y: isCelebrating ? [-5, -20, -5] : [0, -4, 0],
        originX: '135px',
        originY: '420px',
      }}
      transition={{
        rotate: isShy
          ? { type: 'spring', damping: 15, stiffness: 160 }
          : { repeat: Infinity, duration: 4.5, ease: 'easeInOut' },
        x: { type: 'spring', damping: 15, stiffness: 160 },
        y: isCelebrating
          ? { repeat: Infinity, duration: 0.55, ease: 'easeInOut' }
          : { repeat: Infinity, duration: 5.2, ease: 'easeInOut', delay: 0.4 },
      }}
      whileHover={{
        scale: 1.05,
        rotate: 3,
        transition: { type: 'spring', damping: 12, stiffness: 320 },
      }}
      whileTap={{ scale: 0.94 }}
      onClick={() => sound.playPop(580)}
    >
      {/* Two Slender Mint Legs */}
      {/* Left angled leg */}
      <path
        d="M 122 335 L 72 420 L 90 420 L 136 335 Z"
        fill="#5ABFC7"
      />
      {/* Right vertical leg */}
      <path
        d="M 155 335 L 155 420 L 171 420 L 169 335 Z"
        fill="#5ABFC7"
      />

      {/* Fluffy Scalloped Cloud Head */}
      <g>
        {/* Central base circle */}
        <circle cx="138" cy="285" r="46" fill="#61CED6" />
        {/* Scalloped perimeter lobes (10 lobes creating the cloud texture) */}
        <circle cx="138" cy="238" r="16" fill="#61CED6" />
        <circle cx="166" cy="246" r="16" fill="#61CED6" />
        <circle cx="184" cy="270" r="16" fill="#61CED6" />
        <circle cx="185" cy="298" r="16" fill="#61CED6" />
        <circle cx="166" cy="324" r="16" fill="#61CED6" />
        <circle cx="138" cy="332" r="16" fill="#61CED6" />
        <circle cx="110" cy="324" r="16" fill="#61CED6" />
        <circle cx="92" cy="300" r="16" fill="#61CED6" />
        <circle cx="92" cy="270" r="16" fill="#61CED6" />
        <circle cx="110" cy="246" r="16" fill="#61CED6" />
      </g>

      {/* Dark Teal Rounded Nose/Mouth pill on lower-left */}
      <rect
        x="108"
        y="288"
        width="38"
        height="26"
        rx="13"
        fill="#1C6E7A"
      />

      {/* Two Cartoon Eyes */}
      {/* Left Eye */}
      <Eye
        cx={138}
        cy={264}
        r={13}
        gaze={gaze}
        isBlinking={isBlinking}
        pupilRatio={0.58}
        isCovered={isShy}
      />

      {/* Right Eye */}
      <Eye
        cx={166}
        cy={264}
        r={13}
        gaze={gaze}
        isBlinking={isBlinking}
        pupilRatio={0.58}
        isCovered={isShy}
      />
    </motion.g>
  );
};
