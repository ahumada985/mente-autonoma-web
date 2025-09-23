import { NextRequest, NextResponse } from 'next/server';
import { RealDataFetcher } from '@/lib/real-data-fetcher';

// API para probar las APIs configuradas
export async function GET(request: NextRequest) {
  try {
    console.log('🧪 Iniciando prueba de APIs...');
    
    const results = {
      theSportsDB: {
        status: 'testing',
        message: 'Probando TheSportsDB...',
        data: null,
        error: null
      },
      footballData: {
        status: 'testing',
        message: 'Probando Football-Data.org...',
        data: null,
        error: null
      },
      sportmonks: {
        status: 'testing',
        message: 'Probando Sportmonks...',
        data: null,
        error: null
      }
    };

    // Probar TheSportsDB
    try {
      console.log('🔍 Probando TheSportsDB...');
      const theSportsDBMatches = await RealDataFetcher.getUpcomingMatchesFromTheSportsDB();
      results.theSportsDB = {
        status: 'success',
        message: `✅ TheSportsDB funcionando - ${theSportsDBMatches.length} partidos encontrados`,
        data: {
          matchesFound: theSportsDBMatches.length,
          sampleMatches: theSportsDBMatches.slice(0, 3).map(match => ({
            homeTeam: match.homeTeam,
            awayTeam: match.awayTeam,
            league: match.league,
            date: match.date
          }))
        },
        error: null
      };
    } catch (error) {
      results.theSportsDB = {
        status: 'error',
        message: `❌ Error en TheSportsDB: ${error instanceof Error ? error.message : 'Error desconocido'}`,
        data: null,
        error: error instanceof Error ? error.message : 'Error desconocido'
      };
    }

    // Probar Football-Data.org
    try {
      console.log('🔍 Probando Football-Data.org...');
      const footballDataMatches = await RealDataFetcher.getUpcomingMatchesFromFootballData();
      results.footballData = {
        status: 'success',
        message: `✅ Football-Data.org funcionando - ${footballDataMatches.length} partidos encontrados`,
        data: {
          matchesFound: footballDataMatches.length,
          sampleMatches: footballDataMatches.slice(0, 3).map(match => ({
            homeTeam: match.homeTeam,
            awayTeam: match.awayTeam,
            league: match.league,
            date: match.date
          }))
        },
        error: null
      };
    } catch (error) {
      results.footballData = {
        status: 'error',
        message: `❌ Error en Football-Data.org: ${error instanceof Error ? error.message : 'Error desconocido'}`,
        data: null,
        error: error instanceof Error ? error.message : 'Error desconocido'
      };
    }

    // Probar Sportmonks (opcional)
    try {
      console.log('🔍 Probando Sportmonks...');
      // Por ahora, solo verificar que la clave esté configurada
      const sportmonksKey = process.env.SPORTMONKS_KEY;
      if (sportmonksKey) {
        results.sportmonks = {
          status: 'success',
          message: '✅ Sportmonks configurado correctamente',
          data: {
            keyConfigured: true,
            note: 'Sportmonks está configurado pero no se probó la conexión'
          },
          error: null
        };
      } else {
        results.sportmonks = {
          status: 'error',
          message: '❌ Sportmonks no configurado',
          data: null,
          error: 'SPORTMONKS_KEY no encontrada en variables de entorno'
        };
      }
    } catch (error) {
      results.sportmonks = {
        status: 'error',
        message: `❌ Error en Sportmonks: ${error instanceof Error ? error.message : 'Error desconocido'}`,
        data: null,
        error: error instanceof Error ? error.message : 'Error desconocido'
      };
    }

    // Calcular resumen
    const workingAPIs = Object.values(results).filter(result => result.status === 'success').length;
    const totalAPIs = Object.keys(results).length;

    return NextResponse.json({
      success: true,
      results,
      summary: {
        workingAPIs,
        totalAPIs,
        status: workingAPIs > 0 ? 'success' : 'error',
        message: `${workingAPIs}/${totalAPIs} APIs funcionando correctamente`
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Error en prueba de APIs:', error);
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


