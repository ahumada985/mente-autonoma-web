'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function HumanosDigitalesPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      {/* Hero Section */}
      <section className={`pt-32 pb-20 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-8 shadow-xl">
              <span className="text-3xl text-white">🤖</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
              Humanos Digitales
            </h1>

            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Conoce a nuestros dos humanos digitales disponibles: <strong>Sofia</strong> y <strong>Memo</strong>.
              Cada uno especializado en potenciar diferentes aspectos de tu negocio.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow duration-300 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="text-4xl mb-4">⚡</div>
              <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-600 font-medium">Disponibilidad Total</div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl mb-4">🎯</div>
              <div className="text-3xl font-bold text-green-600 mb-2">2</div>
              <div className="text-gray-600 font-medium">Humanos Especializados</div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl mb-4">💼</div>
              <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
              <div className="text-gray-600 font-medium">Productividad Mejorada</div>
            </div>
          </div>
        </div>
      </section>

      {/* Sofia Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Sofia Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-3">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl text-white">👩‍💼</span>
                </div>
                <div>
                  <h2 className="text-4xl font-bold text-gray-900">Sofia</h2>
                  <p className="text-lg text-purple-600 font-semibold">Chatbot Inteligente</p>
                </div>
              </div>

              <p className="text-xl text-gray-600 leading-relaxed">
                Sofia es tu asistente conversacional especializada en atención al cliente y soporte empresarial.
                Diseñada para proporcionar respuestas inteligentes y naturales a través de múltiples plataformas.
              </p>

              {/* Sofia Features */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">Capacidades de Sofia:</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Atención al Cliente</h4>
                      <p className="text-sm text-gray-600">Resolución de consultas 24/7</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Soporte Técnico</h4>
                      <p className="text-sm text-gray-600">Guías paso a paso</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Información de Productos</h4>
                      <p className="text-sm text-gray-600">Catálogo completo integrado</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Generación de Leads</h4>
                      <p className="text-sm text-gray-600">Calificación automática</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sofia Platforms */}
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 border border-pink-200">
                <h4 className="text-lg font-bold text-gray-900 mb-4">🚀 Plataformas de Instalación:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-bold">WEB</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Sitio Web</p>
                      <p className="text-sm text-gray-600">Widget integrable</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-lg">📱</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">WhatsApp</p>
                      <p className="text-sm text-gray-600">API Business</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sofia Visual */}
            <div className="relative">
              <div className="bg-gradient-to-br from-pink-100 via-purple-100 to-pink-200 rounded-3xl p-8 shadow-xl">
                <div className="text-center space-y-6">
                  <div className="w-32 h-32 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mx-auto flex items-center justify-center shadow-lg">
                    <span className="text-5xl text-white">👩‍💼</span>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-gray-900">Sofia está lista</h3>
                    <p className="text-gray-600">Conversaciones inteligentes que convierten</p>
                  </div>

                  {/* Mock Chat */}
                  <div className="bg-white rounded-2xl p-6 shadow-inner">
                    <div className="space-y-4">
                      <div className="bg-gray-100 rounded-lg p-3 text-left">
                        <p className="text-sm text-gray-700">¡Hola! Soy Sofia 👋</p>
                      </div>
                      <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg p-3 text-right ml-8">
                        <p className="text-sm">¿Cómo puedo ayudarte hoy?</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Memo Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Memo Visual */}
            <div className="relative lg:order-1">
              <div className="bg-gradient-to-br from-green-100 via-teal-100 to-blue-200 rounded-3xl p-8 shadow-xl">
                <div className="text-center space-y-6">
                  <div className="w-32 h-32 bg-gradient-to-r from-green-500 to-teal-600 rounded-full mx-auto flex items-center justify-center shadow-lg">
                    <span className="text-5xl text-white">🗂️</span>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-gray-900">Memo está listo</h3>
                    <p className="text-gray-600">Tu asistente personal inteligente</p>
                  </div>

                  {/* Mock Features */}
                  <div className="bg-white rounded-2xl p-6 shadow-inner">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                          <span className="text-white text-xs">📝</span>
                        </div>
                        <p className="text-sm text-gray-700">Lista de supermercado creada</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                          <span className="text-white text-xs">📅</span>
                        </div>
                        <p className="text-sm text-gray-700">Evento programado para mañana</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                          <span className="text-white text-xs">⏰</span>
                        </div>
                        <p className="text-sm text-gray-700">Recordatorio configurado</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Memo Content */}
            <div className="space-y-8 lg:order-2">
              <div className="inline-flex items-center space-x-3">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl text-white">🗂️</span>
                </div>
                <div>
                  <h2 className="text-4xl font-bold text-gray-900">Memo</h2>
                  <p className="text-lg text-teal-600 font-semibold">Asistente Personal</p>
                </div>
              </div>

              <p className="text-xl text-gray-600 leading-relaxed">
                Memo es tu asistente personal inteligente que te ayuda a organizar tu vida diaria.
                Desde recordatorios hasta gestión de calendario, Memo está disponible via WhatsApp.
              </p>

              {/* Memo Features */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">Capacidades de Memo:</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Crear Recordatorios</h4>
                      <p className="text-sm text-gray-600">Notificaciones inteligentes</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Listas Inteligentes</h4>
                      <p className="text-sm text-gray-600">Supermercado, tareas, ideas</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Google Calendar</h4>
                      <p className="text-sm text-gray-600">Crear, editar, eliminar eventos</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Búsqueda Inteligente</h4>
                      <p className="text-sm text-gray-600">Encuentra información rápido</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Memo Platform */}
              <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-6 border border-green-200">
                <h4 className="text-lg font-bold text-gray-900 mb-4">🚀 Plataforma de Instalación:</h4>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">📱</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">WhatsApp</p>
                    <p className="text-sm text-gray-600">Integración completa con Google Calendar</p>
                  </div>
                </div>
              </div>

              {/* Memo Detailed Features */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <h4 className="text-lg font-bold text-gray-900 mb-4">📋 Funcionalidades Detalladas:</h4>
                <div className="space-y-4">
                  <div className="border-l-4 border-green-500 pl-4">
                    <h5 className="font-semibold text-gray-900">Gestión de Listas</h5>
                    <p className="text-sm text-gray-600">Crea, edita y comparte listas de supermercado, tareas pendientes, ideas de proyectos, y más.</p>
                  </div>

                  <div className="border-l-4 border-teal-500 pl-4">
                    <h5 className="font-semibold text-gray-900">Calendario Inteligente</h5>
                    <p className="text-sm text-gray-600">Conexión directa con Google Calendar para programar, modificar y eliminar eventos desde WhatsApp.</p>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h5 className="font-semibold text-gray-900">Recordatorios Personalizados</h5>
                    <p className="text-sm text-gray-600">Configuración de alertas con fecha y hora específica, recordatorios recurrentes y notificaciones inteligentes.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              ¿Cuál Necesitas?
            </h2>
            <p className="text-xl text-gray-600">
              Ambos humanos digitales pueden trabajar juntos o por separado
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Sofia Card */}
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-8 border-2 border-pink-200 hover:border-purple-300 transition-all duration-300 hover:shadow-xl">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl text-white">👩‍💼</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Sofia</h3>
                <p className="text-purple-600 font-semibold">Ideal para empresas</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <span className="text-gray-700">Atención al cliente 24/7</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-700">Soporte técnico avanzado</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <span className="text-gray-700">Generación de leads</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-700">Integración web y WhatsApp</span>
                </li>
              </ul>

              <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-xl font-bold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
                Elegir Sofia
              </button>
            </div>

            {/* Memo Card */}
            <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-3xl p-8 border-2 border-green-200 hover:border-teal-300 transition-all duration-300 hover:shadow-xl">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl text-white">🗂️</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Memo</h3>
                <p className="text-teal-600 font-semibold">Ideal para personas</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Organización personal</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  <span className="text-gray-700">Gestión de calendario</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Listas inteligentes</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  <span className="text-gray-700">Solo WhatsApp</span>
                </li>
              </ul>

              <button className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white py-3 rounded-xl font-bold hover:from-green-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105">
                Elegir Memo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-teal-600">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Comienza con tu Humano Digital Hoy
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Elige Sofia para potenciar tu negocio o Memo para organizar tu vida personal.
            También puedes tener ambos trabajando en perfecta armonía.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.open('https://calendly.com/mente-autonoma', '_blank')}
              className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-black rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 shadow-xl"
            >
              Agendar Demo Gratuita
            </button>
            <button
              onClick={() => window.history.back()}
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              Ver Otros Servicios
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}