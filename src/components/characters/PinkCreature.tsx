import React from 'react';
import { motion } from 'framer-motion';
import { Eye } from './Eye';
import { GazePosition, MascotMood } from '../../types/mascot';
import { sound } from '../../utils/sound';

interface PinkCreatureProps {
  gaze: GazePosition;
  isBlinking: boolean;
  mood: MascotMood;
}

export const PinkCreature: React.FC<PinkCreatureProps> = ({
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
        y: isCelebrating ? [-8, -25, -8] : [0, -6, 0],
        x: isShy ? -12 : 0,
        rotate: isShy ? -7 : 0,
        originX: '150px',
        originY: '420px',
      }}
      transition={{
        y: isCelebrating
          ? { repeat: Infinity, duration: 0.6, ease: 'easeInOut' }
          : { repeat: Infinity, duration: 4.2, ease: 'easeInOut' },
        x: { type: 'spring', damping: 15, stiffness: 150 },
        rotate: { type: 'spring', damping: 15, stiffness: 150 },
      }}
      whileHover={{
        scale: 1.03,
        y: -10,
        transition: { type: 'spring', damping: 12, stiffness: 300 },
      }}
      whileTap={{ scale: 0.96 }}
      onClick={() => sound.playBoing()}
    >
      {/* Tall Body/Neck extending down */}
      <path
        d="M 148 170 L 126 420 L 152 420 L 172 170 Z"
        fill="#F05272"
      />
      <path
        d="M 168 170 L 170 420 L 195 420 L 188 170 Z"
        fill="#F05272"
      />

      {/* Main Horizontal Pill Head */}
      <rect
        x="60"
        y="132"
        width="180"
        height="52"
        rx="26"
        fill="#F05272"
      />

      {/* Teeth Mouth Grid */}
      <g>
        <rect
          x="72"
          y="139"
          width="156"
          height="38"
          rx="18"
          fill="#FFFFFF"
        />
        {/* Vertical Dividers */}
        <line x1="94" y1="139" x2="94" y2="177" stroke="#F05272" strokeWidth="2.5" />
        <line x1="116" y1="139" x2="116" y2="177" stroke="#F05272" strokeWidth="2.5" />
        <line x1="138" y1="139" x2="138" y2="177" stroke="#F05272" strokeWidth="2.5" />
        <line x1="160" y1="139" x2="160" y2="177" stroke="#F05272" strokeWidth="2.5" />
        <line x1="182" y1="139" x2="182" y2="177" stroke="#F05272" strokeWidth="2.5" />
        <line x1="204" y1="139" x2="204" y2="177" stroke="#F05272" strokeWidth="2.5" />
      </g>

      {/* Two Cartoon Eyes perched on top of the head */}
      {/* Left Eye */}
      <Eye
        cx={136}
        cy={127}
        r={14}
        gaze={gaze}
        isBlinking={isBlinking}
        pupilRatio={0.56}
        isCovered={isShy}
      />

      {/* Right Eye */}
      <Eye
        cx={166}
        cy={127}
        r={14}
        gaze={gaze}
        isBlinking={isBlinking}
        pupilRatio={0.56}
        isCovered={isShy}
      />
    </motion.g>
  );
};
