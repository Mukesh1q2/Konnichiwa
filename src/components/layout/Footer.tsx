'use client';

import Link from 'next/link';
import { useBrand } from '@/lib/brand-context';
import { Instagram, Twitter, Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const quickLinks = [
  { name: 'About', href: '/about' },
  { name: 'Events', href: '/events' },
  { name: 'Schedule', href: '/schedule' },
  { name: 'Tickets', href: '/tickets' },
  { name: 'Magazine', href: '/magazine' },
  { name: 'Gallery', href: '/gallery' },
];

const socialLinks = [
  { name: 'Instagram', href: '#', icon: Instagram },
  { name: 'Twitter', href: '#', icon: Twitter },
  { name: 'Facebook', href: '#', icon: Facebook },
  { name: 'YouTube', href: '#', icon: Youtube },
];

export function Footer() {
  const { currentBrand } = useBrand();

  return (
    <footer className="bg-ink text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">
                  {currentBrand === 'konnichiwa' ? '🎌' : '🕺'}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold">
                  {currentBrand === 'konnichiwa' ? 'Konnichiwa Japan' : 'Namaste India'}
                </h3>
                <p className="text-white/70 text-sm">
                  {currentBrand === 'konnichiwa' 
                    ? 'Japan in India' 
                    : 'India in Japan'
                  }
                </p>
              </div>
            </div>
            <p className="text-white/70 mb-6 leading-relaxed">
              {currentBrand === 'konnichiwa' 
                ? 'India’s largest Japanese cultural festival, celebrating the rich heritage and modern attractions of Japan through performances, workshops, food, and community experiences.'
                : 'Japan’s largest Indian cultural festival, showcasing India’s vibrant culture, classical arts, and contemporary expression through dance, music, food, and spiritual wellness.'
              }
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors duration-200"
                >
                  <item.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary-500 mt-0.5 flex-shrink-0" />
                <div className="text-white/70">
                  <p>
                    {currentBrand === 'konnichiwa' 
                      ? 'Select CITYWALK, Delhi'
                      : 'Yoyogi Park, Tokyo'
                    }
                  </p>
                  <p className="text-sm">
                    {currentBrand === 'konnichiwa' 
                      ? 'New Delhi, India'
                      : 'Tokyo, Japan'
                    }
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary-500 flex-shrink-0" />
                <a 
                  href="mailto:info@konnichiwajapan.com" 
                  className="text-white/70 hover:text-white transition-colors duration-200"
                >
                  info@konnichiwajapan.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary-500 flex-shrink-0" />
                <a 
                  href="tel:+91-11-1234-5678" 
                  className="text-white/70 hover:text-white transition-colors duration-200"
                >
                  +91 11 1234 5678
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Stay Updated</h3>
            <p className="text-white/70 mb-4">
              Get the latest updates about events, performers, and special offers.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button
                type="submit"
                className="w-full bg-primary-500 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} {currentBrand === 'konnichiwa' ? 'Konnichiwa Japan' : 'Namaste India'}. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-white/60 hover:text-white text-sm transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-white/60 hover:text-white text-sm transition-colors duration-200">
              Terms of Service
            </Link>
            <Link href="/accessibility" className="text-white/60 hover:text-white text-sm transition-colors duration-200">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}