'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Share2, Instagram, MessageCircle, Camera, Users, Heart } from 'lucide-react';
import { SocialShareManager } from '@/components/social/SocialShareManager';
import { RealTimeChat } from '@/components/chat/RealTimeChat';
import { useBrand } from '@/lib/brand-context';
import { useState } from 'react';

export default function SocialHubPage() {
  const { currentBrand } = useBrand();
  const [activeTab, setActiveTab] = useState<'share' | 'chat' | 'community'>('share');

  const shareContent = {
    title: `Join ${currentBrand === 'konnichiwa' ? 'Konnichiwa Japan' : 'Namaste India'} Cultural Festival`,
    text: currentBrand === 'konnichiwa' 
      ? 'Experience authentic Japanese culture in India! 🇯🇵 Sumo wrestling, anime, traditional arts & more!'
      : 'Celebrate vibrant Indian culture in Japan! 🇮🇳 Classical dance, Bollywood, yoga & cultural exchange!',
    url: typeof window !== 'undefined' ? window.location.href : '',
    image: currentBrand === 'konnichiwa' ? '/images/konnichiwa_japan_event_images_5.jpg' : '/images/indian_cultural_elements_3.jpeg',
    hashtags: currentBrand === 'konnichiwa' 
      ? ['#KonnichiwaJapan', '#JapaneseCulture', '#CulturalFestival', '#IndiaJapan', '#AnimeCulture']
      : ['#NamasteIndia', '#IndianCulture', '#CulturalFestival', '#JapanIndia', '#BollywoodVibes']
  };

  const socialFeatures = [
    {
      id: 'share',
      title: 'Share & Promote',
      description: 'Create custom social media content and share your festival experience',
      icon: Share2,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'chat',
      title: 'Live Chat',
      description: 'Connect with fellow culture enthusiasts in real-time chat rooms',
      icon: MessageCircle,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'community',
      title: 'Community Hub',
      description: 'Join discussions, share stories, and build cultural connections',
      icon: Users,
      color: 'from-green-500 to-teal-500'
    }
  ];

  const platformStats = [
    {
      platform: 'Instagram',
      icon: Instagram,
      followers: '12.5K',
      engagement: '+45%',
      color: 'text-pink-600 bg-pink-100'
    },
    {
      platform: 'Twitter',
      icon: MessageCircle,
      followers: '8.2K',
      engagement: '+32%',
      color: 'text-blue-600 bg-blue-100'
    },
    {
      platform: 'Discord',
      icon: Users,
      followers: '2.1K',
      engagement: '+78%',
      color: 'text-purple-600 bg-purple-100'
    },
    {
      platform: 'TikTok',
      icon: Camera,
      followers: '25.3K',
      engagement: '+156%',
      color: 'text-red-600 bg-red-100'
    }
  ];

  const recentPosts = [
    {
      id: 1,
      platform: 'Instagram',
      content: 'Just witnessed the most amazing sumo demonstration! 🇯🇵 The power and grace of these athletes is incredible. #KonnichiwaJapan #SumoWrestling',
      likes: 342,
      comments: 89,
      time: '2 hours ago'
    },
    {
      id: 2,
      platform: 'Twitter',
      content: 'Cultural exchange at its finest! Learning about Indian classical dance while sharing Japanese tea ceremony traditions. 🌍✨ #CulturalBridge',
      likes: 156,
      comments: 23,
      time: '4 hours ago'
    },
    {
      id: 3,
      platform: 'TikTok',
      content: 'Bollywood dance workshop is so much fun! 💃🕉️ The energy in this room is infectious! #NamasteIndia #BollywoodDance',
      likes: 892,
      comments: 67,
      time: '6 hours ago'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <section className="bg-white shadow-sm py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href="/"
                className="flex items-center text-purple-600 hover:text-purple-700 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Home
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-2xl font-bold text-gray-900">
                Social Hub
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Heart className="h-4 w-4 text-red-500" />
                <span>Join our community</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Users className="h-4 w-4 text-blue-500" />
                <span>48.1K followers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-xl p-2 shadow-lg">
              <div className="flex space-x-2">
                {socialFeatures.map((feature) => (
                  <button
                    key={feature.id}
                    onClick={() => setActiveTab(feature.id as any)}
                    className={`flex items-center space-x-3 px-6 py-3 rounded-lg transition-all ${
                      activeTab === feature.id
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <feature.icon className="h-5 w-5" />
                    <span className="font-medium">{feature.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Based on Active Tab */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === 'share' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Share Manager */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h2 className="text-h3 font-serif text-gray-900 mb-6">
                      Create & Share Content
                    </h2>
                    <SocialShareManager 
                      content={shareContent}
                      variant="default"
                      showQR={true}
                      showDownload={true}
                      showTemplates={true}
                    />
                  </div>
                </div>
                
                {/* Platform Stats */}
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl shadow-xl p-6">
                    <h3 className="text-h4 font-semibold text-gray-900 mb-4">
                      Social Media Stats
                    </h3>
                    <div className="space-y-4">
                      {platformStats.map((stat) => (
                        <div key={stat.platform} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                              <stat.icon className="h-5 w-5" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{stat.platform}</div>
                              <div className="text-sm text-gray-500">{stat.followers} followers</div>
                            </div>
                          </div>
                          <div className="text-green-600 text-sm font-medium">
                            {stat.engagement}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-2xl shadow-xl p-6">
                    <h3 className="text-h4 font-semibold text-gray-900 mb-4">
                      Recent Posts
                    </h3>
                    <div className="space-y-4">
                      {recentPosts.map((post) => (
                        <div key={post.id} className="border-l-4 border-purple-500 pl-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-xs font-medium text-purple-600">{post.platform}</span>
                            <span className="text-xs text-gray-500">{post.time}</span>
                          </div>
                          <p className="text-sm text-gray-700 mb-2 line-clamp-2">{post.content}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>{post.likes} likes</span>
                            <span>{post.comments} comments</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'chat' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-8">
                <h2 className="text-h3 font-serif text-gray-900 mb-4">
                  Live Community Chat
                </h2>
                <p className="text-bodyLarge text-gray-600 max-w-2xl mx-auto">
                  Connect with fellow culture enthusiasts in real-time. Share experiences, ask questions, and make new friends!
                </p>
              </div>
              
              {/* Chat Component */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <RealTimeChat 
                  variant="fullscreen"
                  showRooms={true}
                  showUserList={true}
                />
              </div>
            </motion.div>
          )}

          {activeTab === 'community' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Community Features */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h2 className="text-h3 font-serif text-gray-900 mb-6">
                    Community Features
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Users className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Cultural Exchange Forums
                        </h3>
                        <p className="text-gray-600">
                          Join discussions about traditions, share personal stories, and learn from community members.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Camera className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Photo & Video Sharing
                        </h3>
                        <p className="text-gray-600">
                          Share your festival moments and discover amazing content from other participants.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Heart className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Cultural Appreciation
                        </h3>
                        <p className="text-gray-600">
                          Celebrate and appreciate cultural diversity through community challenges and appreciation posts.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Community Stats */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h2 className="text-h3 font-serif text-gray-900 mb-6">
                    Community Stats
                  </h2>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-2">48.1K</div>
                      <div className="text-gray-600">Community Members</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">156K</div>
                      <div className="text-gray-600">Messages Shared</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">2.3K</div>
                      <div className="text-gray-600">Cultural Stories</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-orange-600 mb-2">89K</div>
                      <div className="text-gray-600">Photos Shared</div>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Featured Discussions
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Sumo Wrestling Techniques</span>
                        <span className="text-xs text-gray-500">124 replies</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Bollywood Dance Origins</span>
                        <span className="text-xs text-gray-500">89 replies</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Tea Ceremony Traditions</span>
                        <span className="text-xs text-gray-500">67 replies</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="-700">Yogatext-sm text-gray Philosophy & Practice</span>
                        <span className="text-xs text-gray-500">156 replies</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}