import { NextRequest, NextResponse } from 'next/server';
import { MatchAnalyzer } from '@/lib/match-analyzer';

// API para analizar partido específico: Real Sociedad vs Real Madrid
export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Iniciando análisis del partido Real Sociedad vs Real Madrid...');
    
    const { searchParams } = new URL(request.url);
    const homeTeam = searchParams.get('homeTeam') || 'Real Sociedad';
    const awayTeam = searchParams.get('awayTeam') || 'Real Madrid';
    const date = searchParams.get('date') || '2025-09-13';
    
    console.log(`📊 Analizando: ${homeTeam} vs ${awayTeam} (${date})`);
    
    // Analizar el partido específico
    const analysis = await MatchAnalyzer.analyzeRealSociedadVsRealMadrid();
    
    console.log('✅ Análisis completado exitosamente');
    console.log(`📈 Oportunidades encontradas: ${analysis.opportunities.length}`);
    console.log(`🎯 Confianza del análisis: ${analysis.analysis.confidence}%`);
    
    return NextResponse.json({
      success: true,
      data: analysis,
      metadata: {
        analyzedAt: new Date().toISOString(),
        matchDate: date,
        confidence: analysis.analysis.confidence,
        opportunitiesFound: analysis.opportunities.length,
        analysisType: 'comprehensive'
      }
    });

  } catch (error) {
    console.error('❌ Error en análisis del partido:', error);
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


