'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
      tiempoLectura: "3 min"
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
      tiempoLectura: "4 min"
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
      tiempoLectura: "5 min"
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
      tiempoLectura: "4 min"
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
      tiempoLectura: "6 min"
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
      tiempoLectura: "5 min"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-pink-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white bg-opacity-20 text-white text-sm font-medium mb-6">
            📰 Últimas Noticias
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Noticias y
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Tendencias IA
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Mantente actualizado con las últimas novedades en inteligencia artificial, 
            automatización y transformación digital empresarial.
          </p>
        </div>
      </div>

      {/* Noticias Grid */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {noticias.map((noticia) => (
              <article 
                key={noticia.id}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Header de la Noticia */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {noticia.categoria}
                    </span>
                    <span className="text-sm text-gray-500">{noticia.tiempoLectura}</span>
                  </div>
                  
                  <div className="text-4xl mb-4">{noticia.imagen}</div>
                  
                  <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                    {noticia.titulo}
                  </h2>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {noticia.resumen}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{noticia.fecha}</span>
                    <span>Por {noticia.autor}</span>
                  </div>
                </div>

                {/* Contenido Expandido */}
                <div className="p-6">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {noticia.contenido}
                  </p>
                  
                  <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
                    Leer Artículo Completo
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Mantente Informado
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Recibe las últimas noticias sobre IA y estrategias para tu negocio directamente en tu email.
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex">
              <input
                type="email"
                placeholder="Tu email profesional"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-l-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-r-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
                Suscribirse
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-3">
              Sin spam. Solo contenido valioso para tu negocio.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}


