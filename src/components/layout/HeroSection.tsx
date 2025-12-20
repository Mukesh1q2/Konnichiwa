'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { useBrand } from '@/lib/brand-context';
import { cn } from '@/lib/utils';

export function HeroSection() {
  const { brandConfig, currentBrand } = useBrand();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Get slider images or fallback to single hero image
  const sliderImages = brandConfig.images.sliderImages || [brandConfig.images.hero];
  const hasSlider = sliderImages.length > 1;

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    if (!hasSlider) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [hasSlider, sliderImages.length]);

  const goToSlide = (index: number) => setCurrentSlide(index);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Background Image Slider */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <Image
              src={sliderImages[currentSlide]}
              alt={`${brandConfig.displayName} - Slide ${currentSlide + 1}`}
              fill
              className="object-cover"
              priority
              quality={90}
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      </div>

      {/* Slider Navigation Arrows */}
      {hasSlider && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Slider Dots */}
      {hasSlider && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
          {sliderImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all duration-300",
                currentSlide === index
                  ? "bg-white w-8"
                  : "bg-white/50 hover:bg-white/70"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

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

              <button
                onClick={() => alert('Ticket booking system is coming soon! Please check back later.')}
                className={cn(
                  "inline-flex items-center justify-center px-8 py-4 rounded-pill font-semibold",
                  "bg-white/10 backdrop-blur-md text-white border border-white/20",
                  "hover:bg-white/20 transition-colors duration-200",
                  "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/50"
                )}
              >
                Buy Tickets
              </button>
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