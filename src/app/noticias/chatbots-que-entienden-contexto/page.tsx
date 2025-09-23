'use client';

import Footer from '@/components/Footer';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function NoticiaChatbots() {
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsHeaderSticky(scrollPosition > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header especial para páginas legales */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isHeaderSticky 
          ? 'bg-white border-b border-gray-200 shadow-sm' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Desktop */}
          <div className="hidden md:flex justify-between items-center h-20">
            {/* Logo y texto */}
            <Link href="/" className="flex items-center space-x-3 group">
              <img src="/logo_final.png" alt="Mente Autónoma" className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300" />
              <div>
                <h1 className={`text-xl font-bold transition-colors duration-300 ${
                  isHeaderSticky ? 'text-gray-900' : 'text-gray-900'
                }`}>Mente Autónoma</h1>
                <p className={`text-sm transition-colors duration-300 ${
                  isHeaderSticky ? 'text-gray-600' : 'text-gray-600'
                }`}>Soluciones Digitales</p>
              </div>
            </Link>
            
            {/* Navegación desktop */}
            <nav className="flex space-x-8">
              <Link href="/" className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                isHeaderSticky 
                  ? 'text-gray-700 hover:text-blue-600' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}>
                Inicio
              </Link>
              <Link href="/servicios-desarrollo-web" className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                isHeaderSticky 
                  ? 'text-gray-700 hover:text-blue-600' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}>
                Servicios
              </Link>
              <Link href="/noticias" className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                isHeaderSticky 
                  ? 'text-blue-600' 
                  : 'text-blue-600'
              }`}>
                Noticias
              </Link>
            </nav>
            
            {/* Botón Contacto desktop */}
            <Link href="/contacto" className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl border-0 backdrop-blur-sm">
              Contacto
            </Link>
          </div>
          
          {/* Header Móvil - Layout: Logo | Contacto | Hamburger */}
          <div className="md:hidden flex items-center justify-between h-20">
            {/* Logo y texto - MÁS PEQUEÑO en móvil */}
            <Link href="/" className="flex items-center space-x-3 group">
              <img src="/logo_final.png" alt="Mente Autónoma" className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300" />
              <div>
                <h1 className={`text-base font-bold transition-colors duration-300 ${
                  isHeaderSticky ? 'text-gray-900' : 'text-gray-900'
                }`}>Mente Autónoma</h1>
                <p className={`text-xs transition-colors duration-300 ${
                  isHeaderSticky ? 'text-gray-600' : 'text-gray-600'
                }`}>Soluciones Digitales</p>
              </div>
            </Link>
            
            {/* Botón Contacto CENTRADO en móvil - MÁS PEQUEÑO */}
            <Link href="/contacto" className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-3 py-1.5 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl border-0 backdrop-blur-sm text-xs">
              Contacto
            </Link>
            
            {/* Menú hamburguesa - DERECHA en móvil */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex flex-col space-y-1 p-2"
            >
              <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
                isHeaderSticky ? 'text-gray-900' : 'text-gray-900'
              } ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
                isHeaderSticky ? 'text-gray-900' : 'text-gray-900'
              } ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
                isHeaderSticky ? 'text-gray-900' : 'text-gray-900'
              } ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </button>
          </div>
          
          {/* Menú móvil desplegable - DISEÑO CREATIVO */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-white/95 backdrop-blur-sm border-t border-gray-200 mt-2 rounded-lg shadow-lg">
              <nav className="flex flex-col space-y-2 p-4">
                <Link 
                  href="/" 
                  className="px-4 py-3 rounded-lg font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Inicio
                </Link>
                <Link 
                  href="/servicios-desarrollo-web" 
                  className="px-4 py-3 rounded-lg font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Servicios
                </Link>
                <Link 
                  href="/noticias" 
                  className="px-4 py-3 rounded-lg font-semibold text-blue-600 bg-blue-50 transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Noticias
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>



      {/* Artículo Principal */}
      <article className="py-28 sm:py-32">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header del Artículo */}
          <header className="mb-12">
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                Inteligencia Artificial
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Chatbots que Entienden Contexto: La Nueva Era de la Atención al Cliente
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              Los chatbots inteligentes están transformando la experiencia del cliente con capacidades 
              de comprensión contextual avanzada y respuestas personalizadas.
            </p>
          </header>

          {/* Imagen Principal */}
          <div className="mb-12">
              <img 
                src="/noticia2.webp" 
                alt="Chatbots que Entienden Contexto"
              className="w-full h-96 object-cover rounded-lg"
              />
            </div>

          {/* Contenido del Artículo */}
          <div className="prose prose-lg max-w-none space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">La Evolución de los Chatbots</h2>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Los chatbots han evolucionado significativamente desde sus inicios como simples 
                sistemas de respuestas predefinidas. Hoy, gracias a los avances en inteligencia 
                artificial y procesamiento del lenguaje natural, estos sistemas pueden mantener 
                conversaciones complejas y contextualmente relevantes.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">¿Qué hace que un Chatbot sea &quot;Inteligente&quot;?</h3>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Un chatbot inteligente se distingue por su capacidad de comprender el contexto 
                de la conversación, recordar interacciones previas y adaptar sus respuestas 
                según el perfil y necesidades específicas del usuario.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Componentes Clave de la Inteligencia Contextual</h3>
              
              <ul className="space-y-3 mb-6">
              <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-3 flex-shrink-0"></span>
                  <span className="text-lg text-gray-700"><strong>Memoria de Conversación:</strong> Capacidad de recordar el contexto completo de la interacción</span>
              </li>
              <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-3 flex-shrink-0"></span>
                  <span className="text-lg text-gray-700"><strong>Análisis de Sentimientos:</strong> Comprensión del estado emocional del usuario</span>
              </li>
              <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-3 flex-shrink-0"></span>
                  <span className="text-lg text-gray-700"><strong>Personalización:</strong> Adaptación de respuestas según el historial del usuario</span>
              </li>
              <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-3 flex-shrink-0"></span>
                  <span className="text-lg text-gray-700"><strong>Aprendizaje Continuo:</strong> Mejora constante basada en nuevas interacciones</span>
              </li>
            </ul>
              </div>
              
            <h3>Aplicaciones Empresariales</h3>
            
            <h4>1. Atención al Cliente 24/7</h4>
            <p>
              Los chatbots inteligentes pueden manejar consultas complejas en cualquier momento 
              del día, proporcionando respuestas inmediatas y escalando casos complejos a 
              agentes humanos cuando sea necesario.
            </p>

            <h4>2. Ventas y Marketing</h4>
            <p>
              Estos sistemas pueden identificar oportunidades de venta, recomendar productos 
              relevantes y guiar a los clientes a través del proceso de compra de manera 
              personalizada.
            </p>

            <h4>3. Soporte Técnico</h4>
            <p>
              Los chatbots pueden diagnosticar problemas técnicos, proporcionar soluciones 
              paso a paso y reducir significativamente el tiempo de resolución de incidencias.
            </p>

            <h3>Beneficios para las Empresas</h3>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
              <h4 className="text-lg font-semibold text-blue-900 mb-3">📊 Impacto Medible</h4>
              <ul className="text-blue-800 space-y-2">
                <li>• Reducción del 70% en tiempo de respuesta al cliente</li>
                <li>• Incremento del 45% en satisfacción del cliente</li>
                <li>• Ahorro del 60% en costos de atención al cliente</li>
                <li>• Disponibilidad 24/7 sin costos adicionales</li>
              </ul>
            </div>

            <h3>Implementación Estratégica</h3>
            
            <p>
              Para implementar exitosamente chatbots inteligentes, las empresas deben considerar:
            </p>

            <ol>
              <li><strong>Definir objetivos claros:</strong> Establecer métricas específicas de éxito</li>
              <li><strong>Diseñar la experiencia del usuario:</strong> Crear flujos de conversación intuitivos</li>
              <li><strong>Integrar con sistemas existentes:</strong> Conectar con CRM, bases de datos y APIs</li>
              <li><strong>Capacitar al equipo:</strong> Preparar a los empleados para la colaboración con IA</li>
              <li><strong>Monitorear y optimizar:</strong> Analizar métricas y mejorar continuamente</li>
            </ol>

            <h3>El Futuro de los Chatbots</h3>
            
            <p>
              Los chatbots del futuro serán aún más sofisticados, incorporando capacidades 
              de procesamiento de voz, reconocimiento facial y análisis predictivo avanzado. 
              Esto permitirá experiencias de usuario más naturales y personalizadas.
            </p>

            <h3>Consideraciones Éticas</h3>
            
            <p>
              Es fundamental que las empresas implementen chatbots de manera ética, 
              asegurando transparencia en la interacción, protección de la privacidad 
              del usuario y la capacidad de escalar a agentes humanos cuando sea necesario.
            </p>

            <h3>Conclusión</h3>
            
            <p>
              Los chatbots inteligentes representan una oportunidad significativa para 
              transformar la atención al cliente y mejorar la eficiencia operativa. 
              Las empresas que adopten esta tecnología hoy estarán mejor posicionadas 
              para competir en un mercado cada vez más digital.
            </p>
            </div>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">#Chatbots</span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">#IA</span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">#Atención al Cliente</span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">#Contexto</span>
            </div>
          </div>

          {/* Navegación */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex justify-between">
              <Link 
                href="/noticias/automatizacion-inteligente-avanzada"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                ← Anterior: Automatización Inteligente Avanzada
              </Link>
              <Link 
                href="/noticias/flujos-de-trabajo-inteligentes" 
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Siguiente: Flujos de Trabajo Inteligentes →
              </Link>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}

