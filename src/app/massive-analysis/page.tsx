'use client';

import { useState, useEffect } from 'react';
import { 
  Zap, 
  Database, 
  Globe, 
  Trophy, 
  BarChart3,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Target,
  Activity,
  FileText,
  Calendar,
  Users,
  Award,
  Download,
  RefreshCw
} from 'lucide-react';

interface LeagueCoverage {
  league: string;
  country: string;
  tier: number;
  seasons: string[];
  totalMatches: number;
  totalTeams: number;
  coveragePercentage: number;
  missingSeasons: string[];
  dataQuality: 'excellent' | 'good' | 'fair' | 'poor';
  sources: number;
}

interface AnalysisData {
  summary: {
    totalLeagues: number;
    totalCountries: number;
    totalMatches: number;
    totalTeams: number;
    totalSeasons: number;
    overallCoverage: number;
  };
  coverage: LeagueCoverage[];
  missingData: {
    leagues: string[];
    seasons: string[];
    countries: string[];
  };
  recommendations: string[];
  analysis: {
    excellentQuality: number;
    goodQuality: number;
    fairQuality: number;
    poorQuality: number;
    highCoverage: number;
    mediumCoverage: number;
    lowCoverage: number;
  };
}

export default function MassiveAnalysisPage() {
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runAnalysis = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/massive-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (result.success) {
        setAnalysisData(result.data);
        console.log('🔥 Análisis masivo completado:', result);
      } else {
        setError(result.error || 'Error ejecutando análisis');
      }
    } catch (error) {
      console.error('Error ejecutando análisis:', error);
      setError('Error de conexión al ejecutar análisis');
    } finally {
      setLoading(false);
    }
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'excellent': return 'text-green-400 bg-green-400/20';
      case 'good': return 'text-blue-400 bg-blue-400/20';
      case 'fair': return 'text-yellow-400 bg-yellow-400/20';
      case 'poor': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getCoverageColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Zap className="w-12 h-12 text-yellow-400 mr-4" />
            <h1 className="text-4xl font-bold text-white">
              Gran Henki Dama de Goku
            </h1>
          </div>
          <p className="text-xl text-gray-300 mb-2">
            🔥 Análisis Masivo de Datos Históricos de Fútbol Mundial
          </p>
          <p className="text-gray-400">
            Procesando miles de archivos CSV para crear la base de datos más completa del mundo
          </p>
        </div>

        {/* Control Panel */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <Database className="w-6 h-6 mr-2" />
              Panel de Control
            </h2>
            <button
              onClick={runAnalysis}
              disabled={loading}
              className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-yellow-700 hover:to-orange-700 transition-all transform hover:scale-105 disabled:opacity-50 flex items-center"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                  Analizando...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 mr-2" />
                  Ejecutar Análisis Masivo
                </>
              )}
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2 flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                Archivos CSV
              </h3>
              <p className="text-gray-300 text-sm">
                Procesando archivos de Football-Data.co.uk, Kaggle, y más fuentes históricas
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2 flex items-center">
                <Globe className="w-4 h-4 mr-2" />
                Cobertura Global
              </h3>
              <p className="text-gray-300 text-sm">
                Análisis de ligas de Europa, América, Asia y más regiones
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2 flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Período Histórico
              </h3>
              <p className="text-gray-300 text-sm">
                Datos desde 2000 hasta 2025 - Enfoque en 2020-2025
              </p>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-8">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-red-400 mr-2" />
              <span className="text-red-300 font-semibold">Error</span>
            </div>
            <p className="text-red-200 mt-2">{error}</p>
          </div>
        )}

        {/* Analysis Results */}
        {analysisData && (
          <div className="space-y-8">
            {/* Summary Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <Trophy className="w-6 h-6 text-yellow-400" />
                  <span className="text-yellow-400 font-semibold">Ligas</span>
                </div>
                <div className="text-3xl font-bold text-white">{analysisData.summary.totalLeagues}</div>
                <div className="text-sm text-gray-400">Analizadas</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <Globe className="w-6 h-6 text-blue-400" />
                  <span className="text-blue-400 font-semibold">Países</span>
                </div>
                <div className="text-3xl font-bold text-white">{analysisData.summary.totalCountries}</div>
                <div className="text-sm text-gray-400">Cubiertos</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <Target className="w-6 h-6 text-green-400" />
                  <span className="text-green-400 font-semibold">Partidos</span>
                </div>
                <div className="text-3xl font-bold text-white">{analysisData.summary.totalMatches.toLocaleString()}</div>
                <div className="text-sm text-gray-400">Procesados</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <Users className="w-6 h-6 text-purple-400" />
                  <span className="text-purple-400 font-semibold">Equipos</span>
                </div>
                <div className="text-3xl font-bold text-white">{analysisData.summary.totalTeams.toLocaleString()}</div>
                <div className="text-sm text-gray-400">Procesados</div>
              </div>
            </div>

            {/* Overall Coverage */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <TrendingUp className="w-6 h-6 mr-2" />
                Cobertura General
              </h3>
              <div className="flex items-center space-x-4">
                <div className="text-4xl font-bold text-white">
                  {analysisData.summary.overallCoverage.toFixed(1)}%
                </div>
                <div className="flex-1">
                  <div className="w-full bg-gray-700 rounded-full h-4">
                    <div 
                      className="bg-gradient-to-r from-yellow-500 to-orange-500 h-4 rounded-full transition-all duration-1000"
                      style={{ width: `${analysisData.summary.overallCoverage}%` }}
                    ></div>
                  </div>
                  <p className="text-gray-300 text-sm mt-2">
                    Cobertura histórica promedio (2020-2025)
                  </p>
                </div>
              </div>
            </div>

            {/* Quality Analysis */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Award className="w-6 h-6 mr-2" />
                Análisis de Calidad
              </h3>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{analysisData.analysis.excellentQuality}</div>
                  <div className="text-sm text-gray-400">Excelente</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{analysisData.analysis.goodQuality}</div>
                  <div className="text-sm text-gray-400">Buena</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">{analysisData.analysis.fairQuality}</div>
                  <div className="text-sm text-gray-400">Regular</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400">{analysisData.analysis.poorQuality}</div>
                  <div className="text-sm text-gray-400">Pobre</div>
                </div>
              </div>
            </div>

            {/* League Coverage Table */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <BarChart3 className="w-6 h-6 mr-2" />
                Cobertura por Liga
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left text-gray-300 py-2">Liga</th>
                      <th className="text-left text-gray-300 py-2">País</th>
                      <th className="text-left text-gray-300 py-2">División</th>
                      <th className="text-left text-gray-300 py-2">Partidos</th>
                      <th className="text-left text-gray-300 py-2">Equipos</th>
                      <th className="text-left text-gray-300 py-2">Cobertura</th>
                      <th className="text-left text-gray-300 py-2">Calidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analysisData.coverage.map((league, index) => (
                      <tr key={index} className="border-b border-gray-700/50">
                        <td className="text-white py-2 font-semibold">{league.league}</td>
                        <td className="text-gray-300 py-2">{league.country}</td>
                        <td className="text-gray-300 py-2">{league.tier}</td>
                        <td className="text-gray-300 py-2">{league.totalMatches.toLocaleString()}</td>
                        <td className="text-gray-300 py-2">{league.totalTeams}</td>
                        <td className="py-2">
                          <span className={`font-semibold ${getCoverageColor(league.coveragePercentage)}`}>
                            {league.coveragePercentage.toFixed(1)}%
                          </span>
                        </td>
                        <td className="py-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getQualityColor(league.dataQuality)}`}>
                            {league.dataQuality}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Missing Data */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <AlertTriangle className="w-6 h-6 mr-2" />
                Datos Faltantes
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-white font-semibold mb-2">Ligas Faltantes</h4>
                  <div className="text-gray-300 text-sm">
                    {analysisData.missingData.leagues.length > 0 ? (
                      <ul className="list-disc list-inside space-y-1">
                        {analysisData.missingData.leagues.slice(0, 5).map((league, index) => (
                          <li key={index}>{league}</li>
                        ))}
                        {analysisData.missingData.leagues.length > 5 && (
                          <li>... y {analysisData.missingData.leagues.length - 5} más</li>
                        )}
                      </ul>
                    ) : (
                      <span className="text-green-400">✅ Todas las ligas cubiertas</span>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Temporadas Faltantes</h4>
                  <div className="text-gray-300 text-sm">
                    {analysisData.missingData.seasons.length > 0 ? (
                      <ul className="list-disc list-inside space-y-1">
                        {analysisData.missingData.seasons.slice(0, 5).map((season, index) => (
                          <li key={index}>{season}</li>
                        ))}
                        {analysisData.missingData.seasons.length > 5 && (
                          <li>... y {analysisData.missingData.seasons.length - 5} más</li>
                        )}
                      </ul>
                    ) : (
                      <span className="text-green-400">✅ Todas las temporadas cubiertas</span>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Países Faltantes</h4>
                  <div className="text-gray-300 text-sm">
                    {analysisData.missingData.countries.length > 0 ? (
                      <ul className="list-disc list-inside space-y-1">
                        {analysisData.missingData.countries.slice(0, 5).map((country, index) => (
                          <li key={index}>{country}</li>
                        ))}
                        {analysisData.missingData.countries.length > 5 && (
                          <li>... y {analysisData.missingData.countries.length - 5} más</li>
                        )}
                      </ul>
                    ) : (
                      <span className="text-green-400">✅ Todos los países cubiertos</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Activity className="w-6 h-6 mr-2" />
                Recomendaciones
              </h3>
              <div className="space-y-3">
                {analysisData.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-300">{recommendation}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mt-8">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <Download className="w-5 h-5 mr-2" />
            Instrucciones de Uso
          </h3>
          <div className="space-y-3 text-gray-300">
            <div className="flex items-start">
              <span className="bg-yellow-500 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
              <p>Haz clic en "Ejecutar Análisis Masivo" para procesar todos los archivos CSV</p>
            </div>
            <div className="flex items-start">
              <span className="bg-yellow-500 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
              <p>El sistema analizará automáticamente todos los archivos en la carpeta "Resultados historicos"</p>
            </div>
            <div className="flex items-start">
              <span className="bg-yellow-500 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
              <p>Revisa el reporte de cobertura y calidad de datos generado</p>
            </div>
            <div className="flex items-start">
              <span className="bg-yellow-500 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span>
              <p>Sigue las recomendaciones para completar los datos faltantes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


