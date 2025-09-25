'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import Footer from '@/components/Footer'
import SEO from '@/components/SEO'
import DemoModal from '@/components/DemoModal'
import OptimizedImage from '@/components/OptimizedImage'

// Lazy load components below the fold
const LazySection = dynamic(() => import('@/components/LazySection'), {
  loading: () => <div className="w-full h-96 bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse rounded-lg" />
})

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
              <OptimizedImage
                src="/logo_final.png"
                alt="Mente Autónoma"
                width={40}
                height={40}
                priority={true}
                className="w-10 h-10 group-hover:scale-110 transition-transform duration-300"
              />
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
              <OptimizedImage
                src="/logo_final.png"
                alt="Mente Autónoma"
                width={40}
                height={40}
                priority={true}
                className="w-10 h-10 group-hover:scale-110 transition-transform duration-300"
              />
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


     
         {/* Sección Rediseñada - Servicios Elegantes con Contraste Hermoso */}
      <section id="servicios-premium" className="py-24 bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100 relative overflow-hidden">
        {/* Fondo con ondas sutiles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full">
            <svg viewBox="0 0 1200 800" className="w-full h-full opacity-5">
              <defs>
                <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#667eea" />
                  <stop offset="50%" stopColor="#764ba2" />
                  <stop offset="100%" stopColor="#f093fb" />
                </linearGradient>
              </defs>
              <path d="M0,400 C300,200 900,600 1200,400 L1200,800 L0,800 Z" fill="url(#waveGradient)" />
            </svg>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header Inspirador */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold mb-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="w-2 h-2 bg-white rounded-full mr-3 animate-ping"></span>
              ✨ Nuestros Servicios Premium
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Potencia tu Negocio con
              <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                Tecnología Avanzada
              </span>
            </h2>

            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Soluciones innovadoras diseñadas para transformar tu empresa y llevarte al siguiente nivel de éxito
            </p>
          </div>

          {/* Grid de 6 Servicios Premium - Diseño Ultra Lujo */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">

            {/* Servicio 1 - Humanos Digitales - ELEGANTE CRISTAL AZUL */}
            <div className="group relative bg-white/95 backdrop-blur-sm rounded-3xl p-10 border-2 border-blue-100/60 shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-700 transform hover:-translate-y-6 hover:scale-[1.02] overflow-hidden ring-1 ring-blue-50/50">

              {/* Glassmorphism elegante en hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-white/30 to-blue-100/50 opacity-0 group-hover:opacity-100 transition-all duration-700 backdrop-blur-sm"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-100/30 to-white/20 opacity-0 group-hover:opacity-100 transition-all duration-900"></div>

              {/* Borde luminoso sutil */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-200/0 via-blue-300/30 to-blue-200/0 opacity-0 group-hover:opacity-100 transition-all duration-500" style={{padding: '1px'}}>
                <div className="w-full h-full bg-transparent rounded-3xl"></div>
              </div>

              {/* Subtle light effects */}
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-blue-200/20 via-slate-200/15 to-blue-100/25 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-1000"></div>
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-gradient-to-tr from-slate-100/20 to-blue-100/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-800"></div>

              {/* Elegant floating elements */}
              <div className="absolute top-8 right-8 w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full opacity-0 group-hover:opacity-60 animate-bounce transition-all duration-700 delay-100 shadow-sm"></div>
              <div className="absolute top-16 right-16 w-2 h-2 bg-gradient-to-r from-blue-500 to-slate-500 rounded-full opacity-0 group-hover:opacity-50 animate-bounce transition-all duration-700 delay-300"></div>
              <div className="absolute bottom-12 left-8 w-2.5 h-2.5 bg-gradient-to-r from-slate-400 to-blue-400 rounded-full opacity-0 group-hover:opacity-55 animate-bounce transition-all duration-700 delay-500"></div>
              <div className="absolute bottom-20 left-16 w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-slate-400 rounded-full opacity-0 group-hover:opacity-45 animate-bounce transition-all duration-700 delay-700"></div>

              {/* Patrón de fondo sutil */}
              <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-all duration-1000" style={{backgroundImage: 'radial-gradient(circle at 25% 25%, #3b82f6 2px, transparent 2px), radial-gradient(circle at 75% 75%, #8b5cf6 1px, transparent 1px)', backgroundSize: '24px 24px'}}></div>

              <div className="relative z-20">
                {/* Elegant icon with sophisticated effects */}
                <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-blue-500 via-blue-600 to-slate-600 rounded-3xl flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:shadow-blue-300/30 transition-all duration-700 relative overflow-hidden transform group-hover:rotate-3 group-hover:scale-105">
                  {/* Brillo interior dinámico */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-all duration-1000"></div>
                  <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-white/5 to-white/20 animate-pulse"></div>

                  {/* Icono principal con transición */}
                  <span className="text-5xl absolute inset-0 flex items-center justify-center transition-all duration-700 group-hover:scale-125 group-hover:rotate-12 filter drop-shadow-lg">🤖</span>

                  {/* Anillos de energía múltiples */}
                  <div className="absolute inset-0 border-2 border-white/40 rounded-3xl opacity-0 group-hover:opacity-100 animate-pulse transition-all duration-700"></div>
                  <div className="absolute inset-2 border border-blue-200/50 rounded-2xl opacity-0 group-hover:opacity-100 animate-ping transition-all duration-1000 delay-200"></div>

                  {/* Efectos de destellos */}
                  <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-all duration-500 delay-100"></div>
                  <div className="absolute bottom-3 left-3 w-1.5 h-1.5 bg-blue-200 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-all duration-500 delay-300"></div>
                </div>

                <h3 className="text-3xl font-bold text-gray-800 mb-6 transition-all duration-500 text-center leading-tight group-hover:text-blue-700">
                  Humanos Digitales
                </h3>

                <p className="text-gray-600 group-hover:text-gray-700 mb-8 leading-relaxed text-center text-lg font-medium transition-all duration-400">
                  Avatares con IA avanzada que ofrecen interacciones naturales y experiencias personalizadas únicas para tus clientes.
                </p>

                {/* Características con formato Soluciones IA */}
                <div className="mb-8 bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-4 border border-blue-200">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-green-700 font-semibold">Disponible: 24/7</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-blue-700 font-semibold">IA Personalizada</span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                      <span className="text-purple-700 font-semibold">Idiomas: +50</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                      <span className="text-pink-700 font-semibold">Realismo: 99%</span>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 text-white py-4 rounded-2xl font-bold text-lg transition-all duration-700 transform hover:scale-105 hover:-translate-y-1 shadow-xl hover:shadow-2xl relative overflow-hidden group-hover:shadow-[0_20px_40px_-12px_rgba(59,130,246,0.4)]">
                  <span className="relative z-10 flex items-center justify-center">
                    <span className="mr-3 text-xl">✨</span>
                    Explorar Servicio
                    <span className="ml-3 text-xl">🚀</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1200"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                </button>
              </div>
            </div>

            {/* Servicio 2 - Diseño Web - ELEGANTE CRISTAL PÚRPURA */}
            <div className="group relative bg-white/95 backdrop-blur-sm rounded-3xl p-10 border-2 border-purple-100/60 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-700 transform hover:-translate-y-6 hover:scale-[1.02] overflow-hidden ring-1 ring-purple-50/50">

              {/* Glassmorphism elegante en hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50/40 via-white/30 to-purple-100/50 opacity-0 group-hover:opacity-100 transition-all duration-700 backdrop-blur-sm"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-purple-100/30 to-white/20 opacity-0 group-hover:opacity-100 transition-all duration-900"></div>

              {/* Borde luminoso sutil */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-200/0 via-purple-300/30 to-purple-200/0 opacity-0 group-hover:opacity-100 transition-all duration-500" style={{padding: '1px'}}>
                <div className="w-full h-full bg-transparent rounded-3xl"></div>
              </div>

              {/* Subtle light effects */}
              <div className="absolute -top-32 -left-32 w-64 h-64 bg-gradient-to-br from-purple-200/20 via-slate-200/15 to-purple-100/25 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-1000"></div>
              <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-gradient-to-tr from-slate-100/20 to-purple-100/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-800"></div>

              {/* Elegant floating elements */}
              <div className="absolute top-8 left-8 w-3 h-3 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-60 animate-bounce transition-all duration-700 delay-100 shadow-sm"></div>
              <div className="absolute top-16 left-16 w-2 h-2 bg-gradient-to-r from-purple-500 to-slate-500 rounded-full opacity-0 group-hover:opacity-50 animate-bounce transition-all duration-700 delay-300"></div>
              <div className="absolute bottom-12 right-8 w-2.5 h-2.5 bg-gradient-to-r from-slate-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-55 animate-bounce transition-all duration-700 delay-500"></div>
              <div className="absolute bottom-20 right-16 w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-slate-400 rounded-full opacity-0 group-hover:opacity-45 animate-bounce transition-all duration-700 delay-700"></div>

              {/* Patrón cristalino */}
              <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-all duration-1000" style={{backgroundImage: 'radial-gradient(circle at 25% 25%, #ec4899 2px, transparent 2px), radial-gradient(circle at 75% 75%, #a855f7 1px, transparent 1px)', backgroundSize: '24px 24px'}}></div>

              <div className="relative z-20">
                {/* Elegant icon with sophisticated effects */}
                <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-purple-500 via-purple-600 to-slate-600 rounded-3xl flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:shadow-purple-300/30 transition-all duration-700 relative overflow-hidden transform group-hover:rotate-3 group-hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-all duration-1000"></div>
                  <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-white/5 to-white/20 animate-pulse"></div>

                  <span className="text-5xl absolute inset-0 flex items-center justify-center transition-all duration-700 group-hover:scale-125 group-hover:rotate-12 filter drop-shadow-lg">🎨</span>

                  <div className="absolute inset-0 border-2 border-white/40 rounded-3xl opacity-0 group-hover:opacity-100 animate-pulse transition-all duration-700"></div>
                  <div className="absolute inset-2 border border-pink-200/50 rounded-2xl opacity-0 group-hover:opacity-100 animate-ping transition-all duration-1000 delay-200"></div>

                  <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-all duration-500 delay-100"></div>
                  <div className="absolute bottom-3 left-3 w-1.5 h-1.5 bg-pink-200 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-all duration-500 delay-300"></div>
                </div>

                <h3 className="text-3xl font-bold text-gray-800 mb-6 transition-all duration-500 text-center leading-tight group-hover:text-purple-700">
                  Diseño Web
                </h3>

                <p className="text-gray-600 group-hover:text-gray-700 mb-8 leading-relaxed text-center text-lg font-medium transition-all duration-400">
                  Sitios web modernos y responsivos que cautivan usuarios y maximizan conversiones con diseños únicos.
                </p>

                {/* Características con formato Soluciones IA */}
                <div className="mb-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-green-700 font-semibold">Mobile: 100%</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                      <span className="text-purple-700 font-semibold">SEO Score: 99</span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-blue-700 font-semibold">Carga: &lt; 1s</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                      <span className="text-pink-700 font-semibold">Core Web Vitals</span>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 hover:from-purple-700 hover:via-pink-700 hover:to-purple-800 text-white py-4 rounded-2xl font-bold text-lg transition-all duration-700 transform hover:scale-105 hover:-translate-y-1 shadow-xl hover:shadow-2xl relative overflow-hidden group-hover:shadow-[0_20px_40px_-12px_rgba(168,85,247,0.4)]">
                  <span className="relative z-10 flex items-center justify-center">
                    <span className="mr-3 text-xl">🎨</span>
                    Explorar Servicio
                    <span className="ml-3 text-xl">💎</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1200"></div>
                </button>
              </div>
            </div>

            {/* Servicio 3 - Automatización de Procesos - ELEGANTE CRISTAL ESMERALDA */}
            <div className="group relative bg-white/95 backdrop-blur-sm rounded-3xl p-10 border-2 border-emerald-100/60 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-700 transform hover:-translate-y-6 hover:scale-[1.02] overflow-hidden ring-1 ring-emerald-50/50">

              {/* Glassmorphism elegante en hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/40 via-white/30 to-emerald-100/50 opacity-0 group-hover:opacity-100 transition-all duration-700 backdrop-blur-sm"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-emerald-100/30 to-white/20 opacity-0 group-hover:opacity-100 transition-all duration-900"></div>

              {/* Borde luminoso sutil */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-emerald-200/0 via-emerald-300/30 to-emerald-200/0 opacity-0 group-hover:opacity-100 transition-all duration-500" style={{padding: '1px'}}>
                <div className="w-full h-full bg-transparent rounded-3xl"></div>
              </div>

              {/* Subtle light effects */}
              <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-gradient-to-br from-emerald-200/20 via-slate-200/15 to-emerald-100/25 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-1000"></div>
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-gradient-to-tr from-slate-100/20 to-emerald-100/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-800"></div>

              {/* Elegant floating elements */}
              <div className="absolute top-8 right-8 w-3 h-3 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full opacity-0 group-hover:opacity-60 animate-bounce transition-all duration-700 delay-100 shadow-sm"></div>
              <div className="absolute top-16 right-16 w-2 h-2 bg-gradient-to-r from-emerald-500 to-slate-500 rounded-full opacity-0 group-hover:opacity-50 animate-bounce transition-all duration-700 delay-300"></div>
              <div className="absolute bottom-12 left-8 w-2.5 h-2.5 bg-gradient-to-r from-slate-400 to-emerald-400 rounded-full opacity-0 group-hover:opacity-55 animate-bounce transition-all duration-700 delay-500"></div>
              <div className="absolute bottom-20 left-16 w-1.5 h-1.5 bg-gradient-to-r from-emerald-400 to-slate-400 rounded-full opacity-0 group-hover:opacity-45 animate-bounce transition-all duration-700 delay-700"></div>

              <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-all duration-1000" style={{backgroundImage: 'radial-gradient(circle at 25% 25%, #10b981 2px, transparent 2px), radial-gradient(circle at 75% 75%, #059669 1px, transparent 1px)', backgroundSize: '24px 24px'}}></div>

              <div className="relative z-20">
                {/* Elegant icon with sophisticated effects */}
                <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-emerald-500 via-emerald-600 to-slate-600 rounded-3xl flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:shadow-emerald-300/30 transition-all duration-700 relative overflow-hidden transform group-hover:rotate-12 group-hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-all duration-1000"></div>
                  <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-white/5 to-white/20 animate-pulse"></div>

                  <span className="text-5xl absolute inset-0 flex items-center justify-center transition-all duration-1000 group-hover:scale-125 filter drop-shadow-lg">⚙️</span>

                  {/* Engranajes secundarios animados */}
                  <div className="absolute top-1 right-1 text-2xl opacity-0 group-hover:opacity-100 transition-all duration-1000 animate-spin" style={{animationDirection: 'reverse'}}>⚙️</div>
                  <div className="absolute bottom-1 left-1 text-lg opacity-0 group-hover:opacity-100 transition-all duration-1000 animate-spin delay-200">⚙️</div>

                  <div className="absolute inset-0 border-2 border-white/40 rounded-3xl opacity-0 group-hover:opacity-100 animate-pulse transition-all duration-700"></div>
                  <div className="absolute inset-2 border border-emerald-200/50 rounded-2xl opacity-0 group-hover:opacity-100 animate-ping transition-all duration-1000 delay-200"></div>
                </div>

                <h3 className="text-3xl font-bold text-gray-800 mb-6 transition-all duration-500 text-center leading-tight group-hover:text-emerald-700">
                  Automatización de Procesos
                </h3>

                <p className="text-gray-600 group-hover:text-gray-700 mb-8 leading-relaxed text-center text-lg font-medium transition-all duration-400">
                  Optimiza flujos de trabajo eliminando tareas repetitivas con soluciones inteligentes de automatización.
                </p>

                {/* Características con formato Soluciones IA */}
                <div className="mb-8 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-200">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-green-700 font-semibold">Ahorro: 80% tiempo</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                      <span className="text-emerald-700 font-semibold">Errores: 0%</span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-blue-700 font-semibold">Escalable: ∞</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                      <span className="text-purple-700 font-semibold">Flujos: +1000</span>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 hover:from-emerald-700 hover:via-green-700 hover:to-emerald-800 text-white py-4 rounded-2xl font-bold text-lg transition-all duration-700 transform hover:scale-105 hover:-translate-y-1 shadow-xl hover:shadow-2xl relative overflow-hidden group-hover:shadow-[0_20px_40px_-12px_rgba(16,185,129,0.4)]">
                  <span className="relative z-10 flex items-center justify-center">
                    <span className="mr-3 text-xl">⚙️</span>
                    Explorar Servicio
                    <span className="ml-3 text-xl">⚡</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1200"></div>
                </button>
              </div>
            </div>

            {/* Servicio 4 - Marketing Digital - ELEGANTE CRISTAL NARANJA */}
            <div className="group relative bg-white/95 backdrop-blur-sm rounded-3xl p-10 border-2 border-orange-100/60 shadow-xl hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-700 transform hover:-translate-y-6 hover:scale-[1.02] overflow-hidden ring-1 ring-orange-50/50">

              {/* Elegant light background layers */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-100/30 via-slate-100/20 to-orange-50/40 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-orange-50/40 to-slate-50/30 opacity-0 group-hover:opacity-100 transition-all duration-900"></div>

              {/* Subtle light effects */}
              <div className="absolute -top-32 -left-32 w-64 h-64 bg-gradient-to-br from-orange-200/20 via-slate-200/15 to-orange-100/25 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-1000"></div>
              <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-gradient-to-tr from-slate-100/20 to-orange-100/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-800"></div>

              {/* Elegant floating elements */}
              <div className="absolute top-8 left-8 w-3 h-3 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full opacity-0 group-hover:opacity-60 animate-bounce transition-all duration-700 delay-100 shadow-sm"></div>
              <div className="absolute top-16 left-16 w-2 h-2 bg-gradient-to-r from-orange-500 to-slate-500 rounded-full opacity-0 group-hover:opacity-50 animate-bounce transition-all duration-700 delay-300"></div>
              <div className="absolute bottom-12 right-8 w-2.5 h-2.5 bg-gradient-to-r from-slate-400 to-orange-400 rounded-full opacity-0 group-hover:opacity-55 animate-bounce transition-all duration-700 delay-500"></div>
              <div className="absolute bottom-20 right-16 w-1.5 h-1.5 bg-gradient-to-r from-orange-400 to-slate-400 rounded-full opacity-0 group-hover:opacity-45 animate-bounce transition-all duration-700 delay-700"></div>

              <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-all duration-1000" style={{backgroundImage: 'radial-gradient(circle at 25% 25%, #f59e0b 2px, transparent 2px), radial-gradient(circle at 75% 75%, #ea580c 1px, transparent 1px)', backgroundSize: '24px 24px'}}></div>

              <div className="relative z-20">
                {/* Elegant icon with sophisticated effects */}
                <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-orange-500 via-orange-600 to-slate-600 rounded-3xl flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:shadow-orange-300/30 transition-all duration-700 relative overflow-hidden transform group-hover:rotate-3 group-hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-all duration-1000"></div>
                  <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-white/5 to-white/20 animate-pulse"></div>

                  <span className="text-5xl absolute inset-0 flex items-center justify-center transition-all duration-700 group-hover:scale-125 filter drop-shadow-lg">📊</span>

                  {/* Barras de crecimiento dinámicas */}
                  <div className="absolute bottom-3 left-3 w-2 h-4 bg-white/60 opacity-0 group-hover:opacity-100 transition-all duration-700 animate-pulse rounded-sm"></div>
                  <div className="absolute bottom-3 left-6 w-2 h-5 bg-white/60 opacity-0 group-hover:opacity-100 transition-all duration-700 animate-pulse delay-200 rounded-sm"></div>
                  <div className="absolute bottom-3 right-3 w-2 h-6 bg-white/60 opacity-0 group-hover:opacity-100 transition-all duration-700 animate-pulse delay-400 rounded-sm"></div>

                  <div className="absolute inset-0 border-2 border-white/40 rounded-3xl opacity-0 group-hover:opacity-100 animate-pulse transition-all duration-700"></div>
                  <div className="absolute inset-2 border border-amber-200/50 rounded-2xl opacity-0 group-hover:opacity-100 animate-ping transition-all duration-1000 delay-200"></div>
                </div>

                <h3 className="text-3xl font-bold text-gray-800 mb-6 transition-all duration-500 text-center leading-tight group-hover:text-orange-700">
                  Marketing Digital
                </h3>

                <p className="text-gray-600 group-hover:text-gray-700 mb-8 leading-relaxed text-center text-lg font-medium transition-all duration-400">
                  Estrategias digitales inteligentes que maximizan el ROI y posicionan tu marca en el mercado competitivo.
                </p>

                {/* Características con formato Soluciones IA */}
                <div className="mb-8 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-200">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-green-700 font-semibold">ROI: +300%</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                      <span className="text-orange-700 font-semibold">Canales: +15</span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-blue-700 font-semibold">Conversión: +250%</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                      <span className="text-purple-700 font-semibold">Analytics IA</span>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 hover:from-orange-700 hover:via-amber-700 hover:to-orange-800 text-white py-4 rounded-2xl font-bold text-lg transition-all duration-700 transform hover:scale-105 hover:-translate-y-1 shadow-xl hover:shadow-2xl relative overflow-hidden group-hover:shadow-[0_20px_40px_-12px_rgba(245,158,11,0.4)]">
                  <span className="relative z-10 flex items-center justify-center">
                    <span className="mr-3 text-xl">📊</span>
                    Explorar Servicio
                    <span className="ml-3 text-xl">🔥</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1200"></div>
                </button>
              </div>
            </div>

            {/* Servicio 5 - Optimización SEO - ELEGANT LIGHT CYAN */}
            <div className="group relative bg-gradient-to-br from-slate-50/95 via-cyan-50/90 to-slate-100/95 rounded-3xl p-10 border border-cyan-200/50 shadow-lg hover:shadow-2xl hover:shadow-cyan-200/25 transition-all duration-700 transform hover:-translate-y-8 hover:scale-[1.02] overflow-hidden backdrop-blur-sm">

              {/* Elegant light background layers */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-100/30 via-slate-100/20 to-cyan-50/40 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-cyan-50/40 to-slate-50/30 opacity-0 group-hover:opacity-100 transition-all duration-900"></div>

              {/* Subtle light effects */}
              <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-gradient-to-br from-cyan-200/20 via-slate-200/15 to-cyan-100/25 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-1000"></div>
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-tr from-slate-100/20 to-cyan-100/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-800"></div>

              {/* Elegant floating elements */}
              <div className="absolute top-8 right-8 w-3 h-3 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full opacity-0 group-hover:opacity-60 animate-bounce transition-all duration-700 delay-100 shadow-sm"></div>
              <div className="absolute top-16 right-16 w-2 h-2 bg-gradient-to-r from-cyan-500 to-slate-500 rounded-full opacity-0 group-hover:opacity-50 animate-bounce transition-all duration-700 delay-300"></div>
              <div className="absolute bottom-12 left-8 w-2.5 h-2.5 bg-gradient-to-r from-slate-400 to-cyan-400 rounded-full opacity-0 group-hover:opacity-55 animate-bounce transition-all duration-700 delay-500"></div>
              <div className="absolute bottom-20 left-16 w-1.5 h-1.5 bg-gradient-to-r from-cyan-400 to-slate-400 rounded-full opacity-0 group-hover:opacity-45 animate-bounce transition-all duration-700 delay-700"></div>

              <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-all duration-1000" style={{backgroundImage: 'radial-gradient(circle at 25% 25%, #0891b2 2px, transparent 2px), radial-gradient(circle at 75% 75%, #0e7490 1px, transparent 1px)', backgroundSize: '24px 24px'}}></div>

              <div className="relative z-20">
                {/* Elegant icon with sophisticated effects */}
                <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-cyan-500 via-cyan-600 to-slate-600 rounded-3xl flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:shadow-cyan-300/30 transition-all duration-700 relative overflow-hidden transform group-hover:rotate-3 group-hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-all duration-1000"></div>
                  <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-white/5 to-white/20 animate-pulse"></div>

                  <span className="text-5xl absolute inset-0 flex items-center justify-center transition-all duration-700 group-hover:scale-125 filter drop-shadow-lg">🔍</span>

                  {/* Ondas de búsqueda concéntricas */}
                  <div className="absolute inset-0 border-2 border-white/40 rounded-3xl opacity-0 group-hover:opacity-100 animate-ping transition-all duration-700"></div>
                  <div className="absolute inset-4 border border-cyan-200/50 rounded-2xl opacity-0 group-hover:opacity-100 animate-ping transition-all duration-1000 delay-200"></div>
                  <div className="absolute inset-8 border border-teal-200/30 rounded-xl opacity-0 group-hover:opacity-100 animate-ping transition-all duration-1200 delay-400"></div>

                  <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-all duration-500 delay-100"></div>
                  <div className="absolute bottom-3 left-3 w-1.5 h-1.5 bg-cyan-200 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-all duration-500 delay-300"></div>
                </div>

                <h3 className="text-3xl font-bold text-gray-800 mb-6 transition-all duration-500 text-center leading-tight group-hover:text-cyan-700">
                  Optimización SEO
                </h3>

                <p className="text-gray-600 group-hover:text-gray-700 mb-8 leading-relaxed text-center text-lg font-medium transition-all duration-400">
                  Mejora tu posicionamiento en buscadores con estrategias SEO avanzadas y análisis de competencia.
                </p>

                {/* Características con formato Soluciones IA */}
                <div className="mb-8 bg-gradient-to-r from-cyan-50 to-teal-50 rounded-xl p-4 border border-cyan-200">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-green-700 font-semibold">Posición: Top 3</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                      <span className="text-cyan-700 font-semibold">Auditoría 360°</span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-blue-700 font-semibold">Keywords: +500</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                      <span className="text-purple-700 font-semibold">Tráfico: +400%</span>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-700 hover:from-teal-700 hover:via-cyan-700 hover:to-teal-800 text-white py-4 rounded-2xl font-bold text-lg transition-all duration-700 transform hover:scale-105 hover:-translate-y-1 shadow-xl hover:shadow-2xl relative overflow-hidden group-hover:shadow-[0_20px_40px_-12px_rgba(8,145,178,0.4)]">
                  <span className="relative z-10 flex items-center justify-center">
                    <span className="mr-3 text-xl">🔍</span>
                    Explorar Servicio
                    <span className="ml-3 text-xl">📈</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1200"></div>
                </button>
              </div>
            </div>

            {/* Servicio 6 - Software as a Service SAAS - ELEGANTE CRISTAL ÍNDIGO */}
            <div className="group relative bg-white/95 backdrop-blur-sm rounded-3xl p-10 border-2 border-indigo-100/60 shadow-xl hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-700 transform hover:-translate-y-6 hover:scale-[1.02] overflow-hidden ring-1 ring-indigo-50/50">

              {/* Glassmorphism elegante en hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/40 via-white/30 to-indigo-100/50 opacity-0 group-hover:opacity-100 transition-all duration-700 backdrop-blur-sm"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-indigo-100/30 to-white/20 opacity-0 group-hover:opacity-100 transition-all duration-900"></div>

              {/* Borde luminoso sutil */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-200/0 via-indigo-300/30 to-indigo-200/0 opacity-0 group-hover:opacity-100 transition-all duration-500" style={{padding: '1px'}}>
                <div className="w-full h-full bg-transparent rounded-3xl"></div>
              </div>

              {/* Efectos de luz sutiles */}
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-indigo-200/20 via-slate-200/15 to-indigo-100/25 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-1000"></div>
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-gradient-to-tr from-slate-100/20 to-indigo-100/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-800"></div>

              {/* Partículas flotantes elegantes */}
              <div className="absolute top-8 right-8 w-3 h-3 bg-gradient-to-r from-indigo-400 to-indigo-500 rounded-full opacity-0 group-hover:opacity-60 animate-bounce transition-all duration-700 delay-100 shadow-sm"></div>
              <div className="absolute top-16 right-16 w-2 h-2 bg-gradient-to-r from-indigo-500 to-slate-500 rounded-full opacity-0 group-hover:opacity-50 animate-bounce transition-all duration-700 delay-300"></div>
              <div className="absolute bottom-12 left-8 w-2.5 h-2.5 bg-gradient-to-r from-slate-400 to-indigo-400 rounded-full opacity-0 group-hover:opacity-55 animate-bounce transition-all duration-700 delay-500"></div>
              <div className="absolute bottom-20 left-16 w-1.5 h-1.5 bg-gradient-to-r from-indigo-400 to-slate-400 rounded-full opacity-0 group-hover:opacity-45 animate-bounce transition-all duration-700 delay-700"></div>

              <div className="relative z-10 text-center">
                {/* Contenedor del ícono con efectos elegantes */}
                <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-indigo-400 via-violet-500 to-indigo-500 rounded-3xl flex items-center justify-center shadow-2xl group-hover:shadow-xl transition-all duration-700 relative overflow-hidden transform group-hover:scale-110">
                  {/* Efectos de luz internos */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                  <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-white/5 to-white/20 opacity-30 group-hover:opacity-60 transition-all duration-700"></div>

                  {/* Icono principal con transición */}
                  <span className="text-5xl text-white drop-shadow-lg transition-all duration-700 group-hover:scale-110">☁️</span>

                  {/* Anillos de energía sutiles */}
                  <div className="absolute inset-2 border-2 border-white/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 animate-pulse"></div>
                  <div className="absolute inset-4 border border-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-700 animate-ping delay-200"></div>
                </div>

                <h3 className="text-3xl font-bold text-gray-900 mb-6 group-hover:text-indigo-600 transition-colors duration-500 leading-tight">
                  SAAS
                </h3>

                <p className="text-gray-600 mb-8 leading-relaxed text-lg group-hover:text-gray-700 transition-colors duration-500">
                  Software como servicio escalables en la nube con arquitectura moderna y servicios gestionados profesionales.
                </p>

                {/* Características con formato Soluciones IA */}
                <div className="mb-8 bg-gradient-to-r from-indigo-50 to-violet-50 rounded-xl p-4 border border-indigo-200">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-green-700 font-semibold">Escalabilidad: ∞</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
                      <span className="text-indigo-700 font-semibold">Cloud Native</span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-blue-700 font-semibold">API-First</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                      <span className="text-purple-700 font-semibold">SLA: 99.99%</span>
                    </div>
                  </div>
                </div>

                {/* Botón elegante */}
                <button className="w-full bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white py-4 rounded-2xl font-bold text-lg transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl relative overflow-hidden group">
                  <span className="relative z-10 flex items-center justify-center">
                    <span className="mr-3 text-xl">☁️</span>
                    Explorar Servicio
                    <span className="ml-3 text-xl">🌟</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
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
            
            {/* Columna Derecha - NUEVO ECOSISTEMA IA HOLOGRÁFICO */}
            <div className="relative lg:order-2 order-1 mb-12 lg:mb-0">
              <div className="w-full max-w-[400px] sm:w-[450px] lg:w-[500px] h-[400px] sm:h-[450px] lg:h-[500px] mx-auto relative">

                {/* Fondo holográfico principal */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-800/40 to-pink-900/30 rounded-3xl backdrop-blur-lg border border-white/10"></div>

                {/* Grid de conexiones de fondo */}
                <div className="absolute inset-0 opacity-20">
                  <svg className="w-full h-full" viewBox="0 0 400 400">
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(139, 92, 246, 0.3)" strokeWidth="1"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                </div>

                {/* Núcleo Central - Cerebro IA */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 shadow-2xl border-4 border-white/30 flex items-center justify-center animate-pulse">
                  <div className="text-center text-white">
                    <div className="text-4xl mb-1">🧠</div>
                    <div className="text-sm font-bold">IA Core</div>
                  </div>

                  {/* Pulsos de energía */}
                  <div className="absolute inset-0 rounded-full border-2 border-white/40 animate-ping"></div>
                  <div className="absolute inset-0 rounded-full border border-cyan-300/50 animate-ping" style={{animationDelay: '0.5s'}}></div>
                  <div className="absolute inset-0 rounded-full border border-pink-300/40 animate-ping" style={{animationDelay: '1s'}}></div>
                </div>

                {/* Satélites orbitales - Módulos de IA */}
                <div className="absolute inset-0 animate-spin" style={{animationDuration: '20s'}}>
                  {/* Módulo 1 - Análisis Predictivo */}
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-2xl flex items-center justify-center text-white shadow-xl border-2 border-emerald-300/50 group hover:scale-110 transition-all duration-500">
                    <div className="text-center animate-none">
                      <div className="text-2xl mb-1">📊</div>
                      <div className="text-xs font-bold">Análisis</div>
                      <div className="text-xs opacity-80">Predictivo</div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                  </div>

                  {/* Módulo 2 - Automatización */}
                  <div className="absolute top-1/2 right-8 transform -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-orange-400 to-red-600 rounded-2xl flex items-center justify-center text-white shadow-xl border-2 border-orange-300/50 group hover:scale-110 transition-all duration-500">
                    <div className="text-center animate-none">
                      <div className="text-2xl mb-1">⚙️</div>
                      <div className="text-xs font-bold">Auto</div>
                      <div className="text-xs opacity-80">mación</div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                  </div>

                  {/* Módulo 3 - Machine Learning */}
                  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-gradient-to-br from-purple-400 to-violet-600 rounded-2xl flex items-center justify-center text-white shadow-xl border-2 border-purple-300/50 group hover:scale-110 transition-all duration-500">
                    <div className="text-center animate-none">
                      <div className="text-2xl mb-1">🤖</div>
                      <div className="text-xs font-bold">Machine</div>
                      <div className="text-xs opacity-80">Learning</div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                  </div>

                  {/* Módulo 4 - Natural Language */}
                  <div className="absolute top-1/2 left-8 transform -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl border-2 border-cyan-300/50 group hover:scale-110 transition-all duration-500">
                    <div className="text-center animate-none">
                      <div className="text-2xl mb-1">💬</div>
                      <div className="text-xs font-bold">Natural</div>
                      <div className="text-xs opacity-80">Language</div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                  </div>
                </div>

                {/* Órbita intermedia - Conectores de datos */}
                <div className="absolute inset-0 animate-spin" style={{animationDuration: '15s', animationDirection: 'reverse'}}>
                  <div className="absolute top-16 right-16 w-6 h-6 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full shadow-lg animate-pulse"></div>
                  <div className="absolute bottom-16 right-16 w-8 h-8 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full shadow-lg animate-pulse" style={{animationDelay: '0.5s'}}></div>
                  <div className="absolute bottom-16 left-16 w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full shadow-lg animate-pulse" style={{animationDelay: '1s'}}></div>
                  <div className="absolute top-16 left-16 w-7 h-7 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full shadow-lg animate-pulse" style={{animationDelay: '1.5s'}}></div>
                </div>

                {/* Conexiones de datos animadas */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                  <defs>
                    <linearGradient id="dataFlow1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8">
                        <animate attributeName="stop-opacity" values="0.2;0.8;0.2" dur="2s" repeatCount="indefinite"/>
                      </stop>
                      <stop offset="100%" stopColor="#EC4899" stopOpacity="0.8">
                        <animate attributeName="stop-opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite"/>
                      </stop>
                    </linearGradient>
                    <linearGradient id="dataFlow2" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#10B981" stopOpacity="0.6">
                        <animate attributeName="stop-opacity" values="0.6;0.1;0.6" dur="1.5s" repeatCount="indefinite"/>
                      </stop>
                      <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.6">
                        <animate attributeName="stop-opacity" values="0.1;0.6;0.1" dur="1.5s" repeatCount="indefinite"/>
                      </stop>
                    </linearGradient>
                  </defs>

                  {/* Líneas de datos dinámicas */}
                  <path d="M200 200 Q120 120 50 200 Q120 280 200 200 Q280 120 350 200 Q280 280 200 200"
                        stroke="url(#dataFlow1)"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray="8,4"
                        className="animate-pulse"/>

                  <path d="M200 200 Q200 120 120 160 Q200 280 280 160 Q200 120 200 200"
                        stroke="url(#dataFlow2)"
                        strokeWidth="1.5"
                        fill="none"
                        strokeDasharray="6,3"
                        className="animate-pulse"/>
                </svg>

                {/* Partículas de datos flotantes */}
                <div className="absolute top-6 left-6 w-3 h-3 bg-cyan-400 rounded-full animate-bounce opacity-70" style={{animationDelay: '0s'}}></div>
                <div className="absolute top-20 right-8 w-2 h-2 bg-pink-400 rounded-full animate-bounce opacity-60" style={{animationDelay: '0.3s'}}></div>
                <div className="absolute bottom-12 left-12 w-4 h-4 bg-emerald-400 rounded-full animate-bounce opacity-80" style={{animationDelay: '0.6s'}}></div>
                <div className="absolute bottom-6 right-6 w-2 h-2 bg-purple-400 rounded-full animate-bounce opacity-50" style={{animationDelay: '0.9s'}}></div>
                <div className="absolute top-1/3 left-4 w-3 h-3 bg-yellow-400 rounded-full animate-bounce opacity-65" style={{animationDelay: '1.2s'}}></div>
                <div className="absolute top-2/3 right-4 w-2 h-2 bg-blue-400 rounded-full animate-bounce opacity-75" style={{animationDelay: '1.5s'}}></div>

                {/* Efecto holográfico exterior */}
                <div className="absolute -inset-4 bg-gradient-to-br from-blue-600/10 via-purple-600/15 to-pink-600/10 rounded-3xl blur-xl animate-pulse"></div>
                <div className="absolute -inset-8 bg-gradient-to-tr from-cyan-500/5 via-purple-500/10 to-pink-500/5 rounded-3xl blur-2xl animate-pulse" style={{animationDelay: '0.5s'}}></div>

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
                  <OptimizedImage
                    src="/noticia1.webp"
                    alt="Automatización Inteligente"
                    width={400}
                    height={192}
                    className="w-full h-full object-cover"
                  />
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
                  <OptimizedImage
                    src="/noticia2.webp"
                    alt="Chatbots Inteligentes"
                    width={400}
                    height={192}
                    className="w-full h-full object-cover"
                  />
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
                  <OptimizedImage
                    src="/noticia3.webp"
                    alt="Flujos de Trabajo Inteligentes"
                    width={400}
                    height={192}
                    className="w-full h-full object-cover"
                  />
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
            
            {/* Columna Derecha - NUEVO ECOSISTEMA IA HOLOGRÁFICO */}
            <div className="relative lg:order-2 order-1 mb-12 lg:mb-0">
              <div className="w-full max-w-[400px] sm:w-[450px] lg:w-[500px] h-[400px] sm:h-[450px] lg:h-[500px] mx-auto relative">

                {/* Fondo holográfico principal */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-800/40 to-pink-900/30 rounded-3xl backdrop-blur-lg border border-white/10"></div>

                {/* Grid de conexiones de fondo */}
                <div className="absolute inset-0 opacity-20">
                  <svg className="w-full h-full" viewBox="0 0 400 400">
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(139, 92, 246, 0.3)" strokeWidth="1"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                </div>

                {/* Núcleo Central - Cerebro IA */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 shadow-2xl border-4 border-white/30 flex items-center justify-center animate-pulse">
                  <div className="text-center text-white">
                    <div className="text-4xl mb-1">🧠</div>
                    <div className="text-sm font-bold">IA Core</div>
                  </div>

                  {/* Pulsos de energía */}
                  <div className="absolute inset-0 rounded-full border-2 border-white/40 animate-ping"></div>
                  <div className="absolute inset-0 rounded-full border border-cyan-300/50 animate-ping" style={{animationDelay: '0.5s'}}></div>
                  <div className="absolute inset-0 rounded-full border border-pink-300/40 animate-ping" style={{animationDelay: '1s'}}></div>
                </div>

                {/* Satélites orbitales - Módulos de IA */}
                <div className="absolute inset-0 animate-spin" style={{animationDuration: '20s'}}>
                  {/* Módulo 1 - Análisis Predictivo */}
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-2xl flex items-center justify-center text-white shadow-xl border-2 border-emerald-300/50 group hover:scale-110 transition-all duration-500">
                    <div className="text-center animate-none">
                      <div className="text-2xl mb-1">📊</div>
                      <div className="text-xs font-bold">Análisis</div>
                      <div className="text-xs opacity-80">Predictivo</div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                  </div>

                  {/* Módulo 2 - Automatización */}
                  <div className="absolute top-1/2 right-8 transform -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-orange-400 to-red-600 rounded-2xl flex items-center justify-center text-white shadow-xl border-2 border-orange-300/50 group hover:scale-110 transition-all duration-500">
                    <div className="text-center animate-none">
                      <div className="text-2xl mb-1">⚙️</div>
                      <div className="text-xs font-bold">Auto</div>
                      <div className="text-xs opacity-80">mación</div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                  </div>

                  {/* Módulo 3 - Machine Learning */}
                  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-gradient-to-br from-purple-400 to-violet-600 rounded-2xl flex items-center justify-center text-white shadow-xl border-2 border-purple-300/50 group hover:scale-110 transition-all duration-500">
                    <div className="text-center animate-none">
                      <div className="text-2xl mb-1">🤖</div>
                      <div className="text-xs font-bold">Machine</div>
                      <div className="text-xs opacity-80">Learning</div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                  </div>

                  {/* Módulo 4 - Natural Language */}
                  <div className="absolute top-1/2 left-8 transform -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl border-2 border-cyan-300/50 group hover:scale-110 transition-all duration-500">
                    <div className="text-center animate-none">
                      <div className="text-2xl mb-1">💬</div>
                      <div className="text-xs font-bold">Natural</div>
                      <div className="text-xs opacity-80">Language</div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                  </div>
                </div>

                {/* Órbita intermedia - Conectores de datos */}
                <div className="absolute inset-0 animate-spin" style={{animationDuration: '15s', animationDirection: 'reverse'}}>
                  <div className="absolute top-16 right-16 w-6 h-6 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full shadow-lg animate-pulse"></div>
                  <div className="absolute bottom-16 right-16 w-8 h-8 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full shadow-lg animate-pulse" style={{animationDelay: '0.5s'}}></div>
                  <div className="absolute bottom-16 left-16 w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full shadow-lg animate-pulse" style={{animationDelay: '1s'}}></div>
                  <div className="absolute top-16 left-16 w-7 h-7 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full shadow-lg animate-pulse" style={{animationDelay: '1.5s'}}></div>
                </div>

                {/* Conexiones de datos animadas */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                  <defs>
                    <linearGradient id="dataFlow1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8">
                        <animate attributeName="stop-opacity" values="0.2;0.8;0.2" dur="2s" repeatCount="indefinite"/>
                      </stop>
                      <stop offset="100%" stopColor="#EC4899" stopOpacity="0.8">
                        <animate attributeName="stop-opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite"/>
                      </stop>
                    </linearGradient>
                    <linearGradient id="dataFlow2" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#10B981" stopOpacity="0.6">
                        <animate attributeName="stop-opacity" values="0.6;0.1;0.6" dur="1.5s" repeatCount="indefinite"/>
                      </stop>
                      <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.6">
                        <animate attributeName="stop-opacity" values="0.1;0.6;0.1" dur="1.5s" repeatCount="indefinite"/>
                      </stop>
                    </linearGradient>
                  </defs>

                  {/* Líneas de datos dinámicas */}
                  <path d="M200 200 Q120 120 50 200 Q120 280 200 200 Q280 120 350 200 Q280 280 200 200"
                        stroke="url(#dataFlow1)"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray="8,4"
                        className="animate-pulse"/>

                  <path d="M200 200 Q200 120 120 160 Q200 280 280 160 Q200 120 200 200"
                        stroke="url(#dataFlow2)"
                        strokeWidth="1.5"
                        fill="none"
                        strokeDasharray="6,3"
                        className="animate-pulse"/>
                </svg>

                {/* Partículas de datos flotantes */}
                <div className="absolute top-6 left-6 w-3 h-3 bg-cyan-400 rounded-full animate-bounce opacity-70" style={{animationDelay: '0s'}}></div>
                <div className="absolute top-20 right-8 w-2 h-2 bg-pink-400 rounded-full animate-bounce opacity-60" style={{animationDelay: '0.3s'}}></div>
                <div className="absolute bottom-12 left-12 w-4 h-4 bg-emerald-400 rounded-full animate-bounce opacity-80" style={{animationDelay: '0.6s'}}></div>
                <div className="absolute bottom-6 right-6 w-2 h-2 bg-purple-400 rounded-full animate-bounce opacity-50" style={{animationDelay: '0.9s'}}></div>
                <div className="absolute top-1/3 left-4 w-3 h-3 bg-yellow-400 rounded-full animate-bounce opacity-65" style={{animationDelay: '1.2s'}}></div>
                <div className="absolute top-2/3 right-4 w-2 h-2 bg-blue-400 rounded-full animate-bounce opacity-75" style={{animationDelay: '1.5s'}}></div>

                {/* Efecto holográfico exterior */}
                <div className="absolute -inset-4 bg-gradient-to-br from-blue-600/10 via-purple-600/15 to-pink-600/10 rounded-3xl blur-xl animate-pulse"></div>
                <div className="absolute -inset-8 bg-gradient-to-tr from-cyan-500/5 via-purple-500/10 to-pink-500/5 rounded-3xl blur-2xl animate-pulse" style={{animationDelay: '0.5s'}}></div>

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
