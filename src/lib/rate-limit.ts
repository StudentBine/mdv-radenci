import { NextResponse } from 'next/server'

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

const store: RateLimitStore = {}

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now()
  Object.keys(store).forEach(key => {
    if (store[key].resetTime < now) {
      delete store[key]
    }
  })
}, 5 * 60 * 1000)

interface RateLimitOptions {
  interval: number // time window in milliseconds
  uniqueTokenPerInterval: number // max number of unique tokens
  maxRequests: number // max requests per interval
}

export function rateLimit(options: RateLimitOptions) {
  const { interval, maxRequests } = options

  return {
    check: async (identifier: string) => {
      const now = Date.now()
      const key = identifier

      if (!store[key] || store[key].resetTime < now) {
        store[key] = {
          count: 0,
          resetTime: now + interval
        }
      }

      store[key].count++

      const currentCount = store[key].count
      const timeUntilReset = Math.ceil((store[key].resetTime - now) / 1000)

      if (currentCount > maxRequests) {
        return {
          success: false,
          limit: maxRequests,
          remaining: 0,
          reset: timeUntilReset
        }
      }

      return {
        success: true,
        limit: maxRequests,
        remaining: maxRequests - currentCount,
        reset: timeUntilReset
      }
    }
  }
}

// Rate limit configurations
export const apiLimiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500,
  maxRequests: 30 // 30 requests per minute
})

export const authLimiter = rateLimit({
  interval: 15 * 60 * 1000, // 15 minutes
  uniqueTokenPerInterval: 500,
  maxRequests: 5 // 5 login attempts per 15 minutes
})

export const uploadLimiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500,
  maxRequests: 10 // 10 uploads per minute
})

export function getRateLimitHeaders(result: {
  limit: number
  remaining: number
  reset: number
}) {
  return {
    'X-RateLimit-Limit': result.limit.toString(),
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': result.reset.toString()
  }
}

export function rateLimitResponse() {
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
