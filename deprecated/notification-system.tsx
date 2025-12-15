'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  X, 
  Check, 
  AlertCircle, 
  Info, 
  CheckCircle, 
  AlertTriangle,
  Calendar,
  DollarSign,
  Mail,
  Users,
  Settings
} from 'lucide-react';

// Types
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  persistent?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
  data?: any;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  removeNotification: (id: string) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
  unreadCount: number;
}

// Notification Context
const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Notification Provider
export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      read: false
    };

    setNotifications(prev => [newNotification, ...prev]);

    // Auto-remove non-persistent notifications after 5 seconds
    if (!notification.persistent) {
      setTimeout(() => {
        removeNotification(newNotification.id);
      }, 5000);
    }
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      removeNotification,
      markAsRead,
      markAllAsRead,
      clearAll,
      unreadCount
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

// Hook to use notifications
export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

// Notification Icons
const notificationIcons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info
};

// Notification Colors
const notificationColors = {
  success: 'bg-green-50 border-green-200 text-green-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800'
};

// Individual Notification Component
const NotificationItem = ({ notification }: { notification: Notification }) => {
  const { removeNotification, markAsRead } = useNotifications();
  const IconComponent = notificationIcons[notification.type];

  const handleClick = () => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    if (notification.action) {
      notification.action.onClick();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.3 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.5, transition: { duration: 0.2 } }}
      className={`
        max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto 
        ring-1 ring-black ring-opacity-5 border-l-4
        ${notificationColors[notification.type]}
        ${!notification.read ? 'ring-2 ring-offset-2 ring-blue-500' : ''}
        ${notification.action ? 'cursor-pointer' : ''}
      `}
      onClick={handleClick}
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <IconComponent className="h-6 w-6" />
          </div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p className="text-sm font-medium text-gray-900">
              {notification.title}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              {notification.message}
            </p>
            {notification.action && (
              <div className="mt-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    notification.action!.onClick();
                  }}
                  className="text-sm bg-white px-3 py-2 rounded-md font-medium text-blue-600 hover:text-blue-500 border border-blue-300"
                >
                  {notification.action.label}
                </button>
              </div>
            )}
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeNotification(notification.id);
              }}
              className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3">
        <div className="text-xs text-gray-500">
          {notification.timestamp.toLocaleTimeString()}
        </div>
      </div>
    </motion.div>
  );
};

// Notification Container
export const NotificationContainer = () => {
  const { notifications } = useNotifications();

  return (
    <div
      aria-live="assertive"
      className="fixed inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end z-50"
    >
      <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
        <AnimatePresence>
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Notification Bell Component
export const NotificationBell = () => {
  const { notifications, markAllAsRead, unreadCount } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Mark all as read
                  </button>
                )}
              </div>
            </div>
            
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Bell className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                  <p>No notifications yet</p>
                </div>
              ) : (
                notifications.slice(0, 10).map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                      !notification.read ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => {
                      if (!notification.read) {
                        markAsRead(notification.id);
                      }
                      if (notification.action) {
                        notification.action.onClick();
                      }
                    }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        {(() => {
                          const IconComponent = notificationIcons[notification.type];
                          return <IconComponent className="h-5 w-5" />;
                        })()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {notification.title}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          {notification.timestamp.toLocaleString()}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="flex-shrink-0">
                          <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Notification Service Hook
export const useNotificationService = () => {
  const { addNotification } = useNotifications();

  const showSuccess = (title: string, message: string, options?: Partial<Notification>) => {
    addNotification({
      type: 'success',
      title,
      message,
      ...options
    });
  };

  const showError = (title: string, message: string, options?: Partial<Notification>) => {
    addNotification({
      type: 'error',
      title,
      message,
      persistent: true, // Errors should be persistent
      ...options
    });
  };

  const showWarning = (title: string, message: string, options?: Partial<Notification>) => {
    addNotification({
      type: 'warning',
      title,
      message,
      ...options
    });
  };

  const showInfo = (title: string, message: string, options?: Partial<Notification>) => {
    addNotification({
      type: 'info',
      title,
      message,
      ...options
    });
  };

  const showTicketConfirmation = (eventTitle: string, ticketCount: number) => {
    showSuccess(
      'Ticket Confirmed!',
      `Your ${ticketCount} ticket(s) for ${eventTitle} have been confirmed.`,
      {
        action: {
          label: 'View Tickets',
          onClick: () => window.location.href = '/dashboard/tickets'
        }
      }
    );
  };

  const showEventReminder = (eventTitle: string, eventDate: string) => {
    showInfo(
      'Event Reminder',
      `Don't forget! ${eventTitle} is tomorrow (${new Date(eventDate).toLocaleDateString()}).`,
      {
        action: {
          label: 'View Event',
          onClick: () => window.location.href = '/events'
        }
      }
    );
  };

  const showNewsletterSubscription = (email: string) => {
    showSuccess(
      'Welcome to our newsletter!',
      `Thank you for subscribing with ${email}. You'll receive updates about upcoming events.`
    );
  };

  const showContactSubmission = () => {
    showSuccess(
      'Message Sent!',
      'Thank you for contacting us. We\'ll get back to you within 24 hours.'
    );
  };

  const showPaymentError = (errorMessage: string) => {
    showError(
      'Payment Failed',
      `There was an issue processing your payment: ${errorMessage}`,
      {
        action: {
          label: 'Try Again',
          onClick: () => window.location.href = '/tickets'
        }
      }
    );
  };

  const showEventUpdate = (eventTitle: string, updateType: string, details: string) => {
    showWarning(
      `Event Update: ${eventTitle}`,
      `This event has been ${updateType}. ${details}`,
      {
        action: {
          label: 'View Details',
          onClick: () => window.location.href = '/events'
        }
      }
    );
  };

  const showNewEvent = (eventTitle: string) => {
    showInfo(
      'New Event Available!',
      `Check out "${eventTitle}" - a new cultural experience just added!`,
      {
        action: {
          label: 'View Event',
          onClick: () => window.location.href = '/events'
        }
      }
    );
  };

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showTicketConfirmation,
    showEventReminder,
    showNewsletterSubscription,
    showContactSubmission,
    showPaymentError,
    showEventUpdate,
    showNewEvent
  };
};

// Real-time notification hook (WebSocket or polling)
export const useRealtimeNotifications = () => {
  const { addNotification } = useNotifications();

  useEffect(() => {
    // In a real implementation, you would connect to a WebSocket
    // or set up Server-Sent Events for real-time notifications
    
    const interval = setInterval(() => {
      // Simulate real-time notifications
      // This would be replaced with actual WebSocket/polling logic
      const randomNotifications = [
        {
          type: 'info' as const,
          title: 'New Event Added',
          message: 'Traditional Tea Ceremony workshop is now available for registration.'
        },
        {
          type: 'success' as const,
          title: 'Registration Confirmed',
          message: 'Your spot in the Bollywood Dance Workshop has been confirmed.'
        }
      ];

      // Only show random notifications occasionally to avoid spam
      if (Math.random() < 0.1) { // 10% chance
        const randomNotification = randomNotifications[Math.floor(Math.random() * randomNotifications.length)];
        addNotification(randomNotification);
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [addNotification]);

  return null;
};

// Push notification service
export const usePushNotifications = () => {
  const { showInfo } = useNotifications();

  const requestPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  };

  const showPushNotification = (title: string, options?: NotificationOptions) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, {
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        ...options
      });
    } else {
      // Fallback to in-app notification
      showInfo('Notification', options?.body || title);
    }
  };

  const subscribeToPush = async () => {
    try {
      const permission = await requestPermission();
      if (permission) {
        // In a real implementation, you would subscribe to push notifications
        // using a service like Firebase Cloud Messaging or similar
        showInfo('Push Notifications Enabled', 'You\'ll receive notifications about new events and updates.');
      }
    } catch (error) {
    }
  };

  return {
    requestPermission,
    showPushNotification,
    subscribeToPush
  };
};

export default NotificationProvider;