'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'

export default function AdminSidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  const handleLogout = async () => {
    try {
      // Clear localStorage
      localStorage.removeItem('admin_token')
      localStorage.removeItem('admin_user')
      
      // Sign out with NextAuth and redirect
      await signOut({ 
        callbackUrl: '/admin/login',
        redirect: true 
      })
    } catch (error) {
      console.error('Logout error:', error)
      // Fallback: force reload to login
      window.location.href = '/admin/login'
    }
  }

  const user = session?.user
  const userName = user?.name || 'Admin'
  const userEmail = user?.email || 'admin@mdv-radenci.si'
  const userRole = (user as { role?: string })?.role || 'editor'
  const userInitial = userName.charAt(0).toUpperCase()
  const isAdmin = userRole === 'admin'

  const menuItems = [
    {
      name: 'Nadzorna plošča',
      href: '/admin/dashboard',
      icon: '📊',
      adminOnly: false
    },
    {
      name: 'Novice',
      href: '/admin/novice',
      icon: '📰',
      adminOnly: false
    },
    {
      name: 'Uporabniki',
      href: '/admin/uporabniki',
      icon: '👥',
      adminOnly: true
    }
  ]

  // Filter menu items based on user role
  const visibleMenuItems = menuItems.filter(item => !item.adminOnly || isAdmin)

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <aside className="w-64 bg-gray-900 text-primary-white h-screen flex flex-col fixed left-0 top-0">
      <div className="flex-1 overflow-y-auto p-6">
        {/* Logo */}
        <Link href="/admin/dashboard" className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-primary-green rounded-full flex items-center justify-center">
            <span className="text-primary-white font-heading font-bold text-sm">MDV</span>
          </div>
          <div>
            <h1 className="font-heading font-bold text-lg">Admin Panel</h1>
            <p className="text-gray-400 text-xs">MDV Radenci</p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="space-y-2">
          {visibleMenuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive(item.href)
                  ? 'bg-primary-green text-primary-white shadow-lg'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-primary-white'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* User info & logout - Fixed at bottom */}
      <div className="p-6 bg-gray-900 border-t border-gray-700">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-primary-yellow rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-gray-900 font-medium text-sm">{userInitial}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-primary-white truncate">
              {userName}
            </p>
            <p className="text-xs text-gray-400 truncate">
              {userEmail}
            </p>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="w-full bg-gray-800 hover:bg-red-600 text-gray-300 hover:text-primary-white py-3 px-4 rounded-lg transition-all duration-200 text-sm font-medium flex items-center justify-center space-x-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Odjava</span>
        </button>
      </div>
    </aside>
  )
}