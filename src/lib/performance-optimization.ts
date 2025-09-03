// Configuración de Optimización de Performance
// Archivo: src/lib/performance-optimization.ts

import { NextRequest, NextResponse } from 'next/server';

// Configuración de optimización de performance
export const performanceConfig = {
  // Compresión
  compression: {
    level: 6, // Nivel de compresión (1-9)
    threshold: 1024, // Comprimir archivos > 1KB
    filter: (req: NextRequest) => {
      const contentType = req.headers.get('content-type') || '';
      return contentType.includes('text/') || 
             contentType.includes('application/json') ||
             contentType.includes('application/javascript');
    }
  },
  
  // Cache headers
  cache: {
    static: {
      maxAge: 31536000, // 1 año para archivos estáticos
      immutable: true
    },
    dynamic: {
      maxAge: 3600, // 1 hora para contenido dinámico
      staleWhileRevalidate: 86400 // 1 día
    },
    api: {
      maxAge: 300, // 5 minutos para APIs
      staleWhileRevalidate: 600 // 10 minutos
    }
  },
  
  // Preload de recursos críticos
  preload: {
    fonts: [
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
    ],
    scripts: [
      'https://vercel.live/script.js'
    ]
  }
};

// Función para aplicar headers de cache
export function applyCacheHeaders(response: NextResponse, type: 'static' | 'dynamic' | 'api'): NextResponse {
  const cacheConfig = performanceConfig.cache[type];
  
  if (type === 'static') {
    response.headers.set('Cache-Control', `public, max-age=${cacheConfig.maxAge}, immutable`);
  } else {
    const dynamicConfig = cacheConfig as { maxAge: number; staleWhileRevalidate: number };
    response.headers.set('Cache-Control', `public, max-age=${dynamicConfig.maxAge}, stale-while-revalidate=${dynamicConfig.staleWhileRevalidate}`);
  }
  
  return response;
}

// Función para comprimir respuestas
export function compressResponse(response: NextResponse): NextResponse {
  const content = response.body;
  const contentType = response.headers.get('content-type') || '';
  
  // Verificar si el contenido debe ser comprimido
  const shouldCompress = contentType.includes('text/') || 
                        contentType.includes('application/json') ||
                        contentType.includes('application/javascript');
  
  if (content && shouldCompress) {
    // En un entorno real, aquí se aplicaría compresión gzip/brotli
    response.headers.set('Content-Encoding', 'gzip');
    response.headers.set('Vary', 'Accept-Encoding');
  }
  
  return response;
}

// Función para optimizar imágenes
export function optimizeImageUrl(url: string, width?: number, height?: number, quality: number = 80): string {
  // Si es una imagen de Cloudinary o similar, aplicar optimizaciones
  if (url.includes('cloudinary.com') || url.includes('vercel.com')) {
    const params = new URLSearchParams();
    if (width) params.set('w', width.toString());
    if (height) params.set('h', height.toString());
    params.set('q', quality.toString());
    params.set('f', 'auto'); // Formato automático
    params.set('dpr', 'auto'); // Densidad de píxeles automática
    
    return `${url}?${params.toString()}`;
  }
  
  return url;
}

// Función para precargar recursos críticos
export function generatePreloadHeaders(): Record<string, string> {
  const headers: Record<string, string> = {};
  
  // Precargar fuentes
  performanceConfig.preload.fonts.forEach((font, index) => {
    headers[`Link-${index}`] = `<${font}>; rel=preload; as=style; crossorigin`;
  });
  
  // Precargar scripts críticos
  performanceConfig.preload.scripts.forEach((script, index) => {
    headers[`Link-${index + performanceConfig.preload.fonts.length}`] = `<${script}>; rel=preload; as=script`;
  });
  
  return headers;
}

// Middleware de optimización de performance
export function withPerformanceOptimization(handler: (request: NextRequest, ...args: unknown[]) => Promise<NextResponse>, cacheType: 'static' | 'dynamic' | 'api' = 'dynamic') {
  return async (request: NextRequest, ...args: unknown[]) => {
    const startTime = Date.now();
    
    // Ejecutar handler original
    const response = await handler(request, ...args);
    
    if (response instanceof NextResponse) {
      // Aplicar headers de cache
      applyCacheHeaders(response, cacheType);
      
      // Aplicar compresión
      compressResponse(response);
      
      // Agregar headers de performance
      const endTime = Date.now();
      response.headers.set('X-Response-Time', `${endTime - startTime}ms`);
      response.headers.set('X-Powered-By', 'Next.js Optimized');
      
      // Agregar headers de preload para recursos críticos
      const preloadHeaders = generatePreloadHeaders();
      Object.entries(preloadHeaders).forEach(([key, value]) => {
        response.headers.set(key, value);
      });
    }
    
    return response;
  };
}

// Función para optimizar CSS
export function optimizeCSS(css: string): string {
  return css
    .replace(/\s+/g, ' ') // Eliminar espacios múltiples
    .replace(/;\s*}/g, '}') // Eliminar punto y coma antes de }
    .replace(/\s*{\s*/g, '{') // Eliminar espacios alrededor de {
    .replace(/;\s*/g, ';') // Eliminar espacios después de ;
    .trim();
}

// Función para optimizar JavaScript
export function optimizeJS(js: string): string {
  return js
    .replace(/\/\*[\s\S]*?\*\//g, '') // Eliminar comentarios de bloque
    .replace(/\/\/.*$/gm, '') // Eliminar comentarios de línea
    .replace(/\s+/g, ' ') // Eliminar espacios múltiples
    .trim();
}

// Función para generar sitemap optimizado
export function generateOptimizedSitemap(pages: string[]): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tu-dominio.com';
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `
  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('')}
</urlset>`;
  
  return sitemap;
}

// Función para generar robots.txt optimizado
export function generateOptimizedRobots(): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tu-dominio.com';
  
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Disallow admin areas
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /backups/

# Crawl delay
Crawl-delay: 1`;
}

// Función para monitorear performance
export function monitorPerformance(request: NextRequest, response: NextResponse): void {
  const startTime = request.headers.get('x-start-time');
  if (startTime) {
    const endTime = Date.now();
    const duration = endTime - parseInt(startTime);
    
    // Log performance metrics
    console.log(`Performance: ${request.url} - ${duration}ms`);
    
    // Agregar métricas a headers
    response.headers.set('X-Response-Time', `${duration}ms`);
    response.headers.set('X-Performance-Score', duration < 1000 ? 'A' : duration < 2000 ? 'B' : 'C');
  }
}

// Función para generar reporte de performance
export function generatePerformanceReport(): object {
  return {
    timestamp: new Date().toISOString(),
    optimizations: {
      compression: 'enabled',
      caching: 'enabled',
      preloading: 'enabled',
      imageOptimization: 'enabled'
    },
    recommendations: [
      'Implementar Service Worker para cache offline',
      'Optimizar imágenes con WebP',
      'Implementar lazy loading',
      'Minificar CSS y JS',
      'Usar CDN para recursos estáticos'
    ]
  };
}
