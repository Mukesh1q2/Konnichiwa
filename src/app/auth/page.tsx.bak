'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthForm } from '@/components/auth/AuthForm';
import { UserDashboard } from '@/components/dashboard/UserDashboard';
import { useBrand } from '@/lib/brand-context';

export default function AuthPage() {
  const { currentBrand } = useBrand();
  const [user, setUser] = useState<any>(null);
  const [authStatus, setAuthStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [authMessage, setAuthMessage] = useState('');

  const handleAuthSuccess = (userData: any) => {
    setAuthStatus('success');
    setAuthMessage('Authentication successful!');
    setUser(userData);
    
    // Clear message after 3 seconds
    setTimeout(() => {
      setAuthStatus('idle');
      setAuthMessage('');
    }, 3000);
  };

  const handleAuthError = (error: string) => {
    setAuthStatus('error');
    setAuthMessage(error);
    
    // Clear error after 5 seconds
    setTimeout(() => {
      setAuthStatus('idle');
      setAuthMessage('');
    }, 5000);
  };

  const handleLogout = () => {
    setUser(null);
    setAuthStatus('idle');
    setAuthMessage('');
  };

  return (
    <div className="min-h-screen bg-paper">
      {/* Header Section */}
      <section className="bg-surface py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-3xl">
                  {currentBrand === 'konnichiwa' ? '🎌' : '🕺'}
                </span>
              </div>
              <h1 className="text-hero font-serif text-ink mb-6">
                {currentBrand === 'konnichiwa' ? 'Konnichiwa Japan' : 'Namaste India'}
              </h1>
              <p className="text-bodyLarge text-slate max-w-2xl mx-auto">
                {user 
                  ? 'Welcome back! Manage your festival tickets and experience.'
                  : 'Sign in to access your exclusive festival tickets and manage your cultural experience.'
                }
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {user ? (
              /* User Dashboard */
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <UserDashboard user={user} onLogout={handleLogout} />
              </motion.div>
            ) : (
              /* Authentication Form */
              <motion.div
                key="auth"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <AuthForm 
                  onSuccess={handleAuthSuccess}
                  onError={handleAuthError}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Status Messages */}
      <AnimatePresence>
        {authStatus !== 'idle' && authMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 max-w-md p-4 rounded-lg shadow-lg z-50 ${
              authStatus === 'success' 
                ? 'bg-green-100 border border-green-200 text-green-800'
                : 'bg-red-100 border border-red-200 text-red-800'
            }`}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {authStatus === 'success' ? (
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
                <p className="text-sm font-medium">{authMessage}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Features Section (only show when not logged in) */}
      {!user && (
        <section className="py-16 bg-surface">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-h2 font-serif text-ink mb-4">Why Create an Account?</h2>
              <p className="text-bodyLarge text-slate">
                Unlock exclusive benefits and manage your festival experience
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                  </svg>
                </div>
                <h3 className="text-h3 font-semibold text-ink mb-3">Ticket Management</h3>
                <p className="text-slate">
                  View, download, and manage all your festival tickets in one convenient dashboard
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-12" />
                  </svg>
                </div>
                <h3 className="text-h3 font-semibold text-ink mb-3">Exclusive Updates</h3>
                <p className="text-slate">
                  Get early access to new events, special offers, and behind-the-scenes content
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-h3 font-semibold text-ink mb-3">Digital Magazine</h3>
                <p className="text-slate">
                  Access exclusive articles, interviews, and cultural insights from our digital magazine
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Security & Privacy Section */}
      <section className="py-16 bg-ink text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center mb-6">
              <svg className="w-12 h-12 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h2 className="text-h2 font-serif mb-4">Your Privacy & Security Matter</h2>
            <p className="text-bodyLarge text-white/90 mb-6">
              We use industry-standard security measures to protect your personal information. 
              Your data is encrypted and never shared with third parties without your consent.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <h3 className="font-semibold text-white mb-2">🔒 Secure Data</h3>
                <p className="text-white/80">256-bit SSL encryption for all transactions</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">🛡️ Privacy First</h3>
                <p className="text-white/80">GDPR compliant data handling practices</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">📱 Two-Factor Auth</h3>
                <p className="text-white/80">Additional security layer for your account</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}