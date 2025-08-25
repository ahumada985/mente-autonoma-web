'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ServiciosDesarrolloWeb() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = {
    wordpress: [
      {
        id: 'wp-landing',
        name: 'Landing Page WordPress',
        price: '$100.000',
        originalPrice: '$150.000',
        description: 'Página de aterrizaje profesional para capturar leads',
        features: [
          'Diseño responsive y moderno',
          'Optimización SEO básica',
          'Formulario de contacto',
          'Integración con redes sociales',
          'Hosting gratuito por 1 año',
          'Dominio personalizado',
          'Certificado SSL',
          'Soporte técnico 30 días',
          'Panel de administración WordPress',
          'Capacitación básica del sistema'
        ],
        bestFor: 'Emprendedores que necesitan presencia online rápida',
        delivery: '7-10 días hábiles',
        color: 'from-green-500 to-emerald-600'
      },
      {
        id: 'wp-website',
        name: 'Sitio Web WordPress',
        price: '$170.000',
        originalPrice: '$250.000',
        description: 'Sitio web completo con múltiples páginas',
        features: [
          'Hasta 8 páginas personalizadas',
          'Blog integrado',
          'Galería de imágenes',
          'Formularios avanzados',
          'Integración con Google Analytics',
          'Optimización SEO completa',
          'Hosting gratuito por 1 año',
          'Dominio personalizado',
          'Certificado SSL',
          'Soporte técnico 60 días',
          'Capacitación completa del sistema',
          'Backup automático'
        ],
        bestFor: 'Negocios establecidos que quieren expandir su presencia online',
        delivery: '15-20 días hábiles',
        color: 'from-blue-500 to-indigo-600'
      },
      {
        id: 'wp-advanced',
        name: 'Sitio Web Avanzado WordPress',
        price: '$220.000',
        originalPrice: '$300.000',
        description: 'Sitio web empresarial con funcionalidades avanzadas',
        features: [
          'Hasta 15 páginas personalizadas',
          'Sistema de reservas/citas',
          'Tienda online básica (WooCommerce)',
          'Integración con CRM',
          'Newsletter automático',
          'Optimización SEO avanzada',
          'Hosting gratuito por 1 año',
          'Dominio personalizado',
          'Certificado SSL',
          'Soporte técnico 90 días',
          'Capacitación completa + manual',
          'Backup automático diario',
          'Monitoreo de rendimiento'
        ],
        bestFor: 'Empresas que necesitan funcionalidades complejas y escalabilidad',
        delivery: '25-30 días hábiles',
        color: 'from-purple-500 to-pink-600'
      }
    ],
    modern: [
      {
        id: 'modern-landing',
        name: 'Landing Page Moderna',
        price: '$180.000',
        originalPrice: '$250.000',
        description: 'Landing page con tecnologías de vanguardia',
        features: [
          'Desarrollo con Next.js 14',
          'Diseño con Tailwind CSS',
          'Componentes shadcn/ui',
          'Optimización SEO avanzada',
          'Rendimiento 95+ Lighthouse',
          'Hosting gratuito por 1 año',
          'Dominio personalizado',
          'Certificado SSL',
          'Soporte técnico 30 días',
          'Código fuente incluido'
        ],
        bestFor: 'Startups que buscan tecnología de punta',
        delivery: '10-15 días hábiles',
        color: 'from-cyan-500 to-blue-600'
      },
      {
        id: 'modern-landing-db',
        name: 'Landing Page + Base de Datos',
        price: '$250.000',
        originalPrice: '$350.000',
        description: 'Landing page con funcionalidades de base de datos',
        features: [
          'Desarrollo con Next.js 14',
          'Base de datos Supabase',
          'Autenticación de usuarios',
          'Formularios con validación',
          'Panel de administración',
          'Diseño con Tailwind CSS',
          'Componentes shadcn/ui',
          'Hosting gratuito por 1 año',
          'Dominio personalizado',
          'Certificado SSL',
          'Soporte técnico 45 días'
        ],
        bestFor: 'Negocios que necesitan capturar y gestionar datos',
        delivery: '15-20 días hábiles',
        color: 'from-teal-500 to-green-600'
      },
      {
        id: 'modern-webapp',
        name: 'Web App Moderna',
        price: '$500.000',
        originalPrice: '$700.000',
        description: 'Aplicación web completa sin base de datos',
        features: [
          'Desarrollo con Next.js 14',
          'Múltiples páginas y rutas',
          'Estado global con Zustand',
          'Componentes reutilizables',
          'Integración con APIs externas',
          'Diseño con Tailwind CSS',
          'Componentes shadcn/ui',
          'Hosting gratuito por 1 año',
          'Dominio personalizado',
          'Certificado SSL',
          'Soporte técnico 60 días'
        ],
        bestFor: 'Empresas que necesitan aplicaciones complejas',
        delivery: '25-30 días hábiles',
        color: 'from-orange-500 to-red-600'
      },
      {
        id: 'modern-webapp-db',
        name: 'Web App + Base de Datos',
        price: '$800.000',
        originalPrice: '$1.200.000',
        description: 'Aplicación web completa con base de datos',
        features: [
          'Desarrollo con Next.js 14',
          'Base de datos Supabase',
          'Autenticación JWT',
          'Panel de administración completo',
          'API REST/GraphQL',
          'Integración con Webpay',
          'Sistema de notificaciones',
          'Diseño con Tailwind CSS',
          'Componentes shadcn/ui',
          'Hosting gratuito por 1 año',
          'Dominio personalizado',
          'Certificado SSL',
          'Soporte técnico 90 días'
        ],
        bestFor: 'Empresas que necesitan aplicaciones empresariales completas',
        delivery: '35-40 días hábiles',
        color: 'from-indigo-500 to-purple-600'
      },
      {
        id: 'modern-advanced',
        name: 'Web App Avanzada',
        price: '$1.400.000',
        originalPrice: '$2.000.000',
        description: 'Aplicación web empresarial avanzada',
        features: [
          'Desarrollo con Next.js 14',
          'Base de datos Supabase',
          'Autenticación multi-factor',
          'Sistema de roles y permisos',
          'API REST/GraphQL completa',
          'Integración con múltiples servicios',
          'Sistema de pagos Webpay',
          'Dashboard analítico',
          'Sistema de reportes',
          'Diseño con Tailwind CSS',
          'Componentes shadcn/ui',
          'Hosting gratuito por 1 año',
          'Dominio personalizado',
          'Certificado SSL',
          'Soporte técnico 120 días'
        ],
        bestFor: 'Empresas grandes que necesitan soluciones empresariales',
        delivery: '45-50 días hábiles',
        color: 'from-pink-500 to-rose-600'
      },
      {
        id: 'modern-advanced-db',
        name: 'Web App Avanzada + BD Compleja',
        price: '$2.000.000',
        originalPrice: '$3.000.000',
        description: 'Aplicación web empresarial con base de datos compleja',
        features: [
          'Desarrollo con Next.js 14',
          'Base de datos Supabase avanzada',
          'Autenticación multi-factor',
          'Sistema de roles y permisos granular',
          'API REST/GraphQL completa',
          'Integración con múltiples servicios',
          'Sistema de pagos Webpay',
          'Dashboard analítico avanzado',
          'Sistema de reportes personalizados',
          'Backup automático en tiempo real',
          'Monitoreo de rendimiento',
          'Diseño con Tailwind CSS',
          'Componentes shadcn/ui',
          'Hosting gratuito por 1 año',
          'Dominio personalizado',
          'Certificado SSL',
          'Soporte técnico 180 días'
        ],
        bestFor: 'Corporaciones que necesitan soluciones enterprise',
        delivery: '55-60 días hábiles',
        color: 'from-violet-500 to-purple-600'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-xl font-bold">MA</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Mente Autónoma</h1>
                <p className="text-sm text-gray-600">Servicios de Desarrollo Web</p>
              </div>
            </Link>
            <Link 
              href="/"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              ← Volver al Inicio
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-6">
              🚀 Precios de Lanzamiento - Oferta Limitada
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Desarrollo Web
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Profesional
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Transforma tu idea en una presencia digital impactante. Ofrecemos soluciones con WordPress 
              y tecnologías modernas para llevar tu negocio al siguiente nivel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center space-x-2 text-green-600 font-semibold">
                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                <span>Hosting Gratuito por 1 Año</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-600 font-semibold">
                <span className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></span>
                <span>Soporte Técnico Incluido</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-600 font-semibold">
                <span className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></span>
                <span>Garantía de Satisfacción</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* WordPress Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-medium mb-4">
              🌟 WordPress Profesional
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Soluciones WordPress para tu Negocio
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Desarrollamos sitios web profesionales con WordPress, la plataforma más popular del mundo. 
              Perfecto para negocios que quieren una solución confiable y fácil de gestionar.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.wordpress.map((plan) => (
              <div 
                key={plan.id}
                className={`relative bg-white rounded-3xl shadow-2xl border-2 border-transparent hover:border-gray-200 transition-all duration-500 transform hover:scale-105 cursor-pointer ${
                  selectedPlan === plan.id ? 'ring-4 ring-blue-500 ring-opacity-50' : ''
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {/* Badge de Oferta */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    ¡Oferta de Lanzamiento!
                  </div>
                </div>

                <div className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-4">{plan.description}</p>
                    
                    {/* Precios */}
                    <div className="mb-6">
                      <div className="text-4xl font-bold text-gray-900 mb-1">{plan.price}</div>
                      <div className="text-lg text-gray-500 line-through">{plan.originalPrice}</div>
                      <div className="text-sm text-green-600 font-semibold">
                        ¡Ahorras ${parseInt(plan.originalPrice.replace('$', '').replace('.', '')) - parseInt(plan.price.replace('$', '').replace('.', ''))}!
                      </div>
                    </div>

                    {/* Características */}
                    <div className="space-y-3 text-left">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-white text-xs">✓</span>
                          </div>
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Información adicional */}
                  <div className="border-t border-gray-200 pt-6 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Ideal para:</span>
                      <span className="text-gray-900 font-medium">{plan.bestFor}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Entrega:</span>
                      <span className="text-gray-900 font-medium">{plan.delivery}</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button className={`w-full mt-6 bg-gradient-to-r ${plan.color} text-white py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl`}>
                    🚀 Solicitar Cotización
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modern Stack Section */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4">
              ⚡ Tecnologías de Vanguardia
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Stack Tecnológico Moderno
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Desarrollamos con las tecnologías más avanzadas: Next.js, Supabase, Prisma, Tailwind CSS, 
              shadcn/ui y más. Para proyectos que requieren rendimiento, escalabilidad y experiencia de usuario excepcional.
            </p>
          </div>

          {/* Tech Stack Icons */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {[
              { name: 'Next.js', icon: '▲', color: 'from-gray-600 to-gray-800' },
              { name: 'Supabase', icon: '🗄️', color: 'from-green-500 to-emerald-600' },
              { name: 'Prisma', icon: '🔧', color: 'from-blue-500 to-indigo-600' },
              { name: 'Tailwind', icon: '🎨', color: 'from-cyan-500 to-blue-600' },
              { name: 'shadcn/ui', icon: '✨', color: 'from-purple-500 to-pink-600' },
              { name: 'Webpay', icon: '💳', color: 'from-orange-500 to-red-600' },
              { name: 'TypeScript', icon: '📘', color: 'from-blue-600 to-indigo-700' },
              { name: 'Cloudinary', icon: '☁️', color: 'from-orange-400 to-pink-500' },
              { name: 'GitHub', icon: '🐙', color: 'from-gray-700 to-gray-900' }
            ].map((tech) => (
              <div key={tech.name} className="text-center group">
                <div className={`w-16 h-16 bg-gradient-to-r ${tech.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 mb-2`}>
                  <span className="text-2xl text-white">{tech.icon}</span>
                </div>
                <span className="text-sm font-medium text-gray-700">{tech.name}</span>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.modern.map((plan) => (
              <div 
                key={plan.id}
                className={`relative bg-white rounded-3xl shadow-2xl border-2 border-transparent hover:border-gray-200 transition-all duration-500 transform hover:scale-105 cursor-pointer ${
                  selectedPlan === plan.id ? 'ring-4 ring-blue-500 ring-opacity-50' : ''
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {/* Badge de Oferta */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    ¡Oferta de Lanzamiento!
                  </div>
                </div>

                <div className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-4">{plan.description}</p>
                    
                    {/* Precios */}
                    <div className="mb-6">
                      <div className="text-4xl font-bold text-gray-900 mb-1">{plan.price}</div>
                      <div className="text-lg text-gray-500 line-through">{plan.originalPrice}</div>
                      <div className="text-sm text-green-600 font-semibold">
                        ¡Ahorras ${parseInt(plan.originalPrice.replace('$', '').replace('.', '')) - parseInt(plan.price.replace('$', '').replace('.', ''))}!
                      </div>
                    </div>

                    {/* Características */}
                    <div className="space-y-3 text-left">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-white text-xs">✓</span>
                          </div>
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Información adicional */}
                  <div className="border-t border-gray-200 pt-6 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Ideal para:</span>
                      <span className="text-gray-900 font-medium">{plan.bestFor}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Entrega:</span>
                      <span className="text-gray-900 font-medium">{plan.delivery}</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button className={`w-full mt-6 bg-gradient-to-r ${plan.color} text-white py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl`}>
                    🚀 Solicitar Cotización
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-900 via-purple-900 to-pink-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            ¿Listo para Transformar tu Negocio?
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Estos precios de lanzamiento son por tiempo limitado. No pierdas la oportunidad 
            de tener una presencia digital profesional que impulse tu negocio al siguiente nivel.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
              📞 Hablar con un Experto
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105">
              📧 Solicitar Presupuesto
            </button>
          </div>
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              ⏰ Oferta válida hasta el 31 de Marzo, 2025
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl font-bold">MA</span>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              © 2025 Mente Autónoma. Todos los derechos reservados.
            </p>
            <div className="flex justify-center space-x-6 text-sm">
              <Link href="/privacidad" className="text-gray-400 hover:text-white transition-colors">
                Privacidad
              </Link>
              <Link href="/terminos" className="text-gray-400 hover:text-white transition-colors">
                Términos
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal de Plan Seleccionado */}
      {selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  {plans.wordpress.find(p => p.id === selectedPlan)?.name || 
                   plans.modern.find(p => p.id === selectedPlan)?.name}
                </h3>
                <button 
                  onClick={() => setSelectedPlan(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    {plans.wordpress.find(p => p.id === selectedPlan)?.price || 
                     plans.modern.find(p => p.id === selectedPlan)?.price}
                  </div>
                  <div className="text-lg text-gray-500 line-through">
                    {plans.wordpress.find(p => p.id === selectedPlan)?.originalPrice || 
                     plans.modern.find(p => p.id === selectedPlan)?.originalPrice}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Características Incluidas:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {(plans.wordpress.find(p => p.id === selectedPlan)?.features || 
                      plans.modern.find(p => p.id === selectedPlan)?.features)?.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Entrega:</span>
                    <span className="text-gray-900 font-medium">
                      {plans.wordpress.find(p => p.id === selectedPlan)?.delivery || 
                       plans.modern.find(p => p.id === selectedPlan)?.delivery}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Ideal para:</span>
                    <span className="text-gray-900 font-medium">
                      {plans.wordpress.find(p => p.id === selectedPlan)?.bestFor || 
                       plans.modern.find(p => p.id === selectedPlan)?.bestFor}
                    </span>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                  🚀 Solicitar Cotización Ahora
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
