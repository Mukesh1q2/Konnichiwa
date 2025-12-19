'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { BrandToggle } from '@/components/brand/BrandToggle';
import { useBrand } from '@/lib/brand-context';
import { cn } from '@/lib/utils';

const mainNavigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Events', href: '/events' },
  { name: 'Magazine', href: '/magazine' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Contact', href: '/contact' },
];

const experiencesDropdown = [
  { name: 'AI Assistant', href: '/ai-assistant', icon: '🤖' },
  { name: 'VR Experiences', href: '/vr-experiences', icon: '🥽' },
  { name: 'AR Hunt', href: '/ar-hunt', icon: '🎯' },
  { name: 'Social Hub', href: '/social-hub', icon: '💬' },
  { name: 'Education', href: '/education', icon: '📚' },
];

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isExperiencesOpen, setIsExperiencesOpen] = useState(false);
  const { currentBrand, brandConfig } = useBrand();

  const handleBuyTickets = (e: React.MouseEvent) => {
    e.preventDefault();
    alert('Ticket booking system is coming soon! Please check back later.');
  };

  return (
    <nav className="bg-surface border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-surface/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center overflow-hidden">
                <Image
                  src={brandConfig.images.logo}
                  alt={brandConfig.displayName}
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-ink">
                  {currentBrand === 'konnichiwa' ? 'Konnichiwa Japan' : 'Namaste India'}
                </h1>
                <p className="text-sm text-slate">
                  {currentBrand === 'konnichiwa'
                    ? 'Japan in India'
                    : 'India in Japan'
                  }
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8 ml-10">
            {mainNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-slate hover:text-ink transition-colors duration-200 font-medium text-sm whitespace-nowrap"
              >
                {item.name}
              </Link>
            ))}

            {/* Experiences Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setIsExperiencesOpen(true)}
                onMouseLeave={() => setIsExperiencesOpen(false)}
                className="flex items-center space-x-1 text-slate hover:text-ink transition-colors duration-200 font-medium text-sm whitespace-nowrap"
              >
                <span>Experiences</span>
                <ChevronDown className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  isExperiencesOpen && "rotate-180"
                )} />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isExperiencesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    onMouseEnter={() => setIsExperiencesOpen(true)}
                    onMouseLeave={() => setIsExperiencesOpen(false)}
                    className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-border overflow-hidden"
                  >
                    {experiencesDropdown.map((item, index) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center space-x-3 px-4 py-3 hover:bg-primary-50 transition-colors duration-200 border-b border-border last:border-b-0"
                      >
                        <span className="text-2xl">{item.icon}</span>
                        <span className="text-sm font-medium text-ink">{item.name}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Brand Toggle & CTA */}
          <div className="flex items-center space-x-4">
            <BrandToggle className="hidden sm:flex" />
            <button
              onClick={handleBuyTickets}
              className="bg-primary-500 text-white px-6 py-3 rounded-pill font-semibold hover:bg-primary-700 transition-colors duration-200 text-sm"
            >
              Buy Tickets
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-slate hover:text-ink"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden border-t border-border bg-white"
          >
            <div className="px-4 py-6 space-y-4">
              {/* Main Navigation */}
              {mainNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-slate hover:text-ink transition-colors duration-200 font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {/* Experiences Section */}
              <div className="pt-4 border-t border-border">
                <p className="text-xs font-semibold text-slate uppercase tracking-wider mb-3">
                  Experiences
                </p>
                {experiencesDropdown.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-3 py-2 text-slate hover:text-ink transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                  </Link>
                ))}
              </div>

              {/* Mobile Brand Toggle */}
              <div className="pt-4 border-t border-border sm:hidden">
                <BrandToggle className="w-full justify-center" />
              </div>

              {/* Mobile CTA */}
              <button
                onClick={handleBuyTickets}
                className="block w-full bg-primary-500 text-white text-center px-6 py-3 rounded-pill font-semibold hover:bg-primary-700 transition-colors duration-200 mt-6"
              >
                Buy Tickets
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav >
  );
}