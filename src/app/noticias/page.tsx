'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from 'next/link'
import Image from 'next/image'

const noticias = [
  {
    categoria: "Antofagasta",
    titulo: "Cómo la IA puede impulsar tu pyme en Antofagasta: ¡Ahorra y crece!",
    reseña: "¡Impulsa tu pyme en Antofagasta con IA! Automatiza tareas, ahorra tiempo y atrae más clientes con herramientas accesibles para veterinarias, pet shops, librerías, talleres o tiendas deportivas. ¡Descubre cómo transformar tu negocio!",
    imagen: "/noticia1.webp",
    fecha: "15 Enero 2025",
    tiempoLectura: "5 min"
  },
  {
    categoria: "Antofagasta",
    titulo: "¿Por qué la IA está creando nuevas oportunidades para pymes locales en mercados emergentes?",
    reseña: "En 2025, la IA es accesible para pymes: cafeterías optimizan turnos y recomendaciones, tiendas online personalizan ofertas, y empresas mineras previenen fallos con sensores. La IA mejora ventas y eficiencia sin gran inversión.",
    imagen: "/noticia2.webp",
    fecha: "12 Enero 2025",
    tiempoLectura: "4 min"
  },
  {
    categoria: "Futuro",
    titulo: "Agentes de IA Autónomos: El Futuro de la Automatización en Pymes",
    reseña: "Los agentes de IA autónomos están revolucionando a las pymes en 2025 al automatizar tareas como inventarios y servicio al cliente. Gracias a su capacidad de planificación y aprendizaje, ayudan a reducir costos hasta en un 30%, brindan análisis predictivo y favorecen la escalabilidad en mercados emergentes.",
    imagen: "/noticia3.webp",
    fecha: "10 Enero 2025",
    tiempoLectura: "6 min"
  }
]

export default function NoticiasPage() {
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
              <Link href="/noticias" className="text-violet-600 font-semibold">
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
            📰 Blog & Noticias
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Las Últimas
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent"> Noticias</span>
            <br />
            en IA para Pymes
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed">
            Mantente actualizado con las últimas tendencias, casos de éxito y estrategias 
            para implementar inteligencia artificial en tu empresa.
          </p>
        </div>
      </section>

      {/* Noticias Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {noticias.map((noticia, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-white/50 backdrop-blur-sm overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={noticia.imagen}
                    alt={noticia.titulo}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-gradient-to-r from-violet-500 to-indigo-500 text-white border-0">
                      {noticia.categoria}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-white/90 text-gray-700">
                      {noticia.tiempoLectura}
                    </Badge>
                  </div>
                </div>
                <CardHeader className="pb-4">
                  <div className="text-sm text-gray-500 mb-2">{noticia.fecha}</div>
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-violet-600 transition-colors line-clamp-2">
                    {noticia.titulo}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-gray-600 mb-6 text-base leading-relaxed line-clamp-3">
                    {noticia.reseña}
                  </CardDescription>
                  <Button 
                    className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white border-0 transition-all duration-300"
                    variant="default"
                  >
                    Leer Más ➡️
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-3xl p-12 text-white shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              ¿Quieres más contenido como este?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Suscríbete a nuestro newsletter y recibe las últimas noticias sobre IA para pymes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="flex-1 px-6 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <Button size="lg" className="bg-white text-violet-600 hover:bg-gray-100 px-8 py-4">
                Suscribirse
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
            <div className="md:col-span-1">
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


