'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Plus,
  Edit,
  Copy,
  Trash2,
  Eye,
  Calendar,
  Clock,
  User,
  CheckCircle,
  XCircle,
  AlertCircle,
  Send,
  Save,
  Download,
  Upload,
  Filter,
  Search,
  Grid3X3,
  List,
  Star,
  Tag,
  Folder,
  Archive,
  RefreshCw,
  MoreVertical,
  Settings,
  Palette,
  Type,
  Image,
  Video,
  Link,
  Mail,
  Globe
} from 'lucide-react';

interface ContentTemplate {
  id: string;
  name: string;
  description: string;
  type: 'article' | 'page' | 'event_description' | 'newsletter';
  category: string;
  thumbnail?: string;
  fields: TemplateField[];
  layout: 'standard' | 'magazine' | 'news' | 'gallery' | 'video';
  style: {
    fontFamily: string;
    fontSize: string;
    colors: {
      primary: string;
      secondary: string;
      accent: string;
    };
    spacing: string;
    borderRadius: string;
  };
  seo: {
    defaultTitle: string;
    defaultDescription: string;
    defaultKeywords: string[];
    socialImage?: string;
  };
  permissions: {
    public: boolean;
    membersOnly: boolean;
    requiresAuth: boolean;
  };
  isSystem: boolean;
  isFavorite: boolean;
  usageCount: number;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

interface TemplateField {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'rich_text' | 'image' | 'video' | 'url' | 'date' | 'select' | 'multiselect' | 'tags' | 'boolean';
  required: boolean;
  placeholder?: string;
  defaultValue?: any;
  options?: { label: string; value: string }[];
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
  helpText?: string;
  group?: string;
}

interface WorkflowStep {
  id: string;
  name: string;
  type: 'draft' | 'review' | 'approval' | 'publish' | 'archive';
  assignedTo: string[];
  conditions?: {
    autoAdvance?: boolean;
    timeLimit?: number; // hours
    requiredApprovals?: number;
  };
  notifications: {
    email: boolean;
    inApp: boolean;
    slack?: string;
  };
  actions?: {
    autoTag?: string[];
    autoCategory?: string;
    seoOptimization?: boolean;
    socialMedia?: boolean;
  };
}

interface ContentWorkflow {
  id: string;
  name: string;
  description: string;
  contentType: string[];
  steps: WorkflowStep[];
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ContentItem {
  id: string;
  title: string;
  templateId?: string;
  workflowId?: string;
  currentStep?: string;
  status: 'draft' | 'review' | 'approved' | 'published' | 'archived';
  assignee?: string;
  dueDate?: Date;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  tags: string[];
  category: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  metadata: Record<string, any>;
}

const ContentTemplates = ({ onSelectTemplate }: {
  onSelectTemplate: (template: ContentTemplate) => void;
}) => {
  const [templates, setTemplates] = useState<ContentTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedTemplate, setSelectedTemplate] = useState<ContentTemplate | null>(null);
  const [showTemplateEditor, setShowTemplateEditor] = useState(false);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      setLoading(true);
      // Mock data - in production, fetch from your API
      const mockTemplates: ContentTemplate[] = [
        {
          id: '1',
          name: 'Cultural Article',
          description: 'Template for cultural articles with rich content and media',
          type: 'article',
          category: 'Culture',
          thumbnail: '/images/templates/cultural-article.jpg',
          fields: [
            {
              id: 'title',
              name: 'title',
              label: 'Article Title',
              type: 'text',
              required: true,
              placeholder: 'Enter article title...',
              validation: { maxLength: 100 }
            },
            {
              id: 'excerpt',
              name: 'excerpt',
              label: 'Excerpt',
              type: 'textarea',
              required: true,
              placeholder: 'Brief description of the article...',
              validation: { maxLength: 200 }
            },
            {
              id: 'content',
              name: 'content',
              label: 'Article Content',
              type: 'rich_text',
              required: true,
              placeholder: 'Write your article content...'
            },
            {
              id: 'featured_image',
              name: 'featured_image',
              label: 'Featured Image',
              type: 'image',
              required: true,
              helpText: 'High-quality image that represents the article'
            },
            {
              id: 'author_bio',
              name: 'author_bio',
              label: 'Author Bio',
              type: 'textarea',
              required: false,
              placeholder: 'Brief author biography...'
            }
          ],
          layout: 'magazine',
          style: {
            fontFamily: 'Inter',
            fontSize: '16px',
            colors: {
              primary: '#dc2626',
              secondary: '#6b7280',
              accent: '#f59e0b'
            },
            spacing: '1.5rem',
            borderRadius: '8px'
          },
          seo: {
            defaultTitle: '{title} | Cultural Festival',
            defaultDescription: 'Learn about {title} and discover the beauty of cultural exchange.',
            defaultKeywords: ['culture', 'tradition', 'festival'],
            socialImage: '/images/templates/cultural-social.jpg'
          },
          permissions: {
            public: true,
            membersOnly: false,
            requiresAuth: false
          },
          isSystem: false,
          isFavorite: true,
          usageCount: 45,
          createdBy: 'Admin',
          createdAt: new Date('2024-11-01'),
          updatedAt: new Date('2024-12-01')
        },
        {
          id: '2',
          name: 'Event Announcement',
          description: 'Template for event announcements with scheduling and ticketing info',
          type: 'event_description',
          category: 'Events',
          thumbnail: '/images/templates/event-announcement.jpg',
          fields: [
            {
              id: 'event_title',
              name: 'event_title',
              label: 'Event Title',
              type: 'text',
              required: true,
              placeholder: 'Enter event title...'
            },
            {
              id: 'event_date',
              name: 'event_date',
              label: 'Event Date & Time',
              type: 'date',
              required: true
            },
            {
              id: 'location',
              name: 'location',
              label: 'Location',
              type: 'text',
              required: true,
              placeholder: 'Event venue and address...'
            },
            {
              id: 'description',
              name: 'description',
              label: 'Event Description',
              type: 'rich_text',
              required: true,
              placeholder: 'Detailed event description...'
            },
            {
              id: 'ticket_info',
              name: 'ticket_info',
              label: 'Ticket Information',
              type: 'textarea',
              required: true,
              placeholder: 'Pricing, availability, and booking information...'
            },
            {
              id: 'organizer',
              name: 'organizer',
              label: 'Organizer',
              type: 'text',
              required: true,
              placeholder: 'Event organizer name...'
            }
          ],
          layout: 'standard',
          style: {
            fontFamily: 'Inter',
            fontSize: '16px',
            colors: {
              primary: '#059669',
              secondary: '#6b7280',
              accent: '#3b82f6'
            },
            spacing: '1.5rem',
            borderRadius: '12px'
          },
          seo: {
            defaultTitle: '{event_title} - Cultural Event',
            defaultDescription: 'Join us for {event_title} - {description}',
            defaultKeywords: ['event', 'culture', 'festival'],
            socialImage: '/images/templates/event-social.jpg'
          },
          permissions: {
            public: true,
            membersOnly: false,
            requiresAuth: false
          },
          isSystem: false,
          isFavorite: false,
          usageCount: 23,
          createdBy: 'Event Manager',
          createdAt: new Date('2024-11-15'),
          updatedAt: new Date('2024-12-05')
        },
        {
          id: '3',
          name: 'Newsletter',
          description: 'Template for email newsletters with articles and updates',
          type: 'newsletter',
          category: 'Communication',
          thumbnail: '/images/templates/newsletter.jpg',
          fields: [
            {
              id: 'subject',
              name: 'subject',
              label: 'Email Subject',
              type: 'text',
              required: true,
              placeholder: 'Newsletter subject line...',
              validation: { maxLength: 60 }
            },
            {
              id: 'preheader',
              name: 'preheader',
              label: 'Preheader Text',
              type: 'text',
              required: false,
              placeholder: 'Preview text that appears in inbox...',
              validation: { maxLength: 90 }
            },
            {
              id: 'header_image',
              name: 'header_image',
              label: 'Header Image',
              type: 'image',
              required: true
            },
            {
              id: 'articles',
              name: 'articles',
              label: 'Featured Articles',
              type: 'multiselect',
              required: true,
              options: [] // Would be populated from existing articles
            },
            {
              id: 'footer',
              name: 'footer',
              label: 'Footer Content',
              type: 'rich_text',
              required: true,
              placeholder: 'Unsubscribe link and contact information...'
            }
          ],
          layout: 'news',
          style: {
            fontFamily: 'Inter',
            fontSize: '14px',
            colors: {
              primary: '#7c3aed',
              secondary: '#6b7280',
              accent: '#ec4899'
            },
            spacing: '1rem',
            borderRadius: '6px'
          },
          seo: {
            defaultTitle: 'Cultural Festival Newsletter',
            defaultDescription: 'Stay updated with cultural events and insights',
            defaultKeywords: ['newsletter', 'culture', 'updates'],
            socialImage: '/images/templates/newsletter-social.jpg'
          },
          permissions: {
            public: false,
            membersOnly: true,
            requiresAuth: true
          },
          isSystem: true,
          isFavorite: false,
          usageCount: 12,
          createdBy: 'System',
          createdAt: new Date('2024-10-01'),
          updatedAt: new Date('2024-11-20')
        }
      ];
      setTemplates(mockTemplates);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || template.type === typeFilter;
    const matchesCategory = categoryFilter === 'all' || template.category === categoryFilter;
    return matchesSearch && matchesType && matchesCategory;
  });

  const handleSelectTemplate = (template: ContentTemplate) => {
    setSelectedTemplate(template);
    onSelectTemplate(template);
  };

  const handleCreateTemplate = () => {
    setSelectedTemplate(null);
    setShowTemplateEditor(true);
  };

  const handleDuplicateTemplate = (template: ContentTemplate) => {
    const duplicate: ContentTemplate = {
      ...template,
      id: Date.now().toString(),
      name: `${template.name} (Copy)`,
      isSystem: false,
      usageCount: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setTemplates(prev => [...prev, duplicate]);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article': return FileText;
      case 'event_description': return Calendar;
      case 'newsletter': return Mail;
      case 'page': return Globe;
      default: return FileText;
    }
  };

  const getLayoutIcon = (layout: string) => {
    switch (layout) {
      case 'magazine': return FileText;
      case 'news': return List;
      case 'gallery': return Grid3X3;
      case 'video': return Video;
      default: return FileText;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Content Templates</h2>
          <p className="text-gray-600">Create and manage reusable content templates</p>
        </div>
        <button
          onClick={handleCreateTemplate}
          className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>New Template</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="article">Articles</option>
              <option value="event_description">Event Descriptions</option>
              <option value="newsletter">Newsletters</option>
              <option value="page">Pages</option>
            </select>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="Culture">Culture</option>
              <option value="Events">Events</option>
              <option value="Communication">Communication</option>
              <option value="General">General</option>
            </select>
            <div className="flex items-center space-x-1 border border-gray-300 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-red-100 text-red-600' : 'text-gray-600'}`}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-red-100 text-red-600' : 'text-gray-600'}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Templates Grid/List */}
      {loading ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading templates...</p>
        </div>
      ) : filteredTemplates.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">No templates found</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => {
            const TypeIcon = getTypeIcon(template.type);
            const LayoutIcon = getLayoutIcon(template.layout);
            return (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleSelectTemplate(template)}
              >
                {/* Template Preview */}
                <div className="aspect-video bg-gray-100 rounded-t-lg relative overflow-hidden">
                  {template.thumbnail ? (
                    <img
                      src={template.thumbnail}
                      alt={template.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <TypeIcon className="h-12 w-12 text-gray-400" />
                    </div>
                  )}

                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-opacity flex items-center justify-center opacity-0 hover:opacity-100">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectTemplate(template);
                        }}
                        className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
                        title="Use Template"
                      >
                        <Eye className="h-4 w-4 text-gray-600" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDuplicateTemplate(template);
                        }}
                        className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
                        title="Duplicate"
                      >
                        <Copy className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex items-center space-x-1">
                    {template.isSystem && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        System
                      </span>
                    )}
                    {template.isFavorite && (
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    )}
                  </div>

                  <div className="absolute top-2 right-2">
                    <div className="flex items-center space-x-1">
                      <LayoutIcon className="h-4 w-4 text-white bg-black bg-opacity-50 rounded p-1" />
                      <span className="px-2 py-1 bg-black bg-opacity-50 text-white text-xs rounded-full">
                        {template.layout}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Template Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 truncate">{template.name}</h3>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      {template.type}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{template.description}</p>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{template.fields.length} fields</span>
                    <span>{template.usageCount} uses</span>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-gray-500">{template.category}</span>
                    <div className="flex items-center space-x-1">
                      <Palette className="h-3 w-3 text-gray-400" />
                      <div
                        className="w-3 h-3 rounded-full border"
                        style={{ backgroundColor: template.style.colors.primary }}
                      ></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Template
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fields
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usage
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
              {filteredTemplates.map((template) => {
                const TypeIcon = getTypeIcon(template.type);
                return (
                  <tr key={template.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleSelectTemplate(template)}>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <TypeIcon className="h-5 w-5 text-gray-400" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{template.name}</p>
                          <p className="text-sm text-gray-500 truncate">{template.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {template.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {template.fields.length} fields
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {template.usageCount} uses
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(template.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectTemplate(template);
                          }}
                          className="p-1 text-blue-600 hover:text-blue-800"
                          title="Use Template"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDuplicateTemplate(template);
                          }}
                          className="p-1 text-green-600 hover:text-green-800"
                          title="Duplicate"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                        {!template.isSystem && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              // Handle delete
                            }}
                            className="p-1 text-red-600 hover:text-red-800"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Template Editor Modal would go here */}
      {showTemplateEditor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {selectedTemplate ? 'Edit Template' : 'Create New Template'}
              </h2>
              <p className="text-gray-600 mb-6">Template editor implementation would go here...</p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowTemplateEditor(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowTemplateEditor(false)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Save Template
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export { ContentTemplates };
export type { ContentTemplate, TemplateField, ContentWorkflow, WorkflowStep, ContentItem };