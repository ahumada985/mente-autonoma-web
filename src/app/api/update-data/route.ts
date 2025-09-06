import { NextRequest, NextResponse } from 'next/server';
import { DataUpdater } from '@/lib/data-updater';

// API para actualizar datos históricos
export async function POST(request: NextRequest) {
  try {
    console.log('🔄 Iniciando actualización de datos históricos...');
    
    const { searchParams } = new URL(request.url);
    const forceUpdate = searchParams.get('force') === 'true';
    
    // Actualizar todos los datos
    const historicalData = await DataUpdater.updateAllData();
    
    console.log('✅ Actualización de datos completada exitosamente');
    console.log(`📊 Datos actualizados:`);
    console.log(`   - Partidos: ${historicalData.matches.length}`);
    console.log(`   - Equipos: ${historicalData.teams.length}`);
    console.log(`   - Ligas: ${historicalData.leagues.length}`);
    console.log(`   - Última actualización: ${historicalData.lastUpdated}`);
    
    return NextResponse.json({
      success: true,
      message: 'Datos actualizados exitosamente',
      data: {
        matches: historicalData.matches.length,
        teams: historicalData.teams.length,
        leagues: historicalData.leagues.length,
        lastUpdated: historicalData.lastUpdated
      },
      metadata: {
        updatedAt: new Date().toISOString(),
        forceUpdate,
        totalRecords: historicalData.matches.length + historicalData.teams.length + historicalData.leagues.length
      }
    });

  } catch (error) {
    console.error('❌ Error actualizando datos:', error);
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

// GET para obtener información sobre los datos actuales
export async function GET(request: NextRequest) {
  try {
    console.log('📊 Obteniendo información de datos actuales...');
    
    // Obtener datos actuales
    const historicalData = await DataUpdater.updateAllData();
    
    // Obtener estadísticas específicas
    const realMadridStats = await DataUpdater.getTeamStats('Real Madrid', 'La Liga');
    const realSociedadStats = await DataUpdater.getTeamStats('Real Sociedad', 'La Liga');
    const headToHeadMatches = await DataUpdater.getHeadToHeadMatches('Real Madrid', 'Real Sociedad');
    
    return NextResponse.json({
      success: true,
      data: {
        summary: {
          totalMatches: historicalData.matches.length,
          totalTeams: historicalData.teams.length,
          totalLeagues: historicalData.leagues.length,
          lastUpdated: historicalData.lastUpdated
        },
        realMadridStats,
        realSociedadStats,
        headToHeadMatches: headToHeadMatches.length,
        leagues: historicalData.leagues.map(league => ({
          name: league.name,
          country: league.country,
          season: league.season,
          status: league.status,
          teams: league.teams
        }))
      },
      metadata: {
        retrievedAt: new Date().toISOString(),
        dataSource: 'historical_database'
      }
    });

  } catch (error) {
    console.error('❌ Error obteniendo información de datos:', error);
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


