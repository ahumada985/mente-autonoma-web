'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';

export default function NoticiaAutomatizacion() {
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsHeaderSticky(scrollPosition > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header con transparencia dinámica */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isHeaderSticky 
          ? 'bg-white border-b border-gray-200 shadow-sm' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center space-x-3 group">
              <img src="/logo_final.png" alt="Mente Autónoma" className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300" />
              <div>
                <h1 className={`text-xl font-bold transition-colors duration-300 ${
                  isHeaderSticky ? 'text-gray-900' : 'text-white'
                }`}>Mente Autónoma</h1>
                <p className={`text-sm transition-colors duration-300 ${
                  isHeaderSticky ? 'text-gray-600' : 'text-white/80'
                }`}>Soluciones Digitales</p>
              </div>
            </Link>
            
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                isHeaderSticky 
                  ? 'text-gray-700 hover:text-blue-600' 
                  : 'text-white/90 hover:text-white'
              }`}>
                Inicio
              </Link>
              <Link href="/servicios-desarrollo-web" className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                isHeaderSticky 
                  ? 'text-gray-700 hover:text-blue-600' 
                  : 'text-white/90 hover:text-white'
              }`}>
                Servicios
              </Link>
              <Link href="/noticias" className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                isHeaderSticky 
                  ? 'text-blue-600' 
                  : 'text-white'
              }`}>
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

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-900 via-purple-800 to-blue-900 text-white pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(120,119,198,0.2),transparent_50%)]"></div>
        
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-8 py-3 text-sm shadow-lg rounded-full inline-block backdrop-blur-sm border border-white/20">
              📰 Noticia
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Automatización Inteligente Avanzada:
              <span className="block bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"> Eficiencia sin Límites</span>
            </h1>
            
            <div className="flex items-center justify-center space-x-6 text-slate-200">
              <span>📅 10 Enero 2025</span>
              <span>•</span>
              <span>⏱️ 6 min de lectura</span>
              <span>•</span>
              <span>🏷️ Automatización</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contenido de la Noticia */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="prose prose-lg max-w-none">
            <div className="mb-8">
              <img 
                src="/noticia3.webp" 
                alt="Automatización Inteligente Avanzada"
                className="w-full h-64 object-cover rounded-lg mb-8"
              />
            </div>

            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              La automatización inteligente está transformando fundamentalmente la forma en que las empresas operan, eliminando tareas repetitivas y permitiendo que los equipos se enfoquen en actividades de mayor valor estratégico.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              ¿Qué es la automatización inteligente?
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              La automatización inteligente combina tecnologías de automatización robótica de procesos (RPA) con inteligencia artificial y machine learning para crear sistemas que no solo automatizan tareas, sino que también aprenden y mejoran con el tiempo. Esta convergencia permite que los procesos empresariales sean más eficientes, precisos y adaptativos.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Componentes clave de la automatización inteligente:
            </h3>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start space-x-3">
                <span className="text-blue-600 text-xl">✓</span>
                <span className="text-gray-700">Automatización robótica de procesos (RPA)</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-blue-600 text-xl">✓</span>
                <span className="text-gray-700">Procesamiento de lenguaje natural (NLP)</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-blue-600 text-xl">✓</span>
                <span className="text-gray-700">Machine learning y análisis predictivo</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-blue-600 text-xl">✓</span>
                <span className="text-gray-700">Integración de sistemas y APIs</span>
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Aplicaciones empresariales principales:
            </h3>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Gestión de Documentos</h4>
                <p className="text-gray-600">Procesamiento automático de facturas, contratos y formularios con extracción inteligente de datos y clasificación automática.</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Atención al Cliente</h4>
                <p className="text-gray-600">Resolución automática de consultas frecuentes, escalación inteligente y análisis de sentimientos en tiempo real.</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Gestión de Recursos Humanos</h4>
                <p className="text-gray-600">Automatización de procesos de reclutamiento, onboarding y gestión de nóminas con validación inteligente.</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Análisis Financiero</h4>
                <p className="text-gray-600">Generación automática de reportes, detección de anomalías y predicción de tendencias financieras.</p>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Beneficios medibles para las empresas
            </h3>

            <p className="text-gray-700 leading-relaxed mb-6">
              La implementación de automatización inteligente puede generar beneficios significativos y medibles para las empresas, incluyendo reducción de costos operativos, mejora en la precisión de los procesos y aumento en la satisfacción del cliente.
            </p>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-6 mb-8">
              <h4 className="text-lg font-semibold text-orange-900 mb-3">📈 Resultados Comprobados</h4>
              <p className="text-orange-800">
                Las empresas que implementan automatización inteligente reportan una reducción del 40% en costos operativos, un aumento del 60% en la precisión de los procesos y una mejora del 35% en la satisfacción del cliente.
              </p>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Implementación estratégica
            </h3>

            <p className="text-gray-700 leading-relaxed mb-6">
              La implementación exitosa de automatización inteligente requiere un enfoque estratégico que incluya la identificación de procesos candidatos, la selección de tecnologías apropiadas y la gestión del cambio organizacional.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              El futuro de la automatización
            </h3>

            <p className="text-gray-700 leading-relaxed mb-8">
              Con el continuo avance de la tecnología de IA, la automatización se volverá aún más inteligente y autónoma. Los sistemas del futuro podrán tomar decisiones complejas, aprender de experiencias pasadas y adaptarse a cambios en el entorno empresarial sin intervención humana.
            </p>

            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-8 rounded-xl border border-purple-200 text-center">
              <h4 className="text-2xl font-bold text-gray-900 mb-4">
                ¿Quieres automatizar tu empresa?
              </h4>
              <p className="text-gray-600 mb-6">
                Nuestro equipo puede ayudarte a identificar oportunidades de automatización y implementar soluciones inteligentes que transformen tu negocio.
              </p>
              <Link 
                href="/contacto"
                className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Consulta Gratuita
              </Link>
            </div>
          </article>

          {/* Navegación entre noticias */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <Link 
                href="/noticias/chatbots-que-entienden-contexto"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
              >
                <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Anterior: Chatbots que Entienden Contexto
              </Link>
              
              <Link 
                href="/noticias/flujos-de-trabajo-inteligentes"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
              >
                Siguiente: Flujos de Trabajo Inteligentes
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

