// Configuración del Sistema de Análisis de Apuestas Deportivas
// Este archivo debe ser consultado antes de cualquier desarrollo

export const SPORTS_BETTING_CONFIG = {
  // OBJETIVO PRINCIPAL
  objective: "Sistema de análisis de eventos de fútbol pre-partido con base de datos propia",
  
  // REGLA CRÍTICA DE PROBABILIDAD
  criticalRule: {
    description: "NO recomendar ganador del partido a menos que probabilidad sea superior a 85%",
    minProbability: 0.85,
    applyTo: ["Resultado Final (1X2)"]
  },

  // LIGAS Y TORNEOS A MONITOREAR
  leagues: {
    southAmerica: [
      "Argentina: Torneo Betano (Liga Profesional)",
      "Argentina: Copa Argentina", 
      "Bolivia: División Profesional",
      "Brasil: Brasileirão Serie A",
      "Brasil: Brasileirão Serie B",
      "Brasil: Copa betano do Brasil",
      "Chile: Liga de primera",
      "Chile: Copa Chile",
      "Colombia: Primera A",
      "Colombia: Copa Colombia",
      "Ecuador: Liga Pro Serie A",
      "Ecuador: Copa Ecuador",
      "Paraguay: Primera División",
      "Perú: Liga 1 (Primera División)",
      "Uruguay: Primera División"
    ],
    northAmerica: [
      "Concacaf: Clubs Leagues Cup",
      "Liga MX",
      "Liga MLS",
      "Copa Mexico"
    ],
    europe: [
      "Champions League",
      "Premier League",
      "Bundesliga",
      "Ligue 1",
      "Liga de Italia",
      "Liga de España",
      "Liga de Holanda",
      "Liga de Portugal",
      "Liga de Bélgica",
      "Liga de Escocia",
      "Liga de Dinamarca",
      "Liga de Grecia",
      "FA Cup",
      "Copa Italia",
      "Copa Holanda",
      "Copa Alemania"
    ]
  },

  // MERCADOS DE APUESTAS
  bettingMarkets: {
    resultMarkets: [
      "Resultado Final (1X2)",
      "Apuesta Sin Empate (Draw No Bet)",
      "Doble Oportunidad",
      "Resultado al Descanso",
      "Gana Cualquiera de los Tiempos",
      "Equipo Gana Ambos Tiempos",
      "Margen de Victoria"
    ],
    goalMarkets: [
      "Más/Menos de 1.5 Goles",
      "Más/Menos de 2.5 Goles", 
      "Más/Menos de 3.5 Goles",
      "Más/Menos de 1.5 Goles por Equipo",
      "Más/Menos de 2.5 Goles por Equipo",
      "Ambos Equipos Anotan (Sí/No)",
      "Ambos Equipos Anotan en Primer Tiempo",
      "Equipo Anota en Ambos Tiempos",
      "Total de Goles Exacto",
      "Más de 0.5 Goles en Primer Tiempo",
      "Gol entre 00:00-15:00",
      "Gol entre 15:00-30:00",
      "Gol entre 30:00-45:00"
    ],
    handicapMarkets: [
      "Hándicap Asiático Partido Completo",
      "Hándicap Europeo Partido Completo",
      "Hándicap Asiático Primer Tiempo",
      "Hándicap Europeo Primer Tiempo"
    ],
    cardMarkets: [
      "Total de Tarjetas (Más/Menos)",
      "Competición de Tarjetas",
      "Total de Tarjetas Rojas",
      "Primera Tarjeta antes de 26:00",
      "Rango de Tarjetas"
    ],
    cornerMarkets: [
      "Total de Córners (Más/Menos)",
      "Competición de Córners",
      "Hándicap de Córners"
    ],
    statisticsMarkets: [
      "Tiros a Portería (Más/Menos)",
      "Posesión del Balón",
      "Tiros Totales",
      "Faltas Cometidas"
    ]
  },

  // FUENTES DE DATOS
  dataSources: {
    primary: [
      "https://www.betano.com/",
      "https://www.sofascore.com/",
      "https://www.whoscored.com/",
      "https://es.soccerway.com/",
      "https://www.resultados-futbol.com/",
      "https://www.flashscore.cl/",
      "https://www.flashscore.com/"
    ],
    secondary: [
      "https://www.bdfutbol.com/en/index.html",
      "https://footballdatabase.com/",
      "https://www.transfermarkt.com/",
      "https://footystats.org/",
      "https://fbref.com/en/",
      "https://oddspedia.com/",
      "https://scores24.live/en",
      "https://www.footballdatabase.eu/es/",
      "https://fcstats.com/"
    ],
    specialized: [
      "https://www.thepunterspage.com/kickform/es/"
    ]
  },

  // APIS GRATUITAS DISPONIBLES
  freeAPIs: {
    apiFootball: {
      url: "https://api-football.com/",
      limits: "100 requests/día, 10 requests/minuto",
      coverage: "+1,100 ligas, datos en tiempo real cada 15 segundos",
      endpoints: ["temporadas", "equipos", "jugadores", "partidos", "clasificaciones", "cuotas"],
      cost: "Gratuito permanente"
    },
    theSportsDB: {
      url: "https://www.thesportsdb.com/",
      limits: "100 requests/minuto con clave personal ($1/mes Patreon)",
      coverage: "Deportes mainstream y nicho",
      includes: ["logos de equipos", "fotos de jugadores", "detalles de estadios"],
      cost: "Gratuito con límites"
    },
    footballData: {
      url: "https://www.football-data.org/",
      limits: "10 requests/minuto (plan gratuito)",
      coverage: "Competiciones principales europeas",
      includes: ["fixtures", "tablas", "alineaciones"],
      cost: "Gratuito permanente"
    }
  },

  // ESTRUCTURA DE BASE DE DATOS
  databaseSchema: {
    tables: {
      leagues: "Información de ligas y competiciones",
      teams: "Equipos con estadísticas históricas", 
      matches: "Partidos con resultados y métricas",
      predictions: "Predicciones generadas con confianza",
      users: "Gestión de usuarios y suscripciones",
      tipsters: "Perfiles de analistas con track record",
      odds: "Cuotas de diferentes casas de apuestas",
      statistics: "Estadísticas detalladas de partidos"
    }
  },

  // ALGORITMOS DE ANÁLISIS
  analysisAlgorithms: {
    preMatch: {
      description: "Análisis pre-partido basado en estadísticas históricas",
      factors: [
        "Forma reciente de equipos",
        "Estadísticas head-to-head",
        "Rendimiento en casa/fuera",
        "Lesiones y suspensiones",
        "Motivación y contexto"
      ]
    },
    probability: {
      description: "Cálculo de probabilidades para cada mercado",
      methods: [
        "Análisis estadístico histórico",
        "Modelos de machine learning",
        "Análisis de tendencias",
        "Factores contextuales"
      ]
    }
  },

  // CRITERIOS DE RECOMENDACIÓN
  recommendationCriteria: {
    highConfidence: {
      minProbability: 0.85,
      markets: ["Resultado Final (1X2)"],
      description: "Solo recomendar si probabilidad > 85%"
    },
    mediumConfidence: {
      minProbability: 0.70,
      markets: ["Más/Menos Goles", "Ambos Equipos Anotan", "Hándicap"],
      description: "Recomendar si probabilidad > 70%"
    },
    lowConfidence: {
      minProbability: 0.60,
      markets: ["Tarjetas", "Córners", "Estadísticas"],
      description: "Recomendar si probabilidad > 60%"
    }
  }
};

// Función para verificar si una recomendación cumple con los criterios
export function validateRecommendation(market: string, probability: number): boolean {
  const config = SPORTS_BETTING_CONFIG;
  
  if (config.criticalRule.applyTo.includes(market)) {
    return probability >= config.criticalRule.minProbability;
  }
  
  // Verificar otros criterios según el mercado
  if (config.recommendationCriteria.highConfidence.markets.includes(market)) {
    return probability >= config.recommendationCriteria.highConfidence.minProbability;
  }
  
  if (config.recommendationCriteria.mediumConfidence.markets.includes(market)) {
    return probability >= config.recommendationCriteria.mediumConfidence.minProbability;
  }
  
  if (config.recommendationCriteria.lowConfidence.markets.includes(market)) {
    return probability >= config.recommendationCriteria.lowConfidence.minProbability;
  }
  
  return false;
}

// Función para obtener todas las ligas a monitorear
export function getAllLeagues(): string[] {
  const config = SPORTS_BETTING_CONFIG;
  return [
    ...config.leagues.southAmerica,
    ...config.leagues.northAmerica,
    ...config.leagues.europe
  ];
}

// Función para obtener todos los mercados disponibles
export function getAllMarkets(): string[] {
  const config = SPORTS_BETTING_CONFIG;
  return [
    ...config.bettingMarkets.resultMarkets,
    ...config.bettingMarkets.goalMarkets,
    ...config.bettingMarkets.handicapMarkets,
    ...config.bettingMarkets.cardMarkets,
    ...config.bettingMarkets.cornerMarkets,
    ...config.bettingMarkets.statisticsMarkets
  ];
}


