// Configuración global de todas las ligas del mundo
// "Gran Henki Dama de Goku" - Base de datos masiva de fútbol mundial

export interface GlobalLeague {
  id: string;
  name: string;
  country: string;
  tier: number; // 1 = Primera división, 2 = Segunda división
  region: 'Europe' | 'South America' | 'North America' | 'Asia' | 'Africa' | 'Oceania';
  status: 'active' | 'inactive' | 'upcoming';
  teams: number;
  season: string;
  startDate: string;
  endDate: string;
  dataSource: string[];
  priority: 'high' | 'medium' | 'low';
  bettingMarkets: string[];
}

export class GlobalLeaguesManager {
  
  // Obtener todas las ligas del mundo
  static getAllGlobalLeagues(): GlobalLeague[] {
    return [
      // === EUROPA ===
      
      // España
      {
        id: 'laliga-1',
        name: 'La Liga',
        country: 'España',
        tier: 1,
        region: 'Europe',
        status: 'active',
        teams: 20,
        season: '2025-26',
        startDate: '2025-08-15',
        endDate: '2026-05-25',
        dataSource: ['365scores.com', 'soccerway.com', 'fbref.com'],
        priority: 'high',
        bettingMarkets: ['1X2', 'Over/Under 2.5', 'Both Teams Score', 'Handicap', 'Corners', 'Cards']
      },
      {
        id: 'laliga-2',
        name: 'La Liga 2',
        country: 'España',
        tier: 2,
        region: 'Europe',
        status: 'active',
        teams: 22,
        season: '2025-26',
        startDate: '2025-08-15',
        endDate: '2026-05-25',
        dataSource: ['365scores.com', 'soccerway.com', 'fbref.com'],
        priority: 'high',
        bettingMarkets: ['1X2', 'Over/Under 2.5', 'Both Teams Score', 'Handicap']
      },
      
      // Inglaterra
      {
        id: 'premier-league',
        name: 'Premier League',
        country: 'Inglaterra',
        tier: 1,
        region: 'Europe',
        status: 'active',
        teams: 20,
        season: '2025-26',
        startDate: '2025-08-15',
        endDate: '2026-05-25',
        dataSource: ['365scores.com', 'soccerway.com', 'fbref.com'],
        priority: 'high',
        bettingMarkets: ['1X2', 'Over/Under 2.5', 'Both Teams Score', 'Handicap', 'Corners', 'Cards']
      },
      {
        id: 'championship',
        name: 'Championship',
        country: 'Inglaterra',
        tier: 2,
        region: 'Europe',
        status: 'active',
        teams: 24,
        season: '2025-26',
        startDate: '2025-08-15',
        endDate: '2026-05-25',
        dataSource: ['365scores.com', 'soccerway.com', 'fbref.com'],
        priority: 'high',
        bettingMarkets: ['1X2', 'Over/Under 2.5', 'Both Teams Score', 'Handicap']
      },
      
      // Alemania
      {
        id: 'bundesliga-1',
        name: 'Bundesliga',
        country: 'Alemania',
        tier: 1,
        region: 'Europe',
        status: 'active',
        teams: 18,
        season: '2025-26',
        startDate: '2025-08-15',
        endDate: '2026-05-25',
        dataSource: ['365scores.com', 'soccerway.com', 'fbref.com'],
        priority: 'high',
        bettingMarkets: ['1X2', 'Over/Under 2.5', 'Both Teams Score', 'Handicap', 'Corners', 'Cards']
      },
      {
        id: 'bundesliga-2',
        name: 'Bundesliga 2',
        country: 'Alemania',
        tier: 2,
        region: 'Europe',
        status: 'active',
        teams: 18,
        season: '2025-26',
        startDate: '2025-08-15',
        endDate: '2026-05-25',
        dataSource: ['365scores.com', 'soccerway.com', 'fbref.com'],
        priority: 'high',
        bettingMarkets: ['1X2', 'Over/Under 2.5', 'Both Teams Score', 'Handicap']
      },
      
      // Italia
      {
        id: 'serie-a',
        name: 'Serie A',
        country: 'Italia',
        tier: 1,
        region: 'Europe',
        status: 'active',
        teams: 20,
        season: '2025-26',
        startDate: '2025-08-15',
        endDate: '2026-05-25',
        dataSource: ['365scores.com', 'soccerway.com', 'fbref.com'],
        priority: 'high',
        bettingMarkets: ['1X2', 'Over/Under 2.5', 'Both Teams Score', 'Handicap', 'Corners', 'Cards']
      },
      {
        id: 'serie-b',
        name: 'Serie B',
        country: 'Italia',
        tier: 2,
        region: 'Europe',
        status: 'active',
        teams: 20,
        season: '2025-26',
        startDate: '2025-08-15',
        endDate: '2026-05-25',
        dataSource: ['365scores.com', 'soccerway.com', 'fbref.com'],
        priority: 'high',
        bettingMarkets: ['1X2', 'Over/Under 2.5', 'Both Teams Score', 'Handicap']
      },
      
      // Francia
      {
        id: 'ligue-1',
        name: 'Ligue 1',
        country: 'Francia',
        tier: 1,
        region: 'Europe',
        status: 'active',
        teams: 18,
        season: '2025-26',
        startDate: '2025-08-15',
        endDate: '2026-05-25',
        dataSource: ['365scores.com', 'soccerway.com', 'fbref.com'],
        priority: 'high',
        bettingMarkets: ['1X2', 'Over/Under 2.5', 'Both Teams Score', 'Handicap', 'Corners', 'Cards']
      },
      {
        id: 'ligue-2',
        name: 'Ligue 2',
        country: 'Francia',
        tier: 2,
        region: 'Europe',
        status: 'active',
        teams: 20,
        season: '2025-26',
        startDate: '2025-08-15',
        endDate: '2026-05-25',
        dataSource: ['365scores.com', 'soccerway.com', 'fbref.com'],
        priority: 'high',
        bettingMarkets: ['1X2', 'Over/Under 2.5', 'Both Teams Score', 'Handicap']
      },
      
      // Bélgica
      {
        id: 'jupiler-pro-league',
        name: 'Jupiler Pro League',
        country: 'Bélgica',
        tier: 1,
        region: 'Europe',
        status: 'active',
        teams: 16,
        season: '2025-26',
        startDate: '2025-08-15',
        endDate: '2026-05-25',
        dataSource: ['365scores.com', 'soccerway.com', 'fbref.com'],
        priority: 'medium',
        bettingMarkets: ['1X2', 'Over/Under 2.5', 'Both Teams Score', 'Handicap']
      },
      
      // Turquía
      {
        id: 'super-lig',
        name: 'Süper Lig',
        country: 'Turquía',
        tier: 1,
        region: 'Europe',
        status: 'active',
        teams: 20,
        season: '2025-26',
        startDate: '2025-08-15',
        endDate: '2026-05-25',
        dataSource: ['365scores.com', 'soccerway.com', 'fbref.com'],
        priority: 'medium',
        bettingMarkets: ['1X2', 'Over/Under 2.5', 'Both Teams Score', 'Handicap']
      },
      
      // Grecia
      {
        id: 'super-league-greece',
        name: 'Super League Greece',
        country: 'Grecia',
        tier: 1,
        region: 'Europe',
        status: 'active',
        teams: 14,
        season: '2025-26',
        startDate: '2025-08-15',
        endDate: '2026-05-25',
        dataSource: ['365scores.com', 'soccerway.com', 'fbref.com'],
        priority: 'medium',
        bettingMarkets: ['1X2', 'Over/Under 2.5', 'Both Teams Score', 'Handicap']
      },
      
      // Escocia
      {
        id: 'scottish-premiership',
        name: 'Scottish Premiership',
        country: 'Escocia',
        tier: 1,
        region: 'Europe',
        status: 'active',
        teams: 12,
        season: '2025-26',
        startDate: '2025-08-15',
        endDate: '2026-05-25',
        dataSource: ['365scores.com', 'soccerway.com', 'fbref.com'],
        priority: 'medium',
        bettingMarkets: ['1X2', 'Over/Under 2.5', 'Both Teams Score', 'Handicap']
      },
      
      // Austria
      {
        id: 'austrian-bundesliga',
        name: 'Austrian Bundesliga',
        country: 'Austria',
        tier: 1,
        region: 'Europe',
        status: 'active',
        teams: 12,
        season: '2025-26',
        startDate: '2025-08-15',
        endDate: '2026-05-25',
        dataSource: ['365scores.com', 'soccerway.com', 'fbref.com'],
        priority: 'medium',
        bettingMarkets: ['1X2', 'Over/Under 2.5', 'Both Teams Score', 'Handicap']
      },
      
      // Suiza
      {
        id: 'swiss-super-league',
        name: 'Swiss Super League',
        country: 'Suiza',
        tier: 1,
        region: 'Europe',
        status: 'active',
        teams: 12,
        season: '2025-26',
        startDate: '2025-08-15',
        endDate: '2026-05-25',
        dataSource: ['365scores.com', 'soccerway.com', 'fbref.com'],
        priority: 'medium',
        bettingMarkets: ['1X2', 'Over/Under 2.5', 'Both Teams Score', 'Handicap']
      },
      
      // Dinamarca
      {
        id: 'danish-superliga',
        name: 'Danish Superliga',
        country: 'Dinamarca',
        tier: 1,
        region: 'Europe',
        status: 'active',
        teams: 12,
        season: '2025-26',
        startDate: '2025-08-15',
        endDate: '2026-05-25',
        dataSource: ['365scores.com', 'soccerway.com', 'fbref.com'],
        priority: 'medium',
        bettingMarkets: ['1X2', 'Over/Under 2.5', 'Both Teams Score', 'Handicap']
      },
      
      // Suecia
      {
        id: 'allsvenskan',
        name: 'Allsvenskan',
        country: 'Suecia',
        tier: 1,
        region: 'Europe',
        status: 'active',
        teams: 16,
        season: '2025-26',
        startDate: '2025-08-15',
        endDate: '2026-05-25',
        dataSource: ['365scores.com', 'soccerway.com', 'fbref.com'],
        priority: 'medium',
        bettingMarkets: ['1X2', 'Over/Under 2.5', 'Both Teams Score', 'Handicap']
      },
      
      // === ASIA ===
      
      // China
      {
        id: 'chinese-super-league',
        name: 'Chinese Super League',
        country: 'China',
        tier: 1,
        region: 'Asia',
        status: 'active',
        teams: 16,
        season: '2025-26',
        startDate: '2025-08-15',
        endDate: '2026-05-25',
        dataSource: ['365scores.com', 'soccerway.com', 'fbref.com'],
        priority: 'medium',
        bettingMarkets: ['1X2', 'Over/Under 2.5', 'Both Teams Score', 'Handicap']
      },
      
      // Japón
      {
        id: 'j-league',
        name: 'J.League',
        country: 'Japón',
        tier: 1,
        region: 'Asia',
        status: 'active',
        teams: 20,
        season: '2025-26',
        startDate: '2025-08-15',
        endDate: '2026-05-25',
        dataSource: ['365scores.com', 'soccerway.com', 'fbref.com'],
        priority: 'medium',
        bettingMarkets: ['1X2', 'Over/Under 2.5', 'Both Teams Score', 'Handicap']
      },
      
      // === AMÉRICA DEL SUR ===
      
      // Brasil
      {
        id: 'brasileirao-serie-a',
        name: 'Brasileirão Série A',
        country: 'Brasil',
        tier: 1,
        region: 'South America',
        status: 'active',
        teams: 20,
        season: '2025-26',
        startDate: '2025-08-15',
        endDate: '2026-05-25',
        dataSource: ['365scores.com', 'soccerway.com', 'fbref.com'],
        priority: 'high',
        bettingMarkets: ['1X2', 'Over/Under 2.5', 'Both Teams Score', 'Handicap', 'Corners', 'Cards']
      },
      
      // Argentina
      {
        id: 'liga-profesional',
        name: 'Liga Profesional',
        country: 'Argentina',
        tier: 1,
        region: 'South America',
        status: 'active',
        teams: 28,
        season: '2025-26',
        startDate: '2025-08-15',
        endDate: '2026-05-25',
        dataSource: ['365scores.com', 'soccerway.com', 'fbref.com'],
        priority: 'high',
        bettingMarkets: ['1X2', 'Over/Under 2.5', 'Both Teams Score', 'Handicap', 'Corners', 'Cards']
      },
      
      // Chile
      {
        id: 'primera-division-chile',
        name: 'Primera División',
        country: 'Chile',
        tier: 1,
        region: 'South America',
        status: 'active',
        teams: 16,
        season: '2025-26',
        startDate: '2025-08-15',
        endDate: '2026-05-25',
        dataSource: ['365scores.com', 'soccerway.com', 'fbref.com'],
        priority: 'high',
        bettingMarkets: ['1X2', 'Over/Under 2.5', 'Both Teams Score', 'Handicap', 'Corners', 'Cards']
      },
      
      // Colombia
      {
        id: 'primera-a-colombia',
        name: 'Primera A',
        country: 'Colombia',
        tier: 1,
        region: 'South America',
        status: 'active',
        teams: 20,
        season: '2025-26',
        startDate: '2025-08-15',
        endDate: '2026-05-25',
        dataSource: ['365scores.com', 'soccerway.com', 'fbref.com'],
        priority: 'high',
        bettingMarkets: ['1X2', 'Over/Under 2.5', 'Both Teams Score', 'Handicap', 'Corners', 'Cards']
      },
      
      // Uruguay
      {
        id: 'primera-division-uruguay',
        name: 'Primera División',
        country: 'Uruguay',
        tier: 1,
        region: 'South America',
        status: 'active',
        teams: 16,
        season: '2025-26',
        startDate: '2025-08-15',
        endDate: '2026-05-25',
        dataSource: ['365scores.com', 'soccerway.com', 'fbref.com'],
        priority: 'high',
        bettingMarkets: ['1X2', 'Over/Under 2.5', 'Both Teams Score', 'Handicap', 'Corners', 'Cards']
      },
      
      // Perú
      {
        id: 'liga-1-peru',
        name: 'Liga 1',
        country: 'Perú',
        tier: 1,
        region: 'South America',
        status: 'active',
        teams: 18,
        season: '2025-26',
        startDate: '2025-08-15',
        endDate: '2026-05-25',
        dataSource: ['365scores.com', 'soccerway.com', 'fbref.com'],
        priority: 'high',
        bettingMarkets: ['1X2', 'Over/Under 2.5', 'Both Teams Score', 'Handicap', 'Corners', 'Cards']
      },
      
      // Ecuador
      {
        id: 'liga-pro-ecuador',
        name: 'Liga Pro',
        country: 'Ecuador',
        tier: 1,
        region: 'South America',
        status: 'active',
        teams: 16,
        season: '2025-26',
        startDate: '2025-08-15',
        endDate: '2026-05-25',
        dataSource: ['365scores.com', 'soccerway.com', 'fbref.com'],
        priority: 'high',
        bettingMarkets: ['1X2', 'Over/Under 2.5', 'Both Teams Score', 'Handicap', 'Corners', 'Cards']
      },
      
      // Paraguay
      {
        id: 'primera-division-paraguay',
        name: 'Primera División',
        country: 'Paraguay',
        tier: 1,
        region: 'South America',
        status: 'active',
        teams: 12,
        season: '2025-26',
        startDate: '2025-08-15',
        endDate: '2026-05-25',
        dataSource: ['365scores.com', 'soccerway.com', 'fbref.com'],
        priority: 'high',
        bettingMarkets: ['1X2', 'Over/Under 2.5', 'Both Teams Score', 'Handicap', 'Corners', 'Cards']
      },
      
      // Bolivia
      {
        id: 'division-profesional-bolivia',
        name: 'División Profesional',
        country: 'Bolivia',
        tier: 1,
        region: 'South America',
        status: 'active',
        teams: 16,
        season: '2025-26',
        startDate: '2025-08-15',
        endDate: '2026-05-25',
        dataSource: ['365scores.com', 'soccerway.com', 'fbref.com'],
        priority: 'high',
        bettingMarkets: ['1X2', 'Over/Under 2.5', 'Both Teams Score', 'Handicap', 'Corners', 'Cards']
      }
    ];
  }

  // Obtener ligas por región
  static getLeaguesByRegion(region: string): GlobalLeague[] {
    return this.getAllGlobalLeagues().filter(league => league.region === region);
  }

  // Obtener ligas por prioridad
  static getLeaguesByPriority(priority: string): GlobalLeague[] {
    return this.getAllGlobalLeagues().filter(league => league.priority === priority);
  }

  // Obtener ligas por país
  static getLeaguesByCountry(country: string): GlobalLeague[] {
    return this.getAllGlobalLeagues().filter(league => 
      league.country.toLowerCase().includes(country.toLowerCase())
    );
  }

  // Obtener resumen de cobertura global
  static getGlobalCoverageSummary(): {
    totalLeagues: number;
    totalCountries: number;
    totalRegions: number;
    highPriorityLeagues: number;
    mediumPriorityLeagues: number;
    lowPriorityLeagues: number;
    activeLeagues: number;
    totalTeams: number;
    regions: Array<{
      region: string;
      leagues: number;
      countries: number;
    }>;
  } {
    const leagues = this.getAllGlobalLeagues();
    const countries = [...new Set(leagues.map(l => l.country))];
    const regions = [...new Set(leagues.map(l => l.region))];
    
    const regionSummary = regions.map(region => ({
      region,
      leagues: leagues.filter(l => l.region === region).length,
      countries: [...new Set(leagues.filter(l => l.region === region).map(l => l.country))].length
    }));

    return {
      totalLeagues: leagues.length,
      totalCountries: countries.length,
      totalRegions: regions.length,
      highPriorityLeagues: leagues.filter(l => l.priority === 'high').length,
      mediumPriorityLeagues: leagues.filter(l => l.priority === 'medium').length,
      lowPriorityLeagues: leagues.filter(l => l.priority === 'low').length,
      activeLeagues: leagues.filter(l => l.status === 'active').length,
      totalTeams: leagues.reduce((sum, l) => sum + l.teams, 0),
      regions: regionSummary
    };
  }

  // Obtener mercados de apuestas por liga
  static getBettingMarketsByLeague(leagueId: string): string[] {
    const league = this.getAllGlobalLeagues().find(l => l.id === leagueId);
    return league ? league.bettingMarkets : [];
  }

  // Obtener fuentes de datos por liga
  static getDataSourcesByLeague(leagueId: string): string[] {
    const league = this.getAllGlobalLeagues().find(l => l.id === leagueId);
    return league ? league.dataSource : [];
  }
}


