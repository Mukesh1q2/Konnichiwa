'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, 
  MapPin, 
  Trophy, 
  Star, 
  Target, 
  Zap, 
  Gift, 
  Clock,
  CheckCircle,
  X,
  Play,
  Pause,
  RotateCcw,
  Info,
  Sparkles
} from 'lucide-react';
import { useBrand } from '@/lib/brand-context';
import { cn } from '@/lib/utils';

interface ARTarget {
  id: string;
  title: string;
  description: string;
  type: 'cultural' | 'anime' | 'hidden' | 'bonus';
  location: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  clue: string;
  arModel?: string;
  discovered: boolean;
  completed: boolean;
  image: string;
  culturalInfo?: string;
}

interface ScavengerHuntProps {
  onComplete?: (score: number) => void;
  className?: string;
}

const AR_TARGETS: Record<string, ARTarget[]> = {
  konnichiwa: [
    {
      id: 'sakura-tree',
      title: 'Sakura Cherry Blossom',
      description: 'Find and scan the virtual cherry blossom tree',
      type: 'cultural',
      location: 'Garden Area',
      difficulty: 'easy',
      points: 100,
      clue: 'Look for pink flowers that bloom in spring - they represent renewal and beauty',
      discovered: false,
      completed: false,
      image: '/images/ar-targets/sakura-tree.png',
      culturalInfo: 'Cherry blossoms symbolize the transient nature of life in Japanese culture, reminding us to appreciate beautiful moments.'
    },
    {
      id: 'sumo-wrestler',
      title: 'Sumo Warrior Spirit',
      description: 'Discover the traditional sumo wrestler AR model',
      type: 'cultural',
      location: 'Main Arena',
      difficulty: 'medium',
      points: 200,
      clue: 'Search where the ancient sport of sumo is demonstrated',
      arModel: 'sumo-wrestler-ar.glb',
      discovered: false,
      completed: false,
      image: '/images/ar-targets/sumo-ar.png',
      culturalInfo: 'Sumo wrestling is Japan\'s national sport, representing strength, discipline, and spiritual purification.'
    },
    {
      id: 'anime-mask',
      title: 'Mysterious Anime Mask',
      description: 'Find the hidden anime-style cultural mask',
      type: 'anime',
      location: 'Art Gallery',
      difficulty: 'hard',
      points: 300,
      clue: 'Where traditional art meets modern anime - look for the colorful mask',
      arModel: 'anime-mask-ar.glb',
      discovered: false,
      completed: false,
      image: '/images/ar-targets/anime-mask.png',
      culturalInfo: 'Masks in Japanese culture represent different emotions and spirits in traditional theater and festivals.'
    },
    {
      id: 'zen-garden',
      title: 'Peaceful Zen Garden',
      description: 'Create peace in the virtual zen garden',
      type: 'cultural',
      location: 'Meditation Zone',
      difficulty: 'medium',
      points: 150,
      clue: 'Find the quiet place where you can hear your own thoughts',
      discovered: false,
      completed: false,
      image: '/images/ar-targets/zen-garden.png',
      culturalInfo: 'Zen gardens represent the path to enlightenment through simplicity and contemplation.'
    },
    {
      id: 'bonus-lantern',
      title: 'Magical Paper Lantern',
      description: 'Light up the floating paper lantern for bonus points',
      type: 'bonus',
      location: 'Anywhere',
      difficulty: 'easy',
      points: 50,
      clue: 'Sometimes the most beautiful things are hidden in plain sight',
      discovered: false,
      completed: false,
      image: '/images/ar-targets/paper-lantern.png',
      culturalInfo: 'Paper lanterns symbolize guidance and hope, lighting the way for travelers and seekers.'
    }
  ],
  namaste: [
    {
      id: 'lotus-flower',
      title: 'Sacred Lotus',
      description: 'Find the virtual lotus flower representing purity',
      type: 'cultural',
      location: 'Water Feature',
      difficulty: 'easy',
      points: 100,
      clue: 'Look for a flower that grows in muddy water but blooms pure and beautiful',
      discovered: false,
      completed: false,
      image: '/images/ar-targets/lotus-flower.png',
      culturalInfo: 'The lotus flower represents purity, enlightenment, and spiritual awakening in Indian culture.'
    },
    {
      id: 'bharatanatyam-dancer',
      title: 'Bharatanatyam Grace',
      description: 'Meet the classical dance performer in AR',
      type: 'cultural',
      location: 'Dance Stage',
      difficulty: 'medium',
      points: 200,
      clue: 'Where classical Indian dance comes alive with graceful movements',
      arModel: 'bharatanatyam-ar.glb',
      discovered: false,
      completed: false,
      image: '/images/ar-targets/dancer-ar.png',
      culturalInfo: 'Bharatanatyam is one of the oldest classical dance forms, telling stories through movement and expression.'
    },
    {
      id: 'bollywood-dancer',
      title: 'Bollywood Energy',
      description: 'Join the vibrant Bollywood dancer in AR',
      type: 'anime',
      location: 'Performance Area',
      difficulty: 'medium',
      points: 180,
      clue: 'Where rhythm and celebration meet - feel the music and move',
      arModel: 'bollywood-dancer-ar.glb',
      discovered: false,
      completed: false,
      image: '/images/ar-targets/bollywood-ar.png',
      culturalInfo: 'Bollywood dance represents the joy, color, and celebration of Indian film culture.'
    },
    {
      id: 'henna-design',
      title: 'Intricate Henna Art',
      description: 'Discover the beautiful henna patterns',
      type: 'cultural',
      location: 'Art Workshop',
      difficulty: 'hard',
      points: 250,
      clue: 'Look for temporary body art that tells stories through intricate patterns',
      discovered: false,
      completed: false,
      image: '/images/ar-targets/henna-art.png',
      culturalInfo: 'Henna art is a traditional form of body decoration, symbolizing joy, beauty, and spiritual awakening.'
    },
    {
      id: 'bonus-diya',
      title: 'Golden Diya',
      description: 'Light the traditional oil lamp for bonus points',
      type: 'bonus',
      location: 'Anywhere',
      difficulty: 'easy',
      points: 50,
      clue: 'A light that dispels darkness and brings prosperity',
      discovered: false,
      completed: false,
      image: '/images/ar-targets/diya-lamp.png',
      culturalInfo: 'Diyas represent the triumph of light over darkness, knowledge over ignorance, and good over evil.'
    }
  ]
};

export function ARScavengerHunt({ onComplete, className }: ScavengerHuntProps) {
  const { currentBrand } = useBrand();
  const [isActive, setIsActive] = useState(false);
  const [currentTarget, setCurrentTarget] = useState<number>(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [gameStarted, setGameStarted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const targets = AR_TARGETS[currentBrand];
  const currentTargetData = targets[currentTarget];
  const completedTargets = targets.filter(t => t.completed).length;
  const totalPoints = targets.reduce((sum, t) => sum + (t.completed ? t.points : 0), 0);

  // Timer effect
  useEffect(() => {
    if (!isActive || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  // Auto-complete when all targets found
  useEffect(() => {
    if (completedTargets === targets.length && targets.length > 0) {
      setIsActive(false);
      if (onComplete) onComplete(totalPoints);
    }
  }, [completedTargets, targets.length, totalPoints, onComplete]);

  const startGame = () => {
    setGameStarted(true);
    setIsActive(true);
    setTimeLeft(1800);
    setCurrentTarget(0);
    setScore(0);
    // Reset all targets
    targets.forEach(target => {
      target.discovered = false;
      target.completed = false;
    });
  };

  const stopGame = () => {
    setIsActive(false);
    setCameraActive(false);
  };

  const resetGame = () => {
    setGameStarted(false);
    setIsActive(false);
    setCurrentTarget(0);
    setScore(0);
    setTimeLeft(1800);
    targets.forEach(target => {
      target.discovered = false;
      target.completed = false;
    });
  };

  const nextTarget = () => {
    if (currentTarget < targets.length - 1) {
      setCurrentTarget(prev => prev + 1);
    }
  };

  const prevTarget = () => {
    if (currentTarget > 0) {
      setCurrentTarget(prev => prev - 1);
    }
  };

  const markTargetComplete = (targetId: string) => {
    const targetIndex = targets.findIndex(t => t.id === targetId);
    if (targetIndex !== -1) {
      targets[targetIndex].completed = true;
      targets[targetIndex].discovered = true;
      setScore(prev => prev + targets[targetIndex].points);
      
      // Auto-advance to next target after 2 seconds
      setTimeout(() => {
        if (targetIndex < targets.length - 1) {
          setCurrentTarget(targetIndex + 1);
        }
      }, 2000);
    }
  };

  const toggleCamera = async () => {
    if (!cameraActive) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setCameraActive(true);
        }
      } catch (err) {
        alert('Camera access is required for AR experience. Please allow camera permissions.');
      }
    } else {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
      setCameraActive(false);
    }
  };

  const simulateARDetection = () => {
    if (currentTargetData && !currentTargetData.completed) {
      markTargetComplete(currentTargetData.id);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'cultural': return <Star className="w-4 h-4" />;
      case 'anime': return <Sparkles className="w-4 h-4" />;
      case 'hidden': return <Target className="w-4 h-4" />;
      case 'bonus': return <Gift className="w-4 h-4" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  if (!gameStarted) {
    return (
      <div className={cn('max-w-4xl mx-auto p-6', className)}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Camera className="w-12 h-12 text-white" />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            AR Scavenger Hunt
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Use your phone's camera to discover hidden AR objects around the festival! 
            Find all {targets.length} cultural and anime-themed items to complete the challenge.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-semibold text-gray-900 mb-3">How to Play</h3>
              <ul className="text-left space-y-2 text-gray-600">
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Scan QR codes at different locations</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Point your camera at AR markers</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Collect cultural knowledge and points</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Complete all challenges for rewards</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-semibold text-gray-900 mb-3">What You'll Find</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-500 mr-3" />
                  <span className="text-gray-600">Cultural AR Models</span>
                </div>
                <div className="flex items-center">
                  <Sparkles className="w-5 h-5 text-purple-500 mr-3" />
                  <span className="text-gray-600">Anime Characters</span>
                </div>
                <div className="flex items-center">
                  <Gift className="w-5 h-5 text-blue-500 mr-3" />
                  <span className="text-gray-600">Hidden Bonus Items</span>
                </div>
                <div className="flex items-center">
                  <Trophy className="w-5 h-5 text-orange-500 mr-3" />
                  <span className="text-gray-600">Exclusive Rewards</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={startGame}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105"
          >
            Start AR Hunt
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={cn('max-w-6xl mx-auto p-4', className)}>
      {/* Header with Stats */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-6 mb-4 md:mb-0">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{completedTargets}/{targets.length}</div>
              <div className="text-sm text-gray-600">Targets Found</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{totalPoints}</div>
              <div className="text-sm text-gray-600">Points Earned</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 flex items-center">
                <Clock className="w-5 h-5 mr-1" />
                {formatTime(timeLeft)}
              </div>
              <div className="text-sm text-gray-600">Time Left</div>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={() => setShowHint(!showHint)}
              className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors"
            >
              <Info className="w-4 h-4 mr-2 inline" />
              Hint
            </button>
            <button
              onClick={toggleCamera}
              className={cn(
                'px-4 py-2 rounded-lg transition-colors',
                cameraActive 
                  ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              )}
            >
              <Camera className="w-4 h-4 mr-2 inline" />
              {cameraActive ? 'Stop Camera' : 'Start Camera'}
            </button>
            <button
              onClick={resetGame}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <RotateCcw className="w-4 h-4 mr-2 inline" />
              Reset
            </button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Current Target */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  Target {currentTarget + 1}: {currentTargetData.title}
                </h3>
                <div className="flex items-center space-x-2">
                  <span className={cn('px-3 py-1 rounded-full text-xs font-medium', getDifficultyColor(currentTargetData.difficulty))}>
                    {currentTargetData.difficulty}
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    {currentTargetData.points} pts
                  </span>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">{currentTargetData.description}</p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-center mb-2">
                  <MapPin className="w-4 h-4 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-600">Location: {currentTargetData.location}</span>
                </div>
                <div className="flex items-center">
                  {getTypeIcon(currentTargetData.type)}
                  <span className="text-sm text-gray-600 ml-2">Type: {currentTargetData.type}</span>
                </div>
              </div>

              <AnimatePresence>
                {showHint && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4"
                  >
                    <div className="flex items-center mb-2">
                      <Zap className="w-4 h-4 text-yellow-600 mr-2" />
                      <span className="font-medium text-yellow-800">Clue:</span>
                    </div>
                    <p className="text-yellow-700">{currentTargetData.clue}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex space-x-3">
                <button
                  onClick={prevTarget}
                  disabled={currentTarget === 0}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={nextTarget}
                  disabled={currentTarget === targets.length - 1}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
                <button
                  onClick={simulateARDetection}
                  className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-2 rounded-lg hover:from-green-600 hover:to-blue-600 transition-all"
                >
                  <Target className="w-4 h-4 mr-2 inline" />
                  Scan Target
                </button>
              </div>
            </div>

            {/* Camera View */}
            {cameraActive && (
              <div className="relative h-64 bg-gray-900">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 border-2 border-white border-dashed rounded-full flex items-center justify-center">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black/50 text-white text-center py-2 rounded-lg">
                    Point camera at AR markers to detect targets
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Target List */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-4">All Targets</h4>
            <div className="space-y-3">
              {targets.map((target, index) => (
                <motion.div
                  key={target.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setCurrentTarget(index)}
                  className={cn(
                    'p-3 rounded-lg cursor-pointer transition-all',
                    index === currentTarget 
                      ? 'bg-purple-50 border-2 border-purple-200' 
                      : 'bg-gray-50 hover:bg-gray-100',
                    target.completed && 'bg-green-50 border-green-200'
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">
                      {index + 1}. {target.title}
                    </span>
                    {target.completed && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className={cn('px-2 py-1 rounded text-xs', getDifficultyColor(target.difficulty))}>
                      {target.difficulty}
                    </span>
                    <span className="text-gray-600">{target.points} pts</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Cultural Info */}
          {currentTargetData.culturalInfo && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3">Cultural Learning</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                {currentTargetData.culturalInfo}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Completion Modal */}
      <AnimatePresence>
        {completedTargets === targets.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Congratulations!</h3>
              <p className="text-gray-600 mb-4">You've completed the AR Scavenger Hunt!</p>
              <div className="text-3xl font-bold text-purple-600 mb-2">{totalPoints} Points</div>
              <p className="text-sm text-gray-500 mb-6">You've earned the Cultural Explorer badge!</p>
              <button
                onClick={resetGame}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all"
              >
                Play Again
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ARScavengerHunt;