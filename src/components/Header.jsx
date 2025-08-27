'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <Image 
              src="/logo_final.png" 
              alt="Mente Autónoma" 
              width={40} 
              height={40} 
              className="object-contain group-hover:scale-110 transition-transform duration-300"
            />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Mente Autónoma</h1>
              <p className="text-sm text-gray-600">Soluciones Digitales</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
              Inicio
            </Link>
            <Link href="/servicios-desarrollo-web" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
              Servicios
            </Link>
            <Link href="/noticias" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
              Noticias
            </Link>
            <Link 
              href="/contacto" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Contacto
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link 
                href="/servicios-desarrollo-web" 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Servicios
              </Link>
              <Link 
                href="/noticias" 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Noticias
              </Link>
              <Link 
                href="/contacto" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold text-center hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
