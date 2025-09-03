#!/usr/bin/env node

/**
 * Script de Verificación Responsive y SEO
 * Verifica responsive design y meta tags SEO
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Dispositivos a probar
const devices = [
  { name: 'Desktop', width: 1920, height: 1080 },
  { name: 'Laptop', width: 1366, height: 768 },
  { name: 'Tablet', width: 768, height: 1024 },
  { name: 'Mobile Large', width: 425, height: 800 },
  { name: 'Mobile Small', width: 375, height: 667 }
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

async function checkResponsiveDesign() {
  console.log('📱 Verificando diseño responsive...\n');
  
  const browser = await puppeteer.launch({ headless: true });
  const results = [];
  
  for (const device of devices) {
    console.log(`🔍 Probando en ${device.name} (${device.width}x${device.height})`);
    
    const page = await browser.newPage();
    await page.setViewport({ width: device.width, height: device.height });
    
    const deviceResults = [];
    
    for (const url of urls) {
      try {
        const fullUrl = `http://localhost:3000${url}`;
        await page.goto(fullUrl, { waitUntil: 'networkidle0', timeout: 30000 });
        
        // Verificar elementos responsive
        const responsiveChecks = await page.evaluate(() => {
          const checks = {
            hasViewportMeta: false,
            hasResponsiveImages: false,
            hasFlexibleLayout: false,
            hasMobileMenu: false,
            textReadable: false,
            buttonsClickable: false
          };
          
          // Verificar viewport meta tag
          const viewportMeta = document.querySelector('meta[name="viewport"]');
          checks.hasViewportMeta = viewportMeta && viewportMeta.content.includes('width=device-width');
          
          // Verificar imágenes responsive
          const images = document.querySelectorAll('img');
          checks.hasResponsiveImages = Array.from(images).some(img => 
            img.style.maxWidth === '100%' || 
            img.classList.contains('responsive') ||
            img.hasAttribute('srcset')
          );
          
          // Verificar layout flexible
          const containers = document.querySelectorAll('[class*="container"], [class*="flex"], [class*="grid"]');
          checks.hasFlexibleLayout = containers.length > 0;
          
          // Verificar menú móvil
          const mobileMenu = document.querySelector('[class*="mobile"], [class*="hamburger"], [class*="menu"]');
          checks.hasMobileMenu = mobileMenu !== null;
          
          // Verificar legibilidad del texto
          const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6');
          checks.textReadable = textElements.length > 0;
          
          // Verificar botones clickeables
          const buttons = document.querySelectorAll('button, [role="button"], a[href]');
          checks.buttonsClickable = buttons.length > 0;
          
          return checks;
        });
        
        deviceResults.push({
          url,
          ...responsiveChecks,
          status: 'success'
        });
        
        console.log(`  ✅ ${url} - Completado`);
        
      } catch (error) {
        deviceResults.push({
          url,
          error: error.message,
          status: 'error'
        });
        console.log(`  ❌ ${url} - Error: ${error.message}`);
      }
    }
    
    results.push({
      device: device.name,
      dimensions: `${device.width}x${device.height}`,
      results: deviceResults
    });
    
    await page.close();
  }
  
  await browser.close();
  return results;
}

async function checkSEO() {
  console.log('\n🔍 Verificando SEO y meta tags...\n');
  
  const browser = await puppeteer.launch({ headless: true });
  const seoResults = [];
  
  for (const url of urls) {
    try {
      const page = await browser.newPage();
      const fullUrl = `http://localhost:3000${url}`;
      await page.goto(fullUrl, { waitUntil: 'networkidle0', timeout: 30000 });
      
      const seoData = await page.evaluate(() => {
        const data = {
          title: '',
          description: '',
          keywords: '',
          ogTitle: '',
          ogDescription: '',
          ogImage: '',
          canonical: '',
          robots: '',
          hasH1: false,
          hasH2: false,
          hasAltImages: false,
          hasInternalLinks: false,
          hasExternalLinks: false,
          pageLoadTime: 0
        };
        
        // Meta tags básicos
        const title = document.querySelector('title');
        data.title = title ? title.textContent : '';
        
        const description = document.querySelector('meta[name="description"]');
        data.description = description ? description.content : '';
        
        const keywords = document.querySelector('meta[name="keywords"]');
        data.keywords = keywords ? keywords.content : '';
        
        // Open Graph
        const ogTitle = document.querySelector('meta[property="og:title"]');
        data.ogTitle = ogTitle ? ogTitle.content : '';
        
        const ogDescription = document.querySelector('meta[property="og:description"]');
        data.ogDescription = ogDescription ? ogDescription.content : '';
        
        const ogImage = document.querySelector('meta[property="og:image"]');
        data.ogImage = ogImage ? ogImage.content : '';
        
        // Otros meta tags
        const canonical = document.querySelector('link[rel="canonical"]');
        data.canonical = canonical ? canonical.href : '';
        
        const robots = document.querySelector('meta[name="robots"]');
        data.robots = robots ? robots.content : '';
        
        // Estructura de contenido
        data.hasH1 = document.querySelector('h1') !== null;
        data.hasH2 = document.querySelector('h2') !== null;
        
        // Imágenes con alt
        const images = document.querySelectorAll('img');
        data.hasAltImages = Array.from(images).every(img => img.alt && img.alt.trim() !== '');
        
        // Enlaces
        const internalLinks = document.querySelectorAll('a[href^="/"], a[href^="' + window.location.origin + '"]');
        data.hasInternalLinks = internalLinks.length > 0;
        
        const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])');
        data.hasExternalLinks = externalLinks.length > 0;
        
        return data;
      });
      
      seoResults.push({
        url,
        ...seoData,
        status: 'success'
      });
      
      console.log(`✅ ${url} - SEO verificado`);
      await page.close();
      
    } catch (error) {
      seoResults.push({
        url,
        error: error.message,
        status: 'error'
      });
      console.log(`❌ ${url} - Error: ${error.message}`);
    }
  }
  
  await browser.close();
  return seoResults;
}

function generateResponsiveReport(responsiveResults) {
  console.log('\n📊 REPORTE RESPONSIVE:');
  console.log('======================\n');
  
  responsiveResults.forEach(device => {
    console.log(`📱 ${device.device} (${device.dimensions}):`);
    
    const successCount = device.results.filter(r => r.status === 'success').length;
    const totalCount = device.results.length;
    
    console.log(`  - Páginas probadas: ${successCount}/${totalCount}`);
    
    if (successCount > 0) {
      const avgChecks = device.results
        .filter(r => r.status === 'success')
        .reduce((acc, r) => {
          return {
            hasViewportMeta: acc.hasViewportMeta + (r.hasViewportMeta ? 1 : 0),
            hasResponsiveImages: acc.hasResponsiveImages + (r.hasResponsiveImages ? 1 : 0),
            hasFlexibleLayout: acc.hasFlexibleLayout + (r.hasFlexibleLayout ? 1 : 0),
            hasMobileMenu: acc.hasMobileMenu + (r.hasMobileMenu ? 1 : 0),
            textReadable: acc.textReadable + (r.textReadable ? 1 : 0),
            buttonsClickable: acc.buttonsClickable + (r.buttonsClickable ? 1 : 0)
          };
        }, {
          hasViewportMeta: 0,
          hasResponsiveImages: 0,
          hasFlexibleLayout: 0,
          hasMobileMenu: 0,
          textReadable: 0,
          buttonsClickable: 0
        });
      
      console.log(`  - Viewport Meta: ${(avgChecks.hasViewportMeta / successCount * 100).toFixed(1)}%`);
      console.log(`  - Imágenes Responsive: ${(avgChecks.hasResponsiveImages / successCount * 100).toFixed(1)}%`);
      console.log(`  - Layout Flexible: ${(avgChecks.hasFlexibleLayout / successCount * 100).toFixed(1)}%`);
      console.log(`  - Menú Móvil: ${(avgChecks.hasMobileMenu / successCount * 100).toFixed(1)}%`);
      console.log(`  - Texto Legible: ${(avgChecks.textReadable / successCount * 100).toFixed(1)}%`);
      console.log(`  - Botones Clickeables: ${(avgChecks.buttonsClickable / successCount * 100).toFixed(1)}%`);
    }
    
    console.log('');
  });
}

function generateSEOReport(seoResults) {
  console.log('\n🔍 REPORTE SEO:');
  console.log('================\n');
  
  const successResults = seoResults.filter(r => r.status === 'success');
  
  if (successResults.length === 0) {
    console.log('❌ No hay resultados válidos para mostrar');
    return;
  }
  
  // Calcular estadísticas
  const stats = {
    hasTitle: successResults.filter(r => r.title && r.title.trim() !== '').length,
    hasDescription: successResults.filter(r => r.description && r.description.trim() !== '').length,
    hasKeywords: successResults.filter(r => r.keywords && r.keywords.trim() !== '').length,
    hasOgTitle: successResults.filter(r => r.ogTitle && r.ogTitle.trim() !== '').length,
    hasOgDescription: successResults.filter(r => r.ogDescription && r.ogDescription.trim() !== '').length,
    hasOgImage: successResults.filter(r => r.ogImage && r.ogImage.trim() !== '').length,
    hasCanonical: successResults.filter(r => r.canonical && r.canonical.trim() !== '').length,
    hasRobots: successResults.filter(r => r.robots && r.robots.trim() !== '').length,
    hasH1: successResults.filter(r => r.hasH1).length,
    hasH2: successResults.filter(r => r.hasH2).length,
    hasAltImages: successResults.filter(r => r.hasAltImages).length,
    hasInternalLinks: successResults.filter(r => r.hasInternalLinks).length,
    hasExternalLinks: successResults.filter(r => r.hasExternalLinks).length
  };
  
  const total = successResults.length;
  
  console.log('📊 COBERTURA SEO:');
  console.log(`  - Título: ${(stats.hasTitle / total * 100).toFixed(1)}% (${stats.hasTitle}/${total})`);
  console.log(`  - Descripción: ${(stats.hasDescription / total * 100).toFixed(1)}% (${stats.hasDescription}/${total})`);
  console.log(`  - Keywords: ${(stats.hasKeywords / total * 100).toFixed(1)}% (${stats.hasKeywords}/${total})`);
  console.log(`  - Open Graph Title: ${(stats.hasOgTitle / total * 100).toFixed(1)}% (${stats.hasOgTitle}/${total})`);
  console.log(`  - Open Graph Description: ${(stats.hasOgDescription / total * 100).toFixed(1)}% (${stats.hasOgDescription}/${total})`);
  console.log(`  - Open Graph Image: ${(stats.hasOgImage / total * 100).toFixed(1)}% (${stats.hasOgImage}/${total})`);
  console.log(`  - Canonical: ${(stats.hasCanonical / total * 100).toFixed(1)}% (${stats.hasCanonical}/${total})`);
  console.log(`  - Robots: ${(stats.hasRobots / total * 100).toFixed(1)}% (${stats.hasRobots}/${total})`);
  
  console.log('\n📝 ESTRUCTURA DE CONTENIDO:');
  console.log(`  - H1 Tags: ${(stats.hasH1 / total * 100).toFixed(1)}% (${stats.hasH1}/${total})`);
  console.log(`  - H2 Tags: ${(stats.hasH2 / total * 100).toFixed(1)}% (${stats.hasH2}/${total})`);
  console.log(`  - Imágenes con Alt: ${(stats.hasAltImages / total * 100).toFixed(1)}% (${stats.hasAltImages}/${total})`);
  console.log(`  - Enlaces Internos: ${(stats.hasInternalLinks / total * 100).toFixed(1)}% (${stats.hasInternalLinks}/${total})`);
  console.log(`  - Enlaces Externos: ${(stats.hasExternalLinks / total * 100).toFixed(1)}% (${stats.hasExternalLinks}/${total})`);
  
  // Mostrar páginas con problemas
  const pagesWithIssues = successResults.filter(r => 
    !r.title || !r.description || !r.hasH1 || !r.hasAltImages
  );
  
  if (pagesWithIssues.length > 0) {
    console.log('\n⚠️ PÁGINAS CON PROBLEMAS SEO:');
    pagesWithIssues.forEach(page => {
      const issues = [];
      if (!page.title) issues.push('Sin título');
      if (!page.description) issues.push('Sin descripción');
      if (!page.hasH1) issues.push('Sin H1');
      if (!page.hasAltImages) issues.push('Imágenes sin alt');
      
      console.log(`  - ${page.url}: ${issues.join(', ')}`);
    });
  }
}

async function runResponsiveSEOCheck() {
  console.log('🚀 Iniciando verificación responsive y SEO...\n');
  
  try {
    const responsiveResults = await checkResponsiveDesign();
    const seoResults = await checkSEO();
    
    generateResponsiveReport(responsiveResults);
    generateSEOReport(seoResults);
    
    // Guardar resultados
    const results = {
      timestamp: new Date().toISOString(),
      responsive: responsiveResults,
      seo: seoResults
    };
    
    const resultsPath = path.join(process.cwd(), 'test-results/responsive-seo-test.json');
    fs.mkdirSync(path.dirname(resultsPath), { recursive: true });
    fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
    
    console.log(`\n📄 Resultados guardados en: ${resultsPath}`);
    console.log('\n🎉 Verificación responsive y SEO completada!');
    
  } catch (error) {
    console.error('❌ Error durante la verificación:', error.message);
    process.exit(1);
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  runResponsiveSEOCheck();
}

module.exports = { runResponsiveSEOCheck, checkResponsiveDesign, checkSEO };
