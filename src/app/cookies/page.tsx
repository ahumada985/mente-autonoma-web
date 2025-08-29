'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import ContactModal from '@/components/ContactModal';
import { useState } from 'react';

export default function Cookies() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header especial para páginas legales */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <img src="/logo_final.png" alt="Mente Autónoma" className="w-10 h-10 object-contain" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Mente Autónoma</h1>
                <p className="text-sm text-gray-600">Soluciones Digitales</p>
              </div>
            </Link>
            
            {/* Menu */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Inicio
              </Link>
              <Link href="/noticias" className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Noticias
              </Link>
              <Link href="/servicios-desarrollo-web" className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Servicios
              </Link>
            </nav>
            
            {/* CTA Button */}
            <div className="flex items-center space-x-4">
              <Link 
                href="/contacto" 
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl border-0 backdrop-blur-sm"
              >
                Contacto
              </Link>
            </div>
          </div>
        </div>
      </header>
      
      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Política de Cookies
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Esta política explica cómo utilizamos las cookies y tecnologías similares 
              para mejorar tu experiencia en nuestro sitio web.
            </p>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mt-6">
              📅 Última actualización: Enero 2025
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">🍪</span>
                ¿Qué son las Cookies?
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo 
                  cuando visitas nuestro sitio web. Estas cookies nos ayudan a:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-6">
                  <li>Recordar tus preferencias y configuraciones</li>
                  <li>Analizar cómo utilizas nuestro sitio web</li>
                  <li>Mejorar la funcionalidad y experiencia del usuario</li>
                  <li>Proporcionar contenido personalizado</li>
                  <li>Garantizar la seguridad de tu cuenta</li>
                </ul>
                <p>
                  Las cookies no contienen información personal identificable y no pueden 
                  acceder a archivos en tu dispositivo.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">📊</span>
                Tipos de Cookies que Utilizamos
              </h2>
              <div className="space-y-6 text-gray-700">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Cookies Esenciales</h3>
                  <p>
                    Estas cookies son necesarias para el funcionamiento básico del sitio web. 
                    Incluyen cookies que permiten que te muevas por el sitio y utilices funciones esenciales.
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-6 mt-2 text-sm">
                    <li>Cookies de sesión para mantener tu login</li>
                    <li>Cookies de seguridad para proteger contra ataques</li>
                    <li>Cookies de funcionalidad básica del sitio</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Cookies de Rendimiento</h3>
                  <p>
                    Nos ayudan a entender cómo los visitantes interactúan con nuestro sitio web 
                    recopilando información de forma anónima.
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-6 mt-2 text-sm">
                    <li>Google Analytics para métricas de tráfico</li>
                    <li>Análisis de páginas más visitadas</li>
                    <li>Medición del tiempo de carga</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Cookies de Funcionalidad</h3>
                  <p>
                    Permiten que el sitio web recuerde las elecciones que haces y proporcionen 
                    funcionalidades mejoradas y más personales.
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-6 mt-2 text-sm">
                    <li>Preferencias de idioma y región</li>
                    <li>Configuraciones de accesibilidad</li>
                    <li>Formularios guardados parcialmente</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Cookies de Marketing</h3>
                  <p>
                    Se utilizan para rastrear visitantes en sitios web para mostrar anuncios 
                    relevantes y atractivos para el usuario individual.
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-6 mt-2 text-sm">
                    <li>Anuncios personalizados de Google Ads</li>
                    <li>Retargeting en redes sociales</li>
                    <li>Análisis de campañas publicitarias</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">🔧</span>
                Cookies de Terceros
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Algunas cookies en nuestro sitio web son establecidas por servicios de terceros 
                  que utilizamos para mejorar la funcionalidad y experiencia del usuario.
                </p>
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Servicios de Terceros:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <div>
                        <strong>Google Analytics:</strong> Análisis de tráfico y comportamiento del usuario
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <div>
                        <strong>Google Ads:</strong> Publicidad personalizada y retargeting
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <div>
                        <strong>Facebook Pixel:</strong> Seguimiento de conversiones y anuncios
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <div>
                        <strong>LinkedIn Insight:</strong> Análisis de audiencia profesional
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">⏰</span>
                Duración de las Cookies
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Las cookies tienen diferentes duraciones dependiendo de su propósito:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 rounded-xl p-6">
                    <h4 className="font-semibold text-blue-900 mb-3">Cookies de Sesión</h4>
                    <p className="text-blue-800 text-sm">
                      Se eliminan automáticamente cuando cierras tu navegador. 
                      Se utilizan para funcionalidades temporales como el carrito de compras.
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-6">
                    <h4 className="font-semibold text-green-900 mb-3">Cookies Persistentes</h4>
                    <p className="text-green-800 text-sm">
                      Permanecen en tu dispositivo hasta que expiran o las elimines manualmente. 
                      Se utilizan para recordar preferencias y análisis a largo plazo.
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  <strong>Nota:</strong> La mayoría de nuestras cookies de análisis tienen una duración 
                  de 2 años, mientras que las cookies de funcionalidad pueden durar hasta 1 año.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">⚙️</span>
                Control de Cookies
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Tienes control total sobre las cookies que se almacenan en tu dispositivo. 
                  Puedes gestionarlas de las siguientes maneras:
                </p>
                
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Configuración del Navegador:</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies
                    </div>
                    <div>
                      <strong>Firefox:</strong> Opciones → Privacidad y Seguridad → Cookies
                    </div>
                    <div>
                      <strong>Safari:</strong> Preferencias → Privacidad → Cookies
                    </div>
                    <div>
                      <strong>Edge:</strong> Configuración → Cookies y permisos del sitio
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-xl p-6">
                  <h4 className="font-semibold text-blue-900 mb-3">Panel de Control de Cookies:</h4>
                  <p className="text-blue-800 text-sm">
                    Próximamente implementaremos un panel de control en nuestro sitio web 
                    que te permitirá gestionar fácilmente tus preferencias de cookies.
                  </p>
                </div>

                <p className="text-sm text-gray-600">
                  <strong>Importante:</strong> Deshabilitar ciertas cookies puede afectar 
                  la funcionalidad de nuestro sitio web y tu experiencia de usuario.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">📱</span>
                Cookies en Dispositivos Móviles
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Las cookies también se utilizan en dispositivos móviles cuando accedes 
                  a nuestro sitio web a través de navegadores móviles.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-6">
                  <li>Los navegadores móviles tienen configuraciones de cookies similares a los de escritorio</li>
                  <li>Algunas aplicaciones móviles pueden usar tecnologías similares a las cookies</li>
                  <li>Las configuraciones de privacidad del dispositivo pueden afectar el comportamiento de las cookies</li>
                  <li>Recomendamos revisar la configuración de privacidad de tu dispositivo móvil</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mr-3">🔒</span>
                Seguridad y Privacidad
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  La seguridad de tus datos es nuestra prioridad. Implementamos las siguientes 
                  medidas para proteger la información recopilada a través de cookies:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-6">
                  <li>Encriptación SSL/TLS para todas las comunicaciones</li>
                  <li>Cookies seguras (HTTPS) para información sensible</li>
                  <li>Acceso limitado a datos de cookies solo para personal autorizado</li>
                  <li>Auditorías regulares de seguridad y cumplimiento</li>
                  <li>Cumplimiento con regulaciones de privacidad aplicables</li>
                </ul>
                <p>
                  <strong>Compromiso:</strong> Nunca vendemos, alquilamos o compartimos 
                  información personal recopilada a través de cookies con terceros.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center mr-3">📝</span>
                Actualizaciones de esta Política
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Esta política de cookies puede actualizarse periódicamente para reflejar 
                  cambios en nuestras prácticas o por otras razones operativas, legales o regulatorias.
                </p>
                <p>
                  <strong>Notificaciones de cambios:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-6">
                  <li>Publicaremos cambios en esta página con una nueva fecha de actualización</li>
                  <li>Para cambios significativos, te notificaremos por email</li>
                  <li>Te recomendamos revisar esta política regularmente</li>
                  <li>El uso continuado del sitio web después de los cambios constituye aceptación</li>
                </ul>
              </div>
            </section>
          </div>

          {/* CTA */}
          <div className="text-center mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              ¿Tienes Preguntas sobre Cookies?
            </h3>
            <p className="text-gray-600 mb-6">
              Estamos aquí para ayudarte a entender cómo utilizamos las cookies y cómo gestionarlas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                📧 Contactar Privacidad
              </button>
              <Link 
                href="/privacidad"
                className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-2xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
              >
                🔒 Ver Política de Privacidad
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal de Contacto */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        contactType="privacidad"
      />

      <Footer />
    </div>
  );
}
