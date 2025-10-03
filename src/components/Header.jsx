'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import OptimizedImage from '@/components/OptimizedImage'

export default function Header() {
  const [isHeaderSticky, setIsHeaderSticky] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsHeaderSticky(scrollPosition > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isHeaderSticky
        ? 'bg-white border-b border-gray-200 shadow-sm'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Desktop */}
        <div className="hidden md:flex justify-between items-center h-20">
          {/* Logo y texto */}
          <Link href="/" className="flex items-center space-x-3 group">
            <OptimizedImage
              src="/logo_final.png"
              alt="Mente Autónoma"
              width={40}
              height={40}
              priority={true}
              className="w-10 h-10 group-hover:scale-110 transition-transform duration-300"
            />
            <div>
              <h1 className={`text-xl font-bold transition-colors duration-300 ${
                isHeaderSticky ? 'text-gray-900' : 'text-white'
              }`}>Mente Autónoma</h1>
              <p className={`text-sm transition-colors duration-300 ${
                isHeaderSticky ? 'text-gray-600' : 'text-white/80'
              }`}>Soluciones Digitales</p>
            </div>
          </Link>

          {/* Navegación desktop */}
          <nav className="flex space-x-8">
            <Link href="/" className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
              isHeaderSticky
                ? 'text-gray-700 hover:text-blue-600'
                : 'text-white/90 hover:text-white'
            }`}>
              Inicio
            </Link>
            <Link href="/servicios-desarrollo-web" className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
              isHeaderSticky
                ? 'text-gray-700 hover:text-blue-600'
                : 'text-white/90 hover:text-white'
            }`}>
              Servicios
            </Link>
            <Link href="/noticias" className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
              isHeaderSticky
                ? 'text-gray-700 hover:text-blue-600'
                : 'text-white/90 hover:text-white'
            }`}>
              Noticias
            </Link>
          </nav>

          {/* Botón Contacto desktop */}
          <Link href="/contacto" className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl border-0 backdrop-blur-sm">
            Contacto
          </Link>
        </div>

        {/* Header Móvil - Layout: Logo | Contacto | Hamburger */}
        <div className="md:hidden flex items-center justify-between h-20">
          {/* Logo y texto - MÁS PEQUEÑO en móvil */}
          <Link href="/" className="flex items-center space-x-3 group">
            <OptimizedImage
              src="/logo_final.png"
              alt="Mente Autónoma"
              width={40}
              height={40}
              priority={true}
              className="w-10 h-10 group-hover:scale-110 transition-transform duration-300"
            />
            <div>
              <h1 className={`text-base font-bold transition-colors duration-300 ${
                isHeaderSticky ? 'text-gray-900' : 'text-white'
              }`}>Mente Autónoma</h1>
              <p className={`text-xs transition-colors duration-300 ${
                isHeaderSticky ? 'text-gray-600' : 'text-white/80'
              }`}>Soluciones Digitales</p>
            </div>
          </Link>

          {/* Botón Contacto CENTRADO en móvil - MÁS PEQUEÑO */}
          <Link href="/contacto" className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-3 py-1.5 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl border-0 backdrop-blur-sm text-xs">
            Contacto
          </Link>

          {/* Menú hamburguesa - DERECHA en móvil */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex flex-col space-y-1 p-2"
          >
            <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
              isHeaderSticky ? 'text-gray-900' : 'text-white'
            } ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
              isHeaderSticky ? 'text-gray-900' : 'text-white'
            } ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
              isHeaderSticky ? 'text-gray-900' : 'text-white'
            } ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </button>
        </div>

        {/* Menú móvil desplegable */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b shadow-lg">
            <nav className="px-4 py-6 space-y-4">
              <Link
                href="/"
                className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-semibold transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link
                href="/servicios-desarrollo-web"
                className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-semibold transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Servicios
              </Link>
              <Link
                href="/noticias"
                className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-semibold transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Noticias
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}