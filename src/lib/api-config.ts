// Configuración Completa de APIs para el Sistema de Análisis de Apuestas
// Basado en los planes detallados proporcionados

export const API_CONFIG = {
  // API-Football (Principal - 100 requests/día)
  apiFootball: {
    name: 'API-Football',
    baseUrl: 'https://v3.football.api-sports.io',
    key: process.env.API_FOOTBALL_KEY || '',
    limits: {
      daily: 100,
      minute: 10
    },
    features: [
      '+1,100 ligas',
      'Datos en tiempo real cada 15 segundos',
      'Temporadas, equipos, jugadores, partidos',
      'Clasificaciones, cuotas pre-partido',
      'Sin tarjeta de crédito requerida'
    ],
    coverage: [
      'Chile: Primera División',
      'Argentina: Liga Profesional',
      'Brasil: Brasileirão Serie A',
      'Colombia: Primera A',
      'Premier League',
      'Bundesliga',
      'La Liga',
      'Serie A',
      'Ligue 1'
    ]
  },

  // TheSportsDB (100 requests/minuto)
  theSportsDB: {
    name: 'TheSportsDB',
    baseUrl: 'https://www.thesportsdb.com/api/v1/json',
    key: process.env.THE_SPORTS_DB_KEY || '',
    limits: {
      daily: 144000, // 100 requests/minuto * 1440 minutos
      minute: 100
    },
    features: [
      'Logos de equipos',
      'Fotos de jugadores',
      'Detalles de estadios',
      'Cobertura global',
      'Datos históricos'
    ],
    cost: '$1/mes Patreon para clave personal'
  },

  // Football-Data.org (10 requests/minuto)
  footballData: {
    name: 'Football-Data.org',
    baseUrl: 'https://api.football-data.org/v4',
    key: process.env.FOOTBALL_DATA_KEY || '',
    limits: {
      daily: 14400, // 10 requests/minuto * 1440 minutos
      minute: 10
    },
    features: [
      'Competiciones principales europeas',
      'Fixtures, tablas, alineaciones',
      'Acceso gratuito permanente',
      'Datos verificados'
    ]
  },

  // Sportmonks (180 calls/hora)
  sportmonks: {
    name: 'Sportmonks',
    baseUrl: 'https://api.sportmonks.com/v3/football',
    key: process.env.SPORTMONKS_KEY || '',
    limits: {
      daily: 4320, // 180 calls/hora * 24 horas
      hour: 180
    },
    features: [
      'Ligas escocesas, danesas',
      'Cricket completo',
      'Sin costos ocultos',
      'Plan gratuito permanente'
    ]
  },

  // MySportsFeeds (Acceso gratuito no comercial)
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
      'Alta precisión de datos verificados'
    ],
    note: 'Acceso gratuito no comercial bajo solicitud'
  },

  // Entity Sports (Sandbox de desarrollo)
  entitySports: {
    name: 'Entity Sports',
    baseUrl: 'https://rest.entitysport.com/v2',
    key: process.env.ENTITY_SPORTS_KEY || '',
    limits: {
      daily: 'Sandbox de desarrollo',
      minute: 'Limitado'
    },
    features: [
      'Datos históricos de temporadas completadas',
      'Cricket, fútbol, basketball',
      'Ideal para proof-of-concept y testing'
    ]
  },

  // RapidAPI Sports Hub
  rapidAPI: {
    name: 'RapidAPI Sports Hub',
    baseUrl: 'https://api-sports.p.rapidapi.com',
    key: process.env.RAPIDAPI_KEY || '',
    limits: {
      daily: 'Variable por API',
      minute: 'Variable'
    },
    features: [
      'Marketplace centralizado',
      'Docenas de APIs deportivas',
      'Testing múltiple sin cuentas separadas',
      '100-500 requests/día típicamente'
    ]
  }
};

// Configuración de fuentes de datos históricos
export const HISTORICAL_DATA_SOURCES = {
  footyStats: {
    name: 'FootyStats',
    description: 'CSV y Excel gratuitos',
    access: 'Premier League CSVs gratuitos sin registro',
    coverage: 'Temporadas desde 2006/2007',
    content: 'Estadísticas de equipos, partidos, jugadores',
    format: 'Team CSV (básico) y Team Pt.2 CSV (avanzado)',
    url: 'https://footystats.org/'
  },

  footballDataCoUk: {
    name: 'Football-Data.co.uk',
    description: 'Base histórica completa',
    access: 'Todos los datos ahora GRATUITOS',
    coverage: '22 divisiones de 11 países',
    update: 'Dos veces por semana',
    format: 'CSV/Excel compatibles',
    historical: 'Desde temporada 1993/94',
    url: 'https://www.football-data.co.uk/'
  },

  kaggle: {
    name: 'Kaggle Datasets',
    description: 'Repositorio masivo',
    datasets: [
      {
        name: 'European Soccer Database',
        downloads: '253K descargas',
        size: 'SQLite 34MB'
      },
      {
        name: 'International Football Results 1872-2025',
        downloads: '120K descargas'
      },
      {
        name: 'Football Data from Transfermarkt',
        downloads: '51.5K descargas',
        size: '173MB'
      },
      {
        name: 'Premier League 2016-2025',
        format: 'Múltiples formatos'
      }
    ],
    url: 'https://www.kaggle.com/datasets'
  },

  footballCSV: {
    name: 'Football.CSV',
    description: 'Formato estándar abierto',
    source: 'GitHub: Repositorios organizados por país/liga',
    format: 'CSV estándar con estructura consistente',
    coverage: 'Inglaterra, Alemania, España, Champions League',
    license: 'Dominio público',
    url: 'https://github.com/footballcsv'
  },

  openFootball: {
    name: 'OpenFootball',
    description: 'Schema de base de datos libre',
    format: 'Datasets planos en múltiples lenguajes',
    structure: 'Teams, matches, tournaments organizados',
    usage: 'Integración directa en bases de datos SQL',
    url: 'https://github.com/openfootball'
  }
};

// Configuración de ligas prioritarias
export const PRIORITY_LEAGUES = {
  southAmerica: [
    'Argentina: Torneo Betano (Liga Profesional)',
    'Argentina: Copa Argentina',
    'Bolivia: División Profesional',
    'Brasil: Brasileirão Serie A',
    'Brasil: Brasileirão Serie B',
    'Brasil: Copa betano do Brasil',
    'Chile: Liga de primera',
    'Chile: Copa Chile',
    'Colombia: Primera A',
    'Colombia: Copa Colombia',
    'Ecuador: Liga Pro Serie A',
    'Ecuador: Copa Ecuador',
    'Paraguay: Primera División',
    'Perú: Liga 1 (Primera División)',
    'Uruguay: Primera División'
  ],
  northAmerica: [
    'Concacaf: Clubs Leagues Cup',
    'Liga MX',
    'Liga MLS',
    'Copa Mexico'
  ],
  europe: [
    'Champions League',
    'Premier League',
    'Bundesliga',
    'Ligue 1',
    'Liga de Italia',
    'Liga de España',
    'Liga de Holanda',
    'Liga de Portugal',
    'Liga de Bélgica',
    'Liga de Escocia',
    'Liga de Dinamarca',
    'Liga de Grecia',
    'FA Cup',
    'Copa Italia',
    'Copa Holanda',
    'Copa Alemania'
  ]
};

// Configuración de monetización
export const MONETIZATION_CONFIG = {
  subscriptionPlans: {
    pro: {
      name: 'Pro',
      price: 19.99,
      currency: 'EUR',
      period: 'month',
      features: [
        'Predicciones con IA para mercados avanzados',
        'Análisis detallados con estadísticas xG',
        'Alerts personalizadas por WhatsApp/Telegram',
        'Acceso completo a datos históricos',
        'Herramientas avanzadas de análisis'
      ]
    },
    expert: {
      name: 'Expert',
      price: 39.99,
      currency: 'EUR',
      period: 'month',
      features: [
        'Predicciones en vivo durante partidos',
        'Modelos predictivos personalizados',
        'Arbitraje de apuestas automático',
        'API access para desarrolladores',
        'Consultoría personalizada mensual'
      ]
    },
    vip: {
      name: 'VIP',
      price: 99.99,
      currency: 'EUR',
      period: 'quarter',
      features: [
        'Acceso a todos los mercados y deportes',
        'Predicciones exclusivas de tipsters verificados',
        'Beta testing de nuevas funcionalidades',
        'Descuentos en partners',
        'Soporte prioritario 24/7'
      ]
    }
  },
  
  revenueProjections: {
    subscriptions: {
      percentage: 70,
      description: 'Ingresos por suscripciones premium'
    },
    affiliates: {
      percentage: 20,
      description: 'Marketing de afiliados a casas de apuestas'
    },
    advertising: {
      percentage: 7,
      description: 'Publicidad contextual y patrocinios'
    },
    digitalProducts: {
      percentage: 3,
      description: 'E-books, cursos y software'
    }
  }
};

// Función para obtener configuración de API
export function getAPIConfig(apiName: keyof typeof API_CONFIG) {
  return API_CONFIG[apiName];
}

// Función para verificar límites de API
export function checkAPILimits(apiName: keyof typeof API_CONFIG, requestsUsed: number) {
  const config = API_CONFIG[apiName];
  const dailyLimit = config.limits.daily;
  
  if (typeof dailyLimit === 'number') {
    return {
      canMakeRequest: requestsUsed < dailyLimit,
      remainingRequests: dailyLimit - requestsUsed,
      percentageUsed: (requestsUsed / dailyLimit) * 100
    };
  }
  
  return {
    canMakeRequest: true,
    remainingRequests: 'Unlimited',
    percentageUsed: 0
  };
}

// Función para obtener todas las ligas prioritarias
export function getAllPriorityLeagues(): string[] {
  return [
    ...PRIORITY_LEAGUES.southAmerica,
    ...PRIORITY_LEAGUES.northAmerica,
    ...PRIORITY_LEAGUES.europe
  ];
}


