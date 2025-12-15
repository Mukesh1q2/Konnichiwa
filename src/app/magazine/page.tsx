'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Download, 
  Calendar, 
  User, 
  Search, 
  Filter, 
  ArrowRight, 
  Share2,
  Bookmark,
  Eye,
  Clock,
  Tag
} from 'lucide-react';
import { useBrand } from '@/lib/brand-context';
import { formatDate } from '@/lib/utils';

// Mock magazine data
const mockMagazineData = {
  issues: [
    {
      id: 'issue-05',
      issueNumber: 'Issue 05',
      title: 'The Art of Cultural Bridge',
      subtitle: 'Celebrating 5 Years of India-Japan Friendship',
      description: 'A deep dive into the evolution of cultural exchange between India and Japan, featuring exclusive interviews with festival organizers, performers, and cultural ambassadors.',
      coverImage: '/images/namaste_india_event_images_1.webp',
      publishDate: '2025-12-01',
      featured: true,
      articles: [
        {
          id: 'art-001',
          title: 'Sumo Wrestling: Ancient Tradition Meets Modern India',
          excerpt: 'How professional rikishi are bringing authentic Japanese culture to Indian audiences.',
          author: 'Dr. Hiroshi Tanaka',
          readTime: 8,
          category: 'Culture',
          tags: ['sumo', 'tradition', 'japan', 'india'],
          publishDate: '2025-12-01',
        },
        {
          id: 'art-002',
          title: 'Bharatanatyam Meets Tokyo: A Dance Revolution',
          excerpt: 'Indian classical dance finds new audiences in Japan\'s vibrant cultural scene.',
          author: 'Priya Sharma',
          readTime: 6,
          category: 'Dance',
          tags: ['bharatanatyam', 'classical', 'india', 'japan'],
          publishDate: '2025-12-01',
        },
        {
          id: 'art-003',
          title: 'Food Fusion: When Japanese Meets Indian Cuisine',
          excerpt: 'Chefs from both cultures create unprecedented culinary experiences.',
          author: 'Chef Akira Sato',
          readTime: 5,
          category: 'Food',
          tags: ['cuisine', 'fusion', 'cooking', 'culture'],
          publishDate: '2025-12-01',
        },
      ],
    },
    {
      id: 'issue-04',
      issueNumber: 'Issue 04',
      title: 'Youth & Culture',
      subtitle: 'The Next Generation of Cultural Ambassadors',
      description: 'Exploring how young artists, performers, and enthusiasts are shaping the future of India-Japan cultural exchange.',
      coverImage: '/images/cosplay_competition_images_0.jpg',
      publishDate: '2025-10-15',
      featured: false,
      articles: [
        {
          id: 'art-004',
          title: 'Cosplay Culture: Breaking Barriers Through Character',
          excerpt: 'How anime cosplay is connecting young Indians and Japanese through shared passion.',
          author: 'Yuki Matsumoto',
          readTime: 7,
          category: 'Pop Culture',
          tags: ['cosplay', 'anime', 'youth', 'pop-culture'],
          publishDate: '2025-10-15',
        },
        {
          id: 'art-005',
          title: 'Digital Art Meets Traditional Crafts',
          excerpt: 'Young artists blending ancient techniques with modern digital tools.',
          author: 'Rahul Verma',
          readTime: 9,
          category: 'Art',
          tags: ['digital-art', 'crafts', 'innovation', 'tradition'],
          publishDate: '2025-10-15',
        },
      ],
    },
    {
      id: 'issue-03',
      issueNumber: 'Issue 03',
      title: 'Wellness & Harmony',
      subtitle: 'Yoga, Meditation, and the Art of Balance',
      description: 'Discovering the spiritual connections between Indian wellness practices and Japanese mindfulness traditions.',
      coverImage: '/images/indian_cultural_elements_5.webp',
      publishDate: '2025-08-20',
      featured: false,
      articles: [
        {
          id: 'art-006',
          title: 'Morning Yoga in Tokyo: A Transcultural Experience',
          excerpt: 'How Indian yoga masters are finding new students in Japan\'s wellness movement.',
          author: 'Guru Ravi Kumar',
          readTime: 6,
          category: 'Wellness',
          tags: ['yoga', 'meditation', 'wellness', 'spirituality'],
          publishDate: '2025-08-20',
        },
      ],
    },
  ],
  categories: ['Culture', 'Dance', 'Food', 'Pop Culture', 'Art', 'Wellness'],
};

// Magazine Article Component
function MagazineArticle({ article, issueId }: { article: any; issueId: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="card group cursor-pointer"
    >
      <div className="relative h-48 overflow-hidden rounded-t-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-primary-700/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <BookOpen className="h-16 w-16 text-primary-500/60" />
        </div>
        <div className="absolute top-4 left-4">
          <span className="bg-primary-500 text-white px-3 py-1 rounded-pill text-sm font-medium">
            {article.category}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <div className="flex items-center space-x-2">
            <button className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
              <Bookmark className="h-4 w-4 text-white" />
            </button>
            <button className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
              <Share2 className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center justify-between text-white/90 text-sm">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{article.readTime} min read</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye className="h-4 w-4" />
              <span>2.3k</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-3">
          <Tag className="h-4 w-4 text-primary-500" />
          <div className="flex flex-wrap gap-1">
            {article.tags.slice(0, 3).map((tag: string) => (
              <span key={tag} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        <h3 className="text-h3 font-semibold text-ink mb-3 group-hover:text-primary-500 transition-colors">
          {article.title}
        </h3>
        
        <p className="text-slate mb-4 line-clamp-2">
          {article.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-ink">{article.author}</p>
              <p className="text-xs text-slate">{formatDate(article.publishDate)}</p>
            </div>
          </div>
          <button className="text-primary-500 font-medium hover:text-primary-700 transition-colors flex items-center">
            Read More
            <ArrowRight className="ml-1 h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// Magazine Issue Component
function MagazineIssueCard({ issue, index }: { issue: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="card group cursor-pointer"
    >
      <div className="relative h-64 overflow-hidden rounded-t-xl">
        <img
          src={issue.coverImage}
          alt={issue.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="bg-primary-500 text-white px-3 py-1 rounded-pill text-sm font-medium">
            {issue.issueNumber}
          </span>
        </div>
        {issue.featured && (
          <div className="absolute top-4 right-4">
            <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded text-xs font-bold">
              FEATURED
            </span>
          </div>
        )}
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h3 className="text-xl font-semibold mb-1">{issue.title}</h3>
          <p className="text-sm opacity-90">{issue.subtitle}</p>
        </div>
      </div>
      
      <div className="p-6">
        <p className="text-slate mb-4 line-clamp-2">
          {issue.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-slate text-sm">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(issue.publishDate)}</span>
            <span>•</span>
            <span>{issue.articles.length} articles</span>
          </div>
          <button className="text-primary-500 font-medium hover:text-primary-700 transition-colors flex items-center">
            Read Issue
            <ArrowRight className="ml-1 h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function MagazinePage() {
  const { currentBrand } = useBrand();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);

  const filteredIssues = mockMagazineData.issues.filter(issue => {
    if (selectedCategory !== 'all' && !issue.articles.some(article => article.category === selectedCategory)) {
      return false;
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return issue.title.toLowerCase().includes(query) ||
             issue.description.toLowerCase().includes(query) ||
             issue.articles.some(article => 
               article.title.toLowerCase().includes(query) ||
               article.excerpt.toLowerCase().includes(query)
             );
    }
    return true;
  });

  const selectedIssueData = selectedIssue ? mockMagazineData.issues.find(i => i.id === selectedIssue) : null;

  const filteredArticles = selectedIssueData?.articles.filter(article => {
    if (selectedCategory !== 'all' && article.category !== selectedCategory) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return article.title.toLowerCase().includes(query) ||
             article.excerpt.toLowerCase().includes(query);
    }
    return true;
  }) || [];

  return (
    <div className="min-h-screen bg-paper">
      {/* Header Section */}
      <section className="bg-surface py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-hero font-serif text-ink mb-6">
                Konnichiwa Japan Magazine
              </h1>
              <p className="text-bodyLarge text-slate max-w-3xl mx-auto">
                {currentBrand === 'konnichiwa' 
                  ? 'Stories from India-Japan friendship, culture, travel, and creativity. Discover the rich tapestry of cultural exchange through exclusive interviews, feature articles, and behind-the-scenes insights.'
                  : 'Celebrating the vibrant connections between India and Japan through compelling stories, cultural insights, and the remarkable people who bridge our nations.'
                }
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <AnimatePresence mode="wait">
          {selectedIssue ? (
            /* Article View */
            <motion.div
              key="articles"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Issue Header */}
              <div className="mb-8">
                <button
                  onClick={() => setSelectedIssue(null)}
                  className="flex items-center text-primary-500 hover:text-primary-700 mb-4"
                >
                  <ArrowRight className="h-5 w-5 mr-2 rotate-180" />
                  Back to Issues
                </button>
                <h2 className="text-h2 font-serif text-ink mb-2">
                  {selectedIssueData?.title}
                </h2>
                <p className="text-bodyLarge text-slate mb-4">
                  {selectedIssueData?.subtitle}
                </p>
                <div className="flex items-center space-x-4 text-sm text-slate">
                  <span>{selectedIssueData?.articles.length} articles</span>
                  <span>•</span>
                  <span>Published {formatDate(selectedIssueData?.publishDate || '')}</span>
                </div>
              </div>

              {/* Articles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article) => (
                  <MagazineArticle key={article.id} article={article} issueId={selectedIssue} />
                ))}
              </div>
            </motion.div>
          ) : (
            /* Issues View */
            <motion.div
              key="issues"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Search and Filters */}
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-12">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate" />
                  <input
                    type="text"
                    placeholder="Search articles and issues..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="all">All Categories</option>
                  {mockMagazineData.categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Magazine Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-primary-500 mb-2">
                    {mockMagazineData.issues.length}
                  </div>
                  <div className="text-slate">Published Issues</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-primary-500 mb-2">
                    {mockMagazineData.issues.reduce((sum, issue) => sum + issue.articles.length, 0)}
                  </div>
                  <div className="text-slate">Total Articles</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-primary-500 mb-2">
                    {mockMagazineData.categories.length}
                  </div>
                  <div className="text-slate">Categories</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-primary-500 mb-2">25k+</div>
                  <div className="text-slate">Monthly Readers</div>
                </motion.div>
              </div>

              {/* Featured Issue */}
              {mockMagazineData.issues.find(issue => issue.featured) && (
                <div className="mb-12">
                  <h2 className="text-h2 font-serif text-ink mb-6">Featured Issue</h2>
                  <MagazineIssueCard 
                    issue={mockMagazineData.issues.find(issue => issue.featured)!} 
                    index={0} 
                  />
                </div>
              )}

              {/* All Issues */}
              <div>
                <h2 className="text-h2 font-serif text-ink mb-6">
                  {selectedCategory === 'all' ? 'All Issues' : `${selectedCategory} Articles`}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredIssues
                    .filter(issue => !issue.featured || selectedCategory !== 'all')
                    .map((issue, index) => (
                    <div key={issue.id} onClick={() => setSelectedIssue(issue.id)}>
                      <MagazineIssueCard issue={issue} index={index} />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Subscription CTA */}
      <section className="py-16 bg-primary-500 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-h2 font-serif mb-6">Stay Connected</h2>
            <p className="text-bodyLarge mb-8 text-white/90">
              Subscribe to get the latest issues delivered to your inbox and never miss a story from our cultural bridge.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-pill text-ink focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="bg-white text-primary-500 px-8 py-4 rounded-pill font-semibold hover:bg-gray-100 transition-colors duration-200">
                Subscribe
              </button>
            </div>
            <p className="text-sm text-white/70 mt-4">
              Free subscription • No spam • Unsubscribe anytime
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}