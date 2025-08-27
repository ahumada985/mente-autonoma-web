'use client';

import { useState } from 'react';
import Link from 'next/link';
import { saveNewsletterSubscription } from '@/lib/supabase';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('idle');

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setNewsletterStatus('loading');

    try {
      const result = await saveNewsletterSubscription(email);
      if (result.success) {
        setNewsletterStatus('success');
        setEmail('');
        setTimeout(() => setNewsletterStatus('idle'), 3000);
      } else {
        setNewsletterStatus('error');
        setTimeout(() => setNewsletterStatus('idle'), 3000);
      }
    } catch (error) {
      setNewsletterStatus('error');
      setTimeout(() => setNewsletterStatus('idle'), 3000);
    }
  };

  return (
    <footer className="bg-gradient-to-r from-purple-900 via-purple-800 to-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Columna 1 - Mente Autónoma */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xl font-bold">AI</span>
              </div>
              <div>
                <h1 className="text-xl font-bold">Mente Autónoma</h1>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Transformando empresas con inteligencia artificial de vanguardia. Hacemos que la IA sea accesible para todos los negocios.
            </p>
          </div>

          {/* Columna 2 - Nuestros Servicios */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white">Nuestros Servicios</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-sm text-gray-300">Chatbot</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-300">Diseño Web</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-300">Automatización</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-gray-300">Marketing Digital</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-sm text-gray-300">Secretario IA</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                <span className="text-sm text-gray-300">Contenido RRSS</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-gray-300">Módulo</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-light-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-300">SEO</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-dark-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-300">SAAS/BAAS</span>
              </div>
            </div>
          </div>

          {/* Columna 3 - Newsletter */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white">Newsletter</h4>
            <p className="text-gray-300 leading-relaxed">
              Recibe las últimas noticias sobre IA y estrategias para tu negocio
            </p>
            <div className="bg-white rounded-xl p-4">
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Tu email aquí..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  required
                />
                <button 
                  type="submit"
                  disabled={newsletterStatus === 'loading'}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50"
                >
                  {newsletterStatus === 'loading' ? 'Suscribiendo...' : '🚀 Suscribirse Ahora'}
                </button>
                <p className="text-xs text-gray-500 text-center">
                  Al suscribirte, aceptas recibir emails con contenido relevante. Puedes cancelar en cualquier momento.
                </p>
              </form>
              
              {newsletterStatus === 'success' && (
                <p className="text-green-600 mt-2 text-xs text-center">¡Gracias! Te has suscrito exitosamente.</p>
              )}
              {newsletterStatus === 'error' && (
                <p className="text-red-600 mt-2 text-xs text-center">Por favor ingresa un email válido.</p>
              )}
            </div>
          </div>
        </div>

        {/* Línea separadora */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Mente Autónoma. Todos los derechos reservados. 
              <span className="text-emerald-400"> Construido con ❤️ y profesionalismo.</span>
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacidad" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Privacidad
              </Link>
              <Link href="/terminos" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Términos
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
