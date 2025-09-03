#!/usr/bin/env node

/**
 * Script de Testing de Performance
 * Prueba el rendimiento del sitio usando Lighthouse
 */

const { default: lighthouse } = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');
const path = require('path');

// URLs a probar
const urls = [
  '/',
  '/noticias',
  '/contacto',
  '/servicios-desarrollo-web',
  '/privacidad',
  '/terminos',
  '/cookies'
];

// Configuración de Lighthouse
const lighthouseConfig = {
  extends: 'lighthouse:default',
  settings: {
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    formFactor: 'desktop',
    throttling: {
      rttMs: 40,
      throughputKbps: 10240,
      cpuSlowdownMultiplier: 1,
      requestLatencyMs: 0,
      downloadThroughputKbps: 0,
      uploadThroughputKbps: 0
    },
    screenEmulation: {
      mobile: false,
      width: 1350,
      height: 940,
      deviceScaleFactor: 1,
      disabled: false
    },
    emulatedUserAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  }
};

async function testPerformance() {
  console.log('⚡ Iniciando Testing de Performance con Lighthouse...\n');
  
  const results = [];
  
  for (const url of urls) {
    try {
      console.log(`🔍 Probando performance: ${url}`);
      
      const fullUrl = `http://localhost:3000${url}`;
      
      // Lanzar Chrome
      const chrome = await chromeLauncher.launch({
        chromeFlags: ['--headless', '--disable-gpu', '--no-sandbox']
      });
      
      // Ejecutar Lighthouse
      const runnerResult = await lighthouse(fullUrl, {
        port: chrome.port,
        output: 'json',
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo']
      });
      
      // Analizar resultados
      const analysis = analyzeLighthouseResults(runnerResult.lhr, url);
      
      results.push({
        url: url,
        timestamp: new Date().toISOString(),
        ...analysis
      });
      
      console.log(`  ✅ ${url} - Completado (Performance: ${analysis.performanceScore}%)`);
      
      await chrome.kill();
      
    } catch (error) {
      console.log(`  ❌ ${url} - Error: ${error.message}`);
      results.push({
        url: url,
        error: error.message,
        timestamp: new Date().toISOString()
      });
    }
  }
  
  // Guardar resultados
  const resultsPath = path.join(__dirname, '../test-results/performance-test.json');
  fs.mkdirSync(path.dirname(resultsPath), { recursive: true });
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
  
  console.log('\n📊 Resultados guardados en: test-results/performance-test.json');
  console.log('\n⚡ Testing de Performance Completado!');
  
  // Mostrar resumen
  showPerformanceSummary(results);
}

function analyzeLighthouseResults(lhr, url) {
  const categories = lhr.categories;
  
  return {
    performanceScore: Math.round((categories.performance?.score || 0) * 100),
    accessibilityScore: Math.round((categories.accessibility?.score || 0) * 100),
    bestPracticesScore: Math.round((categories['best-practices']?.score || 0) * 100),
    seoScore: Math.round((categories.seo?.score || 0) * 100),
    
    // Métricas de Core Web Vitals
    firstContentfulPaint: lhr.audits['first-contentful-paint']?.numericValue || 0,
    largestContentfulPaint: lhr.audits['largest-contentful-paint']?.numericValue || 0,
    firstInputDelay: lhr.audits['max-potential-fid']?.numericValue || 0,
    cumulativeLayoutShift: lhr.audits['cumulative-layout-shift']?.numericValue || 0,
    
    // Otras métricas importantes
    totalBlockingTime: lhr.audits['total-blocking-time']?.numericValue || 0,
    speedIndex: lhr.audits['speed-index']?.numericValue || 0
  };
}

function showPerformanceSummary(results) {
  console.log('\n📈 RESUMEN DE PERFORMANCE:');
  console.log('============================');
  
  const validResults = results.filter(r => !r.error);
  
  if (validResults.length === 0) {
    console.log('❌ No hay resultados válidos para mostrar');
    return;
  }
  
  // Calcular promedios
  const avgPerformance = validResults.reduce((sum, r) => sum + r.performanceScore, 0) / validResults.length;
  const avgAccessibility = validResults.reduce((sum, r) => sum + r.accessibilityScore, 0) / validResults.length;
  const avgBestPractices = validResults.reduce((sum, r) => sum + r.bestPracticesScore, 0) / validResults.length;
  const avgSEO = validResults.reduce((sum, r) => sum + r.seoScore, 0) / validResults.length;
  
  console.log(`📊 Puntuaciones promedio:`);
  console.log(`  - Performance: ${avgPerformance.toFixed(1)}%`);
  console.log(`  - Accesibilidad: ${avgAccessibility.toFixed(1)}%`);
  console.log(`  - Mejores Prácticas: ${avgBestPractices.toFixed(1)}%`);
  console.log(`  - SEO: ${avgSEO.toFixed(1)}%`);
  
  // Mostrar mejores páginas
  const bestPerformance = validResults.sort((a, b) => b.performanceScore - a.performanceScore)[0];
  console.log(`\n🏆 Mejor performance: ${bestPerformance.url} (${bestPerformance.performanceScore}%)`);
  
  // Mostrar páginas que necesitan mejora
  const needsImprovement = validResults.filter(r => r.performanceScore < 70);
  if (needsImprovement.length > 0) {
    console.log('\n⚠️ PÁGINAS QUE NECESITAN MEJORA DE PERFORMANCE:');
    needsImprovement.forEach(page => {
      console.log(`  - ${page.url}: ${page.performanceScore}%`);
    });
  }
  
  // Mostrar Core Web Vitals
  console.log('\n🎯 CORE WEB VITALS (Promedio):');
  const avgFCP = validResults.reduce((sum, r) => sum + r.firstContentfulPaint, 0) / validResults.length;
  const avgLCP = validResults.reduce((sum, r) => sum + r.largestContentfulPaint, 0) / validResults.length;
  const avgCLS = validResults.reduce((sum, r) => sum + r.cumulativeLayoutShift, 0) / validResults.length;
  
  console.log(`  - First Contentful Paint: ${(avgFCP / 1000).toFixed(2)}s`);
  console.log(`  - Largest Contentful Paint: ${(avgLCP / 1000).toFixed(2)}s`);
  console.log(`  - Cumulative Layout Shift: ${avgCLS.toFixed(3)}`);
  
  // Evaluar Core Web Vitals
  const fcpStatus = avgFCP < 1800 ? '✅' : avgFCP < 3000 ? '⚠️' : '❌';
  const lcpStatus = avgLCP < 2500 ? '✅' : avgLCP < 4000 ? '⚠️' : '❌';
  const clsStatus = avgCLS < 0.1 ? '✅' : avgCLS < 0.25 ? '⚠️' : '❌';
  
  console.log(`\n📊 EVALUACIÓN CORE WEB VITALS:`);
  console.log(`  - FCP: ${fcpStatus} ${(avgFCP < 1800 ? 'Bueno' : avgFCP < 3000 ? 'Necesita mejora' : 'Pobre')}`);
  console.log(`  - LCP: ${lcpStatus} ${(avgLCP < 2500 ? 'Bueno' : avgLCP < 4000 ? 'Necesita mejora' : 'Pobre')}`);
  console.log(`  - CLS: ${clsStatus} ${(avgCLS < 0.1 ? 'Bueno' : avgCLS < 0.25 ? 'Necesita mejora' : 'Pobre')}`);
}

// Ejecutar si se llama directamente
if (require.main === module) {
  testPerformance().catch(console.error);
}

module.exports = { testPerformance };
