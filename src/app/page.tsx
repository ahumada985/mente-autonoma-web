'use client'

import LeadCaptureForm from '@/components/LeadCaptureForm'
import Footer from '@/components/Footer';
import Link from 'next/link'
import SupabaseTest from '@/components/SupabaseTest'

export default function Home() {
  return (
    <div className="min-h-screen">
            {/* Header transparente que se vuelve sticky - DISEÑO COMPLETAMENTE NUEVO */}
      <header className="bg-transparent fixed w-full top-0 z-50 transition-all duration-300" id="header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo: SOLO la imagen, sin contenedor ni fondo */}
            <div className="flex items-center space-x-3">
              <img src="/logo_final.png" alt="Mente Autónoma" className="w-12 h-12 object-contain" />
              <h1 id="brandTitle" className="text-2xl font-bold text-white">Mente Autónoma</h1>
            </div>
            
            {/* Menu con letras de un solo color (cambia al hacer sticky) */}
            <nav className="hidden md:flex space-x-8">
              <a href="#servicios" className="nav-link text-white hover:text-blue-400 px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Servicios
              </a>
              <a href="/noticias" className="nav-link text-white hover:text-blue-400 px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Noticias
              </a>
              <a href="#tecnologias" className="nav-link text-white hover:text-blue-400 px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Tecnologías
              </a>
            </nav>
            
            {/* CTA Button - DISEÑO NUEVO */}
            <div className="flex items-center space-x-4">
              <button className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl border-0 backdrop-blur-sm">
                Ver Demo
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Fondo púrpura a azul */}
      <section className="bg-gradient-to-r from-purple-900 via-purple-800 to-blue-900 text-white pt-32 pb-20 relative overflow-hidden">
        {/* Elementos de fondo decorativos */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(120,119,198,0.2),transparent_50%)]"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge superior completamente renovado - NUEVO DISEÑO */}
            <div className="mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-8 py-3 text-sm shadow-lg rounded-full inline-block backdrop-blur-sm border border-white/20">
              ⚡ La IA del Futuro, Hoy
            </div>
            
            {/* Título principal completamente renovado - NUEVO ESTILO */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Transforma tu
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-2xl"> Empresa</span>
              <br />
              con Inteligencia Artificial
            </h1>
            
            {/* Descripción completamente renovada - NUEVO TONO */}
            <p className="text-xl md:text-2xl text-slate-200 mb-10 leading-relaxed">
              Llevamos la IA de vanguardia a tu negocio.<br/>
              <span className="text-emerald-300 font-semibold">Soluciones personalizadas que generan resultados reales.</span>
            </p>
            
            {/* Botones completamente renovados - NUEVO DISEÑO */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="group relative overflow-hidden bg-white text-purple-600 text-lg px-10 py-5 rounded-3xl font-bold transition-all duration-500 transform hover:scale-110 hover:shadow-2xl shadow-xl flex items-center gap-4 border-2 border-purple-200 backdrop-blur-sm hover:border-purple-400">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <div className="w-0 h-0 border-l-[10px] border-l-purple-600 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent"></div>
                </div>
                <span className="relative z-10">Ver Demo en Vivo</span>
                <div className="relative z-10 w-2 h-2 bg-purple-600 rounded-full animate-pulse"></div>
              </button>
              
              <a href="#servicios" className="group relative overflow-hidden bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white text-lg px-10 py-5 rounded-3xl font-bold transition-all duration-500 transform hover:scale-110 hover:shadow-2xl shadow-xl flex items-center gap-4 border-2 border-white/20 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <div className="w-0 h-0 border-l-[10px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent transform rotate-45"></div>
                </div>
                <span className="relative z-10">Explorar Servicios</span>
                <div className="relative z-10 w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios Section - DISEÑO SIMPLE PÚRPURA CON FONDO BLANCO */}
      <section id="servicios" className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-8 py-3 text-sm shadow-2xl rounded-full inline-block">
              ⚡ Servicios de Vanguardia
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-8 leading-tight">
              Soluciones IA que
              <span className="block bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"> Revolucionan tu Negocio</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Cada servicio está diseñado para maximizar el potencial de tu empresa con tecnología de punta
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {/* Servicio 1 - Chatbot Inteligente - DISEÑO COMPLETO CON EFECTOS */}
            <div className="group relative overflow-hidden bg-white rounded-3xl p-8 border-2 border-purple-200 hover:border-purple-400 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-xl shadow-lg">
              {/* Elementos decorativos de fondo */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-tr from-blue-100 to-purple-100 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Líneas decorativas */}
              <div className="absolute top-6 left-6 w-12 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transform rotate-45 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="absolute bottom-6 right-6 w-8 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transform -rotate-45 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 relative">
                  <span className="text-4xl">🤖</span>
                  {/* Anillo giratorio */}
                  <div className="absolute inset-0 border-2 border-purple-300 border-dashed rounded-2xl animate-spin opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors duration-300">
                  Chatbot Inteligente
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Asistentes conversacionales que entienden contexto y resuelven consultas complejas con IA avanzada.
                </p>
                
                {/* Información importante de forma visualmente atractiva */}
                <div className="mb-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 border border-purple-200">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-green-700 font-semibold">Respuesta: {'<'} 2s</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-blue-700 font-semibold">Autoaprendizaje</span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                      <span className="text-purple-700 font-semibold">Uptime: 99.9%</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                      <span className="text-pink-700 font-semibold">Integración API</span>
                    </div>
                  </div>
                </div>
                
                <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 relative overflow-hidden group">
                  <span className="relative z-10">Próximamente</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>

            {/* Servicio 2 - Diseño Web Inteligente - DISEÑO COMPLETO CON EFECTOS */}
            <div className="group relative overflow-hidden bg-white rounded-3xl p-8 border-2 border-purple-200 hover:border-purple-400 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-xl shadow-lg">
              {/* Elementos decorativos de fondo */}
              <div className="absolute top-0 left-0 w-28 h-28 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-tl from-pink-100 to-purple-100 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Puntos decorativos */}
              <div className="absolute top-8 right-8 w-3 h-3 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-ping"></div>
              <div className="absolute bottom-8 left-8 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
              
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 relative">
                  <span className="text-4xl">🌐</span>
                  {/* Ondas concéntricas */}
                  <div className="absolute inset-0 border border-purple-300 rounded-2xl animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-2 border border-purple-200 rounded-xl animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{animationDelay: '0.2s'}}></div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors duration-300">
                  Diseño Web Inteligente
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Sitios web que se adaptan automáticamente y optimizan la experiencia del usuario con IA.
                </p>
                
                {/* Información importante de forma visualmente atractiva */}
                <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-green-700 font-semibold">Velocidad: {'<'} 1s</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-blue-700 font-semibold">SEO: Optimizado</span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                      <span className="text-purple-700 font-semibold">Responsive</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                      <span className="text-pink-700 font-semibold">Accesibilidad</span>
                    </div>
                  </div>
                </div>
                
                <Link href="/servicios-desarrollo-web" className="block w-full">
                  <button className="w-full bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 hover:from-emerald-600 hover:via-green-600 hover:to-teal-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 relative overflow-hidden group shadow-lg">
                    <span className="relative z-10 flex items-center justify-center space-x-2">
                      <span>🚀</span>
                      <span>Explorar Servicio</span>
                      <span>✨</span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {/* Indicador de servicio activo */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  </button>
                </Link>
              </div>
            </div>

            {/* Servicio 3 - Automatización de Procesos - DISEÑO COMPLETO CON EFECTOS */}
            <div className="group relative overflow-hidden bg-white rounded-3xl p-8 border-2 border-purple-200 hover:border-purple-400 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-xl shadow-lg">
              {/* Elementos decorativos de fondo */}
              <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-purple-100 to-pink-100 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-tr from-blue-100 to-indigo-100 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Líneas decorativas dinámicas */}
              <div className="absolute top-4 left-4 w-16 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transform -rotate-45 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
              <div className="absolute bottom-4 right-4 w-12 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transform rotate-45 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
              <div className="absolute top-1/2 left-2 w-8 h-0.5 bg-gradient-to-r from-pink-400 to-blue-400 transform rotate-90 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" style={{animationDelay: '0.3s'}}></div>
              <div className="absolute top-1/2 right-2 w-8 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transform -rotate-90 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" style={{animationDelay: '0.6s'}}></div>
              
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 relative">
                  <span className="text-4xl">⚡</span>
                  {/* Anillos concéntricos giratorios */}
                  
                  <div className="absolute inset-2 border border-white/20 rounded-xl animate-spin opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{animationDirection: 'reverse', animationDelay: '0.2s'}}></div>
                  <div className="absolute inset-4 border border-white/10 rounded-lg animate-spin opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{animationDelay: '0.4s'}}></div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors duration-300">
                  Automatización Procesos
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Optimiza flujos de trabajo y elimina tareas repetitivas con IA avanzada y machine learning.
                </p>
                
                {/* Información importante de forma visualmente atractiva */}
                <div className="mb-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 border border-purple-200">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-green-700 font-semibold">Ahorro Tiempo</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-blue-700 font-semibold">Reducción Errores</span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                      <span className="text-purple-700 font-semibold">Procesos: 24/7</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                      <span className="text-pink-700 font-semibold">Eficiencia</span>
                    </div>
                  </div>
                </div>
                
                <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 relative overflow-hidden group">
                  <span className="relative z-10">Próximamente</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>

            {/* Servicio 4 - Marketing Digital - DISEÑO COMPLETO CON EFECTOS */}
            <div className="group relative overflow-hidden bg-white rounded-3xl p-8 border-2 border-purple-200 hover:border-purple-400 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-xl shadow-lg">
              {/* Elementos decorativos de fondo */}
              <div className="absolute top-0 left-0 w-28 h-28 bg-gradient-to-br from-green-100 to-blue-100 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-tl from-purple-100 to-pink-100 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Líneas decorativas alucinantes */}
              <div className="absolute top-6 left-6 w-12 h-0.5 bg-gradient-to-r from-green-400 to-blue-400 transform rotate-45 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
              <div className="absolute bottom-6 right-6 w-8 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transform -rotate-45 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
              <div className="absolute top-1/2 left-4 w-10 h-0.5 bg-gradient-to-r from-blue-400 to-green-400 transform rotate-90 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="absolute top-1/2 right-4 w-10 h-0.5 bg-gradient-to-r from-pink-400 to-purple-400 transform -rotate-90 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" style={{animationDelay: '0.4s'}}></div>
              <div className="absolute top-1/4 left-1/2 w-8 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-400 transform -rotate-45 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" style={{animationDelay: '0.6s'}}></div>
              <div className="absolute bottom-1/4 right-1/2 w-8 h-0.5 bg-gradient-to-r from-orange-400 to-red-400 transform rotate-45 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" style={{animationDelay: '0.8s'}}></div>
              
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 relative">
                  <span className="text-4xl">📊</span>
                  {/* Estrella de conexión giratoria */}
                  <div className="absolute inset-0 w-0 h-0 border-l-[8px] border-l-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent transform rotate-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-spin"></div>
                  <div className="absolute inset-0 w-0 h-0 border-l-[8px] border-l-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent transform rotate-45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-spin" style={{animationDelay: '0.1s'}}></div>
                  <div className="absolute inset-0 w-0 h-0 border-l-[8px] border-l-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent transform rotate-90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-spin" style={{animationDelay: '0.2s'}}></div>
                  <div className="absolute inset-0 w-0 h-0 border-l-[8px] border-l-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent transform rotate-135 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-spin" style={{animationDelay: '0.3s'}}></div>
                  <div className="absolute inset-0 w-0 h-0 border-l-[8px] border-l-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent transform rotate-180 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-spin" style={{animationDelay: '0.4s'}}></div>
                  <div className="absolute inset-0 w-0 h-0 border-l-[8px] border-l-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent transform rotate-225 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-spin" style={{animationDelay: '0.5s'}}></div>
                  <div className="absolute inset-0 w-0 h-0 border-l-[8px] border-l-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent transform rotate-270 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-spin" style={{animationDelay: '0.6s'}}></div>
                  <div className="absolute inset-0 w-0 h-0 border-l-[8px] border-l-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent transform rotate-315 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-spin" style={{animationDelay: '0.7s'}}></div>
                  
                  {/* Anillos pulsantes adicionales */}
                  <div className="absolute inset-0 border-2 border-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 scale-0 group-hover:scale-125 animate-ping"></div>
                  <div className="absolute inset-0 border border-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 scale-0 group-hover:scale-150 animate-ping" style={{animationDelay: '0.5s'}}></div>
                  
                  {/* Partículas flotantes de energía */}
                  <div className="absolute top-2 left-2 w-2 h-2 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="absolute top-2 right-2 w-2 h-2 bg-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  <div className="absolute bottom-2 left-2 w-2 h-2 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-bounce" style={{animationDelay: '0.4s'}}></div>
                  <div className="absolute bottom-2 right-2 w-2 h-2 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-bounce" style={{animationDelay: '0.5s'}}></div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors duration-300">
                  Marketing Digital
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Estrategias digitales inteligentes con IA que maximizan el ROI y optimizan campañas en tiempo real.
                </p>
                
                {/* Información importante de forma visualmente atractiva */}
                <div className="mb-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 border border-green-200">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-green-700 font-semibold">Medible</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-blue-700 font-semibold">Escalable</span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                      <span className="text-purple-700 font-semibold">Alta conversión</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                      <span className="text-pink-700 font-semibold">Optimizable</span>
                    </div>
                  </div>
                </div>
                
                <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 relative overflow-hidden group">
                  <span className="relative z-10">Próximamente</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>

            {/* Servicio 5 - Asistente Secretario IA - DISEÑO COMPLETO CON EFECTOS */}
            <div className="group relative overflow-hidden bg-white rounded-3xl p-8 border-2 border-purple-200 hover:border-purple-400 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-xl shadow-lg">
              {/* Elementos decorativos de fondo */}
              <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-blue-100 to-purple-100 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-tr from-pink-100 to-purple-100 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Líneas decorativas alucinantes */}
              <div className="absolute top-6 right-6 w-12 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transform -rotate-45 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
              <div className="absolute bottom-6 left-6 w-8 h-0.5 bg-gradient-to-r from-pink-400 to-purple-400 transform rotate-45 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
              <div className="absolute top-1/2 right-4 w-10 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 transform -rotate-90 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="absolute top-1/2 left-4 w-10 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transform rotate-90 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" style={{animationDelay: '0.4s'}}></div>
              <div className="absolute top-1/4 right-1/2 w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 transform rotate-45 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" style={{animationDelay: '0.6s'}}></div>
              <div className="absolute bottom-1/4 left-1/2 w-8 h-0.5 bg-gradient-to-r from-pink-400 to-rose-400 transform -rotate-45 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" style={{animationDelay: '0.8s'}}></div>
              
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 relative">
                  <span className="text-4xl">📋</span>
                  {/* Espiral de conexión giratoria */}
                  <div className="absolute inset-0 border-2 border-white/30 rounded-2xl animate-spin opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                 
                  <div className="absolute inset-6 border border-white/5 rounded-md animate-spin opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{animationDirection: 'reverse', animationDelay: '0.3s'}}></div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors duration-300">
                  Asistente Secretario IA
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Gestión inteligente de agenda, emails y tareas administrativas con IA avanzada.
                </p>
                
                {/* Información importante de forma visualmente atractiva */}
                <div className="mb-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 border border-purple-200">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-green-700 font-semibold">Recordatorios</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-blue-700 font-semibold">Agenda inteligente</span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                      <span className="text-purple-700 font-semibold">Lista de ideas</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                      <span className="text-pink-700 font-semibold">Mayor productividad</span>
                    </div>
                  </div>
                </div>
                
                <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 relative overflow-hidden group">
                  <span className="relative z-10">Próximamente</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>

            {/* Servicio 6 - Generador de Contenido RRSS - DISEÑO COMPLETO CON EFECTOS */}
            <div className="group relative overflow-hidden bg-white rounded-3xl p-8 border-2 border-purple-200 hover:border-purple-400 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-xl shadow-lg">
              {/* Elementos decorativos de fondo */}
              <div className="absolute top-0 left-0 w-28 h-28 bg-gradient-to-br from-orange-100 to-red-100 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-tl from-purple-100 to-pink-100 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Líneas decorativas alucinantes */}
              <div className="absolute top-6 left-6 w-12 h-0.5 bg-gradient-to-r from-orange-400 to-red-400 transform rotate-45 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
              <div className="absolute bottom-6 right-6 w-8 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transform -rotate-45 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
              <div className="absolute top-1/2 left-4 w-10 h-0.5 bg-gradient-to-r from-red-400 to-orange-400 transform rotate-90 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="absolute top-1/2 right-4 w-10 h-0.5 bg-gradient-to-r from-pink-400 to-purple-400 transform -rotate-90 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" style={{animationDelay: '0.4s'}}></div>
              <div className="absolute top-1/4 left-1/2 w-8 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-400 transform -rotate-45 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" style={{animationDelay: '0.6s'}}></div>
              <div className="absolute bottom-1/4 right-1/2 w-8 h-0.5 bg-gradient-to-r from-rose-400 to-pink-400 transform rotate-45 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" style={{animationDelay: '0.8s'}}></div>
              <div className="absolute top-1/3 left-1/3 w-6 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-400 transform rotate-30 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" style={{animationDelay: '1s'}}></div>
              <div className="absolute bottom-1/3 right-1/3 w-6 h-0.5 bg-gradient-to-r from-fuchsia-400 to-purple-400 transform -rotate-30 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" style={{animationDelay: '1.2s'}}></div>
              
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 relative">
                  <span className="text-4xl">✍️</span>
                  {/* Onda de conexión pulsante */}
                  <div className="absolute inset-0 border-2 border-white/30 rounded-2xl animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-2 border border-white/20 rounded-xl animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{animationDelay: '0.2s'}}></div>
                  <div className="absolute inset-4 border border-white/10 rounded-lg animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{animationDelay: '0.4s'}}></div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors duration-300">
                  Generador RRSS
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Creación automática de contenido viral con análisis de tendencias en tiempo real.
                </p>
                
                {/* Información importante de forma visualmente atractiva */}
                <div className="mb-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 border border-orange-200">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-green-700 font-semibold">Optimización SEO</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-blue-700 font-semibold">Creatividad</span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                      <span className="text-purple-700 font-semibold">Analisis</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                      <span className="text-pink-700 font-semibold">Viralización: +150%</span>
                    </div>
                  </div>
                </div>
                
                <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 relative overflow-hidden group">
                  <span className="relative z-10">Próximamente</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>

            {/* Servicio 7 - Optimización SEO - DISEÑO COMPLETO CON EFECTOS */}
            <div className="group relative overflow-hidden bg-white rounded-3xl p-8 border-2 border-purple-200 hover:border-purple-400 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-xl shadow-lg">
              {/* Elementos decorativos de fondo */}
              <div className="absolute top-0 left-0 w-28 h-28 bg-gradient-to-br from-green-100 to-blue-100 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-tl from-purple-100 to-pink-100 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Estrellas decorativas */}
              <div className="absolute top-4 left-4 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[8px] border-b-green-400 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
              <div className="absolute bottom-4 right-4 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[8px] border-t-blue-400 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="absolute top-1/2 left-2 w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[6px] border-b-purple-400 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" style={{animationDelay: '0.4s'}}></div>
              <div className="absolute top-1/2 right-2 w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[6px] border-t-pink-400 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" style={{animationDelay: '0.6s'}}></div>
              
              {/* Diamantes decorativos */}
              <div className="absolute top-1/4 right-1/2 w-3 h-3 bg-gradient-to-r from-green-400 to-blue-400 transform rotate-45 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 transform rotate-45 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-bounce" style={{animationDelay: '0.3s'}}></div>
              
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 relative">
                  <span className="text-4xl group-hover:animate-spin" style={{animationDuration: '3s'}}>🔍</span>
                  {/* Anillos de búsqueda */}
                  <div className="absolute inset-0 border-2 border-white/30 rounded-2xl animate-spin opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{animationDirection: 'reverse', animationDelay: '2.9s'}}></div>
                 
                  <div className="absolute inset-4 border border-white/10 rounded-lg animate-spin opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{animationDelay: '0.6s'}}></div>
                  
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors duration-300">
                  Optimización SEO
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Mejora tu posicionamiento en buscadores con estrategias de SEO inteligentes y análisis avanzado.
                </p>
                
                {/* Información importante de forma visualmente atractiva */}
                <div className="mb-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 border border-green-200">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-green-700 font-semibold">Analisis competencia</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-blue-700 font-semibold">Reportes</span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                      <span className="text-purple-700 font-semibold">Auditoria inteligente</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                      <span className="text-pink-700 font-semibold">Palabras claves</span>
                    </div>
                  </div>
                </div>
                
                <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 relative overflow-hidden group">
                  <span className="relative z-10">Próximamente</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>

            {/* Servicio 8 - Aplicaciones SAAS/BAAS - DISEÑO COMPLETO CON EFECTOS */}
            <div className="group relative overflow-hidden bg-white rounded-3xl p-8 border-2 border-purple-200 hover:border-purple-400 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-xl shadow-lg">
              {/* Elementos decorativos de fondo */}
              <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-indigo-100 to-purple-100 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-tr from-blue-100 to-cyan-100 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Hexágonos decorativos */}
              <div className="absolute top-4 left-4 w-6 h-6 bg-gradient-to-r from-indigo-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" style={{clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'}}></div>
              <div className="absolute bottom-4 right-4 w-4 h-4 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" style={{animationDelay: '0.2s', clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'}}></div>
              <div className="absolute top-1/2 left-2 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" style={{animationDelay: '0.4s', clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'}}></div>
              <div className="absolute top-1/2 right-2 w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" style={{animationDelay: '0.6s', clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'}}></div>
              
              {/* Círculos con bordes punteados */}
              <div className="absolute top-1/4 right-1/2 w-8 h-8 border-2 border-dashed border-indigo-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-spin" style={{animationDelay: '0.1s'}}></div>
              <div className="absolute bottom-1/4 left-1/2 w-6 h-6 border-2 border-dashed border-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-spin" style={{animationDelay: '0.3s', animationDirection: 'reverse'}}></div>
              
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 relative">
                  {/* Nube que aparece y desaparece */}
                  <span className="text-4xl group-hover:opacity-0 transition-opacity duration-300">☁️</span>
                  <span className="text-4xl absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">⛈️</span>
                  
                  {/* Rayos de energía */}
                  <div className="absolute inset-0 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[12px] border-t-yellow-400 opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse"></div>
                  <div className="absolute inset-0 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[8px] border-t-orange-400 opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse" style={{animationDelay: '0.2s'}}></div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors duration-300">
                  Aplicaciones SAAS/BAAS
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Desarrollo de aplicaciones escalables en la nube con arquitectura moderna y servicios gestionados.
                </p>
                
                {/* Información importante de forma visualmente atractiva */}
                <div className="mb-6 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-4 border border-indigo-200">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-green-700 font-semibold">Escalable</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-blue-700 font-semibold">Soluciones Cloud</span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                      <span className="text-purple-700 font-semibold">Conectividad: Total</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                      <span className="text-pink-700 font-semibold">Uptime: 99.9%</span>
                    </div>
                  </div>
                </div>
                
                <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 relative overflow-hidden group">
                  <span className="relative z-10">Próximamente</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>

            {/* Servicio 9 - Módulo Personalizado - DISEÑO COMPLETO CON EFECTOS */}
            <div className="group relative overflow-hidden bg-white rounded-3xl p-8 border-2 border-purple-200 hover:border-purple-400 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-xl shadow-lg">
              {/* Elementos decorativos de fondo */}
              <div className="absolute top-0 left-0 w-28 h-28 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-tl from-violet-100 to-purple-100 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Rombo decorativo */}
              <div className="absolute top-4 left-4 w-6 h-6 bg-gradient-to-r from-emerald-400 to-teal-400 transform rotate-45 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
              <div className="absolute bottom-4 right-4 w-4 h-4 bg-gradient-to-r from-violet-400 to-purple-400 transform rotate-45 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="absolute top-1/2 left-2 w-3 h-3 bg-gradient-to-r from-teal-400 to-emerald-400 transform rotate-45 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" style={{animationDelay: '0.4s'}}></div>
              <div className="absolute top-1/2 right-2 w-3 h-3 bg-gradient-to-r from-purple-400 to-violet-400 transform rotate-45 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" style={{animationDelay: '0.6s'}}></div>
              
              {/* Líneas onduladas */}
              <div className="absolute top-1/4 right-1/2 w-8 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" style={{animationDelay: '0.1s', borderRadius: '50%'}}></div>
              <div className="absolute bottom-1/4 left-1/2 w-6 h-0.5 bg-gradient-to-r from-violet-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" style={{animationDelay: '0.3s', borderRadius: '50%'}}></div>
              
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 relative">
                  {/* Tuerca girando lentamente */}
                  <span className="text-4xl group-hover:animate-spin" style={{animationDuration: '4s'}}>⚙️</span>
                  
                  {/* Círculos que crecen hacia afuera con delay */}
                  <div className="absolute inset-0 border-2 border-white/30 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 scale-0 group-hover:scale-150 animate-ping" style={{transitionDelay: '0s'}}></div>
                  <div className="absolute inset-0 border border-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 scale-0 group-hover:scale-200 animate-ping" style={{transitionDelay: '0.2s'}}></div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors duration-300">
                  Módulo Personalizado
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Soluciones a medida que se adaptan perfectamente a las necesidades específicas de tu negocio.
                </p>
                
                {/* Información importante de forma visualmente atractiva */}
                <div className="mb-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-200">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-green-700 font-semibold">Escalable</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-blue-700 font-semibold">Personalización</span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                      <span className="text-purple-700 font-semibold">Flexibilidad</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                      <span className="text-pink-700 font-semibold">Automatización</span>
                    </div>
                  </div>
                </div>
                
                <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 relative overflow-hidden group">
                  <span className="relative z-10">Próximamente</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      

                    {/* NUEVA SECCIÓN: Por Qué Adoptar IA en los Negocios - FONDO OSCURO */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-slate-800 to-black text-white relative overflow-hidden">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Columna Izquierda - Contenido */}
            <div className="space-y-8">
              <div className="mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-8 py-3 text-sm shadow-2xl rounded-full inline-block">
                🚀 Transformación Digital 2025
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                ¿Por Qué Tu Negocio
                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"> Debe Implementar Agentes IA?</span>
              </h2>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl">
                Los agentes de IA son la próxima revolución en productividad empresarial. 
                <span className="text-emerald-300 font-semibold">Automatizan tareas complejas, toman decisiones inteligentes y trabajan 24/7</span> 
                para que tu equipo se enfoque en lo que realmente importa: crecer tu negocio.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">📈</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Crecimiento Exponencial</h3>
                    <p className="text-gray-300">Los negocios con IA crecen 3x más rápido que los tradicionales</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">💰</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Ahorro de Costos</h3>
                    <p className="text-gray-300">Reduce gastos operativos hasta en un 40% con automatización inteligente</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Ventaja Competitiva</h3>
                    <p className="text-gray-300">Sé el primero en tu industria en implementar soluciones IA</p>
                  </div>
                </div>
              </div>
              

            </div>
            
            {/* Columna Derecha - NUEVO DISEÑO INTERACTIVO Y CREATIVO */}
            <div className="relative">
              <div className="w-[450px] h-[450px] mx-auto relative">
                {/* Fondo animado con partículas flotantes */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-3xl backdrop-blur-sm"></div>
                
                {/* Partículas flotantes animadas */}
                <div className="absolute top-4 left-4 w-2 h-2 bg-blue-400 rounded-full animate-bounce opacity-60"></div>
                <div className="absolute top-12 right-8 w-3 h-3 bg-purple-400 rounded-full animate-bounce opacity-60" style={{animationDelay: '0.5s'}}></div>
                <div className="absolute top-20 left-16 w-2 h-2 bg-pink-400 rounded-full animate-bounce opacity-60" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-28 right-20 w-2 h-2 bg-indigo-400 rounded-full animate-bounce opacity-60" style={{animationDelay: '1.5s'}}></div>
                
                {/* Círculo central principal con Agentes IA */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/30 animate-pulse">
                  <div className="text-center text-white">
                    <div className="text-4xl mb-2">🤖</div>
                    <div className="text-base font-bold">Agentes IA</div>
                  </div>
                  
                  {/* Anillos concéntricos giratorios */}
                  <div className="absolute inset-0 border-2 border-white/20 border-dashed rounded-full animate-spin"></div>
                  <div className="absolute inset-2 border border-white/10 border-dashed rounded-full animate-spin" style={{animationDirection: 'reverse'}}></div>
                </div>
                
                {/* Tarjeta 1 - Superior Izquierda - Autonomia total */}
                <div className="absolute top-10 left-10 bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-5 rounded-2xl shadow-xl border-2 border-white/30 transform -rotate-12 hover:rotate-0 transition-all duration-700 cursor-pointer group hover:scale-125 animate-bounce w-28 h-28">
                  <div className="text-center">
                    <div className="text-2xl mb-1 group-hover:animate-spin">🚀</div>
                    <div className="text-sm font-bold">Autonomia</div>
                    <div className="text-xs opacity-90">total</div>
                  </div>
                  {/* Efecto de brillo */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                {/* Tarjeta 2 - Superior Derecha - Escalable 100% */}
                <div className="absolute top-10 right-10 bg-gradient-to-r from-orange-500 to-red-500 text-white p-5 rounded-2xl shadow-xl border-2 border-white/30 transform rotate-12 hover:rotate-0 transition-all duration-700 cursor-pointer group hover:scale-125 animate-bounce w-28 h-28" style={{animationDelay: '0.6s'}}>
                  <div className="text-center">
                    <div className="text-2xl mb-1 group-hover:animate-bounce">⚡</div>
                    <div className="text-sm font-bold">Escalable</div>
                    <div className="text-xs opacity-90">100%</div>
                  </div>
                  {/* Efecto de energía */}
                  <div className="absolute inset-0 w-0 h-0 border-l-[8px] border-l-yellow-300 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent transform rotate-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                </div>
                
                {/* Tarjeta 3 - Inferior Izquierda - Uptime 99.9% */}
                <div className="absolute bottom-10 left-10 bg-gradient-to-r from-violet-500 to-purple-500 text-white p-5 rounded-2xl shadow-xl border-2 border-white/30 transform -rotate-12 hover:rotate-0 transition-all duration-700 cursor-pointer group hover:scale-125 animate-bounce w-28 h-28" style={{animationDelay: '0.3s'}}>
                  <div className="text-center">
                    <div className="text-2xl mb-1 group-hover:animate-ping">⚡</div>
                    <div className="text-sm font-bold">Uptime</div>
                    <div className="text-xs opacity-90">99.9%</div>
                  </div>
                  {/* Efecto de cristal */}
                  <div className="absolute inset-0 border border-white/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                </div>
                
                {/* Tarjeta 4 - Inferior Derecha - Evolución continua */}
                <div className="absolute bottom-10 right-10 bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-5 rounded-2xl shadow-xl border-2 border-white/30 transform rotate-12 hover:rotate-0 transition-all duration-700 cursor-pointer group hover:scale-125 animate-bounce w-28 h-28" style={{animationDelay: '1s'}}>
                  <div className="text-center">
                    <div className="text-2xl mb-1 group-hover:animate-spin">🎯</div>
                    <div className="text-sm font-bold">Evolución</div>
                    <div className="text-xs opacity-90">continua</div>
                  </div>
                  {/* Efecto de red */}
                  <div className="absolute inset-0 border-2 border-white/20 border-dashed rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                </div>
                
                {/* Líneas de conexión animadas */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 384 384">
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.6"/>
                      <stop offset="100%" stopColor="#EC4899" stopOpacity="0.6"/>
                    </linearGradient>
                  </defs>
                  <path d="M192 192 L 96 96 M 192 192 L 288 96 M 192 192 L 96 288 M 192 192 L 288 288" 
                        stroke="url(#lineGradient)" 
                        strokeWidth="2" 
                        fill="none" 
                        strokeDasharray="5,5"
                        className="animate-pulse"/>
                </svg>
                
                {/* Efecto de ondas concéntricas */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-purple-400/30 rounded-full animate-ping opacity-20"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-blue-400/20 rounded-full animate-ping opacity-20" style={{animationDelay: '0.5s'}}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Noticias - DISEÑO HERO CON GRADIENTES AZUL-PÚRPURA-ROSA */}
      <section id="noticias" className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
        {/* Elementos de fondo sutiles */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(147,51,234,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-6 py-2 text-sm shadow-lg rounded-full inline-block">
              📰 Últimas Noticias
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Mantente al Día con la
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"> Revolución IA</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Las últimas tendencias, innovaciones y casos de éxito en inteligencia artificial
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Noticia 1 - IA en Retail */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-blue-200 hover:border-purple-400">
              <div className="relative overflow-hidden">
                <div className="w-full h-48 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
                  <span className="text-6xl">🤖</span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
                    Tecnología
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500">15 Enero 2025</span>
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  IA en Retail: Transformando la Experiencia del Cliente
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Chatbots inteligentes y sistemas de recomendación que aumentan las ventas en un 35%.
                </p>
                <Link href="/noticias/1" className="block w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg text-center">
                  Leer Más →
                </Link>
              </div>
            </div>
            
            {/* Noticia 2 - Automatización */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-purple-200 hover:border-pink-400">
              <div className="relative overflow-hidden">
                <div className="w-full h-48 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 flex items-center justify-center">
                  <span className="text-6xl">⚡</span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
                    Automatización
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500">12 Enero 2025</span>
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                  Automatización: El Futuro de la Eficiencia Empresarial
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Incremento del 40% en productividad y reducción del 60% en errores operativos.
                </p>
                <Link href="/noticias/2" className="block w-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg text-center">
                  Leer Más →
                </Link>
              </div>
            </div>
            
            {/* Noticia 3 - Marketing Digital */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-pink-200 hover:border-blue-400">
              <div className="relative overflow-hidden">
                <div className="w-full h-48 bg-gradient-to-br from-pink-500 via-blue-500 to-purple-500 flex items-center justify-center">
                  <span className="text-6xl">📊</span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="inline-block bg-gradient-to-r from-pink-600 to-blue-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
                    Marketing
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500">10 Enero 2025</span>
                  <div className="w-3 h-3 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full"></div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-pink-600 transition-colors">
                  Marketing Digital Inteligente: Datos y IA
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Optimiza campañas de marketing con análisis predictivo y personalización en tiempo real.
                </p>
                <Link href="/noticias/3" className="block w-full bg-gradient-to-r from-pink-600 via-blue-600 to-purple-600 hover:from-pink-700 hover:via-blue-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg text-center">
                  Leer Más →
                </Link>
              </div>
            </div>
          </div>
                 </div>
       </section>

      {/* CTA - Newsletter + PDF Gratuito */}
<section className="py-24 bg-gradient-to-br from-gray-900 via-slate-800 to-black text-white relative overflow-hidden">
  {/* Elementos decorativos de fondo */}
  <div className="absolute inset-0 opacity-20">
    <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-2xl"></div>
  </div>

  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div className="text-center mb-16">
      <div className="mb-6 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white px-8 py-3 text-sm shadow-2xl rounded-full inline-block animate-pulse">
        🚀 ACCESO EXCLUSIVO
      </div>
      <h2 className="text-5xl md:text-6xl font-black text-white mb-8 leading-tight">
        ¿Quieres Ser el Primero en
        <span className="block bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent"> Implementar IA en tu Industria?</span>
      </h2>
      <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
        Únete a nuestra comunidad de innovadores y recibe acceso anticipado a las últimas tecnologías de IA.
        <span className="text-white font-semibold"> Suscríbete HOY</span> y obtén nuestro reporte exclusivo con
        <span className="bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent font-bold"> estrategias secretas de IA que están revolucionando negocios</span>.
      </p>
    </div>
    
    {/* Formulario de suscripción mejorado */}
    <div className="max-w-3xl mx-auto">
      <div className="relative group">
        {/* Efecto de brillo exterior */}
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
        
        {/* Container principal del formulario */}
        <div className="relative bg-gradient-to-br from-slate-900/95 via-gray-900/95 to-black/95 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-emerald-500/20 shadow-2xl">
          {/* Header del formulario */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full px-6 py-2 border border-emerald-500/30 mb-4">
              <span className="text-2xl">🎯</span>
              <span className="text-emerald-300 font-semibold">OFERTA LIMITADA</span>
            </div>
            
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
              🚀 Únete a la Revolución IA
            </h3>
            
            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
              Recibe estrategias exclusivas y el <span className="text-emerald-300 font-semibold">PDF gratuito</span> con las 
              <span className="bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent font-bold"> 30 mejores ideas para aplicar IA en tu negocio</span>
            </p>
          </div>

          {/* Formulario */}
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Campo Nombre */}
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Tu nombre completo"
                  className="w-full px-6 py-4 bg-white/5 border-2 border-gray-700/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300 backdrop-blur-sm group-hover:border-gray-600/50"
                  required
                />
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>

              {/* Campo Email */}
              <div className="relative group">
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="w-full px-6 py-4 bg-white/5 border-2 border-gray-700/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300 backdrop-blur-sm group-hover:border-gray-600/50"
                  required
                />
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Campo Empresa (opcional) */}
            <div className="relative group">
              <input
                type="text"
                placeholder="Nombre de tu empresa (opcional)"
                className="w-full px-6 py-4 bg-white/5 border-2 border-gray-700/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300 backdrop-blur-sm group-hover:border-gray-600/50"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>

            {/* Checkbox de términos */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="terms"
                className="mt-1.5 w-5 h-5 bg-white/5 border-2 border-gray-700/50 rounded text-emerald-500 focus:ring-emerald-500/50 focus:ring-2"
                required
              />
              <label htmlFor="terms" className="text-sm text-gray-300 leading-relaxed">
                Acepto recibir emails con contenido exclusivo sobre IA y estrategias de negocio. 
                <span className="text-emerald-300">Puedes cancelar en cualquier momento.</span>
              </label>
            </div>

            {/* Botón de suscripción */}
            <button
              type="submit"
              className="group relative w-full overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:via-teal-500 hover:to-cyan-500 text-white font-bold py-5 px-8 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl shadow-xl"
            >
              {/* Efecto de brillo en hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <div className="relative flex items-center justify-center space-x-3">
                <span className="text-2xl">🚀</span>
                <span className="text-lg font-bold">Suscribirse Gratis + Obtener PDF</span>
                <span className="text-2xl">🎁</span>
              </div>
            </button>

            {/* Garantía de seguridad */}
            <div className="text-center pt-4">
              <p className="text-sm text-gray-400 flex items-center justify-center space-x-2">
                <span>🔒</span>
                <span>100% seguro. Sin spam. Cancela cuando quieras.</span>
              </p>
            </div>
          </form>

          {/* Beneficios destacados */}
          <div className="mt-8 pt-8 border-t border-gray-700/30">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-xl border border-emerald-500/20">
                <div className="text-2xl mb-2">📊</div>
                <h4 className="font-semibold text-white mb-1">Estrategias Probadas</h4>
                <p className="text-xs text-gray-300">30 ideas implementables</p>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-br from-teal-500/10 to-cyan-500/10 rounded-xl border border-teal-500/20">
                <div className="text-2xl mb-2">⚡</div>
                <h4 className="font-semibold text-white mb-1">Acceso Inmediato</h4>
                <p className="text-xs text-gray-300">PDF en tu email al instante</p>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl border border-cyan-500/20">
                <div className="text-2xl mb-2">🎯</div>
                <h4 className="font-semibold text-white mb-1">Contenido Exclusivo</h4>
                <p className="text-xs text-gray-300">Solo para suscriptores</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style jsx>{`
  @keyframes tilt {
    0%, 50%, 100% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(0.5deg);
    }
    75% {
      transform: rotate(-0.5deg);
    }
  }
  
  .animate-tilt {
    animation: tilt 10s infinite linear;
  }
`}</style>



      {/* NUEVA SECCIÓN: Carrusel de Tecnologías - LOGOS ORIGINALES */}
      <section id="tecnologias" className="py-20 bg-gradient-to-r from-gray-50 to-slate-100 relative overflow-hidden">
        {/* Elementos de fondo sutiles */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(147,51,234,0.05),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.05),transparent_50%)]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 text-sm shadow-lg rounded-full inline-block">
              🚀 Tecnologías de Vanguardia
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Construido con las Mejores
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Tecnologías</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Utilizamos las herramientas más avanzadas para crear soluciones IA excepcionales
            </p>
          </div>
          
          {/* Carrusel de logos - PRIMERA FILA (SIN REPETICIONES) */}
          <div className="mb-12">
            <div className="flex space-x-16 animate-scroll">
              {/* Logo 1 - Supabase */}
              <div className="flex-shrink-0 group">
                <div className="w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-blue-200 hover:border-blue-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-3xl mb-1">🗄️</div>
                    <div className="text-xs font-bold text-gray-700">Supabase</div>
                  </div>
                </div>
              </div>
              
              {/* Logo 2 - Next.js */}
              <div className="flex-shrink-0 group">
                <div className="w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-gray-200 hover:border-gray-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-3xl mb-1">▲</div>
                    <div className="text-xs font-bold text-gray-700">Next.js</div>
                  </div>
                </div>
              </div>
              
              {/* Logo 3 - TypeScript */}
              <div className="flex-shrink-0 group">
                <div className="w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-blue-200 hover:border-blue-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-3xl mb-1">📘</div>
                    <div className="text-xs font-bold text-gray-700">TypeScript</div>
                  </div>
                </div>
              </div>
              
              {/* Logo 4 - Tailwind CSS */}
              <div className="flex-shrink-0 group">
                <div className="w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-cyan-200 hover:border-cyan-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-3xl mb-1">🎨</div>
                    <div className="text-xs font-bold text-gray-700">Tailwind</div>
                  </div>
                </div>
              </div>
              
              {/* Logo 5 - Node.js */}
              <div className="flex-shrink-0 group">
                <div className="w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-green-200 hover:border-green-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-3xl mb-1">🟢</div>
                    <div className="text-xs font-bold text-gray-700">Node.js</div>
                  </div>
                </div>
              </div>
              
              {/* Logo 6 - Python */}
              <div className="flex-shrink-0 group">
                <div className="w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-yellow-200 hover:border-yellow-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-3xl mb-1">🐍</div>
                    <div className="text-xs font-bold text-gray-700">Python</div>
                  </div>
                </div>
              </div>
              
              {/* Logo 7 - Cloudinary */}
              <div className="flex-shrink-0 group">
                <div className="w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-orange-200 hover:border-orange-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-3xl mb-1">☁️</div>
                    <div className="text-xs font-bold text-gray-700">Cloudinary</div>
                  </div>
                </div>
              </div>
              
              {/* Logo 8 - OpenAI */}
              <div className="flex-shrink-0 group">
                <div className="w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-purple-200 hover:border-purple-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-3xl mb-1">🤖</div>
                    <div className="text-xs font-bold text-gray-700">OpenAI</div>
                  </div>
                </div>
              </div>
              
              {/* Logo 9 - Firestore */}
              <div className="flex-shrink-0 group">
                <div className="w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-orange-200 hover:border-orange-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-3xl mb-1">🔥</div>
                    <div className="text-xs font-bold text-gray-700">Firestore</div>
                  </div>
                </div>
              </div>
              
              {/* Logo 9.5 - VS Code */}
              <div className="flex-shrink-0 group">
                <div className="w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-blue-200 hover:border-blue-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-3xl mb-1">💻</div>
                    <div className="text-xs font-bold text-gray-700">VS Code</div>
                  </div>
                </div>
              </div>
              
              {/* Logo 10 - Docker */}
              <div className="flex-shrink-0 group">
                <div className="w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-blue-200 hover:border-blue-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-3xl mb-1">🐳</div>
                    <div className="text-xs font-bold text-gray-700">Docker</div>
                  </div>
                </div>
              </div>
              
              {/* Logo 11 - Javascript */}
              <div className="flex-shrink-0 group">
                <div className="w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-blue-200 hover:border-blue-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-3xl mb-1">💛</div>
                    <div className="text-xs font-bold text-gray-700">Javascript</div>
                  </div>
                </div>
              </div>
              
              {/* Logo 12 - MongoDB */}
              <div className="flex-shrink-0 group">
                <div className="w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-green-200 hover:border-green-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-3xl mb-1">🍃</div>
                    <div className="text-xs font-bold text-gray-700">MongoDB</div>
                  </div>
                </div>
              </div>
              
              {/* Logo 13 - Firebase */}
              <div className="flex-shrink-0 group">
                <div className="w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-orange-200 hover:border-orange-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-3xl mb-1">🔥</div>
                    <div className="text-xs font-bold text-gray-700">Firebase</div>
                  </div>
                </div>
              </div>
              
              {/* Logo 14 - Google */}
              <div className="flex-shrink-0 group">
                <div className="w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-red-200 hover:border-red-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-3xl mb-1">🔍</div>
                    <div className="text-xs font-bold text-gray-700">Google</div>
                  </div>
                </div>
              </div>
              
              {/* DUPLICADO PARA FLUIDEZ - Logo 1 - Supabase */}
              <div className="flex-shrink-0 group">
                <div className="w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-blue-200 hover:border-blue-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-3xl mb-1">🗄️</div>
                    <div className="text-xs font-bold text-gray-700">Supabase</div>
                  </div>
                </div>
              </div>
              
              {/* DUPLICADO PARA FLUIDEZ - Logo 2 - Next.js */}
              <div className="flex-shrink-0 group">
                <div className="w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-gray-200 hover:border-gray-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-3xl mb-1">▲</div>
                    <div className="text-xs font-bold text-gray-700">Next.js</div>
                  </div>
                </div>
              </div>
              
              {/* DUPLICADO PARA FLUIDEZ - Logo 3 - TypeScript */}
              <div className="flex-shrink-0 group">
                <div className="w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-blue-200 hover:border-blue-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-3xl mb-1">📘</div>
                    <div className="text-xs font-bold text-gray-700">TypeScript</div>
                  </div>
                </div>
              </div>
              
              {/* DUPLICADO PARA FLUIDEZ - Logo 4 - Tailwind CSS */}
              <div className="flex-shrink-0 group">
                <div className="w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-cyan-200 hover:border-cyan-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-3xl mb-1">🎨</div>
                    <div className="text-xs font-bold text-gray-700">Tailwind</div>
                  </div>
                </div>
              </div>
              
              {/* DUPLICADO PARA FLUIDEZ - Logo 5 - Node.js */}
              <div className="flex-shrink-0 group">
                <div className="w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-green-200 hover:border-green-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-3xl mb-1">🟢</div>
                    <div className="text-xs font-bold text-gray-700">Node.js</div>
                  </div>
                </div>
              </div>
              
              {/* DUPLICADO PARA FLUIDEZ - Logo 6 - Python */}
              <div className="flex-shrink-0 group">
                <div className="w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-yellow-200 hover:border-yellow-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-3xl mb-1">🐍</div>
                    <div className="text-xs font-bold text-gray-700">Python</div>
                  </div>
                </div>
              </div>
              
              {/* DUPLICADO PARA FLUIDEZ - Logo 7 - Cloudinary */}
              <div className="flex-shrink-0 group">
                <div className="w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-orange-200 hover:border-orange-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-3xl mb-1">☁️</div>
                    <div className="text-xs font-bold text-gray-700">Cloudinary</div>
                  </div>
                </div>
              </div>
              
              {/* DUPLICADO PARA FLUIDEZ - Logo 8 - OpenAI */}
              <div className="flex-shrink-0 group">
                <div className="w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-purple-200 hover:border-purple-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-3xl mb-1">🧠</div>
                    <div className="text-xs font-bold text-gray-700">OpenAI</div>
                  </div>
                </div>
              </div>
              
              {/* DUPLICADO PARA FLUIDEZ - Logo 9 - Firestore */}
              <div className="flex-shrink-0 group">
                <div className="w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-orange-200 hover:border-orange-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-3xl mb-1">🔥</div>
                    <div className="text-xs font-bold text-gray-700">Firestore</div>
                  </div>
                </div>
              </div>
              
              {/* DUPLICADO PARA FLUIDEZ - Logo 10 - Docker */}
              <div className="flex-shrink-0 group">
                <div className="w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-blue-200 hover:border-blue-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-3xl mb-1">🐳</div>
                    <div className="text-xs font-bold text-gray-700">Docker</div>
                  </div>
                </div>
              </div>
              
              {/* DUPLICADO PARA FLUIDEZ - Logo 11 - Javascript */}
              <div className="flex-shrink-0 group">
                <div className="w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-yellow-200 hover:border-yellow-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-3xl mb-1">💛</div>
                    <div className="text-xs font-bold text-gray-700">Javascript</div>
                  </div>
                </div>
              </div>
              
              {/* DUPLICADO PARA FLUIDEZ - Logo 12 - MongoDB */}
              <div className="flex-shrink-0 group">
                <div className="w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-green-200 hover:border-green-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-3xl mb-1">🍃</div>
                    <div className="text-xs font-bold text-gray-700">MongoDB</div>
                  </div>
                </div>
              </div>
              
              {/* DUPLICADO PARA FLUIDEZ - Logo 13 - Firebase */}
              <div className="flex-shrink-0 group">
                <div className="w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-orange-200 hover:border-orange-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-3xl mb-1">🔥</div>
                    <div className="text-xs font-bold text-gray-700">Firebase</div>
                  </div>
                </div>
              </div>
              
              {/* DUPLICADO PARA FLUIDEZ - Logo 14 - Google */}
              <div className="flex-shrink-0 group">
                <div className="w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-red-200 hover:border-red-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-3xl mb-1">🔍</div>
                    <div className="text-xs font-bold text-gray-700">Google</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Carrusel de logos - SEGUNDA FILA (SIN REPETICIONES) */}
          <div className="mb-12">
            <div className="flex space-x-12 animate-scroll-slow">
              {/* Logo 1 - PostgreSQL */}
              <div className="flex-shrink-0 group">
                <div className="w-20 h-20 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-blue-200 hover:border-blue-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-2xl mb-1">🐘</div>
                    <div className="text-xs font-bold text-gray-700">PostgreSQL</div>
                  </div>
                </div>
              </div>
              
              {/* Logo 2 - Redis */}
              <div className="flex-shrink-0 group">
                <div className="w-20 h-20 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-red-200 hover:border-red-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-2xl mb-1">🔴</div>
                    <div className="text-xs font-bold text-gray-700">Redis</div>
                  </div>
                </div>
              </div>
              
              {/* Logo 3 - Wordpress */}
              <div className="flex-shrink-0 group">
                <div className="w-20 h-20 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-pink-200 hover:border-pink-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-2xl mb-1">📝</div>
                    <div className="text-xs font-bold text-gray-700">Wordpress</div>
                  </div>
                </div>
              </div>
              
              {/* Logo 4 - n8n */}
              <div className="flex-shrink-0 group">
                <div className="w-20 h-20 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-green-200 hover:border-green-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-2xl mb-1">🔄</div>
                    <div className="text-xs font-bold text-gray-700">n8n</div>
                  </div>
                </div>
              </div>
              
              {/* Logo 5 - shadcn/ui */}
              <div className="flex-shrink-0 group">
                <div className="w-20 h-20 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-green-200 hover:border-green-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-2xl mb-1">🎨</div>
                    <div className="text-xs font-bold text-gray-700">shadcn/ui</div>
                  </div>
                </div>
              </div>
              
              {/* Logo 6 - Vercel */}
              <div className="flex-shrink-0 group">
                <div className="w-20 h-20 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-black hover:border-gray-600 hover:scale-110">
                  <div className="text-center">
                    <div className="text-2xl mb-1">▲</div>
                    <div className="text-xs font-bold text-gray-700">Vercel</div>
                  </div>
                </div>
              </div>
              
              {/* Logo 7 - GitHub */}
              <div className="flex-shrink-0 group">
                <div className="w-20 h-20 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-gray-200 hover:border-gray-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-2xl mb-1">🐙</div>
                    <div className="text-xs font-bold text-gray-700">GitHub</div>
                  </div>
                </div>
              </div>
              
              {/* Logo 8 - Prisma ORM */}
              <div className="flex-shrink-0 group">
                <div className="w-20 h-20 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-purple-200 hover:border-purple-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-2xl mb-1">🗃️</div>
                    <div className="text-xs font-bold text-gray-700">Prisma ORM</div>
                  </div>
                </div>
              </div>
              
              {/* Logo 9 - Webpay */}
              <div className="flex-shrink-0 group">
                <div className="w-20 h-20 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-purple-200 hover:border-purple-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-2xl mb-1">💳</div>
                    <div className="text-xs font-bold text-gray-700">Webpay</div>
                  </div>
                </div>
              </div>
              
              {/* Logo 10 - SendGrid */}
              <div className="flex-shrink-0 group">
                <div className="w-20 h-20 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-blue-200 hover:border-blue-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-2xl mb-1">📧</div>
                    <div className="text-xs font-bold text-gray-700">SendGrid</div>
                  </div>
                </div>
              </div>
              
              {/* Logo 11 - Zapier */}
              <div className="flex-shrink-0 group">
                <div className="w-20 h-20 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-orange-200 hover:border-orange-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-2xl mb-1">⚡</div>
                    <div className="text-xs font-bold text-gray-700">Zapier</div>
                  </div>
                </div>
              </div>
              
              {/* Logo 12 - Shopify */}
              <div className="flex-shrink-0 group">
                <div className="w-20 h-20 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-green-200 hover:border-green-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-2xl mb-1">🛍️</div>
                    <div className="text-xs font-bold text-gray-700">Shopify</div>
                  </div>
                </div>
              </div>
              
              {/* Logo 13 - Airtable */}
              <div className="flex-shrink-0 group">
                <div className="w-20 h-20 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-blue-200 hover:border-blue-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-2xl mb-1">📊</div>
                    <div className="text-xs font-bold text-gray-700">Airtable</div>
                  </div>
                </div>
              </div>
              
              {/* Logo 14 - SQL Server */}
              <div className="flex-shrink-0 group">
                <div className="w-20 h-20 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-red-200 hover:border-red-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-2xl mb-1">🗄️</div>
                    <div className="text-xs font-bold text-gray-700">SQL Server</div>
                  </div>
                </div>
              </div>
              
              {/* Logo 15 - Make */}
              <div className="flex-shrink-0 group">
                <div className="w-20 h-20 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-purple-200 hover:border-purple-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-2xl mb-1">🔧</div>
                    <div className="text-xs font-bold text-gray-700">Make</div>
                  </div>
                </div>
              </div>
              
              {/* Logo 16 - Power BI */}
              <div className="flex-shrink-0 group">
                <div className="w-20 h-20 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-yellow-200 hover:border-yellow-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-2xl mb-1">📈</div>
                    <div className="text-xs font-bold text-gray-700">Power BI</div>
                  </div>
                </div>
              </div>
              
              {/* Logo 17 - VS Code */}
              <div className="flex-shrink-0 group">
                <div className="w-20 h-20 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-blue-200 hover:border-blue-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-2xl mb-1">💻</div>
                    <div className="text-xs font-bold text-gray-700">VS Code</div>
                  </div>
                </div>
              </div>
              
              {/* Logo 18 - Bootstrap */}
              <div className="flex-shrink-0 group">
                <div className="w-20 h-20 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-purple-200 hover:border-purple-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-2xl mb-1">🎯</div>
                    <div className="text-xs font-bold text-gray-700">Bootstrap</div>
                  </div>
                </div>
              </div>
              
              {/* Logo 19 - Tableau */}
              <div className="flex-shrink-0 group">
                <div className="w-20 h-20 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-orange-200 hover:border-orange-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-2xl mb-1">📊</div>
                    <div className="text-xs font-bold text-gray-700">Tableau</div>
                  </div>
                </div>
              </div>
              
              {/* DUPLICADO PARA FLUIDEZ - Logo 1 - PostgreSQL */}
              <div className="flex-shrink-0 group">
                <div className="w-20 h-20 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-blue-200 hover:border-blue-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-2xl mb-1">🐘</div>
                    <div className="text-xs font-bold text-gray-700">PostgreSQL</div>
                  </div>
                </div>
              </div>
              
              {/* DUPLICADO PARA FLUIDEZ - Logo 2 - Redis */}
              <div className="flex-shrink-0 group">
                <div className="w-20 h-20 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-red-200 hover:border-red-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-2xl mb-1">🔴</div>
                    <div className="text-xs font-bold text-gray-700">Redis</div>
                  </div>
                </div>
              </div>
              
              {/* DUPLICADO PARA FLUIDEZ - Logo 3 - Wordpress */}
              <div className="flex-shrink-0 group">
                <div className="w-20 h-20 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-pink-200 hover:border-pink-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-2xl mb-1">📝</div>
                    <div className="text-xs font-bold text-gray-700">Wordpress</div>
                  </div>
                </div>
              </div>
              
              {/* DUPLICADO PARA FLUIDEZ - Logo 4 - n8n */}
              <div className="flex-shrink-0 group">
                <div className="w-20 h-20 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-green-200 hover:border-green-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-2xl mb-1">🔄</div>
                    <div className="text-xs font-bold text-gray-700">n8n</div>
                  </div>
                </div>
              </div>
              
              {/* DUPLICADO PARA FLUIDEZ - Logo 5 - shadcn/ui */}
              <div className="flex-shrink-0 group">
                <div className="w-20 h-20 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-green-200 hover:border-green-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-2xl mb-1">🎨</div>
                    <div className="text-xs font-bold text-gray-700">shadcn/ui</div>
                  </div>
                </div>
              </div>
              
              {/* DUPLICADO PARA FLUIDEZ - Logo 6 - Vercel */}
              <div className="flex-shrink-0 group">
                <div className="w-20 h-20 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-black hover:border-gray-600 hover:scale-110">
                  <div className="text-center">
                    <div className="text-2xl mb-1">▲</div>
                    <div className="text-xs font-bold text-gray-700">Vercel</div>
                  </div>
                </div>
              </div>
              
              {/* DUPLICADO PARA FLUIDEZ - Logo 7 - GitHub */}
              <div className="flex-shrink-0 group">
                <div className="w-20 h-20 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-gray-200 hover:border-gray-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-2xl mb-1">🐙</div>
                    <div className="text-xs font-bold text-gray-700">GitHub</div>
                  </div>
                </div>
              </div>
              
              {/* DUPLICADO PARA FLUIDEZ - Logo 8 - Prisma ORM */}
              <div className="flex-shrink-0 group">
                <div className="w-20 h-20 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-purple-200 hover:border-purple-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-2xl mb-1">🗃️</div>
                    <div className="text-xs font-bold text-gray-700">Prisma ORM</div>
                  </div>
                </div>
              </div>
              
              {/* DUPLICADO PARA FLUIDEZ - Logo 9 - Webpay */}
              <div className="flex-shrink-0 group">
                <div className="w-20 h-20 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-purple-200 hover:border-purple-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-2xl mb-1">💳</div>
                    <div className="text-xs font-bold text-gray-700">Webpay</div>
                  </div>
                </div>
              </div>
              
              {/* DUPLICADO PARA FLUIDEZ - Logo 10 - SendGrid */}
              <div className="flex-shrink-0 group">
                <div className="w-20 h-20 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-blue-200 hover:border-blue-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-2xl mb-1">📧</div>
                    <div className="text-xs font-bold text-gray-700">SendGrid</div>
                  </div>
                </div>
              </div>
              
              {/* DUPLICADO PARA FLUIDEZ - Logo 11 - Zapier */}
              <div className="flex-shrink-0 group">
                <div className="w-20 h-20 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-orange-200 hover:border-orange-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-2xl mb-1">⚡</div>
                    <div className="text-xs font-bold text-gray-700">Zapier</div>
                  </div>
                </div>
              </div>
              
              {/* DUPLICADO PARA FLUIDEZ - Logo 12 - Shopify */}
              <div className="flex-shrink-0 group">
                <div className="w-20 h-20 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-green-200 hover:border-green-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-2xl mb-1">🛍️</div>
                    <div className="text-xs font-bold text-gray-700">Shopify</div>
                  </div>
                </div>
              </div>
              
              {/* DUPLICADO PARA FLUIDEZ - Logo 13 - Airtable */}
              <div className="flex-shrink-0 group">
                <div className="w-20 h-20 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-blue-200 hover:border-blue-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-2xl mb-1">📊</div>
                    <div className="text-xs font-bold text-gray-700">Airtable</div>
                  </div>
                </div>
              </div>
              
              {/* DUPLICADO PARA FLUIDEZ - Logo 14 - SQL Server */}
              <div className="flex-shrink-0 group">
                <div className="w-20 h-20 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-red-200 hover:border-red-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-2xl mb-1">🗄️</div>
                    <div className="text-xs font-bold text-gray-700">SQL Server</div>
                  </div>
                </div>
              </div>
              
              {/* DUPLICADO PARA FLUIDEZ - Logo 15 - Make */}
              <div className="flex-shrink-0 group">
                <div className="w-20 h-20 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-purple-200 hover:border-purple-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-2xl mb-1">🔧</div>
                    <div className="text-xs font-bold text-gray-700">Make</div>
                  </div>
                </div>
              </div>
              
              {/* DUPLICADO PARA FLUIDEZ - Logo 16 - Power BI */}
              <div className="flex-shrink-0 group">
                <div className="w-20 h-20 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-yellow-200 hover:border-yellow-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-2xl mb-1">📈</div>
                    <div className="text-xs font-bold text-gray-700">Power BI</div>
                  </div>
                </div>
              </div>
              
              {/* DUPLICADO PARA FLUIDEZ - Logo 17 - VS Code */}
              <div className="flex-shrink-0 group">
                <div className="w-20 h-20 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-blue-200 hover:border-blue-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-2xl mb-1">💻</div>
                    <div className="text-xs font-bold text-gray-700">VS Code</div>
                  </div>
                </div>
              </div>
              
              {/* DUPLICADO PARA FLUIDEZ - Logo 18 - Bootstrap */}
              <div className="flex-shrink-0 group">
                <div className="w-20 h-20 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-purple-200 hover:border-purple-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-2xl mb-1">🎯</div>
                    <div className="text-xs font-bold text-gray-700">Bootstrap</div>
                  </div>
                </div>
              </div>
              
              {/* DUPLICADO PARA FLUIDEZ - Logo 19 - Tableau */}
              <div className="flex-shrink-0 group">
                <div className="w-20 h-20 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-orange-200 hover:border-orange-400 hover:scale-110">
                  <div className="text-center">
                    <div className="text-2xl mb-1">📊</div>
                    <div className="text-xs font-bold text-gray-700">Tableau</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Texto explicativo */}
          <div className="text-center mt-16">
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Nuestro stack tecnológico combina las mejores herramientas del mercado para crear 
              <span className="font-semibold text-gray-800"> soluciones IA robustas, escalables y de alto rendimiento</span>
            </p>
          </div>
        </div>
      </section>

         {/* Footer Estándar */}
            <Footer />

             {/* Estilos del carrusel manejados por CSS global */}
       
       <script dangerouslySetInnerHTML={{
         __html: `
           window.addEventListener('scroll', function() {
             const header = document.getElementById('header');
             const brandTitle = document.getElementById('brandTitle');
             const navLinks = document.querySelectorAll('.nav-link');
             if (window.scrollY > 100) {
               header.classList.add('bg-white/95', 'backdrop-blur-md', 'shadow-lg');
               header.classList.remove('bg-transparent');
               if (brandTitle) brandTitle.classList.replace('text-white','text-slate-800');
               navLinks.forEach(l => { l.classList.remove('text-white'); l.classList.add('text-slate-800'); });
             } else {
               header.classList.remove('bg-white/95', 'backdrop-blur-md', 'shadow-lg');
               header.classList.add('bg-transparent');
               if (brandTitle) brandTitle.classList.replace('text-slate-800','text-white');
               navLinks.forEach(l => { l.classList.remove('text-slate-800'); l.classList.add('text-white'); });
             }
           });
         `
       }} />

      
    </div>
  )
}
