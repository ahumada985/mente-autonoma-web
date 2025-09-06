'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertCircle, Clock, Database, Globe, Trophy, Users, Calendar, TrendingUp, BarChart3, Download } from 'lucide-react';

interface DatabaseStatus {
  summary: {
    totalLeagues: number;
    totalTeams: number;
    totalMatches: number;
    totalPredictions: number;
    isEmpty: boolean;
  };
  leagues: Array<{
    id: string;
    name: string;
    country: string;
    tier: number;
    region: string;
  }>;
  teams: Array<{
    id: string;
    name: string;
    league: string;
    country: string;
    points: number;
    played: number;
  }>;
  matches: Array<{
    id: string;
    date: string;
    homeTeam: { name: string };
    awayTeam: { name: string };
    league: { name: string };
    homeScore: number;
    awayScore: number;
  }>;
  leagueStats: Array<{
    id: string;
    name: string;
    country: string;
    tier: number;
    region: string;
    matches: number;
    teams: number;
  }>;
  status: 'EMPTY' | 'HAS_DATA';
}

interface ExtractionResult {
  summary: {
    totalFiles: number;
    processedFiles: number;
    totalMatches: number;
    totalTeams: number;
    totalEvents: number;
    totalSeasons: number;
    coverage2020_2025: number;
  };
  leagues: { [key: string]: any };
  files: Array<{
    filename: string;
    matches: number;
    teams: number;
    events: number;
    seasons: string[];
    league: string;
    country: string;
    format: string;
  }>;
  seasons: string[];
  errors: string[];
}

export default function DataExtractionPage() {
  const [dbStatus, setDbStatus] = useState<DatabaseStatus | null>(null);
  const [extractionResult, setExtractionResult] = useState<ExtractionResult | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar estado de la base de datos al montar
  useEffect(() => {
    checkDatabase();
  }, []);

  const checkDatabase = async () => {
    setIsChecking(true);
    setError(null);

    try {
      const response = await fetch('/api/check-database');
      const data = await response.json();

      if (data.success) {
        setDbStatus(data.data);
      } else {
        setError(data.message || 'Error verificando base de datos');
      }
    } catch (err) {
      setError('Error de conexión: ' + (err instanceof Error ? err.message : 'Error desconocido'));
    } finally {
      setIsChecking(false);
    }
  };

  const extractRealData = async () => {
    setIsExtracting(true);
    setError(null);

    try {
      const response = await fetch('/api/extract-real-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          csvDirectory: 'Resultados historicos'
        }),
      });

      const data = await response.json();

      if (data.success) {
        setExtractionResult(data.data);
        // Actualizar estado de la base de datos después de la extracción
        await checkDatabase();
      } else {
        setError(data.message || 'Error extrayendo datos');
      }
    } catch (err) {
      setError('Error de conexión: ' + (err instanceof Error ? err.message : 'Error desconocido'));
    } finally {
      setIsExtracting(false);
    }
  };

  const getCoverageColor = (coverage: number) => {
    if (coverage >= 80) return 'text-green-600';
    if (coverage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getCoverageBadgeVariant = (coverage: number) => {
    if (coverage >= 80) return 'default';
    if (coverage >= 60) return 'secondary';
    return 'destructive';
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">
          🔧 Extracción de Datos Reales
        </h1>
        <p className="text-xl text-gray-600">
          "Gran Henki Dama de Goku" - Sistema de análisis de apuestas deportivas
        </p>
        <p className="text-lg text-gray-500">
          Extraer fechas, equipos y eventos reales de los CSVs históricos
        </p>
      </div>

      {/* Estado de la Base de Datos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-6 w-6" />
            Estado de la Base de Datos
          </CardTitle>
          <CardDescription>
            Verificar qué datos tenemos actualmente en la base de datos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <Button 
              onClick={checkDatabase}
              disabled={isChecking}
              variant="outline"
            >
              {isChecking ? (
                <>
                  <Clock className="mr-2 h-4 w-4 animate-spin" />
                  Verificando...
                </>
              ) : (
                <>
                  <Database className="mr-2 h-4 w-4" />
                  Verificar Base de Datos
                </>
              )}
            </Button>
          </div>

          {dbStatus && (
            <div className="space-y-4">
              {/* Resumen */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{dbStatus.summary.totalLeagues}</div>
                  <div className="text-sm text-gray-600">Ligas</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{dbStatus.summary.totalTeams}</div>
                  <div className="text-sm text-gray-600">Equipos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{dbStatus.summary.totalMatches}</div>
                  <div className="text-sm text-gray-600">Partidos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{dbStatus.summary.totalPredictions}</div>
                  <div className="text-sm text-gray-600">Predicciones</div>
                </div>
              </div>

              {/* Estado */}
              <div className="text-center">
                <Badge 
                  variant={dbStatus.status === 'EMPTY' ? 'destructive' : 'default'}
                  className="text-lg px-4 py-2"
                >
                  {dbStatus.status === 'EMPTY' ? '❌ Base de Datos Vacía' : '✅ Base de Datos con Datos'}
                </Badge>
              </div>

              {/* Ligas */}
              {dbStatus.leagues.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Ligas en la Base de Datos:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {dbStatus.leagues.slice(0, 10).map((league) => (
                      <div key={league.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-sm">{league.name}</span>
                        <Badge variant="outline">{league.country}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Equipos */}
              {dbStatus.teams.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Equipos en la Base de Datos:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {dbStatus.teams.slice(0, 10).map((team) => (
                      <div key={team.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-sm">{team.name}</span>
                        <Badge variant="outline">{team.league}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Partidos */}
              {dbStatus.matches.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Partidos en la Base de Datos:</h3>
                  <div className="space-y-2">
                    {dbStatus.matches.slice(0, 5).map((match) => (
                      <div key={match.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-sm">
                          {match.homeTeam.name} vs {match.awayTeam.name}
                        </span>
                        <div className="flex gap-2">
                          <Badge variant="outline">{match.league.name}</Badge>
                          <Badge variant="secondary">
                            {match.homeScore}-{match.awayScore}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Extracción de Datos Reales */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-6 w-6" />
            Extracción de Datos Reales
          </CardTitle>
          <CardDescription>
            Extraer fechas, equipos y eventos reales de los archivos CSV históricos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button 
              onClick={extractRealData}
              disabled={isExtracting}
              size="lg"
              className="w-full"
            >
              {isExtracting ? (
                <>
                  <Clock className="mr-2 h-4 w-4 animate-spin" />
                  Extrayendo Datos...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Extraer Datos Reales de CSVs
                </>
              )}
            </Button>

            {extractionResult && (
              <div className="space-y-4">
                {/* Resumen de extracción */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{extractionResult.summary.processedFiles}</div>
                    <div className="text-sm text-gray-600">Archivos Procesados</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{extractionResult.summary.totalMatches.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Partidos Extraídos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{extractionResult.summary.totalTeams.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Equipos Extraídos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{extractionResult.summary.totalEvents.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Eventos Extraídos</div>
                  </div>
                </div>

                {/* Cobertura */}
                <div className="text-center">
                  <div className={`text-3xl font-bold ${getCoverageColor(extractionResult.summary.coverage2020_2025)}`}>
                    {extractionResult.summary.coverage2020_2025.toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    Cobertura 2020-2025
                  </div>
                  <Progress value={extractionResult.summary.coverage2020_2025} className="w-full" />
                  <Badge 
                    variant={getCoverageBadgeVariant(extractionResult.summary.coverage2020_2025)}
                    className="mt-2"
                  >
                    {extractionResult.summary.coverage2020_2025 >= 80 ? 'Excelente' : 
                     extractionResult.summary.coverage2020_2025 >= 60 ? 'Buena' : 'Necesita Mejora'}
                  </Badge>
                </div>

                {/* Temporadas encontradas */}
                {extractionResult.seasons.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Temporadas Encontradas:</h3>
                    <div className="flex flex-wrap gap-2">
                      {extractionResult.seasons.map((season) => (
                        <Badge key={season} variant="outline">{season}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Archivos procesados */}
                <div>
                  <h3 className="font-semibold mb-2">Archivos Procesados:</h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {extractionResult.files.slice(0, 10).map((file, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-sm">{file.filename}</span>
                        <div className="flex gap-2">
                          <Badge variant="outline">{file.format}</Badge>
                          <Badge variant="secondary">{file.matches} partidos</Badge>
                          <Badge variant="secondary">{file.teams} equipos</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Errores */}
                {extractionResult.errors.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2 text-red-600">Errores:</h3>
                    <div className="space-y-1 max-h-20 overflow-y-auto">
                      {extractionResult.errors.slice(0, 5).map((error, index) => (
                        <div key={index} className="text-sm text-red-600 bg-red-50 p-2 rounded">
                          {error}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Error */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}

