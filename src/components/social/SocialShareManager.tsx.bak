'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Share2, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  MessageCircle,
  Copy,
  Download,
  Camera,
  Video,
  Music,
  QrCode,
  Link as LinkIcon
} from 'lucide-react';
import { useBrand } from '@/lib/brand-context';
import { cn } from '@/lib/utils';

interface SocialPlatform {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
  shareUrl: (url: string, text: string) => string;
}

interface ShareContent {
  title: string;
  text: string;
  url: string;
  image?: string;
  hashtags?: string[];
}

const socialPlatforms: SocialPlatform[] = [
  {
    id: 'facebook',
    name: 'Facebook',
    icon: Facebook,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 hover:bg-blue-100',
    shareUrl: (url, text) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`
  },
  {
    id: 'twitter',
    name: 'Twitter',
    icon: Twitter,
    color: 'text-blue-400',
    bgColor: 'bg-blue-50 hover:bg-blue-100',
    shareUrl: (url, text) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: Instagram,
    color: 'text-pink-600',
    bgColor: 'bg-pink-50 hover:bg-pink-100',
    shareUrl: (url, text) => `https://www.instagram.com/`
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: Linkedin,
    color: 'text-blue-700',
    bgColor: 'bg-blue-50 hover:bg-blue-100',
    shareUrl: (url, text) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&summary=${encodeURIComponent(text)}`
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: Youtube,
    color: 'text-red-600',
    bgColor: 'bg-red-50 hover:bg-red-100',
    shareUrl: (url, text) => `https://www.youtube.com/`
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: MessageCircle,
    color: 'text-green-600',
    bgColor: 'bg-green-50 hover:bg-green-100',
    shareUrl: (url, text) => `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`
  }
];

interface SocialShareManagerProps {
  content: ShareContent;
  variant?: 'default' | 'compact' | 'floating' | 'inline';
  showQR?: boolean;
  showDownload?: boolean;
  showTemplates?: boolean;
  className?: string;
}

export function SocialShareManager({ 
  content, 
  variant = 'default',
  showQR = true,
  showDownload = true,
  showTemplates = true,
  className 
}: SocialShareManagerProps) {
  const { currentBrand } = useBrand();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('default');
  const [copied, setCopied] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);

  const brandTemplates = {
    konnichiwa: {
      default: `${content.title} 🇯🇵 Experience authentic Japanese culture at our festival! ${content.url}`,
      cultural: `${content.title} 🌸 Join us in celebrating the beauty of Japanese traditions and modern culture! ${content.url}`,
      event: `${content.title} 🎌 Don't miss this amazing Japanese cultural event! See you there! ${content.url}`,
      festival: `${content.title} 🎊 Celebrating Japan-India friendship through culture! ${content.url}`
    },
    namaste: {
      default: `${content.title} 🇮🇳 Experience the vibrant spirit of Indian culture at our festival! ${content.url}`,
      cultural: `${content.title} 🕉️ Join us in celebrating the rich heritage of India! ${content.url}`,
      event: `${content.title} 💃 Don't miss this incredible Indian cultural experience! ${content.url}`,
      festival: `${content.title} 🎭 Celebrating India-Japan friendship through vibrant culture! ${content.url}`
    }
  };

  const templates = brandTemplates[currentBrand];
  const currentText = templates[selectedTemplate as keyof typeof templates] || content.text;

  const handleShare = (platform: SocialPlatform) => {
    const shareUrl = platform.shareUrl(content.url, currentText);
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(content.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
    }
  };

  const handleDownloadContent = async () => {
    // Create downloadable content
    const downloadData = {
      title: content.title,
      description: currentText,
      url: content.url,
      image: content.image,
      timestamp: new Date().toISOString(),
      brand: currentBrand
    };

    const blob = new Blob([JSON.stringify(downloadData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${content.title.replace(/\s+/g, '-').toLowerCase()}-social-content.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCreateStory = (platform: string) => {
    // Story creation logic for different platforms
    const storyTemplates = {
      instagram: {
        hashtags: currentBrand === 'konnichiwa' 
          ? '#KonnichiwaJapan #JapaneseCulture #CulturalFestival #IndiaJapan #AnimeCulture'
          : '#NamasteIndia #IndianCulture #CulturalFestival #IndiaJapan #BollywoodVibes',
        backgroundColor: currentBrand === 'konnichiwa' ? '#FF6B9D' : '#FF9500',
        textColor: '#FFFFFF'
      }
    };

    // This would integrate with platform APIs in a real implementation
  };

  const ShareButton = ({ platform, compact = false }: { platform: SocialPlatform; compact?: boolean }) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => handleShare(platform)}
      className={cn(
        'flex items-center justify-center rounded-lg transition-colors',
        compact ? 'w-10 h-10' : 'w-full px-4 py-3 space-x-3',
        platform.bgColor,
        platform.color
      )}
      title={`Share on ${platform.name}`}
    >
      <platform.icon className={cn(compact ? 'w-5 h-5' : 'w-5 h-5')} />
      {!compact && <span className="font-medium">{platform.name}</span>}
    </motion.button>
  );

  const floatingShareButton = (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setIsOpen(!isOpen)}
      className="fixed bottom-20 right-4 z-40 w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg flex items-center justify-center"
    >
      <Share2 className="w-6 h-6" />
    </motion.button>
  );

  if (variant === 'floating') {
    return (
      <>
        {floatingShareButton}
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="fixed bottom-32 right-4 z-40 bg-white rounded-2xl shadow-xl p-4 max-w-sm"
            >
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">Share with Friends</h3>
                <div className="grid grid-cols-3 gap-2">
                  {socialPlatforms.slice(0, 6).map(platform => (
                    <ShareButton key={platform.id} platform={platform} compact />
                  ))}
                </div>
              </div>
              
              {showTemplates && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Share Style
                  </label>
                  <select
                    value={selectedTemplate}
                    onChange={(e) => setSelectedTemplate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  >
                    {Object.keys(templates).map(template => (
                      <option key={template} value={template}>
                        {template.charAt(0).toUpperCase() + template.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCopyLink}
                  className="flex-1 flex items-center justify-center px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors"
                >
                  {copied ? 'Copied!' : <><LinkIcon className="w-4 h-4 mr-1" />Copy Link</>}
                </button>
                
                {showQR && (
                  <button
                    onClick={() => setShowQRCode(!showQRCode)}
                    className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition-colors"
                  >
                    <QrCode className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              {showQRCode && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 p-4 bg-gray-50 rounded-lg"
                >
                  <div className="text-center">
                    <QrCode className="w-24 h-24 mx-auto mb-2 text-gray-400" />
                    <p className="text-xs text-gray-600">Scan QR code to share</p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  return (
    <div className={cn('social-share-manager', className)}>
      {/* Template Selection */}
      {showTemplates && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Choose Share Style
          </label>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(templates).map(([key, text]) => (
              <motion.button
                key={key}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedTemplate(key)}
                className={cn(
                  'p-3 text-left rounded-lg border-2 transition-all',
                  selectedTemplate === key
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                )}
              >
                <div className="font-medium text-gray-900 capitalize">{key}</div>
                <div className="text-xs text-gray-600 mt-1 line-clamp-2">
                  {text.substring(0, 60)}...
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Social Platforms Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {socialPlatforms.map(platform => (
          <ShareButton key={platform.id} platform={platform} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCopyLink}
          className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <Copy className="w-4 h-4 mr-2" />
          {copied ? 'Copied!' : 'Copy Link'}
        </motion.button>

        {showDownload && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDownloadContent}
            className="flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Content
          </motion.button>
        )}

        {/* Story Creation Buttons */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleCreateStory('instagram')}
          className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors"
        >
          <Camera className="w-4 h-4 mr-2" />
          Create Story
        </motion.button>
      </div>

      {/* Share Preview */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Share Preview:</h4>
        <div className="text-sm text-gray-600 bg-white p-3 rounded border">
          <div className="font-medium text-gray-900 mb-1">{content.title}</div>
          <div className="line-clamp-2">{currentText}</div>
          {content.hashtags && (
            <div className="text-blue-600 mt-2">
              {content.hashtags.join(' ')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SocialShareManager;