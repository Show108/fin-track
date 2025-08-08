'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface HeaderProps {
  onSearchChange?: (query: string) => void
  searchQuery?: string
}

export default function Header({ onSearchChange, searchQuery = '' }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery)
  const pathname = usePathname()


  useEffect(() => {
    const mainContent = document.getElementById('main-content')
    if (mainContent) {
      if (window.innerWidth >= 768) {
        mainContent.style.marginLeft = isMenuOpen ? '256px' : '0'
        mainContent.style.transition = 'margin-left 300ms ease-in-out'
      } else {
        mainContent.style.marginLeft = '0'
      }
    }
  }, [isMenuOpen])

  useEffect(() => {
    const handleResize = () => {
      const mainContent = document.getElementById('main-content')
      if (mainContent && window.innerWidth < 768) {
        mainContent.style.marginLeft = '0'
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleSearchChange = (value: string) => {
    setLocalSearchQuery(value)
    onSearchChange?.(value)
  }

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(path)
  }

  const getLinkStyles = (path: string) => {
    const baseStyles = "font-medium px-3 py-2 "
    const activeStyles = "bg-gray-100 text-secondary border border-transparent rounded-xl"
    const inactiveStyles = "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
    
    return `${baseStyles} ${isActive(path) ? activeStyles : inactiveStyles}`
  }

  const getMobileLinkStyles = (path: string) => {
    const baseStyles = "font-medium px-3 py-3 rounded-md transition-colors text-lg"
    const activeStyles = "bg-blue-100 text-blue-700"
    const inactiveStyles = "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
    
    return `${baseStyles} ${isActive(path) ? activeStyles : inactiveStyles}`
  }

  return (
    <>
      <header className="bg-white sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-1 sm:p-2 rounded-md hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu"
              >
                <Image
                  src="/images/icon.png"
                  alt="Menu"
                  width={24}
                  height={24}
                />
              </button>
              
              <div className="flex items-center">
                <Image
                  src="/images/logo (1).png"
                  alt="FinTrack Logo"
                  width={100}
                  height={32}
                />
              </div>
            </div>

            {/* Search Section */}
            <div className="flex items-center space-x-3">
              {isSearchOpen ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    value={localSearchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    autoFocus
                  />
                  <button
                    onClick={() => {
                      setIsSearchOpen(false)
                      handleSearchChange('')
                    }}
                    className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <Image
                    src="/images/search.png"
                    alt="Search"
                    width={20}
                    height={20}
                  />
                </button>
              )}
              
              <button className="p-2 rounded-md hover:bg-gray-100 transition-colors">
                <Image
                  src="/images/app-grid.png"
                  alt="Apps"
                  width={20}
                  height={20}
                />
              </button>
              
              <button className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                <Image
                  src="/images/profile.png"
                  alt="Profile"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Desktop Sidebar */}
      <div className={`hidden md:block fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white transition-transform duration-300 ease-in-out z-40 ${
        isMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="w-64 p-6">
          <nav className="flex flex-col space-y-2">
            <Link 
              href="/" 
              className={getLinkStyles('/')}
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              href="/transactions" 
              className={getLinkStyles('/transactions')}
              onClick={() => setIsMenuOpen(false)}
            >
              Transactions
            </Link>
            <Link 
              href="/reports" 
              className={getLinkStyles('/reports')}
              onClick={() => setIsMenuOpen(false)}
            >
              Reports
            </Link>
            <Link 
              href="/settings" 
              className={getLinkStyles('/settings')}
              onClick={() => setIsMenuOpen(false)}
            >
              Settings
            </Link>
          </nav>
        </div>
      </div>

      {/* Mobile Overlay Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div 
            className="fixed inset-0 bg-white backdrop-blur-sm opacity-90"
            onClick={() => setIsMenuOpen(false)}
          />
          
          <div className="fixed top-0 left-0 w-80 max-w-[80vw] h-full bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <Image
                src="/images/logo (1).png"
                alt="FinTrack Logo"
                width={100}
                height={32}
              />
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <nav className="p-6">
              <div className="flex flex-col space-y-4">
                <Link 
                  href="/" 
                  className={getMobileLinkStyles('/')}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  href="/transactions" 
                  className={getMobileLinkStyles('/transactions')}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Transactions
                </Link>
                <Link 
                  href="/reports" 
                  className={getMobileLinkStyles('/reports')}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Reports
                </Link>
                <Link 
                  href="/settings" 
                  className={getMobileLinkStyles('/settings')}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Settings
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}