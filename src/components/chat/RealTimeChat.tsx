'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  Send,
  Smile,
  Users,
  Globe,
  X,
  Maximize2,
  Minimize2,
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
  }
];

const SAMPLE_USERS: ChatUser[] = [
  { id: 'user1', username: 'SakuraWarrior', avatar: '/images/avatars/sakura.jpg', isOnline: true, lastSeen: new Date(), role: 'user', isVerified: true, brand: 'konnichiwa', location: 'Tokyo' },
  { id: 'user2', username: 'BollywoodBelle', avatar: '/images/avatars/bollywood.jpg', isOnline: true, lastSeen: new Date(), role: 'user', isVerified: false, brand: 'namaste', location: 'Mumbai' }
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
  const [showRoomsState, setShowRoomsState] = useState(true);
  const [users] = useState<ChatUser[]>(SAMPLE_USERS);
  const [filter, setFilter] = useState<'all' | 'online' | 'verified'>('all');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, showRoomsState, isOpen]);

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
  };

  const handleEmojiSelect = (emoji: string) => {
    setNewMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const formatTime = (date: Date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const ChatHeader = () => (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
          <MessageCircle className="w-4 h-4 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 text-sm leading-none flex items-center">
            {showRoomsState ? 'Explore Rooms' : currentRoomData?.name}
          </h3>
          <p className="text-[10px] text-gray-500 mt-1">
            {showRoomsState ? `${filteredRooms.length} available` : `${currentRoomData?.participants} online`}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-1">
        <button onClick={() => setShowRoomsState(!showRoomsState)} className={cn("p-1.5 rounded-md transition-colors", showRoomsState ? "bg-purple-100 text-purple-600" : "hover:bg-gray-100 text-gray-600")}>
          <Globe className="w-4 h-4" />
        </button>
        <button onClick={() => setIsMinimized(!isMinimized)} className="p-1.5 hover:bg-gray-100 rounded-md transition-colors">
          {isMinimized ? <Maximize2 className="w-4 h-4 text-gray-600" /> : <Minimize2 className="w-4 h-4 text-gray-600" />}
        </button>
        <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-gray-100 rounded-md transition-colors">
          <X className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    </div>
  );

  const RoomList = () => (
    <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
      {filteredRooms.map(room => (
        <button
          key={room.id}
          onClick={() => { setCurrentRoom(room.id); setShowRoomsState(false); }}
          className={cn(
            'w-full text-left p-4 rounded-xl transition-all border-2',
            currentRoom === room.id ? 'bg-white border-purple-500 shadow-md' : 'bg-white border-transparent hover:border-gray-200 shadow-sm'
          )}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="font-bold text-gray-900 text-sm">{room.name}</div>
              <div className="text-xs text-gray-500 mt-0.5 line-clamp-1">{room.description}</div>
            </div>
            <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
              {room.participants}
            </span>
          </div>
        </button>
      ))}
    </div>
  );

  if (variant === 'floating' && !isOpen) {
    return (
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-60 w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg flex items-center justify-center z-50 group"
      >
        <MessageCircle className="w-6 h-6 group-hover:animate-pulse" />
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 border-2 border-white rounded-full text-[10px] flex items-center justify-center font-bold">3</span>
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
            'fixed bottom-4 right-60 w-[350px] bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden flex flex-col transition-all duration-300 ease-in-out',
            isMinimized ? 'h-16' : 'h-[500px] max-h-[80vh]'
          )}
        >
          <ChatHeader />

          {!isMinimized && (
            <>
              {showRoomsState ? (
                <RoomList />
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
                    {messages.filter(m => m.brand === currentBrand || m.brand === 'both').map((msg) => (
                      <div key={msg.id} className={cn("flex flex-col", msg.userId === 'current-user' ? "items-end" : "items-start")}>
                        <div className="flex items-center space-x-1 mb-1 px-1">
                          <span className="text-[10px] font-bold text-gray-500">{msg.username}</span>
                          <span className="text-[10px] text-gray-400">• {formatTime(msg.timestamp)}</span>
                        </div>
                        <div className={cn(
                          "max-w-[85%] px-3 py-2 rounded-2xl text-sm shadow-sm",
                          msg.userId === 'current-user'
                            ? "bg-purple-600 text-white rounded-tr-none"
                            : "bg-white text-gray-800 rounded-tl-none border border-gray-100"
                        )}>
                          {msg.message}
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  <div className="p-4 bg-white border-t border-gray-100">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 relative">
                        <input
                          ref={inputRef}
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          placeholder="Type a message..."
                          className="w-full px-4 py-2 bg-gray-100 border-transparent rounded-full focus:bg-white focus:ring-2 focus:ring-purple-500 transition-all text-sm outline-none"
                        />
                      </div>
                      <button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className="w-9 h-9 bg-purple-600 text-white rounded-full flex items-center justify-center disabled:opacity-50 transition-colors"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default RealTimeChat;