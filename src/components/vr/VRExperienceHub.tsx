'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Maximize2, 
  Monitor,
  Headphones,
  Camera,
  Star,
  Clock,
  Users,
  MapPin,
  Heart,
  Sparkles,
  Eye,
  Navigation,
  Info,
  Download,
  Share2
} from 'lucide-react';
import { useBrand } from '@/lib/brand-context';
import { cn } from '@/lib/utils';

interface VRExperience {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'cultural' | 'performance' | 'workshop' | 'meditation';
  thumbnail: string;
  videoUrl: string;
  vrMode: boolean;
  interactive: boolean;
  maxUsers: number;
  currentUsers: number;
  rating: number;
  tags: string[];
  culturalContext: string;
  languages: string[];
  accessibility: {
    audioDescription: boolean;
    subtitles: boolean;
    haptics: boolean;
  };
}

interface VRExperienceHubProps {
  className?: string;
  showBooking?: boolean;
  enableVR?: boolean;
}

const VR_EXPERIENCES: Record<string, VRExperience[]> = {
  konnichiwa: [
    {
      id: 'tea-ceremony-vr',
      title: 'Virtual Tea Ceremony Experience',
      description: 'Step into a traditional Japanese tea house and learn the art of tea ceremony with a master practitioner. Experience the tranquility and mindfulness of this ancient practice.',
      duration: 45,
      difficulty: 'beginner',
      category: 'cultural',
      thumbnail: '/images/vr/tea-ceremony-thumb.jpg',
      videoUrl: '/videos/tea-ceremony-vr.mp4',
      vrMode: true,
      interactive: true,
      maxUsers: 8,
      currentUsers: 3,
      rating: 4.8,
      tags: ['meditation', 'tradition', 'mindfulness', 'peaceful'],
      culturalContext: 'The Japanese tea ceremony represents harmony, respect, purity, and tranquility - the four principles that guide our daily lives.',
      languages: ['Japanese', 'English', 'Hindi'],
      accessibility: {
        audioDescription: true,
        subtitles: true,
        haptics: true
      }
    },
    {
      id: 'sumo-dojo-vr',
      title: 'Sumo Wrestling Training VR',
      description: 'Enter an authentic sumo dojo and experience the discipline and power of Japan\'s national sport. Learn traditional techniques and the spiritual aspects of sumo.',
      duration: 60,
      difficulty: 'intermediate',
      category: 'performance',
      thumbnail: '/images/vr/sumo-dojo-thumb.jpg',
      videoUrl: '/videos/sumo-dojo-vr.mp4',
      vrMode: true,
      interactive: true,
      maxUsers: 12,
      currentUsers: 7,
      rating: 4.9,
      tags: ['martial arts', 'strength', 'tradition', 'discipline'],
      culturalContext: 'Sumo is not just a sport - it\'s a spiritual practice that teaches respect, humility, and the connection between body, mind, and spirit.',
      languages: ['Japanese', 'English'],
      accessibility: {
        audioDescription: true,
        subtitles: true,
        haptics: false
      }
    },
    {
      id: 'cherry-blossom-vr',
      title: 'Cherry Blossom Meditation VR',
      description: 'Immerse yourself in a serene cherry blossom garden during peak sakura season. Experience the beauty and transience of life through guided meditation.',
      duration: 30,
      difficulty: 'beginner',
      category: 'meditation',
      thumbnail: '/images/vr/sakura-meditation-thumb.jpg',
      videoUrl: '/videos/sakura-meditation-vr.mp4',
      vrMode: true,
      interactive: false,
      maxUsers: 20,
      currentUsers: 12,
      rating: 4.7,
      tags: ['meditation', 'nature', 'peaceful', 'spiritual'],
      culturalContext: 'Cherry blossoms remind us of life\'s beauty and transience, teaching us to appreciate precious moments.',
      languages: ['Japanese', 'English', 'Hindi', 'Spanish'],
      accessibility: {
        audioDescription: true,
        subtitles: true,
        haptics: true
      }
    },
    {
      id: 'tokyo-street-vr',
      title: 'Virtual Tokyo Cultural Walk',
      description: 'Take a virtual stroll through traditional Tokyo neighborhoods, visit ancient temples, and experience the blend of old and new Japan.',
      duration: 90,
      difficulty: 'beginner',
      category: 'cultural',
      thumbnail: '/images/vr/tokyo-walk-thumb.jpg',
      videoUrl: '/videos/tokyo-street-vr.mp4',
      vrMode: true,
      interactive: true,
      maxUsers: 15,
      currentUsers: 8,
      rating: 4.6,
      tags: ['urban', 'modern', 'traditional', 'exploration'],
      culturalContext: 'Tokyo represents the perfect harmony between preserving tradition and embracing innovation.',
      languages: ['Japanese', 'English', 'Korean', 'Chinese'],
      accessibility: {
        audioDescription: true,
        subtitles: true,
        haptics: false
      }
    }
  ],
  namaste: [
    {
      id: 'yoga-meditation-vr',
      title: 'Sacred Yoga Temple VR',
      description: 'Practice yoga in a breathtaking ancient temple surrounded by mountains. Experience the spiritual essence of yoga with guided meditation and poses.',
      duration: 50,
      difficulty: 'beginner',
      category: 'meditation',
      thumbnail: '/images/vr/yoga-temple-thumb.jpg',
      videoUrl: '/videos/yoga-meditation-vr.mp4',
      vrMode: true,
      interactive: true,
      maxUsers: 25,
      currentUsers: 18,
      rating: 4.9,
      tags: ['yoga', 'meditation', 'spiritual', 'wellness'],
      culturalContext: 'Yoga is a complete science of living that originated in ancient India, promoting harmony between mind, body, and spirit.',
      languages: ['Hindi', 'English', 'Sanskrit', 'Spanish'],
      accessibility: {
        audioDescription: true,
        subtitles: true,
        haptics: true
      }
    },
    {
      id: 'bollywood-dance-vr',
      title: 'Bollywood Dance Studio VR',
      description: 'Step into a vibrant Bollywood dance studio and learn popular dance moves with expert choreographers. Feel the energy and joy of Indian cinema!',
      duration: 40,
      difficulty: 'intermediate',
      category: 'performance',
      thumbnail: '/images/vr/bollywood-dance-thumb.jpg',
      videoUrl: '/videos/bollywood-dance-vr.mp4',
      vrMode: true,
      interactive: true,
      maxUsers: 30,
      currentUsers: 22,
      rating: 4.8,
      tags: ['dance', 'bollywood', 'music', 'energetic'],
      culturalContext: 'Bollywood dance is a vibrant fusion that tells stories through movement, connecting hearts across cultures.',
      languages: ['Hindi', 'English', 'Punjabi', 'Tamil'],
      accessibility: {
        audioDescription: true,
        subtitles: true,
        haptics: true
      }
    },
    {
      id: 'ayurvedic-healing-vr',
      title: 'Ancient Ayurveda Healing VR',
      description: 'Visit a traditional Ayurvedic healing center and learn about ancient Indian wellness practices, herbal treatments, and holistic healing.',
      duration: 55,
      difficulty: 'intermediate',
      category: 'workshop',
      thumbnail: '/images/vr/ayurveda-thumb.jpg',
      videoUrl: '/videos/ayurvedic-healing-vr.mp4',
      vrMode: true,
      interactive: true,
      maxUsers: 16,
      currentUsers: 9,
      rating: 4.7,
      tags: ['wellness', 'traditional medicine', 'holistic', 'healing'],
      culturalContext: 'Ayurveda teaches us that true health comes from balance between body, mind, spirit, and environment.',
      languages: ['Hindi', 'English', 'Sanskrit'],
      accessibility: {
        audioDescription: true,
        subtitles: true,
        haptics: false
      }
    },
    {
      id: 'hindu-temple-vr',
      title: 'Sacred Temple Experience VR',
      description: 'Experience the spiritual atmosphere of ancient Hindu temples, participate in virtual aarti ceremonies, and learn about Hindu traditions and rituals.',
      duration: 70,
      difficulty: 'beginner',
      category: 'cultural',
      thumbnail: '/images/vr/hindu-temple-thumb.jpg',
      videoUrl: '/videos/hindu-temple-vr.mp4',
      vrMode: true,
      interactive: true,
      maxUsers: 40,
      currentUsers: 28,
      rating: 4.9,
      tags: ['spiritual', 'temple', 'traditions', 'sacred'],
      culturalContext: 'Hindu temples are not just buildings - they are spiritual destinations where the divine is experienced.',
      languages: ['Hindi', 'English', 'Sanskrit', 'Tamil'],
      accessibility: {
        audioDescription: true,
        subtitles: true,
        haptics: true
      }
    }
  ]
};

export function VRExperienceHub({ 
  className, 
  showBooking = true, 
  enableVR = true 
}: VRExperienceHubProps) {
  const { currentBrand } = useBrand();
  const [selectedExperience, setSelectedExperience] = useState<VRExperience | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [userBookings, setUserBookings] = useState<string[]>([]);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const experiences = VR_EXPERIENCES[currentBrand];

  const categories = ['all', ...Array.from(new Set(experiences.map(exp => exp.category)))];

  const filteredExperiences = filterCategory === 'all' 
    ? experiences 
    : experiences.filter(exp => exp.category === filterCategory);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume / 100;
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const bookExperience = (experienceId: string) => {
    setUserBookings(prev => [...prev, experienceId]);
    // In a real app, this would integrate with booking system
    alert('Experience booked successfully! You will receive a confirmation email shortly.');
  };

  const ExperienceCard = ({ experience }: { experience: VRExperience }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden group cursor-pointer"
      onClick={() => setSelectedExperience(experience)}
    >
      <div className="relative aspect-video bg-gradient-to-br from-purple-400 to-pink-400">
        <img
          src={experience.thumbnail}
          alt={experience.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `data:image/svg+xml,${encodeURIComponent(`
              <svg width="400" height="225" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="225" fill="url(#grad)"/>
                <defs>
                  <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#8B5CF6;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#EC4899;stop-opacity:1" />
                  </linearGradient>
                </defs>
                <text x="50%" y="50%" font-family="Arial" font-size="18" fill="white" text-anchor="middle" dy=".3em">
                  ${experience.title}
                </text>
              </svg>
            `)}`
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Play className="w-8 h-8 text-white" />
          </div>
        </div>
        
        {/* VR Badge */}
        {experience.vrMode && (
          <div className="absolute top-3 left-3 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            VR READY
          </div>
        )}
        
        {/* Duration */}
        <div className="absolute bottom-3 right-3 bg-black/60 text-white px-2 py-1 rounded text-xs">
          {formatTime(experience.duration * 60)}
        </div>
        
        {/* Live Users */}
        <div className="absolute top-3 right-3 flex items-center space-x-1 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
          <Users className="w-3 h-3" />
          <span>{experience.currentUsers}</span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
            {experience.title}
          </h3>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600">{experience.rating}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {experience.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className={cn(
              'px-2 py-1 rounded-full text-xs font-medium',
              experience.difficulty === 'beginner' && 'bg-green-100 text-green-700',
              experience.difficulty === 'intermediate' && 'bg-yellow-100 text-yellow-700',
              experience.difficulty === 'advanced' && 'bg-red-100 text-red-700'
            )}>
              {experience.difficulty}
            </span>
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
              {experience.category}
            </span>
          </div>
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <MapPin className="w-3 h-3" />
            <span>VR Room {Math.floor(Math.random() * 3) + 1}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {experience.interactive && (
              <div className="flex items-center space-x-1 text-xs text-purple-600">
                <Sparkles className="w-3 h-3" />
                <span>Interactive</span>
              </div>
            )}
          </div>
          
          {showBooking && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                bookExperience(experience.id);
              }}
              disabled={userBookings.includes(experience.id)}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                userBookings.includes(experience.id)
                  ? 'bg-green-100 text-green-700 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
              )}
            >
              {userBookings.includes(experience.id) ? 'Booked' : 'Book Now'}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );

  const VideoPlayer = ({ experience }: { experience: VRExperience }) => (
    <div className="bg-black rounded-2xl overflow-hidden">
      <div className="relative aspect-video">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          poster={experience.thumbnail}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
        >
          <source src={experience.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* VR Overlay */}
        {enableVR && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
            <div className="absolute top-4 right-4 flex space-x-2">
              <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                <Monitor className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                <Headphones className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
        
        {/* Play Overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <button
              onClick={handlePlayPause}
              className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <Play className="w-10 h-10 text-white ml-1" />
            </button>
          </div>
        )}
      </div>
      
      {/* Controls */}
      <div className="bg-gray-900 p-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={handlePlayPause}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          
          <div className="flex-1">
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={(e) => handleSeek(Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
          
          <div className="text-white text-sm">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="text-white hover:text-gray-300 transition-colors"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={(e) => handleVolumeChange(Number(e.target.value))}
              className="w-20 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={cn('max-w-7xl mx-auto p-6', className)}>
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Eye className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            VR Experience Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Immerse yourself in authentic cultural experiences through cutting-edge virtual reality technology
          </p>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Category:</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-purple-500 text-white' : 'text-gray-600 hover:text-gray-900'}`}
            >
              <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
              </div>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-purple-500 text-white' : 'text-gray-600 hover:text-gray-900'}`}
            >
              <div className="w-4 h-4 flex flex-col gap-0.5">
                <div className="h-0.5 bg-current rounded"></div>
                <div className="h-0.5 bg-current rounded"></div>
                <div className="h-0.5 bg-current rounded"></div>
              </div>
            </button>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            {filteredExperiences.length} experiences available
          </div>
          {enableVR && (
            <div className="flex items-center space-x-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg">
              <Monitor className="w-4 h-4" />
              <span className="text-sm font-medium">VR Enabled</span>
            </div>
          )}
        </div>
      </div>

      {/* Experience Grid */}
      {!selectedExperience && (
        <div className={cn(
          'gap-6',
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid grid-cols-1'
        )}>
          {filteredExperiences.map(experience => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </div>
      )}

      {/* Experience Detail */}
      {selectedExperience && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Back Button */}
          <button
            onClick={() => setSelectedExperience(null)}
            className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors"
          >
            <Navigation className="w-5 h-5" />
            <span>Back to experiences</span>
          </button>

          {/* Experience Details */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Video Player */}
            <div className="lg:col-span-2">
              <VideoPlayer experience={selectedExperience} />
            </div>
            
            {/* Experience Info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedExperience.title}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {selectedExperience.description}
                </p>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <Clock className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{selectedExperience.duration}min</div>
                  <div className="text-sm text-gray-600">Duration</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{selectedExperience.currentUsers}/{selectedExperience.maxUsers}</div>
                  <div className="text-sm text-gray-600">Current Users</div>
                </div>
              </div>
              
              {/* Cultural Context */}
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Heart className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold text-gray-900">Cultural Significance</h3>
                </div>
                <p className="text-gray-700 text-sm">
                  {selectedExperience.culturalContext}
                </p>
              </div>
              
              {/* Features */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Features</h3>
                <div className="space-y-2">
                  {selectedExperience.vrMode && (
                    <div className="flex items-center space-x-2">
                      <Monitor className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-gray-700">Full VR Experience</span>
                    </div>
                  )}
                  {selectedExperience.interactive && (
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-4 h-4 text-purple-600" />
                      <span className="text-sm text-gray-700">Interactive Elements</span>
                    </div>
                  )}
                  {selectedExperience.accessibility.audioDescription && (
                    <div className="flex items-center space-x-2">
                      <Info className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-700">Audio Description</span>
                    </div>
                  )}
                  {selectedExperience.accessibility.subtitles && (
                    <div className="flex items-center space-x-2">
                      <Info className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-700">Subtitles Available</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Tags */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedExperience.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Languages */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedExperience.languages.map(lang => (
                    <span key={lang} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Actions */}
              <div className="space-y-3">
                {showBooking && !userBookings.includes(selectedExperience.id) && (
                  <button
                    onClick={() => bookExperience(selectedExperience.id)}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all"
                  >
                    Book Experience
                  </button>
                )}
                
                <div className="flex space-x-2">
                  <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Download className="w-4 h-4" />
                    <span className="text-sm">Download</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Share2 className="w-4 h-4" />
                    <span className="text-sm">Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default VRExperienceHub;