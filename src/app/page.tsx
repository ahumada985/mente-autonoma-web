'use client'

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
              <a href="#noticias" className="nav-link text-white hover:text-blue-400 px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Noticias
              </a>
              <a href="#contacto" className="nav-link text-white hover:text-blue-400 px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Contacto
              </a>
            </nav>
            
            {/* CTA Button - DISEÑO NUEVO */}
            <div className="flex items-center space-x-4">
              <button className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl border-0 backdrop-blur-sm">
                Solicitar Demo
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
            <div className="mb-6 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white px-8 py-3 text-sm shadow-lg rounded-full inline-block backdrop-blur-sm border border-white/20">
              ⚡ La IA del Futuro, Hoy
            </div>
            
            {/* Título principal completamente renovado - NUEVO ESTILO */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Transforma tu
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-2xl"> Empresa</span>
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
              <button className="group relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white text-lg px-10 py-5 rounded-3xl font-bold transition-all duration-500 transform hover:scale-110 hover:shadow-2xl shadow-xl flex items-center gap-4 border-2 border-white/20 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <div className="w-0 h-0 border-l-[10px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent"></div>
                </div>
                <span className="relative z-10">Ver Demo en Vivo</span>
                <div className="relative z-10 w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </button>
              
              <button className="group relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white text-lg px-10 py-5 rounded-3xl font-bold transition-all duration-500 transform hover:scale-110 hover:shadow-2xl shadow-xl flex items-center gap-4 border-2 border-white/20 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <div className="w-0 h-0 border-l-[10px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent transform rotate-45"></div>
                </div>
                <span className="relative z-10">Explorar Servicios</span>
                <div className="relative z-10 w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios Section - DISEÑO COMPLETAMENTE NUEVO CON FONDO BLANCO */}
      <section id="servicios" className="py-24 bg-white relative overflow-hidden">
        {/* Elementos de fondo sutiles */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(16,185,129,0.05),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.05),transparent_50%)]"></div>
        
        {/* Partículas flotantes sutiles */}
        <div className="absolute top-20 left-20 w-3 h-3 bg-emerald-400/30 rounded-full animate-ping"></div>
        <div className="absolute top-40 right-32 w-2 h-2 bg-blue-400/30 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-32 w-4 h-4 bg-indigo-400/50 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="mb-6 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white px-8 py-3 text-sm shadow-2xl rounded-full inline-block backdrop-blur-sm border border-amber-200">
              ⚡ Servicios de Vanguardia
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-8 leading-tight">
              Soluciones IA que
              <span className="block bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent"> Revolucionan tu Negocio</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Cada servicio está diseñado para maximizar el potencial de tu empresa con tecnología de punta
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {/* Servicio 1 - Chatbot Inteligente - COLOR ÚNICO: NARANJA */}
            <div className="group relative overflow-hidden bg-white rounded-3xl p-8 border-2 border-orange-200 hover:border-orange-400 transition-all duration-700 transform hover:-translate-y-4 hover:scale-105 hover:shadow-2xl shadow-lg">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-700"></div>
              
              <div className="relative z-10 text-center">
                <div className="w-28 h-28 mx-auto mb-8 rounded-3xl bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500 group-hover:rotate-3">
                  <span className="text-6xl">🤖</span>
                </div>
                
                <h3 className="text-3xl font-black text-gray-900 mb-6 group-hover:text-orange-600 transition-colors duration-500">
                  Chatbot Inteligente
                </h3>
                
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Asistentes conversacionales que entienden contexto y resuelven consultas complejas con IA avanzada.
                </p>
                
                <button className="group/btn relative w-full bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 hover:from-orange-600 hover:via-amber-600 hover:to-yellow-600 text-white py-5 rounded-2xl font-bold text-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl shadow-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
                  <span className="relative z-10 flex items-center justify-center space-x-3">
                    <span>Explorar Servicio</span>
                    <span className="text-2xl group-hover/btn:translate-x-2 transition-transform duration-300">✨</span>
                  </span>
                </button>
              </div>
            </div>

            {/* Servicio 2 - Diseño Web Inteligente - COLOR ÚNICO: AZUL */}
            <div className="group relative overflow-hidden bg-white rounded-3xl p-8 border-2 border-blue-200 hover:border-blue-400 transition-all duration-700 transform hover:-translate-y-4 hover:scale-105 hover:shadow-2xl shadow-lg">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-700"></div>
              
              <div className="relative z-10 text-center">
                <div className="w-28 h-28 mx-auto mb-8 rounded-3xl bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500 group-hover:-rotate-3">
                  <span className="text-6xl">🌐</span>
                </div>
                
                <h3 className="text-3xl font-black text-gray-900 mb-6 group-hover:text-blue-600 transition-colors duration-500">
                  Diseño Web Inteligente
                </h3>
                
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Sitios web que se adaptan automáticamente y optimizan la experiencia del usuario con IA.
                </p>
                
                <button className="group/btn relative w-full bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 hover:from-blue-600 hover:via-cyan-600 hover:to-teal-600 text-white py-5 rounded-2xl font-bold text-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl shadow-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
                  <span className="relative z-10 flex items-center justify-center space-x-3">
                    <span>Explorar Servicio</span>
                    <span className="text-2xl group-hover/btn:translate-x-2 transition-transform duration-300">✨</span>
                  </span>
                </button>
              </div>
            </div>

            {/* Servicio 3 - Automatización de Procesos - COLOR ÚNICO: VERDE */}
            <div className="group relative overflow-hidden bg-white rounded-3xl p-8 border-2 border-green-200 hover:border-green-400 transition-all duration-700 transform hover:-translate-y-4 hover:scale-105 hover:shadow-2xl shadow-lg">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-700"></div>
              
              <div className="relative z-10 text-center">
                <div className="w-28 h-28 mx-auto mb-8 rounded-3xl bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500 group-hover:rotate-6">
                  <span className="text-6xl">⚡</span>
                </div>
                
                <h3 className="text-3xl font-black text-gray-900 mb-6 group-hover:text-emerald-600 transition-colors duration-500">
                  Automatización de Procesos
                </h3>
                
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Optimiza flujos de trabajo y elimina tareas repetitivas con IA avanzada y machine learning.
                </p>
                
                <button className="group/btn relative w-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white py-5 rounded-2xl font-bold text-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl shadow-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
                  <span className="relative z-10 flex items-center justify-center space-x-3">
                    <span>Explorar Servicio</span>
                    <span className="text-2xl group-hover/btn:translate-x-2 transition-transform duration-300">✨</span>
                  </span>
                </button>
              </div>
            </div>

            {/* Servicio 4 - Asistente de Ventas - COLOR ÚNICO: PÚRPURA */}
            <div className="group relative overflow-hidden bg-white rounded-3xl p-8 border-2 border-purple-200 hover:border-purple-400 transition-all duration-700 transform hover:-translate-y-4 hover:scale-105 hover:shadow-2xl shadow-lg">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-700"></div>
              
              <div className="relative z-10 text-center">
                <div className="w-28 h-28 mx-auto mb-8 rounded-3xl bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500 group-hover:-rotate-6">
                  <span className="text-6xl">💼</span>
                </div>
                
                <h3 className="text-3xl font-black text-gray-900 mb-6 group-hover:text-purple-600 transition-colors duration-500">
                  Asistente de Ventas
                </h3>
                
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  IA que identifica leads calificados y optimiza el proceso de ventas con análisis predictivo.
                </p>
                
                <button className="group/btn relative w-full bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 hover:from-purple-600 hover:via-pink-600 hover:to-rose-600 text-white py-5 rounded-2xl font-bold text-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl shadow-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
                  <span className="relative z-10 flex items-center justify-center space-x-3">
                    <span>Explorar Servicio</span>
                    <span className="text-2xl group-hover/btn:translate-x-2 transition-transform duration-300">✨</span>
                  </span>
                </button>
              </div>
            </div>

            {/* Servicio 5 - Asistente Secretario IA - COLOR ÚNICO: ÍNDIGO */}
            <div className="group relative overflow-hidden bg-white rounded-3xl p-8 border-2 border-indigo-200 hover:border-indigo-400 transition-all duration-700 transform hover:-translate-y-4 hover:scale-105 hover:shadow-2xl shadow-lg">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400 rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-700"></div>
              
              <div className="relative z-10 text-center">
                <div className="w-28 h-28 mx-auto mb-8 rounded-3xl bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500 group-hover:rotate-3">
                  <span className="text-6xl">👔</span>
                </div>
                
                <h3 className="text-3xl font-black text-gray-900 mb-6 group-hover:text-indigo-600 transition-colors duration-500">
                  Asistente Secretario IA
                </h3>
                
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Gestión inteligente de agenda, emails y tareas con priorización automática y IA.
                </p>
                
                <button className="group/btn relative w-full bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 hover:from-indigo-600 hover:via-blue-600 hover:to-cyan-600 text-white py-5 rounded-2xl font-bold text-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl shadow-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
                  <span className="relative z-10 flex items-center justify-center space-x-3">
                    <span>Explorar Servicio</span>
                    <span className="text-2xl group-hover/btn:translate-x-2 transition-transform duration-300">✨</span>
                  </span>
                </button>
              </div>
            </div>

            {/* Servicio 6 - Generador de Contenido RRSS - COLOR ÚNICO: ROSA */}
            <div className="group relative overflow-hidden bg-white rounded-3xl p-8 border-2 border-pink-200 hover:border-pink-400 transition-all duration-700 transform hover:-translate-y-4 hover:scale-105 hover:shadow-2xl shadow-lg">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 via-rose-400 to-red-400 rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-700"></div>
              
              <div className="relative z-10 text-center">
                <div className="w-28 h-28 mx-auto mb-8 rounded-3xl bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500 group-hover:-rotate-3">
                  <span className="text-6xl">✍️</span>
                </div>
                
                <h3 className="text-3xl font-black text-gray-900 mb-6 group-hover:text-pink-600 transition-colors duration-500">
                  Generador de Contenido RRSS
                </h3>
                
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Creación automática de contenido viral con análisis de tendencias en tiempo real.
                </p>
                
                <button className="group/btn relative w-full bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 hover:from-pink-600 hover:via-rose-600 hover:to-red-600 text-white py-5 rounded-2xl font-bold text-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl shadow-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-rose-400 to-red-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
                  <span className="relative z-10 flex items-center justify-center space-x-3">
                    <span>Explorar Servicio</span>
                    <span className="text-2xl group-hover/btn:translate-x-2 transition-transform duration-300">✨</span>
                  </span>
                </button>
              </div>
            </div>

            {/* Servicio 7 - Análisis Predictivo - COLOR ÚNICO: TEAL */}
            <div className="group relative overflow-hidden bg-white rounded-3xl p-8 border-2 border-teal-200 hover:border-teal-400 transition-all duration-700 transform hover:-translate-y-4 hover:scale-105 hover:shadow-2xl shadow-lg">
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-700"></div>
              
              <div className="relative z-10 text-center">
                <div className="w-28 h-28 mx-auto mb-8 rounded-3xl bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500 group-hover:rotate-6">
                  <span className="text-6xl">📊</span>
                </div>
                
                <h3 className="text-3xl font-black text-gray-900 mb-6 group-hover:text-teal-600 transition-colors duration-500">
                  Análisis Predictivo
                </h3>
                
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Predicciones de mercado y comportamiento del cliente con machine learning avanzado.
                </p>
                
                <button className="group/btn relative w-full bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 hover:from-teal-600 hover:via-cyan-600 hover:to-blue-600 text-white py-5 rounded-2xl font-bold text-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl shadow-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
                  <span className="relative z-10 flex items-center justify-center space-x-3">
                    <span>Explorar Servicio</span>
                    <span className="text-2xl group-hover/btn:translate-x-2 transition-transform duration-300">✨</span>
                  </span>
                </button>
              </div>
            </div>

            {/* Servicio 8 - Integración de Sistemas - COLOR ÚNICO: AMARILLO */}
            <div className="group relative overflow-hidden bg-white rounded-3xl p-8 border-2 border-yellow-200 hover:border-yellow-400 transition-all duration-700 transform hover:-translate-y-4 hover:scale-105 hover:shadow-2xl shadow-lg">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-700"></div>
              
              <div className="relative z-10 text-center">
                <div className="w-28 h-28 mx-auto mb-8 rounded-3xl bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500 group-hover:-rotate-6">
                  <span className="text-6xl">🔗</span>
                </div>
                
                <h3 className="text-3xl font-black text-gray-900 mb-6 group-hover:text-yellow-600 transition-colors duration-500">
                  Integración de Sistemas
                </h3>
                
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Conexión inteligente entre aplicaciones SAAS, BAAS y sistemas empresariales existentes.
                </p>
                
                <button className="group/btn relative w-full bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 hover:from-yellow-600 hover:via-amber-600 hover:to-orange-600 text-white py-5 rounded-2xl font-bold text-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl shadow-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
                  <span className="relative z-10 flex items-center justify-center space-x-3">
                    <span>Explorar Servicio</span>
                    <span className="text-2xl group-hover/btn:translate-x-2 transition-transform duration-300">✨</span>
                  </span>
                </button>
              </div>
            </div>

            {/* Servicio 9 - Módulo Personalizado - COLOR ÚNICO: ROJO */}
            <div className="group relative overflow-hidden bg-white rounded-3xl p-8 border-2 border-red-200 hover:border-red-400 transition-all duration-700 transform hover:-translate-y-4 hover:scale-105 hover:shadow-2xl shadow-lg">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-700"></div>
              
              <div className="relative z-10 text-center">
                <div className="w-28 h-28 mx-auto mb-8 rounded-3xl bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500 group-hover:rotate-3">
                  <span className="text-6xl">⚙️</span>
                </div>
                
                <h3 className="text-3xl font-black text-gray-900 mb-6 group-hover:text-red-600 transition-colors duration-500">
                  Módulo Personalizado
                </h3>
                
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Soluciones IA a medida diseñadas específicamente para las necesidades de tu empresa.
                </p>
                
                <button className="group/btn relative w-full bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 hover:from-red-600 hover:via-pink-600 hover:to-purple-600 text-white py-5 rounded-2xl font-bold text-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl shadow-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
                  <span className="relative z-10 flex items-center justify-center space-x-3">
                    <span>Explorar Servicio</span>
                    <span className="text-2xl group-hover/btn:translate-x-2 transition-transform duration-300">✨</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NUEVA SECCIÓN: Por Qué Adoptar IA en las Pymes - BASADA EN IMAGEN 8 */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Elementos de fondo sutiles */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(16,185,129,0.05),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.05),transparent_50%)]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Columna Izquierda - Contenido */}
            <div className="space-y-8">
              <div className="mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-8 py-3 text-sm shadow-2xl rounded-full inline-block backdrop-blur-sm border border-blue-200">
                🚀 Transformación Digital 2025
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                ¿Por Qué Tu Pyme
                <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"> Debe Adoptar IA?</span>
              </h2>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                En la era de la inteligencia artificial, las pequeñas y medianas empresas que no implementen IA se quedarán atrás. 
                La IA no es solo para grandes corporaciones, es la herramienta que democratiza la innovación.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">📈</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Crecimiento Exponencial</h3>
                    <p className="text-gray-600">Las pymes con IA crecen 3x más rápido que las tradicionales</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">💰</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Ahorro de Costos</h3>
                    <p className="text-gray-600">Reduce gastos operativos hasta en un 40% con automatización inteligente</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Ventaja Competitiva</h3>
                    <p className="text-gray-600">Sé el primero en tu industria en implementar soluciones IA</p>
                  </div>
                </div>
              </div>
              
              <button className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                Descubre Cómo 🚀
              </button>
            </div>
            
            {/* Columna Derecha - Elemento Interactivo Perfeccionado */}
            <div className="relative">
              <div className="w-96 h-96 mx-auto relative">
                {/* Círculo central con gradiente */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full animate-pulse opacity-20"></div>
                
                {/* Recuadro Rojo - Soporte 24/7 */}
                <div className="absolute top-8 left-8 bg-gradient-to-r from-red-500 to-pink-500 text-white p-6 rounded-2xl shadow-2xl border-2 border-white/30 animate-bounce group cursor-pointer hover:scale-110 transition-transform duration-300">
                  <div className="text-center">
                    <div className="text-3xl mb-2">🔄</div>
                    <div className="text-xl font-bold">Soporte 24/7</div>
                    <div className="text-sm opacity-90">Asistencia continua</div>
                  </div>
                </div>
                
                {/* Recuadro Verde - 99.9% Uptime */}
                <div className="absolute top-8 right-8 bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6 rounded-2xl shadow-2xl border-2 border-white/30 animate-bounce group cursor-pointer hover:scale-110 transition-transform duration-300" style={{animationDelay: '0.5s'}}>
                  <div className="text-center">
                    <div className="text-3xl mb-2">⚡</div>
                    <div className="text-xl font-bold">99.9% Uptime</div>
                    <div className="text-sm opacity-90">Disponibilidad total</div>
                  </div>
                </div>
                
                {/* Recuadro Azul - 2025 Año de los Agentes IA */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white p-8 rounded-2xl shadow-2xl border-2 border-white/30 animate-pulse group cursor-pointer hover:scale-110 transition-transform duration-300">
                  <div className="text-center">
                    <div className="text-3xl mb-3">🤖</div>
                    <div className="text-xl font-bold">2025 Año de los</div>
                    <div className="text-2xl font-black">Agentes IA</div>
                    
                    {/* Elemento Interactivo Dinámico */}
                    <div className="mt-4 relative">
                      <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center animate-spin">
                        <div className="w-8 h-8 bg-white rounded-full animate-ping"></div>
                      </div>
                      <div className="absolute inset-0 w-16 h-16 mx-auto border-2 border-white/30 border-dashed rounded-full animate-spin" style={{animationDirection: 'reverse'}}></div>
                    </div>
                  </div>
                </div>
                
                {/* Elemento central flotante */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-2xl animate-ping">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                    <span className="text-3xl">⚡</span>
                  </div>
                </div>
                
                {/* Partículas flotantes adicionales */}
                <div className="absolute top-20 right-20 w-3 h-3 bg-blue-400/60 rounded-full animate-ping"></div>
                <div className="absolute bottom-20 left-20 w-2 h-2 bg-indigo-400/60 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
                <div className="absolute top-1/3 right-10 w-4 h-4 bg-purple-400/60 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
                
                {/* Líneas de conexión animadas */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 384 384">
                  <defs>
                    <linearGradient id="line1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8"/>
                      <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.8"/>
                    </linearGradient>
                  </defs>
                  <line x1="192" y1="192" x2="192" y2="96" stroke="url(#line1)" strokeWidth="2" className="animate-pulse"/>
                  <line x1="192" y1="192" x2="288" y2="96" stroke="url(#line1)" strokeWidth="2" className="animate-pulse" style={{animationDelay: '0.5s'}}/>
                  <line x1="192" y1="192" x2="192" y2="288" stroke="url(#line1)" strokeWidth="2" className="animate-pulse" style={{animationDelay: '1s'}}/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Noticias - FONDO BLANCO, CONSERVADORA Y FORMAL */}
      <section id="noticias" className="py-20 bg-white relative overflow-hidden">
        {/* Elementos de fondo sutiles */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(147,51,234,0.05),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.05),transparent_50%)]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 text-sm shadow-lg rounded-full inline-block">
              📰 Últimas Noticias
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Mantente al Día con la
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Revolución IA</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Las últimas tendencias, innovaciones y casos de éxito en inteligencia artificial
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Noticia 1 - Preparada para imagen */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
              <div className="relative overflow-hidden">
                <div className="w-full h-48 bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                  <span className="text-6xl">🚀</span>
                  {/* Aquí irá la imagen que me pases */}
                </div>
                <div className="absolute top-4 right-4">
                  <span className="inline-block bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
                    Innovación
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500">15 Mar 2025</span>
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  Chatbots que Entienden el Contexto
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Descubre cómo la nueva generación de IA conversacional está revolucionando la atención al cliente.
                </p>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Leer Más →
                </button>
              </div>
            </div>
            
            {/* Noticia 2 - Preparada para imagen */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
              <div className="relative overflow-hidden">
                <div className="w-full h-48 bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                  <span className="text-6xl">💼</span>
                  {/* Aquí irá la imagen que me pases */}
                </div>
                <div className="absolute top-4 right-4">
                  <span className="inline-block bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
                    Pymes
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500">12 Mar 2025</span>
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  IA para Pequeñas Empresas
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Cómo las pymes están implementando inteligencia artificial para crecer exponencialmente.
                </p>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Leer Más →
                </button>
              </div>
            </div>
            
            {/* Noticia 3 - Preparada para imagen */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
              <div className="relative overflow-hidden">
                <div className="w-full h-48 bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                  <span className="text-6xl">🎯</span>
                  {/* Aquí irá la imagen que me pases */}
                </div>
                <div className="absolute top-4 right-4">
                  <span className="inline-block bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
                    Automatización
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500">10 Mar 2025</span>
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  Flujos de Trabajo Inteligentes
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Optimiza tus procesos empresariales con flujos de trabajo impulsados por IA.
                </p>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Leer Más →
                </button>
              </div>
            </div>
          </div>
                 </div>
       </section>
 

 

 
              {/* Sección de Tecnologías - COMPLETAMENTE REDISEÑADA DESDE CERO */}
       <section className="py-24 bg-white relative overflow-hidden">
         {/* Elementos de fondo creativos */}
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(59,130,246,0.08),transparent_50%)]"></div>
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(147,51,234,0.08),transparent_50%)]"></div>
         
         {/* Partículas flotantes animadas */}
         <div className="absolute top-20 left-20 w-4 h-4 bg-blue-400/40 rounded-full animate-bounce"></div>
         <div className="absolute top-40 right-32 w-3 h-3 bg-purple-400/40 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
         <div className="absolute bottom-32 left-32 w-5 h-5 bg-indigo-400/40 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
         <div className="absolute bottom-20 right-20 w-2 h-2 bg-blue-300/50 rounded-full animate-bounce" style={{animationDelay: '1.5s'}}></div>
         
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           {/* Header Section */}
           <div className="text-center mb-20">
             <div className="mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-10 py-4 text-sm shadow-2xl rounded-full inline-block backdrop-blur-sm border border-blue-200">
               ⚡ Stack Tecnológico 2025
             </div>
             <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-8 leading-tight">
               Tecnologías que
               <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"> Impulsan la Innovación</span>
             </h2>
             <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
               Nuestro arsenal tecnológico de vanguardia para crear soluciones IA extraordinarias
             </p>
           </div>
           
           {/* Grid de Tecnologías Hexagonal Moderno */}
           <div className="relative mb-16">
             {/* Contenedor principal en rejilla */}
             <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
               
               {/* Python */}
               <div className="group relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-100 hover:border-blue-300 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 hover:shadow-2xl text-center">
                 <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                   <span className="text-3xl text-white font-bold">🐍</span>
                 </div>
                 <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Python</h3>
                 <p className="text-xs text-gray-600 mt-2">IA & Machine Learning</p>
               </div>
               
               {/* N8N */}
               <div className="group relative bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-100 hover:border-green-300 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 hover:shadow-2xl text-center">
                 <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                   <span className="text-3xl text-white font-bold">🔗</span>
                 </div>
                 <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors">N8N</h3>
                 <p className="text-xs text-gray-600 mt-2">Automatización</p>
               </div>
               
               {/* Make */}
               <div className="group relative bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-100 hover:border-purple-300 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 hover:shadow-2xl text-center">
                 <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                   <span className="text-3xl text-white font-bold">⚙️</span>
                 </div>
                 <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors">Make</h3>
                 <p className="text-xs text-gray-600 mt-2">Integración</p>
               </div>
               
               {/* Zapier */}
               <div className="group relative bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border-2 border-orange-100 hover:border-orange-300 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 hover:shadow-2xl text-center">
                 <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                   <span className="text-3xl text-white font-bold">⚡</span>
                 </div>
                 <h3 className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors">Zapier</h3>
                 <p className="text-xs text-gray-600 mt-2">Conectividad</p>
               </div>
               
               {/* WordPress */}
               <div className="group relative bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-100 hover:border-cyan-300 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 hover:shadow-2xl text-center">
                 <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                   <span className="text-3xl text-white font-bold">🌐</span>
                 </div>
                 <h3 className="text-lg font-bold text-gray-900 group-hover:text-cyan-600 transition-colors">WordPress</h3>
                 <p className="text-xs text-gray-600 mt-2">CMS</p>
               </div>
               
               {/* Shopify */}
               <div className="group relative bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border-2 border-emerald-100 hover:border-teal-300 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 hover:shadow-2xl text-center">
                 <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                   <span className="text-3xl text-white font-bold">🛒</span>
                 </div>
                 <h3 className="text-lg font-bold text-gray-900 group-hover:text-teal-600 transition-colors">Shopify</h3>
                 <p className="text-xs text-gray-600 mt-2">E-commerce</p>
               </div>
               
               {/* Next.js */}
               <div className="group relative bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl p-6 border-2 border-slate-100 hover:border-gray-300 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 hover:shadow-2xl text-center">
                 <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-slate-500 to-gray-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                   <span className="text-3xl text-white font-bold">⚡</span>
                 </div>
                 <h3 className="text-lg font-bold text-gray-900 group-hover:text-gray-600 transition-colors">Next.js</h3>
                 <p className="text-xs text-gray-600 mt-2">React Framework</p>
               </div>
               
               {/* Tailwind CSS */}
               <div className="group relative bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 border-2 border-teal-100 hover:border-cyan-300 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 hover:shadow-2xl text-center">
                 <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                   <span className="text-3xl text-white font-bold">🎨</span>
                 </div>
                 <h3 className="text-lg font-bold text-gray-900 group-hover:text-teal-600 transition-colors">Tailwind</h3>
                 <p className="text-xs text-gray-600 mt-2">CSS Framework</p>
               </div>
               
               {/* Shadcn/ui */}
               <div className="group relative bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-6 border-2 border-violet-100 hover:border-purple-300 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 hover:shadow-2xl text-center">
                 <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                   <span className="text-3xl text-white font-bold">🧩</span>
                 </div>
                 <h3 className="text-lg font-bold text-gray-900 group-hover:text-violet-600 transition-colors">Shadcn</h3>
                 <p className="text-xs text-gray-600 mt-2">UI Components</p>
               </div>
               
               {/* Cloudinary */}
               <div className="group relative bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl p-6 border-2 border-sky-100 hover:border-blue-300 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 hover:shadow-2xl text-center">
                 <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-sky-500 to-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                   <span className="text-3xl text-white font-bold">☁️</span>
                 </div>
                 <h3 className="text-lg font-bold text-gray-900 group-hover:text-sky-600 transition-colors">Cloudinary</h3>
                 <p className="text-xs text-gray-600 mt-2">Media Cloud</p>
               </div>
               
               {/* Google Cloud */}
               <div className="group relative bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 border-2 border-red-100 hover:border-orange-300 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 hover:shadow-2xl text-center">
                 <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                   <span className="text-3xl text-white font-bold">🌍</span>
                 </div>
                 <h3 className="text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors">Google</h3>
                 <p className="text-xs text-gray-600 mt-2">Cloud Platform</p>
               </div>
               
               {/* ChatGPT 5 */}
               <div className="group relative bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border-2 border-emerald-100 hover:border-green-300 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 hover:shadow-2xl text-center">
                 <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                   <span className="text-3xl text-white font-bold">🤖</span>
                 </div>
                 <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">ChatGPT 5</h3>
                 <p className="text-xs text-gray-600 mt-2">AI Assistant</p>
               </div>
               
               {/* Claude Code */}
               <div className="group relative bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 border-2 border-indigo-100 hover:border-blue-300 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 hover:shadow-2xl text-center">
                 <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                   <span className="text-3xl text-white font-bold">💻</span>
                 </div>
                 <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">Claude</h3>
                 <p className="text-xs text-gray-600 mt-2">Code AI</p>
               </div>
               
               {/* Firebase */}
               <div className="group relative bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border-2 border-yellow-100 hover:border-orange-300 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 hover:shadow-2xl text-center">
                 <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                   <span className="text-3xl text-white font-bold">🔥</span>
                 </div>
                 <h3 className="text-lg font-bold text-gray-900 group-hover:text-yellow-600 transition-colors">Firebase</h3>
                 <p className="text-xs text-gray-600 mt-2">Backend Service</p>
               </div>
               
               {/* Supabase */}
               <div className="group relative bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-6 border-2 border-green-100 hover:border-teal-300 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 hover:shadow-2xl text-center">
                 <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                   <span className="text-3xl text-white font-bold">🗄️</span>
                 </div>
                 <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors">Supabase</h3>
                 <p className="text-xs text-gray-600 mt-2">Database</p>
               </div>
               
               {/* Airtable */}
               <div className="group relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-100 hover:border-purple-300 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 hover:shadow-2xl text-center">
                 <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                   <span className="text-3xl text-white font-bold">📊</span>
                 </div>
                 <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Airtable</h3>
                 <p className="text-xs text-gray-600 mt-2">Data Platform</p>
               </div>
               
               {/* Prisma */}
               <div className="group relative bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl p-6 border-2 border-gray-100 hover:border-slate-300 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 hover:shadow-2xl text-center">
                 <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-gray-500 to-slate-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                   <span className="text-3xl text-white font-bold">🔧</span>
                 </div>
                 <h3 className="text-lg font-bold text-gray-900 group-hover:text-gray-600 transition-colors">Prisma</h3>
                 <p className="text-xs text-gray-600 mt-2">ORM</p>
               </div>
               
               {/* JavaScript */}
               <div className="group relative bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-6 border-2 border-yellow-100 hover:border-amber-300 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 hover:shadow-2xl text-center">
                 <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                   <span className="text-3xl text-white font-bold">📜</span>
                 </div>
                 <h3 className="text-lg font-bold text-gray-900 group-hover:text-yellow-600 transition-colors">JavaScript</h3>
                 <p className="text-xs text-gray-600 mt-2">Programming</p>
               </div>
               
               {/* TypeScript */}
               <div className="group relative bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-100 hover:border-cyan-300 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 hover:shadow-2xl text-center">
                 <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                   <span className="text-3xl text-white font-bold">🔷</span>
                 </div>
                 <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">TypeScript</h3>
                 <p className="text-xs text-gray-600 mt-2">Typed JS</p>
               </div>
               
               {/* GitHub */}
               <div className="group relative bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl p-6 border-2 border-slate-100 hover:border-gray-300 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 hover:shadow-2xl text-center">
                 <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-slate-500 to-gray-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                   <span className="text-3xl text-white font-bold">🐙</span>
                 </div>
                 <h3 className="text-lg font-bold text-gray-900 group-hover:text-slate-600 transition-colors">GitHub</h3>
                 <p className="text-xs text-gray-600 mt-2">Version Control</p>
               </div>
               
             </div>
           </div>
           
           {/* Estadísticas del Stack */}
           <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-3xl p-12 border-2 border-blue-100">
             <div className="grid md:grid-cols-4 gap-8 text-center">
               <div className="group">
                 <div className="text-4xl font-black text-blue-600 mb-2 group-hover:scale-110 transition-transform duration-300">20+</div>
                 <div className="text-gray-600 font-medium">Tecnologías</div>
               </div>
               <div className="group">
                 <div className="text-4xl font-black text-indigo-600 mb-2 group-hover:scale-110 transition-transform duration-300">99.9%</div>
                 <div className="text-gray-600 font-medium">Uptime</div>
               </div>
               <div className="group">
                 <div className="text-4xl font-black text-purple-600 mb-2 group-hover:scale-110 transition-transform duration-300">24/7</div>
                 <div className="text-gray-600 font-medium">Soporte</div>
               </div>
               <div className="group">
                 <div className="text-4xl font-black text-blue-600 mb-2 group-hover:scale-110 transition-transform duration-300">5+</div>
                 <div className="text-gray-600 font-medium">Años Experiencia</div>
               </div>
             </div>
           </div>
         </div>
       </section>
 

 

 
       {/* Sección CTA - COMPLETAMENTE REDISEÑADA CON EFECTOS AVANZADOS */}
      <section className="py-32 bg-gradient-to-br from-gray-900 via-slate-800 to-black text-white relative overflow-hidden">
        {/* Elementos de fondo creativos */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_60%)]"></div>
        
        {/* Grid de partículas animadas */}
        <div className="absolute top-16 left-16 w-4 h-4 bg-blue-400/50 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-24 w-3 h-3 bg-purple-400/50 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-24 left-24 w-5 h-5 bg-emerald-400/50 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 right-32 w-2 h-2 bg-cyan-400/50 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-1/2 left-12 w-3 h-3 bg-pink-400/50 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 right-12 w-4 h-4 bg-yellow-400/50 rounded-full animate-pulse" style={{animationDelay: '2.5s'}}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Badge superior */}
            <div className="mb-8 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-emerald-600/20 backdrop-blur-xl text-white px-10 py-4 text-sm shadow-2xl rounded-full inline-block border border-white/20">
              🌟 El Momento es Ahora
            </div>
            
            {/* Título principal */}
            <h2 className="text-6xl md:text-7xl font-black mb-8 leading-tight">
              Transforma tu
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent drop-shadow-2xl"> Empresa Hoy</span>
            </h2>
            
            {/* Descripción */}
            <p className="text-2xl md:text-3xl mb-16 text-white/90 max-w-5xl mx-auto leading-relaxed font-light">
              No esperes más. La inteligencia artificial está aquí para revolucionar tu negocio. 
              <span className="text-emerald-400 font-semibold">Agenda tu consulta gratuita</span> y descubre un mundo de posibilidades infinitas.
            </p>
            
            {/* CTA Principal con efecto de expansión y iconos */}
            <div className="group relative inline-block cursor-pointer">
              {/* Contenedor principal que se expande */}
              <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 p-2 rounded-3xl shadow-2xl transform transition-all duration-700 group-hover:scale-125 group-hover:shadow-[0_0_100px_rgba(59,130,246,0.5)] group-hover:rotate-1">
                
                {/* Caja interna */}
                <div className="bg-gradient-to-r from-gray-900 via-slate-800 to-black px-16 py-8 rounded-3xl relative overflow-hidden border border-white/10">
                  
                  {/* Efecto de brillo al hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-emerald-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl"></div>
                  
                  {/* Iconos en movimiento - POSICIÓN MEJORADA */}
                  {/* Icono 1 - Superior Izquierda */}
                  <div className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-xl transform transition-all duration-500 group-hover:animate-bounce group-hover:scale-125 group-hover:-translate-y-4 group-hover:-translate-x-4">
                    <span className="text-white text-2xl font-bold">🚀</span>
                  </div>
                  
                  {/* Icono 2 - Superior Derecha */}
                  <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-xl transform transition-all duration-500 group-hover:animate-bounce group-hover:scale-125 group-hover:-translate-y-4 group-hover:translate-x-4" style={{animationDelay: '0.2s'}}>
                    <span className="text-white text-2xl font-bold">⚡</span>
                  </div>
                  
                  {/* Icono 3 - Inferior Izquierda */}
                  <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-xl transform transition-all duration-500 group-hover:animate-bounce group-hover:scale-125 group-hover:translate-y-4 group-hover:-translate-x-4" style={{animationDelay: '0.4s'}}>
                    <span className="text-white text-2xl font-bold">💡</span>
                  </div>
                  
                  {/* Icono 4 - Inferior Derecha */}
                  <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center shadow-xl transform transition-all duration-500 group-hover:animate-bounce group-hover:scale-125 group-hover:translate-y-4 group-hover:translate-x-4" style={{animationDelay: '0.6s'}}>
                    <span className="text-white text-2xl font-bold">🎯</span>
                  </div>
                  
                  {/* Texto del botón */}
                  <span className="relative z-10 text-3xl md:text-4xl font-black bg-gradient-to-r from-white via-blue-200 to-emerald-200 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-500 inline-block">
                    Agenda Consulta Gratuita
                  </span>
                  
                  {/* Sublínea del botón */}
                  <div className="relative z-10 mt-2 text-lg text-white/70 group-hover:text-white transition-colors duration-500">
                    Respuesta en 24h • Sin compromiso
                  </div>
                </div>
              </div>
              
              {/* Anillo exterior animado */}
              <div className="absolute inset-0 rounded-3xl border-2 border-white/20 group-hover:border-white/50 transform group-hover:scale-150 transition-all duration-700 opacity-0 group-hover:opacity-100"></div>
              
              {/* Segundo anillo más grande */}
              <div className="absolute inset-0 rounded-3xl border border-white/10 group-hover:border-white/30 transform group-hover:scale-175 transition-all duration-1000 opacity-0 group-hover:opacity-100" style={{transitionDelay: '0.2s'}}></div>
            </div>
            
            {/* Información adicional */}
            <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="text-3xl mb-3">⏰</div>
                <div className="text-white font-semibold mb-2">Respuesta Inmediata</div>
                <div className="text-white/70 text-sm">Contacto en menos de 24 horas</div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="text-3xl mb-3">💼</div>
                <div className="text-white font-semibold mb-2">Sin Compromiso</div>
                <div className="text-white/70 text-sm">Consulta 100% gratuita</div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="text-3xl mb-3">🎯</div>
                <div className="text-white font-semibold mb-2">Personalizada</div>
                <div className="text-white/70 text-sm">Solución única para ti</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Con logo sin fondo */}
      <footer className="relative bg-gradient-to-br from-purple-900 via-gray-800 to-emerald-900 text-white py-20 overflow-hidden">
        {/* Efectos de fondo */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-emerald-500/10 to-cyan-500/10"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Logo y descripción - SOLO IMAGEN SIN FONDO */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <img src="/logo_final.png" alt="Mente Autónoma" className="w-14 h-14 object-contain" />
                <h3 className="text-3xl font-black bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent drop-shadow-lg">
                  Mente Autónoma
                </h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Transformando empresas con inteligencia artificial de vanguardia. 
                Hacemos que la IA sea accesible para todas las pymes.
              </p>
            </div>

                                       {/* Servicios - LOS 9 COMPLETOS EN 2 COLUMNAS */}
              <div className="space-y-6">
                <h4 className="text-xl font-bold text-white">Nuestros Servicios</h4>
                <div className="grid grid-cols-2 gap-3">
                  {/* Columna 1 */}
                  <div className="space-y-3">
                    <a href="#" className="group flex items-center space-x-3 text-gray-300 hover:text-white transition-colors">
                      <div className="w-2 h-2 bg-orange-400 rounded-full group-hover:bg-orange-300"></div>
                      <span className="text-sm">1. Chatbot</span>
                    </a>
                    <a href="#" className="group flex items-center space-x-3 text-gray-300 hover:text-white transition-colors">
                      <div className="w-2 h-2 bg-blue-400 rounded-full group-hover:bg-blue-300"></div>
                      <span className="text-sm">2. Diseño Web</span>
                    </a>
                    <a href="#" className="group flex items-center space-x-3 text-gray-300 hover:text-white transition-colors">
                      <div className="w-2 h-2 bg-green-400 rounded-full group-hover:bg-green-300"></div>
                      <span className="text-sm">3. Automatización</span>
                    </a>
                    <a href="#" className="group flex items-center space-x-3 text-gray-300 hover:text-white transition-colors">
                      <div className="w-2 h-2 bg-purple-400 rounded-full group-hover:bg-purple-300"></div>
                      <span className="text-sm">4. Asistente Ventas</span>
                    </a>
                    <a href="#" className="group flex items-center space-x-3 text-gray-300 hover:text-white transition-colors">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full group-hover:bg-indigo-300"></div>
                      <span className="text-sm">5. Secretario IA</span>
                    </a>
                  </div>
                  
                  {/* Columna 2 */}
                  <div className="space-y-3">
                    <a href="#" className="group flex items-center space-x-3 text-gray-300 hover:text-white transition-colors">
                      <div className="w-2 h-2 bg-pink-400 rounded-full group-hover:bg-pink-300"></div>
                      <span className="text-sm">6. Contenido RRSS</span>
                    </a>
                    <a href="#" className="group flex items-center space-x-3 text-gray-300 hover:text-white transition-colors">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full group-hover:bg-yellow-300"></div>
                      <span className="text-sm">7. Módulo</span>
                    </a>
                    <a href="#" className="group flex items-center space-x-3 text-gray-300 hover:text-white transition-colors">
                      <div className="w-2 h-2 bg-teal-400 rounded-full group-hover:bg-teal-300"></div>
                      <span className="text-sm">8. Análisis</span>
                    </a>
                    <a href="#" className="group flex items-center space-x-3 text-gray-300 hover:text-white transition-colors">
                      <div className="w-2 h-2 bg-blue-400 rounded-full group-hover:bg-blue-300"></div>
                      <span className="text-sm">9. SAAS/BAAS</span>
                    </a>
                  </div>
                </div>
              </div>

            {/* Newsletter */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-white">Newsletter</h4>
              <p className="text-gray-300">
                Recibe las últimas noticias sobre IA y estrategias para pymes.
              </p>
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Tu correo electrónico"
                  className="w-full px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 bg-white/95 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button className="w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 hover:from-blue-600 hover:via-indigo-600 hover:to-purple-600 text-white py-4 rounded-2xl font-bold text-lg transition-all duration-500 transform hover:scale-110 hover:shadow-2xl shadow-lg border-2 border-white/20">
                  🚀 Suscribirse Ahora
                </button>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-white/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-300 text-center md:text-left">
                © 2025 Mente Autónoma. Todos los derechos reservados. 
                <span className="text-emerald-400"> Construido con ❤️ y profesionalismo.</span>
              </p>
              <div className="flex space-x-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacidad</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Términos</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

             <style jsx>{`
         @keyframes scroll {
           0% { transform: translateX(0); }
           100% { transform: translateX(-50%); }
         }
         .animate-scroll {
           animation: scroll 30s linear infinite;
         }
         
         @keyframes scroll-fast {
           0% { transform: translateX(0); }
           100% { transform: translateX(-100%); }
         }
         .animate-scroll-fast {
           animation: scroll-fast 15s linear infinite; /* Carrusel MÁS RÁPIDO */
         }
       `}</style>
       
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
