'use client';

import { useState, useEffect } from 'react';
import { 
  Search, 
  TrendingUp, 
  Target, 
  Calendar, 
  Trophy, 
  BarChart3,
  Filter,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Clock,
  Star
} from 'lucide-react';
import OpportunityStats from '@/components/OpportunityStats';

interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  league: string;
  date: string;
  time: string;
  homeOdds?: number;
  drawOdds?: number;
  awayOdds?: number;
  over25Odds?: number;
  under25Odds?: number;
  bothTeamsScoreOdds?: number;
  homeWinProbability?: number;
  drawProbability?: number;
  awayWinProbability?: number;
  over25Probability?: number;
  under25Probability?: number;
  bothTeamsScoreProbability?: number;
  valueRating?: number;
  confidence?: number;
}

interface Opportunity {
  match: Match;
  market: string;
  prediction: string;
  odds: number;
  probability: number;
  value: number;
  confidence: number;
  reasoning: string;
}

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    minValue: 15,
    minConfidence: 70,
    market: 'all',
    league: 'all'
  });
  const [useRealData, setUseRealData] = useState(false);

  // Buscar oportunidades (reales o mock)
  const searchOpportunities = async () => {
    setLoading(true);
    
    try {
      console.log(`🔍 Buscando oportunidades con datos ${useRealData ? 'reales' : 'mock'}...`);
      
      // Construir URL con parámetros
      const params = new URLSearchParams({
        minValue: filters.minValue.toString(),
        minConfidence: filters.minConfidence.toString(),
        market: filters.market,
        league: filters.league,
        realData: useRealData.toString()
      });
      
      const response = await fetch(`/api/opportunities?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setOpportunities(data.data);
        console.log(`✅ ${data.data.length} oportunidades encontradas`);
      } else {
        console.error('❌ Error en la API:', data.error);
        setOpportunities([]);
      }
      
    } catch (error) {
      console.error('❌ Error buscando oportunidades:', error);
      setOpportunities([]);
    } finally {
      setLoading(false);
    }
  };

  // Función para datos mock (mantener para testing)
  const searchMockOpportunities = async () => {
    setLoading(true);
    
    try {
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Datos mock de oportunidades
      const mockOpportunities: Opportunity[] = [
        {
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
        }
      ];

      setOpportunities(mockOpportunities);
    } catch (error) {
      console.error('Error buscando oportunidades:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchOpportunities();
  }, []);

  const filteredOpportunities = opportunities.filter(opp => {
    return (
      opp.value * 100 >= filters.minValue &&
      opp.confidence >= filters.minConfidence &&
      (filters.market === 'all' || opp.market === filters.market) &&
      (filters.league === 'all' || opp.match.league === filters.league)
    );
  });

  const getValueColor = (value: number) => {
    if (value >= 0.2) return 'text-green-400 bg-green-500/20';
    if (value >= 0.15) return 'text-yellow-400 bg-yellow-500/20';
    return 'text-orange-400 bg-orange-500/20';
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-400';
    if (confidence >= 70) return 'text-yellow-400';
    return 'text-orange-400';
  };

  const getMarketIcon = (market: string) => {
    switch (market) {
      case '1X2': return <Trophy className="w-4 h-4" />;
      case 'Over/Under 2.5': return <BarChart3 className="w-4 h-4" />;
      case 'Both Teams Score': return <Target className="w-4 h-4" />;
      default: return <TrendingUp className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Oportunidades de Valor</h1>
                <p className="text-sm text-gray-300">Análisis de Partidos Próximos</p>
              </div>
            </div>
            <button
              onClick={searchOpportunities}
              disabled={loading}
              className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all disabled:opacity-50 flex items-center space-x-2"
            >
              {loading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Search className="w-4 h-4" />
              )}
              <span>{loading ? 'Buscando...' : 'Buscar Oportunidades'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Filters */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-8">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Filtros de Búsqueda
          </h2>
          
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Valor Mínimo (%)
              </label>
              <input
                type="range"
                min="5"
                max="30"
                value={filters.minValue}
                onChange={(e) => setFilters({...filters, minValue: parseInt(e.target.value)})}
                className="w-full"
              />
              <span className="text-sm text-gray-400">{filters.minValue}%</span>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confianza Mínima (%)
              </label>
              <input
                type="range"
                min="50"
                max="90"
                value={filters.minConfidence}
                onChange={(e) => setFilters({...filters, minConfidence: parseInt(e.target.value)})}
                className="w-full"
              />
              <span className="text-sm text-gray-400">{filters.minConfidence}%</span>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Mercado
              </label>
              <select
                value={filters.market}
                onChange={(e) => setFilters({...filters, market: e.target.value})}
                className="w-full bg-gray-800 text-white rounded-lg px-3 py-2 border border-gray-600"
              >
                <option value="all">Todos</option>
                <option value="1X2">1X2</option>
                <option value="Over/Under 2.5">Over/Under 2.5</option>
                <option value="Both Teams Score">Both Teams Score</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Liga
              </label>
              <select
                value={filters.league}
                onChange={(e) => setFilters({...filters, league: e.target.value})}
                className="w-full bg-gray-800 text-white rounded-lg px-3 py-2 border border-gray-600"
              >
                <option value="all">Todas</option>
                <option value="La Liga">La Liga</option>
                <option value="Premier League">Premier League</option>
                <option value="Bundesliga">Bundesliga</option>
                <option value="Chile Primera División">Chile Primera División</option>
                <option value="Argentina Liga Profesional">Argentina Liga Profesional</option>
              </select>
            </div>
          </div>
        </div>

        {/* Data Source Toggle */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-8">
          <h3 className="text-lg font-bold text-white mb-4">Fuente de Datos</h3>
          <p className="text-gray-300 mb-4">
            {useRealData 
              ? '🌐 Buscando en datos reales de las APIs configuradas (TheSportsDB, Football-Data.org, Sportmonks)'
              : '🧪 Usando datos de prueba para demostración'
            }
          </p>
          
          <div className="flex items-center space-x-4 mb-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={useRealData}
                onChange={(e) => setUseRealData(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500"
              />
              <span className="text-white">Usar datos reales de APIs</span>
            </label>
          </div>
          
          <button
            onClick={searchOpportunities}
            disabled={loading}
            className={`px-6 py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 ${
              useRealData 
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700' 
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
            }`}
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>{useRealData ? 'Buscando datos reales...' : 'Buscando datos mock...'}</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>{useRealData ? 'Buscar Oportunidades Reales' : 'Buscar Oportunidades Mock'}</span>
              </>
            )}
          </button>
        </div>

        {/* Results Summary */}
        <OpportunityStats />

        {/* Opportunities List */}
        {loading ? (
          <div className="text-center py-12">
            <RefreshCw className="w-12 h-12 text-blue-400 animate-spin mx-auto mb-4" />
            <p className="text-gray-300">Buscando oportunidades de valor...</p>
          </div>
        ) : filteredOpportunities.length === 0 ? (
          <div className="text-center py-12">
            <AlertCircle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <p className="text-gray-300">No se encontraron oportunidades con los filtros actuales</p>
            <p className="text-gray-400 text-sm mt-2">Intenta ajustar los filtros o buscar de nuevo</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOpportunities.map((opportunity, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-blue-500/50 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      {getMarketIcon(opportunity.market)}
                      <h3 className="text-lg font-bold text-white">
                        {opportunity.match.homeTeam} vs {opportunity.match.awayTeam}
                      </h3>
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">
                        {opportunity.match.league}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-300">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{opportunity.match.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{opportunity.match.time}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`px-3 py-1 rounded-full text-sm font-bold ${getValueColor(opportunity.value)}`}>
                      {(opportunity.value * 100).toFixed(1)}% Valor
                    </div>
                    <div className={`text-sm mt-1 ${getConfidenceColor(opportunity.confidence)}`}>
                      {opportunity.confidence}% Confianza
                    </div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Predicción</h4>
                    <div className="bg-gray-800/50 rounded-lg p-3">
                      <p className="text-sm text-gray-300">
                        <strong>Mercado:</strong> {opportunity.market}
                      </p>
                      <p className="text-sm text-gray-300">
                        <strong>Predicción:</strong> {opportunity.prediction}
                      </p>
                      <p className="text-sm text-gray-300">
                        <strong>Cuotas:</strong> {opportunity.odds.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-white mb-2">Probabilidades</h4>
                    <div className="bg-gray-800/50 rounded-lg p-3">
                      <p className="text-sm text-gray-300">
                        <strong>Nuestra:</strong> {(opportunity.probability * 100).toFixed(1)}%
                      </p>
                      <p className="text-sm text-gray-300">
                        <strong>Implícita:</strong> {(1/opportunity.odds * 100).toFixed(1)}%
                      </p>
                      <p className="text-sm text-gray-300">
                        <strong>Diferencia:</strong> +{((opportunity.probability - 1/opportunity.odds) * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-white mb-2">Análisis</h4>
                    <div className="bg-gray-800/50 rounded-lg p-3">
                      <p className="text-sm text-gray-300">
                        {opportunity.reasoning}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
