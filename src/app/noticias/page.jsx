'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';

export default function Noticias() {
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);

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
      id: 1,
      titulo: "Inteligencia Artificial en la Medicina: Avances Revolucionarios del 2025",
      resumen: "Descubre cómo la IA está transformando el diagnóstico médico, la investigación farmacéutica y la atención al paciente con tecnologías de vanguardia.",
      imagen: "/noticia1.webp",
      categoria: "Tecnología Médica",
      fecha: "15 de Marzo, 2025",
      autor: "Dr. Ana Martínez",
      tiempoLectura: "8 min",
      destacada: true
    },
    {
      id: 2,
      titulo: "Machine Learning en Finanzas: Predicción de Mercados con Precisión Sin Precedentes",
      resumen: "Análisis profundo de cómo los algoritmos de ML están revolucionando el análisis financiero y la gestión de riesgos en mercados globales.",
      imagen: "/noticia2.webp",
      categoria: "Fintech",
      fecha: "12 de Marzo, 2025",
      autor: "Carlos Rodríguez",
      tiempoLectura: "6 min",
      destacada: false
    },
    {
      id: 3,
      titulo: "Chatbots Empresariales: Transformando la Atención al Cliente",
      resumen: "Estudio de caso sobre la implementación exitosa de chatbots inteligentes en empresas líderes y su impacto en la satisfacción del cliente.",
      imagen: "/noticia3.webp",
      categoria: "Automatización",
      fecha: "10 de Marzo, 2025",
      autor: "María González",
      tiempoLectura: "5 min",
      destacada: false
    },
    {
      id: 4,
      titulo: "Computer Vision: Aplicaciones Industriales que Revolucionan la Producción",
      resumen: "Exploramos cómo la visión por computadora está optimizando procesos industriales, desde control de calidad hasta mantenimiento predictivo.",
      imagen: "/noticia4.webp",
      categoria: "Industria 4.0",
      fecha: "8 de Marzo, 2025",
      autor: "Ing. Luis Pérez",
      tiempoLectura: "7 min",
      destacada: false
    },
    {
      id: 5,
      titulo: "Procesamiento de Lenguaje Natural: Comprendiendo el Contexto Humano",
      resumen: "Análisis técnico de los avances en NLP y cómo las máquinas están aprendiendo a entender mejor el lenguaje humano natural.",
      imagen: "/noticia5.webp",
      categoria: "Lingüística Computacional",
      fecha: "5 de Marzo, 2025",
      autor: "Dra. Elena Silva",
      tiempoLectura: "9 min",
      destacada: false
    },
    {
      id: 6,
      titulo: "Automatización Inteligente: El Futuro del Trabajo en la Era de la IA",
      resumen: "Reflexiones sobre cómo la automatización basada en IA está redefiniendo roles laborales y creando nuevas oportunidades profesionales.",
      imagen: "/noticia6.webp",
      categoria: "Futuro del Trabajo",
      fecha: "3 de Marzo, 2025",
      autor: "Prof. Roberto Vargas",
      tiempoLectura: "10 min",
      destacada: false
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header con transparencia dinámica */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isHeaderSticky 
          ? 'bg-white border-b border-gray-200 shadow-sm' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <Link href="/contacto" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300">
                Contacto
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section Simple y Formal */}
      <section className="bg-gray-900 text-white pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-sm font-medium mb-6 rounded">
            📰 Centro de Investigación
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Noticias y
            <span className="block text-blue-400">Análisis Científico</span>
          </h1>
          
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Información rigurosa sobre los últimos avances en inteligencia artificial, 
            automatización y tecnologías emergentes.
          </p>
        </div>
      </section>

      {/* Contenido Principal */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Noticia Destacada */}
        {noticias.filter(n => n.destacada).map(noticia => (
          <article key={noticia.id} className="mb-20">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img 
                    src={noticia.imagen} 
                    alt={noticia.titulo}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                      {noticia.categoria}
                    </span>
                    <span className="text-gray-500 text-sm">{noticia.fecha}</span>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                    {noticia.titulo}
                  </h2>
                  
                  <p className="text-gray-600 text-base leading-relaxed mb-6">
                    {noticia.resumen}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Por {noticia.autor}</span>
                      <span>•</span>
                      <span>{noticia.tiempoLectura} de lectura</span>
                    </div>
                    
                    <Link 
                      href={`/noticias/${noticia.id}`}
                      className="inline-flex items-center px-4 py-2 bg-gray-900 text-white font-medium rounded hover:bg-gray-800 transition-colors duration-200"
                    >
                      Leer Artículo
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}

        {/* Grid de Noticias */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {noticias.filter(n => !n.destacada).map(noticia => (
            <article key={noticia.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <img 
                src={noticia.imagen} 
                alt={noticia.titulo}
                className="w-full h-48 object-cover"
              />
              
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                    {noticia.categoria}
                  </span>
                  <span className="text-gray-500 text-xs">{noticia.fecha}</span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight">
                  {noticia.titulo}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {noticia.resumen}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    <span>{noticia.autor}</span>
                    <span className="mx-2">•</span>
                    <span>{noticia.tiempoLectura}</span>
                  </div>
                  
                  <Link 
                    href={`/noticias/${noticia.id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    Leer más →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Section Simple */}
        <section className="mt-20 bg-gray-50 border border-gray-200 rounded-lg p-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Mantente Informado
            </h2>
            <p className="text-gray-600 mb-6">
              Recibe las últimas noticias sobre IA y tecnologías emergentes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Tu email aquí..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200">
                Suscribirse
              </button>
            </div>
            
            <p className="text-xs text-gray-500 mt-3">
              Sin spam. Solo contenido relevante y de calidad.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
