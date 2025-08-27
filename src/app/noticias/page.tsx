'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import LeadCaptureForm from '@/components/LeadCaptureForm'; // Added import for LeadCaptureForm

export default function Noticias() {
  const noticias = [
    {
      id: 1,
      titulo: "Inteligencia Artificial en el Retail: Transformando la Experiencia del Cliente",
      fecha: "15 de Enero, 2025",
      categoria: "Tecnología",
      resumen: "La implementación de chatbots inteligentes y sistemas de recomendación basados en IA está revolucionando la forma en que las empresas interactúan con sus clientes, aumentando las ventas en un 35% en promedio.",
      contenido: "Las empresas de retail están adoptando rápidamente tecnologías de inteligencia artificial para mejorar la experiencia del cliente. Los chatbots inteligentes pueden manejar consultas complejas, procesar pedidos y proporcionar recomendaciones personalizadas en tiempo real. Esta tecnología no solo mejora la satisfacción del cliente, sino que también reduce los costos operativos significativamente.",
      imagen: "🤖",
      autor: "Equipo Mente Autónoma",
      tiempoLectura: "3 min",
      tags: ["IA", "Retail", "Chatbots", "Recomendaciones"]
    },
    {
      id: 2,
      titulo: "Automatización de Procesos: El Futuro de la Eficiencia Empresarial",
      fecha: "12 de Enero, 2025",
      categoria: "Automatización",
      resumen: "Las empresas que implementan soluciones de automatización reportan un incremento del 40% en productividad y una reducción del 60% en errores operativos.",
      contenido: "La automatización de procesos empresariales se ha convertido en una necesidad crítica para mantener la competitividad en el mercado actual. Desde la gestión de inventarios hasta el procesamiento de facturas, la IA está transformando operaciones que antes requerían intervención manual constante. Las empresas líderes ya están viendo resultados tangibles en términos de eficiencia y rentabilidad.",
      imagen: "⚡",
      autor: "Equipo Mente Autónoma",
      tiempoLectura: "4 min",
      tags: ["Automatización", "Eficiencia", "IA", "Procesos"]
    },
    {
      id: 3,
      titulo: "Marketing Digital Inteligente: Datos y IA para Decisiones Estratégicas",
      fecha: "10 de Enero, 2025",
      categoria: "Marketing",
      resumen: "La combinación de análisis de datos avanzado y algoritmos de IA permite a las empresas optimizar sus campañas de marketing con una precisión sin precedentes.",
      contenido: "El marketing digital ha evolucionado más allá de la intuición y las suposiciones. Hoy, las empresas pueden utilizar datos en tiempo real y algoritmos de IA para identificar patrones de comportamiento del consumidor, optimizar el timing de las campañas y personalizar mensajes con una precisión que antes era imposible. Esta revolución está redefiniendo cómo se conectan las marcas con sus audiencias.",
      imagen: "📊",
      autor: "Equipo Mente Autónoma",
      tiempoLectura: "5 min",
      tags: ["Marketing", "IA", "Datos", "Campañas"]
    },
    {
      id: 4,
      titulo: "Seguridad Cibernética: IA como Primera Línea de Defensa",
      fecha: "8 de Enero, 2025",
      categoria: "Seguridad",
      resumen: "Los sistemas de seguridad basados en IA pueden detectar y neutralizar amenazas cibernéticas en milisegundos, protegiendo a las empresas de ataques cada vez más sofisticados.",
      contenido: "En un mundo donde las amenazas cibernéticas evolucionan constantemente, la inteligencia artificial se ha convertido en un componente esencial de cualquier estrategia de seguridad. Los sistemas de IA pueden analizar millones de eventos de seguridad en tiempo real, identificar patrones sospechosos y responder automáticamente a amenazas antes de que causen daños significativos.",
      imagen: "🛡️",
      autor: "Equipo Mente Autónoma",
      tiempoLectura: "4 min",
      tags: ["Seguridad", "IA", "Cibernética", "Amenazas"]
    },
    {
      id: 5,
      titulo: "SaaS y BaaS: Modelos de Negocio Impulsados por IA",
      fecha: "5 de Enero, 2025",
      categoria: "Negocios",
      resumen: "Las empresas que adoptan modelos SaaS y BaaS con capacidades de IA están experimentando un crecimiento del 50% en ingresos recurrentes.",
      contenido: "El modelo de Software as a Service (SaaS) y Backend as a Service (BaaS) está transformando la forma en que las empresas desarrollan y distribuyen software. La integración de capacidades de IA en estos servicios permite a las empresas ofrecer soluciones más inteligentes y adaptativas, creando un ciclo virtuoso de mejora continua y satisfacción del cliente.",
      imagen: "☁️",
      autor: "Equipo Mente Autónoma",
      tiempoLectura: "6 min",
      tags: ["Negocios", "IA", "SaaS", "BaaS"]
    },
    {
      id: 6,
      titulo: "El Futuro del Trabajo: Colaboración Humano-IA",
      fecha: "3 de Enero, 2025",
      categoria: "Futuro del Trabajo",
      resumen: "Contrario a la creencia popular, la IA está creando más empleos de los que elimina, especialmente en roles que requieren creatividad y pensamiento estratégico.",
      contenido: "La inteligencia artificial no está reemplazando a los humanos, sino transformando la naturaleza del trabajo. Las tareas repetitivas y de bajo valor están siendo automatizadas, liberando a los trabajadores para enfocarse en actividades que requieren creatividad, empatía y pensamiento crítico. Esta colaboración humano-IA está creando nuevas oportunidades y roles que antes no existían.",
      imagen: "🤝",
      autor: "Equipo Mente Autónoma",
      tiempoLectura: "5 min",
      tags: ["Futuro del Trabajo", "IA", "Empleo", "Colaboración"]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section Renovado */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 overflow-hidden">
        {/* Elementos decorativos de fondo */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.1),transparent_50%)]"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-10 right-10 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-32 h-32 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-sm font-medium mb-8 border border-blue-200 shadow-sm">
              📰 Últimas Noticias de IA
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 leading-tight">
              Noticias que
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Revolucionan el Futuro
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
              Mantente al día con las últimas tendencias, innovaciones y estrategias de inteligencia artificial 
              que están transformando industrias y creando nuevas oportunidades de negocio.
            </p>
          </div>
        </div>
      </section>

      {/* Grid de Noticias Renovado */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {noticias.map((noticia, index) => (
              <article 
                key={noticia.id} 
                className={`group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 ${
                  index === 0 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                {/* Badge de Categoría */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-semibold rounded-full shadow-lg">
                    {noticia.categoria}
                  </span>
                </div>
                
                {/* Imagen/Icono */}
                <div className="h-48 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-500">
                  {noticia.imagen}
                </div>
                
                {/* Contenido */}
                <div className="p-6">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
                    <span>📅 {noticia.fecha}</span>
                    <span>•</span>
                    <span>⏱️ {noticia.tiempoLectura}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                    {noticia.titulo}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {noticia.resumen}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {noticia.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Botón de Acción */}
                  <Link 
                    href={`/noticias/${noticia.id}`}
                    className="inline-flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg group-hover:shadow-xl"
                  >
                    Leer Artículo Completo
                    <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
                
                {/* Efecto de Hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500 rounded-2xl"></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}


