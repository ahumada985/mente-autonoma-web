
// Configuración de Rate Limiting
// Archivo: src/lib/rate-limit.ts

import { NextRequest, NextResponse } from 'next/server';

// Configuración de rate limiting
const rateLimitConfig = {
  windowMs: 900000, // 15 minutos
  max: 100, // máximo 100 requests por IP
  message: 'Demasiadas solicitudes desde esta IP, inténtalo de nuevo más tarde.',
  standardHeaders: true,
  legacyHeaders: false
};

// Store para tracking de requests
const requestCounts = new Map<string, { count: number; resetTime: number }>();

export function rateLimit(request: NextRequest): NextResponse | null {
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
  const now = Date.now();
  const windowMs = rateLimitConfig.windowMs;
  
  // Limpiar entradas expiradas
  for (const [key, value] of requestCounts.entries()) {
    if (now > value.resetTime) {
      requestCounts.delete(key);
    }
  }
  
  // Obtener o crear entrada para esta IP
  let requestData = requestCounts.get(ip);
  if (!requestData || now > requestData.resetTime) {
    requestData = {
      count: 0,
      resetTime: now + windowMs
    };
    requestCounts.set(ip, requestData);
  }
  
  // Incrementar contador
  requestData.count++;
  
  // Verificar límite
  if (requestData.count > rateLimitConfig.max) {
    return new NextResponse(
      JSON.stringify({ 
        error: rateLimitConfig.message,
        retryAfter: Math.ceil((requestData.resetTime - now) / 1000)
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': Math.ceil((requestData.resetTime - now) / 1000).toString(),
          'X-RateLimit-Limit': rateLimitConfig.max.toString(),
          'X-RateLimit-Remaining': Math.max(0, rateLimitConfig.max - requestData.count).toString(),
          'X-RateLimit-Reset': new Date(requestData.resetTime).toISOString()
        }
      }
    );
  }
  
  return null; // Permitir request
}

// Middleware para aplicar rate limiting
export function withRateLimit(handler: (request: NextRequest, ...args: unknown[]) => Promise<NextResponse>) {
  return async (request: NextRequest, ...args: unknown[]) => {
    const rateLimitResponse = rateLimit(request);
    if (rateLimitResponse) {
      return rateLimitResponse;
    }
    
    return handler(request, ...args);
  };
}
