'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';
import ContactModal from '@/components/ContactModal';

export default function Contacto() {
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsHeaderSticky(scrollPosition > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header con transparencia dinámica */}
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
              <img src="/logo_final.png" alt="Mente Autónoma" className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300" />
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
              <img src="/logo_final.png" alt="Mente Autónoma" className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300" />
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
          
          {/* Menú móvil desplegable - DISEÑO CREATIVO */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-white/95 backdrop-blur-sm border-t border-gray-200 mt-2 rounded-lg shadow-lg">
              <nav className="flex flex-col space-y-2 p-4">
                <Link 
                  href="/" 
                  className="px-4 py-3 rounded-lg font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Inicio
                </Link>
                <Link 
                  href="/servicios-desarrollo-web" 
                  className="px-4 py-3 rounded-lg font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Servicios
                </Link>
                <Link 
                  href="/noticias" 
                  className="px-4 py-3 rounded-lg font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Noticias
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-900 via-purple-800 to-blue-900 text-white pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(120,119,198,0.2),transparent_50%)]"></div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium mb-6 backdrop-blur-sm border border-white/30">
            📞 Contacto Directo
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Hablemos de tu
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Proyecto
            </span>
          </h1>
          
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8 leading-relaxed">
            Estamos aquí para ayudarte a transformar tu idea en realidad. 
            Cuéntanos sobre tu proyecto y te daremos una propuesta personalizada.
          </p>
          
          <button 
            onClick={() => setIsContactModalOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            📧 Enviar Mensaje
          </button>
        </div>
      </section>

      {/* Información de Contacto */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Formulario */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Envíanos un Mensaje
              </h2>
              <p className="text-gray-600 mb-8">
                Completa el formulario y nos pondremos en contacto contigo en las próximas 24 horas.
              </p>
              
              <button 
                onClick={() => setIsContactModalOpen(true)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                📝 Abrir Formulario
              </button>
            </div>
            
            {/* Información de Contacto */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Información de Contacto
                </h2>
                <p className="text-gray-600 mb-8">
                  Estamos disponibles para responder tus consultas y ayudarte con tu proyecto.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">📧</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">contacto@menteautonoma.cl</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🌐</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Sitio Web</h3>
                    <p className="text-gray-600">www.menteautonoma.cl</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">⏰</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Horario de Atención</h3>
                    <p className="text-gray-600">Lunes a Viernes: 9:00 - 18:00</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  💡 ¿Por qué elegirnos?
                </h3>
                <ul className="space-y-2 text-blue-800">
                  <li className="flex items-center space-x-2">
                    <span className="text-blue-600">✓</span>
                    <span>Respuesta en 24 horas</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-blue-600">✓</span>
                    <span>Consultoría gratuita inicial</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-blue-600">✓</span>
                    <span>Propuestas personalizadas</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-blue-600">✓</span>
                    <span>Soporte técnico incluido</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50 text-gray-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            ¿Listo para Empezar?
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            No esperes más para transformar tu negocio con inteligencia artificial. 
            Nuestro equipo está listo para ayudarte a alcanzar tus objetivos.
          </p>
          <button 
            onClick={() => setIsContactModalOpen(true)}
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl border-0 backdrop-blur-sm"
          >
            🚀 Iniciar Proyecto
          </button>
        </div>
      </section>

      <Footer />

      {/* Modal de Contacto */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)}
        contactType="general"
      />
    </div>
  );
}

