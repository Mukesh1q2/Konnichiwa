// Notification system hooks and context (lib version)
// This file contains only hooks and context - no JSX components

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

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
}

export interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
  showSuccess: (title: string, message: string, options?: Partial<Notification>) => void;
  showError: (title: string, message: string, options?: Partial<Notification>) => void;
  showWarning: (title: string, message: string, options?: Partial<Notification>) => void;
  showInfo: (title: string, message: string, options?: Partial<Notification>) => void;
}

// Context
const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Notification Provider Component (moved to separate file)
// This is just the hook and context definition

// Hook to use notifications
export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

// Main notification hook with all logic
export const useNotificationSystem = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      read: false,
    };

    setNotifications(prev => [newNotification, ...prev]);
    setUnreadCount(prev => prev + 1);

    // Auto-remove non-persistent notifications after 5 seconds
    if (!notification.persistent) {
      setTimeout(() => {
        removeNotification(newNotification.id);
      }, 5000);
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
    setUnreadCount(0);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => {
      const notification = prev.find(n => n.id === id);
      if (notification && !notification.read) {
        setUnreadCount(count => Math.max(0, count - 1));
      }
      return prev.filter(notification => notification.id !== id);
    });
  };

  const clearAll = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  // Convenience methods for different notification types
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
      persistent: true, // Errors should be persistent by default
      ...options
    });
  };

  const showWarning = (title: string, message: string, options?: Partial<Notification>) => {
    addNotification({
      type: 'warning',
      title,
      message,
      persistent: options?.persistent || false,
      ...options
    });
  };

  const showInfo = (title: string, message: string, options?: Partial<Notification>) => {
    addNotification({
      type: 'info',
      title,
      message,
      persistent: options?.persistent || false,
      ...options
    });
  };

  // Event-specific convenience methods
  const showTicketConfirmation = (eventTitle: string, ticketType: string) => {
    showSuccess(
      'Ticket Confirmed!',
      `Your ${ticketType} ticket for "${eventTitle}" has been confirmed. Check your email for details.`,
      {
        action: {
          label: 'View Tickets',
          onClick: () => window.location.href = '/profile/tickets'
        }
      }
    );
  };

  const showEventReminder = (eventTitle: string, eventDate: Date) => {
    showInfo(
      'Event Reminder',
      `"${eventTitle}" is happening ${eventDate.toLocaleDateString()}. Don't forget to bring your ticket!`,
      {
        persistent: true,
        action: {
          label: 'View Event',
          onClick: () => window.location.href = '/events'
        }
      }
    );
  };

  const showNewsletterSubscription = (email: string) => {
    showSuccess(
      'Newsletter Subscribed!',
      `Thank you for subscribing with ${email}. You'll receive updates about upcoming events.`,
      {
        action: {
          label: 'Unsubscribe',
          onClick: () => window.location.href = '/newsletter'
        }
      }
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
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
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
  const { addNotification } = useNotificationSystem();

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

// Export context for provider component
export { NotificationContext };