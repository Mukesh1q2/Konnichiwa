'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Users, Calendar, MapPin, Star, MessageCircle, Heart } from 'lucide-react';
import { useBrand } from '@/lib/brand-context';
import { HeroSection } from '@/components/layout/HeroSection';
import { AnimeMascot, AutoShowMascot } from '@/components/anime/AnimeMascot';
import { SocialShareManager } from '@/components/social/SocialShareManager';
import { ARScavengerHunt } from '@/components/ar/ARScavengerHunt';
import { RealTimeChat } from '@/components/chat/RealTimeChat';
import { cn, getEventCategoryLabel } from '@/lib/utils';
import { useState } from 'react';

// Sample data for demonstration
const featuredEvents = [
  {
    id: '1',
    title: 'Sumo Wrestling Demonstration',
    category: 'sumo',
    date: '2025-12-13',
    venue: 'Main Stage',
    image: '/images/konnichiwa_japan_event_images_5.jpg',
    featured: true,
  },
  {
    id: '2',
    title: 'Cosplay Competition',
    category: 'cosplay',
    date: '2025-12-13',
    venue: 'Cosplay Arena',
    image: '/images/cosplay_competition_images_0.jpg',
    featured: true,
  },
  {
    id: '3',
    title: 'Bharatanatyam Performance',
    category: 'classical-dance',
    date: '2025-09-28',
    venue: 'Cultural Stage',
    image: '/images/indian_cultural_elements_3.jpeg',
    featured: true,
  },
  {
    id: '4',
    title: 'Taiko Drumming',
    category: 'taiko',
    date: '2025-12-14',
    venue: 'Performance Hall',
    image: '/images/japanese_traditional_elements_8.jpg',
    featured: true,
  },
];

const festivalHighlights = [
  {
    icon: '🎌',
    title: 'Traditional Arts',
    description: 'Experience authentic Japanese and Indian traditional performances',
  },
  {
    icon: '🎭',
    title: 'Cultural Shows',
    description: 'Live performances showcasing the best of both cultures',
  },
  {
    icon: '🍜',
    title: 'Food Festival',
    description: 'Authentic cuisine from Japan and India',
  },
  {
    icon: '🧘',
    title: 'Wellness & Yoga',
    description: 'Meditation and wellness sessions for mind and body',
  },
];

export default function HomePage() {
  const { currentBrand } = useBrand();
  const [showSocialShare, setShowSocialShare] = useState(false);
  const [showARHunt, setShowARHunt] = useState(false);

  const shareContent = {
    title: `Join ${currentBrand === 'konnichiwa' ? 'Konnichiwa Japan' : 'Namaste India'} Cultural Festival`,
    text: currentBrand === 'konnichiwa' 
      ? 'Experience authentic Japanese culture in India! 🇯🇵 Sumo wrestling, anime, traditional arts & more!'
      : 'Celebrate vibrant Indian culture in Japan! 🇮🇳 Classical dance, Bollywood, yoga & cultural exchange!',
    url: typeof window !== 'undefined' ? window.location.href : '',
    image: currentBrand === 'konnichiwa' ? '/images/konnichiwa_japan_event_images_5.jpg' : '/images/indian_cultural_elements_3.jpeg',
    hashtags: currentBrand === 'konnichiwa' 
      ? ['#KonnichiwaJapan', '#JapaneseCulture', '#CulturalFestival', '#IndiaJapan']
      : ['#NamasteIndia', '#IndianCulture', '#CulturalFestival', '#JapanIndia']
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-hero font-serif text-ink mb-6">
              About {currentBrand === 'konnichiwa' ? 'Konnichiwa Japan' : 'Namaste India'}
            </h2>
            <p className="text-bodyLarge text-slate max-w-3xl mx-auto leading-relaxed">
              {currentBrand === 'konnichiwa' 
                ? 'India\'s largest Japanese cultural festival, bringing traditional arts, modern pop culture, cuisine, performances, workshops, and community experiences to thousands of visitors every year. Since 2017, the festival has connected India and Japan through creativity, friendship, and cultural exchange.'
                : 'Japan\'s largest Indian cultural festival, celebrating India\'s diversity through dance, music, food, wellness, crafts, workshops, and community gatherings. The event strengthens Indo-Japanese friendship through meaningful cultural exchange.'
              }
            </p>
          </div>

          {/* Festival Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {festivalHighlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 rounded-xl hover:shadow-cardHover transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-4xl mb-4">{highlight.icon}</div>
                <h3 className="text-h3 font-semibold text-ink mb-3">{highlight.title}</h3>
                <p className="text-slate leading-relaxed">{highlight.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-20 bg-accent-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-hero font-serif text-ink mb-6">Featured Events</h2>
            <p className="text-bodyLarge text-slate max-w-2xl mx-auto">
              Discover the most popular attractions and performances that make our festivals unforgettable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card group cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden rounded-t-xl">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary-500 text-white px-3 py-1 rounded-pill text-sm font-medium">
                      {getEventCategoryLabel(event.category)}
                    </span>
                  </div>
                  {event.featured && (
                    <div className="absolute top-4 right-4">
                      <Star className="h-6 w-6 text-yellow-400 fill-current" />
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-h3 font-semibold text-ink mb-3 group-hover:text-primary-500 transition-colors">
                    {event.title}
                  </h3>
                  <div className="flex items-center text-slate text-sm mb-4 space-x-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{event.venue}</span>
                    </div>
                  </div>
                  <Link
                    href={`/events/${event.id}`}
                    className="inline-flex items-center text-primary-500 font-medium hover:text-primary-700 transition-colors"
                  >
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/events"
              className="btn-primary inline-flex items-center"
            >
              View All Events
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-ink text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-display font-serif text-primary-500 mb-2">5+</div>
              <div className="text-bodyLarge text-white/80">Years of Excellence</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="text-display font-serif text-primary-500 mb-2">600+</div>
              <div className="text-bodyLarge text-white/80">Performers & Artists</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-display font-serif text-primary-500 mb-2">10K+</div>
              <div className="text-bodyLarge text-white/80">Annual Visitors</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="text-display font-serif text-primary-500 mb-2">30+</div>
              <div className="text-bodyLarge text-white/80">Event Categories</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-500 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-hero font-serif mb-6">
              Join the Celebration
            </h2>
            <p className="text-bodyLarge mb-8 text-white/90">
              Experience the magic of cultural exchange. Get your tickets now and be part of this incredible journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/tickets"
                className="bg-white text-primary-500 px-8 py-4 rounded-pill font-semibold hover:bg-gray-100 transition-colors duration-200 inline-flex items-center justify-center"
              >
                Buy Tickets Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/events"
                className="border-2 border-white text-white px-8 py-4 rounded-pill font-semibold hover:bg-white hover:text-primary-500 transition-colors duration-200 inline-flex items-center justify-center"
              >
                Explore Events
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modern Features Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-hero font-serif text-ink mb-6">
                Modern Cultural Experience
              </h2>
              <p className="text-bodyLarge text-slate max-w-3xl mx-auto">
                Discover cutting-edge features that blend traditional culture with modern technology
              </p>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* AR Scavenger Hunt */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-4">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-h3 font-semibold text-ink">AR Scavenger Hunt</h3>
                  <p className="text-slate">Discover hidden cultural treasures</p>
                </div>
              </div>
              <p className="text-slate mb-6">
                Use your phone's camera to find AR models of cultural artifacts, anime characters, and hidden bonus items throughout the festival!
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex items-center text-sm text-slate">
                  <Star className="h-4 w-4 text-yellow-500 mr-2" />
                  <span>Scan QR codes at different locations</span>
                </div>
                <div className="flex items-center text-sm text-slate">
                  <Star className="h-4 w-4 text-purple-500 mr-2" />
                  <span>Collect cultural knowledge and points</span>
                </div>
                <div className="flex items-center text-sm text-slate">
                  <Star className="h-4 w-4 text-green-500 mr-2" />
                  <span>Earn exclusive badges and rewards</span>
                </div>
              </div>
              <button
                onClick={() => setShowARHunt(!showARHunt)}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all"
              >
                {showARHunt ? 'Hide AR Hunt' : 'Start AR Adventure'}
              </button>
            </motion.div>

            {/* Social Sharing */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mr-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-h3 font-semibold text-ink">Share & Connect</h3>
                  <p className="text-slate">Spread the cultural joy</p>
                </div>
              </div>
              <p className="text-slate mb-6">
                Share your festival experience with custom templates, create Instagram stories, and connect with fellow culture enthusiasts!
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex items-center text-sm text-slate">
                  <Users className="h-4 w-4 text-blue-500 mr-2" />
                  <span>Share on all social platforms</span>
                </div>
                <div className="flex items-center text-sm text-slate">
                  <Star className="h-4 w-4 text-purple-500 mr-2" />
                  <span>Create custom story templates</span>
                </div>
                <div className="flex items-center text-sm text-slate">
                  <Heart className="h-4 w-4 text-red-500 mr-2" />
                  <span>Connect with like-minded people</span>
                </div>
              </div>
              <button
                onClick={() => setShowSocialShare(!showSocialShare)}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all"
              >
                {showSocialShare ? 'Hide Share Panel' : 'Share Your Experience'}
              </button>
            </motion.div>
          </div>

          {/* AR Hunt Component */}
          <AnimatePresence>
            {showARHunt && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-12"
              >
                <ARScavengerHunt />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Social Share Component */}
          <AnimatePresence>
            {showSocialShare && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-12 bg-white rounded-2xl shadow-xl p-8"
              >
                <SocialShareManager 
                  content={shareContent}
                  variant="default"
                  showQR={true}
                  showDownload={true}
                  showTemplates={true}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Modern Chat Preview */}
      <section className="py-16 bg-ink text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-h2 font-serif mb-6">Join the Conversation</h2>
            <p className="text-bodyLarge mb-8 text-white/90">
              Connect with fellow culture enthusiasts in real-time chat rooms. Share experiences, ask questions, and make new friends!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <MessageCircle className="h-6 w-6 text-purple-400" />
                <div className="text-left">
                  <div className="font-semibold">Live Chat Rooms</div>
                  <div className="text-sm text-white/80">1,247+ active users</div>
                </div>
              </div>
              <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Users className="h-6 w-6 text-blue-400" />
                <div className="text-left">
                  <div className="font-semibold">Cultural Exchange</div>
                  <div className="text-sm text-white/80">Share your stories</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modern Interactive Elements */}
      <AutoShowMascot />
      <RealTimeChat 
        variant="floating"
        showRooms={true}
        showUserList={true}
      />
    </div>
  );
}