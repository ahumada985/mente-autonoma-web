// Sitemap XML Optimizado
// Archivo: src/app/sitemap.xml/route.ts

import { generateOptimizedSitemap } from '@/lib/performance-optimization';

export async function GET() {
  const pages = [
    '/',
    '/noticias',
    '/contacto',
    '/servicios-desarrollo-web',
    '/privacidad',
    '/terminos',
    '/cookies',
    '/30-ideas'
  ];

  const sitemap = generateOptimizedSitemap(pages);

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800'
    }
  });
}
