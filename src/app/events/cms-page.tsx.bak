'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Calendar, MapPin, Users, Star, ArrowRight } from 'lucide-react';
import { useBrand } from '@/lib/brand-context';
import { cn, getEventCategoryLabel, formatDate } from '@/lib/utils';
import { Event } from '@/types';

// Sample CMS data structure
interface CMSData {
  events: Event[];
  guests: any[];
  sponsors: any[];
  magazine: any[];
}

// Mock CMS API functions
const mockCMSData: CMSData = {
  events: [
    {
      id: '1',
      title: 'Sumo Wrestling Demonstration',
      slug: 'sumo-wrestling-demonstration',
      description: 'Witness the power, discipline, and ancient tradition of Sumo wrestling performed by professional rikishi. This is one of the most popular attractions, offering live bouts, photo sessions, and interactive Q&A with the wrestlers.',
      shortDescription: 'Experience authentic Sumo wrestling with professional rikishi',
      brand: 'konnichiwa',
      category: 'sumo',
      startDate: '2025-12-13T10:00:00Z',
      endDate: '2025-12-13T12:00:00Z',
      venue: 'Main Stage',
      stage: 'Main Arena',
      capacity: 500,
      ticketRequired: true,
      ticketTypes: [],
      performers: [],
      image: '/images/konnichiwa_japan_event_images_5.jpg',
      featured: true,
      tags: ['traditional', 'demonstration', 'performance', 'popular'],
      ageRestriction: 'All ages',
    },
    {
      id: '2',
      title: 'Cosplay Competition & Parade',
      slug: 'cosplay-competition',
      description: 'India\'s largest Japan-themed cosplay stage! Anime, manga, and gaming fans bring their favorite characters to life. Categories include solo performance, group act, craftsmanship, and best costume design.',
      shortDescription: 'India\'s biggest anime cosplay competition with prizes',
      brand: 'konnichiwa',
      category: 'cosplay',
      startDate: '2025-12-13T14:00:00Z',
      endDate: '2025-12-13T17:00:00Z',
      venue: 'Cosplay Arena',
      stage: 'Performance Hall',
      capacity: 300,
      ticketRequired: true,
      ticketTypes: [],
      performers: [],
      image: '/images/cosplay_competition_images_0.jpg',
      featured: true,
      tags: ['cosplay', 'anime', 'competition', 'performance'],
      ageRestriction: 'All ages',
    },
    {
      id: '3',
      title: 'Bharatanatyam Classical Dance',
      slug: 'bharatanatyam-performance',
      description: 'A mesmerizing classical dance performance showcasing the grace, expressions, and storytelling tradition of South India. Performed by renowned dancers from Chennai.',
      shortDescription: 'Classical Indian dance performance showcasing South Indian traditions',
      brand: 'namaste',
      category: 'classical-dance',
      startDate: '2025-09-28T11:00:00Z',
      endDate: '2025-09-28T12:30:00Z',
      venue: 'Cultural Stage',
      stage: 'Main Stage',
      capacity: 400,
      ticketRequired: true,
      ticketTypes: [],
      performers: [],
      image: '/images/indian_cultural_elements_3.jpeg',
      featured: true,
      tags: ['classical', 'dance', 'traditional', 'bharatanatyam'],
      ageRestriction: 'All ages',
    },
    {
      id: '4',
      title: 'Traditional Taiko Drumming',
      slug: 'taiko-drumming',
      description: 'Feel the thunder of traditional Japanese Taiko drums. A spectacular experience of rhythm, energy, and teamwork performed by master drummers from Japan.',
      shortDescription: 'Traditional Japanese drum performance with master drummers',
      brand: 'konnichiwa',
      category: 'taiko',
      startDate: '2025-12-14T16:00:00Z',
      endDate: '2025-12-14T17:30:00Z',
      venue: 'Performance Hall',
      stage: 'Music Stage',
      capacity: 350,
      ticketRequired: true,
      ticketTypes: [],
      performers: [],
      image: '/images/japanese_traditional_elements_8.jpg',
      featured: false,
      tags: ['music', 'traditional', 'performance', 'taiko'],
      ageRestriction: 'All ages',
    },
    {
      id: '5',
      title: 'Morning Yoga & Meditation',
      slug: 'yoga-meditation-session',
      description: 'Start your day with energizing yoga sessions and peaceful meditation led by certified instructors. Suitable for all levels, from beginners to advanced practitioners.',
      shortDescription: 'Morning yoga and meditation for all levels with certified instructors',
      brand: 'namaste',
      category: 'yoga',
      startDate: '2025-09-29T07:00:00Z',
      endDate: '2025-09-29T08:30:00Z',
      venue: 'Wellness Zone',
      stage: 'Outdoor Pavilion',
      capacity: 200,
      ticketRequired: false,
      ticketTypes: [],
      performers: [],
      image: '/images/indian_cultural_elements_5.webp',
      featured: false,
      tags: ['wellness', 'yoga', 'meditation', 'free'],
      ageRestriction: 'All ages',
    },
    {
      id: '6',
      title: 'Martial Arts Demonstration',
      slug: 'martial-arts-demo',
      description: 'Experience the discipline and artistry of Japanese martial arts through live demonstrations of Karate, Judo, Kendo, and Aikido by skilled practitioners.',
      shortDescription: 'Live martial arts demonstrations with interactive sessions',
      brand: 'konnichiwa',
      category: 'martial-arts',
      startDate: '2025-12-13T15:00:00Z',
      endDate: '2025-12-13T16:30:00Z',
      venue: 'Martial Arts Dojo',
      stage: 'Training Area',
      capacity: 150,
      ticketRequired: true,
      ticketTypes: [],
      performers: [],
      image: '/images/japanese_traditional_elements_6.jpg',
      featured: false,
      tags: ['martial-arts', 'demonstration', 'interactive', 'karate'],
      ageRestriction: '8+ years',
    },
  ],
  guests: [],
  sponsors: [],
  magazine: [],
};

// CMS Hook for data fetching
function useCMSData() {
  const [data, setData] = useState<CMSData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setData(mockCMSData);
      } catch (err) {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}

// Event Card Component
function EventCard({ event, index }: { event: Event; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={cn(
        "card group cursor-pointer",
        event.featured && "card-featured"
      )}
    >
      <div className="relative h-64 overflow-hidden rounded-t-xl">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
        {!event.ticketRequired && (
          <div className="absolute bottom-4 left-4">
            <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
              FREE
            </span>
          </div>
        )}
        {event.ageRestriction && event.ageRestriction !== 'All ages' && (
          <div className="absolute bottom-4 right-4">
            <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-bold">
              {event.ageRestriction}
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-h3 font-semibold text-ink mb-3 group-hover:text-primary-500 transition-colors">
          {event.title}
        </h3>
        
        <p className="text-slate mb-4 line-clamp-2">
          {event.shortDescription}
        </p>
        
        <div className="flex items-center text-slate text-sm mb-4 space-x-4">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{formatDate(event.startDate)}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{event.venue}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-slate text-sm">
            <Users className="h-4 w-4 mr-1" />
            <span>Capacity: {event.capacity}</span>
          </div>
          <button className="text-primary-500 font-medium hover:text-primary-700 transition-colors flex items-center">
            View Details
            <ArrowRight className="ml-1 h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function EventsPage() {
  const { currentBrand } = useBrand();
  const { data: cmsData, loading, error } = useCMSData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showFeatured, setShowFeatured] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate">Loading events...</p>
        </div>
      </div>
    );
  }

  if (error || !cmsData) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="text-h3 font-semibold text-ink mb-2">Failed to load events</h3>
          <p className="text-slate">{error || 'Please try again later'}</p>
        </div>
      </div>
    );
  }

  const filteredEvents = cmsData.events
    .filter(event => event.brand === currentBrand)
    .filter(event => {
      if (showFeatured && !event.featured) return false;
      if (selectedCategory !== 'all' && event.category !== selectedCategory) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return event.title.toLowerCase().includes(query) ||
               event.description.toLowerCase().includes(query) ||
               event.tags.some(tag => tag.toLowerCase().includes(query));
      }
      return true;
    })
    .sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    });

  const categories = Array.from(new Set(cmsData.events.map(e => e.category)));

  return (
    <div className="min-h-screen bg-paper">
      {/* Header Section */}
      <section className="bg-surface py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-hero font-serif text-ink mb-6">
              {currentBrand === 'konnichiwa' ? 'Konnichiwa Japan Events' : 'Namaste India Events'}
            </h1>
            <p className="text-bodyLarge text-slate max-w-3xl mx-auto">
              {currentBrand === 'konnichiwa' 
                ? 'Explore our diverse range of Japanese cultural events including sumo wrestling, cosplay competitions, traditional arts, and modern performances.'
                : 'Discover the vibrant world of Indian culture through classical dance, Bollywood performances, yoga sessions, and authentic cultural experiences.'
              }
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 border-b border-border bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={showFeatured}
                  onChange={(e) => setShowFeatured(e.target.checked)}
                  className="rounded border-border focus:ring-primary-500"
                />
                <span className="text-sm font-medium text-ink">Featured Only</span>
              </label>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {getEventCategoryLabel(category)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🎭</div>
              <h3 className="text-h3 font-semibold text-ink mb-2">No events found</h3>
              <p className="text-slate">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-ink text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-display font-serif text-primary-500 mb-2">
                {filteredEvents.length}
              </div>
              <div className="text-bodyLarge text-white/80">Total Events</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="text-display font-serif text-primary-500 mb-2">
                {filteredEvents.filter(e => e.featured).length}
              </div>
              <div className="text-bodyLarge text-white/80">Featured Events</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-display font-serif text-primary-500 mb-2">
                {categories.length}
              </div>
              <div className="text-bodyLarge text-white/80">Categories</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="text-display font-serif text-primary-500 mb-2">
                {filteredEvents.filter(e => !e.ticketRequired).length}
              </div>
              <div className="text-bodyLarge text-white/80">Free Events</div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}