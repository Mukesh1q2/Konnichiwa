'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  Send,
  Bot,
  User,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  RotateCcw,
  Star,
  Book,
  MapPin,
  Calendar,
  Heart,
  Lightbulb,
  Sparkles,
  Languages,
  HelpCircle
} from 'lucide-react';
import { useBrand } from '@/lib/brand-context';
import { cn } from '@/lib/utils';

interface ChatMessage {
  id: string;
  type: 'user' | 'ai' | 'system';
  content: string;
  timestamp: Date;
  category?: 'greeting' | 'cultural' | 'event' | 'navigation' | 'learning' | 'fun';
  confidence?: number;
  suggestions?: string[];
  culturalContext?: string;
}

interface AIAssistant {
  id: string;
  name: string;
  personality: string;
  expertise: string[];
  culturalBackground: string;
  avatar: string;
  voiceStyle: string;
}

const AI_ASSISTANTS: Record<string, AIAssistant> = {
  konnichiwa: {
    id: 'sakura-ai',
    name: 'Sakura Sensei',
    personality: 'Wise, friendly, and passionate about Japanese culture',
    expertise: ['Japanese traditions', 'Tea ceremony', 'Calligraphy', 'Anime culture', 'Cultural etiquette'],
    culturalBackground: 'Traditional Japanese culture with modern insights',
    avatar: '/images/ai/sakura-sensei.png',
    voiceStyle: 'Gentle and respectful'
  },
  namaste: {
    id: 'guru-ai',
    name: 'Ganesha AI',
    personality: 'Enthusiastic, wise, and deeply rooted in Indian traditions',
    expertise: ['Indian classical arts', 'Yoga philosophy', 'Bollywood culture', 'Spiritual practices', 'Festivals'],
    culturalBackground: 'Rich Indian heritage with contemporary understanding',
    avatar: '/images/ai/ganesha-ai.png',
    voiceStyle: 'Warm and inspiring'
  }
};

const CULTURAL_KNOWLEDGE_BASE = {
  greetings: {
    konnichiwa: [
      "Konnichiwa! How can I help you explore Japanese culture today? 🌸",
      "Ohayo! Welcome! I'm here to share the beauty of Japanese traditions with you!",
      "Konbanwa! Let's discover something wonderful together!"
    ],
    namaste: [
      "Namaste! 🙏 I'm here to guide you through the vibrant world of Indian culture!",
      "Jai Hind! Welcome! How may I illuminate your path through our traditions?",
      "Swagatam! I'm excited to share our cultural treasures with you!"
    ]
  },
  culturalEducation: {
    konnichiwa: [
      {
        topic: "Tea Ceremony",
        response: "The Japanese tea ceremony, or 'chado' (茶道), is a traditional activity where powdered green tea is whisked with hot water and served according to specific rules. It's not just about drinking tea - it's a spiritual practice that promotes harmony, respect, purity, and tranquility. Would you like to know more about the steps involved? 🍵",
        suggestions: ["Tell me about the steps", "History of tea ceremony", "Modern tea ceremony"]
      },
      {
        topic: "Cherry Blossoms",
        response: "Cherry blossoms, or 'sakura' (桜), hold deep meaning in Japanese culture. They represent the transient nature of life - beautiful but fleeting. The tradition of 'hanami' (flower viewing) celebrates this beauty. During sakura season, people gather under blooming trees for picnics and contemplation. This teaches us to appreciate beautiful moments while they last. 🌸",
        suggestions: ["Hanami tradition", "Sakura varieties", "Best viewing spots"]
      },
      {
        topic: "Sumo Wrestling",
        response: "Sumo is Japan's national sport with over 1,500 years of history. It's more than wrestling - it's a spiritual practice that combines physical strength with mental discipline. Sumo wrestlers follow strict traditions including specific hairstyles, ritual purification, and dietary practices. The sport teaches respect, humility, and the connection between body, mind, and spirit. 🥋",
        suggestions: ["Sumo traditions", "Weight classes", "Notable wrestlers"]
      }
    ],
    namaste: [
      {
        topic: "Yoga Philosophy",
        response: "Yoga is much more than physical exercise - it's a complete science of living that originated in ancient India over 5,000 years ago. The word 'yoga' means 'union' - the union of mind, body, and spirit. Through asanas (postures), pranayama (breathing), and meditation, we achieve balance and inner peace. Yoga teaches us that true happiness comes from within. 🧘‍♀️",
        suggestions: ["Basic yoga poses", "Meditation techniques", "Yoga philosophy"]
      },
      {
        topic: "Bollywood Dance",
        response: "Bollywood dance is a vibrant fusion of classical Indian dance forms with contemporary influences. It tells stories through expressive movements, hand gestures (mudras), and facial expressions. Each dance sequence communicates emotions and narratives, making it a powerful form of cultural expression. The energy and joy of Bollywood dance bring communities together! 💃",
        suggestions: ["Popular dance moves", "Classical influences", "Costumes and music"]
      },
      {
        topic: "Henna Art",
        response: "Henna, or 'mehndi' (मेहंदी), is a traditional form of body art where designs are created using henna plant leaves. The intricate patterns often symbolize joy, beauty, spiritual growth, and offering. Henna ceremonies are integral to Indian celebrations like weddings, festivals, and coming-of-age rituals. Each region has its own unique patterns and cultural significance! 🌺",
        suggestions: ["Traditional patterns", "Henna ceremonies", "Regional styles"]
      }
    ]
  }
};

interface CulturalAIChatbotProps {
  className?: string;
  variant?: 'floating' | 'sidebar' | 'embedded';
  showVoice?: boolean;
  showSuggestions?: boolean;
  culturalMode?: boolean;
}

export function CulturalAIChatbot({
  className,
  variant = 'floating',
  showVoice = true,
  showSuggestions = true,
  culturalMode = true
}: CulturalAIChatbotProps) {
  const { currentBrand } = useBrand();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<'general' | 'cultural' | 'events' | 'learning'>('general');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const aiAssistant = AI_ASSISTANTS[currentBrand];

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: 'welcome',
        type: 'ai',
        content: culturalMode
          ? getRandomGreeting()
          : `Hello! I'm ${aiAssistant.name}, your AI cultural guide. How can I help you today?`,
        timestamp: new Date(),
        category: 'greeting',
        suggestions: [
          'Tell me about the culture',
          'What events are happening?',
          'Help me navigate',
          'Learn something new'
        ]
      };
      setMessages([welcomeMessage]);
    }
  }, [currentBrand, culturalMode]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getRandomGreeting = () => {
    const greetings = CULTURAL_KNOWLEDGE_BASE.greetings[currentBrand];
    return greetings[Math.floor(Math.random() * greetings.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          brand: currentBrand
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();

      const aiResponse: ChatMessage = {
        id: Date.now().toString(),
        type: 'ai',
        content: data.text,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiResponse]);

      if (voiceEnabled) {
        speakMessage(data.text);
      }
    } catch (error) {
      console.error('Chat Error:', error);
      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'system',
        content: "I'm having a little trouble connecting to my cultural scrolls right now. Please try again in a moment! 🙏",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
    // Use a small delay to ensure state update before sending
    setTimeout(() => {
      const btn = document.querySelector('button[aria-label="Send message"]') as HTMLButtonElement;
      btn?.click();
    }, 100);
  };

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsListening(true);
      // Voice recognition would be implemented here
      setTimeout(() => setIsListening(false), 3000);
    } else {
      alert('Voice recognition is not supported in your browser.');
    }
  };

  const speakMessage = (text: string) => {
    if ('speechSynthesis' in window && voiceEnabled) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = currentBrand === 'konnichiwa' ? 'ja-JP' : 'en-IN';
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
      setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
    }
  };

  const resetChat = () => {
    setMessages([]);
    setCurrentCategory('general');
  };

  const quickActions = [
    { icon: Book, label: 'Cultural Learning', category: 'learning' },
    { icon: MapPin, label: 'Find Locations', category: 'navigation' },
    { icon: Calendar, label: 'Event Info', category: 'events' },
    { icon: Heart, label: 'Cultural Facts', category: 'cultural' }
  ];

  if (variant === 'floating' && !isOpen) {
    return (
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-lg flex items-center justify-center z-40"
      >
        <Bot className="w-8 h-8" />
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
          <Sparkles className="w-3 h-3 text-white" />
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
            'fixed bottom-4 left-4 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-40',
            variant === 'sidebar' && 'w-80 h-[600px]',
            variant === 'embedded' && 'relative w-full h-full',
            className
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">{aiAssistant.name}</h3>
                <p className="text-sm opacity-90">Cultural AI Assistant</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {showVoice && (
                <button
                  onClick={() => setVoiceEnabled(!voiceEnabled)}
                  className={cn(
                    'p-2 rounded-lg transition-colors',
                    voiceEnabled ? 'bg-white/20' : 'hover:bg-white/10'
                  )}
                >
                  {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>
              )}
              <button
                onClick={resetChat}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                ×
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex space-x-2 overflow-x-auto">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  onClick={() => handleSuggestionClick(`Tell me about ${action.label.toLowerCase()}`)}
                  className="flex items-center space-x-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors whitespace-nowrap"
                >
                  <action.icon className="w-4 h-4" />
                  <span className="text-sm">{action.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  'flex',
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                <div className={cn(
                  'max-w-[80%] px-4 py-2 rounded-2xl',
                  message.type === 'user'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                    : 'bg-gray-100 text-gray-900'
                )}>
                  <div className="flex items-center space-x-2 mb-1">
                    {message.type === 'ai' && <Bot className="w-4 h-4" />}
                    <span className="text-xs font-medium opacity-70">
                      {message.type === 'ai' ? aiAssistant.name : 'You'}
                    </span>
                    {voiceEnabled && message.type === 'ai' && (
                      <button
                        onClick={() => speakMessage(message.content)}
                        className="text-xs opacity-70 hover:opacity-100"
                      >
                        🔊
                      </button>
                    )}
                  </div>
                  <p className="text-sm">{message.content}</p>

                  {/* Cultural Context Badge */}
                  {message.culturalContext && (
                    <div className="mt-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-700">
                        <Star className="w-3 h-3 mr-1" />
                        {message.culturalContext}
                      </span>
                    </div>
                  )}

                  {/* Suggestions */}
                  {showSuggestions && message.suggestions && (
                    <div className="mt-3 space-y-1">
                      {message.suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="block w-full text-left text-xs px-2 py-1 bg-white/20 hover:bg-white/30 rounded transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="bg-gray-100 px-4 py-2 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me anything about culture..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {showVoice && (
                <button
                  onClick={handleVoiceInput}
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center transition-colors',
                    isListening ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  )}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
              )}

              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                aria-label="Send message"
                className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center hover:from-blue-600 hover:to-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CulturalAIChatbot;