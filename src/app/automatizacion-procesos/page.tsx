'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function AutomatizacionProcesosPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeProcess, setActiveProcess] = useState(0)

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setActiveProcess((prev) => (prev + 1) % 4)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const processes = [
    { name: "Procesamiento de Documentos", icon: "📄", time: "2 min", description: "Extracción automática de datos" },
    { name: "Análisis de Datos", icon: "📊", time: "5 min", description: "Insights instantáneos" },
    { name: "Generación de Reportes", icon: "📋", time: "1 min", description: "Reportes ejecutivos" },
    { name: "Envío Automático", icon: "📤", time: "30 seg", description: "Distribución inteligente" }
  ]

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      {/* Hero Section */}
      <section className={`pt-32 pb-20 bg-gradient-to-br from-green-50 to-emerald-100 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600 rounded-2xl mb-8 shadow-lg">
              <span className="text-3xl text-white">⚙️</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
              Automatización de Procesos
            </h1>

            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Elimina tareas repetitivas y maximiza la eficiencia operacional.
              Sistemas inteligentes que trabajan 24/7 sin errores humanos.
            </p>
          </div>

          {/* Process Visualization */}
          <div className="bg-white rounded-3xl p-8 shadow-xl mb-16">
            <h3 className="text-2xl font-bold text-center mb-8 text-green-600">
              Proceso Automatizado en Tiempo Real
            </h3>

            <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0 lg:space-x-4">
              {processes.map((process, index) => (
                <div key={index} className="flex flex-col items-center relative w-full lg:w-1/4">
                  {/* Process Node */}
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl transition-all duration-500 mb-4 ${
                    activeProcess === index
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white scale-110 shadow-lg'
                      : activeProcess > index
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-400 border-2 border-gray-300'
                  }`}>
                    {process.icon}
                  </div>

                  {/* Process Info */}
                  <div className="text-center">
                    <div className="font-bold text-gray-900 mb-1">{process.name}</div>
                    <div className="text-sm text-gray-600 mb-2">{process.description}</div>
                    <div className={`text-xs px-3 py-1 rounded-full inline-block ${
                      activeProcess === index
                        ? 'bg-green-600 text-white'
                        : activeProcess > index
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {process.time}
                    </div>
                  </div>

                  {/* Connection Arrow */}
                  {index < processes.length - 1 && (
                    <div className="hidden lg:block absolute top-10 -right-8 text-gray-400">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
              <div className="text-3xl mb-3">⚡</div>
              <div className="text-2xl font-bold text-yellow-600 mb-1">10x</div>
              <div className="text-gray-600 text-sm font-medium">Velocidad</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
              <div className="text-3xl mb-3">💰</div>
              <div className="text-2xl font-bold text-green-600 mb-1">60%</div>
              <div className="text-gray-600 text-sm font-medium">Reducción Costos</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
              <div className="text-3xl mb-3">🎯</div>
              <div className="text-2xl font-bold text-blue-600 mb-1">99.9%</div>
              <div className="text-gray-600 text-sm font-medium">Precisión</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
              <div className="text-3xl mb-3">⏰</div>
              <div className="text-2xl font-bold text-purple-600 mb-1">24/7</div>
              <div className="text-gray-600 text-sm font-medium">Operación</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Soluciones de Automatización
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tecnologías que transforman operaciones manuales en procesos inteligentes
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* RPA */}
            <div className="group">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl text-white">🤖</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">RPA Inteligente</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Robots de software que ejecutan tareas repetitivas con precisión perfecta.
                  Desde entrada de datos hasta procesos complejos de negocio.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Procesamiento de facturas automático
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Gestión inteligente de inventarios
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Reportes automatizados
                  </li>
                </ul>
              </div>
            </div>

            {/* AI Workflows */}
            <div className="group">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl text-white">🧠</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Flujos de Trabajo Inteligentes</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  IA que toma decisiones complejas y adapta procesos según contexto.
                  Aprendizaje continuo para optimización automática.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    Clasificación inteligente de documentos
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    Predicción y detección de anomalías
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    Optimización dinámica de recursos
                  </li>
                </ul>
              </div>
            </div>

            {/* Integration */}
            <div className="group">
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl text-white">🔗</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Plataforma de Integración</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Conecta todos tus sistemas en un ecosistema unificado.
                  APIs, bases de datos, servicios cloud y aplicaciones legacy.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Conectores pre-construidos
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    APIs unificadas y seguras
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Monitoreo en tiempo real
                  </li>
                </ul>
              </div>
            </div>

            {/* Analytics */}
            <div className="group">
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-orange-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl text-white">📈</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Analytics y Monitoreo</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Visibilidad completa del rendimiento de procesos automatizados.
                  Métricas en tiempo real y alertas proactivas.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    Dashboards ejecutivos interactivos
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    Alertas inteligentes predictivas
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    Reportes detallados y customizables
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Soluciones por Industria
            </h2>
            <p className="text-xl text-gray-600">
              Automatización especializada para cada sector
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Finanzas",
                icon: "🏦",
                description: "Procesamiento de créditos, reconciliación contable, reportes regulatorios",
                processes: ["KYC Automatizado", "Detección de Fraude", "Reportes IFRS"],
                color: "bg-blue-600"
              },
              {
                title: "Salud",
                icon: "🏥",
                description: "Gestión de citas, procesamiento de seguros, expedientes digitales",
                processes: ["Agendamiento IA", "Facturación Médica", "Historial Digital"],
                color: "bg-green-600"
              },
              {
                title: "Manufactura",
                icon: "🏭",
                description: "Control de calidad, planificación producción, gestión inventarios",
                processes: ["QC Automático", "Predicción Demanda", "Supply Chain"],
                color: "bg-purple-600"
              },
              {
                title: "Retail",
                icon: "🛒",
                description: "Gestión de precios, reabastecimiento, análisis de clientes",
                processes: ["Pricing Dinámico", "Inventory Planning", "Customer Journey"],
                color: "bg-orange-600"
              },
              {
                title: "Servicios",
                icon: "⚡",
                description: "Gestión de tickets, facturación, reportes de SLA",
                processes: ["Ticket Routing", "Billing Automation", "SLA Monitoring"],
                color: "bg-red-600"
              },
              {
                title: "Educación",
                icon: "🎓",
                description: "Inscripciones, calificaciones, certificaciones automáticas",
                processes: ["Enrollment", "Grading System", "Certificates"],
                color: "bg-indigo-600"
              }
            ].map((industry, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
              >
                <div className={`w-16 h-16 ${industry.color} rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-2xl">{industry.icon}</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3 text-center">{industry.title}</h4>
                <p className="text-gray-600 mb-4 text-center text-sm leading-relaxed">{industry.description}</p>

                <div className="space-y-2">
                  {industry.processes.map((process, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      <span>{process}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            Retorno de Inversión Garantizado
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8">
              <div className="text-4xl mb-4">💰</div>
              <div className="text-3xl font-bold text-green-600 mb-2">$50,000</div>
              <div className="text-gray-600">Ahorro Anual Promedio</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
              <div className="text-4xl mb-4">📈</div>
              <div className="text-3xl font-bold text-blue-600 mb-2">300%</div>
              <div className="text-gray-600">ROI en 12 meses</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8">
              <div className="text-4xl mb-4">⏱️</div>
              <div className="text-3xl font-bold text-purple-600 mb-2">2,000hrs</div>
              <div className="text-gray-600">Horas Liberadas/Mes</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-emerald-700">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Automatiza tu Operación Hoy
          </h2>
          <p className="text-xl text-green-100 mb-8 leading-relaxed">
            Elimina tareas repetitivas y libera a tu equipo para trabajos de alto valor.
            Implementación rápida con ROI garantizado.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.open('https://calendly.com/mente-autonoma', '_blank')}
              className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-black rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 shadow-xl"
            >
              Consulta Gratuita
            </button>
            <button
              onClick={() => window.history.back()}
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white hover:text-green-600 transition-all duration-300"
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