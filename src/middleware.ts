import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simple in-memory rate limiter
interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

const store: RateLimitStore = {}

// Cleanup old entries every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    Object.keys(store).forEach(key => {
      if (store[key].resetTime < now) {
        delete store[key]
      }
    })
  }, 5 * 60 * 1000)
}

function rateLimit(ip: string, maxRequests: number, windowMs: number): boolean {
  const now = Date.now()
  const key = ip

  if (!store[key] || store[key].resetTime < now) {
    store[key] = {
      count: 0,
      resetTime: now + windowMs
    }
  }

  store[key].count++

  return store[key].count <= maxRequests
}

export function middleware(request: NextRequest) {
  // Get IP address
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0] : 
             request.headers.get('x-real-ip') || 
             'unknown'

  const pathname = request.nextUrl.pathname

  // Different rate limits for different endpoints
  let maxRequests = 100 // Default: 100 requests per minute
  let windowMs = 60 * 1000 // 1 minute

  // Stricter limits for auth endpoints
  if (pathname.includes('/api/auth/login')) {
    maxRequests = 5 // 5 login attempts
    windowMs = 15 * 60 * 1000 // per 15 minutes
  }
  // Stricter limits for upload endpoints
  else if (pathname.includes('/api/upload')) {
    maxRequests = 10 // 10 uploads
    windowMs = 60 * 1000 // per minute
  }
  // Moderate limits for mutation endpoints
  else if (pathname.includes('/api/') && (
    request.method === 'POST' || 
    request.method === 'PUT' || 
    request.method === 'DELETE'
  )) {
    maxRequests = 30 // 30 requests
    windowMs = 60 * 1000 // per minute
  }

  // Apply rate limiting
  const isAllowed = rateLimit(ip, maxRequests, windowMs)

  if (!isAllowed) {
    return NextResponse.json(
      {
        error: 'Preveč zahtevkov',
        message: 'Prosimo počakajte nekaj trenutkov pred naslednjim poskusom.'
      },
      {
        status: 429,
        headers: {
          'Retry-After': '60'
        }
      }
    )
  }

  // Add security headers
  const response = NextResponse.next()
  
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()')

  return response
}

export const config = {
  matcher: [
    '/api/:path*',
  ],
}
