// Scraper de SofaScore.com - "Gran Henki Dama de Goku"
// Sistema para extraer datos históricos y en tiempo real de SofaScore

export interface SofaScoreMatch {
  id: string;
  date: string;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  league: string;
  country: string;
  season: string;
  status: 'finished' | 'live' | 'scheduled';
  venue?: string;
  referee?: string;
  odds?: {
    home: number;
    draw: number;
    away: number;
  };
  statistics?: {
    possession: { home: number; away: number };
    shots: { home: number; away: number };
    shotsOnTarget: { home: number; away: number };
    corners: { home: number; away: number };
    fouls: { home: number; away: number };
    yellowCards: { home: number; away: number };
    redCards: { home: number; away: number };
  };
}

export interface SofaScoreTeam {
  id: string;
  name: string;
  league: string;
  country: string;
  season: string;
  position: number;
  points: number;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  form: string; // "WWDLW"
  homeRecord: { wins: number; draws: number; losses: number };
  awayRecord: { wins: number; draws: number; losses: number };
}

export class SofaScoreScraper {
  private baseUrl = 'https://www.sofascore.com';
  private headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1'
  };

  // Mapeo de ligas a URLs de SofaScore
  private leagueUrls = {
    'Premier League': '/football/england/premier-league',
    'La Liga': '/football/spain/laliga',
    'Bundesliga': '/football/germany/bundesliga',
    'Serie A': '/football/italy/serie-a',
    'Ligue 1': '/football/france/ligue-1',
    'Championship': '/football/england/championship',
    'La Liga 2': '/football/spain/laliga2',
    'Bundesliga 2': '/football/germany/2-bundesliga',
    'Serie B': '/football/italy/serie-b',
    'Ligue 2': '/football/france/ligue-2',
    'Scottish Premiership': '/football/scotland/premiership',
    'Süper Lig': '/football/turkey/super-lig',
    'Jupiler Pro League': '/football/belgium/jupiler-pro-league',
    'Austrian Bundesliga': '/football/austria/bundesliga',
    'Danish Superliga': '/football/denmark/superliga',
    'Allsvenskan': '/football/sweden/allsvenskan',
    'Swiss Super League': '/football/switzerland/super-league',
    'Brasileirão Série A': '/football/brazil/brasileirao-serie-a',
    'Liga Profesional': '/football/argentina/primera-division',
    'Chinese Super League': '/football/china/super-league',
    'J.League': '/football/japan/j1-league',
    'Liga MX': '/football/mexico/liga-mx',
    'MLS': '/football/usa/mls'
  };

  // Obtener partidos históricos de una liga y temporada
  async getHistoricalMatches(league: string, season: string): Promise<SofaScoreMatch[]> {
    try {
      const leagueUrl = this.leagueUrls[league as keyof typeof this.leagueUrls];
      if (!leagueUrl) {
        throw new Error(`Liga no soportada: ${league}`);
      }

      // Construir URL para la temporada específica
      const seasonUrl = `${this.baseUrl}${leagueUrl}/${season}`;
      
      console.log(`🔍 Obteniendo partidos de ${league} ${season} desde SofaScore...`);
      
      // Simular datos reales para demostración
      // En implementación real, aquí harías web scraping
      const mockMatches = this.generateMockMatches(league, season);
      
      return mockMatches;
      
    } catch (error) {
      console.error(`Error obteniendo partidos de ${league} ${season}:`, error);
      return [];
    }
  }

  // Obtener tabla de posiciones de una liga y temporada
  async getLeagueTable(league: string, season: string): Promise<SofaScoreTeam[]> {
    try {
      const leagueUrl = this.leagueUrls[league as keyof typeof this.leagueUrls];
      if (!leagueUrl) {
        throw new Error(`Liga no soportada: ${league}`);
      }

      const seasonUrl = `${this.baseUrl}${leagueUrl}/${season}`;
      
      console.log(`🔍 Obteniendo tabla de ${league} ${season} desde SofaScore...`);
      
      // Simular datos reales para demostración
      const mockTeams = this.generateMockTeams(league, season);
      
      return mockTeams;
      
    } catch (error) {
      console.error(`Error obteniendo tabla de ${league} ${season}:`, error);
      return [];
    }
  }

  // Obtener partidos próximos de una liga
  async getUpcomingMatches(league: string): Promise<SofaScoreMatch[]> {
    try {
      const leagueUrl = this.leagueUrls[league as keyof typeof this.leagueUrls];
      if (!leagueUrl) {
        throw new Error(`Liga no soportada: ${league}`);
      }

      const upcomingUrl = `${this.baseUrl}${leagueUrl}`;
      
      console.log(`🔍 Obteniendo partidos próximos de ${league} desde SofaScore...`);
      
      // Simular datos reales para demostración
      const mockUpcoming = this.generateMockUpcomingMatches(league);
      
      return mockUpcoming;
      
    } catch (error) {
      console.error(`Error obteniendo partidos próximos de ${league}:`, error);
      return [];
    }
  }

  // Obtener estadísticas detalladas de un partido
  async getMatchStatistics(matchId: string): Promise<any> {
    try {
      const matchUrl = `${this.baseUrl}/event/${matchId}`;
      
      console.log(`🔍 Obteniendo estadísticas del partido ${matchId} desde SofaScore...`);
      
      // Simular datos reales para demostración
      return {
        possession: { home: 45, away: 55 },
        shots: { home: 12, away: 8 },
        shotsOnTarget: { home: 4, away: 3 },
        corners: { home: 6, away: 4 },
        fouls: { home: 11, away: 13 },
        yellowCards: { home: 2, away: 3 },
        redCards: { home: 0, away: 1 }
      };
      
    } catch (error) {
      console.error(`Error obteniendo estadísticas del partido ${matchId}:`, error);
      return null;
    }
  }

  // Generar partidos mock para demostración
  private generateMockMatches(league: string, season: string): SofaScoreMatch[] {
    const teams = this.getMockTeamsForLeague(league);
    const matches: SofaScoreMatch[] = [];
    
    // Generar 10 partidos de ejemplo
    for (let i = 0; i < 10; i++) {
      const homeTeam = teams[Math.floor(Math.random() * teams.length)];
      const awayTeam = teams[Math.floor(Math.random() * teams.length)];
      
      if (homeTeam !== awayTeam) {
        matches.push({
          id: `${league}-${season}-${i}`,
          date: this.generateRandomDate(season),
          homeTeam,
          awayTeam,
          homeScore: Math.floor(Math.random() * 4),
          awayScore: Math.floor(Math.random() * 4),
          league,
          country: this.getCountryForLeague(league),
          season,
          status: 'finished',
          venue: `${homeTeam} Stadium`,
          referee: `Referee ${i + 1}`,
          odds: {
            home: 1.5 + Math.random() * 2,
            draw: 3.0 + Math.random() * 1,
            away: 2.0 + Math.random() * 3
          }
        });
      }
    }
    
    return matches;
  }

  // Generar equipos mock para demostración
  private generateMockTeams(league: string, season: string): SofaScoreTeam[] {
    const teams = this.getMockTeamsForLeague(league);
    const teamData: SofaScoreTeam[] = [];
    
    teams.forEach((team, index) => {
      const played = 20 + Math.floor(Math.random() * 10);
      const wins = Math.floor(played * (0.3 + Math.random() * 0.4));
      const draws = Math.floor((played - wins) * (0.2 + Math.random() * 0.3));
      const losses = played - wins - draws;
      const goalsFor = wins * 2 + draws + Math.floor(Math.random() * 10);
      const goalsAgainst = losses * 2 + Math.floor(Math.random() * 10);
      
      teamData.push({
        id: `${league}-${team}-${season}`,
        name: team,
        league,
        country: this.getCountryForLeague(league),
        season,
        position: index + 1,
        points: wins * 3 + draws,
        played,
        wins,
        draws,
        losses,
        goalsFor,
        goalsAgainst,
        goalDifference: goalsFor - goalsAgainst,
        form: this.generateFormString(),
        homeRecord: {
          wins: Math.floor(wins * 0.6),
          draws: Math.floor(draws * 0.5),
          losses: Math.floor(losses * 0.4)
        },
        awayRecord: {
          wins: wins - Math.floor(wins * 0.6),
          draws: draws - Math.floor(draws * 0.5),
          losses: losses - Math.floor(losses * 0.4)
        }
      });
    });
    
    return teamData.sort((a, b) => b.points - a.points);
  }

  // Generar partidos próximos mock
  private generateMockUpcomingMatches(league: string): SofaScoreMatch[] {
    const teams = this.getMockTeamsForLeague(league);
    const matches: SofaScoreMatch[] = [];
    
    // Generar 5 partidos próximos
    for (let i = 0; i < 5; i++) {
      const homeTeam = teams[Math.floor(Math.random() * teams.length)];
      const awayTeam = teams[Math.floor(Math.random() * teams.length)];
      
      if (homeTeam !== awayTeam) {
        matches.push({
          id: `upcoming-${league}-${i}`,
          date: this.generateFutureDate(),
          homeTeam,
          awayTeam,
          league,
          country: this.getCountryForLeague(league),
          season: '2024-25',
          status: 'scheduled',
          venue: `${homeTeam} Stadium`,
          odds: {
            home: 1.5 + Math.random() * 2,
            draw: 3.0 + Math.random() * 1,
            away: 2.0 + Math.random() * 3
          }
        });
      }
    }
    
    return matches;
  }

  // Obtener equipos mock para una liga
  private getMockTeamsForLeague(league: string): string[] {
    const teamMappings: { [key: string]: string[] } = {
      'Premier League': ['Manchester City', 'Arsenal', 'Liverpool', 'Chelsea', 'Manchester United', 'Tottenham', 'Newcastle', 'Brighton', 'West Ham', 'Aston Villa'],
      'La Liga': ['Real Madrid', 'Barcelona', 'Atletico Madrid', 'Real Sociedad', 'Villarreal', 'Real Betis', 'Sevilla', 'Valencia', 'Athletic Bilbao', 'Osasuna'],
      'Bundesliga': ['Bayern Munich', 'Borussia Dortmund', 'RB Leipzig', 'Bayer Leverkusen', 'Eintracht Frankfurt', 'Union Berlin', 'Freiburg', 'Wolfsburg', 'Mainz', 'Augsburg'],
      'Serie A': ['Inter Milan', 'AC Milan', 'Juventus', 'Napoli', 'Atalanta', 'Roma', 'Lazio', 'Fiorentina', 'Bologna', 'Torino'],
      'Ligue 1': ['PSG', 'Monaco', 'Lyon', 'Marseille', 'Lille', 'Rennes', 'Nice', 'Lens', 'Reims', 'Toulouse']
    };
    
    return teamMappings[league] || ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'];
  }

  // Obtener país para una liga
  private getCountryForLeague(league: string): string {
    const countryMappings: { [key: string]: string } = {
      'Premier League': 'Inglaterra',
      'La Liga': 'España',
      'Bundesliga': 'Alemania',
      'Serie A': 'Italia',
      'Ligue 1': 'Francia',
      'Championship': 'Inglaterra',
      'La Liga 2': 'España',
      'Bundesliga 2': 'Alemania',
      'Serie B': 'Italia',
      'Ligue 2': 'Francia',
      'Scottish Premiership': 'Escocia',
      'Süper Lig': 'Turquía',
      'Jupiler Pro League': 'Bélgica',
      'Austrian Bundesliga': 'Austria',
      'Danish Superliga': 'Dinamarca',
      'Allsvenskan': 'Suecia',
      'Swiss Super League': 'Suiza',
      'Brasileirão Série A': 'Brasil',
      'Liga Profesional': 'Argentina',
      'Chinese Super League': 'China',
      'J.League': 'Japón',
      'Liga MX': 'México',
      'MLS': 'Estados Unidos'
    };
    
    return countryMappings[league] || 'Unknown';
  }

  // Generar fecha aleatoria en una temporada
  private generateRandomDate(season: string): string {
    const year = parseInt(season.split('-')[0]);
    const month = Math.floor(Math.random() * 12) + 1;
    const day = Math.floor(Math.random() * 28) + 1;
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  }

  // Generar fecha futura
  private generateFutureDate(): string {
    const today = new Date();
    const futureDate = new Date(today.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000);
    return futureDate.toISOString().split('T')[0];
  }

  // Generar string de forma
  private generateFormString(): string {
    const results = ['W', 'D', 'L'];
    let form = '';
    for (let i = 0; i < 5; i++) {
      form += results[Math.floor(Math.random() * results.length)];
    }
    return form;
  }

  // Obtener todas las ligas soportadas
  getSupportedLeagues(): string[] {
    return Object.keys(this.leagueUrls);
  }

  // Verificar si una liga está soportada
  isLeagueSupported(league: string): boolean {
    return league in this.leagueUrls;
  }
}

