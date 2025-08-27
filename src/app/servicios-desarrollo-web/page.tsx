'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QuoteForm from '@/components/QuoteForm';
import Image from 'next/image';

export default function ServiciosDesarrolloWeb() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showQuoteForm, setShowQuoteForm] = useState(false);

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
          'Certificado SSL (Incluido)',
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
          'Certificado SSL (Incluido)',
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
          'Certificado SSL (Incluido)',
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
          'Certificado SSL (Incluido)',
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
          'Certificado SSL (Incluido)',
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
          'Certificado SSL (Incluido)',
          'Soporte técnico 60 días'
        ],
        bestFor: 'Empresas que necesitan aplicaciones complejas',
        delivery: '25-30 días hábiles',
        color: 'from-orange-500 to-red-600'
      },
      {
        id: 'modern-webapp-db',
        name: 'Web App + Base de Datos',
        price: '💬 Consulta Personalizada',
        originalPrice: null,
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
          'Certificado SSL (Incluido)',
          'Soporte técnico 90 días'
        ],
        bestFor: 'Empresas que necesitan aplicaciones empresariales completas',
        delivery: '35-40 días hábiles',
        color: 'from-indigo-500 to-purple-600'
      },
      {
        id: 'modern-advanced',
        name: 'Web App Avanzada',
        price: '💬 Consulta Personalizada',
        originalPrice: null,
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
          'Certificado SSL (Incluido)',
          'Soporte técnico 120 días'
        ],
        bestFor: 'Empresas grandes que necesitan soluciones empresariales',
        delivery: '45-50 días hábiles',
        color: 'from-pink-500 to-rose-600'
      },
      {
        id: 'modern-advanced-db',
        name: 'Web App Avanzada + BD Compleja',
        price: '💬 Consulta Personalizada',
        originalPrice: null,
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
          'Certificado SSL (Incluido)',
          'Soporte técnico 180 días'
        ],
        bestFor: 'Corporaciones que necesitan soluciones enterprise',
        delivery: '55-60 días hábiles',
        color: 'from-violet-500 to-purple-600'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Personalizado para Servicios */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <Image 
                src="/logo_final.png" 
                alt="Mente Autónoma" 
                width={40} 
                height={40} 
                className="object-contain group-hover:scale-110 transition-transform duration-300"
              />
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
              <Link href="/servicios-desarrollo-web" className="text-blue-600 border-b-2 border-blue-600 px-4 py-2 rounded-lg font-semibold transition-all duration-300">
                Servicios
              </Link>
              <Link href="/noticias" className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Noticias
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

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-900 via-purple-800 to-blue-900 text-white py-20">
        {/* Elementos de fondo decorativos */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(120,119,198,0.2),transparent_50%)]"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium mb-6 backdrop-blur-sm border border-white/30">
              🚀 Precios de Lanzamiento - Oferta Limitada
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Desarrollo Web
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Profesional
              </span>
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8 leading-relaxed">
              Transforma tu idea en una presencia digital impactante. Ofrecemos soluciones con WordPress 
              y tecnologías modernas para llevar tu negocio al siguiente nivel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center space-x-2 text-green-300 font-semibold">
                <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
                <span>Hosting Gratuito por 1 Año</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-300 font-semibold">
                <span className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></span>
                <span>Soporte Técnico Incluido</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-300 font-semibold">
                <span className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></span>
                <span>Garantía de Satisfacción</span>
              </div>
            </div>
          </div>
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
                      {plan.originalPrice ? (
                        <>
                          <div className="text-lg text-gray-500 line-through">{plan.originalPrice}</div>
                          <div className="text-sm text-green-600 font-semibold">
                            ¡Ahorras ${parseInt(plan.originalPrice.replace('$', '').replace('.', '')) - parseInt(plan.price.replace('$', '').replace('.', ''))}!
                          </div>
                        </>
                      ) : (
                        <div className="text-sm text-blue-600 font-semibold">
                          💬 Contacta para evaluación personalizada
                        </div>
                      )}
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
                      {plan.originalPrice ? (
                        <>
                          <div className="text-lg text-gray-500 line-through">{plan.originalPrice}</div>
                          <div className="text-sm text-green-600 font-semibold">
                            ¡Ahorras ${parseInt(plan.originalPrice.replace('$', '').replace('.', '')) - parseInt(plan.price.replace('$', '').replace('.', ''))}!
                          </div>
                        </>
                      ) : (
                        <div className="text-sm text-blue-600 font-semibold">
                          💬 Contacta para evaluación personalizada
                        </div>
                      )}
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

      {/* Footer Personalizado */}
      <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-pink-900 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-4">
                ¿Listo para Transformar tu Negocio?
              </h3>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Únete a cientos de empresas que ya están aprovechando el poder de la IA y el desarrollo web moderno
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button 
                  onClick={() => setShowQuoteForm(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  🚀 Solicitar Cotización Gratuita
                </button>
                <Link 
                  href="/contacto"
                  className="bg-white text-gray-900 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  📞 Hablar con un Experto
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                    <span className="text-white text-xl font-bold">MA</span>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold">Mente Autónoma</h1>
                    <p className="text-gray-400">Soluciones Digitales</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-6 max-w-md">
                  Transformamos ideas en soluciones digitales impactantes. Especialistas en desarrollo web, 
                  IA y estrategias digitales para empresas que buscan crecer.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h5 className="text-lg font-semibold mb-4">Enlaces Rápidos</h5>
                <ul className="space-y-2">
                  <li>
                    <Link href="/" className="text-gray-400 hover:text-white transition-colors duration-200">
                      Inicio
                    </Link>
                  </li>
                  <li>
                    <Link href="/servicios-desarrollo-web" className="text-gray-400 hover:text-white transition-colors duration-200">
                      Servicios
                    </Link>
                  </li>
                  <li>
                    <Link href="/noticias" className="text-gray-400 hover:text-white transition-colors duration-200">
                      Noticias
                    </Link>
                  </li>
                  <li>
                    <Link href="/contacto" className="text-gray-400 hover:text-white transition-colors duration-200">
                      Contacto
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Our Services */}
              <div>
                <h5 className="text-lg font-semibold mb-4">Nuestros Servicios</h5>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm text-gray-300">WordPress</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-300">Next.js</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-300">Supabase</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm text-gray-300">Tailwind CSS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © 2025 Mente Autónoma. Todos los derechos reservados. Construido con ❤️ y profesionalismo.
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
                  {plans.wordpress.find(p => p.id === selectedPlan)?.originalPrice || 
                   plans.modern.find(p => p.id === selectedPlan)?.originalPrice ? (
                    <div className="text-lg text-gray-500 line-through">
                      {plans.wordpress.find(p => p.id === selectedPlan)?.originalPrice || 
                       plans.modern.find(p => p.id === selectedPlan)?.originalPrice}
                    </div>
                   ) : null}
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

                <button 
                  onClick={() => {
                    setShowQuoteForm(true);
                    setSelectedPlan(null);
                  }}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  🚀 Solicitar Cotización Ahora
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Formulario de Cotización */}
      {showQuoteForm && (
        <QuoteForm 
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          selectedPlan={selectedPlan as any} 
          onClose={() => setShowQuoteForm(false)} 
        />
      )}
    </div>
  );
}
