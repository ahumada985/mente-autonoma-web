import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.menteautonoma.cl'

  // Páginas principales que SÍ quieres indexar
  const routes = [
    '',
    '/servicios-desarrollo-web',
    '/noticias',
    '/contacto',
    '/chatbot-demo',
    '/privacidad',
    '/terminos',
    '/cookies',
  ]

  // Páginas de noticias
  const noticias = [
    '/noticias/ia-para-pequenas-empresas',
    '/noticias/chatbots-que-entienden-contexto',
    '/noticias/automatizacion-inteligente-avanzada',
    '/noticias/flujos-de-trabajo-inteligentes',
  ]

  const currentDate = new Date()

  return [
    // Página principal - máxima prioridad
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    // Servicios - alta prioridad
    {
      url: `${baseUrl}/servicios-desarrollo-web`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // Otras páginas principales
    ...routes.slice(2).map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    // Noticias
    ...noticias.map((noticia) => ({
      url: `${baseUrl}${noticia}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]
}
