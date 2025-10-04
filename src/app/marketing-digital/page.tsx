'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function MarketingDigitalPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeMetric, setActiveMetric] = useState(0)

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % 6)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  const metrics = [
    { label: "ROI Campañas", value: "450%", icon: "📈", color: "text-pink-600" },
    { label: "Leads Calificados", value: "+280%", icon: "🎯", color: "text-blue-600" },
    { label: "Conversión", value: "15.8%", icon: "💰", color: "text-green-600" },
    { label: "Engagement", value: "+320%", icon: "❤️", color: "text-red-600" },
    { label: "Tráfico Web", value: "+500%", icon: "🚀", color: "text-purple-600" },
    { label: "Brand Awareness", value: "+180%", icon: "⭐", color: "text-orange-600" }
  ]

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      {/* Hero Section */}
      <section className={`pt-32 pb-20 bg-gradient-to-br from-pink-50 to-purple-100 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-pink-600 rounded-2xl mb-8 shadow-lg">
              <span className="text-3xl text-white">🚀</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
              Marketing Digital
            </h1>

            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Estrategias basadas en IA que convierten audiencias en clientes leales.
              Campañas inteligentes con ROI maximizado y crecimiento exponencial.
            </p>
          </div>

          {/* Real-time Metrics Dashboard */}
          <div className="bg-white rounded-3xl p-8 shadow-xl mb-16">
            <h3 className="text-2xl font-bold text-center mb-8 text-pink-600">
              Métricas en Tiempo Real
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {metrics.map((metric, index) => (
                <div
                  key={index}
                  className={`relative p-6 rounded-2xl text-center transition-all duration-500 ${
                    activeMetric === index
                      ? 'bg-gradient-to-br from-gray-50 to-gray-100 scale-110 shadow-lg border-2 border-pink-200'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className={`text-3xl mb-2 transition-all duration-300 ${
                    activeMetric === index ? 'scale-125' : 'scale-100'
                  }`}>
                    {metric.icon}
                  </div>
                  <div className={`text-2xl font-bold mb-1 ${metric.color}`}>
                    {metric.value}
                  </div>
                  <div className="text-sm text-gray-600">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
              <div className="text-3xl mb-3">📱</div>
              <div className="text-2xl font-bold text-blue-600 mb-1">150M+</div>
              <div className="text-gray-600 text-sm font-medium">Impresiones</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
              <div className="text-3xl mb-3">🎯</div>
              <div className="text-2xl font-bold text-green-600 mb-1">12.5%</div>
              <div className="text-gray-600 text-sm font-medium">Click Rate</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
              <div className="text-3xl mb-3">💰</div>
              <div className="text-2xl font-bold text-purple-600 mb-1">4.2x</div>
              <div className="text-gray-600 text-sm font-medium">ROAS</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
              <div className="text-3xl mb-3">⚡</div>
              <div className="text-2xl font-bold text-orange-600 mb-1">24h</div>
              <div className="text-gray-600 text-sm font-medium">Response</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Estrategias de Marketing Inteligente
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Campañas que convierten, optimizadas por inteligencia artificial
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Social Media IA */}
            <div className="group">
              <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl text-white">📱</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Social Media con IA</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Creación y gestión automatizada de contenido para todas las plataformas.
                  IA que adapta mensajes según audiencia y momento óptimo de publicación.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-pink-500 rounded-full mr-3"></div>
                    Contenido generado por IA
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-pink-500 rounded-full mr-3"></div>
                    Programación inteligente
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-pink-500 rounded-full mr-3"></div>
                    Análisis de engagement
                  </li>
                </ul>
              </div>
            </div>

            {/* Performance Marketing */}
            <div className="group">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl text-white">🎯</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Performance Marketing</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Campañas pagadas optimizadas con machine learning para máximo ROI.
                  Google Ads, Facebook Ads y LinkedIn Ads gestionados por algoritmos.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Optimización automática de pujas
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Segmentación avanzada
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    A/B testing continuo
                  </li>
                </ul>
              </div>
            </div>

            {/* Email Marketing */}
            <div className="group">
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl text-white">✉️</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Email Marketing Inteligente</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Secuencias automatizadas que nutren leads hasta la conversión.
                  Personalización masiva basada en comportamiento y preferencias.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Secuencias automatizadas
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Personalización dinámica
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Scoring predictivo
                  </li>
                </ul>
              </div>
            </div>

            {/* Content Marketing */}
            <div className="group">
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-orange-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl text-white">✍️</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Content Marketing</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Creación de contenido de valor que posiciona tu marca como líder.
                  Blogs, videos, podcasts y recursos que educan y convierten.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    Estrategia editorial IA
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    Contenido multimedia
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    SEO automatizado
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marketing Funnel */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Embudo de Conversión Inteligente
            </h2>
            <p className="text-xl text-gray-600">
              De visitante a cliente leal en pasos optimizados
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {[
                { stage: "Awareness", visitors: "10,000", color: "bg-pink-500", width: "w-full" },
                { stage: "Interest", visitors: "7,500", color: "bg-purple-500", width: "w-5/6" },
                { stage: "Consideration", visitors: "5,000", color: "bg-blue-500", width: "w-4/6" },
                { stage: "Purchase", visitors: "1,500", color: "bg-green-500", width: "w-2/6" },
                { stage: "Loyalty", visitors: "800", color: "bg-orange-500", width: "w-1/6" }
              ].map((funnel, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-32 text-right mr-6">
                    <div className="text-lg font-bold text-gray-900">{funnel.stage}</div>
                    <div className="text-sm text-gray-600">{funnel.visitors} usuarios</div>
                  </div>
                  <div className="flex-1">
                    <div className={`h-16 ${funnel.color} rounded-r-full ${funnel.width} flex items-center px-6 text-white font-bold text-lg shadow-lg`}>
                      <span className="ml-auto mr-6">{funnel.visitors}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Conversion Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="text-center bg-white rounded-2xl p-6 shadow-lg">
                <div className="text-3xl font-bold text-pink-600">8%</div>
                <div className="text-sm text-gray-600">Conversión Total</div>
              </div>
              <div className="text-center bg-white rounded-2xl p-6 shadow-lg">
                <div className="text-3xl font-bold text-blue-600">$125</div>
                <div className="text-sm text-gray-600">Costo por Lead</div>
              </div>
              <div className="text-center bg-white rounded-2xl p-6 shadow-lg">
                <div className="text-3xl font-bold text-green-600">4.2x</div>
                <div className="text-sm text-gray-600">ROI Promedio</div>
              </div>
              <div className="text-center bg-white rounded-2xl p-6 shadow-lg">
                <div className="text-3xl font-bold text-orange-600">28 días</div>
                <div className="text-sm text-gray-600">Ciclo de Venta</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marketing Channels */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Canales de Crecimiento
            </h2>
            <p className="text-xl text-gray-600">
              Plataformas optimizadas para máxima rentabilidad
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: "Google Ads", icon: "🔍", color: "bg-blue-600" },
              { name: "Facebook Ads", icon: "👥", color: "bg-blue-700" },
              { name: "LinkedIn Ads", icon: "💼", color: "bg-blue-800" },
              { name: "Instagram", icon: "📸", color: "bg-pink-600" },
              { name: "TikTok Ads", icon: "🎵", color: "bg-gray-900" },
              { name: "YouTube", icon: "🎬", color: "bg-red-600" }
            ].map((channel, index) => (
              <div
                key={index}
                className="group bg-gray-50 hover:bg-white rounded-2xl p-6 border hover:shadow-lg transition-all duration-500 text-center hover:-translate-y-1"
              >
                <div className={`w-16 h-16 ${channel.color} rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-2xl">{channel.icon}</span>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{channel.name}</h4>
                <div className={`w-full h-2 ${channel.color} rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Casos de Éxito
            </h2>
            <p className="text-xl text-gray-600">
              Resultados reales de nuestros clientes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                industry: "E-commerce",
                result: "+380% Ventas",
                description: "Tienda online que multiplicó sus ingresos con marketing automation",
                metrics: ["ROI: 520%", "CPA: -60%", "ROAS: 5.2x"],
                icon: "🛒"
              },
              {
                industry: "SaaS",
                result: "+250% Leads",
                description: "Startup tecnológica que escaló su adquisición de usuarios",
                metrics: ["CAC: -45%", "LTV: +180%", "MRR: +300%"],
                icon: "💻"
              },
              {
                industry: "Servicios",
                result: "+400% ROI",
                description: "Consultora que transformó su generación de prospectos",
                metrics: ["Leads: +280%", "Calidad: 90%", "Cierre: +150%"],
                icon: "🏢"
              }
            ].map((story, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="text-center mb-6">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {story.icon}
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">{story.industry}</h4>
                  <div className="text-3xl font-bold text-pink-600">
                    {story.result}
                  </div>
                </div>

                <p className="text-gray-600 text-center mb-6 leading-relaxed">
                  {story.description}
                </p>

                <div className="space-y-2">
                  {story.metrics.map((metric, idx) => (
                    <div key={idx} className="flex items-center justify-center">
                      <div className="w-2 h-2 bg-pink-500 rounded-full mr-3"></div>
                      <span className="text-gray-700 text-sm">{metric}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-pink-600 to-purple-700">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Acelera tu Crecimiento Digital
          </h2>
          <p className="text-xl text-pink-100 mb-8 leading-relaxed">
            Únete a empresas que han transformado sus resultados con marketing inteligente.
            Estrategias probadas, tecnología avanzada y resultados medibles.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              onClick={() => window.open('https://calendly.com/mente-autonoma', '_blank')}
              className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-black rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 shadow-xl"
            >
              Auditoría Gratuita
            </button>
            <button
              onClick={() => window.history.back()}
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white hover:text-pink-600 transition-all duration-300"
            >
              Ver Otros Servicios
            </button>
          </div>

          {/* Guarantee Badge */}
          <div className="inline-flex items-center bg-green-500/20 backdrop-blur-sm rounded-full px-6 py-3 border border-green-400/30">
            <span className="text-green-400 mr-2">✓</span>
            <span className="text-sm font-semibold text-green-300">Garantía de Resultados en 90 días</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}