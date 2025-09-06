import { NextRequest, NextResponse } from 'next/server';
import { MassiveCSVAnalyzer } from '@/lib/massive-csv-analyzer';
import { GlobalLeaguesManager } from '@/lib/global-leagues-config';

// API para análisis masivo de todos los CSVs históricos
export async function POST(request: NextRequest) {
  try {
    console.log('🔥 Iniciando análisis masivo de CSVs históricos...');
    console.log('📊 Creando la "Gran Henki Dama de Goku" - Base de datos masiva mundial!');

    const analyzer = new MassiveCSVAnalyzer('Resultados historicos');
    const report = await analyzer.analyzeAllCSVFiles();

    console.log('✅ Análisis masivo completado');
    console.log(`📈 Cobertura general: ${report.overallCoverage.toFixed(1)}%`);
    console.log(`🏆 Ligas analizadas: ${report.totalLeagues}`);
    console.log(`⚽ Partidos procesados: ${report.totalMatches}`);
    console.log(`👥 Equipos procesados: ${report.totalTeams}`);

    return NextResponse.json({
      success: true,
      message: '🔥 "Gran Henki Dama de Goku" - Análisis masivo completado exitosamente!',
      data: {
        summary: {
          totalLeagues: report.totalLeagues,
          totalCountries: report.totalCountries,
          totalMatches: report.totalMatches,
          totalTeams: report.totalTeams,
          totalSeasons: report.totalSeasons,
          overallCoverage: report.overallCoverage
        },
        coverage: report.leagues.map(league => ({
          league: league.league,
          country: league.country,
          tier: league.tier,
          seasons: league.seasons,
          totalMatches: league.totalMatches,
          totalTeams: league.totalTeams,
          coveragePercentage: league.coveragePercentage,
          missingSeasons: league.missingSeasons,
          dataQuality: league.dataQuality,
          sources: league.sources.length
        })),
        missingData: report.missingData,
        recommendations: report.recommendations,
        analysis: {
          excellentQuality: report.leagues.filter(l => l.dataQuality === 'excellent').length,
          goodQuality: report.leagues.filter(l => l.dataQuality === 'good').length,
          fairQuality: report.leagues.filter(l => l.dataQuality === 'fair').length,
          poorQuality: report.leagues.filter(l => l.dataQuality === 'poor').length,
          highCoverage: report.leagues.filter(l => l.coveragePercentage >= 80).length,
          mediumCoverage: report.leagues.filter(l => l.coveragePercentage >= 50 && l.coveragePercentage < 80).length,
          lowCoverage: report.leagues.filter(l => l.coveragePercentage < 50).length
        }
      },
      metadata: {
        analyzedAt: new Date().toISOString(),
        dataSource: 'CSV Files + APIs + Web Research',
        version: '1.0.0',
        totalFilesProcessed: report.leagues.reduce((sum, l) => sum + l.sources.length, 0)
      }
    });

  } catch (error) {
    console.error('❌ Error en análisis masivo:', error);
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

// GET para obtener información sobre el análisis masivo
export async function GET(request: NextRequest) {
  try {
    const globalLeagues = GlobalLeaguesManager.getAllGlobalLeagues();
    const coverageSummary = GlobalLeaguesManager.getGlobalCoverageSummary();

    return NextResponse.json({
      success: true,
      message: '🔥 "Gran Henki Dama de Goku" - Sistema de Análisis Masivo',
      data: {
        supportedLeagues: globalLeagues.length,
        globalCoverage: coverageSummary,
        expectedSeasons: ['2020-21', '2021-22', '2022-23', '2023-24', '2024-25'],
        dataSources: [
          'Football-Data.co.uk (Históricos 2000-2025)',
          'Kaggle.com (Datos internacionales)',
          'Club Football Match Data (2000-2025)',
          'Liga Sudamericana (2022-2023)',
          'API-Football (Tiempo real)',
          'TheSportsDB (Estadísticas)',
          '365scores.com (Resultados)',
          'soccerway.com (Datos detallados)'
        ],
        fileStructure: {
          'Football-Data.co.uk': [
            'Premier League (E0) - 6 archivos',
            'Championship (E1) - 6 archivos', 
            'La Liga (SP1) - 6 archivos',
            'La Liga 2 (SP2) - 6 archivos',
            'Bundesliga (D1) - 6 archivos',
            'Bundesliga 2 (D2) - 6 archivos',
            'Serie A (I1) - 6 archivos',
            'Serie B (I2) - 6 archivos',
            'Ligue 1 (F1) - 6 archivos',
            'Ligue 2 (F2) - 6 archivos',
            'Y más ligas europeas y mundiales...'
          ],
          'Kaggle.com': [
            'results.csv - Resultados internacionales',
            'goalscorers.csv - Goleadores',
            'shootouts.csv - Penales',
            'former_names.csv - Nombres históricos'
          ],
          'Club Football Match Data': [
            'Matches.csv - Partidos detallados',
            'EloRatings.csv - Ratings ELO'
          ],
          'Liga Sudamericana': [
            'Brasileirão, Libertadores, Sudamericana',
            'Primera División Argentina y Chile'
          ]
        },
        analysisCapabilities: [
          'Detección automática de formato CSV',
          'Extracción de liga, país y temporada',
          'Procesamiento de partidos y equipos',
          'Cálculo de cobertura histórica',
          'Identificación de datos faltantes',
          'Evaluación de calidad de datos',
          'Generación de recomendaciones'
        ]
      }
    });

  } catch (error) {
    console.error('❌ Error obteniendo información de análisis masivo:', error);
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


