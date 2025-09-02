'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Footer from '@/components/Footer';

export default function NoticiaIndividual() {
  const params = useParams();
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsHeaderSticky(scrollPosition > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const noticias = {
    1: {
      titulo: "Inteligencia Artificial en la Medicina: Avances Revolucionarios del 2025",
      resumen: "Descubre cómo la IA está transformando el diagnóstico médico, la investigación farmacéutica y la atención al paciente con tecnologías de vanguardia.",
      contenido: `
        <p class="mb-6 text-base text-gray-700 leading-relaxed">
          La inteligencia artificial está revolucionando la medicina de maneras que hace solo una década parecían ciencia ficción. 
          En 2025, estamos viendo avances sin precedentes que están transformando fundamentalmente cómo diagnosticamos, 
          tratamos y prevenimos enfermedades.
        </p>
        
        <h2 class="text-xl font-bold text-gray-900 mb-4 mt-8">Diagnóstico Preciso con IA</h2>
        <p class="mb-6 text-base text-gray-700 leading-relaxed">
          Los algoritmos de machine learning están demostrando una precisión superior a la humana en la interpretación 
          de imágenes médicas. Desde radiografías hasta resonancias magnéticas, la IA puede detectar patrones sutiles 
          que los radiólogos podrían pasar por alto, especialmente en las primeras etapas de enfermedades como el cáncer.
        </p>
        
        <h2 class="text-xl font-bold text-gray-900 mb-4 mt-8">Medicina Personalizada</h2>
        <p class="mb-6 text-base text-gray-700 leading-relaxed">
          La IA está permitiendo la medicina de precisión al analizar grandes cantidades de datos genómicos, 
          clínicos y de estilo de vida. Esto permite a los médicos desarrollar tratamientos personalizados 
          que son más efectivos y tienen menos efectos secundarios.
        </p>
        
        <h2 class="text-xl font-bold text-gray-900 mb-4 mt-8">Investigación Acelerada</h2>
        <p class="mb-6 text-base text-gray-700 leading-relaxed">
          En el desarrollo de medicamentos, la IA está reduciendo significativamente el tiempo y costo 
          del proceso de descubrimiento. Los algoritmos pueden predecir qué compuestos tienen más probabilidades 
          de ser efectivos, acelerando el desarrollo de nuevas terapias.
        </p>
        
        <h2 class="text-xl font-bold text-gray-900 mb-4 mt-8">El Futuro de la Medicina</h2>
        <p class="mb-6 text-base text-gray-700 leading-relaxed">
          A medida que la IA continúa evolucionando, podemos esperar ver sistemas de salud más inteligentes, 
          diagnósticos más tempranos y precisos, y tratamientos más efectivos. La combinación de la experiencia 
          humana con la precisión de la IA está creando un futuro más saludable para todos.
        </p>
      `,
      imagen: "/noticia1.webp",
      categoria: "Tecnología Médica",
      fecha: "15 de Marzo, 2025",
      autor: "Dr. Ana Martínez",
      tiempoLectura: "8 min",
      tags: ["IA", "Medicina", "Diagnóstico", "Salud"]
    },
    2: {
      titulo: "Machine Learning en Finanzas: Predicción de Mercados con Precisión Sin Precedentes",
      resumen: "Análisis profundo de cómo los algoritmos de ML están revolucionando el análisis financiero y la gestión de riesgos en mercados globales.",
      contenido: `
        <p class="mb-6 text-base text-gray-700 leading-relaxed">
          El machine learning está transformando fundamentalmente el sector financiero, proporcionando 
          herramientas de análisis y predicción que están redefiniendo cómo se toman las decisiones 
          de inversión y gestión de riesgos.
        </p>
        
        <h2 class="text-xl font-bold text-gray-900 mb-4 mt-8">Análisis Predictivo Avanzado</h2>
        <p class="mb-6 text-base text-gray-700 leading-relaxed">
          Los algoritmos de ML pueden procesar millones de puntos de datos en tiempo real, 
          identificando patrones y tendencias que serían imposibles de detectar para los analistas humanos. 
          Esto permite predicciones más precisas sobre el comportamiento del mercado.
        </p>
        
        <h2 class="text-xl font-bold text-gray-900 mb-4 mt-8">Gestión de Riesgos Inteligente</h2>
        <p class="mb-6 text-base text-gray-700 leading-relaxed">
          La IA está mejorando significativamente la gestión de riesgos al analizar múltiples 
          factores de riesgo simultáneamente y proporcionar alertas tempranas sobre posibles problemas.
        </p>
        
        <h2 class="text-xl font-bold text-gray-900 mb-4 mt-8">Trading Algorítmico</h2>
        <p class="mb-6 text-base text-gray-700 leading-relaxed">
          Los sistemas de trading automatizado basados en ML pueden ejecutar operaciones 
          con una velocidad y precisión que supera las capacidades humanas, aprovechando 
          oportunidades de mercado que duran solo milisegundos.
        </p>
      `,
      imagen: "/noticia2.webp",
      categoria: "Fintech",
      fecha: "12 de Marzo, 2025",
      autor: "Carlos Rodríguez",
      tiempoLectura: "6 min",
      tags: ["ML", "Finanzas", "Trading", "Riesgos"]
    },
    3: {
      titulo: "Chatbots Empresariales: Transformando la Atención al Cliente",
      resumen: "Estudio de caso sobre la implementación exitosa de chatbots inteligentes en empresas líderes y su impacto en la satisfacción del cliente.",
      contenido: `
        <p class="mb-6 text-base text-gray-700 leading-relaxed">
          Los chatbots empresariales están revolucionando la forma en que las empresas interactúan 
          con sus clientes, proporcionando atención 24/7 y respuestas instantáneas a consultas comunes.
        </p>
        
        <h2 class="text-xl font-bold text-gray-900 mb-4 mt-8">Mejora en la Experiencia del Cliente</h2>
        <p class="mb-6 text-base text-gray-700 leading-relaxed">
          Los chatbots modernos pueden manejar consultas complejas, resolver problemas técnicos 
          y proporcionar información detallada sobre productos y servicios, mejorando significativamente 
          la satisfacción del cliente.
        </p>
        
        <h2 class="text-xl font-bold text-gray-900 mb-4 mt-8">Eficiencia Operativa</h2>
        <p class="mb-6 text-base text-gray-700 leading-relaxed">
          Al automatizar respuestas a preguntas frecuentes, los chatbots liberan tiempo valioso 
          para que los agentes humanos se enfoquen en casos más complejos y especializados.
        </p>
      `,
      imagen: "/noticia3.webp",
      categoria: "Automatización",
      fecha: "10 de Marzo, 2025",
      autor: "María González",
      tiempoLectura: "5 min",
      tags: ["Chatbots", "Atención al Cliente", "Automatización"]
    },
    4: {
      titulo: "Computer Vision: Aplicaciones Industriales que Revolucionan la Producción",
      resumen: "Exploramos cómo la visión por computadora está optimizando procesos industriales, desde control de calidad hasta mantenimiento predictivo.",
      contenido: `
        <p class="mb-6 text-base text-gray-700 leading-relaxed">
          La visión por computadora está transformando la industria manufacturera, proporcionando 
          capacidades de inspección y análisis que superan las capacidades humanas en precisión y velocidad.
        </p>
        
        <h2 class="text-xl font-bold text-gray-900 mb-4 mt-8">Control de Calidad Automatizado</h2>
        <p class="mb-6 text-base text-gray-700 leading-relaxed">
          Los sistemas de visión por computadora pueden detectar defectos microscópicos en productos 
          con una precisión del 99.9%, reduciendo significativamente los costos de garantía y mejorando 
          la satisfacción del cliente.
        </p>
        
        <h2 class="text-xl font-bold text-gray-900 mb-4 mt-8">Mantenimiento Predictivo</h2>
        <p class="mb-6 text-base text-gray-700 leading-relaxed">
          Al analizar imágenes de equipos industriales, la IA puede predecir cuándo es necesario 
          realizar mantenimiento, evitando paradas no planificadas y optimizando la eficiencia operativa.
        </p>
      `,
      imagen: "/noticia4.webp",
      categoria: "Industria 4.0",
      fecha: "8 de Marzo, 2025",
      autor: "Ing. Luis Pérez",
      tiempoLectura: "7 min",
      tags: ["Computer Vision", "Industria", "Calidad", "Mantenimiento"]
    },
    5: {
      titulo: "Procesamiento de Lenguaje Natural: Comprendiendo el Contexto Humano",
      resumen: "Análisis técnico de los avances en NLP y cómo las máquinas están aprendiendo a entender mejor el lenguaje humano natural.",
      contenido: `
        <p class="mb-6 text-base text-gray-700 leading-relaxed">
          El procesamiento del lenguaje natural (NLP) ha experimentado avances revolucionarios en los últimos años, 
          permitiendo que las máquinas comprendan y generen lenguaje humano con una precisión sin precedentes.
        </p>
        
        <h2 class="text-xl font-bold text-gray-900 mb-4 mt-8">Comprensión del Contexto</h2>
        <p class="mb-6 text-base text-gray-700 leading-relaxed">
          Los modelos modernos de NLP pueden entender el contexto, las sutilezas y las implicaciones 
          del lenguaje humano, permitiendo conversaciones más naturales y útiles.
        </p>
        
        <h2 class="text-xl font-bold text-gray-900 mb-4 mt-8">Aplicaciones Prácticas</h2>
        <p class="mb-6 text-base text-gray-700 leading-relaxed">
          Desde asistentes virtuales hasta análisis de sentimientos y traducción automática, 
          el NLP está encontrando aplicaciones en prácticamente todos los sectores de la economía.
        </p>
      `,
      imagen: "/noticia5.webp",
      categoria: "Lingüística Computacional",
      fecha: "5 de Marzo, 2025",
      autor: "Dra. Elena Silva",
      tiempoLectura: "9 min",
      tags: ["NLP", "Lenguaje", "IA", "Comprensión"]
    },
    6: {
      titulo: "Automatización Inteligente: El Futuro del Trabajo en la Era de la IA",
      resumen: "Reflexiones sobre cómo la automatización basada en IA está redefiniendo roles laborales y creando nuevas oportunidades profesionales.",
      contenido: `
        <p class="mb-6 text-base text-gray-700 leading-relaxed">
          La automatización inteligente está transformando fundamentalmente la naturaleza del trabajo, 
          creando tanto desafíos como oportunidades para los trabajadores y las empresas.
        </p>
        
        <h2 class="text-xl font-bold text-gray-900 mb-4 mt-8">Nuevos Roles y Oportunidades</h2>
        <p class="mb-6 text-base text-gray-700 leading-relaxed">
          Aunque la IA automatiza tareas repetitivas, también está creando nuevos roles que requieren 
          habilidades humanas únicas como creatividad, pensamiento crítico e inteligencia emocional.
        </p>
        
        <h2 class="text-xl font-bold text-gray-900 mb-4 mt-8">Colaboración Humano-IA</h2>
        <p class="mb-6 text-base text-gray-700 leading-relaxed">
          El futuro del trabajo no se trata de humanos versus máquinas, sino de humanos trabajando 
          junto con máquinas para lograr resultados superiores a los que cualquiera podría lograr por separado.
        </p>
      `,
      imagen: "/noticia6.webp",
      categoria: "Futuro del Trabajo",
      fecha: "3 de Marzo, 2025",
      autor: "Prof. Roberto Vargas",
      tiempoLectura: "10 min",
      tags: ["Automatización", "Trabajo", "IA", "Futuro"]
    }
  };

  const noticia = noticias[params.id];

  if (!noticia) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Noticia no encontrada</h1>
          <Link href="/noticias" className="text-blue-600 hover:text-blue-800">
            ← Volver a Noticias
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header con transparencia dinámica */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300  ${
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

      {/* Hero de la Noticia Simple */}
      <section className="bg-gray-900 text-white pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center space-x-3 mb-4">
            <span className="px-2 py-1 bg-blue-600 text-white text-sm font-medium rounded">
              {noticia.categoria}
            </span>
            <span className="text-gray-300 text-sm">{noticia.fecha}</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            {noticia.titulo}
          </h1>
          
          <p className="text-lg text-gray-300 mb-4 leading-relaxed">
            {noticia.resumen}
          </p>
          

        </div>
      </section>

      {/* Contenido de la Noticia */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <article className="bg-white border border-gray-200 rounded-lg p-8">
          {/* Imagen de la noticia */}
          <img 
            src={noticia.imagen} 
            alt={noticia.titulo}
            className="w-full h-64 md:h-80 object-cover rounded-lg mb-8"
          />
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {noticia.tags.map((tag, index) => (
              <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                #{tag}
              </span>
            ))}
          </div>
          
          {/* Contenido */}
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: noticia.contenido }}
          />
          
          {/* Navegación */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <Link 
                href="/noticias"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
              >
                <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Volver a Noticias
              </Link>
              
              <div className="flex space-x-4">
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
