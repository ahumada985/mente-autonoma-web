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
      contenido: `Las empresas de retail están adoptando rápidamente tecnologías de inteligencia artificial para mejorar la experiencia del cliente. Los chatbots inteligentes pueden manejar consultas complejas, procesar pedidos y proporcionar recomendaciones personalizadas en tiempo real.

Esta tecnología no solo mejora la satisfacción del cliente, sino que también reduce los costos operativos significativamente. Según estudios recientes, las empresas que implementan soluciones de IA en retail experimentan:

• Incremento del 35% en ventas promedio
• Reducción del 40% en costos de atención al cliente
• Mejora del 60% en tiempo de respuesta
• Aumento del 45% en satisfacción del cliente

Los chatbots inteligentes pueden manejar múltiples consultas simultáneamente, proporcionando respuestas instantáneas las 24 horas del día. Esto significa que tus clientes nunca tendrán que esperar en línea o fuera del horario comercial.

Además, los sistemas de recomendación basados en IA analizan el comportamiento de compra del cliente para sugerir productos relevantes, aumentando las ventas cruzadas y la retención de clientes.

La implementación de estas tecnologías no requiere una inversión masiva. Muchas soluciones están disponibles como servicios en la nube, permitiendo a las empresas de todos los tamaños aprovechar los beneficios de la IA.`,
      imagen: "🤖",
      autor: "Equipo Mente Autónoma",
      tiempoLectura: "5 min",
      tags: ["IA", "Retail", "Chatbots", "Automatización"]
    },
    {
      id: 2,
      titulo: "Automatización de Procesos: El Futuro de la Eficiencia Empresarial",
      fecha: "12 de Enero, 2025",
      categoria: "Automatización",
      resumen: "Las empresas que implementan soluciones de automatización reportan un incremento del 40% en productividad y una reducción del 60% en errores operativos.",
      contenido: `La automatización de procesos empresariales se ha convertido en una necesidad crítica para mantener la competitividad en el mercado actual. Desde la gestión de inventarios hasta el procesamiento de facturas, la IA está transformando operaciones que antes requerían intervención manual constante.

Las empresas líderes ya están viendo resultados tangibles en términos de eficiencia y rentabilidad. Los beneficios incluyen:

• Incremento del 40% en productividad general
• Reducción del 60% en errores operativos
• Ahorro del 30% en costos operativos
• Mejora del 50% en velocidad de procesamiento

La automatización no significa eliminar puestos de trabajo, sino reasignar recursos humanos a tareas de mayor valor. Los empleados pueden enfocarse en:

- Estrategia y planificación
- Relaciones con clientes
- Innovación y desarrollo de productos
- Análisis de datos y toma de decisiones

Los procesos más comunes que se benefician de la automatización incluyen:

1. **Gestión de Inventarios**: Control automático de stock y alertas de reabastecimiento
2. **Procesamiento de Facturas**: Reconocimiento automático de documentos y aprobaciones
3. **Atención al Cliente**: Chatbots y sistemas de tickets inteligentes
4. **Análisis de Datos**: Reportes automáticos y dashboards en tiempo real
5. **Marketing**: Segmentación automática de audiencias y campañas personalizadas

La implementación exitosa requiere un enfoque gradual, comenzando con procesos simples y escalando hacia operaciones más complejas.`,
      imagen: "⚡",
      autor: "Equipo Mente Autónoma",
      tiempoLectura: "6 min",
      tags: ["Automatización", "Productividad", "Eficiencia", "Procesos"]
    },
    {
      id: 3,
      titulo: "Marketing Digital Inteligente: Datos y IA para Decisiones Estratégicas",
      fecha: "10 de Enero, 2025",
      categoria: "Marketing",
      resumen: "La combinación de análisis de datos avanzado y algoritmos de IA permite a las empresas optimizar sus campañas de marketing con una precisión sin precedentes.",
      contenido: `El marketing digital ha evolucionado más allá de la intuición y las suposiciones. Hoy, las empresas pueden utilizar datos en tiempo real y algoritmos de IA para identificar patrones de comportamiento del consumidor, optimizar el timing de las campañas y personalizar mensajes con una precisión que antes era imposible.

Esta revolución está redefiniendo cómo se conectan las marcas con sus audiencias. Los datos no solo informan las decisiones de marketing, sino que también predicen comportamientos futuros.

**Análisis Predictivo del Comportamiento del Cliente**

La IA puede analizar miles de puntos de datos para identificar:
- Patrones de compra estacionales
- Propensión a la conversión
- Riesgo de abandono del cliente
- Oportunidades de venta cruzada

**Personalización en Tiempo Real**

Los algoritmos de IA permiten:
- Segmentación dinámica de audiencias
- Contenido personalizado según el comportamiento
- Ofertas adaptadas al momento del usuario
- Experiencias únicas para cada visitante

**Optimización Automática de Campañas**

La IA optimiza continuamente:
- Timing de envío de emails
- Pujas en publicidad digital
- Contenido de redes sociales
- Presupuestos de marketing

**Métricas Clave de Rendimiento**

Las empresas que implementan marketing digital inteligente reportan:
• Incremento del 45% en tasas de conversión
• Reducción del 35% en costos de adquisición de clientes
• Mejora del 60% en retorno de inversión en marketing
• Aumento del 40% en valor de por vida del cliente

La implementación requiere una estrategia de datos sólida, pero los resultados justifican ampliamente la inversión.`,
      imagen: "📊",
      autor: "Equipo Mente Autónoma",
      tiempoLectura: "7 min",
      tags: ["Marketing Digital", "IA", "Datos", "Personalización"]
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
                                     if (!noticiasGuardadas.find((n: any) => n.id === noticia.id)) {
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
