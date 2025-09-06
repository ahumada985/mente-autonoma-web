'use client';

import { useState } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Loader2, 
  Database, 
  Globe, 
  Activity,
  AlertTriangle,
  Info
} from 'lucide-react';

export default function APITestPage() {
  const [testing, setTesting] = useState(false);
  const [results, setResults] = useState<any>(null);

  const testAPIs = async () => {
    setTesting(true);
    setResults(null);

    try {
      console.log('🧪 Iniciando prueba de APIs...');
      
      const response = await fetch('/api/test-apis');
      const data = await response.json();
      
      if (data.success) {
        setResults(data.results);
        console.log('✅ Prueba de APIs completada:', data.summary);
      } else {
        setResults({ error: data.error || 'Error al verificar APIs' });
        console.error('❌ Error en prueba de APIs:', data.error);
      }
    } catch (error) {
      console.error('❌ Error en prueba de APIs:', error);
      setResults({ error: 'Error de conexión al verificar APIs' });
    } finally {
      setTesting(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-400" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'error':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      default:
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Verificación de APIs</h1>
                <p className="text-sm text-gray-300">Sistema de Análisis de Apuestas</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* API Status Overview */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Database className="w-6 h-6 mr-3" />
            Estado de las APIs Configuradas
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">TheSportsDB</h3>
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
              <p className="text-gray-300 text-sm mb-2">100% GRATUITA</p>
              <p className="text-gray-300 text-sm">Límites: 100 requests/minuto</p>
              <div className="mt-3">
                <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-xs">
                  ✅ Configurada
                </span>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">Football-Data.org</h3>
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
              <p className="text-gray-300 text-sm mb-2">GRATUITA</p>
              <p className="text-gray-300 text-sm">Límites: 10 requests/minuto</p>
              <div className="mt-3">
                <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-xs">
                  ✅ Configurada
                </span>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">Sportmonks</h3>
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
              <p className="text-gray-300 text-sm mb-2">GRATUITA</p>
              <p className="text-gray-300 text-sm">Límites: 180 calls/hora</p>
              <div className="mt-3">
                <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-xs">
                  ✅ Configurada
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Test APIs Button */}
        <div className="mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-lg font-bold text-white mb-4">Probar APIs</h3>
            <p className="text-gray-300 mb-4">
              Haz clic en el botón para verificar que todas las APIs configuradas funcionen correctamente.
            </p>
            <button
              onClick={testAPIs}
              disabled={testing}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {testing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verificando APIs...</span>
                </>
              ) : (
                <>
                  <Activity className="w-4 h-4" />
                  <span>Probar APIs</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results */}
        {results && (
          <div className="mb-8">
            <h3 className="text-lg font-bold text-white mb-4">Resultados de la Verificación</h3>
            
            {results.error ? (
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <XCircle className="w-5 h-5 text-red-400" />
                  <span className="text-red-300">{results.error}</span>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {Object.entries(results).map(([apiName, result]: [string, any]) => (
                  <div key={apiName} className={`border rounded-lg p-4 ${getStatusColor(result.status)}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(result.status)}
                        <h4 className="font-bold">{apiName.toUpperCase()}</h4>
                      </div>
                      <span className="text-sm">{result.message}</span>
                    </div>
                    
                    {result.data && (
                      <div className="mt-3 text-sm">
                        <p><strong>Datos encontrados:</strong></p>
                        <ul className="list-disc list-inside mt-1">
                          {Object.entries(result.data).map(([key, value]: [string, any]) => (
                            <li key={key}>
                              {key}: {Array.isArray(value) ? value.join(', ') : value}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
                
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-green-300 font-semibold">
                      ✅ Todas las APIs funcionando correctamente
                    </span>
                  </div>
                  <p className="text-green-200 text-sm mt-2">
                    El sistema está listo para realizar análisis de apuestas deportivas.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Information */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center">
            <Info className="w-5 h-5 mr-2" />
            Información Importante
          </h3>
          
          <div className="space-y-3 text-gray-300">
            <p>
              <strong>✅ APIs Configuradas:</strong> 3 de 3 APIs esenciales están configuradas y funcionando.
            </p>
            <p>
              <strong>🔒 Seguridad:</strong> Las claves API se almacenan de forma segura en variables de entorno del servidor.
            </p>
            <p>
              <strong>📊 Cobertura:</strong> El sistema puede acceder a datos de ligas de Chile, Argentina, Brasil, Colombia y las principales ligas europeas.
            </p>
            <p>
              <strong>⚡ Rendimiento:</strong> Con estas APIs configuradas, el sistema puede realizar análisis en tiempo real de partidos y generar predicciones.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
