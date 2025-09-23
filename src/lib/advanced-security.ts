// Configuración Avanzada de Seguridad
// Archivo: src/lib/advanced-security.ts

import { NextRequest, NextResponse } from 'next/server';

// Configuración avanzada de seguridad
export const advancedSecurityConfig = {
  // Rate limiting más estricto
  rateLimiting: {
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: process.env.NODE_ENV === 'development' ? 1000 : 50, // Más permisivo en desarrollo
    message: 'Demasiadas solicitudes. Inténtalo más tarde.',
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: false,
    skipFailedRequests: false
  },
  
  // Security headers mejorados
  securityHeaders: {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://vitals.vercel-insights.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self';"
  },
  
  // Configuración de CORS
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? ['https://tu-dominio.com'] 
      : ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
    maxAge: 86400 // 24 horas
  }
};

// Función para aplicar headers de seguridad avanzados
export function applyAdvancedSecurityHeaders(response: NextResponse): NextResponse {
  Object.entries(advancedSecurityConfig.securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  
  return response;
}

// Función para validar IPs
export function validateIP(ip: string): boolean {
  // En desarrollo, permitir todas las IPs
  if (process.env.NODE_ENV === 'development') {
    return true;
  }
  
  // Lista de IPs bloqueadas (solo en producción)
  const blockedIPs = [
    '0.0.0.0'
  ];
  
  // Verificar si la IP está bloqueada
  if (blockedIPs.includes(ip)) {
    return false;
  }
  
  // Validar formato de IP
  const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return ipRegex.test(ip) || ip === 'unknown' || ip === '127.0.0.1';
}

// Función para detectar bots maliciosos
export function detectMaliciousBot(userAgent: string): boolean {
  // En desarrollo, no bloquear nada
  if (process.env.NODE_ENV === 'development') {
    return false;
  }
  
  const maliciousPatterns = [
    /malicious-bot/i,
    /scraper-bot/i,
    /spam-bot/i
  ];
  
  // Solo bloquear bots realmente maliciosos
  return maliciousPatterns.some(pattern => pattern.test(userAgent));
}

// Middleware de seguridad avanzado
export function withAdvancedSecurity(handler: (request: NextRequest, ...args: unknown[]) => Promise<NextResponse>) {
  return async (request: NextRequest, ...args: unknown[]) => {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || '';
    
    // Validar IP
    if (!validateIP(ip)) {
      return new NextResponse(
        JSON.stringify({ error: 'Acceso denegado' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Detectar bots maliciosos
    if (detectMaliciousBot(userAgent)) {
      return new NextResponse(
        JSON.stringify({ error: 'Acceso denegado' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Aplicar rate limiting avanzado
    const rateLimitResponse = await applyAdvancedRateLimit(request);
    if (rateLimitResponse) {
      return rateLimitResponse;
    }
    
    // Ejecutar handler original
    const response = await handler(request, ...args);
    
    // Aplicar headers de seguridad
    if (response instanceof NextResponse) {
      return applyAdvancedSecurityHeaders(response);
    }
    
    return response;
  };
}

// Rate limiting avanzado
const advancedRequestCounts = new Map<string, { count: number; resetTime: number; blocked: boolean }>();

export async function applyAdvancedRateLimit(request: NextRequest): Promise<NextResponse | null> {
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
  const now = Date.now();
  const windowMs = advancedSecurityConfig.rateLimiting.windowMs;
  
  // Limpiar entradas expiradas
  for (const [key, value] of advancedRequestCounts.entries()) {
    if (now > value.resetTime) {
      advancedRequestCounts.delete(key);
    }
  }
  
  // Obtener o crear entrada para esta IP
  let requestData = advancedRequestCounts.get(ip);
  if (!requestData || now > requestData.resetTime) {
    requestData = {
      count: 0,
      resetTime: now + windowMs,
      blocked: false
    };
    advancedRequestCounts.set(ip, requestData);
  }
  
  // Si está bloqueado, mantener bloqueo
  if (requestData.blocked) {
    return new NextResponse(
      JSON.stringify({ 
        error: 'IP bloqueada temporalmente',
        retryAfter: Math.ceil((requestData.resetTime - now) / 1000)
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': Math.ceil((requestData.resetTime - now) / 1000).toString()
        }
      }
    );
  }
  
  // Incrementar contador
  requestData.count++;
  
  // Verificar límite
  if (requestData.count > advancedSecurityConfig.rateLimiting.max) {
    requestData.blocked = true; // Bloquear IP
    return new NextResponse(
      JSON.stringify({ 
        error: advancedSecurityConfig.rateLimiting.message,
        retryAfter: Math.ceil((requestData.resetTime - now) / 1000)
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': Math.ceil((requestData.resetTime - now) / 1000).toString(),
          'X-RateLimit-Limit': advancedSecurityConfig.rateLimiting.max.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': new Date(requestData.resetTime).toISOString()
        }
      }
    );
  }
  
  return null; // Permitir request
}

// Función para generar reporte de seguridad
export function generateSecurityReport() {
  const report = {
    timestamp: new Date().toISOString(),
    activeConnections: advancedRequestCounts.size,
    blockedIPs: Array.from(advancedRequestCounts.entries())
      .filter(([, data]) => data.blocked)
      .map(([ip]) => ip),
    totalRequests: Array.from(advancedRequestCounts.values())
      .reduce((sum, data) => sum + data.count, 0),
    securityLevel: 'HIGH'
  };
  
  return report;
}
