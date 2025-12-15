'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { BrandToggle } from '@/components/brand/BrandToggle';
import { useBrand } from '@/lib/brand-context';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Events', href: '/events' },
  { name: 'AI Assistant', href: '/ai-assistant', badge: 'NEW' },
  { name: 'VR Experiences', href: '/vr-experiences', badge: 'NEW' },
  { name: 'AR Hunt', href: '/ar-hunt', badge: 'NEW' },
  { name: 'Social Hub', href: '/social-hub', badge: 'NEW' },
  { name: 'Education', href: '/education', badge: 'NEW' },
  { name: 'Tickets', href: '/tickets', badge: 'NEW' },
  { name: 'Magazine', href: '/magazine' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Contact', href: '/contact' },
];

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentBrand } = useBrand();

  return (
    <nav className="bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">
                  {currentBrand === 'konnichiwa' ? '🎌' : '🕺'}
                </span>
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
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-slate hover:text-ink transition-colors duration-200 font-medium relative"
              >
                <div className="flex items-center space-x-1">
                  <span>{item.name}</span>
                  {item.badge && (
                    <span className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                      {item.badge}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {/* Brand Toggle & CTA */}
          <div className="flex items-center space-x-4">
            <BrandToggle className="hidden sm:flex" />
            <Link
              href="/tickets"
              className="bg-primary-500 text-white px-6 py-3 rounded-pill font-semibold hover:bg-primary-700 transition-colors duration-200"
            >
              Buy Tickets
            </Link>

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

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-surface border-t border-border"
          >
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Brand Toggle */}
              <div className="flex justify-center">
                <BrandToggle />
              </div>

              {/* Mobile Navigation Links */}
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-slate hover:text-ink transition-colors duration-200 font-medium py-2 relative"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="flex items-center space-x-2">
                    <span>{item.name}</span>
                    {item.badge && (
                      <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
              
              {/* Mobile CTA */}
              <Link
                href="/tickets"
                className="block w-full bg-primary-500 text-white text-center px-6 py-3 rounded-pill font-semibold hover:bg-primary-700 transition-colors duration-200 mt-6"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Buy Tickets
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}