// APIs Esenciales para el Sistema de Análisis de Apuestas
// Solo las APIs que realmente necesitas para funcionar

export const ESSENTIAL_APIS = {
  // 1. TheSportsDB - PRINCIPAL (100% GRATUITA)
  theSportsDB: {
    name: 'TheSportsDB',
    baseUrl: 'https://www.thesportsdb.com/api/v1/json',
    key: process.env.THE_SPORTS_DB_KEY || '',
    limits: {
      daily: 'Unlimited',
      minute: 100
    },
    features: [
      'Logos de equipos',
      'Fotos de jugadores', 
      'Detalles de estadios',
      'Resultados históricos',
      'Ligas globales'
    ],
    coverage: [
      'Chile: Primera División',
      'Argentina: Liga Profesional',
      'Brasil: Brasileirão',
      'Colombia: Primera A',
      'Premier League',
      'Bundesliga',
      'La Liga',
      'Serie A'
    ],
    registrationUrl: 'https://www.thesportsdb.com/',
    status: 'essential',
    priority: 'critical',
    note: '✅ 100% GRATUITA - Sin límites diarios - FÁCIL REGISTRO'
  },

  // 2. Football-Data.org - SECUNDARIA (GRATUITA)
  footballData: {
    name: 'Football-Data.org',
    baseUrl: 'https://api.football-data.org/v4',
    key: process.env.FOOTBALL_DATA_KEY || '',
    limits: {
      daily: 14400, // 10 requests/minuto * 1440 minutos
      minute: 10
    },
    features: [
      'Competiciones europeas',
      'Fixtures, tablas, alineaciones',
      'Datos verificados',
      'Acceso gratuito permanente'
    ],
    coverage: [
      'Premier League',
      'Bundesliga', 
      'La Liga',
      'Serie A',
      'Ligue 1',
      'Champions League'
    ],
    registrationUrl: 'https://www.football-data.org/',
    status: 'essential',
    priority: 'high',
    note: '✅ GRATUITA - Acceso permanente - FÁCIL REGISTRO'
  },

  // 3. Sportmonks - OPCIONAL (GRATUITA)
  sportmonks: {
    name: 'Sportmonks',
    baseUrl: 'https://api.sportmonks.com/v3/football',
    key: process.env.SPORTMONKS_KEY || '',
    limits: {
      daily: 4320, // 180 calls/hora * 24 horas
      hour: 180
    },
    features: [
      'Ligas especializadas',
      'Cricket completo',
      'Sin costos ocultos',
      'Plan gratuito permanente'
    ],
    coverage: [
      'Ligas escocesas',
      'Ligas danesas',
      'Cricket',
      'Fútbol global'
    ],
    registrationUrl: 'https://www.sportmonks.com/',
    status: 'optional',
    priority: 'medium',
    note: '✅ GRATUITA - Sin costos ocultos - FÁCIL REGISTRO'
  }
};

// APIs que NO necesitas (eliminadas)
export const REMOVED_APIS = {
  entitySports: {
    name: 'Entity Sports',
    reason: 'Formato de registro complicado - NO ES NECESARIA',
    alternative: 'TheSportsDB + Football-Data.org son suficientes',
    status: 'removed'
  },
  mySportsFeeds: {
    name: 'MySportsFeeds',
    reason: 'Solo para ligas norteamericanas - NO ES NECESARIA',
    alternative: 'TheSportsDB cubre todo lo necesario',
    status: 'removed'
  }
};

// Configuración mínima para .env.local
export const MINIMAL_ENV_CONFIG = `
# Base de Datos SQLite
DATABASE_URL="file:./dev.db"

# APIs ESENCIALES (Solo estas necesitas)
# 1. TheSportsDB - PRINCIPAL (100% GRATUITA)
THE_SPORTS_DB_KEY="tu_clave_de_thesportsdb_aqui"

# 2. Football-Data.org - SECUNDARIA (GRATUITA)
FOOTBALL_DATA_KEY="tu_clave_de_football_data_aqui"

# 3. Sportmonks - OPCIONAL (GRATUITA)
SPORTMONKS_KEY="tu_clave_de_sportmonks_aqui"

# APIs NO NECESARIAS (Eliminadas)
# ENTITY_SPORTS_KEY="no_necesaria"
# MYSPORTSFEEDS_KEY="no_necesaria"

# Configuración del Sistema
NODE_ENV="development"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="Predictor IA"
`;

// Función para verificar APIs esenciales
export function getEssentialAPIs() {
  return Object.values(ESSENTIAL_APIS).filter(api => api.status === 'essential');
}

// Función para verificar APIs opcionales
export function getOptionalAPIs() {
  return Object.values(ESSENTIAL_APIS).filter(api => api.status === 'optional');
}


