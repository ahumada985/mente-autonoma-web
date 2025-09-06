import { NextRequest, NextResponse } from 'next/server';
import { RealDataFetcher } from '@/lib/real-data-fetcher';

// API para obtener oportunidades de valor con datos reales
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const minValue = parseFloat(searchParams.get('minValue') || '15');
    const minConfidence = parseFloat(searchParams.get('minConfidence') || '70');
    const market = searchParams.get('market') || 'all';
    const league = searchParams.get('league') || 'all';
    const useRealData = searchParams.get('realData') === 'true';

    console.log('🔍 Buscando oportunidades de valor...');
    console.log(`📊 Filtros: Valor≥${minValue}%, Confianza≥${minConfidence}%, Mercado=${market}, Liga=${league}`);
    console.log(`🌐 Usar datos reales: ${useRealData}`);

    let opportunities;
    
    if (useRealData) {
      // Usar datos reales de las APIs
      opportunities = await findRealOpportunities({
        minValue,
        minConfidence,
        market,
        league
      });
    } else {
      // Usar datos mock para testing
      opportunities = await findMockOpportunities({
        minValue,
        minConfidence,
        market,
        league
      });
    }

    return NextResponse.json({
      success: true,
      data: opportunities,
      filters: { minValue, minConfidence, market, league },
      realData: useRealData,
      timestamp: new Date().toISOString(),
      totalFound: opportunities.length
    });

  } catch (error) {
    console.error('❌ Error en API de oportunidades:', error);
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

// Función para buscar oportunidades con datos reales
async function findRealOpportunities(filters: {
  minValue: number;
  minConfidence: number;
  market: string;
  league: string;
}) {
  try {
    console.log('🌐 Obteniendo datos reales de partidos próximos...');
    
    // Obtener partidos próximos reales
    const realMatches = await RealDataFetcher.getAllUpcomingMatches();
    console.log(`📊 Partidos reales encontrados: ${realMatches.length}`);
    
    if (realMatches.length === 0) {
      console.log('⚠️ No se encontraron partidos próximos');
      return [];
    }
    
    const opportunities = [];
    
    // Analizar cada partido
    for (const match of realMatches.slice(0, 20)) { // Limitar a 20 partidos para no sobrecargar
      try {
        console.log(`🔍 Analizando: ${match.homeTeam} vs ${match.awayTeam}`);
        
        // Calcular probabilidades reales
        const probabilities = await RealDataFetcher.calculateRealProbabilities(match);
        
        // Generar cuotas mock (en producción vendrían de casas de apuestas)
        const homeOdds = 1.5 + Math.random() * 2;
        const drawOdds = 2.5 + Math.random() * 2;
        const awayOdds = 1.5 + Math.random() * 2;
        const over25Odds = 1.6 + Math.random() * 1.5;
        const under25Odds = 1.6 + Math.random() * 1.5;
        const bothTeamsScoreOdds = 1.7 + Math.random() * 1.3;
        
        // Analizar mercado 1X2
        if (filters.market === 'all' || filters.market === '1X2') {
          if (filters.league === 'all' || match.league === filters.league) {
            // Local
            const homeValue = probabilities.homeWin - (1 / homeOdds);
            if (homeValue >= filters.minValue / 100) {
              opportunities.push({
                id: `${match.id}-home`,
                match: {
                  ...match,
                  homeOdds,
                  drawOdds,
                  awayOdds,
                  over25Odds,
                  under25Odds,
                  bothTeamsScoreOdds,
                  homeWinProbability: probabilities.homeWin,
                  drawProbability: probabilities.draw,
                  awayWinProbability: probabilities.awayWin,
                  over25Probability: probabilities.over25,
                  under25Probability: probabilities.under25,
                  bothTeamsScoreProbability: probabilities.bothTeamsScore,
                  confidence: 75 + Math.random() * 20
                },
                market: '1X2',
                prediction: 'Local',
                odds: homeOdds,
                probability: probabilities.homeWin,
                value: homeValue,
                confidence: 75 + Math.random() * 20,
                reasoning: `${match.homeTeam} tiene ${(probabilities.homeWin * 100).toFixed(1)}% de probabilidad de ganar, pero las cuotas ofrecen ${homeOdds.toFixed(2)} (${(1/homeOdds * 100).toFixed(1)}% implícita). Valor: ${(homeValue * 100).toFixed(1)}%`
              });
            }
            
            // Visitante
            const awayValue = probabilities.awayWin - (1 / awayOdds);
            if (awayValue >= filters.minValue / 100) {
              opportunities.push({
                id: `${match.id}-away`,
                match: {
                  ...match,
                  homeOdds,
                  drawOdds,
                  awayOdds,
                  over25Odds,
                  under25Odds,
                  bothTeamsScoreOdds,
                  homeWinProbability: probabilities.homeWin,
                  drawProbability: probabilities.draw,
                  awayWinProbability: probabilities.awayWin,
                  over25Probability: probabilities.over25,
                  under25Probability: probabilities.under25,
                  bothTeamsScoreProbability: probabilities.bothTeamsScore,
                  confidence: 75 + Math.random() * 20
                },
                market: '1X2',
                prediction: 'Visitante',
                odds: awayOdds,
                probability: probabilities.awayWin,
                value: awayValue,
                confidence: 75 + Math.random() * 20,
                reasoning: `${match.awayTeam} tiene ${(probabilities.awayWin * 100).toFixed(1)}% de probabilidad de ganar, pero las cuotas ofrecen ${awayOdds.toFixed(2)} (${(1/awayOdds * 100).toFixed(1)}% implícita). Valor: ${(awayValue * 100).toFixed(1)}%`
              });
            }
          }
        }
        
        // Analizar mercado Over/Under 2.5
        if (filters.market === 'all' || filters.market === 'Over/Under 2.5') {
          if (filters.league === 'all' || match.league === filters.league) {
            // Over 2.5
            const overValue = probabilities.over25 - (1 / over25Odds);
            if (overValue >= filters.minValue / 100) {
              opportunities.push({
                id: `${match.id}-over25`,
                match: {
                  ...match,
                  homeOdds,
                  drawOdds,
                  awayOdds,
                  over25Odds,
                  under25Odds,
                  bothTeamsScoreOdds,
                  homeWinProbability: probabilities.homeWin,
                  drawProbability: probabilities.draw,
                  awayWinProbability: probabilities.awayWin,
                  over25Probability: probabilities.over25,
                  under25Probability: probabilities.under25,
                  bothTeamsScoreProbability: probabilities.bothTeamsScore,
                  confidence: 75 + Math.random() * 20
                },
                market: 'Over/Under 2.5',
                prediction: 'Over 2.5',
                odds: over25Odds,
                probability: probabilities.over25,
                value: overValue,
                confidence: 75 + Math.random() * 20,
                reasoning: `Probabilidad de Over 2.5: ${(probabilities.over25 * 100).toFixed(1)}%, cuotas: ${over25Odds.toFixed(2)}. Valor: ${(overValue * 100).toFixed(1)}%`
              });
            }
            
            // Under 2.5
            const underValue = probabilities.under25 - (1 / under25Odds);
            if (underValue >= filters.minValue / 100) {
              opportunities.push({
                id: `${match.id}-under25`,
                match: {
                  ...match,
                  homeOdds,
                  drawOdds,
                  awayOdds,
                  over25Odds,
                  under25Odds,
                  bothTeamsScoreOdds,
                  homeWinProbability: probabilities.homeWin,
                  drawProbability: probabilities.draw,
                  awayWinProbability: probabilities.awayWin,
                  over25Probability: probabilities.over25,
                  under25Probability: probabilities.under25,
                  bothTeamsScoreProbability: probabilities.bothTeamsScore,
                  confidence: 75 + Math.random() * 20
                },
                market: 'Over/Under 2.5',
                prediction: 'Under 2.5',
                odds: under25Odds,
                probability: probabilities.under25,
                value: underValue,
                confidence: 75 + Math.random() * 20,
                reasoning: `Probabilidad de Under 2.5: ${(probabilities.under25 * 100).toFixed(1)}%, cuotas: ${under25Odds.toFixed(2)}. Valor: ${(underValue * 100).toFixed(1)}%`
              });
            }
          }
        }
        
        // Analizar mercado Both Teams Score
        if (filters.market === 'all' || filters.market === 'Both Teams Score') {
          if (filters.league === 'all' || match.league === filters.league) {
            const btsValue = probabilities.bothTeamsScore - (1 / bothTeamsScoreOdds);
            if (btsValue >= filters.minValue / 100) {
              opportunities.push({
                id: `${match.id}-bts`,
                match: {
                  ...match,
                  homeOdds,
                  drawOdds,
                  awayOdds,
                  over25Odds,
                  under25Odds,
                  bothTeamsScoreOdds,
                  homeWinProbability: probabilities.homeWin,
                  drawProbability: probabilities.draw,
                  awayWinProbability: probabilities.awayWin,
                  over25Probability: probabilities.over25,
                  under25Probability: probabilities.under25,
                  bothTeamsScoreProbability: probabilities.bothTeamsScore,
                  confidence: 75 + Math.random() * 20
                },
                market: 'Both Teams Score',
                prediction: 'Sí',
                odds: bothTeamsScoreOdds,
                probability: probabilities.bothTeamsScore,
                value: btsValue,
                confidence: 75 + Math.random() * 20,
                reasoning: `Probabilidad de BTS: ${(probabilities.bothTeamsScore * 100).toFixed(1)}%, cuotas: ${bothTeamsScoreOdds.toFixed(2)}. Valor: ${(btsValue * 100).toFixed(1)}%`
              });
            }
          }
        }
        
      } catch (error) {
        console.error(`❌ Error analizando partido ${match.homeTeam} vs ${match.awayTeam}:`, error);
      }
    }
    
    // Filtrar por confianza mínima
    const filteredOpportunities = opportunities.filter(opp => opp.confidence >= filters.minConfidence);
    
    // Ordenar por valor descendente
    filteredOpportunities.sort((a, b) => b.value - a.value);
    
    console.log(`🎉 Oportunidades encontradas: ${filteredOpportunities.length}`);
    return filteredOpportunities;
    
  } catch (error) {
    console.error('❌ Error en findRealOpportunities:', error);
    return [];
  }
}

// Función para buscar oportunidades con datos mock
async function findMockOpportunities(filters: {
  minValue: number;
  minConfidence: number;
  market: string;
  league: string;
}) {
  // Datos mock de oportunidades (en producción vendría de análisis real)
  const mockOpportunities = [
    {
      id: '1',
      match: {
        id: '1',
        homeTeam: 'Real Madrid',
        awayTeam: 'Getafe',
        league: 'La Liga',
        date: '2024-01-15',
        time: '20:00',
        homeOdds: 1.45,
        over25Odds: 1.85,
        bothTeamsScoreOdds: 1.95,
        homeWinProbability: 0.75,
        over25Probability: 0.65,
        bothTeamsScoreProbability: 0.55,
        confidence: 85
      },
      market: '1X2',
      prediction: 'Local',
      odds: 1.45,
      probability: 0.75,
      value: 0.18,
      confidence: 85,
      reasoning: 'Real Madrid tiene 75% de probabilidad de ganar, pero las cuotas ofrecen 1.45 (69% implícita). Valor: 18%'
    },
    {
      id: '2',
      match: {
        id: '2',
        homeTeam: 'Manchester City',
        awayTeam: 'Brighton',
        league: 'Premier League',
        date: '2024-01-16',
        time: '15:30',
        over25Odds: 1.75,
        under25Odds: 2.10,
        over25Probability: 0.70,
        under25Probability: 0.30,
        confidence: 80
      },
      market: 'Over/Under 2.5',
      prediction: 'Over 2.5',
      odds: 1.75,
      probability: 0.70,
      value: 0.16,
      confidence: 80,
      reasoning: 'Probabilidad de Over 2.5: 70%, cuotas: 1.75. Valor: 16%'
    },
    {
      id: '3',
      match: {
        id: '3',
        homeTeam: 'Bayern Munich',
        awayTeam: 'Borussia Dortmund',
        league: 'Bundesliga',
        date: '2024-01-17',
        time: '18:30',
        bothTeamsScoreOdds: 1.65,
        bothTeamsScoreProbability: 0.68,
        confidence: 75
      },
      market: 'Both Teams Score',
      prediction: 'Sí',
      odds: 1.65,
      probability: 0.68,
      value: 0.15,
      confidence: 75,
      reasoning: 'Probabilidad de BTS: 68%, cuotas: 1.65. Valor: 15%'
    },
    {
      id: '4',
      match: {
        id: '4',
        homeTeam: 'Colo Colo',
        awayTeam: 'Universidad de Chile',
        league: 'Chile Primera División',
        date: '2024-01-18',
        time: '19:00',
        homeOdds: 2.20,
        homeWinProbability: 0.55,
        confidence: 72
      },
      market: '1X2',
      prediction: 'Local',
      odds: 2.20,
      probability: 0.55,
      value: 0.12,
      confidence: 72,
      reasoning: 'Colo Colo tiene 55% de probabilidad de ganar, pero las cuotas ofrecen 2.20 (45% implícita). Valor: 12%'
    },
    {
      id: '5',
      match: {
        id: '5',
        homeTeam: 'Boca Juniors',
        awayTeam: 'River Plate',
        league: 'Argentina Liga Profesional',
        date: '2024-01-19',
        time: '21:00',
        over25Odds: 2.05,
        over25Probability: 0.58,
        confidence: 78
      },
      market: 'Over/Under 2.5',
      prediction: 'Over 2.5',
      odds: 2.05,
      probability: 0.58,
      value: 0.11,
      confidence: 78,
      reasoning: 'Probabilidad de Over 2.5: 58%, cuotas: 2.05. Valor: 11%'
    },
    {
      id: '6',
      match: {
        id: '6',
        homeTeam: 'Flamengo',
        awayTeam: 'Palmeiras',
        league: 'Brasil Brasileirão',
        date: '2024-01-20',
        time: '16:00',
        bothTeamsScoreOdds: 1.80,
        bothTeamsScoreProbability: 0.62,
        confidence: 73
      },
      market: 'Both Teams Score',
      prediction: 'Sí',
      odds: 1.80,
      probability: 0.62,
      value: 0.10,
      confidence: 73,
      reasoning: 'Probabilidad de BTS: 62%, cuotas: 1.80. Valor: 10%'
    },
    {
      id: '7',
      match: {
        id: '7',
        homeTeam: 'Atlético Nacional',
        awayTeam: 'Millonarios',
        league: 'Colombia Primera A',
        date: '2024-01-21',
        time: '20:30',
        homeOdds: 2.50,
        homeWinProbability: 0.48,
        confidence: 68
      },
      market: '1X2',
      prediction: 'Local',
      odds: 2.50,
      probability: 0.48,
      value: 0.08,
      confidence: 68,
      reasoning: 'Atlético Nacional tiene 48% de probabilidad de ganar, pero las cuotas ofrecen 2.50 (40% implícita). Valor: 8%'
    }
  ];

  // Aplicar filtros
  let filteredOpportunities = mockOpportunities.filter(opp => {
    return (
      opp.value * 100 >= filters.minValue &&
      opp.confidence >= filters.minConfidence &&
      (filters.market === 'all' || opp.market === filters.market) &&
      (filters.league === 'all' || opp.match.league === filters.league)
    );
  });

  // Ordenar por valor descendente
  filteredOpportunities.sort((a, b) => b.value - a.value);

  return filteredOpportunities;
}
