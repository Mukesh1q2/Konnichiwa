'use client';

import { motion } from 'framer-motion';
import { useBrand } from '@/lib/brand-context';
import { MapPin, Users, Calendar, Award, Heart, Star } from 'lucide-react';

const About = () => {
  const { brand } = useBrand();

  const brandConfig = {
    konnichiwa: {
      name: 'Konnichiwa Japan',
      country: 'Japan',
      tagline: 'Celebrating Japanese Culture in India',
      primaryColor: 'from-red-600 to-red-800',
      secondaryColor: 'from-gray-100 to-gray-200',
      accentColor: 'text-red-700',
      bgImage: '/images/japan-bg.jpg',
      description: 'Experience the authentic spirit of Japan through cultural performances, traditional arts, cuisine, and community celebrations.',
      highlights: [
        'Traditional Japanese Arts & Crafts',
        'Authentic Japanese Cuisine & Tea Ceremonies', 
        'Cultural Performances & Entertainment',
        'Japanese Language & Calligraphy Workshops',
        'Community Building & Cultural Exchange'
      ]
    },
    namaste: {
      name: 'Namaste India',
      country: 'India', 
      tagline: 'Celebrating Indian Culture in Japan',
      primaryColor: 'from-orange-500 to-orange-700',
      secondaryColor: 'from-yellow-50 to-orange-50',
      accentColor: 'text-orange-700',
      bgImage: '/images/india-bg.jpg',
      description: 'Discover the vibrant diversity of Indian culture through classical dances, traditional music, delicious cuisine, and spiritual practices.',
      highlights: [
        'Classical Indian Dance & Music Performances',
        'Traditional Indian Cuisine & Cooking Demos',
        'Spiritual Practices & Yoga Sessions',
        'Indian Arts & Crafts Workshops',
        'Cross-cultural Dialogue & Understanding'
      ]
    }
  };

  const config = brandConfig[brand];

  const stats = [
    { icon: Calendar, value: '2017-2021', label: 'Years of Excellence' },
    { icon: Users, value: '50,000+', label: 'Happy Participants' },
    { icon: MapPin, value: '15+', label: 'Cities Visited' },
    { icon: Award, value: '100+', label: 'Cultural Events' }
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${config.secondaryColor}`}>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={config.bgImage} 
            alt={`${config.name} background`}
            className="w-full h-full object-cover opacity-20"
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${config.primaryColor} opacity-80`}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              About {config.name}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              {config.tagline}
            </p>
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
              <MapPin className="h-5 w-5 text-white" />
              <span className="text-white font-medium">Connecting Cultures Since 2017</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${config.primaryColor} text-white mb-4`}>
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  {config.name} was born from a simple yet powerful vision: to bridge the cultural divide between {config.country} and India through authentic experiences and meaningful connections.
                </p>
                <p>
                  Since 2017, we have been dedicated to creating immersive cultural experiences that allow people to explore, understand, and appreciate the rich heritage of {config.country}. Our events serve as platforms for cultural exchange, education, and community building.
                </p>
                <p>
                  What started as a small community gathering has grown into a series of comprehensive cultural festivals that celebrate the beauty and diversity of {config.country.toLowerCase()} traditions while fostering mutual respect and understanding between cultures.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <div className={`h-2 w-20 bg-gradient-to-r ${config.primaryColor} rounded-full mb-6`}></div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-700 leading-relaxed">
                  To create authentic cultural experiences that celebrate the beauty of {config.country.toLowerCase()} traditions while fostering deep connections and understanding between diverse communities.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              What We Offer
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {config.description}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {config.highlights.map((highlight, index) => (
              <motion.div
                key={highlight}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${config.primaryColor} text-white mb-4`}>
                  <Star className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{highlight}</h3>
                <p className="text-gray-600">
                  Experience authentic {config.country.toLowerCase()} culture through hands-on activities and expert guidance.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={`py-20 bg-gradient-to-r ${config.primaryColor}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Our Values
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: 'Authenticity',
                description: 'We are committed to presenting genuine cultural experiences with respect and accuracy.'
              },
              {
                icon: Users,
                title: 'Community',
                description: 'Building meaningful connections and fostering a sense of belonging for all participants.'
              },
              {
                icon: Award,
                title: 'Excellence',
                description: 'Maintaining the highest standards in all our events, workshops, and cultural programs.'
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm text-white mb-6">
                  <value.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{value.title}</h3>
                <p className="text-white/90">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Join Our Cultural Journey
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Be part of our mission to celebrate and share the beauty of cross-cultural understanding. 
              Together, we create experiences that bring communities closer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/events"
                className={`inline-flex items-center justify-center px-8 py-4 rounded-lg bg-gradient-to-r ${config.primaryColor} text-white font-semibold hover:opacity-90 transition-opacity duration-300`}
              >
                Explore Events
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg border-2 border-white text-white font-semibold hover:bg-white hover:text-gray-900 transition-colors duration-300"
              >
                Get In Touch
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;