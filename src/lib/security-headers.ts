
// Configuración de Security Headers
// Archivo: src/lib/security-headers.ts

import { NextResponse } from 'next/server';

export const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;"
};

export function addSecurityHeaders(response: NextResponse): NextResponse {
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  
  return response;
}

// Middleware para aplicar security headers
export function withSecurityHeaders(handler: (request: Request, ...args: unknown[]) => Promise<NextResponse>) {
  return async (request: Request, ...args: unknown[]) => {
    const response = await handler(request, ...args);
    
    if (response instanceof NextResponse) {
      return addSecurityHeaders(response);
    }
    
    return response;
  };
}
