// APIs Gratuitas que SÍ Funcionan en 2024
// Reemplazo para API-Football que eliminó su plan gratuito

export const WORKING_FREE_APIS = {
  // 1. TheSportsDB - 100% GRATUITA
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
    status: 'active',
    priority: 'high'
  },

  // 2. Football-Data.org - GRATUITA
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
    status: 'active',
    priority: 'high'
  },

  // 3. Sportmonks - GRATUITA
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
    status: 'active',
    priority: 'medium'
  },

  // 4. MySportsFeeds - GRATUITA (No comercial)
  mySportsFeeds: {
    name: 'MySportsFeeds',
    baseUrl: 'https://api.mysportsfeeds.com/v2.1/pull',
    key: process.env.MYSPORTSFEEDS_KEY || '',
    limits: {
      daily: 'No comercial bajo solicitud',
      minute: 'Variable'
    },
    features: [
      'NFL, NBA, MLB, NHL',
      'Formatos: JSON, XML, CSV',
      'Alta precisión de datos'
    ],
    coverage: [
      'Ligas norteamericanas',
      'Datos históricos'
    ],
    registrationUrl: 'https://www.mysportsfeeds.com/',
    status: 'active',
    priority: 'low'
  },

  // 5. Entity Sports - GRATUITA (Sandbox)
  entitySports: {
    name: 'Entity Sports',
    baseUrl: 'https://rest.entitysport.com/v2',
    key: process.env.ENTITY_SPORTS_KEY || '',
    limits: {
      daily: 'Sandbox de desarrollo',
      minute: 'Limitado'
    },
    features: [
      'Datos históricos',
      'Cricket, fútbol, basketball',
      'Ideal para testing'
    ],
    coverage: [
      'Desarrollo y testing',
      'Datos históricos'
    ],
    registrationUrl: 'https://entitysport.com/',
    status: 'active',
    priority: 'low'
  }
};

// APIs que NO necesitas (eliminadas o no funcionan)
export const REMOVED_APIS = {
  apiFootball: {
    name: 'API-Football',
    reason: 'Eliminó plan gratuito en 2024',
    alternative: 'TheSportsDB + Football-Data.org',
    status: 'removed'
  },
  rapidAPI: {
    name: 'RapidAPI Sports Hub',
    reason: 'Requiere pago para APIs deportivas',
    alternative: 'APIs directas gratuitas',
    status: 'removed'
  }
};

// Configuración actualizada para .env.local
export const UPDATED_ENV_CONFIG = `
# Base de Datos SQLite
DATABASE_URL="file:./dev.db"

# APIs GRATUITAS QUE SÍ FUNCIONAN (2024)
# 1. TheSportsDB - 100% GRATUITA
THE_SPORTS_DB_KEY="tu_clave_de_thesportsdb_aqui"

# 2. Football-Data.org - GRATUITA
FOOTBALL_DATA_KEY="tu_clave_de_football_data_aqui"

# 3. Sportmonks - GRATUITA
SPORTMONKS_KEY="tu_clave_de_sportmonks_aqui"

# 4. MySportsFeeds - GRATUITA (No comercial)
MYSPORTSFEEDS_KEY="tu_clave_de_mysportsfeeds_aqui"

# 5. Entity Sports - GRATUITA (Sandbox)
ENTITY_SPORTS_KEY="tu_clave_de_entity_sports_aqui"

# APIs ELIMINADAS (NO USAR)
# API_FOOTBALL_KEY="eliminado_plan_gratuito"
# RAPIDAPI_KEY="requiere_pago"

# Configuración del Sistema
NODE_ENV="development"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="Predictor IA"
`;

// Función para verificar APIs activas
export function getActiveAPIs() {
  return Object.values(WORKING_FREE_APIS).filter(api => api.status === 'active');
}

// Función para obtener APIs por prioridad
export function getAPIsByPriority(priority: 'high' | 'medium' | 'low') {
  return Object.values(WORKING_FREE_APIS).filter(api => api.priority === priority);
}


