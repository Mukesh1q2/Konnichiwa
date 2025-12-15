'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBrand } from '@/lib/brand-context';
import { TicketSelection } from '@/components/tickets/TicketSelection';
import { CheckoutForm } from '@/components/tickets/CheckoutForm';
import { TicketType } from '@/types';

// Sample ticket types (same as in TicketSelection)
const SAMPLE_TICKET_TYPES: TicketType[] = [
  {
    id: 'general',
    name: 'General Entry Pass',
    price: 500,
    currency: 'INR',
    accessLevel: 'general',
    features: [
      'Access to all public areas',
      'Main stage shows',
      'Cultural exhibitions',
      'Shopping & food area access',
      'Open workshops'
    ],
    maxQuantity: 10,
    available: true,
  },
  {
    id: 'workshop',
    name: 'Workshop Pass',
    price: 800,
    currency: 'INR',
    accessLevel: 'workshop',
    features: [
      'All General Entry features',
      'Access to all workshops',
      'Priority seating in cultural learning zones',
      'Certificate of participation',
      'Workshop materials included'
    ],
    maxQuantity: 5,
    available: true,
  },
  {
    id: 'vip',
    name: 'VIP All-Access Pass',
    price: 1500,
    currency: 'INR',
    accessLevel: 'vip',
    features: [
      'All Workshop Pass features',
      'Fast-track entry',
      'Reserved VIP seating',
      'Meet & greet opportunities',
      'VIP lounge access',
      'Complimentary festival merchandise',
      'Digital souvenir package'
    ],
    maxQuantity: 3,
    available: true,
  },
  {
    id: 'family',
    name: 'Family Pack',
    price: 1200,
    currency: 'INR',
    accessLevel: 'family',
    features: [
      'Entry for 2 adults + 2 children',
      'Access to Kids Zone',
      'Reserved family seating area',
      'Family photo opportunity',
      'Children\'s activity kit'
    ],
    maxQuantity: 2,
    available: true,
  },
  {
    id: 'student',
    name: 'Student Pass',
    price: 300,
    currency: 'INR',
    accessLevel: 'student',
    features: [
      'All General Entry features',
      'Student discount pricing',
      'Valid student ID required',
      'Educational content access'
    ],
    maxQuantity: 5,
    available: true,
  },
];

export default function TicketsPage() {
  const { currentBrand, brandConfig } = useBrand();
  const [selectedTickets, setSelectedTickets] = useState<Record<string, number>>({});
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [paymentMessage, setPaymentMessage] = useState('');

  const totalAmount = Object.entries(selectedTickets).reduce((total, [ticketId, quantity]) => {
    const ticket = SAMPLE_TICKET_TYPES.find(t => t.id === ticketId);
    return total + (ticket ? ticket.price * quantity : 0);
  }, 0);

  const totalItems = Object.values(selectedTickets).reduce((sum, quantity) => sum + quantity, 0);

  const handleTicketChange = (ticketId: string, quantity: number) => {
    setSelectedTickets(prev => ({
      ...prev,
      [ticketId]: quantity,
    }));
  };

  const handleCheckout = () => {
    if (totalItems === 0) {
      setPaymentMessage('Please select at least one ticket');
      setPaymentStatus('error');
      return;
    }
    setShowCheckout(true);
  };

  const handlePaymentSuccess = (paymentData: any) => {
    setPaymentStatus('success');
    setPaymentMessage('Payment completed successfully! Check your email for ticket confirmation.');
    
    // Reset form after success
    setTimeout(() => {
      setSelectedTickets({});
      setShowCheckout(false);
      setPaymentStatus('idle');
      setPaymentMessage('');
    }, 3000);
  };

  const handlePaymentError = (error: string) => {
    setPaymentStatus('error');
    setPaymentMessage(error);
    
    // Reset error state after 5 seconds
    setTimeout(() => {
      setPaymentStatus('idle');
      setPaymentMessage('');
    }, 5000);
  };

  const handleBackToTickets = () => {
    setShowCheckout(false);
    setPaymentStatus('idle');
    setPaymentMessage('');
  };

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
              <h1 className="text-hero font-serif text-ink mb-6">
                {currentBrand === 'konnichiwa' ? 'Konnichiwa Japan Tickets' : 'Namaste India Tickets'}
              </h1>
              <p className="text-bodyLarge text-slate max-w-3xl mx-auto">
                {currentBrand === 'konnichiwa' 
                  ? 'Choose your access to experience Japan\'s rich cultural heritage through performances, workshops, food, and unforgettable moments in Delhi.'
                  : 'Select your tickets to discover India\'s vibrant traditions, classical arts, and contemporary expressions through dance, music, food, and spiritual wellness in Tokyo.'
                }
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Event Information */}
      <section className="py-12 bg-accent-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="text-3xl mb-2">📅</div>
              <h3 className="text-h3 font-semibold text-ink mb-2">Event Dates</h3>
              <p className="text-slate">
                {currentBrand === 'konnichiwa' 
                  ? 'December 13-14, 2025'
                  : 'September 28-29, 2025'
                }
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-3xl mb-2">📍</div>
              <h3 className="text-h3 font-semibold text-ink mb-2">Venue</h3>
              <p className="text-slate">
                {currentBrand === 'konnichiwa' 
                  ? 'Select CITYWALK, Delhi'
                  : 'Yoyogi Park, Tokyo'
                }
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="text-3xl mb-2">🎭</div>
              <h3 className="text-h3 font-semibold text-ink mb-2">Experience</h3>
              <p className="text-slate">
                {currentBrand === 'konnichiwa' 
                  ? '600+ Japanese Artists'
                  : '600+ Indian Performers'
                }
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {!showCheckout ? (
              <motion.div
                key="ticket-selection"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <TicketSelection
                  ticketTypes={SAMPLE_TICKET_TYPES}
                  selectedTickets={selectedTickets}
                  onTicketChange={handleTicketChange}
                  onCheckout={handleCheckout}
                />
              </motion.div>
            ) : (
              <motion.div
                key="checkout"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <CheckoutForm
                  selectedTickets={selectedTickets}
                  ticketTypes={SAMPLE_TICKET_TYPES}
                  totalAmount={totalAmount}
                  onBack={handleBackToTickets}
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Payment Status Messages */}
      <AnimatePresence>
        {paymentStatus !== 'idle' && paymentMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed bottom-4 right-4 max-w-md p-4 rounded-lg shadow-lg z-50 ${
              paymentStatus === 'success' 
                ? 'bg-green-100 border border-green-200 text-green-800'
                : 'bg-red-100 border border-red-200 text-red-800'
            }`}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {paymentStatus === 'success' ? (
                  <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{paymentMessage}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAQ Section */}
      <section className="py-16 bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-h2 font-serif text-ink mb-4">Frequently Asked Questions</h2>
            <p className="text-slate">Everything you need to know about tickets and the festival</p>
          </div>

          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-ink mb-2">Are tickets refundable?</h3>
              <p className="text-slate">
                Refunds are allowed up to 7 days before the festival. After that, tickets are non-refundable but transferable.
              </p>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-semibold text-ink mb-2">Is re-entry allowed?</h3>
              <p className="text-slate">
                Yes, with a valid wristband or digital festival pass. You can come and go throughout the day.
              </p>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-semibold text-ink mb-2">Do children need tickets?</h3>
              <p className="text-slate">
                Children below 6 years enter free with parents. Children aged 6-12 require a discounted ticket.
              </p>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-semibold text-ink mb-2">Are tickets available at the venue?</h3>
              <p className="text-slate">
                Limited tickets may be available at the venue, but online booking is recommended to secure your preferred dates and avoid sold-out situations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}