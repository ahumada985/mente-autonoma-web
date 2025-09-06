'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertCircle, Clock, Database, Globe, Trophy, Users, Calendar } from 'lucide-react';

interface BatchProcessingResult {
  totalFiles: number;
  processedFiles: number;
  totalMatches: number;
  totalTeams: number;
  totalLeagues: number;
  totalSeasons: number;
  errors: string[];
  processingTime: number;
  coverage: {
    leagues: { [key: string]: number };
    seasons: { [key: string]: number };
    countries: { [key: string]: number };
  };
  coverage2020_2025: number;
  recommendations: string[];
  nextSteps: string[];
}

export default function BatchProcessingPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<BatchProcessingResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startBatchProcessing = async () => {
    setIsProcessing(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/process-csv-batch', {
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
        setResult(data.data);
      } else {
        setError(data.message || 'Error en el procesamiento');
      }
    } catch (err) {
      setError('Error de conexión: ' + (err instanceof Error ? err.message : 'Error desconocido'));
    } finally {
      setIsProcessing(false);
    }
  };

  const getProgressPercentage = () => {
    if (!result) return 0;
    return (result.processedFiles / result.totalFiles) * 100;
  };

  const getCoverageColor = (coverage: number) => {
    if (coverage >= 80) return 'text-green-600';
    if (coverage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">
          🔥 Procesamiento por Lotes de CSVs
        </h1>
        <p className="text-xl text-gray-600">
          "Gran Henki Dama de Goku" - Sistema de análisis de apuestas deportivas
        </p>
        <p className="text-lg text-gray-500">
          Procesamiento optimizado de archivos CSV históricos sin stack overflow
        </p>
      </div>

      {/* Botón de inicio */}
      <Card className="text-center">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2">
            <Database className="h-6 w-6" />
            Procesamiento por Lotes
          </CardTitle>
          <CardDescription>
            Procesa todos los archivos CSV históricos en lotes para evitar problemas de memoria
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={startBatchProcessing}
            disabled={isProcessing}
            size="lg"
            className="w-full"
          >
            {isProcessing ? (
              <>
                <Clock className="mr-2 h-4 w-4 animate-spin" />
                Procesando...
              </>
            ) : (
              <>
                <Database className="mr-2 h-4 w-4" />
                Iniciar Procesamiento por Lotes
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Barra de progreso */}
      {isProcessing && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 animate-spin" />
              Procesando Archivos...
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={getProgressPercentage()} className="w-full" />
            <p className="text-sm text-gray-600 mt-2">
              Procesando archivos CSV históricos...
            </p>
          </CardContent>
        </Card>
      )}

      {/* Error */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Resultados */}
      {result && (
        <div className="space-y-6">
          {/* Resumen general */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-600" />
                Procesamiento Completado
              </CardTitle>
              <CardDescription>
                Resumen del procesamiento por lotes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{result.processedFiles}</div>
                  <div className="text-sm text-gray-600">Archivos Procesados</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{result.totalMatches.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Partidos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{result.totalTeams.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Equipos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{result.totalLeagues}</div>
                  <div className="text-sm text-gray-600">Ligas</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cobertura 2020-2025 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-6 w-6" />
                Cobertura Histórica 2020-2025
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className={`text-4xl font-bold ${getCoverageColor(result.coverage2020_2025)}`}>
                  {result.coverage2020_2025.toFixed(1)}%
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  Cobertura de temporadas 2020-2025
                </div>
                <Progress value={result.coverage2020_2025} className="w-full mt-4" />
              </div>
            </CardContent>
          </Card>

          {/* Estadísticas detalladas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Ligas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Ligas ({Object.keys(result.coverage.leagues).length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(result.coverage.leagues)
                    .sort(([,a], [,b]) => b - a)
                    .slice(0, 10)
                    .map(([league, count]) => (
                      <div key={league} className="flex justify-between items-center">
                        <span className="text-sm">{league}</span>
                        <Badge variant="secondary">{count}</Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Temporadas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Temporadas ({Object.keys(result.coverage.seasons).length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(result.coverage.seasons)
                    .sort(([a], [b]) => a.localeCompare(b))
                    .map(([season, count]) => (
                      <div key={season} className="flex justify-between items-center">
                        <span className="text-sm">{season}</span>
                        <Badge variant="secondary">{count}</Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Países */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Países ({Object.keys(result.coverage.countries).length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(result.coverage.countries)
                    .sort(([,a], [,b]) => b - a)
                    .slice(0, 10)
                    .map(([country, count]) => (
                      <div key={country} className="flex justify-between items-center">
                        <span className="text-sm">{country}</span>
                        <Badge variant="secondary">{count}</Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recomendaciones */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Recomendaciones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {result.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm">{rec}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Próximos pasos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Próximos Pasos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {result.nextSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-sm">{step}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Errores */}
          {result.errors.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <AlertCircle className="h-5 w-5" />
                  Errores ({result.errors.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {result.errors.map((error, index) => (
                    <div key={index} className="text-sm text-red-600 bg-red-50 p-2 rounded">
                      {error}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}

