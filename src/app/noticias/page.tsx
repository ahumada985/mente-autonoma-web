'use client';

import Footer from '@/components/Footer';
import Link from 'next/link';

export default function Noticias() {
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
    },
    {
      id: 'ia-para-pequenas-empresas',
      titulo: "IA para Pequeñas Empresas: Democratizando la Tecnología Avanzada",
      fecha: "8 de Enero, 2025",
      categoria: "Transformación Digital",
      resumen: "Soluciones accesibles de inteligencia artificial que permiten a las pequeñas empresas competir con corporaciones más grandes.",
      imagen: "/noticia1.webp",
      autor: "Lic. Patricia Vargas",
      tiempoLectura: "4 min",
      tags: ["IA", "PYMES", "Transformación Digital", "Competitividad"]
    },
    {
      id: 'noticia1',
      titulo: "Machine Learning en el Análisis de Datos: Revelando Insights Ocultos",
      fecha: "5 de Enero, 2025",
      categoria: "Machine Learning",
      resumen: "Técnicas avanzadas de machine learning que están transformando la forma en que las empresas analizan y utilizan sus datos.",
      imagen: "/noticia2.webp",
      autor: "Dr. Roberto Silva",
      tiempoLectura: "7 min",
      tags: ["Machine Learning", "Análisis de Datos", "IA", "Insights"]
    },
    {
      id: 'noticia2',
      titulo: "Inteligencia Artificial Generativa: Creando Contenido del Futuro",
      fecha: "3 de Enero, 2025",
      categoria: "IA Generativa",
      resumen: "Explorando las capacidades revolucionarias de la IA generativa en la creación de contenido, diseño y desarrollo de productos.",
      imagen: "/noticia3.webp",
      autor: "Dra. Carmen Morales",
      tiempoLectura: "6 min",
      tags: ["IA Generativa", "Contenido", "Diseño", "Innovación"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header especial para páginas legales */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-lg font-bold">AI</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Mente Autónoma</h1>
                <p className="text-sm text-gray-600">Soluciones Digitales</p>
              </div>
            </Link>
            
            {/* Menu */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Inicio
              </Link>
              <Link href="/noticias" className="text-blue-600 px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Noticias
              </Link>
              <Link href="/servicios-desarrollo-web" className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Servicios
              </Link>
            </nav>
            
            {/* CTA Button */}
            <div className="flex items-center space-x-4">
              <Link 
                href="/#contacto" 
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl border-0 backdrop-blur-sm"
              >
                Ver Demo
              </Link>
            </div>
          </div>
        </div>
      </header>
      
      {/* Header de la Página */}
      <section className="bg-white border-b border-gray-200">
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
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{noticia.autor}</span>
                      <span>•</span>
                      <span>{noticia.tiempoLectura}</span>
                    </div>
                    
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


