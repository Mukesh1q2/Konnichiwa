'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  Ticket, 
  Star, 
  Share2, 
  Heart,
  ArrowLeft,
  ArrowRight,
  Play,
  Download,
  User,
  Tag,
  Shield,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';
import { useBrand } from '@/lib/brand-context';
import { formatDate, formatDateTime, formatPrice } from '@/lib/utils';

// Mock event detail data
const mockEventDetail = {
  id: 'event-001',
  title: 'Sumo Wrestling Demonstration',
  slug: 'sumo-wrestling-demonstration',
  shortDescription: 'Experience authentic Sumo wrestling with professional rikishi from Japan',
  description: `Join us for an extraordinary sumo wrestling demonstration featuring professional rikishi (sumo wrestlers) from Japan. This rare opportunity allows you to witness the power, discipline, and ancient tradition of sumo wrestling up close.

Our featured wrestlers will perform traditional pre-bout rituals, demonstrate various techniques, and provide an educational Q&A session about this fascinating sport. You'll learn about the strict traditions, training regimens, and cultural significance of sumo in Japanese society.

The demonstration includes:
• Traditional ring entry ceremonies (dohyo-iri)
• Live wrestling demonstrations
• Technique explanations and educational content
• Interactive Q&A with the wrestlers
• Photo opportunities with the performers

This event is perfect for culture enthusiasts, martial arts practitioners, and anyone curious about Japanese traditions. No prior knowledge of sumo is required - our experienced interpreters will guide you through every aspect of this ancient sport.`,
  brand: 'konnichiwa',
  category: 'sumo',
  startDate: '2025-12-13T10:00:00Z',
  endDate: '2025-12-13T12:00:00Z',
  venue: 'Main Stage',
  stage: 'Main Arena',
  capacity: 500,
  availableSeats: 287,
  ticketRequired: true,
  featured: true,
  ageRestriction: 'All ages',
  difficulty: 'Beginner',
  duration: '2 hours',
  tags: ['traditional', 'demonstration', 'performance', 'interactive', 'cultural'],
  images: [
    '/images/konnichiwa_japan_event_images_5.jpg',
    '/images/konnichiwa_japan_event_images_3.jpeg',
    '/images/konnichiwa_japan_event_images_0.jpg',
  ],
  performers: [
    {
      id: 'perf-001',
      name: 'Haruto Yamamoto',
      role: 'Head Wrestler',
      bio: 'Professional sumo wrestler with 8 years of experience in the sport. Specializes in traditional techniques and has performed internationally.',
      photo: '/images/indian_cultural_elements_3.jpeg',
      country: 'Japan',
      achievements: ['National Tournament Winner', 'Cultural Ambassador'],
    },
    {
      id: 'perf-002',
      name: 'Kenji Tanaka',
      role: 'Assistant Wrestler',
      bio: 'Rising star in Japanese sumo with expertise in technique demonstration and cultural education.',
      photo: '/images/indian_cultural_elements_4.jpg',
      country: 'Japan',
      achievements: ['Technique Specialist', 'Youth Mentor'],
    },
  ],
  schedule: [
    {
      time: '10:00 AM',
      activity: 'Doors Open & Cultural Introduction',
      description: 'Welcome reception with traditional Japanese tea service',
    },
    {
      time: '10:30 AM',
      activity: 'Sumo History & Traditions',
      description: 'Educational presentation about sumo culture and traditions',
    },
    {
      time: '11:00 AM',
      activity: 'Traditional Ring Entry Ceremony',
      description: 'Witness the sacred dohyo-iri ceremony performed by professional wrestlers',
    },
    {
      time: '11:30 AM',
      activity: 'Wrestling Demonstrations',
      description: 'Live demonstrations of various sumo techniques and strategies',
    },
    {
      time: '12:00 PM',
      activity: 'Interactive Q&A Session',
      description: 'Meet the wrestlers and ask questions about sumo culture',
    },
  ],
  includes: [
    'Professional sumo wrestling demonstration',
    'Cultural education and history session',
    'Interactive Q&A with wrestlers',
    'Photo opportunities with performers',
    'Traditional Japanese tea service',
    'Event program and information booklet',
  ],
  requirements: [
    'No special equipment needed',
    'Comfortable clothing recommended',
    'Photography allowed (no flash)',
    'Minimum age: No restriction',
  ],
  ticketTypes: [
    {
      id: 'general',
      name: 'General Admission',
      price: 500,
      currency: 'INR',
      available: true,
      maxQuantity: 10,
      features: [
        'Main arena seating',
        'Full event access',
        'Program booklet',
        'Tea service included',
      ],
    },
    {
      id: 'vip',
      name: 'VIP Experience',
      price: 1000,
      currency: 'INR',
      available: true,
      maxQuantity: 3,
      features: [
        'Front row premium seating',
        'Meet & greet with wrestlers',
        'Exclusive VIP lounge access',
        'Professional photo session',
        'Signed event memorabilia',
        'Priority entry',
      ],
    },
  ],
  faqs: [
    {
      question: 'What should I wear to the sumo demonstration?',
      answer: 'Comfortable, modest clothing is recommended. Avoid very short skirts or revealing clothing as a sign of respect for the cultural traditions.',
    },
    {
      question: 'Can I take photos during the event?',
      answer: 'Yes, photography is allowed throughout the demonstration. However, please avoid using flash during the traditional ceremonies out of respect.',
    },
    {
      question: 'Is the event suitable for children?',
      answer: 'Absolutely! The event is designed to be educational and entertaining for all ages. We have special activities planned for younger visitors.',
    },
    {
      question: 'Will there be an opportunity to interact with the wrestlers?',
      answer: 'Yes, there will be a dedicated Q&A session where you can meet the wrestlers and ask questions about sumo culture and their experiences.',
    },
  ],
  relatedEvents: [
    {
      id: 'event-002',
      title: 'Martial Arts Demonstration',
      category: 'martial-arts',
      date: '2025-12-13T15:00:00Z',
      image: '/images/japanese_traditional_elements_6.jpg',
    },
    {
      id: 'event-003',
      title: 'Traditional Tea Ceremony',
      category: 'workshop',
      date: '2025-12-14T11:00:00Z',
      image: '/images/japanese_traditional_elements_1.jpg',
    },
  ],
};

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const { currentBrand } = useBrand();
  const [selectedTicket, setSelectedTicket] = useState<string>('general');
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showBooking, setShowBooking] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const event = mockEventDetail;
  const selectedTicketType = event.ticketTypes.find(t => t.id === selectedTicket);
  const totalPrice = selectedTicketType ? selectedTicketType.price * quantity : 0;

  const handleBooking = () => {
    setShowBooking(true);
    // Here you would typically navigate to the booking page or open a booking modal
  };

  const handleImageNavigation = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentImageIndex((prev) => 
        prev === 0 ? event.images.length - 1 : prev - 1
      );
    } else {
      setCurrentImageIndex((prev) => 
        prev === event.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  return (
    <div className="min-h-screen bg-paper">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={event.images[currentImageIndex]}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>

        {/* Navigation Arrows */}
        {event.images.length > 1 && (
          <>
            <button
              onClick={() => handleImageNavigation('prev')}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <ArrowLeft className="h-6 w-6 text-white" />
            </button>
            <button
              onClick={() => handleImageNavigation('next')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <ArrowRight className="h-6 w-6 text-white" />
            </button>
          </>
        )}

        {/* Image Indicators */}
        {event.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {event.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-4xl">
              <div className="flex items-center space-x-4 mb-4">
                <span className="bg-primary-500 text-white px-4 py-2 rounded-pill text-sm font-medium">
                  {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                </span>
                {event.featured && (
                  <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded text-sm font-bold">
                    FEATURED
                  </span>
                )}
              </div>
              
              <h1 className="text-display font-serif text-white mb-4">
                {event.title}
              </h1>
              
              <p className="text-bodyLarge text-white/90 mb-6 max-w-2xl">
                {event.shortDescription}
              </p>
              
              <div className="flex flex-wrap items-center gap-6 text-white/80">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>{formatDate(event.startDate)}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>{event.duration}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{event.venue}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  <span>{event.availableSeats} seats available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Event Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-h2 font-serif text-ink mb-6">About This Event</h2>
              <div className="prose prose-lg max-w-none text-slate">
                {event.description.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>

            {/* What's Included */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-h3 font-semibold text-ink mb-6">What's Included</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {event.includes.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-slate">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Schedule */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-h3 font-semibold text-ink mb-6">Event Schedule</h3>
              <div className="space-y-4">
                {event.schedule.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-surface rounded-lg border border-border">
                    <div className="flex-shrink-0 w-24 text-primary-500 font-semibold">
                      {item.time}
                    </div>
                    <div>
                      <h4 className="font-semibold text-ink mb-1">{item.activity}</h4>
                      <p className="text-slate text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Performers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-h3 font-semibold text-ink mb-6">Featured Performers</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {event.performers.map((performer) => (
                  <div key={performer.id} className="card p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="h-8 w-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-ink mb-1">{performer.name}</h4>
                        <p className="text-primary-500 text-sm font-medium mb-2">{performer.role}</p>
                        <p className="text-slate text-sm mb-3">{performer.bio}</p>
                        <div className="flex flex-wrap gap-1">
                          {performer.achievements.map((achievement, index) => (
                            <span key={index} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                              {achievement}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Requirements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-h3 font-semibold text-ink mb-6">Requirements & Guidelines</h3>
              <div className="space-y-3">
                {event.requirements.map((requirement, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate">{requirement}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* FAQs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h3 className="text-h3 font-semibold text-ink mb-6">Frequently Asked Questions</h3>
              <div className="space-y-6">
                {event.faqs.map((faq, index) => (
                  <div key={index} className="border border-border rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-ink mb-3">{faq.question}</h4>
                    <p className="text-slate leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              {/* Booking Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="card p-6"
              >
                <h3 className="text-h3 font-semibold text-ink mb-6">Book Your Tickets</h3>
                
                {/* Ticket Type Selection */}
                <div className="space-y-4 mb-6">
                  {event.ticketTypes.map((ticket) => (
                    <label
                      key={ticket.id}
                      className={`flex items-start space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        selectedTicket === ticket.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-border hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="ticket"
                        value={ticket.id}
                        checked={selectedTicket === ticket.id}
                        onChange={(e) => setSelectedTicket(e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-ink">{ticket.name}</h4>
                          <span className="text-lg font-bold text-primary-500">
                            {formatPrice(ticket.price, 'INR')}
                          </span>
                        </div>
                        <div className="space-y-1">
                          {ticket.features.map((feature, index) => (
                            <div key={index} className="flex items-center text-sm text-slate">
                              <CheckCircle className="h-4 w-4 text-success mr-2" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>

                {/* Quantity Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-ink mb-3">
                    Number of Tickets
                  </label>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 border border-border rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      -
                    </button>
                    <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 border border-border rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Total Price */}
                <div className="border-t border-border pt-4 mb-6">
                  <div className="flex justify-between items-center text-h3 font-semibold text-ink">
                    <span>Total</span>
                    <span className="text-primary-500">
                      {formatPrice(totalPrice, 'INR')}
                    </span>
                  </div>
                </div>

                {/* Booking Button */}
                <button
                  onClick={handleBooking}
                  className="w-full bg-primary-500 text-white py-4 rounded-pill font-semibold hover:bg-primary-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Ticket className="h-5 w-5" />
                  <span>Book Now</span>
                </button>

                {/* Security Notice */}
                <div className="mt-4 flex items-center justify-center text-sm text-slate">
                  <Shield className="h-4 w-4 mr-2" />
                  <span>Secure booking with SSL encryption</span>
                </div>
              </motion.div>

              {/* Event Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="card p-6"
              >
                <h3 className="text-lg font-semibold text-ink mb-4">Share & Save</h3>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 border border-border rounded-lg transition-colors ${
                      isLiked 
                        ? 'bg-red-50 border-red-200 text-red-600' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                    <span>{isLiked ? 'Saved' : 'Save'}</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 border border-border rounded-lg hover:bg-gray-50 transition-colors">
                    <Share2 className="h-5 w-5" />
                    <span>Share</span>
                  </button>
                </div>
              </motion.div>

              {/* Related Events */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="card p-6"
              >
                <h3 className="text-lg font-semibold text-ink mb-4">Related Events</h3>
                <div className="space-y-4">
                  {event.relatedEvents.map((relatedEvent) => (
                    <div key={relatedEvent.id} className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                      <img
                        src={relatedEvent.image}
                        alt={relatedEvent.title}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-ink text-sm">{relatedEvent.title}</h4>
                        <p className="text-xs text-slate">{formatDate(relatedEvent.date)}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-slate" />
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}