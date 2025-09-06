// API Endpoint para Inicializar Base de Datos Unificada
// "Gran Henki Dama de Goku" - Sistema de análisis de apuestas deportivas

import { NextRequest, NextResponse } from 'next/server';
import { UnifiedDatabaseManager } from '@/lib/unified-database-manager';

export async function POST(request: NextRequest) {
  try {
    console.log('🔥 Iniciando inicialización de base de datos unificada...');
    
    const { forceRecreate = false } = await request.json();
    
    // Crear gestor de base de datos unificada
    const dbManager = new UnifiedDatabaseManager();
    
    // Inicializar base de datos
    const stats = await dbManager.initializeUnifiedDatabase();
    
    // Desconectar
    await dbManager.disconnect();
    
    const response = {
      success: true,
      message: 'Base de datos unificada inicializada exitosamente',
      data: {
        stats,
        summary: {
          totalMatches: stats.totalMatches.toLocaleString(),
          totalTeams: stats.totalTeams.toLocaleString(),
          totalLeagues: stats.totalLeagues,
          totalSeasons: stats.totalSeasons,
          coverage2020_2025: `${stats.coverage2020_2025.toFixed(1)}%`,
          lastUpdate: new Date(stats.lastUpdate).toLocaleString()
        },
        nextSteps: [
          'Procesar datos históricos de CSVs',
          'Integrar datos de SofaScore.com',
          'Implementar sistema de predicciones',
          'Crear interfaz de análisis',
          'Configurar alertas de oportunidades'
        ]
      }
    };
    
    console.log('✅ Base de datos unificada inicializada exitosamente');
    console.log(`📊 Resumen: ${stats.totalMatches} partidos, ${stats.totalTeams} equipos, ${stats.totalLeagues} ligas`);
    
    return NextResponse.json(response);
    
  } catch (error) {
    console.error('Error inicializando base de datos unificada:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Error inicializando base de datos unificada',
      error: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    const dbManager = new UnifiedDatabaseManager();
    const stats = await dbManager.getDatabaseStats();
    await dbManager.disconnect();
    
    return NextResponse.json({
      success: true,
      message: 'Estadísticas de base de datos unificada',
      data: stats
    });
    
  } catch (error) {
    console.error('Error obteniendo estadísticas:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Error obteniendo estadísticas',
      error: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  }
}

