import { NextRequest, NextResponse } from 'next/server';
import { DataUpdater } from '@/lib/data-updater';
import { MultiSeasonDataManager } from '@/lib/multi-season-data';

// API para obtener detalles específicos de un equipo
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const teamId = searchParams.get('teamId');
    const teamName = searchParams.get('teamName');
    const league = searchParams.get('league');
    
    if (!teamId && !teamName) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Se requiere teamId o teamName' 
        },
        { status: 400 }
      );
    }

    console.log(`🔍 Obteniendo detalles del equipo: ${teamId || teamName}...`);
    
    // Obtener datos actualizados
    const historicalData = await DataUpdater.updateAllData();
    
    // Buscar el equipo
    let team = null;
    if (teamId) {
      team = historicalData.teams.find(t => t.id === teamId);
    } else if (teamName && league) {
      team = historicalData.teams.find(t => 
        t.name.toLowerCase().includes(teamName.toLowerCase()) && 
        t.league === league
      );
    } else if (teamName) {
      team = historicalData.teams.find(t => 
        t.name.toLowerCase().includes(teamName.toLowerCase())
      );
    }
    
    if (!team) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Equipo no encontrado' 
        },
        { status: 404 }
      );
    }

    // Obtener partidos recientes reales del equipo
    let recentMatches;
    if (teamName && teamName.toLowerCase().includes('real madrid')) {
      // Usar partidos reales de Real Madrid
      recentMatches = MultiSeasonDataManager.getRealMadridRecentMatches();
    } else {
      // Usar partidos de la base de datos general
      recentMatches = await DataUpdater.getRecentMatches(team.name, 5);
    }
    
    // Obtener estadísticas de la liga
    const leagueData = historicalData.leagues.find(l => l.name === team.league);
    
    // Calcular estadísticas adicionales
    const winPercentage = ((team.wins / team.played) * 100).toFixed(1);
    const drawPercentage = ((team.draws / team.played) * 100).toFixed(1);
    const lossPercentage = ((team.losses / team.played) * 100).toFixed(1);
    
    const homeWinPercentage = team.homeRecord.played > 0 
      ? ((team.homeRecord.wins / team.homeRecord.played) * 100).toFixed(1)
      : '0.0';
    
    const awayWinPercentage = team.awayRecord.played > 0 
      ? ((team.awayRecord.wins / team.awayRecord.played) * 100).toFixed(1)
      : '0.0';

    console.log(`✅ Detalles obtenidos para ${team.name}:`);
    console.log(`   📊 Posición: #${team.position}`);
    console.log(`   🏆 Puntos: ${team.points}`);
    console.log(`   📈 Forma: ${team.recentForm}`);
    console.log(`   ⚽ Partidos recientes: ${recentMatches.length}`);

    return NextResponse.json({
      success: true,
      data: {
        team: {
          ...team,
          winPercentage: parseFloat(winPercentage),
          drawPercentage: parseFloat(drawPercentage),
          lossPercentage: parseFloat(lossPercentage),
          homeWinPercentage: parseFloat(homeWinPercentage),
          awayWinPercentage: parseFloat(awayWinPercentage)
        },
        recentMatches,
        league: leagueData,
        analysis: {
          strength: team.position <= 3 ? 'Alto' : team.position <= 6 ? 'Medio' : 'Bajo',
          form: team.recentForm.includes('W') && !team.recentForm.includes('L') ? 'Excelente' :
                team.recentForm.includes('W') ? 'Buena' : 'Regular',
          homeAdvantage: team.homeRecord.wins > team.awayRecord.wins ? 'Sí' : 'No',
          goalScoring: team.avgGoalsScored > 2 ? 'Alto' : team.avgGoalsScored > 1.5 ? 'Medio' : 'Bajo',
          defense: team.avgGoalsConceded < 1 ? 'Excelente' : team.avgGoalsConceded < 1.5 ? 'Buena' : 'Regular'
        }
      },
      metadata: {
        retrievedAt: new Date().toISOString(),
        dataSource: 'historical_database',
        lastUpdated: historicalData.lastUpdated
      }
    });

  } catch (error) {
    console.error('❌ Error obteniendo detalles del equipo:', error);
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
