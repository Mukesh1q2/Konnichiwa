// Performance optimization and caching system
// Redis dependencies removed to simplify deployment

export interface CacheOptions {
  ttl?: number;
  forceRefresh?: boolean;
  tags?: string[];
}

export interface PerformanceMetrics {
  responseTime: number;
  cacheHit: boolean;
  databaseQueries: number;
  memoryUsage: number;
  timestamp: Date;
}

export class PerformanceService {
  // Simple in-memory cache for build/runtime fallback
  private static memoryCache = new Map<string, { data: any; expires: number }>();

  // Generic caching decorator - now uses simple memory cache
  static async cache<T>(
    key: string,
    ttl: number,
    fetcher: () => Promise<T>,
    options: CacheOptions = {}
  ): Promise<{ data: T; fromCache: boolean }> {
    const startTime = Date.now();
    const now = Date.now();

    // Check memory cache
    const cached = this.memoryCache.get(key);
    if (cached && cached.expires > now && !options.forceRefresh) {
      return {
        data: cached.data,
        fromCache: true
      };
    }

    // Fetch fresh data
    try {
      const data = await fetcher();

      // Store in memory cache
      this.memoryCache.set(key, {
        data,
        expires: now + (ttl * 1000)
      });

      return {
        data,
        fromCache: false
      };
    } catch (error) {
      const data = await fetcher();
      return { data, fromCache: false };
    }
  }

  // Invalidate cache by tags - simplified
  static async invalidateByTags(tags: string[]): Promise<void> {
    // In-memory cache is simple, we just clear everything for now if tags match
    // Or we could implement more complex tag logic, but for now simple is better
    this.memoryCache.clear();
  }

  // Cache events
  static async getEventsCache(brand?: string, category?: string, featured?: boolean) {
    const cacheKey = `events:${brand || 'all'}:${category || 'all'}:${featured !== undefined ? featured : 'all'}`;
    const ttl = 300; // 5 minutes

    return this.cache(cacheKey, ttl, async () => {
      const { DatabaseService } = await import('./database');
      return await DatabaseService.getEvents({ brand, category, featured });
    });
  }

  // Cache articles
  static async getArticlesCache(brand?: string, category?: string) {
    const cacheKey = `articles:${brand || 'all'}:${category || 'all'}`;
    const ttl = 600; // 10 minutes

    return this.cache(cacheKey, ttl, async () => {
      const { DatabaseService } = await import('./database');
      return await DatabaseService.getMagazineArticles({ brand, category });
    });
  }

  // Cache search results
  static async getSearchCache(query: string, filters: any) {
    const cacheKey = `search:${Buffer.from(JSON.stringify({ query, filters })).toString('base64')}`;
    const ttl = 60; // 1 minute

    return this.cache(cacheKey, ttl, async () => {
      const { DatabaseService } = await import('./database');
      return await DatabaseService.search(query, 'events');
    });
  }

  // Cache statistics
  static async getStatisticsCache(type: string) {
    const cacheKey = `stats:${type}`;
    const ttl = 3600; // 1 hour

    return this.cache(cacheKey, ttl, async () => {
      switch (type) {
        case 'dashboard':
          return await this.calculateDashboardStats();
        case 'events':
          return await this.calculateEventStats();
        case 'users':
          return await this.calculateUserStats();
        default:
          return {};
      }
    });
  }

  static async calculateDashboardStats() {
    try {
      const { DatabaseService } = await import('./database');
      const [events, tickets, subscribers, contacts] = await Promise.all([
        DatabaseService.getEvents(),
        DatabaseService.getTickets(),
        DatabaseService.getNewsletterSubscribers(),
        DatabaseService.getContacts()
      ]);

      return {
        totalEvents: events.length,
        upcomingEvents: events.filter(e => e.status === 'upcoming').length,
        totalTickets: tickets.length,
        confirmedTickets: tickets.filter(t => t.status === 'confirmed').length,
        totalRevenue: tickets
          .filter(t => t.status === 'confirmed')
          .reduce((sum, t) => sum + (t.total_price || 0), 0),
        newsletterSubscribers: subscribers.length,
        pendingContacts: (contacts || []).filter(c => c.status === 'new').length,
        lastUpdated: new Date().toISOString()
      };
    } catch (error) {
      return {};
    }
  }

  static async calculateEventStats() {
    try {
      const { DatabaseService } = await import('./database');
      const events = await DatabaseService.getEvents();
      return {
        totalEvents: events.length,
        eventsByBrand: {
          konnichiwa: events.filter(e => e.brand === 'konnichiwa').length,
          namaste: events.filter(e => e.brand === 'namaste').length
        },
        lastUpdated: new Date().toISOString()
      };
    } catch (error) {
      return {};
    }
  }

  static async calculateUserStats() {
    try {
      const { DatabaseService } = await import('./database');
      const tickets = await DatabaseService.getTickets();
      const subscribers = await DatabaseService.getNewsletterSubscribers();
      return {
        totalTicketsSold: tickets.length,
        newsletterSubscribers: subscribers.length,
        lastUpdated: new Date().toISOString()
      };
    } catch (error) {
      return {};
    }
  }

  static async trackPerformance(operation: string, duration: number, metadata: any = {}) {
    // Analytics removed to avoid Redis dependencies
  }

  static async getPerformanceMetrics(limit: number = 100) {
    return [];
  }

  static async healthCheck() {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString()
    };
  }

  static async clearAllCache(): Promise<void> {
    this.memoryCache.clear();
  }

  static async getCacheStats() {
    return {
      totalKeys: this.memoryCache.size,
      lastUpdated: new Date().toISOString()
    };
  }

  static async preloadCache() {
    // Optional preload logic
  }
}

// Analytics tracking service - Mocked
export class AnalyticsService {
  static async trackPageView(page: string, userId?: string, metadata: any = {}) { }
  static async trackAction(action: string, userId?: string, metadata: any = {}) { }
  static async getAnalyticsData(type: string, timeframe: string = '24h') {
    return { type, timeframe, totalEvents: 0, events: [], summary: {} };
  }
}

export const withPerformanceTracking = (handler: Function) => {
  return async (req: any, res: any) => {
    return await handler(req, res);
  };
};

export default PerformanceService;