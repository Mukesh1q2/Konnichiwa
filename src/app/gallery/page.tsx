'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Image as ImageIcon,
  Search,
  Filter,
  Download,
  Share2,
  Heart,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Calendar,
  MapPin,
  Tag,
  Grid,
  List
} from 'lucide-react';
import { useBrand } from '@/lib/brand-context';
import { formatDate } from '@/lib/utils';

// Mock gallery data
const mockGalleryData = {
  photos: [
    {
      id: 'img-001',
      title: 'Sumo Wrestling Demonstration',
      description: 'Professional rikishi performing traditional sumo wrestling at Konnichiwa Japan 2025',
      imageUrl: '/images/konnichiwa_japan_event_images_5.jpg',
      thumbnailUrl: '/images/konnichiwa_japan_event_images_5.jpg',
      category: 'Performance',
      subcategory: 'Traditional Arts',
      brand: 'konnichiwa',
      eventDate: '2025-12-13',
      venue: 'Main Stage',
      photographer: 'Festival Media Team',
      tags: ['sumo', 'wrestling', 'traditional', 'japan', 'performance'],
      featured: true,
      likes: 245,
      downloads: 89,
    },
    {
      id: 'img-002',
      title: 'Cosplay Competition Finals',
      description: 'Winners of the annual cosplay competition showcasing elaborate anime character costumes',
      imageUrl: '/images/cosplay_competition_images_0.jpg',
      thumbnailUrl: '/images/cosplay_competition_images_0.jpg',
      category: 'Pop Culture',
      subcategory: 'Cosplay',
      brand: 'konnichiwa',
      eventDate: '2025-12-13',
      venue: 'Cosplay Arena',
      photographer: 'Festival Media Team',
      tags: ['cosplay', 'anime', 'competition', 'costume', 'performance'],
      featured: true,
      likes: 189,
      downloads: 67,
    },
    {
      id: 'img-003',
      title: 'Bharatanatyam Performance',
      description: 'Classical Indian dance performance showcasing the grace and beauty of Bharatanatyam',
      imageUrl: '/images/indian_cultural_elements_3.jpeg',
      thumbnailUrl: '/images/indian_cultural_elements_3.jpeg',
      category: 'Performance',
      subcategory: 'Classical Dance',
      brand: 'namaste',
      eventDate: '2025-09-28',
      venue: 'Cultural Stage',
      photographer: 'Festival Media Team',
      tags: ['bharatanatyam', 'classical', 'dance', 'india', 'performance'],
      featured: true,
      likes: 312,
      downloads: 156,
    },
    {
      id: 'img-004',
      title: 'Taiko Drumming Ensemble',
      description: 'Powerful taiko drumming performance by master drummers from Japan',
      imageUrl: '/images/japanese_traditional_elements_8.jpg',
      thumbnailUrl: '/images/japanese_traditional_elements_8.jpg',
      category: 'Performance',
      subcategory: 'Music',
      brand: 'konnichiwa',
      eventDate: '2025-12-14',
      venue: 'Performance Hall',
      photographer: 'Festival Media Team',
      tags: ['taiko', 'drumming', 'music', 'traditional', 'japan'],
      featured: false,
      likes: 178,
      downloads: 45,
    },
    {
      id: 'img-005',
      title: 'Yoga & Meditation Session',
      description: 'Morning wellness session bringing together practitioners from both cultures',
      imageUrl: '/images/indian_cultural_elements_5.webp',
      thumbnailUrl: '/images/indian_cultural_elements_5.webp',
      category: 'Wellness',
      subcategory: 'Yoga',
      brand: 'namaste',
      eventDate: '2025-09-29',
      venue: 'Wellness Zone',
      photographer: 'Festival Media Team',
      tags: ['yoga', 'meditation', 'wellness', 'india', 'japan'],
      featured: false,
      likes: 223,
      downloads: 78,
    },
    {
      id: 'img-006',
      title: 'Festival Crowd & Atmosphere',
      description: 'The vibrant atmosphere of cultural celebration with thousands of attendees',
      imageUrl: '/images/konnichiwa_japan_event_images_0.jpg',
      thumbnailUrl: '/images/konnichiwa_japan_event_images_0.jpg',
      category: 'Lifestyle',
      subcategory: 'Crowd',
      brand: 'konnichiwa',
      eventDate: '2025-12-13',
      venue: 'Festival Grounds',
      photographer: 'Festival Media Team',
      tags: ['crowd', 'festival', 'atmosphere', 'celebration', 'culture'],
      featured: false,
      likes: 156,
      downloads: 34,
    },
  ],
  categories: ['Performance', 'Pop Culture', 'Wellness', 'Lifestyle', 'Food', 'Art'],
  subcategories: {
    'Performance': ['Traditional Arts', 'Classical Dance', 'Music', 'Martial Arts'],
    'Pop Culture': ['Cosplay', 'Anime', 'Gaming', 'Fashion'],
    'Wellness': ['Yoga', 'Meditation', 'Health', 'Fitness'],
    'Lifestyle': ['Crowd', 'Venue', 'Behind Scenes', 'Community'],
    'Food': ['Cuisine', 'Cooking', 'Markets', 'Tastings'],
    'Art': ['Crafts', 'Calligraphy', 'Painting', 'Sculpture'],
  },
};

// Photo Card Component
function PhotoCard({ photo, index, onClick }: { photo: any; index: number; onClick: (photo: any) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="card group cursor-pointer overflow-hidden"
      onClick={() => onClick(photo)}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={photo.thumbnailUrl}
          alt={photo.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Overlay Actions */}
        <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
            <Heart className="h-4 w-4 text-white" />
          </button>
          <button className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
            <Share2 className="h-4 w-4 text-white" />
          </button>
        </div>

        {/* Featured Badge */}
        {photo.featured && (
          <div className="absolute top-4 left-4">
            <span className="bg-primary-500 text-white px-2 py-1 rounded text-xs font-bold">
              FEATURED
            </span>
          </div>
        )}

        {/* Bottom Info */}
        <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h3 className="text-lg font-semibold mb-1">{photo.title}</h3>
          <p className="text-sm opacity-90 line-clamp-2">{photo.description}</p>
          <div className="flex items-center space-x-4 mt-2 text-xs">
            <span className="flex items-center">
              <Heart className="h-3 w-3 mr-1" />
              {photo.likes}
            </span>
            <span className="flex items-center">
              <Download className="h-3 w-3 mr-1" />
              {photo.downloads}
            </span>
          </div>
        </div>

        {/* Zoom Icon */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ZoomIn className="h-6 w-6 text-white" />
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs px-2 py-1 bg-primary-100 text-primary-700 rounded font-medium">
            {photo.category}
          </span>
          <span className="text-xs text-slate">
            {formatDate(photo.eventDate)}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-ink mb-1 line-clamp-1">
          {photo.title}
        </h3>
        <p className="text-sm text-slate line-clamp-2 mb-3">
          {photo.description}
        </p>
        <div className="flex items-center text-xs text-slate">
          <MapPin className="h-3 w-3 mr-1" />
          <span>{photo.venue}</span>
        </div>
      </div>
    </motion.div>
  );
}

// Lightbox Component
function Lightbox({ photo, photos, onClose, onPrevious, onNext }: {
  photo: any;
  photos: any[];
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}) {
  const currentIndex = photos.findIndex(p => p.id === photo.id);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="relative max-w-6xl max-h-full" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
        >
          <X className="h-6 w-6 text-white" />
        </button>

        {/* Navigation Buttons */}
        {currentIndex > 0 && (
          <button
            onClick={onPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
        )}

        {currentIndex < photos.length - 1 && (
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>
        )}

        {/* Image */}
        <img
          src={photo.imageUrl}
          alt={photo.title}
          className="max-w-full max-h-[80vh] object-contain rounded-lg"
        />

        {/* Photo Info */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
          <div className="text-white">
            <h2 className="text-2xl font-semibold mb-2">{photo.title}</h2>
            <p className="text-white/90 mb-4">{photo.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {formatDate(photo.eventDate)}
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  {photo.venue}
                </div>
                <div className="flex items-center">
                  <ImageIcon className="h-4 w-4 mr-2" />
                  {photo.photographer}
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors">
                  <Heart className="h-4 w-4" />
                  <span>{photo.likes}</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors">
                  <Download className="h-4 w-4" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function GalleryPage() {
  const { currentBrand } = useBrand();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('recent');

  const filteredPhotos = mockGalleryData.photos
    .filter(photo => {
      // Brand filter
      if (photo.brand !== currentBrand) return false;

      // Category filter
      if (selectedCategory !== 'all' && photo.category !== selectedCategory) return false;

      // Subcategory filter
      if (selectedSubcategory !== 'all' && photo.subcategory !== selectedSubcategory) return false;

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return photo.title.toLowerCase().includes(query) ||
          photo.description.toLowerCase().includes(query) ||
          photo.tags.some((tag: string) => tag.toLowerCase().includes(query));
      }

      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.likes - a.likes;
        case 'title':
          return a.title.localeCompare(b.title);
        case 'recent':
        default:
          return new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime();
      }
    });

  const handlePhotoClick = (photo: any) => {
    setSelectedPhoto(photo);
  };

  const handlePrevious = () => {
    const currentIndex = filteredPhotos.findIndex(p => p.id === selectedPhoto.id);
    if (currentIndex > 0) {
      setSelectedPhoto(filteredPhotos[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    const currentIndex = filteredPhotos.findIndex(p => p.id === selectedPhoto.id);
    if (currentIndex < filteredPhotos.length - 1) {
      setSelectedPhoto(filteredPhotos[currentIndex + 1]);
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Escape') setSelectedPhoto(null);
    if (e.key === 'ArrowLeft') handlePrevious();
    if (e.key === 'ArrowRight') handleNext();
  };

  useEffect(() => {
    if (selectedPhoto) {
      document.addEventListener('keydown', handleKeyPress);
      return () => document.removeEventListener('keydown', handleKeyPress);
    }
  }, [selectedPhoto]);

  return (
    <div className="min-h-screen bg-paper">
      {/* Header Section */}
      <section className="bg-surface py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <ImageIcon className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-hero font-serif text-ink mb-6">
                {currentBrand === 'konnichiwa' ? 'Konnichiwa Japan Gallery' : 'Namaste India Gallery'}
              </h1>
              <p className="text-bodyLarge text-slate max-w-3xl mx-auto">
                {currentBrand === 'konnichiwa'
                  ? 'Explore our collection of stunning photographs capturing the magic of Japanese culture in India. From sumo demonstrations to cosplay competitions, witness the vibrant celebration of tradition and modern culture.'
                  : 'Discover the vibrant world of Indian culture through our photo gallery. Experience the joy of classical dance, the tranquility of yoga sessions, and the warmth of community celebration.'
                }
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filters and Controls */}
      <section className="py-8 border-b border-border bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate" />
              <input
                type="text"
                placeholder="Search photos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setSelectedSubcategory('all');
                }}
                className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Categories</option>
                {mockGalleryData.categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              {selectedCategory !== 'all' && mockGalleryData.subcategories[selectedCategory as keyof typeof mockGalleryData.subcategories] && (
                <select
                  value={selectedSubcategory}
                  onChange={(e) => setSelectedSubcategory(e.target.value)}
                  className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="all">All Subcategories</option>
                  {mockGalleryData.subcategories[selectedCategory as keyof typeof mockGalleryData.subcategories].map((subcategory: string) => (
                    <option key={subcategory} value={subcategory}>
                      {subcategory}
                    </option>
                  ))}
                </select>
              )}

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="recent">Most Recent</option>
                <option value="popular">Most Popular</option>
                <option value="title">Title A-Z</option>
              </select>

              <div className="flex items-center border border-border rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-primary-500 text-white' : 'text-slate hover:text-ink'}`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-primary-500 text-white' : 'text-slate hover:text-ink'}`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Stats */}
      <section className="py-8 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-3xl font-bold text-primary-500 mb-2">
                {filteredPhotos.length}
              </div>
              <div className="text-slate">Photos</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="text-3xl font-bold text-primary-500 mb-2">
                {filteredPhotos.reduce((sum, photo) => sum + photo.likes, 0)}
              </div>
              <div className="text-slate">Total Likes</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-3xl font-bold text-primary-500 mb-2">
                {filteredPhotos.reduce((sum, photo) => sum + photo.downloads, 0)}
              </div>
              <div className="text-slate">Downloads</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="text-3xl font-bold text-primary-500 mb-2">
                {mockGalleryData.categories.length}
              </div>
              <div className="text-slate">Categories</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPhotos.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📸</div>
              <h3 className="text-h3 font-semibold text-ink mb-2">No photos found</h3>
              <p className="text-slate">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className={`grid gap-6 ${viewMode === 'grid'
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'grid-cols-1'
              }`}>
              {filteredPhotos.map((photo, index) => (
                <PhotoCard
                  key={photo.id}
                  photo={photo}
                  index={index}
                  onClick={handlePhotoClick}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <Lightbox
            photo={selectedPhoto}
            photos={filteredPhotos}
            onClose={() => setSelectedPhoto(null)}
            onPrevious={handlePrevious}
            onNext={handleNext}
          />
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="py-16 bg-primary-500 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-h2 font-serif mb-6">Share Your Moments</h2>
            <p className="text-bodyLarge mb-8 text-white/90">
              Be part of our visual story. Share your festival moments and inspire others with your cultural journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary-500 px-8 py-4 rounded-pill font-semibold hover:bg-gray-100 transition-colors duration-200">
                Submit Photos
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-pill font-semibold hover:bg-white hover:text-primary-500 transition-colors duration-200">
                View Guidelines
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}