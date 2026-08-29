import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MascotScene } from './components/MascotScene';
import { LoginCard } from './components/LoginCard';
import { ForgotPasswordModal, SignUpModal } from './components/Modals';
import { TutorDashboard } from './components/dashboard/TutorDashboard';
import { MascotMood } from './types/mascot';

export function App() {
  const [currentUser, setCurrentUser] = useState<{ email: string; name: string } | null>(() => {
    try {
      const saved = localStorage.getItem('tutor_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [mood, setMood] = useState<MascotMood>('idle');
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const handleLoginSuccess = (user: { email: string; name: string }) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('tutor_auth_user', JSON.stringify(user));
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('tutor_auth_user');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {currentUser ? (
        <motion.div
          key="dashboard"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="w-full min-h-screen"
        >
          <TutorDashboard user={currentUser} onLogout={handleLogout} />
        </motion.div>
      ) : (
        <motion.div
          key="login"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="w-screen min-h-screen bg-[#38393F] dot-pattern flex items-center justify-center p-3 sm:p-6 md:p-10 select-none overflow-x-hidden text-gray-900"
        >
          {/* Main Centered Rounded Showcase Card */}
          <div className="w-full max-w-[1080px] bg-[#E9EBEF] rounded-[36px] sm:rounded-[44px] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[580px] sm:min-h-[620px] border border-gray-300/30">
            
            {/* Left Column: Mascot Illustration Area */}
            <div className="lg:col-span-7 flex items-center justify-center relative overflow-hidden bg-[#E9EBEF] py-6 px-4 sm:px-8">
              <MascotScene mood={mood} />
            </div>

            {/* Right Column: White Login Card */}
            <div className="lg:col-span-5 p-3 sm:p-5 lg:p-6 flex items-center justify-center">
              <LoginCard
                mood={mood}
                setMood={setMood}
                onOpenForgotPassword={() => setIsForgotPasswordOpen(true)}
                onOpenSignUp={() => setIsSignUpOpen(true)}
                onLoginSuccess={handleLoginSuccess}
              />
            </div>

          </div>

          {/* Modals */}
          <ForgotPasswordModal
            isOpen={isForgotPasswordOpen}
            onClose={() => setIsForgotPasswordOpen(false)}
          />
          <SignUpModal
            isOpen={isSignUpOpen}
            onClose={() => setIsSignUpOpen(false)}
            onSuccess={handleLoginSuccess}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;
