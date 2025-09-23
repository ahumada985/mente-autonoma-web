'use client';

import { useState } from 'react';

export default function ExtractDataPage() {
  const [isExtracting, setIsExtracting] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const extractAllData = async () => {
    setIsExtracting(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/extract-all-data', {
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
        setError(data.message || 'Error extrayendo datos');
      }
    } catch (err) {
      setError('Error de conexión: ' + (err instanceof Error ? err.message : 'Error desconocido'));
    } finally {
      setIsExtracting(false);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">
          🔥 Extracción de TODOS los Datos Reales
        </h1>
        <p className="text-xl text-gray-600">
          "Gran Henki Dama de Goku" - Sistema de análisis de apuestas deportivas
        </p>
        <p className="text-lg text-gray-500">
          Extraer fechas, equipos y eventos reales de TODOS los CSVs históricos
        </p>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Extracción de Datos Reales</h2>
        <p className="text-gray-600 mb-6">
          Extraer y guardar TODOS los datos reales de fechas, equipos y eventos en la base de datos
        </p>
        
        <div className="space-y-4">
          <button 
            onClick={extractAllData}
            disabled={isExtracting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-4 px-6 rounded-lg text-lg"
          >
            {isExtracting ? (
              <>
                <span className="animate-spin mr-2">⏳</span>
                Extrayendo TODOS los Datos...
              </>
            ) : (
              <>
                <span className="mr-2">🔥</span>
                Extraer TODOS los Datos Reales
              </>
            )}
          </button>

          {result && (
            <div className="space-y-4">
              {/* Resumen de extracción */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center bg-blue-50 p-4 rounded">
                  <div className="text-2xl font-bold text-blue-600">{result.summary.processedFiles}</div>
                  <div className="text-sm text-gray-600">Archivos Procesados</div>
                </div>
                <div className="text-center bg-green-50 p-4 rounded">
                  <div className="text-2xl font-bold text-green-600">{result.summary.totalMatches.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Partidos Extraídos</div>
                </div>
                <div className="text-center bg-purple-50 p-4 rounded">
                  <div className="text-2xl font-bold text-purple-600">{result.summary.totalTeams.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Equipos Extraídos</div>
                </div>
                <div className="text-center bg-orange-50 p-4 rounded">
                  <div className="text-2xl font-bold text-orange-600">{result.summary.totalEvents.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Eventos Extraídos</div>
                </div>
              </div>

              {/* Cobertura */}
              <div className="text-center bg-gray-50 p-4 rounded">
                <div className={`text-3xl font-bold ${result.summary.coverage2020_2025 >= 80 ? 'text-green-600' : result.summary.coverage2020_2025 >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {result.summary.coverage2020_2025.toFixed(1)}%
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  Cobertura 2020-2025
                </div>
              </div>

              {/* Datos en la base de datos */}
              {result.databaseStats && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Datos en la Base de Datos:</h3>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-xl font-bold text-blue-600">{result.databaseStats.totalLeagues}</div>
                      <div className="text-sm text-gray-600">Ligas</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-green-600">{result.databaseStats.totalTeams}</div>
                      <div className="text-sm text-gray-600">Equipos</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-purple-600">{result.databaseStats.totalMatches}</div>
                      <div className="text-sm text-gray-600">Partidos</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Temporadas encontradas */}
              {result.seasons && result.seasons.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Temporadas Encontradas:</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.seasons.map((season: string) => (
                      <span key={season} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                        {season}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Archivos procesados */}
              <div>
                <h3 className="font-semibold mb-2">Archivos Procesados:</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {result.files.slice(0, 10).map((file: any, index: number) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="text-sm">{file.filename}</span>
                      <div className="flex gap-2">
                        <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs">{file.format}</span>
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">{file.matches} partidos</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">{file.teams} equipos</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Errores */}
              {result.errors && result.errors.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2 text-red-600">Errores:</h3>
                  <div className="space-y-1 max-h-20 overflow-y-auto">
                    {result.errors.slice(0, 5).map((error: string, index: number) => (
                      <div key={index} className="text-sm text-red-600 bg-red-50 p-2 rounded">
                        {error}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Próximos pasos */}
              {result.summary.nextSteps && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 text-green-800">Próximos Pasos:</h3>
                  <ul className="space-y-1">
                    {result.summary.nextSteps.map((step: string, index: number) => (
                      <li key={index} className="text-sm text-green-700 flex items-center gap-2">
                        <span className="text-green-600">✅</span>
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <div className="flex">
            <span className="text-red-600 mr-2">❌</span>
            <div>{error}</div>
          </div>
        </div>
      )}
    </div>
  );
}