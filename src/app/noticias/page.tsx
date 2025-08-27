'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function Noticias() {
  const noticias = [
    {
      id: 1,
      title: 'La IA Revoluciona el Desarrollo Web en 2025',
      excerpt: 'Las tecnologías de inteligencia artificial están transformando la forma en que se desarrollan los sitios web, ofreciendo experiencias más personalizadas y eficientes.',
      content: `El desarrollo web está experimentando una revolución sin precedentes gracias a la inteligencia artificial. En 2025, estamos viendo cómo la IA no solo automatiza procesos de desarrollo, sino que también crea experiencias de usuario más inteligentes y personalizadas.

Las principales tendencias incluyen:
• Generación automática de código
• Optimización inteligente de rendimiento
• Personalización dinámica de contenido
• Análisis predictivo de comportamiento del usuario

Esta transformación está permitiendo a las empresas crear sitios web más sofisticados en menos tiempo, con un enfoque cada vez mayor en la experiencia del usuario y la conversión.`,
      author: 'Equipo Mente Autónoma',
      date: '15 de Enero, 2025',
      category: 'Tecnología',
      readTime: '5 min',
      image: '/api/placeholder/600/400',
      featured: true
    },
    {
      id: 2,
      title: 'Next.js 15: Las Nuevas Características que Cambiarán el Desarrollo Web',
      excerpt: 'La última versión de Next.js introduce mejoras significativas en rendimiento, SEO y experiencia de desarrollador.',
      content: `Next.js 15 representa un salto significativo en el ecosistema de React, introduciendo características que transformarán la forma en que desarrollamos aplicaciones web modernas.

Características destacadas:
• Compilación más rápida con Turbopack
• Mejoras en el sistema de enrutamiento
• Optimizaciones automáticas de imágenes
• Mejor soporte para TypeScript

Estas mejoras no solo benefician a los desarrolladores, sino que también resultan en aplicaciones más rápidas y eficientes para los usuarios finales.`,
      author: 'Carlos Rodríguez',
      date: '12 de Enero, 2025',
      category: 'Desarrollo Web',
      readTime: '7 min',
      image: '/api/placeholder/600/400'
    },
    {
      id: 3,
      title: 'El Futuro del E-commerce: Tendencias 2025',
      excerpt: 'Las nuevas tecnologías están redefiniendo la experiencia de compra online, desde la realidad aumentada hasta la IA personalizada.',
      content: `El comercio electrónico está evolucionando más rápido que nunca, impulsado por tecnologías emergentes que están transformando la experiencia de compra.

Tendencias principales:
• Realidad aumentada para probar productos
• Chatbots inteligentes para atención al cliente
• Personalización basada en IA
• Pagos con criptomonedas
• Comercio social integrado

Estas innovaciones están creando experiencias de compra más inmersivas y convenientes, lo que resulta en mayores tasas de conversión y satisfacción del cliente.`,
      author: 'María González',
      date: '10 de Enero, 2025',
      category: 'E-commerce',
      readTime: '6 min',
      image: '/api/placeholder/600/400'
    },
    {
      id: 4,
      title: 'WordPress vs. Tecnologías Modernas: ¿Cuál Elegir en 2025?',
      excerpt: 'Análisis comparativo de las ventajas y desventajas de WordPress frente a las tecnologías de desarrollo web modernas.',
      content: `La elección entre WordPress y tecnologías modernas como Next.js o React sigue siendo un tema de debate en la comunidad de desarrollo web.

WordPress ofrece:
• Facilidad de uso para principiantes
• Gran ecosistema de plugins
• SEO optimizado por defecto
• Costos iniciales bajos

Tecnologías modernas proporcionan:
• Mayor flexibilidad y personalización
• Mejor rendimiento
• Escalabilidad superior
• Control total sobre el código

La decisión debe basarse en los requisitos específicos del proyecto, el presupuesto y la experiencia técnica del equipo.`,
      author: 'Ana Martínez',
      date: '8 de Enero, 2025',
      category: 'Análisis',
      readTime: '8 min',
      image: '/api/placeholder/600/400'
    },
    {
      id: 5,
      title: 'Optimización SEO para 2025: Más Allá de las Palabras Clave',
      excerpt: 'El SEO moderno requiere un enfoque holístico que incluya experiencia del usuario, Core Web Vitals y contenido de valor.',
      content: `El SEO ha evolucionado significativamente, y en 2025, las estrategias tradicionales basadas únicamente en palabras clave ya no son suficientes.

Factores críticos modernos:
• Core Web Vitals y rendimiento
• Experiencia del usuario (UX)
• Contenido de valor y autoridad
• Intención de búsqueda
• E-A-T (Experiencia, Autoridad, Confiabilidad)

Google está priorizando cada vez más la calidad de la experiencia del usuario, lo que significa que los sitios web deben ser rápidos, accesibles y proporcionar valor real a los visitantes.`,
      author: 'Luis Fernández',
      date: '5 de Enero, 2025',
      category: 'SEO',
      readTime: '9 min',
      image: '/api/placeholder/600/400'
    },
    {
      id: 6,
      title: 'La Importancia de la Accesibilidad Web en el Desarrollo Moderno',
      excerpt: 'Crear sitios web accesibles no solo es una buena práctica, sino también un requisito legal y ético en muchos países.',
      content: `La accesibilidad web se ha convertido en un aspecto fundamental del desarrollo web moderno, especialmente considerando que más del 15% de la población mundial vive con algún tipo de discapacidad.

Principios de accesibilidad:
• Perceptible: La información debe ser presentable de formas que los usuarios puedan percibir
• Operable: Los componentes de la interfaz deben ser operables
• Comprensible: La información y operación de la interfaz deben ser comprensibles
• Robusto: El contenido debe ser interpretable por una amplia variedad de tecnologías

Implementar accesibilidad desde el inicio del desarrollo no solo mejora la experiencia para usuarios con discapacidades, sino que también beneficia a todos los usuarios y mejora el SEO.`,
      author: 'Sofía Ramírez',
      date: '3 de Enero, 2025',
      category: 'Accesibilidad',
      readTime: '7 min',
      image: '/api/placeholder/600/400'
    }
  ];

  const categories = ['Todas', 'Tecnología', 'Desarrollo Web', 'E-commerce', 'Análisis', 'SEO', 'Accesibilidad'];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Noticias y
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Tendencias
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Mantente actualizado con las últimas noticias, tendencias y análisis del mundo del desarrollo web, 
            tecnología y transformación digital.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-2 rounded-full bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured News */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Noticia Destacada
          </h2>
          
          {noticias.filter(n => n.featured).map((noticia) => (
            <div key={noticia.id} className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-12 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-6xl mb-4">📰</div>
                    <h3 className="text-2xl font-bold mb-4">{noticia.title}</h3>
                    <p className="text-blue-100 mb-6">{noticia.excerpt}</p>
                    <div className="flex items-center justify-center space-x-4 text-sm text-blue-100">
                      <span>👤 {noticia.author}</span>
                      <span>📅 {noticia.date}</span>
                      <span>⏱️ {noticia.readTime}</span>
                    </div>
                  </div>
                </div>
                <div className="p-12">
                  <div className="mb-6">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                      {noticia.category}
                    </span>
                  </div>
                  <div className="prose prose-lg max-w-none text-gray-700">
                    {noticia.content.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="mb-4 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  <button className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Leer Artículo Completo
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* News Grid */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Últimas Noticias
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {noticias.filter(n => !n.featured).map((noticia) => (
              <article key={noticia.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <div className="text-4xl">📱</div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                      {noticia.category}
                    </span>
                    <span className="text-sm text-gray-500">{noticia.readTime}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {noticia.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {noticia.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>👤 {noticia.author}</span>
                    <span>📅 {noticia.date}</span>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Leer Más
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="py-20 bg-gradient-to-r from-blue-900 via-purple-900 to-pink-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            ¡No Te Pierdas Nada!
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Suscríbete a nuestro newsletter para recibir las últimas noticias, tendencias y análisis 
            directamente en tu bandeja de entrada.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Tu email aquí..."
              className="flex-1 px-6 py-3 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            />
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Suscribirse
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}


