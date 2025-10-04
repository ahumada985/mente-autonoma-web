import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/dashboard/',
          '/automatizacion-procesos',
          '/humanos-digitales',
          '/marketing-digital',
          '/optimizacion-seo',
          '/saas',
          '/batch-processing',
          '/csv-upload',
          '/data-extraction',
          '/extract-data',
          '/knowledge-admin',
          '/knowledge-docs',
          '/massive-analysis',
          '/match-analysis',
          '/opportunities',
          '/team-explorer',
          '/unified-database',
          '/config',
          '/api-config',
          '/api-test',
          '/analytics',
          '/chatbot-analytics',
          '/chatbot-configuracion',
          '/chatbot',
          '/30-ideas',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/dashboard/',
          '/automatizacion-procesos',
          '/humanos-digitales',
          '/marketing-digital',
          '/optimizacion-seo',
          '/saas',
        ],
      },
    ],
    sitemap: 'https://www.menteautonoma.cl/sitemap.xml',
  }
}
