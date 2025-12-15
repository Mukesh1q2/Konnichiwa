'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Eye,
  Share2,
  Heart,
  TrendingUp,
  BarChart3,
  Target,
  CheckCircle,
  AlertCircle,
  X,
  ExternalLink,
  Clock,
  Users,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  Activity,
  Calendar,
  FileText,
  Link,
  Image,
  Tag
} from 'lucide-react';

interface SEOAnalysis {
  score: number;
  issues: SEOIssue[];
  suggestions: SEOSuggestion[];
  metrics: SEOMetrics;
}

interface SEOIssue {
  type: 'error' | 'warning' | 'info';
  title: string;
  description: string;
  element?: string;
  impact: 'high' | 'medium' | 'low';
}

interface SEOSuggestion {
  title: string;
  description: string;
  action: string;
  priority: 'high' | 'medium' | 'low';
}

interface SEOMetrics {
  titleLength: number;
  titleLengthStatus: 'good' | 'warning' | 'error';
  metaDescriptionLength: number;
  metaDescriptionStatus: 'good' | 'warning' | 'error';
  headingsCount: {
    h1: number;
    h2: number;
    h3: number;
    h4: number;
    h5: number;
    h6: number;
  };
  imagesCount: number;
  imagesWithAlt: number;
  linksCount: {
    internal: number;
    external: number;
  };
  contentLength: number;
  readabilityScore: number;
  keywordDensity: { [keyword: string]: number };
  socialMetaTags: {
    og: boolean;
    twitter: boolean;
    schema: boolean;
  };
}

interface ContentAnalytics {
  views: number;
  uniqueVisitors: number;
  avgTimeOnPage: number;
  bounceRate: number;
  conversions: number;
  shares: {
    facebook: number;
    twitter: number;
    linkedin: number;
    total: number;
  };
  devices: {
    desktop: number;
    mobile: number;
    tablet: number;
  };
  topReferrers: { source: string; visits: number }[];
  searchQueries: { query: string; clicks: number; impressions: number }[];
  geographicData: { country: string; visits: number }[];
  performance: {
    loadTime: number;
    timeToInteractive: number;
    firstContentfulPaint: number;
    largestContentfulPaint: number;
  };
}

interface SEOAnalyzerProps {
  content: string;
  title: string;
  metaDescription?: string;
  url: string;
  keywords?: string[];
  onAnalyze?: (analysis: SEOAnalysis) => void;
}

const SEOAnalyzer = ({
  content,
  title,
  metaDescription = '',
  url,
  keywords = [],
  onAnalyze
}: SEOAnalyzerProps) => {
  const [analysis, setAnalysis] = useState<SEOAnalysis | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    if (content && title) {
      analyzeSEO();
    }
  }, [content, title, metaDescription, url, keywords]);

  const analyzeSEO = async () => {
    setAnalyzing(true);
    try {
      // Create a temporary DOM element to analyze the content
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = content;

      // Analyze various SEO factors
      const metrics = analyzeMetrics(tempDiv, title, metaDescription, keywords);
      const issues = findIssues(metrics, content, title, metaDescription);
      const suggestions = generateSuggestions(metrics, issues);

      // Calculate overall score
      const score = calculateSEOScore(metrics, issues);

      const result: SEOAnalysis = {
        score,
        issues,
        suggestions,
        metrics
      };

      setAnalysis(result);
      onAnalyze?.(result);
    } catch (error) {
    } finally {
      setAnalyzing(false);
    }
  };

  const analyzeMetrics = (contentElement: HTMLElement, title: string, metaDesc: string, keywords: string[]): SEOMetrics => {
    // Title analysis
    const titleLength = title.length;
    let titleLengthStatus: 'good' | 'warning' | 'error' = 'good';
    if (titleLength < 30) titleLengthStatus = 'warning';
    if (titleLength > 60) titleLengthStatus = 'error';

    // Meta description analysis
    const metaDescriptionLength = metaDesc.length;
    let metaDescriptionStatus: 'good' | 'warning' | 'error' = 'good';
    if (metaDescriptionLength < 120) metaDescriptionStatus = 'warning';
    if (metaDescriptionLength > 160) metaDescriptionStatus = 'error';

    // Headings analysis
    const headingsCount = {
      h1: contentElement.querySelectorAll('h1').length,
      h2: contentElement.querySelectorAll('h2').length,
      h3: contentElement.querySelectorAll('h3').length,
      h4: contentElement.querySelectorAll('h4').length,
      h5: contentElement.querySelectorAll('h5').length,
      h6: contentElement.querySelectorAll('h6').length
    };

    // Images analysis
    const allImages = contentElement.querySelectorAll('img');
    const imagesWithAlt = Array.from(allImages).filter(img => img.hasAttribute('alt')).length;

    // Links analysis
    const allLinks = contentElement.querySelectorAll('a[href]');
    const internalLinks = Array.from(allLinks).filter((link: any) =>
      link.href.includes(window.location.hostname)
    ).length;
    const externalLinks = allLinks.length - internalLinks;

    // Content analysis
    const textContent = contentElement.textContent || '';
    const contentLength = textContent.split(/\s+/).length;

    // Keyword density calculation
    const keywordDensity: { [keyword: string]: number } = {};
    keywords.forEach(keyword => {
      const regex = new RegExp(keyword, 'gi');
      const matches = (textContent.match(regex) || []).length;
      keywordDensity[keyword] = (matches / contentLength) * 100;
    });

    // Basic readability score (simplified)
    const readabilityScore = calculateReadability(textContent);

    // Social meta tags detection
    const socialMetaTags = {
      og: !!contentElement.querySelector('meta[property^="og:"]'),
      twitter: !!contentElement.querySelector('meta[name^="twitter:"]'),
      schema: !!contentElement.querySelector('script[type="application/ld+json"]')
    };

    return {
      titleLength,
      titleLengthStatus,
      metaDescriptionLength,
      metaDescriptionStatus,
      headingsCount,
      imagesCount: allImages.length,
      imagesWithAlt,
      linksCount: {
        internal: internalLinks,
        external: externalLinks
      },
      contentLength,
      readabilityScore,
      keywordDensity,
      socialMetaTags
    };
  };

  const findIssues = (metrics: SEOMetrics, content: string, title: string, metaDesc: string): SEOIssue[] => {
    const issues: SEOIssue[] = [];

    // Title issues
    if (metrics.titleLength < 30) {
      issues.push({
        type: 'warning',
        title: 'Title Too Short',
        description: 'Title should be between 30-60 characters for optimal display in search results.',
        element: 'title',
        impact: 'medium'
      });
    }
    if (metrics.titleLength > 60) {
      issues.push({
        type: 'error',
        title: 'Title Too Long',
        description: 'Title exceeds 60 characters and may be truncated in search results.',
        element: 'title',
        impact: 'high'
      });
    }

    // Meta description issues
    if (!metaDesc) {
      issues.push({
        type: 'error',
        title: 'Missing Meta Description',
        description: 'Meta description is important for search result snippets.',
        element: 'meta description',
        impact: 'high'
      });
    } else if (metrics.metaDescriptionLength < 120) {
      issues.push({
        type: 'warning',
        title: 'Meta Description Too Short',
        description: 'Meta description should be between 120-160 characters.',
        element: 'meta description',
        impact: 'medium'
      });
    } else if (metrics.metaDescriptionLength > 160) {
      issues.push({
        type: 'warning',
        title: 'Meta Description Too Long',
        description: 'Meta description exceeds 160 characters and may be truncated.',
        element: 'meta description',
        impact: 'medium'
      });
    }

    // Heading structure issues
    if (metrics.headingsCount.h1 === 0) {
      issues.push({
        type: 'error',
        title: 'Missing H1 Tag',
        description: 'Every page should have exactly one H1 tag.',
        element: 'h1',
        impact: 'high'
      });
    } else if (metrics.headingsCount.h1 > 1) {
      issues.push({
        type: 'error',
        title: 'Multiple H1 Tags',
        description: 'Only one H1 tag should be used per page.',
        element: 'h1',
        impact: 'high'
      });
    }

    // Image issues
    if (metrics.imagesCount > 0 && metrics.imagesWithAlt < metrics.imagesCount) {
      const missingAlt = metrics.imagesCount - metrics.imagesWithAlt;
      issues.push({
        type: 'warning',
        title: 'Images Missing Alt Text',
        description: `${missingAlt} image(s) are missing alt text, which is important for accessibility and SEO.`,
        element: 'img',
        impact: 'medium'
      });
    }

    // Content length issues
    if (metrics.contentLength < 300) {
      issues.push({
        type: 'warning',
        title: 'Content Too Short',
        description: 'Content should be at least 300 words for better SEO performance.',
        element: 'content',
        impact: 'medium'
      });
    }

    // Readability issues
    if (metrics.readabilityScore < 50) {
      issues.push({
        type: 'warning',
        title: 'Poor Readability',
        description: 'Content readability score is low. Consider using simpler language and shorter sentences.',
        element: 'content',
        impact: 'medium'
      });
    }

    return issues;
  };

  const generateSuggestions = (metrics: SEOMetrics, issues: SEOIssue[]): SEOSuggestion[] => {
    const suggestions: SEOSuggestion[] = [];

    // Keyword suggestions
    if (Object.keys(metrics.keywordDensity).length === 0) {
      suggestions.push({
        title: 'Add Target Keywords',
        description: 'Include relevant keywords naturally throughout your content.',
        action: 'Add 2-3 primary keywords to improve search visibility.',
        priority: 'high'
      });
    }

    // Social media suggestions
    if (!metrics.socialMetaTags.og) {
      suggestions.push({
        title: 'Add Open Graph Tags',
        description: 'Open Graph tags help control how your content appears on social media.',
        action: 'Add og:title, og:description, and og:image meta tags.',
        priority: 'medium'
      });
    }

    if (!metrics.socialMetaTags.twitter) {
      suggestions.push({
        title: 'Add Twitter Card Tags',
        description: 'Twitter Card tags improve how your content appears when shared on Twitter.',
        action: 'Add twitter:card, twitter:title, and twitter:description meta tags.',
        priority: 'medium'
      });
    }

    // Internal linking suggestions
    if (metrics.linksCount.internal === 0) {
      suggestions.push({
        title: 'Add Internal Links',
        description: 'Internal links help search engines understand your site structure.',
        action: 'Add links to related pages on your website.',
        priority: 'medium'
      });
    }

    // Schema markup suggestion
    if (!metrics.socialMetaTags.schema) {
      suggestions.push({
        title: 'Add Schema Markup',
        description: 'Schema markup helps search engines understand your content better.',
        action: 'Add structured data markup for better rich snippets.',
        priority: 'low'
      });
    }

    return suggestions;
  };

  const calculateSEOScore = (metrics: SEOMetrics, issues: SEOIssue[]): number => {
    let score = 100;

    // Deduct points for issues
    issues.forEach(issue => {
      switch (issue.impact) {
        case 'high':
          score -= 15;
          break;
        case 'medium':
          score -= 10;
          break;
        case 'low':
          score -= 5;
          break;
      }
    });

    // Bonus points for good practices
    if (metrics.titleLengthStatus === 'good') score += 5;
    if (metrics.metaDescriptionStatus === 'good') score += 5;
    if (metrics.headingsCount.h1 === 1) score += 5;
    if (metrics.imagesCount === metrics.imagesWithAlt) score += 5;
    if (metrics.contentLength >= 500) score += 5;
    if (metrics.socialMetaTags.og) score += 5;
    if (metrics.socialMetaTags.twitter) score += 5;

    return Math.max(0, Math.min(100, score));
  };

  const calculateReadability = (text: string): number => {
    // Simplified readability calculation
    const sentences = text.split(/[.!?]+/).length;
    const words = text.split(/\s+/).length;
    const syllables = text.split(/[aeiouAEIOU]/).length;

    if (sentences === 0 || words === 0) return 0;

    // Flesch Reading Ease Score (simplified)
    const avgSentenceLength = words / sentences;
    const avgSyllablesPerWord = syllables / words;

    const score = 206.835 - (1.015 * avgSentenceLength) - (84.6 * avgSyllablesPerWord);
    return Math.max(0, Math.min(100, score));
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">SEO Analysis</h3>
          <p className="text-gray-600">Analyze and optimize your content for search engines</p>
        </div>
        {analysis && (
          <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${getScoreBg(analysis.score)}`}>
            <Target className="h-5 w-5" />
            <span className={`font-semibold ${getScoreColor(analysis.score)}`}>
              Score: {analysis.score}/100
            </span>
          </div>
        )}
      </div>

      {analyzing ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Analyzing SEO factors...</p>
        </div>
      ) : analysis ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Metrics Overview */}
          <div className="bg-white rounded-lg shadow p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Content Metrics</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Content Length</span>
                <span className="font-medium">{analysis.metrics.contentLength} words</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Readability Score</span>
                <span className="font-medium">{analysis.metrics.readabilityScore}/100</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Images</span>
                <span className="font-medium">
                  {analysis.metrics.imagesWithAlt}/{analysis.metrics.imagesCount} with alt text
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Internal Links</span>
                <span className="font-medium">{analysis.metrics.linksCount.internal}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">External Links</span>
                <span className="font-medium">{analysis.metrics.linksCount.external}</span>
              </div>
            </div>

            {/* Heading Structure */}
            <div className="mt-6">
              <h5 className="text-sm font-medium text-gray-900 mb-3">Heading Structure</h5>
              <div className="grid grid-cols-3 gap-2 text-sm">
                {Object.entries(analysis.metrics.headingsCount).map(([tag, count]) => (
                  <div key={tag} className="flex justify-between">
                    <span className="text-gray-600">{tag.toUpperCase()}:</span>
                    <span className="font-medium">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Issues & Suggestions */}
          <div className="space-y-6">
            {/* Issues */}
            {analysis.issues.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Issues Found</h4>
                <div className="space-y-3">
                  {analysis.issues.map((issue, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg border">
                      <div className={`p-1 rounded-full ${issue.type === 'error' ? 'bg-red-100' :
                          issue.type === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
                        }`}>
                        {issue.type === 'error' ? (
                          <X className="h-4 w-4 text-red-600" />
                        ) : issue.type === 'warning' ? (
                          <AlertCircle className="h-4 w-4 text-yellow-600" />
                        ) : (
                          <CheckCircle className="h-4 w-4 text-blue-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-900">{issue.title}</h5>
                        <p className="text-sm text-gray-600 mt-1">{issue.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Suggestions */}
            {analysis.suggestions.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Suggestions</h4>
                <div className="space-y-3">
                  {analysis.suggestions.map((suggestion, index) => (
                    <div key={index} className="p-3 rounded-lg border border-gray-200">
                      <div className="flex items-start justify-between">
                        <h5 className="font-medium text-gray-900">{suggestion.title}</h5>
                        <span className={`px-2 py-1 text-xs rounded-full ${suggestion.priority === 'high' ? 'bg-red-100 text-red-800' :
                            suggestion.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                          {suggestion.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{suggestion.description}</p>
                      <p className="text-sm text-red-600 mt-2 font-medium">{suggestion.action}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">Enter content to analyze SEO factors</p>
        </div>
      )}
    </div>
  );
};

// Content Analytics Component
const ContentAnalytics = ({ contentId }: { contentId: string }) => {
  const [analytics, setAnalytics] = useState<ContentAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  useEffect(() => {
    loadAnalytics();
  }, [contentId, timeRange]);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      // Mock data - in production, fetch from your analytics API
      const mockAnalytics: ContentAnalytics = {
        views: 1247,
        uniqueVisitors: 892,
        avgTimeOnPage: 180, // seconds
        bounceRate: 0.32,
        conversions: 23,
        shares: {
          facebook: 12,
          twitter: 8,
          linkedin: 3,
          total: 23
        },
        devices: {
          desktop: 0.45,
          mobile: 0.42,
          tablet: 0.13
        },
        topReferrers: [
          { source: 'Google', visits: 456 },
          { source: 'Direct', visits: 234 },
          { source: 'Facebook', visits: 123 },
          { source: 'Twitter', visits: 89 },
          { source: 'LinkedIn', visits: 45 }
        ],
        searchQueries: [
          { query: 'japanese tea ceremony', clicks: 45, impressions: 234 },
          { query: 'traditional japanese culture', clicks: 32, impressions: 189 },
          { query: 'tea ceremony guide', clicks: 28, impressions: 156 }
        ],
        geographicData: [
          { country: 'India', visits: 456 },
          { country: 'Japan', visits: 234 },
          { country: 'United States', visits: 123 },
          { country: 'United Kingdom', visits: 89 },
          { country: 'Canada', visits: 67 }
        ],
        performance: {
          loadTime: 1.2,
          timeToInteractive: 2.1,
          firstContentfulPaint: 0.8,
          largestContentfulPaint: 1.8
        }
      };
      setAnalytics(mockAnalytics);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading analytics...</p>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <BarChart3 className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-600">No analytics data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Content Analytics</h3>
          <p className="text-gray-600">Performance metrics and insights</p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value as any)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Page Views</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.views.toLocaleString()}</p>
            </div>
            <Eye className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Unique Visitors</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.uniqueVisitors.toLocaleString()}</p>
            </div>
            <Users className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Time on Page</p>
              <p className="text-2xl font-bold text-gray-900">{Math.floor(analytics.avgTimeOnPage / 60)}m {analytics.avgTimeOnPage % 60}s</p>
            </div>
            <Clock className="h-8 w-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Conversions</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.conversions}</p>
            </div>
            <Target className="h-8 w-8 text-red-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Device Breakdown */}
        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Device Breakdown</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Monitor className="h-4 w-4 text-gray-600" />
                <span className="text-gray-700">Desktop</span>
              </div>
              <span className="font-medium">{(analytics.devices.desktop * 100).toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${analytics.devices.desktop * 100}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Smartphone className="h-4 w-4 text-gray-600" />
                <span className="text-gray-700">Mobile</span>
              </div>
              <span className="font-medium">{(analytics.devices.mobile * 100).toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${analytics.devices.mobile * 100}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Tablet className="h-4 w-4 text-gray-600" />
                <span className="text-gray-700">Tablet</span>
              </div>
              <span className="font-medium">{(analytics.devices.tablet * 100).toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-500 h-2 rounded-full"
                style={{ width: `${analytics.devices.tablet * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Top Referrers */}
        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Top Referrers</h4>
          <div className="space-y-3">
            {analytics.topReferrers.map((referrer, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-gray-600" />
                  <span className="text-gray-700">{referrer.source}</span>
                </div>
                <span className="font-medium">{referrer.visits}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Search Performance */}
        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Search Performance</h4>
          <div className="space-y-3">
            {analytics.searchQueries.map((query, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{query.query}</span>
                  <span className="text-sm text-gray-600">{query.clicks} clicks</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">CTR: {((query.clicks / query.impressions) * 100).toFixed(1)}%</span>
                  <span className="text-gray-600">{query.impressions} impressions</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Geographic Data */}
        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Geographic Distribution</h4>
          <div className="space-y-3">
            {analytics.geographicData.map((country, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-700">{country.country}</span>
                <span className="font-medium">{country.visits}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export { SEOAnalyzer, ContentAnalytics };
export type { SEOAnalysis };