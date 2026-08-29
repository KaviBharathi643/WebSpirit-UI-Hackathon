import React from 'react';
import { motion } from 'framer-motion';
import { GazePosition } from '../../types/mascot';

interface EyeProps {
  cx: number;
  cy: number;
  r: number;
  gaze: GazePosition;
  isBlinking: boolean;
  pupilRatio?: number;
  maxOffset?: number;
  pupilColor?: string;
  isCovered?: boolean;
}

export const Eye: React.FC<EyeProps> = ({
  cx,
  cy,
  r,
  gaze,
  isBlinking,
  pupilRatio = 0.52,
  maxOffset,
  pupilColor = '#1C1E21',
}) => {
  const actualMaxOffset = maxOffset ?? r * 0.54;
  const pupilRadius = r * pupilRatio;

  // Calculate clamped offset
  const offsetX = gaze.x * actualMaxOffset;
  const offsetY = gaze.y * actualMaxOffset;

  return (
    <g className="cursor-pointer select-none">
      {/* Sclera (White part) */}
      <motion.circle
        cx={cx}
        cy={cy}
        r={r}
        fill="#FFFFFF"
        initial={false}
        animate={{
          scaleY: isBlinking ? 0.08 : 1,
        }}
        transition={{ duration: 0.12, ease: 'easeInOut' }}
        style={{ originX: `${cx}px`, originY: `${cy}px` }}
      />

      {/* Pupil Clip for keeping pupil inside eye */}
      <clipPath id={`clip-eye-${cx}-${cy}`}>
        <circle cx={cx} cy={cy} r={r - 0.5} />
      </clipPath>

      <g clipPath={`url(#clip-eye-${cx}-${cy})`}>
        {/* Animated Pupil */}
        <motion.g
          animate={{
            x: offsetX,
            y: offsetY,
            opacity: isBlinking ? 0 : 1,
          }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          style={{ originX: `${cx}px`, originY: `${cy}px` }}
        >
          <circle
            cx={cx}
            cy={cy}
            r={pupilRadius}
            fill={pupilColor}
          />
          {/* Specular light highlight */}
          <circle
            cx={cx + pupilRadius * 0.32}
            cy={cy - pupilRadius * 0.32}
            r={pupilRadius * 0.28}
            fill="#FFFFFF"
            opacity={0.9}
          />
        </motion.g>
      </g>
    </g>
  );
};
