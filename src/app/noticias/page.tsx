'use client';

import Footer from '@/components/Footer';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Noticias() {
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
  const noticias = [
    {
      id: 'automatizacion-inteligente-avanzada',
      titulo: "Automatización Inteligente Avanzada: El Futuro de la Eficiencia Empresarial",
      fecha: "15 de Enero, 2025",
      categoria: "Automatización",
      resumen: "Descubre cómo la inteligencia artificial está revolucionando los procesos empresariales, aumentando la productividad en un 40% y reduciendo errores operativos en un 60%.",
      imagen: "/noticia1.webp",
      autor: "Dr. Carlos Méndez",
      tiempoLectura: "5 min",
      tags: ["Automatización", "IA", "Eficiencia", "Procesos"]
    },
    {
      id: 'chatbots-que-entienden-contexto',
      titulo: "Chatbots que Entienden Contexto: La Nueva Era de la Atención al Cliente",
      fecha: "12 de Enero, 2025",
      categoria: "Inteligencia Artificial",
      resumen: "Los chatbots inteligentes están transformando la experiencia del cliente con capacidades de comprensión contextual avanzada y respuestas personalizadas.",
      imagen: "/noticia2.webp",
      autor: "Dra. Ana Rodríguez",
      tiempoLectura: "4 min",
      tags: ["Chatbots", "IA", "Atención al Cliente", "Contexto"]
    },
    {
      id: 'flujos-de-trabajo-inteligentes',
      titulo: "Flujos de Trabajo Inteligentes: Optimizando Operaciones con IA",
      fecha: "10 de Enero, 2025",
      categoria: "Productividad",
      resumen: "Cómo implementar flujos de trabajo inteligentes que se adaptan automáticamente a las necesidades cambiantes de tu empresa.",
      imagen: "/noticia3.webp",
      autor: "Ing. Miguel Torres",
      tiempoLectura: "6 min",
      tags: ["Flujos de Trabajo", "IA", "Productividad", "Optimización"]
    }
  ];

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
      
      {/* Header de la Página */}
      <section className="bg-white pt-24">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Noticias de Ciencia y Tecnología
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Mantente informado sobre los últimos avances en inteligencia artificial, 
              automatización y transformación digital empresarial.
            </p>
          </div>
        </div>
      </section>

      {/* Grid de Noticias */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {noticias.map((noticia) => (
              <article 
                key={noticia.id} 
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
              >
                {/* Imagen */}
                <div className="aspect-video bg-gray-100 overflow-hidden">
                  <img 
                    src={noticia.imagen} 
                    alt={noticia.titulo}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Contenido */}
                <div className="p-6">
                  {/* Meta información */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <span className="font-medium text-blue-600">{noticia.categoria}</span>
                    <span>{noticia.fecha}</span>
                  </div>
                  
                  {/* Título */}
                  <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 leading-tight">
                    {noticia.titulo}
                  </h2>
                  
                  {/* Resumen */}
                  <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                    {noticia.resumen}
                  </p>
                  
                  {/* Footer del artículo */}
                  <div className="flex items-center justify-end">
                    <Link 
                      href={`/noticias/${noticia.id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200"
                    >
                      Leer más →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}


