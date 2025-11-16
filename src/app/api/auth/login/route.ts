import { NextRequest, NextResponse } from 'next/server'
import { authLimiter, getRateLimitHeaders, rateLimitResponse } from '@/lib/rate-limit'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcrypt'

export async function POST(request: NextRequest) {
  try {
    // Get IP address for rate limiting
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown'
    
    // Apply rate limiting
    const rateLimitResult = await authLimiter.check(ip)
    
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { 
          error: 'Preveč poskusov prijave',
          message: 'Prosimo počakajte 15 minut pred naslednjim poskusom.' 
        },
        { 
          status: 429,
          headers: {
            ...getRateLimitHeaders(rateLimitResult),
            'Retry-After': '900' // 15 minutes
          }
        }
      )
    }

    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email in geslo sta obvezna' },
        { status: 400, headers: getRateLimitHeaders(rateLimitResult) }
      )
    }

    // Find user
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Napačen email ali geslo' },
        { status: 401, headers: getRateLimitHeaders(rateLimitResult) }
      )
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Napačen email ali geslo' },
        { status: 401, headers: getRateLimitHeaders(rateLimitResult) }
      )
    }

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      },
      { headers: getRateLimitHeaders(rateLimitResult) }
    )
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Napaka pri prijavi' },
      { status: 500 }
    )
  }
}
