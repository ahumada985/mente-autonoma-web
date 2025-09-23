'use client'

import Link from 'next/link'
import Footer from '@/components/Footer'

export default function TreintaIdeas() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Estándar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center space-x-3 group">
              <img src="/logo_final.png" alt="Mente Autónoma" className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Mente Autónoma</h1>
                <p className="text-sm text-gray-600">Soluciones Digitales</p>
              </div>
            </Link>
            
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Inicio
              </Link>
              <Link href="/servicios-desarrollo-web" className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Servicios
              </Link>
              <Link href="/noticias" className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Noticias
              </Link>
            </nav>
            
            <div className="flex items-center space-x-4">
              <Link href="/contacto" className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl border-0 backdrop-blur-sm">
                Contacto
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            30 Ideas para Implementar IA en tu Negocio
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre estrategias probadas y casos de éxito para transformar tu empresa con Inteligencia Artificial
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Aquí irían las 30 ideas */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Idea 1: Chatbots de Atención al Cliente</h3>
            <p className="text-gray-600">Implementa chatbots inteligentes para resolver consultas básicas 24/7</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Idea 2: Análisis Predictivo de Ventas</h3>
            <p className="text-gray-600">Predice tendencias de ventas usando machine learning</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Idea 3: Automatización de Marketing</h3>
            <p className="text-gray-600">Personaliza campañas de marketing con IA</p>
          </div>
        </div>
      </main>

      {/* Footer Estándar */}
      <Footer />
    </div>
  )
}
