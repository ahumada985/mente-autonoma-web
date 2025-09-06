'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertCircle, Clock, Database, Globe, Trophy, Users, Calendar, TrendingUp, BarChart3 } from 'lucide-react';

interface UnifiedDatabaseStats {
  totalMatches: number;
  totalTeams: number;
  totalLeagues: number;
  totalSeasons: number;
  coverage2020_2025: number;
  lastUpdate: string;
  dataSources: {
    csv: number;
    api: number;
    webScraping: number;
  };
  leagues: {
    [leagueName: string]: {
      matches: number;
      teams: number;
      seasons: string[];
      coverage: number;
    };
  };
}

export default function UnifiedDatabasePage() {
  const [isInitializing, setIsInitializing] = useState(false);
  const [stats, setStats] = useState<UnifiedDatabaseStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Cargar estadísticas al montar el componente
  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const response = await fetch('/api/init-unified-database');
      const data = await response.json();
      
      if (data.success) {
        setStats(data.data);
      } else {
        setError(data.message || 'Error cargando estadísticas');
      }
    } catch (err) {
      setError('Error de conexión: ' + (err instanceof Error ? err.message : 'Error desconocido'));
    }
  };

  const initializeDatabase = async () => {
    setIsInitializing(true);
    setError(null);

    try {
      const response = await fetch('/api/init-unified-database', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          forceRecreate: false
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStats(data.data);
      } else {
        setError(data.message || 'Error inicializando base de datos');
      }
    } catch (err) {
      setError('Error de conexión: ' + (err instanceof Error ? err.message : 'Error desconocido'));
    } finally {
      setIsInitializing(false);
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
          🗄️ Base de Datos Unificada
        </h1>
        <p className="text-xl text-gray-600">
          "Gran Henki Dama de Goku" - Sistema de análisis de apuestas deportivas
        </p>
        <p className="text-lg text-gray-500">
          Base de datos unificada con datos históricos y en tiempo real
        </p>
      </div>

      {/* Botón de inicialización */}
      <Card className="text-center">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2">
            <Database className="h-6 w-6" />
            Inicializar Base de Datos
          </CardTitle>
          <CardDescription>
            Crea y configura la base de datos unificada con todos los datos históricos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={initializeDatabase}
            disabled={isInitializing}
            size="lg"
            className="w-full"
          >
            {isInitializing ? (
              <>
                <Clock className="mr-2 h-4 w-4 animate-spin" />
                Inicializando...
              </>
            ) : (
              <>
                <Database className="mr-2 h-4 w-4" />
                Inicializar Base de Datos
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Error */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Estadísticas */}
      {stats && (
        <div className="space-y-6">
          {/* Resumen general */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-600" />
                Base de Datos Unificada
              </CardTitle>
              <CardDescription>
                Estadísticas generales de la base de datos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{stats.totalMatches.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Partidos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{stats.totalTeams.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Equipos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{stats.totalLeagues}</div>
                  <div className="text-sm text-gray-600">Ligas</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{stats.totalSeasons}</div>
                  <div className="text-sm text-gray-600">Temporadas</div>
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
                <div className={`text-4xl font-bold ${getCoverageColor(stats.coverage2020_2025)}`}>
                  {stats.coverage2020_2025.toFixed(1)}%
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  Cobertura de temporadas 2020-2025
                </div>
                <Progress value={stats.coverage2020_2025} className="w-full mt-4" />
                <Badge 
                  variant={getCoverageBadgeVariant(stats.coverage2020_2025)}
                  className="mt-2"
                >
                  {stats.coverage2020_2025 >= 80 ? 'Excelente' : 
                   stats.coverage2020_2025 >= 60 ? 'Buena' : 'Necesita Mejora'}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Fuentes de datos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-6 w-6" />
                Fuentes de Datos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{stats.dataSources.csv}</div>
                  <div className="text-sm text-gray-600">Archivos CSV</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{stats.dataSources.api}</div>
                  <div className="text-sm text-gray-600">APIs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{stats.dataSources.webScraping}</div>
                  <div className="text-sm text-gray-600">Web Scraping</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Estadísticas por liga */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-6 w-6" />
                Estadísticas por Liga
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(stats.leagues)
                  .sort(([,a], [,b]) => b.matches - a.matches)
                  .slice(0, 10)
                  .map(([leagueName, leagueStats]) => (
                    <div key={leagueName} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{leagueName}</h3>
                        <Badge variant="outline">
                          {leagueStats.coverage.toFixed(1)}% cobertura
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="font-medium text-blue-600">{leagueStats.matches.toLocaleString()}</div>
                          <div className="text-gray-600">Partidos</div>
                        </div>
                        <div>
                          <div className="font-medium text-green-600">{leagueStats.teams}</div>
                          <div className="text-gray-600">Equipos</div>
                        </div>
                        <div>
                          <div className="font-medium text-purple-600">{leagueStats.seasons.length}</div>
                          <div className="text-gray-600">Temporadas</div>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="text-xs text-gray-500">
                          Temporadas: {leagueStats.seasons.join(', ')}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Última actualización */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-6 w-6" />
                Información del Sistema
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Última actualización:</span>
                  <span className="text-sm font-medium">{new Date(stats.lastUpdate).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Estado:</span>
                  <Badge variant="default">Activo</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Versión:</span>
                  <span className="text-sm font-medium">Gran Henki Dama de Goku v1.0</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

