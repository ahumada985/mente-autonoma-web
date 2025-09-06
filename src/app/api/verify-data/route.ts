import { NextRequest, NextResponse } from 'next/server';
import { RealDataUpdater } from '@/lib/real-data-updater';

// API para verificar la integridad y autenticidad de los datos
export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Iniciando verificación de datos...');
    
    const { searchParams } = new URL(request.url);
    const teamName = searchParams.get('team');
    
    if (teamName) {
      // Verificar equipo específico
      const realData = RealDataUpdater.getAllRealData();
      const team = realData.teams.find(t => 
        t.name.toLowerCase().includes(teamName.toLowerCase())
      );
      
      if (!team) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Equipo no encontrado' 
          },
          { status: 404 }
        );
      }
      
      const verification = RealDataUpdater.verifyDataIntegrity(team);
      const teamMatches = realData.matches.filter(m => 
        m.homeTeam === team.name || m.awayTeam === team.name
      );
      
      return NextResponse.json({
        success: true,
        data: {
          team,
          verification,
          recentMatches: teamMatches.slice(0, 5),
          dataSource: team.dataSource,
          lastUpdated: team.lastUpdated
        },
        metadata: {
          verifiedAt: new Date().toISOString(),
          verificationType: 'team_specific'
        }
      });
    } else {
      // Verificar todos los datos
      const verificationStats = RealDataUpdater.getVerificationStats();
      
      return NextResponse.json({
        success: true,
        data: verificationStats,
        metadata: {
          verifiedAt: new Date().toISOString(),
          verificationType: 'full_database'
        }
      });
    }

  } catch (error) {
    console.error('❌ Error verificando datos:', error);
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


