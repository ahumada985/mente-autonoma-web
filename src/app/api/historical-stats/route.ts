import { NextRequest, NextResponse } from 'next/server';
import { MultiSeasonDataManager } from '@/lib/multi-season-data';

// API para obtener estadísticas históricas de equipos a través de múltiples temporadas
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const teamName = searchParams.get('team');
    const seasons = parseInt(searchParams.get('seasons') || '5');
    
    console.log(`🔍 Obteniendo estadísticas históricas para: ${teamName || 'todos los equipos'}...`);
    
    if (teamName) {
      // Obtener estadísticas históricas de un equipo específico
      const historicalStats = MultiSeasonDataManager.getTeamHistoricalStats(teamName, seasons);
      
      console.log(`✅ Estadísticas históricas obtenidas para ${teamName}:`);
      console.log(`   📊 Temporadas analizadas: ${historicalStats.seasons.length}`);
      console.log(`   🏆 Promedio de posición: ${historicalStats.averages.avgPosition.toFixed(1)}`);
      console.log(`   ⚽ Promedio de goles: ${historicalStats.averages.avgGoalsScored.toFixed(2)}`);
      
      return NextResponse.json({
        success: true,
        data: historicalStats,
        metadata: {
          retrievedAt: new Date().toISOString(),
          seasonsAnalyzed: seasons,
          dataSource: 'Multi-season historical database'
        }
      });
    } else {
      // Obtener resumen de toda la base de datos
      const databaseSummary = MultiSeasonDataManager.getDatabaseSummary();
      
      console.log(`✅ Resumen de base de datos obtenido:`);
      console.log(`   📊 Temporadas: ${databaseSummary.totalSeasons}`);
      console.log(`   👥 Equipos: ${databaseSummary.totalTeams}`);
      console.log(`   ⚽ Partidos: ${databaseSummary.totalMatches}`);
      
      return NextResponse.json({
        success: true,
        data: databaseSummary,
        metadata: {
          retrievedAt: new Date().toISOString(),
          dataSource: 'Multi-season historical database'
        }
      });
    }

  } catch (error) {
    console.error('❌ Error obteniendo estadísticas históricas:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Error interno del servidor',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}


