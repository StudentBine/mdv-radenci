'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLucide } from '@/hooks/useLucide'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  useLucide() // Initialize lucide icons

  const navigation = [
    { name: 'Domov', href: '/', icon: 'home' },
    { name: 'Novice', href: '/novice', icon: 'newspaper' },
    { name: 'O nas', href: '/o-nas', icon: 'users' },
    { name: 'Kontakt', href: '/kontakt', icon: 'mail' },
  ]

  return (
    <header className="bg-primary-white shadow-sm sticky top-0 z-50">
      <nav className="container-custom">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary-green rounded-full flex items-center justify-center">
              <span className="text-primary-white font-heading font-bold text-lg">MDV</span>
            </div>
            <div>
              <h1 className="font-heading font-bold text-xl text-gray-900">MDV Radenci</h1>
              <p className="text-sm text-gray-600">Mladinsko društvo vrelec Radenci</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative flex items-center space-x-2 text-gray-700 hover:text-primary-green font-medium transition-colors duration-300 group pb-1"
                >
                <i data-lucide={item.icon} className="w-5 h-5"></i>
                <span>{item.name}</span>
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-green scale-x-0 transition-transform duration-300 group-hover:scale-x-100 origin-left"></span>
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <i data-lucide="x" className="w-6 h-6 text-gray-700"></i>
            ) : (
              <i data-lucide="menu" className="w-6 h-6 text-gray-700"></i>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-primary-white shadow-lg border-t border-gray-100 animate-fade-in">
            <div className="px-4 py-6 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-3 py-2 text-gray-700 hover:text-primary-green font-medium transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <i data-lucide={item.icon} className="w-5 h-5"></i>
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}