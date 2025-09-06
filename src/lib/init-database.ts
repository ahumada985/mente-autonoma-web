// Script de Inicialización de Base de Datos
import { DatabaseService } from './database';
import { apiService } from './api-services';

export async function initializeDatabase() {
  console.log('🚀 Inicializando Base de Datos del Sistema de Análisis de Apuestas...');
  
  try {
    // 1. Inicializar ligas
    console.log('📋 Inicializando ligas...');
    await DatabaseService.initializeLeagues();
    
    // 2. Inicializar configuración del sistema
    console.log('⚙️ Inicializando configuración...');
    await DatabaseService.initializeSystemConfig();
    
    // 3. Verificar APIs
    console.log('🔍 Verificando APIs...');
    await apiService.checkAPILimits();
    
    // 4. Cargar datos históricos
    console.log('📊 Cargando datos históricos...');
    await apiService.loadHistoricalDataFromCSV();
    
    console.log('✅ Base de datos inicializada exitosamente!');
    
    // 5. Mostrar estadísticas
    const stats = await DatabaseService.getSystemStats();
    console.log('\n📊 Estadísticas:');
    console.log(`- Ligas: ${stats.totalLeagues}`);
    console.log(`- Equipos: ${stats.totalTeams}`);
    console.log(`- Partidos: ${stats.totalMatches}`);
    console.log(`- Predicciones: ${stats.totalPredictions}`);
    console.log(`- Recomendaciones: ${stats.recommendedPredictions}`);
    console.log(`- Tasa de recomendación: ${stats.recommendationRate.toFixed(1)}%`);
    
  } catch (error) {
    console.error('❌ Error durante la inicialización:', error);
    throw error;
  }
}

// Función para actualizar datos diariamente
export async function updateDailyData() {
  console.log('🔄 Actualizando datos diarios...');
  
  try {
    await apiService.updateDailyData();
    console.log('✅ Datos diarios actualizados');
  } catch (error) {
    console.error('❌ Error actualizando datos diarios:', error);
    throw error;
  }
}


