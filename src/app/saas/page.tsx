'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function SaaSPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeUser, setActiveUser] = useState(0)
  const [revenue, setRevenue] = useState(0)

  useEffect(() => {
    setIsVisible(true)

    // Simulate user growth
    const userInterval = setInterval(() => {
      setActiveUser(prev => (prev + 1) % 1000)
    }, 50)

    // Simulate revenue growth
    const revenueInterval = setInterval(() => {
      setRevenue(prev => prev + Math.floor(Math.random() * 500) + 100)
    }, 1000)

    return () => {
      clearInterval(userInterval)
      clearInterval(revenueInterval)
    }
  }, [])

  const features = [
    { name: "Authentication", status: "✅", color: "text-green-600", progress: 100 },
    { name: "Payments", status: "✅", color: "text-green-600", progress: 100 },
    { name: "Dashboard", status: "✅", color: "text-green-600", progress: 100 },
    { name: "Analytics", status: "🔄", color: "text-yellow-600", progress: 75 },
    { name: "Mobile App", status: "⏳", color: "text-gray-500", progress: 25 }
  ]

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      {/* Hero Section */}
      <section className={`pt-32 pb-20 bg-gradient-to-br from-violet-50 to-purple-100 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-violet-600 rounded-2xl mb-8 shadow-lg">
              <span className="text-3xl text-white">🏗️</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
              Desarrollo SaaS
            </h1>

            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Construye la próxima unicorn tech con arquitectura escalable y moderna.
              MVP a mercado en 90 días con tecnologías de vanguardia.
            </p>
          </div>

          {/* Live SaaS Dashboard Simulation */}
          <div className="bg-white rounded-3xl p-8 shadow-xl mb-16">
            <h3 className="text-2xl font-bold text-center mb-8 text-violet-600">
              Dashboard SaaS en Tiempo Real
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Metrics Panel */}
              <div className="lg:col-span-2">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-2xl p-6 text-center hover:bg-gray-100 transition-colors duration-300">
                    <div className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent mb-1">
                      {activeUser.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Usuarios Activos</div>
                  </div>
                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 text-center hover:bg-gradient-to-br hover:from-yellow-100 hover:to-orange-100 transition-all duration-300">
                    <div className="text-3xl font-bold text-green-600 mb-1">
                      ${revenue.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">MRR</div>
                  </div>
                </div>

                {/* Feature Status */}
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Estado de Desarrollo</h4>
                  <div className="space-y-4">
                    {features.map((feature, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700 font-medium">{feature.name}</span>
                          <span className={`font-bold ${feature.color}`}>{feature.status}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${feature.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Growth Chart Simulation */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Métricas de Crecimiento</h4>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Usuarios</span>
                      <span className="text-green-600 font-semibold">+15.2%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full w-3/4"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Revenue</span>
                      <span className="text-green-600 font-semibold">+28.7%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-green-600 h-3 rounded-full w-4/5"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Retention</span>
                      <span className="text-green-600 font-semibold">92%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-blue-600 h-3 rounded-full w-11/12"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Churn Rate</span>
                      <span className="text-red-600 font-semibold">8%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-red-500 h-3 rounded-full w-1/12"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SaaS Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
              <div className="text-3xl mb-3">🚀</div>
              <div className="text-2xl font-bold text-violet-600 mb-1">90 días</div>
              <div className="text-gray-600 text-sm font-medium">MVP to Market</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
              <div className="text-3xl mb-3">⚡</div>
              <div className="text-2xl font-bold text-green-600 mb-1">99.9%</div>
              <div className="text-gray-600 text-sm font-medium">Uptime SLA</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
              <div className="text-3xl mb-3">🔒</div>
              <div className="text-2xl font-bold text-blue-600 mb-1">SOC2</div>
              <div className="text-gray-600 text-sm font-medium">Security</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
              <div className="text-3xl mb-3">📈</div>
              <div className="text-2xl font-bold text-orange-600 mb-1">∞</div>
              <div className="text-gray-600 text-sm font-medium">Escalabilidad</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Servicios de Desarrollo SaaS
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stack tecnológico completo para construir productos escalables
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Full-Stack Development */}
            <div className="group">
              <div className="bg-gradient-to-br from-violet-50 to-violet-100 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-violet-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl text-white">💻</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Full-Stack Development</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Stack tecnológico moderno: Next.js, TypeScript, Tailwind CSS, Prisma, PostgreSQL.
                  Arquitectura escalable desde el día uno.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-violet-500 rounded-full mr-3"></div>
                    React/Next.js 14+ con App Router
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-violet-500 rounded-full mr-3"></div>
                    TypeScript estricto
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-violet-500 rounded-full mr-3"></div>
                    Database design optimizado
                  </li>
                </ul>
              </div>
            </div>

            {/* Cloud Infrastructure */}
            <div className="group">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl text-white">☁️</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Cloud Infrastructure</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Deploy en AWS/Vercel con CDN global, auto-scaling y monitoreo 24/7.
                  Infrastructure as Code con Terraform.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Auto-scaling infrastructure
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Global CDN deployment
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Monitoring y alertas
                  </li>
                </ul>
              </div>
            </div>

            {/* Payment Integration */}
            <div className="group">
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl text-white">💳</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Payment & Billing</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Integración completa con Stripe: suscripciones, facturación automática,
                  manejo de impuestos globales y recuperación de pagos.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Suscripciones recurrentes
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Tax compliance global
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Dunning management
                  </li>
                </ul>
              </div>
            </div>

            {/* Analytics & Growth */}
            <div className="group">
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-orange-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl text-white">📊</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Analytics & Growth</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Dashboards ejecutivos con métricas SaaS clave: MRR, churn, LTV/CAC,
                  cohort analysis y growth tracking automatizado.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    SaaS metrics dashboard
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    Cohort & retention analysis
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    A/B testing framework
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Stack Tecnológico
            </h2>
            <p className="text-xl text-gray-600">
              Herramientas modernas para desarrollo rápido y escalable
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: "Next.js 14", icon: "⚛️", category: "Frontend", color: "bg-black" },
              { name: "TypeScript", icon: "📘", category: "Language", color: "bg-blue-600" },
              { name: "Tailwind CSS", icon: "🎨", category: "Styling", color: "bg-cyan-500" },
              { name: "Prisma ORM", icon: "🔺", category: "Database", color: "bg-indigo-600" },
              { name: "PostgreSQL", icon: "🐘", category: "Database", color: "bg-blue-700" },
              { name: "Vercel/AWS", icon: "☁️", category: "Deploy", color: "bg-gray-800" },
              { name: "Stripe", icon: "💳", category: "Payments", color: "bg-purple-600" },
              { name: "Auth0", icon: "🔐", category: "Auth", color: "bg-orange-600" },
              { name: "Redis", icon: "🔴", category: "Cache", color: "bg-red-600" },
              { name: "Docker", icon: "🐳", category: "DevOps", color: "bg-blue-500" },
              { name: "GitHub", icon: "📧", category: "Version Control", color: "bg-gray-700" },
              { name: "Sentry", icon: "🐛", category: "Monitoring", color: "bg-purple-700" }
            ].map((tech, index) => (
              <div
                key={index}
                className="group bg-white hover:bg-gray-100 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-500 text-center hover:-translate-y-1"
              >
                <div className={`w-16 h-16 ${tech.color} rounded-xl flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-2xl">{tech.icon}</span>
                </div>
                <h4 className="text-sm font-bold text-gray-900 mb-1">{tech.name}</h4>
                <div className="text-xs text-gray-500">{tech.category}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Proceso de Desarrollo
            </h2>
            <p className="text-xl text-gray-600">
              Metodología ágil para entregas rápidas y de calidad
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                phase: "Semana 1-2",
                title: "Discovery & Design",
                description: "Research, wireframes, tech architecture y MVP scope definition",
                icon: "🎯",
                color: "bg-blue-600"
              },
              {
                phase: "Semana 3-6",
                title: "Core Development",
                description: "Auth, database, API core, dashboard básico y payment integration",
                icon: "⚙️",
                color: "bg-violet-600"
              },
              {
                phase: "Semana 7-10",
                title: "Feature Development",
                description: "Features específicas del producto, analytics y optimizaciones UX",
                icon: "🚀",
                color: "bg-green-600"
              },
              {
                phase: "Semana 11-12",
                title: "Launch & Growth",
                description: "Testing, deployment, monitoring setup y growth optimization",
                icon: "📈",
                color: "bg-orange-600"
              }
            ].map((process, index) => (
              <div
                key={index}
                className="group bg-gray-50 hover:bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 text-center hover:-translate-y-1"
              >
                <div className={`w-16 h-16 ${process.color} rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-2xl text-white">{process.icon}</span>
                </div>
                <div className="text-violet-600 font-semibold text-sm mb-2">{process.phase}</div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">{process.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{process.description}</p>
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
              Startups que Hemos Lanzado
            </h2>
            <p className="text-xl text-gray-600">
              Productos que han alcanzado el éxito en el mercado
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "TaskFlow AI",
                description: "Automatización de workflows empresariales",
                metrics: ["$50k MRR", "2,500 usuarios", "Seed Round"],
                stack: "Next.js • PostgreSQL • OpenAI",
                color: "bg-blue-600",
                icon: "🤖"
              },
              {
                name: "DataViz Pro",
                description: "Analytics y visualización de datos",
                metrics: ["$120k MRR", "890 empresas", "Serie A"],
                stack: "React • ClickHouse • D3.js",
                color: "bg-green-600",
                icon: "📊"
              },
              {
                name: "VoiceBot Studio",
                description: "Creación de asistentes de voz IA",
                metrics: ["$80k MRR", "5,200 bots", "Acquired"],
                stack: "Next.js • Supabase • ElevenLabs",
                color: "bg-purple-600",
                icon: "🎤"
              }
            ].map((startup, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="text-center mb-6">
                  <div className={`w-16 h-16 ${startup.color} rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-2xl">{startup.icon}</span>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">{startup.name}</h4>
                  <p className="text-gray-600">{startup.description}</p>
                </div>

                <div className="space-y-3 mb-6">
                  {startup.metrics.map((metric, idx) => (
                    <div key={idx} className="flex items-center justify-center">
                      <div className="text-xl font-bold text-violet-600">{metric}</div>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <div className="text-sm text-gray-500 bg-gray-50 rounded-full px-4 py-2">
                    {startup.stack}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing & Investment */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            Inversión & Retorno
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-violet-50 to-violet-100 rounded-2xl p-8 shadow-lg">
              <div className="text-4xl mb-4">💰</div>
              <div className="text-3xl font-bold text-violet-600 mb-2">$35,000</div>
              <div className="text-gray-600 mb-2">Inversión Total MVP</div>
              <div className="text-sm text-gray-500">90 días desarrollo completo</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 shadow-lg">
              <div className="text-4xl mb-4">📈</div>
              <div className="text-3xl font-bold text-green-600 mb-2">6-12 meses</div>
              <div className="text-gray-600 mb-2">Break-even Promedio</div>
              <div className="text-sm text-gray-500">Con traction validation</div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 shadow-lg">
              <div className="text-4xl mb-4">🚀</div>
              <div className="text-3xl font-bold text-orange-600 mb-2">10x-50x</div>
              <div className="text-gray-600 mb-2">ROI Potencial</div>
              <div className="text-sm text-gray-500">SaaS exitoso a 3 años</div>
            </div>
          </div>

          <div className="inline-flex items-center bg-green-500/10 rounded-full px-6 py-3 border border-green-400/30">
            <span className="text-green-600 mr-2">✓</span>
            <span className="text-sm font-semibold text-green-700">Garantía: Si no validamos traction en 6 meses, reembolsamos 50%</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-violet-600 to-purple-700">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            ¿Listo para Construir la Próxima Unicorn?
          </h2>
          <p className="text-xl text-violet-100 mb-8 leading-relaxed">
            De idea a MVP funcional en 90 días. Stack moderno, arquitectura escalable,
            y todos los sistemas que necesitas para crecer exponencialmente.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              onClick={() => window.open('https://calendly.com/mente-autonoma', '_blank')}
              className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-black rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 shadow-xl"
            >
              Validar Idea SaaS
            </button>
            <button
              onClick={() => window.history.back()}
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white hover:text-violet-600 transition-all duration-300"
            >
              Ver Otros Servicios
            </button>
          </div>

          {/* Feature List */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center justify-center text-violet-100">
              <span className="text-violet-300 mr-2">✓</span>
              Full-stack development
            </div>
            <div className="flex items-center justify-center text-violet-100">
              <span className="text-violet-300 mr-2">✓</span>
              Cloud infrastructure
            </div>
            <div className="flex items-center justify-center text-violet-100">
              <span className="text-violet-300 mr-2">✓</span>
              Payment integration
            </div>
            <div className="flex items-center justify-center text-violet-100">
              <span className="text-violet-300 mr-2">✓</span>
              Growth analytics
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}