'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'user'
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Preveri ali obstaja shranjena seja
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('admin_token')
        const userData = localStorage.getItem('admin_user')
        
        if (token && userData) {
          setUser(JSON.parse(userData))
        }
      } catch (error) {
        console.error('Error checking auth:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Use NextAuth signIn
      const { signIn } = await import('next-auth/react')
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })

      if (result?.ok && !result?.error) {
        // Fetch user data from session
        const { getSession } = await import('next-auth/react')
        const session = await getSession()
        
        if (session?.user) {
          const userData: User = {
            id: (session.user as any).id || '1',
            email: session.user.email || email,
            name: session.user.name || 'User',
            role: (session.user as any).role || 'admin'
          }
          
          setUser(userData)
          // Store user data for backwards compatibility
          localStorage.setItem('admin_user', JSON.stringify(userData))
          localStorage.setItem('admin_token', 'authenticated')
          return true
        }
      }
      return false
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  const logout = async () => {
    try {
      const { signOut } = await import('next-auth/react')
      await signOut({ redirect: false })
    } catch (error) {
      console.error('Logout error:', error)
    }
    
    setUser(null)
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
  }

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}