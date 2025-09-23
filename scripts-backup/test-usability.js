#!/usr/bin/env node

/**
 * Script de Testing de Usabilidad
 * Prueba la funcionalidad en diferentes dispositivos y navegadores
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Configuraciones de dispositivos para testing
const devices = [
  { name: 'Desktop', width: 1920, height: 1080 },
  { name: 'Tablet', width: 768, height: 1024 },
  { name: 'Mobile', width: 375, height: 667 },
  { name: 'Large Mobile', width: 414, height: 896 }
];

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

async function testUsability() {
  console.log('🚀 Iniciando Testing de Usabilidad...\n');
  
  const browser = await puppeteer.launch({ 
    headless: false,
    defaultViewport: null 
  });
  
  const results = [];
  
  for (const device of devices) {
    console.log(`📱 Probando en ${device.name} (${device.width}x${device.height})`);
    
    const page = await browser.newPage();
    await page.setViewport({ width: device.width, height: device.height });
    
    for (const url of urls) {
      try {
        const fullUrl = `http://localhost:3000${url}`;
        console.log(`  🔍 Probando: ${url}`);
        
        await page.goto(fullUrl, { waitUntil: 'networkidle2' });
        
        // Test de elementos críticos
        const criticalElements = await testCriticalElements(page, url);
        
        // Test de responsive design
        const responsiveTest = await testResponsiveDesign(page, device);
        
        // Test de performance
        const performanceTest = await testPerformance(page);
        
        results.push({
          device: device.name,
          url: url,
          criticalElements,
          responsiveTest,
          performanceTest,
          timestamp: new Date().toISOString()
        });
        
        console.log(`    ✅ ${url} - Completado`);
        
      } catch (error) {
        console.log(`    ❌ ${url} - Error: ${error.message}`);
        results.push({
          device: device.name,
          url: url,
          error: error.message,
          timestamp: new Date().toISOString()
        });
      }
    }
    
    await page.close();
  }
  
  await browser.close();
  
  // Guardar resultados
  const resultsPath = path.join(__dirname, '../test-results/usability-test.json');
  fs.mkdirSync(path.dirname(resultsPath), { recursive: true });
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
  
  console.log('\n📊 Resultados guardados en: test-results/usability-test.json');
  console.log('\n🎯 Testing de Usabilidad Completado!');
  
  // Mostrar resumen
  showSummary(results);
}

async function testCriticalElements(page, url) {
  const tests = {};
  
  // Test de elementos básicos
  tests.hasHeader = await page.$('header') !== null;
  tests.hasFooter = await page.$('footer') !== null;
  tests.hasMainContent = await page.$('main') !== null;
  
  // Test específicos por página
  if (url === '/') {
    tests.hasHeroSection = await page.$('[data-testid="hero"]') !== null;
    tests.hasCTASection = await page.$('[data-testid="cta"]') !== null;
  }
  
  if (url === '/contacto') {
    tests.hasContactForm = await page.$('form') !== null;
    tests.hasContactInfo = await page.$('[data-testid="contact-info"]') !== null;
  }
  
  if (url === '/noticias') {
    tests.hasNewsGrid = await page.$('[data-testid="news-grid"]') !== null;
    tests.hasNewsItems = await page.$$('[data-testid="news-item"]').length > 0;
  }
  
  return tests;
}

async function testResponsiveDesign(page, device) {
  const tests = {};
  
  // Test de viewport
  const viewport = await page.evaluate(() => ({
    width: window.innerWidth,
    height: window.innerHeight
  }));
  
  tests.viewportCorrect = viewport.width === device.width && viewport.height === device.height;
  
  // Test de elementos responsive
  tests.headerResponsive = await page.evaluate(() => {
    const header = document.querySelector('header');
    if (!header) return false;
    const styles = window.getComputedStyle(header);
    return styles.display !== 'none';
  });
  
  return tests;
}

async function testPerformance(page) {
  const performance = await page.evaluate(() => {
    const navigation = performance.getEntriesByType('navigation')[0];
    return {
      loadTime: navigation.loadEventEnd - navigation.loadEventStart,
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      firstPaint: performance.getEntriesByType('paint')[0]?.startTime || 0
    };
  });
  
  return {
    loadTime: performance.loadTime,
    domContentLoaded: performance.domContentLoaded,
    firstPaint: performance.firstPaint,
    isFast: performance.loadTime < 3000 // Menos de 3 segundos
  };
}

function showSummary(results) {
  console.log('\n📈 RESUMEN DEL TESTING:');
  console.log('========================');
  
  const totalTests = results.length;
  const successfulTests = results.filter(r => !r.error).length;
  const failedTests = totalTests - successfulTests;
  
  console.log(`Total de pruebas: ${totalTests}`);
  console.log(`✅ Exitosas: ${successfulTests}`);
  console.log(`❌ Fallidas: ${failedTests}`);
  console.log(`📊 Tasa de éxito: ${((successfulTests / totalTests) * 100).toFixed(1)}%`);
  
  if (failedTests > 0) {
    console.log('\n🚨 PRUEBAS FALLIDAS:');
    results.filter(r => r.error).forEach(r => {
      console.log(`  - ${r.device}: ${r.url} - ${r.error}`);
    });
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  testUsability().catch(console.error);
}

module.exports = { testUsability };
