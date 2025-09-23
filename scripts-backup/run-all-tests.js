#!/usr/bin/env node

/**
 * Script Principal de Testing
 * Ejecuta todos los tests: Usabilidad, Accesibilidad y Performance
 */

const { testUsability } = require('./test-usability');
const { testAccessibility } = require('./test-accessibility');
const { testPerformance } = require('./test-performance');
const fs = require('fs');
const path = require('path');

async function runAllTests() {
  console.log('🚀 INICIANDO SUITE COMPLETA DE TESTING');
  console.log('=====================================\n');
  
  const startTime = Date.now();
  const results = {
    timestamp: new Date().toISOString(),
    tests: {}
  };
  
  try {
    // 1. Testing de Usabilidad
    console.log('📱 PASO 1: Testing de Usabilidad');
    console.log('--------------------------------');
    await testUsability();
    results.tests.usability = 'completed';
    console.log('✅ Testing de Usabilidad completado\n');
    
  } catch (error) {
    console.log('❌ Error en Testing de Usabilidad:', error.message);
    results.tests.usability = 'failed';
  }
  
  try {
    // 2. Testing de Accesibilidad
    console.log('♿ PASO 2: Testing de Accesibilidad');
    console.log('-----------------------------------');
    await testAccessibility();
    results.tests.accessibility = 'completed';
    console.log('✅ Testing de Accesibilidad completado\n');
    
  } catch (error) {
    console.log('❌ Error en Testing de Accesibilidad:', error.message);
    results.tests.accessibility = 'failed';
  }
  
  try {
    // 3. Testing de Performance
    console.log('⚡ PASO 3: Testing de Performance');
    console.log('---------------------------------');
    await testPerformance();
    results.tests.performance = 'completed';
    console.log('✅ Testing de Performance completado\n');
    
  } catch (error) {
    console.log('❌ Error en Testing de Performance:', error.message);
    results.tests.performance = 'failed';
  }
  
  // Calcular tiempo total
  const totalTime = Date.now() - startTime;
  const minutes = Math.floor(totalTime / 60000);
  const seconds = Math.floor((totalTime % 60000) / 1000);
  
  console.log('🎯 SUITE DE TESTING COMPLETADA');
  console.log('==============================');
  console.log(`⏱️  Tiempo total: ${minutes}m ${seconds}s`);
  
  // Mostrar resumen
  const completedTests = Object.values(results.tests).filter(status => status === 'completed').length;
  const totalTests = Object.keys(results.tests).length;
  
  console.log(`📊 Tests completados: ${completedTests}/${totalTests}`);
  console.log(`📈 Tasa de éxito: ${((completedTests / totalTests) * 100).toFixed(1)}%`);
  
  // Guardar resultados generales
  const resultsPath = path.join(__dirname, '../test-results/all-tests-summary.json');
  fs.mkdirSync(path.dirname(resultsPath), { recursive: true });
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
  
  console.log('\n📁 Resultados guardados en: test-results/');
  console.log('📋 Revisa los archivos individuales para detalles específicos');
  
  if (completedTests === totalTests) {
    console.log('\n🎉 ¡TODOS LOS TESTS COMPLETADOS EXITOSAMENTE!');
  } else {
    console.log('\n⚠️  Algunos tests fallaron. Revisa los errores arriba.');
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  runAllTests().catch(console.error);
}

module.exports = { runAllTests };
