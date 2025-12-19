'use client';

import { motion } from 'framer-motion';
import { useBrand } from '@/lib/brand-context';
import Link from 'next/link';
import { ArrowLeft, Calendar, MapPin, Clock } from 'lucide-react';

export default function TicketsPage() {
  const { currentBrand } = useBrand();

  return (
    <div className="min-h-screen bg-paper">
      {/* Header Section */}
      <section className="bg-surface py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-hero font-serif text-ink mb-6">
                {currentBrand === 'konnichiwa' ? 'Konnichiwa Japan Tickets' : 'Namaste India Tickets'}
              </h1>
              <div className="inline-flex items-center px-4 py-2 bg-primary-50 rounded-pill text-primary-700 font-semibold mb-8">
                <Clock className="w-4 h-4 mr-2" />
                Coming Soon
              </div>
              <p className="text-bodyLarge text-slate max-w-2xl mx-auto mb-12">
                Our advanced ticket booking system is currently under development.
                We are preparing to bring you a seamless experience to secure your place at the
                {currentBrand === 'konnichiwa' ? ' Konnichiwa Japan' : ' Namaste India'} festival.
              </p>

              <div className="flex justify-center gap-4">
                <Link
                  href="/"
                  className="inline-flex items-center px-8 py-3 bg-primary-500 text-white rounded-pill font-semibold hover:bg-primary-700 transition-colors duration-200"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
                <Link
                  href="/events"
                  className="inline-flex items-center px-8 py-3 border border-border text-ink rounded-pill font-semibold hover:bg-surface transition-colors duration-200"
                >
                  Explore Events
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-h2 font-serif text-ink">Be the First to Know</h2>
              <p className="text-slate">
                Sign up for our newsletter to receive an exclusive notification as soon as
                ticket bookings go live. Early birds will get access to special promotional
                pricing and limited VIP packages.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button className="px-6 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200">
                  Notify Me
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 gap-4"
            >
              <div className="card p-6 flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Calendar className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-ink">Save the Date</h3>
                  <p className="text-sm text-slate">
                    {currentBrand === 'konnichiwa' ? 'December 13-14, 2025' : 'September 28-29, 2025'}
                  </p>
                </div>
              </div>

              <div className="card p-6 flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-ink">Location</h3>
                  <p className="text-sm text-slate">
                    {currentBrand === 'konnichiwa' ? 'Select CITYWALK, Delhi' : 'Yoyogi Park, Tokyo'}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}