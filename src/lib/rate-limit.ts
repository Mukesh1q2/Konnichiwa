import { DatabaseService } from './database';

export interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per window
  skipSuccessfulRequests: boolean;
  skipFailedRequests: boolean;
  keyGenerator?: (req: any) => string;
}

export interface RateLimitInfo {
  limit: number;
  remaining: number;
  reset: number;
  totalHits: number;
}

export class RateLimiter {
  private static readonly DEFAULT_WINDOW = 15 * 60 * 1000; // 15 minutes
  private static readonly DEFAULT_MAX_REQUESTS = 100;

  // In-memory store for rate limiting (in production, use Redis)
  private static rateLimitStore = new Map<string, { count: number; resetTime: number }>();

  static async checkRateLimit(
    identifier: string,
    config: Partial<RateLimitConfig> = {}
  ): Promise<{ allowed: boolean; info: RateLimitInfo }> {
    const {
      windowMs = this.DEFAULT_WINDOW,
      maxRequests = this.DEFAULT_MAX_REQUESTS,
      skipSuccessfulRequests = false,
      skipFailedRequests = false
    } = config;

    const now = Date.now();
    const key = this.getKey(identifier);

    // Clean up expired entries
    this.cleanup();

    const current = this.rateLimitStore.get(key);

    if (!current || now > current.resetTime) {
      // First request or window has expired
      const newRecord = {
        count: 1,
        resetTime: now + windowMs
      };
      this.rateLimitStore.set(key, newRecord);

      return {
        allowed: true,
        info: {
          limit: maxRequests,
          remaining: maxRequests - 1,
          reset: newRecord.resetTime,
          totalHits: 1
        }
      };
    }

    if (current.count >= maxRequests) {
      // Rate limit exceeded
      return {
        allowed: false,
        info: {
          limit: maxRequests,
          remaining: 0,
          reset: current.resetTime,
          totalHits: current.count
        }
      };
    }

    // Increment counter
    current.count++;
    this.rateLimitStore.set(key, current);

    return {
      allowed: true,
      info: {
        limit: maxRequests,
        remaining: maxRequests - current.count,
        reset: current.resetTime,
        totalHits: current.count
      }
    };
  }

  static async recordRequest(
    identifier: string,
    success: boolean,
    config: Partial<RateLimitConfig> = {}
  ): Promise<void> {
    const {
      skipSuccessfulRequests = false,
      skipFailedRequests = false
    } = config;

    // Skip recording if configured to do so
    if ((success && skipSuccessfulRequests) || (!success && skipFailedRequests)) {
      return;
    }

    // In a production environment, you might want to log these to a database
    // for analytics and security monitoring
    try {
      await DatabaseService.createRateLimitLog({
        identifier,
        success,
        timestamp: new Date(),
        user_agent: '', // Would be populated from request headers
        ip_address: '' // Would be populated from request headers
      });
    } catch (error) {
      // Log error but don't throw to avoid breaking the main flow
      console.error('Failed to record rate limit log:', error);
    }
  }

  static async checkAndRecord(
    identifier: string,
    config: Partial<RateLimitConfig> = {}
  ): Promise<{ allowed: boolean; info: RateLimitInfo }> {
    const result = await this.checkRateLimit(identifier, config);

    // Record the request attempt
    await this.recordRequest(identifier, result.allowed, config);

    return result;
  }

  private static getKey(identifier: string): string {
    return `rate_limit_${identifier}`;
  }

  private static cleanup(): void {
    const now = Date.now();
    Array.from(this.rateLimitStore.entries()).forEach(([key, value]) => {
      if (now > value.resetTime) {
        this.rateLimitStore.delete(key);
      }
    });
  }

  // Specific rate limit configurations for different endpoints
  static readonly CONFIGS = {
    // Authentication endpoints - stricter limits
    AUTH: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      maxRequests: 5, // 5 attempts per 15 minutes
      skipSuccessfulRequests: false,
      skipFailedRequests: false
    },
    // Password reset - very strict
    PASSWORD_RESET: {
      windowMs: 60 * 60 * 1000, // 1 hour
      maxRequests: 3, // 3 attempts per hour
      skipSuccessfulRequests: true, // Don't count successful resets
      skipFailedRequests: false
    },
    // API endpoints - moderate limits
    API: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      maxRequests: 100, // 100 requests per 15 minutes
      skipSuccessfulRequests: false,
      skipFailedRequests: false
    },
    // Payment endpoints - strict for security
    PAYMENT: {
      windowMs: 10 * 60 * 1000, // 10 minutes
      maxRequests: 10, // 10 attempts per 10 minutes
      skipSuccessfulRequests: true,
      skipFailedRequests: false
    }
  };
}

// Middleware function for Next.js API routes
export function createRateLimitMiddleware(config: Partial<RateLimitConfig> = {}) {
  return async (req: any, res: any, next: any) => {
    try {
      // Extract identifier from request
      const identifier = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown';

      const result = await RateLimiter.checkAndRecord(identifier, config);

      // Set rate limit headers
      res.setHeader('X-RateLimit-Limit', result.info.limit.toString());
      res.setHeader('X-RateLimit-Remaining', result.info.remaining.toString());
      res.setHeader('X-RateLimit-Reset', result.info.reset.toString());

      if (!result.allowed) {
        res.status(429).json({
          error: 'Too many requests',
          retryAfter: Math.ceil((result.info.reset - Date.now()) / 1000)
        });
        return;
      }

      next();
    } catch (error) {
      console.error('Rate limit middleware error:', error);
      // Allow request to proceed if rate limiting fails
      next();
    }
  };
}