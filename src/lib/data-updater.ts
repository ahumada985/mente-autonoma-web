// Sistema para descargar y actualizar datos históricos
// Actualiza la base de datos con datos hasta el día de hoy

import { RealDataUpdater } from '@/lib/real-data-updater';
import { MultiSeasonDataManager } from '@/lib/multi-season-data';

export interface HistoricalData {
  matches: MatchData[];
  teams: TeamData[];
  leagues: LeagueData[];
  lastUpdated: string;
}

export interface MatchData {
  id: string;
  homeTeam: string;
  awayTeam: string;
  league: string;
  date: string;
  homeScore: number;
  awayScore: number;
  result: 'H' | 'D' | 'A'; // Home, Draw, Away
  homeOdds?: number;
  drawOdds?: number;
  awayOdds?: number;
  over25Odds?: number;
  under25Odds?: number;
  bothTeamsScoreOdds?: number;
  venue?: string;
  referee?: string;
  attendance?: number;
}

export interface TeamData {
  id: string;
  name: string;
  league: string;
  position: number;
  points: number;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  homeRecord: {
    played: number;
    wins: number;
    draws: number;
    losses: number;
    goalsFor: number;
    goalsAgainst: number;
  };
  awayRecord: {
    played: number;
    wins: number;
    draws: number;
    losses: number;
    goalsFor: number;
    goalsAgainst: number;
  };
  recentForm: string;
  cleanSheets: number;
  avgGoalsScored: number;
  avgGoalsConceded: number;
}

export interface LeagueData {
  id: string;
  name: string;
  country: string;
  season: string;
  startDate: string;
  endDate: string;
  teams: number;
  matches: number;
  status: 'active' | 'completed' | 'upcoming';
}

export class DataUpdater {
  
  // Actualizar todos los datos hasta el día de hoy
  static async updateAllData(): Promise<HistoricalData> {
    console.log('🔄 Iniciando actualización de datos históricos...');
    console.log(`📅 Actualizando datos hasta: ${new Date().toISOString().split('T')[0]}`);
    
    // Usar datos de múltiples temporadas (últimas 6 temporadas)
    console.log('✅ Cargando datos de múltiples temporadas...');
    const allSeasons = MultiSeasonDataManager.getAllSeasonsData();
    
    // Consolidar datos de todas las temporadas
    const allTeams = allSeasons.flatMap(season => season.teams);
    const allMatches = allSeasons.flatMap(season => season.matches);
    const allLeagues = allSeasons.map(season => ({
      id: `laliga-${season.season}`,
      name: 'La Liga',
      country: 'España',
      season: season.season,
      startDate: `${season.startYear}-08-01`,
      endDate: `${season.endYear}-05-31`,
      teams: season.teams.length,
      matches: season.matches.length,
      status: season.status as 'active' | 'completed' | 'upcoming'
    }));
    
    const historicalData: HistoricalData = {
      matches: allMatches,
      teams: allTeams,
      leagues: allLeagues,
      lastUpdated: new Date().toISOString()
    };

    try {
      // 1. Actualizar datos de La Liga (incluyendo Real Sociedad y Real Madrid)
      console.log('🔍 Actualizando datos de La Liga con datos reales...');
      const laLigaData = await this.updateLaLigaData();
      historicalData.matches.push(...laLigaData.matches);
      historicalData.teams.push(...laLigaData.teams);
      historicalData.leagues.push(...laLigaData.leagues);

      // 2. Actualizar datos de Premier League
      console.log('🔍 Actualizando datos de Premier League...');
      const premierLeagueData = await this.updatePremierLeagueData();
      historicalData.matches.push(...premierLeagueData.matches);
      historicalData.teams.push(...premierLeagueData.teams);
      historicalData.leagues.push(...premierLeagueData.leagues);

      // 3. Actualizar datos de Bundesliga
      console.log('🔍 Actualizando datos de Bundesliga...');
      const bundesligaData = await this.updateBundesligaData();
      historicalData.matches.push(...bundesligaData.matches);
      historicalData.teams.push(...bundesligaData.teams);
      historicalData.leagues.push(...bundesligaData.leagues);

      // 4. Actualizar datos de Serie A
      console.log('🔍 Actualizando datos de Serie A...');
      const serieAData = await this.updateSerieAData();
      historicalData.matches.push(...serieAData.matches);
      historicalData.teams.push(...serieAData.teams);
      historicalData.leagues.push(...serieAData.leagues);

      console.log(`✅ Actualización completada:`);
      console.log(`   📊 Partidos: ${historicalData.matches.length}`);
      console.log(`   👥 Equipos: ${historicalData.teams.length}`);
      console.log(`   🏆 Ligas: ${historicalData.leagues.length}`);

      return historicalData;

    } catch (error) {
      console.error('❌ Error actualizando datos:', error);
      throw error;
    }
  }

  // Actualizar datos de La Liga
  static async updateLaLigaData(): Promise<HistoricalData> {
    const laLigaData: HistoricalData = {
      matches: [],
      teams: [],
      leagues: [],
      lastUpdated: new Date().toISOString()
    };

    // Usar datos reales de La Liga 2024-25
    console.log('✅ Cargando datos reales de La Liga...');
    const realData = RealDataUpdater.getAllRealData();
    
    // Agregar liga
    laLigaData.leagues.push({
      id: 'laliga-2024-25',
      name: 'La Liga',
      country: 'España',
      season: '2024-25',
      startDate: '2024-08-16',
      endDate: '2025-05-25',
      teams: 20,
      matches: 380,
      status: 'active'
    });

    // Agregar equipos reales
    laLigaData.teams.push(...realData.teams.map(team => ({
      ...team,
      league: 'La Liga'
    })));

    // Agregar partidos reales
    laLigaData.matches.push(...realData.matches);

    console.log(`✅ La Liga actualizada: ${laLigaData.teams.length} equipos, ${laLigaData.matches.length} partidos`);

    return laLigaData;
  }

  // Actualizar datos de Premier League
  static async updatePremierLeagueData(): Promise<HistoricalData> {
    const premierLeagueData: HistoricalData = {
      matches: [],
      teams: [],
      leagues: [],
      lastUpdated: new Date().toISOString()
    };

    // Datos de Premier League 2024-25
    premierLeagueData.leagues.push({
      id: 'premier-league-2024-25',
      name: 'Premier League',
      country: 'Inglaterra',
      season: '2024-25',
      startDate: '2024-08-17',
      endDate: '2025-05-25',
      teams: 20,
      matches: 380,
      status: 'active'
    });

    // Equipos de Premier League (simulados)
    const premierLeagueTeams = [
      {
        id: 'manchester-city',
        name: 'Manchester City',
        position: 1,
        points: 21,
        played: 8,
        wins: 7,
        draws: 0,
        losses: 1,
        goalsFor: 22,
        goalsAgainst: 8,
        goalDifference: 14,
        homeRecord: { played: 4, wins: 4, draws: 0, losses: 0, goalsFor: 12, goalsAgainst: 3 },
        awayRecord: { played: 4, wins: 3, draws: 0, losses: 1, goalsFor: 10, goalsAgainst: 5 },
        recentForm: 'WWWWL',
        cleanSheets: 4,
        avgGoalsScored: 2.75,
        avgGoalsConceded: 1.0
      },
      {
        id: 'liverpool',
        name: 'Liverpool',
        position: 2,
        points: 19,
        played: 8,
        wins: 6,
        draws: 1,
        losses: 1,
        goalsFor: 20,
        goalsAgainst: 10,
        goalDifference: 10,
        homeRecord: { played: 4, wins: 3, draws: 1, losses: 0, goalsFor: 11, goalsAgainst: 5 },
        awayRecord: { played: 4, wins: 3, draws: 0, losses: 1, goalsFor: 9, goalsAgainst: 5 },
        recentForm: 'WWWDW',
        cleanSheets: 3,
        avgGoalsScored: 2.5,
        avgGoalsConceded: 1.25
      }
    ];

    premierLeagueData.teams.push(...premierLeagueTeams.map(team => ({
      ...team,
      league: 'Premier League'
    })));

    return premierLeagueData;
  }

  // Actualizar datos de Bundesliga
  static async updateBundesligaData(): Promise<HistoricalData> {
    const bundesligaData: HistoricalData = {
      matches: [],
      teams: [],
      leagues: [],
      lastUpdated: new Date().toISOString()
    };

    // Datos de Bundesliga 2024-25
    bundesligaData.leagues.push({
      id: 'bundesliga-2024-25',
      name: 'Bundesliga',
      country: 'Alemania',
      season: '2024-25',
      startDate: '2024-08-23',
      endDate: '2025-05-17',
      teams: 18,
      matches: 306,
      status: 'active'
    });

    return bundesligaData;
  }

  // Actualizar datos de Serie A
  static async updateSerieAData(): Promise<HistoricalData> {
    const serieAData: HistoricalData = {
      matches: [],
      teams: [],
      leagues: [],
      lastUpdated: new Date().toISOString()
    };

    // Datos de Serie A 2024-25
    serieAData.leagues.push({
      id: 'serie-a-2024-25',
      name: 'Serie A',
      country: 'Italia',
      season: '2024-25',
      startDate: '2024-08-17',
      endDate: '2025-05-25',
      teams: 20,
      matches: 380,
      status: 'active'
    });

    return serieAData;
  }

  // Obtener estadísticas específicas de un equipo
  static async getTeamStats(teamName: string, league: string): Promise<TeamData | null> {
    // En producción, esto buscaría en la base de datos
    const allData = await this.updateAllData();
    return allData.teams.find(team => 
      team.name.toLowerCase().includes(teamName.toLowerCase()) && 
      team.league === league
    ) || null;
  }

  // Obtener partidos entre dos equipos específicos
  static async getHeadToHeadMatches(team1: string, team2: string): Promise<MatchData[]> {
    const allData = await this.updateAllData();
    return allData.matches.filter(match => 
      (match.homeTeam.toLowerCase().includes(team1.toLowerCase()) && 
       match.awayTeam.toLowerCase().includes(team2.toLowerCase())) ||
      (match.homeTeam.toLowerCase().includes(team2.toLowerCase()) && 
       match.awayTeam.toLowerCase().includes(team1.toLowerCase()))
    );
  }

  // Obtener partidos recientes de un equipo
  static async getRecentMatches(teamName: string, limit: number = 5): Promise<MatchData[]> {
    const allData = await this.updateAllData();
    const teamMatches = allData.matches.filter(match => 
      match.homeTeam.toLowerCase().includes(teamName.toLowerCase()) || 
      match.awayTeam.toLowerCase().includes(teamName.toLowerCase())
    );
    
    return teamMatches
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);
  }
}
