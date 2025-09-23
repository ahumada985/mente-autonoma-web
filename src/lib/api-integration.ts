// Sistema de Integración con APIs de Datos Deportivos
import { SPORTS_BETTING_CONFIG } from './sports-betting-config';
import { League, Team, Match, Odds } from './database-schema';

export class APIIntegration {
  private apiFootballKey: string;
  private theSportsDBKey: string;

  constructor(apiFootballKey: string, theSportsDBKey: string) {
    this.apiFootballKey = apiFootballKey;
    this.theSportsDBKey = theSportsDBKey;
  }

  // Integración con API-Football
  async fetchLeaguesFromAPIFootball(): Promise<League[]> {
    try {
      const response = await fetch('https://v3.football.api-sports.io/leagues', {
        headers: {
          'X-RapidAPI-Key': this.apiFootballKey,
          'X-RapidAPI-Host': 'v3.football.api-sports.io'
        }
      });

      if (!response.ok) {
        throw new Error(`API-Football error: ${response.status}`);
      }

      const data = await response.json();
      const leagues: League[] = [];

      // Filtrar solo las ligas que nos interesan
      const targetLeagues = SPORTS_BETTING_CONFIG.leagues;
      const allTargetLeagues = [
        ...targetLeagues.southAmerica,
        ...targetLeagues.northAmerica,
        ...targetLeagues.europe
      ];

      for (const league of data.response) {
        const leagueName = `${league.country.name}: ${league.league.name}`;
        
        if (allTargetLeagues.some(target => 
          target.toLowerCase().includes(league.country.name.toLowerCase()) &&
          target.toLowerCase().includes(league.league.name.toLowerCase())
        )) {
          leagues.push({
            id: `api_football_${league.league.id}`,
            name: leagueName,
            country: league.country.name,
            type: league.league.type === 'League' ? 'league' : 'cup',
            season: league.seasons[0].year.toString(),
            isActive: true,
            apiId: league.league.id.toString(),
            createdAt: new Date(),
            updatedAt: new Date()
          });
        }
      }

      return leagues;
    } catch (error) {
      console.error('Error fetching leagues from API-Football:', error);
      return [];
    }
  }

  async fetchTeamsFromAPIFootball(leagueId: string): Promise<Team[]> {
    try {
      const response = await fetch(`https://v3.football.api-sports.io/teams?league=${leagueId}&season=2024`, {
        headers: {
          'X-RapidAPI-Key': this.apiFootballKey,
          'X-RapidAPI-Host': 'v3.football.api-sports.io'
        }
      });

      if (!response.ok) {
        throw new Error(`API-Football error: ${response.status}`);
      }

      const data = await response.json();
      const teams: Team[] = [];

      for (const team of data.response) {
        teams.push({
          id: `api_football_team_${team.team.id}`,
          name: team.team.name,
          shortName: team.team.name,
          country: team.team.country,
          leagueId: `api_football_${leagueId}`,
          logo: team.team.logo,
          founded: team.team.founded,
          stadium: team.venue?.name,
          apiId: team.team.id.toString(),
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }

      return teams;
    } catch (error) {
      console.error('Error fetching teams from API-Football:', error);
      return [];
    }
  }

  async fetchMatchesFromAPIFootball(leagueId: string, date?: string): Promise<Match[]> {
    try {
      const dateParam = date || new Date().toISOString().split('T')[0];
      const response = await fetch(`https://v3.football.api-sports.io/fixtures?league=${leagueId}&season=2024&date=${dateParam}`, {
        headers: {
          'X-RapidAPI-Key': this.apiFootballKey,
          'X-RapidAPI-Host': 'v3.football.api-sports.io'
        }
      });

      if (!response.ok) {
        throw new Error(`API-Football error: ${response.status}`);
      }

      const data = await response.json();
      const matches: Match[] = [];

      for (const fixture of data.response) {
        matches.push({
          id: `api_football_match_${fixture.fixture.id}`,
          leagueId: `api_football_${leagueId}`,
          homeTeamId: `api_football_team_${fixture.teams.home.id}`,
          awayTeamId: `api_football_team_${fixture.teams.away.id}`,
          matchDate: new Date(fixture.fixture.date),
          status: this.mapFixtureStatus(fixture.fixture.status.short),
          homeScore: fixture.goals.home,
          awayScore: fixture.goals.away,
          homeScoreHT: fixture.score.halftime.home,
          awayScoreHT: fixture.score.halftime.away,
          referee: fixture.fixture.referee,
          venue: fixture.fixture.venue?.name,
          apiId: fixture.fixture.id.toString(),
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }

      return matches;
    } catch (error) {
      console.error('Error fetching matches from API-Football:', error);
      return [];
    }
  }

  // Integración con TheSportsDB
  async fetchLeagueFromTheSportsDB(leagueName: string): Promise<League | null> {
    try {
      const response = await fetch(`https://www.thesportsdb.com/api/v1/json/${this.theSportsDBKey}/search_all_leagues.php?s=Soccer&c=${leagueName}`);
      
      if (!response.ok) {
        throw new Error(`TheSportsDB error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.countrys && data.countrys.length > 0) {
        const league = data.countrys[0];
        return {
          id: `thesportsdb_${league.idLeague}`,
          name: `${league.strCountry}: ${league.strLeague}`,
          country: league.strCountry,
          type: league.strSport === 'Soccer' ? 'league' : 'cup',
          season: '2024',
          isActive: true,
          apiId: league.idLeague,
          createdAt: new Date(),
          updatedAt: new Date()
        };
      }

      return null;
    } catch (error) {
      console.error('Error fetching league from TheSportsDB:', error);
      return null;
    }
  }

  // Scraping de cuotas (simulado - en producción usar APIs oficiales)
  async fetchOddsFromBookmakers(matchId: string): Promise<Odds[]> {
    // Simulación de cuotas - en producción se integraría con APIs de casas de apuestas
    const mockOdds: Odds[] = [
      {
        id: `odds_${matchId}_betano_1x2_home`,
        matchId,
        bookmaker: 'Betano',
        market: 'Resultado Final (1X2)',
        selection: 'Home Win',
        odds: 2.10,
        probability: 1 / 2.10,
        timestamp: new Date(),
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: `odds_${matchId}_betano_1x2_draw`,
        matchId,
        bookmaker: 'Betano',
        market: 'Resultado Final (1X2)',
        selection: 'Draw',
        odds: 3.20,
        probability: 1 / 3.20,
        timestamp: new Date(),
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: `odds_${matchId}_betano_1x2_away`,
        matchId,
        bookmaker: 'Betano',
        market: 'Resultado Final (1X2)',
        selection: 'Away Win',
        odds: 3.50,
        probability: 1 / 3.50,
        timestamp: new Date(),
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: `odds_${matchId}_betano_over25`,
        matchId,
        bookmaker: 'Betano',
        market: 'Más/Menos de 2.5 Goles',
        selection: 'Over 2.5',
        odds: 1.85,
        probability: 1 / 1.85,
        timestamp: new Date(),
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: `odds_${matchId}_betano_btts`,
        matchId,
        bookmaker: 'Betano',
        market: 'Ambos Equipos Anotan',
        selection: 'Sí',
        odds: 1.75,
        probability: 1 / 1.75,
        timestamp: new Date(),
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    return mockOdds;
  }

  // Método para actualizar datos diariamente
  async updateDailyData(): Promise<void> {
    console.log('Iniciando actualización diaria de datos...');
    
    try {
      // Actualizar ligas
      const leagues = await this.fetchLeaguesFromAPIFootball();
      console.log(`Actualizadas ${leagues.length} ligas`);
      
      // Actualizar equipos para cada liga
      for (const league of leagues) {
        if (league.apiId) {
          const teams = await this.fetchTeamsFromAPIFootball(league.apiId);
          console.log(`Actualizados ${teams.length} equipos para ${league.name}`);
        }
      }
      
      // Actualizar partidos del día
      const today = new Date().toISOString().split('T')[0];
      for (const league of leagues) {
        if (league.apiId) {
          const matches = await this.fetchMatchesFromAPIFootball(league.apiId, today);
          console.log(`Actualizados ${matches.length} partidos para ${league.name}`);
        }
      }
      
      console.log('Actualización diaria completada');
    } catch (error) {
      console.error('Error en actualización diaria:', error);
    }
  }

  // Método para obtener partidos de hoy
  async getTodayMatches(): Promise<Match[]> {
    const today = new Date().toISOString().split('T')[0];
    const allMatches: Match[] = [];
    
    const leagues = await this.fetchLeaguesFromAPIFootball();
    
    for (const league of leagues) {
      if (league.apiId) {
        const matches = await this.fetchMatchesFromAPIFootball(league.apiId, today);
        allMatches.push(...matches);
      }
    }
    
    return allMatches;
  }

  // Método para obtener partidos de una liga específica
  async getMatchesByLeague(leagueName: string, days: number = 7): Promise<Match[]> {
    const allMatches: Match[] = [];
    const leagues = await this.fetchLeaguesFromAPIFootball();
    
    const targetLeague = leagues.find(league => 
      league.name.toLowerCase().includes(leagueName.toLowerCase())
    );
    
    if (targetLeague && targetLeague.apiId) {
      for (let i = 0; i < days; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);
        const dateString = date.toISOString().split('T')[0];
        
        const matches = await this.fetchMatchesFromAPIFootball(targetLeague.apiId!, dateString);
        allMatches.push(...matches);
      }
    }
    
    return allMatches;
  }

  // Método auxiliar para mapear estados de partidos
  private mapFixtureStatus(status: string): 'scheduled' | 'live' | 'finished' | 'postponed' | 'cancelled' {
    switch (status) {
      case 'NS':
      case 'TBD':
        return 'scheduled';
      case 'LIVE':
      case 'HT':
      case '2H':
        return 'live';
      case 'FT':
      case 'AET':
      case 'PEN':
        return 'finished';
      case 'PST':
      case 'CANC':
        return 'cancelled';
      case 'SUSP':
        return 'postponed';
      default:
        return 'scheduled';
    }
  }

  // Método para verificar límites de API
  async checkAPILimits(): Promise<{ apiFootball: any; theSportsDB: any }> {
    try {
      // Verificar límites de API-Football
      const apiFootballResponse = await fetch('https://v3.football.api-sports.io/status', {
        headers: {
          'X-RapidAPI-Key': this.apiFootballKey,
          'X-RapidAPI-Host': 'v3.football.api-sports.io'
        }
      });
      
      const apiFootballStatus = await apiFootballResponse.json();
      
      return {
        apiFootball: apiFootballStatus,
        theSportsDB: { status: 'active', requests: 'unlimited' }
      };
    } catch (error) {
      console.error('Error checking API limits:', error);
      return {
        apiFootball: { error: 'Unable to check' },
        theSportsDB: { error: 'Unable to check' }
      };
    }
  }
}


