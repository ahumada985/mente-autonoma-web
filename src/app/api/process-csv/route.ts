import { NextRequest, NextResponse } from 'next/server';
import { CSVAnalyzer } from '@/lib/csv-analyzer';
import { GlobalLeaguesManager } from '@/lib/global-leagues-config';

// API para procesar archivos CSV y crear la "Gran Henki Dama de Goku"
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    
    if (!files || files.length === 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'No se proporcionaron archivos CSV' 
        },
        { status: 400 }
      );
    }

    console.log(`🚀 Iniciando procesamiento de ${files.length} archivos CSV...`);
    console.log('🔥 Creando la "Gran Henki Dama de Goku" - Base de datos masiva de fútbol mundial!');

    const csvFiles = [];
    const allMatches: any[] = [];
    const allTeams: any[] = [];

    // Procesar cada archivo CSV
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      console.log(`📁 Procesando archivo ${i + 1}/${files.length}: ${file.name}`);
      
      try {
        const content = await file.text();
        const csvData = CSVAnalyzer.analyzeCSV(file.name, content);
        csvFiles.push(csvData);

        // Procesar según el tipo de datos detectado
        if (csvData.detectedFormat === 'matches') {
          const matches = CSVAnalyzer.processMatchesFromCSV(csvData);
          allMatches.push(...matches);
          console.log(`✅ Procesados ${matches.length} partidos de ${csvData.league}`);
        } else if (csvData.detectedFormat === 'teams') {
          const teams = CSVAnalyzer.processTeamsFromCSV(csvData);
          allTeams.push(...teams);
          console.log(`✅ Procesados ${teams.length} equipos de ${csvData.league}`);
        } else {
          console.log(`⚠️ Formato no reconocido para ${file.name}: ${csvData.detectedFormat}`);
        }

      } catch (error) {
        console.error(`❌ Error procesando ${file.name}:`, error);
        continue;
      }
    }

    // Crear resumen del análisis
    const analysisSummary = CSVAnalyzer.createAnalysisSummary(csvFiles, allMatches, allTeams);
    
    // Obtener información de ligas globales
    const globalLeagues = GlobalLeaguesManager.getAllGlobalLeagues();
    const coverageSummary = GlobalLeaguesManager.getGlobalCoverageSummary();

    console.log(`🎉 "Gran Henki Dama de Goku" creada exitosamente!`);
    console.log(`📊 Resumen:`);
    console.log(`   📁 Archivos procesados: ${analysisSummary.totalFiles}`);
    console.log(`   ⚽ Partidos: ${analysisSummary.totalMatches}`);
    console.log(`   👥 Equipos: ${analysisSummary.totalTeams}`);
    console.log(`   🏆 Ligas: ${analysisSummary.leagues.length}`);
    console.log(`   🌍 Países: ${analysisSummary.countries.length}`);

    return NextResponse.json({
      success: true,
      message: '🔥 "Gran Henki Dama de Goku" creada exitosamente!',
      data: {
        analysis: analysisSummary,
        globalCoverage: coverageSummary,
        processedFiles: csvFiles.map(f => ({
          filename: f.filename,
          format: f.detectedFormat,
          rows: f.totalRows,
          league: f.league,
          season: f.season,
          country: f.country
        })),
        matches: allMatches.slice(0, 10), // Primeros 10 partidos como muestra
        teams: allTeams.slice(0, 10), // Primeros 10 equipos como muestra
        leagues: analysisSummary.leagues,
        seasons: analysisSummary.seasons,
        countries: analysisSummary.countries
      },
      metadata: {
        processedAt: new Date().toISOString(),
        totalProcessingTime: 'Calculado automáticamente',
        dataSource: 'CSV Import + APIs + Web Research',
        quality: analysisSummary.dataQuality
      }
    });

  } catch (error) {
    console.error('❌ Error procesando CSVs:', error);
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

// GET para obtener información sobre el procesamiento de CSVs
export async function GET(request: NextRequest) {
  try {
    const globalLeagues = GlobalLeaguesManager.getAllGlobalLeagues();
    const coverageSummary = GlobalLeaguesManager.getGlobalCoverageSummary();

    return NextResponse.json({
      success: true,
      message: '🔥 "Gran Henki Dama de Goku" - Sistema de Análisis de CSVs',
      data: {
        supportedFormats: ['matches', 'teams', 'players'],
        supportedLeagues: globalLeagues.length,
        globalCoverage: coverageSummary,
        supportedCountries: [...new Set(globalLeagues.map(l => l.country))],
        supportedRegions: [...new Set(globalLeagues.map(l => l.region))],
        bettingMarkets: [
          '1X2 (Resultado Final)',
          'Over/Under 2.5 Goles',
          'Both Teams Score',
          'Handicap Asiático',
          'Handicap Europeo',
          'Total de Córners',
          'Total de Tarjetas',
          'Primera Tarjeta',
          'Margen de Victoria',
          'Goles en Tiempos Específicos'
        ],
        dataSources: [
          'CSV Files (Históricos)',
          '365scores.com (Tiempo Real)',
          'soccerway.com (Estadísticas)',
          'fbref.com (Análisis Avanzado)',
          'whoscored.com (Detalles)',
          'transfermarkt.com (Equipos)',
          'betano.com (Cuotas)',
          'sofascore.com (Resultados)'
        ]
      },
      instructions: {
        howToUpload: [
          '1. Selecciona archivos CSV con datos de fútbol',
          '2. Asegúrate de que tengan headers apropiados',
          '3. Sube los archivos usando el formulario',
          '4. El sistema detectará automáticamente el formato',
          '5. Los datos se procesarán y agregarán a la base de datos'
        ],
        csvFormatExamples: {
          matches: [
            'date,home_team,away_team,home_score,away_score,venue,referee',
            '2025-08-30,Real Madrid,Mallorca,2,1,Santiago Bernabéu,Antonio Mateu Lahoz'
          ],
          teams: [
            'team,position,points,played,wins,draws,losses,goals_for,goals_against',
            'Real Madrid,2,9,3,3,0,0,6,1'
          ]
        }
      }
    });

  } catch (error) {
    console.error('❌ Error obteniendo información de CSVs:', error);
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


