'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function OptimizacionSEOPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentRank, setCurrentRank] = useState(87)
  const [targetRank, setTargetRank] = useState(3)

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentRank(prev => {
        if (prev > targetRank) {
          return Math.max(prev - 2, targetRank)
        }
        return prev
      })
    }, 200)

    return () => clearInterval(interval)
  }, [targetRank])

  const seoMetrics = [
    { label: "Tráfico Orgánico", value: "+420%", icon: "📈", color: "text-green-600" },
    { label: "Posición Promedio", value: "Posición 3", icon: "🏆", color: "text-yellow-600" },
    { label: "Keywords Top 10", value: "+180", icon: "🔑", color: "text-blue-600" },
    { label: "Domain Authority", value: "75/100", icon: "⚡", color: "text-purple-600" }
  ]

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      {/* Hero Section */}
      <section className={`pt-32 pb-20 bg-gradient-to-br from-blue-50 to-indigo-100 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-2xl mb-8 shadow-lg">
              <span className="text-3xl text-white">🚀</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
              Optimización SEO
            </h1>

            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Domina los primeros resultados de Google con estrategias SEO impulsadas por IA.
              Tráfico orgánico que convierte y crece exponencialmente.
            </p>
          </div>

          {/* Live Ranking Simulation */}
          <div className="bg-white rounded-3xl p-8 shadow-xl mb-16">
            <h3 className="text-2xl font-bold text-center mb-8 text-blue-600">
              Simulación de Ranking en Tiempo Real
            </h3>

            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mr-3"></div>
                  <span className="text-lg font-semibold">Google Search Results</span>
                </div>
                <div className="text-sm text-gray-500">Cerca de 847,000,000 resultados</div>
              </div>

              {/* Search Result Item */}
              <div className={`bg-white rounded-lg p-6 border-l-4 transition-all duration-500 shadow-sm ${
                currentRank <= 3
                  ? 'border-green-500 bg-green-50'
                  : currentRank <= 10
                  ? 'border-yellow-500 bg-yellow-50'
                  : 'border-red-500 bg-red-50'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-bold text-gray-900">Tu Empresa - Servicios Profesionales</h4>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                    currentRank <= 3
                      ? 'bg-green-500 text-white'
                      : currentRank <= 10
                      ? 'bg-yellow-500 text-white'
                      : 'bg-red-500 text-white'
                  }`}>
                    Posición #{currentRank}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-2">
                  Descripción optimizada para SEO que atrae clicks y convierte visitantes en clientes...
                </p>
                <div className="text-blue-600 text-sm">https://tuempresa.com</div>
              </div>

              {/* Progress Indicator */}
              <div className="mt-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progreso de Optimización</span>
                  <span>{Math.round((87 - currentRank) / 84 * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${Math.max((87 - currentRank) / 84 * 100, 5)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* SEO Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {seoMetrics.map((metric, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-3xl mb-3">{metric.icon}</div>
                <div className={`text-2xl font-bold mb-1 ${metric.color}`}>
                  {metric.value}
                </div>
                <div className="text-gray-600 text-sm font-medium">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Estrategias SEO Avanzadas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Técnicas probadas que posicionan tu sitio en los primeros resultados
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* SEO Técnico */}
            <div className="group">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl text-white">⚙️</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">SEO Técnico</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Optimización profunda de la arquitectura web para motores de búsqueda.
                  Velocidad, estructura y indexabilidad perfectas.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Auditoría técnica completa
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Optimización Core Web Vitals
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Schema markup avanzado
                  </li>
                </ul>
              </div>
            </div>

            {/* Keyword Research */}
            <div className="group">
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl text-white">🔍</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Research con IA</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Identificación inteligente de oportunidades de keywords de alto valor.
                  Análisis de competencia y gaps de contenido con machine learning.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Análisis de intent de búsqueda
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Clustering semántico
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Predicción de tendencias
                  </li>
                </ul>
              </div>
            </div>

            {/* Content Optimization */}
            <div className="group">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl text-white">✍️</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Optimización de Contenido</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Contenido que rankea y convierte. Estrategias de E-A-T y topical authority
                  para dominar nichos específicos con autoridad.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    Content clusters temáticos
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    Optimización on-page IA
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    Featured snippets targeting
                  </li>
                </ul>
              </div>
            </div>

            {/* Link Building */}
            <div className="group">
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-orange-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl text-white">🔗</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Link Building Estratégico</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Construcción de autoridad con enlaces de alta calidad y relevancia.
                  Estrategias white-hat para crecimiento sostenible.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    Prospección automatizada
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    Digital PR campaigns
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    Broken link building
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Process */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Proceso de Optimización
            </h2>
            <p className="text-xl text-gray-600">
              Metodología probada para resultados consistentes
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  phase: "Mes 1-2",
                  title: "Auditoría y Fundación",
                  description: "Análisis técnico completo, research de keywords y estrategia inicial",
                  tasks: ["Auditoría técnica", "Keyword research", "Análisis competencia", "Estrategia inicial"],
                  color: "bg-blue-600"
                },
                {
                  phase: "Mes 3-4",
                  title: "Optimización On-Page",
                  description: "Implementación técnica y optimización de contenido existente",
                  tasks: ["Fixes técnicos", "Optimización contenido", "Schema markup", "Internal linking"],
                  color: "bg-green-600"
                },
                {
                  phase: "Mes 5-6",
                  title: "Autoridad y Contenido",
                  description: "Link building estratégico y creación de contenido de alto valor",
                  tasks: ["Link building", "Content creation", "Digital PR", "Local SEO"],
                  color: "bg-purple-600"
                },
                {
                  phase: "Mes 7+",
                  title: "Crecimiento y Scaling",
                  description: "Expansión de keywords, optimización continua y maximización de resultados",
                  tasks: ["Scaling keywords", "Advanced tactics", "Automation", "ROI optimization"],
                  color: "bg-orange-600"
                }
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-start">
                    <div className={`w-16 h-16 ${item.color} rounded-xl flex items-center justify-center text-white font-bold text-lg mr-6 flex-shrink-0`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-2xl font-bold text-gray-900">{item.title}</h4>
                        <span className="text-blue-600 font-semibold bg-blue-100 px-3 py-1 rounded-full text-sm">
                          {item.phase}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{item.description}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {item.tasks.map((task, taskIndex) => (
                          <div key={taskIndex} className="flex items-center text-sm text-gray-700">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                            {task}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Herramientas y Tecnologías
            </h2>
            <p className="text-xl text-gray-600">
              Stack completo para análisis y optimización SEO
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: "Google Analytics", icon: "📊", color: "bg-orange-600" },
              { name: "Search Console", icon: "🔍", color: "bg-blue-600" },
              { name: "Screaming Frog", icon: "🕷️", color: "bg-green-600" },
              { name: "SEMrush", icon: "📈", color: "bg-purple-600" },
              { name: "Ahrefs", icon: "🔗", color: "bg-blue-700" },
              { name: "PageSpeed", icon: "⚡", color: "bg-yellow-600" }
            ].map((tool, index) => (
              <div
                key={index}
                className="group bg-gray-50 hover:bg-white rounded-2xl p-6 border hover:shadow-lg transition-all duration-500 text-center hover:-translate-y-1"
              >
                <div className={`w-16 h-16 ${tool.color} rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-2xl">{tool.icon}</span>
                </div>
                <h4 className="text-sm font-bold text-gray-900 mb-2">{tool.name}</h4>
                <div className={`w-full h-2 ${tool.color} rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Guarantee */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            Garantías de Resultados
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-4xl mb-4">📈</div>
              <div className="text-3xl font-bold text-blue-600 mb-2">+200%</div>
              <div className="text-gray-600 mb-2">Tráfico Orgánico</div>
              <div className="text-sm text-gray-500">En 6 meses o reembolso</div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-4xl mb-4">🏆</div>
              <div className="text-3xl font-bold text-green-600 mb-2">Top 10</div>
              <div className="text-gray-600 mb-2">Keywords Principales</div>
              <div className="text-sm text-gray-500">90% de keywords objetivo</div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-4xl mb-4">💰</div>
              <div className="text-3xl font-bold text-purple-600 mb-2">5x ROI</div>
              <div className="text-gray-600 mb-2">Retorno Garantizado</div>
              <div className="text-sm text-gray-500">Basado en tráfico valuado</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Domina Google en tu Industria
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Estrategias SEO probadas que generan tráfico de alta calidad y conversiones reales.
            Resultados medibles desde el primer mes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              onClick={() => window.open('https://calendly.com/mente-autonoma', '_blank')}
              className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-black rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 shadow-xl"
            >
              Auditoría SEO Gratuita
            </button>
            <button
              onClick={() => window.history.back()}
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              Ver Otros Servicios
            </button>
          </div>

          {/* SEO Guarantee Badge */}
          <div className="inline-flex items-center bg-green-500/20 backdrop-blur-sm rounded-full px-6 py-3 border border-green-400/30">
            <span className="text-green-400 mr-2">✓</span>
            <span className="text-sm font-semibold text-green-300">Primeras posiciones en 6 meses o dinero de vuelta</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}