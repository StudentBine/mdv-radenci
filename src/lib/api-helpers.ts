import { NextResponse } from 'next/server'

// Input validation helpers
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePassword(password: string): { valid: boolean; message?: string } {
  if (password.length < 8) {
    return { valid: false, message: 'Geslo mora biti dolgo vsaj 8 znakov' }
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: 'Geslo mora vsebovati vsaj eno veliko črko' }
  }
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: 'Geslo mora vsebovati vsaj eno malo črko' }
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: 'Geslo mora vsebovati vsaj eno številko' }
  }
  return { valid: true }
}

export function sanitizeString(input: string): string {
  return input.trim().replace(/[<>]/g, '')
}

export function validateStringLength(
  input: string, 
  min: number, 
  max: number,
  fieldName: string
): { valid: boolean; message?: string } {
  if (input.length < min) {
    return { valid: false, message: `${fieldName} mora biti dolgo vsaj ${min} znakov` }
  }
  if (input.length > max) {
    return { valid: false, message: `${fieldName} je lahko dolgo največ ${max} znakov` }
  }
  return { valid: true }
}

// CORS headers for production
export function getCorsHeaders(origin?: string) {
  const allowedOrigins = [
    process.env.NEXT_PUBLIC_APP_URL,
    'https://mdv-radenci.vercel.app',
    'https://www.mdv-radenci.si',
  ].filter(Boolean)

  const isAllowed = origin && allowedOrigins.includes(origin)

  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : allowedOrigins[0] || '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  }
}

// Error response helper
export function errorResponse(
  message: string,
  status: number = 400,
  additionalData?: Record<string, any>
) {
  return NextResponse.json(
    {
      error: message,
      ...additionalData
    },
    { status }
  )
}

// Success response helper
export function successResponse(
  data: any,
  status: number = 200
) {
  return NextResponse.json(data, { status })
}

// Check if request is from authenticated admin
export async function isAdmin(request: Request): Promise<boolean> {
  try {
    const session = await getServerSession()
    return (session?.user as any)?.role === 'admin'
  } catch {
    return false
  }
}

// Dummy getServerSession for now - you'll need to implement this properly
async function getServerSession(): Promise<any> {
  // This should use NextAuth's getServerSession
  return null
}
