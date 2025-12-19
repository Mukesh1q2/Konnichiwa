import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { RateLimiter, createRateLimitMiddleware } from './lib/rate-limit';
import { AccountLockoutService } from './lib/account-lockout';

// Define which routes need protection
const PROTECTED_ROUTES = [
  '/api/auth/',
  '/api/profile/'
];

const RATE_LIMIT_CONFIGS = {
  '/api/auth/': RateLimiter.CONFIGS.AUTH,
  '/api/events/': RateLimiter.CONFIGS.API,
  '/api/': RateLimiter.CONFIGS.API
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if route needs protection
  const needsProtection = PROTECTED_ROUTES.some(route => pathname.startsWith(route));

  if (!needsProtection) {
    return NextResponse.next();
  }

  // Apply rate limiting
  const clientIP = request.ip ?? request.headers.get('x-forwarded-for') ?? 'unknown';
  const identifier = `${clientIP}:${pathname}`;

  // Find appropriate rate limit config
  const config = Object.entries(RATE_LIMIT_CONFIGS).find(([route]) => pathname.startsWith(route))?.[1];
  if (config) {
    const rateLimitResult = await RateLimiter.checkAndRecord(identifier, config);

    if (!rateLimitResult.allowed) {
      return new NextResponse(
        JSON.stringify({
          error: 'Too many requests',
          retryAfter: Math.ceil((rateLimitResult.info.reset - Date.now()) / 1000)
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'X-RateLimit-Limit': rateLimitResult.info.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.info.remaining.toString(),
            'X-RateLimit-Reset': rateLimitResult.info.reset.toString()
          }
        }
      );
    }
  }

  // Apply account lockout for auth routes
  if (pathname.startsWith('/api/auth/')) {
    const email = request.headers.get('email') || request.headers.get('x-user-email');
    if (email) {
      const lockoutStatus = await AccountLockoutService.checkAccountStatus(email);
      if (lockoutStatus.isLocked) {
        return new NextResponse(
          JSON.stringify({
            error: 'Account locked',
            message: 'Too many failed login attempts. Please try again later.',
            retryAfter: lockoutStatus.lockoutExpiresAt ? Math.ceil((lockoutStatus.lockoutExpiresAt.getTime() - Date.now()) / 1000) : 3600
          }),
          {
            status: 423,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|public|.*\\..*).*)',
  ],
};
