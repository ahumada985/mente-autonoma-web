// Script para Ejecutar Procesamiento por Lotes
// "Gran Henki Dama de Goku" - Sistema de análisis de apuestas deportivas

const fs = require('fs');
const path = require('path');

// Configuración
const BASE_PATH = 'Resultados historicos';
const OUTPUT_FILE = 'batch-processing-report.json';

// Función para ejecutar procesamiento por lotes
async function runBatchProcessing() {
  console.log('🔥 Iniciando procesamiento por lotes de CSVs...');
  console.log('📊 Versión optimizada - Sin stack overflow');
  
  const startTime = Date.now();
  
  try {
    // Simular llamada a la API
    const response = await fetch('http://localhost:3000/api/process-csv-batch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        csvDirectory: BASE_PATH
      }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.success) {
      const processingTime = Date.now() - startTime;
      
      // Guardar reporte
      const report = {
        ...data.data,
        processingTime,
        timestamp: new Date().toISOString(),
        script: 'batch-processing'
      };
      
      fs.writeFileSync(OUTPUT_FILE, JSON.stringify(report, null, 2));
      
      console.log('\n✅ Procesamiento por lotes completado exitosamente!');
      console.log(`📊 Resumen:`);
      console.log(`   📁 Archivos procesados: ${data.data.processedFiles}/${data.data.totalFiles}`);
      console.log(`   ⚽ Partidos: ${data.data.totalMatches.toLocaleString()}`);
      console.log(`   👥 Equipos: ${data.data.totalTeams.toLocaleString()}`);
      console.log(`   🏆 Ligas: ${data.data.totalLeagues}`);
      console.log(`   📅 Temporadas: ${data.data.totalSeasons}`);
      console.log(`   📈 Cobertura 2020-2025: ${data.data.coverage2020_2025.toFixed(1)}%`);
      console.log(`   ⏱️ Tiempo total: ${(processingTime / 1000).toFixed(2)}s`);
      console.log(`   📄 Reporte guardado en: ${OUTPUT_FILE}`);
      
      return report;
    } else {
      throw new Error(data.message || 'Error en el procesamiento');
    }
    
  } catch (error) {
    console.error('❌ Error en procesamiento por lotes:', error.message);
    
    // Crear reporte de error
    const errorReport = {
      success: false,
      error: error.message,
      processingTime: Date.now() - startTime,
      timestamp: new Date().toISOString(),
      script: 'batch-processing'
    };
    
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(errorReport, null, 2));
    
    throw error;
  }
}

// Función para verificar si el servidor está corriendo
async function checkServerStatus() {
  try {
    const response = await fetch('http://localhost:3000/api/process-csv-batch', {
      method: 'GET'
    });
    
    return response.ok;
  } catch (error) {
    return false;
  }
}

// Función principal
async function main() {
  console.log('🔍 Verificando estado del servidor...');
  
  const serverRunning = await checkServerStatus();
  
  if (!serverRunning) {
    console.log('⚠️ Servidor no está corriendo en http://localhost:3000');
    console.log('💡 Ejecuta "npm run dev" en otra terminal y vuelve a intentar');
    process.exit(1);
  }
  
  console.log('✅ Servidor detectado, iniciando procesamiento...');
  
  try {
    await runBatchProcessing();
  } catch (error) {
    console.error('❌ Error fatal:', error.message);
    process.exit(1);
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  main();
}

module.exports = { runBatchProcessing, checkServerStatus };

