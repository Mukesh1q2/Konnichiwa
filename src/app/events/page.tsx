'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, Users, Filter, Search } from 'lucide-react';
import { useBrand } from '@/lib/brand-context';
import { cn, getEventCategoryLabel, getEventImage } from '@/lib/utils';
import { Event, EventCategory } from '@/types';

// Sample events data
const allEvents: Event[] = [
  {
    id: '1',
    title: 'Sumo Wrestling Demonstration',
    slug: 'sumo-wrestling-demonstration',
    description: 'Witness the power, discipline, and ancient tradition of Sumo wrestling performed by professional rikishi. This is one of the most popular attractions, offering live bouts, photo sessions, and interactive Q&A.',
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
    tags: ['traditional', 'demonstration', 'performance'],
  },
  {
    id: '2',
    title: 'Cosplay Competition',
    slug: 'cosplay-competition',
    description: 'India\'s largest Japan-themed cosplay stage! Anime, manga, and gaming fans bring their favorite characters to life. Categories include solo, group, performance, and craftsmanship.',
    shortDescription: 'India\'s biggest anime cosplay competition',
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
    tags: ['cosplay', 'anime', 'competition'],
  },
  {
    id: '3',
    title: 'Bharatanatyam Performance',
    slug: 'bharatanatyam-performance',
    description: 'A mesmerizing classical dance performance showcasing the grace, expressions, and storytelling tradition of South India.',
    shortDescription: 'Classical Indian dance performance',
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
    tags: ['classical', 'dance', 'traditional'],
  },
  {
    id: '4',
    title: 'Taiko Drumming',
    slug: 'taiko-drumming',
    description: 'Feel the thunder of traditional Japanese Taiko drums. A spectacular experience of rhythm, energy, and teamwork.',
    shortDescription: 'Traditional Japanese drum performance',
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
    tags: ['music', 'traditional', 'performance'],
  },
  {
    id: '5',
    title: 'Yoga & Meditation Session',
    slug: 'yoga-meditation-session',
    description: 'Start your day with energizing yoga sessions and peaceful meditation. Suitable for all levels.',
    shortDescription: 'Morning yoga and meditation for all levels',
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
    tags: ['wellness', 'yoga', 'meditation'],
  },
];

const eventCategories: EventCategory[] = [
  'sumo',
  'cosplay',
  'taiko',
  'martial-arts',
  'food',
  'workshop',
  'performance',
  'classical-dance',
  'bollywood',
  'yoga',
  'handicrafts',
  'music',
];

export default function EventsPage() {
  const { currentBrand } = useBrand();
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredEvents = allEvents.filter(event => {
    const matchesBrand = event.brand === currentBrand;
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesBrand && matchesCategory && matchesSearch;
  });

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

      {/* Filters & Search */}
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

            {/* Category Filter */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center space-x-2 px-4 py-2 border border-border rounded-lg hover:bg-gray-50"
              >
                <Filter className="h-5 w-5" />
                <span>Filters</span>
              </button>
              
              <div className={cn(
                "lg:flex items-center space-x-2",
                showFilters ? "block" : "hidden lg:block"
              )}>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as EventCategory | 'all')}
                  className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="all">All Categories</option>
                  {eventCategories.map(category => (
                    <option key={category} value={category}>
                      {getEventCategoryLabel(category)}
                    </option>
                  ))}
                </select>
              </div>
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
              <AnimatePresence>
                {filteredEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={cn(
                      "card group cursor-pointer",
                      event.featured && "card-featured"
                    )}
                  >
                    <div className="relative h-64 overflow-hidden rounded-t-xl">
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
                          <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded text-xs font-bold">
                            FEATURED
                          </span>
                        </div>
                      )}
                      {!event.ticketRequired && (
                        <div className="absolute bottom-4 left-4">
                          <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
                            FREE
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
                          <span>{new Date(event.startDate).toLocaleDateString()}</span>
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
                        <Link
                          href={`/events/${event.id}`}
                          className="text-primary-500 font-medium hover:text-primary-700 transition-colors"
                        >
                          View Details →
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}