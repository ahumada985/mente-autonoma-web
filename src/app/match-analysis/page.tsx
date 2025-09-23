'use client';

import { useState, useEffect } from 'react';
import { 
  Trophy, 
  Target, 
  BarChart3, 
  TrendingUp,
  Calendar,
  MapPin,
  Users,
  Star,
  CheckCircle,
  AlertTriangle,
  Clock,
  RefreshCw
} from 'lucide-react';

interface MatchAnalysis {
  match: {
    homeTeam: string;
    awayTeam: string;
    date: string;
    league: string;
    venue?: string;
  };
  analysis: {
    homeTeamStats: any;
    awayTeamStats: any;
    headToHead: any;
    recentForm: any;
    predictions: any;
    confidence: number;
    reasoning: string;
  };
  opportunities: any[];
}

export default function MatchAnalysisPage() {
  const [analysis, setAnalysis] = useState<MatchAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeMatch = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('🔍 Iniciando análisis del partido...');
      
      const response = await fetch('/api/analyze-match');
      const data = await response.json();
      
      if (data.success) {
        setAnalysis(data.data);
        console.log('✅ Análisis completado:', data.metadata);
      } else {
        setError(data.error || 'Error al analizar el partido');
        console.error('❌ Error en análisis:', data.error);
      }
    } catch (error) {
      console.error('❌ Error en análisis:', error);
      setError('Error de conexión al analizar el partido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    analyzeMatch();
  }, []);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Análisis de Partido</h1>
                <p className="text-sm text-gray-300">Real Sociedad vs Real Madrid</p>
              </div>
            </div>
            <button
              onClick={analyzeMatch}
              disabled={loading}
              className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all disabled:opacity-50 flex items-center space-x-2"
            >
              {loading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Target className="w-4 h-4" />
              )}
              <span>{loading ? 'Analizando...' : 'Actualizar Análisis'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {loading ? (
          <div className="text-center py-12">
            <RefreshCw className="w-12 h-12 text-blue-400 animate-spin mx-auto mb-4" />
            <p className="text-gray-300">Analizando el partido...</p>
            <p className="text-gray-400 text-sm mt-2">Esto puede tomar unos segundos</p>
          </div>
        ) : error ? (
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-6">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <span className="text-red-300 font-semibold">Error en el análisis</span>
            </div>
            <p className="text-red-200 mt-2">{error}</p>
          </div>
        ) : analysis ? (
          <>
            {/* Match Info */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {analysis.match.homeTeam} vs {analysis.match.awayTeam}
                  </h2>
                  <div className="flex items-center space-x-4 text-gray-300">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(analysis.match.date).toLocaleDateString('es-ES')}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{analysis.match.venue || 'Por confirmar'}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Trophy className="w-4 h-4" />
                      <span>{analysis.match.league}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${getConfidenceColor(analysis.analysis.confidence)}`}>
                    {analysis.analysis.confidence}%
                  </div>
                  <div className="text-sm text-gray-400">Confianza</div>
                </div>
              </div>
            </div>

            {/* Team Stats */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  {analysis.match.homeTeam}
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Posición:</span>
                    <span className="text-white font-semibold">{analysis.analysis.homeTeamStats.position}°</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Puntos:</span>
                    <span className="text-white font-semibold">{analysis.analysis.homeTeamStats.points}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Partidos:</span>
                    <span className="text-white font-semibold">{analysis.analysis.homeTeamStats.played}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Forma:</span>
                    <span className="text-white font-semibold">{analysis.analysis.homeTeamStats.recentForm}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">En casa:</span>
                    <span className="text-white font-semibold">
                      {analysis.analysis.homeTeamStats.homeRecord.wins}V-{analysis.analysis.homeTeamStats.homeRecord.draws}E-{analysis.analysis.homeTeamStats.homeRecord.losses}D
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Goles promedio:</span>
                    <span className="text-white font-semibold">
                      {analysis.analysis.homeTeamStats.avgGoalsScored} a favor, {analysis.analysis.homeTeamStats.avgGoalsConceded} en contra
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  {analysis.match.awayTeam}
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Posición:</span>
                    <span className="text-white font-semibold">{analysis.analysis.awayTeamStats.position}°</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Puntos:</span>
                    <span className="text-white font-semibold">{analysis.analysis.awayTeamStats.points}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Partidos:</span>
                    <span className="text-white font-semibold">{analysis.analysis.awayTeamStats.played}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Forma:</span>
                    <span className="text-white font-semibold">{analysis.analysis.awayTeamStats.recentForm}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Como visitante:</span>
                    <span className="text-white font-semibold">
                      {analysis.analysis.awayTeamStats.awayRecord.wins}V-{analysis.analysis.awayTeamStats.awayRecord.draws}E-{analysis.analysis.awayTeamStats.awayRecord.losses}D
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Goles promedio:</span>
                    <span className="text-white font-semibold">
                      {analysis.analysis.awayTeamStats.avgGoalsScored} a favor, {analysis.analysis.awayTeamStats.avgGoalsConceded} en contra
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Predictions */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-8">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Predicciones
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">
                    {(analysis.analysis.predictions.homeWin * 100).toFixed(1)}%
                  </div>
                  <div className="text-gray-300">Victoria {analysis.match.homeTeam}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">
                    {(analysis.analysis.predictions.draw * 100).toFixed(1)}%
                  </div>
                  <div className="text-gray-300">Empate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    {(analysis.analysis.predictions.awayWin * 100).toFixed(1)}%
                  </div>
                  <div className="text-gray-300">Victoria {analysis.match.awayTeam}</div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400 mb-2">
                    {(analysis.analysis.predictions.over25 * 100).toFixed(1)}%
                  </div>
                  <div className="text-gray-300">Over 2.5 goles</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-400 mb-2">
                    {(analysis.analysis.predictions.bothTeamsScore * 100).toFixed(1)}%
                  </div>
                  <div className="text-gray-300">Ambos equipos marcan</div>
                </div>
              </div>
            </div>

            {/* Opportunities */}
            {analysis.opportunities.length > 0 && (
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-8">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Oportunidades de Valor
                </h3>
                <div className="space-y-4">
                  {analysis.opportunities.map((opportunity, index) => (
                    <div key={index} className="bg-gray-800/50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <Target className="w-4 h-4 text-blue-400" />
                          <h4 className="font-bold text-white">{opportunity.market}</h4>
                          <span className="text-gray-300">- {opportunity.prediction}</span>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-bold ${getValueColor(opportunity.value)}`}>
                          {(opportunity.value * 100).toFixed(1)}% Valor
                        </div>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Cuotas:</span>
                          <span className="text-white ml-2">{opportunity.odds.toFixed(2)}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Probabilidad:</span>
                          <span className="text-white ml-2">{(opportunity.probability * 100).toFixed(1)}%</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Confianza:</span>
                          <span className={`ml-2 ${getConfidenceColor(opportunity.confidence)}`}>
                            {opportunity.confidence}%
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm mt-2">{opportunity.reasoning}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Detailed Analysis */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <Star className="w-5 h-5 mr-2" />
                Análisis Detallado
              </h3>
              <div className="prose prose-invert max-w-none">
                <pre className="text-gray-300 whitespace-pre-wrap text-sm leading-relaxed">
                  {analysis.analysis.reasoning}
                </pre>
              </div>
            </div>
          </>
        ) : null}
      </main>
    </div>
  );
}


