'use client'

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from 'next/link'
import { useState } from 'react'

const ideas = [
  {
    numero: 1,
    titulo: "Asistente inteligente para e-commerce",
    descripcion: "Chatbot que recomienda productos, ayuda en el checkout y responde dudas frecuentes.",
    ejemplo: "Una ferretería del centro puede implementar un chatbot que recomiende herramientas según el proyecto del cliente (construcción, minería, hogar). El bot conoce el stock local y puede sugerir alternativas disponibles."
  },
  {
    numero: 2,
    titulo: "Recordatorio automatizado de vacunas veterinarias",
    descripcion: "Sistema que envía alertas y sugerencias de próximas dosis según historial de mascotas.",
    ejemplo: "Veterinaria 'Patitas Sanas' automatiza recordatorios por WhatsApp para vacunas anuales, desparasitaciones mensuales y chequeos según la edad de cada mascota, aumentando la fidelización de clientes."
  },
  {
    numero: 3,
    titulo: "Gestión predictiva de inventario",
    descripcion: "IA que anticipa demanda y optimiza el stock según patrones de compra estacionales.",
    ejemplo: "Una farmacia predice el aumento de demanda de protectores solares en verano y medicamentos para resfríos en invierno, evitando quiebres de stock y sobreinventario."
  },
  {
    numero: 4,
    titulo: "Generación de contenido para redes sociales",
    descripcion: "IA que crea posts, descripciones y hashtags atractivos, manteniendo tu voz de marca.",
    ejemplo: "Un restaurant del puerto usa IA para crear posts sobre sus platos del día, incorporando hashtags locales como #AntofagastaEats #PuertoSaboroso y adaptando el contenido según eventos de la ciudad."
  },
  {
    numero: 5,
    titulo: "Email marketing hiperpersonalizado",
    descripcion: "Campañas con ofertas según comportamiento de clientes y categorías preferidas.",
    ejemplo: "Una tienda de ropa segmenta emails: envía ofertas de ropa de trabajo a empleados mineros, ropa casual a estudiantes de la UCN, y ropa formal a ejecutivos del sector financiero."
  },
  {
    numero: 6,
    titulo: "Agente de atención 24/7 para servicios profesionales",
    descripcion: "Chatbots que atienden consultas frecuentes fuera del horario laboral.",
    ejemplo: "Un estudio contable automatiza respuestas sobre plazos tributarios, documentos necesarios para constitución de empresas y cálculos básicos de honorarios, atendiendo turnos de noche de trabajadores mineros."
  },
  {
    numero: 7,
    titulo: "Automatización de facturación y contabilidad",
    descripcion: "Software que categoriza gastos, gestiona pagos y conciliaciones automáticamente.",
    ejemplo: "Una empresa de transporte minero automatiza la clasificación de gastos en combustible, mantención de vehículos y peajes, generando reportes mensuales para optimizar rutas y costos."
  },
  {
    numero: 8,
    titulo: "Asistente de voz para consulta de datos",
    descripcion: "Interactividad vía voz para revisar citas programadas, stock o dudas frecuentes.",
    ejemplo: "Un taller mecánico permite a los técnicos consultar por voz el stock de repuestos mientras trabajan, sin necesidad de interrumpir su labor para revisar el sistema manualmente."
  },
  {
    numero: 9,
    titulo: "Telemetría y mantenimiento predictivo",
    descripcion: "IA que monitoriza equipos industriales y avisa sobre posibles fallas antes que ocurran.",
    ejemplo: "Una empresa de servicios mineros monitorea sus compresores y generadores, recibiendo alertas 48 horas antes de fallas potenciales, reduciendo tiempo de inactividad en faenas."
  },
  {
    numero: 10,
    titulo: "Recomendador de productos cruzados",
    descripcion: "Sistema que sugiere complementos para aumentar ventas y fidelidad en tienda física.",
    ejemplo: "Una librería-papelería sugiere automáticamente cuadernos universitarios, destacadores y calculadoras cuando un estudiante compra textos de ingeniería, aumentando el ticket promedio."
  },
  {
    numero: 11,
    titulo: "Planificación automática de turnos",
    descripcion: "Genera horarios eficientes según flujo de clientes, disponibilidad y normativas laborales.",
    ejemplo: "Una peluquería optimiza turnos considerando servicios populares los fines de semana, disponibilidad de especialistas y cumplimiento de descansos obligatorios."
  },
  {
    numero: 12,
    titulo: "Detección inteligente de documentos",
    descripcion: "IA que ordena facturas, comprobantes y archivos digitales sin intervención manual.",
    ejemplo: "Una gestoría automatiza la clasificación de documentos de clientes mineros: contratos, certificados de seguridad, facturas de equipos, agilizando trámites regulatorios."
  },
  {
    numero: 13,
    titulo: "Análisis de clientes frecuentes",
    descripcion: "Identifica ciclos de compra y ayuda a fidelizar con ofertas personalizadas.",
    ejemplo: "Un supermercado detecta que familias mineras compran despensa cada 15 días coincidiendo con quincenas, enviando ofertas especiales 2 días antes de cada ciclo."
  },
  {
    numero: 14,
    titulo: "Optimización de rutas logísticas",
    descripcion: "Calcula rutas óptimas según tráfico, clima y entregas, reduciendo costos operacionales.",
    ejemplo: "Una distribuidora de gas ajusta rutas evitando el tráfico del centro en horas peak y considerando condiciones de camanchaca para optimizar tiempos de entrega."
  },
  {
    numero: 15,
    titulo: "Asistente financiero automatizado",
    descripcion: "Visualiza flujos de caja y sugiere financiamiento según necesidades y proyecciones.",
    ejemplo: "Una constructora recibe alertas automáticas sobre necesidades de capital de trabajo y sugerencias de líneas de crédito antes de iniciar nuevos proyectos habitacionales."
  },
  {
    numero: 16,
    titulo: "Evaluación de crédito ágil",
    descripcion: "Analiza historial financiero para decisiones de préstamo rápido y confiable.",
    ejemplo: "Una casa comercial evalúa en 5 minutos el crédito de trabajadores mineros considerando estabilidad laboral, ingresos y historial de pagos en el retail local."
  },
  {
    numero: 17,
    titulo: "Chat con inteligencia emocional",
    descripcion: "Asistente que conversa con tono empático y adaptado al estado emocional del cliente.",
    ejemplo: "Una funeraria implementa un chatbot que detecta el tono emocional de consultas y responde con sensibilidad apropiada, brindando información de servicios con empatía."
  },
  {
    numero: 18,
    titulo: "Dashboard de indicadores automáticos",
    descripcion: "Muestra métricas clave de tu negocio en tiempo real con alertas inteligentes.",
    ejemplo: "Una cadena de minimarkets monitorea ventas por sucursal, rotación de productos y márgenes en tiempo real, recibiendo alertas sobre productos de baja rotación o faltantes críticos."
  },
  {
    numero: 19,
    titulo: "Automatización de anuncios segmentados",
    descripcion: "Crea copys y define audiencias para campañas efectivas en redes sociales.",
    ejemplo: "Una academia de inglés segmenta automáticamente anuncios: cursos corporativos para empresas mineras, preparación TOEFL para estudiantes universitarios, e inglés básico para comerciantes."
  },
  {
    numero: 20,
    titulo: "Resúmenes automáticos de reuniones",
    descripcion: "Genera apuntes, tareas y resúmenes ejecutivos a partir de grabaciones de reuniones.",
    ejemplo: "Un estudio de arquitectura transcribe automáticamente reuniones con clientes, extrayendo requisitos del proyecto, plazos acordados y próximos pasos, enviando resúmenes a todos los participantes."
  },
  {
    numero: 21,
    titulo: "Sistema de alertas climáticas para negocios",
    descripcion: "Monitorea condiciones meteorológicas y ajusta operaciones según el clima del desierto.",
    ejemplo: "Una empresa de eventos al aire libre recibe alertas tempranas sobre vientos fuertes o camanchaca, permitiendo reprogramar actividades y ajustar logística con 48 horas de anticipación."
  },
  {
    numero: 22,
    titulo: "Análisis de sentimiento en reviews",
    descripcion: "Monitorea opiniones online y genera reportes de satisfacción con alertas tempranas.",
    ejemplo: "Un hotel boutique analiza comentarios en Google y TripAdvisor, identificando problemas recurrentes (ruido, wifi, desayuno) para implementar mejoras antes de que afecten más huéspedes."
  },
  {
    numero: 23,
    titulo: "Precio dinámico inteligente",
    descripcion: "Ajusta precios automáticamente según demanda, competencia y eventos locales.",
    ejemplo: "Un hostal ajusta tarifas automáticamente durante eventos como Festival de la Tirana, congresos mineros o temporada de avistamiento de ballenas, maximizando ingresos sin perder competitividad."
  },
  {
    numero: 24,
    titulo: "Traductor automático para turismo",
    descripcion: "Sistema de traducción en tiempo real para atender turistas extranjeros eficientemente.",
    ejemplo: "Una agencia de turismo astronómico implementa traducción automática español-inglés-portugués para atender visitantes internacionales, mejorando la experiencia en tours al desierto de Atacama."
  },
  {
    numero: 25,
    titulo: "Detector de fraudes en pagos",
    descripcion: "IA que identifica transacciones sospechosas y protege contra fraudes financieros.",
    ejemplo: "Una tienda de electrónicos detecta patrones anómalos como compras múltiples con diferentes tarjetas desde la misma IP o compras de alto valor fuera del horario habitual del cliente."
  },
  {
    numero: 26,
    titulo: "Optimizador de consumo energético",
    descripcion: "Monitorea y reduce automáticamente el consumo eléctrico según patrones de uso.",
    ejemplo: "Un laboratorio dental programa equipos para operar en horarios de menor tarifa eléctrica, ajusta aire acondicionado según ocupación y apaga automáticamente equipos no esenciales fuera del horario laboral."
  },
  {
    numero: 27,
    titulo: "Gestor inteligente de citas médicas",
    descripcion: "Optimiza agendas médicas considerando tipo de consulta, duración y urgencias.",
    ejemplo: "Una clínica dental programa automáticamente limpiezas de 30 min, tratamientos de conducto de 90 min y emergencias, optimizando la agenda y reduciendo tiempos de espera."
  },
  {
    numero: 28,
    titulo: "Análisis predictivo de demanda local",
    descripcion: "Predice tendencias de consumo basándose en datos económicos y eventos de la región.",
    ejemplo: "Una distribuidora de bebidas anticipa mayor demanda durante eventos deportivos en el estadio regional, festividades religiosas y cambios de turno en las mineras, ajustando inventario automáticamente."
  },
  {
    numero: 29,
    titulo: "Sistema de recomendación para capacitaciones",
    descripcion: "Sugiere cursos y certificaciones según perfil laboral y demanda del mercado minero.",
    ejemplo: "Un centro de capacitación recomienda cursos de seguridad minera a operadores, certificaciones de soldadura a técnicos, y cursos de inglés técnico a supervisores, basándose en ofertas laborales actuales."
  },
  {
    numero: 30,
    titulo: "Monitoreo inteligente de redes sociales",
    descripcion: "Rastrea menciones de tu marca y competencia, generando insights para estrategias comerciales.",
    ejemplo: "Un restaurant monitorea menciones en redes sociales, detecta quejas sobre tiempos de espera, identifica platos más populares y descubre oportunidades como 'delivery a campamentos mineros' mencionado por usuarios."
  }
]

export default function TreintaIdeasPage() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar el email
    alert('¡Gracias por suscribirte! Te enviaremos las 30 ideas por correo.')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-2">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">✨</span>
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                  Mente Autónoma
                </h1>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/#services" className="text-gray-700 hover:text-violet-600 transition-all duration-300 font-medium">
                Servicios
              </Link>
              <Link href="/noticias" className="text-gray-700 hover:text-violet-600 transition-all duration-300 font-medium">
                Noticias
              </Link>
              <Link href="/#contact" className="text-gray-700 hover:text-violet-600 transition-all duration-300 font-medium">
                Contacto
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                Solicitar Demo
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <Badge className="mb-6 bg-gradient-to-r from-violet-500 to-indigo-500 text-white border-0 px-4 py-2 text-sm">
            🚀 Guía Completa
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            IA para
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent"> PYMEs</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-6 max-w-4xl mx-auto leading-relaxed">
            30 Ideas Innovadoras para que la Inteligencia Artificial Potencie tu Negocio
          </p>
          <p className="text-lg text-gray-600 mb-10 max-w-3xl mx-auto">
            Descubre cómo implementar soluciones de IA específicamente diseñadas para pymes de todo el país
          </p>
          
          {/* Newsletter Form */}
          <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              📧 Recibe las 30 ideas por correo
            </h3>
            <p className="text-gray-600 mb-6">
              Suscríbete y te enviaremos el PDF completo con todas las ideas implementables
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Tu correo electrónico"
                required
                className="flex-1 px-6 py-4 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              />
              <Button 
                type="submit"
                size="lg" 
                className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white px-8 py-4 shadow-lg"
              >
                Enviar Ideas 🚀
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Ideas Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ideas.map((idea, index) => (
              <div 
                key={index} 
                className="group bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden relative"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    {idea.numero}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-violet-600 transition-colors">
                    {idea.titulo}
                  </h3>
                </div>
                
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {idea.descripcion}
                </p>
                
                <div className="bg-gradient-to-r from-violet-50 to-indigo-50 border-l-4 border-violet-500 p-4 rounded-r-lg">
                  <div className="text-violet-700 font-semibold text-sm mb-2">
                    💡 Ejemplo para PYMEs:
                  </div>
                  <div className="text-gray-700 text-sm leading-relaxed">
                    {idea.ejemplo}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-3xl p-12 text-white shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              ¿Listo para implementar la IA en tu negocio?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Estas 30 ideas de IA están diseñadas específicamente para PYMEs de todo el país. 
              Comienza con una solución simple y escala gradualmente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-violet-600 hover:bg-gray-100 text-lg px-8 py-6 shadow-lg">
                🚀 Quiero transformar mi PyME
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-violet-600 text-lg px-8 py-6">
                📲 Hablar por WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-lg">✨</span>
                </div>
                <h3 className="text-xl font-bold text-white">Mente Autónoma</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Transformando empresas con inteligencia artificial de vanguardia.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Servicios</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/#services" className="hover:text-white transition-colors">Chatbot IA</Link></li>
                <li><Link href="/#services" className="hover:text-white transition-colors">Asistente Virtual</Link></li>
                <li><Link href="/#services" className="hover:text-white transition-colors">Generador de Contenido</Link></li>
                <li><Link href="/#services" className="hover:text-white transition-colors">Automatización</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Newsletter</h4>
              <p className="text-gray-400 mb-4">Recibe las últimas noticias sobre IA</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Tu correo"
                  className="flex-1 px-4 py-2 rounded-lg text-gray-900 text-sm"
                />
                <Button size="sm" className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700">
                  →
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Mente Autónoma. Todos los derechos reservados. Construido con ❤️ y profesionalismo.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
