'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NoticiaIndividual() {
  const params = useParams();
  const noticiaId = parseInt(params.id as string);

  const noticias = [
    {
      id: 1,
      titulo: "Inteligencia Artificial en el Retail: Transformando la Experiencia del Cliente",
      fecha: "15 de Enero, 2025",
      categoria: "Tecnología",
      resumen: "La implementación de chatbots inteligentes y sistemas de recomendación basados en IA está revolucionando la forma en que las empresas interactúan con sus clientes, aumentando las ventas en un 35% en promedio.",
      contenido: `La revolución de la inteligencia artificial en el sector retail está transformando fundamentalmente cómo las empresas se conectan con sus clientes. Los chatbots inteligentes, equipados con procesamiento de lenguaje natural avanzado, pueden manejar consultas complejas, procesar pedidos y proporcionar recomendaciones personalizadas en tiempo real.

Estos sistemas no solo mejoran la satisfacción del cliente, sino que también reducen significativamente los costos operativos. Las empresas que han implementado soluciones de IA en retail reportan un incremento promedio del 35% en ventas, junto con una reducción del 40% en costos de atención al cliente.

Los sistemas de recomendación basados en IA analizan el comportamiento del usuario, historial de compras y preferencias para sugerir productos relevantes. Esta personalización aumenta la probabilidad de conversión y mejora la experiencia general del cliente.

Además, la IA permite a las empresas optimizar sus inventarios en tiempo real, predecir tendencias de demanda y personalizar campañas de marketing con una precisión sin precedentes. El futuro del retail está aquí, y la IA es el motor que lo impulsa.`,
      imagen: "🤖",
      autor: "Equipo Mente Autónoma",
      tiempoLectura: "5 min",
      tags: ["IA", "Retail", "Chatbots", "Recomendaciones", "Personalización"]
    },
    {
      id: 2,
      titulo: "Automatización de Procesos: El Futuro de la Eficiencia Empresarial",
      fecha: "12 de Enero, 2025",
      categoria: "Automatización",
      resumen: "Las empresas que implementan soluciones de automatización reportan un incremento del 40% en productividad y una reducción del 60% en errores operativos.",
      contenido: `La automatización de procesos empresariales se ha convertido en una necesidad crítica para mantener la competitividad en el mercado actual. Desde la gestión de inventarios hasta el procesamiento de facturas, la inteligencia artificial está transformando operaciones que antes requerían intervención manual constante.

Las empresas líderes ya están viendo resultados tangibles en términos de eficiencia y rentabilidad. Los sistemas automatizados pueden procesar grandes volúmenes de datos en segundos, identificar patrones que los humanos podrían pasar por alto y tomar decisiones basadas en datos en tiempo real.

La implementación de la automatización no solo mejora la productividad, sino que también libera a los empleados para enfocarse en tareas más estratégicas y creativas. Los trabajadores pueden dedicar su tiempo a la innovación, la resolución de problemas complejos y la construcción de relaciones con los clientes.

Los beneficios de la automatización incluyen reducción de errores, mayor consistencia en los procesos, escalabilidad mejorada y una mejor experiencia del cliente. Las empresas que adoptan estas tecnologías están posicionándose para el éxito a largo plazo en un mercado cada vez más competitivo.`,
      imagen: "⚡",
      autor: "Equipo Mente Autónoma",
      tiempoLectura: "6 min",
      tags: ["Automatización", "Eficiencia", "IA", "Procesos", "Productividad"]
    },
    {
      id: 3,
      titulo: "Marketing Digital Inteligente: Datos y IA para Decisiones Estratégicas",
      fecha: "10 de Enero, 2025",
      categoria: "Marketing",
      resumen: "La combinación de análisis de datos avanzado y algoritmos de IA permite a las empresas optimizar sus campañas de marketing con una precisión sin precedentes.",
      contenido: `El marketing digital ha evolucionado más allá de la intuición y las suposiciones. Hoy, las empresas pueden utilizar datos en tiempo real y algoritmos de inteligencia artificial para identificar patrones de comportamiento del consumidor, optimizar el timing de las campañas y personalizar mensajes con una precisión que antes era imposible.

Esta revolución está redefiniendo cómo se conectan las marcas con sus audiencias. Los sistemas de IA pueden analizar millones de interacciones para identificar segmentos de audiencia específicos, predecir comportamientos futuros y optimizar automáticamente las campañas para maximizar el ROI.

La personalización en tiempo real permite a las empresas entregar mensajes relevantes en el momento exacto, aumentando significativamente las tasas de conversión. Los algoritmos de IA pueden ajustar automáticamente el contenido, el timing y los canales de distribución para maximizar la efectividad de cada campaña.

Además, la IA permite a las empresas identificar nuevas oportunidades de mercado, predecir tendencias emergentes y adaptar sus estrategias de marketing en tiempo real. El futuro del marketing está en la inteligencia artificial y el análisis de datos avanzado.`,
      imagen: "📊",
      autor: "Equipo Mente Autónoma",
      tiempoLectura: "7 min",
      tags: ["Marketing", "IA", "Datos", "Campañas", "Personalización"]
    },
    {
      id: 4,
      titulo: "Seguridad Cibernética: IA como Primera Línea de Defensa",
      fecha: "8 de Enero, 2025",
      categoria: "Seguridad",
      resumen: "Los sistemas de seguridad basados en IA pueden detectar y neutralizar amenazas cibernéticas en milisegundos, protegiendo a las empresas de ataques cada vez más sofisticados.",
      contenido: `En un mundo donde las amenazas cibernéticas evolucionan constantemente, la inteligencia artificial se ha convertido en un componente esencial de cualquier estrategia de seguridad. Los sistemas de IA pueden analizar millones de eventos de seguridad en tiempo real, identificar patrones sospechosos y responder automáticamente a amenazas antes de que causen daños significativos.

La velocidad de respuesta de la IA es crucial en la seguridad cibernética moderna. Mientras que los analistas humanos pueden tardar minutos o incluso horas en identificar y responder a una amenaza, los sistemas de IA pueden hacerlo en milisegundos. Esta rapidez puede ser la diferencia entre un incidente menor y una brecha de seguridad catastrófica.

Los sistemas de IA también pueden aprender de cada amenaza, mejorando continuamente su capacidad de detección. A medida que evolucionan las tácticas de los atacantes, la IA se adapta y mejora, proporcionando una defensa cada vez más robusta.

Además, la IA puede identificar amenazas que los sistemas tradicionales podrían pasar por alto, como ataques de día cero y técnicas de evasión avanzadas. La implementación de sistemas de seguridad basados en IA es ahora una necesidad, no una opción, para empresas de todos los tamaños.`,
      imagen: "🛡️",
      autor: "Equipo Mente Autónoma",
      tiempoLectura: "6 min",
      tags: ["Seguridad", "IA", "Cibernética", "Amenazas", "Protección"]
    },
    {
      id: 5,
      titulo: "SaaS y BaaS: Modelos de Negocio Impulsados por IA",
      fecha: "5 de Enero, 2025",
      categoria: "Negocios",
      resumen: "Las empresas que adoptan modelos SaaS y BaaS con capacidades de IA están experimentando un crecimiento del 50% en ingresos recurrentes.",
      contenido: `El modelo de Software as a Service (SaaS) y Backend as a Service (BaaS) está transformando la forma en que las empresas desarrollan y distribuyen software. La integración de capacidades de inteligencia artificial en estos servicios permite a las empresas ofrecer soluciones más inteligentes y adaptativas, creando un ciclo virtuoso de mejora continua y satisfacción del cliente.

La IA en SaaS y BaaS permite a las empresas automatizar procesos complejos, proporcionar insights basados en datos y personalizar la experiencia del usuario en tiempo real. Estas capacidades están impulsando un crecimiento sin precedentes en el sector, con empresas que adoptan estos modelos reportando un incremento promedio del 50% en ingresos recurrentes.

Los servicios basados en IA también permiten a las empresas escalar más eficientemente, adaptándose automáticamente a las necesidades cambiantes de sus clientes. La automatización de tareas complejas reduce los costos operativos y permite a los equipos enfocarse en la innovación y el desarrollo de nuevas funcionalidades.

Además, la IA permite a las empresas identificar nuevas oportunidades de mercado, optimizar sus productos basándose en el uso real de los clientes y proporcionar un soporte más inteligente y proactivo. El futuro del software está en la combinación de SaaS, BaaS e inteligencia artificial.`,
      imagen: "☁️",
      autor: "Equipo Mente Autónoma",
      tiempoLectura: "8 min",
      tags: ["Negocios", "IA", "SaaS", "BaaS", "Ingresos Recurrentes"]
    },
    {
      id: 6,
      titulo: "El Futuro del Trabajo: Colaboración Humano-IA",
      fecha: "3 de Enero, 2025",
      categoria: "Futuro del Trabajo",
      resumen: "Contrario a la creencia popular, la IA está creando más empleos de los que elimina, especialmente en roles que requieren creatividad y pensamiento estratégico.",
      contenido: `La inteligencia artificial no está reemplazando a los humanos, sino transformando la naturaleza del trabajo. Las tareas repetitivas y de bajo valor están siendo automatizadas, liberando a los trabajadores para enfocarse en actividades que requieren creatividad, empatía y pensamiento crítico. Esta colaboración humano-IA está creando nuevas oportunidades y roles que antes no existían.

Los trabajadores del futuro necesitarán desarrollar nuevas habilidades para trabajar efectivamente con la IA. Esto incluye la capacidad de interpretar y validar los resultados de la IA, diseñar sistemas que maximicen la colaboración humano-IA, y mantener un enfoque ético en el desarrollo y uso de estas tecnologías.

Las empresas que adoptan la colaboración humano-IA están viendo mejoras significativas en la productividad, la innovación y la satisfacción de los empleados. Los trabajadores pueden dedicar más tiempo a tareas que realmente valoran, mientras que la IA maneja las tareas rutinarias y de procesamiento de datos.

Además, la IA está creando nuevos tipos de empleos que requieren habilidades únicas en la interfaz entre humanos y máquinas. Estos roles incluyen entrenadores de IA, analistas de datos, especialistas en ética de IA y diseñadores de experiencias de usuario para sistemas inteligentes. El futuro del trabajo es colaborativo, no competitivo.`,
      imagen: "🤝",
      autor: "Equipo Mente Autónoma",
      tiempoLectura: "7 min",
      tags: ["Futuro del Trabajo", "IA", "Empleo", "Colaboración", "Habilidades"]
    }
  ];

  const noticia = noticias.find(n => n.id === noticiaId);

  if (!noticia) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Noticia no encontrada</h1>
          <p className="text-xl text-gray-600 mb-8">La noticia que buscas no existe o ha sido removida.</p>
          <Link 
            href="/noticias" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
          >
            Volver a Noticias
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-100 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4">
              {noticia.categoria}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {noticia.titulo}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              {noticia.resumen}
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <span>📅 {noticia.fecha}</span>
              <span>👤 {noticia.autor}</span>
              <span>⏱️ {noticia.tiempoLectura}</span>
            </div>
          </div>
          
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">{noticia.imagen}</div>
          </div>
        </div>
      </div>

      {/* Contenido de la Noticia */}
      <div className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="prose prose-lg max-w-none">
            <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
              <div className="text-gray-700 leading-relaxed space-y-6">
                {noticia.contenido.split('\n\n').map((parrafo, index) => (
                  <p key={index} className="text-lg">
                    {parrafo}
                  </p>
                ))}
              </div>
              
              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {noticia.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
          
          {/* Navegación */}
          <div className="mt-12 flex justify-between items-center">
            <Link 
              href="/noticias" 
              className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300"
            >
              ← Volver a Noticias
            </Link>
            
            <div className="flex space-x-4">
              <button 
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: noticia.titulo,
                      text: noticia.resumen,
                      url: window.location.href
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Enlace copiado al portapapeles');
                  }
                }}
                className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition-all duration-300"
              >
                📤 Compartir
              </button>
              <button 
                onClick={() => {
                  const noticiasGuardadas = JSON.parse(localStorage.getItem('noticiasGuardadas') || '[]');
                  if (!noticiasGuardadas.find((n: { id: number }) => n.id === noticia.id)) {
                    noticiasGuardadas.push({
                      id: noticia.id,
                      titulo: noticia.titulo,
                      fecha: noticia.fecha,
                      url: window.location.href
                    });
                    localStorage.setItem('noticiasGuardadas', JSON.stringify(noticiasGuardadas));
                    alert('Noticia guardada en favoritos');
                  } else {
                    alert('Esta noticia ya está guardada');
                  }
                }}
                className="bg-green-100 text-green-700 px-4 py-2 rounded-lg hover:bg-green-200 transition-all duration-300"
              >
                💾 Guardar
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
