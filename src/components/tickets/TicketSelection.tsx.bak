'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Plus, Minus, CreditCard, Shield, Check } from 'lucide-react';
import { useBrand } from '@/lib/brand-context';
import { formatPrice } from '@/lib/utils';
import { TicketType } from '@/types';

interface TicketSelectionProps {
  ticketTypes: TicketType[];
  selectedTickets: Record<string, number>;
  onTicketChange: (ticketId: string, quantity: number) => void;
  onCheckout: () => void;
}

// Sample ticket types
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

export function TicketSelection({ 
  ticketTypes = SAMPLE_TICKET_TYPES, 
  selectedTickets = {}, 
  onTicketChange, 
  onCheckout 
}: TicketSelectionProps) {
  const { currentBrand, brandConfig } = useBrand();
  const [showCheckout, setShowCheckout] = useState(false);

  const totalAmount = Object.entries(selectedTickets).reduce((total, [ticketId, quantity]) => {
    const ticket = ticketTypes.find(t => t.id === ticketId);
    return total + (ticket ? ticket.price * quantity : 0);
  }, 0);

  const totalItems = Object.values(selectedTickets).reduce((sum, quantity) => sum + quantity, 0);

  const getAccessLevelLabel = (level: string) => {
    const labels = {
      general: 'General',
      workshop: 'Workshop',
      vip: 'VIP',
      family: 'Family',
      student: 'Student'
    };
    return labels[level as keyof typeof labels] || level;
  };

  const getAccessLevelColor = (level: string) => {
    const colors = {
      general: 'bg-blue-100 text-blue-800',
      workshop: 'bg-green-100 text-green-800',
      vip: 'bg-purple-100 text-purple-800',
      family: 'bg-orange-100 text-orange-800',
      student: 'bg-yellow-100 text-yellow-800'
    };
    return colors[level as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-hero font-serif text-ink mb-4">
          Choose Your {currentBrand === 'konnichiwa' ? 'Konnichiwa Japan' : 'Namaste India'} Experience
        </h2>
        <p className="text-bodyLarge text-slate">
          Select the perfect ticket type for your cultural festival journey
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <AnimatePresence>
          {ticketTypes.map((ticket, index) => {
            const quantity = selectedTickets[ticket.id] || 0;
            const isVip = ticket.accessLevel === 'vip';
            
            return (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`card group relative ${
                  isVip ? 'card-featured border-2 border-primary-500' : ''
                }`}
              >
                {isVip && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-500 text-white px-4 py-1 rounded-pill text-sm font-bold">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className={`inline-block px-3 py-1 rounded-pill text-xs font-medium ${getAccessLevelColor(ticket.accessLevel)}`}>
                        {getAccessLevelLabel(ticket.accessLevel)}
                      </span>
                      <h3 className="text-h3 font-semibold text-ink mt-2 mb-2">
                        {ticket.name}
                      </h3>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="text-4xl font-serif text-primary-500 mb-1">
                      {formatPrice(ticket.price, currentBrand === 'konnichiwa' ? 'INR' : 'JPY')}
                    </div>
                    <div className="text-sm text-slate">per person</div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <ul className="space-y-2">
                      {ticket.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check className="h-4 w-4 text-success mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-sm text-slate">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Quantity Selector */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => onTicketChange(ticket.id, Math.max(0, quantity - 1))}
                        className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-gray-50 transition-colors"
                        disabled={quantity === 0}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="text-lg font-semibold min-w-[2rem] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => onTicketChange(ticket.id, Math.min(ticket.maxQuantity, quantity + 1))}
                        className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-gray-50 transition-colors"
                        disabled={quantity >= ticket.maxQuantity}
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-sm text-slate">Available</div>
                      <div className="text-sm font-medium">{ticket.maxQuantity - quantity}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Cart Summary */}
      {totalItems > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface rounded-xl border border-border p-6 sticky bottom-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                <ShoppingCart className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-ink">Cart Summary</h3>
                <p className="text-sm text-slate">{totalItems} ticket{totalItems !== 1 ? 's' : ''} selected</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-serif text-primary-500">
                {formatPrice(totalAmount, currentBrand === 'konnichiwa' ? 'INR' : 'JPY')}
              </div>
            </div>
          </div>

          {/* Selected Items */}
          <div className="mb-4 space-y-2">
            {Object.entries(selectedTickets).map(([ticketId, quantity]) => {
              if (quantity === 0) return null;
              const ticket = ticketTypes.find(t => t.id === ticketId);
              if (!ticket) return null;
              
              return (
                <div key={ticketId} className="flex justify-between text-sm">
                  <span className="text-slate">{ticket.name} × {quantity}</span>
                  <span className="font-medium">
                    {formatPrice(ticket.price * quantity, currentBrand === 'konnichiwa' ? 'INR' : 'JPY')}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Checkout Button */}
          <button
            onClick={onCheckout}
            className="w-full bg-primary-500 text-white py-4 rounded-pill font-semibold hover:bg-primary-700 transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <CreditCard className="h-5 w-5" />
            <span>Proceed to Checkout</span>
            <Shield className="h-5 w-5" />
          </button>

          <div className="text-center mt-3">
            <p className="text-xs text-slate">
              Secure checkout with 256-bit SSL encryption
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}