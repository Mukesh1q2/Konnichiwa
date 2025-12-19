'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBrand } from '@/lib/brand-context';
import { Volume2, VolumeX, MessageCircle, Heart, Star } from 'lucide-react';

interface MascotProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  size?: 'small' | 'medium' | 'large';
  interactive?: boolean;
  autoAnimate?: boolean;
}

interface MascotData {
  name: string;
  description: string;
  personality: string[];
  catchphrases: string[];
  animations: string[];
  voiceLines: string[];
  image: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

const mascotData: Record<string, MascotData> = {
  konnichiwa: {
    name: "Sakura Sensei",
    description: "A wise and friendly AI representing Japanese culture",
    personality: ["Wise", "Traditional", "Modern", "Respectful"],
    catchphrases: [
      "Konnichiwa! I am Sakura Sensei. How can I help you explore Japan? 🌸",
      "Did you know? Omotenashi means wholehearted hospitality.",
      "The cherry blossoms remind us that life is beautiful and fleeting.",
      "Welcome to Konnichiwa Japan 2025! Enjoy the sumo and anime!"
    ],
    animations: ["waving", "bowing", "teaching", "celebrating", "explaining"],
    voiceLines: [],
    image: "/images/ai/sakura-sensei.png",
    colors: {
      primary: "from-pink-400 to-rose-500",
      secondary: "from-red-100 to-pink-100",
      accent: "text-rose-600"
    }
  },
  namaste: {
    name: "Ganesha AI",
    description: "A wise representation of Indian culture with joy",
    personality: ["Wise", "Playful", "Spiritual", "Inclusive"],
    catchphrases: [
      "Namaste! I am Ganesha AI. Let's celebrate our rich heritage! 🐘",
      "Atithi Devo Bhava—the guest is like God in our culture.",
      "Yoga is the journey of the self, through the self, to the self.",
      "Welcome to Namaste India in Tokyo! Let's explore the Vedas together!"
    ],
    animations: ["dancing", "blessing", "teaching", "celebrating", "wisdom"],
    voiceLines: [],
    image: "/images/ai/ganesha-ai.png",
    colors: {
      primary: "from-orange-400 to-amber-500",
      secondary: "from-orange-100 to-yellow-100",
      accent: "text-orange-600"
    }
  }
};

export function AnimeMascot({
  position = 'bottom-right',
  size = 'medium',
  interactive = true,
  autoAnimate = true
}: MascotProps) {
  const { currentBrand } = useBrand();
  const [isVisible, setIsVisible] = useState(true);
  const [currentAnimation, setCurrentAnimation] = useState('idle');
  const [currentCatchphrase, setCurrentCatchphrase] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const mascot = mascotData[currentBrand];
  const sizeClasses = {
    small: 'w-20 h-20',
    medium: 'w-32 h-32',
    large: 'w-48 h-48'
  };

  const positionClasses = {
    'bottom-right': 'bottom-4 right-12',
    'bottom-left': 'bottom-4 left-4',
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4'
  };

  // Auto-rotate catchphrases
  useEffect(() => {
    if (!autoAnimate) return;

    const interval = setInterval(() => {
      setCurrentCatchphrase(prev => (prev + 1) % mascot.catchphrases.length);
      setCurrentAnimation('speaking');
      setTimeout(() => setCurrentAnimation('idle'), 2000);
    }, 15000);

    return () => clearInterval(interval);
  }, [autoAnimate, mascot.catchphrases.length]);

  const speak = (text: string) => {
    if (!soundEnabled || !('speechSynthesis' in window)) return;
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = currentBrand === 'konnichiwa' ? 'en-US' : 'en-IN';
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    speechSynthesis.speak(utterance);
  };

  const handleClick = () => {
    if (!interactive) return;

    setIsPlaying(true);
    setCurrentAnimation('celebrating');
    const nextIdx = (currentCatchphrase + 1) % mascot.catchphrases.length;
    setCurrentCatchphrase(nextIdx);

    // Voice catchphrase
    speak(mascot.catchphrases[nextIdx]);

    setTimeout(() => {
      setIsPlaying(false);
      setCurrentAnimation('idle');
    }, 4000);
  };

  const animationVariants = {
    idle: { scale: 1, rotate: 0 },
    waving: { scale: 1.1, rotate: [0, -5, 5, -5, 0] },
    bowing: { scale: 0.9, y: [0, 10, 0] },
    teaching: { scale: 1.05, rotate: [0, 2, -2, 0] },
    celebrating: { scale: 1.2, rotate: [0, -10, 10, -10, 0] },
    speaking: { scale: 1.05, y: [0, -2, 0] }
  };

  const currentCatchphraseText = mascot.catchphrases[currentCatchphrase];

  return (
    <div className={`fixed ${positionClasses[position]} z-[60]`}>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{
              ...((animationVariants as Record<string, object>)[currentAnimation] || {}),
              opacity: 1,
              scale: 1,
              y: 0
            }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
              ...(currentAnimation !== 'idle' && { duration: 0.6 })
            }}
            className={`relative ${sizeClasses[size]}`}
            onClick={handleClick}
          >
            {/* Mascot Container */}
            <div className={`relative w-full h-full rounded-full bg-gradient-to-br ${mascot.colors.primary} shadow-lg cursor-pointer group overflow-hidden border-4 border-white/30`}>
              {/* Mascot Image */}
              <div
                className="w-full h-full bg-cover bg-center transition-transform group-hover:scale-110"
                style={{ backgroundImage: `url('${mascot.image}')` }}
              />

              {/* Fallback emoji if image fails */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity">
                <span className="text-4xl">
                  {currentBrand === 'konnichiwa' ? '🌸' : '🐘'}
                </span>
              </div>

              {/* Interaction Indicators */}
              {interactive && (
                <div className="absolute top-2 right-2">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity
                    }}
                    className="w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center shadow-sm"
                    title="Engage with me!"
                  >
                    <Star className="w-2 h-2 text-yellow-800" />
                  </motion.div>
                </div>
              )}
            </div>

            {/* Catchphrase Bubble */}
            <AnimatePresence>
              {isPlaying && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 10 }}
                  className="absolute bottom-full right-0 mb-4 max-w-xs"
                >
                  <div className={`bg-gradient-to-r ${mascot.colors.secondary} rounded-2xl px-4 py-3 shadow-lg border border-white/20`}>
                    <div className={`text-sm ${mascot.colors.accent} font-medium mb-1`}>
                      {mascot.name} says:
                    </div>
                    <div className="text-gray-800 text-sm leading-relaxed">
                      {currentCatchphraseText}
                    </div>
                    {/* Speech bubble arrow */}
                    <div className="absolute top-full right-6 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white/80"></div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Control Panel - Positioned cleaner */}
      <AnimatePresence>
        {interactive && isVisible && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute top-0 -right-10 flex flex-col space-y-2"
          >
            {/* Sound Toggle */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSoundEnabled(!soundEnabled);
                if (!soundEnabled) speak("Voice enabled");
              }}
              title={soundEnabled ? "Mute Voice" : "Enable Voice"}
              className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-all ${soundEnabled ? 'bg-blue-500 text-white' : 'bg-white/90 text-gray-600 hover:bg-gray-100'
                }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Minimize Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsVisible(false);
              }}
              title="Hide Mascot"
              className="w-8 h-8 bg-white/90 text-red-500 rounded-full flex items-center justify-center shadow-lg hover:bg-red-50 transition-all"
            >
              <Heart className="w-4 h-4 fill-current" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden mascot reference for future image integration */}
      <style jsx>{`
        .mascot-image {
          background-image: url('${mascot.image}');
          background-size: cover;
          background-position: center;
        }
      `}</style>
    </div>
  );
}

// Auto-show component for homepage
export function AutoShowMascot() {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldShow(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!shouldShow) return null;

  return <AnimeMascot position="bottom-right" size="medium" autoAnimate={true} />;
}

export default AnimeMascot;