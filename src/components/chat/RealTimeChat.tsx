'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  Send, 
  Smile, 
  Paperclip, 
  Image, 
  Mic, 
  Phone, 
  Video,
  Users,
  Globe,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Flag,
  MoreHorizontal,
  X,
  Minus,
  Maximize2,
  Minimize2,
  Settings,
  Shield,
  Star
} from 'lucide-react';
import { useBrand } from '@/lib/brand-context';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  message: string;
  timestamp: Date;
  type: 'text' | 'image' | 'emoji' | 'system';
  reactions?: { emoji: string; count: number; users: string[] }[];
  replyTo?: string;
  isModerator?: boolean;
  isVerified?: boolean;
  brand?: string;
}

interface ChatUser {
  id: string;
  username: string;
  avatar: string;
  isOnline: boolean;
  lastSeen: Date;
  role: 'user' | 'moderator' | 'admin';
  isVerified: boolean;
  brand: string;
  location?: string;
}

interface ChatRoom {
  id: string;
  name: string;
  description: string;
  type: 'general' | 'event' | 'cultural' | 'support' | 'anonymous';
  participants: number;
  isActive: boolean;
  moderators: string[];
  brand: string;
}

interface RealTimeChatProps {
  className?: string;
  variant?: 'sidebar' | 'floating' | 'fullscreen';
  showRooms?: boolean;
  showUserList?: boolean;
  maxMessages?: number;
}

const EMOJIS = ['🎌', '🌸', '🙏', '🕉️', '💃', '🥟', '🍜', '🧘', '🌟', '❤️', '😊', '👍', '🔥', '✨', '🎊'];

const CHAT_ROOMS: ChatRoom[] = [
  {
    id: 'general',
    name: 'General Chat',
    description: 'Open discussion for everyone',
    type: 'general',
    participants: 1247,
    isActive: true,
    moderators: ['mod1', 'mod2'],
    brand: 'both'
  },
  {
    id: 'cultural-exchange',
    name: 'Cultural Exchange',
    description: 'Share your cultural experiences and learn from others',
    type: 'cultural',
    participants: 892,
    isActive: true,
    moderators: ['mod3'],
    brand: 'both'
  },
  {
    id: 'anime-lovers',
    name: 'Anime & Manga',
    description: 'Discuss anime, manga, and pop culture',
    type: 'event',
    participants: 634,
    isActive: true,
    moderators: ['mod4'],
    brand: 'konnichiwa'
  },
  {
    id: 'bollywood-vibes',
    name: 'Bollywood & Dance',
    description: 'Share Bollywood songs, dance moves, and music',
    type: 'event',
    participants: 756,
    isActive: true,
    moderators: ['mod5'],
    brand: 'namaste'
  },
  {
    id: 'event-help',
    name: 'Event Support',
    description: 'Get help with tickets, directions, and event info',
    type: 'support',
    participants: 234,
    isActive: true,
    moderators: ['admin1', 'admin2'],
    brand: 'both'
  },
  {
    id: 'anonymous-chat',
    name: 'Anonymous Chat',
    description: 'Share thoughts and experiences anonymously',
    type: 'anonymous',
    participants: 445,
    isActive: false,
    moderators: ['mod6'],
    brand: 'both'
  }
];

const SAMPLE_MESSAGES: Message[] = [
  {
    id: '1',
    userId: 'user1',
    username: 'SakuraWarrior',
    avatar: '/images/avatars/sakura.jpg',
    message: 'Konnichiwa everyone! So excited for the sumo demonstration! 🥋',
    timestamp: new Date(Date.now() - 300000),
    type: 'text',
    reactions: [{ emoji: '👍', count: 12, users: ['user2', 'user3'] }],
    isVerified: true,
    brand: 'konnichiwa'
  },
  {
    id: '2',
    userId: 'user2',
    username: 'BollywoodBelle',
    avatar: '/images/avatars/bollywood.jpg',
    message: 'Namaste! Can\'t wait for the dance workshop later! 💃🕉️',
    timestamp: new Date(Date.now() - 240000),
    type: 'text',
    reactions: [{ emoji: '❤️', count: 8, users: ['user1', 'user4'] }],
    isVerified: false,
    brand: 'namaste'
  },
  {
    id: '3',
    userId: 'user3',
    username: 'CulturalBridge',
    avatar: '/images/avatars/bridge.jpg',
    message: 'This is such a beautiful celebration of both cultures! 🌸🙏',
    timestamp: new Date(Date.now() - 180000),
    type: 'text',
    reactions: [{ emoji: '🌟', count: 15, users: ['user1', 'user2', 'user5'] }],
    isVerified: true,
    brand: 'both'
  },
  {
    id: '4',
    userId: 'moderator1',
    username: 'FestivalModerator',
    avatar: '/images/avatars/moderator.jpg',
    message: 'Welcome to our cultural celebration! Please be respectful and enjoy the festivities! 🎊',
    timestamp: new Date(Date.now() - 120000),
    type: 'system',
    isModerator: true,
    brand: 'both'
  },
  {
    id: '5',
    userId: 'user4',
    username: 'AnimeFan2023',
    avatar: '/images/avatars/anime.jpg',
    message: 'The cosplay competition is amazing! So many incredible costumes! ✨',
    timestamp: new Date(Date.now() - 60000),
    type: 'text',
    reactions: [{ emoji: '🔥', count: 6, users: ['user1', 'user3'] }],
    brand: 'konnichiwa'
  }
];

const SAMPLE_USERS: ChatUser[] = [
  {
    id: 'user1',
    username: 'SakuraWarrior',
    avatar: '/images/avatars/sakura.jpg',
    isOnline: true,
    lastSeen: new Date(),
    role: 'user',
    isVerified: true,
    brand: 'konnichiwa',
    location: 'Tokyo, Japan'
  },
  {
    id: 'user2',
    username: 'BollywoodBelle',
    avatar: '/images/avatars/bollywood.jpg',
    isOnline: true,
    lastSeen: new Date(),
    role: 'user',
    isVerified: false,
    brand: 'namaste',
    location: 'Mumbai, India'
  },
  {
    id: 'user3',
    username: 'CulturalBridge',
    avatar: '/images/avatars/bridge.jpg',
    isOnline: true,
    lastSeen: new Date(),
    role: 'user',
    isVerified: true,
    brand: 'both',
    location: 'Singapore'
  },
  {
    id: 'moderator1',
    username: 'FestivalModerator',
    avatar: '/images/avatars/moderator.jpg',
    isOnline: true,
    lastSeen: new Date(),
    role: 'moderator',
    isVerified: true,
    brand: 'both'
  }
];

export function RealTimeChat({ 
  className, 
  variant = 'floating',
  showRooms = true,
  showUserList = false,
  maxMessages = 100 
}: RealTimeChatProps) {
  const { currentBrand } = useBrand();
  const [isOpen, setIsOpen] = useState(false);
  const [currentRoom, setCurrentRoom] = useState('general');
  const [messages, setMessages] = useState<Message[]>(SAMPLE_MESSAGES);
  const [newMessage, setNewMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showUserListState, setShowUserListState] = useState(showUserList);
  const [users, setUsers] = useState<ChatUser[]>(SAMPLE_USERS);
  const [filter, setFilter] = useState<'all' | 'online' | 'verified'>('all');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Filter rooms by brand
  const filteredRooms = CHAT_ROOMS.filter(room => 
    room.brand === 'both' || room.brand === currentBrand
  );

  const currentRoomData = filteredRooms.find(room => room.id === currentRoom);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      userId: 'current-user',
      username: 'You',
      avatar: '/images/avatars/default.jpg',
      message: newMessage,
      timestamp: new Date(),
      type: 'text',
      brand: currentBrand
    };

    setMessages(prev => [...prev, message].slice(-maxMessages));
    setNewMessage('');
    inputRef.current?.focus();

    // Simulate AI/cultural response
    setTimeout(() => {
      const responses = [
        'What a wonderful cultural exchange! 🙏',
        'That reminds me of similar traditions in our culture! 🌸',
        'Thanks for sharing that beautiful perspective! ✨',
        'I love how both cultures celebrate together! 🎊'
      ];
      
      const response: Message = {
        id: (Date.now() + 1).toString(),
        userId: 'ai-assistant',
        username: 'Cultural Guide',
        avatar: '/images/avatars/guide.jpg',
        message: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        type: 'text',
        isVerified: true,
        brand: currentBrand
      };

      setMessages(prev => [...prev, response].slice(-maxMessages));
    }, 1000 + Math.random() * 2000);
  };

  const handleEmojiSelect = (emoji: string) => {
    setNewMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const handleReaction = (messageId: string, emoji: string) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        const reactions = msg.reactions || [];
        const existingReaction = reactions.find(r => r.emoji === emoji);
        
        if (existingReaction) {
          // Toggle reaction
          if (existingReaction.users.includes('current-user')) {
            existingReaction.users = existingReaction.users.filter(u => u !== 'current-user');
            existingReaction.count = existingReaction.users.length;
          } else {
            existingReaction.users.push('current-user');
            existingReaction.count = existingReaction.users.length;
          }
        } else {
          reactions.push({
            emoji,
            count: 1,
            users: ['current-user']
          });
        }
        
        return { ...msg, reactions };
      }
      return msg;
    }));
  };

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getFilteredUsers = () => {
    let filtered = users;
    
    switch (filter) {
      case 'online':
        filtered = users.filter(user => user.isOnline);
        break;
      case 'verified':
        filtered = users.filter(user => user.isVerified);
        break;
    }
    
    return filtered.filter(user => 
      user.brand === currentBrand || user.brand === 'both'
    );
  };

  const ChatHeader = () => (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
          <MessageCircle className="w-4 h-4 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">
            {currentRoomData?.name || 'Chat'}
          </h3>
          <p className="text-xs text-gray-500">
            {currentRoomData?.participants || 0} participants
          </p>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setShowUserListState(!showUserListState)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Users className="w-4 h-4 text-gray-600" />
        </button>
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {isMinimized ? <Maximize2 className="w-4 h-4 text-gray-600" /> : <Minimize2 className="w-4 h-4 text-gray-600" />}
        </button>
        <button
          onClick={() => setIsOpen(false)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    </div>
  );

  const MessageBubble = ({ message }: { message: Message }) => {
    const isOwn = message.userId === 'current-user';
    const isModerator = message.isModerator;
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          'flex mb-4',
          isOwn ? 'justify-end' : 'justify-start'
        )}
      >
        <div className={cn(
          'max-w-xs lg:max-w-md',
          isOwn ? 'order-2' : 'order-1'
        )}>
          {!isOwn && (
            <div className="flex items-center space-x-2 mb-1">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">
                  {message.username.charAt(0)}
                </span>
              </div>
              <span className="text-xs font-medium text-gray-700">
                {message.username}
                {message.isVerified && <Star className="w-3 h-3 text-blue-500 inline ml-1" />}
                {isModerator && <Shield className="w-3 h-3 text-green-500 inline ml-1" />}
              </span>
              <span className="text-xs text-gray-500">
                {formatTime(message.timestamp)}
              </span>
            </div>
          )}
          
          <div className={cn(
            'px-4 py-2 rounded-2xl',
            isOwn 
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-br-sm'
              : 'bg-gray-100 text-gray-900 rounded-bl-sm'
          )}>
            <p className="text-sm">{message.message}</p>
            
            {message.reactions && message.reactions.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {message.reactions.map((reaction, index) => (
                  <button
                    key={index}
                    onClick={() => handleReaction(message.id, reaction.emoji)}
                    className={cn(
                      'flex items-center space-x-1 px-2 py-1 rounded-full text-xs transition-colors',
                      reaction.users.includes('current-user')
                        ? 'bg-purple-200 text-purple-800'
                        : 'bg-white/20 hover:bg-white/30'
                    )}
                  >
                    <span>{reaction.emoji}</span>
                    <span>{reaction.count}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  const RoomList = () => (
    <div className="p-4 border-b border-gray-200">
      <h4 className="font-medium text-gray-900 mb-3">Chat Rooms</h4>
      <div className="space-y-2">
        {filteredRooms.map(room => (
          <button
            key={room.id}
            onClick={() => setCurrentRoom(room.id)}
            className={cn(
              'w-full text-left p-3 rounded-lg transition-colors',
              currentRoom === room.id
                ? 'bg-purple-50 border-2 border-purple-200'
                : 'hover:bg-gray-50 border-2 border-transparent'
            )}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">{room.name}</div>
                <div className="text-xs text-gray-500">{room.description}</div>
              </div>
              <div className="text-xs text-gray-500">
                {room.participants}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const UserList = () => (
    <div className="p-4 border-b border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-medium text-gray-900">Online Users</h4>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
          className="text-xs border border-gray-300 rounded px-2 py-1"
        >
          <option value="all">All</option>
          <option value="online">Online</option>
          <option value="verified">Verified</option>
        </select>
      </div>
      
      <div className="space-y-2 max-h-32 overflow-y-auto">
        {getFilteredUsers().map(user => (
          <div key={user.id} className="flex items-center space-x-2">
            <div className="relative">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">
                  {user.username.charAt(0)}
                </span>
              </div>
              {user.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>
            <span className="text-xs text-gray-700 flex-1">
              {user.username}
              {user.isVerified && <Star className="w-3 h-3 text-blue-500 inline ml-1" />}
              {user.role === 'moderator' && <Shield className="w-3 h-3 text-green-500 inline ml-1" />}
            </span>
            {user.location && (
              <span className="text-xs text-gray-500">{user.location}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  if (variant === 'floating' && !isOpen) {
    return (
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg flex items-center justify-center z-40"
      >
        <MessageCircle className="w-6 h-6" />
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-xs text-white font-bold">3</span>
        </div>
      </motion.button>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className={cn(
            'fixed bottom-4 right-4 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-40',
            isMinimized && 'h-14',
            className
          )}
        >
          <ChatHeader />
          
          {!isMinimized && (
            <>
              {showRooms && <RoomList />}
              {showUserListState && <UserList />}
              
              {/* Messages */}
              <div className="h-64 overflow-y-auto p-4 space-y-1">
                {messages
                  .filter(msg => msg.brand === currentBrand || msg.brand === 'both')
                  .map(message => (
                    <MessageBubble key={message.id} message={message} />
                  ))}
                <div ref={messagesEndRef} />
              </div>
              
              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="flex-1 relative">
                    <input
                      ref={inputRef}
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type a message..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded"
                    >
                      <Smile className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                  
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                
                {/* Emoji Picker */}
                <AnimatePresence>
                  {showEmojiPicker && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute bottom-16 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-3"
                    >
                      <div className="grid grid-cols-5 gap-2">
                        {EMOJIS.map(emoji => (
                          <button
                            key={emoji}
                            onClick={() => handleEmojiSelect(emoji)}
                            className="p-2 hover:bg-gray-100 rounded text-lg"
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default RealTimeChat;