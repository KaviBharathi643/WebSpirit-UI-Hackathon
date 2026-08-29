import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Bookmark, Volume2, VolumeX, Send } from 'lucide-react';
import { sound } from '../utils/sound';

interface NavbarProps {
  onOpenGetInTouch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenGetInTouch }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    sound.setMuted(nextMuted);
    if (!nextMuted) {
      sound.playPop(700);
    }
  };

  const handleFollow = () => {
    const next = !isFollowing;
    setIsFollowing(next);
    sound.playPop(next ? 800 : 400);
  };

  const handleBookmark = () => {
    const next = !isBookmarked;
    setIsBookmarked(next);
    sound.playPop(next ? 750 : 350);
  };

  return (
    <nav className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-4 sm:py-6 flex items-center justify-between z-30 select-none">
      {/* Left Section: Logo + Status Badge + Follow */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Circular dark logo with cyan/blue accent */}
        <motion.div
          whileHover={{ rotate: 180, scale: 1.08 }}
          transition={{ type: 'spring', damping: 10, stiffness: 200 }}
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#18191C] border border-gray-700/60 flex items-center justify-center cursor-pointer shadow-md relative overflow-hidden"
          onClick={() => sound.playPop(650)}
        >
          {/* Cyan diagonal slash accent */}
          <div className="absolute w-1.5 h-6 bg-cyan-400 rotate-45 rounded-full"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500 relative z-10"></div>
        </motion.div>

        {/* Available for work badge */}
        <div className="flex items-center gap-2 bg-[#2E3035]/80 border border-gray-700/50 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-emerald-400/90 font-semibold tracking-tight text-[11px] sm:text-xs">
            Available for work
          </span>
        </div>

        {/* Follow button */}
        <button
          type="button"
          onClick={handleFollow}
          className={`text-xs font-semibold px-2.5 py-1 rounded-full transition-all cursor-pointer hidden md:flex items-center gap-1 ${
            isFollowing
              ? 'text-pink-400 bg-pink-950/40 border border-pink-700/50'
              : 'text-gray-300 hover:text-white hover:bg-white/10'
          }`}
        >
          {isFollowing ? '✓ Following' : '+ Follow'}
        </button>
      </div>

      {/* Right Section: Tool Icons + CTA Button */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Sound toggle button */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          type="button"
          onClick={toggleSound}
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#2E3035]/80 hover:bg-[#3D3E44] border border-gray-700/50 flex items-center justify-center text-gray-300 hover:text-white transition-colors cursor-pointer"
          title={isMuted ? 'Unmute playful sounds' : 'Mute sounds'}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-gray-400" />
          ) : (
            <Volume2 className="w-4 h-4 text-emerald-400" />
          )}
        </motion.button>

        {/* Bookmark Icon */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          type="button"
          onClick={handleBookmark}
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#2E3035]/80 hover:bg-[#3D3E44] border border-gray-700/50 flex items-center justify-center text-gray-300 hover:text-white transition-colors cursor-pointer hidden sm:flex"
          title="Bookmark UI"
        >
          <Bookmark
            className={`w-4 h-4 ${
              isBookmarked ? 'text-pink-400 fill-pink-400' : 'text-gray-300'
            }`}
          />
        </motion.button>

        {/* Shield Icon */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          type="button"
          onClick={() => sound.playPop(550)}
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#2E3035]/80 hover:bg-[#3D3E44] border border-gray-700/50 flex items-center justify-center text-gray-300 hover:text-white transition-colors cursor-pointer hidden sm:flex"
          title="Secure 256-bit SSL"
        >
          <Shield className="w-4 h-4 text-cyan-400" />
        </motion.button>

        {/* Get in touch CTA */}
        <motion.button
          whileHover={{ scale: 1.04, backgroundColor: '#000000' }}
          whileTap={{ scale: 0.96 }}
          type="button"
          onClick={() => {
            sound.playPop(750);
            onOpenGetInTouch();
          }}
          className="bg-[#18191C] hover:bg-black text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-gray-700/60 shadow-md flex items-center gap-1.5 cursor-pointer transition-all"
        >
          <span>Get in touch</span>
          <Send className="w-3 h-3 text-cyan-400 ml-0.5" />
        </motion.button>
      </div>
    </nav>
  );
};
