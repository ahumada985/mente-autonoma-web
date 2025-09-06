'use client';

import { useState } from 'react';
import { 
  Settings, 
  Key, 
  Database, 
  Globe, 
  CheckCircle, 
  AlertCircle,
  Copy,
  Eye,
  EyeOff
} from 'lucide-react';

export default function ConfigPage() {
  const [showKeys, setShowKeys] = useState(false);
  const [apiKeys, setApiKeys] = useState({
    apiFootball: '',
    theSportsDB: '',
    footballData: '',
    sportmonks: '',
    mySportsFeeds: '',
    entitySports: '',
    rapidAPI: ''
  });

  const apiConfigs = [
    {
      name: 'API-Football',
      description: 'Principal - 100 requests/día, 10 requests/minuto',
      features: ['+1,100 ligas', 'Datos en tiempo real', 'Sin tarjeta de crédito'],
      coverage: ['Chile', 'Argentina', 'Brasil', 'Colombia', 'Premier League', 'Bundesliga'],
      key: 'apiFootball',
      status: 'active',
      priority: 'high'
    },
    {
      name: 'TheSportsDB',
      description: '100 requests/minuto - Logos y fotos de equipos',
      features: ['Logos de equipos', 'Fotos de jugadores', 'Detalles de estadios'],
      coverage: ['Cobertura global', 'Datos históricos'],
      key: 'theSportsDB',
      status: 'active',
      priority: 'high'
    },
    {
      name: 'Football-Data.org',
      description: '10 requests/minuto - Competiciones europeas',
      features: ['Fixtures, tablas', 'Alineaciones', 'Acceso gratuito permanente'],
      coverage: ['Premier League', 'Bundesliga', 'La Liga', 'Serie A'],
      key: 'footballData',
      status: 'active',
      priority: 'medium'
    },
    {
      name: 'Sportmonks',
      description: '180 calls/hora - Ligas especializadas',
      features: ['Ligas escocesas, danesas', 'Cricket completo', 'Sin costos ocultos'],
      coverage: ['Ligas especializadas', 'Cricket'],
      key: 'sportmonks',
      status: 'active',
      priority: 'medium'
    },
    {
      name: 'MySportsFeeds',
      description: 'Acceso gratuito no comercial',
      features: ['NFL, NBA, MLB, NHL', 'Formatos: JSON, XML, CSV'],
      coverage: ['Ligas norteamericanas'],
      key: 'mySportsFeeds',
      status: 'pending',
      priority: 'low'
    },
    {
      name: 'Entity Sports',
      description: 'Sandbox de desarrollo',
      features: ['Datos históricos', 'Cricket, fútbol, basketball'],
      coverage: ['Desarrollo y testing'],
      key: 'entitySports',
      status: 'pending',
      priority: 'low'
    },
    {
      name: 'RapidAPI Sports Hub',
      description: 'Marketplace centralizado',
      features: ['Docenas de APIs deportivas', 'Testing múltiple'],
      coverage: ['Múltiples deportes'],
      key: 'rapidAPI',
      status: 'pending',
      priority: 'low'
    }
  ];

  const historicalSources = [
    {
      name: 'FootyStats',
      description: 'CSV y Excel gratuitos',
      coverage: 'Temporadas desde 2006/2007',
      format: 'CSV',
      status: 'available'
    },
    {
      name: 'Football-Data.co.uk',
      description: 'Base histórica completa',
      coverage: '22 divisiones de 11 países',
      format: 'CSV/Excel',
      status: 'available'
    },
    {
      name: 'Kaggle Datasets',
      description: 'Repositorio masivo',
      coverage: 'European Soccer Database, International Results',
      format: 'CSV/SQLite',
      status: 'available'
    },
    {
      name: 'Football.CSV',
      description: 'Formato estándar abierto',
      coverage: 'Inglaterra, Alemania, España, Champions League',
      format: 'CSV',
      status: 'available'
    },
    {
      name: 'OpenFootball',
      description: 'Schema de base de datos libre',
      coverage: 'Teams, matches, tournaments organizados',
      format: 'Multiple',
      status: 'available'
    }
  ];

  const handleKeyChange = (key: string, value: string) => {
    setApiKeys(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'pending': return 'text-yellow-400';
      case 'error': return 'text-red-400';
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Configuración de APIs</h1>
                <p className="text-sm text-gray-300">Sistema de Análisis de Apuestas</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowKeys(!showKeys)}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
              >
                {showKeys ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span>{showKeys ? 'Ocultar' : 'Mostrar'} Claves</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* API Configuration */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Key className="w-6 h-6 mr-3" />
            Configuración de APIs Gratuitas
          </h2>
          
          <div className="grid gap-6">
            {apiConfigs.map((api, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-bold text-white">{api.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(api.priority)}`}>
                        {api.priority.toUpperCase()}
                      </span>
                      <span className={`flex items-center space-x-1 ${getStatusColor(api.status)}`}>
                        {api.status === 'active' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                        <span className="text-sm">{api.status}</span>
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
                
                <div className="mt-4">
                  <label className="block text-white font-semibold mb-2">
                    Clave API:
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type={showKeys ? 'text' : 'password'}
                      value={apiKeys[api.key as keyof typeof apiKeys]}
                      onChange={(e) => handleKeyChange(api.key, e.target.value)}
                      placeholder={`Ingresa tu clave de ${api.name}`}
                      className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={() => copyToClipboard(apiKeys[api.key as keyof typeof apiKeys])}
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

        {/* Historical Data Sources */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Database className="w-6 h-6 mr-3" />
            Fuentes de Datos Históricos
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {historicalSources.map((source, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white">{source.name}</h3>
                  <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-xs">
                    {source.status}
                  </span>
                </div>
                <p className="text-gray-300 text-sm mb-3">{source.description}</p>
                <div className="space-y-2">
                  <div>
                    <span className="text-white font-semibold text-sm">Cobertura:</span>
                    <p className="text-gray-300 text-sm">{source.coverage}</p>
                  </div>
                  <div>
                    <span className="text-white font-semibold text-sm">Formato:</span>
                    <p className="text-gray-300 text-sm">{source.format}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Configuration Instructions */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Globe className="w-6 h-6 mr-3" />
            Instrucciones de Configuración
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-3">1. Crear archivo .env.local</h3>
              <div className="bg-black/20 rounded-lg p-4">
                <pre className="text-gray-300 text-sm overflow-x-auto">
{`# Base de Datos
DATABASE_URL="file:./dev.db"

# APIs Principales
API_FOOTBALL_KEY="tu_clave_aqui"
THE_SPORTS_DB_KEY="tu_clave_aqui"
FOOTBALL_DATA_KEY="tu_clave_aqui"

# APIs Secundarias
SPORTMONKS_KEY="tu_clave_aqui"
MYSPORTSFEEDS_KEY="tu_clave_aqui"
ENTITY_SPORTS_KEY="tu_clave_aqui"
RAPIDAPI_KEY="tu_clave_aqui"`}
                </pre>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-white mb-3">2. Obtener Claves API</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-red-500/20 text-red-300 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <p className="text-white font-semibold">API-Football (Prioridad Alta)</p>
                    <p className="text-gray-300 text-sm">Regístrate en <a href="https://rapidapi.com/api-sports/api/api-football" className="text-blue-400 hover:underline">RapidAPI</a> - Plan gratuito: 100 requests/día</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-red-500/20 text-red-300 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <p className="text-white font-semibold">TheSportsDB (Prioridad Alta)</p>
                    <p className="text-gray-300 text-sm">Regístrate en <a href="https://www.thesportsdb.com/" className="text-blue-400 hover:underline">TheSportsDB</a> - Plan gratuito: 100 requests/minuto</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-yellow-500/20 text-yellow-300 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <p className="text-white font-semibold">Football-Data.org (Prioridad Media)</p>
                    <p className="text-gray-300 text-sm">Regístrate en <a href="https://www.football-data.org/" className="text-blue-400 hover:underline">Football-Data.org</a> - Plan gratuito: 10 requests/minuto</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-white mb-3">3. Inicializar Base de Datos</h3>
              <div className="bg-black/20 rounded-lg p-4">
                <pre className="text-gray-300 text-sm">
{`# Ejecutar en terminal
npm run dev
# Luego acceder a http://localhost:3000/config`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


