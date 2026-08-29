import { useState, useEffect, useRef } from 'react';
import { MascotMood, GazePosition } from '../types/mascot';

export function useMascotGaze(mood: MascotMood) {
  const [mouseGaze, setMouseGaze] = useState<GazePosition>({ x: 0.2, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const targetGaze = useRef<GazePosition>({ x: 0.2, y: 0 });
  const currentGaze = useRef<GazePosition>({ x: 0.2, y: 0 });

  // Handle natural blinking
  useEffect(() => {
    let blinkTimeout: NodeJS.Timeout;
    
    const triggerBlink = () => {
      setIsBlinking(true);
      setTimeout(() => {
        setIsBlinking(false);
        // Schedule next blink between 2.5s and 6s
        const nextTime = Math.random() * 3500 + 2500;
        blinkTimeout = setTimeout(triggerBlink, nextTime);
      }, 150);
    };

    const initialDelay = Math.random() * 2000 + 1000;
    blinkTimeout = setTimeout(triggerBlink, initialDelay);

    return () => clearTimeout(blinkTimeout);
  }, []);

  // Track cursor position with direct angle/vector calculation
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (mood !== 'idle') return;

      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      // Approximate mascot character group center on screen
      const mascotCenterX = screenWidth >= 1024 ? screenWidth * 0.35 : screenWidth * 0.5;
      const mascotCenterY = screenHeight * 0.48;

      const dx = e.clientX - mascotCenterX;
      const dy = e.clientY - mascotCenterY;
      const angle = Math.atan2(dy, dx);
      const dist = Math.hypot(dx, dy);

      // Scale pupil intensity based on distance from mascots
      const maxReachDist = Math.max(screenWidth, screenHeight) * 0.45;
      const intensity = Math.min(1, Math.max(0.25, dist / maxReachDist * 1.3));

      targetGaze.current = {
        x: Math.max(-1, Math.min(1, Math.cos(angle) * intensity)),
        y: Math.max(-1, Math.min(1, Math.sin(angle) * intensity)),
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mood]);

  // Smooth interpolation frame loop
  useEffect(() => {
    let animationFrameId: number;

    const updateGaze = () => {
      // Determine destination gaze according to mood
      let destX = targetGaze.current.x;
      let destY = targetGaze.current.y;

      if (mood === 'watching-email') {
        destX = 0.85;
        destY = -0.05;
      } else if (mood === 'shy-password') {
        destX = -0.96;
        destY = -0.05;
      } else if (mood === 'peek-password') {
        destX = 0.85;
        destY = 0.15;
      } else if (mood === 'celebrating') {
        destX = 0.0;
        destY = -0.8;
      } else if (mood === 'confused') {
        destX = Math.sin(Date.now() / 200) * 0.6;
        destY = Math.cos(Date.now() / 200) * 0.4;
      }

      // Smooth lerp
      const speed = mood === 'idle' ? 0.18 : 0.22;
      currentGaze.current.x += (destX - currentGaze.current.x) * speed;
      currentGaze.current.y += (destY - currentGaze.current.y) * speed;

      setMouseGaze({
        x: currentGaze.current.x,
        y: currentGaze.current.y
      });

      animationFrameId = requestAnimationFrame(updateGaze);
    };

    animationFrameId = requestAnimationFrame(updateGaze);
    return () => cancelAnimationFrame(animationFrameId);
  }, [mood]);

  return { gaze: mouseGaze, isBlinking };
}
