'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Book, 
  Brain, 
  Trophy, 
  Users, 
  Globe, 
  Star, 
  Clock, 
  Play, 
  CheckCircle, 
  XCircle, 
  Award,
  Lightbulb,
  Palette,
  Music,
  Camera,
  Map,
  MessageCircle,
  Target,
  TrendingUp,
  Calendar,
  User,
  Home,
  ArrowRight,
  RefreshCw
} from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  description: string;
  category: 'japan' | 'india' | 'comparison';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in minutes
  points: number;
  completed: boolean;
  progress: number;
  image: string;
  tags: string[];
}

interface Quiz {
  id: string;
  title: string;
  questions: {
    question: string;
    options: string[];
    correct: number;
    explanation: string;
  }[];
  category: string;
  difficulty: string;
  completed: boolean;
  score?: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  earned: boolean;
  earnedDate?: string;
  progress: number;
  maxProgress: number;
}

interface UserProgress {
  totalPoints: number;
  lessonsCompleted: number;
  quizzesCompleted: number;
  achievements: number;
  currentStreak: number;
  longestStreak: number;
  level: number;
  experiencePoints: number;
  nextLevelPoints: number;
}

const CulturalEducationPlatform: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'learn' | 'quiz' | 'virtual-museum' | 'progress' | 'compare'>('learn');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'japan' | 'india' | 'comparison'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [userProgress, setUserProgress] = useState<UserProgress>({
    totalPoints: 1250,
    lessonsCompleted: 12,
    quizzesCompleted: 8,
    achievements: 3,
    currentStreak: 5,
    longestStreak: 12,
    level: 3,
    experiencePoints: 1250,
    nextLevelPoints: 1500
  });

  const lessons: Lesson[] = [
    {
      id: '1',
      title: 'Japanese Tea Ceremony Basics',
      description: 'Learn the traditional Japanese tea ceremony, its history, and cultural significance.',
      category: 'japan',
      difficulty: 'beginner',
      duration: 15,
      points: 100,
      completed: true,
      progress: 100,
      image: '/images/tea-ceremony.jpg',
      tags: ['tradition', 'ceremony', 'mindfulness', 'respect']
    },
    {
      id: '2',
      title: 'Indian Classical Dance Forms',
      description: 'Explore the rich world of Indian classical dance including Bharatanatyam, Kathak, and more.',
      category: 'india',
      difficulty: 'intermediate',
      duration: 25,
      points: 150,
      completed: false,
      progress: 60,
      image: '/images/indian-dance.jpg',
      tags: ['dance', 'classical', 'storytelling', 'expression']
    },
    {
      id: '3',
      title: 'Buddhism: East Meets West',
      description: 'Compare Buddhist practices in Japan and India, understanding their unique interpretations.',
      category: 'comparison',
      difficulty: 'advanced',
      duration: 30,
      points: 200,
      completed: false,
      progress: 0,
      image: '/images/buddhism.jpg',
      tags: ['religion', 'philosophy', 'meditation', 'history']
    },
    {
      id: '4',
      title: 'Japanese Manga Art',
      description: 'Discover the art style, storytelling techniques, and cultural impact of Japanese manga.',
      category: 'japan',
      difficulty: 'intermediate',
      duration: 20,
      points: 120,
      completed: true,
      progress: 100,
      image: '/images/manga-art.jpg',
      tags: ['art', 'comics', 'storytelling', 'visual']
    },
    {
      id: '5',
      title: 'Indian Festival Traditions',
      description: 'Deep dive into major Indian festivals like Diwali, Holi, and their cultural meanings.',
      category: 'india',
      difficulty: 'beginner',
      duration: 18,
      points: 110,
      completed: false,
      progress: 25,
      image: '/images/diwali.jpg',
      tags: ['festivals', 'celebration', 'traditions', 'community']
    }
  ];

  const quizzes: Quiz[] = [
    {
      id: '1',
      title: 'Japanese Culture Basics',
      category: 'japan',
      difficulty: 'beginner',
      completed: true,
      score: 90,
      questions: [
        {
          question: 'What does "konnichiwa" mean?',
          options: ['Good morning', 'Good afternoon', 'Good evening', 'Thank you'],
          correct: 1,
          explanation: 'Konnichiwa is a general greeting used during daytime hours in Japan.'
        },
        {
          question: 'What is the traditional Japanese art of paper folding called?',
          options: ['Ikebana', 'Origami', 'Calligraphy', 'Karate'],
          correct: 1,
          explanation: 'Origami is the traditional Japanese art of paper folding.'
        }
      ]
    },
    {
      id: '2',
      title: 'Indian Culture Fundamentals',
      category: 'india',
      difficulty: 'beginner',
      completed: false,
      questions: [
        {
          question: 'What is the national bird of India?',
          options: ['Peacock', 'Sparrow', 'Eagle', 'Parrot'],
          correct: 0,
          explanation: 'The peacock is the national bird of India, known for its vibrant plumage.'
        },
        {
          question: 'Which river is considered most sacred in Hinduism?',
          options: ['Ganges', 'Yamuna', 'Brahmaputra', 'Indus'],
          correct: 0,
          explanation: 'The Ganges River is considered the most sacred river in Hinduism.'
        }
      ]
    }
  ];

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'Cultural Explorer',
      description: 'Complete 5 lessons',
      icon: <Globe className="w-6 h-6" />,
      earned: true,
      earnedDate: '2025-01-15',
      progress: 5,
      maxProgress: 5
    },
    {
      id: '2',
      title: 'Quiz Master',
      description: 'Score 100% on 3 quizzes',
      icon: <Brain className="w-6 h-6" />,
      earned: false,
      progress: 2,
      maxProgress: 3
    },
    {
      id: '3',
      title: 'Learning Streak',
      description: 'Study for 7 days in a row',
      icon: <Target className="w-6 h-6" />,
      earned: false,
      progress: 5,
      maxProgress: 7
    }
  ];

  const virtualMuseumExhibits = [
    {
      id: '1',
      title: 'Japanese Zen Gardens',
      description: 'Virtual tour of authentic Japanese zen gardens',
      image: '/images/zen-garden.jpg',
      category: 'japan',
      interactive: true
    },
    {
      id: '2',
      title: 'Indian Temple Architecture',
      description: 'Explore intricate temple designs from across India',
      image: '/images/temple-architecture.jpg',
      category: 'india',
      interactive: true
    },
    {
      id: '3',
      title: 'Cross-Cultural Art Gallery',
      description: 'Compare artistic styles between Japan and India',
      image: '/images/cultural-art.jpg',
      category: 'comparison',
      interactive: true
    }
  ];

  const filteredLessons = lessons.filter(lesson => {
    const categoryMatch = selectedCategory === 'all' || lesson.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'all' || lesson.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  const startLesson = (lesson: Lesson) => {
    setCurrentLesson(lesson);
  };

  const startQuiz = (quiz: Quiz) => {
    setCurrentQuiz(quiz);
    setQuizAnswers(new Array(quiz.questions.length).fill(-1));
    setShowQuizResults(false);
  };

  const submitQuiz = () => {
    if (!currentQuiz) return;
    
    let correct = 0;
    currentQuiz.questions.forEach((question, index) => {
      if (quizAnswers[index] === question.correct) {
        correct++;
      }
    });
    
    const score = Math.round((correct / currentQuiz.questions.length) * 100);
    setShowQuizResults(true);
    
    // Update progress
    setUserProgress(prev => ({
      ...prev,
      totalPoints: prev.totalPoints + (score * 2),
      quizzesCompleted: prev.quizzesCompleted + 1,
      experiencePoints: prev.experiencePoints + (score * 2)
    }));
  };

  const calculateLevelProgress = () => {
    const progress = (userProgress.experiencePoints / userProgress.nextLevelPoints) * 100;
    return Math.min(progress, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Cultural Education Platform</h1>
              <p className="text-gray-600 mt-1">Discover the rich heritage of Japan and India through interactive learning</p>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600">Level {userProgress.level}</div>
                <div className="text-sm text-gray-500">Cultural Scholar</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{userProgress.totalPoints}</div>
                <div className="text-sm text-gray-500">Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{userProgress.currentStreak}</div>
                <div className="text-sm text-gray-500">Day Streak</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Level Progress</span>
            <span className="text-sm text-gray-500">
              {userProgress.experiencePoints} / {userProgress.nextLevelPoints} XP
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${calculateLevelProgress()}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {[
            { id: 'learn', label: 'Learn', icon: <Book className="w-4 h-4" /> },
            { id: 'quiz', label: 'Quiz', icon: <Brain className="w-4 h-4" /> },
            { id: 'virtual-museum', label: 'Virtual Museum', icon: <Camera className="w-4 h-4" /> },
            { id: 'progress', label: 'Progress', icon: <TrendingUp className="w-4 h-4" /> },
            { id: 'compare', label: 'Compare', icon: <MessageCircle className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center space-x-2 ${
                activeTab === tab.id
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <AnimatePresence mode="wait">
          {/* Learn Tab */}
          {activeTab === 'learn' && (
            <motion.div
              key="learn"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Filters */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter Lessons</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value as any)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="all">All Categories</option>
                      <option value="japan">Japanese Culture</option>
                      <option value="india">Indian Culture</option>
                      <option value="comparison">Cultural Comparison</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                    <select
                      value={selectedDifficulty}
                      onChange={(e) => setSelectedDifficulty(e.target.value as any)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="all">All Levels</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Lessons Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLessons.map((lesson) => (
                  <motion.div
                    key={lesson.id}
                    whileHover={{ y: -4 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
                    onClick={() => startLesson(lesson)}
                  >
                    <div className="aspect-w-16 aspect-h-9 bg-gradient-to-r from-indigo-400 to-purple-500 h-48 flex items-center justify-center">
                      <Book className="w-16 h-16 text-white" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          lesson.category === 'japan' ? 'bg-red-100 text-red-800' :
                          lesson.category === 'india' ? 'bg-orange-100 text-orange-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {lesson.category === 'japan' ? '🇯🇵 Japan' : 
                           lesson.category === 'india' ? '🇮🇳 India' : '🔄 Comparison'}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          lesson.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                          lesson.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {lesson.difficulty}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{lesson.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{lesson.description}</p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{lesson.duration} min</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span>{lesson.points} pts</span>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{lesson.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${lesson.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <button className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2">
                        <Play className="w-4 h-4" />
                        <span>{lesson.completed ? 'Review' : lesson.progress > 0 ? 'Continue' : 'Start'}</span>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Quiz Tab */}
          {activeTab === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {quizzes.map((quiz) => (
                  <div key={quiz.id} className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900">{quiz.title}</h3>
                      {quiz.completed && (
                        <div className="flex items-center space-x-1 text-green-600">
                          <CheckCircle className="w-5 h-5" />
                          <span className="text-sm font-medium">{quiz.score}%</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                      <span className={`px-2 py-1 rounded-full ${
                        quiz.category === 'japan' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'
                      }`}>
                        {quiz.category === 'japan' ? '🇯🇵 Japan' : '🇮🇳 India'}
                      </span>
                      <span className={`px-2 py-1 rounded-full ${
                        quiz.difficulty === 'beginner' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {quiz.difficulty}
                      </span>
                      <span>{quiz.questions.length} questions</span>
                    </div>
                    
                    <button
                      onClick={() => startQuiz(quiz)}
                      className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                    >
                      {quiz.completed ? 'Retake Quiz' : 'Start Quiz'}
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Virtual Museum Tab */}
          {activeTab === 'virtual-museum' && (
            <motion.div
              key="virtual-museum"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {virtualMuseumExhibits.map((exhibit) => (
                  <motion.div
                    key={exhibit.id}
                    whileHover={{ y: -4 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
                  >
                    <div className="aspect-w-16 aspect-h-9 bg-gradient-to-r from-purple-400 to-pink-500 h-64 flex items-center justify-center">
                      <Camera className="w-16 h-16 text-white" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          exhibit.category === 'japan' ? 'bg-red-100 text-red-800' :
                          exhibit.category === 'india' ? 'bg-orange-100 text-orange-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {exhibit.category === 'japan' ? '🇯🇵 Japan' : 
                           exhibit.category === 'india' ? '🇮🇳 India' : '🔄 Comparison'}
                        </span>
                        <div className="flex items-center space-x-1 text-indigo-600">
                          <Play className="w-4 h-4" />
                          <span className="text-xs">Interactive</span>
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{exhibit.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{exhibit.description}</p>
                      
                      <button className="w-full py-2 px-4 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2">
                        <Camera className="w-4 h-4" />
                        <span>Enter Gallery</span>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Progress Tab */}
          {activeTab === 'progress' && (
            <motion.div
              key="progress"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Lessons Completed', value: userProgress.lessonsCompleted, icon: <Book className="w-6 h-6" />, color: 'blue' },
                  { label: 'Quizzes Completed', value: userProgress.quizzesCompleted, icon: <Brain className="w-6 h-6" />, color: 'green' },
                  { label: 'Achievements', value: userProgress.achievements, icon: <Trophy className="w-6 h-6" />, color: 'yellow' },
                  { label: 'Current Streak', value: `${userProgress.currentStreak} days`, icon: <Target className="w-6 h-6" />, color: 'orange' }
                ].map((stat, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-lg bg-${stat.color}-100 text-${stat.color}-600`}>
                        {stat.icon}
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Achievements */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Achievements</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`p-4 rounded-lg border-2 ${
                        achievement.earned ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <div className={`p-2 rounded-lg ${
                          achievement.earned ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                        }`}>
                          {achievement.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-semibold ${achievement.earned ? 'text-green-900' : 'text-gray-600'}`}>
                            {achievement.title}
                          </h4>
                          <p className={`text-sm ${achievement.earned ? 'text-green-700' : 'text-gray-500'}`}>
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mb-2">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className={achievement.earned ? 'text-green-700' : 'text-gray-600'}>
                            Progress
                          </span>
                          <span className={achievement.earned ? 'text-green-700' : 'text-gray-600'}>
                            {achievement.progress} / {achievement.maxProgress}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-500 ${
                              achievement.earned ? 'bg-green-500' : 'bg-gray-400'
                            }`}
                            style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      {achievement.earned && achievement.earnedDate && (
                        <div className="text-xs text-green-600">
                          Earned on {new Date(achievement.earnedDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Compare Tab */}
          {activeTab === 'compare' && (
            <motion.div
              key="compare"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Cultural Comparison Tool</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Japan */}
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-r from-red-400 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-3xl">🇯🇵</span>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Japanese Culture</h4>
                    <div className="space-y-3 text-left">
                      <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                        <span className="text-sm font-medium">Language</span>
                        <span className="text-sm text-gray-600">Japanese</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                        <span className="text-sm font-medium">Religion</span>
                        <span className="text-sm text-gray-600">Shintoism, Buddhism</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                        <span className="text-sm font-medium">Cuisine</span>
                        <span className="text-sm text-gray-600">Sushi, Ramen, Tempura</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                        <span className="text-sm font-medium">Art Forms</span>
                        <span className="text-sm text-gray-600">Manga, Anime, Ikebana</span>
                      </div>
                    </div>
                  </div>

                  {/* India */}
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-3xl">🇮🇳</span>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Indian Culture</h4>
                    <div className="space-y-3 text-left">
                      <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                        <span className="text-sm font-medium">Language</span>
                        <span className="text-sm text-gray-600">Hindi, English, +22 official</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                        <span className="text-sm font-medium">Religion</span>
                        <span className="text-sm text-gray-600">Hinduism, Islam, Buddhism</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                        <span className="text-sm font-medium">Cuisine</span>
                        <span className="text-sm text-gray-600">Curry, Biryani, Dal</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                        <span className="text-sm font-medium">Art Forms</span>
                        <span className="text-sm text-gray-600">Bollywood, Classical Dance</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl">
                  <h4 className="text-lg font-bold text-gray-900 mb-4 text-center">Similarities</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-white rounded-lg">
                      <Lightbulb className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                      <h5 className="font-semibold text-gray-900">Philosophy</h5>
                      <p className="text-sm text-gray-600 mt-1">Both cultures emphasize spiritual growth and mindfulness</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg">
                      <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                      <h5 className="font-semibold text-gray-900">Community</h5>
                      <p className="text-sm text-gray-600 mt-1">Strong emphasis on family and community values</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg">
                      <Palette className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                      <h5 className="font-semibold text-gray-900">Art & Beauty</h5>
                      <p className="text-sm text-gray-600 mt-1">Rich traditions in visual arts and aesthetic appreciation</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Lesson Modal */}
      <AnimatePresence>
        {currentLesson && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentLesson.title}</h2>
                <p className="text-gray-600">{currentLesson.description}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Objectives</h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    Understand the historical context
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    Learn key cultural practices
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    Appreciate cultural significance
                  </li>
                </ul>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setCurrentLesson(null)}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    // Update progress
                    const updatedLessons = lessons.map(lesson => 
                      lesson.id === currentLesson.id 
                        ? { ...lesson, progress: Math.min(100, lesson.progress + 20) }
                        : lesson
                    );
                    setCurrentLesson(updatedLessons.find(l => l.id === currentLesson.id) || null);
                    
                    // Update user progress
                    setUserProgress(prev => ({
                      ...prev,
                      totalPoints: prev.totalPoints + 20,
                      lessonsCompleted: prev.lessonsCompleted + (currentLesson.progress === 0 ? 1 : 0),
                      experiencePoints: prev.experiencePoints + 20
                    }));
                  }}
                  className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
                >
                  Continue Learning
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quiz Modal */}
      <AnimatePresence>
        {currentQuiz && !showQuizResults && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentQuiz.title}</h2>
                <p className="text-gray-600">Question {quizAnswers.filter(a => a !== -1).length + 1} of {currentQuiz.questions.length}</p>
              </div>

              {currentQuiz.questions.map((question, qIndex) => (
                <div key={qIndex} className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{question.question}</h3>
                  <div className="space-y-3">
                    {question.options.map((option, oIndex) => (
                      <button
                        key={oIndex}
                        onClick={() => {
                          const newAnswers = [...quizAnswers];
                          newAnswers[qIndex] = oIndex;
                          setQuizAnswers(newAnswers);
                        }}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                          quizAnswers[qIndex] === oIndex
                            ? 'border-indigo-500 bg-indigo-50 text-indigo-900'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <div className="flex space-x-4">
                <button
                  onClick={() => setCurrentQuiz(null)}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={submitQuiz}
                  disabled={quizAnswers.includes(-1)}
                  className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Quiz
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quiz Results Modal */}
      <AnimatePresence>
        {showQuizResults && currentQuiz && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="text-center mb-6">
                <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Quiz Completed!</h2>
                <p className="text-gray-600">Great job on completing the quiz</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 mb-6 text-center">
                <div className="text-4xl font-bold text-indigo-600 mb-2">
                  {Math.round((quizAnswers.filter((answer, index) => 
                    answer === currentQuiz.questions[index].correct
                  ).length / currentQuiz.questions.length) * 100)}%
                </div>
                <p className="text-gray-600">Score</p>
              </div>

              <div className="space-y-4 mb-6">
                {currentQuiz.questions.map((question, qIndex) => {
                  const isCorrect = quizAnswers[qIndex] === question.correct;
                  return (
                    <div key={qIndex} className={`p-4 rounded-lg border-2 ${
                      isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                    }`}>
                      <div className="flex items-start space-x-3">
                        {isCorrect ? (
                          <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                        ) : (
                          <XCircle className="w-6 h-6 text-red-500 mt-1" />
                        )}
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{question.question}</h4>
                          <p className="text-sm text-gray-600">{question.explanation}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    setCurrentQuiz(null);
                    setShowQuizResults(false);
                  }}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => startQuiz(currentQuiz)}
                  className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
                >
                  Retake Quiz
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CulturalEducationPlatform;