'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';

export default function NoticiaChatbots() {
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
              Chatbots que Entienden Contexto:
              <span className="block bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"> El Futuro de la Atención al Cliente</span>
            </h1>
            
            <div className="flex items-center justify-center space-x-6 text-slate-200">
              <span>📅 12 Enero 2025</span>
              <span>•</span>
              <span>⏱️ 4 min de lectura</span>
              <span>•</span>
              <span>🏷️ Innovación</span>
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
                src="/noticia2.webp" 
                alt="Chatbots que Entienden Contexto"
                className="w-full h-64 object-cover rounded-lg mb-8"
              />
            </div>

            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Los chatbots tradicionales están siendo reemplazados por sistemas de inteligencia artificial que realmente entienden el contexto de las conversaciones, revolucionando la forma en que las empresas interactúan con sus clientes.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              La evolución de los chatbots
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              Los primeros chatbots funcionaban con respuestas predefinidas y reglas simples, lo que resultaba en conversaciones rígidas y frustrantes para los usuarios. Hoy, gracias a los avances en procesamiento del lenguaje natural (NLP) y machine learning, los chatbots pueden mantener conversaciones fluidas y contextualmente relevantes.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Características de los chatbots inteligentes:
            </h3>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start space-x-3">
                <span className="text-blue-600 text-xl">✓</span>
                <span className="text-gray-700">Comprensión del contexto de la conversación</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-blue-600 text-xl">✓</span>
                <span className="text-gray-700">Memoria de interacciones previas</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-blue-600 text-xl">✓</span>
                <span className="text-gray-700">Aprendizaje continuo de patrones de usuario</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-blue-600 text-xl">✓</span>
                <span className="text-gray-700">Integración con sistemas empresariales</span>
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Aplicaciones prácticas en el negocio:
            </h3>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Atención al Cliente 24/7</h4>
                <p className="text-gray-600">Los chatbots inteligentes pueden manejar consultas complejas en cualquier momento del día, proporcionando respuestas inmediatas y precisas.</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Ventas y Consultas</h4>
                <p className="text-gray-600">Capacidad de recomendar productos, procesar pedidos y responder preguntas técnicas de manera natural y conversacional.</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Soporte Técnico</h4>
                <p className="text-gray-600">Diagnóstico de problemas comunes, guías paso a paso y escalación inteligente a agentes humanos cuando sea necesario.</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Reservas y Agendamiento</h4>
                <p className="text-gray-600">Gestión automática de citas, recordatorios y confirmaciones con integración a calendarios y sistemas de gestión.</p>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Beneficios para las empresas
            </h3>

            <p className="text-gray-700 leading-relaxed mb-6">
              La implementación de chatbots inteligentes puede generar beneficios significativos para las empresas, incluyendo reducción de costos operativos, mejora en la satisfacción del cliente y aumento en la eficiencia del equipo de atención al cliente.
            </p>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-8">
              <h4 className="text-lg font-semibold text-green-900 mb-3">📊 Impacto Medible</h4>
              <p className="text-green-800">
                Las empresas que implementan chatbots inteligentes reportan una reducción del 30% en costos de atención al cliente y una mejora del 45% en la satisfacción del cliente, según estudios recientes del sector.
              </p>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              El futuro de la atención al cliente
            </h3>

            <p className="text-gray-700 leading-relaxed mb-8">
              Con el continuo avance de la tecnología de IA, los chatbots se volverán aún más inteligentes y capaces. La integración con sistemas de análisis de sentimientos, reconocimiento de voz y procesamiento de imágenes permitirá experiencias de usuario verdaderamente inmersivas y personalizadas.
            </p>

            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-8 rounded-xl border border-purple-200 text-center">
              <h4 className="text-2xl font-bold text-gray-900 mb-4">
                ¿Quieres implementar un chatbot inteligente?
              </h4>
              <p className="text-gray-600 mb-6">
                Nuestro equipo especializado puede ayudarte a desarrollar e implementar chatbots que realmente entiendan a tus clientes.
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
                href="/noticias/ia-para-pequenas-empresas"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
              >
                <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Anterior: IA para Pequeñas Empresas
              </Link>
              
              <Link 
                href="/noticias/automatizacion-inteligente-avanzada"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
              >
                Siguiente: Automatización Inteligente Avanzada
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

