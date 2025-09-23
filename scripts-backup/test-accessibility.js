#!/usr/bin/env node

/**
 * Script de Testing de Accesibilidad
 * Prueba la accesibilidad del sitio usando axe-core
 */

const puppeteer = require('puppeteer');
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

async function testAccessibility() {
  console.log('♿ Iniciando Testing de Accesibilidad...\n');
  
  const browser = await puppeteer.launch({ 
    headless: false,
    defaultViewport: { width: 1920, height: 1080 }
  });
  
  const results = [];
  
  for (const url of urls) {
    try {
      console.log(`🔍 Probando accesibilidad: ${url}`);
      
      const page = await browser.newPage();
      const fullUrl = `http://localhost:3000${url}`;
      
      await page.goto(fullUrl, { waitUntil: 'networkidle2' });
      
      // Inyectar axe-core para testing de accesibilidad
      await page.addScriptTag({
        path: require.resolve('axe-core/axe.min.js')
      });
      
      // Ejecutar análisis de accesibilidad
      const accessibilityResults = await page.evaluate(() => {
        return new Promise((resolve) => {
          axe.run((err, results) => {
            if (err) {
              resolve({ error: err.message });
            } else {
              resolve(results);
            }
          });
        });
      });
      
      // Analizar resultados
      const analysis = analyzeAccessibilityResults(accessibilityResults);
      
      results.push({
        url: url,
        timestamp: new Date().toISOString(),
        summary: analysis.summary,
        violations: analysis.violations,
        passes: analysis.passes,
        incomplete: analysis.incomplete,
        score: analysis.score
      });
      
      console.log(`  ✅ ${url} - Completado (Score: ${analysis.score}%)`);
      
      await page.close();
      
    } catch (error) {
      console.log(`  ❌ ${url} - Error: ${error.message}`);
      results.push({
        url: url,
        error: error.message,
        timestamp: new Date().toISOString()
      });
    }
  }
  
  await browser.close();
  
  // Guardar resultados
  const resultsPath = path.join(__dirname, '../test-results/accessibility-test.json');
  fs.mkdirSync(path.dirname(resultsPath), { recursive: true });
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
  
  console.log('\n📊 Resultados guardados en: test-results/accessibility-test.json');
  console.log('\n♿ Testing de Accesibilidad Completado!');
  
  // Mostrar resumen
  showAccessibilitySummary(results);
}

function analyzeAccessibilityResults(results) {
  if (results.error) {
    return {
      summary: 'Error en el análisis',
      violations: [],
      passes: [],
      incomplete: [],
      score: 0
    };
  }
  
  const violations = results.violations || [];
  const passes = results.passes || [];
  const incomplete = results.incomplete || [];
  
  // Calcular score (100% - violaciones críticas)
  const criticalViolations = violations.filter(v => 
    v.impact === 'critical' || v.impact === 'serious'
  ).length;
  
  const score = Math.max(0, 100 - (criticalViolations * 10));
  
  return {
    summary: {
      total: violations.length + passes.length + incomplete.length,
      violations: violations.length,
      passes: passes.length,
      incomplete: incomplete.length
    },
    violations: violations.map(v => ({
      id: v.id,
      description: v.description,
      impact: v.impact,
      tags: v.tags,
      nodes: v.nodes.length
    })),
    passes: passes.map(p => ({
      id: p.id,
      description: p.description,
      tags: p.tags
    })),
    incomplete: incomplete.map(i => ({
      id: i.id,
      description: i.description,
      tags: i.tags
    })),
    score: score
  };
}

function showAccessibilitySummary(results) {
  console.log('\n📈 RESUMEN DE ACCESIBILIDAD:');
  console.log('==============================');
  
  const totalTests = results.filter(r => !r.error).length;
  const averageScore = results
    .filter(r => !r.error)
    .reduce((sum, r) => sum + r.score, 0) / totalTests;
  
  console.log(`Total de páginas probadas: ${totalTests}`);
  console.log(`📊 Score promedio: ${averageScore.toFixed(1)}%`);
  
  // Mostrar violaciones críticas
  const criticalViolations = results
    .filter(r => !r.error)
    .flatMap(r => r.violations.filter(v => v.impact === 'critical' || v.impact === 'serious'));
  
  if (criticalViolations.length > 0) {
    console.log('\n🚨 VIOLACIONES CRÍTICAS:');
    criticalViolations.forEach(v => {
      console.log(`  - ${v.id}: ${v.description} (${v.impact})`);
    });
  }
  
  // Mostrar páginas con mejor score
  const bestPages = results
    .filter(r => !r.error)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
  
  console.log('\n🏆 MEJORES PÁGINAS:');
  bestPages.forEach(page => {
    console.log(`  - ${page.url}: ${page.score}%`);
  });
  
  // Mostrar páginas que necesitan mejora
  const needsImprovement = results
    .filter(r => !r.error && r.score < 80);
  
  if (needsImprovement.length > 0) {
    console.log('\n⚠️ PÁGINAS QUE NECESITAN MEJORA:');
    needsImprovement.forEach(page => {
      console.log(`  - ${page.url}: ${page.score}%`);
    });
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  testAccessibility().catch(console.error);
}

module.exports = { testAccessibility };
