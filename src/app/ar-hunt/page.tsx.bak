'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Star, Camera, Target, Trophy } from 'lucide-react';
import { ARScavengerHunt } from '@/components/ar/ARScavengerHunt';
import { useBrand } from '@/lib/brand-context';

export default function ARHuntPage() {
  const { currentBrand } = useBrand();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <section className="bg-white shadow-sm py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href="/"
                className="flex items-center text-purple-600 hover:text-purple-700 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Home
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-2xl font-bold text-gray-900">
                AR Scavenger Hunt
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>Earn points and badges</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Camera className="h-4 w-4 text-purple-500" />
                <span>Use your camera</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AR Hunt Component */}
      <section className="py-8">
        <ARScavengerHunt />
      </section>

      {/* Features Highlight */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-h2 font-serif text-gray-900 mb-6">
              How AR Hunt Works
            </h2>
            <p className="text-bodyLarge text-gray-600 mb-12">
              Experience culture like never before with our interactive AR scavenger hunt
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-h4 font-semibold text-gray-900 mb-3">
                  Find Targets
                </h3>
                <p className="text-gray-600">
                  Scan QR codes and point your camera at AR markers scattered around the festival
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-h4 font-semibold text-gray-900 mb-3">
                  Learn Culture
                </h3>
                <p className="text-gray-600">
                  Discover fascinating cultural facts and stories behind each AR experience
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-h4 font-semibold text-gray-900 mb-3">
                  Earn Rewards
                </h3>
                <p className="text-gray-600">
                  Collect points, unlock badges, and gain exclusive access to premium content
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-h2 font-serif text-gray-900 mb-6">
              Pro Tips for Success
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                📱 Camera Setup
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Ensure good lighting for better AR detection</li>
                <li>• Hold your device steady when scanning</li>
                <li>• Allow camera permissions for the best experience</li>
                <li>• Use landscape mode for wider AR view</li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                🎯 Hunt Strategy
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Start with easy targets to build confidence</li>
                <li>• Read clues carefully before searching</li>
                <li>• Ask for hints if you get stuck</li>
                <li>• Complete challenges in any order</li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                🏆 Maximize Points
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Harder targets give more points</li>
                <li>• Bonus items are hidden throughout</li>
                <li>• Complete all targets for maximum score</li>
                <li>• Share your achievements on social media</li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                📚 Cultural Learning
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Read cultural information for each target</li>
                <li>• Take time to appreciate the significance</li>
                <li>• Share knowledge with fellow participants</li>
                <li>• Ask questions in the chat rooms</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}