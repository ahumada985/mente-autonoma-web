// Gestor de Fuentes de Datos - "Gran Henki Dama de Goku"
// Sistema para integrar múltiples fuentes de datos históricos y en tiempo real

export interface DataSource {
  name: string;
  type: 'api' | 'web_scraping' | 'csv' | 'database';
  url: string;
  rateLimit: {
    requests: number;
    period: 'minute' | 'hour' | 'day';
  };
  coverage: {
    leagues: string[];
    countries: string[];
    seasons: string[];
  };
  dataTypes: ('matches' | 'teams' | 'players' | 'events')[];
  priority: 'high' | 'medium' | 'low';
  status: 'active' | 'inactive' | 'maintenance';
}

export interface DataSourceResult {
  source: string;
  data: any[];
  success: boolean;
  error?: string;
  timestamp: string;
  coverage: {
    leagues: string[];
    seasons: string[];
    totalRecords: number;
  };
}

export class DataSourcesManager {
  private sources: DataSource[];

  constructor() {
    this.sources = this.initializeDataSources();
  }

  // Inicializar todas las fuentes de datos
  private initializeDataSources(): DataSource[] {
    return [
      // APIs Gratuitas
      {
        name: 'API-Football',
        type: 'api',
        url: 'https://v3.football.api-sports.io',
        rateLimit: { requests: 100, period: 'day' },
        coverage: {
          leagues: ['Premier League', 'La Liga', 'Bundesliga', 'Serie A', 'Ligue 1', 'Championship', 'La Liga 2', 'Bundesliga 2', 'Serie B', 'Ligue 2'],
          countries: ['Inglaterra', 'España', 'Alemania', 'Italia', 'Francia'],
          seasons: ['2020-21', '2021-22', '2022-23', '2023-24', '2024-25']
        },
        dataTypes: ['matches', 'teams', 'players'],
        priority: 'high',
        status: 'active'
      },
      {
        name: 'TheSportsDB',
        type: 'api',
        url: 'https://www.thesportsdb.com/api/v1/json',
        rateLimit: { requests: 100, period: 'minute' },
        coverage: {
          leagues: ['Premier League', 'La Liga', 'Bundesliga', 'Serie A', 'Ligue 1', 'Scottish Premiership', 'Süper Lig', 'Jupiler Pro League'],
          countries: ['Inglaterra', 'España', 'Alemania', 'Italia', 'Francia', 'Escocia', 'Turquía', 'Bélgica'],
          seasons: ['2020-21', '2021-22', '2022-23', '2023-24', '2024-25']
        },
        dataTypes: ['matches', 'teams', 'players'],
        priority: 'high',
        status: 'active'
      },
      {
        name: 'Football-Data.org',
        type: 'api',
        url: 'https://www.football-data.org',
        rateLimit: { requests: 10, period: 'minute' },
        coverage: {
          leagues: ['Premier League', 'La Liga', 'Bundesliga', 'Serie A', 'Ligue 1', 'Championship', 'La Liga 2', 'Bundesliga 2', 'Serie B', 'Ligue 2'],
          countries: ['Inglaterra', 'España', 'Alemania', 'Italia', 'Francia'],
          seasons: ['2020-21', '2021-22', '2022-23', '2023-24', '2024-25']
        },
        dataTypes: ['matches', 'teams'],
        priority: 'medium',
        status: 'active'
      },

      // Web Scraping
      {
        name: 'SofaScore.com',
        type: 'web_scraping',
        url: 'https://www.sofascore.com',
        rateLimit: { requests: 1000, period: 'hour' },
        coverage: {
          leagues: ['Premier League', 'La Liga', 'Bundesliga', 'Serie A', 'Ligue 1', 'Championship', 'La Liga 2', 'Bundesliga 2', 'Serie B', 'Ligue 2', 'Scottish Premiership', 'Süper Lig', 'Jupiler Pro League', 'Austrian Bundesliga', 'Danish Superliga', 'Allsvenskan', 'Swiss Super League', 'Brasileirão Série A', 'Liga Profesional', 'Chinese Super League', 'J.League', 'Liga MX', 'MLS'],
          countries: ['Inglaterra', 'España', 'Alemania', 'Italia', 'Francia', 'Escocia', 'Turquía', 'Bélgica', 'Austria', 'Dinamarca', 'Suecia', 'Suiza', 'Brasil', 'Argentina', 'China', 'Japón', 'México', 'Estados Unidos'],
          seasons: ['2020-21', '2021-22', '2022-23', '2023-24', '2024-25']
        },
        dataTypes: ['matches', 'teams', 'players', 'events'],
        priority: 'high',
        status: 'active'
      },
      {
        name: '365scores.com',
        type: 'web_scraping',
        url: 'https://www.365scores.com',
        rateLimit: { requests: 500, period: 'hour' },
        coverage: {
          leagues: ['Premier League', 'La Liga', 'Bundesliga', 'Serie A', 'Ligue 1', 'Championship', 'La Liga 2', 'Bundesliga 2', 'Serie B', 'Ligue 2', 'Scottish Premiership', 'Süper Lig', 'Jupiler Pro League', 'Austrian Bundesliga', 'Danish Superliga', 'Allsvenskan', 'Swiss Super League', 'Brasileirão Série A', 'Liga Profesional', 'Chinese Super League', 'J.League', 'Liga MX', 'MLS'],
          countries: ['Inglaterra', 'España', 'Alemania', 'Italia', 'Francia', 'Escocia', 'Turquía', 'Bélgica', 'Austria', 'Dinamarca', 'Suecia', 'Suiza', 'Brasil', 'Argentina', 'China', 'Japón', 'México', 'Estados Unidos'],
          seasons: ['2020-21', '2021-22', '2022-23', '2023-24', '2024-25']
        },
        dataTypes: ['matches', 'teams', 'players'],
        priority: 'high',
        status: 'active'
      },
      {
        name: 'soccerway.com',
        type: 'web_scraping',
        url: 'https://www.soccerway.com',
        rateLimit: { requests: 300, period: 'hour' },
        coverage: {
          leagues: ['Premier League', 'La Liga', 'Bundesliga', 'Serie A', 'Ligue 1', 'Championship', 'La Liga 2', 'Bundesliga 2', 'Serie B', 'Ligue 2', 'Scottish Premiership', 'Süper Lig', 'Jupiler Pro League', 'Austrian Bundesliga', 'Danish Superliga', 'Allsvenskan', 'Swiss Super League', 'Brasileirão Série A', 'Liga Profesional', 'Chinese Super League', 'J.League', 'Liga MX', 'MLS'],
          countries: ['Inglaterra', 'España', 'Alemania', 'Italia', 'Francia', 'Escocia', 'Turquía', 'Bélgica', 'Austria', 'Dinamarca', 'Suecia', 'Suiza', 'Brasil', 'Argentina', 'China', 'Japón', 'México', 'Estados Unidos'],
          seasons: ['2020-21', '2021-22', '2022-23', '2023-24', '2024-25']
        },
        dataTypes: ['matches', 'teams', 'players'],
        priority: 'medium',
        status: 'active'
      },
      {
        name: 'fbref.com',
        type: 'web_scraping',
        url: 'https://fbref.com',
        rateLimit: { requests: 200, period: 'hour' },
        coverage: {
          leagues: ['Premier League', 'La Liga', 'Bundesliga', 'Serie A', 'Ligue 1', 'Championship', 'La Liga 2', 'Bundesliga 2', 'Serie B', 'Ligue 2', 'Scottish Premiership', 'Süper Lig', 'Jupiler Pro League', 'Austrian Bundesliga', 'Danish Superliga', 'Allsvenskan', 'Swiss Super League', 'Brasileirão Série A', 'Liga Profesional', 'Chinese Super League', 'J.League', 'Liga MX', 'MLS'],
          countries: ['Inglaterra', 'España', 'Alemania', 'Italia', 'Francia', 'Escocia', 'Turquía', 'Bélgica', 'Austria', 'Dinamarca', 'Suecia', 'Suiza', 'Brasil', 'Argentina', 'China', 'Japón', 'México', 'Estados Unidos'],
          seasons: ['2020-21', '2021-22', '2022-23', '2023-24', '2024-25']
        },
        dataTypes: ['matches', 'teams', 'players'],
        priority: 'medium',
        status: 'active'
      },
      {
        name: 'whoscored.com',
        type: 'web_scraping',
        url: 'https://www.whoscored.com',
        rateLimit: { requests: 150, period: 'hour' },
        coverage: {
          leagues: ['Premier League', 'La Liga', 'Bundesliga', 'Serie A', 'Ligue 1', 'Championship', 'La Liga 2', 'Bundesliga 2', 'Serie B', 'Ligue 2', 'Scottish Premiership', 'Süper Lig', 'Jupiler Pro League', 'Austrian Bundesliga', 'Danish Superliga', 'Allsvenskan', 'Swiss Super League', 'Brasileirão Série A', 'Liga Profesional', 'Chinese Super League', 'J.League', 'Liga MX', 'MLS'],
          countries: ['Inglaterra', 'España', 'Alemania', 'Italia', 'Francia', 'Escocia', 'Turquía', 'Bélgica', 'Austria', 'Dinamarca', 'Suecia', 'Suiza', 'Brasil', 'Argentina', 'China', 'Japón', 'México', 'Estados Unidos'],
          seasons: ['2020-21', '2021-22', '2022-23', '2023-24', '2024-25']
        },
        dataTypes: ['matches', 'teams', 'players'],
        priority: 'medium',
        status: 'active'
      },
      {
        name: 'transfermarkt.com',
        type: 'web_scraping',
        url: 'https://www.transfermarkt.com',
        rateLimit: { requests: 100, period: 'hour' },
        coverage: {
          leagues: ['Premier League', 'La Liga', 'Bundesliga', 'Serie A', 'Ligue 1', 'Championship', 'La Liga 2', 'Bundesliga 2', 'Serie B', 'Ligue 2', 'Scottish Premiership', 'Süper Lig', 'Jupiler Pro League', 'Austrian Bundesliga', 'Danish Superliga', 'Allsvenskan', 'Swiss Super League', 'Brasileirão Série A', 'Liga Profesional', 'Chinese Super League', 'J.League', 'Liga MX', 'MLS'],
          countries: ['Inglaterra', 'España', 'Alemania', 'Italia', 'Francia', 'Escocia', 'Turquía', 'Bélgica', 'Austria', 'Dinamarca', 'Suecia', 'Suiza', 'Brasil', 'Argentina', 'China', 'Japón', 'México', 'Estados Unidos'],
          seasons: ['2020-21', '2021-22', '2022-23', '2023-24', '2024-25']
        },
        dataTypes: ['teams', 'players'],
        priority: 'low',
        status: 'active'
      }
    ];
  }

  // Obtener fuentes por prioridad
  getSourcesByPriority(priority: 'high' | 'medium' | 'low'): DataSource[] {
    return this.sources.filter(source => source.priority === priority && source.status === 'active');
  }

  // Obtener fuentes por tipo de datos
  getSourcesByDataType(dataType: 'matches' | 'teams' | 'players' | 'events'): DataSource[] {
    return this.sources.filter(source => 
      source.dataTypes.includes(dataType) && source.status === 'active'
    );
  }

  // Obtener fuentes por liga
  getSourcesByLeague(league: string): DataSource[] {
    return this.sources.filter(source => 
      source.coverage.leagues.includes(league) && source.status === 'active'
    );
  }

  // Obtener fuentes por país
  getSourcesByCountry(country: string): DataSource[] {
    return this.sources.filter(source => 
      source.coverage.countries.includes(country) && source.status === 'active'
    );
  }

  // Obtener fuentes por temporada
  getSourcesBySeason(season: string): DataSource[] {
    return this.sources.filter(source => 
      source.coverage.seasons.includes(season) && source.status === 'active'
    );
  }

  // Obtener todas las fuentes activas
  getAllActiveSources(): DataSource[] {
    return this.sources.filter(source => source.status === 'active');
  }

  // Obtener resumen de cobertura
  getCoverageSummary(): {
    totalSources: number;
    activeSources: number;
    highPrioritySources: number;
    mediumPrioritySources: number;
    lowPrioritySources: number;
    totalLeagues: number;
    totalCountries: number;
    totalSeasons: number;
    coverageByType: {
      matches: number;
      teams: number;
      players: number;
      events: number;
    };
  } {
    const activeSources = this.getAllActiveSources();
    const allLeagues = new Set(activeSources.flatMap(s => s.coverage.leagues));
    const allCountries = new Set(activeSources.flatMap(s => s.coverage.countries));
    const allSeasons = new Set(activeSources.flatMap(s => s.coverage.seasons));

    return {
      totalSources: this.sources.length,
      activeSources: activeSources.length,
      highPrioritySources: activeSources.filter(s => s.priority === 'high').length,
      mediumPrioritySources: activeSources.filter(s => s.priority === 'medium').length,
      lowPrioritySources: activeSources.filter(s => s.priority === 'low').length,
      totalLeagues: allLeagues.size,
      totalCountries: allCountries.size,
      totalSeasons: allSeasons.size,
      coverageByType: {
        matches: activeSources.filter(s => s.dataTypes.includes('matches')).length,
        teams: activeSources.filter(s => s.dataTypes.includes('teams')).length,
        players: activeSources.filter(s => s.dataTypes.includes('players')).length,
        events: activeSources.filter(s => s.dataTypes.includes('events')).length
      }
    };
  }

  // Obtener recomendaciones de fuentes para completar datos
  getRecommendationsForMissingData(missingLeagues: string[], missingSeasons: string[]): {
    recommendedSources: DataSource[];
    priority: 'high' | 'medium' | 'low';
    estimatedCoverage: number;
  } {
    const recommendedSources: DataSource[] = [];
    
    // Buscar fuentes que cubran las ligas faltantes
    for (const league of missingLeagues) {
      const sources = this.getSourcesByLeague(league);
      recommendedSources.push(...sources);
    }

    // Buscar fuentes que cubran las temporadas faltantes
    for (const season of missingSeasons) {
      const sources = this.getSourcesBySeason(season);
      recommendedSources.push(...sources);
    }

    // Eliminar duplicados
    const uniqueSources = recommendedSources.filter((source, index, self) => 
      index === self.findIndex(s => s.name === source.name)
    );

    // Calcular prioridad
    const highPriorityCount = uniqueSources.filter(s => s.priority === 'high').length;
    const mediumPriorityCount = uniqueSources.filter(s => s.priority === 'medium').length;
    const lowPriorityCount = uniqueSources.filter(s => s.priority === 'low').length;

    let priority: 'high' | 'medium' | 'low' = 'low';
    if (highPriorityCount > mediumPriorityCount && highPriorityCount > lowPriorityCount) {
      priority = 'high';
    } else if (mediumPriorityCount > lowPriorityCount) {
      priority = 'medium';
    }

    // Estimar cobertura
    const estimatedCoverage = Math.min(100, (uniqueSources.length / this.sources.length) * 100);

    return {
      recommendedSources: uniqueSources,
      priority,
      estimatedCoverage
    };
  }
}


