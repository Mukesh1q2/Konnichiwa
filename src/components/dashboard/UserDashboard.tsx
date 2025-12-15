'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Ticket, 
  Calendar, 
  Settings, 
  Bell, 
  Download, 
  Eye, 
  MapPin, 
  Clock,
  CreditCard,
  Mail,
  Phone,
  Edit,
  Save,
  X
} from 'lucide-react';
import { useBrand } from '@/lib/brand-context';
import { formatDate, formatPrice } from '@/lib/utils';

// Mock user data
const mockUser = {
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@email.com',
  phone: '+91 98765 43210',
  brand: 'konnichiwa' as const,
  preferences: {
    language: 'en',
    currency: 'INR',
    newsletter: true,
    smsNotifications: false,
  },
  tickets: [
    {
      id: 'TK001',
      type: 'VIP All-Access Pass',
      event: 'Konnichiwa Japan 2025',
      date: '2025-12-13T10:00:00Z',
      venue: 'Select CITYWALK, Delhi',
      status: 'confirmed',
      qrCode: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojZGM2MjI2OyIgLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojOTkxYjFiOyIgLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSJ1cmwoI2dyYWRpZW50KSIvPgogIDx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiNmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5LSU5OQ0hJV0EgS0lORAogIDwvdGV4dD4KPC9zdmc+',
      amount: 1500,
    },
    {
      id: 'TK002',
      type: 'Workshop Pass',
      event: 'Konnichiwa Japan 2025',
      date: '2025-12-14T14:00:00Z',
      venue: 'Select CITYWALK, Delhi',
      status: 'confirmed',
      qrCode: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojZWE1ODBjOyIgLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojYzI0MTBjOyIgLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSJ1cmwoI2dyYWRpZW50KSIvPgogIDx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiNmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5Xb3Jrc2hvcAogIDwvdGV4dD4KPC9zdmc+',
      amount: 800,
    },
  ],
  notifications: [
    {
      id: '1',
      type: 'ticket',
      title: 'Ticket Confirmation',
      message: 'Your VIP pass for Konnichiwa Japan 2025 has been confirmed.',
      date: '2025-12-10T10:30:00Z',
      read: false,
    },
    {
      id: '2',
      type: 'event',
      title: 'Event Reminder',
      message: 'Don\'t forget! Konnichiwa Japan starts tomorrow at Select CITYWALK.',
      date: '2025-12-12T18:00:00Z',
      read: true,
    },
  ],
};

type TabType = 'overview' | 'tickets' | 'profile' | 'settings' | 'notifications';

interface DashboardProps {
  user: any;
  onLogout: () => void;
}

export function UserDashboard({ user, onLogout }: DashboardProps) {
  const { currentBrand } = useBrand();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone || '',
  });

  const handleProfileSave = () => {
    // Here you would typically make an API call to update the user profile
    setIsEditing(false);
  };

  const handleProfileCancel = () => {
    setProfileData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone || '',
    });
    setIsEditing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const tabs = [
    { id: 'overview' as TabType, name: 'Overview', icon: User },
    { id: 'tickets' as TabType, name: 'My Tickets', icon: Ticket },
    { id: 'profile' as TabType, name: 'Profile', icon: Edit },
    { id: 'settings' as TabType, name: 'Settings', icon: Settings },
    { id: 'notifications' as TabType, name: 'Notifications', icon: Bell },
  ];

  return (
    <div className="min-h-screen bg-paper">
      {/* Header */}
      <section className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-hero font-serif text-ink">
                Welcome back, {user.firstName}!
              </h1>
              <p className="text-slate mt-2">
                Manage your {currentBrand === 'konnichiwa' ? 'Konnichiwa Japan' : 'Namaste India'} experience
              </p>
            </div>
            <button
              onClick={onLogout}
              className="text-primary-500 hover:text-primary-700 font-medium"
            >
              Sign Out
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-6">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-500 text-white'
                        : 'text-slate hover:bg-gray-50 hover:text-ink'
                    }`}
                  >
                    <tab.icon className="h-5 w-5" />
                    <span className="font-medium">{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="card p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-slate text-sm">Total Tickets</p>
                          <p className="text-2xl font-bold text-ink">{user.tickets.length}</p>
                        </div>
                        <Ticket className="h-8 w-8 text-primary-500" />
                      </div>
                    </div>
                    <div className="card p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-slate text-sm">Total Spent</p>
                          <p className="text-2xl font-bold text-ink">
                            {formatPrice(
                              user.tickets.reduce((sum: number, ticket: any) => sum + ticket.amount, 0),
                              user.preferences.currency
                            )}
                          </p>
                        </div>
                        <CreditCard className="h-8 w-8 text-primary-500" />
                      </div>
                    </div>
                    <div className="card p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-slate text-sm">Unread Notifications</p>
                          <p className="text-2xl font-bold text-ink">
                            {user.notifications.filter((n: any) => !n.read).length}
                          </p>
                        </div>
                        <Bell className="h-8 w-8 text-primary-500" />
                      </div>
                    </div>
                  </div>

                  {/* Upcoming Events */}
                  <div className="card p-6">
                    <h3 className="text-h3 font-semibold text-ink mb-6">Upcoming Events</h3>
                    <div className="space-y-4">
                      {user.tickets.map((ticket: any) => (
                        <div key={ticket.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center">
                              <Calendar className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-ink">{ticket.type}</h4>
                              <p className="text-slate text-sm">{ticket.event}</p>
                              <div className="flex items-center space-x-4 text-xs text-slate mt-1">
                                <span className="flex items-center">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {formatDate(ticket.date)}
                                </span>
                                <span className="flex items-center">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {ticket.venue}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className={`px-3 py-1 rounded-pill text-xs font-medium ${getStatusColor(ticket.status)}`}>
                              {ticket.status}
                            </span>
                            <button className="text-primary-500 hover:text-primary-700">
                              <Eye className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Tickets Tab */}
              {activeTab === 'tickets' && (
                <motion.div
                  key="tickets"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="card p-6">
                    <h3 className="text-h3 font-semibold text-ink mb-6">My Tickets</h3>
                    <div className="space-y-6">
                      {user.tickets.map((ticket: any) => (
                        <div key={ticket.id} className="border border-border rounded-lg p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h4 className="text-lg font-semibold text-ink">{ticket.type}</h4>
                              <p className="text-slate">{ticket.event}</p>
                              <div className="flex items-center space-x-6 text-sm text-slate mt-2">
                                <span className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  {formatDate(ticket.date)}
                                </span>
                                <span className="flex items-center">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  {ticket.venue}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className={`px-3 py-1 rounded-pill text-sm font-medium ${getStatusColor(ticket.status)}`}>
                                {ticket.status}
                              </span>
                              <p className="text-lg font-bold text-ink mt-2">
                                {formatPrice(ticket.amount, user.preferences.currency)}
                              </p>
                            </div>
                          </div>
                          
                          {/* QR Code */}
                          <div className="flex items-center justify-between pt-4 border-t border-border">
                            <div>
                              <p className="text-sm font-medium text-ink">Ticket ID: {ticket.id}</p>
                              <p className="text-sm text-slate">Show this QR code at the venue</p>
                            </div>
                            <div className="flex space-x-3">
                              <button className="flex items-center space-x-2 px-4 py-2 border border-border rounded-lg hover:bg-gray-50 transition-colors">
                                <Download className="h-4 w-4" />
                                <span>Download</span>
                              </button>
                              <button className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-700 transition-colors">
                                <Eye className="h-4 w-4" />
                                <span>View QR</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="card p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-h3 font-semibold text-ink">Profile Information</h3>
                      {!isEditing ? (
                        <button
                          onClick={() => setIsEditing(true)}
                          className="flex items-center space-x-2 px-4 py-2 border border-border rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                          <span>Edit</span>
                        </button>
                      ) : (
                        <div className="flex space-x-2">
                          <button
                            onClick={handleProfileSave}
                            className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-700 transition-colors"
                          >
                            <Save className="h-4 w-4" />
                            <span>Save</span>
                          </button>
                          <button
                            onClick={handleProfileCancel}
                            className="flex items-center space-x-2 px-4 py-2 border border-border rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <X className="h-4 w-4" />
                            <span>Cancel</span>
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-ink mb-2">
                            First Name
                          </label>
                          {isEditing ? (
                            <input
                              type="text"
                              value={profileData.firstName}
                              onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                          ) : (
                            <p className="text-ink py-3">{profileData.firstName}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-ink mb-2">
                            Last Name
                          </label>
                          {isEditing ? (
                            <input
                              type="text"
                              value={profileData.lastName}
                              onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                          ) : (
                            <p className="text-ink py-3">{profileData.lastName}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-ink mb-2">
                          Email Address
                        </label>
                        {isEditing ? (
                          <input
                            type="email"
                            value={profileData.email}
                            onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                            className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        ) : (
                          <p className="text-ink py-3">{profileData.email}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-ink mb-2">
                          Phone Number
                        </label>
                        {isEditing ? (
                          <input
                            type="tel"
                            value={profileData.phone}
                            onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                            className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        ) : (
                          <p className="text-ink py-3">{profileData.phone || 'Not provided'}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="card p-6">
                    <h3 className="text-h3 font-semibold text-ink mb-6">Preferences</h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-ink mb-3">
                          Language
                        </label>
                        <select className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                          <option value="en">English</option>
                          <option value="ja">日本語 (Japanese)</option>
                          <option value="hi">हिन्दी (Hindi)</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-ink mb-3">
                          Currency
                        </label>
                        <select className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                          <option value="INR">INR (Indian Rupee)</option>
                          <option value="JPY">JPY (Japanese Yen)</option>
                          <option value="USD">USD (US Dollar)</option>
                        </select>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-ink">Email Notifications</p>
                            <p className="text-sm text-slate">Receive updates about events and tickets</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-ink">SMS Notifications</p>
                            <p className="text-sm text-slate">Receive text messages for important updates</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <motion.div
                  key="notifications"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="card p-6">
                    <h3 className="text-h3 font-semibold text-ink mb-6">Recent Notifications</h3>
                    <div className="space-y-4">
                      {user.notifications.map((notification: any) => (
                        <div
                          key={notification.id}
                          className={`p-4 rounded-lg border ${
                            notification.read ? 'bg-gray-50 border-border' : 'bg-primary-50 border-primary-200'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-ink">{notification.title}</h4>
                              <p className="text-slate mt-1">{notification.message}</p>
                              <p className="text-xs text-slate mt-2">{formatDate(notification.date)}</p>
                            </div>
                            {!notification.read && (
                              <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}