'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';

export default function NoticiaIA() {
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
              IA para Pequeñas Empresas:
              <span className="block bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"> Transformación Accesible</span>
            </h1>
            
            <div className="flex items-center justify-center space-x-6 text-slate-200">
              <span>📅 15 Enero 2025</span>
              <span>•</span>
              <span>⏱️ 5 min de lectura</span>
              <span>•</span>
              <span>🏷️ Tecnología</span>
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
                src="/noticia1.webp" 
                alt="IA para Pequeñas Empresas"
                className="w-full h-64 object-cover rounded-lg mb-8"
              />
            </div>

            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              La inteligencia artificial ya no es exclusiva de las grandes corporaciones. Las pequeñas empresas están descubriendo que la IA puede ser una herramienta poderosa y accesible para transformar sus operaciones y competir en el mercado actual.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              ¿Por qué las PYMES deben considerar la IA?
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              En un entorno empresarial cada vez más competitivo, las pequeñas empresas necesitan encontrar formas innovadoras de optimizar sus procesos, mejorar la atención al cliente y tomar decisiones más informadas. La inteligencia artificial ofrece soluciones prácticas que pueden implementarse gradualmente, sin requerir inversiones masivas.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Beneficios clave para PYMES:
            </h3>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start space-x-3">
                <span className="text-blue-600 text-xl">✓</span>
                <span className="text-gray-700">Reducción de costos operativos del 20-30%</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-blue-600 text-xl">✓</span>
                <span className="text-gray-700">Mejora en la satisfacción del cliente del 40%</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-blue-600 text-xl">✓</span>
                <span className="text-gray-700">Aumento de la productividad del equipo del 25%</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-blue-600 text-xl">✓</span>
                <span className="text-gray-700">Mejor toma de decisiones basada en datos</span>
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Soluciones IA accesibles para PYMES:
            </h3>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Chatbots Inteligentes</h4>
                <p className="text-gray-600">Atención al cliente 24/7 con respuestas automáticas inteligentes que pueden manejar consultas frecuentes y dirigir casos complejos a agentes humanos.</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Análisis de Datos</h4>
                <p className="text-gray-600">Herramientas que analizan patrones en el comportamiento del cliente, ventas y operaciones para identificar oportunidades de mejora.</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Automatización de Marketing</h4>
                <p className="text-gray-600">Campañas de email marketing personalizadas, segmentación automática de audiencias y optimización de contenido basada en IA.</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Gestión de Inventario</h4>
                <p className="text-gray-600">Predicción de demanda, optimización de stock y alertas automáticas para reabastecimiento basadas en patrones históricos.</p>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Implementación gradual y efectiva
            </h3>

            <p className="text-gray-700 leading-relaxed mb-6">
              La clave del éxito en la implementación de IA para PYMES es comenzar con proyectos pequeños y escalables. Es recomendable identificar un proceso específico que sea repetitivo y consuma mucho tiempo, y luego implementar una solución de IA para automatizarlo.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
              <h4 className="text-lg font-semibold text-blue-900 mb-3">💡 Consejo para PYMES</h4>
              <p className="text-blue-800">
                Comienza con un chatbot simple para atención al cliente. Es una inversión relativamente baja que puede generar resultados inmediatos y visibles, ayudando a construir confianza en la tecnología antes de implementar soluciones más complejas.
              </p>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              El futuro es accesible
            </h3>

            <p className="text-gray-700 leading-relaxed mb-8">
              La democratización de la IA significa que las herramientas que antes solo estaban disponibles para grandes empresas ahora son accesibles para todos. Las PYMES que adopten estas tecnologías temprano tendrán una ventaja competitiva significativa en sus respectivos mercados.
            </p>

            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-8 rounded-xl border border-purple-200 text-center">
              <h4 className="text-2xl font-bold text-gray-900 mb-4">
                ¿Listo para transformar tu empresa con IA?
              </h4>
              <p className="text-gray-600 mb-6">
                Nuestro equipo está aquí para ayudarte a identificar las mejores oportunidades de implementación de IA para tu negocio específico.
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
                href="/noticias"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
              >
                <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Volver a Noticias
              </Link>
              
              <Link 
                href="/noticias/chatbots-que-entienden-contexto"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
              >
                Siguiente: Chatbots que Entienden Contexto
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

