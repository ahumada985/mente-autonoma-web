// API Endpoint para Procesamiento por Lotes de CSVs
// "Gran Henki Dama de Goku" - Sistema de análisis de apuestas deportivas

import { NextRequest, NextResponse } from 'next/server';
import { BatchCSVProcessor } from '@/lib/batch-csv-processor';

export async function POST(request: NextRequest) {
  try {
    console.log('🔥 Iniciando procesamiento por lotes de CSVs...');
    
    const { csvDirectory = 'Resultados historicos' } = await request.json();
    
    // Crear procesador de lotes
    const processor = new BatchCSVProcessor(1000, 100 * 1024 * 1024); // 100MB límite de memoria
    
    // Procesar todos los archivos CSV
    const result = await processor.processAllCSVFiles(csvDirectory);
    
    // Calcular cobertura 2020-2025
    const expectedSeasons = ['2020-21', '2021-22', '2022-23', '2023-24', '2024-25'];
    const coveredSeasons = expectedSeasons.filter(season => 
      Object.keys(result.coverage.seasons).includes(season)
    );
    const coverage2020_2025 = (coveredSeasons.length / expectedSeasons.length) * 100;
    
    // Generar recomendaciones
    const recommendations = [
      `Cobertura actual 2020-2025: ${coverage2020_2025.toFixed(1)}%`,
      `Temporadas cubiertas: ${coveredSeasons.join(', ')}`,
      `Temporadas faltantes: ${expectedSeasons.filter(s => !coveredSeasons.includes(s)).join(', ')}`,
      'Integrar SofaScore.com para datos en tiempo real',
      'Implementar web scraping para datos faltantes',
      'Procesar archivos completos en lotes para evitar stack overflow'
    ];
    
    const response = {
      success: true,
      message: 'Procesamiento por lotes completado exitosamente',
      data: {
        ...result,
        coverage2020_2025,
        recommendations,
        nextSteps: [
          'Integrar SofaScore.com para datos en tiempo real',
          'Implementar web scraping para datos faltantes',
          'Procesar archivos completos en lotes',
          'Crear base de datos unificada',
          'Implementar sistema de predicciones'
        ]
      }
    };
    
    console.log('✅ Procesamiento por lotes completado exitosamente');
    console.log(`📊 Resumen: ${result.processedFiles}/${result.totalFiles} archivos, ${result.totalMatches} partidos, ${result.totalTeams} equipos`);
    
    return NextResponse.json(response);
    
  } catch (error) {
    console.error('Error en procesamiento por lotes:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Error en procesamiento por lotes',
      error: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Endpoint para procesamiento por lotes de CSVs',
    usage: 'POST con { "csvDirectory": "ruta/al/directorio" }',
    example: {
      method: 'POST',
      body: {
        csvDirectory: 'Resultados historicos'
      }
    }
  });
}

