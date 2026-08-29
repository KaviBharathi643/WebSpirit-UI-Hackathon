import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Check, Loader2, MousePointer } from 'lucide-react';
import confetti from 'canvas-confetti';
import { MascotMood } from '../types/mascot';
import { sound } from '../utils/sound';

interface LoginCardProps {
  mood: MascotMood;
  setMood: (mood: MascotMood) => void;
  onOpenForgotPassword: () => void;
  onOpenSignUp: () => void;
  onLoginSuccess?: (user: { email: string; name: string }) => void;
}

export const LoginCard: React.FC<LoginCardProps> = ({
  setMood,
  onOpenForgotPassword,
  onOpenSignUp,
  onLoginSuccess,
}) => {
  const [email, setEmail] = useState('Show.meem@gmail.com');
  const [password, setPassword] = useState('Shamim1236');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailFocus = () => {
    setMood('watching-email');
  };

  const handleEmailBlur = () => {
    setMood('idle');
  };

  const handlePasswordFocus = () => {
    setMood(showPassword ? 'shy-password' : 'watching-email');
  };

  const handlePasswordBlur = () => {
    setMood('idle');
  };

  const togglePasswordVisibility = () => {
    const nextState = !showPassword;
    setShowPassword(nextState);
    sound.playPop(nextState ? 650 : 450);
    setMood(nextState ? 'shy-password' : 'idle');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please fill in both email and password.');
      setMood('confused');
      sound.playBoing();
      return;
    }

    setIsLoading(true);
    sound.playPop(520);

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setMood('celebrating');
      sound.playSuccess();

      // Launch multi-burst celebration confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F05272', '#2B83F6', '#61CED6', '#FFA7C4', '#10B981'],
      });

      setTimeout(() => {
        setIsSuccess(false);
        setMood('idle');
        if (onLoginSuccess) {
          onLoginSuccess({
            email,
            name: email.split('@')[0] || 'Tutor',
          });
        }
      }, 1600);
    }, 1200);
  };

  const handleGoogleLogin = () => {
    sound.playPop(600);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setMood('celebrating');
      sound.playSuccess();
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
      });
      setTimeout(() => {
        setIsSuccess(false);
        setMood('idle');
        if (onLoginSuccess) {
          onLoginSuccess({
            email: 'google.tutor@school.edu',
            name: 'Shamim (Tutor)',
          });
        }
      }, 1500);
    }, 1000);
  };

  return (
    <div className="w-full max-w-[440px] lg:max-w-[460px] bg-white rounded-[28px] lg:rounded-[36px] shadow-2xl p-8 sm:p-10 lg:p-12 flex flex-col justify-between border border-gray-100 relative overflow-hidden my-auto">
      {/* Top Subtle Crown / Brand Logo */}
      <div className="flex flex-col items-center justify-center mb-6">
        <motion.div
          whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
          className="w-10 h-10 mb-3 cursor-pointer flex items-center justify-center"
          onClick={() => sound.playPop(800)}
        >
          {/* Stylized 3-pointed Crown SVG matching the image */}
          <svg
            viewBox="0 0 32 24"
            className="w-8 h-8 fill-black"
          >
            <path d="M 3 6 C 5 6, 6 12, 10 14 C 13 10, 14 3, 16 3 C 18 3, 19 10, 22 14 C 26 12, 27 6, 29 6 C 29 16, 25 21, 16 21 C 7 21, 3 16, 3 6 Z" />
          </svg>
        </motion.div>

        {/* Headings */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          Welcome back!
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
          Please enter your details
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col justify-center">
        {/* Email Field */}
        <div className="relative group">
          <label
            htmlFor="email"
            className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              sound.playTick();
            }}
            onFocus={handleEmailFocus}
            onBlur={handleEmailBlur}
            required
            className="w-full bg-transparent pb-2 text-sm text-gray-800 border-b border-gray-300 focus:border-black focus:outline-none transition-colors font-medium placeholder:text-gray-400"
            placeholder="name@example.com"
          />
        </div>

        {/* Password Field */}
        <div className="relative group">
          <label
            htmlFor="password"
            className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1"
          >
            Password
          </label>
          <div className="relative flex items-center">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                sound.playTick();
              }}
              onFocus={handlePasswordFocus}
              onBlur={handlePasswordBlur}
              required
              className="w-full bg-transparent pb-2 text-sm text-gray-800 border-b border-gray-300 focus:border-black focus:outline-none transition-colors font-medium pr-10 tracking-widest placeholder:tracking-normal"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              tabIndex={0}
              className="absolute right-1 bottom-2.5 text-gray-600 hover:text-black transition-colors focus:outline-none cursor-pointer"
              title={showPassword ? 'Hide password' : 'View password'}
            >
              {showPassword ? (
                <Eye className="w-4 h-4 text-gray-700" />
              ) : (
                <EyeOff className="w-4 h-4 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Options Row: Remember Me & Forgot Password */}
        <div className="flex items-center justify-between pt-1">
          <label
            className="flex items-center gap-2 cursor-pointer select-none group relative"
            onClick={() => {
              setRememberMe(!rememberMe);
              sound.playPop(500);
            }}
          >
            <div
              className={`w-4 h-4 rounded border transition-colors flex items-center justify-center ${
                rememberMe
                  ? 'bg-black border-black text-white'
                  : 'border-gray-400 bg-white group-hover:border-black'
              }`}
            >
              {rememberMe && <Check className="w-3 h-3 stroke-[3]" />}
            </div>
            <span className="text-xs sm:text-sm font-medium text-gray-800">
              Remember me
            </span>

            {/* Playful cursor pointer illustration matching reference image */}
            <motion.div
              animate={{ x: [0, 4, 0], y: [0, 2, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
              className="hidden sm:block ml-1 opacity-75"
            >
              <MousePointer className="w-3.5 h-3.5 fill-gray-700 text-gray-700 rotate-[-12deg]" />
            </motion.div>
          </label>

          <button
            type="button"
            onClick={() => {
              sound.playPop(480);
              onOpenForgotPassword();
            }}
            className="text-xs sm:text-sm font-medium text-gray-400 hover:text-gray-900 transition-colors"
          >
            Forget password?
          </button>
        </div>

        {/* Error message if any */}
        {errorMessage && (
          <p className="text-xs text-red-500 font-semibold">{errorMessage}</p>
        )}

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          {/* Primary Log in Button */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="w-full bg-black hover:bg-neutral-900 text-white font-medium py-3.5 rounded-xl sm:rounded-2xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer text-sm"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin text-white" />
            ) : isSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                <span>Logged In!</span>
              </>
            ) : (
              <span>Log in</span>
            )}
          </motion.button>

          {/* Google Login Button */}
          <motion.button
            whileHover={{ scale: 1.01, backgroundColor: '#E2E5E9' }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full bg-[#EAECEF] text-gray-800 font-semibold py-3.5 rounded-xl sm:rounded-2xl transition-all flex items-center justify-center gap-3 cursor-pointer text-sm"
          >
            {/* Google Multicolor SVG Icon */}
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Log in with Google</span>
          </motion.button>
        </div>
      </form>

      {/* Footer */}
      <div className="text-center pt-6">
        <p className="text-xs text-gray-500 font-medium">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={() => {
              sound.playPop(520);
              onOpenSignUp();
            }}
            className="text-gray-950 font-bold hover:underline ml-1 cursor-pointer"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};
