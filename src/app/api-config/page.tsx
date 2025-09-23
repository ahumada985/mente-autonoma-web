'use client';

import { useState, useEffect } from 'react';
import { 
  Settings, 
  Key, 
  Database, 
  Globe, 
  CheckCircle, 
  AlertCircle,
  Copy,
  Eye,
  EyeOff,
  Shield,
  Lock
} from 'lucide-react';

export default function APIConfigPage() {
  const [showInstructions, setShowInstructions] = useState(true);
  const [apiStatus, setApiStatus] = useState({
    apiFootball: 'not_configured',
    theSportsDB: 'not_configured',
    footballData: 'not_configured',
    sportmonks: 'not_configured',
    mySportsFeeds: 'not_configured',
    entitySports: 'not_configured'
  });

  const apiConfigs = [
    {
      name: 'TheSportsDB',
      description: '100% GRATUITA - Logos y fotos de equipos',
      features: ['Logos de equipos', 'Fotos de jugadores', 'Detalles de estadios', 'Resultados históricos'],
      coverage: ['Chile', 'Argentina', 'Brasil', 'Colombia', 'Premier League', 'Bundesliga', 'La Liga', 'Serie A'],
      key: 'THE_SPORTS_DB_KEY',
      status: apiStatus.theSportsDB,
      priority: 'high',
      url: 'https://www.thesportsdb.com/',
      freePlan: '100 requests/minuto',
      note: '✅ 100% GRATUITA - Sin límites diarios'
    },
    {
      name: 'Football-Data.org',
      description: 'GRATUITA - Competiciones europeas',
      features: ['Fixtures, tablas', 'Alineaciones', 'Acceso gratuito permanente', 'Datos verificados'],
      coverage: ['Premier League', 'Bundesliga', 'La Liga', 'Serie A', 'Ligue 1', 'Champions League'],
      key: 'FOOTBALL_DATA_KEY',
      status: apiStatus.footballData,
      priority: 'high',
      url: 'https://www.football-data.org/',
      freePlan: '10 requests/minuto',
      note: '✅ GRATUITA - Acceso permanente'
    },
    {
      name: 'Sportmonks',
      description: 'GRATUITA - Ligas especializadas',
      features: ['Ligas escocesas, danesas', 'Cricket completo', 'Sin costos ocultos', 'Plan gratuito permanente'],
      coverage: ['Ligas especializadas', 'Cricket', 'Fútbol global'],
      key: 'SPORTMONKS_KEY',
      status: apiStatus.sportmonks,
      priority: 'medium',
      url: 'https://www.sportmonks.com/',
      freePlan: '180 calls/hora',
      note: '✅ GRATUITA - Sin costos ocultos'
    },
    {
      name: 'MySportsFeeds',
      description: 'GRATUITA - Ligas norteamericanas',
      features: ['NFL, NBA, MLB, NHL', 'Formatos: JSON, XML, CSV', 'Alta precisión de datos'],
      coverage: ['Ligas norteamericanas', 'Datos históricos'],
      key: 'MYSPORTSFEEDS_KEY',
      status: apiStatus.mySportsFeeds,
      priority: 'low',
      url: 'https://www.mysportsfeeds.com/',
      freePlan: 'No comercial bajo solicitud',
      note: '✅ GRATUITA - Acceso no comercial'
    },
    {
      name: 'Entity Sports',
      description: 'GRATUITA - Sandbox de desarrollo',
      features: ['Datos históricos', 'Cricket, fútbol, basketball', 'Ideal para testing'],
      coverage: ['Desarrollo y testing', 'Datos históricos'],
      key: 'ENTITY_SPORTS_KEY',
      status: apiStatus.entitySports,
      priority: 'low',
      url: 'https://entitysport.com/',
      freePlan: 'Sandbox de desarrollo',
      note: '✅ GRATUITA - Para desarrollo'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'configured': return 'text-green-400';
      case 'not_configured': return 'text-red-400';
      case 'error': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-300';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300';
      case 'low': return 'bg-blue-500/20 text-blue-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Configuración Segura de APIs</h1>
                <p className="text-sm text-gray-300">Sistema de Análisis de Apuestas</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-green-400">
                <Lock className="w-4 h-4" />
                <span className="text-sm">Claves Seguras</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Security Notice */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Shield className="w-5 h-5 text-green-400" />
            <div>
              <h3 className="text-green-300 font-semibold">🔒 Configuración Segura</h3>
              <p className="text-green-200 text-sm">
                Las claves API se almacenan de forma segura en variables de entorno del servidor. 
                NUNCA se exponen en el navegador del usuario.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Instructions */}
        {showInstructions && (
          <div className="mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <Key className="w-6 h-6 mr-3" />
                  Instrucciones de Configuración Segura
                </h2>
                <button
                  onClick={() => setShowInstructions(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">1. Crear archivo .env.local (SEGURO)</h3>
                  <div className="bg-black/20 rounded-lg p-4">
                    <pre className="text-gray-300 text-sm overflow-x-auto">
{`# Base de Datos
DATABASE_URL="file:./dev.db"

# APIs Principales (Prioridad Alta)
API_FOOTBALL_KEY="tu_clave_de_rapidapi_aqui"
THE_SPORTS_DB_KEY="tu_clave_de_thesportsdb_aqui"

# APIs Secundarias (Prioridad Media)
FOOTBALL_DATA_KEY="tu_clave_de_football_data_aqui"
SPORTMONKS_KEY="tu_clave_de_sportmonks_aqui"

# APIs Adicionales (Opcionales)
MYSPORTSFEEDS_KEY="tu_clave_de_mysportsfeeds_aqui"
ENTITY_SPORTS_KEY="tu_clave_de_entity_sports_aqui"
RAPIDAPI_KEY="tu_clave_de_rapidapi_aqui"`}
                    </pre>
                  </div>
                  <p className="text-gray-300 text-sm mt-2">
                    ⚠️ <strong>Importante:</strong> El archivo .env.local NO se sube a Git y es completamente seguro.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">2. Obtener Claves API</h3>
                  <div className="space-y-3">
                    {apiConfigs.map((api, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className={`w-6 h-6 ${api.priority === 'high' ? 'bg-red-500/20 text-red-300' : 'bg-yellow-500/20 text-yellow-300'} rounded-full flex items-center justify-center text-sm font-bold`}>
                          {index + 1}
                        </div>
                        <div>
                          <p className="text-white font-semibold">{api.name} ({api.priority === 'high' ? 'Prioridad Alta' : 'Prioridad Media'})</p>
                          <p className="text-gray-300 text-sm">
                            Regístrate en <a href={api.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{api.url}</a>
                          </p>
                          <p className="text-gray-300 text-sm">Plan gratuito: {api.freePlan}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">3. Reiniciar Servidor</h3>
                  <div className="bg-black/20 rounded-lg p-4">
                    <pre className="text-gray-300 text-sm">
{`# Después de agregar las claves al .env.local
# Reinicia el servidor para que tome las nuevas variables
npm run dev`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* API Configuration */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Globe className="w-6 h-6 mr-3" />
            Estado de las APIs
          </h2>
          
          <div className="grid gap-6">
            {apiConfigs.map((api, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-bold text-white">{api.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(api.priority)}`}>
                        {api.priority === 'high' ? 'ALTA PRIORIDAD' : 'MEDIA PRIORIDAD'}
                      </span>
                      <span className={`flex items-center space-x-1 ${getStatusColor(api.status)}`}>
                        {api.status === 'configured' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                        <span className="text-sm">
                          {api.status === 'configured' ? 'Configurada' : 'No Configurada'}
                        </span>
                      </span>
                    </div>
                    <p className="text-gray-300 mb-3">{api.description}</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-white font-semibold mb-2">Características:</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      {api.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <CheckCircle className="w-3 h-3 mr-2 text-green-400" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-semibold mb-2">Cobertura:</h4>
                    <div className="flex flex-wrap gap-2">
                      {api.coverage.map((item, idx) => (
                        <span key={idx} className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-black/20 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-semibold">Variable de Entorno:</p>
                      <code className="text-gray-300 text-sm">{api.key}</code>
                    </div>
                    <button
                      onClick={() => copyToClipboard(api.key)}
                      className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      <Copy className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Information */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Shield className="w-6 h-6 mr-3" />
            Información de Seguridad
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-3">✅ Por qué es Seguro:</h3>
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                  Variables de entorno del servidor
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                  Archivo .env.local no se sube a Git
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                  Claves nunca se envían al navegador
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                  Protección automática de Next.js
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-white mb-3">🔒 Buenas Prácticas:</h3>
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-center">
                  <Lock className="w-4 h-4 mr-2 text-blue-400" />
                  No compartir claves API
                </li>
                <li className="flex items-center">
                  <Lock className="w-4 h-4 mr-2 text-blue-400" />
                  Usar solo en desarrollo local
                </li>
                <li className="flex items-center">
                  <Lock className="w-4 h-4 mr-2 text-blue-400" />
                  Rotar claves periódicamente
                </li>
                <li className="flex items-center">
                  <Lock className="w-4 h-4 mr-2 text-blue-400" />
                  Monitorear uso de APIs
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
