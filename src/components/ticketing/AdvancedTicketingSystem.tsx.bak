'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Users, MapPin, CreditCard, QrCode, Ticket, Star, Crown, Gift, Zap, Shield, CheckCircle } from 'lucide-react';

interface TicketTier {
  id: string;
  name: string;
  price: number;
  currency: string;
  icon: React.ReactNode;
  benefits: string[];
  popular?: boolean;
  limited?: boolean;
  quantity?: number;
  color: string;
}

interface TicketBooking {
  id: string;
  tier: string;
  quantity: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  qrCode?: string;
  bookingDate: string;
}

interface TicketSystemProps {
  eventName?: string;
  eventDate?: string;
  eventLocation?: string;
}

const AdvancedTicketingSystem: React.FC<TicketSystemProps> = ({
  eventName = "Konnichiwa Japan & Namaste India Cultural Festival",
  eventDate = "2025-03-15",
  eventLocation = "Cultural Heritage Center"
}) => {
  const [selectedTier, setSelectedTier] = useState<TicketTier | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [activeTab, setActiveTab] = useState<'tickets' | 'my-bookings'>('tickets');
  const [bookings, setBookings] = useState<TicketBooking[]>([]);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
    email: '',
    phone: ''
  });

  const ticketTiers: TicketTier[] = [
    {
      id: 'early-bird',
      name: 'Early Bird Special',
      price: 29.99,
      currency: 'USD',
      icon: <Gift className="w-6 h-6" />,
      benefits: [
        'General admission to all zones',
        'Welcome drink & snacks',
        'Cultural performance access',
        'Festival merchandise bag'
      ],
      limited: true,
      quantity: 500,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'standard',
      name: 'Standard Admission',
      price: 49.99,
      currency: 'USD',
      icon: <Ticket className="w-6 h-6" />,
      benefits: [
        'General admission to all zones',
        'Welcome drink & snacks',
        'Cultural performance access',
        'Workshop participation',
        'Festival merchandise',
        'Food court discounts'
      ],
      popular: true,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'premium',
      name: 'Premium Experience',
      price: 89.99,
      currency: 'USD',
      icon: <Star className="w-6 h-6" />,
      benefits: [
        'All Standard benefits',
        'VIP seating at performances',
        'Private workshop sessions',
        'Meet & greet with artists',
        'Premium food & beverage',
        'Priority queue access',
        'Exclusive merchandise'
      ],
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'vip',
      name: 'VIP Royal Experience',
      price: 149.99,
      currency: 'USD',
      icon: <Crown className="w-6 h-6" />,
      benefits: [
        'All Premium benefits',
        'Private lounge access',
        'Concierge service',
        'Exclusive cultural masterclass',
        'Professional photoshoot',
        'Personalized festival guide',
        'After-party access',
        'Transportation included'
      ],
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleBooking = async () => {
    if (!selectedTier) return;
    
    setIsBooking(true);
    
    // Simulate booking process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newBooking: TicketBooking = {
      id: `BK${Date.now()}`,
      tier: selectedTier.name,
      quantity,
      totalPrice: selectedTier.price * quantity,
      status: 'confirmed',
      qrCode: `QR${Date.now()}`,
      bookingDate: new Date().toISOString()
    };
    
    setBookings(prev => [newBooking, ...prev]);
    setBookingComplete(true);
    setIsBooking(false);
    setShowPayment(false);
    
    // Reset form
    setTimeout(() => {
      setSelectedTier(null);
      setQuantity(1);
      setBookingComplete(false);
    }, 3000);
  };

  const processPayment = async () => {
    setShowPayment(false);
    await handleBooking();
  };

  const getTotalPrice = () => {
    if (!selectedTier) return 0;
    const subtotal = selectedTier.price * quantity;
    const fees = subtotal * 0.05; // 5% processing fee
    const tax = subtotal * 0.08; // 8% tax
    return subtotal + fees + tax;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Advanced Ticketing System</h1>
              <div className="mt-2 space-y-1 text-gray-600">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(eventDate)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{eventLocation}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-indigo-600">{eventName}</div>
              <div className="text-sm text-gray-500">Cultural Festival Experience</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('tickets')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'tickets'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Ticket className="w-4 h-4 inline-block mr-2" />
            Buy Tickets
          </button>
          <button
            onClick={() => setActiveTab('my-bookings')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'my-bookings'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <QrCode className="w-4 h-4 inline-block mr-2" />
            My Bookings
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <AnimatePresence mode="wait">
          {activeTab === 'tickets' ? (
            <motion.div
              key="tickets"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Ticket Selection */}
              {!selectedTier && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {ticketTiers.map((tier) => (
                    <motion.div
                      key={tier.id}
                      whileHover={{ y: -4 }}
                      className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all cursor-pointer ${
                        tier.popular ? 'border-green-500 ring-2 ring-green-200' : 'border-gray-200 hover:border-indigo-300'
                      }`}
                      onClick={() => setSelectedTier(tier)}
                    >
                      {tier.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
                            <Zap className="w-3 h-3 mr-1" />
                            Most Popular
                          </span>
                        </div>
                      )}
                      
                      {tier.limited && (
                        <div className="absolute top-4 right-4">
                          <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium">
                            Limited
                          </span>
                        </div>
                      )}

                      <div className="p-6">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${tier.color} flex items-center justify-center text-white mb-4`}>
                          {tier.icon}
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                        <div className="text-3xl font-bold text-gray-900 mb-4">
                          ${tier.price}
                          <span className="text-sm font-normal text-gray-500"> / ticket</span>
                        </div>
                        
                        {tier.quantity && (
                          <div className="text-sm text-gray-500 mb-4">
                            {tier.quantity} tickets remaining
                          </div>
                        )}
                        
                        <ul className="space-y-2">
                          {tier.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start text-sm text-gray-600">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Booking Form */}
              {selectedTier && !bookingComplete && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-2xl shadow-lg p-8"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Complete Your Booking</h2>
                      <p className="text-gray-600 mt-1">{selectedTier.name} - ${selectedTier.price} each</p>
                    </div>
                    <button
                      onClick={() => setSelectedTier(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      ← Change Ticket Type
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Quantity Selection */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quantity</h3>
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                          disabled={quantity <= 1}
                        >
                          -
                        </button>
                        <span className="text-2xl font-bold text-gray-900 min-w-[3rem] text-center">{quantity}</span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        >
                          +
                        </button>
                      </div>
                      
                      {/* Benefits Summary */}
                      <div className="mt-6">
                        <h4 className="font-semibold text-gray-900 mb-3">What's Included:</h4>
                        <ul className="space-y-2">
                          {selectedTier.benefits.slice(0, 3).map((benefit, index) => (
                            <li key={index} className="flex items-center text-sm text-gray-600">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Order Summary */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                      <div className="bg-gray-50 rounded-xl p-6">
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span>Tickets ({quantity}x)</span>
                            <span>${(selectedTier.price * quantity).toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Processing Fee</span>
                            <span>${(selectedTier.price * quantity * 0.05).toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tax</span>
                            <span>${(selectedTier.price * quantity * 0.08).toFixed(2)}</span>
                          </div>
                          <hr className="my-3" />
                          <div className="flex justify-between text-lg font-bold">
                            <span>Total</span>
                            <span>${getTotalPrice().toFixed(2)}</span>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => setShowPayment(true)}
                          className={`w-full mt-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r ${selectedTier.color} hover:shadow-lg transition-all`}
                          disabled={isBooking}
                        >
                          {isBooking ? 'Processing...' : `Pay $${getTotalPrice().toFixed(2)}`}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Success Message */}
              {bookingComplete && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center"
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-green-800 mb-2">Booking Confirmed!</h2>
                  <p className="text-green-600 mb-4">Your tickets have been successfully booked. Check your email for confirmation details.</p>
                  <p className="text-sm text-green-500">Redirecting back to ticket selection...</p>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="my-bookings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {bookings.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                  <QrCode className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">No Bookings Yet</h2>
                  <p className="text-gray-600 mb-6">You haven't made any ticket bookings. Browse our ticket options to get started!</p>
                  <button
                    onClick={() => setActiveTab('tickets')}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
                  >
                    Browse Tickets
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="bg-white rounded-2xl shadow-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{booking.tier}</h3>
                          <p className="text-gray-600">Booking ID: {booking.id}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">${booking.totalPrice.toFixed(2)}</div>
                          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            booking.status === 'confirmed' 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            <Shield className="w-4 h-4 mr-1" />
                            {booking.status}
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <span className="text-sm font-medium text-gray-500">Quantity</span>
                          <p className="text-lg font-semibold">{booking.quantity} ticket{booking.quantity > 1 ? 's' : ''}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">Booking Date</span>
                          <p className="text-lg font-semibold">{new Date(booking.bookingDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">QR Code</span>
                          <div className="bg-gray-100 rounded-lg p-2 text-center">
                            <QrCode className="w-8 h-8 text-gray-600 mx-auto" />
                            <p className="text-xs text-gray-500 mt-1">{booking.qrCode}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPayment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full"
            >
              <div className="text-center mb-6">
                <CreditCard className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900">Payment Details</h2>
                <p className="text-gray-600 mt-1">Secure checkout for ${getTotalPrice().toFixed(2)}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                  <input
                    type="text"
                    value={paymentDetails.cardNumber}
                    onChange={(e) => setPaymentDetails(prev => ({ ...prev, cardNumber: e.target.value }))}
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                    <input
                      type="text"
                      value={paymentDetails.expiryDate}
                      onChange={(e) => setPaymentDetails(prev => ({ ...prev, expiryDate: e.target.value }))}
                      placeholder="MM/YY"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                    <input
                      type="text"
                      value={paymentDetails.cvv}
                      onChange={(e) => setPaymentDetails(prev => ({ ...prev, cvv: e.target.value }))}
                      placeholder="123"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                  <input
                    type="text"
                    value={paymentDetails.name}
                    onChange={(e) => setPaymentDetails(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="John Doe"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={paymentDetails.email}
                    onChange={(e) => setPaymentDetails(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="john@example.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex space-x-4 mt-8">
                <button
                  onClick={() => setShowPayment(false)}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={processPayment}
                  className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
                  disabled={!paymentDetails.cardNumber || !paymentDetails.name || !paymentDetails.email}
                >
                  Complete Payment
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdvancedTicketingSystem;