'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CreditCard, Smartphone, Building2, CheckCircle, AlertCircle, Lock } from 'lucide-react';
import { useBrand } from '@/lib/brand-context';
import { formatPrice } from '@/lib/utils';
import { TicketType } from '@/types';

interface CheckoutFormProps {
  selectedTickets: Record<string, number>;
  ticketTypes: TicketType[];
  totalAmount: number;
  onBack: () => void;
  onSuccess: (paymentData: any) => void;
  onError: (error: string) => void;
}

interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests?: string;
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  description: string;
  available: boolean;
}

const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'razorpay',
    name: 'Razorpay',
    icon: CreditCard,
    description: 'Credit/Debit Cards, UPI, Net Banking',
    available: true,
  },
  {
    id: 'stripe',
    name: 'Stripe',
    icon: Building2,
    description: 'International Cards, Digital Wallets',
    available: true,
  },
  {
    id: 'paypal',
    name: 'PayPal',
    icon: Smartphone,
    description: 'PayPal Account, Cards',
    available: true,
  },
];

export function CheckoutForm({
  selectedTickets,
  ticketTypes,
  totalAmount,
  onBack,
  onSuccess,
  onError,
}: CheckoutFormProps) {
  const { currentBrand } = useBrand();
  const [currentStep, setCurrentStep] = useState<'customer' | 'payment' | 'processing' | 'success'>('customer');
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: '',
  });
  const [selectedPayment, setSelectedPayment] = useState<string>('razorpay');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCustomerSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!customerInfo.firstName || !customerInfo.lastName || !customerInfo.email || !customerInfo.phone) {
      onError('Please fill in all required fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerInfo.email)) {
      onError('Please enter a valid email address');
      return;
    }

    setCurrentStep('payment');
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setCurrentStep('processing');

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Simulate successful payment
      const paymentData = {
        orderId: `ORDER_${Date.now()}`,
        paymentId: `PAY_${Math.random().toString(36).substr(2, 9)}`,
        amount: totalAmount,
        currency: currentBrand === 'konnichiwa' ? 'INR' : 'JPY',
        customer: customerInfo,
        tickets: Object.entries(selectedTickets).map(([ticketId, quantity]) => ({
          ticket: ticketTypes.find(t => t.id === ticketId),
          quantity,
        })),
        paymentMethod: selectedPayment,
        timestamp: new Date().toISOString(),
      };

      setCurrentStep('success');
      onSuccess(paymentData);
    } catch (error) {
      setCurrentStep('payment');
      onError('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const getSelectedTicketDetails = () => {
    const details: { ticket: TicketType; quantity: number }[] = [];
    Object.entries(selectedTickets).forEach(([ticketId, quantity]) => {
      if (quantity > 0) {
        const ticket = ticketTypes.find(t => t.id === ticketId);
        if (ticket) {
          details.push({ ticket, quantity });
        }
      }
    });
    return details;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        {/* Header */}
        <motion.div
          key="header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={onBack}
            className="flex items-center text-primary-500 hover:text-primary-700 mb-4"
            disabled={currentStep === 'processing'}
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Tickets
          </button>

          <h2 className="text-hero font-serif text-ink mb-2">
            Complete Your Purchase
          </h2>
          <p className="text-slate">
            Secure checkout for your {currentBrand === 'konnichiwa' ? 'Konnichiwa Japan' : 'Namaste India'} experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* Customer Information Step */}
              {currentStep === 'customer' && (
                <motion.div
                  key="customer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="card p-6"
                >
                  <h3 className="text-h3 font-semibold text-ink mb-6">Customer Information</h3>

                  <form onSubmit={handleCustomerSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-ink mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={customerInfo.firstName}
                          onChange={(e) => setCustomerInfo(prev => ({ ...prev, firstName: e.target.value }))}
                          className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="Enter your first name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-ink mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={customerInfo.lastName}
                          onChange={(e) => setCustomerInfo(prev => ({ ...prev, lastName: e.target.value }))}
                          className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="Enter your last name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-ink mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Enter your email address"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-ink mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Enter your phone number"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-ink mb-2">
                        Special Requests (Optional)
                      </label>
                      <textarea
                        value={customerInfo.specialRequests}
                        onChange={(e) => setCustomerInfo(prev => ({ ...prev, specialRequests: e.target.value }))}
                        rows={3}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Any special requirements or dietary restrictions..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-primary-500 text-white py-4 rounded-pill font-semibold hover:bg-primary-700 transition-colors duration-200"
                    >
                      Continue to Payment
                    </button>
                  </form>
                </motion.div>
              )}

              {/* Payment Step */}
              {currentStep === 'payment' && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="card p-6"
                >
                  <h3 className="text-h3 font-semibold text-ink mb-6">Payment Method</h3>

                  <form onSubmit={handlePaymentSubmit} className="space-y-6">
                    {/* Payment Options */}
                    <div className="space-y-3">
                      {PAYMENT_METHODS.map((method) => (
                        <label
                          key={method.id}
                          className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${selectedPayment === method.id
                              ? 'border-primary-500 bg-primary-50'
                              : 'border-border hover:border-gray-300'
                            }`}
                        >
                          <input
                            type="radio"
                            name="payment"
                            value={method.id}
                            checked={selectedPayment === method.id}
                            onChange={(e) => setSelectedPayment(e.target.value)}
                            className="sr-only"
                          />
                          <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${selectedPayment === method.id ? 'bg-primary-500' : 'bg-gray-200'
                              }`}>
                              <method.icon className={`h-5 w-5 ${selectedPayment === method.id ? 'text-white' : 'text-gray-600'
                                }`} />
                            </div>
                            <div>
                              <div className="font-medium text-ink">{method.name}</div>
                              <div className="text-sm text-slate">{method.description}</div>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>

                    {/* Security Notice */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center">
                        <Lock className="h-5 w-5 text-green-600 mr-2" />
                        <div className="text-sm text-green-800">
                          Your payment is secured with 256-bit SSL encryption
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <button
                        type="button"
                        onClick={() => setCurrentStep('customer')}
                        className="flex-1 border border-border text-ink py-4 rounded-pill font-semibold hover:bg-gray-50 transition-colors duration-200"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-primary-500 text-white py-4 rounded-pill font-semibold hover:bg-primary-700 transition-colors duration-200"
                      >
                        Pay {formatPrice(totalAmount, currentBrand === 'konnichiwa' ? 'INR' : 'JPY')}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* Processing Step */}
              {currentStep === 'processing' && (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="card p-12 text-center"
                >
                  <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
                  <h3 className="text-h3 font-semibold text-ink mb-2">Processing Payment</h3>
                  <p className="text-slate">
                    Please wait while we process your payment securely...
                  </p>
                </motion.div>
              )}

              {/* Success Step */}
              {currentStep === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="card p-12 text-center"
                >
                  <CheckCircle className="h-16 w-16 text-success mx-auto mb-6" />
                  <h3 className="text-h3 font-semibold text-ink mb-2">Payment Successful!</h3>
                  <p className="text-slate mb-6">
                    Your tickets have been confirmed. You'll receive an email confirmation shortly.
                  </p>
                  <button
                    onClick={() => window.location.href = '/tickets/success'}
                    className="bg-primary-500 text-white px-8 py-3 rounded-pill font-semibold hover:bg-primary-700 transition-colors duration-200"
                  >
                    View My Tickets
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card p-6 sticky top-6"
            >
              <h3 className="text-h3 font-semibold text-ink mb-6">Order Summary</h3>

              <div className="space-y-4 mb-6">
                {getSelectedTicketDetails().map(({ ticket, quantity }) => (
                  <div key={ticket.id} className="flex justify-between">
                    <div>
                      <div className="font-medium text-ink">{ticket.name}</div>
                      <div className="text-sm text-slate">Quantity: {quantity}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        {formatPrice(ticket.price * quantity, currentBrand === 'konnichiwa' ? 'INR' : 'JPY')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate">Subtotal</span>
                  <span className="font-medium">
                    {formatPrice(totalAmount, currentBrand === 'konnichiwa' ? 'INR' : 'JPY')}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate">Processing Fee</span>
                  <span className="font-medium text-success">FREE</span>
                </div>
                <div className="flex justify-between items-center text-h3 font-semibold text-ink border-t border-border pt-4">
                  <span>Total</span>
                  <span className="text-primary-500">
                    {formatPrice(totalAmount, currentBrand === 'konnichiwa' ? 'INR' : 'JPY')}
                  </span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-2" />
                  <div className="text-sm text-blue-800">
                    <strong>Need help?</strong> Contact us at{' '}
                    <a href="mailto:support@konnichiwajapan.com" className="underline">
                      support@konnichiwajapan.com
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatePresence>
    </div>
  );
}