'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Footer from '@/components/Footer'
import SEO from '@/components/SEO'
import DemoModal from '@/components/DemoModal'

export default function Indigo() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    terms: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const [isHeaderSticky, setIsHeaderSticky] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Función para detectar cuando el header debe ser sticky
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsHeaderSticky(scrollPosition > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company || null
          // Solo enviamos los campos que existen en la tabla
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', company: '', terms: false });
        setTimeout(() => setSubmitStatus(''), 3000);
      } else {
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus(''), 3000);
      }
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(''), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <>
      <SEO 
        title="Soluciones Digitales con Inteligencia Artificial"
        description="Transformamos tu empresa con IA avanzada. Desarrollo web, chatbots inteligentes y automatización que generan resultados reales. Consultoría gratuita."
        keywords="inteligencia artificial, desarrollo web, chatbots, automatización, IA, tecnología, Chile, Santiago, transformación digital"
        ogImage="https://res.cloudinary.com/dysvptyfc/image/upload/v1756465870/logos/hp0ci35hkx5ld1azubdv.png"
      />
      <div className="min-h-screen bg-white">
      {/* Header con transparencia dinámica */}
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
                  isHeaderSticky ? 'text-gray-900' : 'text-white'
                }`}>Mente Autónoma</h1>
                <p className={`text-sm transition-colors duration-300 ${
                  isHeaderSticky ? 'text-gray-600' : 'text-white/80'
                }`}>Soluciones Digitales</p>
              </div>
            </Link>
            
            {/* Navegación desktop */}
            <nav className="flex space-x-8">
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
                  ? 'text-gray-700 hover:text-blue-600' 
                  : 'text-white/90 hover:text-white'
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
                  isHeaderSticky ? 'text-gray-900' : 'text-white'
                }`}>Mente Autónoma</h1>
                <p className={`text-xs transition-colors duration-300 ${
                  isHeaderSticky ? 'text-gray-600' : 'text-white/80'
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
                isHeaderSticky ? 'text-gray-900' : 'text-white'
              } ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
                isHeaderSticky ? 'text-gray-900' : 'text-white'
              } ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
                isHeaderSticky ? 'text-gray-900' : 'text-white'
              } ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </button>
          </div>
          
          {/* Menú móvil desplegable */}
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
                  className="px-4 py-3 rounded-lg font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Noticias
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>


      {/* Hero Section - Fondo púrpura a azul */}
      <section className="bg-gradient-to-r from-purple-900 via-purple-800 to-blue-900 text-white pt-36 sm:pt-32 pb-20 relative overflow-hidden">
        {/* Elementos de fondo decorativos */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(120,119,198,0.2),transparent_50%)]"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge superior completamente renovado - NUEVO DISEÑO */}
            <div className="mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-6 sm:px-8 py-2 sm:py-3 text-xs sm:text-sm shadow-lg rounded-full inline-block backdrop-blur-sm border border-white/20">
              ⚡ La IA del Futuro, Hoy
            </div>
            
            {/* Título principal completamente renovado - NUEVO ESTILO */}
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
              Transforma tu
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-2xl"> Empresa</span>
              <br />
              con Inteligencia Artificial
            </h1>
            
            {/* Descripción completamente renovada - NUEVO TONO */}
            <p className="text-lg sm:text-xl md:text-2xl text-slate-200 mb-10 leading-relaxed">
              Llevamos la IA de vanguardia a tu negocio.<br/>
              <span className="text-emerald-300 font-semibold">Soluciones personalizadas que generan resultados reales.</span>
            </p>
            
            {/* Botones completamente renovados - NUEVO DISEÑO */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button 
                onClick={() => setIsDemoModalOpen(true)}
                className="group relative overflow-hidden bg-white text-purple-600 text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 rounded-3xl font-bold transition-all duration-500 transform hover:scale-110 hover:shadow-2xl shadow-xl flex items-center gap-4 border-2 border-purple-200 backdrop-blur-sm hover:border-purple-400"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all duration-300">
                  <div className="w-0 h-0 border-l-[10px] border-l-purple-600 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent group-hover:border-l-white transition-all duration-300"></div>
                </div>
                <span className="relative z-10 text-purple-600">Ver Demo en Vivo</span>
                <div className="relative z-10 w-2 h-2 bg-purple-600 rounded-full animate-pulse group-hover:bg-white transition-colors duration-300"></div>
                
                {/* Efecto de brillo */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </button>
              
              <a href="#servicios" className="group relative overflow-hidden bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 rounded-3xl font-bold transition-all duration-500 transform hover:scale-110 hover:shadow-2xl shadow-xl flex items-center gap-4 border-2 border-white/20 backdrop-blur-sm">
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 mb-8 leading-tight">
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
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-900 via-slate-800 to-black text-white relative overflow-hidden">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Columna Izquierda - Contenido */}
            <div className="space-y-6 sm:space-y-8">
              <div className="mb-4 sm:mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-6 sm:px-8 py-2 sm:py-3 text-xs sm:text-sm shadow-2xl rounded-full inline-block">
                🚀 Transformación Digital 2025
              </div>
              
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                ¿Por Qué Tu Negocio
                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"> Debe Implementar Agentes IA?</span>
              </h2>
              
              <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed max-w-3xl">
                Los agentes de IA son la próxima revolución en productividad empresarial. 
                <span className="text-emerald-300 font-semibold">Automatizan tareas complejas, toman decisiones inteligentes y trabajan 24/7</span> 
                para que tu equipo se enfoque en lo que realmente importa: crecer tu negocio.
              </p>
              
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-lg sm:text-2xl">📈</span>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">Crecimiento Exponencial</h3>
                    <p className="text-sm sm:text-base text-gray-300">Los negocios con IA crecen 3x más rápido que los tradicionales</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-lg sm:text-2xl">💰</span>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">Ahorro de Costos</h3>
                    <p className="text-sm sm:text-base text-gray-300">Reduce gastos operativos hasta en un 40% con automatización inteligente</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-pink-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-lg sm:text-2xl">🎯</span>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">Ventaja Competitiva</h3>
                    <p className="text-sm sm:text-base text-gray-300">Sé el primero en tu industria en implementar soluciones IA</p>
                  </div>
                </div>
              </div>
              

            </div>
            
            {/* Columna Derecha - NUEVO DISEÑO INTERACTIVO Y CREATIVO */}
            <div className="relative">
              <div className="w-full max-w-[350px] sm:w-[400px] lg:w-[450px] h-[350px] sm:h-[400px] lg:h-[450px] mx-auto relative">
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
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
                  <img src="/noticia1.webp" alt="Automatización Inteligente" className="w-full h-full object-cover" />
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
                  Automatización inteligente avanzada: el futuro de la eficiencia empresarial
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Descubre cómo la inteligencia artificial está revolucionando los procesos empresariales, aumentando la...
                </p>
                <Link href="noticias/automatizacion-inteligente-avanzada" className="block w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg text-center">
                  Leer Más →
                </Link>
              </div>
            </div>
            
            {/* Noticia 2 - Automatización */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-purple-200 hover:border-pink-400">
              <div className="relative overflow-hidden">
                <div className="w-full h-48 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 flex items-center justify-center">
                  <img src="/noticia2.webp" alt="Chatbots Inteligentes" className="w-full h-full object-cover" />
                </div>
                <div className="absolute top-4 right-4">
                  <span className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
                    Chatbots
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500">12 Enero 2025</span>
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                  Chatbots que Entienden Contexto: La Nueva Era de la Atención al Cliente
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Descubre cómo los chatbots inteligentes están revolucionando la atención al cliente con comprensión contextual avanzada.
                </p>
                <Link href="/noticias/chatbots-que-entienden-contexto" className="block w-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg text-center">
                  Leer Más →
                </Link>
              </div>
            </div>
            
            {/* Noticia 3 - Marketing Digital */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-pink-200 hover:border-blue-400">
              <div className="relative overflow-hidden">
                <div className="w-full h-48 bg-gradient-to-br from-pink-500 via-blue-500 to-purple-500 flex items-center justify-center">
                  <img src="/noticia3.webp" alt="Flujos de Trabajo Inteligentes" className="w-full h-full object-cover" />
                </div>
                <div className="absolute top-4 right-4">
                  <span className="inline-block bg-gradient-to-r from-pink-600 to-blue-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
                    Flujos de Trabajo
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500">10 Enero 2025</span>
                  <div className="w-3 h-3 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full"></div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-pink-600 transition-colors">
                  Flujos de Trabajo Inteligentes: Optimizando Operaciones con IA
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Transforma tus procesos empresariales con flujos de trabajo inteligentes que se adaptan y optimizan automáticamente.
                </p>
                <Link href="/noticias/flujos-de-trabajo-inteligentes" className="block w-full bg-gradient-to-r from-pink-600 via-blue-600 to-purple-600 hover:from-pink-700 hover:via-blue-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg text-center">
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-8 leading-tight">
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
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Campo Nombre */}
                    <div className="relative group">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
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
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
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
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
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
                      name="terms"
                      checked={formData.terms}
                      onChange={handleInputChange}
                      className="mt-1.5 w-5 h-5 bg-white/5 border-2 border-gray-700/50 rounded text-emerald-500 focus:ring-emerald-500/50 focus:ring-2"
                      required
                    />
                    <label htmlFor="terms" className="text-sm text-gray-300 leading-relaxed">
                      Acepto recibir emails con contenido exclusivo sobre IA y estrategias de negocio. 
                      <span className="text-emerald-300">Puedes cancelar en cualquier momento.</span>
                    </label>
                  </div>

                  {/* Mensaje de estado */}
                  {submitStatus === 'success' && (
                    <div className="text-center p-4 bg-green-500/20 border border-green-500/30 rounded-xl">
                      <p className="text-green-300 font-semibold">¡Gracias! Te hemos enviado el PDF por email.</p>
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="text-center p-4 bg-red-500/20 border border-red-500/30 rounded-xl">
                      <p className="text-red-300 font-semibold">Hubo un error. Por favor intenta nuevamente.</p>
                    </div>
                  )}

                  {/* Botón de suscripción */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:via-teal-500 hover:to-cyan-500 text-white font-bold py-5 px-8 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {/* Efecto de brillo en hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    
                    <div className="relative flex items-center justify-center space-x-3">
                      <span className="text-2xl">🚀</span>
                      <span className="text-lg font-bold">
                        {isSubmitting ? 'Enviando...' : 'Suscribirse Gratis + Obtener PDF'}
                      </span>
                      <span className="text-2xl">🎁</span>
                    </div>
                  </button>

                  {/* Garantía de seguridad - OCULTO EN MÓVIL */}
                  <div className="hidden md:block text-center pt-4">
                    <p className="text-sm text-gray-400 flex items-center justify-center space-x-2">
                      <span>🔒</span>
                      <span>100% seguro. Sin spam. Cancela cuando quieras.</span>
                    </p>
                  </div>
                </form>

                {/* Beneficios destacados - OCULTOS EN MÓVIL */}
                <div className="hidden md:block mt-8 pt-8 border-t border-gray-700/30">
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Construido con las Mejores
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Tecnologías</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Utilizamos las herramientas más avanzadas para crear soluciones IA excepcionales
            </p>
          </div>
          
          {/* Carrusel de logos - PRIMERA FILA (SIN REPETICIONES) */}
          <div className="mb-12">
            <div className="flex space-x-16 animate-scroll-fast">
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
            <div className="flex space-x-12 animate-scroll-medium">
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



      {/* Sección duplicada: Soluciones IA que Revolucionan tu Negocio */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
        {/* Decoraciones de fondo */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold mb-4 animate-bounce">
              <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
              Potencia tu negocio con IA
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Soluciones IA
              </span>
              <br />
              que Revolucionan tu Negocio
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Descubre cómo la Inteligencia Artificial puede transformar cada aspecto de tu empresa.
              Desde atención al cliente hasta marketing automatizado.
            </p>
          </div>

          {/* Grid de servicios */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Servicio 1: Chatbot Inteligente */}
            <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-purple-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  Chatbot Inteligente
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Atiende a tus clientes 24/7 con respuestas personalizadas. Convierte visitantes en clientes con IA que entiende y vende.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">24/7</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Convierte</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">IA GPT-4</span>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
                    Ver más <span className="ml-2">→</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Servicio 2: Diseño Web Inteligente */}
            <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-transparent to-pink-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                  Diseño Web Inteligente
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Sitios web que se adaptan a cada usuario. Landing pages que convierten más con IA que personaliza la experiencia.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">Responsive</span>
                  <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm font-medium">Personalizado</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">Next.js</span>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center text-purple-600 font-semibold group-hover:translate-x-2 transition-transform">
                    Ver más <span className="ml-2">→</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Servicio 3: Automatización de Procesos */}
            <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-transparent to-emerald-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors">
                  Automatización de Procesos
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Automatiza tareas repetitivas con IA. Desde facturación hasta seguimiento de clientes, todo en piloto automático.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Automático</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">Eficiente</span>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">Ahorra tiempo</span>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center text-green-600 font-semibold group-hover:translate-x-2 transition-transform">
                    Ver más <span className="ml-2">→</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Servicio 4: Marketing Digital */}
            <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-transparent to-red-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors">
                  Marketing Digital
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Campañas que se optimizan solas. IA que analiza tu audiencia y crea contenido que convierte automáticamente.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">ROI Alto</span>
                  <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">Segmentado</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">Automático</span>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center text-orange-600 font-semibold group-hover:translate-x-2 transition-transform">
                    Ver más <span className="ml-2">→</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Servicio 5: Asistente Secretario IA */}
            <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-transparent to-blue-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors">
                  Asistente Secretario IA
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Tu secretario virtual que nunca descansa. Agenda citas, responde emails y gestiona tu calendario automáticamente.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">Virtual</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">Inteligente</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">24/7</span>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center text-indigo-600 font-semibold group-hover:translate-x-2 transition-transform">
                    Ver más <span className="ml-2">→</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Servicio 6: Generador RRSS */}
            <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-transparent to-rose-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4V2a1 1 0 011-1h4a1 1 0 011 1v2M7 4H5a2 2 0 00-2 2v9a2 2 0 002 2h2m-2-4h4m6-5v5l3-3m0 0l-3-3m3 3h-11" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-pink-600 transition-colors">
                  Generador RRSS
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Contenido viral automático para tus redes sociales. IA que crea posts, stories y videos que enganchan a tu audiencia.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm font-medium">Viral</span>
                  <span className="px-3 py-1 bg-rose-100 text-rose-800 rounded-full text-sm font-medium">Creativo</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">Multi-red</span>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center text-pink-600 font-semibold group-hover:translate-x-2 transition-transform">
                    Ver más <span className="ml-2">→</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Servicio 7: Optimización SEO */}
            <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-transparent to-cyan-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-teal-600 transition-colors">
                  Optimización SEO
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Posicionamiento automático en Google. IA que optimiza tu sitio para aparecer primero en las búsquedas.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium">Top 1</span>
                  <span className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm font-medium">Automático</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Orgánico</span>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center text-teal-600 font-semibold group-hover:translate-x-2 transition-transform">
                    Ver más <span className="ml-2">→</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Servicio 8: Aplicaciones SAAS/BAAS */}
            <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-transparent to-purple-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-violet-600 transition-colors">
                  Aplicaciones SAAS/BAAS
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Aplicaciones web completas con IA integrada. Desde CRM hasta herramientas de productividad personalizadas.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-violet-100 text-violet-800 rounded-full text-sm font-medium">Escalable</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">Cloud</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">Personalizado</span>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center text-violet-600 font-semibold group-hover:translate-x-2 transition-transform">
                    Ver más <span className="ml-2">→</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Servicio 9: Módulo Personalizado */}
            <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-transparent to-yellow-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-amber-600 transition-colors">
                  Módulo Personalizado
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  ¿Tienes una idea única? Creamos módulos de IA específicos para tu negocio. Soluciones que nadie más tiene.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">Único</span>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">A medida</span>
                  <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">Innovador</span>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center text-amber-600 font-semibold group-hover:translate-x-2 transition-transform">
                    Ver más <span className="ml-2">→</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 max-w-4xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                ¿Listo para la <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Revolución IA</span>?
              </h3>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                No te quedes atrás. Tus competidores ya están usando IA. Es hora de que tu negocio lidere el futuro.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={() => setIsDemoModalOpen(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
                >
                  🚀 Consulta Gratuita Ahora
                </button>
                <Link href="/chatbot-demo" className="text-gray-600 hover:text-blue-600 font-semibold text-lg transition-colors">
                  Ver Demo en Vivo →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección duplicada: ¿Por Qué Tu Negocio Debe Implementar Agentes IA? */}
      <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
        {/* Efectos de fondo */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-blue-600/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-r from-purple-600/20 to-transparent rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-sm font-bold mb-6 animate-pulse">
              <span className="w-2 h-2 bg-black rounded-full mr-2 animate-ping"></span>
              ¡La revolución IA ya está aquí!
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
              ¿Por Qué Tu Negocio Debe Implementar
              <span className="block bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent mt-2">
                Agentes IA?
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Mientras tus competidores duermen, los Agentes IA trabajan 24/7 para hacer crecer tu negocio.
              <strong className="text-white"> No es el futuro, es el presente.</strong>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* Beneficio 1: Funcionamiento Autónomo */}
            <div className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 hover:border-yellow-400 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-yellow-400/10 cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors">
                Funcionamiento Autónomo
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Tus agentes IA trabajan sin supervisión. Procesan leads, responden consultas y ejecutan ventas mientras duermes.
              </p>
              <div className="flex items-center text-yellow-400 font-semibold">
                <span className="text-3xl mr-2">24</span>
                <div className="text-sm">
                  <div>Horas</div>
                  <div>Activo</div>
                </div>
              </div>
            </div>

            {/* Beneficio 2: Escalabilidad Infinita */}
            <div className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 hover:border-blue-400 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-400/10 cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-6-5-6v5H1v2h6v5zM17 7v5h6v2h-6v5l-5-6 5-6z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                Escalabilidad Infinita
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Un agente IA puede atender a miles de clientes simultáneamente. Sin límites de capacidad ni cansancio.
              </p>
              <div className="flex items-center text-blue-400 font-semibold">
                <span className="text-3xl mr-2">∞</span>
                <div className="text-sm">
                  <div>Clientes</div>
                  <div>Simultaneos</div>
                </div>
              </div>
            </div>

            {/* Beneficio 3: 99.9% Uptime */}
            <div className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 hover:border-green-400 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-400/10 cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-green-400 transition-colors">
                99.9% Uptime
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Nunca más pierdes una venta por horarios. Tus agentes están disponibles cada segundo del año.
              </p>
              <div className="flex items-center text-green-400 font-semibold">
                <span className="text-3xl mr-2">365</span>
                <div className="text-sm">
                  <div>Días</div>
                  <div>Al Año</div>
                </div>
              </div>
            </div>

            {/* Beneficio 4: Evolución Continua */}
            <div className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 hover:border-purple-400 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-400/10 cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">
                Evolución Continua
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Cada interacción hace que tu agente sea más inteligente. Aprende de cada cliente y mejora automáticamente.
              </p>
              <div className="flex items-center text-purple-400 font-semibold">
                <span className="text-3xl mr-2">∞</span>
                <div className="text-sm">
                  <div>Aprendizaje</div>
                  <div>Continuo</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sección de impacto en números */}
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-3xl p-12 mb-16 backdrop-blur-sm border border-gray-600">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                El Impacto Real en tu Negocio
              </h3>
              <p className="text-xl text-gray-300">
                Estos números no son proyecciones. Son resultados reales de nuestros clientes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="text-5xl md:text-6xl font-bold text-green-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  +347%
                </div>
                <div className="text-xl font-semibold text-white mb-2">Aumento en Ventas</div>
                <div className="text-gray-300">Los agentes IA convierten más leads en clientes reales</div>
              </div>

              <div className="text-center group">
                <div className="text-5xl md:text-6xl font-bold text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  -89%
                </div>
                <div className="text-xl font-semibold text-white mb-2">Reducción de Costos</div>
                <div className="text-gray-300">Un agente IA cuesta menos que un empleado medio tiempo</div>
              </div>

              <div className="text-center group">
                <div className="text-5xl md:text-6xl font-bold text-yellow-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  1.2s
                </div>
                <div className="text-xl font-semibold text-white mb-2">Tiempo de Respuesta</div>
                <div className="text-gray-300">Respuesta instantánea = mayor satisfacción del cliente</div>
              </div>
            </div>
          </div>

          {/* Call to Action Final */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-3xl p-8 md:p-12 shadow-2xl shadow-yellow-400/20">
              <h3 className="text-3xl md:text-4xl font-bold text-black mb-6">
                ⚡ Tu Competencia Ya Está Usando IA
              </h3>
              <p className="text-xl text-gray-900 mb-8 max-w-3xl mx-auto font-semibold">
                Cada día que esperas, es un día que tu competencia se adelanta.
                <span className="block mt-2">¿Vas a liderar o vas a seguir?</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <button
                  onClick={() => setIsDemoModalOpen(true)}
                  className="bg-black text-white px-10 py-5 rounded-2xl font-bold text-xl hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl border-2 border-black hover:border-gray-800"
                >
                  🚀 Implementar IA Ahora
                </button>
                <div className="text-black font-bold">
                  <div className="text-sm opacity-75">Consulta gratuita disponible</div>
                  <div className="text-2xl">¡Solo por tiempo limitado!</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Estándar */}
      <Footer />

      {/* Demo Modal */}
      <DemoModal 
        isOpen={isDemoModalOpen} 
        onClose={() => setIsDemoModalOpen(false)}
      />

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
        
        @keyframes scroll-fast {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .animate-scroll-fast {
          animation: scroll-fast 12s linear infinite;
        }
        
        @keyframes scroll-medium {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .animate-scroll-medium {
          animation: scroll-medium 15s linear infinite;
        }
      `}</style>
      </div>
    </>
  )
}
