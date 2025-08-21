'use client'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header transparente que se vuelve sticky */}
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
              <a href="#servicios" className="nav-link text-white hover:text-green-400 px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Servicios
              </a>
              <a href="#noticias" className="nav-link text-white hover:text-green-400 px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Noticias
              </a>
              <a href="#contacto" className="nav-link text-white hover:text-green-400 px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Contacto
              </a>
            </nav>
            
            {/* CTA Button */}
            <div className="flex items-center space-x-4">
              <button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg border-2 border-green-500">
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
            <div className="mb-6 bg-gradient-to-r from-green-500 via-green-400 to-green-600 text-white px-8 py-3 text-sm shadow-lg rounded-full inline-block">
              🚀 La IA del Futuro, Hoy
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Revoluciona tu
              <span className="bg-gradient-to-r from-green-500 via-green-400 to-green-600 bg-clip-text text-transparent drop-shadow-2xl"> Negocio</span>
              <br />
              con Inteligencia Artificial
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-10 leading-relaxed">
              Democratizando la Inteligencia Artificial para Pymes.<br/>
              Descubre cómo nuestros servicios pueden transformar tu empresa.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="group relative overflow-hidden bg-gradient-to-r from-green-600 via-green-500 to-green-700 text-white text-lg px-10 py-5 rounded-2xl font-bold transition-all duration-500 transform hover:scale-110 hover:shadow-2xl shadow-xl flex items-center gap-4">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-green-300 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <div className="w-0 h-0 border-l-[10px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent"></div>
                </div>
                <span className="relative z-10">Ver Demo en Vivo</span>
                <div className="relative z-10 w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </button>
              <button className="group relative overflow-hidden bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-600 text-white text-lg px-10 py-5 rounded-2xl font-bold transition-all duration-500 transform hover:scale-110 hover:shadow-2xl shadow-xl flex items-center gap-4">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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

      {/* Servicios Section - DISEÑO COMPLETAMENTE NUEVO */}
      <section id="servicios" className="py-20 bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 relative overflow-hidden">
        {/* Elementos de fondo */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(46,204,113,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(39,174,96,0.15),transparent_50%)]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="mb-4 bg-gradient-to-r from-green-400 to-emerald-400 text-white px-6 py-2 text-sm shadow-lg rounded-full inline-block">
              🚀 Soluciones Avanzadas
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Nuestros Servicios en
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent"> Acción</span>
            </h2>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Descubre cómo cada servicio puede transformar tu empresa con un enfoque único
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Servicio 1 - Chatbot Inteligente */}
            <div className="group bg-white/10 backdrop-blur-xl rounded-3xl p-8 border-2 border-white/20 hover:border-white/40 transition-all duration-500 transform hover:-translate-y-3 hover:shadow-2xl">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <span className="text-4xl">🤖</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-orange-400 transition-colors">
                  Chatbot Inteligente
                </h3>
                <p className="text-green-100 mb-6 leading-relaxed">
                  Asistentes conversacionales que entienden contexto y resuelven consultas complejas.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-200">NLP Avanzado</span>
                    <div className="w-16 bg-green-800/50 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full w-12"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-200">Multi-canal</span>
                    <div className="w-16 bg-green-800/50 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full w-14"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-200">Aprendizaje</span>
                    <div className="w-16 bg-green-800/50 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full w-16"></div>
                    </div>
                  </div>
                </div>
                <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Explorar Servicio ✨
                </button>
              </div>
            </div>

            {/* Servicio 2 - Asistente Secretario IA */}
            <div className="group bg-white/10 backdrop-blur-xl rounded-3xl p-8 border-2 border-white/20 hover:border-white/40 transition-all duration-500 transform hover:-translate-y-3 hover:shadow-2xl">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <span className="text-4xl">👔</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                  Asistente Secretario IA
                </h3>
                <p className="text-green-100 mb-6 leading-relaxed">
                  Gestión inteligente de agenda, emails y tareas con priorización automática.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-200">Calendario</span>
                    <div className="w-16 bg-green-800/50 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full w-10"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-200">Organización</span>
                    <div className="w-16 bg-green-800/50 rounded-full h-2">
                      <div className="bg-cyan-500 h-2 rounded-full w-12"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-200">Automatización</span>
                    <div className="w-16 bg-green-800/50 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full w-16"></div>
                    </div>
                  </div>
                </div>
                <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Explorar Servicio ✨
                </button>
              </div>
            </div>

            {/* Servicio 3 - Generador de Contenido RRSS */}
            <div className="group bg-white/10 backdrop-blur-xl rounded-3xl p-8 border-2 border-white/20 hover:border-white/40 transition-all duration-500 transform hover:-translate-y-3 hover:shadow-2xl">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <span className="text-4xl">✍️</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">
                  Generador de Contenido RRSS
                </h3>
                <p className="text-green-100 mb-6 leading-relaxed">
                  Creación automática de contenido viral con análisis de tendencias en tiempo real.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-200">Tendencias</span>
                    <div className="w-16 bg-green-800/50 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full w-14"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-200">Optimización</span>
                    <div className="w-16 bg-green-800/50 rounded-full h-2">
                      <div className="bg-pink-500 h-2 rounded-full w-11"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-200">Formatos</span>
                    <div className="w-16 bg-green-800/50 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full w-16"></div>
                    </div>
                  </div>
                </div>
                <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Explorar Servicio ✨
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección IA con Objeto Interactivo */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        {/* Elementos de fondo */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(147,51,234,0.15),transparent_50%)]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 text-sm shadow-lg rounded-full inline-block">
              🤖 Inteligencia Artificial
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              El Futuro de la
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Automatización</span>
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Descubre cómo nuestros agentes IA transforman procesos complejos en operaciones simples
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Contenido */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Agentes Autónomos</h3>
                    <p className="text-blue-200">IA que aprende, decide y ejecuta tareas sin intervención humana</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🧠</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Machine Learning</h3>
                    <p className="text-blue-200">Algoritmos que mejoran continuamente con cada interacción</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🔗</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Integración API</h3>
                    <p className="text-blue-200">Conecta con cualquier sistema existente de tu empresa</p>
                  </div>
                </div>
              </div>
              
              <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                Explorar Agentes IA 🚀
              </button>
            </div>
            
            {/* Objeto Interactivo - Red Neuronal 3D */}
            <div className="relative">
              <div className="w-80 h-80 mx-auto relative">
                {/* Círculo central pulsante */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse opacity-80"></div>
                
                {/* Nodos de la red neuronal */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl animate-bounce">
                  <span className="text-3xl">🧠</span>
                </div>
                
                {/* Nodos satélites */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center shadow-xl animate-ping">
                  <span className="text-xl">⚡</span>
                </div>
                
                <div className="absolute top-1/2 right-4 transform -translate-y-1/2 w-16 h-16 bg-purple-400 rounded-full flex items-center justify-center shadow-xl animate-ping" style={{animationDelay: '0.5s'}}>
                  <span className="text-xl">🔗</span>
                </div>
                
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-green-400 rounded-full flex items-center justify-center shadow-xl animate-ping" style={{animationDelay: '1s'}}>
                  <span className="text-xl">📊</span>
                </div>
                
                <div className="absolute top-1/2 left-4 transform -translate-y-1/2 w-16 h-16 bg-pink-400 rounded-full flex items-center justify-center shadow-xl animate-ping" style={{animationDelay: '1.5s'}}>
                  <span className="text-xl">🎯</span>
                </div>
                
                {/* Líneas de conexión */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 320">
                  <defs>
                    <linearGradient id="line1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.6"/>
                      <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.6"/>
                    </linearGradient>
                  </defs>
                  <line x1="160" y1="160" x2="160" y2="80" stroke="url(#line1)" strokeWidth="2" className="animate-pulse"/>
                  <line x1="160" y1="160" x2="240" y2="160" stroke="url(#line1)" strokeWidth="2" className="animate-pulse" style={{animationDelay: '0.5s'}}/>
                  <line x1="160" y1="160" x2="160" y2="240" stroke="url(#line1)" strokeWidth="2" className="animate-pulse" style={{animationDelay: '1s'}}/>
                  <line x1="160" y1="160" x2="80" y2="160" stroke="url(#line1)" strokeWidth="2" className="animate-pulse" style={{animationDelay: '1.5s'}}/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Noticias */}
      <section id="noticias" className="py-20 bg-gradient-to-br from-slate-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 text-sm shadow-lg rounded-full inline-block">
              📰 Últimas Noticias
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Mantente al Día con la
              <span className="bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent"> Revolución IA</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Las últimas tendencias, innovaciones y casos de éxito en inteligencia artificial
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Noticia 1 */}
            <div className="bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
              <div className="mb-6">
                <div className="w-full h-48 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
                  <span className="text-6xl">🚀</span>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500">15 Mar 2025</span>
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                </div>
                <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                  Innovación
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                Chatbots que Entienden el Contexto
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Descubre cómo la nueva generación de IA conversacional está revolucionando la atención al cliente.
              </p>
              <button className="w-full bg-white text-blue-700 border-2 border-blue-200 hover:border-blue-400 py-3 rounded-xl font-semibold transition-all duration-300 hover:bg-blue-50">
                Leer Más →
              </button>
            </div>
            
            {/* Noticia 2 */}
            <div className="bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
              <div className="mb-6">
                <div className="w-full h-48 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center">
                  <span className="text-6xl">💼</span>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500">12 Mar 2025</span>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="inline-block bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                  Pymes
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-green-600 transition-colors">
                IA para Pequeñas Empresas
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Cómo las pymes están implementando inteligencia artificial para crecer exponencialmente.
              </p>
              <button className="w-full bg-white text-green-700 border-2 border-green-200 hover:border-green-400 py-3 rounded-xl font-semibold transition-all duration-300 hover:bg-green-50">
                Leer Más →
              </button>
            </div>
            
            {/* Noticia 3 */}
            <div className="bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
              <div className="mb-6">
                <div className="w-full h-48 bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 rounded-2xl flex items-center justify-center">
                  <span className="text-6xl">🎯</span>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500">10 Mar 2025</span>
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                </div>
                <span className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                  Automatización
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-purple-600 transition-colors">
                Flujos de Trabajo Inteligentes
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Optimiza tus procesos empresariales con flujos de trabajo impulsados por IA.
              </p>
              <button className="w-full bg-white text-purple-700 border-2 border-purple-200 hover:border-purple-400 py-3 rounded-xl font-semibold transition-all duration-300 hover:bg-purple-50">
                Leer Más →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Tecnologías */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="mb-4 bg-gradient-to-r from-blue-400 to-purple-400 text-white px-6 py-2 text-sm shadow-lg rounded-full inline-block">
              🛠️ Stack Tecnológico
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Tecnologías de
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Vanguardia</span>
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Utilizamos las herramientas más avanzadas para crear soluciones de IA excepcionales
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {/* Tecnología 1 */}
            <div className="group bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-500 transform hover:-translate-y-2 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">🤖</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">OpenAI GPT-4</h3>
              <p className="text-blue-200 text-sm">Modelo de lenguaje más avanzado para conversaciones naturales</p>
            </div>
            
            {/* Tecnología 2 */}
            <div className="group bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-500 transform hover:-translate-y-2 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">🧠</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">TensorFlow</h3>
              <p className="text-blue-200 text-sm">Framework de machine learning para modelos personalizados</p>
            </div>
            
            {/* Tecnología 3 */}
            <div className="group bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-500 transform hover:-translate-y-2 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">☁️</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">AWS Lambda</h3>
              <p className="text-blue-200 text-sm">Computación serverless para escalabilidad automática</p>
            </div>
            
            {/* Tecnología 4 */}
            <div className="group bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-500 transform hover:-translate-y-2 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">🔗</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">FastAPI</h3>
              <p className="text-blue-200 text-sm">API moderna y rápida para integraciones robustas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección CTA - DISEÑO COMPLETAMENTE NUEVO */}
      <section className="py-20 bg-gradient-to-br from-purple-900 via-red-900 to-pink-900 relative overflow-hidden">
        {/* Elementos de fondo */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(155,89,182,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(231,76,60,0.15),transparent_50%)]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            ¿Listo para el Futuro?
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto">
            Únete a cientos de empresas que ya están transformando su negocio con IA
          </p>
          
          <div className="bg-white/15 backdrop-blur-xl rounded-3xl p-12 max-w-2xl mx-auto border-2 border-white/20">
            <input 
              type="email" 
              placeholder="Tu correo electrónico" 
              className="w-full px-6 py-4 rounded-2xl text-gray-900 placeholder-gray-600 bg-white/95 border-2 border-white/50 focus:outline-none focus:ring-4 focus:ring-purple-500/50 focus:border-white text-lg mb-6"
            />
            <button className="w-full bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:via-red-800 hover:to-red-900 text-white py-4 px-8 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl mb-6">
              Suscríbete 🚀
            </button>
            
            {/* PROMOCIONAL TEXT DESTACADO */}
            <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white p-6 rounded-2xl shadow-2xl border-2 border-orange-300/50">
              <p className="text-lg font-bold">
                ✨ Recibe <span className="text-yellow-200">40 ideas de IA para pymes</span> + newsletter exclusivo ✨
              </p>
              {/* Puntos pulsantes */}
              <div className="flex justify-center space-x-2 mt-4">
                <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
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

            {/* Servicios */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-white">Nuestros Servicios</h4>
              <div className="grid grid-cols-2 gap-3">
                <a href="#" className="group flex items-center space-x-3 text-gray-300 hover:text-white transition-colors">
                  <div className="w-2 h-2 bg-purple-400 rounded-full group-hover:bg-purple-300"></div>
                  <span className="text-sm">Chatbot Inteligente</span>
                </a>
                <a href="#" className="group flex items-center space-x-3 text-gray-300 hover:text-white transition-colors">
                  <div className="w-2 h-2 bg-green-400 rounded-full group-hover:bg-green-300"></div>
                  <span className="text-sm">Generador de Contenido RRSS</span>
                </a>
                <a href="#" className="group flex items-center space-x-3 text-gray-300 hover:text-white transition-colors">
                  <div className="w-2 h-2 bg-blue-400 rounded-full group-hover:bg-blue-300"></div>
                  <span className="text-sm">Asistente Secretario IA</span>
                </a>
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
                <button className="w-full bg-gradient-to-r from-purple-500 via-emerald-500 to-cyan-500 hover:from-purple-600 hover:via-emerald-600 hover:to-cyan-600 text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                  Suscribirse
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
