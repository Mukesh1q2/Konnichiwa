'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  User,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Trash2,
  Plus,
  Filter,
  Search,
  MoreVertical,
  FileText,
  Image,
  Video,
  Globe,
  Lock,
  Send,
  Save,
  RefreshCw,
  AlertCircle,
  Check,
  X,
  Mail
} from 'lucide-react';
import { RichTextEditor, MediaFile } from './RichTextEditor';

interface ContentItem {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  status: 'draft' | 'review' | 'scheduled' | 'published' | 'archived';
  type: 'article' | 'page' | 'event_description' | 'newsletter';
  category: string;
  tags: string[];
  featuredImage?: MediaFile;
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords: string[];
  };
  schedule?: {
    publishAt?: Date;
    timezone?: string;
  };
  permissions: {
    public: boolean;
    membersOnly: boolean;
    requiresAuth: boolean;
  };
  analytics: {
    views: number;
    shares: number;
    likes: number;
  };
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

interface ContentManagerProps {
  onCreateNew: (type: ContentItem['type']) => void;
  onEdit: (content: ContentItem) => void;
  onDelete: (id: string) => void;
}

const ContentManager = ({ onCreateNew, onEdit, onDelete }: ContentManagerProps) => {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      setLoading(true);
      // Mock data - in production, fetch from your API
      const mockContent: ContentItem[] = [
        {
          id: '1',
          title: 'The Art of Japanese Tea Ceremony',
          slug: 'japanese-tea-ceremony',
          content: '<h2>Introduction</h2><p>The Japanese tea ceremony is a profound cultural practice...</p>',
          excerpt: 'Discover the philosophy and beauty behind the traditional Japanese tea ceremony.',
          author: {
            id: '1',
            name: 'Dr. Yuki Tanaka',
            avatar: '/images/authors/yuki-tanaka.jpg'
          },
          status: 'published',
          type: 'article',
          category: 'Traditional Arts',
          tags: ['tea ceremony', 'traditional', 'japanese culture'],
          featuredImage: {
            id: '1',
            name: 'tea-ceremony.jpg',
            type: 'image',
            url: '/images/magazine/tea-ceremony-article.jpg',
            size: 1024000,
            dimensions: { width: 1200, height: 800 },
            uploadedAt: new Date()
          },
          seo: {
            metaTitle: 'Japanese Tea Ceremony - Cultural Guide',
            metaDescription: 'Learn about the traditional Japanese tea ceremony and its cultural significance.',
            keywords: ['tea ceremony', 'japanese culture', 'tradition']
          },
          permissions: {
            public: true,
            membersOnly: false,
            requiresAuth: false
          },
          analytics: {
            views: 1247,
            shares: 23,
            likes: 89
          },
          createdAt: new Date('2024-12-01'),
          updatedAt: new Date('2024-12-10'),
          publishedAt: new Date('2024-12-01')
        },
        {
          id: '2',
          title: 'Bollywood Dance Workshop Announcement',
          slug: 'bollywood-dance-workshop',
          content: '<h2>Join Our Exciting Workshop</h2><p>Learn the energetic moves of Bollywood dance...</p>',
          author: {
            id: '2',
            name: 'Priya Sharma'
          },
          status: 'scheduled',
          type: 'event_description',
          category: 'Dance',
          tags: ['bollywood', 'dance', 'workshop'],
          seo: {
            keywords: ['bollywood', 'dance', 'workshop']
          },
          schedule: {
            publishAt: new Date('2024-12-15T10:00:00'),
            timezone: 'Asia/Tokyo'
          },
          permissions: {
            public: true,
            membersOnly: false,
            requiresAuth: false
          },
          analytics: {
            views: 0,
            shares: 0,
            likes: 0
          },
          createdAt: new Date('2024-12-10'),
          updatedAt: new Date('2024-12-10')
        },
        {
          id: '3',
          title: 'Cultural Exchange Insights',
          slug: 'cultural-exchange-insights',
          content: '<p>Draft content about cross-cultural understanding...</p>',
          author: {
            id: '3',
            name: 'Maria Rodriguez'
          },
          status: 'draft',
          type: 'article',
          category: 'Cultural Exchange',
          tags: ['culture', 'exchange', 'understanding'],
          seo: {
            keywords: ['cultural exchange', 'cross-cultural']
          },
          permissions: {
            public: true,
            membersOnly: false,
            requiresAuth: false
          },
          analytics: {
            views: 0,
            shares: 0,
            likes: 0
          },
          createdAt: new Date('2024-12-08'),
          updatedAt: new Date('2024-12-08')
        }
      ];
      setContent(mockContent);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const filteredContent = content.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleBulkAction = async (action: string) => {
    if (selectedItems.length === 0) return;

    try {
      switch (action) {
        case 'publish':
          // Update status to published
          setContent(prev => prev.map(item =>
            selectedItems.includes(item.id)
              ? { ...item, status: 'published' as const, publishedAt: new Date() }
              : item
          ));
          break;
        case 'archive':
          // Update status to archived
          setContent(prev => prev.map(item =>
            selectedItems.includes(item.id)
              ? { ...item, status: 'archived' as const }
              : item
          ));
          break;
        case 'delete':
          // Delete selected items
          setContent(prev => prev.filter(item => !selectedItems.includes(item.id)));
          break;
      }
      setSelectedItems([]);
    } catch (error) {
    }
  };

  const getStatusColor = (status: ContentItem['status']) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'review': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'archived': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: ContentItem['type']) => {
    switch (type) {
      case 'article': return FileText;
      case 'page': return Globe;
      case 'event_description': return Calendar;
      case 'newsletter': return Mail;
      default: return FileText;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Content Management</h2>
          <p className="text-gray-600">Manage articles, pages, and content</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onCreateNew('article')}
            className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>New Article</span>
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="review">In Review</option>
              <option value="scheduled">Scheduled</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="article">Articles</option>
              <option value="page">Pages</option>
              <option value="event_description">Event Descriptions</option>
              <option value="newsletter">Newsletters</option>
            </select>
            <div className="flex items-center space-x-1 border border-gray-300 rounded-lg">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-red-100 text-red-600' : 'text-gray-600'}`}
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-red-100 text-red-600' : 'text-gray-600'}`}
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedItems.length > 0 && (
          <div className="mt-4 flex items-center space-x-4 bg-blue-50 p-3 rounded-lg">
            <span className="text-sm text-blue-700">
              {selectedItems.length} item(s) selected
            </span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleBulkAction('publish')}
                className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
              >
                Publish
              </button>
              <button
                onClick={() => handleBulkAction('archive')}
                className="px-3 py-1 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700"
              >
                Archive
              </button>
              <button
                onClick={() => handleBulkAction('delete')}
                className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
              >
                Delete
              </button>
              <button
                onClick={() => setSelectedItems([])}
                className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
              >
                Clear Selection
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Content List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto"></div>
            <p className="text-gray-500 mt-2">Loading content...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedItems.length === filteredContent.length}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedItems(filteredContent.map(item => item.id));
                        } else {
                          setSelectedItems([]);
                        }
                      }}
                      className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Analytics
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Updated
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredContent.map((item) => {
                  const TypeIcon = getTypeIcon(item.type);
                  return (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedItems(prev => [...prev, item.id]);
                            } else {
                              setSelectedItems(prev => prev.filter(id => id !== item.id));
                            }
                          }}
                          className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            {item.featuredImage ? (
                              <img
                                src={item.featuredImage.url}
                                alt={item.title}
                                className="h-10 w-10 rounded object-cover"
                              />
                            ) : (
                              <div className="h-10 w-10 bg-gray-100 rounded flex items-center justify-center">
                                <TypeIcon className="h-5 w-5 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {item.title}
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              {item.excerpt || item.slug}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {item.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                        {item.schedule?.publishAt && (
                          <p className="text-xs text-gray-500 mt-1">
                            Scheduled: {new Date(item.schedule.publishAt).toLocaleDateString()}
                          </p>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          {item.author.avatar ? (
                            <img
                              src={item.author.avatar}
                              alt={item.author.name}
                              className="h-6 w-6 rounded-full"
                            />
                          ) : (
                            <div className="h-6 w-6 bg-gray-200 rounded-full flex items-center justify-center">
                              <User className="h-3 w-3 text-gray-400" />
                            </div>
                          )}
                          <span className="text-sm text-gray-900">{item.author.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          <div>Views: {item.analytics.views}</div>
                          <div>Likes: {item.analytics.likes}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(item.updatedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => onEdit(item)}
                            className="p-1 text-blue-600 hover:text-blue-800"
                            title="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            className="p-1 text-green-600 hover:text-green-800"
                            title="Preview"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => onDelete(item.id)}
                            className="p-1 text-red-600 hover:text-red-800"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

// Content Editor Component
const ContentEditor = ({ content, onSave, onClose }: {
  content?: ContentItem;
  onSave: (content: Partial<ContentItem>) => void;
  onClose: () => void;
}) => {
  const [formData, setFormData] = useState<Partial<ContentItem>>(
    content || {
      title: '',
      slug: '',
      content: '',
      excerpt: '',
      status: 'draft',
      type: 'article',
      category: '',
      tags: [],
      seo: { keywords: [] },
      permissions: { public: true, membersOnly: false, requiresAuth: false }
    }
  );
  const [saving, setSaving] = useState(false);
  const [showMediaManager, setShowMediaManager] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(formData);
    } catch (error) {
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg shadow-xl w-full max-w-6xl h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            {content ? 'Edit Content' : 'Create New Content'}
          </h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              <span>{saving ? 'Saving...' : 'Save'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full flex">
            {/* Left Panel - Form */}
            <div className="w-80 border-r border-gray-200 overflow-y-auto p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => updateField('title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter title..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Slug
                </label>
                <input
                  type="text"
                  value={formData.slug || ''}
                  onChange={(e) => updateField('slug', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="url-friendly-slug"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  value={formData.type || 'article'}
                  onChange={(e) => updateField('type', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="article">Article</option>
                  <option value="page">Page</option>
                  <option value="event_description">Event Description</option>
                  <option value="newsletter">Newsletter</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={formData.category || ''}
                  onChange={(e) => updateField('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Category"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={formData.status || 'draft'}
                  onChange={(e) => updateField('status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="draft">Draft</option>
                  <option value="review">In Review</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="published">Published</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Excerpt
                </label>
                <textarea
                  value={formData.excerpt || ''}
                  onChange={(e) => updateField('excerpt', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Brief description..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.tags?.join(', ') || ''}
                  onChange={(e) => updateField('tags', e.target.value.split(',').map(tag => tag.trim()))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="tag1, tag2, tag3"
                />
              </div>

              {/* Featured Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Featured Image
                </label>
                <button
                  onClick={() => setShowMediaManager(true)}
                  className="w-full px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600"
                >
                  {formData.featuredImage ? (
                    <div className="flex items-center space-x-2">
                      <img
                        src={formData.featuredImage.url}
                        alt="Featured"
                        className="h-8 w-8 rounded object-cover"
                      />
                      <span>{formData.featuredImage.name}</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <Image className="h-4 w-4" />
                      <span>Select Image</span>
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* Right Panel - Editor */}
            <div className="flex-1 flex flex-col">
              <RichTextEditor
                content={formData.content || ''}
                onChange={(content) => updateField('content', content)}
                placeholder="Start writing your content..."
                showPreview={true}
                onSave={handleSave}
                className="flex-1 border-0 rounded-none"
              />
            </div>
          </div>
        </div>

        {/* Media Manager Modal */}
        {/* showMediaManager && (
          <MediaManager
            onSelect={(file: any) => {
              updateField('featuredImage', file);
              setShowMediaManager(false);
            }}
            onClose={() => setShowMediaManager(false)}
          />
        ) */}
      </motion.div>
    </div>
  );
};

export { ContentManager, ContentEditor };
export type { ContentItem };