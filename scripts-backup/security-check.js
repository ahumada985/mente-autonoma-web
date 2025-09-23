#!/usr/bin/env node

/**
 * Script de Verificación de Seguridad
 * Verifica políticas de seguridad y configura rate limiting
 */

const fs = require('fs');
const path = require('path');

// Configuración de seguridad
const securityConfig = {
  rateLimiting: {
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // máximo 100 requests por IP por ventana
    message: 'Demasiadas solicitudes desde esta IP, inténtalo de nuevo más tarde.',
    standardHeaders: true,
    legacyHeaders: false
  },
  securityHeaders: {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;"
  }
};

function checkSecurityPolicies() {
  console.log('🔒 Verificando políticas de seguridad...\n');
  
  const securityIssues = [];
  const securityPassed = [];
  
  // Verificar archivos de configuración
  const configFiles = [
    'next.config.ts',
    'package.json',
    'src/app/layout.tsx',
    'src/app/api'
  ];
  
  configFiles.forEach(file => {
    const filePath = path.join(process.cwd(), file);
    if (fs.existsSync(filePath)) {
      securityPassed.push(`✅ ${file} - Encontrado`);
    } else {
      securityIssues.push(`❌ ${file} - No encontrado`);
    }
  });
  
  // Verificar dependencias de seguridad
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
    
    // Verificar dependencias vulnerables conocidas
    const vulnerableDeps = [
      'express',
      'helmet',
      'cors',
      'rate-limiter-flexible'
    ];
    
    vulnerableDeps.forEach(dep => {
      if (dependencies[dep]) {
        securityPassed.push(`✅ ${dep} - Instalado`);
      } else {
        securityIssues.push(`⚠️ ${dep} - No instalado (recomendado para seguridad)`);
      }
    });
  }
  
  // Verificar variables de entorno
  const envFiles = ['.env.local', '.env', '.env.example'];
  envFiles.forEach(envFile => {
    const envPath = path.join(process.cwd(), envFile);
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8');
      if (envContent.includes('SECRET') || envContent.includes('KEY')) {
        securityPassed.push(`✅ ${envFile} - Variables de seguridad configuradas`);
      } else {
        securityIssues.push(`⚠️ ${envFile} - No se detectaron variables de seguridad`);
      }
    }
  });
  
  return { securityIssues, securityPassed };
}

function createRateLimitingConfig() {
  console.log('\n🚦 Configurando Rate Limiting...\n');
  
  const rateLimitConfig = `
// Configuración de Rate Limiting
// Archivo: src/lib/rate-limit.ts

import { NextRequest, NextResponse } from 'next/server';

// Configuración de rate limiting
const rateLimitConfig = {
  windowMs: ${securityConfig.rateLimiting.windowMs}, // ${securityConfig.rateLimiting.windowMs / 60000} minutos
  max: ${securityConfig.rateLimiting.max}, // máximo ${securityConfig.rateLimiting.max} requests por IP
  message: '${securityConfig.rateLimiting.message}',
  standardHeaders: ${securityConfig.rateLimiting.standardHeaders},
  legacyHeaders: ${securityConfig.rateLimiting.legacyHeaders}
};

// Store para tracking de requests
const requestCounts = new Map<string, { count: number; resetTime: number }>();

export function rateLimit(request: NextRequest): NextResponse | null {
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
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
export function withRateLimit(handler: Function) {
  return async (request: NextRequest, ...args: any[]) => {
    const rateLimitResponse = rateLimit(request);
    if (rateLimitResponse) {
      return rateLimitResponse;
    }
    
    return handler(request, ...args);
  };
}
`;

  const rateLimitPath = path.join(process.cwd(), 'src/lib/rate-limit.ts');
  fs.writeFileSync(rateLimitPath, rateLimitConfig);
  console.log(`✅ Configuración de Rate Limiting creada: ${rateLimitPath}`);
}

function createSecurityHeaders() {
  console.log('\n🛡️ Configurando Security Headers...\n');
  
  const securityHeadersConfig = `
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
export function withSecurityHeaders(handler: Function) {
  return async (request: Request, ...args: any[]) => {
    const response = await handler(request, ...args);
    
    if (response instanceof NextResponse) {
      return addSecurityHeaders(response);
    }
    
    return response;
  };
}
`;

  const securityHeadersPath = path.join(process.cwd(), 'src/lib/security-headers.ts');
  fs.writeFileSync(securityHeadersPath, securityHeadersConfig);
  console.log(`✅ Configuración de Security Headers creada: ${securityHeadersPath}`);
}

function generateSecurityReport(securityIssues, securityPassed) {
  console.log('\n📊 REPORTE DE SEGURIDAD:');
  console.log('========================\n');
  
  console.log('✅ VERIFICACIONES EXITOSAS:');
  securityPassed.forEach(item => console.log(`  ${item}`));
  
  if (securityIssues.length > 0) {
    console.log('\n⚠️ PROBLEMAS DE SEGURIDAD DETECTADOS:');
    securityIssues.forEach(item => console.log(`  ${item}`));
  }
  
  console.log('\n📈 RESUMEN:');
  console.log(`  - Verificaciones exitosas: ${securityPassed.length}`);
  console.log(`  - Problemas detectados: ${securityIssues.length}`);
  console.log(`  - Nivel de seguridad: ${securityIssues.length === 0 ? '🟢 ALTO' : securityIssues.length < 3 ? '🟡 MEDIO' : '🔴 BAJO'}`);
  
  // Guardar reporte
  const report = {
    timestamp: new Date().toISOString(),
    passed: securityPassed,
    issues: securityIssues,
    summary: {
      totalPassed: securityPassed.length,
      totalIssues: securityIssues.length,
      securityLevel: securityIssues.length === 0 ? 'HIGH' : securityIssues.length < 3 ? 'MEDIUM' : 'LOW'
    }
  };
  
  const reportPath = path.join(process.cwd(), 'test-results/security-report.json');
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  console.log(`\n📄 Reporte guardado en: ${reportPath}`);
}

// Ejecutar verificación de seguridad
function runSecurityCheck() {
  console.log('🔒 Iniciando verificación de seguridad...\n');
  
  const { securityIssues, securityPassed } = checkSecurityPolicies();
  createRateLimitingConfig();
  createSecurityHeaders();
  generateSecurityReport(securityIssues, securityPassed);
  
  console.log('\n🎉 Verificación de seguridad completada!');
}

// Ejecutar si se llama directamente
if (require.main === module) {
  runSecurityCheck();
}

module.exports = { runSecurityCheck, checkSecurityPolicies };