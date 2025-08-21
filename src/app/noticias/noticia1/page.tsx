'use client'

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from 'next/link'
import Image from 'next/image'

export default function Noticia1Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-2">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Image src="/logo_final.webp" alt="Mente Autónoma" width={40} height={40} className="rounded-lg" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Mente Autónoma
                </h1>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/#services" className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium">
                Servicios
              </Link>
              <Link href="/#news" className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium">
                Noticias
              </Link>
              <Link href="/#contact" className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium">
                Contacto
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                Solicitar Demo
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <header className="text-center mb-12">
            <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 px-4 py-2 text-sm">
              Antofagasta
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Cómo la IA puede impulsar tu pyme: ¡Ahorra y crece!
            </h1>
            <div className="flex items-center justify-center space-x-4 text-gray-600">
              <span>15 Enero 2025</span>
              <span>•</span>
              <span>5 min de lectura</span>
              <span>•</span>
              <span>Por Mente Autónoma</span>
            </div>
          </header>

          {/* Featured Image */}
          <div className="relative h-96 rounded-3xl overflow-hidden mb-12 shadow-2xl">
            <Image
              src="/noticia1.webp"
              alt="IA para pymes"
              fill
              className="object-cover"
            />
          </div>

          {/* Article Body */}
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              En el dinámico mundo empresarial actual, las pequeñas y medianas empresas (PYMEs) se enfrentan a desafíos constantes: 
              optimizar costos, mejorar la eficiencia operativa y mantenerse competitivas en un mercado cada vez más digitalizado. 
              La Inteligencia Artificial (IA) ya no es exclusiva de grandes corporaciones; hoy está al alcance de todas las empresas, 
              sin importar su tamaño.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
              ¿Por qué la IA es crucial para las PYMEs en 2025?
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              La IA representa una oportunidad única para que las PYMEs compitan en igualdad de condiciones con empresas más grandes. 
              No se trata solo de automatización, sino de inteligencia estratégica que puede transformar completamente la forma en que 
              operas tu negocio.
            </p>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-8 border-l-4 border-blue-500">
              <h3 className="text-xl font-bold text-blue-900 mb-4">💡 Beneficios Clave de la IA para PYMEs:</h3>
              <ul className="space-y-2 text-blue-800">
                <li>• <strong>Reducción de costos operativos</strong> hasta en un 30%</li>
                <li>• <strong>Mejora de la productividad</strong> del equipo en un 40%</li>
                <li>• <strong>Personalización del servicio al cliente</strong> sin incrementar personal</li>
                <li>• <strong>Análisis predictivo</strong> para tomar mejores decisiones</li>
                <li>• <strong>Automatización de tareas repetitivas</strong> que liberan tiempo valioso</li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
              Casos de Éxito Reales en PYMEs
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Veamos algunos ejemplos concretos de cómo la IA está transformando PYMEs en diferentes sectores:
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
              🏪 Comercio Minorista
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Una tienda de ropa local implementó un sistema de recomendaciones basado en IA que aumentó sus ventas en un 25%. 
              El sistema analiza el historial de compras de cada cliente y sugiere productos que realmente les interesan, 
              creando una experiencia de compra personalizada.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
              🏥 Servicios de Salud
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Una clínica dental pequeña automatizó su agenda de citas con IA, reduciendo las cancelaciones en un 40% y 
              optimizando el tiempo de los especialistas. El sistema envía recordatorios inteligentes y sugiere horarios 
              alternativos cuando hay cancelaciones.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
              🏭 Industria Manufacturera
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Un taller mecánico implementó mantenimiento predictivo con IA, anticipando fallas en equipos antes de que ocurran. 
              Esto les permitió reducir el tiempo de inactividad en un 60% y ahorrar significativamente en costos de reparación.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
              Cómo Empezar con IA en tu PYME
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              La implementación de IA no tiene que ser abrumadora. Te recomendamos un enfoque gradual:
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="text-3xl mb-4">🚀</div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Fase 1: Evaluación</h4>
                <p className="text-gray-600 text-sm">
                  Identifica procesos repetitivos y áreas donde la IA puede generar mayor impacto inmediato.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="text-3xl mb-4">⚡</div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Fase 2: Implementación</h4>
                <p className="text-gray-600 text-sm">
                  Comienza con una solución específica y mide los resultados antes de expandir.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="text-3xl mb-4">📈</div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Fase 3: Escalamiento</h4>
                <p className="text-gray-600 text-sm">
                  Una vez que veas resultados, expande la IA a otras áreas de tu negocio.
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
              Soluciones de IA Recomendadas para PYMEs
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Estas son las soluciones de IA más efectivas para PYMEs, ordenadas por facilidad de implementación:
            </p>

            <ol className="space-y-4 text-lg text-gray-700">
              <li className="flex items-start space-x-3">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">1</span>
                <div>
                  <strong>Chatbots para atención al cliente:</strong> Resuelven consultas frecuentes 24/7, mejorando la satisfacción del cliente y reduciendo la carga de trabajo del personal.
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">2</span>
                <div>
                  <strong>Generación automática de contenido:</strong> Crea posts para redes sociales, emails y descripciones de productos de manera automática, manteniendo tu voz de marca.
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">3</span>
                <div>
                  <strong>Análisis de datos y reportes:</strong> Transforma la información de tu negocio en insights accionables que te ayuden a tomar mejores decisiones.
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">4</span>
                <div>
                  <strong>Automatización de procesos:</strong> Elimina tareas repetitivas como facturación, seguimiento de inventario y gestión de clientes.
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">5</span>
                <div>
                  <strong>Predicción de demanda:</strong> Anticipa las necesidades de tus clientes y optimiza tu inventario para maximizar ventas y minimizar costos.
                </div>
              </li>
            </ol>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
              Inversión y ROI Esperado
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Muchas PYMEs se preocupan por el costo de implementar IA. La buena noticia es que las soluciones modernas son 
              mucho más accesibles de lo que piensas:
            </p>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 mb-8 border-l-4 border-green-500">
              <h3 className="text-xl font-bold text-green-900 mb-4">💰 Costos y Beneficios:</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-green-800 mb-2">Inversión Inicial:</h4>
                  <ul className="text-green-700 space-y-1">
                    <li>• Soluciones básicas: $50-200/mes</li>
                    <li>• Soluciones avanzadas: $200-500/mes</li>
                    <li>• Implementación: $500-2,000</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-green-800 mb-2">ROI Esperado:</h4>
                  <ul className="text-green-700 space-y-1">
                    <li>• Ahorro en costos: 20-40%</li>
                    <li>• Incremento en ventas: 15-30%</li>
                    <li>• Mejora en productividad: 25-50%</li>
                  </ul>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
              El Futuro de las PYMEs con IA
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              La IA no es solo una tendencia pasajera; es el futuro del negocio. Las PYMEs que adopten estas tecnologías 
              hoy estarán mejor posicionadas para competir en el mercado del mañana. La clave está en empezar pequeño, 
              medir resultados y escalar gradualmente.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              En Mente Autónoma, creemos que la IA debe ser accesible para todas las empresas. Nuestras soluciones están 
              diseñadas específicamente para PYMEs, con precios accesibles y soporte personalizado que te acompaña en cada 
              paso de tu transformación digital.
            </p>

            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">¿Listo para Transformar tu PYME con IA?</h3>
              <p className="text-blue-100 mb-6">
                Descubre cómo podemos ayudarte a implementar soluciones de IA que generen resultados reales y medibles.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4 shadow-lg">
                  Solicitar Consulta Gratuita
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4">
                  Ver Más Casos de Éxito
                </Button>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <Image src="/logo_final.webp" alt="Mente Autónoma" width={40} height={40} className="rounded-lg" />
            </div>
            <h3 className="text-xl font-bold text-white">Mente Autónoma</h3>
          </div>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Transformando empresas con inteligencia artificial de vanguardia. 
            Hacemos que la IA sea accesible para todas las pymes.
          </p>
          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-400">
              &copy; 2025 Mente Autónoma. Todos los derechos reservados. Construido con ❤️ y profesionalismo.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}


