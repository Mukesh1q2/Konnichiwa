'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import { useBrand } from '@/lib/brand-context';
import { cn } from '@/lib/utils';

export function HeroSection() {
  const { brandConfig, currentBrand } = useBrand();

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={brandConfig.images.hero}
          alt={brandConfig.displayName}
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4"
            >
              <p className="text-white/90 text-lg font-medium">
                {brandConfig.content.tagline}
              </p>
            </motion.div>

            {/* Main Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6"
            >
              <h1 className="text-display font-serif text-white">
                {brandConfig.content.heroTitle}
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-bodyLarge text-white/90 mb-8 max-w-2xl"
            >
              <p>{brandConfig.content.heroSubtitle}</p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/events"
                className={cn(
                  "inline-flex items-center justify-center px-8 py-4 rounded-pill font-semibold",
                  "bg-primary-500 text-white hover:bg-primary-700 transition-colors duration-200",
                  "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                )}
              >
                Explore the Festival
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>

              <Link
                href="/tickets"
                className={cn(
                  "inline-flex items-center justify-center px-8 py-4 rounded-pill font-semibold",
                  "bg-white/10 backdrop-blur-md text-white border border-white/20",
                  "hover:bg-white/20 transition-colors duration-200",
                  "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/50"
                )}
              >
                Buy Tickets
              </Link>
            </motion.div>

            {/* Event Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 flex flex-col sm:flex-row gap-6 text-white/80"
            >
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                <span className="text-sm font-medium">
                  {currentBrand === 'konnichiwa' ? 'December 13-14, 2025' : 'September 28-29, 2025'}
                </span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span className="text-sm font-medium">
                  {currentBrand === 'konnichiwa' ? 'Select CITYWALK, Delhi' : 'Yoyogi Park, Tokyo'}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
}